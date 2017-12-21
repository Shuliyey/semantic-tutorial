// $('.ui.menu .more_option.item').popup({
//   inline   : true,
//   hoverable: true,
//   position : 'bottom left',
//   // popup: $('.more_option.ui.popup'),
//   delay: {
//     show: 300,
//     hide: 800
//   }
// });

$('.menu .browse')
  .popup({
    inline: true,
    hoverable  : true,
    position   : 'bottom right',
    delay: {
      show: 300,
      hide: 800
    }
  });

$('.ui.sidebar.menu .item').on('click',function () {
  $('.ui.sidebar.menu .active.item').removeClass('active');
  $(this).addClass('active');
});

$('.ui.dropdown').dropdown();
