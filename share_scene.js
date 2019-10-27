

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
    if((IS_LOCAL)||(IS_OTHER_QUIZ)) return;
    if(is_clear){
        present_ajax(db_present_url, {'present':'p'});
    }
}

function show_share_screen(obj){
    var button = make_top_button(obj, obj.gridX.center(4), 1250);
    var check = make_check_button(obj, obj.gridX.center(-4), 1250);

    result = (correct_num >= CLEAR_QUESTION_NUMBER) ? "合格" : "不合格";
    text = QUIZ_NAME + "で" + correct_num + "/" + FINISH_QUESTION_NUMBER + "の成績で" + result + "でした。かかった時間は" + time_label + "でした。";
    var label = make_label(obj, text, 20, 50, 270, '#5a4e46');

    if(!IS_LOCAL){
        var name_label = make_label(obj, "Twitterシェア", 20, 120, 175, '#fedc60');
        var twitter_icon = make_twitter_icon(obj, obj.gridX.center(), obj.gridY.center(-1), text);
        if((is_clear)&&(!IS_OTHER_QUIZ)){
            var present = make_present_button(obj, obj.gridX.center(), 1000);
        }
    }
}

function make_twitter_icon(obj, x, y, text){
    var button = make_sprite(obj, 'twitter_icon', x, y);
    button.setInteractive(true);
    button.onpointend = function(e){
        make_hit(obj, Number(e.pointer.x), Number(e.pointer.y));
        alert("ポップアップブロックを設定している場合、Twitterシェアをするためにはポップアップブロックを解除する必要があります。");
        
        share_twitter(text);
    };
    return button;
}


function make_top_button(obj, x, y){
    var button = make_sprite(obj, 'top_button01', x, y);
    button.setInteractive(true);
    button.onpointend = function(e){
        button.setImage('top_button02');
        make_hit(obj, Number(e.pointer.x), Number(e.pointer.y));
        var fadeout = fade(obj, 'black', 0.1);
    };
    return button;
}

function share_twitter(text){
    url = 'http://twitter.com/share?url=' + SHARE_URL + '&text=' + text;
    window.open(encodeURI(url));
}

function make_check_button(obj, x, y){
    var button = make_sprite(obj, 'check_button01', x, y);
    button.setInteractive(true);
    button.onpointend = function(e){
        insert_dom(list_finished_question);
    };
    return button;
}

function make_present_button(obj, x, y){
    var button = make_sprite(obj, 'present_button01', x, y);
    button.setInteractive(true);
    button.onpointend = function(e){
        insert_present_dom(url_16, url_19);
    };
    return button;
}

function is_ios_and_safari(){
    var ua = window.navigator.userAgent;
    console.log(ua);
    ua = ua.toLowerCase();
    is_IOS = ((ua.indexOf("iphone") >= 0) || (ua.indexOf("ipad") >= 0) || (navigator.userAgent.indexOf("ipod") >= 0))
    is_safari = (ua.indexOf('safari')) ? true : false;
    return ((is_IOS) && (is_safari)) ? true : false;
}