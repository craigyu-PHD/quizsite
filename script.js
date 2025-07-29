// 研究方法複習測驗 - 前端邏輯
// 假設 questions.js 已定義全域常數 QUESTION_BANK

let currentQuestions = [];
let currentIndex = 0;
let score = 0;

// 隨機排序陣列
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 開始測驗
function startQuiz(difficulty) {
    // 過濾符合難度的題目
    const filtered = QUESTION_BANK.filter(q => q.difficulty === difficulty);
    // 打亂順序並取前 10 題
    currentQuestions = shuffle(filtered).slice(0, 10);
    currentIndex = 0;
    score = 0;

    // 切換介面
    document.getElementById('difficulty-section').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    document.getElementById('result-section').style.display = 'none';

    showQuestion();
}

// 顯示目前題目
function showQuestion() {
    const questionData = currentQuestions[currentIndex];
    const questionText = document.getElementById('question-text');
    const optionsList = document.getElementById('options-list');
    const feedbackEl = document.getElementById('feedback');
    const nextBtn = document.getElementById('next-btn');
    const counter = document.getElementById('question-counter');

    // 更新題號
    counter.textContent = `第 ${currentIndex + 1} / ${currentQuestions.length} 題`;
    // 題目文字
    questionText.textContent = questionData.question;
    // 清空選項
    optionsList.innerHTML = '';
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';
    nextBtn.style.display = 'none';

    // 建立選項按鈕
    questionData.options.forEach((opt, idx) => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.onclick = () => selectOption(idx);
        li.appendChild(btn);
        optionsList.appendChild(li);
    });
}

// 處理選擇
function selectOption(selectedIndex) {
    const questionData = currentQuestions[currentIndex];
    const feedbackEl = document.getElementById('feedback');
    const nextBtn = document.getElementById('next-btn');
    const optionButtons = document.querySelectorAll('#options-list button');

    // 禁用所有按鈕，避免重複點選
    optionButtons.forEach(btn => {
        btn.disabled = true;
    });

    if (selectedIndex === questionData.answer) {
        score += 10;
        feedbackEl.textContent = '答對了！';
        feedbackEl.classList.add('correct');
    } else {
        const correctText = questionData.options[questionData.answer];
        feedbackEl.textContent = `答錯了。正確答案是：${correctText}`;
        feedbackEl.classList.add('incorrect');
    }

    // 如果有解釋，顯示在下一行
    if (questionData.explanation) {
        const expPara = document.createElement('p');
        expPara.textContent = `解析：${questionData.explanation}`;
        expPara.style.marginTop = '0.5rem';
        feedbackEl.appendChild(expPara);
    }

    nextBtn.style.display = 'inline-block';
}

// 下一題
function nextQuestion() {
    currentIndex++;
    if (currentIndex < currentQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// 顯示結果
function showResults() {
    const resultSection = document.getElementById('result-section');
    const quizSection = document.getElementById('quiz-section');
    const scoreText = document.getElementById('score-text');
    const messageText = document.getElementById('message-text');

    quizSection.style.display = 'none';
    resultSection.style.display = 'block';

    scoreText.textContent = `總分：${score} 分 / ${currentQuestions.length * 10} 分`;
    // 根據分數給予鼓勵或安慰
    const percentage = (score / (currentQuestions.length * 10)) * 100;
    if (percentage >= 80) {
        messageText.textContent = '太棒了！你已經掌握研究方法的精髓。';
    } else if (percentage >= 60) {
        messageText.textContent = '做得不錯，還有一些可以加強的地方。';
    } else {
        messageText.textContent = '不要灰心，再接再厲！';
    }
}

// 重新開始
function restartQuiz() {
    document.getElementById('difficulty-section').style.display = 'block';
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('result-section').style.display = 'none';
}