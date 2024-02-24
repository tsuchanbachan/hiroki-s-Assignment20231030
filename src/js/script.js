
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

  /* ハンバーガーボタン */
  $(".js-hamburger").click(function () {
    if ($(".js-hamburger").hasClass('is-active')) {
      $('.js-hamburger').removeClass('is-active');
      $(".js-sp-nav").fadeOut(300);
      /* これがないと、通常表示の時に戻らない */
      $('body').toggleClass('noscroll');
    } else {
      $('.js-hamburger').addClass('is-active');
      $(".js-sp-nav").fadeIn(300);
      /* ハンバーガーメニュー表示時にはスクロール不可*/
      $('body').toggleClass('noscroll');
    }
  });

  /* 要素の取得とスピードの設定 */
  var box = $('.colorbox'),
    speed = 700;

  /* =============
  swiper（メインビュー）
  ============= */
  var swiper = new Swiper(".js-mv__swiper", {
    loop: true,
    speed: 2000,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: ".js-mv__pagination",
    },
  });

  /* =============
  swiper（campaign）
  ============= */
  var swiper = new Swiper(".js-campaign__swiper", {
    slidesPerView: "auto",
    spaceBetween: 24,
    loop: true,
    breakpoints: {
      768: {
        spaceBetween: 40,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    },
  });

  /* =============
  ブログページのサイドバー、アーカイブの開閉
  ============= */
  $('.archive__link').click(function () {
    $(this).toggleClass('is-open');
    $(this).next('.archive__months').toggleClass('is-open');
  });
});

/* =============
トップへ戻るボタン（スクロールで出現）
============= */
$(function () {
  const pagetop = $("#js-pagetop");
  pagetop.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      pagetop.fadeIn();
    } else {
      pagetop.fadeOut();
    }
  });
  pagetop.click(function () {
    $("body,html").animate({
      scrollTop: 0,
    }, 800);
    return false;
  });

  /* =====================
  画像背景色のアニメーション
  ====================== */
  /* 要素の取得とスピードの設定 */
  var box = $('.colorbox'),
    speed = 700;

  /* .colorboxの付いた全ての要素に対して下記の処理 */
  box.each(function () {
    $(this).append('<div class="color"></div>')
    var color = $(this).find($('.color')),
      image = $(this).find('img');
    var counter = 0;

    image.css('opacity', '0');
    color.css('width', '0%');
    /* inviewを使って背景色が画面に現れたら処理実行 */
    color.on('inview', function () {
      if (counter == 0) {
        $(this).delay(200).animate({ 'width': '100%' }, speed, function () {
          image.css('opacity', '1');
          $(this).css({ 'left': '0', 'right': 'auto' });
          $(this).animate({ 'width': '0%' }, speed);
        })
        counter = 1;
      }
    });
  });

  /* ================
  モーダル
  ================ */
  $(function () {
    $(".js-modal-open").on("click", function () {
      var imgSrc = $(this).children().attr('src');
      $('.modal__content').children().attr('src', imgSrc);
      $(".js-modal").fadeIn();
      return false;
    });
    $(".js-modal-close").on("click", function () {
      $(".js-modal").fadeOut();
      return false;
    });
  });
  /* モーダルウィンドウオープン時の背景固定 */
  $(function () {
    let scrollPosition;
    $(".js-modal-open").on("click", function () {
      scrollPosition = $(window).scrollTop();
      $("body").addClass("fixed").css({ top: -scrollPosition });
    });
    $(".js-modal-close").on("click", function () {
      $("body").removeClass("fixed").css({ top: 0 });
      window.scrollTo(0, scrollPosition);
    });
  });
});

/* ================
トップへ戻るボタン（フッター手前で止まるボタン）
================ */
$(document).ready(function () {
  $("#js-pagetop").hide();
  $(window).on("scroll", function () {
    var scrollHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
    var footHeight = $("footer").innerHeight();
    /* ドキュメントの高さと現在の位置の差がフッターの高さ以下のとき */
    if (scrollHeight - scrollPosition <= footHeight) {
      $("#js-pagetop").css({ 
        position: "absolute",
        bottom: footHeight + 16 ,
        breakpoints: {
          // 768px以上
          768: {
            bottom: footHeight + 30,
          },
        },
      });
    } else {
      $("#js-pagetop").css({ 
        position: "fixed",
        bottom: "20px" 
      });
    }
  });
});

/* アコーディオン */
document.querySelectorAll('.js-accordion-btn').forEach(function (el) {
  const next = el.nextElementSibling
  const nextDistance = next.getBoundingClientRect().height // next要素までの距離
  const nextH = nextDistance + 'px'
  next.style.overflow = 'hidden'
  next.style.transition = '0.5s'
  next.style.height = 0
  el.onclick = () => next.style.height = el.classList.toggle('open') ? nextH : 0
  console.log(next.scrollHeight);
})