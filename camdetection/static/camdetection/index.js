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
