(function($) {
  "use strict";

  var site = {

    init: function() {
      var self = this;

      this.bindClicks();
    },

    bindClicks: function() {
      this.closeResponsiveMenu();
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
      if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
      } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
      }
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
