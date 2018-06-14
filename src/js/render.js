//实现渲染
(function ($, root) {
    var $scope = $(document.body);
    function renderInderInfo(info) {
        var html = '<div class="song_name">' + info.song + '</div>\
                    <div class="singer_name">' + info.singer + '</div>\
                    <div class="album_name">'+ info.album + ' </div>';
        $scope.find(".song_info").html(html);
    }
    function renderImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function(){
            root.blurImg(img, $scope);//高斯模糊背景
            $scope.find(".song_img img").attr("src", src);
        }        
    }
    function renderIsLike(islike){
        if(islike){
            $scope.find(".like_btn").addClass("liking")
        }else{
            $scope.find(".like_btn").removeClass("liking")
        }
    }
    root.render = function render(data) {
        renderImg(data.image);
        // console.log(data)
        renderInderInfo(data);
        renderIsLike(data.isLike)
    }
})(window.Zepto, window.player || (window.player = {}))
//通过window.play暴露函数
