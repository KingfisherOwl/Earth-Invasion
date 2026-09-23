
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
let areaResults = {
    basic: null,
    japan: null,
    asia: null,
    europe: null
};
let currentArea = "";
let clearedQuestions = {
    basic: [],
    japan: [],
    asia: [],
    europe: []
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


//問題
const questionData = {
    basic: [
        {
            id: "basic1",
            text: "地球の陸と海の割合はいくつ？",
            choices: ["1:9", "2:8", "3:7", "4:6"],
            answer: "3:7"
        },
        {
            id: "basic2",
            text: "1時間の時差は経度何度ごとに生じる？",
            choices: ["10度", "15度", "20度", "25度"],
            answer: "15度"
        },
        {
            id: "basic3",
            text: "日本の標準時子午線は？",
            choices: ["東経145度", "東経135度", "西経145度", "西経135度"],
            answer: "東経135度"
        },
        {
            id: "basic4",
            text: "山のふもとで、れきが堆積してできる地形は？",
            choices: ["V字谷", "扇状地", "三角州", "河岸段丘"],
            answer: "扇状地"
        },
        {
            id: "basic5",
            text: "河口付近で、土砂が堆積してできる地形は？",
            choices: ["扇状地", "海岸段丘", "三角州", "リアス海岸"],
            answer: "三角州"
        },
        {
            id: "basic6",
            text: "氷河の浸食によって形成されたU字谷に海水が侵入したものを何という？",
            choices: ["リアス海岸", "カナート", "フィヨルド", "ワジ"],
            answer: "フィヨルド"
        },
        {
            id: "basic7",
            text: "熱帯雨林気候で、短時間に激しい雨が降ることを何という？",
            choices: ["ステップ", "梅雨", "スコール", "モンスーン"],
            answer: "スコール"
        },
        {
            id: "basic8",
            text: "夏の高温多雨が適していて、たくさんの人口を支えられる農作物は？",
            choices: ["とうもろこし", "小麦", "じゃがいも", "米"],
            answer: "米"
        },
        {
            id: "basic9",
            text: "パーム油の原料となる農作物は？",
            choices: ["油やし", "なつめやし", "オリーブ", "ココナッツ"],
            answer: "油やし"
        },
        {
            id: "basic10",
            text: "再生可能エネルギーはどれ？",
            choices: ["石油", "石炭", "太陽光", "化石燃料"],
            answer: "太陽光"
        }

    ],
    japan: [
        {
            id: "japan1",
            text: "日本で最も面積が大きい都道府県は？",
            choices: ["北海道", "岩手県", "長野県", "福島県"],
            answer: "北海道"
        },
        {
            id: "japan2",
            text: "日本で最も長い川は？",
            choices: ["利根川", "石狩川", "信濃川", "最上川"],
            answer: "信濃川"
        },
        {
            id: "japan3",
            text: "日本で最も広い平野は？",
            choices: ["石狩平野", "関東平野", "濃尾平野", "大阪平野"],
            answer: "関東平野"
        },
        {
            id: "japan4",
            text: "日本海側で冬に雪が多く降ることに大きく関係する風は？",
            choices: ["偏西風", "季節風", "貿易風", "海陸風"],
            answer: "季節風"
        },
        {
            id: "japan5",
            text: "降水量が少なく、ため池が多くみられる地域は？",
            choices: ["瀬戸内", "北陸", "南西諸島", "北海道"],
            answer: "瀬戸内"
        },
        {
            id: "japan6",
            text: "北海道で大規模に行われている、乳牛を飼育して乳製品などを生産する農業は？",
            choices: ["酪農", "稲作", "促成栽培", "近郊農業"],
            answer: "酪農"
        },
        {
            id: "japan7",
            text: "大都市の近くで、新鮮な野菜や花などを生産する農業を何という？",
            choices: ["近郊農業", "焼畑農業", "遊牧", "企業的穀物農業"],
            answer: "近郊農業"
        },
        {
            id: "japan8",
            text: "東京・名古屋・大阪を中心に工業地域が連なる地域を何という？",
            choices: ["太平洋ベルト", "シリコンバレー", "中央高地", "メガロポリス"],
            answer: "太平洋ベルト"
        },
        {
            id: "japan9",
            text: "日本で人口が特に集中している三大都市圏に含まれないものは？",
            choices: ["東京都市圏", "名古屋都市圏", "大阪都市圏", "札幌都市圏"],
            answer: "札幌都市圏"
        },
        {
            id: "japan10",
            text: "日本が多くを輸入に頼っているエネルギー資源は？",
            choices: ["石油", "太陽光", "水力", "地熱"],
            answer: "石油"
        }
    ],

    asia: [
        {
            id: "asia1",
            text: "韓国の首都は？",
            choices: ["ソウル", "釜山", "仁川"],
            answer: "ソウル"
        },
        {
            id: "asia2",
            text: "中国の首都は？",
            choices: ["上海", "北京", "香港"],
            answer: "北京"
        },
        {
            id: "asia3",
            text: "タイの首都は？",
            choices: ["バンコク", "ハノイ", "マニラ"],
            answer: "バンコク"
        }
    ],

    europe: [
        {
            id: "europe1",
            text: "フランスの首都は？",
            choices: ["パリ", "ローマ", "ベルリン"],
            answer: "パリ"
        },
        {
            id: "europe2",
            text: "イタリアの首都は？",
            choices: ["ミラノ", "ローマ", "ナポリ"],
            answer: "ローマ"
        },
        {
            id: "europe3",
            text: "ドイツの首都は？",
            choices: ["ベルリン", "ミュンヘン", "ハンブルク"],
            answer: "ベルリン"
        }
    ]
};


//スタートが押されたら地域選択画面表示
startButton.addEventListener("click", function () {
    startScreen.style.display = "none";
    //マップをだす
    mapScreen.style.display = "block";

});

//地球基礎が押されたら問題表示
basicButton.addEventListener("click", function () {
    startAreaQuiz("basic");
});
//JAPANが押されたら問題表示
japanButton.addEventListener("click", function () {
    startAreaQuiz("japan");
});
//ASIAが押されたら問題表示
asiaButton.addEventListener("click", function () {
    startAreaQuiz("asia");
});
//EUROPEが押されたら問題表示
europeButton.addEventListener("click", function () {
    startAreaQuiz("europe");
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
    result.className = "incorrect";
    //間違いデータに保存
    wrongAnswers.push({
        questionNumber: currentQuestionIndex + 1,
        question: currentQuestion.text,
        correctAnswer: currentQuestion.answer,
        selectedAnswer: "SKIPPED"
    });
    //正解を緑にする
    choiceButtons.forEach(function (button, index) {
        if (currentQuestion.choices[index] === currentQuestion.answer) {
            button.className = "correctButton";
        }
    });
    //DATACOLLECTIONも進める
    updateDataCollection();
    //次へを表示
    nextButton.style.visibility = "visible";
    //次へをクリックできるように
    nextButton.disabled = false;
    //選択肢をクリックできなくする
    choiceButtons.forEach(function (button) {
        button.disabled = true;
    });
    //SKIPも押せなくする
    skipButton.disabled = true;
});


//正誤判定、次へが出現、選択肢が押せなくなる
function checkAnswer(selectedAnswer, selectedButton) {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answer) {
        //〇を表示
        result.textContent = "〇 DATA COLLECTED";
        result.className = "correct";
        selectedButton.className = "correctButton";

        score++;

        //まだ正解済みにしていなければ保存
        if (!clearedQuestions[currentArea].includes(currentQuestion.id)) {
            clearedQuestions[currentArea].push(currentQuestion.id);
        }

    } else {
        //×を表示
        result.textContent = "× SCAN FAILED";
        result.className = "incorrect";
        //不正解を赤くする
        selectedButton.className = "incorrectButton";
        //間違いデータを保存する
        wrongAnswers.push({
            questionNumber: currentQuestionIndex + 1,
            question: currentQuestion.text,
            correctAnswer: currentQuestion.answer,
            selectedAnswer: selectedAnswer
        });
        //正解を緑にする
        choiceButtons.forEach(function (button, index) {
            if (currentQuestion.choices[index] === currentQuestion.answer) {
                button.className = "correctButton";
            }
        });
    }
    //DATA　COLLECTIONを進める
    updateDataCollection();
    //次へを表示
    nextButton.style.visibility = "visible";
    //次へをクリックできるように
    nextButton.disabled = false;
    //選択肢をクリックできなくする
    choiceButtons.forEach(function (button) {
        button.disabled = true;
    });
    //スキップも押せなくする
    skipButton.disabled = true;
}



