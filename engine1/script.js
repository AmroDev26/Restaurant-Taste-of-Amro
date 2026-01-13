document.addEventListener("DOMContentLoaded", function () {
    // WowSlider Simulation Logic
    var slides = document.querySelectorAll(".ws_images ul li");
    var bullets = document.querySelectorAll(".ws_bullets a");
    var current = 0;

    function showSlide(n) {
        // إخفاء الكل
        slides.forEach(s => s.classList.remove("ws_active"));
        bullets.forEach(b => b.classList.remove("ws_sel_bull"));

        // حساب الشريحة الجديدة
        current = (n + slides.length) % slides.length;

        // إظهار الجديد
        slides[current].classList.add("ws_active");
        bullets[current].classList.add("ws_sel_bull");
    }

    // تشغيل تلقائي كل 3 ثواني
    setInterval(() => showSlide(current + 1), 3000);

    // النقر على النقاط
    bullets.forEach((b, i) => b.addEventListener("click", (e) => {
        e.preventDefault();
        showSlide(i);
    }));
});

// وظيفة بسيطة لإظهار رسالة عند الطلب
function addToCart(item) {
    alert("تمت إضافة (" + item + ") إلى السلة بنجاح!");
}