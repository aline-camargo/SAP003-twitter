sendTweet(localStorage.getItem("yourTweet"));

function sendTweet(typedTweet){
  let newLi = document.createElement("li");
  newLi.textContent = typedTweet;
  document.getElementById("tweets").appendChild(newLi);
  typedTweet = "";
  // document.getElementById("tweets").innerHTML = `<li> ${typedTweet} </li>`;
  localStorage.setItem("yourTweet", typedTweet);
}

function sendTweetEvent(){
  typedTweet = document.getElementById('text').value;
  sendTweet(typedTweet);
}

function tweetLength() {
  typedTweetLength = document.getElementById('text').value.length;
  document.getElementById("send").removeAttribute("disabled");
  document.getElementById('countdown').innerHTML = 140 - typedTweetLength;

  if (typedTweetLength === 0 || typedTweetLength > 140){
    document.getElementById("send").setAttribute("disabled", "disabled");
  } else if (typedTweetLength >= 120 && typedTweetLength <= 129){
    document.getElementById("countdown").style.color = "yellow";
  } else if (typedTweetLength >= 130) {
    document.getElementById("countdown").style.color = "red";
  } else {
    document.getElementById("countdown").style.color = "black";
  }

  //aumentar textarea quando há mais linhas de texto.
  // document.getElementById("text").
  //
  // if ()
}

document.getElementById("send").addEventListener("click", sendTweetEvent);
document.getElementById("text").addEventListener("input", tweetLength);
