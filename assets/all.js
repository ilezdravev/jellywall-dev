function headerSticky() {
    var html_height = jQuery(document).height(),
        window_height = jQuery(window).height() * 1.5,
        current = jQuery(window).scrollTop(),
        container = jQuery('#offCanvasWrapper'),
        i = jQuery('#header'),
        //point = i.height(),
        point = 0;
    container.css('padding-top', i.height());
    if(html_height > window_height){
        if (i.length) {
            if (current > point) {
                i.addClass('sticky').delay(500).queue(function(next) {
                    i.addClass('delay');
                    next();
                });
            }else{
                i.removeClass('sticky delay');
            }
        }
    }
}
// jQuery(window).on('scroll', headerSticky);
// jQuery(document).on('ready', headerSticky);

jQuery(document).ready(function () {
    jQuery('#shopify-section-navigation .toggle.heading').click(function () {
        let body = $(this).parent();
        if (body.hasClass("active-mob")) {
            body.removeClass("active-mob")
        } else {
            $('#shopify-section-navigation .nav-primary li.level0.active-mob').each(function() {
                $(this).removeClass("active-mob");
            });
            body.addClass("active-mob")
        }
    });
    jQuery('.toggle-sidebar-menu').click(function(e) {
        e.preventDefault();
        jQuery(this).toggleClass('active').next().slideToggle(200);
    });

    jQuery('.button-play').click(function() {
        var video_id = jQuery(this).parent().find('.video-iframe').data('video-id');
        jQuery(this).parent().addClass('playing').find('.video-iframe').html('<iframe src="//www.youtube.com/embed/' + video_id + '?autoplay=1" frameborder="0" allowfullscreen></iframe>');
    });

    jQuery('.select-dropdown-toggle').click(function(e) {
        e.preventDefault();
        jQuery(this).next().toggleClass('active');
    });

    jQuery('.faqs dt').on('click', function(e){
        e.preventDefault();
        jQuery(this).toggleClass('active').next().slideToggle();
    });

    jQuery('.photo-zoom').featherlight({
        namespace: 'product-photos-zoom',
        targetAttr: 'href',
        closeIcon: '<span class="icon"><i class="bx bx-x close"></i></span>',
        type: 'ajax',
        afterContent: function(e) {
            var index = parseInt(this.$currentTarget.data('index'));
            if (jQuery('#product-photos-zoom .owl-carousel').length) {
                jQuery('#product-photos-zoom .owl-carousel').owlCarousel({
                    animateOut: 'fadeOut',
                    loop: false,
                    items: 1,
                    autoplayHoverPause: true,
                    stopOnHover: true,
                    margin: 0,
                    mouseDrag: false,
                    startPosition: index,
                    nav: true,
                    dots: false,
                    navText: ['<span class="icon"><i class="bx bx-chevron-left"></i></span>', '<span class="icon"><i class="bx bx-chevron-right"></i></span>']
                });
            }
            var winHeight = $(window).height();
            var $item = $('.product-photos-zoom .photos-zoom-container .item');
            // $('.product-photos-zoom-content .image').mousemove(function(event) {
            //     var a = ($(this).find('img').height() - winHeight) / winHeight;
            //     $(this).css({'background-position-y': -(event.offsetY*a)+'px'});
            // });
        }
    });

    jQuery('#cartDropDown .closeToggle').on('click', function() {
        if (jQuery('html').hasClass('offCanvasAddToBag')) {
            jQuery('html').removeClass('offCanvas');
            jQuery('html').removeClass('offCanvasBasket');
            jQuery('html').removeClass('offCanvasAddToBag');
        }
    });

    jQuery('#size-guide-button').on('click', function() {
        jQuery('#size-guide').css('visibility','visible');
        jQuery('#size-guide').css('opacity',1);
    });

    jQuery('#size-guide .close').on('click', function() {
        jQuery('#size-guide').css('visibility','hidden');
        jQuery('#size-guide').css('opacity',0);
    });
});

jQuery(document).ready(function() {
    if (jQuery('.product-photos .owl-carousel').length) {
        jQuery('.product-photos .owl-carousel').owlCarousel({
            animateOut : 'fadeOut',
            stopOnHover : true,
            margin: 0,
            nav: true,
            navText: ['<span class="icon"><i class="bx bx-chevron-left"></i></span>', '<span class="icon"><i class="bx bx-chevron-right"></i></span>'],
            responsive: {
                0: {
                    loop: true,
                    dots: true,
                    items : 1
                },
                768: {
                    mouseDrag: false,
                    dots: false,
                    items : 2
                }
            }
        });
    }
    if (jQuery('.product-grid.owl-carousel').length) {
        jQuery('.product-grid.owl-carousel').owlCarousel({
            loop: true,
            autoplay: false,
            margin: 20,
            nav: false,
            dots: true,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                768: {
                    items: 4
                }
            },
            onInitialized: function(e){
                JunoQuickAdd.init();
            }
        });
    }
    if (jQuery('.blog-featured .articles.owl-carousel').length) {
        jQuery('.blog-featured .articles.owl-carousel').owlCarousel({
            loop: true,
            autoplay: false,
            margin: 20,
            nav: false,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                }
            }
        });
    }
});

