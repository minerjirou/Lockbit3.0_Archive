$().ready(function(){

        var scrollBarWidth = (window.innerWidth - $(window).width());

        $('.modal').on('click', function(e) {
            e.preventDefault();
            $(this).hide();
            $(document.body).css('overflow', '');
            window.location.href = '#1';
        });

        for (let i = 1; i < 5; i++) {
            $('.modal-slide-up-down').on('click', function (e) {
                e.preventDefault();
                $(document.body).css('padding-right', '0px');
                $('#modal' + i).slideUp();
                $(document.body).css('overflow', '');
                window.location.href = '#mirrors';
            })
        }
        for (let i = 1; i < 5; i++) {
            $('.modal-close').on('click', function (e) {
                e.preventDefault();
                $(document.body).css('padding-right', '0px');
                $('#modal' + i).slideUp();
                $(document.body).css('overflow', '');
                window.location.href = '#mirrors';
            })
        }
        $(document).keydown(function(e) {
            if (e.keyCode === 27) { // escape key maps to keycode `27`
                $(document.body).css('padding-right', '0px');
                $('#modal').slideUp();
                window.location.href = '#mirrors';
                $(document.body).css('overflow', '');
            }
        });


        $('.modal-content').on('click', function(e){
            e.stopPropagation();
        });

    if($("#myScroller").length) {
        setTimeout(function () {
            $("#myScroller").thumbScroller({
                responsive: true,
                orientation: 'horizontal',
                numDisplay: 4,
                slideWidth: 300,
                slideHeight: 170,
                slideMargin: 5,
                slideBorder: 1,
                padding: 10,
                autoPlay: false,
                delay: 4000,
                speed: 1000,
                easing: 'swing',
                control: 'index',
                navButtons: 'true',
                playButton: false,
                captionEffect: 'slide',
                captionAlign: 'bottom',
                captionPosition: 'inside',
                captionButton: false,
                captionHeight: 'auto',
                continuous: true,
                shuffle: false,
                mousewheel: true,
                imagePosition: 'fill',
                pauseOnHover: false,
                pauseOnInteraction: true,
                title: ''
            });

            $("#myScroller a[data-lightbox-group='gallery1']").wtLightBox({
                responsive: true,
                autoPlay: false,
                delay: 5000,
                speed: 600,
                easing: 'swing',
                navButtons: 'mouseover',
                playButton: false,
                numberInfo: true,
                timer: false,
                captionPosition: 'inside',
                captionButton: false,
                continuous: true,
                mousewheel: true,
                keyboard: true,
                swipe: true
            });


            // live handler
            lc_lightbox('.elem', {
                wrap_class: 'lcl_rtl_oc',
                gallery: true,
                global_type: 'image',
                counter: 1,
                thumb_attr: 'data-lcl-thumb',
                thumbs_nav: 1,

                skin: 'dark',
                radius: 0,
                padding: 0,
                border_w: 0,
                fullscreen: 1,
            });

        }, 1000);
    }

    $('[data-timer]').each(function (k,timerBlock) {

        let date = $(timerBlock).data('timer');
        timer(date, timerBlock);
    });

    moneyTimer();
    var r = setInterval(moneyTimer, 1000);

    $(".get_rules_translate").click(function(e) {
        e.preventDefault();
        var lang = $(this).data('lang');
        post('/ajax/get-translate', {lang:lang}, function(data) {
            $('#content').html(data);
        });
    });

    $(document.body).on('click', '.nonactive', function (e){
        e.preventDefault();
    });

});

function go(link) {
    preloaderGlobalShow()
    location.href = link;

    return false;
}

function timer(date, timerBlock, timer_count) {

    //timer_count++;
    let countDownDate = new Date(date).getTime();

    let timerFunc = function () {
        var d = new Date();
        let now = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());

        let distance = countDownDate - now;
        if (distance <= 0) {
            //location.reload();

            clearInterval($(timerBlock).attr('data-timer'));

            return;
        }

        let days = Math.floor(distance / (1000 * 60 * 60 * 24)) < 0 ? 0 : Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = ('0' +
            (Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) < 0 ? 0 : Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).toString()).slice(-2);
        let minutes = ('0' + (Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) < 0 ? 0 : Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).toString()).slice(-2);
        let seconds = ('0' + (Math.floor((distance % (1000 * 60)) / 1000) < 0 ? 0 : Math.floor((distance % (1000 * 60)) / 1000)).toString()).slice(-2);

        $(timerBlock).html(
            (days ? '<span class="days">' + days + 'D</span>   ' : '') +
            (hours || days ? '<span class="hours">' + hours + 'h</span> ' : '') +
            '<span class="minutes">' + minutes + 'm</span> ' +
            '<span class="seconds">' + seconds + 's</span> '
        );

    };

    timerFunc();
    $(timerBlock).attr('data-timer', setInterval(timerFunc, 1000));
}


function moneyTimer()
{
    var ransomPriceBlocks = $('[money-timer]');

    ransomPriceBlocks.each(function (k, v){
        var ransomPriceBlock = $(v);
        var minPrice = parseInt(ransomPriceBlock.data('min'));

        var price = parseInt(ransomPriceBlock.data('price')) - parseInt(ransomPriceBlock.data('step'));

        if (price < minPrice) {
            price = minPrice;
        }

        ransomPriceBlock.html('$ ' + price);
        ransomPriceBlock.data('price', price);
    });
}


function preloaderGlobalShow()
{
    $('#preloader_global').show();
    $(document.body).css('overflow', 'hidden');
}

function preloaderGlobalHide()
{
    $('#preloader_global').hide();
    $(document.body).css('overflow', '');
}

function copy(str) {
    let tmp = document.createElement('INPUT'),
        focus = document.activeElement;

    tmp.value = str;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand('copy');
    document.body.removeChild(tmp);
    focus.focus();

    var text = 'Copied ' + str;

    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    Toast.fire({
        icon: 'success',
        title: text
    });
}

