
camperArr = JSON.parse(localStorage.getItem("camperArr"));
var currentCamper = search(localStorage.getItem("currentCamper"))[0];


$(document).ready(function(){

  $('.nonstart').hide();

  document.getElementById('campername').innerHTML = currentCamper.name;
  document.getElementById('campertribe').innerHTML = currentCamper.tribe;

  var rankArr = currentCamper.camprank;
  // for camp rank
  if (rankArr != []) {
    var toWrite = "";
    for (j = 0; j < rankArr.length; j++) {
      var crank = rankArr[j];
      toWrite = toWrite.concat(crank.rank, " ", crank.date, "<br>");
    }
    document.getElementById('camperrank').innerHTML = toWrite;
  } else {
    document.getElementById('camperrank').innerHTML = "NA";
  }



  // for all the skills
  if (currentCamper.skills != []) {
    var toWrite = "";
    for(i = 0; i < currentCamper.skills.length; i++) {
      var cskill = currentCamper.skills[i];
      var str = "<b class=\"buttonhide\">";
      str = str.concat(cskill.name, ":</b>", "<br><p class=\"buttonhide\">rank: ", cskill.rank, "<br>years taken: ", cskill.years);
      toWrite = toWrite.concat(str, "</p>");
    }
    document.getElementById('camperskills').innerHTML = toWrite;
  } else {
    document.getElementById('camperskills').innerHTML = "No Skills ... it's sad really";
  }


});
