(function($, root){
    var $scope = $(document.body);
    var curDuration;
    var frameId;
    var lasrPer = 0;
    var startTime;
    //处理时间格式 秒--> 分 + 秒
    function formatTime(duration){
        duration = Math.round(duration);
        var minute = Math.floor(duration / 60);
        var second = duration - minute * 60;
        if(minute < 10){
            minute = '0' + minute;
        }
        if(second < 10){
            second = '0' + second;
        }
        return minute + ':' + second;
    }
    //渲染每首歌总时间
    function renderAllTime(duration){
        lasrPer = 0;
        curDuration = duration;
        var allTime = formatTime(duration);
        $scope.find('.all_time').html(allTime);
        cancelAnimationFrame(frameId);
    }
    //计算播放时间的百分比
    function start(){
        startTime = new Date().getTime();
        function frame(){
            var curTime = new Date().getTime();
            var percent = lasrPer + (curTime - startTime) / (curDuration * 1000);
            
            if(percent < 1){
                frameId = requestAnimationFrame(frame);
                update(percent);
            }else{
                cancelAnimationFrame(frameId)
            }
        }
        frame();
    }
    //更新以播放时间和进度条
    function update (percent){
        var curTime = percent * curDuration;
        curTime = formatTime(curTime);
        $scope.find('.cur_time').html(curTime);
        var per = (percent - 1)*100 + '%';
        $scope.find('.pro_top').css({'transform': 'translateX(' + per + ')'})
    }
    function stop(){
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lasrPer = (stopTime - startTime) / (curDuration * 1000);
        

    }
    root.process = {
        renderAllTime: renderAllTime,
        update: update,
        start: start,
        stop: stop
    }
})(window.Zepto, window.player || (window.player ={}))