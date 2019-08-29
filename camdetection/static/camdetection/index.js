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
    postBodyData(poses, curTs);
    // setInterval(function() {console.log(poses)}, 10000)
  });
  // setInterval(printPoseResult(), 10000)
  video.hide();
}

// while (true) {
//   postBodyData({'as':'as'})
// }

cur_url = window.location.href
console.log(cur_url)
cur_url_spl = cur_url.split("/")
console.log(cur_url_spl)
post_url = "/pose_data/"+cur_url_spl[cur_url_spl.length-2]+"/"
console.log(post_url)
function postBodyData (poses, curTs) {

  if ((curTs - scriptTsStart ) > 1000) {
    console.log(poses)
    scriptTsStart = curTs
    post_data = {'poses':poses}
    $.ajax({
      type: "POST",
      url: post_url,
      data: post_data,
      dataType: "json",
      success: function (response) {
        console.log("Success")
      }
    })
  }
}

function modelReady() {
  select('#status').html('Model Loaded');
}
