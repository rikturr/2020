
var SM = 576;

$(document).ready(function() {

    AOS.init({
        once: true
    });

    // portfolio grid weirdness
    var activePort = {};
    if ($(this).width() > SM) {
        $('.port-button-1').attr('data-target', '#port-item-1');
        $('.port-button-2').attr('data-target', '#port-item-2');
        $('.port-button-3').attr('data-target', '#port-item-3');

        $('[class^="port-button"]').on('click', function(event) {
            // web, two column collapse
            event.stopPropagation();

            var target = '#' + $(this).attr('id').replace('-button', '') + '-mobile';
            var cls = $(this).attr('class').split(' ')[0];
            var which = cls[cls.length -1];

            if ($('#port-item-' + which).hasClass('show')) {
                $('.port-button-' + which + '.active').removeClass('active');
                if (activePort[which] === target) {
                    $('#port-item-' + which).collapse('hide');
                } else {
                    $('#port-item-' + which).hide().html($(target).html()).fadeIn('fast').show();
                    $(this).addClass('active');
                }
            } else {
                $(this).addClass('active');
                $('#port-item-' + which).html($(target).html());
                $('#port-item-' + which).collapse('show');
            }
            
            activePort[which] = target;
            
            $('.port-close').click(function () {
                $('.port-button-' + which + '.active').removeClass('active');
                $(this).parent().collapse('hide');
            });
        });
    } else {
        $('[class^="port-button"]').on('click', function(event) {
            // mobile, one column collapse independently
            $(this).toggleClass('active');
        });
    }


    $('.port-close').click(function () {
        $(this).parent().collapse('hide');
    });
    // Navbar slideline

    // Active item
    function slideActiveNav(ai, sl) {
        if (ai) {
            sl.css({
                'width': ai.width(),
                'left': ai.position().left
            });
        } else {
            sl.width(0);
        }
    }

    // navbar
    var nav = $('#navbars-default'),
        slideLine = $('#slideline'),
        activeItem = ($(nav).find('a.active').length > 0) ? $(nav).find('a.active') : $(nav).find('a:first-child');
    
    slideActiveNav(activeItem, slideLine);
    $('.navbar a.nav-link').on('mouseover', function(event) {
        slideLine.css({
          'width': $(this).width(),
          'left': $(this).position().left
        });
    });
    $(nav).on('mouseleave', function(event) {
        slideActiveNav(activeItem, slideLine);
    });
    $('.navbar a.nav-link').on('click', function(event) {
        $('.navbar').find('a.active').removeClass('active');
        activeItem = $(this).addClass('active');
        slideLine.css({
            'width': $(this).width(),
            'left': $(this).position().left
        });
    });

    // skills pills
    var navSkills = $('#skills-tab'),
        slideLineSkills = $('#slideline-skills'),
        activeItemSkills = ($(navSkills).find('a.active').length > 0) ? $(navSkills).find('a.active') : $(navSkills).find('a:first-child');
    // activeItemSkills.addClass('active2');
    
    slideActiveNav(activeItemSkills, slideLineSkills);
    $('#skills-tab a.nav-link').on('mouseover', function(event) {
        slideLineSkills.css({
          'width': $(this).width(),
          'left': $(this).position().left
        });
    });
    $(navSkills).on('mouseleave', function(event) {
        slideActiveNav(activeItemSkills, slideLineSkills);
    });
    $('#skills-tab a.nav-link').on('click', function(event) {
        $('#skills-tab').find('a.active').removeClass('active');
        $('#skills-eng-tab').removeClass('active2');
        activeItemSkills = $(this);
        slideLineSkills.css({
            'width': $(this).width(),
            'left': $(this).position().left
        });
    });


    // Navbar sticky
    if ($('#navbar').length > 0 ) {
        addSticky()
        document.onscroll = function() {
            addSticky();
        };
        function addSticky() {
            var navbar = document.getElementById('navbar'),
            sticky = navbar.offsetTop;
            if ( (window.pageYOffset != sticky) && $(window).scrollTop() >= 200 ) {
                navbar.classList.add('sticky')
            } else {
                navbar.classList.remove('sticky');
            }
        }
    }

    // Navbar Mobile
    $('button.navbar-toggler').on('click', function(event) {
        $('body').toggleClass('hide-overflow');
        $(".burger").toggleClass("active");
    });
    $('.nav-item a').on('click', function(event) {
        if ($('.navbar-collapse.show').length > 0 ) {
            $( 'button.navbar-toggler' ).trigger( 'click' );
        }
    });

    $('body').scrollspy({
        target: '.active-spy',
        offset: 120
    }); 

    // Smoothscroll function
    function smoothScroll(smoothHash) {
        var navbarHeight = $('#navbar').height(),
        navbarCollapse = $('.navbar-collapse').height(),
        navbarBrand = $('.navbar-brand').height(),
        scrollHash = $(smoothHash).offset().top,
        scrollTo = 0;
        if ($('.navbar-collapse.show').length > 0 ) {
            scrollTo = scrollHash  - navbarHeight + navbarCollapse + navbarBrand;
        } else {
            scrollTo = scrollHash - navbarHeight;
        }
        $('body').removeClass('active-spy');
        $('html, body').animate({
            scrollTop: scrollTo
        }, 800, function(){
            window.location.smoothHash = smoothHash;
            $('body').addClass('active-spy');
        });
    };

    // Navbar BS Scrollspy
    if ($('#index, #index-video, #index-parallax, #index-slider, #index-rtl, #index-dark').length > 0 ) {
        $('.navbar a').each(function() {
            var hash = this.hash;
            this.href = hash;
        });
        // Slideline on scroll
        $(window).on('activate.bs.scrollspy', function () {
            activeItem = $('.navbar').find('a.active');
            slideLine.css({
                'width': activeItem.width(),
                'left': activeItem.position().left
            });
        })

        // Navbar smoothscroll
        $('.navbar a.nav-link').on('click', function(event) {
            if (this.hash !== '') {
                event.preventDefault();
                var smoothHash = this.hash;
                smoothScroll(smoothHash);
            }
        });
    }
    // Link smoothscroll
    $('.smoothscroll').on('click', function(event) {
        if ($(this).attr("href") !== '') {
            event.preventDefault();
            var smoothHash = $(this).attr("href");
            smoothScroll(smoothHash);
            if ($('.addscrollspy').length > 0 ) {
                $('.navbar').find('a.active').removeClass('active');
                activeItem = $('.navbar').find($('a[href="' + smoothHash + '"]')).addClass('active');
                slideLine.css({
                  'width': $(activeItem).width(),
                  'left': $(activeItem).position().left
                });
            };
        }
    });

});