$(document).ready(function(){

  $("#openfile").change(function(e) {
    var selectedFile = document.getElementById('openfile').files[0];
    localStorage.setItem("filename", selectedFile.name);
    var reader = new FileReader();
    if (selectedFile) {

      reader.onload = function(e) {
        createCampers(reader.result);
      }

      reader.readAsText(selectedFile);
    }
  });


    //Search bar Functions

    //read input from search bar looks for campers
    //if one camper found finds camper
    //if multipl found goes to didyoumean page
    $("#searchbar").keypress(function(e) {

      var searchstring = $("#searchbar").val();

      if (e.which == 13) {
        searchResult = search(searchstring);
        if (searchResult.length > 1) {
          $('.didhide').hide();

          document.getElementById('didyou').innerHTML = "Did You Mean?";
          var meanStr = "";
          for (i = 0; i < searchResult.length; i++) {
            meanStr = meanStr.concat(
              "<button id=\"", searchResult[i].name, "\" onclick=\"gotoCamper(this.id)\">", searchResult[i].name, "</button><br>",

            );
          }
          document.getElementById('pickcamper').innerHTML = meanStr;

          return false;
        } else if (searchResult.length == 1) {

          localStorage.setItem("currentCamper", searchResult[0].name);
          document.location.href = "camperpage.html";

          return false;
        } else {
          document.getElementById('didyou').innerHTML = "No Camper by That Name";
          return false;
        }
      }
    });

    $('#edit-camper').click(function() {

      document.location.href = "campereditpage.html";

    });

    $('#save').click(function(){

      var toSave = createText();
      var filename = localStorage.getItem("filename");
      var blob = new Blob([toSave], {type: "text/plain;charset=utf-8"});
      saveAs(blob, filename);

    });

    $('#new-camper').click(function(){
      document.location.href = "newcamperpage.html";
    });


});
