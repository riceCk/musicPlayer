var $ = window.Zepto;
var root = window.player;
var index = 0;
var songList;
var $scope = $(document.body);
var audio = new root.audioControl();
var flag = true;
function bindEvent() {
    $scope.on("play:change", function(event, index, flag){
        audio.getAudio(songList[index].audio);
        if(audio.status == "play" || flag){
            root.process.start();
            audio.play()
        }
        root.process.renderAllTime(songList[index].duration);
        root.render(songList[index]);
        root.process.update(0);  
    })
    $scope.on("click", ".prev_btn", function () {
        // var length = songList.length - 1;
        // if (index <= 0) {
        //     index = length;
        // } else {
        //     index--;
        // }
        index = controlManger.prev();
        // root.render(songList[index]);
        $(this).trigger("play:change", index)
    })
    $scope.on("click", ".next_btn", function () {
        // var length = songList.length - 1;
        // if (index >= length) {
        //     index = 0;
        // } else {
        //     index++;
        // }
        index = controlManger.next();
        // root.render(songList[index]);
        $(this).trigger("play:change", index)
    })
    $scope.on("click", ".play_btn", function(){
        if(audio.status == "play"){
            audio.pause();
            root.process.stop();
        }else{
            root.process.start();            
            audio.play();            
        }
        $(this).toggleClass("pause")
    })
    $scope.on("click", ".list_btn", function(){
        root.playlist(songList);        
    })



    $scope.on("click", ".clse", function(){
        $scope.find(".entry").detach(); 
    })
    $scope.on("mouseenter", ".entry_wrapper li", function(){
        $(".select").removeClass();
        $(this).addClass("select")
        $(this).on("mouseleave", function(){
            $(".select").removeClass();
        })
        index = $(this).index()
        $(this).trigger("play:change", index)
    })
}
function bindTouch(){
    
    var $slider = $scope.find('.slider_pointer');
    var offset = $scope.find('.pro_wrapper').offset();
    var left = offset.left;
    var width = offset.width;
    $slider
        .on('touchstart', function(){ //鼠标按下的事件
            root.process.stop();
        })
        .on('touchmove', function(e){  //鼠标按下移动的事件
            var x = e.changedTouches[0].clientX;   //鼠标移动的坐标
            var per = (x - left) / width;
            if(per < 0){
                per = 0;
            }
            if(per > 1){
                per = 1;
            }
            root.process.update(per);
        })
        .on('touchend', function(e){  //鼠标松开的事件
            var x = e.changedTouches[0].clientX;   //鼠标移动的坐标
            var per = (x - left) / width;
            if(per < 0){
                per = 0;
            }
            if(per > 1){
                per = 1;
            }
            var curDuration = songList[controlManger.index].duration;
            var curTime = per * curDuration;  //当前时间=百分比*总时间
            audio.playTo(curTime);
            $scope.find('.play_btn').addClass('pause')
        })
}
function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            bindTouch();
            songList = data;
            controlManger = new root.controlManger(data.length);
            root.render(data[index]);            
            $scope.trigger("play:change", index);
            // root.playlist(data);
        },
        error: function () {
            void 0;
        }
    })
}
getData("../mock/data.json");
bindEvent()