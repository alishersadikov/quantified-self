$(document).ready() {
  $(".date").on('click', function(){
    var today = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var month = months[today.getMonth()];

  });
}
