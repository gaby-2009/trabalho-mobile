// g. Controle a velocidade do letreiro (em pixels por frame de atualização)
const VELOCIDADE_PX = 2; 
const TEXTO_MOTIVACIONAL = "Acredite no seu potencial e a mudança acontecerá.";

// Variáveis de controle
let letreiro;
let container;
let posicaoX = 0; // Posição inicial
let direcao = 1; // 1 para direita, -1 para esquerda (a. Deslizar e voltar)

document.addEventListener('DOMContentLoaded', () => {
    letreiro = document.getElementById('letreiro');
    container = letreiro.parentElement;
    
    // Adiciona o texto motivacional (redundante se estiver no HTML, mas útil para controle)
    letreiro.textContent = TEXTO_MOTIVACIONAL;

    // Inicia o loop de animação
    requestAnimationFrame(animarLetreiro);
});

function animarLetreiro() {
    // 1. Calcula as dimensões
    const larguraLetreiro = letreiro.offsetWidth;
    const larguraContainer = container.offsetWidth;
    
    // O ponto máximo que o letreiro pode ir antes de inverter é:
    // Largura do Container - Largura do Letreiro.
    const limiteDireita = larguraContainer - larguraLetreiro;

    // 2. Atualiza a posição X
    posicaoX += direcao * VELOCIDADE_PX;

    // 3. Verifica e inverte a direção (Efeito Ping-Pong)
    if (posicaoX >= limiteDireita) {
        // Chegou ao limite direito, inverte para a esquerda
        direcao = -1;
        posicaoX = limiteDireita; // Ajuste para garantir que não ultrapasse
    } else if (posicaoX <= 0) {
        // Chegou ao limite esquerdo, inverte para a direita
        direcao = 1;
        posicaoX = 0; // Ajuste para garantir que não ultrapasse
    }

    // 4. Aplica a nova posição ao elemento HTML
    // Usamos 'transform: translateX()' para melhor performance
    letreiro.style.transform = `translateX(${posicaoX}px)`;

    // 5. Continua o loop no próximo frame
    requestAnimationFrame(animarLetreiro);
}