function getURLParameter(parameter) {
    return decodeURIComponent((new RegExp("[?|&]" + parameter + "=" + "([^&;]+?)(&|#|;|$)").exec(location.search) || [null, ""])[1].replace(/\+/g, "%20")) || null;
}

$(function() {
    $(".socialMore").hide();

    $(".social").mouseenter(function() {
        $(this).find(".socialMore").show();
    }).mouseleave(function() {
        $(this).find(".socialMore").hide();
    });

    setInterval(function() {
        var bdayEpoch = new Date().getTime() - new Date("Fri Nov 14 2003 05:19:00 GMT+0000").getTime();
        var bdayYears = Math.floor(bdayEpoch / (365.25 * 24 * 60 * 60 * 1000));

        $(".age").text("📅 I am " + bdayYears + " years old (epoch ± 1 min)");
    });
});