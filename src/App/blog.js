import 'lightbox2';

import sharePost from './shared/share-post';
import lightboxOnArticles from './shared/lightbox-on-articles';

import 'lightbox2/dist/css/lightbox.css';

(function blog() {
  sharePost();
  lightboxOnArticles();
}());
