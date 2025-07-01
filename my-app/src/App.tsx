import './App.css'
import Cube from "./Components/Cube.tsx";
import {useEffect} from "react";

function App() {
    const cubeLayout : string[][][] = [
        [   ["white","white","white"],
            ["white","white","white"],
            ["white","white","white"]
        ], // white side
        [   ["orange","orange","orange"],
            ["orange","orange","orange"],
            ["orange","orange","orange"]
        ], // orange side
        [   ["green","green","green"],
            ["green","green","green"],
            ["green","green","green"]
        ], // green side
        [   ["red","red","red"],
            ["red","red","red"],
            ["red","red","red"]
        ], // red side
        [   ["blue","blue","blue"],
            ["blue","blue","blue"],
            ["blue","blue","blue"]
        ], // blue side
        [   ["yellow","yellow","yellow"],
            ["yellow","yellow","yellow"],
            ["yellow","yellow","yellow"]
        ] // yellow side
    ]
    const moves : string[] = ["D", "D\'", "D2", "B", "B\'", "B2", "F", "F\'", "F2", "L", "L\'", "L2", "R", "R\'", "R2", "U", "U\'", "U2"]
    const generatedMoves : string[] = [];
    const generate= (): void => {
        for(let i : number = 0; i < 20; i++){
            generatedMoves.push(moves[Math.floor(Math.random()*moves.length)]);
        }
    }
    const rotate90deg = (matrix: string[][], times : number) : string[][] => {
        const size : number = matrix.length
        const ret : string[][] = [[],[],[]]
        if(times === 1 || times === 2){
            for(let t = 0; t < times; t++){
                if(t === 1){ //if we rotate 2 times on second iteration we have to copy values from return array for right next swap
                    matrix[0] = [...ret[0]]
                    matrix[1] = [...ret[1]]
                    matrix[2] = [...ret[2]]
                }
                for(let i = 0; i < size; i++){              //swap logic
                    for(let j  = 0; j < size; j++ ){
                        ret[i][j] = matrix[size-j-1][i]
                    }
                }
            }
        }
        if(times === -1) {
            const size : number = matrix.length
            const ret : string[][] = [[],[],[]]
            for(let i = 0; i < size; i++){              //swap logic
                for(let j  = 0; j < size; j++ ){
                    ret[i][j] = matrix[j][size - i - 1]
                }
            }
        }
        return ret
    }
    const implementRightRotate = (matrix: string[][][], times : number) : string[][][] => {
        const rememberWhiteSide : string[][] = matrix[0].map(row => [...row])
        for(let i : number = 0; i < 3; i++) {
            times === 1 && (matrix[0][i][2] = matrix[2][i][2])  // from white to green
            times === 2 && (matrix[0][i][2] = matrix[5][i][2]) // from white to yellow
        }
        const rememberGreenSide : string[][] = matrix[2].map(row => [...row])
        for(let i : number = 0; i < 3; i++) {
            times === 1 && (matrix[2][i][2] = matrix[5][i][2])  // from green to yellow
            times === 2 && (matrix[2][i][2] = matrix[4][i][2]) // from green to blue
        }
        for(let i : number = 0; i < 3; i++) {
            times === 1 && (matrix[5][i][2] = matrix[4][i][2])  // from yellow to blue
            times === 2 && (matrix[5][i][2] = rememberWhiteSide[i][2]) // from yellow to white
        }
        for(let i : number = 0; i < 3; i++) {
            times === 1 && (matrix[4][i][2] = rememberWhiteSide[i][2])  // from blue to white
            times === 2 && (matrix[4][i][2] = rememberGreenSide[i][2]) // from blue to green
        }
        matrix[3] = rotate90deg(cubeLayout[3], times)
        return matrix
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