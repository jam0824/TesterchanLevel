// phina.js をグローバル領域に展開
phina.globalize();


// メイン処理
phina.main(function() {
  // アプリケーション生成
  
  var app = GameApp({
    query: '#game',
    startLabel: 'opening', // メインシーンから開始する
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    fill:'black',
    scenes: [
      {
        className: 'Opening',
        label: 'opening',
        nextLabel: 'story',
      },
      {
        className: 'Story',
        label: 'story',
        nextLabel: 'quiz_main',
      },
      {
        className: 'QuizMain',
        label: 'quiz_main',
        nextLabel: 'result',
      },
      {
        className: 'Result',
        label: 'result',
        nextLabel: 'share',
      },
      {
        className: 'Share',
        label: 'share',
        nextLabel: 'opening',
      },
    ],
    assets: ASSETS,
  });
  //load_sound_assets();
  // アプリケーション実行
  app.domElement.addEventListener('touchend', function dummy() {
    var s = phina.asset.Sound();
    s.loadFromBuffer();
    s.play().stop();
    app.domElement.removeEventListener('touchend', dummy);
  });
  app.run();
});
