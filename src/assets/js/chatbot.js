var app = {
    // appURL: 'https://nbf.bankbuddy.ai/webchat/',
    // appURL: 'https://dev.studio.bankbuddy.me/webchat/?tenant=standardmw',
    appURL: 'https://27329malbbdev01v.mw.sbicdirectory.com/webchat/?tenant=mwstandardbank',
    chatIcon: 'assets/img/chatbot/logo.png',
    chatOpenIcon: 'assets/img/chatbot/chatOpen.png',
    chatCloseIcon: 'assets/img/chatbot/chatClose.png',
    chatLogo: 'assets/img/chatbot/logo.png',
    appHead: 'Kenya Orient Insurance Ltd.',
    appDesc: 'Personal Assistant',
    apphideHead: '.b-agent-demo_header',
}
var themeColor = {
    HeaderbgColor: '#1d469e',
    chatBg: '#fff',
    borderColor: '1px solid #cecece'
}
//icon => i
//Header => h
//extra info =>e
function    chatBox(_item, _theme) {
    this._item = _item;
    this._theme = _theme;
}

function chatToggle(_this, chatDiv) {
    $(_this).hide();
    $(chatDiv).show();
}
chatBox.prototype.createDom = function() {
    var styleTag = document.createElement('style');
    var openIconDiv = document.createElement("div");
    var openIcon = $(openIconDiv).attr('id', 'openIcon');
    var closeIconDiv = document.createElement("div");
    var closeIcon = $(closeIconDiv).attr('id', 'closeIcon');
    var _img = document.createElement('img');
    _img.setAttribute('src', this._item.chatOpenIcon);
    var _img2 = document.createElement("img");
    _img2.setAttribute("src", this._item.chatCloseIcon);
    $("body").append(closeIcon);
    $('body').append(openIcon);
    $('head').append('<link href="assets/css/chatstyle.css" rel="stylesheet" />');
    $(openIcon).append(_img).addClass("ico chatOpen");
    // $(openIcon).addClass("ico chatOpen");
    $(closeIcon).append(_img2).addClass("ico chatClose");
    // $(closeIcon).addClass("ico chatClose");
    $(closeIconDiv).hide();
    $('body').append('<div id="main-chat-wrapper" style="background:' + this._theme.chatBg + ';border:' + this._theme.borderColor + ';z-index:10000"></div>');
    // $('#main-chat-wrapper').append('<header class="chat-header"></header>');
    // $('.chat-header').append('<div class="header-wrapper"><a class="close"><i class="fa fa-times" style="color:white"></i></a></div>');
    var url = this._item.appURL;

    $('#main-chat-wrapper').find('iframe').remove();
    $('#main-chat-wrapper').append(`<iframe id="content" src=${url}></iframe>`);
    // $('#content').removeAttr('src');
    //$('#content').removeAttr('src');[iframe id="content" src="' + url + '"]

    $('#openIcon').click(function() {
        chatToggle($(this), '#main-chat-wrapper');
        $('#closeIcon').show();
        /*if($('#main-chat-wrapper').find('iframe')){
                 }*/

        /*setTimeout(function(){
         var iframe = document.getElementById('content');
          var ele = iframe.contentWindow.document.getElementsByClassName('b-agent-demo_header')[0];
          ele.style.display = 'none';
        },1000)*/
    });
    $('#closeIcon').click(function() {
        chatToggle('#main-chat-wrapper', '#openIcon');
        $(this).hide();
    });
}

var demo = new chatBox(app, themeColor);

demo.createDom();
