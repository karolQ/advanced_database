jQuery(window).load(function () {

		
    jQuery('.portfolio-one .portfolio-wrapper').isotope({
        // options
        itemSelector: '.portfolio-item',
        layoutMode: 'straightDown',
        transformsEnabled: false
    });

    jQuery('.portfolio-two .portfolio-wrapper, .portfolio-three .portfolio-wrapper, .portfolio-four .portfolio-wrapper').isotope({
        // options
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows',
        transformsEnabled: false
    });

    jQuery('.progress-bar').each(function () {
        var percentage = jQuery(this).find('.progress-bar-content').data('percentage');
        jQuery(this).find('.progress-bar-content').css('width', '0%');
        jQuery(this).find('.progress-bar-content').animate({
            width: percentage + '%'
        }, 'slow');
    });

    jQuery('#progress-bars').waypoint(function () {
        jQuery('.progress-bar').each(function () {
            var percentage = jQuery(this).find('.progress-bar-content').data('percentage');
            jQuery(this).find('.progress-bar-content').css('width', '0%');
            jQuery(this).find('.progress-bar-content').animate({
                width: percentage + '%'
            }, 'slow');
        });
    }, {
        triggerOnce: true,
        offset: '100%'
    });

    //var sidebar1 = $(this).find('#post-109')

   var sidebarCount = $('#sidebar, .left-block').length
    if (sidebarCount > 0)
        $('body .header-v4 #header .logo').css({ 'position': 'fixed' });
    else
        $('body .header-v4 #header .logo').css({ 'position': 'relative' });


    var sidebarCount = $('#sidebar').length
    if (sidebarCount > 0)
        $('#sidebar .trycassimage').css({ 'position': 'fixed' });
    else
        $('#sidebar .trycassimage').css({ 'position': 'relative' });

});

