
const startButton = document.getElementById("startButton");
const startScreen = document.getElementById("startScreen");

const mapScreen = document.getElementById("mapScreen");

const basicButton = document.getElementById("basicButton");
const basicProgress = document.getElementById("basicProgress");
const basicPercent = document.getElementById("basicPercent");
const japanButton = document.getElementById("japanButton");
const japanProgress = document.getElementById("japanProgress");
const japanPercent = document.getElementById("japanPercent");
const asiaButton = document.getElementById("asiaButton");
const asiaProgress = document.getElementById("asiaProgress");
const asiaPercent = document.getElementById("asiaPercent");
const europeButton = document.getElementById("europeButton");
const europeProgress = document.getElementById("europeProgress");
const europePercent = document.getElementById("europePercent");

const africaButton = document.getElementById("africaButton");
const northAmericaButton = document.getElementById("northAmericaButton");
const southAmericaButton = document.getElementById("southAmericaButton");
const oceaniaButton = document.getElementById("oceaniaButton");

const africaProgress = document.getElementById("africaProgress");
const africaPercent = document.getElementById("africaPercent");

const northAmericaProgress = document.getElementById("northAmericaProgress");
const northAmericaPercent = document.getElementById("northAmericaPercent");

const southAmericaProgress = document.getElementById("southAmericaProgress");
const southAmericaPercent = document.getElementById("southAmericaPercent");

const oceaniaProgress = document.getElementById("oceaniaProgress");
const oceaniaPercent = document.getElementById("oceaniaPercent");

const areaElements = {
    basic: {
        button: basicButton,
        progress: basicProgress,
        percent: basicPercent
    },
    japan: {
        button: japanButton,
        progress: japanProgress,
        percent: japanPercent
    },
    asia: {
        button: asiaButton,
        progress: asiaProgress,
        percent: asiaPercent
    },
    europe: {
        button: europeButton,
        progress: europeProgress,
        percent: europePercent
    },
    africa: {
        button: africaButton,
        progress: africaProgress,
        percent: africaPercent
    },
    northAmerica: {
        button: northAmericaButton,
        progress: northAmericaProgress,
        percent: northAmericaPercent
    },
    southAmerica: {
        button: southAmericaButton,
        progress: southAmericaProgress,
        percent: southAmericaPercent
    },
    oceania: {
        button: oceaniaButton,
        progress: oceaniaProgress,
        percent: oceaniaPercent
    }
};

let currentArea = "";
let clearedQuestions = {
    basic: [],
    japan: [],
    asia: [],
    europe: [],
    africa: [],
    northAmerica: [],
    southAmerica: [],
    oceania: []
};

const quizScreen = document.getElementById("quizScreen");
let currentQuestions = [];

const questionText = document.getElementById("questionText");
const choice1 = document.getElementById("choice1");
const choice2 = document.getElementById("choice2");
const choice3 = document.getElementById("choice3");
const choice4 = document.getElementById("choice4");
const choiceButtons = [choice1, choice2, choice3, choice4];
const skipButton = document.getElementById("skipButton");
const particleArea = document.getElementById("particleArea");

const result = document.getElementById("result");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");

const resultScreen = document.getElementById("resultScreen");
const scoreText = document.getElementById("scoreText");

const questionNumber = document.getElementById("questionNumber");

const missionNumber = document.getElementById("missionNumber");
const progressFill = document.getElementById("progressFill");
const progressBar = document.getElementById("progressBar");

const missionComplete = document.getElementById("missionComplete");
const resultMessage = document.getElementById("resultMessage");
const analyzingScreen = document.getElementById("analyzingScreen");
const analysisFill = document.getElementById("analysisFill");
const analysisPercent = document.getElementById("analysisPercent");
const analysisBar = document.getElementById("analysisBar");

const starRating = document.getElementById("starRating");
let wrongAnswers = [];
const wrongAnswerList = document.getElementById("wrongAnswerList");
const reviewArea = document.getElementById("reviewArea");



//タイトル画面

//スタートが押されたら地域選択画面表示
startButton.addEventListener("click", function () {
    startScreen.style.display = "none";
    //マップをだす
    mapScreen.style.display = "block";

});


