$(document).ready(function () {
    const $swiperWrapper = $(".swiper-wrapper");
    const $addAuthorForm = $("#addAuthorForm");
    const $menuAddAuthor = $('.hamburger-menu');
    const $overlay = $('#overlay');
    const $menuOverlay = $('.menu-overlay');
    const $addAuthorButton = $('.add-author-button');
    const $closeButton = $('.close-button');

    let swiper;
    function initSwiper() {
        swiper = new Swiper(".swiper", {
            slidesPerView: 1,
            loop: true,
            observeParents: true,
            speed: 500,
            pagination: {
                el: ".swiper-pagination",
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }

    $addAuthorButton.on('click', function () {
        console.log('Button "Стать автором" clicked');
        $overlay.show();
    });

    $('.hamburger-menu').on('click', function(){
        if ($menuOverlay.hasClass('open')) {
            $menuOverlay.removeClass('open');
              $menuOverlay.css('display', 'none');
        } else {
           $menuOverlay.css('display', 'flex');
            $menuOverlay.addClass('open');
        }
    })

    $closeButton.on('click', function () {
        $overlay.hide();
    })

    $addAuthorForm.on('submit', function (e) {
        e.preventDefault();

        const formData = {
            name: $('input[name="name"]').val(),
            profession: $('input[name="designation"]').val(),
            history: $('input[name="history"]').val(),
        };
        $.ajax({
            url: '/api/users',
            type: 'POST',
            data: JSON.stringify(formData),
            contentType: "application/json; charset=utf-8",
            success: function () {
                loadData();
                $overlay.hide();
                $addAuthorForm.find('input').val('');
            },
            error: function (error) {
                console.error('Error add author:', error)
            }
        })
    })
    function loadData() {
        $.ajax({
            url: '/api/users',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $swiperWrapper.empty();
                if (data.length > 1) {
                    $.each(data, function (index, user) {
                        loadHistory(user, function (userWithHistory) {
                            const $slide = createSlide(userWithHistory);
                            $swiperWrapper.append($slide);
                        });
                    });
                    if (swiper) {
                        swiper.destroy(true, true);
                    }
                    initSwiper();
                    swiper.update();
                } else if (data.length === 1) {
                    $.each(data, function (index, user) {
                        loadHistory(user, function (userWithHistory) {
                            const $slide = createSlide(userWithHistory);
                            $swiperWrapper.append($slide);
                        });

                    });
                    if (swiper) {
                        swiper.destroy(true, true);
                    }
                    initSwiper();
                    swiper.loop = false;
                    swiper.update();
                } else {
                    if (swiper) {
                        swiper.destroy(true, true);
                    }
                }
            },
            error: function (error) {
                console.error("Error loading data:", error);
            }
        });
    }
    function loadHistory(user, callback) {
        $.ajax({
            url: '/api/histories',
            type: 'GET',
            dataType: 'json',
            success: function (histories) {
                user.histories = histories.filter(history => history.userId === user.id);
                callback(user);
            },
            error: function (error) {
                console.error("Error loading history:", error);
                callback(user);
            }
        });
    }
    function createSlide(user) {
        let historyHtml = '';
        if (user.histories && user.histories.length > 0) {
            user.histories.forEach(history => {
                historyHtml += `<p>${history.history}</p>`;
            })
        }
        return $(`
      <div class="swiper-slide">
        <div class="profile__card" data-user-id="${item.id}">
          <div class="profile__image">
              <img src="${item.image}" alt="${item.name}">
              <div class="profile__image-info">
                  <div class="profile__view-more">
                      <span class="profile__image-name">${item.name}</span>
                      <button class="trigger">
                          <i class="fa fa-arrow-right"></i>
                      </button>
                  </div>
                  <span class="profile__image-designation">${item.designation}</span>
              </div>
          </div>
          <div class="profile__info">
              <div class="profile__info-name">${item.name}</div>
              <div class="profile__info-designation">${item.designation}</div>
              <div class="profile__info-description">
                  ${item.text}
              </div>
              <hr>
              <div class="profile__info-counters">
                  <div class="profile__info-view-counter">
                      <i class="fa fa-eye"></i>
                      <span class="profile__info-views-count">${item.views}</span>
                  </div>
                  <div class="profile__info-like-counter">
                      <i class="fa fa-heart"></i>
                      <span class="profile__info-likes-count">${item.likes}</span>
                  </div>
              </div>
              <button class="back-btn trigger">Back</button>
          </div>
        </div>
      </div>
     `);
    }
    loadData();
    $(".profile__card")
        .toArray()
        .forEach(function (card) {
            $(card)
                .find(".trigger")
                .on("click", function () {
                    $(card).toggleClass("active");
                });
        });
    $('.hamburger').click(function () {
        $(this).toggleClass('open');
    });
});



