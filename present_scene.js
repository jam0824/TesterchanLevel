function insert_present_dom(url_16, url_19){
    hidden_geme();
    var dom = get_present_dom(url_16, url_19);
    document.getElementById("other").innerHTML = dom;
}



function get_present_dom(url_16, url_19){
    var str = 
        '<div class="present_main">'+
        '<div class="present_message">'+
        '合格者にはテスターちゃん待ち受け画像プレゼント！（全7種類）<br>'+
        '16:9(1080x1920)の待ち受け画像と19:9(2436x1125)の待ち受け画像を用意しています。<br>'+
        '画像を開いて保存してお使いください。<br>'+
        '※画像のURLは他の人に教えないでね！<br>'+
        '</div>'+
        '<div class="black_label">'+
        '16:9'+
        '</div>'+
        '<div class="present_image" id="image_16">'+
        '<a target="_blank" href="' + url_16 + '">'+
        '<img src="' + url_16 + '">'+
        '</a>'+
        '</div>'+
        '<div class="black_label">'+
        '19:9'+
        '</div>'+
        '<div class="present_image" id="image_19">'+
        '<a target="_blank" href="' + url_19 + '">'+
        '<img src="' + url_19 + '">'+
        '</a>'+
        '</div>'+
        '<div class="present_button" onclick="return_game()">'+
        '<img src="./src/asset/button_top01.png">'+
        '</div>'+
        '</div>';
    return str;
}