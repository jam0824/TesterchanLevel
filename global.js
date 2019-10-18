SCREEN_WIDTH = 750;
SCREEN_HEIGHT = 1334;

var ASSETS = {
    image:{
      'bg':'src/asset/quiz_bg.jpg',
      'hit':'src/asset/promi_star_anime240.png',
      'char':'src/asset/05_hutaki_kanata01.png',
      'select':'src/asset/select_wnd.png',
      'question_window':'src/asset/msg_wnd.png',
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