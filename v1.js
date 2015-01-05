//time-line
//author liwenlong
//time 2014.12.30


(function(win, $) {

    function TimeLine() {
            //默认配置
            this.config = {};

        }
        //全局参数配置
    var timeArr = [], //时间数组
        baseTime = [100, 120, 140, 160, 180, 200, 220, 240, 270],
        currenTime = 2,
        data,
        unknow;

    data = [{
        "title": "test1",
        "time": "2009.7"
    }, {
        "title": "test2",
        "time": "2009.7"
    }, {
        "title": "test3",
        "time": "2009.7"

    }];
    //合并默认配置
    TimeLine.prototype.getConfig = function() {
        if (typeof timeline_config != 'undefined') {
            return $.extend(this.config, timeline_config);
        }
    }

    TimeLine.prototype.initDate = function() {
        var data = this.config.data;
        var timeArr = [],
            timeDiv = [];
        for (var i = 0; i < data.length; i++) {
            timeArr.push(parseInt(data[i].time.split(".")[0]));
            var first = parseInt(data[i].time.split(".")[0]);
            var second = parseInt(data[i].time.split(".")[1])
            timeDiv.push([first, second]);
        }
        var minYear = timeDiv[0][0];
        var maxYear = timeDiv[timeDiv.length - 1][0] + 1;
        len = maxYear - minYear + 1;
        TimeLine.prototype.time = {
            "maxYear": maxYear,
            "minYear": minYear,
            "timeArr": timeArr,
            "timeDiv": timeDiv,
            "len": len
        }
    }
    TimeLine.prototype.initStyle = function() {
        var timelineWidth = this.time.len * baseTime[currenTime];
    }
    TimeLine.prototype.initMainline = function(baseWidth) {
        //初始化,刻度尺,时间标，事件块
        var maxYear,
            minYear,
            str1 = [],
            str2 = [],
            str3 = [],
            year,
            month,
            time = this.time;

        var timeArr = time.timeArr;
        console.log(timeArr);
        minYear = time.minYear;
        maxYear = time.maxYear;
        $(".tl_rule").css({
                "left": -baseWidth * 10,
                "width": baseWidth * (maxYear - minYear + 1) + 2000
            })
            //pos
        for (var i = 0; i < timeArr.length; i++) {
            var month = parseInt(timeArr[i]);
            var year = parseInt(timeArr[i]) - minYear;
            year = time.timeDiv[i][0] - minYear;
            month = time.timeDiv[i][1];
            str1.push('<div class="news_block" style="left:' + (year + month / 12) * baseWidth + 'px">' + i + '</div>');
            str2.push('<div class="pos_block" style="left:' + (year + month / 12) * baseWidth + 'px"></div>');
        }
        //set year
        for (var j = minYear; j <= maxYear; j++) {
            str3.push('<div class="number_block" style="left:' + (j - minYear) * baseWidth + 'px">' + j + '</div>');
        }
        $(".tl_news").html(str1.join(""));
        $(".tl_mainPos").html(str2.join(""));
        $(".tl_number").html(str3.join(""));
    }

    TimeLine.prototype.setNewTime = function(baseWidth) {
        //年份值
        //位置图
        //信息块
        var that = this;
        var minYear = this.time.minYear;
        var maxYear = this.time.maxYear;
        var len = this.time.len;
        var obj1 = $(".news_block"),
            obj2 = $(".pos_block"),
            obj3 = $(".tl_rule"),
            obj4 = $(".number_block");
        //刻度尺
        obj3.animate({
                "left": -baseWidth * 10,
                "width": baseWidth * len + 2000
            }, 300)
            //年份值
        obj4.each(function(index) {
            $(this).animate({
                "left": index * baseWidth
            }, 300)
        })
        obj1.each(function(index) {
            var time = that.time.timeDiv[index];
            var year = time[0] - minYear;
            var month = time[1];

            $(this).animate({
                "left": (year + month / 12) * baseWidth
            }, 300)
            obj2.eq(index).animate({
                "left": (year + month / 12) * baseWidth
            }, 300)
        })
    }
    TimeLine.prototype.drag = function(obj) {
        var that = this;
        if (typeof obj == 'undefined') {
            return false;
        }
        var isMove = false;
        var left, top, beginX, endX, beginY, endY;
        $(".tl_warp").on("mousedown", function(e) {
            left = parseInt(obj.css("left"));
            beginX = e.clientX;
            isMove = true;
        })
        $("body").on("mousemove", function(e) {
            if (isMove) {
                endX = e.clientX;
                obj.css({
                    "left": left + endX - beginX
                })
            }
        })
        $("body").on("mouseup", function(e) {
            isMove = false;
            // console.log("up~"+new Date());
            //判断边界情况
            var maxLeft = baseTime[currenTime];
            var minLeft = 1000 - that.time.len * baseTime[currenTime];
            var curenLeft = parseInt(obj.css("left"));
            if (curenLeft < minLeft) {
                obj.animate({
                    "left": minLeft
                }, 300)
            }
            if (curenLeft > maxLeft) {
                obj.animate({
                    "left": maxLeft
                }, 300)
            }

        })

    }
    TimeLine.prototype.handdle = function() {
        var that = $(this);
        that.on("bigger", function() {
            // 扩大
            if (currenTime + 1 < baseTime.length) {
                currenTime++;
                this.setNewTime(baseTime[currenTime]);
            }

        })
        that.on("smaller", function() {
            // 缩小
            if (currenTime > 0) {
                currenTime--;
                this.setNewTime(baseTime[currenTime]);
            }

        })
        $("#enlarge").on("click", function() {
            that.trigger('bigger');
        })

        $("#small").on("click", function() {
            that.trigger('smaller');
        })

        //drag event
        this.drag($(".tl_warp"));
    }

    //@TODo
    //动画效果不够严谨  
    //信息块点击的效果 主轴的功能
    //json数据结构
    //json数据解析
    //相关地方更新

    //init
    TimeLine.prototype.init = function() {
        this.getConfig();
        this.initDate();
        this.initStyle();
        this.initMainline(baseTime[currenTime]);
        this.handdle();
    }
    window.timeline = new TimeLine();
    window.timeline.init();


})(window, jQuery)