function checkingState(action) {
  FB.getLoginStatus(response)
    if (response.status === 'connected'){
      action
    } else {
      alert("Error on Login");
    }

}

    console.log("ive been hit");


$(document).ready(function() {

  $("body").on("click", ".start-build", function(e){
    e.preventDefault();
    console.log()

    function grabUserInfo(response) {
      FB.api
    }
  });

});
