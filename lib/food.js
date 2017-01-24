function buildFoodsTable() {

  var headers = ["name", "calories"],
  		foods = [{name: "avocado", calories: "50"}, {name: "bacon", calories: "500"}];

  // get the reference for the body
  var body = document.getElementsByTagName("body")[0];
 
  // creates a <table> element and a <tbody> element
  var tbl     = document.createElement("table");
  var tblBody = document.createElement("tbody");


 
  // creating all cells
  for (var i = 0; i <= foods.length; i++) {
    // creates a table row
    var row = document.createElement("tr");
    if (i===0) {
    	for (var j = 0; j < headers.length; j++) {
       	var header = document.createElement("th");
        var headerText = document.createTextNode(headers[j]);
        header.appendChild(headerText);
        row.appendChild(header);
       }
    }
    else {
      var nameCell = document.createElement("td");
      var nameText = document.createTextNode(foods[i-1].name);
      nameCell.appendChild(nameText);
      row.appendChild(nameCell);
      debugger;
      var calorieCell = document.createElement("td");
      var calorieText = document.createTextNode(foods[i-1].calories);
      calorieCell.appendChild(calorieText);
      row.appendChild(calorieCell);
    }
 
    // add the row to the end of the table body
    tblBody.appendChild(row);
  }
 
  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tbl);
  // sets the border attribute of tbl to 2;
  tbl.setAttribute("border", "2");
}
