'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gCanvas;
var gCtx
var gBeginPos

const onInit = () => {
    gCanvas = document.querySelector('#canvas-edit')
    gCtx = gCanvas.getContext('2d')
    window.addEventListener('resize', (ev) => {
        resizeCanvas()
    })
    renderImages()
    doTrans()
    // addListeners()
}


const renderImages = () => {
    var imgs = getImages()
    var key = getFilter()
    if (key) {
        imgs = gImgages.filter((img) => {
            return img.keywords.some((keyword) => {
                return keyword.includes(key)
            })
        })
    }
    var strHTML = imgs.map(img => {
        return `<img class="meme-canevas zoom overlay" onclick="openInCanvas(${img.id})" src="${img.url}"></img>`
    })
    document.querySelector('.pictures-container').innerHTML = strHTML.join('')
}

const onSetLang = (lang) => {
    setLang(lang);
    if (lang === 'he') {
        document.body.classList.add('rtl')
    } else {
        document.body.classList.remove('rtl')
    }
    doTrans();
    render();
}

const renderCanvas = () => {
    var meme = getMeme()
    var img = new Image()
    img.src = getImageById(meme.selectedImgId).url
    img.onload = () => {
        getColor()
        clearCanvas()
        setInputText()
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        meme.lines.forEach((line) => {
            drawText(line, line.pos.x, line.pos.y)
            drawRect()
        });
    }
}

const renderImg = (img) => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

const onFilter = () => {
    renderImages()
}

const resizeCanvas = () => {
    var elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth - 10
}

const onCreateTxt = (txt) => {
    createTxt(txt)
    renderCanvas()
}


const onAddText = () => {
    addText()
    renderCanvas()
}

const onRemoveLineTxt = () => {

    removeLineTxt()
    renderCanvas()
}

const onSwitch = () => {
    switchLine()
    renderCanvas()
}

const onSetFontSize = (diff) => {
    setFontSize(diff)
    renderCanvas()
}

const onSetDirectionAlign = (alignKey) => {
    setDirectionAlign(alignKey)
    renderCanvas()
}

const onSetFont = (font) => {
    setFont(font)
    renderCanvas()
}

const onMoveTxt = (diff) => {
    moveTxt(diff)
    renderCanvas()
}

const openPage = (pageName) => {
    var gallery = 'none'
    var editor = 'none'
    switch (pageName) {
        case 'gallery':
            var gallery = 'block'
            addActive(document.querySelector('.gallery-page'))
            renderImages()
            break;
        case 'editor':
            var editor = 'flex'
            addActive(document.querySelector('.editor-page'))
            break;
    }
    document.querySelector('.gallery').style.display = gallery
    document.querySelector('.editor').style.display = editor
}

const addActive = (elPage) => {
    var elPages = document.querySelectorAll('.header-page')
    elPages.forEach((elPage) => {
        elPage.classList.remove('active')
    })
    elPage.classList.add('active')
}

const openInCanvas = (id) => {
    openPage('editor')
    resizeCanvas()
    createMeme(id)
    renderCanvas()
}


const clearCanvas = () => {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

const setInputText = () => {
    var meme = getMeme()
    document.querySelector('.meme-text').value = meme.lines[meme.selectedLineIdx].txt
}

const downloadImg = (elLink) => {
    var imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

const onImgInput = (ev) => {
    loadImageFromInput(ev, renderImg)
}

const loadImageFromInput = (ev, onImageReady) => {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = function (event) {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
}

const onSetColor = () => {
    setColor()
    drawText()
}

const drawText = (line, x, y) => {
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.textAlign = line.align
    gCtx.fillText(line.txt, x, y)
    gCtx.strokeText(line.txt, x, y)
}

const drawRect = () => {
    var currLine = getCurrentTxt()
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(2, currLine.pos.y - currLine.size, gCanvas.width - 5, currLine.size + 5)
}