var juno = {};

var cutsTheMustard = false;
if ('querySelector' in document && 'localStorage' in window && 'addEventListener' in window) {
    cutsTheMustard = true;
    document.documentElement.className = "js";
}

function addClass(whichElement, className) {
    if (whichElement.classList) {
        whichElement.classList.add(className);
    } else {
        whichElement.className += ' ' + className;
    }
}

function removeClass(el, className) {
    if (el.classList) {
        el.classList.remove(className);
    } else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
}

function hasParent(element, id) {
    if (element) {
        do {
            if (element.id === id) {
                return true;
            }
            if (element.nodeType === 9) {
                // root node
                break;
            }
        }
        while ((element = element.parentNode));
    }
    return false;
}

function array_diff(a1, a2) {
    var a = [], diff = [];
    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }
    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }
    for (var k in a) {
        diff.push(k);
    }
    return diff;
}

function is_touch_device() {
    return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}
jQuery(document).ready(function() {
    if(jQuery(window).width() > 991) {
        jQuery('.nav-primary li.level0').hover(function() {
            jQuery(this).addClass('active').parent().addClass('hover');
            if(jQuery(this).hasClass('parent')){
                jQuery(this).find('.nav-drop').addClass('is-open');
            }
        }, function() {
            jQuery(this).removeClass('active').parent().removeClass('hover');
            if(jQuery(this).hasClass('parent')){
                jQuery(this).find('.nav-drop').removeClass('is-open');
            }
        });

        jQuery('.nav-functions li').hover(function() {
            jQuery(this).addClass('active').parent().addClass('hover');
        }, function() {
            jQuery(this).removeClass('active').parent().removeClass('hover');
        });

        jQuery('.nav-primary .toggle').click(function(e) {
            $nav = jQuery(this).parents('.nav').eq(0);
            $parent = jQuery(this).parents('.parent').eq(0);
            if($nav.hasClass('is-open')){
                $nav.removeClass('is-open');
                $parent.removeClass('is-open');
                removeClass(document.documentElement, 'offCanvasNavSubMenu');
            }else{
                $nav.addClass('is-open');
                $parent.addClass('is-open');
                addClass(document.documentElement, 'offCanvasNavSubMenu');
            }
        });

        jQuery('.nav-additional h6').click(function(e) {
            jQuery(this).toggleClass('active').next().slideToggle();
        });
    }
});

