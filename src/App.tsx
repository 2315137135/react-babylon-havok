import React, {useEffect, useRef} from 'react';
import './App.css';
import {Engine, Scene} from "@babylonjs/core";
import {initScene} from "./initScene";

function App() {
    const canvasRef = useRef(null)

    useEffect(() => {
        if (!canvasRef.current) return
        const engine = new Engine(canvasRef.current)
        const scene = new Scene(engine)
        initScene(engine, scene)
        const renderLoop = () => scene.render()
        const resize = () => engine.resize()

        engine.runRenderLoop(renderLoop)
        window.addEventListener("resize", resize)
        return () => {
            engine.dispose()
            window.removeEventListener("resize", resize)
        }
    }, [])
    return (
        <div className="App">
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}

export default App;
