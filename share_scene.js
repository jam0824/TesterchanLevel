var url_16 = "./server/presents/16/1_16_9.png";
var url_19 = "./server/presents/19/1_19_9.png";

phina.define('Share', {
    superClass: 'DisplayScene',
    init: function(option) {
        this.superInit(option);
        get_present_ajax();
        this.backgroundColor = 'black';
        var sprite_bg = make_bg(this, 'share_bg', 0, 0, 0.1);
        var fade = make_result_fade_in(this, 'black', 0.1);
        setTimeout(show_share_screen, 500, this);
        console.log(list_finished_question);
        main_obj = this;
    },
});

//プレゼントurl取得
function get_present_ajax(){
    if(is_clear){
        present_ajax(db_present_url, {'present':'p'});
    }
}

function show_share_screen(obj){
    var name_label = make_name_label(obj, 120, 175, "Twitterシェア");

    result = (correct_num >= CLEAR_QUESTION_NUMBER) ? "合格" : "不合格";
    text = "ソフトウェアテスト知識試験テスターちゃんレベルで" + correct_num + "/" + FINISH_QUESTION_NUMBER + "の成績で" + result + "でした。かかった時間は" + time_label + "でした。";
    var label = make_story_label(obj, 50, 270, new_line(text, 20));
    
    var twitter_icon = make_twitter_icon(obj, obj.gridX.center(), obj.gridY.center(-1), text);
    var button = make_top_button(obj, obj.gridX.center(4), 1250);
    var check = make_check_button(obj, obj.gridX.center(-4), 1250);
    
    if(is_clear){
        var present = make_present_button(obj, obj.gridX.center(), 1000);
    }
}

function make_twitter_icon(obj, x, y, text){
    var button = Sprite('twitter_icon').addChildTo(obj);
    button.x = x;
    button.y = y;
    button.setInteractive(true);
    button.onpointend = function(e){
        make_hit(obj, Number(e.pointer.x), Number(e.pointer.y));
        share_twitter(text);
    };
    return button;
}


function make_top_button(obj, x, y){
    var button = Sprite('top_button01').addChildTo(obj);
    button.x = x;
    button.y = y;
    button.setInteractive(true);
    button.onpointend = function(e){
        button.setImage('top_button02');
        make_hit(obj, Number(e.pointer.x), Number(e.pointer.y));
        var fadeout = fade(obj, 'black', 0.1);
    };
    return button;
}

function share_twitter(text){
    url = 'http://twitter.com/share?url=http://testerchan.hatenadiary.com/&text=' + text + '&hashtags=#テスターちゃん';
    window.open(encodeURI(url));
}

function make_check_button(obj, x, y){
    var button = Sprite('check_button01').addChildTo(obj);
    button.x = x;
    button.y = y;
    button.setInteractive(true);
    button.onpointend = function(e){
        insert_dom(list_finished_question);
    };
    return button;
}

function make_present_button(obj, x, y){
    var button = Sprite('present_button01').addChildTo(obj);
    button.x = x;
    button.y = y;
    button.setInteractive(true);
    button.onpointend = function(e){
        insert_present_dom(url_16, url_19);
    };
    return button;
}