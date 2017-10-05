// 获取安装按钮
var btnInstall = document.getElementById('btnInstall');
// 绑定安装事件
var bindInstallEvent = function() {
    window.addEventListener(btnInstall, 'click', function(event) {
        chrome.webstore.install("https://chrome.google.com/webstore/detail/fnfkcnlalnhnkdlglnbpdhdacphcnlgd",
            function() {
                alert("恭喜你，Chrome Extension安装成功");
            },
            function(err) {
                alert("抱歉，Chrome Extension安装失败");
            });
    }, false);
};

// 通过这个API可以直接判断当前浏览器是否已经安装了这个chrome extension
if (chrome.app.isInstalled) {
    btnInstall.value = "已安装";
} else {
    // 绑定安装事件
    bindInstallEvent();
}


var url = "https://raw.githubusercontent.com/tohno-kun/bilibili-playlist/master/lists/";

$('#download-json').on("click", "button", function() {
    var name = $(this).text();
    var data_url = url + name + ".json";
    $.get(data_url).done(function(data) {
        var h = new Blob([data], { type: "text/plain;charset=utf-8" });
        saveAs(h, name + ".json");
    });

});

$.ajax({
    type: "get",
    url: "https://api.github.com/repos/tohno-kun/bilibili-playlist/contents/lists",
    success: function(data) {
        var lists = eval(data);
        for (var i = 0; i < lists.length; i++) {
            var item = $('<button></button>').text(lists[i]['name'].split('.')[0]);
            $('#download-json').append(item);
        }

    }
});