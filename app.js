const fs = require("fs")

const SINGLE_SPACE = " "
const DOUBLE_SPACE = "  "
const EMPTY_STRING = ""

var morseCodePavel = "..//-/..../../-./-.-//.--/.//.../..../---/..-/.-../-..//-.././-.-./../-.././/.--/..../../-.-./....//.../-.--/--/-.../---/.-..//-/---//..-/..././/..-./---/.-.//.../.--./.-/-.-././...//"
var morseCodeAlex = ". .       . - -   . .   . . .   . . . .       - . - -   - - -   . . -       . -   . - . .   . - . .       . -       - - .   - - -   - - -   - . .       . - -   .   .   - . -   .   - .   - . ."
var morseCodeAhmed = "-.. . -.-. .-. -.-- .--. - / -- -.-- / -- . ... ... .- --. ."
var morseCodeVeronika = "-   . . . .   .       - . .   . -   - . - -   . . .       - - .   - - -       . - .   - - -   . . -   - .   - . .       . -   - .   - . .       . - .   - - -   . . -   - .   - . .       . -   - .   - . .       . - .   - - -   . . -   - .   - . ."

var sentence = "Fuer unser eigenes encoding scheint jetzt 187 rasselbande alles gut zu klappen wir haben nur keine Zahlen bisher 256"
var morseCharacters = JSON.parse(fs.readFileSync("morseCharacters.json"))

let msgAhmed = normalizeMorseCode(morseCodeAhmed, /\s{1}/g, /\/{1}/g)
console.log(decodeMorseCode(msgAhmed))

let msgAlex = normalizeMorseCode(morseCodeAlex, /\s{3}/g, /\s{7}/g)
console.log(decodeMorseCode(msgAlex))

let msgVeronika = normalizeMorseCode(morseCodeVeronika, /\s{3}/g, /\s{7}/g)
console.log(decodeMorseCode(msgVeronika))

let msgPavel = normalizeMorseCode(morseCodePavel, /\/{1}/g, /\/{2}/g)
console.log(decodeMorseCode(msgPavel))

console.log(decodeMorseCode(encodeSentence(sentence)))
// console.log(decodeMorseCode(".... .- .-.. .-.. ---  .-- --- .-. .-.. -.."))
// console.log(encodeWord('12lol'))
// fs.writeFileSync("text.txt", encodeSentence(sentence))

// Encoding:
// Dot: . Dash: -
// There are 0 spaces within an encoded letter
// There is 1 space between encoded letters
// Encoded Words have 2 spaces between them

function encodeSentence(sentence){
    // Remove unknown chars
    sentence = sentence.toLowerCase().replace(/[^a-z 0-9]/g, "");

    let words = sentence.split(' ')
    let string = ""
    words.forEach(word => {
        string += `${encodeWord(word)}${SINGLE_SPACE}`
    })
    return string
}

function encodeWord(phrase){
    let string = ""
    for (i = 0; i < phrase.length; i++) {
        let charCode = phrase.charCodeAt(i);
        // Take corresponding morse code to charCode
        let code
        if (charCode >= 48 && charCode <= 57){
            code = morseCharacters.numbers[charCode -48]
        } else {
            code = morseCharacters.letters[charCode - 97]
        }
        
        string += `${code}${SINGLE_SPACE}`
    } 
    return string
}

function decodeMorseCode(morseCode) {
    let morseWords = morseCode.split(DOUBLE_SPACE)
    let string = ""
    morseWords.forEach(word => {
        string += decodeMorseWord(word)
    })
    return string
}

function decodeMorseWord(morseWord) {
    let characters = morseWord.split(SINGLE_SPACE)
    let word = ""
    characters.forEach( char => {
        let position = morseCharacters.letters.indexOf(`${char}`)
        if (position == -1) {
            position = morseCharacters.numbers.indexOf(`${char}`)
            character = position != -1 ? String.fromCharCode(position + 48) : EMPTY_STRING
        } else {
            character = String.fromCharCode(position + 97)
        }
        
        word += character 
    })
    return word + SINGLE_SPACE
}

function transformPavelsCode(code) {
    let transformed = code.replace(/\/{2}/g, DOUBLE_SPACE)
    transformed = transformed.replace(/\/{1}/g, SINGLE_SPACE)
    console.log(transformed)
    return transformed
}

function transformAlexCode(code) {
    let transformed = code.replace(/\s{7}/g, "A")
    transformed = transformed.replace(/\s{3}/g, "Z")
    transformed = transformed.replace(/\s{1}/g, EMPTY_STRING)

    transformed = transformed.replace(/A+/g, DOUBLE_SPACE)
    transformed = transformed.replace(/Z+/g, SINGLE_SPACE)

    console.log(transformed)
    return transformed
}

function transformAhmedCode(code) {
    let transformed = code.replace(/\/{1}/g, DOUBLE_SPACE)

    console.log(transformed)
    return transformed
}

function normalizeMorseCode(code, letterSpacingRegEx, wordSpacingRegEx) {
    let transformed = code.replace(wordSpacingRegEx, "A")
    transformed = transformed.replace(letterSpacingRegEx, "Z")
    transformed = transformed.replace(/\s{1}/g, EMPTY_STRING)

    transformed = transformed.replace(/A+/g, DOUBLE_SPACE)
    transformed = transformed.replace(/Z+/g, SINGLE_SPACE)

    console.log(transformed)
    return transformed
}