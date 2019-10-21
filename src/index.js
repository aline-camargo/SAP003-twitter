// Variáveis globais.
const storage = [];
const MAX_LENGTH = 140;
const countdown = document.getElementById("countdown");
const textArea = document.getElementById('text');
const tweetsContainer = document.getElementById("tweets");

const loadTweets = () =>{
  if (localStorage.getItem("userTweets") === ""){
    return
  } else {
    const getStorage = JSON.parse(localStorage.getItem("userTweets"));
    for (let element of getStorage){
      sendTweet(element);
    }
  }
}

const deleteTweet = (deleteParent) =>{  
  if(confirm('Você deseja apagar esse tweet?')) { 
    // Mantém no localStorage apenas os tweets cujo id é != do clicado.
    const tweets = JSON.parse(localStorage.getItem("userTweets"));
    const id = deleteParent.id;
    const updatedTweets = tweets.filter((tweet) => tweet.id != id);
    localStorage.setItem("userTweets", JSON.stringify(updatedTweets));
    document.getElementById(id).remove();
  } else {
    return
  }
};

// Ouvidor de evento botões de delete.
tweetsContainer.addEventListener("click", e => {
  if(e.target.className === "delete") {
    deleteTweet(e.target.parentElement);
  }
});

function sendTweet(tweet){
  if(tweet === ""){return}
  if(typeof tweet == "string") {
    tweet = {
      id: Date.now(),
      date: new Date().toLocaleString('pt-BR').slice(0, 16),
      text: tweet.replace(/\n/g, "<br>"),
    };
  }

  storage.push(tweet);
  localStorage.setItem("userTweets", JSON.stringify(storage));

  const tweetTemplate = `
  <p class="tweets" id="${tweet.id}"><span class="tweet-text">${tweet.text}<br>-${tweet.date}-</span>
  <span class="delete">X</span></p>`
  tweetsContainer.insertAdjacentHTML('afterbegin', tweetTemplate);
}

function tweetLength() {
  
  const typedTweetLength = textArea.value.length;

  //Atualiza contador com caracteres decrescentes.
  countdown.innerHTML = MAX_LENGTH - typedTweetLength;

  //Habilita/desabilita botão 'tweet'.
  if (typedTweetLength > 0 && typedTweetLength < 141) {
    document.getElementById("send").removeAttribute("disabled");
  } else {
    document.getElementById("send").setAttribute("disabled", "");
  }

  // Muda cor do countdown.
  if (typedTweetLength >= 120 && typedTweetLength <= 129) {
    countdown.className = "countdown almost-past-count";
  } else if (typedTweetLength >= 130) {
    countdown.className = "countdown past-count"
  } else if (typedTweetLength >= 0 && typedTweetLength <= 119){
    countdown.className = "countdown on-count"
  }

  //aumentar textarea quando há mais linhas de texto.
  const lines = textArea.value.split("\n");
  lines.length > 3 ? textArea.setAttribute("rows", lines.length) : textArea.setAttribute("rows", 3);

  const linesCount = lines.reduce((accum, line) => accum + Math.max(Math.ceil(line.length/36), 1), 0);
  linesCount > 3 ? textArea.setAttribute("rows", linesCount) : textArea.setAttribute("rows", 3);

}

function sendTweetEvent() {
  sendTweet(textArea.value);
  textArea.value = "";
  tweetLength()
}

window.onload = loadTweets;
document.getElementById("send").addEventListener("click", sendTweetEvent);
textArea.addEventListener("keyup", tweetLength);
