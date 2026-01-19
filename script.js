    // ============ SISTEMA DE MENU ============
    const menuIcon = document.getElementById("menuIcon");
    const menu = document.getElementById("menu");

    menuIcon.addEventListener("click", function(e) {
        e.stopPropagation();
        menu.classList.toggle("active");
        menuIcon.classList.toggle("active");
    });

    document.addEventListener("click", function(e) {
        if (!menu.contains(e.target) && !menuIcon.contains(e.target)) {
            menu.classList.remove("active");
            menuIcon.classList.remove("active");
        }
    });

    document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-3px)";
        });
        item.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0)";
        });
    });

// ============ DADOS (Preservados) ============
// (Copie o seu objeto 'deuses' original aqui. Para poupar espaço, estou a usar uma referência)
const deuses = {
grego: [
    { nome: "Zeus", mensagem: "O trovão abre caminhos ocultos. A tua vontade molda o destino quando ousas assumir o teu próprio poder." },
    { nome: "Hades", mensagem: "O silêncio das profundezas revela verdades que a luz teme. Aceita o que é oculto e encontrarás força." },
    { nome: "Atena", mensagem: "A estratégia vence onde a força falha. Observa, calcula, age com precisão — e o conflito dissolve-se." },
    { nome: "Apolo", mensagem: "A clareza chega como luz súbita. Segue o ritmo da tua verdade interior e o caos reorganiza-se." },
    { nome: "Ártemis", mensagem: "A tua intuição é flecha certeira. Confia no instinto que te guia para longe do ruído e perto do essencial." },
    { nome: "Afrodite", mensagem: "O amor revela o que a mente esconde. A beleza nasce quando te permites sentir sem resistência." },
    { nome: "Ares", mensagem: "A batalha é interna. Direciona a tua força com propósito e o conflito transforma-se em avanço." },
    { nome: "Hera", mensagem: "Compromisso é poder. Alinha as tuas alianças e o que parecia instável torna-se sagrado." },
    { nome: "Hermes", mensagem: "As mensagens chegam em sincronicidade. Mantém-te atento aos sinais — nada é acaso." },
    { nome: "Poseidon", mensagem: "As emoções são mar profundo. Se navegares com coragem, encontrarás tesouros submersos." }
],
egipcio: [
    { nome: "Rá", mensagem: "A luz renova tudo o que toca. Permite que um novo ciclo se abra sem medo do que precisa de terminar." },
    { nome: "Anúbis", mensagem: "A travessia exige desapego. Liberta o que já cumpriu o seu papel e a passagem torna-se suave." },
    { nome: "Ísis", mensagem: "A cura nasce da união entre força e ternura. Reconstrói-te com paciência e reverência ao teu próprio ritmo." },
    { nome: "Osíris", mensagem: "A morte simbólica prepara renascimentos. O que cai abre espaço para o que és destinado a ser." },
    { nome: "Hórus", mensagem: "Vê além do imediato. A visão superior revela padrões que antes pareciam caos." },
    { nome: "Bastet", mensagem: "Protege o teu espaço sagrado. A leveza é uma forma de poder que muitos subestimam." },
    { nome: "Thoth", mensagem: "O conhecimento organiza o universo. Escreve, regista, compreende — e o caminho revela-se." },
    { nome: "Sekhmet", mensagem: "A tua força é fogo purificador. Usa-a com consciência e transformarás tudo o que tocas." }
],
nordico: [
    { nome: "Odin", mensagem: "O sacrifício consciente abre portais de sabedoria. O que entregas hoje torna-se visão amanhã." },
    { nome: "Thor", mensagem: "A coragem é o martelo que quebra obstáculos. Age com firmeza e o caminho responde." },
    { nome: "Freyja", mensagem: "O desejo é bússola espiritual. Honra o que te chama e a abundância segue-te." },
    { nome: "Loki", mensagem: "A mudança chega pela via inesperada. Abraça o imprevisto — ele contém a chave da evolução." },
    { nome: "Tyr", mensagem: "A justiça exige firmeza. Mantém-te fiel ao que é correto, mesmo quando custa." },
    { nome: "Hel", mensagem: "Aceita as partes que escondes. A integração traz força onde antes havia medo." },
    { nome: "Frigg", mensagem: "A intuição materna vê o que ainda não nasceu. Confia no que pressentes antes de ver." },
    { nome: "Baldur", mensagem: "A pureza do coração ilumina o mundo. Mantém a tua verdade mesmo quando tudo parece sombrio." }
]
};

// ============ SISTEMA DE PARTÍCULAS (Background) ============
const canvas = document.getElementById('particles-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.01; // Cintilação
        else this.size = Math.random() * 2;
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 243, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 50; i++) particlesArray.push(new Particle());
}
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}
initParticles();
animateParticles();

