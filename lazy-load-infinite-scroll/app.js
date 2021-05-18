const container = document.querySelector('.container');

function loadBitmovinPlayer(playerContainer) {
    var config =   {
        key: "<PLAYER-KEY>",
        playback: {
            muted: true,
            autoplay: false,
          },
    }
    var source = {
        hls: "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
    }
    var player = new bitmovin.player.Player(playerContainer, config);
    player.load(source).then(
        function() {
            //Success
            console.log('Source loaded successfully');
          },
        function(reason) {
            //Error
            console.log('Error loading source');
          }
        );
}


function loadPlayer(startPosY = 0) {
   let i=0;
    const playerContainer = document.createElement('div');
    playerContainer.id = 'player-container-' + startPosY;
    playerContainer.classList.add('player_container');
    container.appendChild(playerContainer);
    loadBitmovinPlayer(playerContainer);
}

// load first player instance
//loadPlayer();

function getPlayerIndex(container)
{
  let playerIndex = -1;
  // get index of the player that is loaded in the container
  //  or -1 if this is not found:
  for (let i = 0; i < players.length; i++)
    if (players[i].containerIndex == container.dataset.index) {
      playerIndex = i;
      break;
    }
  return playerIndex;
}

function PlayerInPool()
{
  playerElement = document.createElement("div");
  this.bitmovinPlayer = loadBitmovinPlayer(playerElement);
  this.containerIndex = -1;
}

// players: an array of PlayerInPool elements
const players = [];

function scrollYBellowMargin()
{
  return window.scrollY + window.innerHeight + 1 >=
    document.documentElement.scrollHeight);
}

// returns array of visible player containers
function getVisiblePlayerContainers()
{
  return document.querySelector(".playerContainer")
    .filter(container =>
      0 < container.y && container.y < window.innerHeight);
}

function getPlayerContainerByIndex(index)
{
  return document.querySelector(
    `.playerContainer[data-index="${index}"]`);
}

function createPlayerContainer()
{
  // in various places, computations such as lastIndex can be
  //   eliminated by a state managment pattern. This is a minimal
  //   example, and for this purpose such considerations are
  //   neglected
  let lastIndex = document.querySelectorAll(".playerContainer")
    .reduce(acum, container) =>
      Math.max(acum, parseInt(container.dataset.index));
  let container = document.createElement("div");
  container.classList.push("playerContainer");
  container.dataset.index = lastIndex + 1;
  return container;
}

// manages players[], the player pool
function attachPlayers(visibleContainersIndices)
{
  // if the visible players indices are [5,6]
  //   the intervalOfContainersToFill would be [4,5,6,7]
  //   as the extremes would be loaded but paused
  //   initially, some of the corresponding containers
  //   have a player that is loaded, and others no
  let intervalOfContainersToFill = [
    ...visibleContainersIndices,
    Math.max(...visibleContainersIndices) + 1
  ];
  let minIndex = Math.min(...visibleContainersIndices);
  if (minIndex > 0) intervalOfContainersToFill.push(minIndex - 1);

  // form containersWithoutPlayer and availablePlayersIndices:
  let unavailablePlayerIndices = [];
  let containersWithoutPlayer = [];
  for (let containerIndex of intervalOfContainersToFill)
    if (playerIndex == -1)
      containersWithoutPlayer.push(containerIndex);
    else unavailablePlayersIndices.push(playerIndex);
  }
  let availablePlayersIndices = players.filter((player,playerIndex) =>
    unavailablePlayersIndices.indexOf(playerIndex) == -1);

  for (let containerIndex of containersWithoutPlayer) {
    let player;
    // if no available players, then there are less than 4
    //  players in the pool, another player can be added to the pool:
    if (availablePlayersIndices.length == 0) {
      playerElement = document.createElement("div");
      // class playerInPool { bitmovinPlayer, containerIndex }
      //  constructor - to load a BitmovinPlayer in the div
      player = new PlayerInPool(playerElement);
      player.containerIndex = containerIndex;
    } else {
      // if there are players available, detatch the player
      //  from the previous container, attach to new container:
      let playerIndex = availablePlayersIndices.pop();
      player = players[playerIndex];
      getContainerByIndex(player.containerIndex).removeChild(player);
      player.containerIndex = containerIndex;
    }
    getContainerByIndex(containerIndex).appendChild(player);
  }
}

// listen for scroll event and load more images if we reach the bottom of window
window.addEventListener('scroll',()=>{
  // scrollY - window scroll from top
  // innerHeight - height of window
  console.log(
    "scrolled:", window.scrollY,
    "height of window:", window.innerHeight,
    "sum:", window.scrollY + window.innerHeight,
    "scrollHeight:", document.documentElement.scrollHeight);

  if (scrollYBellowMargin())
    mainContainer.appendChild(createPlayerContainer());
    
  // find the containers that have the focus:
  const visiblePlayerContainerIndices =
    getVisiblePlayerContainerIndices();

  attachPlayers(visiblePlayerContainers);

  for (let container of visiblePlayerContainers)
  {
    let player = players[getPlayerIndex(container)].bitmovinPlayer;
    if (if player.isPaused()) {
      player.seek(container.dataset.seek);
    }
  }
});
