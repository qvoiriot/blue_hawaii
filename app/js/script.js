(function($) {
  "use strict";

  var site = {

    mobile_nav_height: 50,

    init: function() {
      var self = this;

      this.bindClicks();
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

        $('section').removeClass('scroll-down');
        $('.page-scroll').removeClass('active');

        $(this).addClass('active');
        $($anchor).addClass('scroll-down');

        $('html, body').stop(true).animate({
          scrollTop: $($anchor).offset().top - site.mobile_nav_height
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
