var $trigger = $(".modal-button");
var $target = $('.modal');
var $modalClose = $("#modal-close");
var $html = $("html");

$trigger.click(function () {
  $html.addClass("is-clipped");
  $target.addClass("is-active");
});

$modalClose.click(function () {
  $html.removeClass("is-clipped");
  $target.removeClass("is-active");
});
