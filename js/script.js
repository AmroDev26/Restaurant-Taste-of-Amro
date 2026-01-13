// تهيئة المكتبات عند تحميل الصفحة
$(document).ready(function () {
    // تهيئة Toastr
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-left",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    // إظهار إشعار ترحيبي
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
        setTimeout(function () {
            toastr.info('مرحباً بكم في مطعم النخيل!', 'أهلاً وسهلاً');
        }, 1000);
    }

    // إضافة زر العودة للأعلى
    addBackToTopButton();
});

// وظيفة إظهار Toast
function showToast() {
    toastr.success('تم تنفيذ العملية بنجاح!', 'نجاح');
}

// التحقق من نموذج التسجيل
function validateRegister(event) {
    event.preventDefault();

    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phone = document.getElementById('phone').value;

    let isValid = true;

    // التحقق من صحة البريد الإلكتروني
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('emailError').style.display = 'none';
    }

    // التحقق من تطابق كلمات المرور
    if (password !== confirmPassword) {
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('passwordError').style.display = 'none';
    }

    // التحقق من رقم الهاتف
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        toastr.error('رقم الهاتف يجب أن يتكون من 10 أرقام', 'خطأ');
        isValid = false;
    }

    if (isValid) {
        toastr.success('تم إنشاء الحساب بنجاح!', 'مبروك');
        setTimeout(function () {
            window.location.href = 'login.html';
        }, 2000);
    }

    return false;
}

// التحقق من نموذج تسجيل الدخول
function validateLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // هنا يمكنك إضافة التحقق من قاعدة البيانات
    if (email && password) {
        toastr.success('تم تسجيل الدخول بنجاح!', 'مرحباً بعودتك');
        setTimeout(function () {
            window.location.href = 'index.html';
        }, 2000);
    } else {
        toastr.error('الرجاء ملء جميع الحقول', 'خطأ');
    }

    return false;
}

// إرسال نموذج الاتصال
function submitContactForm(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        toastr.success('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'شكراً لك');
        document.getElementById('contactForm').reset();
    } else {
        toastr.error('الرجاء ملء جميع الحقول المطلوبة', 'خطأ');
    }

    return false;
}

// تبديل عرض كلمة المرور
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.parentNode.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// إضافة زر العودة للأعلى
function addBackToTopButton() {
    const button = document.createElement('div');
    button.className = 'back-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.onclick = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    document.body.appendChild(button);

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            button.classList.add('show');
        } else {
            button.classList.remove('show');
        }
    });
}

// وظائف سلة التسوق
let cart = [];
let total = 0;

function addToCart(item, price) {
    // البحث إذا كان الصنف موجوداً مسبقاً
    const existingItem = cart.find(cartItem => cartItem.name === item);

    if (existingItem) {
        existingItem.quantity++;
        existingItem.total = existingItem.quantity * existingItem.price;
    } else {
        cart.push({
            name: item,
            price: price,
            quantity: 1,
            total: price
        });
    }

    updateCart();
    toastr.success('تم إضافة ' + item + ' إلى السلة');
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');

    if (!cartItems) return;

    cartItems.innerHTML = '';
    total = 0;

    cart.forEach((item, index) => {
        total += item.total;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>
                <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, -1)">-</button>
                <span class="mx-2">${item.quantity}</span>
                <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, 1)">+</button>
            </td>
            <td>${item.price} ريال</td>
            <td>${item.total} ريال</td>
            <td><button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">حذف</button></td>
        `;
        cartItems.appendChild(row);
    });

    if (totalPrice) {
        totalPrice.textContent = total + ' ريال';
    }
}

function updateQuantity(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    } else {
        cart[index].total = cart[index].quantity * cart[index].price;
    }

    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    toastr.info('تم حذف الصنف من السلة');
}

function checkout() {
    if (cart.length === 0) {
        toastr.error('السلة فارغة، أضف بعض الأصناف أولاً');
        return;
    }

    toastr.success(`تم إتمام الطلب بنجاح! الإجمالي: ${total} ريال`, 'شكراً لطلبك');
    cart = [];
    updateCart();
}

// المطالبة بالعرض
function claimOffer() {
    const email = document.getElementById('offerEmail').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(email)) {
        toastr.success('تم إرسال كود الخصم إلى بريدك الإلكتروني!', 'مبروك');
        $('#offerModal').modal('hide');
        document.getElementById('offerEmail').value = '';
    } else {
        toastr.error('الرجاء إدخال بريد إلكتروني صحيح', 'خطأ');
    }
}

// إضافة تأثيرات عند التمرير
window.addEventListener('scroll', function () {
    const elements = document.querySelectorAll('.fade-in-on-scroll');

    elements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (position < screenPosition) {
            element.classList.add('animated', 'fadeInUp');
        }
    });
});

// تهيئة جميع عناصر الـ Modal
document.addEventListener('DOMContentLoaded', function () {
    var modals = document.querySelectorAll('.modal');
    modals.forEach(function (modal) {
        modal.addEventListener('show.bs.modal', function () {
            console.log('Modal is opening');
        });
    });
});