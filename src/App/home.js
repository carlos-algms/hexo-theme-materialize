import $ from 'jquery';


$(async function home() {
  await import(/* webpackChunkName: "jquery-circle-progress" */'jquery-circle-progress');

  $('.circle-progress').each((i, node) => {
    $(node)
      .circleProgress({
        value: parseInt(node.dataset.value) / 100,
        size: 100,
        startAngle: -Math.PI / 2,
        fill: {
          gradient: ['white', 'white'],
        },
      })
      .on('circle-animation-progress', (event, progress, stepValue) => {
        $(event.currentTarget)
          .find('strong')
          .text((stepValue * 100).toFixed(0));
      });
  });
});