if (cutsTheMustard) {
    juno.navIsRevealed = false;
    juno.cartIsRevealed = false;
    juno.searchIsRevealed = false;
    juno.userIsRevealed = false;
    juno.filterIsRevealed = false;
    juno.wishListIsRevealed = false;
    // toggle with the menu button:

    var navToggle = document.getElementById('navToggle');
    if(navToggle){
        navToggle.addEventListener('click', function(e) {
            juno.checkToggleNavigation();
            if (e) {
                e.preventDefault();
            }
        }, false);
        juno.checkToggleNavigation = function() {
            if (juno.navIsRevealed) {
                removeClass(navToggle, 'active');
                removeClass(document.documentElement, 'offCanvasNav');
                juno.navIsRevealed = false;
            } else {
                addClass(navToggle, 'active');
                addClass(document.documentElement, 'offCanvasNav');
                juno.navIsRevealed = true;
            }
        };
    }

    var cartToggle = document.getElementById('cartToggle');
    if(cartToggle){
        cartToggle.addEventListener('click', function(e) {
            juno.checkToggleBasket();
            if (e) {
                e.preventDefault();
            }
        }, false);
        juno.checkToggleBasket = function() {
            if (juno.cartIsRevealed) {
                removeClass(cartToggle, 'active');
                removeClass(document.documentElement, 'offCanvas');
                removeClass(document.documentElement, 'offCanvasBasket');
                juno.cartIsRevealed = false;
            } else {
                addClass(cartToggle, 'active');
                addClass(document.documentElement, 'offCanvas');
                addClass(document.documentElement, 'offCanvasBasket');
                juno.cartIsRevealed = true;
            }
        };
    }

    var wishListToggle = document.getElementById('wishlistToggle');
    if(wishListToggle) {
        wishListToggle.addEventListener('click', function(e) {
            juno.checkToggleWishlist();
            if (e) {
                e.preventDefault();
            }
        }, false);
        juno.checkToggleWishlist = function() {
            if (juno.wishListIsRevealed) {
                removeClass(document.documentElement, 'offCanvasWishList');
                juno.wishListIsRevealed = false;
            } else {
                addClass(document.documentElement, 'offCanvasWishList');
                juno.wishListIsRevealed = true;
            }
        };
    }

    var searchToggle = document.getElementById('searchToggle');
    if(searchToggle){
        searchToggle.addEventListener('click', function(e) {
            juno.checkToggleSearch();
            if (e) {
                e.preventDefault();
            }
        }, false);
        juno.checkToggleSearch = function() {
            document.getElementsByClassName('boost-sd__search-widget-init-input')[0].click();
        };
    }

    var userToggle = document.getElementById('userToggle');
    if(userToggle){
        userToggle.addEventListener('click', function(e) {
            juno.checkToggleUser();
            if (e) {
                e.preventDefault();
            }
        }, false);
        juno.checkToggleUser = function() {
            if (juno.userIsRevealed) {
                removeClass(userToggle, 'active');
                removeClass(document.documentElement, 'offCanvas');
                removeClass(document.documentElement, 'offCanvasUser');
                juno.userIsRevealed = false;
            } else {
                addClass(userToggle, 'active');
                addClass(document.documentElement, 'offCanvas');
                addClass(document.documentElement, 'offCanvasUser');
                juno.userIsRevealed = true;
            }
        };
    }


    var filterToggle = document.getElementById('filterToggle');
    if(filterToggle){
        filterToggle.addEventListener('click', function(e) {
            juno.checkToggleFilter();
            if (e) {
                e.preventDefault();
            }
        }, false);
        juno.checkToggleFilter = function() {
            if (juno.filterIsRevealed) {
                removeClass(document.documentElement, 'offCanvasFilter');
                juno.filterIsRevealed = false;
            } else {
                addClass(document.documentElement, 'offCanvasFilter');
                juno.filterIsRevealed = true;
            }
        };
    }


    juno.checkCloseNavigation = function(e) {
        if (juno.navIsRevealed) {
            console.log('Its');
            console.log(e.target.classList);
            // check it's not the menu icon (or its children) itself as this will trigger independently (and would cause the event to be fired twice)
            if ((e.target.id != 'navToggle') && (!hasParent(e.target, 'navToggle')) && (e.target.id != 'shopify-section-navigation') && (!hasParent(e.target, 'shopify-section-navigation')) || (hasParent(e.target, 'closeToggleMenu'))) {
                // check the click isn't within the nav panel:
                if (!hasParent(e.target, 'navigation')) {
                    removeClass(document.documentElement, 'offCanvasNav');
                    juno.navIsRevealed = false;
                    e.preventDefault();
                }
            }
        }
    };
    juno.checkCloseWishlist = function(e) {
        // check the click isn't within the nav panel:
        if (!hasParent(e.target, 'wishlistOutput')) {
            removeClass(document.documentElement, 'offCanvasWishList');
            juno.wishListIsRevealed = false;
            //e.preventDefault();
        }
    };
    juno.checkCloseBasket = function(e) {
        if (juno.cartIsRevealed) {
            // check it's not the menu icon itself as this will trigger independently (and would cause the event to be fired twice)
            if ((e.target.id != 'cartToggle') && (!hasParent(e.target, 'cartToggle'))) {
                // check the click isn't within the nav panel:
                if (!hasParent(e.target, 'cartContainer')) {
                    removeClass(cartToggle, 'active');
                    removeClass(document.documentElement, 'offCanvas');
                    removeClass(document.documentElement, 'offCanvasBasket');
                    juno.cartIsRevealed = false;
                    e.preventDefault();
                }
            }
        }
    };
    juno.checkCloseSearch = function(e) {
        if (juno.searchIsRevealed) {
            // check it's not the menu icon itself as this will trigger independently (and would cause the event to be fired twice)
            if ((e.target.id != 'searchToggle') && (!hasParent(e.target, 'searchToggle'))) {
                // check the click isn't within the nav panel:
                if (!hasParent(e.target, 'searchContainer')) {
                    // hide navigation:
                    removeClass(searchToggle, 'active');
                    removeClass(document.documentElement, 'offCanvas');
                    removeClass(document.documentElement, 'offCanvasSearch');
                    juno.searchIsRevealed = false;
                    e.preventDefault();
                }
            }
        }
    };
    juno.checkCloseUser = function(e) {
        if (juno.userIsRevealed) {
            // check it's not the menu icon itself as this will trigger independently (and would cause the event to be fired twice)
            if ((e.target.id != 'userToggle') && (!hasParent(e.target, 'userToggle'))) {
                // check the click isn't within the nav panel:
                if (!hasParent(e.target, 'userContainer')) {
                    // hide navigation:
                    removeClass(userToggle, 'active');
                    removeClass(document.documentElement, 'offCanvas');
                    removeClass(document.documentElement, 'offCanvasUser');
                    juno.userIsRevealed = false;
                    e.preventDefault();
                }
            }
        }
    };
    juno.checkCloseFilter = function(e) {
        if (juno.filterIsRevealed) {
            // check it's not the menu icon itself as this will trigger independently (and would cause the event to be fired twice)
            if ((e.target.id != 'filterToggle') && (!hasParent(e.target, 'filterToggle'))) {
                // check the click isn't within the nav panel:
                if (!hasParent(e.target, 'filterContainer')) {
                    // hide navigation:
                    removeClass(document.documentElement, 'offCanvasFilter');
                    juno.filterIsRevealed = false;
                    e.preventDefault();
                }
            }
        }
    };
    // close by touching the visible part of the content:
    document.addEventListener('click', function(e) {
        juno.checkCloseNavigation(e);
        juno.checkCloseBasket(e);
        juno.checkCloseSearch(e);
        juno.checkCloseUser(e);
        juno.checkCloseFilter(e);
        if(wishListToggle) {
            juno.checkCloseWishlist(e);
        }
    }, {passive: false});
    // double up for mobile event:
    document.addEventListener('touchend', function(e) {
        juno.checkCloseNavigation(e);
        juno.checkCloseBasket(e);
        juno.checkCloseSearch(e);
        juno.checkCloseUser(e);
        juno.checkCloseFilter(e);
        if(wishListToggle) {
            juno.checkCloseWishlist(e);
        }
    }, {passive: false});

    juno.swipeLeft = function() {
        if (juno.navIsRevealed) {
            removeClass(document.documentElement, 'offCanvas');
            juno.navIsRevealed = false;
        }
        if (juno.filterIsRevealed) {
            removeClass(document.documentElement, 'offCanvasFilter');
            juno.filterIsRevealed = false;
        }
    };
    juno.swipeRight = function() {
        if (juno.cartIsRevealed) {
            removeClass(document.documentElement, 'offCanvasBasket');
            juno.cartIsRevealed = false;
        }
        if(wishListToggle) {
            removeClass(document.documentElement, 'offCanvasWishList');
            juno.wishListIsRevealed = false;
        }
    };
    // init touch:
    if ('ontouchstart' in document.documentElement) {
        document.body.addEventListener('touchstart', function(a) {
            startPointX = a.touches[0].pageX;
            startPointY = a.touches[0].pageY;
            isScrolling = '';
            deltaX = 0;
        }, false);
        document.body.addEventListener('touchmove', function(a) {
            if (a.touches.length > 1 || a.scale && a.scale !== 1) {
                return;
            }
            deltaX = a.touches[0].pageX - startPointX;
            if (isScrolling === '') {
                isScrolling = (isScrolling || Math.abs(deltaX) < Math.abs(a.touches[0].pageY - startPointY));
            }
            if (!isScrolling) {
                a.preventDefault();
            }
        }, false);
        document.body.addEventListener('touchend', function(a) {
            if (!isScrolling) {
                if ((Math.abs(deltaX)) > 100) {
                    if (deltaX < 0) {
                        juno.swipeLeft();
                    } else {
                        juno.swipeRight();
                    }
                }
            }
        }, false);
    }
}
var JunoQuickAdd = (function(module, $) {
    'use strict';

    // Public functions
    var init;

    // Private general variables
    var settings, variantID, firstOptionValue, secondOptionValue, thirdOptionValue, firstOptionPostion, secondOptionPostion, thirdOptionPostion;

    // Private plugin variables
    var $productItem, $productQuickAdd, $productOptions, $productOption, $selectOption, $selectOptionSize, $elementSelectOption, $firstOption, $secondOption, $thirdOption;

    // Private functions
    var addToCart, selectVariant, optionUnavailable, checkOptionOutOfStock, defaultColourSelected;

    init = function (options) {
        settings = {
            productItem        : '.product-item',
            productQuickAdd    : '.product-quick-add',
            productOptions     : '.product-options-select',
            selectOption       : '.select-option',
            firstOption        : '.first-option',
            secondOption       : '.second-option',
            thirdOption        : '.third-option'
        };

        $productItem         = $(settings.productItem);
        $productQuickAdd     = $productItem.find(settings.productQuickAdd);
        $productOptions      = $productQuickAdd.find(settings.productOptions);
        $selectOption        = $productQuickAdd.find(settings.selectOption);
        $elementSelectOption = $selectOption.find('li');

        //Select Variant
        defaultColourSelected();
        selectVariant();
        optionUnavailable();
    }

    // Has Colour Variant
    defaultColourSelected = function() {
        $productItem.each(function(){
            $productItem     = $(this);
            $productQuickAdd = $productItem.find(settings.productQuickAdd);
            $productOptions  = $productItem.find(settings.productOptions);
            $firstOption     = $productItem.find(settings.firstOption);
            $secondOption    = $productItem.find(settings.secondOption);
            $thirdOption     = $productItem.find(settings.thirdOption);
            if($firstOption.hasClass('colour-option')){
                $firstOption.find('li').not('.out-of-stock').eq(0).addClass('selected');
            }else{
                return;
            }
        });
    }

    selectVariant = function() {
        $elementSelectOption.on('click', function(e){
            e.preventDefault();

            var $this = $(this), $thisValue, $thisSelectOption, $thisOptionPosition, $thisOptionIndex, $option, $optionValue;

            if($this.hasClass('selected') || $this.hasClass('out-of-stock') || $this.hasClass('unavailable')){
                return;
            }

            $productItem        = $this.parents(settings.productItem).eq(0);
            $productQuickAdd    = $productItem.find(settings.productQuickAdd);
            $productOptions     = $productItem.find(settings.productOptions);
            $selectOption       = $productItem.find(settings.selectOption);
            $selectOptionSize   = $productOptions.data('size');
            $firstOption        = $productQuickAdd.find(settings.firstOption);
            $secondOption       = $productQuickAdd.find(settings.secondOption);
            $thirdOption        = $productQuickAdd.find(settings.thirdOption);

            $thisValue          = $this.data('value');
            $thisSelectOption   = $this.parents(settings.selectOption).eq(0);
            $thisOptionPosition = $thisSelectOption.data('option');
            $thisOptionIndex    = $thisSelectOption.data('index');

            if($thisSelectOption.hasClass('colour-option')){
                $this.addClass('selected');
                $thisSelectOption.find('li').not($this).removeClass('selected');
            }else{
                firstOptionValue = $firstOption.find('li.selected').data('value');
                firstOptionPostion = $firstOption.data('option');
                switch($thisOptionIndex) {
                    case 1:
                        firstOptionValue = $thisValue;
                        firstOptionPostion = $thisOptionPosition;
                        break;
                    case 2:
                        secondOptionValue = $thisValue;
                        secondOptionPostion = $thisOptionPosition;
                        break;
                    case 3:
                        thirdOptionValue = $thisValue;
                        thirdOptionPostion = $thisOptionPosition;
                        break;
                }
                if($selectOptionSize == $thisOptionIndex){
                    switch($selectOptionSize) {
                        case 1:
                            $productOption = $productOptions.find('option[data-'+ firstOptionPostion +'='+ firstOptionValue +']');
                            $option = $firstOption;
                            $optionValue = firstOptionValue;
                            variantID = $productOption.val();
                            break;
                        case 2:
                            $productOption = $productOptions.find('option[data-'+ firstOptionPostion +'='+ firstOptionValue +'][data-'+ secondOptionPostion +'='+ secondOptionValue +']');
                            $option = $secondOption;
                            $optionValue = secondOptionValue;
                            variantID = $productOption.val();
                            break;
                        case 3:
                            $productOption = $productOptions.find('option[data-'+ firstOptionPostion +'='+ firstOptionValue +'][data-'+ secondOptionPostion +'='+ secondOptionValue +'][data-'+ thirdOptionPostion +'='+ thirdOptionValue +']');
                            $option = $thirdOption;
                            $optionValue = thirdOptionValue;
                            variantID = $productOption.val();
                            break;
                    }
                    // Add to Cart
                    addToCart($productItem, variantID);
                }else{
                    //optionUnavailable($this, firstOptionValue, secondOptionValue, thirdOptionValue);
                    $this.addClass('selected');
                    $thisSelectOption.hide().next().show();
                }
            }

        });
    }

    optionUnavailable = function($this, firstOptionValue, secondOptionValue, thirdOptionValue) {
        var $firstOption, $secondOption, $thirdOption, $dataFirstOptionValue, $dataSecondOptionValue, $dataThirdOptionValue, $dataInventoryQuantity, $dataVariantID, $optionOutOfStock;

        if($this){
            $productItem         = $this.parents(settings.productItem).eq(0);
            $productQuickAdd     = $productItem.find(settings.productQuickAdd);
            $productOptions      = $productQuickAdd.find(settings.productOptions);
            $selectOption        = $productQuickAdd.find(settings.selectOption);
            $elementSelectOption = $selectOption.find('li');

            //First Option
            if($productQuickAdd.find(settings.firstOption).length > 0){
                $firstOption = $productQuickAdd.find(settings.firstOption);
                firstOptionPostion = $firstOption.data('option');
            }
            //Second Option
            if($productQuickAdd.find(settings.secondOption).length > 0){
                $secondOption = $productQuickAdd.find(settings.secondOption);
                secondOptionPostion = $secondOption.data('option');
            }
            //Third Option
            if($productQuickAdd.find(settings.thirdOption).length > 0){
                $thirdOption = $productQuickAdd.find(settings.thirdOption);
                thirdOptionPostion = $thirdOption.data('option');
            }

            //Out of Stock
            if($firstOption != undefined){
                if(firstOptionValue != null){
                    $elementSelectOption.removeClass('selected out-of-stock unavailable');
                    if($thirdOption == undefined){
                        // Two Options
                        if($secondOption != undefined){
                            var $secondOptionValues = [], $secondOptionAvailableValues = [], $secondOptionUnavailableValues = [];

                            $secondOption.find('li').removeClass('selected out-of-stock unavailable').each(function(){
                                $secondOptionValues.push($(this).data('value'));
                            });

                            $productOptions.find('option').each(function(){
                                $dataFirstOptionValue = $(this).data(firstOptionPostion);
                                $dataSecondOptionValue = $(this).data(secondOptionPostion);
                                $dataInventoryQuantity = parseInt($(this).data('inventory_quantity'));

                                if($dataFirstOptionValue == firstOptionValue){
                                    $secondOptionAvailableValues.push($dataSecondOptionValue);
                                    if($dataInventoryQuantity < 1){
                                        $optionOutOfStock = $dataSecondOptionValue;
                                        $secondOption.find('li').each(function() {
                                            if($(this).data('value') == $optionOutOfStock){
                                                $(this).addClass('out-of-stock');
                                            }
                                        });
                                    }
                                    //checkOptionOutOfStock($(this), $secondOption, $dataSecondOptionValue);
                                }
                            });

                            $secondOptionUnavailableValues = array_diff($secondOptionValues,$secondOptionAvailableValues);
                            if($secondOptionUnavailableValues.length > 0){
                                $secondOptionUnavailableValues.forEach(function(unavailableValue,index){
                                    $secondOption.find('li').each(function() {
                                        if($(this).data('value') == unavailableValue){
                                            $(this).addClass('unavailable');
                                        }
                                    });
                                });
                            }
                        }
                    }else{
                        // Three Options
                        var $thirdOptionValues = [], $thirdOptionAvailableValues = [], $thirdOptionUnavailableValues = [];

                        $thirdOption.find('li').removeClass('selected out-of-stock unavailable').each(function(){
                            $thirdOptionValues.push($(this).data('value'));
                        });
                        $productOptions.find('option').each(function(){
                            $dataFirstOptionValue = $(this).data(firstOptionPostion);
                            $dataSecondOptionValue = $(this).data(secondOptionPostion);
                            $dataThirdOptionValue = $(this).data(thirdOptionPostion);
                            $dataInventoryQuantity = parseInt($(this).data('inventory_quantity'));

                            if($dataFirstOptionValue == firstOptionValue && $dataSecondOptionValue == secondOptionValue){
                                $thirdOptionAvailableValues.push($dataThirdOptionValue);
                                if($dataInventoryQuantity < 1){
                                    $optionOutOfStock = $dataThirdOptionValue;
                                    $thirdOption.find('li').each(function() {
                                        if($(this).data('value') == $optionOutOfStock){
                                            $(this).addClass('out-of-stock');
                                        }
                                    });
                                }
                                //checkOptionOutOfStock($(this), $thirdOption, $dataThirdOptionValue);
                            }
                        });

                        $thirdOptionUnavailableValues = array_diff($thirdOptionValues,$thirdOptionAvailableValues);
                        if($thirdOptionUnavailableValues.length > 0){
                            $thirdOptionUnavailableValues.forEach(function(unavailableValue,index){
                                $thirdOption.find('li').each(function() {
                                    if($(this).data('value') == unavailableValue){
                                        $(this).addClass('unavailable');
                                    }
                                });
                            });
                        }
                    }
                }
            }
        }else{
            // One Option
            $productItem.each(function(){
                $productItem       = $(this);
                $productQuickAdd   = $productItem.find(settings.productQuickAdd);
                $productOptions    = $productItem.find(settings.productOptions);
                $selectOption      = $productItem.find(settings.selectOption);
                $selectOptionSize  = $selectOption.size();
                $firstOption       = $productItem.find(settings.firstOption);
                firstOptionPostion = $firstOption.data('option');

                //Out of stock
                if($selectOptionSize == 1 && $firstOption != undefined){
                    $firstOption.find('li').removeClass('selected out-of-stock unavailable');

                    $productOptions.find('option').each(function(){
                        $dataVariantID = $(this).val();
                        $dataFirstOptionValue = $(this).data(firstOptionPostion);
                        $dataInventoryQuantity = parseInt($(this).data('inventory_quantity'));

                        if($dataInventoryQuantity < 1){
                            $optionOutOfStock = $dataFirstOptionValue;
                            $firstOption.find('li').each(function() {
                                if($(this).data('value') == $optionOutOfStock){
                                    $(this).addClass('out-of-stock');
                                }
                            });
                        }
                        //checkOptionOutOfStock($(this), $firstOption, $dataFirstOptionValue);
                    });
                }
                if($firstOption.hasClass('colour-option')){

                }
            });
        }
    };

    checkOptionOutOfStock = function($productOption, $option, $optionValue) {
        var $dataVariantID, $dataInventoryQuantity, $optionOutOfStock;

        $dataVariantID = $productOption.val();
        $dataInventoryQuantity = parseInt($productOption.data('inventory_quantity'));
        $.getJSON('/cart.js', function (cart) {
            jQuery.each(cart.items, function(index, item) {
                if (item.id == $dataVariantID) {
                    $dataInventoryQuantity = $dataInventoryQuantity - parseInt(item.quantity);
                    if($dataInventoryQuantity < 1){
                        $optionOutOfStock = $optionValue;
                        $option.find('li').each(function() {
                            if($(this).data('value') == $optionOutOfStock){
                                $(this).addClass('out-of-stock');
                            }
                        });
                    }
                }
            })
        });
    };

    addToCart = function($product, variantID) {
        $.post('/cart/add.js', {quantity: 1,id: variantID}, null, 'json').done(function(data) {
            ajaxCart.load();
            $product.addClass('hover').find(settings.selectOption).removeAttr('style').delay(3600).queue(function(rvt) {
                $product.removeClass('hover');
            })
            $product.find('.product-options').append('<span class="message">Added to bag</span>').delay(3650).queue(function(rvt) {
                $product.find('.message').remove();
                rvt();
            });
        }).fail(function(data) {
            var error = data.status;
            if(data.status == 422){
                error = 'Sorry, Sold Out';
            }
            if(data.status == 400){
                error = 'Sorry, Unavailable';

            }
            $product.addClass('hover').find(settings.selectOption).removeAttr('style').delay(3600).queue(function(rvt) {
                $product.removeClass('hover');
            })
            $product.find('.product-options').append('<span class="message">'+ error +'</span>').delay(3650).queue(function(rvt) {
                $product.find('.message').remove();
                rvt();
            });
        });
    }

    module = {
        init: init
    };

    return module;

}(JunoQuickAdd || {}, jQuery));

