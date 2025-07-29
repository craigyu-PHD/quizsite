// 研究方法複習測驗 - 前端邏輯
// 假設 questions.js 已定義全域常數 QUESTION_BANK

let currentQuestions = [];
let currentIndex = 0;
let score = 0;

// 提示詞陣列：用於讓問題的呈現方式略有不同
// 為了讓題目敘述更加多樣化，增加更多不同開頭
const intros = [
    '請問：',
    '以下何者正確？',
    '請選出：',
    '請從以下選項中選擇正確答案：',
    '以下何者描述正確？',
    '請選擇一個最合適的答案：',
    '在這種情境中，你會怎麼選擇？',
    '從以下敘述中找出正確的選項：'
];

// 鼓勵語及安慰語
const encouragements = [
    '太棒了！繼續保持。',
    '做得很好！',
    '很棒的答案！',
    '回答很出色，繼續加油！',
    '你的理解很好，值得讚賞。',
    '非常棒的表現！',
    '保持這樣的努力！'
];

const consolations = [
    '別氣餒，下次會更好。',
    '不要灰心，繼續努力！',
    '加油，下次一定能答對。',
    '這題有些難，別擔心，繼續努力！',
    '你已經做得不錯，錯誤是學習的一部分。',
    '不需要灰心，下次再挑戰。',
    '慢慢來，你會越來越進步。'
];

// 用於增加解說的生活化例子
const examples = [
    '例如，在設計實驗時，就像烹飪時要控制食材比例以確保味道一致。',
    '比如開車時遵守交通規則，就如同研究時遵循正確的步驟。',
    '就像學習樂器需要反覆練習，研究方法也需要多次嘗試與修正。',
    '好比在烤蛋糕時要精準掌握溫度，研究也需要控制條件。',
    '就像在旅途中使用地圖導航，研究方法能指引你找到正確方向。',
    '就像運動員透過練習掌握技巧，研究者也需要反覆驗證假設。',
    '例如整理家務時，你會按照順序完成，研究設計也需要有條理的步驟。'
];

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
    const difficultySec = document.getElementById('difficulty-section');
    const quizSec = document.getElementById('quiz-section');
    const resultSec = document.getElementById('result-section');
    // 隱藏其他區塊
    difficultySec.style.display = 'none';
    resultSec.style.display = 'none';
    // 移除可見類別，以便重新播放淡入動畫
    difficultySec.classList.remove('visible');
    resultSec.classList.remove('visible');

    // 顯示並淡入 quiz 區塊
    quizSec.style.display = 'block';
    // 觸發瀑布式淡入
    requestAnimationFrame(() => quizSec.classList.add('visible'));

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
    // 題目文字：加入隨機提示詞使每次提問略有不同
    const intro = intros[Math.floor(Math.random() * intros.length)];
    questionText.textContent = intro + questionData.question;
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
        const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
        feedbackEl.textContent = encouragement;
        feedbackEl.classList.add('correct');
    } else {
        const correctText = questionData.options[questionData.answer];
        const consolation = consolations[Math.floor(Math.random() * consolations.length)];
        feedbackEl.textContent = `答錯了。正確答案是：${correctText}。${consolation}`;
        feedbackEl.classList.add('incorrect');
    }

    // 如果有解釋，加入生活化例子
    if (questionData.explanation) {
        const expPara = document.createElement('p');
        expPara.textContent = `解析：${questionData.explanation}`;
        expPara.style.marginTop = '0.5rem';
        feedbackEl.appendChild(expPara);
    }
    // 加入生活例子
    const example = examples[Math.floor(Math.random() * examples.length)];
    const exPara = document.createElement('p');
    exPara.textContent = example;
    exPara.style.marginTop = '0.5rem';
    feedbackEl.appendChild(exPara);

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

    // 隱藏 quiz 區塊，並移除 visible class
    quizSection.style.display = 'none';
    quizSection.classList.remove('visible');

    // 顯示 result 區塊並淡入
    resultSection.style.display = 'block';
    requestAnimationFrame(() => resultSection.classList.add('visible'));

    // 使用 highlight-score 樣式強調分數
    scoreText.innerHTML = `總分：<span class="highlight-score">${score}</span> 分 / ${currentQuestions.length * 10} 分`;
    // 根據分數給予鼓勵或安慰
    const percentage = (score / (currentQuestions.length * 10)) * 100;
    if (percentage >= 80) {
        messageText.textContent = '太棒了！你已經掌握研究方法的精髓。';
    } else if (percentage >= 60) {
        messageText.textContent = '做得不錯，還有一些可以加強的地方。';
    } else {
        messageText.textContent = '不要灰心，再接再厲！學習是循序漸進的。';
    }

    // 施放彩帶動畫
    launchConfetti();
}

// 重新開始
function restartQuiz() {
    const difficultySec = document.getElementById('difficulty-section');
    const quizSec = document.getElementById('quiz-section');
    const resultSec = document.getElementById('result-section');

    // 隱藏 quiz 和 result 區塊
    quizSec.style.display = 'none';
    resultSec.style.display = 'none';
    quizSec.classList.remove('visible');
    resultSec.classList.remove('visible');

    // 顯示 difficulty 區塊並淡入
    difficultySec.style.display = 'block';
    requestAnimationFrame(() => difficultySec.classList.add('visible'));

    // 移除彩帶，重置效果
    removeConfetti();
}

// 施放彩帶動畫
function launchConfetti() {
    const colors = ['#f44336', '#4caf50', '#ffeb3b', '#2196f3', '#ff9800', '#9c27b0'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
        const size = Math.random() * 8 + 8;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        // 隨機延遲
        confetti.style.animationDelay = (Math.random() * 1) + 's';
        document.body.appendChild(confetti);
        // 移除已完成的彩帶
        setTimeout(() => {
            confetti.remove();
        }, 7000);
    }
}

// 清除彩帶
function removeConfetti() {
    document.querySelectorAll('.confetti-piece').forEach(el => el.remove());
}

// 在頁面載入完成後，讓難度區塊淡入
document.addEventListener('DOMContentLoaded', () => {
    const difficultySec = document.getElementById('difficulty-section');
    // 確保頁面載入時淡入第一個區塊
    requestAnimationFrame(() => difficultySec.classList.add('visible'));
});