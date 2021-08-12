'use strict'

const savToStorage = (key, val) => {
    var json = JSON.stringify(val)
    localStorage.setItem(key, json)
}

const loadFromStorage = key => {
    var json = localStorage.getItem(key)
    var val = JSON.parse(json)
    return val
}