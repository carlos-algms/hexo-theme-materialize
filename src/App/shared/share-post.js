import $ from 'jquery';

export default function sharePost() {
  const $body = $(document.body);

  $body
    .on('click', removeOverlay)
    .on('click', '.article-share-link', share)
    .on('click', '.article-share-box', stopPropagation)
    .on('click', '.article-share-box-input', selectContent)
    .on('click', '.article-share-box-link', openShareWindow);

  ///

  function removeOverlay() {
    $('.article-share-box.on').removeClass('on');
  }

  /**
   * @param {JQuery.ClickEvent} e
   */
  function share(e) {
    e.stopPropagation();

    const $this = $(e.currentTarget);
    const id = `article-share-box-${$this.attr('data-id')}`;
    let box = $(`#${id}`);

    if (box.hasClass('on')) {
      box.removeClass('on');
      return;
    }

    if (!box.length) {
      box = createShareBox(id, $this.attr('data-url'));
    }

    $('.article-share-box.on').hide();

    const offset = $this.offset();
    box
      .css({
        top: offset.top + 25,
        left: offset.left,
      })
      .addClass('on');
  }

  /**
   * @param {string} id
   * @param {string} url
   */
  function createShareBox(id, url) {
    const encodedUrl = encodeURIComponent(url);

    // TODO maybe move it to a <template />
    // TODO remove google plus
    const html = `
    <div id="${id}" class="article-share-box">
      <input class="article-share-box-input" value="${url}">
      <div class="article-share-links">
        <a href="https://twitter.com/intent/tweet?url=${encodedUrl}" class="article-share-twitter" target="_blank" title="Twitter"></a>
        <a href="https://www.facebook.com/sharer.php?u=${encodedUrl}" class="article-share-facebook" target="_blank" title="Facebook"></a>
        <a href="http://pinterest.com/pin/create/button/?url=${encodedUrl}" class="article-share-pinterest" target="_blank" title="Pinterest"></a>
        <a href="https://plus.google.com/share?url=${encodedUrl}" class="article-share-google" target="_blank" title="Google+"></a>
      </div>
    </div>
    `;

    const box = $(html);

    $body.append(box);
    return box;
  }

  /**
   * @param {JQuery.ClickEvent} e
   */
  function stopPropagation(e) {
    e.stopPropagation();
  }

  /**
   * @param {JQuery.ClickEvent} e
   */
  function selectContent(e) {
    $(e.currentTarget).trigger('select');
  }

  /**
   * @param {JQuery.ClickEvent} e
   */
  function openShareWindow(e) {
    e.preventDefault();
    e.stopPropagation();

    /** @type {HTMLAnchorElement} */
    const anchor = e.currentTarget;
    window.open(anchor.href, `article-share-box-window-${Date.now()}`, 'width=500,height=450');
  }
}
