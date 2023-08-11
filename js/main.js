// NEXT STEPS:
// Alinhar o TEMPO do BULLET com o - TEMPO do PIPE de acordo com o nível adequado

//Botão de restart do jogo e Audio principal do jogo 
const restartButton = document.querySelector('.restart');
const audioMainGame = new Audio('./sounds/Toad House Theme - New Super Mario Bros. Wii.mp3')

const animationGame = () => {
    // Declaração de constantes
    const mario = document.querySelector('.mario');
    const pipe = document.querySelector('.pipe');
    const clouds = document.querySelector('.clouds');
    const bullet = document.querySelector('.bullet');
    const gameoverTitle = document.querySelector('.game-over');
    let points = 0

    // Função que aciona o pulo do Mario
    const jump = () => {
        mario.classList.add('jump');
        const audioJump = new Audio ('./sounds/Super Mario World - Jump.mp3')
        audioJump.volume = 0.5;
        audioJump.play();

        setTimeout(()=> {
            mario.classList.remove('jump');
        }, 600)
    };

    // Função de agachar
    const crouch = () =>{
        mario.src = './imgs/mario-crouch.png'
        mario.classList.add('mario-crouch');
    }

    // Variável de verificação - se o personagem morreu ou não
    let isDead = false;

    // Função de levantar - retirando o que foi adicionado no "agachar"
    const marioUp = () => {
        if(isDead == true){
            mario.src = "./imgs/game-over.png"
        }
        else{
            mario.classList.remove('mario-crouch')
            mario.src = './imgs/mario.gif'
        }
    }
    
    // Lógica do loop, nuvems, personagem, pipe, bullet
    const loop = setInterval(() =>{
    
        // Declaração de váriaveis e constantes
        let pipePosition = pipe.offsetLeft;
        let bulletPosition = bullet.offsetLeft;
        const bulletPositionTop = +window.getComputedStyle(bullet).top.replace('px', '')
        const cloudsPosition = +window.getComputedStyle(clouds).left.replace('px', '');
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        const marioPositionTop = +window.getComputedStyle(mario).top.replace('px', '');
    
        // console.log("Essa é a distancia do topo da BALA: " + bulletPositionTop)
        // console.log("Essa é a distancia do topo do MARIO: marioPositionTop" + marioPositionTop)

        // Verificação da distância do personagem para os objetos
        // Verificação da posição do MARIO e do PIPE
        if(
            pipePosition <= 120 
            && pipePosition > 0 
            && marioPosition < 80
        ){
            // Mudança da variável de morte do personagem
            isDead = true;

            pipe.style.animation = 'none';
            pipe.style.left = '120px';
    
            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;
    
            mario.src = "./imgs/game-over.png"
            mario.style.width = '75px'
            mario.style.marginLeft = '50px'
    
            clouds.style.animation = 'none';
            clouds.style.left = `${cloudsPosition}px`;

            bullet.style.animation = 'none';
            bullet.style.left = `${bulletPosition}px`

            restartButton.style.display = 'block';
            gameoverTitle.style.display = 'block';

            audioMainGame.pause();
            const audioDeath = new Audio('./sounds/GameOver_NewSuperMarioBros.mp3');
            audioDeath.volume = 0.4;
            audioDeath.play();

            clearInterval(loop)
        }
        // Verificação da posição do MARIO e do BULLET
        else if(
            bulletPosition <= 110
            && marioPositionTop < bulletPositionTop
            && marioPosition < 80
        ){
            isDead = true;

            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;
    
            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;
    
            mario.src = "./imgs/game-over.png"
            mario.style.width = '75px'
            mario.style.marginLeft = '50px'
    
            clouds.style.animation = 'none';
            clouds.style.left = `${cloudsPosition}px`;

            bullet.style.animation = 'none';
            bullet.style.left = '120px';

            restartButton.style.display = 'block';
            gameoverTitle.style.display = 'block';

            audioMainGame.pause();
            const audioDeath = new Audio('./sounds/GameOver_NewSuperMarioBros.mp3');
            audioDeath.volume = 0.4;
            audioDeath.play();

            clearInterval(loop)
        }

        else{
            // Lógica da contagem de pontos
            const score = document.querySelector('.score');
            points++
            score.innerHTML = `SCORE:${points}`;

            // Lógica de aumento de velocidade da animação e nível de dificuldade
            // NÍVEL 1
            if(points > 1000 && pipePosition < -74){
                pipe.classList.remove('pipe-level-1');
                pipe.classList.add('pipe-level-2');

                bullet.classList.add('bullet-level-1');
                console.log('Estou no level 1!')

                if(cloudsPosition < -350){
                    clouds.style.animation = 'clouds-animation 10s infinite linear'
                }
            }
            // NÍVEL 2
            if(points > 2000 && pipePosition < -74){
                pipe.classList.remove('pipe-level-2');
                pipe.classList.add('pipe-level-3');

                if(bulletPosition < 150){
                    console.log('Estou no level 2!')
                    bullet.classList.remove('bullet-level-1');
                    bullet.classList.add('bullet-level-2');                
                }
            }
            // NÍVEL 3
            if(points > 3000 && pipePosition < -74){
                pipe.classList.remove('pipe-level-3');
                pipe.classList.add('pipe-level-4');

                if(bulletPosition < 150){
                    console.log('Estou no level 3!')
                    bullet.classList.remove('bullet-level-2');
                    bullet.classList.add('bullet-level-3');
                }
            }

            // NÍVEL 4
            if(points > 5000 && pipePosition < -74){
                pipe.classList.remove('pipe-level-4');
                pipe.classList.add('pipe-level-5');

                if(bulletPosition < 150){
                    console.log('Estou no level 4!')
                    bullet.classList.remove('bullet-level-3');
                    bullet.classList.add('bullet-level-4');
                }
            }
        }
    }, 10);
    
    // Captando evento de tecla pressionada (para PULAR e AGACHAR)
    document.addEventListener('keydown', (event) => {
        if(event.keyCode == 38 || event.keyCode == 32 || event.keyCode == 87){
            jump();
        }
        else if (event.keyCode == 40 || event.keyCode == 83){
            crouch();
        }
    });
    
    // Captando evento de tecla que foi pressionada e levantada em seguida (retirando 'agachar' do personagem)
    document.addEventListener('keyup', (event) => {
        if(event.keyCode == 40 || event.keyCode == 83){
            marioUp();
        }
    })
}

// Adicionando botão de START, configurações de áudio e iniciando o jogo
const instructions = document.querySelector('.instructions');
const start = document.querySelector('.start');
start.focus();
start.addEventListener('click', () => {
    start.style.display = 'none';
    instructions.style.display = 'none';

    audioMainGame.loop = true;
    audioMainGame.volume = 0.3;
    audioMainGame.play();

    animationGame();
})


// Adicionando botão de RESTART que atualiza a página para reiniciar o JOGO
restartButton.addEventListener('click', () => {
    restartButton.style.display = 'none';
    window.location.reload(true);
})

// **Ideia, criar uma animação para cada fase e novo nível/aumento de nível