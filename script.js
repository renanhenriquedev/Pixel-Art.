const chart = document.createElement('section');
const body = document.querySelector('body');
chart.id = 'color-chart';

body.appendChild(chart);

const cores = ['#c842e7', '#000a17 ', '#0062dd', '#e7a23c'];
for (let i = 0; i < 4; i += 1) {
  const pegarSection = document.querySelector('section');
  let criarQuadrado = document.createElement('div');
  criarQuadrado.classList.add('quadrado', 'color');
  criarQuadrado.style.backgroundColor = cores[i];
  pegarSection.appendChild(criarQuadrado);
  criarQuadrado = undefined;
}
if (localStorage.length === 0) {
  localStorage.setItem('inital-colors', JSON.stringify(cores.slice(1, cores.length)));
}

const container = document.createElement('section');
container.id = 'container'
body.appendChild(container);
const sectionButton = document.querySelector('#container')
function createButton(type, id, texto, classe) {
  const button = document.createElement('button');
  button.type = type;
  button.id = id;
  button.innerText = texto;
  button.classList.add(classe, 'space');
  sectionButton.appendChild(button);
}

function corAleatoria() {
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const hex = `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`;
    array.push(hex);
    const filhosSection = chart.childNodes;
    filhosSection[i].style.backgroundColor = hex;
  }
  localStorage.setItem('inital-colors', JSON.stringify(array));
}

function trocarCor() {
  const catchButton = document.getElementById('random-color');
  catchButton.addEventListener('click', corAleatoria);
}

function manterCor() {
  if (localStorage.length > 0) {
    const arrayCores = JSON.parse(localStorage.getItem('inital-colors'));
    const filhosSection = chart.childNodes;
    for (let i = 1; i < 4; i += 1) {
      filhosSection[i].style.backgroundColor = arrayCores[i - 1];
    }
  }
}

let controle = 0;
function pixelFrame(frame) {
  if (localStorage.getItem('picture') === null) {
    for (let i = 0; i < 5; i += 1) {
      let criarQuadrado = document.createElement('div');
      criarQuadrado.classList.add('quadro', 'pixel', 'white');
      criarQuadrado.id = controle;
      controle += 1;
      frame.appendChild(criarQuadrado);
      criarQuadrado = undefined;
    }
  }
  if (localStorage.getItem('picture') !== null) {
    const tamanhoSection = localStorage.getItem('picture');
    for (let i = 0; i < tamanhoSection; i += 1) {
      let criarQuadrado = document.createElement('div');
      criarQuadrado.classList.add('quadro', 'pixel', 'white');
      criarQuadrado.id = controle;
      controle += 1;
      frame.appendChild(criarQuadrado);
      criarQuadrado = undefined;
    }
  }
}
function createSection() {
  if (localStorage.getItem('picture') === null) {
    for (let i = 0; i < 5; i += 1) {
      const frame = document.createElement('section');
      frame.id = 'paint';
      body.appendChild(frame);
      pixelFrame(frame);
    }
  }
  if (localStorage.getItem('picture') !== null) {
    const tamanhoSection = localStorage.getItem('picture');
    for (let i = 0; i < tamanhoSection; i += 1) {
      const frame = document.createElement('section');
      frame.id = 'paint';
      body.appendChild(frame);
      pixelFrame(frame);
    }
  }
}

function putClassSelected() {
  const filhosSection = chart.childNodes;
  filhosSection[0].classList.add('selected');
}

const filhosSection = chart.childNodes;
function catchColor() {
  for (let i = 0; i < 4; i += 1) {
    filhosSection[i].addEventListener('click', () => {
      if ('click' && filhosSection[i].classList === 'quadrado color selected') {
        const cor = filhosSection[i].style.backgroundColor;
        localStorage.setItem('corzinha', cor);
      } else if ('click' && filhosSection[i].classList !== 'quadrado color selected') {
        for (let o = 0; o < 4; o += 1) {
          filhosSection[o].classList.remove('selected');
        }
        const cor = filhosSection[i].style.backgroundColor;
        filhosSection[i].classList.add('selected');
        localStorage.setItem('corzinha', cor);
      }
    });
  }
}

localStorage.setItem('corzinha', 'rgb(0, 0, 0)');

function clean() {
  const button = document.querySelector('#clear-board');
  const painel = document.querySelectorAll('#paint');
  for (let i = 0; i < painel.length; i += 1) {
    const divs = painel[i].childNodes;
    for (let o = 0; o < painel.length; o += 1) {
      button.addEventListener('click', () => {
        divs[o].style.backgroundColor = 'white';
      });
    }
  }
}

