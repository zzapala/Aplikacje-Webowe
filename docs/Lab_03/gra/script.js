// --- Ścieżki do zasobów ---
const IMG_PATH = './assets/flappybird/';
const SFX_PATH = './assets/ui/';
const MUSIC_PATH = './assets/sound/';
const NUM_PATH = './assets/ui/Numbers/';


// --- Definicja assets ---
const ASSETS = {
  // grafiki
  bg: IMG_PATH + 'background-day.png',
  base: IMG_PATH + 'base.png',
  pipe: IMG_PATH + 'pipe-green.png',
  bird: [
    IMG_PATH + 'yellowbird-downflap.png',
    IMG_PATH + 'yellowbird-midflap.png',
    IMG_PATH + 'yellowbird-upflap.png'
  ],
  gameover: './assets/ui/gameover.png',
  begin: './assets/ui/message.png',

  numbers: [
    NUM_PATH + '0.png',
    NUM_PATH + '1.png',
    NUM_PATH + '2.png',
    NUM_PATH + '3.png',
    NUM_PATH + '4.png',
    NUM_PATH + '5.png',
    NUM_PATH + '6.png',
    NUM_PATH + '7.png',
    NUM_PATH + '8.png',
    NUM_PATH + '9.png'
  ],

  // dźwięki
  music: MUSIC_PATH + 'music.mp3',
  hit: MUSIC_PATH + 'hit.wav',
  point: MUSIC_PATH + 'point.wav',
  die: MUSIC_PATH + 'die.wav',
  wing: MUSIC_PATH + 'wing.wav'
};


// --- Canvas setup ---
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const gameEl = document.getElementById('game');
let W = gameEl.clientWidth, H = gameEl.clientHeight;
canvas.width = W; canvas.height = H;

// --- HUD i menu ---
const hud = document.getElementById('hud');
const scoreListEl = document.getElementById('scoreList');
const welcome = document.getElementById('welcome');
const gameOver = document.getElementById('gameOver');
const startBtn = document.getElementById('startBtn');
const retryBtn = document.getElementById('retry');
const toMenuBtn = document.getElementById('toMenu');
const resetScoresBtn = document.getElementById('resetScores');

const lastScoreEl = document.getElementById('lastScore');
const bestScoreEl = document.getElementById('bestScore');
const top5El = document.getElementById('top5');
const goTitle = document.getElementById('go_title');



// --- Ładowanie obrazków ---
function loadImage(src) {
  return new Promise(res => {
    const i = new Image();
    i.src = src;
    i.onload = () => res(i);
    i.onerror = () => console.error("Błąd ładowania:", src);
  });
}

let IMG = {};
async function loadAssets() {
  IMG.bg = await loadImage(ASSETS.bg);
  IMG.base = await loadImage(ASSETS.base);
  IMG.pipe = await loadImage(ASSETS.pipe);
  IMG.gameover = await loadImage(ASSETS.gameover);
  IMG.begin = await loadImage(ASSETS.begin);
  IMG.bird = [];
  for (let b of ASSETS.bird) IMG.bird.push(await loadImage(b));
  IMG.numbers = [];
  for (let n of ASSETS.numbers) {
    IMG.numbers.push(await loadImage(n));
  }
}

// --- Ładowanie dźwięków ---
function loadAudio(src) {
  const a = new Audio(src);
  a.preload = 'auto';
  return a;
}

let SND = {};
async function loadSounds() {
  SND.music = loadAudio(ASSETS.music);
  SND.hit = loadAudio(ASSETS.hit);
  SND.point = loadAudio(ASSETS.point);
  SND.wing = loadAudio(ASSETS.wing);
  SND.die = loadAudio(ASSETS.die);


  SND.music.loop = true;
  SND.music.volume = 0.4;
}

// --- Game variables ---
let state = 'menu';
let bird = {x:80, y:200, w:34, h:24, vy:0, frame:0, frameT:0, rot:0, alive:true};
let gravity = 900;
let flapPower = -300;
let pipes = [];
let pipeGap = 140;
let pipeSpacing = 220;
let scroll = 0;
let speed = 200;
let score = 0;
let bestTop5 = JSON.parse(localStorage.getItem('flappy_top5') || '[]');
let lastScore = 0;
let music;
let lastTime = 0;
let spawnTimer = 0;
let baseY;
let boosts = {invincible:0, fastForward:0};