// jQuery(document).ready(function () {
//     JunoQuickAdd.init();
// });
var JunoQuickViewProducts = (function(module, $) {
    'use strict';

    // Public functions
    var init;

    // Private general variables
    var settings, button;

    // Private plugin variables
    //var $button;

    // Private functions

    init = function (options) {
        settings = {
            button: '.view-products',
            close: '.close-view-products'
        };

        $(document).on('click', settings.button, function(e) {
            e.preventDefault();

            var $this = $(this),
                number = parseInt($this.data('number')),
                ajaxUrl = $this.attr('href') + '?view=ajax';

            if($(this).hasClass('active')){
                $(this).removeClass('active').parent().removeClass('show');
            }else{
                $(this).addClass('active').parent().addClass('show');
            }

            if($this.hasClass('render')){
                return;
            }else{
                $.ajax({
                    type: 'GET',
                    url: ajaxUrl,
                    processData: false,
                    contentType: false,
                    success: function(data) {
                        var render = false, item;
                        $(data).filter('.product-grid').find('.product-item').each(function(index, value){
                            if(index < number){
                                render = true;
                                item = $('<div>').append($(this)).html();
                                $this.parent().find('.products').append(item);
                            }else{
                                return;
                            }
                        });
                        if(render == true){
                            $this.addClass('render');
                        }
                    }
                });
            }
        });
        $(document).on('click', settings.close, function(e) {
            e.preventDefault();

            var $this = $(this),
                parent = $(this).parents('.quick-view-products').eq(0);

            parent.removeClass('show');
            parent.find(settings.button).removeClass('active');
        });
        $(document).on('click', '.quick-view-products .products-container', function(e) {
            var $target = $(e.target),
                $this = $(this),
                parent = $(this).parents('.quick-view-products').eq(0);

            if(!$target.closest('.products').length){
                parent.removeClass('show');
                parent.find(settings.button).removeClass('active');
            }
        });
    }


    module = {
        init: init
    };

    return module;

}(JunoQuickViewProducts || {}, jQuery));
jQuery(document).ready(function () {
    JunoQuickViewProducts.init();
});
getJSON = function(url, successHandler, errorHandler) {
    var xhr = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.withCredentials = true;
    xhr.open('get', url, true);
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://pwaify.com');
    xhr.setRequestHeader('Access-control-allow-methods', 'OPTIONS,POST,GET');
    xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
    xhr.onreadystatechange = function() {
        var status, data
        if (xhr.readyState == 4) {
            status = xhr.status;
            var wasParsedOk = true;
            if (status == 200) {
                try {
                    data = JSON.parse(xhr.responseText);
                } catch (e) {
                    // JSON parse error:
                    wasParsedOk = false;
                    errorHandler && errorHandler(status);
                }
                if (wasParsedOk) {
                    successHandler && successHandler(data);
                }
            } else {
                errorHandler && errorHandler(status);
            }
        }
    };
    xhr.send();
};

