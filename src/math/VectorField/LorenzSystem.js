import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops";

const sigma = 10
const rho = 28
const beta = 8/3

export class LorenzSystem extends VectorField {

  getVector(time, state) {
    const x = state.gather(0,0)
    const y = state.gather(1,0)
    const z = state.gather(2,0)

    const x_dot = y.sub(x).mul(sigma)
    const y_dot = y.mul(tf.sub(rho,z)).sub(x)
    const z_dot = tf.sub(tf.mul(x,y),tf.mul(beta,z))
    
    return tf.stack([x_dot, y_dot, z_dot],0)
  }
}
