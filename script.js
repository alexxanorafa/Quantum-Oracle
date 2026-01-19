// ============ DADOS DOS DEUSES (Preservado) ============
const deuses = {
    grego: [
        { nome: "Zeus", mensagem: "O trovão ruge em suas mãos. Liderar não é apenas comandar, mas equilibrar justiça e poder. Use sua força com sabedoria." },
        { nome: "Afrodite", mensagem: "O amor é um oceano. A verdadeira beleza não está na forma, mas na essência. Ame sem reservas, mas comece pelo amor-próprio." },
        { nome: "Atena", mensagem: "O guerreiro vence antes de erguer a espada. Sabedoria é saber usar o conhecimento. A visão estratégica corta as sombras da ignorância." },
        { nome: "Hades", mensagem: "A morte é transformação. Aceite os ciclos e o fim das coisas para encontrar a verdadeira paz interior. O silêncio revela segredos." },
        { nome: "Apolo", mensagem: "A luz da verdade brilha na arte. A busca pelo conhecimento é um caminho iluminado. Permita que a criatividade flua." },
        { nome: "Dionísio", mensagem: "Celebre a vida. A alegria e o descanso são essenciais. A verdadeira liberdade reside na aceitação do momento presente." },
        { nome: "Hermes", mensagem: "A adaptação é essencial. Navegue entre os mundos com astúcia e comunicação clara. Seja o mensageiro da sua própria vida." },
        { nome: "Artemis", mensagem: "Respeite a natureza e a sua essência selvagem. A liberdade está na conexão com o seu verdadeiro eu e na independência." },
        { nome: "Hefesto", mensagem: "Transforme a dor em arte. A verdadeira beleza surge do trabalho árduo e da resiliência. Criar é um ato sagrado." },
        { nome: "Deméter", mensagem: "Cultive suas raízes. O ciclo das estações ensina sobre paciência e renovação. Aprecie a abundância que a vida oferece." }
    ],
    egipcio: [
        { nome: "Rá", mensagem: "Sua luz interior jamais se apaga. Cada amanhecer é um recomeço. Confie no ciclo eterno e na sua capacidade de renovação." },
        { nome: "Ísis", mensagem: "O que foi quebrado pode ser restaurado. O amor e a magia da cura estão em suas mãos. Confie na intuição." },
        { nome: "Osíris", mensagem: "Mude, evolua, renasça. A perda carrega um novo começo. O legado que deixamos é a verdadeira imortalidade." },
        { nome: "Hórus", mensagem: "Veja além das ilusões. A proteção e a vitória pertencem aos que têm coragem e visão clara. Eleve seu espírito." },
        { nome: "Anúbis", mensagem: "Não tema a transição. Mudanças são necessárias para o crescimento da alma. Encontre equilíbrio no desconhecido." },
        { nome: "Sekhmet", mensagem: "Força e cura caminham juntas. Saiba impor limites, mas mantenha o coração aberto para perdoar e curar." },
        { nome: "Thoth", mensagem: "O conhecimento é poder. Registre suas descobertas e busque a sabedoria. A comunicação clara é sua maior ferramenta." },
        { nome: "Bastet", mensagem: "Proteja seu espaço e quem você ama. A harmonia e o prazer são sagrados. Cuide do seu lar interior." }
    ],
    nordico: [
        { nome: "Odin", mensagem: "O conhecimento exige sacrifício. Esteja pronto para verdades desconfortáveis, pois elas libertam. Busque a sabedoria profunda." },
        { nome: "Thor", mensagem: "Aja com coragem, mesmo na tempestade. A força está em seguir em frente. Lute por aquilo que ama com o coração ardente." },
        { nome: "Loki", mensagem: "Questione a ordem. O caos traz mudanças necessárias. A adaptabilidade é sua maior arma, mas cuidado para não se perder no jogo." },
        { nome: "Freyja", mensagem: "Amar é um ato de bravura. A vulnerabilidade é uma força. Não tema o conflito se ele trouxer paixão e verdade." },
        { nome: "Tyr", mensagem: "Faça o que é certo, não o que é fácil. A integridade e a justiça exigem coragem. Assuma a responsabilidade por suas ações." },
        { nome: "Heimdall", mensagem: "Esteja atento. A vigilância permite antecipar oportunidades e ameaças. Escute o que não é dito." },
        { nome: "Baldr", mensagem: "A esperança é eterna. Valorize a beleza e os laços que cria. Mesmo na fragilidade, há uma luz que inspira." }
    ]
};

// ============ LÓGICA DO MENU (Preservada) ============
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

// ============ MOTOR DA INTERFACE COGNITIVA (Novo) ============

// Inicializa o sistema ao carregar
document.addEventListener("DOMContentLoaded", resetSistema);

function resetSistema() {
    const container = document.getElementById("cartas-container");
    const hud = document.getElementById("cartas-meanings");
    
    // Limpar Interface
    container.innerHTML = "";
    hud.innerHTML = `<p class="placeholder-text" style="opacity:0.6; text-align:center; padding-top:20px;">
        Sistemas online.<br>Selecione 3 nós de probabilidade acima para iniciar a leitura.
    </p>`;

    // Criar 3 Cartas em "Estado de Superposição"
    for (let i = 0; i < 3; i++) {
        criarCartaQuantica(container);
    }
}

function criarCartaQuantica(container) {
    const carta = document.createElement("div");
    carta.className = "carta";
    // Simbolo grego Psi (Função de onda) ou um ? místico
    carta.innerHTML = `<div class="carta-simbolo">Ψ</div>`;
    
    carta.onclick = function() {
        colapsarFuncaoDeOnda(this);
    };
    
    container.appendChild(carta);
}

function colapsarFuncaoDeOnda(elementoCarta) {
    // Se já foi revelada, não faz nada
    if (elementoCarta.classList.contains("revelada")) return;

    // 1. Obter dados
    const panteaoSelect = document.getElementById("panteao-opcao").value;
    const listaDeuses = deuses[panteaoSelect];
    // Sorteio Aleatório
    const deusSorteado = listaDeuses[Math.floor(Math.random() * listaDeuses.length)];

    // 2. Transformação Visual (CSS)
    elementoCarta.classList.add("revelada");
    elementoCarta.innerHTML = `<h3>${deusSorteado.nome}</h3>`;
    
    // 3. Atualizar o HUD (Interface de Texto)
    atualizarHUD(deusSorteado);
}

function atualizarHUD(deus) {
    const hud = document.getElementById("cartas-meanings");
    
    // Remove o texto placeholder se for a primeira carta
    if (hud.querySelector(".placeholder-text")) {
        hud.innerHTML = "";
    }

    // Cria a entrada de log
    const entry = document.createElement("div");
    entry.className = "msg-entry";
    entry.innerHTML = `
        <span class="msg-title">${deus.nome}</span>
        <span class="msg-text">${deus.mensagem}</span>
    `;
    
    // Adiciona ao topo (Prepend) ou ao fim (Append) - Prepend é melhor para leitura imediata
    hud.prepend(entry);
}