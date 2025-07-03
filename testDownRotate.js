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
const implementDownRotate = (matrix, times) => {
    const rememberGreenSide = matrix[2].map(row => [...row])
    for(let i  = 0; i < 3; i++) {
        times === 1 && (matrix[2][2][i] = matrix[1][2][i])  // from green to orange
        times === 2 && (matrix[2][2][i] = matrix[4][2][i]) // from green to blue
        times === -1 && (matrix[2][2][i] = matrix[3][2][i]) // from green to red
    }
    const rememberOrangeSide = matrix[1].map(row => [...row])
    for(let i = 0; i < 3; i++) {
        times === 1 && (matrix[1][2][i] = matrix[4][2][i])  // from orange to blue
        times === 2 && (matrix[1][2][i] = matrix[3][2][i]) // from orange to red
        times === -1 && (matrix[1][2][i] = rememberGreenSide[2][i]) // from orange to green
    }
    const rememberBlueSide = matrix[4].map(row => [...row])
    for(let i  = 0; i < 3; i++) {
        times === 1 && (matrix[4][2][i] = matrix[3][2][i])  // from blue to red
        times === 2 && (matrix[4][2][i] = rememberGreenSide[2][i]) // from blue to green
        times === -1 && (matrix[4][2][i] = rememberOrangeSide[2][i]) // from blue to orange
    }
    for(let i  = 0; i < 3; i++) {
        times === 1 && (matrix[3][2][i] = rememberGreenSide[2][i])  // from red to green
        times === 2 && (matrix[3][2][i] = rememberOrangeSide[2][i]) // from red to orange
        times === -1 && (matrix[3][2][i] = rememberBlueSide[2][i]) // from red to blue
    }
    matrix[5] = rotate90degOneSide(matrix[5], times)
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
printMatrix(implementDownRotate(cubeLayout, -1))