'use strict'
const KEY = 'memesDB'
var gMeme = []
var gColor;

const getMeme = () => {
    return gMeme
}

const getCurrentTxt = () => {
    var idxLine = gMeme.selectedLineIdx
    return gMeme.lines[idxLine]
}

const createMeme = (id) => {
    gMeme = {
        selectedImgId: id,
        selectedLineIdx: 0,
        lines: [{
            txt: 'Enjoy your meme',
            size: 30,
            align: 'center',
            color: gColor,
            pos: {
                x: gCanvas.width / 2,
                y: gCanvas.height / 12
            },
            font: 'impact',
        }],
    }
}

const createTxt = (txt) => {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

const removeLineTxt = () => {
    var idxLine = gMeme.selectedLineIdx
    if (gMeme.lines.length === 1) return
    gMeme.lines.splice(idxLine, 1)
    gMeme.selectedLineIdx = 0

}

const addText = () => {
    gMeme.selectedLineIdx++
    var newLine = {
        txt: 'Your text here',
        size: 30,
        align: 'center',
        color: gColor,
        pos: textPosition(gMeme.lines.length),
        font: 'impact',
    }
    gMeme.lines.push(newLine)
}

const setColor = () => {
    var elCol = document.querySelector('.color').value
    gColor = elCol
}

const getColor = () => {
    return gColor
}

const textPosition = (idx) => {
    if (idx === 1) return {
        x: gCanvas.width / 2,
        y: 380
    }
    else if (idx === 2) return {
        x: gCanvas.width / 2,
        y: gCanvas.height / 2
    }
    else {
        return {
            x: gCanvas.width / 2,
            y: gCanvas.height / 2
        }
    }
}

const switchLine = () => {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else {
        gMeme.selectedLineIdx++
    }
}

const setFontSize = (diff) => {
    var currLine = getCurrentTxt()
    currLine.size += diff
}

const setDirectionAlign = (alignKey) => {
    var currLine = getCurrentTxt()
    currLine.align = alignKey
}

const moveTxt = (diff) => {
    var currLine = getCurrentTxt()
    currLine.pos.y += diff
}

const setFont = (font) => {
    var currLine = getCurrentTxt()
    currLine.font = font
}

const loadMemes = () => {
    var meme = loadFromStorage(KEY)
    if (!meme) return
    gMeme = meme
}


const _saveMemesToStorage = () => {
    saveToStorage(KEY, gMeme)
}