function lightboxOnArticles($){$(".article-entry").each((function(i,div){$("img",div).each((function(j,imgEl){const $img=$(imgEl);if($img.parent().hasClass("fancybox"))return;const{src="",alt=""}=imgEl;$img.wrap(`<a href="${src}" title="${alt}" data-lightbox="image-${i}-${j}" />`)})),$("a[data-lightbox]",div).each((function(n,link){link.rel="article"+n}))}))}define(["jquery"],lightboxOnArticles);