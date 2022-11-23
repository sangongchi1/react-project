import * as sensors from 'sa-sdk-javascript';

sensors.init({
  server_url: 'http://log-analyse.btclass.net/data',
  heatmap: { scroll_notice_map: 'not_collect', clickmap: 'not_collect', collect_element: false },
  is_track_single_page: true,
  use_client_time: true,
  // send_type: 'beacon',
  batch_send: true,
  show_log: true,
});

// 注册公共属性
sensors.registerPage({
  current_url: location.href,
  referrer: document.referrer,
});
sensors.login('2007000216');

// sensors.quick('autoTrack');

// sensors.track('BuyProduct', {
//   ProductName: 'MacBook Pro',
//   ProductPrice: 123.45,
//   IsAddedToFav: false,
// });
