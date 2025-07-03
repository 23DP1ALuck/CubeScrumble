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
    }
    return ret
}
const implementBackRotate = (matrix, times) => {
    const rememberWhiteSide = matrix[0].map(row => [...row])
    for(let i  = 0; i < 3; i++) {
        times === 1 && (matrix[0][0][i] = matrix[3][i][2])  // from white to red
        times === 2 && (matrix[0][0][i] = matrix[5][2][i]) // from white to yellow
        times === -1 && (matrix[0][0][i] = matrix[1][i][0]) // from white to orange
    }
    const rememberOrangeSide = matrix[1].map(row => [...row])
    for(let i = 0; i < 3; i++) {
        times === 1 && (matrix[1][i][0] = rememberWhiteSide[0][i])  // from orange to white
        times === 2 && (matrix[1][i][0] = matrix[3][i][2]) // from orange to red
        times === -1 && (matrix[1][i][0] = matrix[5][2][i]) // from orange to yellow
    }
    const rememberYellowSide = matrix[5].map(row => [...row])
    for(let i  = 0; i < 3; i++) {
        times === 1 && (matrix[5][2][i] = rememberOrangeSide[i][0])  // from yellow to orange
        times === 2 && (matrix[5][2][i] = rememberWhiteSide[0][i]) // from yellow to white
        times === -1 && (matrix[5][2][i] = matrix[3][i][2]) // from yellow to red
    }
    for(let i  = 0; i < 3; i++) {
        times === 1 && (matrix[3][i][2] = rememberYellowSide[2][i])  // from red to yellow
        times === 2 && (matrix[3][i][2] = rememberOrangeSide[i][2]) // from red to orange
        times === -1 && (matrix[3][i][2] = rememberWhiteSide[0][i]) // from red to white
    }
    matrix[4] = rotate90degOneSide(cubeLayout[4], times)
    return matrix
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
printMatrix(implementBackRotate(cubeLayout, -1))