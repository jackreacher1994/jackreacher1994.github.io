(function($) {

	'use strict';

	var $body = $('body');

	var LeadPro = {

		// Initialization the functions
		init: function() {

			LeadPro.Menu();
			LeadPro.Form();
			LeadPro.Carousel();

		},

		// Menu functions & settings
		Menu: function() {

			var $navigation = $('#navigation.navbar-corporate');

			// Main navigation menu affix
			if ($navigation.hasClass('navbar-affix')) {
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
			}

			var $scrollspy = false;

			// Main navigation menu scrollspy
			if ($navigation.hasClass('scrollspy')) {
				setTimeout(function() {
					$body.scrollspy({
						target: '#navigation.navbar-corporate',
						offset: 71
					});
				}, 100);

				$scrollspy = true;
			}

			// Navigation menu in mobile device
			var navMenu	= '';
			if ($scrollspy) {
				navMenu += '<nav id="navigation-mobile" class="scrollspy">';
			} else {
				navMenu += '<nav id="navigation-mobile">';
			}
			navMenu	+= '<div class="scrollbar-inner">';
			navMenu	+= '<button type="button" class="navbar-btn-close"><i class="ion ion-close"></i> Close</button>';
			navMenu	+= '<ul>';
			navMenu	+= $navigation.find('.nav').html();
			navMenu	+= '</ul>';
			navMenu	+= '</div>';
			navMenu	+= '</nav>';

			$('#body-wrap').before(navMenu);
			$('#navigation-mobile .scrollbar-inner').scrollbar();
			$(document).on('click', '#navigation-mobile .navbar-btn-close', function() {
				$body.removeClass('nav-mobile-open');
			});

		},

		// Form functions & settings
		Form: function() {

			var pattern = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

			// Checking signup form input when focus and keypress event
			$(document).on('focus keypress', '.affa-form-signup.form-corporate input[type="text"], .affa-form-signup.form-corporate input[type="email"], .affa-form-signup.form-corporate input[type="password"], .affa-form-signup.form-corporate textarea, .affa-form-signup.form-corporate select', function() {
				var $input = $(this);

				if ($input.hasClass('error')) {
					$input.removeClass('error');
				}
			});

			// Signup form when submit button clicked
			$(document).on('submit', '.affa-form-signup.form-corporate', function() {
				var $form		= $(this);
				var submitData	= $form.serialize();
				var $type		= $form.find('select[name="type"]');
				var $name		= $form.find('input[name="name"]');
				var $email		= $form.find('input[name="email"]');
				var $message	= $form.find('textarea[name="message"]');
				var $submit		= $form.find('input[name="submit"]');
				var status		= true;

				if ($email.val() === '' || pattern.test($email.val()) === false) {
					$email.addClass('error');
					status = false;
				}

				if (status) {
					$type.attr('disabled', 'disabled');
					$name.attr('disabled', 'disabled');
					$email.attr('disabled', 'disabled');
					$message.attr('disabled', 'disabled');
					$submit.attr('disabled', 'disabled');

					$.ajax({
						type: 'POST',
						url: 'includes/process-signup.php',
						data: submitData + '&action=add',
						dataType: 'html',
						success: function(msg) {
							if (parseInt(msg, 0) !== 0) {
								var msg_split = msg.split('|');

								if (msg_split[0] === 'success') {
									$type.val('').removeAttr('disabled').removeClass('error');
									$name.val('').removeAttr('disabled').removeClass('error');
									$email.val('').removeAttr('disabled').removeClass('error');
									$message.val('').removeAttr('disabled').removeClass('error');
									$submit.removeAttr('disabled');
									$form.find('.submit-status').html('<p class="success"><i class="ion ion-android-checkmark-circle"></i>' + msg_split[1] + '</p>').fadeIn(300).delay(3000).fadeOut(300);
								} else {
									$type.removeAttr('disabled').removeClass('error');
									$name.removeAttr('disabled').removeClass('error');
									$email.removeAttr('disabled').removeClass('error');
									$message.removeAttr('disabled').removeClass('error');
									$submit.removeAttr('disabled');
									$form.find('.submit-status').html('<p class="error"><i class="ion ion-close-circled"></i>' + msg_split[1] + '</p>').fadeIn(300).delay(3000).fadeOut(300);
								}
							}
						}
					});
				}

				status = true;

				return false;
			});

		},

		// Carousel functions & settings
		Carousel: function() {

			// Testimonials slider
			$('.carousel-slider.testimonials-corporate-slider').slick({
				arrows: false,
				dots: true,
				speed: 300,
				autoplay: true,
				autoplaySpeed: 5000,
				draggable: false,
				slidesToShow: 2,
				responsive: [{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						draggable: true
					}
				}]
			});

		}

	};

	// Run the init function
	$(function() {
		LeadPro.init();
	});

})(window.jQuery);
