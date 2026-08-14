
const startButton = document.getElementById("startButton");
const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");

const questionText = document.getElementById("questionText");
const choice1 = document.getElementById("choice1");
const choice2 = document.getElementById("choice2");
const choice3 = document.getElementById("choice3");
const choice4 = document.getElementById("choice4");
const choiceButtons = [choice1,choice2,choice3,choice4];

const result = document.getElementById("result");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");

const resultScreen = document.getElementById("resultScreen");
const scoreText = document.getElementById("scoreText");
let selectedQuestions = [];
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

let wrongAnswers = [];
const wrongAnswerList = document.getElementById("wrongAnswerList");
const reviewArea = document.getElementById("reviewArea");


//問題
const questions = [
{
    text: "日本で最も面積が大きい都道府県はどこ？",
    choices: ["北海道", "長野県", "岩手県", "福島県"],
    answer: "北海道"
},
{
    text:"日本で最も人口が多い都道府県はどこ？",
    choices:["大阪府","東京都","愛知県","神奈川県"],
    answer:"東京都"
},
{
    text: "日本で最も長い川はどれ？",
    choices: ["利根川", "信濃川", "石狩川", "北上川"],
    answer: "信濃川"
},
{
    text: "日本で最も大きい湖はどれ？",
    choices: ["霞ヶ浦", "琵琶湖", "サロマ湖", "猪苗代湖"],
    answer: "琵琶湖"
},
{
    text: "富士山がまたがっている都道府県の組み合わせはどれ？",
    choices: ["山梨県と静岡県", "長野県と山梨県", "静岡県と愛知県", "山梨県と神奈川県"],
    answer: "山梨県と静岡県"
},
{
    text: "関東地方にある平野はどれ？",
    choices: ["石狩平野", "関東平野", "濃尾平野", "筑紫平野"],
    answer: "関東平野"
},
{
    text: "日本海側の気候で冬に多いものはどれ？",
    choices: ["降雪", "干ばつ", "台風", "猛暑"],
    answer: "降雪"
},
{
    text: "日本の最南端の都道府県はどこ？",
    choices: ["鹿児島県", "沖縄県", "宮崎県", "高知県"],
    answer: "沖縄県"
},
{
    text: "日本の首都はどこ？",
    choices: ["大阪府", "京都府", "東京都", "神奈川県"],
    answer: "東京都"
},
{
    text: "日本で最も高い山はどれ？",
    choices: ["北岳", "富士山", "槍ヶ岳", "御嶽山"],
    answer: "富士山"
}
];

//ランダムに問題を追加
while(selectedQuestions.length<3){
    const randomIndex = Math.floor(Math.random() * questions.length);
    if(!selectedQuestions.includes(questions[randomIndex])){
        selectedQuestions.push(questions[randomIndex]);
    }
}
console.log(selectedQuestions);

let currentQuestionIndex = 0;
let score = 0;

//正誤判定、次へが出現、選択肢が押せなくなる
function checkAnswer(selectedAnswer,selectedButton){
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    if(selectedAnswer===currentQuestion.answer){
        //〇を表示
        result.textContent = "〇 DATA COLLECTED";
        result.className = "correct";
        selectedButton.className = "correctButton";

        score++;
        //進捗を計算
        const progress = (score / selectedQuestions.length)*100;
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
        //０．６秒光らせる
        setTimeout(function(){
            progressFill.classList.remove("progressFlash");
            progressBar.classList.remove("barFrameFlash");
        },600);
    }else{
        //×を表示
        result.textContent = "× SCAN FAILED";
        result.className = "incorrect";
        //不正解を赤くする
        selectedButton.className = "incorrectButton";
        //間違いデータを保存する
        wrongAnswers.push({
            questionNumber:currentQuestionIndex +1,
            question:currentQuestion.text,
            correctAnswer:currentQuestion.answer,
            selectedAnswer:selectedAnswer
        });
        //正解を緑にする
        choiceButtons.forEach(function(button,index){
            if(currentQuestion.choices[index] === currentQuestion.answer){
                button.className = "correctButton";
            }
        })
    }
    //次へを表示
    nextButton.style.visibility = "visible";
    //次へをクリックできるように
    nextButton.disabled = false;
    //選択肢をクリックできなくする
    choiceButtons.forEach(function(button){
        button.disabled = true;
    });
}

//スタートが押されたら問題表示
startButton.addEventListener("click", function () {
    startScreen.style.display = "none";
    quizScreen.style.display = "block";

    showQuestion();
});

