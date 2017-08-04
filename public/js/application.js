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
          college: $college,
          email: response.email
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
          $(".user-photos-button").removeClass("hide");
        })


      }
    });
  } else {
    alert("Error on login");
  }
}

function grabImages(response) {
  if (response.authResponse){
    FB.api('/me/photos/uploaded', function(response){
      // console.log(response);

      for(var i=0; i < 15; i++){
          var imgId = response.data[i].id;
          FB.api("/" + imgId + "?fields=images", function(imgResponse){
            imgSrc = imgResponse.images[0].source;
            $.ajax({
              method: "POST",
              url: "/generations/photos",
              data: { url: imgSrc}
            })
            .done(function(response){
              console.log(response.url);
            });
          });
        }

    })

    $(".go-to-profile").removeClass("hide")
  } else {
    alert("error on login!");
  }
}


$(document).ready(function() {

  $("body").on("click", ".start-build", function(e){
    e.preventDefault();
    console.log("ready to steal some code");

    checkingState("grabUserInfo");

  });

  $("body").on("click", ".user-photos-button", function(e){
    e.preventDefault();
    console.log("lets look at some photos");

    checkingState("grabImages");
  })

});
