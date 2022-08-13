import { BufferGeometry, Point, Vector3, Clock } from 'three'
import { Util } from '../math/Util'

class Particle extends Point {

    Constructor (clock, initial_points, vectorfield, material) {
        const geometry = new BufferGeometry()
        geometry.setFromPoint(Util.asVectors3(initial_points)))

        super(geometry, material)

        this.clock = clock
        this.points_tensor = initial_point
        this.vectorfield = vectorfield
    }

    update() {
        this.point_tensor = Util.euler_medthod(this.vectorfield, this.clock.getElapsedTime(), this.points_tensor, this.clock.getDeltaTime())
    }
}





