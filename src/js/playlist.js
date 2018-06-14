(function($, root){
    var $scope = $(document.body);
    function playlistHtml(info){
        var html = '';
        info.forEach(function(ele, index){
            html += '<li>' + ele.song  + ' - '+ ele.album +' </li>'
        })
        html = ' <div class="entry">\
                    <div class="list">播放列表</div>\
                    <ul class="entry_wrapper">' + html +'</ul>\
                    <div class="clse">关闭</div>\
                </div>'
        $scope.find(".wrapper").append(html);        
    }
    // function bindEvent(){
    //     var _this = this
    //     $scope.on("click", ".clse", function(){
    //         $scope.find(".entry").detach(); 
    //     })
    //     $(".entry_wrapper").on("mouseenter", "li", function(){
    //         $(".select").removeClass();
    //         $(this).addClass("select")
    //         $(this).on("mouseleave", function(){
    //             $(".select").removeClass();
    //         })
    //         return _this.index = $(this).index()
    //     })
    // }
    // bindEvent.prototype = {
    //     bindIndex : function(){
    //         var index = this.index;
    //         return index
    //     }
    // }
    root.playlist = function(data){
        playlistHtml(data);
        // bindEvent()
    }
})(window.Zepto, window.player || (window.player = {}))