function new_line(text, line_num){
    var return_text = "";
    for(var i = 0; i < text.length; i++){
        if((i != 0) && (i % line_num == 0)){
            return_text += "\n" + text.charAt(i);
        }
        else{
            return_text += text.charAt(i);
        }
    }
    return return_text;
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

function get_str_time(start_time){
    var end_time = Date.now();
    all_sec = Math.floor((end_time -start_time)/1000);
    min = Math.floor(all_sec / 60);
    sec = all_sec % 60;
    return add_zero(min) + ":" + add_zero(sec);
}

function add_zero(num){
    if(num < 9){
        return "0" + String(num);
    }
    else{
        return String(num);
    }
}