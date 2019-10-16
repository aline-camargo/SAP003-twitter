const storage = [];
const MAX_LENGTH = 140;

const loadTweets = () =>{
  if (localStorage.getItem("yourTweet") === ""){
    return
  } else {
    const getStorage = JSON.parse(localStorage.getItem("yourTweet"));
    for (let element of getStorage){
      sendTweet(element);
    }
  }
}

const deleteTweet = (event) =>{
  const tweets = JSON.parse(localStorage.getItem("yourTweet"));
  const id = event.target.parentElement.id;
  const updatedTweets = tweets.filter((value) => value.id != id);
  localStorage.setItem("yourTweet", JSON.stringify(updatedTweets));
  document.getElementById(id).style.display = 'none';
}

function sendTweet(tweet){
  if(tweet === ""){return}
  if(typeof tweet == "string"){
    const date = new Date().toLocaleString('pt-BR').slice(0, 16);
    const text = tweet.replace(/\n/g, "<br>");
    tweet = {
      id: Date.now(),
      date,
      text
    };
  }
  storage.push(tweet);
  localStorage.setItem("yourTweet", JSON.stringify(storage));
  document.getElementById("tweets").innerHTML =
    `<p class="tweets" id="${tweet.id}"><span>${tweet.text}<br>-${tweet.date}-</span>\
      <span class="delete">X</span></p>` + document.getElementById("tweets").innerHTML
  document.querySelectorAll(".delete").forEach((cls) => {
    cls.addEventListener("click", e => deleteTweet(e));
  });
  // const xuxu = document.querySelectorAll(".delete");
  // Array.from(xuxu).map(tweet => tweet.addEventListener("click", (e) =>{
  //   const tweets = JSON.parse(localStorage.getItem("yourTweet"));
  //   const id = e.target.parentElement.getAttribute("id");
  //   const deleting = (value) => value.id != id;
  //   const updatedTweets = tweets.filter(deleting);
  //   localStorage.setItem("yourTweet", JSON.stringify(updatedTweets));
  // }));
}

function sendTweetEvent() {
  const typedTweet = document.getElementById('text').value;
  sendTweet(typedTweet);
  document.getElementById('text').value = "";
  document.getElementById('countdown').innerHTML = MAX_LENGTH;
  document.getElementById('countdown').style.color = "black";
}

function tweetLength() {
  //Conta caracteres decrescente e abilita botão.
  const typedTweetLength = document.getElementById('text').value.length;
  document.getElementById("send").removeAttribute("disabled");
  document.getElementById('countdown').innerHTML = MAX_LENGTH - typedTweetLength;

  //Desabilita botão e muda cor do countdown.
  if (typedTweetLength === 0 || typedTweetLength > MAX_LENGTH){
    document.getElementById("send").setAttribute("disabled", "");
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

window.onload = loadTweets;
document.getElementById("send").addEventListener("click", sendTweetEvent);
document.getElementById("send").addEventListener("click", tweetLength);
document.getElementById("text").addEventListener("keyup", tweetLength);
