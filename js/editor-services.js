'use strict'
const KEY = 'memesDB'
var gMeme = []

function getMeme() {
    return gMeme
}

function getCurrentTxt() {
    var idxLine = gMeme.selectedLineIdx
    return gMeme.lines[idxLine]
}

function createMeme(id) {
    gMeme = {
        selectedImgId: id,
        selectedLineIdx: 0,
        lines: [{
            txt: 'Enjoy your meme',
            size: 20,
            align: 'center',
            color: 'white',
            pos: {
                x: 200,
                y: 25
            },
            font: 'impact',
        }],
    }
}

function createTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function removeLineTxt() {
    var idxLine = gMeme.selectedLineIdx
    if (gMeme.lines.length === 1) return
    gMeme.lines.splice(idxLine, 1)
    gMeme.selectedLineIdx = 0
}


function addText() {
    gMeme.selectedLineIdx++
    var newLine = {
        txt: 'Your text here',
        size: 20,
        align: 'center',
        color: 'white',
        pos: newTextPosition(gMeme.lines.length),
        font: 'impact',
    }
    gMeme.lines.push(newLine)
}

function newTextPosition(idx) {
    switch (idx) {
        case 1:
            return {
                x: 200,
                    y: 140
            }
            case 2:
                return {
                    x: 200, y: 80
                }
                default:
                    return {
                        x: 200,
                            y: 80
                    }
    }
}

function switchLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else {
        gMeme.selectedLineIdx++
    }
}


function setFontSize(diff) {
    var currLine = getCurrentTxt()
    currLine.size += diff
}

function setDirectionAlign(alignKey) {
    var currLine = getCurrentTxt()
    currLine.align = alignKey
}

function moveTxt(diff) {
    var currLine = getCurrentTxt()
    currLine.pos.y += diff
}


function loadMemes() {
    var meme = loadFromStorage(KEY)
    if (!meme) return
    gMeme = meme
}


function _saveMemesToStorage() {
    saveToStorage(KEY, gMeme)
}


// function getMemeByImg(imgContent) {
//     var memes = getMemesFromStorage()
//     return memes.find(function (meme) {
//         return meme.imgContent === imgContent
//     })
// }

function setFont(font) {
    var currLine = getCurrentTxt()
    currLine.font = font
}