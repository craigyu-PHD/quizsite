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
    '例如，在設計實驗時，就像烹飪時要控制食材比例以確保味道一致。要先明確定義每個食材（變項），並保持條件一致才能比較結果。',
    '比如開車時遵守交通規則，就如同研究時遵循正確的步驟：依序規劃、收集資料、分析與解釋，才能安全到達目的地。',
    '就像學習樂器需要反覆練習，研究方法也需要多次嘗試與修正，才能找到最佳的演奏方式或研究設計。',
    '好比在烤蛋糕時要精準掌握溫度，研究也需要控制條件，這樣才能確保結果的可靠性與一致性。',
    '就像在旅途中使用地圖導航，研究方法能指引你找到正確方向，避免在浩大的資訊中迷失。',
    '運動員透過訓練掌握技巧，研究者也需要反覆驗證假設；每次嘗試都能讓你更接近真相。',
    '整理家務時，你會按照順序清理，以免重複；研究設計也需要有條理的步驟，才能有效回答問題。',
    '譬如栽種植物需要適合的土壤與灌溉，同樣地，研究需要適當的樣本與方法，才能讓結果茁壯且有意義。'
    ,
    // 新增：規劃旅行比喻
    '比如像規劃旅行時需要事先做功課與準備，你也必須在研究前設計好方法與步驟，才能在進行實驗時更順利。',
    // 新增：準備材料比喻
    '就像做菜前要準備好材料與器具，研究也需要在開始前蒐集資料與確立工具，例如問卷或訪談提綱。'
];

// 延伸概念說明：用於在解析後提供更完整的背景與應用
// 我們提供更具體的研究方法相關延伸概念，幫助你從不同面向理解題目。
const extendedConcepts = [
    '此題涉及研究設計與操作化定義的概念。掌握好變項的定義與量測方式，能幫助你在實驗與調查中準確收集資料，避免誤差。',
    '這個概念與抽樣方法及統計推論相關。了解隨機抽樣與抽樣誤差能讓你更好地推論母群體特性，並合理解讀研究結果。',
    '題目中隱含對信度與效度的考量。熟悉這些指標有助於評估問卷或量表的品質，確保測量的結果既一致又符合研究目的。',
    '此類問題探討資料收集與分析技巧。透過比較不同量表與測量方式，你可以適切選擇定性或定量方法來解答研究問題。',
    '這個題目延伸至研究倫理與資料保護的重要性。遵循研究倫理原則與尊重受試者權益，是進行任何研究的基礎。',
    // 新增的延伸概念：偏差與中立性
    '本題也關涉到資料偏差與研究中立性的議題。了解如何識別並控制系統性誤差與隨機誤差，能提高研究結果的可信度。',
    // 新增：內在與外在效度
    '這個概念與因果關係及內在效度與外在效度之間的平衡有關。設計研究時需控制干擾變項，同時考慮結果能否推廣至更廣泛的群體。',
    // 新增：假設檢定流程
    '題目亦涉及假設檢定的流程，包括設定零假設與對立假設、選擇適當的檢定方法、計算統計量並解釋 p 值。熟悉這些步驟能幫助你正確解讀研究發現。',
    // 新增：效度類型
    '此外，此題也提醒我們思考測驗效度的多種類型，例如內容效度、建構效度與判準效度，這些概念有助於判斷測量工具是否符合研究目的。'
    ,
    // 新增：資料分析策略
    '此題還與資料分析策略有關。理解何時使用描述統計、推論統計、回歸分析或 ANOVA 等方法，能幫助你更正確地處理研究資料。',
    // 新增：相關與因果關係
    '此概念涉及時間序列與因果關係的區別，了解統計相關不代表因果關係是研究訓練的核心。',
    // 新增：對照組設計
    '掌握如何設定適當的對照組可以提升實驗的內外在效度，這是設計實驗研究的關鍵。',
    // 新增：研究倫理與審查
    '本題也提醒我們研究倫理與 IRB 審查的重要性，任何涉及人類受試的研究都需要尊重參與者的權益與隱私。'
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

    // 判斷是否答對，不使用鼓勵或安慰語
    if (selectedIndex === questionData.answer) {
        score += 10;
        feedbackEl.textContent = '答對了。';
        feedbackEl.classList.add('correct');
    } else {
        const correctText = questionData.options[questionData.answer];
        feedbackEl.textContent = `答錯了。正確答案是：${correctText}。`;
        feedbackEl.classList.add('incorrect');
    }

    // 如果有解釋，加入詳細解析
    if (questionData.explanation) {
        const expPara = document.createElement('p');
        expPara.textContent = `解析：${questionData.explanation}`;
        expPara.style.marginTop = '0.5rem';
        feedbackEl.appendChild(expPara);
    }
    // 加入延伸概念說明
    const extPara = document.createElement('p');
    const extText = extendedConcepts[Math.floor(Math.random() * extendedConcepts.length)];
    extPara.textContent = `延伸：${extText}`;
    extPara.style.marginTop = '0.5rem';
    feedbackEl.appendChild(extPara);
    // 加入生活例子說明
    const example = examples[Math.floor(Math.random() * examples.length)];
    const exPara = document.createElement('p');
    exPara.textContent = `例子：${example}`;
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
    // 首頁內容由 index.html 定義，僅需要在載入時觸發淡入動畫
    requestAnimationFrame(() => difficultySec.classList.add('visible'));
});