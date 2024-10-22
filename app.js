const tablero = document.getElementById('tablero');
const mensajeDiv = document.getElementById('mensaje');
let nombreJugador = '';
let estadoTablero = Array(9).fill(null);
let jugadorActual = 'X';

document.getElementById('botonIniciar').addEventListener('click', () => {
    nombreJugador = document.getElementById('nombreJugador').value;
    if (nombreJugador) {
        iniciarJuego();
    } else {
        alert('Por favor, ingresa tu nombre.');
    }
});

function iniciarJuego() {
    tablero.innerHTML = '';
    estadoTablero.fill(null);
    jugadorActual = 'X';
    mensajeDiv.textContent = '';
    mensajeDiv.style.display = 'none'; 
    for (let i = 0; i < 9; i++) {
        const celda = document.createElement('div');
        celda.className = 'celda';
        celda.dataset.index = i;
        celda.addEventListener('click', manejarClickCelda);
        tablero.appendChild(celda);
    }
    crearParticulas();
}

function manejarClickCelda(event) {
    const index = event.target.dataset.index;
    if (estadoTablero[index] || mensajeDiv.textContent) return;

    estadoTablero[index] = jugadorActual;
    event.target.innerHTML = jugadorActual === 'X' ? 'X' : 'O';

    if (verificarGanador(jugadorActual)) {
        mostrarMensaje(`${nombreJugador} ha ganado!`);
        return;
    }

    jugadorActual = 'O';
    hacerMovimientoAleatorio();
}

function hacerMovimientoAleatorio() {
    const celdasVacias = estadoTablero.map((val, index) => val === null ? index : null).filter(val => val !== null);
    if (celdasVacias.length === 0) return;

    const indiceAleatorio = celdasVacias[Math.floor(Math.random() * celdasVacias.length)];
    estadoTablero[indiceAleatorio] = jugadorActual;
    const celda = document.querySelector(`.celda[data-index="${indiceAleatorio}"]`);
    celda.innerHTML = 'O';

    if (verificarGanador(jugadorActual)) {
        mostrarMensaje(`El O ha ganado`);
    }

    jugadorActual = 'X';
}

function verificarGanador(jugador) {
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];

    return combinacionesGanadoras.some(combinacion => {
        return combinacion.every(index => estadoTablero[index] === jugador);
    });
}

function mostrarMensaje(texto) {
    mensajeDiv.textContent = texto;
    mensajeDiv.style.display = 'block'; 
    mensajeDiv.className = 'ganador';
    mensajeDiv.style.marginTop = '40px'; 
}

function crearParticulas() {
    for (let i = 0; i < 20; i++) {
        const particula = document.createElement('div');
        particula.className = 'particula';
        particula.style.backgroundColor = Math.random() < 0.5 ? '#007bff' : '#28a745';
        particula.style.left = Math.random() * 100 + 'vw';
        particula.style.top = Math.random() * 100 + 'vh';
        particula.innerHTML = Math.random() < 0.5 ? 'X' : 'O';
        particula.style.color = '#ffffff';
        particula.style.fontSize = '20px';
        particula.style.display = 'flex';
        particula.style.justifyContent = 'center';
        particula.style.alignItems = 'center';
        document.body.appendChild(particula);
    }
}