//地域選択画面

//地域のボタンが押されたら問題表示
//キーと値をセットで取り出し、配列に分割代入
Object.entries(areaElements).forEach(function ([area, elements]) {

    elements.button.addEventListener("click", function () {
        startAreaQuiz(area);
    });

});

//エリアからランダムに3問選んで問題表示
function startAreaQuiz(area) {
    currentArea = area;
    currentQuestions = questionData[area];
    selectedQuestions = [];
    while (selectedQuestions.length < 3) {
        const randomIndex = Math.floor(Math.random() * currentQuestions.length);
        if (!selectedQuestions.includes(currentQuestions[randomIndex])) {
            selectedQuestions.push(currentQuestions[randomIndex]);
        }
    }
    currentQuestionIndex = 0;
    score = 0;
    mapScreen.style.display = "none";
    quizScreen.style.display = "block";
    showQuestion();
}

//問題表示、また選択肢を押せるようにする
function showQuestion() {
    //パネルが光らないようにしておく
    quizScreen.classList.remove("correctFlash");

    const currentQuestion = selectedQuestions[currentQuestionIndex];

    //何問目か
    missionNumber.textContent = `MISSION　${currentQuestionIndex + 1} / ${selectedQuestions.length}`;
    //問題文表示
    questionText.textContent = currentQuestion.text;
    //選択肢表示、押せるようにする
    choiceButtons.forEach(function (button, index) {
        button.textContent = currentQuestion.choices[index];
        button.disabled = false;
        button.className = "";
    });
    //スキップボタンを押せるようにする
    skipButton.disabled = false;
    //正誤判定を消す
    result.textContent = "";
    result.className = "";
}

//選択肢が押されたら正誤判定する
choiceButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
        const currentQuestion = selectedQuestions[currentQuestionIndex];
        checkAnswer(currentQuestion.choices[index], button);
    });
});

//DATA　COLLECTIONを進める関数
function updateDataCollection() {
    //何問めまで終わったかを計算
    const progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
    //ゲージを進める
    progressFill.style.width = `${progress}%`;
    //光をいったんリセット
    progressFill.classList.remove("progressFlash");
    progressBar.classList.remove("barFrameFlash");
    //アニメーションをいったんリセット
    void progressFill.offsetWidth;
    void progressBar.offsetWidth;
    //光らせる
    progressFill.classList.add("progressFlash");
    progressBar.classList.add("barFrameFlash");
    //0.6秒後に光を消す
    setTimeout(function () {
        progressFill.classList.remove("progressFlash");
        progressBar.classList.remove("barFrameFlash");
    }, 600);
}
//スキップが押されたら
skipButton.addEventListener("click", function () {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    //不正解として表示
    result.textContent = "× SCAN SKIPPED";
    //赤くするためにクラスをつける
    result.className = "incorrect";
    //間違いデータに保存
    saveWrongAnswer(currentQuestion, "SKIPPED");
    //正解を緑にする
    showCorrectChoice(currentQuestion);
    //DATACOLLECTIONも進める
    updateDataCollection();
    //問題を終了状態にする
    finishQuestion();
});

//正誤判定、次へが出現
function checkAnswer(selectedAnswer, selectedButton) {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answer) {
        //正解したときの処理
        handleCorrectAnswer(currentQuestion, selectedButton);
    } else {
        //不正解の時の処理
        handleWrongAnswer(currentQuestion, selectedAnswer, selectedButton);
    }
    //DATA　COLLECTIONを進める
    updateDataCollection();
    //問題を終了状態にする
    finishQuestion();
}

//正解したときの処理
function handleCorrectAnswer(currentQuestion, selectedButton) {
    //〇を表示
    result.innerHTML = `
        <span class="correctMark">〇</span>
        <span class="correctText en">DATA COLLECTED</span>
    `;
    //パネルを光らせる
    quizScreen.classList.remove("correctFlash");
    void quizScreen.offsetWidth;
    quizScreen.classList.add("correctFlash");
    //正解のエフェクト
    createParticles();
    //緑にするためにクラスをつける
    result.className = "correct";
    selectedButton.className = "correctButton";
    //スコアを増やす
    score++;
    //エリアの進捗に入っていなかったら追加
    if (!clearedQuestions[currentArea].includes(currentQuestion.id)) {
        clearedQuestions[currentArea].push(currentQuestion.id);
    }
}

