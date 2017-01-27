$(document).ready() {
  $(".date").on('click', buildDateString());

  function buildDateString() {
    var today = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var month = months[today.getMonth()];

    var date = today.getDate();



    var dateSuffixes = ["1":"st", "2":"nd", "3":"rd", "else":"th"]
    
  }
}
