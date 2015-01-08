//time-line
//author liwenlong
//time 2014.1.7

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
   
    var bsWidth = 600;
    var curSize = 1;

    function getChild(n) {  //得到子约数函数
        
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
        this.sizeArr = getChild(this.scaleNum);     //得到缩放比例数组
        this.sizeArr.push(this.scaleNum,this.scaleNum,this.scaleNum,this.scaleNum);
        this.setPosition(bsWidth, 1);
        this.handdle();
    }

    KDC.prototype.setPosition = function(bsWidth, size) {

        var str = [];
        size = this.sizeArr[size - 1]
        var evWidth = bsWidth / this.scaleNum * size;
        for (var i = this.config.min; i <= this.config.max; i++) {
            str.push('<div class="line-block" style="width:' + bsWidth + 'px">');
            str.push('    <div class="warp-year">');
            str.push('       <div class="line-year">' + i + '</div>');
            str.push('    </div');
            str.push('   <div class="warp-month">');
            str.push('      <div class="line-month-big" style="width:' + evWidth + 'px">' + (1) + '</div>');
            for (j = size; j < this.scaleNum; j = j + size) {
                str.push('  <div class="line-month" style="width:' + evWidth + 'px">' + (j + 1) + '</div>');
            }
            str.push('    </div>')
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
            if (curSize + 1 <= maxlen) {
                curSize++;
                 bsWidth = bsWidth *0.8;
                that.setPosition(bsWidth, curSize)
           
            }
            onWork = true;
        })
        $("#big").on("click", function() {
            if (!onWork) { return;  }
            onWork = false;
                if (curSize > 1) {
                    curSize--;
                    bsWidth = bsWidth / 0.8;
                    that.setPosition(bsWidth, curSize)
                }
            onWork = true;

        })

    }
    win.KDC = new KDC();
    win.KDC.init();
})(window, jQuery)