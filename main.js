// phina.js をグローバル領域に展開
phina.globalize();


// MainScene クラスを定義
phina.define('MainScene', {
  superClass: 'CanvasScene',
  init: function(option) {
    this.superInit(option);
    var sprite_bg = make_sprite(this, 'bg', 0, 0);
    var question_group = make_question(this);
    var char = make_sprite(this, 'char', 600, 986);
  },
});

function make_sprite(obj, sprite_name, x, y){
  var sprite = Sprite(sprite_name).addChildTo(obj);
  if((x == 0) && (y == 0)){
    sprite.x = obj.gridX.center();
    sprite.y = obj.gridY.center();
  }
  else{
    sprite.x = x;
    sprite.y = y;
  }
  return sprite;
}

function make_hit(obj, x, y){
  var explosion = Hit().addChildTo(obj);
  explosion.x = x;
  explosion.y = y;
  //explosion.blendMode = 'lighter';
}

function make_question(obj){
  var group = DisplayElement().addChildTo(obj);
  var question = get_question();
  var ans_no = Math.floor(Math.random() * 4);

  make_question_window(obj, group, -5, question['question']);
  var list_wrong_ans = question['wrong'].split(',');
  list_wrong_ans = sort_array(list_wrong_ans);

  for(var i = 0; i < 4; i++){
    if(i == ans_no){
      make_select(obj, group, i, question['correct'], true);
    }
    else{
      var ans = list_wrong_ans.pop()
      make_select(obj, group, i, ans, false);
    }
  }
  return group;
}

function make_question_window(obj, group, grid_y, text){
  var question_window = Sprite('question_window').addChildTo(group);
  question_window.x = obj.gridX.center();
  question_window.y = obj.gridY.center(grid_y);
  var label = Label(text).addChildTo(group);
  label.x = obj.gridX.center();
  label.y = obj.gridY.center(grid_y);
  label.fill = 'white'; // 塗りつぶし色
}

function make_select(obj, group, grid_y, text, is_correct){
  var select = Sprite('select').addChildTo(group);
  select.x = obj.gridX.center(-2);
  select.y = obj.gridY.center(grid_y);
  select.setInteractive(true);
  select.onpointend = function(e){
    onclick_event(obj, group, is_correct, Number(e.pointer.x), Number(e.pointer.y));
  };
  var label = Label(text).addChildTo(group);
  label.x = obj.gridX.center(-4);
  label.y = obj.gridY.center(grid_y);
  label.fill = 'white'; // 塗りつぶし色
  return group;
}

function onclick_event(obj, group, is_correct, x, y){
  make_hit(obj, x, y);
  if(is_correct){
    console.log("正解！！");
    group.children.clear();
    make_question(obj);
  }
  else{
    console.log("まちがい……");
  }
  
}

function get_question(){
  var random = Math.floor(Math.random() * question_db.length);
  return question_db[random];
}

function sort_array(list_shuffle){
  for(var i = list_shuffle.length - 1; i > 0; i--){
    var r = Math.floor(Math.random() * (i + 1));
    var tmp = list_shuffle[i];
    list_shuffle[i] = list_shuffle[r];
    list_shuffle[r] = tmp;
  } 
  return list_shuffle;
}

//Hitクラス
phina.define('Hit', {
  superClass: 'Sprite',
  init: function() {
    this.superInit('hit', 240, 240);
    var anim = FrameAnimation('hit_ss').attachTo(this);
    anim.gotoAndPlay('hit');
    this.anim = anim;
  },
  // 毎フレーム処理
  update: function() {
    if (this.anim.finished) {
      this.remove();
    }
  },
});

// メイン処理
phina.main(function() {
  // アプリケーション生成
  var app = GameApp({
    startLabel: 'main', // メインシーンから開始する
    assets: ASSETS,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  });
  // アプリケーション実行
  app.run();
});
