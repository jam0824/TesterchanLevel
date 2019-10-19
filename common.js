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