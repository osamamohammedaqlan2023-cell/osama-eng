// Paint Store: ملف JavaScript واحد لإدارة المنتجات والسلة والنموذج.

const products = [
  {
    id: 1,
    name: 'دهان داخلي أبيض',
    category: 'دهانات داخلية',
    price: 25,
    image: 'images/paint1.jpg',
    description: 'دهان أبيض مناسب للجدران الداخلية.'
  },
  {
    id: 2,
    name: 'دهان داخلي رمادي',
    category: 'دهانات داخلية',
    price: 28,
    image: 'images/paint1.jpg',
    description: 'لون رمادي هادئ للغرف الحديثة.'
  },
  {
    id: 3,
    name: 'دهان خارجي مقاوم',
    category: 'دهانات خارجية',
    price: 35,
    image: 'images/paint2.jpg',
    description: 'دهان عملي للجدران الخارجية.'
  },
  {
    id: 4,
    name: 'دهان أزرق',
    category: 'ألوان',
    price: 30,
    image: 'images/color-cans.jpg',
    description: 'لون أزرق منعش للمساحات المختلفة.'
  },
  {
    id: 5,
    name: 'دهان أخضر',
    category: 'ألوان',
    price: 30,
    image: 'images/color-cans.jpg',
    description: 'لون أخضر هادئ ومناسب للديكور.'
  },
  {
    id: 6,
    name: 'دهان خشب بني',
    category: 'دهانات الخشب',
    price: 32,
    image: 'images/wood-metal.jpg',
    description: 'دهان بني لتجديد الأسطح الخشبية.'
  },
  {
    id: 7,
    name: 'دهان معدني',
    category: 'دهانات المعادن',
    price: 40,
    image: 'images/wood-metal.jpg',
    description: 'طبقة مناسبة للأعمال المعدنية.'
  },
  {
    id: 8,
    name: 'دهان مطفي',
    category: 'دهانات داخلية',
    price: 27,
    image: 'images/paint1.jpg',
    description: 'لمسة مطفية بسيطة وأنيقة.'
  },
  {
    id: 9,
    name: 'فرشاة دهان',
    category: 'أدوات الطلاء',
    price: 8,
    image: 'images/tools.jpg',
    description: 'فرشاة سهلة للاستخدام المنزلي.'
  },
  {
    id: 10,
    name: 'رول دهان',
    category: 'أدوات الطلاء',
    price: 12,
    image: 'images/roller.jpg',
    description: 'رول لتغطية الجدران بسرعة.'
  }
];

let cart = JSON.parse(localStorage.getItem('paintCart')) || [];

function saveCart() {
  localStorage.setItem('paintCart', JSON.stringify(cart));
}

function updateCartCount() {
  const count = document.getElementById('cartCount');
  if (count) {
    count.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}

function addToCart(id) {
  const item = cart.find((product) => product.id === id);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }

  saveCart();
  updateCartCount();
  alert('تمت إضافة المنتج إلى السلة');
}

function showProducts() {
  const list = document.getElementById('productsList');
  if (!list) return;

  const search = document.getElementById('searchInput');

  function render() {
    const value = search.value.trim();
    const filtered = products.filter(
      (product) =>
        product.name.includes(value) || product.category.includes(value)
    );

    list.innerHTML = filtered
      .map(
        (product) => `
        <div class="col-md-6 col-lg-4">
          <div class="card h-100">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body d-flex flex-column">
              <span class="badge text-bg-light align-self-start mb-2">${product.category}</span>
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <strong class="mt-auto mb-3">${product.price} ريال</strong>
              <button class="btn btn-primary" onclick="addToCart(${product.id})">
                إضافة إلى السلة
              </button>
            </div>
          </div>
        </div>`
      )
      .join('');

    if (!filtered.length) {
      list.innerHTML = '<p>لا توجد نتائج.</p>';
    }
  }

  search.addEventListener('input', render);
  render();
}

function showCart() {
  const list = document.getElementById('cartList');
  if (!list) return;

  const total = document.getElementById('cartTotal');

  function render() {
    let sum = 0;

    list.innerHTML = cart
      .map((item) => {
        const product = products.find((p) => p.id === item.id);
        const lineTotal = product.price * item.quantity;
        sum += lineTotal;

        return `
          <div class="card p-3 mb-3 d-flex flex-row align-items-center gap-3">
            <img src="${product.image}" width="90" height="70" class="object-fit-cover" alt="${product.name}">
            <div class="flex-grow-1">
              <strong>${product.name}</strong>
              <p class="mb-0">${product.price} ريال × ${item.quantity}</p>
            </div>
            <button class="btn btn-outline-danger btn-sm" onclick="removeFromCart(${product.id})">
              حذف
            </button>
          </div>`;
      })
      .join('');

    if (!cart.length) {
      list.innerHTML = '<div class="alert alert-info">السلة فارغة.</div>';
    }

    total.textContent = sum;
    updateCartCount();
  }

  window.removeFromCart = function (id) {
    cart = cart.filter((item) => item.id !== id);
    saveCart();
    render();
  };

  render();

  const checkout = document.getElementById('checkoutButton');
  checkout.addEventListener('click', () => {
    if (!cart.length) {
      alert('السلة فارغة');
      return;
    }

    document.getElementById('checkoutMessage').innerHTML =
      '<div class="alert alert-success">تم تسجيل طلبك بنجاح.</div>';
    cart = [];
    saveCart();
    render();
  });
}

function setupContact() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    document.getElementById('contactMessage').innerHTML =
      '<div class="alert alert-success">تم إرسال رسالتك بنجاح.</div>';
    form.reset();
  });
}

updateCartCount();
showProducts();
showCart();
setupContact();
