const storage = [];
const countdown = document.getElementById("countdown");
const textArea = document.getElementById('text');
const modal = document.getElementById("myModal");

const loadTweets = () => {
  if (localStorage.getItem("userTweets") === "") {
    return
  } else {
    const getStorage = JSON.parse(localStorage.getItem("userTweets"));
    getStorage.forEach(element => sendTweet(element))
  }
};

const deleteTweet = (post) => {
  const tweets = JSON.parse(localStorage.getItem("userTweets"));
  const updatedTweets = tweets.filter((tweet) => tweet.id != post.id);
  localStorage.setItem("userTweets", JSON.stringify(updatedTweets));
  modal.style.display = "none";
  post.remove();
};

const openModal = (post) => {
  modal.style.display = "block";
  document.getElementById('yes').addEventListener('click', () => deleteTweet(post))
};

const sendTweet = (tweet) => {
  if (tweet === "") { return }
  if (typeof tweet == "string") {
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
  document.getElementById("tweets").insertAdjacentHTML('afterbegin', tweetTemplate);

  document.querySelectorAll(".delete").forEach(button => {
    button.addEventListener('click', (e) => {
      openModal(e.target.parentElement)
    });
  });

}

const tweetLength = () => {
  const typedTweetLength = textArea.value.length;

  countdown.innerHTML = 140 - typedTweetLength;

  if (typedTweetLength > 0 && typedTweetLength < 141) {
    document.getElementById("send").removeAttribute("disabled");
  } else {
    document.getElementById("send").setAttribute("disabled", "");
  }

  if (typedTweetLength >= 120 && typedTweetLength <= 129) {
    countdown.className = "countdown almost-past-count";
  } else if (typedTweetLength >= 130) {
    countdown.className = "countdown past-count"
  } else if (typedTweetLength >= 0 && typedTweetLength <= 119) {
    countdown.className = "countdown on-count"
  }

  const lines = textArea.value.split("\n");
  lines.length > 3 ? textArea.setAttribute("rows", lines.length) : textArea.setAttribute("rows", 3);

  const linesCount = lines.reduce((accum, line) => accum + Math.max(Math.ceil(line.length / 36), 1), 0);
  linesCount > 3 ? textArea.setAttribute("rows", linesCount) : textArea.setAttribute("rows", 3);

};

textArea.addEventListener("input", tweetLength);
document.querySelector(".close").addEventListener('click', () => {
  modal.style.display = "none";
});
document.getElementById("send").addEventListener("click", () => {
  sendTweet(textArea.value);
  textArea.value = "";
  tweetLength();
});
window.onload = loadTweets;
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 
