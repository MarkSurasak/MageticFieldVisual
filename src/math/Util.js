import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops";

import { Vector3 } from 'three'

export const asVector3  = tensor => return tensor.transpose().arraySync().map(item => return new Vector3(item[0], item[1], item[2]))
export const asVertices = tensor => return tensor.transpose().flatten().arraySync()

export const meshGrid3 = (x_span, y_span, z_span) => {
  const x_len = x_span.size;
  const y_len = y_span.size;
  const z_len = z_span.size;

  const xx = x_span.expandDims(0).expandDims(0).tile([z_len, y_len, 1]);
  const yy = x_span.expandDims(1).expandDims(0).tile([z_len, 1, x_len]);
  const zz = x_span.expandDims(1).expandDims(2).tile([1, y_len, x_len]);

  return [xx, yy, zz];
}


export const gennerateDataChuck = (minPoint, maxPoint, density) => {
    const x_span = tf.linspace(minPositions.x, maxPosition.x, density);
    const y_span = tf.linspace(minPositions.y, maxPosition.y, density);
    const z_span = tf.linspace(minPositions.z, maxPosition.z, density);

    const [xx, yy, zz] = meshgrid3d(x_span, y_span, z_span);

    return tf.stack([xx.flatten(), yy.flatten(), zz.flatten()], 0);
 }

export const runge_kutta_4 = (func, time, current_state, delta_time = 0.01) => {
  const f1 = func(time                 , current_state);
  const f2 = func(time + delta_time / 2, current_state.add(f1.mul(delta_time / 2)));
  const f3 = func(time + delta_time / 2, current_state.add(f2.mul(delta_time / 2)));
  const f4 = func(time + delta_time    , current_state.add(f3.mul(delta_time)));

  const next_state = f1.add(f2.mul(2)).add(f3.mul(2)).add(f4).mul(delta_time/4).add(current_state);

  return next_state;
}

export const euler_medthod =  (func, time, current_state, delta_time = 0.01) => {
   const next_state = func(time, current_state).mul(delta_time).add(current_state)

   return next_state
}

export const computPhaseFlow = (func, initial_state, time_span, delta_time = 0.01, medthod = runge_kutta_4) => {
   const history = [initial_state]
   
   let current_state = initial_state
   for(time of time_span) {
       const next_state = medthod(func, time, current_state, delta_time)

       history.push(next_state)
       current_state = next_state
   }

   return history
}
