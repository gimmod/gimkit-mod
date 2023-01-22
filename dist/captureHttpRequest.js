export function captureHttpResponse(regex) {
    return new Promise((r) => {
        const backup = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function (method, url) {
            console.log(url, "opened");
            if (regex.test(url)) {
                this.addEventListener("load", () => {
                    r(this.responseText);
                });
                XMLHttpRequest.prototype.open = backup;
            }
            return backup.apply(this, arguments);
        };
    });
}
//# sourceMappingURL=captureHttpRequest.js.map