// ============ LÓGICA DO JOGO ============
let cartasReveladas = 0;
const MAX_CARTAS = 3;

document.addEventListener("DOMContentLoaded", resetGame);

function resetGame() {
    const container = document.getElementById("cartas-container");
    const log = document.getElementById("cartas-meanings");
    const synthBtn = document.getElementById("btn-synthesis");
    
    container.innerHTML = "";
    log.innerHTML = `<p class="log-line">>> Sistema reiniciado. Aguardando sincronização...</p>`;
    synthBtn.classList.add('hidden');
    cartasReveladas = 0;

    // Criar Slots de Cartas
    for (let i = 0; i < MAX_CARTAS; i++) {
        criarCartaInterativa(container, i);
    }
}

function criarCartaInterativa(container, index) {
    const slot = document.createElement("div");
    slot.className = "card-slot";
    
    slot.innerHTML = `
        <div class="card-inner">
            <div class="glyph">Ω</div>
            <div class="charge-bar"></div>
        </div>
    `;

    // Eventos de "Charging" (Mouse e Touch)
    let pressTimer;
    let chargeLevel = 0;
    const CHARGE_TIME = 1000; // 1 segundo para carregar
    const fps = 30; // Atualizações da animação

    const startCharge = (e) => {
        if (slot.classList.contains("revealed")) return;
        e.preventDefault(); // Previne scroll no mobile
        
        slot.classList.add("charging");
        
        // Loop de carregamento
        let startTime = Date.now();
        pressTimer = setInterval(() => {
            let elapsed = Date.now() - startTime;
            let progress = Math.min((elapsed / CHARGE_TIME) * 100, 100);
            
            slot.querySelector(".charge-bar").style.width = progress + "%";
            
            // Vibração Haptica (aumenta intensidade)
            if (navigator.vibrate && progress % 20 < 5) navigator.vibrate(10); 

            if (elapsed >= CHARGE_TIME) {
                clearInterval(pressTimer);
                revelarCarta(slot);
            }
        }, 1000 / fps);
    };

    const stopCharge = () => {
        if (slot.classList.contains("revealed")) return;
        clearInterval(pressTimer);
        slot.classList.remove("charging");
        slot.querySelector(".charge-bar").style.width = "0%";
    };

    // Mouse Events
    slot.addEventListener("mousedown", startCharge);
    slot.addEventListener("mouseup", stopCharge);
    slot.addEventListener("mouseleave", stopCharge);
    
    // Touch Events (Mobile)
    slot.addEventListener("touchstart", startCharge);
    slot.addEventListener("touchend", stopCharge);

    container.appendChild(slot);
}

function revelarCarta(slot) {
    // 1. Lógica de Dados
    const panteao = document.getElementById("panteao-opcao").value;
    // Fallback se deuses não estiver definido (para teste)
    const lista = (typeof deuses !== 'undefined' && deuses[panteao]) ? deuses[panteao] : [{nome:"Erro", mensagem:"Dados não carregados"}];
    const deus = lista[Math.floor(Math.random() * lista.length)];

    // 2. Feedback Visual/Haptico
    if (navigator.vibrate) navigator.vibrate(200); // Vibração forte
    slot.classList.remove("charging");
    slot.classList.add("revealed");

    // 3. Atualizar DOM da Carta
    slot.querySelector(".card-inner").innerHTML = `
        <div style="text-align:center; animation: fadeIn 1s">
            <div class="card-title">${deus.nome}</div>
            <div style="font-size:0.6em; margin-top:5px; color:#888">FREQ: ${Math.floor(Math.random()*900)+100}Hz</div>
        </div>
    `;

    // 4. Log no Console
    const log = document.getElementById("cartas-meanings");
    const entry = document.createElement("p");
    entry.className = "log-line";
    entry.innerHTML = `>> <strong>${deus.nome}</strong> detectado: "${deus.mensagem}"`;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight; // Auto-scroll para baixo

    // 5. Verificar Fim de Jogo
    cartasReveladas++;
    if (cartasReveladas === MAX_CARTAS) {
        document.getElementById("btn-synthesis").classList.remove("hidden");
        document.getElementById("instruction-text").innerText = "SINCRO COMPLETA. INICIAR SÍNTESE.";
        document.getElementById("instruction-text").style.color = "#00f3ff";
    }
}

function gerarSintese() {
    const log = document.getElementById("cartas-meanings");
    log.innerHTML += `<br><p class="log-line" style="color:var(--neon-gold)">>> COMPUTANDO SÍNTESE FINAL...</p>`;
    log.innerHTML += `<p class="log-line">>> A tríade sugere um momento de transformação. O equilíbrio entre o caos e a ordem foi estabelecido. Caminhe com a certeza da sua intuição.</p>`;
    log.scrollTop = log.scrollHeight;

}
