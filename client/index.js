
const startButton = document.querySelector("#start");
const recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternative = 1;

const synth = window.speechSynthesis;

let utter = new SpeechSynthesisUtterance("Hi, Do you wanna notify Liberty Mutual?");

startButton.addEventListener("click", () => {
    utter.text = "Hi, Do you wanna notify Liberty Mutual?";
    synth.speak(utter);
});
utter.onend = () => {
    if (utter.text.includes("notify")){
        console.log("starting recognition");
        recognition.start();
    }
}

recognition.onresult = (e) => {
    recognition.stop();
    const transcript = e.results[e.results.length - 1][0].transcript.trim();
    console.log("transcript " + transcript);
    if (transcript === "yes") { 
        utter.text = "Notifying Liberty";
        synth.speak(utter);
        fetch('http://localhost:8000/alert')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
    } else {
        utter.text = "Glad you are okay..Not sending notifications";
        synth.speak(utter);
    }
}
