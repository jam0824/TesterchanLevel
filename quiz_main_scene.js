// MainScene クラスを定義
phina.define('QuizMain', {
    superClass: 'DisplayScene',
    init: function(option) {
      this.superInit(option);
      var sprite_bg = make_sprite(this, 'bg', 0, 0);
      var rect = make_black(this);
      var question_group = make_question(this);
      make_start(this);
    },
  });
  
  //黒背景作成
  function make_black(obj){
    var rect = RectangleShape({
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT - 300,
      strokeWidth:0,
      fill:'back',
      cornerRadius:10
    }).addChildTo(obj);
    rect.x = obj.gridX.center();
    rect.y = obj.gridY.center(1);
    rect.alpha = 0.5;
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
        make_select(obj, group, i, question['correct'], true);
      }
      else{
        var ans = list_wrong_ans.pop()
        make_select(obj, group, i, ans, false);
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
    var label = Label(text).addChildTo(group);
    label.x = obj.gridX.center();
    label.y = obj.gridY.center(grid_y);
    label.fill = '#5a4e46'; // 塗りつぶし色
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
  function make_select(obj, group, grid_y, text, is_correct){
    y = grid_y * 2;
    var select = Sprite('select').addChildTo(group);
    select.x = obj.gridX.center();
    select.y = obj.gridY.center(y);
    select.setInteractive(true);
    select.onpointend = function(e){
      if(is_tap_ok){
        is_tap_ok = false;
        select.setImage('select02');
        onclick_event(obj, group, is_correct, Number(e.pointer.x), Number(e.pointer.y));
      }
    };
    var label = Label(text).addChildTo(group);
    label.x = obj.gridX.center();
    label.y = obj.gridY.center(y);
    label.fill = '#5a4e46'; // 塗りつぶし色
    return group;
  }
  
  //クリック後発火
  function onclick_event(obj, group, is_correct, x, y){
    make_hit(obj, x, y);
    //クリックしたときに1秒待つ。ドキドキ演出。QMAの動きパクリ
    setTimeout(after_onclick_event, 1000, obj, group, is_correct);
  }
  //正解不正解エフェクト
  function after_onclick_event(obj, group, is_correct){
    if(is_correct){
      correct_num++;
      console.log("正解！！");
      make_correct(obj);
    }
    else{
      wrong_num++;
      console.log("まちがい……");
      make_wrong(obj);
    }
    //エフェクト終了待ち
    setTimeout(wait_answer_effect, 1500, obj, group);
  }
  //エフェクト終了後の次の問題表示
  function wait_answer_effect(obj, group){
    if(question_number == FINISH_QUESTION_NUMBER){
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
    var sprite = FadeWhite().addChildTo(obj);
    sprite.x = obj.gridX.center();
    sprite.y = obj.gridY.center();
  }
  
  //汎用配列並び替えメソッド
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
  
  
  //正解クラス
  phina.define('Correct', {
    superClass: 'Sprite',
    init: function() {
      this.superInit('correct');
      this.cnt = 0
      this.scaleX = 2;
      this.scaleY = 2;
      this.alpha = 0;
    },
    // 毎フレーム処理
    update: function() {
      anim_answer(this);
    },
  });
  //不正解クラス
  phina.define('Wrong', {
    superClass: 'Sprite',
    init: function() {
      this.superInit('wrong');
      this.cnt = 0
      this.scaleX = 2;
      this.scaleY = 2;
      this.alpha = 0;
    },
    // 毎フレーム処理
    update: function() {
      anim_answer(this);
    },
  });
  
  //正解不正解アニメーション設定
  function anim_answer(obj){
    if(obj.cnt < 4){
      obj.scaleX -= 0.25;
      obj.scaleY -= 0.25;
      obj.alpha += 0.25;
    }
    else if((obj.cnt >= 5) && (obj.cnt < 30)){
    }
    else if((obj.cnt >= 30) && (obj.cnt < 32)){
      obj.alpha -= 0.4;
    }
    else if(obj.cnt >= 32){
      obj.remove();
    }
    obj.cnt++;
  }
  
  //スタートエフェクト
  phina.define('Start', {
    superClass: 'Sprite',
    init: function() {
      this.superInit('start');
      this.cnt = 0
      this.scaleX = 1.3;
      this.scaleY = 1.3;
      this.alpha = 0;
    },
    // 毎フレーム処理
    update: function() {
      if(this.cnt < 30){
        this.scaleX -= 0.01;
        this.scaleY -= 0.01;
        if(this.alpha < 1){
          this.alpha += 0.1;
        }
      }
      else if((this.cnt >= 30) && (this.cnt < 60)){
  
      }
      else if((this.cnt >= 60) && (this.cnt < 70)){
        this.alpha -= 0.1;
      }
      else if(this.cnt == 70){
        is_tap_ok = true;
        this.remove();
      }
      this.cnt++;
    },
  });
  
  //終了エフェクト
  phina.define('Finish', {
    superClass: 'Sprite',
    init: function() {
      this.superInit('finish');
      this.cnt = 0
      this.scaleX = 2;
      this.scaleY = 2;
      this.alpha = 0;
    },
    // 毎フレーム処理
    update: function() {
      if(this.cnt < 4){
        this.scaleX -= 0.25;
        this.scaleY -= 0.25;
        this.alpha += 0.25;
      }
      else if((this.cnt >= 5) && (this.cnt < 30)){
      }
      else if((this.cnt >= 30) && (this.cnt < 32)){
        this.alpha -= 0.4;
      }
      else if(this.cnt >= 32){
        this.remove();
      }
      this.cnt++;
    },
  });
  
  //ホワイトフェード
  phina.define('FadeWhite', {
    superClass: 'RectangleShape',
    init: function() {
      this.superInit();
      this.width = SCREEN_WIDTH;
      this.height = SCREEN_HEIGHT;
      this.fill = 'white';
      this.alpha = 0;
      this.cnt = 0;
    },
    // 毎フレーム処理
    update: function() {
      if(this.alpha < 1){
        this.alpha += 0.04;
      }
      this.cnt++;
    },
  });