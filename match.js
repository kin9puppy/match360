$(function() {
    var t60 = function(){ //show some RequireJS-like module format
    var $arr;
    return {
        init: function () {
            this.index              = 0;
            $arr                    = [$('#turn-l'), $('#turn-r'), $('#turn-m')];
            this.preloadImages();
            this.registerEvents();
        },

        iterate: function (i) {
            this.index = this.withinBounds(i + this.index);
            this.setSrc();
        },

        preloadImages: function(){
            for(var i = 1; i <= 36; i++){
                $('<img/>')[0].src =  'img/360/' + i + '.jpg';
            }
        },

        setSrc: function () {
            for (var i in $arr) {
                $arr[i].attr('src', 'img/360/' + this.getSrc(i) + '.jpg');
            }
        },

        getSrc: function (i) {
            switch (i) {
                case '0':
                    return this.index;
                case '1':
                    return this.withinBounds(this.index - 12);
                case '2':
                    return this.withinBounds(this.index - 24);
            }
        },

        registerEvents: function () {
            var self = this;
            $(document).on('mousedown', '.t-roll', function (e) {
                var i = $(e.currentTarget).attr('rel') === 'left' ? 1 : -1;
                self.startTimer(i);
            });
            $(document).on('mouseup', '.t-roll', function (e) {
                self.stopTimer();
            });
            $(document).on('mousedown', '#panel-viewer', function (e) {
                self.startDrag(e);
            });
            $(document).on('mouseup', function (e) {
                self.endDrag();
            });
            $(document).on('mousemove', '#panel-viewer', function (e) {
                if(self.watch === true){ self.dragPosition(e, .12); }
            });
        },

        dragPosition: function(e, factor){
            var movement        = Math.round((this.x - e.pageX) * factor);
            this.index          = this.withinBounds(movement);
            this.setSrc();
        },

        endDrag: function () {
            this.watch          = false;
        },

        startDrag: function (e) {
            this.watch          = true;
            this.x              = e.pageX;
        },

        startTimer: function (i) {
            this.ticking        = true;
            setTimeout(function () {
                if (this.ticking === true) {
                    this.iterate(i);
                    this.startTimer(i);
                }
            }.bind(this), 20);
        },

        stopTimer: function () {
            this.ticking        = false;
        },

        withinBounds: function (indx) {
            while (indx <= 0) {
                indx += 36;
            }
            while (indx > 36) {
                indx += -36;
            }
            return indx;
        }
    }.init();
    }();});