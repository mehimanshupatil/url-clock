// https://en.wikipedia.org/wiki/Braille_Patterns
const updateUrl = (time) => {
    window.history.pushState(null, "", '#' + time);
}
const toUnicode = code => String.fromCodePoint(parseInt(code, 16));
const hexadd = (...rest) => {
    let sum = 0
    for (const num of rest) {
        sum = (parseInt(sum, 16) + parseInt(num, 16)).toString(16)
    }
    return sum
}
const addHexToCreateBrailleUnicode = (num) => {
    const unicodeStart = 2800
    let sum = (parseInt(unicodeStart, 16) + parseInt(num, 16)).toString(16)
    return sum
}


// const unicodeStart = 2800
/** brail numbering
 *  1 4 
 *  2 5
 *  3 6
 *  7 8
 */
/** brail associate binary value in deciaml
 *  1 8 
 *  2 16
 *  4 32
 *  64 128
 */
/** brail associate hex value
 *  1 8 
 *  2 10
 *  4 20
 *  40 80
 */
/** brail associate hex value
 *  1 8   1 8
 *  2 10  2 10
 *  4 20  4 20
 *  40 80 40 80
 */

// so first array is left brail pattern and second is right
const brailPatternHexValArray = [
    [ // 0
        [8, 1, 2, 4, 40, 80],
        [1, 8, 10, 20, 80, 40]
    ],
    [ // 1
        [40],
        [8, 10, 20, 80]
    ],
    [ // 2
        [1, 8, 20, 40, 80],
        [1, 8, 2, 40, 80]
    ],
    [ // 3
        [1, 8, 10, 80, 40],
        [1, 8, 10, 2, 20, 80, 40]
    ],
    [ // 4
        [10, 4, 20],
        [1, 2, 4, 40, 20]
    ],
    [ // 5
        [1, 8, 10, 2, 40, 80],
        [8, 1, 2, 10, 20, 80, 40]
    ],
    [ // 6
        [8, 1, 2, 4, 40, 80, 20],
        [8, 1, 40, 80, 20, 4]
    ],
    [ // 7
        [1, 8, 20, 40],
        [1, 8, 2]
    ],
    [ // 8
        [1, 8, 2, 10, 4, 40, 80],
        [8, 1, 2, 10, 20, 80, 40]
    ],
    [ // 9
        [1, 8, 2, 10, 80],
        [8, 1, 2, 10, 20, 80, 40]
    ],

]

const getNumberToBrail = (num) => {
    return numberUnicode[num]
}

const numberToBrailGrid = (number) => {
    const [firstPattern, secondPattern] = brailPatternHexValArray[number]
    const hexAddF = hexadd(...firstPattern);
    const hexAddS = hexadd(...secondPattern);
    const unicodeFirst = addHexToCreateBrailleUnicode(hexAddF);
    const unicodeSecond = addHexToCreateBrailleUnicode(hexAddS);
    // debugger
    const uniCaracterrF = toUnicode(unicodeFirst)
    const uniCaracterrS = toUnicode(unicodeSecond)
    return uniCaracterrF + uniCaracterrS

}

let toggle = true
setInterval(() => {
    const date = new Date();
    const hour = ("0" + date.getHours()).slice(-2)
    const min = ("0" + date.getMinutes()).slice(-2)
    const second = ("0" + date.getSeconds()).slice(-2)

    const brailHour = numberToBrailGrid(hour[0]) + numberToBrailGrid(hour[1])
    const brailMin = numberToBrailGrid(min[0]) + numberToBrailGrid(min[1])
    const brailSec = numberToBrailGrid(second[0]) + numberToBrailGrid(second[1])
    const brailEmpty = toUnicode(toggle ? '002D' : 2236)
    toggle = !toggle
    
    const fullDate = brailHour + brailEmpty + brailMin + brailEmpty + brailSec
    console.log('first', fullDate)
    updateUrl(fullDate)
}, 1000)
Array(10).fill(0).forEach((o, i) => {
    console.log('first', numberToBrailGrid(i))

})


