phina.define('Opening', {
    superClass: 'DisplayScene',
    init: function(option) {
        this.superInit(option);
        var sprite_bg = make_sprite(this, 'opening_bg', 0, 0);
        var sprite = OpeningJump().addChildTo(this);
        sprite.x = this.gridX.center(2);
        sprite.y = this.gridY.center(4);
        var rect = make_opening_black(this, SCREEN_WIDTH, 150, 0.5, 0, 5);
        var select = make_opening_button(this, 5);
    },
});

//黒背景作成
function make_opening_black(obj, w, h, a, grid_x, grid_y){
    var rect = RectangleShape({
      width:w,
      height:h,
      strokeWidth:0,
      fill:'back',
      cornerRadius:10
    }).addChildTo(obj);
    rect.x = obj.gridX.center(grid_x);
    rect.y = obj.gridY.center(grid_y);
    rect.alpha = a;
    return rect;
  }


function make_opening_button(obj, grid_y){
    var select = Sprite('opening_button01').addChildTo(obj);
    select.x = obj.gridX.center();
    select.y = obj.gridY.center(grid_y);
    select.setInteractive(true);
    select.onpointend = function(e){
        select.setImage('opening_button02');
        make_hit(obj, Number(e.pointer.x), Number(e.pointer.y));
        obj.exit();
    };

    return select;
}

//ジャンプクラス
phina.define('OpeningJump', {
    superClass: 'Sprite',
    init: function() {
      this.superInit('opening_jump');
      this.cnt = 0
    },
    // 毎フレーム処理
    update: function() {
        if(this.x > 350){
            this.x -= 0.1;
            this.y -= 0.1;
        }
    },
});