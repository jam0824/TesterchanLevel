phina.define('Share', {
    superClass: 'DisplayScene',
    init: function(option) {
        this.superInit(option);
        this.backgroundColor = 'black';
        var sprite_bg = make_bg(this, 'share_bg', 0, 0, 0.1);
        var fade = make_result_fade_in(this, 'black', 0.1);
        setTimeout(show_share_screen, 500, this);
        main_obj = this;
    },
});

function show_share_screen(obj){
    var name_label = make_name_label(obj, 120, 175, "Twitterシェア");

    result = (correct_num >= CLEAR_QUESTION_NUMBER) ? "合格" : "不合格";
    text = "ソフトウェアテスト知識試験テスターちゃんレベルで" + correct_num + "/" + FINISH_QUESTION_NUMBER + "の成績で" + result + "でした。かかった時間は" + time_label + "でした。";
    var label = make_story_label(obj, 50, 270, new_line(text, 20));
    
    var twitter_icon = make_twitter_icon(obj, obj.gridX.center(), obj.gridY.center(), text);
    var button = make_top_button(obj, obj.gridX.center(), 1250);
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