(function($) {

	'use strict';

	var $window	= $(window);
	var $body	= $('body');

	var LeadPro = {

		// Initialization the functions
		init: function() {

			LeadPro.Menu();
			LeadPro.Scroll();
			LeadPro.Form();
			LeadPro.Video();
			LeadPro.Background();
			LeadPro.Carousel();
			LeadPro.Tooltip();
			LeadPro.Counter();
			LeadPro.Browser();

			$window.on('load', function() {
				LeadPro.Lightbox();
				LeadPro.Preload();
				LeadPro.Animation();
			});

		},

		// Menu functions & settings
		Menu: function() {

			// Show & hide navigation menu in mobile device
			var menuOpenProcess = false;

			$(document).on('click', '.navbar-btn-toggle', function(e) {
				menuOpenProcess = true;

				if ($body.hasClass('nav-mobile-open')) {
					$body.removeClass('nav-mobile-open');
				} else {
					$body.addClass('nav-mobile-open');
				}

				setTimeout(function() {
					menuOpenProcess = false;
				}, 100);

				e.preventDefault();
			});

			$(document).on('click', '#body-wrap', function() {
				if ($body.hasClass('nav-mobile-open') && menuOpenProcess === false) {
					$body.removeClass('nav-mobile-open');
				}
			});

		},

		// Scroll functions & settings
		Scroll: function() {

			// Scroll to the anchor smoothly
			$(document).on('click', 'a.smooth-scroll', function(event) {
				var $anchor	  = $(this);
				var offsetTop = '';

				if (window.Response.band(768)) {
					offsetTop = parseInt($($anchor.attr('href')).offset().top - 70, 0);
				} else {
					offsetTop = parseInt($($anchor.attr('href')).offset().top - 60, 0);
				}

				$('html, body').stop().animate({
					scrollTop: offsetTop
				}, 2000, 'easeOutExpo');

				event.preventDefault();
			});

			// Smoothing page scroll
			$('html').scrollWithEase();

			// Scroll to the top of the page
			$(document).on('click', '.scrollup', function() {
				$('html, body').stop().animate({
					scrollTop: 0
				}, 2000, 'easeOutExpo');

				return false;
			});

			$body.waypoint(function() {
				$('.scrollup').removeClass('visible');
			}, {
				offset: -130
			});

			$body.waypoint(function() {
				$('.scrollup').addClass('visible');
			}, {
				offset: -131
			});

		},

		// Form functions & settings
		Form: function() {

			var pattern = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

			// Checking subscribe form input when focus and keypress event
			$(document).on('focus keypress', '.affa-form-subscribe.form-general input[type="text"], .affa-form-subscribe.form-general input[type="email"]', function() {
				var $input = $(this);

				if ($input.hasClass('error')) {
					$input.val('').removeClass('error');
				}
				if ($input.hasClass('success')) {
					$input.val('').removeClass('success');
				}
			});

			// Checking contact form input when focus and keypress event
			$(document).on('focus keypress', '.affa-form-contact.form-general input[type="text"], .affa-form-contact.form-general input[type="email"], .affa-form-contact.form-general textarea', function() {
				var $input = $(this);

				if ($input.hasClass('error')) {
					$input.removeClass('error');
				}
			});

			// Subscribe form when submit button clicked
			$(document).on('submit', '.affa-form-subscribe.form-general', function() {
				var $email	= $(this).find('input[name="email"]');
				var $submit	= $(this).find('input[name="submit"]');

				if (pattern.test($email.val()) === false) {
					$email.val('Please enter a valid email address!').addClass('error');
				} else {
					var submitData = $(this).serialize();
					$email.attr('disabled', 'disabled');
					$submit.attr('disabled', 'disabled');

					$.ajax({
						type: 'POST',
						url: 'includes/process-subscribe.php',
						data: submitData + '&action=add',
						dataType: 'html',
						success: function(msg) {
							if (parseInt(msg, 0) !== 0) {
								var msg_split = msg.split('|');

								if (msg_split[0] === 'success') {
									$submit.removeAttr('disabled');
									$email.removeAttr('disabled').val(msg_split[1]).addClass('success');
								} else {
									$submit.removeAttr('disabled');
									$email.removeAttr('disabled').val(msg_split[1]).addClass('error');
								}
							}
						}
					});
				}

				return false;
			});

			// Contact form when submit button clicked
			$(document).on('submit', '.affa-form-contact.form-general', function() {
				var $form		= $(this);
				var submitData	= $form.serialize();
				var $name		= $form.find('input[name="name"]');
				var $email		= $form.find('input[name="email"]');
				var $message	= $form.find('textarea[name="message"]');
				var $submit		= $form.find('input[name="submit"]');
				var status		= true;

				if ($email.val() === '' || pattern.test($email.val()) === false) {
					$email.addClass('error');
					status = false;
				}

				if ($message.val() === '') {
					$message.addClass('error');
					status = false;
				}

				if (status) {
					$name.attr('disabled', 'disabled');
					$email.attr('disabled', 'disabled');
					$message.attr('disabled', 'disabled');
					$submit.attr('disabled', 'disabled');

					$.ajax({
						type: 'POST',
						url: 'includes/process-contact.php',
						data: submitData + '&action=add',
						dataType: 'html',
						success: function(msg) {
							if (parseInt(msg, 0) !== 0) {
								var msg_split = msg.split('|');

								if (msg_split[0] === 'success') {
									$name.val('').removeAttr('disabled').removeClass('error');
									$email.val('').removeAttr('disabled').removeClass('error');
									$message.val('').removeAttr('disabled').removeClass('error');
									$submit.removeAttr('disabled');
									$form.find('.submit-status').html('<p class="success"><i class="ion ion-android-checkmark-circle"></i>' + msg_split[1] + '</p>').fadeIn(300).delay(3000).fadeOut(300);
								} else {
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

		// Video functions & settings
		Video: function() {

			// Responsive video frame size
			$body.fitVids();

		},

		// Background functions & settings
		Background: function() {

			// Background with parallax scrolling effect
			$window.resize(function() {
				setTimeout(function() {
					$window.trigger('resize.px.parallax');
				}, 400);
			});

			$(document).on('click', '.panel a[data-toggle="collapse"], .nav-tabs a[data-toggle="tab"]', function() {
				setTimeout(function() {
					$window.trigger('resize.px.parallax');
				}, 400);
			});

		},

		// Carousel functions & settings
		Carousel: function() {

			// General slider
			$('.carousel-slider.general-slider').slick({
				dots: true,
				speed: 300,
				adaptiveHeight: true,
				draggable: false,
				responsive: [{
					breakpoint: 768,
					settings: {
						draggable: true
					}
				}]
			});

		},

		// Tooltip functions & settings
		Tooltip: function() {

			// Tooltip element on hover
			$('.btn-tooltip').tooltip();

			// Popover element on click
			$('.btn-popover').popover();
			$(document).on('click', '.btn-popover', function(e) {
				e.preventDefault();
			});

		},

		// Counter functions & settings
		Counter: function() {

			// Progress bar element with counter
			$('.affa-progress-bar').each(function() {
				$(this).waypoint(function() {
					var $elem = $(this).find('.progress-bar-line.in');

					$elem.find('.progress-bar-val').animate({
						'width': $elem.find('.progress-bar-val').html()
					}, 3000, 'easeOutExpo');

					$elem.removeClass('in');
				}, {
					offset: '95%'
				});
			});

			$('.affa-progress-bar h4 > i').counterUp({
				delay: 10,
				time: 3000
			});

		},

		// Cross-browser functions & settings
		Browser: function() {

			// Check if browser is Safari version < 6
			if ($.browser.safari) {
				var userAgent = navigator.userAgent.toLowerCase();
				userAgent = userAgent.substring(userAgent.indexOf('version/') + 8);
				var version = userAgent.substring(0, userAgent.indexOf('.'));

				if (version < 6) {
					$('html').addClass('safari');
				}
			}

		},

		// Lightbox functions & settings
		Lightbox: function() {

			// Preview images popup gallery with Fancybox
			$('.fancybox').fancybox({
				loop: false
			});

		},

		// Preload functions & settings
		Preload: function() {

			// Show images after all the images loaded
			$('img.parallax-slider').imgpreload({
				all: function() {
					$('img.parallax-slider').addClass('loaded');
				}
			});

			$('.affa-bg-img .bg-img-base').addClass('loaded');

		},

		// Animation functions & settings
		Animation: function() {

			// Embed CSS animation effects to the elements
			$.fn.affaAnimate = function() {
				var $this = this;
				var delay = 0;

				if ($this.data('delay')) {
					delay = parseInt($this.data('delay'), 0);
				}

				if (!$this.hasClass('animated')) {
					setTimeout(function() {
						$this.addClass('animated ' + $this.data('animation'));
					}, delay);
				}

				delay = 0;
			};

			$('.animation').each(function() {
				var $this = $(this);

				if ($this.data('nooffset')) {
					$this.affaAnimate();
				} else {
					$this.waypoint(function() {
						$this.affaAnimate();
					}, {
						offset: '80%'
					});
				}
			});

			$('.animation-visible').each(function() {
				var $this = $(this);

				if ($this.data('nooffset')) {
					$this.affaAnimate();
				} else {
					$this.waypoint(function() {
						$this.affaAnimate();
					}, {
						offset: '40%'
					});
				}
			});

		}

	};

	// Run the init function
	$(function() {
		LeadPro.init();
	});

})(window.jQuery);
