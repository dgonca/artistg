function checkingState(action) {
  FB.getLoginStatus(function(response){
    if (response.status === 'connected'){
      console.log("response connected")
      window[action](response);
    } else {
      alert("Error on Login");
    }
  });
}

function grabUserInfo(response) {
  if (response.authResponse){
    FB.api('/me?fields=name,location,website,education,about,email', function(response){
      console.log("help")
      console.log(response);
      if (response && !response.error){

        var $welcome = $(".welcome");


        if (response.education[1].type === "College") {
          var $college = response.education[1].school.name
        }
        console.log(response.education[1].type)

        var usersInfo = {
          name: response.name,
          location: response.location.name,
          college: $college
        }

        $.ajax({
          method: "POST",
          url: $(".start-build").attr("href"),
          data: usersInfo
        })
        .done(function(response){
          $(".welcome-name").text("Welcome " + response.name);
          $(".welcome-location").text("You are located in " + response.location);
          $(".welcome-education").text("You went to: " + response.college);

          $welcome.append($(".wecome-name"));
          $welcome.append($(".welcome-location"));
          $welcome.append($(".welcome-education"));
          $welcome.removeClass("hide");
        })


      }
    });
  } else {
    alert("Error on login");
  }
}

    console.log("ive been hit");


$(document).ready(function() {

  $("body").on("click", ".start-build", function(e){
    e.preventDefault();
    console.log("ready to steal some code");

    checkingState("grabUserInfo");

  });

});
