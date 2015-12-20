/**
 * Created by Lorenzo on 2015/12/19.
 */
/**
 * base on base.js, need inject the method to the namespace(lh).
 * **/
(function(){
    function markPage(targ) {
        var that = $(targ);
        that.on("mouseup",function(e){
            var x = 210;
            var y = 10;
            var r = "";
            if (document.selection) {
                r = document.selection.createRange().text;
            }else if (window.getSelection()) {
                r = window.getSelection();
            }
            if (r!= "") {
                var tooltip = '<div class="markPanel top" id="tooltip"><div class="arrow"></div><div class="markPanel-title">添加批注：<button class="subMark" onclick="test(this)">添加</button></div><div class="markPanel-content"><div>标注颜色：<input type="color" id="markColor" value="#ffffff"></div><div><span style="vertical-align:top">批注内容：</span><textarea rows="5" id="markContent" cols="35" style="padding:5px;color:#666;resize:none"></textarea></div></div></div>';
                $("body").append(tooltip);
                $("#tooltip").css({
                    "top": (e.pageY + y) + "px",
                    "left": (e.pageX - x) + "px"
                }).show("fast");
            }
        }).on("mousedown",function () {
            $("#tooltip").remove();
        });
    }
    lh['markPage']=markPage;
})();

function test(obj){
    var that = $(obj);
    var markColor = that.parent().parent().find('#markColor');
    alert(markColor.val());
    var markText = that.parent().parent().find('#markContent');
    alert(markText.val());
}

function getRoute(ele, tag, selectText) {

}