function print(text, insert = true) {
    $(".output").html($(".output").html() + text + (insert ? "<br>" : ""));
    $("html, body").scrollTop($(document).height());
}

var files = {
    "home": {
        "user": {
            "readme.txt": "Hello, world!"
        }
    }
};

var upperFolder = null;
var currentFolder = files["home"]["user"];
var path = [];

var commands = {
    help: function(params) {
        if (params == "") {
            print("bash (ish) V1.0");
            print("These shell commands are defined internally. Type `help` to see this list.");
            print("Type `help name` to find out more about function `name`.");
            print("Use `info bash` to find out more about the shell in general.");
            print("Use `man -k` or `info` to find out more about commands not in this list.");
            print("");
            print("A star (*) next to a name means that the command is disabled.");
            print("");
            print(" cat [file]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cd [directory]");
            print(" help [command]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ls");
            print(" mkdir [directory]&nbsp;&nbsp;&nbsp;touch [file]");
        } else if (params == "name") {
            print("Oh man. Do you really have to take everything literally?!");
        } else {
            var helpArticles = {
                cat: `cat [file]
                <br>
<del>Shows cat memes</del> Shows file contents.`,
                cd: `cd [directory]
<br>
Navigates to directory. Use '..' to go up.`,
                help: `help [command]
<br>
Is helpful.`,
                ls: `ls
<br>
Displays the current directory contents.`,
                mkdir: `mkdir [directory]
<br>
Creates a directory.`,
                touch: `touch [file]
<br>
Creates a file with empty contents.`
            };

            if (params in helpArticles) {
                print(helpArticles[params]);
            } else {
                print("-bash: help: no help topics match `" + params + "`. Try `help help` or `man -k " + params + "` or `info " + params + "`.");
            }
        }
    },

    ls: function (params) {
        var keys = [];

        for (var key in currentFolder) {
            if (currentFolder.hasOwnProperty(key)) {
                keys.push(key);
            }
        }

        print(keys.join(" "));
    },

    cat: function(params) {
        if (params == "") {
            print("cat: usage: cat [file]");
        } else {
            if (typeof(currentFolder[params]) == "object") {
                print("cat: " + params + ": Is a directory");
            } else if (currentFolder[params] == "") {
                print("");
            } else if (currentFolder[params]) {
                print(currentFolder[params]);
            } else {
                print("cat: " + params + ": No such file or directory");
            }
        }
    },

    cd: function(params) {
        if (params != "") {
            if (params == "..") {
                if (path.length > 0) {
                    currentFolder = upperFolder;
                    path.pop();
                }
            } else if (typeof(currentFolder[params]) == "object") {
                upperFolder = currentFolder;
                currentFolder = currentFolder[params];
                path.push(params);
            } else if (typeof(currentFolder[params]) == "string") {
                print("-bash: cd: " + params + ": Not a directory");
            } else {
                print("-bash: cd: " + params + ": No such file or directory");
            }
        }
    },

    mkdir: function(params) {
        if (params == "") {
            print("usage: mkdir [directory]");
        } else {
            if (typeof(currentFolder[params]) == "object") {
                print("mkdir: cannot create directory '" + params + "': File exists");
            } else {
                currentFolder[params] = {};
            }
        }
    },

    touch: function(params) {
        if (params == "") {
            print("touch: missing file operand");
            print("Try 'touch --help' for more information.");
        } else if (params == "--help") {
            print("Go touch that file... touch [file]");
        } else {
            currentFolder[params] = "";
        }
    }
};

$(function() {
    $(".input").hide();

    var lines = [
        "Starting Livesey Linux...",
        "Livesey Linux V1.0.",
        " ",
        "You have some new packages available:"
    ];
    var currentLine = 0;

    lines = lines.concat(termlist.split("\n"));

    lines = lines.concat([
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        " ",
        "Welcome to Livesey Linux.",
        "This shell comes with ABSOLUTELY NO WARRANTY! SO THAT MEANS I WILL NOT FIX IT BECAUSE IT WORKS FOR ME!",
        "So why was I shouting again?",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Oh yeah, legal reasons.",
        " ",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "bash (ish) V1.0",
        "Type `help` for help",
        ""
    ]);

    setInterval(function() {
        if (currentLine < lines.length) {
            if (lines[currentLine] != "") {
                print(lines[currentLine]);
            }
        } else if (currentLine == lines.length) {
            $(".input").show();
            $(".terminal").focus();
            $("html, body").scrollTop($(document).height());

            $(".terminal").keypress(function(e) {
                if ((event.keyCode ? event.keyCode : event.which) == 13) {
                    if ($(this).val() != "") {
                        print("$ " + $(this).val());

                        if ($(this).val().split(" ")[0] in commands) {
                            commands[$(this).val().split(" ")[0]](($(this).val().split(" ").length > 0 ? $(this).val().substring($(this).val().split(" ")[0].length + 1) : ""));
                        } else {
                            print("-bash: " + $(this).val().split(" ")[0] + ": command not found");
                        }

                        $(this).val("");
                    }
                }
            });
        }

        currentLine++;
    }, 50);
});