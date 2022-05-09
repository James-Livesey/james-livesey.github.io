var lastSessionProgram = localStorage.getItem("atto_lastSessionProgram") || "";

if (window.location.search != "") {
    window.location.replace(`https://atto.devicefuture.org/${window.location.search}&lsp=${encodeURIComponent(lastSessionProgram)}`);
} else {
    window.location.replace(`https://atto.devicefuture.org/?lsp=${encodeURIComponent(lastSessionProgram)}`);
}