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

const implementRightRotate = (matrix) => {
    const whiteSide = matrix[0].map(row => [...row])
    for (let i = 0; i < 3; i++) {
        matrix[0][i][2] = matrix[2][i][2]  // from white to green
    }
    for (let i = 0; i < 3; i++) {
        matrix[2][i][2] = matrix[5][i][2]  // from green to yellow
    }
    for (let i = 0; i < 3; i++) {
        matrix[5][i][2] = matrix[4][i][2]  // from yellow to blue
    }
    for (let i = 0; i < 3; i++) {
        matrix[4][i][2] = whiteSide[i][2]  // from yellow to blue
    }

    return matrix
}
const rotated = implementRightRotate(cubeLayout)
const printMatrix = (matrix) => {
    for (let side = 0; side < matrix.length; side++) {
        console.log(`Side ${side}:`)
        for (let row = 0; row < matrix[side].length; row++) {
            console.log(matrix[side][row].join(" "))
        }
        console.log("--------")
    }
}
console.log("Current cube layout:")
printMatrix(rotated)