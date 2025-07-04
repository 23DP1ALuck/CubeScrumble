import './App.css'
import Cube from "./Components/Cube.tsx";
import {useEffect, useState} from "react";
import {
    implementRightRotate,
    implementLeftRotate,
    implementFrontRotate,
    implementBackRotate,
    implementUpRotate, implementDownRotate
} from "./utils/rotators.ts"
import {cubeLayout} from "./utils/rotators.ts";
import {MOVES} from "./constants.ts";

function App() {
    const generate= (): string[] => {
        const generatedMoves : string[] = [];
        for(let i : number = 0; i < 20; i++){
            generatedMoves.push(MOVES[Math.floor(Math.random()*MOVES.length)]);
        }
        return generatedMoves
    }

    const calculateLayout = (generatedMoves : string[]) : string[][][] => {
        let newLayout : string[][][] = cubeLayout.map(side => side.map(row => [...row]) );
        console.log("test",newLayout)
        for(let i : number = 0; i < generatedMoves.length; i++){
            switch (generatedMoves[i]){
                case "R":
                    newLayout = implementRightRotate(newLayout, 1)
                    console.log("R",newLayout)
                    break;
                case "R2":
                    newLayout = implementRightRotate(newLayout, 2)
                    console.log("R2",newLayout)
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
                    break;
                case "U":
                    newLayout = implementUpRotate(newLayout, 1)
                    break;
                case "U2":
                    newLayout = implementUpRotate(newLayout, 2)
                    break;
                case "U\'":
                    newLayout = implementUpRotate(newLayout, -1)
                    break;
                case "D":
                    newLayout = implementDownRotate(newLayout, 1)
                    break;
                case "D2":
                    newLayout = implementDownRotate(newLayout, 2)
                    break;
                case "D\'":
                    newLayout = implementDownRotate(newLayout, -1)
                    break
            }
        }
        return newLayout;
    }
    const [layout, setLayout] = useState<string[][][]>(cubeLayout)
    const [moves, setMoves] = useState<string[]>((): string[] => generate());
    useEffect(() => {
        const newLayout : string[][][] = calculateLayout(moves);
        console.log("SCRUMBLE:",moves);
        setLayout(newLayout);
        console.log("AFTER SCRUMBLE:",newLayout);
    }, [moves]);

  return (
    <>
        <div className="flex flex-col w-full">
            <div className="flex flex-col w-full justify-center items-center" >
                <div className="grid grid-cols-4 gap-2 grid-rows-3 max-w-max">
                    <div></div>
                    <Cube colors={layout[0].flat()} />
                    <div></div>
                    <div></div>
                    <Cube colors={layout[1].flat()}/>
                    <Cube colors={layout[2].flat()}/>
                    <Cube colors={layout[3].flat()}/>
                    <Cube colors={layout[4].flat()}/>
                    <div></div>
                    <Cube colors={layout[5].flat()}/>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <div className="flex text-white font-bold text-2xl gap-4">
                    {moves.map((move, index) => (
                        <div key={index}>{move}</div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <button className="bg-blue-500 hover:bg-blue-700 duration-200 text-white font-bold py-2 px-4 hobe rounded" onClick={() => setMoves(generate())}>
                    Next scrumble
                </button>
            </div>
        </div>

    </>
  )
}

export default App