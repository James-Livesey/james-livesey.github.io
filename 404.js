$(function() {
    if (window.location.pathname.startsWith("/atto/")) {
        window.location.href = "/atto";

        return;
    }

    var lines = [
        "Beginning dump of physical memory",
        "",
        "Physical memory dump complete.",
        "Contact your system administrator or technical support group for further<br>assistance.",
        "",
        "Now taking you to the homepage in 5 seconds",
        "",
        "",
        "",
        "",
        "Get ready..."
    ];
    var currentLine = 0;

    setInterval(function() {
        if (currentLine < lines.length) {
            if (lines[currentLine] != "") {
                $(".errorStatus").html($(".errorStatus").html() + lines[currentLine] + "<br>");
            }

            currentLine++;
        } else {
            window.location.href = "/index.html";
        }
    }, 1000);
});