var playerConfig = {
  key: process.env.DATA0,
  advertising: {
    adBreaks: [
      {
        tag: {
          type: 'vast',
          // More Ad Samples can be found here:
          // https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/tags
          url:
            'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator='
        }
      }
    ]
  }
};

const source = {
  "dash": "https://bitmovin-amer-public.s3.amazonaws.com/internal/dani/tests-encoding/test-1-no-drm/main.mpd"
}

// By default Bitmovin Player uses IMA Advertising Module so this activates Bitmovin Advertising Module to give you more control
bitmovin.player.Player.addModule(window.bitmovin.player['advertising-bitmovin'].default);

var player = new bitmovin.player.Player(document.getElementById('player'), playerConfig);

player.load(source);
