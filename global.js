SCREEN_WIDTH = 750;
SCREEN_HEIGHT = 1334;

var ASSETS = {
    image:{
      'bg':'src/asset/quiz_bg.jpg',
      'hit':'src/asset/promi_star_anime240.png',
      'char':'src/asset/kyun_normal.png',
      'select':'src/asset/select_wnd.png',
      'select02':'src/asset/select_wnd_02.png',
      'question_window':'src/asset/msg_wnd.png',
      'correct':'src/asset/correct.png',
      'wrong':'src/asset/wrong.png',
      'start':'src/asset/start.png',
      'finish':'src/asset/finish.png',
      'opening_bg':'src/asset/opening.jpg',
      'opening_button01':'src/asset/button_start01.png',
      'opening_button02':'src/asset/button_start02.png',
      'opening_jump':'src/asset/openning_jump.png',
      'skip_button01':'src/asset/button_skip01.png',
      'skip_button02':'src/asset/button_skip02.png',
      'story_window':'src/asset/scenario_wnd.png',
      'rin_normal':'src/asset/rin_normal.png',
    },
    spritesheet: {
        "hit_ss":
        {
            // フレーム情報
            "frame": {
                "width": 240, // 1フレームの画像サイズ（横）
                "height": 240, // 1フレームの画像サイズ（縦）
                "cols": 5, // フレーム数（横）
                "rows": 2, // フレーム数（縦）
            },
            // アニメーション情報
            "animations" : {
                "hit": { // アニメーション名
                    "frames": [0,1,2,3,4,5,6,7,8,9], // フレーム番号範囲
                    "frequency": 1, // アニメーション間隔
                },
            }
        },
    }
};