//次へが押されたら次の問題表示、最後だったらロード画面からの結果表示
nextButton.addEventListener("click", function () {
    //次へを押した瞬間に見えなくする
    nextButton.style.visibility = "hidden";
    //次へを押した瞬間に操作もできなくする
    nextButton.disabled = true;
    //次の問題にする
    currentQuestionIndex++;
    //最後じゃなかったら
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
        //最後だったら
    } else {
        //問題画面を消す
        quizScreen.style.display = "none";
        //ロード画面を表示
        analyzingScreen.style.display = "block";
        //解析ゲージをすすめる
        let analysisProgress = 0;
        analysisFill.style.width = "0%";
        analysisPercent.textContent = "0%";
        //少しずつ増やす
        const analysisTimer = setInterval(function () {
            //進捗を10％増やす
            analysisProgress += 10;
            //バーを進める
            analysisFill.style.width = `${analysisProgress}%`;
            //何％か表示
            analysisPercent.textContent = `${analysisProgress}%`;
            //100％になったらロード画面を消し、結果画面を出す
            if (analysisProgress >= 100) {
                //繰り返しを止める
                clearInterval(analysisTimer);
                //光らせる
                analysisFill.classList.add("progressFlash");
                analysisBar.classList.add("barFrameFlash");
                //japanの進捗を計算



                //ANALYSIS COMPLETE
                analysisPercent.textContent = "ANALYSIS COMPLETE";
                //100％の時に一瞬止まる
                setTimeout(function () {
                    //光を消す
                    analysisFill.classList.remove("progressFlash");
                    analysisBar.classList.remove("barFrameFlash");
                    //ロード画面を消す
                    analyzingScreen.style.display = "none";
                    //結果画面を出す
                    resultScreen.style.display = "block";
                    //スコアを表示
                    scoreText.textContent = `SCORE ${score}/${selectedQuestions.length}`;
                    //星を表示する

                    //星を光らせる
                    starRating.innerHTML = "";
                    //MISSIONCOMPLETEの点滅が終わるまで待つ
                    setTimeout(function () {
                        starRating.innerHTML = `
                            <span class="star">☆</span>
                            <span class="star">☆</span>
                            <span class="star">☆</span>
                        `;
                        const stars = starRating.querySelectorAll(".star");
                        for (let i = 0; i < score; i++) {
                            setTimeout(function () {
                                stars[i].textContent = "★";
                                stars[i].classList.add("starEarned");
                            }, i * 400);
                        }
                    }, 1500);

                    //全問正解だったら
                    if (score === selectedQuestions.length) {
                        missionComplete.textContent = "MISSION COMPLETE!";
                        missionComplete.className = "successMission";
                        resultMessage.textContent = "WE NEED MORE DATA...";
                        //reviewを表示しない
                        reviewArea.style.display = "none";
                        //不正解があったら
                    } else {
                        missionComplete.textContent = "MISSION FAILED";
                        missionComplete.className = "failedMission";
                        resultMessage.textContent = "CONTINUE SEARCHING...";
                        //間違えた問題を表示
                        reviewArea.style.display = "block";
                        wrongAnswerList.innerHTML = "";
                        wrongAnswers.forEach(function (item, index) {
                            wrongAnswerList.innerHTML += `
                                <div class="reviewItem">
                                    <p class="reviewNumber en">QUESTION ${item.questionNumber}</p>
                                    <p class="reviewQuestion jp">${item.question}</p>
                                    <p class="reviewCorrect jp">〇 ${item.correctAnswer}</p>
                                    <p class="reviewWrong jp">× ${item.selectedAnswer}</p>
                                    
                                </div>
                            `;
                        });
                    }
                }, 1000);

            }
        }, 200);



    }
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
    updateAreaProgress("basic", basicProgress, basicPercent);
    updateAreaProgress("japan", japanProgress, japanPercent);
    updateAreaProgress("asia", asiaProgress, asiaPercent);
    updateAreaProgress("europe", europeProgress, europePercent);
});