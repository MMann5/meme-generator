'use strict'

var gCurrLang = 'en';
var gTrans = {
    category: {
        en: 'Categories',
        he: 'קטגוריות'
    },
    politic: {
        en: 'POLITIC',
        he: 'פוליטיקה'
    },
    animals: {
        en: 'ANIMALS',
        he: 'בעלי חיים'
    },
    funny: {
        en: 'FUNNY',
        he: 'מצחיק'
    },
    kids: {
        en: 'KIDS',
        he: 'ילדים'
    },
    movie: {
        en: 'MOVIE',
        he: 'סרט'
    },
    gallery: {
        en: 'Gallery',
        he: 'גלריה'
    },
    editor: {
        en: 'Editor',
        he: 'סדנה'
    },
    upload: {
        en: 'Upload',
        he: 'להעלות'
    },
    download: {
        en: 'Download',
        he: 'להוריד'
    },
    credits: {
        en: '© Michael Mann',
        he: '© מיכאל מן '
    },
}

const getTrans = transKey => {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN'
    var txt = keyTrans[gCurrLang]
    if (!txt) txt = keyTrans['en']
    return txt;
}

const doTrans = () => {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach((el) => {
        var txt = getTrans(el.dataset.trans)
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt)
        } else {
            el.innerText = txt
        }
    })
}

const setLang = lang => {
    gCurrLang = lang;
}