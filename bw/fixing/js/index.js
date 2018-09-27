(function ($) {

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *       the user visible viewport of a web browser.
     *       can accounts for vertical position, horizontal, or both
     */
    var $w = $(window);
    $.fn.visible = function (partial, hidden, direction, container) {

        if (this.length < 1)
            return;

        // Set direction default to 'both'.
        direction = direction || 'both';

        var $t = this.length > 1 ? this.eq(0) : this,
            isContained = typeof container !== 'undefined' && container !== null,
            $c = isContained ? $(container) : $w,
            wPosition = isContained ? $c.position() : 0,
            t = $t.get(0),
            vpWidth = $c.outerWidth(),
            vpHeight = $c.outerHeight(),
            clientSize = hidden === true ? t.offsetWidth * t.offsetHeight : true;

        if (typeof t.getBoundingClientRect === 'function') {

            // Use this native browser method, if available.
            var rec = t.getBoundingClientRect(),
                tViz = isContained ?
                rec.top - wPosition.top >= 0 && rec.top < vpHeight + wPosition.top :
                rec.top >= 0 && rec.top < vpHeight,
                bViz = isContained ?
                rec.bottom - wPosition.top > 0 && rec.bottom <= vpHeight + wPosition.top :
                rec.bottom > 0 && rec.bottom <= vpHeight,
                lViz = isContained ?
                rec.left - wPosition.left >= 0 && rec.left < vpWidth + wPosition.left :
                rec.left >= 0 && rec.left < vpWidth,
                rViz = isContained ?
                rec.right - wPosition.left > 0 && rec.right < vpWidth + wPosition.left :
                rec.right > 0 && rec.right <= vpWidth,
                vVisible = partial ? tViz || bViz : tViz && bViz,
                hVisible = partial ? lViz || rViz : lViz && rViz,
                vVisible = (rec.top < 0 && rec.bottom > vpHeight) ? true : vVisible,
                hVisible = (rec.left < 0 && rec.right > vpWidth) ? true : hVisible;

            if (direction === 'both')
                return clientSize && vVisible && hVisible;
            else if (direction === 'vertical')
                return clientSize && vVisible;
            else if (direction === 'horizontal')
                return clientSize && hVisible;
        } else {

            var viewTop = isContained ? 0 : wPosition,
                viewBottom = viewTop + vpHeight,
                viewLeft = $c.scrollLeft(),
                viewRight = viewLeft + vpWidth,
                position = $t.position(),
                _top = position.top,
                _bottom = _top + $t.height(),
                _left = position.left,
                _right = _left + $t.width(),
                compareTop = partial === true ? _bottom : _top,
                compareBottom = partial === true ? _top : _bottom,
                compareLeft = partial === true ? _right : _left,
                compareRight = partial === true ? _left : _right;

            if (direction === 'both')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop)) && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
            else if (direction === 'vertical')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
            else if (direction === 'horizontal')
                return !!clientSize && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
        }
    };

})(jQuery);


// Our main jquery code start
(function ($) {
    'use strict';

    jQuery(document).ready(function ($) {


        var elements = {
            scrollify: $('.js--scrollify'),
            //Header includes the top navigation bar
            header: $('.js--header'),
            footer: $('.js--footer'),
            hashLink: $('.js--hash-link'),
            //Navigate includes the function for the right side navigation squares.
            navigate: $('.js--navigate'),
            navigateItems: $('.js--navigate-items'),
            navigateLink: $('.js--navigate-link'),
            more: $('.js--more')
        };

        elements.navigateItems.on('click', '.js--navigate-link', function (ev) {
            ev.preventDefault();

            var $this = $(ev.currentTarget);
            var hash = $this.attr('href');

            $.scrollify.move(hash);
        });

        elements.hashLink.on('click', null, function (ev) {
            ev.preventDefault();

            var $this = $(ev.currentTarget);
            var hash = $this.attr('href');

            $.scrollify.move(hash);
        });

        elements.more.on('click', function (ev) {
            elements.block.slideToggle();
        });

        $.scrollify({
            section: '.js--scrollify',
            sectionName: 'section-name',
            overflowScroll: true,
            touchScroll: false, //disable on mobile        
            scrollSpeed: 1200,
            updateHash: true,
            setHeights: true,
            interstitialSection: '.footer',
            standardScrollElements: '',
            before: function before(index, sections) {
                var ref = sections[index].data('section-name');

                /*   if (ref === 'project' || ref === 'toc' || ref === 'intro') {
                            //elements.header.removeClass('is--active');
                        // elements.navigate.addClass('invisible');
                        } 
                
                            else {
                            //elements.navigate.removeClass('invisible');
                        } */

                /* if (ref === 'first') {
                    // elements.header.removeClass('is--active');
                    } */
                // leave this in because its smoother than the function below
                elements.navigateLink.parent().siblings().find('.js--navigate-link').removeClass('is--active');
                if (index > 0) {
                    elements.navigateLink.eq(index - 1).addClass('is--active');
                }
            },

            after: function after(index, sections) {
                var ref = sections[index].data('section-name');
                /*
    
                    if (!!ref && ref !== 'toc' && ref !== 'intro' && ref !== 'project') {
                        elements.header.addClass('is--active');
                    }  */
            },
            afterRender: function afterRender() {}
        });

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            //For MOBILE devices only. Scrollify takes care of it on desktop.
            $(".section-navigate__link").click(function () {
                $(".section-navigate__name").css("opacity", "0");
            });

        }


        /*
            After image load show right side navigation
         */
        var total_images = $("body img").length;
        var images_loaded = 0;

        $("body").find('img').each(function () {
            var fakeSrc = $(this).attr('src');
            $("<img/>").attr("src", fakeSrc).css('display', 'none').on('load', function () {
                images_loaded++;
                if (images_loaded >= total_images) {
                    $("body img").show();
                    $(window).scroll(function () {
                        if ($(".section__masthead").visible(true) || $(".section__toc").visible(true) || $(".section__project").visible(true)) {
                            $(".section-navigate").addClass('invisible');
                        } else {
                            $(".section-navigate").removeClass('invisible');
                        }
                        if ($(window).width() < 769) {
                            var bodyHeight = $("body").height() - 900;
                            if ($(window).scrollTop() > bodyHeight) {
                                $(".section-navigate").addClass('invisible');
                            }
                        }
                    });

                }
            });

        });


        // On scroll show header
        $(window).scroll(function () {
            // Take care of appearing/disappearing of header and navigation
            if ($(".section__masthead").visible(true) || $(".section__toc").visible(true) || $(".section__project").visible(true)) {
                $(".header").removeClass('is--active');
            } else {
                $(".header").addClass('is--active');
            }

        });



    }); // end document ready function




})(jQuery);