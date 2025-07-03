import './App.css'
import Cube from "./Components/Cube.tsx";
import {useEffect} from "react";
import {implementRightRotate, implementLeftRotate, implementFrontRotate, implementBackRotate} from "./utils/rotators.ts"
import {cubeLayout} from "./utils/rotators.ts";

function App() {

    const moves : string[] = ["D", "D\'", "D2", "B", "B\'", "B2", "F", "F\'", "F2", "L", "L\'", "L2", "R", "R\'", "R2", "U", "U\'", "U2"]
    const generatedMoves : string[] = [];
    const generate= (): void => {
        for(let i : number = 0; i < 20; i++){
            generatedMoves.push(moves[Math.floor(Math.random()*moves.length)]);
        }
    }

    const calculateLayout = () : string[][][] => {
        let newLayout : string[][][] = cubeLayout.map(side => [...side]);
        for(let i : number = 0; i < 20; i++){
            switch (generatedMoves[i]){
                case "R":
                    newLayout = implementRightRotate(newLayout, 1)
                    break;
                case "R2":
                    newLayout = implementRightRotate(newLayout, 2)
                    break;
                case "R\'":
                    newLayout = implementRightRotate(newLayout, -1)
                    break;
                case "L":
                    newLayout = implementLeftRotate(newLayout, 1)
                    break;
                case "L2":
                    newLayout = implementLeftRotate(newLayout, 2)
                    break;
                case "L\'":
                    newLayout = implementLeftRotate(newLayout, -1)
                    break;
                case "F":
                    newLayout = implementFrontRotate(newLayout, 1)
                    break;
                case "F2":
                    newLayout = implementFrontRotate(newLayout, 2)
                    break;
                case "F\'":
                    newLayout = implementFrontRotate(newLayout, -1)
                    break;
                case "B":
                    newLayout = implementBackRotate(newLayout, 1)
                    break;
                case "B2":
                    newLayout = implementBackRotate(newLayout, 2)
                    break;
                case "B\'":
                    newLayout = implementBackRotate(newLayout, -1)
            }
        }
        return newLayout;
    }
    useEffect(() => {
       generate();
       console.log(generatedMoves);
    },[])
  return (
    <>
        <div className="flex flex-col">
            <div className="grid grid-cols-4 gap-2 grid-rows-3 max-w-max">
                <div></div>
                <Cube colors={["white", "white", "white","white", "white", "white","white", "white", "white"]} />
                <div></div>
                <div></div>

                <Cube colors={["orange", "orange", "orange","orange", "orange", "orange","orange", "orange", "orange"]}/>
                <Cube colors={["green","green","green","green","green","green","green","green","green",]}/>
                <Cube colors={["red","red","red","red","red","red","red","red","red"]}/>
                <Cube colors={["blue","blue","blue","blue","blue","blue","blue","blue","blue"]}/>
                <div></div>
                <Cube colors={["yellow","yellow","yellow","yellow","yellow","yellow","yellow","yellow","yellow"]}/>
                <div></div>
                <div></div>
            </div>

        </div>
    </>
  )
}

export default App