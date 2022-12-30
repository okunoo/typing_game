var resulttext = document.getElementById("resulttext");
var clearcount = window.localStorage.getItem("result");
resulttext.innerHTML = "あなたのスコア:" + String(clearcount);