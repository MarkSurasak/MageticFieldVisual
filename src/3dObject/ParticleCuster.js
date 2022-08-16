import { runge_kutta_4 } from '../utils/ODESolver'

class ParticleCuster extends Group {

  Constructor (mesh, box, geometry, vectorField) {
    for(vertex, geometry.vertices) {
      mesh.position = vertex
      this.add(mesh)
    }
  }

  onBeforeRender( renderer, scene, camera, geometry, material, group ) {
    this.position = runge_kutta_4(this.vector)
  }
}
