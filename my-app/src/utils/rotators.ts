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
        const ret : string[][] = [[],[],[]]
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
    matrix[3] = rotate90degOneSide(cubeLayout[3], times)
    return matrix
}
export const implementLeftRotate = (matrix: string[][][], times : number) : string[][][] => {
    const rememberWhiteSide : string[][] = matrix[0].map(row => [...row])
    for(let i : number = 0; i < 3; i++) {
        times === 1 && (matrix[0][i][0] = matrix[4][i][0])  // from white to blue
        times === 2 && (matrix[0][i][0] = matrix[5][i][0]) // from white to yellow
        times === -1 && (matrix[0][i][0] = matrix[2][i][0]) // from white to green
    }
    const rememberGreenSide : string[][] = matrix[2].map(row => [...row])
    for(let i : number = 0; i < 3; i++) {
        times === 1 && (matrix[2][i][0] = rememberWhiteSide[i][0])  // from green to white
        times === 2 && (matrix[2][i][0] = matrix[4][i][0]) // from green to blue
        times === -1 && (matrix[2][i][0] = matrix[5][i][0]) // from green to blue
    }
    for(let i : number = 0; i < 3; i++) {
        times === 1 && (matrix[5][i][0] = rememberGreenSide[i][0])  // from yellow to green
        times === 2 && (matrix[5][i][0] = rememberWhiteSide[i][0]) // from yellow to white
        times === -1 && (matrix[5][i][0] = matrix[4][i][0]) // from yellow to blue
    }
    for(let i : number = 0; i < 3; i++) {
        times === 1 && (matrix[4][i][0] = matrix[5][i][0])  // from blue to yellow
        times === 2 && (matrix[4][i][0] = rememberGreenSide[i][0]) // from blue to green
        times === -1 && (matrix[4][i][0] = rememberWhiteSide[i][0]) // from blue to white
    }
    matrix[1] = rotate90degOneSide(cubeLayout[1], times)
    return matrix
}
export const implementFrontRotate = (matrix: string[][][], times: number): string[][][] =>  {
    const rememberWhiteSide : string[][] = matrix[0].map(row => [...row])
    for(let i : number = 0; i < 3; i++) {
        times === 1 && (matrix[0][i][2] = matrix[1][i][2])  // from white to orange
        times === 2 && (matrix[0][i][0] = matrix[5][i][0]) // from white to yellow
        times === 2 && (matrix[0][i][2] = matrix[5][i][2]) // from white to yellow
    }
    const rememberGreenSide : string[][] = matrix[2].map(row => [...row])
    for(let i : number = 0; i < 3; i++) {
        times === 1 && (matrix[2][i][0] = matrix[5][i][0])  // from green to yellow
        times === 2 && (matrix[2][i][0] = matrix[4][i][0]) // from green to blue
    }
    for(let i : number = 0; i < 3; i++) {
        times === 1 && (matrix[5][i][0] = matrix[4][i][0])  // from yellow to blue
        times === 2 && (matrix[5][i][0] = rememberWhiteSide[i][0]) // from yellow to white
    }
    for(let i : number = 0; i < 3; i++) {
        times === 1 && (matrix[4][i][0] = rememberWhiteSide[i][0])  // from blue to white
        times === 2 && (matrix[4][i][0] = rememberGreenSide[i][0]) // from blue to green
    }
    matrix[2] = rotate90degOneSide(cubeLayout[2], times)
    return matrix
}
