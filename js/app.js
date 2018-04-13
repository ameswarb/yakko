const VIDEO_ID = 'x88Z5txBc7w';

let countries = [];
let ytReady = false;
let nlReady = false;
let player;
let playerTag = document.createElement('script');
playerTag.src = "https://www.youtube.com/iframe_api";
let playerScriptTag = document.getElementsByTagName('script')[0];
playerScriptTag.parentNode.insertBefore(playerTag, playerScriptTag);
let trips = [];

function startShow() {
  document.getElementById('go').setAttribute("style", "display: none;");
  player.seekTo(10, true);
  player.playVideo();
}

document.getElementById('go').onclick = startShow;

function init() {
  if (!nlReady || !ytReady) {
    return;
  }

  countries = [...new Set(trips.map(value => value['country_code']))];
  document.getElementById('loading').setAttribute("style", "display: none;");
  document.getElementById('go').removeAttribute("style");
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: VIDEO_ID,
    playerVars: {
      'controls': 0,
      'modestbranding': 1,
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  ytReady = true;
  init();
}

fetch('https://nomadlist.com/alexmes.json')
  .then(function(response) { return response.json(); })
  .then(function(json) {
    nlReady = true;
    trips = json.trips;
    init();
  });
