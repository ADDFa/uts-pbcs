const el = element => document.querySelector(`${element}`)
const elAll = element => document.querySelectorAll(`${element}`)

const xhr = new XMLHttpRequest
const xhrReady = function (func) {
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status) func(xhr.response)
    }
}

const date = new Date
const yearNow = date.getFullYear()
const monthNow = date.getMonth() + 1

const form = new FormData()