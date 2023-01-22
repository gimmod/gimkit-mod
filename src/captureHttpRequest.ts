declare global {
  interface XMLHttpRequest {
    _open: any;
  }
}

export function captureHttpResponse(regex: RegExp) {
  return new Promise((r: (data: string) => void) => {
    const backup = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method: string, url: string) {
      console.log(url, "opened");
      if (regex.test(url)) {
        this.addEventListener("load", () => {
          r(this.responseText);
        });
        XMLHttpRequest.prototype.open = backup;
      }
      return backup.apply(this, arguments as any);
    };
  });
}
