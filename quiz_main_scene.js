var start_time;
var time_label = "";
var list_finished_question;
var use_question_db;
var rate_label;

// MainScene クラスを定義
phina.define('QuizMain', {
    superClass: 'DisplayScene',
    init: function(option) {
      this.superInit(option);
      init_global_value();
      main_obj = this;
      play_bgm("quiz_bgm");
      //DBの中身をシャッフルしていれる
      use_question_db = sort_array(use_question_db);
      
      var sprite_bg = make_sprite(this, 'bg', 0, 0);
      var rect = make_black(this, SCREEN_WIDTH, SCREEN_HEIGHT - 200, 0.5, 0, 0);
      var question_group = make_question(this);
      make_start(this);
      
    },
  });

function init_global_value(){
  start_time = Date.now();
  list_finished_question = [];
  use_question_db = Array.from(question_db);
  question_number = 0;
  correct_num = 0;
  wrong_num = 0;
  is_tap_ok = false;
}
  

  
  //問題取得
  function get_question(){
    return use_question_db.pop();
  }
  
  //質問作成メイン
  function make_question(obj){
    question_number++;
    var group = DisplayElement().addChildTo(obj);
    var question = get_question();
    var ans_no = Math.floor(Math.random() * 4);
    make_question_window(obj, group, 220, question['question']);
    make_question_number_label(obj, group, 47, question_number);
    rate_label = make_pass_rate_label(obj,obj.gridX.center(2), 47);
    //dbからデータ取得
    db_select_question(obj, question);
  
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
    char = make_sprite(obj, 'kyun_oko', 700, 984);
    return group;
  }
  
  //問題表示画面作成
  function make_question_window(obj, group, y, text){
    var question_window = make_sprite(group, 'question_window', obj.gridX.center(), y);
    var label = make_label(group, text, 20, LABEL_X, y,'#5a4e46');
  }
  
  //第n問ラベル作成
  function make_question_number_label(obj, group, y, number){
    text = number + "/" + FINISH_QUESTION_NUMBER + "問目";
    var label = make_label(group, text, 20, obj.gridX.center(), y,'#fedc60');
    label.align = 'center';
    return label;
  }
  //正答率ラベル作成
  function make_pass_rate_label(obj, x, y){
    if((IS_LOCAL)||(IS_OTHER_QUIZ)) return null;
    var label = make_label(obj, "正答率-%", 20, x, y,'#fedc60', 20);
    return label;
  }
  
  //回答ボタン（１つ）作成
  function make_select(obj, group, index, text, origin_question, is_correct){
    y = index * 210 + 540;
    var select = make_sprite(group, 'select', obj.gridX.center(), y);
    select.setInteractive(true);
    select.onpointend = function(e){
      if(is_tap_ok){
        play_se('quiz_select');
        is_tap_ok = false;
        select.setImage('select02');
        onclick_event(obj, group, is_correct, origin_question, Number(e.pointer.x), Number(e.pointer.y));
      }
    };
    var label = make_label(group, text, 16, obj.gridX.center(-7), y,'#5a4e46');
    return group;
  }
  
  //クリック後発火
  function onclick_event(obj, group, is_correct, origin_question, x, y){
    make_hit(obj, x, y);
    char_select_effect(obj);
    //クリックしたときに1秒待つ。ドキドキ演出。QMAの動きパクリ
    setTimeout(after_onclick_event, 1000, obj, group, is_correct, origin_question);
  }
  //正解不正解エフェクト
  function after_onclick_event(obj, group, is_correct, origin_question){
    if(is_correct){
      play_se('quiz_correct');
      char_correct_effect(obj)
      correct_num++;
      origin_question['result'] = true;
      console.log("正解！！");
      make_correct(obj);
    }
    else{
      play_se('quiz_wrong');
      char_wrong_effect(obj);
      wrong_num++;
      origin_question['result'] = false;
      console.log("まちがい……");
      make_wrong(obj);
    }
    list_finished_question.push(origin_question);
    //DB更新
    db_update_question(obj, is_correct, origin_question);
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
  
function char_select_effect(obj){
  var list_sprite = [
    'kyun_oko_gununu', 
    'kyun_komari_gununu', 
    'kyun_komari'
  ];
  char.setImage(random_value(list_sprite));
}

  
function char_correct_effect(obj){
  var list_sprite = [
    'kyun_egao', 
    'kyun_egao_kotti', 
    'kyun_egao_metoji'
  ];
  char.setImage(random_value(list_sprite));
  make_feel_icon(obj, 'feel_correct');
}

function char_wrong_effect(obj){
  char.setImage('kyun_hawawa');
  make_feel_icon(obj, 'feel_wrong');
}

function make_feel_icon(obj, sprite_name){
  var sprite = FeelIcon(sprite_name, 0.05).addChildTo(obj);
  sprite.x = 600;
  sprite.y = 634;
}

function db_select_question(obj, question){
  if((IS_LOCAL)||(IS_OTHER_QUIZ)) return;
  var data = {'id':question['id'], 'get_question_num':'get'};
  question_select_ajax(db_question_url, data);
}
  
function db_update_question(obj, is_correct, origin_question){
  if((IS_LOCAL)||(IS_OTHER_QUIZ)) return;
  var data;
  if(is_correct){
    console.log(origin_question['id']);
    data = {'id':origin_question['id'], 'pass':'ok'};
  }
  else{
    data = {'id':origin_question['id'], 'pass':'ng'};
  }
  ajax(db_question_url, data);
}
  