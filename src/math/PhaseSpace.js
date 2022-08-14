import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops";

import { Vector3 } from "three";

class PhaseSpace {
  //expact positions is tensor with shape [3,n]
  //return tensor with shape [3,n]
  getVectors(time, positions) {}
}

export { PhaseSpace };
