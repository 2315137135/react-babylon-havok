import {Engine, HavokPlugin, MeshBuilder, PhysicsAggregate, PhysicsShapeType, Scene} from "@babylonjs/core";
import Havok, {HavokPhysicsWithBindings} from "@babylonjs/havok"

let havokInstance: HavokPhysicsWithBindings

export async function initScene(engine: Engine, scene: Scene) {
    scene.createDefaultCameraOrLight()
    scene.enablePhysics(undefined, new HavokPlugin(undefined, await Havok()))

    // React The dev mode executes UseEffect multiple times.
    if (scene.isDisposed) return

    //Crate Mesh
    const ground = MeshBuilder.CreateGround("ground", {width: 10, height: 10})
    const box = MeshBuilder.CreateBox("box", {})

    //--------
    box.position.y = 4

    //Physics
    new PhysicsAggregate(ground, PhysicsShapeType.BOX, {mass: 0}, scene)
    new PhysicsAggregate(box, PhysicsShapeType.BOX, {mass: 1}, scene)

    scene.createDefaultCamera(true, true, true)
}
