// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

var scriptTsStart = (new Date).getTime();

function getCookie(c_name)
{
    if (document.cookie.length > 0)
    {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
 }
console.log("Loaded")

$.ajaxSetup({
        headers: { "X-CSRFToken": getCookie("csrftoken") }
    });

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function(results) {
    curTs = (new Date).getTime()
    poses = results;
    printInConsole(poses, curTs);
    // setInterval(function() {console.log(poses)}, 10000)
  });
  // setInterval(printPoseResult(), 10000)
  video.hide();
}

// while (true) {
//   printInConsole({'as':'as'})
// }

function printInConsole (poses, curTs) {
  if ((curTs - scriptTsStart ) > 1000) {
    console.log("Entered")
    scriptTsStart = curTs
    post_data = {'a':'a'}
    $.ajax({
      type: "POST",
      url: "/pose_data/",
      data: post_data,
      dataType: "json",
      success: function (response) {
        console.log(response.status)
        console.log("Success")
      }
    })
  }
}

function modelReady() {
  select('#status').html('Model Loaded');
}

// function draw() {
//   image(video, 0, 0, width, height);

// }

// // A function to draw ellipses over the detected keypoints
// function drawKeypoints()  {
//   // Loop through all the poses detected
//   for (let i = 0; i < poses.length; i++) {
//     // For each pose detected, loop through all the keypoints
//     let pose = poses[i].pose;
//     for (let j = 0; j < pose.keypoints.length; j++) {
//       // A keypoint is an object describing a body part (like rightArm or leftShoulder)
//       let keypoint = pose.keypoints[j];
//       // Only draw an ellipse is the pose probability is bigger than 0.2
//       if (keypoint.score > 0.2) {
//         fill(255, 0, 0);
//         noStroke();
//         ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
//       }
//     }
//   }
// }

// // A function to draw the skeletons
// function drawSkeleton() {
//   // Loop through all the skeletons detected
//   for (let i = 0; i < poses.length; i++) {
//     let skeleton = poses[i].skeleton;
//     // For every skeleton, loop through all body connections
//     for (let j = 0; j < skeleton.length; j++) {
//       let partA = skeleton[j][0];
//       let partB = skeleton[j][1];
//       stroke(255, 0, 0);
//       line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
//     }
//   }
// }
