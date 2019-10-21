function ajax(obj, param){
    $.ajax({
        type: "GET",
        url: db_url,
        data: param,
        crossDomain: false,
        dataType : "json",
        scriptCharset: 'utf-8'
    }).done(function(data, obj){
        console.log(data);
    }).fail(function(XMLHttpRequest, textStatus, errorThrown){
        console.error(errorThrown);
    });
}