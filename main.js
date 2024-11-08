harryp="";
peterp = "";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
ScoreLeftWrist = 0;
ScoreRightWrist = 0;
music_status = "";
function preload(){
    harryp = loadSound("music.mp3");
    peterp = loadSound("music2.mp3");
}
function setup(){
    canvas = createCanvas(500,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on("pose", gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    fill(255,0,0);
    stroke(0,255,255);
    music_status1 = peterp.isPlaying();
    music_status2 = harryp.isPlaying();
    if (ScoreLeftWrist > 0.2) {
        circle(leftWristx,leftWristy,10);
        harryp.stop();
        if (music_status1 == false) {
            peterp.play()
        }
    }
    if (ScoreRightWrist > 0.2) {
        circle(rightWristx,rightWristy,10);
        peterp.stop();
        if(music_status2 == false)
           harryp.play();
    }
    

}
function modelLoaded(){
    console.log("Model Is Loaded");
}
function gotPoses(results){
    if (results.length > 0) {
        console.log(results);
        ScoreRightWrist = results[0].pose.keypoints[10].score;
        ScoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist - "+ScoreLeftWrist);
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
    }
}

