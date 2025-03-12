// Datos del juego con 30 preguntas
const questions = [
    { question: "¿Cuál es la capital de Francia?", options: ["Londres", "París", "Madrid", "Roma"], correct: "París" },
    { question: "¿Qué planeta es el más grande del Sistema Solar?", options: ["Tierra", "Marte", "Júpiter", "Saturno"], correct: "Júpiter" },
    { question: "¿En qué año llegó el hombre a la Luna?", options: ["1969", "1972", "1965", "1970"], correct: "1969" },
    { question: "¿Cuál es el río más largo del mundo?", options: ["Amazonas", "Nilo", "Yangtsé", "Misisipi"], correct: "Amazonas" },
    { question: "¿Qué elemento químico tiene el símbolo 'O'?", options: ["Oro", "Oxígeno", "Osmio", "Oganesón"], correct: "Oxígeno" },
    { question: "¿Quién pintó la Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Monet"], correct: "Da Vinci" },
    { question: "¿En qué continente está Australia?", options: ["Asia", "África", "Oceanía", "América"], correct: "Oceanía" },
    { question: "¿Cuántos lados tiene un hexágono?", options: ["5", "6", "7", "8"], correct: "6" },
    { question: "¿Qué gas es el más abundante en la atmósfera terrestre?", options: ["Oxígeno", "Hidrógeno", "Nitrógeno", "Dióxido de carbono"], correct: "Nitrógeno" },
    { question: "¿Quién escribió 'Don Quijote de la Mancha'?", options: ["Cervantes", "Shakespeare", "García Márquez", "Dante"], correct: "Cervantes" },
    { question: "¿Cuál es el océano más grande del mundo?", options: ["Atlántico", "Índico", "Ártico", "Pacífico"], correct: "Pacífico" },
    { question: "¿En qué año comenzó la Segunda Guerra Mundial?", options: ["1939", "1941", "1935", "1945"], correct: "1939" },
    { question: "¿Qué animal es conocido como el rey de la selva?", options: ["Tigre", "León", "Elefante", "Gorila"], correct: "León" },
    { question: "¿Cuál es el metal más abundante en la corteza terrestre?", options: ["Hierro", "Aluminio", "Cobre", "Oro"], correct: "Aluminio" },
    { question: "¿Qué país tiene más habitantes?", options: ["India", "China", "Estados Unidos", "Rusia"], correct: "China" },
    { question: "¿Quién descubrió América?", options: ["Colón", "Magallanes", "Vespucci", "Pizarro"], correct: "Colón" },
    { question: "¿Cuántos colores tiene el arcoíris?", options: ["5", "6", "7", "8"], correct: "7" },
    { question: "¿Qué instrumento mide la temperatura?", options: ["Barómetro", "Termómetro", "Higrómetro", "Anemómetro"], correct: "Termómetro" },
    { question: "¿En qué año se fundó la ONU?", options: ["1945", "1950", "1939", "1960"], correct: "1945" },
    { question: "¿Cuál es la montaña más alta del mundo?", options: ["K2", "Everest", "Aconcagua", "Kilimanjaro"], correct: "Everest" },
    { question: "¿Qué deporte se juega en Wimbledon?", options: ["Fútbol", "Tenis", "Golf", "Críquet"], correct: "Tenis" },
    { question: "¿Qué país inventó la pizza?", options: ["Francia", "Italia", "España", "Grecia"], correct: "Italia" },
    { question: "¿Cuántos continentes hay habitados?", options: ["4", "5", "6", "7"], correct: "6" },
    { question: "¿Qué científico propuso la teoría de la relatividad?", options: ["Newton", "Einstein", "Galileo", "Hawking"], correct: "Einstein" },
    { question: "¿Cuál es el hueso más largo del cuerpo humano?", options: ["Fémur", "Tibia", "Húmero", "Columna vertebral"], correct: "Fémur" },
    { question: "¿En qué ciudad está la Torre Eiffel?", options: ["Londres", "París", "Roma", "Berlín"], correct: "París" },
    { question: "¿Qué país ganó el primer Mundial de Fútbol?", options: ["Brasil", "Argentina", "Uruguay", "Alemania"], correct: "Uruguay" },
    { question: "¿Qué vitamina produce el cuerpo al exponerse al sol?", options: ["A", "B", "C", "D"], correct: "D" },
    { question: "¿Cuál es el idioma más hablado del mundo?", options: ["Inglés", "Español", "Chino mandarín", "Hindi"], correct: "Chino mandarín" },
    { question: "¿Qué estrella es el centro de nuestro sistema solar?", options: ["Sirio", "Sol", "Betelgeuse", "Polaris"], correct: "Sol" }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;
