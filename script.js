$(function() {
    $(".socialMore").hide();

    $(".social").mouseenter(function() {
        $(this).find(".socialMore").show();
    }).mouseleave(function() {
        $(this).find(".socialMore").hide();
    });
});