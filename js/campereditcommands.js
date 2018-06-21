
camperArr = JSON.parse(localStorage.getItem("camperArr"));
var currentCamper = search(localStorage.getItem("currentCamper"))[0];

$(document).ready(function(){

  $('.nonstart').hide();
  setup();

  $('#new-rank-button').click(function(){
    var toWrite = document.getElementById('edit-rank-data').innerHTML;
    var template = document.getElementById('rank-template').innerHTML;
    toWrite = toWrite.concat(template);
    document.getElementById('edit-rank-data').innerHTML = toWrite;
    showCampRank();
  });

  $('#new-skill-button').click(function(){
    var toWrite = document.getElementById('edit-skills-data').innerHTML;
    var skillTemplate = document.getElementById('skill-template').innerHTML;
    toWrite = toWrite.concat(skillTemplate);
    document.getElementById('edit-skills-data').innerHTML = toWrite;
    showSkills();
  });

  $('#submit-button').click(function() {
    var index = findCamperIndex(currentCamper.name);
    update();
    camperArr[index] = currentCamper;
    localStorage.setItem("camperArr", JSON.stringify(camperArr));
    localStorage.setItem("currentCamper", currentCamper.name)
  });

});

//------------------------------------------------------------------------
//------------------------------------------------------------------------
function setup() {
  document.getElementById('name-edit').placeholder = currentCamper.name;

  $('#select-tribe').val(currentCamper.tribe);

  var rankWrite = "";
  for(i = 0; i < currentCamper.camprank.length; i++) {
    var template = document.getElementById('rank-template').innerHTML;
    rankWrite = rankWrite.concat(template);
  }

  document.getElementById('edit-rank-data').innerHTML = rankWrite;

  var camperRanks = $('.rank-select');

  for (j = 0; j < (camperRanks.length - 1); j++) {
    camperRanks[j].value = currentCamper.camprank[j].rank;
  }

  var rankDates = document.getElementsByClassName('rank-select-date');

  for (k = 0; k < (rankDates.length - 1); k ++) {
    rankDates[k].placeholder = currentCamper.camprank[k].date;
  }

  var skillWrite = "";
  for (m = 0; m < currentCamper.skills.length; m++) {
    var skilltemplate = document.getElementById('skill-template').innerHTML;
    skillWrite = skillWrite.concat(skilltemplate);
  }

  document.getElementById('edit-skills-data').innerHTML = skillWrite;

  var camperSkills = $('.skill-select');

  for (n = 0; n < (camperSkills.length - 1); n++) {
    camperSkills[n].value = currentCamper.skills[n].name;
  }

  var camperSkillsName = $('.skillrank-select');

  for (a = 0; a < (camperSkillsName.length - 1); a++) {
    camperSkillsName[a].value = currentCamper.skills[a].rank;
  }

  var camperSkillsDates = $('.skillyears-select');

  for (b = 0; b < (camperSkillsDates.length - 1); b++) {
    camperSkillsDates[b].value = currentCamper.skills[b].years;
  }

}

function update() {
  var camperName = document.getElementById('name-edit').value;
  if (camperName != "") {
    currentCamper.name = camperName;
  }

  var camperTribe = document.getElementById('select-tribe').value;
  if (camperTribe != currentCamper.tribe) {
    currentCamper.tribe = camperTribe;
  }

  var campRanks = document.getElementsByClassName('rank-select');
  var campRanksDates = document.getElementsByClassName('rank-select-date');

  for(i = 0; i < (campRanks.length - 1); i++) {
    if (currentCamper.camprank[i] != undefined) {
      if (campRanks[i].value != currentCamper.camprank[i].rank) {
        currentCamper.camprank[i].rank = campRanks[i].value;
      }
      if (campRanksDates[i].value != currentCamper.camprank[i].date && campRanksDates[i].value != "") {
        currentCamper.camprank[i].date = campRanksDates[i].value
      }
    } else {
      var newrank = campRanks[i].value;
      var newdate = campRanksDates[i].value;
      var newcamprank = new Rank(newrank, newdate);
      currentCamper.camprank.push(newcamprank);
    }
  }

  var skillNames = document.getElementsByClassName('skill-select');
  var skillRanks = document.getElementsByClassName('skillrank-select');
  var skillYears = document.getElementsByClassName('skillyears-select');

  for (i = 0; i < (skillNames.length - 1); i++) {
    if (currentCamper.skills[i] != undefined) {

      if (skillNames[i].value != currentCamper.skills[i].name) {
        currentCamper.skills[i].name = skillNames[i].value;
      }

      if (skillRanks[i].value != currentCamper.skills[i].rank) {
        currentCamper.skills[i].rank = skillRanks[i].value;
      }

      if (skillYears[i].value != currentCamper.skills[i].years && skillYears[i].value != "") {
        currentCamper.skills[i].years = skillYears[i].value;
      }

    } else {
      var newSkill = new Skill(skillNames[i].value, skillRanks[i].value, skillYears[i].value);
      currentCamper.skills.push(newSkill);
    }
  }
}

function showCampRank() {
  var camperRanks = $('.rank-select');

  for (j = 0; j < currentCamper.camprank.length; j++) {
    camperRanks[j].value = currentCamper.camprank[j].rank;
  }
}

function showSkills() {

  var camperSkills = $('.skill-select');

  for (n = 0; n < currentCamper.skills.length; n++) {
    camperSkills[n].value = currentCamper.skills[n].name;
  }

  var camperSkillsName = $('.skillrank-select');

  for (a = 0; a < currentCamper.skills.length; a++) {
    camperSkillsName[a].value = currentCamper.skills[a].rank;
  }

  var camperSkillsDates = $('.skillyears-select');

  for (b = 0; b < currentCamper.skills.length; b++) {
    camperSkillsDates[b].value = currentCamper.skills[b].years;
  }


}