let shuffledQuestions = [];
let level = 1;
let correctAnswersInLevel = 0;

// Elementos del DOM
const startScreen = document.getElementById('start-screen');
const gameContent = document.getElementById('game-content');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const levelEl = document.getElementById('level');
const resultEl = document.getElementById('result');
const nextBtn = document.getElementById('next');
const restartBtn = document.getElementById('restart');
const highScoresEl = document.getElementById('high-scores');
const highScoresListEl = document.getElementById('high-scores-list');

// Función para mezclar preguntas
function shuffleQuestions() {
    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
}

// Iniciar juego con transición
function startGame() {
    shuffleQuestions();
    currentQuestion = 0;
    score = 0;
    level = 1;
    correctAnswersInLevel = 0;
    scoreEl.textContent = score;
    levelEl.textContent = level;
    timerEl.textContent = timeLeft;
    loadQuestion();
    startTimer();
    restartBtn.style.display = 'none';
    highScoresEl.style.display = 'none';
    startScreen.classList.add('hidden');
    setTimeout(() => {
        gameContent.classList.add('visible');
    }, 50); // Pequeño retraso para que la transición sea visible
}

// Cargar pregunta
function loadQuestion() {
    const q = shuffledQuestions[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = '';
    
    const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
    shuffledOptions.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.onclick = () => checkAnswer(option);
        optionsEl.appendChild(btn);
    });
    
    resultEl.textContent = '';
    nextBtn.style.display = 'none';
}

// Verificar respuesta
function checkAnswer(selected) {
    clearInterval(timer);
    const q = shuffledQuestions[currentQuestion];
    const buttons = optionsEl.getElementsByTagName('button');
    
    for (let btn of buttons) {
        btn.disabled = true;
    }

    if (selected === q.correct) {
        score += 10;
        correctAnswersInLevel++;
        scoreEl.textContent = score;
        resultEl.textContent = '¡Correcto!';
        resultEl.style.color = 'green';
    } else {
        resultEl.textContent = `Incorrecto. La respuesta correcta era: ${q.correct}`;
        resultEl.style.color = 'red';
    }

    nextBtn.style.display = 'block';
}

// Siguiente pregunta
function nextQuestion() {
    currentQuestion++;
    timeLeft = 30;
    timerEl.textContent = timeLeft;

    if (currentQuestion > 0 && currentQuestion % 5 === 0) {
        if (correctAnswersInLevel >= 3) {
            level++;
            levelEl.textContent = level;
            resultEl.textContent = `¡Subiste al nivel ${level}!`;
            resultEl.style.color = 'blue';
            correctAnswersInLevel = 0;
        } else {
            resultEl.textContent = `No alcanzaste el mínimo de 3 respuestas correctas (${correctAnswersInLevel}/5). ¡Juego terminado!`;
            resultEl.style.color = 'red';
            endGame();
            return;
        }
    }

    if (currentQuestion < shuffledQuestions.length) {
        loadQuestion();
        startTimer();
    } else {
        endGame();
    }
}

// Temporizador
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            resultEl.textContent = `¡Tiempo agotado! La respuesta correcta era: ${shuffledQuestions[currentQuestion].correct}`;
            resultEl.style.color = 'red';
            const buttons = optionsEl.getElementsByTagName('button');
            for (let btn of buttons) {
                btn.disabled = true;
            }
            nextBtn.style.display = 'block';
        }
    }, 1000);
}

// Guardar y mostrar mejores puntajes
function updateHighScores() {
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push(score);
    highScores.sort((a, b) => b - a);
    highScores = highScores.slice(0, 3);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    
    highScoresListEl.innerHTML = '';
    highScores.forEach((score, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${score} puntos`;
        highScoresListEl.appendChild(li);
    });
    highScoresEl.style.display = 'block';
}

// Fin del juego
function endGame() {
    questionEl.textContent = '¡Juego terminado!';
    optionsEl.innerHTML = '';
    if (currentQuestion === shuffledQuestions.length) {
        resultEl.textContent = `¡Completaste todos los niveles! Puntaje final: ${score}`;
    }
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'block';
    updateHighScores();
}

// Reiniciar juego con transición
function restartGame() {
    currentQuestion = 0;
    score = 0;
    level = 1;
    correctAnswersInLevel = 0;
    scoreEl.textContent = score;
    levelEl.textContent = level;
    timerEl.textContent = timeLeft;
    gameContent.classList.remove('visible');
    setTimeout(() => {
        startScreen.classList.remove('hidden');
    }, 500); // Espera a que el juego se desvanezca antes de mostrar la pantalla de inicio
}