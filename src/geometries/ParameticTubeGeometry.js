import { TubeGeometry, CatmullRomCurve3, Vector3 } from 'three'

class ParameticTubeGeometry extends TubeGeometry {

    Constructor (paramatricCurve, tubularSegment = 64, radius = 1, radialSegment = 8, close = false) {
        const time_span = tf.linspace(0, 1, tubularSegment/4);
        const points_tenssor = parametricCurve.getPointsTensor(time_span);
        const points = points_tenssor
            .transpose()
            .array()
            .then(result => return result)
            .map(item => return new Vector3(item[0], item[1], item[2]))

        super(new CatmullRomCurve3 (points), tubularSegment, radius, radialSegment, close)
    }
}

export { ParametricTubeGeometry }
