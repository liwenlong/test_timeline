//time-line
//author liwenlong
//time 2014.12.30

// Date.prototype.Format = function(fmt)   
//    { //author: meizz   
//        var o = {
//            "M+": this.getMonth() + 1, //月份   
//            "d+": this.getDate(), //日   
//            "h+": this.getHours(), //小时   
//            "m+": this.getMinutes(), //分   
//            "s+": this.getSeconds(), //秒   
//            "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
//            "S": this.getMilliseconds() //毫秒   
//        };
//        if (/(y+)/.test(fmt))
//            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
//        for (var k in o)
//            if (new RegExp("(" + k + ")").test(fmt))
//                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//        return fmt;
//    }

(function(win, $) {

    /*
    刻度尺功能块
    */

    /*
    ===========
    时间格式
       格式 1 : 19970529
       格式 2 : 29/05/1997
   
    */
    //全局变量
    var maxWidth = 600;
    var minWidth = 50;
    var bsWidth = maxWidth;
    var curSize = 1;

    function getChild(n) {
        //得到子约数函数
        var arr1 = [],
            arr2 = [],
            max = Math.sqrt(n);
        for (var i = 0, max = Math.sqrt(n); i < max; i++) {
            if (n % i == 0) {
                arr1.push(i);
                arr2.unshift(n / i);
            }
        }

        if (n % max == 0) {
            arr1.push(max);
        }

        return arr1.concat(arr2);
    }

    function KDC() {
        this.config = {

        }
        this.scaleArr = {
            "year": 5,
            "month": 12,
            "day": 30,
            "housr": 24,
            "min": 60,
            "sec": 60
        }
        this.scaleNum = "month"; //刻度尺维度
        this.sizeArr = [1, 2, 3, 4, 6, 12]; //维度对应的倍数
    }



    KDC.prototype.init = function() {
        //config 合并
        if (typeof kdc_config != 'undefined') {
            $.extend(this.config, kdc_config);

        }
        //数据合法性检查
        if (this.config.max < this.config.min) {
            alert("max 输入有误~");
            return;
        }

        this.scaleNum = this.scaleArr[this.config.scale];
        this.sizeArr = getChild(this.scaleNum);

        this.setPosition(bsWidth, 1);
        this.handdle();
    }

    KDC.prototype.setPosition = function(bsWidth, size) {

        var str = [];
        size = this.sizeArr[size - 1]
        var evWidth = bsWidth / this.scaleNum * size;
        for (var i = this.config.min; i <= this.config.max; i++) {
            str.push('<div class="line_block" style="width:' + bsWidth + 'px">');
            str.push('<div class="line-year">' + i + '</div>')
            str.push('<div class="line-month-big" style="width:' + evWidth + 'px">' + (1) + '</div>')
            for (j = size; j < this.scaleNum; j = j + size) {
                str.push('<div class="line-month" style="width:' + evWidth + 'px">' + (j + 1) + '</div>')
            }
            str.push('</div>')
        }

        $(".line").html(str.join(" "));
        //document.write(str.join(" "));
    }

    KDC.prototype.handdle = function() {
        var maxlen = this.sizeArr.length;
        var minlen = 0;
        var that = this;
        var onWork = true;
        $("#small").on("click", function() {
            if (!onWork) {return;}
            onWork = false;
            if (bsWidth > minWidth) {
                bsWidth = bsWidth * 0.8;
                bsWidth = bsWidth > minWidth ? bsWidth : minWidth;
                if (curSize + 1 <= maxlen) {
                    curSize++;
                }
                that.setPosition(bsWidth, curSize)
            } else {
                alert("不能再缩小了");
            }
            onWork = true;


        })
        $("#big").on("click", function() {
            if (!onWork) { return;  }
            onWork = false;
            if (bsWidth >= maxWidth) {
                bsWidth = maxWidth;
                alert("不能再放大了~");
            } else {
                bsWidth = bsWidth / 0.8;
                if (bsWidth > maxWidth) {
                    bsWidth = maxWidth;
                }
                if (curSize > 1) {
                    curSize--;
                }
                that.setPosition(bsWidth, curSize)
            }
            onWork = true;



        })

    }
    win.KDC = new KDC();
    win.KDC.init();
})(window, jQuery)