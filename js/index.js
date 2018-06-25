var totalPages;
var channel_new = 1;
var isPlaying = false;
var mom = $('.container');
var ani1, ani2, ani3, ani4, ani5, ani6;


$(document).ready(function () {
    totalPages = $('.page').length;

    // initAni();

    initSwipeEvent();

    initPop();

    initScale();
});



function playNextAni(pageChannel,isNext) {

    var ani = new TimelineMax();
    var page = $(".p"+pageChannel);
    var initOffset = 150;
    var initPosition = (isNext)?initOffset:-initOffset;

    console.log(initPosition)

    ani.set(page.find('.wrap'), { perspective: 1000 })
    .set(page.find('.content'), { autoAlpha: 0 ,marginTop:initPosition})
    .set(page.find('.lAni'), { marginLeft: -60 })
    .set(page.find('.rAni'), { marginLeft: 60})
    .set(page.find('.roleAni'), { rotationY: 60 })
    .set(page.find('.roleRAni'), { rotationY: 60, transformOrigin: '120% 0%' })
    .staggerTo(page.find('.content'), 1, { autoAlpha: 1, marginTop: 0, marginLeft: 0, rotationY: 0, ease: Power3.easeOut }, .05)

}


function initSwipeEvent() {
    addSwipeUpDownEvent($('body'), function () {

        //prev
        switchPageChannel(channel_new - 1,false)

    }, function () {

        // next
        switchPageChannel(channel_new + 1,true)
    })


    ChungTool.addWheelEvent($('body'), function () {

        //prev
        switchPageChannel(channel_new - 1,false)

    }, function () {

        // next
        switchPageChannel(channel_new + 1,true)
    })


    $('.pageArr').click(function () {
        switchPageChannel(channel_new + 1,true)
    })


    $('.logo').click(function () {
        switchPageChannel(1,true)
    })

}

function switchPageChannel(newChannel,isNext) {

    if ($('.container').hasClass('bigSize')) {
        return;
    }

    if (newChannel > 0 && newChannel <= totalPages) {

        ChungTool.removeClassWithFilter(mom, 'channel_');
        mom.addClass('channel_' + newChannel);
        playNextAni(newChannel,isNext);

        channel_new = newChannel;

        if (channel_new == totalPages) {
            $('.pageArr').addClass('hide');
        } else {
            $('.pageArr').removeClass('hide');
        }
    }
}




function initPop() {

    $('.calendarBtn').click(function () {
        $('.calendarPop').toggleClass('hide')
    })

    $('.calendarPop .bg').click(function () {
        $('.calendarPop').toggleClass('hide')
    })

    $('.calendarPop .clozBtn').click(function () {
        $('.calendarPop').toggleClass('hide')
    })


    // $('.calendarPop .moblieBtnCheck').click(function(e){
    //     var isSafari = !navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
    //     if(!isSafari){
    //         e.preventDefault();
    //         alert('請用iphone的safari瀏覽器使用此功能')
    //     }else{
           
    //     }
    // })
}

function initScale() {
    $('.scaleObject').click(function (e) {
        $('.container').toggleClass('bigSize');
    })
}


function addSwipeUpDownEvent(el, upFunc, downFunc) {
    // var touchObj = document.getElementById("index_banner_swipe");

    var start_y;
    var end_y;
    var t = el;

    t.get(0).addEventListener('touchstart', touchStart, false);
    t.get(0).addEventListener('touchmove', touchMove, false);
    t.get(0).addEventListener('touchend', touchSwipe);

    function touchStart(event) {
        if ($('.container').hasClass('bigSize')) {
            return false;
        }
        if (event.targetTouches.length != 1) {
            return false;
        } //單點觸控
        start_y = end_y = event.targetTouches[0].pageY;

    }

    function touchMove(event) {
        if ($('.container').hasClass('bigSize')) {
            return false;
        }
        event.preventDefault();
        if (event.targetTouches.length != 1) {
            return false;
        } //單點觸控
        end_y = event.targetTouches[0].pageY;
        t.css('margin-top', end_y - start_y);
    }

    function touchSwipe(event) {


        t.css('margin-top', 0);
        if (end_y - start_y > 100) {
            upFunc();

        } else if (end_y - start_y < -100) {
            downFunc();
        }
    }
}