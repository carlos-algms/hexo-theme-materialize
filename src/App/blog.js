

import sharePost from './shared/share-post';
import lightboxOnArticles from './shared/lightbox-on-articles';

// @ts-ignore
import 'lightbox2/dist/css/lightbox.css';

$(async function blog() {
  sharePost();

  await Promise.all([
    import(/* webpackChunkName: "lightbox" */'lightbox2'),
  ]);

  lightboxOnArticles();
});
