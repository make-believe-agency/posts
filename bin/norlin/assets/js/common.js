$(document).ready(function () {
  'use strict';

  var menuOpenIcon = $(".nav__icon-menu"),
    menuCloseIcon = $(".nav__icon-close"),
    menuList = $(".menu-overlay"),
    searchOpenIcon = $(".nav__icon-search"),
    searchCloseIcon = $(".search__close"),
    searchInput = $(".search__text"),
    searchBox = $(".search");


  /* =======================
  // Menu and Search
  ======================= */
  menuOpenIcon.click(function() {
    menuOpen();
  })

  menuCloseIcon.click(function () {
    menuClose();
  })

  searchOpenIcon.click(function () {
    searchOpen();
  });

  searchCloseIcon.click(function () {
    searchClose();
  });

  function menuOpen() {
    menuList.addClass("is-open");
  }

  function menuClose() {
    menuList.removeClass("is-open");
  }

  function searchOpen() {
    searchBox.addClass("is-visible");
  }

  function searchOpen() {
    searchBox.addClass("is-visible");
    setTimeout(function () {
      searchInput.focus();
    }, 300);
  }

  function searchClose() {
    searchBox.removeClass("is-visible");
  }

  $('.search, .search__box').on('click keyup', function (event) {
    if (event.target == this || event.keyCode == 27) {
      $('.search').removeClass('is-visible');
    }
  });


  /* =======================
  // Animation Load Page
  ======================= */
  setTimeout(function () {
    $('body').addClass('is-in');
  }, 150)


  // =====================
  // Gallery Settings
  // =====================
  $('.kg-gallery-image > img').each( function() {
    var _this = $(this),
      $container = _this.closest('.kg-gallery-image'),
      width = _this.attr('width'),
      height = _this.attr('height'),
      ratio = width / height;
    $container.css({'flex' : ratio + ' 1 0%' });
  });


  /* =======================
  // Search
  ======================= */
  var searchField = $('#js-search-input').ghostHunter({
    results: '#js-search-results',
    onKeyUp: true,
    onPageLoad: true,
    includepages: true,
    displaySearchInfo: false,
    result_template:
      '<div id="{{ref}}" class="search-results__item gh-search-item animate"><a class="search-results__image" href="{{link}}"><img src="{{featureImage}}" alt="{{title}}"></a><a class="search-results__link" href="{{link}}"><span class="search-results-date">{{pubDate}}</span><div class="result-title">{{title}}</div></a></div>'
  });


  /* =======================
  // LazyLoad Images
  ======================= */
  var lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazy'
  })


  // =====================
  // Ajax Load More
  // =====================
  var $load_posts_button = $('.load-more-posts'),
  pagination_next_url = $('link[rel=next]').attr('href');

  $load_posts_button.click(function (e) {
    e.preventDefault();
    var loadMore = $('.load-more-section');
    var request_next_link = pagination_next_url.split('/page')[0] + '/page/' + pagination_next_page_number + '/';

    $.ajax({
      url: request_next_link,
      beforeSend: function () {
        $load_posts_button.text('Loading...');
      }
    }).done(function (data) {
      var posts = $('.grid__post', data);
      $('.grid').append(posts);

      var lazyLoadInstance = new LazyLoad({
        elements_selector: '.lazy'
      })

      $load_posts_button.text('Load more');
      pagination_next_page_number++;

      if (pagination_next_page_number > pagination_available_pages_number) {
        loadMore.addClass('hide');
      }
    });
  });


  /* =======================
  // Responsive Videos
  ======================= */
  $(".post__content, .page__content").fitVids({
    customSelector: ['iframe[src*="ted.com"]', 'iframe[src*="player.twitch.tv"]', 'iframe[src*="facebook.com"]']
  });


  /* =======================
  // Zoom Image
  ======================= */
  $(".page img, .post img").attr("data-action", "zoom");
  $(".page a img, .post a img").removeAttr("data-action", "zoom");


  /* =======================
  // Scroll Top Button
  ======================= */
  $(".top").click(function () {
    $("html, body").stop().animate({ scrollTop: 0 }, "slow", "swing");
  });
  $(window).scroll(function () {
    if ($(this).scrollTop() > $(window).height()) {
      $(".top").addClass("is-active");
    } else {
      $(".top").removeClass("is-active");
    }
  });

});