const storage = [];

const loadTweets = () =>{
  if (localStorage.getItem("yourTweet") === ""){
    return
  } else {
    const getStorage = JSON.parse(localStorage.getItem("yourTweet"));
    for (element of getStorage){
      sendTweet(element);
    }
  }
}

function sendTweet(tweet){
  if(tweet === ""){return};
  if(typeof tweet == "string"){
    const date = new Date().toTimeString().substring(0,5);
    const re = /\n/gi;
    const text = tweet.replace(re, "<br>");
    tweet = [date, text];
  }
  document.getElementById("tweets").innerHTML =
    `<p class="tweets">[${tweet[0]}] ${tweet[1]}</p>` + document.getElementById("tweets").innerHTML
  storage.push(tweet);
  localStorage.setItem("yourTweet", JSON.stringify(storage));
}

function sendTweetEvent() {
  typedTweet = document.getElementById('text').value;
  sendTweet(typedTweet);
  document.getElementById('text').value = "";
  document.getElementById('countdown').innerHTML = MAX_LENGTH;
  document.getElementById('countdown').style.color = "black";
}

const MAX_LENGTH = 140;

function tweetLength() {
  //Conta caracteres decrescente e abilita botão.
  typedTweetLength = document.getElementById('text').value.length;
  document.getElementById("send").removeAttribute("disabled");
  document.getElementById('countdown').innerHTML = MAX_LENGTH - typedTweetLength;

  //Desabilita botão e muda cor do countdown.
  if (typedTweetLength === 0 || typedTweetLength > MAX_LENGTH){
    document.getElementById("send").setAttribute("disabled", "disabled");
  } else if (typedTweetLength >= 120 && typedTweetLength <= 129){
    document.getElementById("countdown").style.color = "yellow";
  } else if (typedTweetLength >= 130) {
    document.getElementById("countdown").style.color = "red";
  } else {
    document.getElementById("countdown").style.color = "black";
  }

  //aumentar textarea quando há mais linhas de texto.
  let lines = document.getElementById("text").value.split("\n");
  lines.length > 3 ? document.getElementById("text").setAttribute("rows", lines.length) : document.getElementById("text").setAttribute("rows", 3);

  let linesCount = lines.reduce((accum, line) => accum + Math.max(Math.ceil(line.length/36), 1), 0);
  linesCount > 3 ? document.getElementById("text").setAttribute("rows", linesCount) : document.getElementById("text").setAttribute("rows", 3);
}

window.addEventListener("load", loadTweets);
document.getElementById("send").addEventListener("click", sendTweetEvent);
document.getElementById("text").addEventListener("keyup", tweetLength);
