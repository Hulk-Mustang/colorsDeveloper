const cols = document.querySelectorAll('.col ')

document.addEventListener('keydown', event =>{
    event.preventDefault()
    if(event.code.toLocaleLowerCase() == 'space'){
        setRandomColors()
    }
})

document.addEventListener('click', (event) => {
    const type = event.target.dataset.type

    if(type == 'lock'){
        const node = event.target.tagName.toLocaleLowerCase() == 'i' ? event.target : event.target.children[0]
        
        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    }else if(type == 'copy'){
        copy(event.target.textContent)
    }
})

function copy(text){
    return navigator.clipboard.writeText(text)
}

function generetColors(){
    const colors = '0123456789ABCDEF'
    let sinka = ''
    for(let i = 0; i < 6; i++){
        sinka += colors[Math.floor(Math.random() * colors.length)]
    }
    return '#' + sinka
}

function setRandomColors(){
     cols.forEach((col) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        const button = col.querySelector('button')
        const color = generetColors()

        if(isLocked){
            return
        }

        text.textContent = color
        col.style.background = chroma.random()

        setTextColor(text,color)
        setTextColor(button,color)
     })
}

function setTextColor(text, color){
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

setRandomColors()