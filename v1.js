//time-line
//author liwenlong
//time 2014.12.30
function drag(obj) {
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
      //判断边界情况
      var maxLeft = 20;
      var minLeft = 1000 - parseInt($(".tl_news").css("width"));
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
  (function(win, $) {

    function TimeLine() {
        //默认配置
        this.config = {
          "id": "tl_view",
          "data": [{
            "title": "test1",
            "time": "2009.7"
          }, {
            "title": "test1",
            "time": "2009.7"
          }, {
            "title": "test1",
            "time": "2009.7"

          }]
        }

      }
      //全局参数配置
    var timeArr = [], //时间数组
      baseTime = [100, 120, 140, 160, 180, 200, 220, 240, 270],
      currenTime = 2,
      data,

      unknow;
    timeArr = ["2005.9", "2008.9", "2010.3", "2010.9", "2013.5"];
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
        this.config = $.extend(this.config, timeline_config)
      }
    }
    TimeLine.prototype.initMainline = function(baseWidth) {
        //初始化
        //刻度尺
        //时间标
        //事件块
        var maxYear,
          minYear,
          str1 = [],
          str2 = [],
          str3 = [],
          timeArr = ["2005.9", "2008.9", "2010.3", "2010.9","2012.5", "2013.5"],
          unkonw;
        minYear = parseInt(timeArr[0].split(".")[0]);
        maxYear = parseInt(timeArr[timeArr.length - 1].split(".")[0]);
        $(".tl_rule").css({
            "left": -baseWidth ,
            "width": baseWidth * (maxYear - minYear + 1) + 1000
          })
          //pos
        for (var i = 0; i < timeArr.length; i++) {
          var month = parseInt(timeArr[i].split(".")[1]);
          var year = parseInt(timeArr[i].split(".")[0]) - minYear;
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
      //init
    TimeLine.prototype.init = function() {
      this.getConfig();
      this.initMainline(baseTime[currenTime]);
      this.handdle();
    }
    TimeLine.prototype.setNewTime = function(baseWidth) {
      //年份值
      //位置图
      //信息块
      var minYear = parseInt(timeArr[0].split(".")[0]);
      var maxYear = parseInt(timeArr[timeArr.length - 1].split(".")[0]);
      var obj1 = $(".news_block"),
        obj2 = $(".pos_block"),
        obj3 = $(".tl_rule"),
        obj4 = $(".number_block");
      //刻度尺
      obj3.animate({
          "left": -baseWidth ,
          "width": baseWidth * (maxYear - minYear + 1) + 1000
        }, 300)
        //年份值
      obj4.each(function(index) {
        $(this).animate({
          "left": index * baseWidth
        }, 300)
      })
      obj1.each(function(index) {
        var month = parseInt(timeArr[index].split(".")[1]);
        var year = parseInt(timeArr[index].split(".")[0]) - minYear;
        $(this).animate({
          "left": (year + month / 12) * baseWidth
        }, 300)
        obj2.eq(index).animate({
          "left": (year + month / 12) * baseWidth
        }, 300)
      })
    }
    TimeLine.prototype.handdle = function() {
      var that = $(this);
      that.on("bigger", function() {
        // 触发扩大
        if (currenTime + 1 < baseTime.length) {
          currenTime++;
          this.setNewTime(baseTime[currenTime]);
        }

      })
      that.on("smaller", function() {
        // 触发扩大
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
    }

    //@TODo
    //   function moveKdc    刻度尺移动
    // enlargeTime   时间放大  
    // ShortenTime   时间缩小

    //动画效果不够严谨  
    //拖拽的边界
    //信息块点击的效果 主轴的功能
    return new TimeLine().init();

  })(window, jQuery)