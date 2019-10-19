var LABEL_X = 50;
var LABEL_Y = 900;
var label = "";
var scenario_line = 0;

phina.define('Story', {
    superClass: 'DisplayScene',
    init: function(option) {
        this.superInit(option);
        this.backgroundColor = 'black';
        var sprite_bg = make_bg(this, 'bg', 0, 0);
        var fade = make_story_fade_in(this);
        setTimeout(show_story_window, 500, this);
        main_obj = this;
    },
});

//背景もフェードさせることで点滅回避
function make_bg(obj, sprite_name, x, y){
    var bg = Charactor('bg', 0.1).addChildTo(obj);
    bg.x = obj.gridX.center();
    bg.y = obj.gridY.center();
    return bg;
}

function show_story_window(obj){
    char = make_charactor(obj);
    var window = make_story_window(obj, 4);
    var skip_button = make_skip_button(obj, 640, 50);
    var name_label = make_name_label(obj, 60, 774, "凛太朗");
    label = make_story_label(obj, LABEL_X, LABEL_Y, "");
    scenario_line = next_messege(obj, scenario_line);
}

function make_story_window(obj, grid_y){
    var window = Sprite('story_window').addChildTo(obj);
    window.x = obj.gridX.center();
    window.y = obj.gridY.center(grid_y);
    window.setInteractive(true);
    window.onpointend = function(e){
        make_hit(obj, Number(e.pointer.x), Number(e.pointer.y));
        scenario_line = next_messege(obj, scenario_line);
    };
    return window;
}

function next_messege(obj, num){
    if(num < list_scenario.length){
        text = new_line(list_scenario[num], 20);
        label.text = text;
        num++;
    }
    else{
        make_story_fade_out(obj);
    }
    return num;
}

function make_story_label(obj, x, y, text){
    var label = Label(text).addChildTo(obj);
    label.x = x;
    label.y = y;
    label.fill = '#5a4e46'; // 塗りつぶし色
    label.align = 'left';
    label.lineHeight = 1.5;
    return label;
}

function make_story_fade_in(obj){
    var sprite = FadeIn(0.1, 'black').addChildTo(obj);
    sprite.x = obj.gridX.center();
    sprite.y = obj.gridY.center();
    return sprite;
}

function make_charactor(obj){
    var char = Charactor('rin_normal', 0.1).addChildTo(obj);
    char.x = obj.gridX.center(1);
    char.y = obj.gridY.center(1);
    return char;
}

function make_story_fade_out(obj){
    var sprite = FadeOut(0.04, 'white').addChildTo(obj);
    sprite.x = obj.gridX.center();
    sprite.y = obj.gridY.center();
    return sprite;
}

function make_skip_button(obj, x, y){
    var button = Sprite('skip_button01').addChildTo(obj);
    button.x = x;
    button.y = y;
    button.setInteractive(true);
    button.onpointend = function(e){
        button.setImage('skip_button02');
        make_hit(obj, Number(e.pointer.x), Number(e.pointer.y));
        make_story_fade_out(obj);
    };
    return window;
}

 //第n問ラベル作成
 function make_name_label(obj, x, y, text){
    var label = Label(text).addChildTo(obj);
    label.x = x;
    label.y = y;
    label.fill = '#fedc60'; // 塗りつぶし色
    return label;
  }