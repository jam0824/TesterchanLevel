var start_time;
var time_label = "";
var list_finished_question;

// MainScene クラスを定義
phina.define('QuizMain', {
    superClass: 'DisplayScene',
    init: function(option) {
      this.superInit(option);
      start_time = Date.now();
      list_finished_question = [];
      question_number = 0;
      correct_num = 0;
        wrong_num = 0;
        is_tap_ok = false;
      var sprite_bg = make_sprite(this, 'bg', 0, 0);
      var rect = make_black(this, SCREEN_WIDTH, SCREEN_HEIGHT - 300, 0.5, 0, 1);
      var question_group = make_question(this);
      make_start(this);
      main_obj = this;
    },
  });
  
//黒背景作成
function make_black(obj, w, h, a, grid_x, grid_y){
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

  
  //汎用スプライト作成メソッド
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
  
  //問題取得
  function get_question(){
    var random = Math.floor(Math.random() * question_db.length);
    return question_db[random];
  }
  
  //質問作成メイン
  function make_question(obj){
    question_number++;
    var group = DisplayElement().addChildTo(obj);
    var question = get_question();
    var ans_no = Math.floor(Math.random() * 4);
  
    make_question_window(obj, group, -4, question['question']);
    make_question_number_label(obj, group, 110, question_number);
  
    var list_wrong_ans = question['wrong'].split(',');
    list_wrong_ans = sort_array(list_wrong_ans);
  
    for(var i = 0; i < 4; i++){
      if(i == ans_no){
        make_select(obj, group, i, question['correct'], question, true);
      }
      else{
        var ans = list_wrong_ans.pop()
        make_select(obj, group, i, ans, question, false);
      }
    }
    if(char != null){
      char.remove();
    }
    char = make_sprite(obj, 'char', 700, 1150);
    return group;
  }
  
  //問題表示画面作成
  function make_question_window(obj, group, grid_y, text){
    var question_window = Sprite('question_window').addChildTo(group);
    question_window.x = obj.gridX.center();
    question_window.y = obj.gridY.center(grid_y);
    text = new_line(text, 20)
    var label = Label(text).addChildTo(group);
    label.x = LABEL_X;
    label.y = obj.gridY.center(grid_y);
    label.fill = '#5a4e46'; // 塗りつぶし色
    label.align = 'left';
  }
  
  //第n問ラベル作成
  function make_question_number_label(obj, group, y, number){
    text = "第" + number + "問"
    var label = Label(text).addChildTo(group);
    label.x = obj.gridX.center();
    label.y = y;
    label.fill = '#fedc60'; // 塗りつぶし色
  }
  
  //回答ボタン（１つ）作成
  function make_select(obj, group, grid_y, text, origin_question, is_correct){
    y = grid_y * 2;
    var select = Sprite('select').addChildTo(group);
    select.x = obj.gridX.center();
    select.y = obj.gridY.center(y);
    select.setInteractive(true);
    select.onpointend = function(e){
      if(is_tap_ok){
        is_tap_ok = false;
        select.setImage('select02');
        onclick_event(obj, group, is_correct, origin_question, Number(e.pointer.x), Number(e.pointer.y));
      }
    };
    var label = Label(text).addChildTo(group);
    label.x = obj.gridX.center();
    label.y = obj.gridY.center(y);
    label.fill = '#5a4e46'; // 塗りつぶし色
    return group;
  }
  
  //クリック後発火
  function onclick_event(obj, group, is_correct, origin_question, x, y){
    make_hit(obj, x, y);
    //クリックしたときに1秒待つ。ドキドキ演出。QMAの動きパクリ
    setTimeout(after_onclick_event, 1000, obj, group, is_correct, origin_question);
  }
  //正解不正解エフェクト
  function after_onclick_event(obj, group, is_correct, origin_question){
    if(is_correct){
      correct_num++;
      origin_question['result'] = true;
      console.log("正解！！");
      make_correct(obj);
    }
    else{
      wrong_num++;
      origin_question['result'] = false;
      console.log("まちがい……");
      make_wrong(obj);
    }
    list_finished_question.push(origin_question);
    //エフェクト終了待ち
    setTimeout(wait_answer_effect, 1500, obj, group);
  }
  //エフェクト終了後の次の問題表示
  function wait_answer_effect(obj, group){
    if(question_number == FINISH_QUESTION_NUMBER){
        time_label = get_str_time(start_time);
      make_fade_white(obj);
      make_finish(obj);
    }
    else{
      group.children.clear();
      is_tap_ok = true;
      make_question(obj);
    }
  }
  
  //ヒットエフェクト作成
  function make_hit(obj, x, y){
    var explosion = Hit().addChildTo(obj);
    explosion.x = x;
    explosion.y = y;
    //explosion.blendMode = 'lighter';
  }
  
  //正解エフェクト作成
  function make_correct(obj){
    var sprite_correct = Correct().addChildTo(obj);
    sprite_correct.x = obj.gridX.center();
    sprite_correct.y = obj.gridY.center(-2);
  }
  //不正解エフェクト作成
  function make_wrong(obj){
    var sprite_wrong = Wrong().addChildTo(obj);
    sprite_wrong.x = obj.gridX.center();
    sprite_wrong.y = obj.gridY.center(-2);
  }
  //スタートエフェクト作成
  function make_start(obj){
    var sprite = Start().addChildTo(obj);
    sprite.x = obj.gridX.center();
    sprite.y = obj.gridY.center();
  }
  //フィニッシュエフェクト作成
  function make_finish(obj){
    var sprite = Finish().addChildTo(obj);
    sprite.x = obj.gridX.center();
    sprite.y = obj.gridY.center();
  }
  //フィニッシュエフェクト作成
  function make_fade_white(obj){
    var sprite = FadeOut(0.02, 'white').addChildTo(obj);
    sprite.x = obj.gridX.center();
    sprite.y = obj.gridY.center();
  }
  

  

  
  
  
  
  
  