// g. Controle a velocidade do letreiro (em pixels por frame de atualização)
const VELOCIDADE_NORMAL = 1; 
const VELOCIDADE_RAPIDA = 4; // Velocidade maior para o hover
const CORES = ["#ff1493", "#32cd32", "#1e90ff", "#ffa500", "#9400d3"]; // Cores divertidas

let letreiro;
let container;
let posicaoX = 0; 
let direcao = 1; 
let animacaoFrameId; // ID da animação para poder cancelar (pausar)
let estaPausado = false;
let velocidadeAtual = VELOCIDADE_NORMAL;

document.addEventListener('DOMContentLoaded', () => {
    letreiro = document.getElementById('letreiro');
    container = letreiro.parentElement;
    
    // Adiciona interatividade de clique (Pausar/Continuar)
    letreiro.addEventListener('click', togglePause);
    
    // Adiciona interatividade de hover (Acelerar/Desacelerar)
    letreiro.addEventListener('mouseenter', () => velocidadeAtual = VELOCIDADE_RAPIDA);
    letreiro.addEventListener('mouseleave', () => velocidadeAtual = VELOCIDADE_NORMAL);

    iniciarAnimacao();
});

function iniciarAnimacao() {
    if (!estaPausado) {
        animacaoFrameId = requestAnimationFrame(animarLetreiro);
    }
}

function pararAnimacao() {
    if (animacaoFrameId) {
        cancelAnimationFrame(animacaoFrameId);
        animacaoFrameId = null;
    }
}

function togglePause() {
    estaPausado = !estaPausado;
    if (estaPausado) {
        pararAnimacao();
        // Feedback visual: Mudar cor e texto ao pausar
        letreiro.style.color = "#ff0000"; // Vermelho ao pausar
        letreiro.textContent = "[PAUSADO] Clique para Continuar!";
        letreiro.style.transform = 'scale(1.1)'; // Destaca que está pausado
    } else {
        // Retorna ao estado normal e continua
        letreiro.textContent = "Acredite no seu potencial e a mudança acontecerá.";
        letreiro.style.transform = 'scale(1)';
        iniciarAnimacao();
    }
}

function mudarCorAleatoria() {
    const corAtual = letreiro.style.color;
    let novaCor;
    do {
        // Escolhe uma cor aleatória diferente da cor atual
        const indiceAleatorio = Math.floor(Math.random() * CORES.length);
        novaCor = CORES[indiceAleatorio];
    } while (novaCor === corAtual);

    letreiro.style.color = novaCor;
}

function animarLetreiro() {
    const larguraLetreiro = letreiro.offsetWidth;
    const larguraContainer = container.offsetWidth;
    const limiteDireita = larguraContainer - larguraLetreiro;
    
    // 1. Atualiza a posição X usando a velocidade atual (normal ou rápida)
    posicaoX += direcao * velocidadeAtual;

    // 2. Verifica e inverte a direção (Efeito Ping-Pong)
    let inverteu = false;
    if (posicaoX >= limiteDireita) {
        direcao = -1;
        posicaoX = limiteDireita; 
        inverteu = true;
    } else if (posicaoX <= 0) {
        direcao = 1;
        posicaoX = 0; 
        inverteu = true;
    }

    // Ação Interativa: Mudar a cor ao inverter a direção
    if (inverteu) {
        mudarCorAleatoria();
    }

    // 3. Aplica a nova posição (melhor performance)
    letreiro.style.transform = `translateX(${posicaoX}px) scale(${letreiro.style.transform.includes('scale') ? 1.05 : 1})`;

    // 4. Continua o loop no próximo frame se não estiver pausado
    animacaoFrameId = requestAnimationFrame(animarLetreiro);
}