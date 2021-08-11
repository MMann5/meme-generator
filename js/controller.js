'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gCanvas;
var gCtx
var gBeginPos

function onInit() {
    gCanvas = document.querySelector('#canvas-edit')
    gCtx = gCanvas.getContext('2d')
    resizeCanvas()
    renderImages()
}

function renderImages() {
    var imgs = getImages()
    var key = getFilter()
    if (key) {
        imgs = gImgages.filter(img => {
            return img.keywords.some(function (keyword) {
                return keyword.includes(key)
            })
        })
    }
    var strHTML = imgs.map(img => {
        return `<img class="meme-canevas" onclick="openInCanvas(${img.id})" src="${img.url}"></img>`
    })
    document.querySelector('.pictures-container').innerHTML = strHTML.join('')
}


function renderCanvas() {
    var meme = getMeme()
    var img = new Image()
    img.src = getImageById(meme.selectedImgId).url
    img.onload = () => {
        clearCanvas()
        setInputText()
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        meme.lines.forEach(line => {
            drawText(line, line.pos.x, line.pos.y)
            drawRect()
        });
    }
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function onFilter() {
    renderImages()
}


// function addListeners() {
//     addMouseListeners()
//     addTouchListeners()
// }

// function addMouseListeners() {
//     gCanvas.addEventListener('mousemove', onMove)
//     gCanvas.addEventListener('mousedown', onDown)
//     gCanvas.addEventListener('mouseup', onUp)
// }

// function addTouchListeners() {
//     gCanvas.addEventListener('touchmove', onMove)
//     gCanvas.addEventListener('touchstart', onDown)
//     gCanvas.addEventListener('touchend', onUp)
// }

function resizeCanvas() {
    // gCanvas.style.width = '100%'
    // gCanvas.style.height = '100%'
    var elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth - 20
}

function onCreateTxt(txt) {
    console.log('txt');
    createTxt(txt)
    renderCanvas()
}


function onAddText() {
    console.log('add');
    addText()
    renderCanvas()
    focusInput()
}

function onRemoveLineTxt() {
    console.log('remove');
    removeLineTxt()
    renderCanvas()
}

function onSwitch() {
    console.log('weh');
    switchLine()
    renderCanvas()
}

function onSetFontSize(diff) {
    console.log('sizeeee');
    setFontSize(diff)
    renderCanvas()
}

function onSetDirectionAlign(alignKey) {
    console.log('bjr');
    setDirectionAlign(alignKey)
    renderCanvas()
}

function onSetFont(font) {
    setFont(font)
    renderCanvas()
}

function onMoveTxt(diff) {
    console.log('move');
    moveTxt(diff)
    renderCanvas()
}

function openPage(pageName) {
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

function addActive(elPage) {
    var elPages = document.querySelectorAll('.header-page')
    elPages.forEach((elPage) => {
        elPage.classList.remove('active')
    })
    elPage.classList.add('active')
}

function openInCanvas(id) {
    openPage('editor')
    resizeCanvas()
    createMeme(id)
    renderCanvas()
    // selectInput()
    focusInput()
}

function focusInput() {
    var elInput = document.querySelector('.meme-text')
    elInput.focus()
    elInput.innerHTML = ''
}

// function selectInput() {
//     var elInput = document.querySelector('.meme-text')
//     elInput.select()
// }



function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

// function onAddUserImg(img) {
//     const addedImg = addUserImg(img)
//     createMeme(addedImg.id)
//     renderCanvas()
// }

function setInputText() {
    var meme = getMeme()
    document.querySelector('.meme-text').value = meme.lines[meme.selectedLineIdx].txt
}

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = function (event) {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
}

function drawText(line, x, y) {
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.textAlign = line.align
    gCtx.fillText(line.txt, x, y)
    gCtx.strokeText(line.txt, x, y)
}

function drawRect() {
    var meme = getMeme()
    if (meme.isPrint) return
    var currLine = getCurrentTxt()
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(2, currLine.pos.y - currLine.size, gCanvas.width - 5, currLine.size + 5)
}