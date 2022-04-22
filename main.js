Status = "";
img = "";
object = [];
function preload() {    img = loadImage(" baby.jpg");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

    objectDetector = ml5.objectDetector("cocossd", ModalLoaded);
    document.getElementById("status").innerHTML = "Detcting Object";
}

function ModalLoaded() {
    console.log("Modal Loaded");
    Status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        object = results;
    }
}

function draw() {
    image(img, 0 , 0, 380, 380);
    if (Status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);

        for (i = 0; i < object.length; i++) {
            console.log("Started Drawing");
            document.getElementById("status").innerHTML = "Baby detected";
            
            fill(r, g, b);
            stroke(r, g, b);
            percent = floor(object[i].confidence*100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}