//不正解の時の処理
function handleWrongAnswer(currentQuestion, selectedAnswer, selectedButton) {
    //×を表示
    result.textContent = "× SCAN FAILED";
    //赤にするためにクラスをつける
    result.className = "incorrect";
    selectedButton.className = "incorrectButton";
    //間違えた問題を配列に保存
    saveWrongAnswer(currentQuestion, selectedAnswer);
    //正しい答えを緑にするためにクラスをつける
    showCorrectChoice(currentQuestion);
}

//REVIEW用のデータを保存する
function saveWrongAnswer(currentQuestion, selectedAnswer) {
    wrongAnswers.push({
        questionNumber: currentQuestionIndex + 1,
        question: currentQuestion.text,
        correctAnswer: currentQuestion.answer,
        selectedAnswer: selectedAnswer
    });
}

//正解の選択肢を緑にする
function showCorrectChoice(currentQuestion) {
    choiceButtons.forEach(function (button, index) {
        if (currentQuestion.choices[index] === currentQuestion.answer) {
            button.className = "correctButton";
        }
    });
}

//問題を終了状態にする関数
function finishQuestion() {
    // NEXTを表示
    nextButton.style.visibility = "visible";
    nextButton.disabled = false;
    // 選択肢を押せなくする
    choiceButtons.forEach(function (button) {
        button.disabled = true;
    });
    // SKIPも押せなくする
    skipButton.disabled = true;
}

//正解したときのエフェクトを作る
function createParticles() {

    const particleCount = 30;
    const distance = 500;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("span");
        particle.className = "particle";
        // 中央からスタート
        particle.style.left = "50%";
        particle.style.top = "50%";
        // 360度を粒の数で均等に分ける
        const angle =
            (360 / particleCount) * i;
        // 度 → ラジアンに変換
        const radian =
            angle * Math.PI / 180;
        // 飛んでいく方向を計算
        const moveX =
            Math.cos(radian) * distance;
        const moveY =
            Math.sin(radian) * distance;
        particle.style.setProperty(
            "--moveX",
            `${moveX}px`
        );
        particle.style.setProperty(
            "--moveY",
            `${moveY}px`
        );
        // 粒の大きさ
        const size = 23;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particleArea.appendChild(particle);

        setTimeout(function () {
            particle.remove();
        }, 900);
    }
}

//次へが押されたら次の問題表示、最後だったらロード画面
nextButton.addEventListener("click", function () {
    //次へを押した瞬間に見えなくする
    nextButton.style.visibility = "hidden";
    //次へを押した瞬間に操作もできなくする
    nextButton.disabled = true;
    //次の問題にする
    currentQuestionIndex++;
    //最後じゃなかったら
    if (currentQuestionIndex < selectedQuestions.length) {
        //次の問題表示
        showQuestion();
        //最後だったら
    } else {
        //ロード画面表示
        startAnalysis();
    }
});

//ロード画面

//ロード画面をだす
function startAnalysis() {
    //クイズ画面を非表示
    quizScreen.style.display = "none";
    //ロード画面表示
    analyzingScreen.style.display = "block";
    //ロードの進み具合を表す変数
    let analysisProgress = 0;
    //初期化
    analysisFill.style.width = "0%";
    analysisPercent.textContent = "0%";
    //10ずつ増やすのを繰り返す
    const analysisTimer = setInterval(function () {
        //進捗を10増やす
        analysisProgress += 10;
        //分析ゲージの横幅も増やす
        analysisFill.style.width = `${analysisProgress}%`;
        //文字も増やす
        analysisPercent.textContent = `${analysisProgress}%`;
        //100を超えたら
        if (analysisProgress >= 100) {
            //繰り返しを停止
            clearInterval(analysisTimer);
            //光らせる
            analysisFill.classList.add("progressFlash");
            analysisBar.classList.add("barFrameFlash");
            //％だったところを文字に変える
            analysisPercent.textContent = "ANALYSIS COMPLETE";
            //1000たったら、初期化して結果画面表示
            setTimeout(function () {
                //初期化
                analysisFill.classList.remove("progressFlash");
                analysisBar.classList.remove("barFrameFlash");
                //ロード画面非表示
                analyzingScreen.style.display = "none";
                //結果画面表示
                showResultScreen();
            }, 1000);
        }
    }, 200);
}

