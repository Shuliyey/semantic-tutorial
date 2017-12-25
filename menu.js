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
let selected_items = []


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

$('.ui.dropdown').dropdown({
  action: 'hide'
});

$('.ui.search.dropdown').dropdown();

$('.core .page.file .item .image').on('click', function () {
  const item = $(this).parent()
  check_circles = item.find('.check.circle')
  if (check_circles.length === 0) {
    $('<i class="green large check circle icon" style="display: none"></i>').prependTo(item).fadeIn(function() {
      selected_items.push(item.index())
    })
    content = item.find('.content')
    header = $(content).find('.header')
    meta = $(content).find('.meta')
    description = $(content).find('.description')
    category = $(content).find('.category')
    form = $('<div class="ui form"></div>')
    header_input = $(`<div class="ui large input"><input type="text" value="${header.text()}"></div>'`)
    meta_input = $(`<div class="meta"></div>`)
    $(meta).find('span').each((_, b) => {
      $(`<div class="ui small input"><input type="text" name="meta_${$(b).attr("class")}" value="${$(b).text()}" /></div>`).appendTo(meta_input)
    })
    description_input = $(`<div class="field"><textarea>${description.text().trim()}</textarea></div>`)
    category_input = $('<div class="ui fluid multiple search selection dropdown"><input type="hidden" name="categroy"><i class="dropdown icon"></i><div class="default text">类别</div><div class="menu"></div></div>')
    $(category).find('.label').each((_, b) => {
      $(`<div class="item" data-value="${$(b).text().trim()}">${$(b).html()}</div>`).appendTo($(category_input.find(".menu")))
    })
    header_input.appendTo(form)
    meta_input.appendTo(form)
    description_input.appendTo(form)
    category_input.appendTo(form)
    $(category_input).dropdown()
    content.empty()
    form.appendTo($(content))
  } else {
    check_circles.fadeOut(function() {
      $(this).remove()
      selected_items = selected_items.filter((e) => e !== item.index())
    })
  }
})
