/*----------------------------
    Modules
----------------------------*/
/*----------------------------
    Global Variables
----------------------------*/
(function () {
  Minami = {};

  // Device
  Minami.devices = {
    "1px": "mobile",
    "2px": "tablet",
    "3px": "desktop",
    "4px": "desktop_l",
    "5px": "desktop_xl",
  };
})();

// Minami.Utilities = {
//   getTranslate: function (obj) {
//     var result = {};

//     var transformMatrix =
//       obj.css("-webkit-transform") ||
//       obj.css("-moz-transform") ||
//       obj.css("-ms-transform") ||
//       obj.css("-o-transform") ||
//       obj.css("transform");

//     var matrix = transformMatrix.replace(/[^0-9\-.,]/g, "").split(",");

//     result.x = matrix[12] || matrix[4]; //translate x
//     result.y = matrix[13] || matrix[5]; //translate y

//     return result;
//   },
// };

/*----------------------------
    Load
----------------------------*/
$(function () {
  /*----------------------------
        Slider
    ----------------------------*/
  /*----------------------------
        SKILLS
    ----------------------------*/
  /*----------------------------
        WORKS
    ----------------------------*/
  // Scroll animation
  Minami.scrollAnimation = function (_options) {
    var options = _options || {},
      lists = options.lists || ".scroll-list",
      $window = $(window),
      windowHight = $window.height(),
      topWindow = $window.scrollTop();

    $(lists).each(function () {
      var targetPosition = $(this).offset().top,
        animation = $(this).data("animation"),
        animation_delay = $(this).data("animation_delay") || "";

      if (topWindow > targetPosition - windowHight + 200) {
        if (typeof Minami[animation] === "function") {
          Minami[animation]();
          $(this).removeClass("scroll-list");
        } else {
          $(this).addClass(animation).css({
            visibility: "visible",
            "animation-delay": animation_delay,
          });
        }
      }
    });
  };

  Minami.changeBgColor = function (args) {
    var scrollPos = $(window).scrollTop(),
      $el = args.el || $(".main-bg"),
      beginColor = args.begin_color,
      endColor = args.end_color,
      beginPos = args.begin_pos,
      endPos = args.end_pos,
      percentScrolled,
      newRed,
      newGreen,
      newBlue,
      newAlpha,
      newColor;

    if (args.force) {
      $el.animate({ backgroundColor: args.color_obj.toRgbaString() }, 0);
      return;
    }

    // percent of background colour according to postion of scrolling
    percentScrolled = (scrollPos - beginPos) / (endPos - beginPos);

    // generate new background color
    newRed =
      beginColor.red() + (endColor.red() - beginColor.red()) * percentScrolled;
    newGreen =
      beginColor.green() +
      (endColor.green() - beginColor.green()) * percentScrolled;
    newBlue =
      beginColor.blue() +
      (endColor.blue() - beginColor.blue()) * percentScrolled;
    newAlpha =
      beginColor.alpha() +
      (endColor.alpha() - beginColor.alpha()) * percentScrolled;
    newColor = new $.Color(newRed, newGreen, newBlue, newAlpha);

    // console.log( newColor.red(), newColor.green(), newColor.blue());
    // console.log(scrollPos, beginPos, endPos, percentScrolled);
    $el.animate({ backgroundColor: newColor }, 0);
  };

  Minami.scrollHandler = function (e, _opt) {
    var opt = _opt || {},
      topWindow = $(window).scrollTop(),
      $pageHeader = $(".page-header"),
      sections = Minami.sections,
      commonFunc,
      beginChangePos,
      portion = 0.5;

    // console.log(topWindow, sections);

    // run a scroll animation
    Minami.scrollAnimation();

    // common function
    commonFunc = function () {
      section = Minami.current_section.name;
      $pageHeader.find(".menu-item." + section).addClass("menu-item-current");
    };

    // reset an effect of each section
    $pageHeader
      .removeClass("page-header-darker page-header-lighter")
      .find(".menu-item")
      .removeClass("menu-item-current");
    $(".js-social-hover").removeClass("social-sec-darker");

    // Home
    if (topWindow < sections.about.top) {
      Minami.current_section = sections.home;
      commonFunc();

      // change background color
      beginChangePos = 0 + (sections.about.top - 0) * portion;
      if (topWindow > beginChangePos) {
        Minami.changeBgColor({
          el: $(".main-bg, .slider-blur"),
          begin_color: sections.home.color_obj,
          end_color: sections.about.color_obj,
          begin_pos: beginChangePos,
          end_pos: sections.about.top,
        });
      }

      // About
    } else if (
      topWindow >= sections.about.top &&
      topWindow < sections.skills.top
    ) {
      Minami.current_section = sections.about;
      commonFunc();

      // change background color
      beginChangePos =
        sections.about.top +
        (sections.skills.top - sections.about.top) * portion;
      if (topWindow > beginChangePos) {
        Minami.changeBgColor({
          el: $(".main-bg, .slider-blur"),
          begin_color: sections.about.color_obj,
          end_color: sections.skills.color_obj,
          begin_pos: beginChangePos,
          end_pos: sections.skills.top,
        });
      }

      $pageHeader.addClass("page-header-lighter");

      // Skills
    } else if (
      topWindow >= sections.skills.top &&
      topWindow < sections.works.top
    ) {
      Minami.current_section = sections.skills;
      commonFunc();

      // change background color
      beginChangePos =
        sections.skills.top +
        (sections.works.top - sections.skills.top) * portion;
      if (topWindow > beginChangePos) {
        Minami.changeBgColor({
          el: sections.$targetEl,
          begin_color: sections.skills.color_obj,
          end_color: sections.works.color_obj,
          begin_pos: beginChangePos,
          end_pos: sections.works.top,
        });
      }
      $pageHeader.addClass("page-header-lighter");
      // $('.js-social-hover').addClass('social-sec-darker');

      // Works
    } else if (
      topWindow >= sections.works.top &&
      topWindow < sections.contact.top
    ) {
      Minami.current_section = sections.works;
      commonFunc();

      // change background colour
      beginChangePos =
        sections.works.top +
        (sections.contact.top - sections.works.top) * portion;
      if (topWindow > beginChangePos) {
        Minami.changeBgColor({
          el: sections.$targetEl,
          begin_color: sections.works.color_obj,
          end_color: sections.contact.color_obj,
          begin_pos: beginChangePos,
          end_pos: sections.contact.top,
        });
      }

      // change nav colour
      $pageHeader.addClass("page-header-darker");
      $(".js-social-hover").addClass("social-sec-darker");

      // Contact
    } else if (topWindow >= sections.contact.top) {
      Minami.current_section = sections.contact;
      commonFunc();
      // $pageHeader.addClass('page-header-darker');
      // $('.js-social-hover').addClass('social-sec-darker');
    }

    // run callback function if needed
    if (typeof opt.callback === "function") {
      opt.callback();
    }
  };

  /*----------------------------
        Initialize
    ----------------------------*/
  (function () {
    /* Set a global variable to a curernt device */
    Minami.current_device = Minami.devices[$(".check-device").css("width")];

    /* Navigation scroll event */
    Minami.sections = {};
    var $pageHeader = $(".page-header");

    $(".js-section").each(function () {
      var top = $(this).offset().top,
        section = $(this).data("section"),
        bgColor = $(this).data("bg-color");

      Minami.sections[section] = {};
      Minami.sections[section].name = section;
      Minami.sections[section].top = Math.floor(top - $pageHeader.height());
      Minami.sections[section].color_obj = $.Color(bgColor);

      if (section === "home" || section === "about") {
        Minami.sections[section].$targetEl = $(".main-bg, .slider-blur");
      } else {
        Minami.sections[section].$targetEl = $(".main-bg");
      }
    });

    /* Scrolling Event */
    // bind a scrolling event
    $(window).bind("scroll", Minami.scrollHandler);
    $(window).trigger("scroll");

    Minami.changeBgColor({
      el: Minami.current_section.$targetEl,
      force: true,
      color_obj: Minami.current_section.color_obj,
    });

    // bind a click event for nav menu
    $pageHeader.find(".menu-link").click(function (e) {
      e.preventDefault();

      var section = Minami.sections[$(this).attr("href")],
        scrollTop = section.top;

      // move to the section
      $("html, body").animate(
        {
          scrollTop: scrollTop,
        },
        {
          duration: 1000,
          start: function () {
            $(window).off("scroll", Minami.scrollHandler);
          },
          complete: function () {
            // $(window).on("scroll", Minami.scrollHandler);
            $(window).bind("scroll", Minami.scrollHandler);
            $(window).scroll();

            Minami.changeBgColor({
              el: section.$targetEl,
              force: true,
              color_obj: section.color_obj,
            });
          },
        }
      );
    });
  })();
});