function draw() {
  if (localStorage.getItem('pixelBoard') !== null) {
    const desenho = JSON.parse(localStorage.getItem('pixelBoard'));
    const tamanho = desenho.length;
    const corDesenho = JSON.parse(localStorage.getItem('backgroundcolor'));
    for (let i = 0; i < tamanho; i += 1) {
      const refresh = document.getElementById(desenho[i]);
      refresh.style.backgroundColor = corDesenho[i];
    }
  }
}

function paint() {
  const painel = document.querySelectorAll('#paint');
  const array = [];
  const arraySegundo = [];
  for (let i = 0; i < painel.length; i += 1) {
    const filhosPainel = painel[i].childNodes;
    for (let o = 0; o < filhosPainel.length; o += 1) {
      filhosPainel[o].addEventListener('click', () => {
        filhosPainel[o].style.backgroundColor = localStorage.getItem('corzinha');
        const corPosition = filhosPainel[o].style.backgroundColor;
        const { id } = filhosPainel[o];
        array.push(id);
        arraySegundo.push(corPosition);
        localStorage.setItem('pixelBoard', JSON.stringify(array));
        localStorage.setItem('backgroundcolor', JSON.stringify(arraySegundo));
      });
    }
  }
}

function createInput() {
  const input = document.createElement('input');
  input.id = 'board-size';
  input.type = 'number';
  input.min = '1';
  input.class = 'space';
  sectionButton.appendChild(input);
}

function problemVQV() {
  const input = document.querySelector('#board-size');
  const valor = input.value;
  if (valor === '') {
    alert('Board inválido!');
  }
}

function apagarBoard() {
  const teste = document.querySelectorAll('#paint');
  for (let i = 0; i < teste.length; i += 1) {
    body.removeChild(teste[i]);
  }
}

function alterarBoard() {
  const input = document.querySelector('#board-size');
  const valor = input.value;
  if (valor >= 5 && valor <= 50) {
    function pixelFrame(frame) {
      for (let i = 0; i < valor; i += 1) {
        let criarQuadrado = document.createElement('div');
        criarQuadrado.classList.add('quadro', 'pixel', 'white');
        criarQuadrado.id = controle;
        controle += 1;
        frame.appendChild(criarQuadrado);
        criarQuadrado = undefined;
      }
    }

    for (let i = 0; i < valor; i += 1) {
      const frame = document.createElement('section');
      frame.id = 'paint';
      body.appendChild(frame);
      pixelFrame(frame);
    }
  }
}

function minBoard() {
  const input = document.querySelector('#board-size');
  const valor = input.value;
  if (valor < 5) {
    function pixelFrame(frame) {
      for (let i = 0; i < 5; i += 1) {
        let criarQuadrado = document.createElement('div');
        criarQuadrado.classList.add('quadro', 'pixel', 'white');
        criarQuadrado.id = controle;
        controle += 1;
        frame.appendChild(criarQuadrado);
        criarQuadrado = undefined;
      }
    }

    for (let i = 0; i < 5; i += 1) {
      const frame = document.createElement('section');
      frame.id = 'paint';
      body.appendChild(frame);
      pixelFrame(frame);
    }
  }
}

function maxBoard() {
  const input = document.querySelector('#board-size');
  const valor = input.value;
  if (valor > 50) {
    function pixelFrame(frame) {
      for (let i = 0; i < 50; i += 1) {
        let criarQuadrado = document.createElement('div');
        criarQuadrado.classList.add('quadro', 'pixel', 'white');
        criarQuadrado.id = controle;
        controle += 1;
        frame.appendChild(criarQuadrado);
        criarQuadrado = undefined;
      }
    }

    for (let i = 0; i < 50; i += 1) {
      const frame = document.createElement('section');
      frame.id = 'paint';
      body.appendChild(frame);
      pixelFrame(frame);
    }
  }
  localStorage.setItem('picture', JSON.stringify(document.querySelectorAll('#paint').length));
}
function buttonVQV() {
  const button = document.querySelector('#generate-board');
  button.addEventListener('click', () => {
    problemVQV();
    apagarBoard();
    alterarBoard();
    minBoard();
    maxBoard();
    paint();
  });
}

function init() {
  createButton('button', 'random-color', 'Gerar Cores');
  createButton('button', 'clear-board', 'Limpar', 'button');
  trocarCor();
  manterCor();
  createSection();
  putClassSelected();
  catchColor();
  paint();
  clean();
  draw();
  createInput();
  createButton('button', 'generate-board', 'Tamanho'), 'a';
  buttonVQV();
}

window.onload = init;
