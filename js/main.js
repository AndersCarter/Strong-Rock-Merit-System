
  camperArr = getCampers();
  var currentCamper;

  function getCampers() {
    var result = localStorage.getItem("camperArr");
    if (result != null) {
      return JSON.parse(localStorage.getItem("camperArr"));
    } else {
      return [];
    }
  }



  function createCampers(result) {

    var camperHold = [];
    var campers = result.split("\n");

    for(i = 1; i < campers.length; i++) {
      if (campers[i] != "") {
        var single = campers[i].split(",");

        var name = single[0];
        var tribe = single[1];

        var ranks = [];
        var readRanks = single[2].split("&");

        for(j = 0; j < readRanks.length; j++) {
          var singleRank = readRanks[j].split("^");
          var level = singleRank[0];
          var date = singleRank[1];
          var newRank = new Rank(level, date);
          ranks.push(newRank);
        }

        var skills = [];
        for(k = 3; k < (single.length - 3); k = k + 3) {
          var skillname = single[k];
          var skillrank = single[k+1];
          var skillyears = single[k+2].split("&");
          var newskill = new Skill(skillname, skillrank, skillyears);
          skills.push(newskill);
        }

        var newCamper = new Camper(name, tribe, ranks, skills);
        camperHold.push(newCamper);
      }
    }

    camperArr = camperHold;
    localStorage.setItem("camperArr", JSON.stringify(camperArr));

  }

  function search(campername) {

    var matchedCampers = [];

    if (camperArr != null) {
      for(i = 0; i < camperArr.length; i++) {
        if (camperArr[i].name.includes(campername)) {
          matchedCampers.push(camperArr[i]);
        }
      }
    }

    return matchedCampers;
  }

  function gotoCamper(camperName) {
    localStorage.setItem("currentCamper", camperName);
    document.location.href = "camperpage.html"
  }

  function findCamperIndex(name) {
    for(i = 0; i < camperArr.length; i++) {
      if (name == camperArr[i].name) {
        return i;
      }
    }
  }

  function createText() {
    console.log(camperArr);

    var result = "";
    for(i = 0; i < camperArr.length; i++) {

      var name = camperArr[i].name;
      var tribe = camperArr[i].tribe;
      var ranks = "";
      for (j = 0; j < camperArr[i].camprank.length; j++) {
        var ranklevel = camperArr[i].camprank[j].rank;
        var rankdate =  camperArr[i].camprank[j].date;

        if (j != (camperArr[i].camprank.length - 1)) {
          ranks = ranks.concat(ranklevel, "^", rankdate, "&");
        } else {
          ranks = ranks.concat(ranklevel, "^", rankdate);
        }
      }

      var skills = "";
      for (k = 0; k < camperArr[i].skills.length; k++) {
        var skillname = camperArr[i].skills[k].name;
        var skillrank = camperArr[i].skills[k].rank;
        var skillyears = "";
        for (n = 0; n < camperArr[i].skills[k].years.length; n++) {
          if (n != (camperArr[i].skills[k].years.length - 1)) {
            skillyears = skillyears.concat(camperArr[i].skills[k].years[n], "&");
          } else {
            skillyears = skillyears.concat(camperArr[i].skills[k].years[n]);
          }
        }

        if (k != (camperArr[i].skills.length - 1)) {
          skills = skills.concat(skillname, ",", skillrank, ",", skillyears, ",");
        } else {
          skills = skills.concat(skillname, ",", skillrank, ",", skillyears);
        }
      }

      if (i != (camperArr.length - 1)) {
        result = result.concat(name, ",", tribe, ",", ranks, ",", skills, ",");
      } else {
        result = result.concat(name, ",", tribe, ",", ranks, ",", skills, "\n");
      }
    }
    return result;
  }

  function insertCamper(camper) {
    var lastname = camper.name.split(" ")[1];
    console.log(lastname);
  }