//結果画面

//結果画面表示
function showResultScreen() {
    //結果画面表示
    resultScreen.style.display = "block";
    //スコア表示
    scoreText.textContent =
        `SCORE ${score}/${selectedQuestions.length}`;
    //COMPLETEかFAILEDか表示
    showMissionResult();
    //☆表示
    showStars();
    //REVIEW表示
    showReview();
}

//ミッション成功か失敗か
function showMissionResult() {
    if (score === selectedQuestions.length) {
        missionComplete.textContent = "MISSION COMPLETE!";
        //文字を緑にするクラスをつける
        missionComplete.className = "successMission";
        resultMessage.textContent = "WE NEED MORE DATA...";
    } else {
        missionComplete.textContent = "MISSION FAILED";
        //文字を赤くするクラスをつける
        missionComplete.className = "failedMission";
        resultMessage.textContent = "CONTINUE SEARCHING...";
    }
}

//☆表示
function showStars() {
    //☆を初期化・場所をあけておく
    starRating.innerHTML = "";
    //500たったら☆を光らせはじめる
    setTimeout(function () {
        //HTMLとして追加
        starRating.innerHTML = `
            <span class="star">☆</span>
            <span class="star">☆</span>
            <span class="star">☆</span>
        `;
        //☆を3つ取得
        const stars =
            starRating.querySelectorAll(".star");
        //400おきに☆を1つ光らせる
        for (let i = 0; i < score; i++) {
            setTimeout(function () {
                stars[i].textContent = "★";
                //金色に光らせるクラスをつける
                stars[i].classList.add("starEarned");
            }, i * 400);
        }
    }, 500);
}

//REVIEW表示
function showReview() {
    //全問正解なら表示しない
    if (wrongAnswers.length === 0) {
        reviewArea.style.display = "none";
        return;
    }
    //REVIEWエリアを表示
    reviewArea.style.display = "block";
    //初期化・場所をあけておく
    wrongAnswerList.innerHTML = "";
    //間違えた問題を表示
    wrongAnswers.forEach(function (item) {
        //HTMLとして追加
        wrongAnswerList.innerHTML += `
            <div class="reviewItem">
                <p class="reviewNumber en">
                    QUESTION ${item.questionNumber}
                </p>

                <p class="reviewQuestion jp">
                    ${item.question}
                </p>

                <p class="reviewCorrect jp">
                    〇 ${item.correctAnswer}
                </p>

                <p class="reviewWrong jp">
                    × ${item.selectedAnswer}
                </p>
            </div>
        `;
    });
}

//もう一度遊ぶボタンが押されたら
restartButton.addEventListener("click", function () {
    //ゲームの状態をリセット
    currentQuestionIndex = 0;
    score = 0;
    selectedQuestions = [];
    wrongAnswers = [];

    //進捗ゲージを０にもどす
    progressFill.style.width = "0%";
    //結果画面を隠して、地域選択画面を表示
    resultScreen.style.display = "none";
    mapScreen.style.display = "block";
    //地域の進捗を計算
    //キーと値をセットで取り出し、配列に分割代入
    Object.entries(areaElements).forEach(function ([area, elements]) {
        updateAreaProgress(
            area,
            elements.progress,
            elements.percent
        );
    });
});

//地域ごとの進捗の計算
function updateAreaProgress(area, progressBar, percentText) {
    const clearedCount = clearedQuestions[area].length;
    const totalCount = questionData[area].length;
    //何％か
    const rate = Math.round((clearedCount / totalCount) * 100);
    progressBar.style.width = `${rate}%`;
    percentText.textContent = `${rate}%`;
}