function getWishlist(reveal) {
    console.log('getWishlist');
    jQuery('#wishlistOutput').addClass("loading");
    var url;
    if(typeof junoWishlistCustomer !== "undefined") {
        url = 'http://pwaify.com/wishlist/?customer-id='+junoWishlistCustomer+'&shop='+junoWishlistStore;
    } else {
        // use local storage
        var currentWishList = getLocalStorageWishList();
        url = 'http://pwaify.com/wishlist/local.php?product-ids='+JSON.stringify(currentWishList)+'&type=get&shop='+junoWishlistStore+'&return='+encodeURIComponent(window.location.pathname);
    }
    getJSON(url, function(data) {
        if (data.html) {
            console.log('getWishlist done');
            // done
            jQuery('#wishlistOutput').removeClass("loading").html(data.html);
            if(reveal) {
                juno.wishListIsRevealed = true;
                jQuery('html').addClass("offCanvasWishList");
            }
        }
    }, function(status) {
        console.log('getWishlist error');
        // error
    });
}

function addToWishList(productId, $elem = null) {
    var url = 'http://pwaify.com/wishlist/?customer-id='+junoWishlistCustomer+'&type=set&update=add&product-id=' + productId + '&shop='+junoWishlistStore;
    getJSON(url, function(data) {
        if (data.completed == "true") {
            // done
            $('#productWishListWrapper').addClass("added");
            getWishlist(true);
            if($elem !== null) {
                $elem.addClass("added");
            }
        }
    }, function(status) {
        // error
    });
}

