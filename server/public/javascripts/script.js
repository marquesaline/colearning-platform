// menu mobile
function toggleMenu (elementId) {
    const element = document.getElementById(elementId)

    element.classList.toggle('active')

}
// função p/ exibir opção de reunião presencial na tela de criar agenda
function showElement(elementId, elementToShow) {
    let element = document.getElementById(elementId).value
    let elementShow = document.getElementById(elementToShow)
    
    if(element == "person"){
        elementShow.style.display = "block"
    }
    else {
        elementShow.style.display = "none"
    }
}

// funcão p/ exibir dropdown do usuário no header
function showDropdown( elementToShow) {
    let elementShow = document.getElementById(elementToShow)
    if(elementShow.style.display == "none") {
        elementShow.style.display = "block"
    }
    else {
        elementShow.style.display = "none"
    }
}