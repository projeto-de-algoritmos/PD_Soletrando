// import palavras from '../assets/palavras.json'
const palavras = require('../assets/palavras.json')

const getWord = (nivel) => {
    nivel = parseInt(nivel);
    if (nivel < 1 || nivel > 4) return false;
    const max = palavras['nivel1'].length, min = 0;
    const indexPalavraAleatoria = Math.floor(Math.random() * (max - min) + min);
    const niveis = { 1: 'nivel1', 2: 'nivel2', 3: 'nivel3', 4: 'nivel4' };

    return palavras[niveis[nivel]][indexPalavraAleatoria];
}

console.log(getWord(4))