const mario = document.querySelector('.super-mario')
const pipe = document.querySelector('.pipe-game')
const score = document.querySelector('#score')
const gameover = document.querySelector('#gameOver')
const restart = document.querySelector('#restart')
const menu = document.querySelector('#menu')
const music = document.querySelector('#musictheme')
const jumpSound = document.querySelector('#audioJump')
const musicdeath = document.querySelector('#audioMorte')


const jump = () => {
    mario.classList.add('jump-mario')
    jumpSound.play()

    setTimeout(() => {
        mario.classList.remove('jump-mario')
    }, 500)
}


let intervalScore = null
let playerScore = 0

const scoreCounter = () => {
    playerScore++
    score.innerHTML = `Score: ${playerScore}`
    return
}

//A variável internalScore recebe o método setInterval que executa a função scoreCounter de 400ms em 400ms
intervalScore = setInterval(scoreCounter, 400)

const loopGame = setInterval(() => {
    const pipePosition = pipe.offsetLeft
    const marioPosition = +window
        .getComputedStyle(mario)
        .bottom.replace("px", "")

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = "none"
        pipe.style.left = `${pipePosition}px`

        
        mario.style.bottom = `${marioPosition}px`

        mario.src = "./imagens/mario-game-over.png"
        mario.classList.add('mario-morte')
        musicdeath.play()
        music.pause()
        

        clearInterval(intervalScore) //esse método para de executar a função scoreCounter que está na variável internalScore
        gameover.style.display = "block"
        restart.style.display = "block"
        menu.style.display = "block"
        mario.style.width = "75px";
        mario.style.marginLeft = "45px";

        clearInterval(loopGame)
    }
}, 10)

document.addEventListener('keydown', jump)

