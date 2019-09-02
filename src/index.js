const obtainText = () =>{
  document.getElementById("tweeted").innerHTML = document.getElementById("texto").value;
}

document.getElementById("tweet").addEventListener("click", obtainText);

// window.sessionStorage;
