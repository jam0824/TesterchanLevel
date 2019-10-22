function new_line(text, line_num){
    var char_count = line_num * 2;
    var return_text = "";
    for(var i = 0; i < text.length; i++){
        
        if(char_count <= 0){
            return_text += "\n" + text.charAt(i);
            char_count = line_num * 2;
        }
        else if(text.charAt(i) == "＠"){
            return_text += "\n";
            char_count = line_num * 2;
        }
        else{
            return_text += text.charAt(i);
        }
        char_count -= is_hankaku(text.charAt(i)) ? 1 : 2;
    }
    return return_text;
}

function is_hankaku(value){
    return !value.match(/[^\x01-\x7E]/) || !value.match(/[^\uFF65-\uFF9F]/);
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

//リストからランダムの値を返す
function random_value(list_data){
    var list_random = sort_array(list_data);
    return list_random[0];
}

function get_str_time(start_time){
    var end_time = Date.now();
    all_sec = Math.floor((end_time -start_time)/1000);
    min = Math.floor(all_sec / 60);
    sec = all_sec % 60;
    return add_zero(min) + ":" + add_zero(sec);
}

function add_zero(num){
    if(num < 10){
        return "0" + String(num);
    }
    else{
        return String(num);
    }
}

function play_se(se_name){
    try {
        if(is_sound){
            SoundManager.play(se_name);
        }
    } catch(e) {
        console.log( e.message );
    }
}

function play_bgm(bgm_name){
    sound_path = bgm_name;
    try {
        if(is_sound){
            SoundManager.playMusic(bgm_name);
        }
    } catch(e) {
        console.log( e.message );
    }
}

function stop_bgm(){
    try {
        SoundManager.stopMusic();
    } catch(e) {
        console.log( e.message );
    }
}

function make_sound_button(obj, x, y){
    var sprite;
    if(is_sound){
        sprite = Sprite('sound_button01').addChildTo(obj);
    }
    else{
        sprite = Sprite('sound_button02').addChildTo(obj);
    }
    sprite.x = x;
    sprite.y = y;
    sprite.setInteractive(true);
    sprite.onpointend = function(e){
        make_hit(obj, Number(e.pointer.x), Number(e.pointer.y));

        if(is_sound){
            is_sound = false;
            sprite.setImage('sound_button02');
            stop_bgm();
        }
        else{
            is_sound = true;
            play_se('story_msg');
            sprite.setImage('sound_button01');
            play_bgm(sound_path);
        }    
    };
    return sprite;
}