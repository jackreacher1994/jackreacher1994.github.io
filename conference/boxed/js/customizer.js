(function($) {

	'use strict';

	var $body = $('body');
	var $navigation = $('#customizer');

	$body.waypoint(function() {
		$navigation.removeClass('affix');
	}, {
		offset: -1
	});

	$body.waypoint(function() {
		$navigation.addClass('affix');
	}, {
		offset: -2
	});

	$('#customizer .popup-open').click(function() {
		var $parent = $(this).parents('#customizer');

		if ($parent.hasClass('in')) {
			$parent.removeClass('in');
		} else {
			$parent.addClass('in');
		}
	});

	$('#customizer .scrollbar-inner').scrollbar();

	$('#customizer .customizer-color a').click(function(e) {
		var $color = $(this).attr('class');
		$('head').append('<link rel="stylesheet" type="text/css" href="css/colors/' + $color + '.css">');
		e.preventDefault();
	});

})(window.jQuery);
