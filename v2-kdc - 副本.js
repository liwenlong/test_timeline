//time-line
//author liwenlong
//time 2014.1.7
(function(win, $) {
    function KDC() {
        this.config = {
            "time": ['20091013', '20102012', '20121314'] //时间数组   
        };
        this.allTime = "year month day hour";
        this.time = {
            scal: "year",
            currenTime: "year",
            scalArr: [{
                unit: "year",
                num: 3,
                curNum: 1
            }]


        }
    }
    KDC.prototype.init = function() {
        this.setDate();
    }
    KDC.prototype.setDate = function() {
        var that=this;
        var time = this.config.time;
        var len = time.length;
        var formateTime = []; //[ [年]，[月]，[日] ]
        var year = [],
            month = [],
            day = [];
        for (var i = 0; i < len; i++) {
            year.push(parseInt(time[i].substring(0, 4)));
            month.push(parseInt(time[i].substring(4, 6)));
            day.push(parseInt(time[i].substring(6, 8)));
        }
        formateTime.push(year, month, day)

        function isSame(arr) {
            //判断数组的值是否都相同
            for (var start = arr[0], i = 1, len = arr.length; i < len; i++) {
                if (start != arr[i]) return false;
            }
            return true;
        }

        function getmaxScal(arr) {
            if (!isSame(arr[0])) {
                return "year";
            }
            if (!isSame(arr[1])) {
                return "month";
            }
            if (!isSame(arr[2])) {
                return "day";
            }

        }
        this.scal = getmaxScal(formateTime);

        function initTime(scal) {
            var index = that.allTime.indexOf("month");
            var scalArr=that.allTime.substring(index).split(" ");
            for(var i=0;i<scalArr.length;i++){
                that.time.scalArr.push({
                    unit:scalArr[i],
                    num:3,
                    curNum:1

                })
            }

        }
        
        initTime(that.scal);
        

        function initHtml(formateTime){
            var htmlArr=[];
            var year=formateTime[0];
            var month=formateTime[1];
            var day=formateTime[2];
           
           for(var i=0;i<year.length;i++){
                htmlArr.push('<div class="year" data="'+year[i]+'">');
                htmlArr.push(' <div class="year-block">');
                for(var j=1;j<=12;j++){
                   htmlArr.push('<div class="month" data="'+j+'">');
                   htmlArr.push(' <div class="year-block">'); 
                     for(var k=1;k<=30;k++){
                         htmlArr.push('<div class="day" data="'+k+'">');
                         htmlArr.push('</div>');
                     }
                    htmlArr.push(' </div>');
                    htmlArr.push('</div>');
                }
                htmlArr.push(' </div>');
                htmlArr.push('</div>');
           }
           console.log(htmlArr.join(" "));
          
        }
        initHtml(formateTime);
    }



    win.KDC = new KDC();
    win.KDC.init();
})(window, jQuery)