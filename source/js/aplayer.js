!(function() {
  var oldLoadAp = window.onload;
  window.onload = function () {
    oldLoadAp && oldLoadAp();

    new APlayer({
      container: document.getElementById('aplayer'),
      fixed: true,
      autoplay: false,
      loop: 'all',
      order: 'random',
      theme: '#b7daff',
      preload: 'auto',
      audio: [
        {
          name: '竈門炭治郎のうた',
          artist: '椎名豪&中川奈美(なかがわ なみ)',
          url: '/music/椎名豪&中川奈美(なかがわ なみ)-竈門炭治郎のうた.mp3',
          cover: '/music/椎名豪&中川奈美(なかがわ なみ)-竈門炭治郎のうた.jpg'
        },
		{
          name: '流★群Meteor Stream',
          artist: 'GUMI (グミ)',
          url: '/music/H_K_君 _ GUMI (グミ) - 流★群Meteor Stream.mp3',
          cover: '/music/H_K_君 _ GUMI (グミ) - 流★群Meteor Stream.jpg'
        },
		{
          name: '神のまにまに',
          artist: '初音未来 (初音ミク)',
          url: '/music/初音未来 (初音ミク) _ 神のまにまに.mp3',
          cover: '/music/初音未来 (初音ミク) _ 神のまにまに.jpg'
        },
		{
          name: 'letter song',
          artist: 'doriko (ドリコ) _ 初音未来 (初音ミク)',
          url: '/music/doriko (ドリコ) _ 初音未来 (初音ミク) - letter song.mp3',
          cover: '/music/doriko (ドリコ) _ 初音未来 (初音ミク) - letter song.jpg'
        },
        {
          name: '光るなら',
          artist: '多多poi _ 花玲 _ 宴宁',
          url: '/music/多多poi _ 花玲 _ 宴宁 - 光るなら.mp3',
          cover: '/music/多多poi _ 花玲 _ 宴宁 - 光るなら.jpeg'
        }
      ]
    });
  }
})();