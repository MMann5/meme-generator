'use strict'
var gMeme;


const createMeme = id => {
    gMeme = {
        selectedImgId: id,
        selectedLineIdx: 0,
        lines: [{
            txt: 'text number : 1',
            size: 25,
            align: 'center',
            color: 'black',
            pos: {
                x: gCanvas.width / 2,
                y: gCanvas.height / 12
            },
            font: 'impact',
        }],
    }
}

const createTxt = txt => {
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
        txt: `text number : ${gMeme.selectedLineIdx +1 }`,
        size: 25,
        align: 'center',
        color: 'black',
        pos: textPosition(gMeme.lines.length),
        font: 'impact',
    }
    gMeme.lines.push(newLine)
}

const setColor = value => {
    var currLine = getCurrentTxt()
    currLine.color = value
}

const textPosition = idx => {
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

const setFontSize = diff => {
    var currLine = getCurrentTxt()
    currLine.size += diff
}

const setDirectionAlign = key => {
    var currLine = getCurrentTxt()
    currLine.align = key
}

const moveTxt = diff => {
    var currLine = getCurrentTxt()
    currLine.pos.y += diff
}

const setFont = font => {
    var currLine = getCurrentTxt()
    currLine.font = font
}

const imgInputUser= url => {
    var images = getImages()
    var newImg = {
        id: images.length+1,
        url: url.src,
    }
    images.push(newImg)
    return newImg
}

const getMeme = () => {
    return gMeme
}

const getCurrentTxt = () => {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function setSavedMeme(meme) {
    gMeme = meme
}