const MARKDOWN_OPTIONS = {
    headerLevelStart: 1,
    emoji: true
};

var articles = [];

class Article {
    constructor(filename, contents) {
        this.filename = filename;
        this.contents = contents;
    }

    get date() {
        return new Date(this.filename.split("-")[0], this.filename.split("-")[1] - 1, this.filename.split("-")[2]);
    }

    get excerpt() {
        return this.contents.split(" ").slice(0, 32).join(" ");
    }
}

function renderArticles() {
    for (var i = 0; i < articles.length; i++) {
        $(".blogArticles").append(
            $("<div class='articleExcerpt'>").append(
                $("<span>").html(new showdown.Converter({...MARKDOWN_OPTIONS, headerLevelStart: 2}).makeHtml(articles[i].excerpt) + "..."),
                " ",
                $("<a>")
                    .text("Read more")
                    .attr("href", "/article.html?article=" + articles[i].filename)
            )
        );

        $("<p>")
            .text(articles[i].date.toLocaleDateString("en-GB", {weekday: "long", day: "numeric", month: "long", year: "numeric"}))
            .insertAfter(".articleExcerpt:last-of-type h2")
        ;
    }

    if (getURLParameter("article") != null) {
        var selectedDate = null;
        var selectedContents = null;

        for (var i = 0; i < articles.length; i++) {
            if (articles[i].filename == getURLParameter("article")) {
                selectedDate = articles[i].date;
                selectedContents = articles[i].contents;
            }
        }

        if (selectedContents == null) {
            window.location.replace("404.html");
        }

        $(".articleDate").text(selectedDate.toLocaleDateString("en-GB", {weekday: "long", day: "numeric", month: "long", year: "numeric"}));
        $(".articleContents").html(new showdown.Converter(MARKDOWN_OPTIONS).makeHtml(selectedContents));
    }
}

$(function() {
    $.getJSON("https://api.github.com/repos/James-Livesey/James-Livesey/contents/blog", function(data) {
        for (var i = 0; i < data.length; i++) {
            (function(file, complete) {
                $.get(file["download_url"], function(contents) {
                    articles.push(new Article(file["name"], contents));

                    if (complete) {
                        renderArticles();
                    }
                });
            })(data[i], i == data.length - 1);
        }
    });
});