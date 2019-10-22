function ajax(url, param){
    $.ajax({
        type: "GET",
        url: url,
        data: param,
        crossDomain: false,
        dataType : "json",
        scriptCharset: 'utf-8'
    }).done(function(data){
        console.log(data);
    }).fail(function(XMLHttpRequest, textStatus, errorThrown){
        //console.error(errorThrown);
    });
}


function question_select_ajax(url, param){
    $.ajax({
        type: "GET",
        url: url,
        data: param,
        crossDomain: false,
        dataType : "json",
        scriptCharset: 'utf-8'
    }).done(function(data){
        console.log(data);
        change_pass_rate_label(data);
    }).fail(function(XMLHttpRequest, textStatus, errorThrown){
        console.error(errorThrown);
    });
}

function present_ajax(url, param){
    $.ajax({
        type: "GET",
        url: url,
        data: param,
        crossDomain: false,
        dataType : "json",
        scriptCharset: 'utf-8'
    }).done(function(data){
        url_16 = data.small;
        url_19 = data.large;
    }).fail(function(XMLHttpRequest, textStatus, errorThrown){
        console.error(errorThrown);
    });
}

function change_pass_rate_label(data){
    var num = 0;
    if(data.total_question_count == 0){
        num = 0;
    }
    else{
        num = data.pass_question_count / data.total_question_count * 100;
    }
    if(isNaN(num)){
        text = "正答率0%";
    }
    else{
        text = "正答率" + String(num.toFixed(1)) + "%";
    }
    console.log(text);
    rate_label.text = text;
}