jQuery(document).ready(function ($) {
if (navigator.userAgent.indexOf('Mac') > 0)
        $('body').addClass('mac-os');
    // Tabs
    //When page loads...
    setTimeout( "jQuery('.info-outer').css('display','block');",3000 );
    jQuery('.tabs-wrapper').each(function () {
        jQuery(this).find(".tab_content").hide(); //Hide all content
        jQuery(this).find("ul.tabs li:first").addClass("active").show(); //Activate first tab
        jQuery(this).find(".tab_content:first").show(); //Show first tab content
    });

    //On Click Event
    jQuery("ul.tabs li").click(function (e) {
        jQuery(this).parents('.tabs-wrapper').find("ul.tabs li").removeClass("active"); //Remove any "active" class
        jQuery(this).addClass("active"); //Add "active" class to selected tab
        jQuery(this).parents('.tabs-wrapper').find(".tab_content").hide(); //Hide all tab content

        var activeTab = jQuery(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
        jQuery(this).parents('.tabs-wrapper').find(activeTab).fadeIn(); //Fade in the active ID content

        e.preventDefault();
    });

    jQuery("ul.tabs li a").click(function (e) {
        e.preventDefault();
    })

    jQuery('.project-content .tabset,.post-content .tabset').each(function () {
        var menuWidth = jQuery(this).width();
        var menuItems = jQuery(this).find('li').size();
        var itemWidth = Math.ceil(menuWidth / menuItems) - 1;

        jQuery(this).css({ 'width': menuWidth + 'px' });
        jQuery(this).find('li').css({ 'width': itemWidth + 'px' });
    });

    jQuery('#sidebar .tabset').each(function () {
        var menuWidth = jQuery(this).width();
        var menuItems = jQuery(this).find('li').size();
        var itemWidth = (menuWidth / menuItems) - 1;

        jQuery(this).css({ 'width': menuWidth + 'px' });
        jQuery(this).find('li').css({ 'width': itemWidth + 'px' });
    });

    jQuery('#footer .social-networks li, .footer-area .social-networks li, #sidebar .social-networks li, .social_links_shortcode li, .share-box li, .social-icon, .social li').mouseenter(function () {
        jQuery(this).find('.popup').fadeIn();
    });

    jQuery('#footer .social-networks li, .footer-area .social-networks li, #sidebar .social-networks li, .social_links_shortcode li, .share-box li, .social-icon, .social li').mouseleave(function () {
        jQuery(this).find('.popup').fadeOut();
    });

    jQuery('.clients-carousel').each(function () {
        jQuery(this).elastislide({
            imageW: 159,
            margin: 13,
            border: 0,
            minItems: 0,
            easing: 'easeInBack'
        });
    });

    jQuery('.es-carousel-wrapper').each(function () {
        jQuery(this).elastislide({
            imageW: 180,
            margin: 44,
            border: 0,
            easing: 'easeInBack'
        });
    });

    jQuery('.portfolio-tabs a').click(function (e) {
        e.preventDefault();

        var selector = jQuery(this).attr('data-filter');
        jQuery('.portfolio-wrapper').isotope({ filter: selector });

        jQuery(this).parents('ul').find('li').removeClass('active');
        jQuery(this).parent().addClass('active');
    });

    jQuery('.faq-tabs a').click(function (e) {
        e.preventDefault();

        var selector = jQuery(this).attr('data-filter');

        jQuery('.faqs .portfolio-wrapper .faq-item').fadeOut();
        jQuery('.faqs .portfolio-wrapper .faq-item' + selector).fadeIn();

        jQuery(this).parents('ul').find('li').removeClass('active');
        jQuery(this).parent().addClass('active');
    });

    jQuery('.toggle-content').each(function () {
        if (!jQuery(this).hasClass('default-open')) {
            jQuery(this).hide();
        }
    });

    jQuery("h5.toggle").click(function () {
        if (jQuery(this).parents('.accordian').length >= 1) {
            var accordian = jQuery(this).parents('.accordian');

            if (jQuery(this).hasClass('active')) {
                jQuery(accordian).find('h5.toggle').removeClass('active');
                jQuery(accordian).find(".toggle-content").slideUp();
            } else {
                jQuery(accordian).find('h5.toggle').removeClass('active');
                jQuery(accordian).find(".toggle-content").slideUp();

                jQuery(this).addClass('active');
                jQuery(this).next(".toggle-content").slideToggle();
            }
        } else {
            if (jQuery(this).hasClass('active')) {
                jQuery(this).removeClass("active");
            } else {
                jQuery(this).addClass("active");
            }
        }

        return false;
    });

    jQuery("h5.toggle").click(function () {
        if (!jQuery(this).parents('.accordian').length >= 1) {
            jQuery(this).next(".toggle-content").slideToggle();
        }
    });

    function isScrolledIntoView(elem) {
        var docViewTop = jQuery(window).scrollTop();
        var docViewBottom = docViewTop + jQuery(window).height();

        var elemTop = jQuery(elem).offset().top;
        var elemBottom = elemTop + jQuery(elem).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    jQuery('.toggle-alert').click(function (e) {
        e.preventDefault();

        jQuery(this).parent().slideUp();
    });

    // Create the dropdown base
    //jQuery('<select />').appendTo('.nav-holder');

    //// Create default option 'Go to...'
    //jQuery('<option />', {
    //    'selected': 'selected',
    //    'value'   : '',
    //    'text'    : 'Go to...'
    //}).appendTo('.nav-holder select');

    // Populate dropdown with menu items
    //jQuery('.nav-holder a').each(function() {
    //    var el = jQuery(this);

    //    if(jQuery(el).parents('.sub-menu .sub-menu').length >= 1) {
    //        jQuery('<option />', {
    //            'value'   : el.attr('href'),
    //            'text'    : '-- ' + el.text()
    //        }).appendTo('.nav-holder select');
    //    }
    //    else if(jQuery(el).parents('.sub-menu').length >= 1) {
    //        jQuery('<option />', {
    //            'value'   : el.attr('href'),
    //            'text'    : '- ' + el.text()
    //        }).appendTo('.nav-holder select');
    //    }
    //    else {
    //        jQuery('<option />', {
    //            'value'   : el.attr('href'),
    //            'text'    : el.text()
    //        }).appendTo('.nav-holder select');
    //    }
    //});

    jQuery('.nav-holder select').change(function () {
        if (jQuery(this).find('option:selected').val() !== '#') {
            window.location = jQuery(this).find('option:selected').val();
        }
    });

    jQuery('.side-nav li').each(function () {
        if (jQuery(this).find('> .children').length >= 1) {
            jQuery(this).find('> a').append('<span class="arrow"></span>');
        }
    });

    jQuery('.side-nav .current_page_item').each(function () {
        if (jQuery(this).find('.children').length >= 1) {
            jQuery(this).find('.children').show('slow');
        }
    });

    jQuery('.side-nav .current_page_item').each(function () {
        if (jQuery(this).parent().hasClass('side-nav')) {
            jQuery(this).find('ul').show('slow');
        }

        if (jQuery(this).parent().hasClass('children')) {
            jQuery(this).parents('ul').show('slow');
        }
    });

    jQuery('.content-boxes').each(function () {
        var cols = jQuery(this).find('.col').length;
        jQuery(this).addClass('columns-' + cols);
    });

    jQuery('.columns-3 .col:nth-child(3n), .columns-4 .col:nth-child(4n)').css('padding-right', '0px');

    jQuery('input, textarea').placeholder();



    //var windowHeight = $(document).height();
    //var windowheightinner = ((windowHeight - ($(".footer-area").height() + $("#footer").height())));

    //$("#sidebar .widget, .header-v4 #header .logo").css(Position, relative);
    var heightSidebar = $('.widget_nav_menu').height();
    $('#sidebar .trycassimage').css('margin-top', heightSidebar + 15);
    $('.top-scroll').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    });

    $('.w760 .w380 a').click(function () {
        $('html, body').animate({ scrollTop: 180 }, 'slow');
    })


    $('ul#nav li a').click(function () {

        setTimeout(function () {

            $('ul#nav li').removeClass('active');
            $('ul#nav li').removeClass('current-menu-parent');
            $('ul#nav li').removeClass('current-menu-ancestor');
            $(this).parent('li').addClass('active');
            $(this).addClass('active');
        }, 3000);
    })

    $('ul#nav li').hover(function () {
        $(this).addClass('active');
        $('ul#nav li').removeClass('current-menu-parent');
        $('ul#nav li').removeClass('current-menu-ancestor');
    }, function () {
        $(this).removeClass('active');
        $('ul#nav li').find('ul li.current-menu-item').parents('li').addClass('current-menu-ancestor current-menu-parent')
    })


    var ww = $(window).width();
    //alert(ww);
    $("#main table").each(function () {
        var tabwidth = $(this).width();
        if (tabwidth > ww) {
            $(this).css('display', 'none');
        }
    });

    $("#main img").each(function () {
        var imgwidth = $(this).width();
        if (imgwidth > ww) {
            $(this).css('width', '100%');
            $(this).css('height', 'auto');
        }
    });


});
//$(window).scroll(function () {
//    var windowHeight = $(document).height();
//    var windowheightinner = ((windowHeight - ($(".footer-area").height() + $("#footer").height() + 530)));
//    var scrollVal = $(this).scrollTop();
//    if (scrollVal > 100) {

