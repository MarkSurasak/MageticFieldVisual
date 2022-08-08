import { TensorParamatricCurve } from "../TensorParamaticCurve";

import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops";

const tau = tf.scalar(2 * Math.PI);

class Solenoid extends TensorParamatricCurve {
  constructor(radius, period, length) {
    super();

    this.radius = tf.scalar(radius);
    this.period = tf.scalar(period);
    this.length = tf.scalar(length);
  }

  getPointsTensor(t) {
    const x = this.radius.mul(tf.cos(tau.mul(this.period).mul(t)));
    const y = this.radius.mul(tf.sin(tau.mul(this.period).mul(t)));
    const z = this.length.mul(t);

    return tf.stack([x, y, z], 0);
  }

  getDerivativesTensor(t) {
    const x = this.radius
      .mul(tf.sin(tau.mul(this.period).mul(t)))
      .mul(tau)
      .mul(this.period)
      .mul(-1);
    const y = this.radius
      .mul(tf.cos(tau.mul(this.period).mul(t)))
      .mul(tau)
      .mul(this.period);
    const z = tf.fill([1, t.shape[0]], 1).mul(this.length);

    return tf.stack([x, y, z.flatten()], 0);
  }
}

export { Solenoid };
