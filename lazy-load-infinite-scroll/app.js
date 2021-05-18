const container = document.querySelector('.container');

function loadBitmovinPlayer(playerContainer) {
    var config =   {
        key: "6c88f166-fe3e-467a-9276-aea43864cdcb",
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
    playerContainer.id = 'player-container-' + startPosY
    playerContainer.classList.add('player_container');
    container.appendChild(playerContainer)
    loadBitmovinPlayer(playerContainer);
}

// load first player instance
loadPlayer();


// listen for scroll event and load more images if we reach the bottom of window
window.addEventListener('scroll',()=>{
    console.log("scrolled", window.scrollY) //scrolled from top
    console.log(window.innerHeight) //visible part of screen
    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
        console.log("Loading player div at " + (window.scrollY + window.innerHeight));
        loadPlayer(window.scrollY + window.innerHeight);
    }
})