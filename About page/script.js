// ربط العداد الجانبي بالسكاشن
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.section');
  const counterItems = document.querySelectorAll('.side-counter .counter-item');
  function updateCounter() {
    let activeIndex = 0;
    sections.forEach((section, idx) => {
      if (section.classList.contains('active')) {
        activeIndex = idx;
      }
    });
    counterItems.forEach((item, idx) => {
      if (idx === activeIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
  // إذا كان لديك كود يغير السكشن النشط، استدعي updateCounter() بعد تغييره
  // مثال: عند تغيير السكشن عبر زر أو سكرول
  setInterval(updateCounter, 300); // تحديث تلقائي كل 0.3 ثانية
});
const sections = document.querySelectorAll(".section");
let currentIndex = 0;
let isAnimating = false;

// إظهار أول سكشن بشكل مخفي ثم تطبيق الأنميشن بعد تحميل الصفحة
const firstSection = sections[0];
const firstImage = firstSection.querySelector('.image');
const firstText = firstSection.querySelector('.text');

firstSection.style.opacity = "1";
firstSection.classList.add("active");
firstImage.style.transition = "none";
firstText.style.transition = "none";
firstImage.style.transform = `translateY(100%)`;
firstImage.style.opacity = "0";
firstText.style.transform = `translateX(-100%)`;
firstText.style.opacity = "0";

setTimeout(() => {
  animateSectionIn(firstSection, true);
}, 100);

function animateSectionIn(section, isFirst = false, direction = 1) {
  const image = section.querySelector(".image");
  const text = section.querySelector(".text");

  // الصور دائمًا تدخل من الأسفل عند التحميل الأول
  let imageFrom = isFirst ? "100%" : (direction === -1 ? "-100%" : "100%");
  let textFrom = section.dataset.index % 2 === 0 ? "-100%" : "100%";

  image.style.transition = "none";
  text.style.transition = "none";
  image.style.transform = `translateY(${imageFrom})`;
  image.style.opacity = "0";
  text.style.transform = `translateX(${textFrom})`;
  text.style.opacity = "0";

  setTimeout(() => {
    image.style.transition = "transform 1s, opacity 1s";
    image.style.transform = "translateY(0)";
    image.style.opacity = "1";

    text.style.transition = "transform 1s, opacity 1s";
    text.style.transform = "translateX(0)";
    text.style.opacity = "1";

    // أنميشن متسلسل للفقرات من الجانب
    const lines = text.querySelectorAll('.line');
    lines.forEach((line, i) => {
      line.style.transition = "none";
      line.style.opacity = "0";
      line.style.transform = `translateX(${textFrom})`;
      setTimeout(() => {
        line.style.transition = "opacity 0.9s cubic-bezier(0.77,0,0.175,1), transform 0.9s cubic-bezier(0.77,0,0.175,1)";
        line.style.opacity = "1";
        line.style.transform = "translateX(0)";
      }, 100 + i * 150);
    });
  }, 10);
}

function animateSectionOut(section, direction = 1) {
  const image = section.querySelector(".image");
  const text = section.querySelector(".text");

  // الصور تخرج لأعلى عند النزول، وتدخل من أعلى عند الصعود
  let imageTo = direction === 1 ? "-100%" : "100%";
  let textTo = section.dataset.index % 2 === 0 ? "-100%" : "100%";

  image.style.transition = "transform 1s, opacity 1s";
  image.style.transform = `translateY(${imageTo})`;
  image.style.opacity = "0";

  // لا تلمس text.transition أو text.transform هنا حتى لا تؤثر على الأسطر
  // أنميشن متسلسل لاختفاء الفقرات
  const lines = text.querySelectorAll('.line');
  lines.forEach((line) => {
    // تأكد أن كل سطر يبدأ من وضعه الطبيعي
    line.style.transition = "none";
    line.style.opacity = "1";
    line.style.transform = "translateX(0)";
  });
  lines.forEach((line, i) => {
    setTimeout(() => {
      line.style.transition = "opacity 0.7s, transform 0.7s";
      line.style.opacity = "0";
      line.style.transform = `translateX(${textTo})`;
    }, i * 180);
  });
}

function goToSection(index) {
  if (index < 0 || index >= sections.length || isAnimating || index === currentIndex) return;
  isAnimating = true;

  const currentSection = sections[currentIndex];
  const nextSection = sections[index];
  const direction = index > currentIndex ? 1 : -1;

  // مراقبة انتهاء اختفاء جميع الأسطر
  const text = currentSection.querySelector('.text');
  const lines = text ? text.querySelectorAll('.line') : [];
  let finishedCount = 0;
  function onLineTransitionEnd(e) {
    // فقط عند انتهاء opacity
    if (e.propertyName === 'opacity') {
      finishedCount++;
      if (finishedCount === lines.length) {
        lines.forEach(line => line.removeEventListener('transitionend', onLineTransitionEnd));
        currentSection.classList.remove("active");
        nextSection.classList.add("active");
        nextSection.style.opacity = "1";
        animateSectionIn(nextSection, false, direction);
        currentIndex = index;
        isAnimating = false;
      }
    }
  }
  if (lines.length > 0) {
    lines.forEach(line => line.addEventListener('transitionend', onLineTransitionEnd));
    animateSectionOut(currentSection, direction);
  } else {
    animateSectionOut(currentSection, direction);
    setTimeout(() => {
      currentSection.classList.remove("active");
      nextSection.classList.add("active");
      nextSection.style.opacity = "1";
      animateSectionIn(nextSection, false, direction);
      currentIndex = index;
      isAnimating = false;
    }, 1000);
  }
}

let lastWheelTime = 0;
const wheelDelay = 1200; // مدة منع استقبال wheel بعد كل انتقال (أكبر من مدة الأنميشن)

window.addEventListener("wheel", (e) => {
  const now = Date.now();
  if (isAnimating || now - lastWheelTime < wheelDelay) return;
  lastWheelTime = now;
  if (e.deltaY > 0) {
    goToSection(currentIndex + 1);
  } else {
    goToSection(currentIndex - 1);
  }
});


function loadNavbar() {
  fetch('../components/navbar.html') // عدل المسار حسب مكان navbar.html
    .then(res => res.text())
    .then(data => {
      const container = document.getElementById('navbar');
      container.innerHTML = data;

      // بعد ما النافبار يدخل، اربط ملفات CSS و JS الخاصة به
      const navbarCss = document.createElement('link');
      navbarCss.rel = 'stylesheet';
      navbarCss.href = '../components/navbar.css'; // عدل المسار حسب مكان ملف CSS
      document.head.appendChild(navbarCss);

      const navbarScript = document.createElement('script');
      navbarScript.src = '../components/navbar.js'; // عدل المسار حسب مكان ملف JS
      navbarScript.onload = function() {
        // إذا كان هناك دالة تهيئة في navbar.js مثل initNavbar()
        if (typeof initNavbar === 'function') {
          initNavbar();
        }
      };
      document.body.appendChild(navbarScript);
    });
}

document.addEventListener('DOMContentLoaded', loadNavbar);

// تحديث السنة تلقائيًا
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

// Lightbox functionality من صفحة Runway
document.addEventListener('DOMContentLoaded', function() {
  const galleryItems = document.querySelectorAll('.zoom-wrapper');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const imageCounter = document.getElementById('imageCounter');
  const closeBtn = document.getElementById('closeLightbox');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const playBtn = document.getElementById('playButton');
  const playIcon = document.getElementById('playIcon');
  
  const svgPlay = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
  <path d="M8 5v14l11-7z"/>
</svg>`;

const svgPause = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
</svg>`;

const svgReplay = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
  <path d="M12 5V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6a6.005 6.005 0 0 1-5.66-4H4.08a8.003 8.003 0 0 0 7.92 6c4.42 0 8-3.58 8-8s-3.58-8-8-8z"/>
</svg>`;

  let currentIndex = 0;
  let intervalId = null;
  let isPlaying = false;

  const showImage = (index) => {
    const total = galleryItems.length;
    if (index < 0 || index >= total) return;

    const imgSrc = galleryItems[index].querySelector('img').src;
    lightboxImg.src = imgSrc;
    currentIndex = index;
    imageCounter.textContent = `${index + 1} / ${total}`;

    prevBtn.style.display = index === 0 ? 'none' : 'block';
    nextBtn.style.display = index === total - 1 ? 'none' : 'block';
  };

  // ربط الضغط على الصور والزر
  galleryItems.forEach((wrapper, index) => {
    wrapper.addEventListener('click', () => {
      lightbox.classList.add('show');
      showImage(index);
      document.body.style.overflow = 'hidden';
    });
  });

  // ربط الضغط على أزرار lookbook
  document.querySelectorAll('.lookbook-trigger').forEach((trigger, index) => {
    trigger.addEventListener('click', () => {
      lightbox.classList.add('show');
      showImage(0); // يبدأ من أول صورة
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('show');
    stopSlideshow();
    document.body.style.overflow = '';
  });

  prevBtn.addEventListener('click', () => {
    showImage(currentIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    showImage(currentIndex + 1);
  });

  playBtn.addEventListener('click', () => {
    if (playIcon.innerHTML.includes('Replay') || playIcon.innerHTML.includes('path d=\"M12 5V1')) {
      currentIndex = 0;
      showImage(currentIndex);
      startSlideshow();
    } else if (isPlaying) {
      stopSlideshow();
    } else {
      startSlideshow();
    }
  });

  const startSlideshow = () => {
    isPlaying = true;
    playIcon.innerHTML = svgPause;
    intervalId = setInterval(() => {
      if (currentIndex < galleryItems.length - 1) {
        showImage(currentIndex + 1);
      } else {
        stopSlideshow();
        playIcon.innerHTML = svgReplay;
      }
    }, 2000);
  };

  const stopSlideshow = () => {
    isPlaying = false;
    playIcon.innerHTML = svgPlay;
    clearInterval(intervalId);
  };

  // التحكم بالكيبورد - إزالة Escape
  document.addEventListener('keydown', function(e) {
    if (lightbox.classList.contains('show')) {
      if (e.key === 'ArrowRight') showImage(currentIndex + 1);
      if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    }
  });
});