// --- Helper functions ---
function rnd(min,max){ return Math.random()*(max-min)+min }

function resetGame() {
  bird = {x:80, y:H/2, w:34, h:24, vy:0, frame:0, frameT:0, rot:0, alive:true};
  pipes = []; scroll=0; score=0; spawnTimer=0; boosts={invincible:0, fastForward:0};
}

function pushTop5(v) {
  bestTop5.push(v);
  bestTop5.sort((a,b)=>b-a);
  bestTop5 = bestTop5.slice(0,5);
  localStorage.setItem('flappy_top5', JSON.stringify(bestTop5));
}

function showTop5() {
  top5El.innerHTML = '';
  bestTop5.forEach(x => {const li=document.createElement('li'); li.textContent = x; top5El.appendChild(li);});
  bestScoreEl.textContent = bestTop5[0] || 0;
}

function spawnPipe() {
  const margin=60;
  const topH = rnd(margin, H - margin - pipeGap - 80);
  const x = W + 50;
  pipes.push({x, topH, w:52});
}

function rectsIntersect(a,b) {
  return !(a.x+a.w < b.x || a.x > b.x+b.w || a.y+a.h < b.y || a.y > b.y+b.h);
}

function playSound(s) {
  try { if(SND[s]) SND[s].currentTime=0, SND[s].play(); } catch(e){}
}

// --- Input ---
window.addEventListener('keydown', e=>{ if(e.code==='Space'){ e.preventDefault(); doFlap(); }});
canvas.addEventListener('mousedown', ()=>doFlap());
startBtn.addEventListener('click', ()=>startGame());
retryBtn.addEventListener('click', ()=>{ gameOver.style.display='none'; welcome.style.display='none'; startGame(); });
toMenuBtn.addEventListener('click', ()=>{ gameOver.style.display='none'; welcome.style.display='none'; state='menu'; resetGame(); });

resetScoresBtn.addEventListener('click', () => {
    localStorage.removeItem('flappy_top5'); // czyści wynik
    bestTop5 = [];                          // resetuje zmienną
    showTop5();                             // aktualizuje widok
});

// --- Game logic ---
function doFlap() {
  if(state==='menu'){ startGame(); return; }
  if(state==='playing' && bird.alive){ bird.vy = flapPower; bird.frame=0; bird.frameT=0; playSound('wing'); }
}
function startGame() {
    state='playing';
    welcome.style.display='none';
    gameOver.style.display='none';
    score = 0;
    hud.textContent = 0;

    resetGame();
  
    try { music.play(); } catch(e) {}
  }
  

function endGame() {
  if(!bird.alive) return;
  bird.alive=false; state='dying';
  playSound('die');
}

function finalizeGame() {
    playSound('hit');
  state='over';
  music.pause();
  lastScore = score;
  pushTop5(lastScore);
  showTop5();
  lastScoreEl.textContent = lastScore;

  const isRecord = bestTop5[0]===lastScore;

  if(isRecord){
    let t0 = performance.now();
    const spin = ()=>{
      const t = performance.now();
      bird.rot = (t-t0)/3000 * Math.PI*4;
      draw();
      if(t-t0<3000) requestAnimationFrame(spin);
      else setTimeout(()=>alert('Gratulacje! Nowy rekord: '+lastScore), 200);
    };
    spin();
    
  }
  gameOver.style.display = 'flex';

}

