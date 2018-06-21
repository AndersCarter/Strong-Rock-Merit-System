$(document).ready(function(){

  $('.nonstart').hide();

  $('#new-rank-button').click(function(){
    var template = document.getElementById('rank-template').innerHTML;
    var toWrite = document.getElementById('create-ranks').innerHTML;
    toWrite = toWrite.concat(template);
    document.getElementById('create-ranks').innerHTML = toWrite;
    addRemoveButtonRanks();
  });

  $('#new-skill-button').click(function(){
    var template = document.getElementById('skill-template').innerHTML;
    var toWrite = document.getElementById('create-skills').innerHTML;
    toWrite = toWrite.concat(template);
    document.getElementById('create-skills').innerHTML = toWrite;
    addRemoveButtonSkills();
  });

  $('#remove-rank-button').click(function(){
    var rankHtml = document.getElementById('create-ranks').innerHTML;
    var rankValues = document.getElementsByClassName('rank-select');
    var rankDates = document.getElementsByClassName('rank-select-date');
    var template = document.getElementById('rank-template').innerHTML;
    var values = [];
    var dates = [];
    for(k = 0; k < (rankValues.length - 1); k++) {
      values.push(rankValues[k].value);
    }
    for(n = 0; n < (rankDates.length - 1); n++) {
      dates.push(rankDates[n].value);
    }

    var toWrite = "";
    rankHtml = rankHtml.split("<br>");
    for(i = 0; i < (rankHtml.length - 2); i++) {
      toWrite = toWrite.concat(template);
    }

    document.getElementById('create-ranks').innerHTML = toWrite;

    if (toWrite == "") {
      $('#remove-rank-button').hide();
    } else {

      var newRankValues = document.getElementsByClassName('rank-select');
      for (j = 0; j < newRankValues.length; j++) {
        newRankValues[j].value = values[j];
      }

      var newRankDates = document.getElementsByClassName('rank-select-date');
      for (m = 0; m < newRankDates.length; m++) {
        newRankDates[m].value = dates[m];
      }
    }


  });

  $('#remove-skill-button').click(function(){
    var skillHTML = document.getElementById('create-skills').innerHTML;
    var template = document.getElementById('skill-template').innerHTML;
    var skillClassValues = document.getElementsByClassName('skill-select');
    var skillRankValues = document.getElementsByClassName('skillrank-select');
    var skillYearValues = document.getElementsByClassName('skillyears-select');
    var classes = [];
    var ranks = [];
    var years = [];

    for(i = 0; i < (skillClassValues.length - 1); i++) {
      classes.push(skillClassValues[i].value);
      ranks.push(skillRankValues[i].value);
      years.push(skillYearValues[i].value);
    }

    var toWrite = "";
    skillHTML = skillHTML.split("<br>");
    for(j = 0; j < (skillHTML.length - 2); j++) {
      toWrite = toWrite.concat(template);
    }

    document.getElementById('create-skills').innerHTML = toWrite;

    if(toWrite == "") {
      $('#remove-skill-button').hide();
    } else {
      var newClassValues = document.getElementsByClassName('skill-select');
      var newRankValues = document.getElementsByClassName('skillrank-select');
      var newYearValues = document.getElementsByClassName('skillyears-select');
      console.log(newYearValues);
      for(k = 0; k < (classes.length - 1); k++) {
        newClassValues[k].value = classes[k];
        newRankValues[k].value = ranks[k];
        newYearValues[k].value = years[k];
      }
    }
  });


  $('#submit-new-camper').click(function(){

    var name = document.getElementById('create-name').value;
    var tribe = document.getElementById('create-tribe').value;
    var ranks = document.getElementsByClassName('rank-select');
    var rankdates = document.getElementsByClassName('rank-date-select');
    var skillclass = document.getElementsByClassName('skill-select');
    var skillranks = document.getElementsByClassName('skillrank-select');
    var skillyears = document.getElementsByClassName('skillyears-select');
    var skillArr = [];
    var rankArr = [];

    for(i = 0; i < (ranks.length - 1); i++) {
      var rankObj = new Rank(ranks[i].value, rankdates[i]);
      rankArr.push(rankObj);
    }

    for(j = 0; j < (skillclass.length - 1); j++) {
      var skillObj = new Skill(skillclass[j].value, skillranks[j].value, skillyears[j].value);
      skillArr.push(skillObj);
    }

    var newCamper = new Camper(name, tribe, rankArr, skillArr);
    insertCamper(newCamper);

  });

});

function addRemoveButtonRanks() {
  var createRanks = document.getElementById('create-ranks').innerHTML;
  if(createRanks != "") {
    $('#remove-rank-button').show();
  }
}

function addRemoveButtonSkills() {
  var createSkills = document.getElementById('create-skills').innerHTML;
  if(createSkills != "") {
    $('#remove-skill-button').show()
  }
}
