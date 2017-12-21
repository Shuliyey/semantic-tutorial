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

const items=['file', 'qrcode', 'settings', 'users', 'sign-in', 'sign-out']

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
  $('.page').hide();
  $(this).addClass('active');
  $('.page.' + items[$(this).index()]).show();
});

$('.ui.dropdown').dropdown();
