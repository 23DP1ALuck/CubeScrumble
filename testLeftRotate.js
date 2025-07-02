const cubeLayout = [
    [["white", "white", "white"],
        ["white", "white", "white"],
        ["white", "white", "white"]
    ], // white side
    [["orange", "orange", "orange"],
        ["orange", "orange", "orange"],
        ["orange", "orange", "orange"]
    ], // orange side
    [["green", "green", "green"],
        ["green", "green", "green"],
        ["green", "green", "green"]
    ], // green side
    [["red", "red", "red"],
        ["red", "red", "red"],
        ["red", "red", "red"]
    ], // red side
    [["blue", "blue", "blue"],
        ["blue", "blue", "blue"],
        ["blue", "blue", "blue"]
    ], // blue side
    [["yellow", "yellow", "yellow"],
        ["yellow", "yellow", "yellow"],
        ["yellow", "yellow", "yellow"]
    ] // yellow side
]

const implementLeftRotate = (matrix, times ) => {
    const rememberWhiteSide  = matrix[0].map(row => [...row])
    for(let i  = 0; i < 3; i++) {
        times === 1 && (matrix[0][i][0] = matrix[4][i][0])  // from white to blue
        times === 2 && (matrix[0][i][0] = matrix[5][i][0]) // from white to yellow
        times === -1 && (matrix[0][i][0] = matrix[2][i][0]) // from white to green
    }
    const rememberGreenSide  = matrix[2].map(row => [...row])
    for(let i  = 0; i < 3; i++) {
        times === 1 && (matrix[2][i][0] = rememberWhiteSide[i][0])  // from green to white
        times === 2 && (matrix[2][i][0] = matrix[4][i][0]) // from green to blue
        times === -1 && (matrix[2][i][0] = matrix[5][i][0]) // from green to blue
    }
    for(let i  = 0; i < 3; i++) {
        times === 1 && (matrix[5][i][0] = rememberGreenSide[i][0])  // from yellow to green
        times === 2 && (matrix[5][i][0] = rememberWhiteSide[i][0]) // from yellow to white
        times === -1 && (matrix[5][i][0] = matrix[4][i][0]) // from yellow to blue
    }
    for(let i  = 0; i < 3; i++) {
        times === 1 && (matrix[4][i][0] = matrix[5][i][0])  // from blue to yellow
        times === 2 && (matrix[4][i][0] = rememberGreenSide[i][0]) // from blue to green
        times === -1 && (matrix[4][i][0] = rememberWhiteSide[i][0]) // from blue to white
    }
    console.log("TEST")
    console.log(rotate90degOneSide(cubeLayout[1], times))
    return matrix
}
const rotate90degOneSide = (matrix, times) => {
    const size = matrix.length
    const ret = [[], [], []]
    if (times === 1 || times === 2) {
        for (let t = 0; t < times; t++) {
            if (t === 1) { //if we rotate 2 times on second iteration we have to copy values from return array for right next swap
                matrix[0] = [...ret[0]]
                matrix[1] = [...ret[1]]
                matrix[2] = [...ret[2]]
            }
            for (let i = 0; i < size; i++) {              //swap logic
                for (let j = 0; j < size; j++) {
                    ret[i][j] = matrix[size - j - 1][i]
                }
            }
        }
    }
    if (times === -1) {
        const size = matrix.length
        for (let i = 0; i < size; i++) {              //swap logic
            for (let j = 0; j < size; j++) {
                ret[i][j] = matrix[j][size - i - 1]
            }
        }
        console.log(ret)
    }
    return ret
}
const printMatrix = (matrix) => {
    for (let side = 0; side < matrix.length; side++) {
        console.log(`Side ${side}:`)
        for (let row = 0; row < matrix[side].length; row++) {
            console.log(matrix[side][row].join(" "))
        }
        console.log("--------")
    }
}
printMatrix(implementLeftRotate(cubeLayout, -1))