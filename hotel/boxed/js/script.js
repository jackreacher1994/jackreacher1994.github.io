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

			var $navigation = $('#navigation.navbar-hotel');

			// Main navigation menu affix
			if ($navigation.hasClass('navbar-affix')) {
				$body.waypoint(function() {
					$navigation.removeClass('affix');
				}, {
					offset: -41
				});

				$body.waypoint(function() {
					$navigation.addClass('affix');
				}, {
					offset: -42
				});
			}

			var $scrollspy = false;

			// Main navigation menu scrollspy
			if ($navigation.hasClass('scrollspy')) {
				setTimeout(function() {
					$body.scrollspy({
						target: '#navigation.navbar-hotel',
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
			$(document).on('focus keypress', '.affa-form-signup input[type="text"], .affa-form-signup input[type="email"], .affa-form-signup input[type="password"], .affa-form-signup textarea', function() {
				var $input = $(this);

				if ($input.hasClass('error')) {
					$input.removeClass('error');
				}
			});

			// Set input date value to today
			var now	  = new Date();
			var day	  = ('0' + now.getDate()).slice(-2);
			var month = ('0' + (now.getMonth() + 1)).slice(-2);
			var today = now.getFullYear() + '-' + (month) + '-' + (day);
			$('.affa-form-check-hotel input[type="date"], .affa-form-signup.form-hotel input[type="date"]').val(today);

			// Check availability form when submit button clicked
			$(document).on('submit', '.affa-form-check-hotel', function() {
				var $form		= $(this);
				var check_in	= $form.find('input[name="check_in"]').val();
				var night		= $form.find('select[name="night"]').val();
				var check_out	= $form.find('input[name="check_out"]').val();
				var adults		= $form.find('input[name="adults"]').val();
				var children	= $form.find('input[name="children"]').val();

				$('#modal-booking').modal('show');
				$('#modal-booking').on('shown.bs.modal', function() {
					$form = $(this).find('form');
					$form.find('input[name="check_in"]').val(check_in);
					$form.find('select[name="night"]').val(night);
					$form.find('input[name="check_out"]').val(check_out);
					$form.find('input[name="adults"]').val(adults);
					$form.find('input[name="children"]').val(children);
				});

				return false;
			});

			// Signup form when submit button clicked
			$(document).on('submit', '.affa-form-signup.form-hotel', function() {
				var $form		= $(this);
				var submitData	= $form.serialize();
				var $check_in	= $form.find('input[name="check_in"]');
				var $night		= $form.find('select[name="night"]');
				var $check_out	= $form.find('input[name="check_out"]');
				var $adults		= $form.find('input[name="adults"]');
				var $children	= $form.find('input[name="children"]');
				var $name		= $form.find('input[name="name"]');
				var $email		= $form.find('input[name="email"]');
				var $submit		= $form.find('input[name="submit"]');
				var status		= true;

				if ($email.val() === '' || pattern.test($email.val()) === false) {
					$email.addClass('error');
					status = false;
				}

				if (status) {
					$check_in.attr('disabled', 'disabled');
					$night.attr('disabled', 'disabled');
					$check_out.attr('disabled', 'disabled');
					$adults.attr('disabled', 'disabled');
					$children.attr('disabled', 'disabled');
					$name.attr('disabled', 'disabled');
					$email.attr('disabled', 'disabled');
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
									$check_in.val('').removeAttr('disabled').removeClass('error');
									$night.val('').removeAttr('disabled').removeClass('error');
									$check_out.val('').removeAttr('disabled').removeClass('error');
									$adults.val('').removeAttr('disabled').removeClass('error');
									$children.val('').removeAttr('disabled').removeClass('error');
									$name.val('').removeAttr('disabled').removeClass('error');
									$email.val('').removeAttr('disabled').removeClass('error');
									$submit.removeAttr('disabled');
									$form.find('.submit-status').html('<p class="success"><i class="ion ion-android-checkmark-circle"></i>' + msg_split[1] + '</p>').fadeIn(300).delay(3000).fadeOut(300);
								} else {
									$check_in.removeAttr('disabled').removeClass('error');
									$night.removeAttr('disabled').removeClass('error');
									$check_out.removeAttr('disabled').removeClass('error');
									$adults.removeAttr('disabled').removeClass('error');
									$children.removeAttr('disabled').removeClass('error');
									$name.removeAttr('disabled').removeClass('error');
									$email.removeAttr('disabled').removeClass('error');
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

			// Rooms slider
			$('.carousel-slider.rooms-hotel-slider').slick({
				speed: 300,
				autoplay: true,
				autoplaySpeed: 3000,
				slidesToShow: 3,
				responsive: [{
					breakpoint: 768,
					settings: {
						slidesToShow: 1
					}
				}]
			});

			// Testimonials slider
			$('.carousel-slider.testimonials-hotel-slider').slick({
				arrows: false,
				dots: true,
				speed: 300,
				autoplay: true,
				autoplaySpeed: 3000,
				draggable: false,
				responsive: [{
					breakpoint: 768,
					settings: {
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
