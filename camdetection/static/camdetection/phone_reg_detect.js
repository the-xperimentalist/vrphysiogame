
console.log("HEre")

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

function submitPhoneReg () {
  nm = document.getElementById('nm').value
  post_data = {'phone_reg_name': nm}
  $.ajax({
    type: 'POST',
    url: '/enter_cam/',
    data: post_data,
    success: function (response) {
      window.location.href = 'http://localhost:8000/cam_detect/'+response+'/'
    },
    error: function (err) {
      console.log(err)
    }
  })
}