//        $('#sidebar .widget, .page-driver .left-block').css({ 'position': 'fixed', 'top':'20' });
//    } else {
//        $('#sidebar .widget, .page-driver .left-block').css({ 'position': 'relative' });
//    }
//    //    $('#sidebar .widget, .page-driver .left-block').css({ 'left': '0' });
//    //} else {
//    //      $('#sidebar .widget, .page-driver .left-block').css({ 'position': 'fixed', 'left': 'inherit' });
//    //}




//});

$fl_menu = $("#sidebar .widget, .page-driver .left-block");
$(window).scroll(function () {
    var h = (document.height !== undefined) ? document.height : document.body.offsetHeight;
    var w = (document.width !== undefined) ? document.width : document.body.offsetWidth;

    var height = h - ($("#sidebar .widget, .page-driver .left-block").height() + 500);

    var scrollVal = $(this).scrollTop();
    if (height > scrollVal) {
        $('#sidebar .widget, .page-driver .left-block').css({ 'position': 'fixed', 'display': 'block' });
    }
    else {
        $('#sidebar .widget, .page-driver .left-block').css({ 'position': 'relative', 'display':'none' });
		$('#sidebar .widget, .page-driver .left-block.alignright').css({ 'position': 'relative', 'display':'block' });
    }

 var height = h - ($("#sidebar .widget").height() + 840);

    var scrollVal = $(this).scrollTop();
    if (height > scrollVal) {
        $('#sidebar .trycassimage').css({ 'position': 'fixed' });
    }
    else {
        $('#sidebar .trycassimage').css({ 'position': 'relative' });
    }

    if ($(window).scrollTop() > 300) {
        $('.top-scroll').css({ 'display': 'block' })
    }
    else {
        $('.top-scroll').css({ 'display': 'none' })
    }
    /*isOnView = isElementVisible(".footer-area");
    
	if($(document).scrollTop() >= 90){
		if(isOnView){
			var scrollAmount=$(document).scrollTop();
			var newPosition=scrollAmount-1500;
			$fl_menu.css("position","fixed");
			$fl_menu.css("top",scrollAmount);
			//FloatMenu();
		}else{ // If not visible
			$fl_menu.css("position","fixed");
			$fl_menu.css("top",90);
		}
		
	}else{
		$fl_menu.css("top",0);
		$fl_menu.css("position","relative");		
	}*/






});

function isElementVisible(elementToBeChecked) {
    var TopView = $(window).scrollTop();
    var BotView = TopView + $(window).height();
    var TopElement = $(elementToBeChecked).offset().top;
    var BotElement = TopElement + (($(elementToBeChecked).height()) - 115);
    return ((BotElement <= BotView) && (TopElement >= TopView));
}
