var waitingDialog = waitingDialog || (function ($) {
    'use strict';


    return {

        show: function (fn_callback) {
            var asignando = $("#main_overlay").css("display", "block");
            $.when(asignando).then(function () {
                if (typeof fn_callback === 'function') {
                    fn_callback();
                }
            });

        },
		/**
		 * Closes dialog
		 */
        hide: function (fn_callback) {
            var asignando = $("#main_overlay").css("display", "none");
            $.when(asignando).then(function () {
                if (typeof fn_callback === 'function') {
                    fn_callback();
                }
            });
        }
    };

})(jQuery);