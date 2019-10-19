// phina.js をグローバル領域に展開
phina.globalize();

var FINISH_QUESTION_NUMBER = 4;
var CLEAR_QUESTION_NUMBER = 2;
var question_number = 0;
var char;
var correct_num = 0;
var wrong_num = 0;
var is_tap_ok = false;
var is_sound = true;
var main_obj;


// メイン処理
phina.main(function() {
  // アプリケーション生成
  var app = GameApp({
    query: '#game',
    startLabel: 'opening', // メインシーンから開始する
    assets: ASSETS,
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
    ]
  });
  // アプリケーション実行
  app.run();
});
