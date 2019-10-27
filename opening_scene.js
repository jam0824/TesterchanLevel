

phina.define('Opening', {
    superClass: 'DisplayScene',
    init: function(option) {
        this.superInit(option);
        main_obj = this;
        play_bgm("opening_bgm");
        
        var sprite_bg = make_sprite(this, 'opening_bg', 0, 0);
        var sprite = make_jump(this);
        var rect = make_black(this, SCREEN_WIDTH, 150, 0.5, 0, 5);
        var select = make_opening_button(this, 5);
        var sound_button = make_sound_button(this, this.gridX.center(-6), this.gridY.center(7));
        var label = make_version_label(this);
    },
});

function make_jump(obj){
    var sprite = OpeningJump().addChildTo(obj);
    sprite.x = obj.gridX.center(2);
    sprite.y = obj.gridY.center(4);
    return sprite;
}

function make_opening_button(obj, grid_y){
    var select = make_sprite(obj, 'opening_button01',obj.gridX.center(), obj.gridY.center(grid_y));
    select.setInteractive(true);
    select.onpointend = function(e){
        play_se('opening_decision');
        select.setImage('opening_button02');
        make_hit(obj, Number(e.pointer.x), Number(e.pointer.y));
        var fadeout = fade(obj, 'black', 0.1)
    };

    return select;
}

function fade(obj, fill_color, alpha){
    var fadeout = FadeOut(alpha, fill_color).addChildTo(obj);
    fadeout.x = obj.gridX.center();
    fadeout.y = obj.gridY.center();
    return fadeout;
}

function make_version_label(obj){
    return make_label(obj, "Ver." + VERSION, 20, 620, 1300,"#000000", 20)
}