import $ from 'jquery';

import 'font-awesome/css/font-awesome.css';
import 'materialize-css/dist/css/materialize.css';

import '../styles/style.scss';

(async function app() {
  await import ('materialize-css');
  // https://materializecss.com/sidenav.html
  $('.sidenav').sidenav();
}());