function removeFromWishList(productId, $elem = null) {
    if(typeof junoWishlistCustomer !== "undefined") {
        var url = 'http://pwaify.com/wishlist/?customer-id='+junoWishlistCustomer+'&type=set&update=remove&product-id=' + productId + '&shop='+junoWishlistStore;
        getJSON(url, function(data) {
            if (data.completed == "true") {
                // done
                $('#productWishListWrapper').removeClass("added");
                getWishlist(true);
                if($elem !== null) {
                    $elem.removeClass("added");
                }
            }
        }, function(status) {
            // error
        });
    } else {
        removeFromLocalWishList(productId);
    }

}

function getLocalStorageWishList() {
    var localWishlist = "";
    if (localStorage.getItem("junoWishList") !== null) {
        localWishlist = localStorage.getItem("junoWishList");
    }
    if(localWishlist == "") {
        return [];
    } else {
        return localWishlist.split(",");
    }
}

function addToLocalWishList(productId, $elem = null) {
    var currentWishList = getLocalStorageWishList();
    currentWishList.push(productId);
    localStorage.setItem("junoWishList", currentWishList.join(","));
    $('#productWishListWrapper').addClass("added");
    getWishlist(true);
    if($elem !== null) {
        $elem.addClass("added");
    }
}

function saveLocalWishList() {
    jQuery('#wishlistOutput').addClass("loading");
    var currentWishList = getLocalStorageWishList();
    url = 'http://pwaify.com/wishlist/local.php?product-ids='+JSON.stringify(currentWishList)+'&type=set&shop='+junoWishlistStore+'&customer-id='+junoWishlistCustomer;
    getJSON(url, function(data) {
        if (data.completed) {
            // done
            localStorage.removeItem("junoWishList");
            getWishlist(true);
        }
    }, function(status) {
        // error
    });
}

