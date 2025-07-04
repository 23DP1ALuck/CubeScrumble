export const cubeLayout : string[][][] = [
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
const rotate90degOneSide = (matrix: string[][], times : number) : string[][] => {
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
        for(let i = 0; i < size; i++){              //swap logic
            for(let j  = 0; j < size; j++ ){
                ret[i][j] = matrix[j][size - i - 1]
            }
        }
    }
    return ret
}
export const implementRightRotate = (matrix: string[][][], times : number) : string[][][] => {
    const rememberWhiteSide : string[][] = matrix[0].map(row => [...row])
    for(let i : number = 0; i < 3; i++) {
        let forR2Move : number = 2
        times === 1 && (matrix[0][i][2] = matrix[2][i][2])  // from white to green
        times === 2 && (matrix[0][i][2] = matrix[5][i][2]) // from white to yellow
        times === -1 && (matrix[0][i][2] = matrix[4][forR2Move - i][0]) // from white to blue
    }
    const rememberGreenSide : string[][] = matrix[2].map(row => [...row])
    for(let i : number = 0; i < 3; i++) {
        let forR2Move = 2
        times === 1 && (matrix[2][i][2] = matrix[5][i][2])  // from green to yellow
        times === 2 && (matrix[2][i][2] = matrix[4][forR2Move - i][0]) // from green to blue
        times === -1 && (matrix[2][i][2] = rememberWhiteSide[i][2]) // from green to white
    }
    const rememberYellowSide : string[][] = matrix[5].map(row => [...row])
    for(let i : number = 0; i < 3; i++) {
        let forRMove : number = 2
        times === 1 && (matrix[5][i][2] = matrix[4][forRMove - i][0])  // from yellow to blue
        times === 2 && (matrix[5][i][2] = rememberWhiteSide[i][2]) // from yellow to white
        times === -1 && (matrix[5][i][2] = rememberGreenSide[i][2]) // from yellow to green
    }
    for(let i : number = 0; i < 3; i++) {
        let forR2Move : number = 2
        times === 1 && (matrix[4][i][0] = rememberWhiteSide[forR2Move - i][2])  // from blue to white
        times === 2 && (matrix[4][i][0] = rememberGreenSide[forR2Move - i][2]) // from blue to green
        times === -1 && (matrix[4][i][0] = rememberYellowSide[forR2Move - i][2]) // from blue to yellow
    }
    matrix[3] = rotate90degOneSide(matrix[3], times)
    return matrix
}
export const implementLeftRotate = (matrix: string[][][], times : number) : string[][][] => {
    const rememberWhiteSide : string[][] = matrix[0].map(row => [...row])
    for(let i : number = 0; i < 3; i++) {
        let forL2Move = 2
        times === 1 && (matrix[0][i][0] = matrix[4][forL2Move - i][2])  // from white to blue
        times === 2 && (matrix[0][i][0] = matrix[5][forL2Move - i][0]) // from white to yellow
        times === -1 && (matrix[0][i][0] = matrix[2][i][0]) // from white to green
    }
    const rememberGreenSide : string[][] = matrix[2].map(row => [...row])
    for(let i : number = 0; i < 3; i++) {
        let forL2Move = 2
        times === 1 && (matrix[2][i][0] = rememberWhiteSide[i][0])  // from green to white
        times === 2 && (matrix[2][i][0] = matrix[4][forL2Move - i][2]) // from green to blue
        times === -1 && (matrix[2][i][0] = matrix[5][i][0]) // from green to blue
    }
    const rememberYellowSide : string[][] = matrix[5].map(row => [...row])
    for(let i : number = 0; i < 3; i++) {
        let forL2Move = 2
        times === 1 && (matrix[5][i][0] = rememberGreenSide[i][0])  // from yellow to green
        times === 2 && (matrix[5][i][0] = rememberWhiteSide[i][0]) // from yellow to white
        times === -1 && (matrix[5][i][0] = matrix[4][forL2Move - i][2]) // from yellow to blue
    }
    for(let i : number = 0; i < 3; i++) {
        let forL2Move = 2
        times === 1 && (matrix[4][i][2] = rememberYellowSide[forL2Move - i][0])  // from blue to yellow
        times === 2 && (matrix[4][i][2] = rememberGreenSide[forL2Move - i][0]) // from blue to green
        times === -1 && (matrix[4][i][2] = rememberWhiteSide[forL2Move - i][0]) // from blue to white
    }
    matrix[1] = rotate90degOneSide(matrix[1], times)
    return matrix
}
export const implementFrontRotate = (matrix: string[][][], times: number): string[][][] =>  {
    const rememberWhiteSide: string[][] = matrix[0].map(row => [...row])
    const yellowTest = matrix[5].map(side => [...side])
    console.log("YELLOW SIDE 1st ROW", yellowTest[0])
    for(let i : number  = 0; i < 3; i++) {
        let forF2Move = 2
        times === 1 && (matrix[0][2][i] = matrix[1][forF2Move - i][2])  // from white to orange
        times === 2 && (matrix[0][2][i] = matrix[5][0][forF2Move - i]) // from white to yellow
        times === -1 && (matrix[0][2][i] = matrix[3][i][0]) // from white to red
    }
    const rememberOrangeSide : string[][] = matrix[1].map(row => [...row])
    for(let i : number = 0; i < 3; i++) {
        let forF2Move = 2
        times === 1 && (matrix[1][i][2] = matrix[5][0][i])  // from orange to yellow
        times === 2 && (matrix[1][i][2] = matrix[3][forF2Move - i][0]) // from orange to red
        times === -1 && (matrix[1][i][2] = rememberWhiteSide[2][forF2Move - i]) // from orange to white
    }
    const rememberYellowSide : string[][] = matrix[5].map(row => [...row])
    for(let i : number  = 0; i < 3; i++) {
        let forF2Move = 2
        times === 1 && (matrix[5][0][i] = matrix[3][forF2Move - i][0])  // from yellow to red
        times === 2 && (matrix[5][0][i] = rememberWhiteSide[2][forF2Move - i]) // from yellow to white
        times === -1 && (matrix[5][0][i] = rememberOrangeSide[i][2]) // from yellow to orange
    }
    for(let i : number  = 0; i < 3; i++) {
        let forF2Move = 2
        times === 1 && (matrix[3][i][0] = rememberWhiteSide[2][i])  // from red to white
        times === 2 && (matrix[3][i][0] = rememberOrangeSide[forF2Move - i][2]) // from red to orange
        times === -1 && (matrix[3][i][0] = rememberYellowSide[0][forF2Move - i]) // from red to yellow
    }
    matrix[2] = rotate90degOneSide(matrix[2], times)
    return matrix
}
export const implementBackRotate = (matrix : string[][][], times : number) : string[][][] => {
    const rememberWhiteSide: string[][] = matrix[0].map(row => [...row])
    for(let i : number  = 0; i < 3; i++) {
        let forB2Move : number = 2
        times === 1 && (matrix[0][0][i] = matrix[3][i][2])  // from white to red
        times === 2 && (matrix[0][0][i] = matrix[5][2][forB2Move - i]) // from white to yellow
        times === -1 && (matrix[0][0][i] = matrix[1][forB2Move - i][0]) // from white to orange
    }
    const rememberOrangeSide : string[][] = matrix[1].map(row => [...row])
    for(let i : number = 0; i < 3; i++) {
        let forB2Move : number = 2
        times === 1 && (matrix[1][i][0] = rememberWhiteSide[0][forB2Move - i])  // from orange to white
        times === 2 && (matrix[1][i][0] = matrix[3][forB2Move - i][2]) // from orange to red
        times === -1 && (matrix[1][i][0] = matrix[5][2][i]) // from orange to yellow
    }
    const rememberYellowSide : string[][] = matrix[5].map(row => [...row])
    for(let i : number  = 0; i < 3; i++) {
        let forB2Move : number = 2
        times === 1 && (matrix[5][2][i] = rememberOrangeSide[i][0])  // from yellow to orange
        times === 2 && (matrix[5][2][i] = rememberWhiteSide[0][forB2Move - i]) // from yellow to white
        times === -1 && (matrix[5][2][i] = matrix[3][forB2Move - i][2]) // from yellow to red
    }
    for(let i : number  = 0; i < 3; i++) {
        let forB2Move : number = 2
        times === 1 && (matrix[3][i][2] = rememberYellowSide[2][forB2Move - i])  // from red to yellow
        times === 2 && (matrix[3][i][2] = rememberOrangeSide[forB2Move - i][0]) // from red to orange
        times === -1 && (matrix[3][i][2] = rememberWhiteSide[0][i]) // from red to white
    }
    matrix[4] = rotate90degOneSide(matrix[4], times)
    return matrix
}
export const implementUpRotate = (matrix : string[][][], times : number) => {
    const rememberGreenSide : string[][] = matrix[2].map(row => [...row])
    for(let  i : number  = 0; i < 3; i++) {
        times === 1 && (matrix[2][0][i] = matrix[3][0][i])  // from green to red
        times === 2 && (matrix[2][0][i] = matrix[4][0][i]) // from green to blue
        times === -1 && (matrix[2][0][i] = matrix[1][0][i]) // from green to orange
    }
    const rememberOrangeSide : string[][] = matrix[1].map(row => [...row])
    for(let i : number = 0; i < 3; i++) {
        times === 1 && (matrix[1][0][i] = rememberGreenSide[0][i])  // from orange to green
        times === 2 && (matrix[1][0][i] = matrix[3][0][i]) // from orange to red
        times === -1 && (matrix[1][0][i] = matrix[4][0][i]) // from orange to blue
    }
    const rememberBlueSide : string[][] = matrix[4].map(row => [...row])
    for(let i : number  = 0; i < 3; i++) {
        times === 1 && (matrix[4][0][i] = rememberOrangeSide[0][i])  // from blue to orange
        times === 2 && (matrix[4][0][i] = rememberGreenSide[0][i]) // from blue to green
        times === -1 && (matrix[4][0][i] = matrix[3][0][i]) // from blue to red
    }
    for(let i : number  = 0; i < 3; i++) {
        times === 1 && (matrix[3][0][i] = rememberBlueSide[0][i])  // from red to blue
        times === 2 && (matrix[3][0][i] = rememberOrangeSide[0][i]) // from red to orange
        times === -1 && (matrix[3][0][i] = rememberGreenSide[0][i]) // from red to green
    }
    matrix[0] = rotate90degOneSide(matrix[0], times)
    console.log("WHITE:", matrix[0])
    return matrix
}
export const implementDownRotate = (matrix: string[][][], times : number) => {
    const rememberGreenSide : string[][] = matrix[2].map(row => [...row])
    for(let i : number  = 0; i < 3; i++) {
        times === 1 && (matrix[2][2][i] = matrix[1][2][i])  // from green to orange
        times === 2 && (matrix[2][2][i] = matrix[4][2][i]) // from green to blue
        times === -1 && (matrix[2][2][i] = matrix[3][2][i]) // from green to red
    }
    const rememberOrangeSide : string[][] = matrix[1].map(row => [...row])
    for(let i : number = 0; i < 3; i++) {
        times === 1 && (matrix[1][2][i] = matrix[4][2][i])  // from orange to blue
        times === 2 && (matrix[1][2][i] = matrix[3][2][i]) // from orange to red
        times === -1 && (matrix[1][2][i] = rememberGreenSide[2][i]) // from orange to green
    }
    const rememberBlueSide : string[][] = matrix[4].map(row => [...row])
    for(let i : number  = 0; i < 3; i++) {
        times === 1 && (matrix[4][2][i] = matrix[3][2][i])  // from blue to red
        times === 2 && (matrix[4][2][i] = rememberGreenSide[2][i]) // from blue to green
        times === -1 && (matrix[4][2][i] = rememberOrangeSide[2][i]) // from blue to orange
    }
    for(let i : number  = 0; i < 3; i++) {
        times === 1 && (matrix[3][2][i] = rememberGreenSide[2][i])  // from red to green
        times === 2 && (matrix[3][2][i] = rememberOrangeSide[2][i]) // from red to orange
        times === -1 && (matrix[3][2][i] = rememberBlueSide[2][i]) // from red to blue
    }
    matrix[5] = rotate90degOneSide(matrix[5], times)
    return matrix
}