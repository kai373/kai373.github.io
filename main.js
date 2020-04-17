"use strict";

// let unei = 0;
// let enshutsu = 0;
// let kaihatsu = 0;
// let koho = 0;
// let zaimu = 0;
// let sankadantai = 0;
// let shogai = 0;
// let seisaku = 0;
// let somu = 0;

let nogi = 0;
let hinata = 0;

$(function () {
  $("#start").on("click", function () {
    $(this).fadeOut(10);
    $("#question1").fadeIn();
  });

  $(".yes1").on("click", function () {
    hinata++;
    $("#question1").fadeOut(10);
    $("#question2").fadeIn();
  });
  $(".no1").on("click", function () {
    $("#question1").fadeOut(10);
    $("#question2").fadeIn();
  });
  $(".yes2").on("click", function () {
    hinata++;
    $("#question2").fadeOut(10);
    $("#question3").fadeIn();
  });
  $(".no2").on("click", function () {
    $("#question2").fadeOut(10);
    $("#question3").fadeIn();
  });
  $(".yes3").on("click", function () {
    hinata++;
    $("#question3").fadeOut(10);
    $("#question4").fadeIn();
  });
  $(".no3").on("click", function () {
    $("#question3").fadeOut(10);
    $("#question4").fadeIn();
  });
  $(".yes4").on("click", function () {
    hinata++;
    $("#question4").fadeOut(10);
    $("#question5").fadeIn();
  });
  $(".no4").on("click", function () {
    $("#question4").fadeOut(10);
    $("#question5").fadeIn();
  });
  $(".yes5").on("click", function () {
    nogi++;
    $("#question5").fadeOut(10);
    $("#question6").fadeIn();
  });
  $(".no5").on("click", function () {
    $("#question5").fadeOut(10);
    $("#question6").fadeIn();
  });
  $(".yes6").on("click", function () {
    nogi++;
    $("#question6").fadeOut(10);
    $("#question7").fadeIn();
  });
  $(".no6").on("click", function () {
    $("#question6").fadeOut(10);
    $("#question7").fadeIn();
  });
  $(".yes7").on("click", function () {
    nogi++;
    $("#question7").fadeOut(10);
    $("#question8").fadeIn();
  });
  $(".no7").on("click", function () {
    $("#question7").fadeOut(10);
    $("#question8").fadeIn();
  });
  $(".yes8").on("click", function () {
    nogi++;
    $("#question8").fadeOut(10);
    $("#question9").fadeIn();
  });
  $(".no8").on("click", function () {
    $("#question8").fadeOut(10);
    $("#question9").fadeIn();
  });
  $(".yes9").on("click", function () {
    nogi++;
    $("#question9").fadeOut(10);
    $("#question10").fadeIn();
  });
  $(".no9").on("click", function () {
    $("#question9").fadeOut(10);
    $("#question10").fadeIn();
  });
  $(".yes10").on("click", function () {
    nogi++;
    $("#question10").fadeOut(10);
    $("#result").fadeIn();
  });
  $(".no10").on("click", function () {
    $("#question10").fadeOut(10);
    $("#result").fadeIn();
  });

  $("#result").on("click", function () {
    if (nogi === 0 && hinata === 0) {
      $("#zero").fadeIn();
    } else if (nogi > hinata) {
      $("#nogi").fadeIn();
    } else if (nogi === hinata) {
      $("#nogi").fadeIn();
      $("#hinata").fadeIn();
    } else {
      $("#hinata").fadeIn();
    }
  });
});
