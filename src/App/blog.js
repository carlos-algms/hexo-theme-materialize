

import sharePost from './shared/share-post';
import lightboxOnArticles from './shared/lightbox-on-articles';

(async function blog() {
  sharePost();

  await Promise.all([
    import('lightbox2'),
    import('lightbox2/dist/css/lightbox.css'),
  ]);

  lightboxOnArticles();
}());
