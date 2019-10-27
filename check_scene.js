function insert_dom(list_finished_question){
    var cards = make_cards(list_finished_question);
    var content = waku();
    content = content.replace("$$cards", cards);
    content = add_top_button(content);
    document.getElementById("main").innerHTML = content;
}

function add_top_button(content){
    var url = (IS_LOCAL) ? 'local_index.html' : 'index.html'

    content += '<center>';
    content += '<a href="' + url + '">';
    content += '<img src="src/asset/button_top01.png">';
    content += '</a></center>';
    return content;
}

function make_cards(list_finished_question){
    var cards = "";
    for(var i = 0; i < list_finished_question.length; i++){
        var c = card();
        var index = i + 1;
        c = c.replace(/\$\$number/g, index);
        c = c.replace(/\$\$text/g, list_finished_question[i]['question']);
        c = c.replace(/\$\$result/g, list_finished_question[i]['correct']);
        c = c.replace(/\$\$explain/g, list_finished_question[i]['explain']);
        if(list_finished_question[i]['result']){
            c = c.replace(/\$\$color/g, "alert-success");
        }
        else{
            c = c.replace(/\$\$color/g, "alert-danger");
        }
        cards += c;
    }
    return cards;
}

function waku(){
    var str =
        '<div class="contents m-5">' +
        '<div class="accordion" id="accordion" role="tablist" aria-multiselectable="true">' +
        '$$cards' +
        '</div>' +
        '</div>';
    return str;
}


function card(){
    var str = 
        '<div class="card">' +
        '<div class="card-header $$color" role="tab" id="heading$$number">' +
        '<h5 class="mb-0">' +
        '<a class="text-body" data-toggle="collapse" href="#collapse$$number" role="button" aria-expanded="false" aria-controls="collapse$$number">'+
        '<div class="row">'+
        '<div class="col-md-1">'+
        '$$number問目'+
        '</div>'+
        '<div class="col-md-6">'+
        '$$text'+
        '</div>'+
        '<div class="col-md-5">'+
        '$$result'+
        '</div>'+
        '</div>'+
        '</a>'+
        '</h5>'+
        '</div><!-- /.card-header -->'+
        '<div id="collapse$$number" class="collapse" role="tabpanel" aria-labelledby="heading$$number" data-parent="#accordion">'+
        '<div class="card-body">'+
        '$$explain'+
        '</div><!-- /.card-body -->'+
        '</div><!-- /.collapse -->'+
        '</div><!-- /.card -->';
    return str;
}