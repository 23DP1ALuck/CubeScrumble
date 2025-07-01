console.log('Happy developing ✨')
const test = [[1,2,3], [4,5,6], [7,8,9]]

// const rotate90deg = (matrix, times) => {
//     const size = matrix.length
//     const ret = [[],[],[]]
//     for(let t = 0; t < times; t++){
//         if(t === 1){ //if we rotate 2 times on second iteration we have to copy values from return array for right next swap
//             matrix[0] = [...ret[0]]
//             matrix[1] = [...ret[1]]
//             matrix[2] = [...ret[2]]
//         }
//         for(let i = 0; i < size; i++){              //swap logic
//             for(let j  = 0; j < size; j++ ){
//                 ret[i][j] = matrix[size-j-1][i]
//             }
//         }
//     }
//     return ret
// }
const printMatrix = (matrix) => {
    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i].join(" "))
    }
}
// printMatrix(test);
// console.log("-------")



const rotateMinus = (matrix) => {
    const size = matrix.length
    const ret = [[],[],[]]
    for(let i = 0; i < size; i++){              //swap logic
        for(let j  = 0; j < size; j++ ){
            ret[i][j] = matrix[j][size-i-1]
        }
    }
    return ret
}
printMatrix(test)
console.log("-----")
printMatrix(rotateMinus(test))
