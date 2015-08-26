var t60 = function(){ //show some basic js object stuff
    return {

        index: 0,

        init: function(){
            this.registerEvents();
        },

        iterate: function(i){
            this.index += i;
            this.reset();
        },

        reset: function(){
            console.log(this.index);
        },

        registerEvents: function(){
            $(document).on('click','.t-roll', function(e){
                var i = $(e.currentTarget).attr('rel') === 'left' ? 1 : -1;
                this.iterate(i);
            }.bind(this));


        }

    }.init();
}();