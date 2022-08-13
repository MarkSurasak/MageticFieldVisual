import { ArrowHelper, CatmullRomCurve3, Color, Group, TubeGeometry, Vector3 } from "three";

import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops";

class TensorCurve {
  //return a tensor of derivatives
  //param: time_span type = tensor with shape [n,1]
  //param: every element in time_span must between 0 and 1
  //return: tensor with shape [3,n]
  getPointsTensor(time_span) {}

  //return a tensor of derivatives
  //param: time_span type = tensor with shape [n,1]
  //param: every element in time_span must between 0 and 1
  //return: tensor with shape [3,n]
  getDerivativesTensor(time_span) {}

  getPointsAndDerivatives(time_span) {
    return tf.tidy(() => {
      const points = this.getPointsTensor(time_span)
      const derivatives = this.getDerivativesTensor(time_span)

      return {points, derivatives}
    })
  }
}

export { TensorCurve };
