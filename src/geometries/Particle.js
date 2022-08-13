import { BufferGeometry, Point, Vector3, Clock } from 'three'
import * as utils from '../math/Utils'

class Particle extends Point {

    Constructor (clock, initial_points, vectorfield, material) {
        const geometry = new BufferGeometry()
        geometry.setFromPoint(utils.asVectors3(initial_points)))

        super(geometry, material)

        this.clock = clock
        this.points_tensor = initial_point
        this.vectorfield = vectorfield
        this.integateMedthod = Util.euler
    }

    update() {
        const next = this.integateMedthod(this.vectorfield, this.clock.getElapsedTime(), this.points_tensor, this.clock.getDeltaTime())
        
        this.geometry.vertices = utils.asVertices(next)
        this.points_tensor = next
    }
}





