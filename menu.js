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
        console.log(item.find('.product_categories input:first').val())
        product.categories = item.find('.product_categories input:first').val().split(',')
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

file_items_$ = $('.core .page.file .ui.items.container').first()
file_items_dummy_$ = file_items_$.find('.item.dummy:last')

$(document).ready(() => {
  products_$.forEach((p) => {
    p.insertBefore(file_items_dummy_$)
  })
})