// --- Update / Draw ---
function update(dt) {
  if(state==='playing'){
    spawnTimer += dt;
    if(spawnTimer > pipeSpacing/speed){ spawnTimer=0; spawnPipe(); }



    bird.vy += gravity * dt;
    bird.y += bird.vy * dt;
    if (bird.y < bird.h / 2) {
        bird.y = bird.h / 2;
        bird.vy 
    }
    bird.rot = Math.max(-Math.PI/4, Math.min(Math.PI/4, bird.vy/600));

    bird.frameT += dt;
    if(bird.frameT>0.08){ bird.frame=(bird.frame+1)%IMG.bird.length; bird.frameT=0; }

    for(let p of pipes) p.x -= speed*dt * (boosts.fastForward?3:1);
    if(pipes.length && pipes[0].x + pipes[0].w < -50) pipes.shift();

    for(let p of pipes){
      const pipeX = p.x;
      const topRect = {x:pipeX, y:0, w:p.w, h:p.topH};
      const botRect = {x:pipeX, y:p.topH+pipeGap, w:p.w, h:H-(p.topH+pipeGap)};
      const birdRect = {x:bird.x-8, y:bird.y-8, w:bird.w, h:bird.h};
      if(!p.passed && pipeX+p.w/2 < bird.x){ p.passed=true; score++; playSound('point'); hud.textContent = score; }
      if(!boosts.invincible && (rectsIntersect(birdRect, topRect) || rectsIntersect(birdRect, botRect))){ endGame(); }
    }

    if(bird.y + bird.h/2 >= baseY){ bird.y = baseY - bird.h/2; if(bird.alive) {playSound('die'); endGame();} }

    for(let k in boosts) if(boosts[k]>0) boosts[k]-=dt;
    if(boosts.fastForward<0) boosts.fastForward=0;
    if(boosts.invincible<0) boosts.invincible=0;
  } else if(state==='dying'){
    bird.vy += gravity*dt; bird.y += bird.vy*dt; bird.rot += 2*dt;
    if(bird.y + bird.h/2 >= baseY) finalizeGame();
  }
}

function draw() {
  ctx.clearRect(0,0,W,H);
  ctx.drawImage(IMG.bg,0,0,W,H);

  for(let p of pipes){
    ctx.save();
    ctx.translate(p.x + p.w/2, p.topH/2);
    ctx.scale(1,-1);
    ctx.drawImage(IMG.pipe, -p.w/2, -p.topH/2, p.w, p.topH);
    ctx.restore();
    ctx.drawImage(IMG.pipe, p.x, p.topH+pipeGap, p.w, H - (p.topH+pipeGap) - (IMG.base.height-4));
  }

  ctx.drawImage(IMG.base, 0, baseY-4, W, IMG.base.height);

  ctx.save();
  ctx.translate(bird.x, bird.y);
  ctx.rotate(bird.rot);
  const bImg = IMG.bird[bird.frame];
  ctx.drawImage(bImg, -bird.w/2, -bird.h/2, bird.w, bird.h);
  ctx.restore();
  if (state === 'over') {
    const img = IMG.gameover;
    const x = (W - img.width) / 2;
    const y = H * 0.2;
    ctx.drawImage(img, x, y);
  }

  if (state === 'playing' || state === 'dying') {
    drawScore(score);
  }

  if (state === 'menu' && IMG.begin) {
    const img = IMG.begin;
    const x = (W - img.width) / 2;
    const y = H * 0.18;
    ctx.drawImage(img, x, y);
    return; 
}
  
}

function drawScore(scoreVal, y = 40) {
    if (!IMG.numbers || IMG.numbers.length < 10) return; 
    const str = String(scoreVal);
    const digitW = IMG.numbers[0].width;
    const totalW = digitW * str.length;
    let x = Math.round((W - totalW) / 2);
  
    for (const c of str) {
      const num = parseInt(c, 10);
      const img = IMG.numbers[num];
      if (img) {
        ctx.drawImage(img, x, y);
      }
      x += digitW;
    }
  }

// --- Main loop ---
function loop(ts) {
  if(!lastTime) lastTime = ts;
  const dt = Math.min(0.05, (ts-lastTime)/1000);
  lastTime = ts;
  update(dt);
  draw();
  requestAnimationFrame(loop);
}

// --- Resize ---
window.addEventListener('resize', ()=>{
  W = gameEl.clientWidth; H = gameEl.clientHeight;
  canvas.width = W; canvas.height = H;
  baseY = H - IMG.base.height + 4;
});

// --- Init ---
async function init() {
  await loadAssets();
  await loadSounds();
  welcome.style.display = 'none';

  music = SND.music;
  baseY = H - IMG.base.height + 4;
  resetGame();
  showTop5();
  requestAnimationFrame(loop);
}

init();
