'use strict'

var gSortBy = 'all'


var gImgages = [{
        id: 1,
        url: 'img/1.jpg',
        keywords: ['politic', 'all']
    },
    {
        id: 2,
        url: 'img/2.jpg',
        keywords: ['animals', 'all']
    },
    {
        id: 3,
        url: 'img/3.jpg',
        keywords: ['animals', 'kids', 'all']
    },
    {
        id: 4,
        url: 'img/4.jpg',
        keywords: ['animals', 'all']
    },
    {
        id: 5,
        url: 'img/5.jpg',
        keywords: ['kids', 'all']
    },
    {
        id: 6,
        url: 'img/6.jpg',
        keywords: ['funny', 'all']
    },
    {
        id: 7,
        url: 'img/7.jpg',
        keywords: ['kids', 'all']
    },
    {
        id: 8,
        url: 'img/8.jpg',
        keywords: ['funny', 'all']
    },
    {
        id: 9,
        url: 'img/9.jpg',
        keywords: ['baby', 'funny', 'all']
    },
    {
        id: 10,
        url: 'img/10.jpg',
        keywords: ['politic', 'funny', 'all']
    },
    {
        id: 11,
        url: 'img/11.jpg',
        keywords: ['funny', 'all']
    },
    {
        id: 12,
        url: 'img/12.jpg',
        keywords: ['funny', 'all']
    },
    {
        id: 13,
        url: 'img/13.jpg',
        keywords: ['movie', 'all']
    },
    {
        id: 14,
        url: 'img/14.jpg',
        keywords: ['movie', 'all']
    },
    {
        id: 15,
        url: 'img/15.jpg',
        keywords: ['movie', 'all']
    },
    {
        id: 16,
        url: 'img/16.jpg',
        keywords: ['movie', 'funny', 'all']
    },
    {
        id: 17,
        url: 'img/17.jpg',
        keywords: ['politic', 'all']
    },
    {
        id: 18,
        url: 'img/18.jpg',
        keywords: ['movie', 'all']
    },
]

var gKeywords = [{
        key: 'Politic'
    },
    {
        key: 'Animals'
    },
    {
        key: 'kids'
    },
    {
        key: 'funny'
    },

]

const getKeywords = () => {
    return gKeywords
}

const getImageById = imgId => {
    return gImgages.find(img => img.id === imgId)
}

const getImages = () => {
    return gImgages
}

const getFilter = () => {
    gSortBy = document.querySelector('#pictures').value
    return gSortBy
}