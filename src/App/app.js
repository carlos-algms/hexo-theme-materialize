import $ from 'jquery';

import 'materialize-css';
import 'lightbox2';

import sharePost from './shared/share-post';
import lightboxOnArticles from './shared/lightbox-on-articles';

(function app() {
  // https://materializecss.com/sidenav.html
  $('.sidenav').sidenav();

  sharePost();
  lightboxOnArticles();
}());
