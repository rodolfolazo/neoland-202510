// dom (general purpose)

function createElement(tagName) {
    return document.createElement(tagName)
}

function changeDisplay(element, value) {
    element.style.display = value
}

function setTextContent(element, text) {
    element.textContent = text
}

function addChild(element, childElement) {
    element.appendChild(childElement)
}

function removeChild(element, childElement) {
    element.removeChild(childElement)
}

function setClass(element, value) {
    element.className = value
}

function addClass(element, value) {
    element.classList.add(value)
}

function removeClass(element, value) {
    element.classList.remove(value)
}

function createTextNode(text) {
    return document.createTextNode(text)
}

function setFor(element, value) {
    element.htmlFor = value
}

function setId(element, value) {
    element.id = value
}

function setType(element, value) {
    element.type = value
}

function getType(element) {
    return element.type
}

function getValue(element) {
    return element.value
}

function reset(element) {
    element.reset()
}

function setSource(element, value) {
    element.src = value
}

function setStep(element, value) {
    element.step = value
}

function setHref(element, value) {
    element.href = value
}

// interface (application specific)

function createView() {
    const view  = createElement('div')
    setClass(view, 'p-4')

    return view
}

function hideView(view) {
    changeDisplay(view, 'none')
}

function showView(view) {
    changeDisplay(view, '')
}

function createTitle() {
    const title = createElement('h1')
    setClass(title, 'font-bold text-xl uppercase tracking-widest mb-2')

    return title
}

function createTitle2() {
    const title2 = createElement('h2')
    setClass(title2, 'font-bold italic font-mono mb-4')

    return title2
}

function createParagraph() {
    const paragraph = createElement('p')
    setClass(paragraph, 'mb-2')

    return paragraph
}

function createNavigation() {
    return createElement('nav')
}

function createLink() {
    const link = createElement('a')
    setClass(link, 'cursor-pointer font-semibold underline hover:no-underline hover:font-bold')

    return link
}

function createForm() {
    return createElement('form')
}

function createLabel() {
    return createElement('label')
}

function createInput() {
    const inputForm = createElement('input')
    setClass(inputForm, 'w-3/4 border px-1')

    return inputForm
}

function createButton() {
    const button =  createElement('button')
    setClass(button, 'bg-slate-600 hover:bg-slate-950 text-white px-1 mt-4')

    return button
}

function createPanel() {
    return createElement('div')
}

function createUnorderedList() {
    return createElement('ul')
}

function createListItem() {
    return createElement('li')
}

function createImage() {
    return createElement('img')
}