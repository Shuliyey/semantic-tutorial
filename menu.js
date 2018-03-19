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

const config = {
  file: {
    page: {
      num: 1
    },
    items: {
      limit: 10
    }
  }
}
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
      price: {
        value: 24.2,
        unit: '$'
      }
    },
    description: "Fugiat consequat ad ea deserunt aliquip cupidatat velit enim ex eiusmod labore aliqua aute id fugiat.",
    categories: ["imax", "al"],
  },
  {
    name: "My Neighbor Totoro",
    metas: {
      short: "IFC Cinema",
      price: {
        value: 23.5,
        unit: '$'
      }
    },
    description: "Tempor proident nisi dolor mollit ullamco voluptate exercitation laborum aliquip. Pariatur minim et mollit est nisi voluptate eiusmod commodo. Veniam quis commodo sit exercitation in ipsum laboris pariatur non ut consequat magna nisi cillum eiusmod.",
    categories: ["ld"]
  },
  {
    name: "Watchmen",
    metas: {
      short: "IFC",
      price: {
        value: 25.7,
        unit: '$'
      }
    },
    description: "Culpa nisi nulla minim laboris occaecat cillum et dolor velit magna excepteur. Laboris sit exercitation proident voluptate excepteur adipisicing sunt adipisicing minim consectetur non Lorem elit sint irure nostrud. Laborum non mollit officia duis reprehenderit elit culpa officia id fugiat excepteur ea non. Anim deserunt laborum enim quis laborum labore ea. Ut cillum culpa amet sunt voluptate eu est dolor est proident officia. Velit tempor culpa velit qui dolor consequat consectetur veniam est officia eu est. Non qui laborum Lorem anim eu quis sint ut dolore non culpa id magna nisi et consequat. Proident do irure consectetur adipisicing sint labore cillum voluptate reprehenderit.",
    categories: []
  }
]
const populate_products = () => {
  for (i=0; i < 10; i++) {
    products.push({
        name: "Watchmen",
        metas: {
          short: "IFC",
          price: {
            value: 25.7,
            unit: '$'
          }
        },
        description: "Culpa nisi nulla minim laboris occaecat cillum et dolor velit magna excepteur. Laboris sit exercitation proident voluptate excepteur adipisicing sunt adipisicing minim consectetur non Lorem elit sint irure nostrud. Laborum non mollit officia duis reprehenderit elit culpa officia id fugiat excepteur ea non. Anim deserunt laborum enim quis laborum labore ea. Ut cillum culpa amet sunt voluptate eu est dolor est proident officia. Velit tempor culpa velit qui dolor consequat consectetur veniam est officia eu est. Non qui laborum Lorem anim eu quis sint ut dolore non culpa id magna nisi et consequat. Proident do irure consectetur adipisicing sint labore cillum voluptate reprehenderit.",
        categories: []
    })
  }
}

populate_products()

