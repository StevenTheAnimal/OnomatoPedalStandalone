//// Language

function langIconFocus() {
    if (localStorage.getItem("language") == 'jp') {
        $('.jp').addClass('languageActive');
        $('.en').removeClass('languageActive');
    } else {
        $('.en').addClass('languageActive');
        $('.jp').removeClass('languageActive');
    }
};
function getLanguage() {
    (localStorage.getItem('language') == null) ? setLanguage('en') : true ;
    var languageData = (localStorage.getItem('language') == 'en') ? languageEn : languageJp ;

    if(nav == 'v2' || nav == 'v2-vbg') {
        if (localStorage.getItem("language") == 'jp') {
            $('#pedalDesc').html(eqdPedals[p].descriptionJP);
            $('#onoMeaning').html(thepedal.onoMeaningJP);
        } else {
            $('#pedalDesc').html(eqdPedals[p].description);
            $('#onoMeaning').html(thepedal.onoMeaning);
        }
    }

    $('#aboutOP').html( languageData.aboutOPNL );
    $('#credit').html( languageData.creditsNL );
    $('#howToPlay').html( languageData.howToPlay );
    $('#modalMessage').html(languageData.modalMessage);

    langIconFocus();
};

function getPedalEN() {
    if(nav == 'v1') {
        $('#onomoInfo').html(pedal.onomoDesc);
        $('#pedalInfo').html(pedal.pedalinfo);
    }
}

function getPedalJP() {
    if(nav == 'v1') {
        $('#onomoInfo').html(pedal.onomoDescJP);
        $('#pedalInfo').html(pedal.pedalinfoJP);
    }
}

function setLanguage(lang) {
    localStorage.setItem('language', lang);
}

// ===== Language Switch =====

$('.en').click(function(){
    $('.en').addClass('languageActive');
    $('.jp').removeClass('languageActive');
    localStorage.setItem('language', 'en');
    getLanguage();
    getPedalEN();
});

$('.jp').click(function(){
    $('.jp').addClass('languageActive');
    $('.en').removeClass('languageActive');
    localStorage.setItem('language', 'jp');
    getLanguage();
    getPedalJP();
});

       // ===== Right side sliding panel =====
    
       $(document).ready( function() {
        getLanguage();
        $('#sidepanelLogos').html("<img src='../images/v1/PatternBased_Logo_CL.png' class='sidepanelLogo'><img src='../images/v1/EarthQuaker-Devices-Logo_dark.png' class='sidepanelLogo'><p>© 2019-2024 PatternBased and EarthQuaker Devices. All Rights Reserved.</p>");
    });

    $('.info').click(function () {
        $('.rightSPWrapper, #rightSPHeader').css({
        'right':'0', 
        'transition-duration':'300ms'});
    });
    $('.close').click(function () { 
        $('.rightSPWrapper, #rightSPHeader').css({
        'right':'-480px', 
        'transition-duration':'300ms'});
    });

    $(document).on('click', '#orlandoTrigger', function () {
        $('img#orlandBunny').addClass('bunnyShowup');
        if($('img#corabelleBunny').hasClass('bunnyShowup')) {
            $('#pyonpyonBubble').css({
            'display' : 'inline',
            });
            setTimeout( function() {
            $('#pyonpyonBubble').css({
                'opacity' : '1',
                'transition-delay' : '1000ms',
                'transition-duration' : '200ms'
            })   }, 100);
        }
    });

    $(document).on('click', '#corabelleTrigger', function () {
            $('img#corabelleBunny').addClass('bunnyShowup');
            if($('img#orlandBunny').hasClass('bunnyShowup')) {
            $('#pyonpyonBubble').css({
                'display' : 'inline'
            });
            setTimeout( function() {
                $('#pyonpyonBubble').css({
                'opacity' : '1',
                'transition-delay' : '1000ms',
                'transition-duration' : '200ms'
                })   }, 100);
            }
    });