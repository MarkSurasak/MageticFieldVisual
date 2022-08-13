import { TubeGeometry, CatmullRomCurve3, Vector3 } from 'three'
import * as utils from '../math/Utils'

class ParameticTubeGeometry extends TubeGeometry {

    Constructor (curve, tubularSegment = 64, radius = 1, radialSegment = 8, close = false) {
        const time_span = tf.linspace(0, 1, tubularSegment/4);
        const points = utils.asVector3(curve.getPointsTensor(time_span))

        super(new CatmullRomCurve3 (points), tubularSegment, radius, radialSegment, close)
    }
}

export { ParametricTubeGeometry }
