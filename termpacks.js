var packages = {
    "isfile": function(params) {
        return typeof(currentFolder[params]) == "string";
    },

    "huh": function() {
        if (commands.isfile("readme.txt")) {
            commands.cat("readme.txt");
        } else {
            print("Sorry, can't help right now.");
        }
    }
};

var packageList = {
    "isfile": {
        version: "1.0",
        description: "checks if file exists in directory"
    },

    "huh": {
        version: "1.0",
        description: "reads the readme.txt file in the directory",
        deps: ["isfile"]
    }
};