let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playSound(type) {
    if (!audioCtx) return;
    try {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        const now = audioCtx.currentTime;

        if (type === 'click') {
            osc.type = 'sine'; osc.frequency.setValueAtTime(400, now);
            gainNode.gain.setValueAtTime(0.05, now);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc.start(now); osc.stop(now + 0.08);
        } else if (type === 'correct') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(523.25, now);
            osc.frequency.setValueAtTime(659.25, now + 0.1);
            osc.frequency.setValueAtTime(783.99, now + 0.2);
            gainNode.gain.setValueAtTime(0.08, now);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            osc.start(now); osc.stop(now + 0.4);
        } else if (type === 'wrong') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.setValueAtTime(100, now + 0.15);
            gainNode.gain.setValueAtTime(0.1, now);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            osc.start(now); osc.stop(now + 0.3);
        } else if (type === 'tick') {
            osc.type = 'sine'; osc.frequency.setValueAtTime(800, now);
            gainNode.gain.setValueAtTime(0.03, now);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            osc.start(now); osc.stop(now + 0.05);
        }
    } catch (e) {}
}

document.addEventListener('DOMContentLoaded', () => {
    const questionsLvl1 = [
        { 
            question: "Яка столиця України?", 
            answers: [
                { text: "Львів", sticker: "🏰" },
                { text: "Харків", sticker: "🏙️" },
                { text: "Київ", sticker: "👑" },
                { text: "Одеса", sticker: "⚓" }
            ], 
            correct: 2, 
            sticker: "🏛️",
            explanation: "Київ — столиця України з понад 1500-річною історією." 
        },
        { 
            question: "Які кольори має державний прапор України?", 
            answers: [
                { text: "Синьо-жовті", sticker: "🟦🟨" },
                { text: "Червоно-чорні", sticker: "🟥⬛" },
                { text: "Синьо-білі", sticker: "🟦⬜" },
                { text: "Жовто-зелені", sticker: "🟨🟩" }
            ], 
            correct: 0, 
            sticker: "🇺🇦",
            explanation: "Синій символізує мирне небо, а жовтий — пшеничні поля." 
        },
        { 
            question: "Яка найбільша річка в Україні?", 
            answers: [
                { text: "Дунай", sticker: "🚢" },
                { text: "Південний Буг", sticker: "🏞️" },
                { text: "Дніпро", sticker: "🌊" },
                { text: "Дністер", sticker: "🛶" }
            ], 
            correct: 2, 
            sticker: "💧",
            explanation: "Дніпро — головна водна артерія України та третя за довжиною річка Європи." 
        },
        { 
            question: "Яке місто вважається культурною столицею західної України?", 
            answers: [
                { text: "Ужгород", sticker: "🌸" },
                { text: "Львів", sticker: "☕" },
                { text: "Івано-Франківськ", sticker: "🌲" },
                { text: "Чернівці", sticker: "🏛️" }
            ], 
            correct: 1, 
            sticker: "🦁",
            explanation: "Львів славиться своєю архітектурою, затишними кав'ярнями та атмосферними вуличками." 
        },
        { 
            question: "Яка національна валюта України?", 
            answers: [
                { text: "Долар", sticker: "💵" },
                { text: "Євро", sticker: "💶" },
                { text: "Гривня", sticker: "₴" },
                { text: "Злотий", sticker: "🪙" }
            ], 
            correct: 2, 
            sticker: "💰",
            explanation: "Гривня була введена в обіг у вересні 1996 року під час грошової реформи." 
        },
        { 
            question: "Яка гора є найвищою в Українських Карпатах?", 
            answers: [
                { text: "Говерла", sticker: "🏔️" },
                { text: "Піп Іван", sticker: "🛖" },
                { text: "Петрос", sticker: "⛰️" },
                { text: "Брескул", sticker: "🏞️" }
            ], 
            correct: 0, 
            sticker: "🥾",
            explanation: "Висота Говерли становить 2061 метр над рівнем моря." 
        },
        { 
            question: "Яка традиційна українська страва готується з буряком та капустою?", 
            answers: [
                { text: "Вареники", sticker: "🥟" },
                { text: "Борщ", sticker: "🥣" },
                { text: "Котлета по-київськи", sticker: "🍗" },
                { text: "Галушки", sticker: "🍲" }
            ], 
            correct: 1, 
            sticker: "🍲",
            explanation: "Культура приготування українського борщу внесена до спадщини ЮНЕСКО." 
        },
        { 
            question: "Який символ зображений на малому гербі України?", 
            answers: [
                { text: "Лев", sticker: "🦁" },
                { text: "Козак", sticker: "⚔️" },
                { text: "Тризуб", sticker: "🔱" },
                { text: "Калина", sticker: "🍒" }
            ], 
            correct: 2, 
            sticker: "🛡️",
            explanation: "Тризуб має тисячолітню історію та був родовим знаком князів Рюриковичів." 
        },
        { 
            question: "Яке море омиває південні береги України?", 
            answers: [
                { text: "Балтійське", sticker: "🧊" },
                { text: "Чорне", sticker: "🌊" },
                { text: "Каспійське", sticker: "🗺️" },
                { text: "Середземне", sticker: "🌴" }
            ], 
            correct: 1, 
            sticker: "🌅",
            explanation: "Південні береги України омиваються Чорним та Азовським морями." 
        },
        { 
            question: "Хто є автором слів гімну України «Ще не вмерла України...»?", 
            answers: [
                { text: "Тарас Шевченко", sticker: "📜" },
                { text: "Іван Франко", sticker: "🖊️" },
                { text: "Леся Українка", sticker: "📖" },
                { text: "Павло Чубинський", sticker: "✍️" }
            ], 
            correct: 3, 
            sticker: "🎶",
            explanation: "Вірш Павла Чубинського був написаний у 1862 році, а музику створив Михайло Вербицький." 
        },
        { 
            question: "Який народний музичний інструмент є символом українського козацтва?", 
            answers: [
                { text: "Скрипка", sticker: "🎻" },
                { text: "Бандура", sticker: "🪕" },
                { text: "Цимбали", sticker: "🎹" },
                { text: "Трембіта", sticker: "🎺" }
            ], 
            correct: 1, 
            sticker: "🎵",
            explanation: "Кобзарі та бандуристи супроводжували козацькі походи і співали про подвиги героїв." 
        },
        { 
            question: "Яка рослина разом із вербою вважається народним символом України?", 
            answers: [
                { text: "Дуб", sticker: "🌳" },
                { text: "Калина", sticker: "🍒" },
                { text: "Соняшник", sticker: "🌻" },
                { text: "Барвінок", sticker: "🌿" }
            ], 
            correct: 1, 
            sticker: "🌺",
            explanation: "«Без верби і калини нема України» — одне з найвідоміших народних прислів'їв." 
        }
    ];

    const questionsLvl2 = [
        { 
            question: "Як називається найглибша станція метро у світі, яка розташована в Києві?", 
            answers: [
                { text: "Вокзальна", sticker: "🚉" },
                { text: "Арсенальна", sticker: "🚇" },
                { text: "Хрещатик", sticker: "🌆" },
                { text: "Театральна", sticker: "🎭" }
            ], 
            correct: 1, 
            sticker: "🚇",
            explanation: "Станція «Арсенальна» залягає на глибині 105.5 метрів під землею." 
        },
        { 
            question: "Як називається найдовший у світі духовий музичний інструмент родом з Карпат?", 
            answers: [
                { text: "Сопілка", sticker: "🪈" },
                { text: "Трембіта", sticker: "🎺" },
                { text: "Бандура", sticker: "🪕" },
                { text: "Дримба", sticker: "🎵" }
            ], 
            correct: 1, 
            sticker: "📯",
            explanation: "Довжина гуцульської трембіти може сягати 4 метрів, а звук чутно на 10 кілометрів!" 
        },
        { 
            question: "Яку назву має найбільша пустеля в Європі, розташована на півдні України?", 
            answers: [
                { text: "Олешківські піски", sticker: "🏜️" },
                { text: "Таврійські степи", sticker: "🌾" },
                { text: "Кінбурнська коса", sticker: "🏝️" },
                { text: "Асканійські бархани", sticker: "🐪" }
            ], 
            correct: 0, 
            sticker: "🌵",
            explanation: "Олешківські піски на Херсонщині — величезний піщаний масив із власними барханами." 
        },
        { 
            question: "Яке місто України неофіційно називають «містом ста левів»?", 
            answers: [
                { text: "Київ", sticker: "🏰" },
                { text: "Львів", sticker: "🦁" },
                { text: "Чернігів", sticker: "⛪" },
                { text: "Житомир", sticker: "🌳" }
            ], 
            correct: 1, 
            sticker: "👑",
            explanation: "Скульптури, барельєфи та зображення левів прикрашають понад 450 місць у Львові." 
        },
        { 
            question: "Який літак українського виробництва став найважчим вантажним літаком у світі?", 
            answers: [
                { text: "АН-124 «Руслан»", sticker: "🛫" },
                { text: "АН-225 «Мрія»", sticker: "✈️" },
                { text: "АН-74", sticker: "🛩️" },
                { text: "АН-140", sticker: "🚁" }
            ], 
            correct: 1, 
            sticker: "🚀",
            explanation: "АН-225 «Мрія» встановив понад 240 світових рекордів за вантажопідйомністю." 
        },
        { 
            question: "У якому місті знаходиться єдина у світі підземна гіпсова печера Оптимістична?", 
            answers: [
                { text: "Біля Тернополя", sticker: "🦇" },
                { text: "Біля Житомира", sticker: "🌲" },
                { text: "Під Одесою", sticker: "🌊" },
                { text: "В Карпатах", sticker: "🏔️" }
            ], 
            correct: 0, 
            sticker: "🕳️",
            explanation: "Печера Оптимістична на Тернопільщині — найдовша гіпсова печера у світі (понад 260 км)." 
        },
        { 
            question: "Як називається унікальний романтичний зелений тунель з дерев на Рівненщині?", 
            answers: [
                { text: "Тунель Закоханих", sticker: "💚" },
                { text: "Казковий ліс", sticker: "🌲" },
                { text: "Зелена алея", sticker: "🍃" },
                { text: "Парк Мрій", sticker: "✨" }
            ], 
            correct: 0, 
            sticker: "🚂",
            explanation: "Тунель кохання у селищі Клевань є популярним об'єктом для туристів зі всього світу." 
        },
        { 
            question: "Який географічний центр згідно з вимірюваннями 1887 року розташований на Закарпатті?", 
            answers: [
                { text: "Центр Європи", sticker: "🌍" },
                { text: "Центр Євразії", sticker: "🌏" },
                { text: "Центр Карпат", sticker: "🏔️" },
                { text: "Центр Древньої Русі", sticker: "📜" }
            ], 
            correct: 0, 
            sticker: "📍",
            explanation: "Поблизу містечка Рахів на Закарпатті встановлено геодезичний знак центру Європи." 
        },
        { 
            question: "Скільки областей входить до складу України?", 
            answers: [
                { text: "22", sticker: "🔢" },
                { text: "24", sticker: "🗺️" },
                { text: "25", sticker: "📍" },
                { text: "27", sticker: "🏢" }
            ], 
            correct: 1, 
            sticker: "🧩",
            explanation: "Адміністративний устрій України включає 24 області, АР Крим та 2 міста зі спецстатусом." 
        },
        { 
            question: "Який відомий український композитор написав всесвітньо відому мелодію «Щедрик»?", 
            answers: [
                { text: "Микола Лисенко", sticker: "🎼" },
                { text: "Микола Леонтович", sticker: "🔔" },
                { text: "Михайло Вербицький", sticker: "🎻" },
                { text: "Мирослав Скорик", sticker: "🎹" }
            ], 
            correct: 1, 
            sticker: "❄️",
            explanation: "«Щедрик» Миколи Леонтовича відомий у всьому світі під назвою «Carol of the Bells»." 
        },
        { 
            question: "Який біосферний заповідник на півдні України збереже незайманий цілинний степ?", 
            answers: [
                { text: "Асканія-Нова", sticker: "🦓" },
                { text: "Подільські Товтри", sticker: "🏞️" },
                { text: "Горгани", sticker: "🌲" },
                { text: "Шацькі озера", sticker: "🌊" }
            ], 
            correct: 0, 
            sticker: "🦬",
            explanation: "Асканія-Нова — найстаріший степовий заповідник світу, заснований у XIX столітті." 
        },
        { 
            question: "Як називається найбільша фортеця України, розташована над Дністром у Чернівецькій області?", 
            answers: [
                { text: "Кам'янецька", sticker: "🏰" },
                { text: "Хотинська", sticker: "🛡️" },
                { text: "Аккерманська", sticker: "⚓" },
                { text: "Олеська", sticker: "⚔️" }
            ], 
            correct: 1, 
            sticker: "🏰",
            explanation: "Хотинська фортеця відома своїми величними 40-метровими стінами та багатою історією." 
        }
    ];

    let currentQuestions = questionsLvl1;
    let isLevel2 = false;

    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');

    const questionTextElement = document.querySelector('#question-text');
    const questionStickerElement = document.querySelector('#question-sticker');
    const answersContainerElement = document.querySelector('#answers-container');
    const questionTrackerElement = document.querySelector('#question-tracker');
    const scoreTrackerElement = document.querySelector('#score-tracker');
    const streakTrackerElement = document.querySelector('#streak-tracker');
    const timerElement = document.querySelector('#timer');
    const timerBar = document.querySelector('#timer-bar');
    const finalAnswersElement = document.querySelector('#final-answers');
    const finalGradeElement = document.querySelector('#final-grade');
    const resultCommentElement = document.querySelector('#result-comment');
    const reviewListElement = document.querySelector('#review-list');

    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');
    const nextLevelBtn = document.querySelector('#next-level-btn');

    let questionIndex = 0;
    let score = 0;
    let streak = 0;
    let userAnswersLog = [];
    let timeLeft = 6;
    let timerInterval;
    let isAnswering = false;

    startBtn.addEventListener('click', () => { initAudio(); startQuiz(false); });
    restartBtn.addEventListener('click', () => startQuiz(false));
    nextLevelBtn.addEventListener('click', () => startQuiz(true));

    function startQuiz(startLvl2 = false) {
        isLevel2 = startLvl2;
        currentQuestions = isLevel2 ? questionsLvl2 : questionsLvl1;
        
        questionIndex = 0;
        score = 0;
        streak = 0;
        userAnswersLog = [];
        isAnswering = false;
        
        startScreen.style.display = 'none';
        resultScreen.style.display = 'none';
        nextLevelBtn.style.display = 'none';
        quizScreen.style.display = 'block';
        
        showQuestion(currentQuestions[questionIndex]);
    }

    function startTimer() {
        clearInterval(timerInterval);
        timeLeft = 6;
        timerElement.textContent = `⏱ ${timeLeft}`;
        timerBar.style.transition = 'none';
        timerBar.style.width = '100%';

        setTimeout(() => {
            timerBar.style.transition = 'width 6s linear';
            timerBar.style.width = '0%';
        }, 50);

        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `⏱ ${timeLeft}`;

            if (timeLeft <= 2 && timeLeft > 0) playSound('tick');

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                if (!isAnswering) handleTimeOut();
            }
        }, 1000);
    }

    function handleTimeOut() {
        isAnswering = true;
        playSound('wrong');
        streak = 0;
        updateStreakUI();

        const currentQ = currentQuestions[questionIndex];
        userAnswersLog.push({
            question: currentQ.question,
            userChoice: "Час вичерпано ⌛",
            correctChoice: currentQ.answers[currentQ.correct].text,
            isCorrect: false,
            explanation: currentQ.explanation
        });

        const allButtons = answersContainerElement.querySelectorAll('.answer-btn');
        if (allButtons[currentQ.correct]) {
            allButtons[currentQ.correct].classList.add('correct');
        }

        setTimeout(() => { nextQuestion(); }, 900);
    }

    function showQuestion(question) {
        isAnswering = false;
        answersContainerElement.innerHTML = '';
        questionTextElement.textContent = question.question;
        questionStickerElement.textContent = question.sticker;
        questionTrackerElement.textContent = `Запитання ${questionIndex + 1} / ${currentQuestions.length}`;
        scoreTrackerElement.textContent = `Очки: ${score}`;
        updateStreakUI();

        for (let i = 0; i < question.answers.length; i++) {
            const button = document.createElement('button');
            button.classList.add('answer-btn');

            button.innerHTML = `
                <div class="answer-sticker-thumb">${question.answers[i].sticker}</div>
                <span class="answer-text-label">${question.answers[i].text}</span>
            `;

            button.addEventListener('click', () => selectAnswer(i));
            answersContainerElement.appendChild(button);
        }

        startTimer();
    }

    function selectAnswer(selectedIndex) {
        if (isAnswering) return;
        isAnswering = true;
        clearInterval(timerInterval);
        playSound('click');

        const currentQ = currentQuestions[questionIndex];
        const allButtons = answersContainerElement.querySelectorAll('.answer-btn');
        const isCorrect = selectedIndex === currentQ.correct;

        if (isCorrect) {
            playSound('correct');
            allButtons[selectedIndex].classList.add('correct');
            score += 10 + (streak * 2);
            streak++;
        } else {
            playSound('wrong');
            allButtons[selectedIndex].classList.add('wrong');
            allButtons[currentQ.correct].classList.add('correct');
            streak = 0;
        }

        updateStreakUI();

        userAnswersLog.push({
            question: currentQ.question,
            userChoice: currentQ.answers[selectedIndex].text,
            correctChoice: currentQ.answers[currentQ.correct].text,
            isCorrect: isCorrect,
            explanation: currentQ.explanation
        });

        setTimeout(() => { nextQuestion(); }, 900);
    }

    function updateStreakUI() {
        if (streak > 1) {
            streakTrackerElement.style.display = 'inline';
            streakTrackerElement.textContent = `🔥 Комбо: x${streak}`;
        } else {
            streakTrackerElement.style.display = 'none';
        }
    }

    function nextQuestion() {
        questionIndex++;
        if (questionIndex < currentQuestions.length) {
            showQuestion(currentQuestions[questionIndex]);
        } else {
            showResults();
        }
    }

    function showResults() {
        quizScreen.style.display = 'none';
        resultScreen.style.display = 'block';

        const correctCount = userAnswersLog.filter(item => item.isCorrect).length;
        const total = currentQuestions.length;
        
        finalAnswersElement.textContent = `Правильних відповідей: ${correctCount} з ${total} | Набрано очок: ${score}`;
        
        let gradeNum = Math.round((correctCount / total) * 12);
        if (gradeNum < 1 && correctCount > 0) gradeNum = 1;
        finalGradeElement.textContent = `Оцінка: ${gradeNum} / 12`;

        if (correctCount === total) {
            resultCommentElement.textContent = "Абсолютний тріумф! Ти справжній знавець України! 🇺🇦🏆";
            resultCommentElement.style.color = "#4ade80";
            if (!isLevel2) {
                nextLevelBtn.style.display = 'block';
            }
        } else if (correctCount >= total * 0.7) {
            resultCommentElement.textContent = "Дуже гарний результат! Так тримати! ⭐";
            resultCommentElement.style.color = "#38bdf8";
            if (!isLevel2) {
                nextLevelBtn.style.display = 'block';
            }
        } else {
            resultCommentElement.textContent = "Непогано, але є привід повторити факти про Україну! 💪";
            resultCommentElement.style.color = "#facc15";
        }

        reviewListElement.innerHTML = '';
        userAnswersLog.forEach((log, index) => {
            const item = document.createElement('div');
            item.classList.add('review-item');
            if (log.isCorrect) item.classList.add('correct-item');

            item.innerHTML = `
                <div class="review-question">${index + 1}. ${log.question}</div>
                <div class="review-answer">Твоя відповідь: <b>${log.userChoice}</b> ${log.isCorrect ? '✅' : '❌'}</div>
                ${!log.isCorrect ? `<div class="review-answer">Правильна відповідь: <b>${log.correctChoice}</b></div>` : ''}
                <div class="review-explanation">${log.explanation}</div>
            `;
            reviewListElement.appendChild(item);
        });
    }
});
