prediction_1 = ""
Webcam.set({
    height: 350,
    width: 300,
    image_format: "png",
    png_quality: 100
});
camera = document.getElementById("camera")

Webcam.attach("#camera")

function cam_click() {
    Webcam.snap(function (data_url) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src=' + data_url + '>';
    });
}

console.log("ml5_version", ml5.version)
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/3A5XoEYm5/model.json", model_loaded);

function model_loaded() {
    console.log("model_loaded")
}

function check() {
    img = document.getElementById('captured_image')
    classifier.classify(img, gotResult)
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function gotResult(error, result) {
    if (error) {
        console.log(error);
    } else {
        console.log(result);
        
        document.getElementById("result_gesture_name").innerHTML = result[0].label;
        prediction_1 = result[0].label;
        speak();

    }
}