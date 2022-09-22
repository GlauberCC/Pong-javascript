// PONG GAME
// Variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro/2;

let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//Variaveis da minha raquete
let raqueteComprimento = 10;
let raqueteAltura = 90;

let colidiu = false;

//variáveis do oponente
let xRaquete = 5;
let yRaquete = 150;
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;


let chanceDeErrar = 0;


function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}

function setup() {
    createCanvas(600, 400);
    trilha.loop();
}

function draw() {
    background(0);
    mostraBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    mostraRaquete(xRaquete, yRaquete);

    movimentaMinhaRaquete();
    verificaColisaoRaquete(xRaquete, yRaquete);
  
  // Oponente
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaRaqueteOponente();
    //movimentaRaqueteOponenteAutomatico();
  
  bolinhaNaoFicaPresa
  
  incluiPlacar();
  marcaPonto();
}


function bolinhaNaoFicaPresa(){
    if (XBolinha - raio < 0){
    console.log('bolinha ficou presa');
    XBolinha = 300;
    }
}

function incluiPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(100, 130, 33));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(100, 130, 33));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
    if (xBolinha > 590) {
        meusPontos += 1;
      ponto.play();
    }
    if (xBolinha < 10) {
        pontosDoOponente += 1;
      ponto.play();
    }
}
function mostraBolinha() {
    circle(xBolinha, yBolinha, diametro)
}

function movimentaBolinha() {
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
    if (xBolinha + raio > width || xBolinha - raio < 0) {
        velocidadeXBolinha *= -1;
    }
    if (yBolinha + raio > height || yBolinha - raio < 0) {
        velocidadeYBolinha *= -1;
    }
}

// MINHA RAQUETE
function mostraRaquete(x,y) {
    rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  print (yRaquete);
  
    if (keyIsDown(87)) {
      if (yRaquete>-10) { 
          yRaquete -= 10;
        }
    }
    if (keyIsDown(83)) {
      if (yRaquete<310) { 
        yRaquete += 10;
      }
    }
}


function verificaColisaoRaquete(x,y) {
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

// RAQUETE OPONENTE
function movimentaRaqueteOponenteAutomatico() {
    velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
    yRaqueteOponente += velocidadeYOponente  + chanceDeErrar
    calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function movimentaRaqueteOponente(){
    if (keyIsDown(UP_ARROW)){
       if (yRaquete>-10) { 
         yRaqueteOponente -= 10;
       }
    }
    if (keyIsDown(DOWN_ARROW)){
       if (yRaquete<310) { 
        yRaqueteOponente += 10;
       }
    }

 
}



