/*
1桁目：メジャーアップデート
2桁目：ユーザーに見える機能追加、問題大幅追加
3桁目：裏方の機能追加、リファクタリング
4桁目：バグ修正
*/
var VERSION = "1.0.3.0";

// phina.js をグローバル領域に展開
phina.globalize();


// メイン処理
phina.main(function() {
  // アプリケーション生成
  if(!IS_LOCAL){
    ASSETS.sound = SOUND_ASSETS;
  }

  show_info_log();

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

function show_info_log(){
  console.log(ASSETS);
  console.log('VERSION ' + VERSION);
  console.log('IS_LOCAL = ' + IS_LOCAL);
  console.log('IS_OTHER_QUIZ = ' + IS_OTHER_QUIZ);
  console.log('IS_SOUND = ' + is_sound);
}