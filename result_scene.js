
phina.define('Result', {
    superClass: 'DisplayScene',
    init: function(option) {
        this.superInit(option);
        this.backgroundColor = 'white';
        var sprite_bg = make_bg(this, 'result_bg', 0, 0, 0.05);
        var fade = make_result_fade_in(this, 'white', 0.05);
        char = make_charactor(this, 'char',this.gridX.center(), 1100, 0.1);
        make_small_number(this, CLEAR_QUESTION_NUMBER, 265, 275, 90);

        text = String(correct_num) + '/' + String(FINISH_QUESTION_NUMBER);
        setTimeout(make_large_number, 2000, this, text, 660, 140, -1);

        is_clear = (correct_num >= CLEAR_QUESTION_NUMBER) ? true : false;
        setTimeout(judge, 5000, this, is_clear);
        
        main_obj = this;
    },
});

function make_result_fade_in(obj, fill_color, alpha){
    var sprite = FadeIn(alpha, fill_color).addChildTo(obj);
    sprite.x = obj.gridX.center();
    sprite.y = obj.gridY.center();
    return sprite;
}

function make_small_number(obj, num, x, y, w){
    var text = reserve_string(String(num));
    var index = 0;
    var id = setInterval(function(){
        var c = text.charAt(index);
        var sprite = SmallNum(c, 0.1).addChildTo(obj);
        sprite.x = x - (index * w);
        sprite.y = y;
        index++;
        if(index >= text.length){
            clearInterval(id);
        }
    }, 500);
}

function make_large_number(obj, result_text, x, w, grid_y){
    var text = reserve_string(result_text);
    var index = 0;
    var id = setInterval(function(){
        var c = text.charAt(index);
        var sprite = LargeNum(c, 0.25).addChildTo(obj);
        sprite.x = x - (index * w);
        sprite.y = obj.gridY.center(grid_y);
        index++;
        if(index >= text.length){
            clearInterval(id);
        }
    }, 500);
}

function judge(obj, is_clear){
    if(is_clear){
        make_goukaku(obj, 180, 400, 3);
    }
    else{
        make_fugoukaku(obj, 3);
    }
}

function make_goukaku(obj, x, w, grid_y){
    var index = 0;
    var list_char = ['gou', 'kaku'];
    var id = setInterval(function(){
        var sprite = LargeNum(list_char[index], 0.25).addChildTo(obj);
        sprite.x = x + (index * w);
        sprite.y = obj.gridY.center(grid_y);
        index++;
        if(index >= list_char.length){
            make_next_button(obj, obj.gridX.center(), 1250);
            clearInterval(id);
        }
    }, 1000);
}

function make_fugoukaku(obj, grid_y){
    var sprite = LargeNum('fugoukaku', 0.25).addChildTo(obj);
    sprite.x = obj.gridX.center();
    sprite.y = obj.gridY.center(grid_y);
    make_next_button(obj, obj.gridX.center(), 1250);
}

function reserve_string(str) {
    return str.split("").reverse().join("");
}

function make_next_button(obj, x, y){
    var button = Sprite('next_button01').addChildTo(obj);
    button.x = x;
    button.y = y;
    button.setInteractive(true);
    button.onpointend = function(e){
        button.setImage('next_button02');
        make_hit(obj, Number(e.pointer.x), Number(e.pointer.y));
        var fadeout = fade(obj, 'black', 0.1)
    };
    return button;
}