const random_sentence_url_api = "https://api.quotable.io/random";
const typeDisplay = document.getElementById("typeDisplay");
const typeInput = document.getElementById("typeInput");
const timer = document.getElementById("timer");

const typeSound = new Audio("./sound/type.mp3");
const falseSound = new Audio("./sound/false.mp3");
const trueSound = new Audio("./sound/true.mp3");
// テキストを入力して、あっているかどうかを確認する
window.clearcount = 0;

typeInput.addEventListener("input",()=> {
    // タイプ音再生
    typeSound.play();
    typeSound.currentTime = 0;

    const sentenceArray = typeDisplay.querySelectorAll("span");
    const arrayValue = typeInput.value.split("");

    let correct = true;

    sentenceArray.forEach((characterSpan,index) => {
        if((arrayValue[index] == null)){
            characterSpan.classList.remove("correct");
            characterSpan.classList.remove("incorrect");
            correct = false;
        }
        else if(characterSpan.innerText == arrayValue[index]){
            characterSpan.classList.add("correct");
            characterSpan.classList.remove("incorrect");
        }else{
            characterSpan.classList.add("incorrect");
            characterSpan.classList.remove("correct");

            falseSound.volume = 0.3;
            falseSound.play();
            falseSound.currentTime = 0;

            correct = false;
        }
    });

    if(correct == true){
        clearcount+=1;
        document.getElementById("count").title = String(count);
        trueSound.play();
        trueSound.currentTime = 0;
        RenderNextSentence();
    }
});

// 非同期でランダムな文章を取得する
function GetRandomSentence(){
    return fetch(random_sentence_url_api)
    .then((responce) => responce.json()
    .then((data) => data.content));
}

// ランダムな文章を取得して表示する
async function RenderNextSentence() {
    const sentence = await GetRandomSentence();
    typeDisplay.innerText = "";
    // 文章を1文字ずつ分解して、spanタグを生成する。
    let onetext = sentence.split("");
    onetext.forEach((character)=>{
        const characterSpan = document.createElement("span");
        characterSpan.innerText = character;
        typeDisplay.appendChild(characterSpan);
        // characterSpan.classList.add("correct");
    });

    // テキストボックスの中身を消す
    typeInput.value = "";

    StartTimer();
}

let startTime;
let originTime = 30;

function StartTimer(){
    timer.innerText = originTime;
    startTime = new Date();
    setInterval(() => {
        timer.innerText = originTime - getTimerTime();
        if(timer.innerText <= 0){
            TimeUp();
        }
    },1000);
}

function getTimerTime(){
    return Math.floor((new Date() - startTime) / 1000);
}

function TimeUp(){
    window.localStorage.setItem("result", clearcount);
    window.location.href = "./result.html";
}

RenderNextSentence();
