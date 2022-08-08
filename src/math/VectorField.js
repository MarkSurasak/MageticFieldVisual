import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops";

import { Vector3 } from "three";

const meshgrid3d = (x_span, y_span, z_span) => {
  const x_len = x_span.size;
  const y_len = y_span.size;
  const z_len = z_span.size;

  const xx = x_span.expandDims(0).expandDims(0).tile([z_len, y_len, 1]);
  const yy = x_span.expandDims(1).expandDims(0).tile([z_len, 1, x_len]);
  const zz = x_span.expandDims(1).expandDims(2).tile([1, y_len, x_len]);

  return [xx, yy, zz];
};

function rungeKutta4(func, time, current_state, delta_time = 0.01) {
  const f1 = func(time, current_state);
  const f2 = func(
    time + delta_time / 2,
    current_state.add(f1.mul(delta_time / 2))
  );
  const f3 = func(
    time + delta_time / 2,
    current_state.add(f2.mul(delta_time / 2))
  );
  const f4 = func(time + delta_time, current_state.add(f3.mul(delta_time / 2)));

  const next_state = current_state.add(f4.mul(delta_time));

  return next_state;
}

class VectorField {
  //expact positions is tensor with shape [3,n]
  //return tensor with shape [3,n]
  getVectors(time, positions) {}

  getPhaseFlowHistory(
    time_duration,
    delta_time,
    minPositions,
    maxPosition,
    density = 1
  ) {
    const positions = VectorField.gennerateDataChunk(
      minPositions,
      maxPosition,
      density
    );

    const history = [];

    let current_state = positions;
    for (let time = 0; time < time_duration; time += delta_time) {
      const next_state = rungeKutta4(
        this.getVectors,
        time,
        current_state,
        delta_time
      );

      history.push(next_state);

      current_state = next_state;
    }

    return history;
  }

  //get a sample of this vector field on given area
  getSampleChunk(
    time,
    minPositions,
    maxPosition,
    density = 1,
    return_position = false
  ) {
    const positions = VectorField.gennerateDataChunk(
      minPositions,
      maxPosition,
      density
    );
    const directions = this.getVectors(time, positions);

    return return_position ? [positions, directions] : directions;
  }

  //static medthod bababa

  static gennerateDataChunk(minPositions, maxPosition, density = 1) {
    const x_span = tf.linspace(minPositions.x, maxPosition.x, density);
    const y_span = tf.linspace(minPositions.y, maxPosition.y, density);
    const z_span = tf.linspace(minPositions.z, maxPosition.z, density);

    const [xx, yy, zz] = meshgrid3d(x_span, y_span, z_span);

    return tf.stack([xx.flatten(), yy.flatten(), zz.flatten()], 0);
  }
}

export { VectorField };
