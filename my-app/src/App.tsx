import './App.css'
import Cube from "./Components/Cube.tsx";

function App() {

  return (
    <>
        <div className="flex flex-col">
            <div className="grid grid-cols-4 gap-2 grid-rows-3 max-w-max">
                <div></div>
                <Cube color="white"/>
                <div></div>
                <div></div>

                <Cube color="orange"/>
                <Cube color="green"/>
                <Cube color="red"/>
                <Cube color="blue"/>
                <div></div>
                <div className="flex">
                    <Cube color="yellow"/>
                </div>
                <div></div>
                <div></div>
            </div>

        </div>
    </>
  )
}

export default App
