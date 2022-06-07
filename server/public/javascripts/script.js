// menu mobile

function toggleMenu (elementId) {
    const element = document.getElementById(elementId)

    element.classList.toggle('active')

}

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