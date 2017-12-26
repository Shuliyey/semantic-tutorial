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
const categories = [
  {
    content: "IMAX",
    astro: "imax"
  },
  {
    content: "Additional Languages",
    astro: "al",
    icon: "globe"
  },
  {
    content: "Student",
    astro: "st",
    icon: "student"
  },
  {
    content: "Limited",
    astro: "ld",
  }
]
const categoryHtml = (category) => {
  return $(`<div>${category.icon ? '<i class="' + category.icon + ' icon"></i>' : ''}${category.content}</div>`).html()
}
const products = [
  {
    name: "12 Years a Slave",
    metas: {
      short: "Union Square 14",
      price: 24.2
    },
    description: "Fugiat consequat ad ea deserunt aliquip cupidatat velit enim ex eiusmod labore aliqua aute id fugiat.",
    category: ["imax", "al"]
  },
  {
    name: "My Neighbor Totoro",
    metas: {
      short: "IFC Cinema"
      price: 23.5
    },
    description: "Tempor proident nisi dolor mollit ullamco voluptate exercitation laborum aliquip. Pariatur minim et mollit est nisi voluptate eiusmod commodo. Veniam quis commodo sit exercitation in ipsum laboris pariatur non ut consequat magna nisi cillum eiusmod.",
    category: ["ld"]
  },
  {
    name: "Watchmen",
    metas: {
      short: "IFC",
      price: 25.7
    },
    description: "Culpa nisi nulla minim laboris occaecat cillum et dolor velit magna excepteur. Laboris sit exercitation proident voluptate excepteur adipisicing sunt adipisicing minim consectetur non Lorem elit sint irure nostrud. Laborum non mollit officia duis reprehenderit elit culpa officia id fugiat excepteur ea non. Anim deserunt laborum enim quis laborum labore ea. Ut cillum culpa amet sunt voluptate eu est dolor est proident officia. Velit tempor culpa velit qui dolor consequat consectetur veniam est officia eu est. Non qui laborum Lorem anim eu quis sint ut dolore non culpa id magna nisi et consequat. Proident do irure consectetur adipisicing sint labore cillum voluptate reprehenderit.",
    category: []
  }
]



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
    categories.forEach((b) => {
      $(`<div class="item" data-value="${b.astro}">${categoryHtml(b)}</div>`).appendTo($(category_input.find(".menu")))
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
});