function removeFromLocalWishList(productId, $elem = null) {
    var currentWishList = getLocalStorageWishList();
    currentWishList.splice(currentWishList.indexOf(productId), 1);
    localStorage.setItem("junoWishList", currentWishList.join(","));
    $('#productWishListWrapper').removeClass("added");
    getWishlist(true);
    if($elem !== null) {
        $elem.removeClass("added");
    }
}

function highlightActiveWishListItems() {
    if(typeof junoWishlistCustomer === "undefined") {
        var currentWishList = getLocalStorageWishList();
        if(currentWishList.length>0) {
            for(var i=0;i<currentWishList.length;i++) {
                jQuery('.collectionWishlistButton[data-id="'+currentWishList[i]+'"]').addClass("added");
            }
        }
    }
}

function checkProductPageWishList() {
    if(typeof junoWishlistCustomer === "undefined") {
        var currentWishList = getLocalStorageWishList();
        if(currentWishList.length>0) {
            for(var i=0;i<currentWishList.length;i++) {
                if(jQuery('#addToWishlist[data-id="'+currentWishList[i]+'"]').length>0) {
                    jQuery('#productWishListWrapper').addClass('added');
                }
            }
        }
    }
}

jQuery(function() {
    if(typeof junoWishlistCustomer !== "undefined") {
        var currentWishList = getLocalStorageWishList();
        if(currentWishList.length>0) {
            saveLocalWishList();
        }
    } else {
        if(jQuery('#productWishListWrapper').length > 0) {
            checkProductPageWishList();
        }
    }

    jQuery('#addToWishlist').on('click', function(e){
        e.preventDefault();
        if(typeof junoWishlistCustomer !== "undefined") {
            addToWishList(jQuery(this).attr("data-id"));
        } else {
            addToLocalWishList(jQuery(this).attr("data-id"));
        }
    });

    jQuery("body").on("click", ".removeFromWishlist", function(e) {
        e.preventDefault();
        removeFromWishList(jQuery(this).attr('data-id'));
        // if on collection page, find the corresponding heart and untoggle it:
        jQuery('.collectionWishlistButton[data-id="'+jQuery(this).attr('data-id')+'"]').removeClass("added");
    });

    jQuery("body").on("click", ".wishListAddToCart", function() {
        var whichVariant;
        $parentButton = jQuery(this);
        var attr = jQuery(this).attr('data-variantid');

        if (typeof attr !== typeof undefined && attr !== false) {
            whichVariant = jQuery(this).attr('data-variantid');
        } else {
            // get selected variant
            whichVariant = jQuery(this).prev().find('select').val();
        }
        jQuery.post('/cart/add.js', { quantity: 1, id: whichVariant }, null, 'json').done(function(data) {
            // done
            $parentButton.html('added');
            setTimeout(function() { $parentButton.html('Add to cart'); }, 3000);
            ajaxCart.load();
        }).fail(function(data) {
            // error
        });
    });

    jQuery("body").on("click", ".collectionWishlistButton", function(e) {
        e.preventDefault();
        if(jQuery(this).attr('data-account') == "true") {
            if(jQuery(this).hasClass("added")) {
                removeFromWishList(jQuery(this).attr('data-id'), jQuery(this));
            } else {
                addToWishList(jQuery(this).attr("data-id"), jQuery(this));
            }
        } else {
            // add to local storage:
            if(jQuery(this).hasClass("added")) {
                removeFromLocalWishList(jQuery(this).attr('data-id'), jQuery(this));
            } else {
                addToLocalWishList(jQuery(this).attr("data-id"), jQuery(this));
            }
        }
    });

    jQuery('#accountWishlistToggle').on('click', function(e){
        e.preventDefault();
        document.getElementById('wishlistToggle').click();
    });

    jQuery(document).on('click', '.needsclick.klaviyo-close-form.kl-private-reset-css-Xuajs1', function (){
        jQuery('.needsclick.kl-private-reset-css-Xuajs1').hide();
    });

    window.dataLayer = window.dataLayer || [];
    jQuery('#contact_form .input-box .button-icon').on('click', function(e){
        var email = jQuery('#contact_form #newsletter-email').val();
        window.dataLayer.push({
            event: 'newsletter_submission',
            email: email
        });
    });
});