const findCategory = (array, key) => {
  return array.find((x) => x.astro === key)
}
const units = ['$']
const convertToRegExpSymbol = (c) => {
  switch (c) {
    case '$':
      return '\\$'
    case '^':
      return '\\^'
    default:
      return c
  }
  return c
}
const displayMeta = (meta, type) => {
  switch (type) {
    case "short":
      return meta
    case "price":
      return meta.unit + meta.value
    default:
      return meta
  }
  return meta
}
const convertMeta = (mval, type) => {
  switch (type) {
    case "short":
      return mval
    case "price":
      const match = mval.match(new RegExp(`^ *(${units.map(u => convertToRegExpSymbol(u)).join('|')}) *(.*)$`))
      return {
        value: parseFloat(match[2]),
        unit: match[1]
      }
    default:
      return mval
  }
  return mval
}
const product_default = {
  img: "https://semantic-ui.com/images/wireframe/image.png"
}
let selected_items = []
const populateProductContent = (product, content) => {
  $(`<div class="header">${product.name}</div>`).appendTo(content)
  const meta = $('<div class="meta"></div>')
  meta.appendTo(content)
  for (m in product.metas) {
    $(`<span class="${m}">${displayMeta(product.metas[m], m)}</span>`).appendTo(meta)
  }
  $(`<div class="description"><p>${product.description}</p></div>`).appendTo(content)
  const extra = $('<div class="extra"></div>').appendTo(content)
  product.categories.map((c) => findCategory(categories, c)).forEach((c) => {
    $(`<div class="ui label">${ c.icon ? '<i class="' + c.icon + ' icon"></i>' : ''}${c.content}</div>`).appendTo(extra)
  })
}
const products_$ = products.map((product) => {
  let item = $('<div class="item"></div>')
  const image = $(`<div class="image"><img src="${product.img ? product.img : product_default.img}"></div>`)
  image.appendTo(item)
  image.on('click', function () {
    check_circles = item.find('.check.circle')
    if (check_circles.length === 0) {
      $('<i class="green large check circle icon" style="display: none"></i>').prependTo(item).fadeIn(function() {
        selected_items.push(item.index())
      })
      const content = item.find('.content:first')
      const form = $('<div class="ui form"></div>')
      const header_input = $(`<div class="ui large input product_name"><input type="text" value="${product.name}"></div>'`)
      const meta_input = $(`<div class="meta product_metas"></div>`)
      for (m in product.metas) {
        $(`<div class="ui small input"><input type="text" name="meta_${m}" value="${displayMeta(product.metas[m], m)}" /></div>`).appendTo(meta_input)
      }
      const description_input = $(`<div class="field product_description"><textarea>${product.description}</textarea></div>`)
      const category_input = $('<div class="ui fluid multiple search selection dropdown product_categories"><input type="hidden" name="categroy" value=""><i class="dropdown icon"></i><div class="default text">类别</div><div class="menu"></div></div>')
      const category_input_items = categories.map((b) => {
        $(`<div class="item" data-value="${b.astro}">${categoryHtml(b)}</div>`).appendTo(category_input.find(".menu")).promise()
      })
      header_input.appendTo(form)
      meta_input.appendTo(form)
      description_input.appendTo(form)
      category_input.appendTo(form)
      Promise.all(category_input_items).then(function() {
        category_input.dropdown('set selected', product.categories)
      })
      content.empty()
      form.appendTo($(content))
    } else {
      check_circles.fadeOut(function() {
        $(this).remove()
        selected_items = selected_items.filter((e) => e !== item.index())
        const form = item.find('.form:first')
        const content = item.find('.content:first')
        product.name = content.find('.ui.input.product_name:first').find('input:first').val()
        const metas_$ = item.find('.product_metas:first')
        metas_$.find('.ui.input input').each((_, i) => {
          const key = $(i).attr('name').split('_')[1]
          product.metas[key] = convertMeta($(i).val(), key)
        })
        product.description = item.find('.product_description textarea:first').val()
        // console.log(item.find('.product_categories input:first').val())
        product.categories = item.find('.product_categories input:first').val().split(',').filter(val => val !== '')
        content.empty()
        populateProductContent(product, content)
      })
    }
  })
  const content = $('<div class="content"></div>')
  content.appendTo(item)
  populateProductContent(product, content)
  return item
})

const render_products = () => {
  products_$.forEach((p, i) => {
    if (i >= (config.file.page.num - 1) * config.file.items.limit && i < config.file.page.num * config.file.items.limit) {
      p.insertBefore(file_items_dummy_$)
    }
  })
}

const remove_displayed_products = () => {
  products_$.forEach((p, i) => {
    if (i >= (config.file.page.num - 1) * config.file.items.limit && i < config.file.page.num * config.file.items.limit) {
      p.remove()
    }
  })
}

/* ========= product pagination ========= */
product_pagination_$ = $(".core .page.file .ui.container.list_products .ui.pagination.menu")
page_num_input_$ = $('<input type="text">')
page_num_input_$.val(config.file.page.num)
page_num_direct_$ = $('<button class="ui button">跳到</button>')
page_num_direct_$.on('click', () => {
  console.log(page_num_input_$.val())
})
page_num_$ = $('<div class="ui action item input"></div>')
page_num_$.append(page_num_input_$)
page_num_$.append(page_num_direct_$)
previous_pagination_button=$('<a class="item"><i class="chevron left icon"></i></a>')
next_pagination_button=$('<a class="item"><i class="chevron right icon"></i></a>')

const render_pagination = () => {
  product_pagination_$.empty()
  page_num_direct_$.on('click', () => {
    go_to_page(parseInt(page_num_input_$.val()))
  })

  previous_pagination_button.on('click', previous_page)
  next_pagination_button.on('click', next_page)
  product_pagination_$.append(page_num_$)
  if (config.file.page.num > 1) {
    product_pagination_$.prepend(previous_pagination_button)
  }
  if (!(config.file.page.num*config.file.items.limit >= products.length)) {
    product_pagination_$.append(next_pagination_button)
  }
}

const setPageNum = (num) => {
  if (typeof num !== 'number') {
    return
  }
  config.file.page.num = num
  page_num_input_$.val(config.file.page.num)
}

const go_to_page = (num) => {
  num = Math.max(1, num)
  num = Math.min(num, Math.ceil(products.length / config.file.items.limit))
  if (num === config.file.page.num) {
    return
  }
  remove_displayed_products()
  setPageNum(num)
  render_products()
  render_pagination()
}

const previous_page = () => {
  go_to_page(config.file.page.num - 1)
}

const next_page = () => {
  go_to_page(config.file.page.num + 1)
}

render_pagination()

/* ========= add product item ========= */

const popUpAddItem = () => {
  if (! $('.core .page.file .ui.container.list_products').hasClass('hidden')) {
    $('.core .page.file .ui.container.list_products').transition('fade down')
  }
  if ($('.core .page.file .ui.container.add_products').hasClass('hidden')) {
    $('.core .page.file .ui.container.add_products').transition('fade up')
  }
}