//問題表示、また選択肢を押せるようにする
function showQuestion(){
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    
    //何問目か
    missionNumber.textContent = `MISSION　${currentQuestionIndex +1} / ${selectedQuestions.length}`;
    //問題文表示
    questionText.textContent = currentQuestion.text;
    //選択肢表示、押せるようにする
    choiceButtons.forEach(function (button,index){
        button.textContent = currentQuestion.choices[index];
        button.disabled = false;
        button.className = "";
    });
    //正誤判定を消す
    result.textContent = "";
    result.className = "";   
}

//選択肢が押されたら正誤判定する
choiceButtons.forEach(function(button,index){
    button.addEventListener("click",function(){
        const currentQuestion = selectedQuestions[currentQuestionIndex];
        checkAnswer(currentQuestion.choices[index],button);
    });
});

//次へが押されたら次の問題表示、最後だったらロード画面からの結果表示
nextButton.addEventListener("click",function(){
    //次へを押した瞬間に見えなくする
    nextButton.style.visibility = "hidden";
    //次へを押した瞬間に操作もできなくする
    nextButton.disabled = true;
    //次の問題にする
    currentQuestionIndex++;
    //最後じゃなかったら
    if(currentQuestionIndex < selectedQuestions.length){
        showQuestion();
    //最後だったら
    }else{
        //問題画面を消す
        quizScreen.style.display = "none";
        //ロード画面を表示
        analyzingScreen.style.display = "block";
        //解析ゲージをすすめる
        let analysisProgress = 0;
        analysisFill.style.width = "0%";
        analysisPercent.textContent = "0%";
        //少しずつ増やす
        const analysisTimer = setInterval(function(){
            //進捗を10％増やす
            analysisProgress += 10;
            //バーを進める
            analysisFill.style.width = `${analysisProgress}%`;
            //何％か表示
            analysisPercent.textContent = `${analysisProgress}%`;
            //100％になったらロード画面を消し、結果画面を出す
            if(analysisProgress>=100){
                //繰り返しを止める
                clearInterval(analysisTimer);
                //光らせる
                analysisFill.classList.add("progressFlash");
                analysisBar.classList.add("barFrameFlash");
                

                //ANALYSIS COMPLETE
                analysisPercent.textContent = "ANALYSIS COMPLETE";
                //100％の時に一瞬止まる
                setTimeout(function(){
                    //光を消す
                    analysisFill.classList.remove("progressFlash");
                    analysisBar.classList.remove("barFrameFlash");
                    //ロード画面を消す
                    analyzingScreen.style.display = "none";
                    //結果画面を出す
                    resultScreen.style.display = "block";
                    //スコアを表示
                    scoreText.textContent = `SCORE ${score}/${selectedQuestions.length}`;
                    //全問正解だったら
                    if(score===selectedQuestions.length){
                        missionComplete.textContent = "MISSION COMPLETE!";
                        missionComplete.className = "successMission";
                        resultMessage.textContent = "WE NEED MORE DATA...";
                        //reviewを表示しない
                        reviewArea.style.display = "none";
                    //不正解があったら
                    }else{
                        missionComplete.textContent = "MISSION FAILED";
                        missionComplete.className = "failedMission";
                        resultMessage.textContent = "CONTINUE SEARCHING...";
                        //間違えた問題を表示
                        reviewArea.style.display = "block";
                        wrongAnswerList.innerHTML = "";
                        wrongAnswers.forEach(function(item,index){
                            wrongAnswerList.innerHTML += `
                                <div class="reviewItem">
                                    <p class="reviewNumber">QUESTION ${item.questionNumber}</p>
                                    <p class="reviewQuestion">${item.question}</p>
                                    <p class="reviewCorrect">〇 ${item.correctAnswer}</p>
                                    <p class="reviewWrong">× ${item.selectedAnswer}</p>
                                    
                                </div>
                            `;
                        });
                    }
                },1000);
                
            }
        },200);
        

        
    }
});
//もう一度遊ぶボタンが押されたら
restartButton.addEventListener("click",function(){
    //ゲームの状態をリセット
    currentQuestionIndex = 0;
    score = 0;
    selectedQuestions = [];
    wrongAnswers = [];
    //新しくランダムに3問選ぶ
    while(selectedQuestions.length<3){
        const randomIndex = Math.floor(Math.random()*questions.length);
        if(!selectedQuestions.includes(questions[randomIndex])){
            selectedQuestions.push(questions[randomIndex]);
        }
    }
    //進捗ゲージを０にもどす
    progressFill.style.width = "0%";
    //結果画面を隠して、スタート画面を表示
    resultScreen.style.display = "none";
    startScreen.style.display ="block";
});