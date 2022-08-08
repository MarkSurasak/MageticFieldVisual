import { CatmullRomCurve3, Vector3 } from "three";

import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops";

class TensorParamatricCurve {
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

  getSpline(percision = 1000) {
    const time_span = tf.linspace(0, 1, percision);
    const points_tenssor = this.getPointsTensor(time_span);
    const points = points_tenssor
      .transpose()
      .arraySync()
      .map((item) => {
        return new Vector3(item[0], item[1], item[2]);
      });

    return new CatmullRomCurve3(points);
  }
}

export { TensorParamatricCurve };
