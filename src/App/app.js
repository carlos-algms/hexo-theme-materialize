import $ from 'jquery';

import 'font-awesome/css/font-awesome.css';
import 'materialize-css/dist/css/materialize.css';

import '../styles/style.scss';

$(async function app() {
  await import(/* webpackChunkName: "materialize" */ 'materialize-css');

  /**
   * @param {'true' | 'false'} state
   */
  function setExpandedState(state) {
    $('.sidenav-trigger').attr('aria-expanded', state);
  }

  // https://materializecss.com/sidenav.html
  $('.sidenav').sidenav({
    onOpenStart: function () {
      setExpandedState('true');
    },
    onCloseStart: function () {
      setExpandedState('false');
    },
  });
});
