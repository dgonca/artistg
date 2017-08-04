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

        var usersInfo = {
          name: response.name,
          location: response.location.name
        }

        $.ajax({
          method: "POST",
          url: $(".start-build").attr("href"),
          data: usersInfo
        })
        .done(function(response){
          $(".welcome-name").text("Welcome " + response.name);
          $("welcome-location").text("You are located in " + response.location);

          $welcome.append($(".wecome-name"));
          $welcome.append($(".welcome-location"));
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
