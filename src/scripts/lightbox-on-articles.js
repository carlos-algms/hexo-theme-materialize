'use strict';

define(['jquery'], lightboxOnArticles);

/**
 * @param {JQueryStatic} $
 */
function lightboxOnArticles($) {
  $('.article-entry').each(applyLightBoxToImages);

  ///

  /**
   * @param {number} i
   * @param {HTMLDivElement} div
   */
  function applyLightBoxToImages(i, div) {
    $('img', div).each(prepareImages);
    $('a[data-lightbox]', div).each(addRelPropertyOnLinks);

    ///

    /**
     * @param {number} j
     * @param {HTMLImageElement} imgEl
     */
    function prepareImages(j, imgEl) {
      const $img = $(imgEl);

      if ($img.parent().hasClass('fancybox')) {
        return;
      }

      const { src = '', alt = '' } = imgEl;

      $img.wrap(`<a href="${src}" title="${alt}" data-lightbox="image-${i}-${j}" />`);
    }

    /**
     * @param {number} n
     * @param {HTMLAnchorElement} link
     */
    function addRelPropertyOnLinks(n, link) {
      link.rel = `article${n}`;
    }
  }
}
