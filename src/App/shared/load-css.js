/**
 * @param {string} url
 * @param {(e: HTMLLinkElement) => any} callback
 * @returns {Promise<HTMLLinkElement>}
 */
export default function loadCss(url, callback) {
  return new Promise((res, rej) => {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.id = `loadCss-${Date.now()}`;
    link.href = url;
    link.onload = () => {
      res(link);
      if (callback) {
        callback(link);
      }
    };
    link.onerror = rej;
    document.head.appendChild(link);
  });
}
