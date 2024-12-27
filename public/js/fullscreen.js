"use strict";
var socket = io();

$(document).ready(function() {
  socket.on("pairStatus", function(payload) {
    var pairEnabled = payload.pairEnabled;

    if (pairEnabled === true) {
      showSection("nowPlaying");
    } else {
      showSection("pairDisabled");
    }
  });
});

function showSection(sectionName) {
  switch (sectionName) {
    case "nowPlaying":
      // Show Now Playing screen
      $("#nowPlaying").show();
      // Hide inactive sections
      $("#pairDisabled").hide();
      break;
    case "pairDisabled":
      // Show pairDisabled section
      $("#pairDisabled").show();
      // Hide everthing else
      $("#nowPlaying").hide();
      $("#pageLoading").hide();
      break;
    default:
      break;
  }
  var t = setTimeout(function() {
    $("#pageLoading").hide();
  }, 250);
}
