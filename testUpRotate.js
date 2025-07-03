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
const implementUpRotate = (matrix, times) => {
    const rememberGreenSide = matrix[2].map(row => [...row])
    for(let i  = 0; i < 3; i++) {
        times === 1 && (matrix[2][0][i] = matrix[3][0][i])  // from green to red
        times === 2 && (matrix[2][0][i] = matrix[4][0][i]) // from green to blue
        times === -1 && (matrix[2][0][i] = matrix[1][0][i]) // from green to orange
    }
    const rememberOrangeSide = matrix[1].map(row => [...row])
    for(let i = 0; i < 3; i++) {
        times === 1 && (matrix[1][0][i] = rememberGreenSide[0][i])  // from orange to green
        times === 2 && (matrix[1][0][i] = matrix[3][0][i]) // from orange to red
        times === -1 && (matrix[1][0][i] = matrix[4][0][i]) // from orange to blue
    }
    const rememberBlueSide = matrix[4].map(row => [...row])
    for(let i  = 0; i < 3; i++) {
        times === 1 && (matrix[4][0][i] = rememberOrangeSide[0][i])  // from blue to orange
        times === 2 && (matrix[4][0][i] = rememberGreenSide[0][i]) // from blue to green
        times === -1 && (matrix[4][0][i] = matrix[3][0][i]) // from blue to red
    }
    for(let i  = 0; i < 3; i++) {
        times === 1 && (matrix[3][0][i] = rememberBlueSide[0][i])  // from red to blue
        times === 2 && (matrix[3][0][i] = rememberOrangeSide[0][i]) // from red to orange
        times === -1 && (matrix[3][0][i] = rememberGreenSide[0][i]) // from red to green
    }
    matrix[0] = rotate90degOneSide(matrix[0], times)
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
printMatrix(implementUpRotate(cubeLayout, -1))