

function showElement(elementId) {
    let element = document.getElementById(elementId)
    console.log(element)
    if(element.style.display == "block"){
        element.style.display = "none"
    }
    else {
        element.style.display = "block"
    }
}



