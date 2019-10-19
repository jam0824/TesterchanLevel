// phina.js をグローバル領域に展開
phina.globalize();

var FINISH_QUESTION_NUMBER = 4;
var question_number = 0;
var char;
var correct_num = 0;
var wrong_num = 0;
var is_tap_ok = false;
var main_obj;


// メイン処理
phina.main(function() {
  // アプリケーション生成
  var app = GameApp({
    startLabel: 'opening', // メインシーンから開始する
    assets: ASSETS,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    scenes: [
      {
        className: 'Opening',
        label: 'opening',
        nextLabel: 'quiz_main',
      },
      {
        className: 'QuizMain',
        label: 'quiz_main',
        nextLabel: 'quiz_main',
      },
    ]
  });
  // アプリケーション実行
  app.run();
});