const pushItem = () => {
  if ($('.core .page.file .ui.container.list_products').hasClass('hidden')) {
    $('.core .page.file .ui.container.list_products').transition('fade down')
  }
  if (! $('.core .page.file .ui.container.add_products').hasClass('hidden')) {
    $('.core .page.file .ui.container.add_products').transition('fade up')
  }
}

const cancelItem = () => {
  if ($('.core .page.file .ui.container.list_products').hasClass('hidden')) {
    $('.core .page.file .ui.container.list_products').transition('fade down')
  }
  if (! $('.core .page.file .ui.container.add_products').hasClass('hidden')) {
    $('.core .page.file .ui.container.add_products').transition('fade up')
  }
}

const product_add_form_$ = $('<form class="ui form"></form>')
product_add_form_$.append('<div class="field"><label>First Name</label><input type="text" name="first-name" placeholder="First Name"></div>')
product_add_form_$.append('<div class="field"><label>Last Name</label><input type="text" name="last-name" placeholder="Last Name"></div>')
product_add_form_$.append('<div class="field"><label>Text</label><textarea data-gramm="true" data-txt_gramm_id="af3000fa-8d00-2b04-29f9-4d24f12a69e6" data-gramm_id="af3000fa-8d00-2b04-29f9-4d24f12a69e6" spellcheck="false" data-gramm_editor="true" style="z-index: auto; position: relative; line-height: 17.9998px; font-size: 14px; transition: none; background: transparent !important;"></textarea></div>')
product_add_form_dropzone_$ = $('<div id="product_add_from_dropzone" class="field dropzone"></div>')
product_add_form_dropzone_$.dropzone({
  url: "https://www.google.com/upload-target",
  autoProcessQueue: false,
  dictDefaultMessage: "将菜图片拖到此处",
  uploadMultiple: true,
  addRemoveLinks: true,
  dictRemoveFile: "删除图片"
})
product_add_form_$.append(product_add_form_dropzone_$)
product_add_form_cancel_button_$ = $('<button class="ui button" type="button">Cancel</button>')
product_add_form_cancel_button_$.on('click', cancelItem)
product_add_form_$.append(product_add_form_cancel_button_$)
product_add_form_$.append('<button class="ui button" type="button">Submit</button>')


/* ========= sidebar navigation ========= */

$('.menu .browse')
  .popup({
    inline: true,
    hoverable: true,
    position: 'bottom right',
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

// $('.ui.search.dropdown').dropdown();
// $('.core .page.file .item .image').on('click', function () {
//   const item = $(this).parent()
//   check_circles = item.find('.check.circle')
//   if (check_circles.length === 0) {
//     $('<i class="green large check circle icon" style="display: none"></i>').prependTo(item).fadeIn(function() {
//       selected_items.push(item.index())
//     })
//     content = item.find('.content')
//     header = $(content).find('.header')
//     meta = $(content).find('.meta')
//     description = $(content).find('.description')
//     category = $(content).find('.category')
//     form = $('<div class="ui form"></div>')
//     header_input = $(`<div class="ui large input"><input type="text" value="${header.text()}"></div>'`)
//     meta_input = $(`<div class="meta"></div>`)
//     $(meta).find('span').each((_, b) => {
//       $(`<div class="ui small input"><input type="text" name="meta_${$(b).attr("class")}" value="${$(b).text()}" /></div>`).appendTo(meta_input)
//     })
//     description_input = $(`<div class="field"><textarea>${description.text().trim()}</textarea></div>`)
//     category_input = $('<div class="ui fluid multiple search selection dropdown"><input type="hidden" name="categroy"><i class="dropdown icon"></i><div class="default text">类别</div><div class="menu"></div></div>')
//     categories.forEach((b) => {
//       $(`<div class="item" data-value="${b.astro}">${categoryHtml(b)}</div>`).appendTo($(category_input.find(".menu")))
//     })
//     header_input.appendTo(form)
//     meta_input.appendTo(form)
//     description_input.appendTo(form)
//     category_input.appendTo(form)
//     $(category_input).dropdown()
//     content.empty()
//     form.appendTo($(content))
//   } else {
//     check_circles.fadeOut(function() {
//       $(this).remove()
//       selected_items = selected_items.filter((e) => e !== item.index())
//     })
//   }
// });

file_items_$ = $('.core .page.file .ui.items.container.list_products').first()
file_items_dummy_$ = file_items_$.find('.item.dummy:last')

$('.main .ui.menu .ui.popup .ui.grid .column .menu .item .plus').parent().on('click', popUpAddItem)

$(document).ready(() => {
  render_products()
  $('.core .page.file .ui.container.add_products').append(product_add_form_$)
  product_add_from_dropzone = Dropzone.forElement("#product_add_from_dropzone")
})
