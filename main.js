function setup(){
    canvas= createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
}

function clearCanvas() {
    background("white");
}
function preload(){
    classifier=ml5.imageClassifier('DoodleNet');
}
function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}
function classifyCanvas(){
    classifier.classify(canvas,gotResult)
}
function gotResult(error,Results){
if(error){console.error(error)}
console.log(Results);
document.getElementById('label').innerHTML='Label: '+Results[0].label;
document.getElementById('confidence').innerHTML='Confidence: '+Math.round(Results[0].confidence*100)+'%';
utterThis=new SpeechSynthesisUtterance(Results[0].label);
synth.speak(utterThis);

}