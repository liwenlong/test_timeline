function drag(obj) {
        var that = this;
        if (typeof obj == 'undefined') {
            return false;
        }
        var isMove = false;
        var left, top, beginX, endX, beginY, endY;
        obj.on("mousedown", function(e) {
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
            var maxLeft = 100;
            var minLeft = 1000 - obj.css("width");
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