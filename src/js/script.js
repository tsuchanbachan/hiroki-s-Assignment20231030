
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
      /* codepen:https://codepen.io/tsuchanbachan/pen/NWMwzYE */
      $('body').toggleClass('noscroll');
    }
  });


  /* 要素の取得とスピードの設定 */
  var box = $('.colorbox'),
    speed = 700;

  
  /* =============
  swiper（メインビュー）
  ============= */
  //「mySwiper」を「js-mv__swiper」へ
  var swiper = new Swiper(".js-mv__swiper", {
    loop: true,
    /* 自動再生 */
    /* 少しゆっくり(デフォルトは300) */
    speed: 2000,
    autoplay: {
      /* 1.5秒後に次のスライド */
      delay: 1500,
      /* 矢印をクリックしても自動再生を止めない */
      disableOnInteraction: false,
    },

    /* フェードモード（デフォルトは 'slide'） */
    effect: 'fade',
    fadeEffect: {
      /* クロスフェードを有効にする（フェードモードの場合 true 推奨） */
      crossFade: true,
    },

    pagination: {
      //「swiper-pagination」を「js-mv-pagination」へ
      el: ".js-mv__pagination",
    },
  });


  /* =============
  swiper（campaign）
  ============= */
  //「mySwiper」を「js-campaign__swiper」へ
  var swiper = new Swiper(".js-campaign__swiper", {
    /* 表示枚数（今回は「slidesPerVies」ではなく「.swiper-slide」で幅高を指定。 */
    slidesPerView: "auto",
    /* 左右余白 */
    spaceBetween: 24,

    /* centeredSlidesを設定しないと中央寄せではなく右にはみ出した画像になる byじゅんぺい */

    /* ループ有効 */
    loop: true,

    breakpoints: {
      // 768px以上
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
トップへ戻るボタン（スクロールで出現、フッター上で止まる）
============= */
/* スクロールで出現 */
$(function () {
  const pagetop = $("#js-pagetop");
  /* 最初はボタンを非表示 */
  pagetop.hide();
  $(window).scroll(function () {
    /* 100px以上スクロールしたら */
    if ($(this).scrollTop() > 100) {
      /* ボタンをフェードイン */
      pagetop.fadeIn();
    } else {
      /* ボタンをフェードアウト */
      pagetop.fadeOut();
    }
  });
  pagetop.click(function () {
    $("body,html").animate({
      /* 上から0pxの位置に戻る */
      scrollTop: 0,
      /* 800ミリ秒かけて上に戻る */
    }, 800);
    return false;
  });

  /* =====================
  画像背景色のアニメーション
  ====================== */
  /* 要素の取得とスピードの設定 */
  var box = $('.colorbox'),
    speed = 700;

  /* .colorboxの付いた全ての要素に対して下記の処理を行う */
  box.each(function () {
    $(this).append('<div class="color"></div>')
    var color = $(this).find($('.color')),
      image = $(this).find('img');
    var counter = 0;

    image.css('opacity', '0');
    color.css('width', '0%');
    /* inviewを使って背景色が画面に現れたら処理をする */
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
  /* モーダルウィンドウ */
  /* 「.js-modal-open」ボタンをクリックで.js-modalが表示、
  「.js-modal-close」クリックで非表示 */
  $(function () {

    /* 「js-modal-open」をクリックした時 */
    $(".js-modal-open").on("click", function () {

      /* クリックした画像のsrc属性をimgSrcの変数位に設定 */
      // クリックしたリンクの子要素である画像のsrc属性を取得
      var imgSrc = $(this).children().attr('src');
      // modal__content内の子要素（img）のsrc属性を、imgSrcに書き換える（＝モーダル内で拡大画像として表示される）
      $('.modal__content').children().attr('src', imgSrc);

      /* モーダルを表示させる */
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
    /* ドキュメントの高さ */
    var scrollHeight = $(document).height();
    /* 現在の位置 */
    var scrollPosition = $(window).height() + $(window).scrollTop();
    /* フッターの高さ */
    var footHeight = $("footer").innerHeight();

    /* ドキュメントの高さと現在の位置の差がフッターの高さ以下のとき */
    if (scrollHeight - scrollPosition <= footHeight) {
      $("#js-pagetop").css({ 
        /* positionをabsoluteに変更 */
        position: "absolute",
        /* ピクパ20→16 */
        bottom: footHeight + 16 ,

        
        breakpoints: {
              // 768px以上
              768: {
                bottom: footHeight + 30,
              },
        },




      });
    /* それ以外の場合は */
    } else { //
      $("#js-pagetop").css({ 
        /* 固定で表示 */
        position: "fixed",
        /* ピクパ20→16 */
        bottom: "20px" 
      });
    }
  });
});


/* アコーディオン */
document.querySelectorAll('.js-accordion-btn').forEach(function (el) {
  const next = el.nextElementSibling
  const nextDistance = next.getBoundingClientRect().height // next要素までの距離
  // const nextH = next.scrollHeight + 'px'
  // const nextH = next.scrollHeight + nextDistance + 'px'
  const nextH = nextDistance + 'px'
  next.style.overflow = 'hidden'
  next.style.transition = '0.5s'
  next.style.height = 0
  el.onclick = () => next.style.height = el.classList.toggle('open') ? nextH : 0
  console.log(next.scrollHeight);
})
