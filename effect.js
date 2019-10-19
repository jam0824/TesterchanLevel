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


//フェードアウト→次のシーン
phina.define('FadeOut', {
    superClass: 'RectangleShape',
    init: function(inclease_alpha, fill_color) {
        this.superInit();
        this.width = SCREEN_WIDTH;
        this.height = SCREEN_HEIGHT;
        this.fill = fill_color;
        this.alpha = 0;
        this.inclease_alpha = inclease_alpha;
    },
    // 毎フレーム処理
    update: function() {
        if(this.alpha < 1){
        this.alpha += this.inclease_alpha;
        }
        else{
            //this.remove();
            main_obj.exit();
        }
    },
});

phina.define('FadeIn', {
    superClass: 'RectangleShape',
    init: function(inclease_alpha, fill_color) {
        this.superInit();
        this.width = SCREEN_WIDTH;
        this.height = SCREEN_HEIGHT;
        this.fill = fill_color;
        this.alpha = 1;
        this.inclease_alpha = inclease_alpha;
    },
    // 毎フレーム処理
    update: function() {
        if(this.alpha > 0){
            this.alpha -= this.inclease_alpha;
            if(this.alpha <= 0.1){
                this.remove();
            }
        }
    },
});

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


//キャラクラス
phina.define('Charactor', {
    superClass: 'Sprite',
    init: function(file_name, inclease_alpha) {
      this.superInit(file_name);
      this.cnt = 0;
      this.is_fadein = true;
      this.is_fadeout = false;
      this.inclease_alpha = inclease_alpha;
      this.alpha = 0;
    },
    // 毎フレーム処理
    update: function() {
        if(this.is_fadein){
            this.alpha += this.inclease_alpha;
            if(this.alpha >= 1){
                this.alpha = 1;
                this.is_fadein = false;
            }
        }
        if(this.is_fadeout){
            this.alpha -= this.inclease_alpha;
            if(this.alpha <= 0){
                this.alpha = 0;
                this.is_fadeout = false;
                this.remove();
            }
        }
    },
});