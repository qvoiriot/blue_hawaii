(function($) {
  "use strict";

  var site = {

    is_mobile: false,
    is_tablet: false,
    is_desktop: false,
    mobile_nav_height: 50,

    init: function() {
      var self = this;

      this.binds();
      this.device_detection();
      this.bindClicks();
    },

    device_detection: function() {
      this.is_mobile = false;
      this.is_tablet = false;
      this.is_desktop = false;

      if (/force_mobile/.test(location.href) || $(window).width() <= 736 || ($('.resp-true').length > 0 && $(window).width() < 768)) {
        this.is_mobile = true;
      } else if (/force_tablet/.test(location.href) || $(window).width() <= 1024) {
        this.is_tablet = true;
      } else {
        this.is_desktop = true;
      }

      this.$body.removeClass('mobile tablet desktop');
      if (this.is_mobile) {
        this.$body.addClass('mobile');
      } else if (this.is_tablet) {
        this.$body.addClass('tablet');
      } else {
        this.$body.addClass('desktop');
      }
    },

    binds: function() {
      this.$body = $('body');
    },

    bindClicks: function() {
      this.closeResponsiveMenu();
      this.navigationActions();
      this.goToTop();
    },

    closeResponsiveMenu: function() {
      $('.navbar-collapse ul li a').on('click', function() {
        if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
          $('.navbar-toggle:visible').click();
        }
      });
    },

    onScroll: function() {
      this.collapseNavbar();
    },

    collapseNavbar: function() {
      if ($(".navbar").offset().top > site.mobile_nav_height) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
        $('.hidden-nav').fadeIn();
      } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
        $('.hidden-nav').fadeOut();
      }
    },

    navigationActions: function() {
      $('.page-scroll').bind('click', function(event) {
        var $anchor = $(this).attr('data-anchor');
        var $delta_mobile = 0;

        $('section').removeClass('scroll-down');
        $('.page-scroll').removeClass('active');

        $(this).addClass('active');
        $($anchor).addClass('scroll-down');

        if (!this.is_desktop) {
          $delta_mobile = site.mobile_nav_height;
        }

        $('html, body').stop(true).animate({
          scrollTop: $($anchor).offset().top - site.mobile_nav_height + $delta_mobile
        }, 1200, 'easeInOutExpo');
      });
    },

    goToTop: function() {
      $('.navbar-brand').on('click', function() {
        $('html,body').stop(true).animate({
          scrollTop: 0
        }, 1200, 'easeInOutExpo');
      });
    },

    onResize: function() {}

  };

  var ready_func = function() {
    window.site = site;
    site.init();
    $(window).resize($.proxy(site.onResize, site));
    $(window).scroll($.proxy(site.onScroll, site));
  };

  if ($.isReady) {
    ready_func();
  } else {
    $(document).ready(ready_func);
  }
})(jQuery);
