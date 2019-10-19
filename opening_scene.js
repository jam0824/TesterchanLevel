

phina.define('Opening', {
    superClass: 'DisplayScene',
    init: function(option) {
        this.superInit(option);
        var sprite_bg = make_sprite(this, 'opening_bg', 0, 0);
        var sprite = OpeningJump().addChildTo(this);
        sprite.x = this.gridX.center(2);
        sprite.y = this.gridY.center(4);
        var rect = make_black(this, SCREEN_WIDTH, 150, 0.5, 0, 5);
        var select = make_opening_button(this, 5);
        main_obj = this;
    },
});


function make_opening_button(obj, grid_y){
    var select = Sprite('opening_button01').addChildTo(obj);
    select.x = obj.gridX.center();
    select.y = obj.gridY.center(grid_y);
    select.setInteractive(true);
    select.onpointend = function(e){
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



