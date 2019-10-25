//ローカル実行のときにtrue(サーバーとコネクトしない＆音楽読み込まない)
var IS_LOCAL = false;

//違う内容のクイズをやるとき（サーバーとのコネクトしない)
var IS_OTHER_QUIZ = false;

//出題問題数
var FINISH_QUESTION_NUMBER = 20;
//合格問題数
var CLEAR_QUESTION_NUMBER = 14;

var VERSION = "1.0.2.0";
var QUIZ_NAME = "ソフトウェアテスト知識試験テスターちゃんレベル";
var SHARE_URL = "https://bit.ly/33R4T3F";
var SCREEN_WIDTH = 750;
var SCREEN_HEIGHT = 1334;
var question_number = 0;
var char;
var correct_num = 0;
var wrong_num = 0;
var is_tap_ok = false;
var is_sound = true;
var sound_path = "";
var is_clear = false;
var main_obj;

//story
var STORY_CHAR_NAME = "凛太朗";
var LABEL_X = 50;
var LABEL_Y = 900;
var label = "";
var scenario_line = 0;

var url_16 = "";
var url_19 = "";

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
    'sound_button01':'src/asset/button_sound01.png',
    'sound_button02':'src/asset/button_sound02.png',
    'opening_jump':'src/asset/openning_jump.png',
    'skip_button01':'src/asset/button_skip01.png',
    'skip_button02':'src/asset/button_skip02.png',
    'story_window':'src/asset/scenario_wnd.png',
    'rin_normal':'src/asset/rin_normal.png',
    'result_bg':'src/asset/result_bg.jpg',
    'next_button01':'src/asset/button_next01.png',
    'next_button02':'src/asset/button_next02.png',
    'gou':'src/asset/gou.png',
    'kaku':'src/asset/kaku.png',
    'fugoukaku':'src/asset/fugoukaku.png',
    '0':'src/asset/0.png',
    '1':'src/asset/1.png',
    '2':'src/asset/2.png',
    '3':'src/asset/3.png',
    '4':'src/asset/4.png',
    '5':'src/asset/5.png',
    '6':'src/asset/6.png',
    '7':'src/asset/7.png',
    '8':'src/asset/8.png',
    '9':'src/asset/9.png',
    '/':'src/asset/slash.png',
    'share_bg':'src/asset/share_bg.jpg',
    'twitter_icon':'src/asset/twitter_icon.png',
    'top_button01':'src/asset/button_top01.png',
    'top_button02':'src/asset/button_top02.png',
    'check_button01':'src/asset/button_check01.png',
    'present_button01':'src/asset/button_present01.png',
    'kyun_egao':'src/char/kyun_egao.png',
    'kyun_egao_kotti':'src/char/kyun_egao_kotti.png',
    'kyun_egao_metoji':'src/char/kyun_egao_metoji.png',
    'kyun_hawawa':'src/char/kyun_hawawa.png',
    'kyun_komari':'src/char/kyun_komari.png',
    'kyun_komari_gununu':'src/char/kyun_komari_gununu.png',
    'kyun_oko':'src/char/kyun_oko.png',
    'kyun_oko_gununu':'src/char/kyun_oko_gununu.png',
    'feel_correct':'src/asset/feel_correct01.png',
    'feel_wrong':'src/asset/feel_wrong01.png',
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
    },
    
};
var SOUND_ASSETS = {
    'opening_bgm':'src/bgm/opening_bgm.mp3',
    'story_bgm':'src/bgm/story_bgm.mp3',
    'quiz_bgm':'src/bgm/quiz_bgm.mp3',
    'result_bgm':'src/bgm/result_bgm.mp3',
    'opening_decision':'src/se/opening_decision.mp3',
    'story_msg':'src/se/story_msg.mp3',
    'quiz_select':'src/se/quiz_select.mp3',
    'quiz_correct':'src/se/quiz_correct.mp3',
    'quiz_wrong':'src/se/quiz_wrong.mp3',
    'result_goukaku':'src/se/result_goukaku.mp3',
    'result_don':'src/se/result_don.mp3',
    'result_bishi':'src/se/result_bishi.mp3',
    'result_fanfare':'src/se/result_fanfare.mp3',
    'result_fate':'src/se/result_fate.mp3',
};
