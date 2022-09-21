window.jQuery(document).ready(function($){

    window.getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    var copyToClipboard = function(textToCopy){
        $("body")
            .append($('<textarea name="fname" class="textToCopyInput"/>' )
            .val(textToCopy))
            .find(".textToCopyInput")
            .select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
        } catch (err) {}
        $(".textToCopyInput").remove();
    }


    window.sessionId = Cookies.get('lg_session');
    window.requestFullConsent = Cookies.get('request_full_consent') === 'true';
    window.cookieNoticeClicked = Cookies.get('cookie_notice_accepted') === 'true';
    window.cookieNoticeFullConsentClicked = Cookies.get('cookie_notice_full_consent_accepted') === 'true';
    window.statisticsCookiesAllowed = Cookies.get('statistics_allowed') === 'true';
    window.marketingCookiesAllowed = Cookies.get('marketing_allowed') === 'true';
    window.framingContentAllowed = Cookies.get('framing_allowed') === 'true';
    window.framingVideoContentAllowed = Cookies.get('framing_video_allowed') === 'true';
    window.categoryId = $('.category-content').data('category-id');
    window.gameId = $('.game-content').data('game-id');
    window.gameCode = decodeURIComponent($('.game-content').data('game-code'));

    window.adsFrequencyCapping = parseInt(Cookies.get('lg_fc'));
    if(typeof window.adsFrequencyCapping == 'undefined' || window.adsFrequencyCapping === null || isNaN(window.adsFrequencyCapping)) {
        window.adsFrequencyCapping = 0;
    }

    window.origin = window.getUrlParameter('origin');
    if(typeof window.origin != 'undefined' && window.origin !== null && window.origin !== '') {
        Cookies.set('origin', window.origin, { expires: 30 });
    } else {
        window.origin = Cookies.get('origin');
    }

    var userLang = navigator.language || navigator.userLanguage;
    window.md = new MobileDetect(window.navigator.userAgent);
    var game_title = $('.game-card-title').html();

    if(typeof Cookies.get('game-liked-' + window.gameId) !== "undefined") {
        var game_liked = true;
        $(".like-game svg > g > g:nth-child(2)").css("stroke", "#6BF8FF");
    } else {
        var game_liked = false;
    }

    if(typeof Cookies.get('game-disliked-' + window.gameId) !== "undefined") {
        var game_disliked = true;
        $(".dislike-game svg > g > g:nth-child(2)").css("stroke", "#6BF8FF");
    } else {
        var game_disliked = false;
    }

    var current_url = window.location.hostname + window.location.pathname;
    var current_url_encoded = encodeURIComponent(current_url);

    $('[data-toggle="tooltip"]').tooltip({
        container: '.game-bar-below'
    });

    $( document ).on( 'click', '.category-tags li', function() {
        if(typeof $(this).data('url') !== 'undefined') {
            window.location.href = $(this).data('url');
        }
    });

    if(window.md.mobile() !== null) {
        $('#masthead').removeClass('fixed-top');
        $('#content.site-content').css('padding-top', '0');
        $('.game-fullscreen').hide();
        $('.game-vertical').hide();
    }

    if(navigator.userAgent.match(/bot|crawler|spider|crawling/i) === null) {

        $('.game-marketing-cookies-hint').html(window.marketingCookiesHint);
        $('.game-walkthrough-marketing-cookies-hint').html(window.marketingCookiesHint);

        $('#cookie-notice').html('<div class="cookie-notice-container">\n' +
            '        <span id="cn-notice-text" class="cn-text-container">\n' +
            '            <div>\n' +
            '                This website uses cookies to analyze and improve the website and to display personalized ads. Under <a href=\"\' + window.siteUrl + \'/privacy-policy/\">privacy policy</a> you will find further information and possibilities to switch off these cookies.<br>\n' +
            '            </div>\n' +
            '            <div class="essential-links">\n' +
            '                <a href="https://gameforge.com/en-US/littlegames/imprint//">Imprint</a>\n' +
            '            </div>\n' +
            '        </span>\n' +
            '        <span id="cn-notice-buttons" class="cn-buttons-container">\n' +
            '            <a href="#" id="cn-accept-cookie" data-cookie-set="accept" class="cn-accept-cookies cn-set-cookie cn-button bootstrap button">Ok</a>\n' +
            '        </span>\n' +
            '    </div>');

        $('#cookie-notice-full-consent').html('<div class="overlay-container">\n' +
            '    <div class="overlay-inner-background">\n' +
            '        <div class="cookie-notice-container">\n' +
            '        <span id="cn-notice-text" class="cn-text-container">\n' +
            '            <div style="text-align: center; padding-bottom: 20px;"><img src="https://gameforge.com/en-US/littlegames/content/themes/casual/custom/img/logo.png" class="logo-img dropdown-toggle" title="" alt="LittleGames"></div>\n' +
            '            <div style="text-align: center;">\n' +
            '                <p style="font-size: 15px;">We and our partners store and/or access information on your device, by using techniques like cookies to analyze and improve our website and to display personalized ads. For this, we ask for your consent. You may give your consent, or change your preferences via the settings. More information on the collection and use of data by us and our partners can be found in our <a href="' + window.siteUrl + '/privacy-policy/">privacy policy</a>. You can also manage your consent settings there.</p>\n' +
            '                <!--<div class="cn-section">\n' +
            '                    <div style="flex: 1;"><strong>Essential cookies (mandatory)</strong><br>\n' +
            '                        <span style="font-size: 12px;">Essential cookies help us to provide you with functions that are essential for the use of our services.</span></div>\n' +
            '                    <div>\n' +
            '                        <label class="switch"><input type="checkbox" class="cn-essential-cookies-checkbox" disabled checked><span class="slider round"></span></label>\n' +
            '                    </div>\n' +
            '                </div>\n' +             '                <div class="cn-section">\n' +
            '                    <div style="flex: 1;"><strong>Marketing Cookies</strong><br>\n' +
            '                        <span style="font-size: 12px;">Marketing cookies are used by our marketing partners to follow visitors to websites. The intent is to show you ads that are relevant and appealing to you and therefore more valuable to publishers and third party advertisers.</span></div>\n' +
            '                    <div>\n' +
            '                        <label class="switch"><input type="checkbox" class="cn-marketing-cookies-checkbox"><span class="slider round"></span></label>\n' +
            '                    </div>\n' +
            '                </div>-->\n' +
            '            </div>\n' +
            '            <div style="display: flex; justify-content: center; padding-bottom: 20px;">\n' +
            '                <div id="cn-notice-buttons" class="cn-buttons-container">\n' +
            '                    <a href="#" data-cookie-set="reject" class="cn-reject-all-cookies cn-set-cookie cn-button bootstrap button">Reject all</a>\n' +
            '                    <a href="#" data-cookie-set="accept" class="cn-accept-all-cookies cn-set-cookie cn-button bootstrap button">Accept all cookies</a>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div style="display: flex; justify-content: center; padding-bottom: 30px;">\n' +
            '                <a href="#" class="cn-cookie-settings">Settings</a>\n' +
            '            </div>\n' +
            '            <div style="display: flex; justify-content: center;">\n' +
            '                <div class="essential-links">\n' +
            '                    <a href="' + window.siteUrl + '/cookie-policy/">Cookie Policy</a> |\n' +
            '                    <a href="https://gameforge.com/en-US/littlegames/privacy-policy/">Privacy</a> |\n' +
            '                    <a href="https://gameforge.com/en-US/littlegames/imprint/">Imprint</a>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </span>\n' +
            '    </div>\n' +
            '    </div>\n' +
            '    </div>\n' +
            '    <div class="overlay overlay-background content_block"></div>');

        $('#cookie-settings').html('<div class="overlay-container">\n' +
            '        <div class="overlay-inner-background">\n' +
            '            <div class="overlay-head">Cookie Settings</div>\n' +
            '            <div>\n' +
            '                <p>\n' +
            '                   If you make no other decision below, you agree to the storage of information on your device and the collection and processing of such information and other data by the operator of this site and its partners for the personalization, delivery and measurement of advertising and content within and outside this website and for evaluations of the use of this website.\n' +
            '                </p>\n' +
            '            </div>\n' +
            '            <div>\n' +
            '                <div class="cn-section">\n' +
            '                    <div style="flex: 1;"><strong>Essential cookies (mandatory)</strong><br>\n' +
            '                        <span style="font-size: 12px;">Essential cookies help us to provide you with functions that are essential for the use of our services.</span></div>\n' +
            '                    <div>\n' +
            '                        <label class="switch"><input type="checkbox" class="cn-settings-essential-cookies-checkbox" disabled checked><span class="slider round"></span></label>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <!--<div class="cn-section">\n' +
            '                    <div style="flex: 1;"><strong>Statistic Cookies</strong><br>\n' +
            '                        <span style="font-size: 12px;">Statistics cookies help us to understand how visitors interact with our site by collecting and reporting information anonymously.</span></div>\n' +
            '                    <div>\n' +
            '                        <label class="switch"><input type="checkbox" class="cn-settings-statistics-cookies-checkbox"><span class="slider round"></span></label>\n' +
            '                    </div>\n' +
            '                </div>-->\n' +
            '                <div class="cn-section">\n' +
            '                    <div style="flex: 1;"><strong>Marketing Cookies</strong><br>\n' +
            '                        <span style="font-size: 12px;">Marketing cookies are used by our marketing partners to follow visitors to websites. The intent is to show you ads that are relevant and appealing to you and therefore more valuable to publishers and third party advertisers.</span></div>\n' +
            '                    <div>\n' +
            '                        <label class="switch"><input type="checkbox" class="cn-settings-marketing-cookies-checkbox"><span class="slider round"></span></label>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <div class="cn-section">\n' +
            '                    <div style="flex: 1;"><strong>Games Publishers</strong><br>\n' +
            '                        <span style="font-size: 12px;">Many games on our website are provided by external publishers. If you play these games, these publishers may process your personal data for personalized advertising, analytics and social media. Check the privacy policies of these publishers and determine wether you consent to the processing of your personal data by these third-party publishers if you play their games for the above purposes.</span></div>\n' +
            '                    <div>\n' +
            '                        <label class="switch"><input type="checkbox" class="cn-settings-marketing-cookies-checkbox"><span class="slider round"></span></label>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="overlay-footer">\n' +
            '                <div style="text-align: center; margin-bottom: 20px;">\n' +
            '                    <!--<a href="#" id="cn-cookie-settings-abort" class="close-overlay" style="margin-right: 10px;">Abort</a>-->\n' +
            '                    <a href="#" id="cn-cookie-settings-save" class="cn-button bootstrap button">Save Preferences</a> <a href="#" class="cn-reject-all-cookies cn-button bootstrap button close-overlay">Reject all</a> <a href="#" class="cn-accept-all-cookies cn-button bootstrap button close-overlay">Accept all</a>\n' +
            '                </div>\n' +
            '                <div style="text-align: center;">\n' +
            '                    <a href="' + window.siteUrl + '/cookie-policy/" target="_blank">Cookie Policy</a> |\n' +
            '                    <a href="https://gameforge.com/en-US/littlegames/privacy-policy/" target="_blank">Privacy</a>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <div class="overlay overlay-background content_block"></div>');

        $('#share-game').html('<div class="overlay-container">\n' +
            '        <div class="overlay-inner-background">\n' +
            '            <div class="overlay-head">Share Game</div>\n' +
            '            <div>\n' +
            '            <div class="social-share-links">\n' +
            '               <a href="https://www.facebook.com/sharer/sharer.php?u=' + current_url_encoded + '" target="_blank" rel="nofollow noopener noreferrer" class="social-share-link" data-provider="Facebook" data-toggle="share-tooltip" title="Facebook"><span class="social-share-icon"><svg class="social-svg" viewBox="0 0 64 64" style="border-radius: 50%; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; fill-rule: evenodd;"><g class="social-svg-background" style="transition: fill 170ms ease-in-out 0s; fill: transparent;"><circle cx="32" cy="32" r="31"></circle></g><g class="social-svg-icon" style="transition: fill 170ms ease-in-out 0s; fill: transparent;"><path d="M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z"></path></g><g class="social-svg-mask" style="transition: fill 170ms ease-in-out 0s; fill: rgb(59, 89, 152);"><path d="M0,0v64h64V0H0z M39.6,22l-2.8,0c-2.2,0-2.6,1.1-2.6,2.6V28h5.3l-0.7,5.3h-4.6V47h-5.5V33.3H24V28h4.6V24 c0-4.6,2.8-7,6.9-7c2,0,3.6,0.1,4.1,0.2V22z"></path></g></svg></span></a>\n' +
            '               <a href="https://twitter.com/home?status=' + current_url_encoded + '" target="_blank" rel="nofollow noopener noreferrer" class="social-share-link" data-provider="Twitter" data-toggle="share-tooltip" title="Twitter"><span class="social-share-icon"><svg class="social-svg" viewBox="0 0 64 64" style="border-radius: 50%; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; fill-rule: evenodd;"><g class="social-svg-background" style="transition: fill 170ms ease-in-out 0s; fill: transparent;"><circle cx="32" cy="32" r="31"></circle></g><g class="social-svg-icon" style="transition: fill 170ms ease-in-out 0s; fill: transparent;"><path d="M48,22.1c-1.2,0.5-2.4,0.9-3.8,1c1.4-0.8,2.4-2.1,2.9-3.6c-1.3,0.8-2.7,1.3-4.2,1.6 C41.7,19.8,40,19,38.2,19c-3.6,0-6.6,2.9-6.6,6.6c0,0.5,0.1,1,0.2,1.5c-5.5-0.3-10.3-2.9-13.5-6.9c-0.6,1-0.9,2.1-0.9,3.3 c0,2.3,1.2,4.3,2.9,5.5c-1.1,0-2.1-0.3-3-0.8c0,0,0,0.1,0,0.1c0,3.2,2.3,5.8,5.3,6.4c-0.6,0.1-1.1,0.2-1.7,0.2c-0.4,0-0.8,0-1.2-0.1 c0.8,2.6,3.3,4.5,6.1,4.6c-2.2,1.8-5.1,2.8-8.2,2.8c-0.5,0-1.1,0-1.6-0.1c2.9,1.9,6.4,2.9,10.1,2.9c12.1,0,18.7-10,18.7-18.7 c0-0.3,0-0.6,0-0.8C46,24.5,47.1,23.4,48,22.1z"></path></g><g class="social-svg-mask" style="transition: fill 170ms ease-in-out 0s; fill: rgb(0, 172, 237);"><path d="M0,0v64h64V0H0z M44.7,25.5c0,0.3,0,0.6,0,0.8C44.7,35,38.1,45,26.1,45c-3.7,0-7.2-1.1-10.1-2.9 c0.5,0.1,1,0.1,1.6,0.1c3.1,0,5.9-1,8.2-2.8c-2.9-0.1-5.3-2-6.1-4.6c0.4,0.1,0.8,0.1,1.2,0.1c0.6,0,1.2-0.1,1.7-0.2 c-3-0.6-5.3-3.3-5.3-6.4c0,0,0-0.1,0-0.1c0.9,0.5,1.9,0.8,3,0.8c-1.8-1.2-2.9-3.2-2.9-5.5c0-1.2,0.3-2.3,0.9-3.3 c3.2,4,8.1,6.6,13.5,6.9c-0.1-0.5-0.2-1-0.2-1.5c0-3.6,2.9-6.6,6.6-6.6c1.9,0,3.6,0.8,4.8,2.1c1.5-0.3,2.9-0.8,4.2-1.6 c-0.5,1.5-1.5,2.8-2.9,3.6c1.3-0.2,2.6-0.5,3.8-1C47.1,23.4,46,24.5,44.7,25.5z"></path></g></svg></span></a>\n' +
            '               <a href="whatsapp://send?text=' + current_url_encoded + '" target="_blank" rel="nofollow noopener noreferrer" class="social-share-link" data-provider="Whatsapp" data-toggle="share-tooltip" title="Whatsapp"><span class="social-share-icon"><svg class="social-svg" viewBox="0 0 64 64" style="border-radius: 50%; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; fill-rule: evenodd;"><g class="social-svg-background" style="transition: fill 170ms ease-in-out 0s; fill: transparent;"><circle cx="32" cy="32" r="31"></circle></g><g class="social-svg-icon" style="transition: fill 170ms ease-in-out 0s; fill: transparent;"><path d="M 48 31.589844 C 48 40.195312 40.96875 47.175781 32.289062 47.175781 C 29.535156 47.175781 26.949219 46.472656 24.695312 45.234375 L 16 48 L 18.835938 39.636719 C 17.40625 37.289062 16.582031 34.53125 16.582031 31.589844 C 16.582031 22.980469 23.613281 16 32.289062 16 C 40.96875 16 48 22.980469 48 31.589844 Z M 32.289062 18.484375 C 25.007812 18.484375 19.082031 24.363281 19.082031 31.589844 C 19.082031 34.457031 20.019531 37.109375 21.597656 39.269531 L 19.949219 44.136719 L 25.023438 42.527344 C 27.109375 43.894531 29.609375 44.691406 32.292969 44.691406 C 39.574219 44.691406 45.5 38.816406 45.5 31.589844 C 45.5 24.363281 39.574219 18.484375 32.289062 18.484375 Z M 40.222656 35.179688 C 40.125 35.019531 39.871094 34.921875 39.484375 34.730469 C 39.101562 34.542969 37.207031 33.617188 36.855469 33.488281 C 36.5 33.363281 36.242188 33.296875 35.988281 33.679688 C 35.730469 34.0625 34.992188 34.921875 34.769531 35.179688 C 34.542969 35.433594 34.320312 35.464844 33.933594 35.273438 C 33.546875 35.082031 32.308594 34.679688 30.835938 33.378906 C 29.691406 32.367188 28.917969 31.117188 28.695312 30.734375 C 28.472656 30.351562 28.671875 30.144531 28.863281 29.953125 C 29.039062 29.78125 29.25 29.507812 29.441406 29.285156 C 29.636719 29.0625 29.699219 28.902344 29.828125 28.648438 C 29.957031 28.390625 29.890625 28.167969 29.792969 27.976562 C 29.699219 27.785156 28.925781 25.90625 28.605469 25.140625 C 28.285156 24.375 27.964844 24.503906 27.742188 24.503906 C 27.515625 24.503906 27.257812 24.472656 27.003906 24.472656 C 26.746094 24.472656 26.328125 24.566406 25.976562 24.949219 C 25.621094 25.332031 24.628906 26.257812 24.628906 28.136719 C 24.628906 30.015625 26.007812 31.832031 26.199219 32.085938 C 26.394531 32.34375 28.863281 36.324219 32.777344 37.855469 C 36.691406 39.386719 36.691406 38.875 37.398438 38.8125 C 38.105469 38.746094 39.675781 37.886719 40 36.996094 C 40.320312 36.101562 40.320312 35.335938 40.222656 35.179688 Z M 40.222656 35.179688"></path></g><g class="social-svg-mask" style="transition: fill 170ms ease-in-out 0s; fill: rgb(37, 211, 102);"><path d="M0,0v64h64V0H0z M 48 31.589844 C 48 40.195312 40.96875 47.175781 32.289062 47.175781 C 29.535156 47.175781 26.949219 46.472656 24.695312 45.234375 L 16 48 L 18.835938 39.636719 C 17.40625 37.289062 16.582031 34.53125 16.582031 31.589844 C 16.582031 22.980469 23.613281 16 32.289062 16 C 40.96875 16 48 22.980469 48 31.589844 Z M 32.289062 18.484375 C 25.007812 18.484375 19.082031 24.363281 19.082031 31.589844 C 19.082031 34.457031 20.019531 37.109375 21.597656 39.269531 L 19.949219 44.136719 L 25.023438 42.527344 C 27.109375 43.894531 29.609375 44.691406 32.292969 44.691406 C 39.574219 44.691406 45.5 38.816406 45.5 31.589844 C 45.5 24.363281 39.574219 18.484375 32.289062 18.484375 Z M 40.222656 35.179688 C 40.125 35.019531 39.871094 34.921875 39.484375 34.730469 C 39.101562 34.542969 37.207031 33.617188 36.855469 33.488281 C 36.5 33.363281 36.242188 33.296875 35.988281 33.679688 C 35.730469 34.0625 34.992188 34.921875 34.769531 35.179688 C 34.542969 35.433594 34.320312 35.464844 33.933594 35.273438 C 33.546875 35.082031 32.308594 34.679688 30.835938 33.378906 C 29.691406 32.367188 28.917969 31.117188 28.695312 30.734375 C 28.472656 30.351562 28.671875 30.144531 28.863281 29.953125 C 29.039062 29.78125 29.25 29.507812 29.441406 29.285156 C 29.636719 29.0625 29.699219 28.902344 29.828125 28.648438 C 29.957031 28.390625 29.890625 28.167969 29.792969 27.976562 C 29.699219 27.785156 28.925781 25.90625 28.605469 25.140625 C 28.285156 24.375 27.964844 24.503906 27.742188 24.503906 C 27.515625 24.503906 27.257812 24.472656 27.003906 24.472656 C 26.746094 24.472656 26.328125 24.566406 25.976562 24.949219 C 25.621094 25.332031 24.628906 26.257812 24.628906 28.136719 C 24.628906 30.015625 26.007812 31.832031 26.199219 32.085938 C 26.394531 32.34375 28.863281 36.324219 32.777344 37.855469 C 36.691406 39.386719 36.691406 38.875 37.398438 38.8125 C 38.105469 38.746094 39.675781 37.886719 40 36.996094 C 40.320312 36.101562 40.320312 35.335938 40.222656 35.179688 Z M 40.222656 35.179688"></path></g></svg></span></a>\n' +
            '               <a href="http://reddit.com/submit?url=' + current_url_encoded + '" target="_blank" rel="nofollow noopener noreferrer" class="social-share-link" data-provider="Reddit" data-toggle="share-tooltip" title="Reddit"><span class="social-share-icon"><svg class="social-svg" viewBox="0 0 64 64" style="border-radius: 50%; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; fill-rule: evenodd;"><g class="social-svg-background" style="transition: fill 170ms ease-in-out 0s; fill: transparent;"><circle cx="32" cy="32" r="31"></circle></g><g class="social-svg-icon" style="transition: fill 170ms ease-in-out 0s; fill: transparent;"><path d="M 53.34375 32 C 53.277344 30.160156 52.136719 28.53125 50.429688 27.839844 C 48.722656 27.148438 46.769531 27.523438 45.441406 28.800781 C 41.800781 26.324219 37.519531 24.957031 33.121094 24.863281 L 35.199219 14.878906 L 42.046875 16.320312 C 42.214844 17.882812 43.496094 19.09375 45.066406 19.171875 C 46.636719 19.253906 48.03125 18.183594 48.359375 16.644531 C 48.6875 15.105469 47.847656 13.558594 46.382812 12.992188 C 44.914062 12.425781 43.253906 13.007812 42.464844 14.367188 L 34.625 12.800781 C 34.363281 12.742188 34.09375 12.792969 33.871094 12.9375 C 33.648438 13.082031 33.492188 13.308594 33.441406 13.566406 L 31.070312 24.671875 C 26.617188 24.738281 22.277344 26.105469 18.59375 28.609375 C 17.242188 27.339844 15.273438 26.988281 13.570312 27.707031 C 11.863281 28.429688 10.746094 30.089844 10.71875 31.941406 C 10.691406 33.789062 11.757812 35.484375 13.441406 36.257812 C 13.402344 36.726562 13.402344 37.195312 13.441406 37.664062 C 13.441406 44.832031 21.792969 50.65625 32.097656 50.65625 C 42.398438 50.65625 50.753906 44.832031 50.753906 37.664062 C 50.789062 37.195312 50.789062 36.726562 50.753906 36.257812 C 52.363281 35.453125 53.371094 33.800781 53.34375 32 Z M 21.34375 35.199219 C 21.34375 33.433594 22.777344 32 24.542969 32 C 26.3125 32 27.742188 33.433594 27.742188 35.199219 C 27.742188 36.96875 26.3125 38.398438 24.542969 38.398438 C 22.777344 38.398438 21.34375 36.96875 21.34375 35.199219 Z M 39.9375 44 C 37.664062 45.710938 34.871094 46.582031 32.03125 46.464844 C 29.191406 46.582031 26.398438 45.710938 24.128906 44 C 23.847656 43.65625 23.871094 43.15625 24.183594 42.839844 C 24.5 42.527344 25 42.503906 25.34375 42.785156 C 27.269531 44.195312 29.617188 44.90625 32 44.800781 C 34.386719 44.929688 36.746094 44.242188 38.6875 42.847656 C 39.042969 42.503906 39.605469 42.511719 39.953125 42.863281 C 40.296875 43.21875 40.289062 43.785156 39.9375 44.128906 Z M 39.359375 38.527344 C 37.59375 38.527344 36.160156 37.09375 36.160156 35.328125 C 36.160156 33.5625 37.59375 32.128906 39.359375 32.128906 C 41.128906 32.128906 42.558594 33.5625 42.558594 35.328125 C 42.59375 36.203125 42.269531 37.054688 41.65625 37.6875 C 41.046875 38.316406 40.203125 38.664062 39.328125 38.65625 Z M 39.359375 38.527344"></path></g><g class="social-svg-mask" style="transition: fill 170ms ease-in-out 0s; fill: rgb(255, 69, 0);"><path d="M0,0v64h64V0H0z M 53.34375 32 C 53.277344 30.160156 52.136719 28.53125 50.429688 27.839844 C 48.722656 27.148438 46.769531 27.523438 45.441406 28.800781 C 41.800781 26.324219 37.519531 24.957031 33.121094 24.863281 L 35.199219 14.878906 L 42.046875 16.320312 C 42.214844 17.882812 43.496094 19.09375 45.066406 19.171875 C 46.636719 19.253906 48.03125 18.183594 48.359375 16.644531 C 48.6875 15.105469 47.847656 13.558594 46.382812 12.992188 C 44.914062 12.425781 43.253906 13.007812 42.464844 14.367188 L 34.625 12.800781 C 34.363281 12.742188 34.09375 12.792969 33.871094 12.9375 C 33.648438 13.082031 33.492188 13.308594 33.441406 13.566406 L 31.070312 24.671875 C 26.617188 24.738281 22.277344 26.105469 18.59375 28.609375 C 17.242188 27.339844 15.273438 26.988281 13.570312 27.707031 C 11.863281 28.429688 10.746094 30.089844 10.71875 31.941406 C 10.691406 33.789062 11.757812 35.484375 13.441406 36.257812 C 13.402344 36.726562 13.402344 37.195312 13.441406 37.664062 C 13.441406 44.832031 21.792969 50.65625 32.097656 50.65625 C 42.398438 50.65625 50.753906 44.832031 50.753906 37.664062 C 50.789062 37.195312 50.789062 36.726562 50.753906 36.257812 C 52.363281 35.453125 53.371094 33.800781 53.34375 32 Z M 21.34375 35.199219 C 21.34375 33.433594 22.777344 32 24.542969 32 C 26.3125 32 27.742188 33.433594 27.742188 35.199219 C 27.742188 36.96875 26.3125 38.398438 24.542969 38.398438 C 22.777344 38.398438 21.34375 36.96875 21.34375 35.199219 Z M 39.9375 44 C 37.664062 45.710938 34.871094 46.582031 32.03125 46.464844 C 29.191406 46.582031 26.398438 45.710938 24.128906 44 C 23.847656 43.65625 23.871094 43.15625 24.183594 42.839844 C 24.5 42.527344 25 42.503906 25.34375 42.785156 C 27.269531 44.195312 29.617188 44.90625 32 44.800781 C 34.386719 44.929688 36.746094 44.242188 38.6875 42.847656 C 39.042969 42.503906 39.605469 42.511719 39.953125 42.863281 C 40.296875 43.21875 40.289062 43.785156 39.9375 44.128906 Z M 39.359375 38.527344 C 37.59375 38.527344 36.160156 37.09375 36.160156 35.328125 C 36.160156 33.5625 37.59375 32.128906 39.359375 32.128906 C 41.128906 32.128906 42.558594 33.5625 42.558594 35.328125 C 42.59375 36.203125 42.269531 37.054688 41.65625 37.6875 C 41.046875 38.316406 40.203125 38.664062 39.328125 38.65625 Z M 39.359375 38.527344"></path></g></svg></span></a>\n' +
            '               <a href="mailto:?&subject=&body=' + current_url_encoded + '" target="_blank" rel="nofollow noopener noreferrer" class="social-share-link" data-provider="E-mail" data-toggle="share-tooltip" title="E-mail"><span class="social-share-icon"><svg class="social-svg" viewBox="0 0 64 64" style="border-radius: 50%; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; fill-rule: evenodd;"><g class="social-svg-background" style="transition: fill 170ms ease-in-out 0s; fill: transparent;"><circle cx="32" cy="32" r="31"></circle></g><g class="social-svg-icon" style="transition: fill 170ms ease-in-out 0s; fill: transparent;"><path d="M17,22v20h30V22H17z M41.1,25L32,32.1L22.9,25H41.1z M20,39V26.6l12,9.3l12-9.3V39H20z"></path></g><g class="social-svg-mask" style="transition: fill 170ms ease-in-out 0s; fill: rgb(127, 127, 127);"><path d="M41.1,25H22.9l9.1,7.1L41.1,25z M44,26.6l-12,9.3l-12-9.3V39h24V26.6z M0,0v64h64V0H0z M47,42H17V22h30V42z"></path></g></svg></span></a>\n' +
            '               <a href="fb-messenger://share/?link=' + current_url_encoded + '" target="_blank" rel="nofollow noopener noreferrer" class="social-share-link" data-provider="Messenger" data-toggle="share-tooltip" title="Messenger"><span class="social-share-icon"><svg viewBox="0 0 64 64" width="40" height="40"><circle cx="32" cy="32" r="31" fill="#2196F3"></circle><path d="M 53.066406 21.871094 C 52.667969 21.339844 51.941406 21.179688 51.359375 21.496094 L 37.492188 29.058594 L 28.867188 21.660156 C 28.339844 21.207031 27.550781 21.238281 27.054688 21.730469 L 11.058594 37.726562 C 10.539062 38.25 10.542969 39.09375 11.0625 39.613281 C 11.480469 40.027344 12.121094 40.121094 12.640625 39.839844 L 26.503906 32.28125 L 35.136719 39.679688 C 35.667969 40.132812 36.457031 40.101562 36.949219 39.609375 L 52.949219 23.613281 C 53.414062 23.140625 53.464844 22.398438 53.066406 21.871094 Z M 53.066406 21.871094" fill="white"></path></svg></span></a>\n' +
            '            </div>\n' +
            '            <div style="display: flex;"><input type="text" class="form-control" id="share-link" value="' + current_url + '" style="flex: 1;" readonly="readonly" onClick="this.setSelectionRange(0, this.value.length)"><button type="button" class="copy-share-link btn btn-primary">Copy</button></div>' +
            '            <div class="copied-container"><div class="copied-info">Copied!</div></div>\n' +
            '            </div>\n' +
            '            <div class="overlay-footer">\n' +
            '                <div style="flex: 1; text-align: right;">\n' +
            '                    <a href="#" class="close-overlay">Close</a>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <svg class="overlay-close close-overlay" width="20px" height="20px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
            '               <title>Close</title>\n' +
            '               <g stroke="none" stroke-width="3" fill="none" fill-rule="evenodd">\n' +
            '                   <g transform="translate(-240.000000, -384.000000)">\n' +
            '                      <rect x="240" y="384" width="24" height="24"></rect>\n' +
            '                  </g>\n' +
            '                  <g transform="translate(-240.000000, -384.000000)" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round">\n' +
            '                      <g transform="translate(240.000000, 384.000000)">\n' +
            '                          <line x1="0.5" y1="0.5" x2="23.5" y2="23.5"></line>\n' +
            '                          <line x1="23.5" y1="0.5" x2="0.5" y2="23.5"></line>\n' +
            '                      </g>\n' +
            '                  </g>\n' +
            '                  <g transform="translate(-240.000000, -576.000000)"></g>\n' +
            '               </g>\n' +
            '            </svg>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <div class="overlay overlay-background content_block"></div>');

        $('[data-toggle="share-tooltip"]').tooltip({
            container: '.social-share-links'
        });

        $('#dislike-feedback').html('<div class="overlay-container">\n' +
            '        <div class="overlay-inner-background"><form>\n' +
            '            <div class="overlay-head">Thanks!</div>\n' +
            '            <div>\n' +
            '            <p>Thanks for your rating. Your feedback helps us to improve LittleGames.</p>\n' +
            '            <p>Please tell us why ' + game_title + ' deserves a downvote:</p>\n' +
            '            <fieldset id="feedback-reason">\n' +
            '            <div><input type="radio" id="dont-like-it" name="feedback-reason" class="form-check-input" value="dont-like-it" required><label for="dont-like-it">I don\'t like it</label></div>\n' +
            '            <div><input type="radio" id="isnt-loading" name="feedback-reason" class="form-check-input" value="isnt-loading" required><label for="isnt-loading">It isn\'t loading</label></div>\n' +
            '            <div id="isnt-loading-notice">When a game doesn\'t load, an ad blocker is often the problem. Please deactivate your ad blocker and then reload the page!</div>\n' +
            '            <div><input type="radio" id="bugs" name="feedback-reason" class="form-check-input" value="bugs" required><label for="bugs">It has bugs</label></div>\n' +
            '            <div><input type="radio" id="other" name="feedback-reason" class="form-check-input" value="other" required><label for="other">Other</label></div></fieldset>\n' +
            '            </div>\n' +
            '            <div><textarea class="form-control feedback-text" placeholder="Feedback"></textarea></div>\n' +
            '            <div class="overlay-footer">\n' +
            '                <div style="flex: 1; text-align: right;">\n' +
            '                    <a href="#" class="close-overlay" style="margin-right: 10px;">Cancel</a>\n' +
            '                    <button type="submit" href="#" id="send-dislike-feedback" class="cn-button bootstrap button">Submit Feedback</button>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <svg class="overlay-close close-overlay" width="20px" height="20px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
            '               <title>Close</title>\n' +
            '               <g stroke="none" stroke-width="3" fill="none" fill-rule="evenodd">\n' +
            '                   <g transform="translate(-240.000000, -384.000000)">\n' +
            '                      <rect x="240" y="384" width="24" height="24"></rect>\n' +
            '                  </g>\n' +
            '                  <g transform="translate(-240.000000, -384.000000)" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round">\n' +
            '                      <g transform="translate(240.000000, 384.000000)">\n' +
            '                          <line x1="0.5" y1="0.5" x2="23.5" y2="23.5"></line>\n' +
            '                          <line x1="23.5" y1="0.5" x2="0.5" y2="23.5"></line>\n' +
            '                      </g>\n' +
            '                  </g>\n' +
            '                  <g transform="translate(-240.000000, -576.000000)"></g>\n' +
            '               </g>\n' +
            '            </svg>\n' +
            '        </form></div>\n' +
            '    </div>\n' +
            '    <div class="overlay overlay-background content_block"></div>');
    }

    function framingAcceptedText() {
        return 'You have consented to the integration of third party content. <a href=\"#\" id=\"disable-framing\">Deactivate integration</a>';
    }

    function framingDeclinedText() {
        return 'You have not consented to the integration of third party content. <a href=\"#\" id=\"enable-framing\">Activate integration</a>';
    }

    if(window.framingContentAllowed) {
        $('#framing-consent-settings').html(framingAcceptedText());
    } else {
        $('#framing-consent-settings').html(framingDeclinedText());
    }

    $( document ).on( 'click', '#disable-framing', function() {
        event.preventDefault();
        window.framingContentAllowed = false;
        Cookies.remove('framing_allowed');
        alert('Setting saved');
        $('#framing-consent-settings').html(framingDeclinedText());
    });

    $( document ).on( 'click', '#enable-framing', function() {
        event.preventDefault();
        window.framingContentAllowed = true;
        Cookies.set('framing_allowed', true, { expires: 365 })
        alert('Setting saved');
        $('#framing-consent-settings').html(framingAcceptedText());
    });

    function framingVideoAcceptedText() {
        return 'You have consented to the integration of third party video content. <a href=\"#\" id=\"disable-video-framing\">Deactivate integration</a>';
    }

    function framingVideoDeclinedText() {
        return 'You have not consented to the integration of third party video content. <a href=\"#\" id=\"enable-video-framing\">Activate integration</a>';
    }

    if(window.framingVideoContentAllowed) {
        $('#framing-video-consent-settings').html(framingVideoAcceptedText());
    } else {
        $('#framing-video-consent-settings').html(framingVideoDeclinedText());
    }

    $( document ).on( 'click', '#disable-video-framing', function() {
        event.preventDefault();
        window.framingVideoContentAllowed = false;
        Cookies.remove('framing_video_allowed');
        alert('Setting saved');
        $('#framing-video-consent-settings').html(framingVideoDeclinedText());
    });

    $( document ).on( 'click', '#enable-video-framing', function() {
        event.preventDefault();
        window.framingVideoContentAllowed = true;
        Cookies.set('framing_video_allowed', true, { expires: 365 })
        alert('Setting saved');
        $('#framing-video-consent-settings').html(framingVideoAcceptedText());
    });

    window.requestFullConsent = true;
    var requestFullConsentGet = window.getUrlParameter('full-consent');
    if(requestFullConsentGet) {
        window.requestFullConsent = true;
        Cookies.set('request_full_consent', true, { expires: 365 })
    }

    var deleteFullConsentGet = window.getUrlParameter('default-consent');
    if(deleteFullConsentGet) {
        window.requestFullConsent = false;
        Cookies.remove('request_full_consent');
    }

    function loadStatisticsScripts() {

        /* console.log('loading statistics scripts'); */
        if(window.statisticsCookiesAllowed) {
            /* Own Statistics */

            /* Google Analytics */
            /*
            if(!document.domain.match(/gfseodev/)) {
                var s = document.createElement("script");
                s.type = "text/javascript";
                s.src = "https://www.googletagmanager.com/gtag/js?id=UA-168989024-1";
                s.id = "script_google_analytics";
                $("head").append(s);
                window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-168989024-1', { 'anonymize_ip': true });
            } else {
                console.log('analytics not loaded because on dev environment');
            }
            */

        }

    }

    function loadFramingContent() {

        console.log('loading framing content');
        if(window.framingContentAllowed) {

            if(typeof window.sessionId == 'undefined') {
                function uniqueID(){
                    function chr4(){
                        return Math.random().toString(16).slice(-4);
                    }
                    return Date.now() + '-' + chr4() + chr4() + '-' + chr4() + '-' + chr4() + '-' + chr4() + '-' + chr4() + chr4() + chr4();
                }
                window.sessionId = uniqueID();
                Cookies.set('lg_session', window.sessionId)
            }

            $('.game-loading').css('display', 'flex');
            $('#game-cookie-consent').css('display', 'none');
            $('#game-iframe-container').css('display', 'block');
            setGameIFrame();
        } else {
            $('.game-loading').css('display', 'none');
            $('#game-cookie-consent').css('display', 'block');
            $('#game-iframe-container').css('display', 'none');
        }

    }

    function loadFramingVideoContent() {

        console.log('loading framing video content');
        if(window.framingVideoContentAllowed) {
            $('#game-walkthrough-cookie-consent').css('display', 'none');
            $('#game-video-iframe-container').css('display', 'block');
            window.initTubia();
        } else {
            $('#game-walkthrough-cookie-consent').css('display', 'block');
            $('#game-video-iframe-container').css('display', 'none');
        }

    }

    function loadScripts() {
        loadStatisticsScripts();
        if(typeof window.gameId !== 'undefined') {
            window.loadMarketingScripts(md);
            loadFramingContent();
            loadFramingVideoContent();
        }
    }

    $( ".cn-reject-all-cookies" ).click(function() {
        $("#cookie-notice-full-consent").css("display", "none");

        //Cookies.set('statistics_allowed', true, { expires: 365 })
        Cookies.set('marketing_allowed', false, { expires: 30 })
        //window.statisticsCookiesAllowed = true;
        window.marketingCookiesAllowed = false;

        Cookies.set('cookie_notice_full_consent_accepted', true, { expires: 365 })
        window.cookieNoticeFullConsentClicked = false;

        window.framingContentAllowed = false;
        Cookies.set('framing_allowed', false, { expires: 30 })

        window.framingVideoContentAllowed = false;
        Cookies.set('framing_video_allowed', false, { expires: 30 })

        loadScripts();
    });

    $( ".cn-accept-all-cookies" ).click(function() {
        $("#cookie-notice-full-consent").css("display", "none");

        //Cookies.set('statistics_allowed', true, { expires: 365 })
        Cookies.set('marketing_allowed', true, { expires: 365 })
        //window.statisticsCookiesAllowed = true;
        window.marketingCookiesAllowed = true;

        Cookies.set('cookie_notice_full_consent_accepted', true, { expires: 365 })
        window.cookieNoticeFullConsentClicked = true;

        window.framingContentAllowed = true;
        Cookies.set('framing_allowed', true, { expires: 365 })

        window.framingVideoContentAllowed = true;
        Cookies.set('framing_video_allowed', true, { expires: 365 })

        loadScripts();
    });

    if(window.requestFullConsent === true) {
        if(typeof Cookies.get('statistics_allowed') == "undefined") {
            window.statisticsCookiesAllowed = false;
        }
        if(typeof Cookies.get('marketing_allowed') == "undefined") {
            window.marketingCookiesAllowed = false;
        } else {
            $(".cn-marketing-cookies-checkbox").prop('checked', true)
        }

        if(typeof window.cookieNoticeFullConsentClicked == "undefined" || window.cookieNoticeFullConsentClicked === false) {

            if(typeof window.gameId !== 'undefined' || window.location.href === 'https://gameforge.com/en-US/littlegames/') {
                $("#cookie-notice-full-consent").css("display", "block");
            }

            $( ".cn-accept-selected-cookies" ).click(function() {
                $(".cn-full-consent").css("display", "none");

                Cookies.set('statistics_allowed', $(".cn-statistics-cookies-checkbox").prop('checked'), { expires: 365 })
                Cookies.set('marketing_allowed', $(".cn-marketing-cookies-checkbox").prop('checked'), { expires: 365 })
                window.statisticsCookiesAllowed = $(".cn-statistics-cookies-checkbox").prop('checked');
                window.marketingCookiesAllowed = $(".cn-marketing-cookies-checkbox").prop('checked');

                Cookies.set('cookie_notice_full_consent_accepted', true, { expires: 365 })
                window.cookieNoticeFullConsentClicked = true;
                loadScripts();
            });
        }

    } else {
        if(typeof Cookies.get('statistics_allowed') == "undefined") {
            window.statisticsCookiesAllowed = true;
        }
        if(typeof Cookies.get('marketing_allowed') == "undefined") {
            window.marketingCookiesAllowed = true;
        }

        console.log('statisticsCookiesAllowed');
        console.log(window.statisticsCookiesAllowed);
        console.log('marketingCookiesAllowed');
        console.log(window.marketingCookiesAllowed);

        if(typeof window.cookieNoticeClicked == "undefined" || window.cookieNoticeClicked === false) {
            $(".cn-consent").css("display", "block");

            $( ".cn-accept-cookies" ).click(function() {
                $(".cn-consent").css("display", "none");

                Cookies.set('cookie_notice_accepted', true, { expires: 365 })
                window.cookieNoticeClicked = true;

            });
        }
    }

    loadScripts();

    $( "#cn-delete-cookies" ).click(function(event) {
        Cookies.remove('cookie_notice_accepted');
        Cookies.remove('cookie_notice_full_consent_accepted');
        Cookies.remove('statistics_allowed');
        Cookies.remove('marketing_allowed');
        Cookies.remove('framing_allowed');
        Cookies.remove('framing_video_allowed');

        alert('Cookies successfully deleted!');

        window.statisticsCookiesAllowed = false;
        window.marketingCookiesAllowed = false;
        $(".cn-settings-statistics-cookies-checkbox").prop('checked', window.statisticsCookiesAllowed);
        $(".cn-settings-marketing-cookies-checkbox").prop('checked', window.marketingCookiesAllowed);
        $("#cookie-notice-full-consent").css("display", "block");
        event.preventDefault();
    });

    $( "#cn-cookie-settings, .cn-cookie-settings" ).click(function(event) {

        window.scrollTo(0, 0);

        $(".cn-settings-statistics-cookies-checkbox").prop('checked', window.statisticsCookiesAllowed);
        $(".cn-settings-marketing-cookies-checkbox").prop('checked', window.marketingCookiesAllowed);

        $("#cookie-settings").css("display", "block");
    });

    $( ".close-overlay" ).click(function(event) {
        event.preventDefault();
        $(".outer-overlay-container").css("display", "none");
    });

    $( "#cn-cookie-settings-save" ).click(function(event) {

        event.preventDefault();

        $("#cookie-notice-full-consent").css("display", "none");
        $(".cn-consent").css("display", "none");

        //Cookies.set('statistics_allowed', $(".cn-settings-statistics-cookies-checkbox").prop('checked'), { expires: 365 })
        //window.statisticsCookiesAllowed = $(".cn-settings-statistics-cookies-checkbox").prop('checked')

        Cookies.set('marketing_allowed', $(".cn-settings-marketing-cookies-checkbox").prop('checked'), { expires: 365 })
        window.marketingCookiesAllowed = $(".cn-settings-marketing-cookies-checkbox").prop('checked');

        if(typeof window.marketinCookiesAllowed === 'undefined') {
            Cookies.remove('framing_allowed');
        }

        $(".cn-full-consent").css("display", "none");
        if(window.requestFullConsent) {
            Cookies.set('cookie_notice_full_consent_accepted', true, { expires: 365 })
        } else {
            Cookies.set('cookie_notice_accepted', true, { expires: 365 })
        }
        loadScripts();

        $("#cookie-settings").css("display", "none");
    });

    $( ".like-game" ).click(function(event) {

        game_liked = !game_liked;
        if(game_liked) {

            if(typeof Cookies.get('game-liked-' + window.gameId) == "undefined") {
                Cookies.set('game-liked-' + window.gameId, true, { expires: 365 });
            }

            $(".like-game svg > g > g:nth-child(2)").css("stroke", "#6BF8FF");

            if(typeof window.gameId !== 'undefined' && typeof Cookies.get('game-liked-perm-' + window.gameId) == "undefined") {
                window.logAction('like');
                Cookies.set('game-liked-perm-' + window.gameId, true, { expires: 365 });
            }
        }
        else {
            Cookies.remove('game-liked-' + window.gameId);
            $(".like-game svg > g > g:nth-child(2)").css("stroke", "#FFF");
        }

        if(game_disliked) {
            game_disliked = false;
            Cookies.remove('game-disliked-' + window.gameId);
            $(".dislike-game svg > g > g:nth-child(2)").css("stroke", "#FFF");
        }
    });

    $( ".dislike-game" ).click(function(event) {

        game_disliked = !game_disliked;
        if(game_disliked) {

            if(typeof Cookies.get('game-disliked-' + window.gameId) == "undefined") {
                Cookies.set('game-disliked-' + window.gameId, true, { expires: 365 });
            }
            $(".dislike-game svg > g > g:nth-child(2)").css("stroke", "#6BF8FF");

            if(typeof window.gameId !== 'undefined' && typeof Cookies.get('game-disliked-perm-' + window.gameId) == "undefined") {
                window.logAction('dislike');
                Cookies.set('game-disliked-perm-' + window.gameId, true, { expires: 365 });
            }

            window.scrollTo(0, 0);
            $("#dislike-feedback").css("display", "block");
        }
        else {
            Cookies.remove('game-disliked-' + window.gameId);
            $(".dislike-game svg > g > g:nth-child(2)").css("stroke", "#FFF");
        }

        if(game_liked) {
            game_liked = false;
            Cookies.remove('game-liked-' + window.gameId);
            $(".like-game svg > g > g:nth-child(2)").css("stroke", "#FFF");
        }

    });

    $( "#feedback-reason div" ).click(function(event) {
        $(".feedback-text").css("display", "block");

        if(event.target.id === 'isnt-loading'){
            $("#isnt-loading-notice").css("display", "block");
        }
        else{
            $("#isnt-loading-notice").css("display", "none");
        }
    });

    $( "#send-dislike-feedback" ).click(function(event) {

        var feedback_reason = $( "input[name='feedback-reason']:checked" ).val();
        var feedback_text = $( ".feedback-text" ).val();

        if(feedback_reason == 'other') {
            $(".feedback-text").prop('required', true);
        } else {
            $(".feedback-text").prop('required', false);
            if(typeof feedback_reason !== 'undefined') {
                event.preventDefault();
            }
        }

        if(typeof window.gameId !== 'undefined') {

            if((feedback_reason == 'other' && feedback_text !== '' && feedback_text !== null) || (typeof feedback_reason !== 'undefined' && feedback_reason !== 'other')) {

                window.logAction('dislike-feedback', {
                    reason: feedback_reason,
                    text: feedback_text
                });

                $("#dislike-feedback").css("display", "none");
                $("input[name='feedback-reason']:checked").removeAttr("checked");
                $( ".feedback-text" ).val('');
                event.preventDefault();
            }
        }

    });

    $( ".share-game" ).click(function(event) {

        window.scrollTo(0, 0);
        $("#share-game").css("display", "block");

        window.logAction('share-game');
    });

    $( ".social-share-link" ).click(function(event) {

        window.logAction('share-link-clicked', {
            provider: $( this ).data( "provider" )
        });

    });

    $( ".copy-share-link" ).click(function(event) {
        copyToClipboard(current_url);

        $(".copied-info").fadeIn(function(){ $(".copied-info").fadeOut(); });
        window.logAction('share-link-copied');
    });

    $( ".overlay-background" ).click(function(event) {
        $(".outer-overlay-container").css("display", "none");
    });

    var vertical_enabled = false;
    var cinema_enabled = false;

    if (document.addEventListener)
    {
        document.addEventListener('fullscreenchange', exitHandler, false);
        document.addEventListener('mozfullscreenchange', exitHandler, false);
        document.addEventListener('MSFullscreenChange', exitHandler, false);
        document.addEventListener('webkitfullscreenchange', exitHandler, false);
    }

    function exitHandler()
    {
        if (document.webkitIsFullScreen === false)
        {
            fullscreenExit();
        }
        else if (document.mozFullScreen === false)
        {
            fullscreenExit();
        }
        else if (document.msFullscreenElement === false)
        {
            fullscreenExit();
        }
    }

    $( '.play-game-btn, .play-img' ).click(function() {
        var href = $(this).data('href');
        var width = $(window).width();
        var height = $(window).height();
        var gameCode = decodeURIComponent($( this ).data( 'game-code' ));
        if(typeof gameCode === 'undefined' || gameCode === 'undefined' || gameCode === null || gameCode === '') {
            var gameCode = decodeURIComponent($( this ).data( 'link' ));
        }
        var gameCodeProtocol = gameCode.substring(0, 4);

        if(gameCodeProtocol === 'http') {
            if(href === '_self') {
                setGameIFrame();
            } else if(href === '_redirect') {
                window.location.href = gameCode;
            } else {
                window.open(gameCode,'window','toolbar=yes, menubar=yes, resizable=yes, top=0, left=0, width=' + width + ', height=' + height + '');
            }
        } else {
            setGameIFrame();
        }

        var cookie_consent = $(this).data('cookie-consent');
        if(cookie_consent == 'yes') {
            window.framingContentAllowed = true;
            Cookies.set('framing_allowed', true, { expires: 365 })
            loadFramingContent();
        }
    });

    $(".game").hover(
        function() {
            if($('.game-video', this).length > 0) {
                if ($('.game-video', this).is(':empty')) {
                    $('.game-video', this).html('<video preload="none" loop autoplay muted playsinline poster="' + $('.game-video', this).data('poster') + '"><source src="' + $('.game-video', this).data('video') + '" type="video/mp4"></video>');
                }

                var playPromise = $('.game-video video', this).get(0).play();
                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        $('video', this).css('display', 'block');
                        $('video', this).css('zIndex', '40');
                        $('img', this).css('display', 'none');
                    })
                    .catch(error => {
                    });
                }
            }
        }, function() {
            if($('.game-video', this).length > 0) {
                    $('video', this).css('display', 'none');
                    $('video', this).css('zIndex', '10');
                    $('video', this).get(0).pause();
                    $('video', this).currentTime = 0;
                    $('img', this).css('display', 'block');
            }
        }
    );

    $( '.play-walkthrough-btn, .play-walkthrough-img' ).click(function() {

        var cookie_consent = $(this).data('cookie-consent');
        if(cookie_consent == 'yes') {
            window.framingVideoContentAllowed = true;
            Cookies.set('framing_video_allowed', true, { expires: 365 })
            loadFramingVideoContent();
        }
    });

    function requestFullScreen(element) {
        var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
            (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
            (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
            (document.msFullscreenElement && document.msFullscreenElement !== null);

        var docElm = document.documentElement;
        if (!isInFullScreen) {
            // Supports most browsers and their versions.
            var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

            if (requestMethod) { // Native full screen.
                requestMethod.call(element);
            } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
                var wscript = new ActiveXObject("WScript.Shell");
                if (wscript !== null) {
                    wscript.SendKeys("{F11}");
                }
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    $( '.fullscreen' ).click(function() {

        var elem = document.body; // Make the body go full screen.
        requestFullScreen(elem);

        $('#first-content-below, #first-sidebar, #masthead, .site-footer, .cinema').css('display', 'none');

        $('.container').attr('style', 'max-width: 100% !important');
        $('.container').css('padding-right', '0');
        $('.container').css('padding-left', '0');
        $('#content.site-content').css('padding-bottom', '2rem');
        $('.game-content').css('padding-top', '0');
        $('.game-content').css('width', '100%');
        $('.game-content').css('max-width', '100%');
        $('.game-left').css('width', '100%');
        $('.game-left').css('max-width', '100%');
        $('#content').css('padding-top', '0');
        $('.game-container').attr('style', 'height: 100% !important');
        $('#page, #content, .container, .row, .content-area, #main, .game-content, .game-left').css('height', '100%');

        window.logAction('fullscreen-enabled');
    });

    function fullscreenExit() {

        $('#first-content-below, #first-sidebar, #masthead, .site-footer, .cinema').css('display', 'block');
        $('.cinema').css('display', 'inline-block');

        $('.container').attr('style', 'max-width: auto;');
        $('.container').css('padding-right', '15px');
        $('.container').css('padding-left', '15px');
        $('.game-content').css('padding-top', '25px');
        $('#content').css('padding-top', '57px');
        $('.game-container').attr('style', 'height: 624px;');
        $('#page, #content, .container, .row, .content-area, #main, .game-content, .game-left').css('height', 'auto');

        cinemaMode();
    }

    $( '.vertical' ).click(function() {
        vertical_enabled = !vertical_enabled;
        verticalMode();
    });

    function verticalMode() {

        if(cinema_enabled) {
            cinema_enabled = !cinema_enabled;
            $('#content').css('background-color', 'transparent');
            $('#content.site-content').css('padding-bottom', '2rem');
            $('#first-content-below').css('display', 'block');
            $('#first-sidebar').css('display', 'block');
            $('.cinema-on-img').css('display', 'inline-block');
            $('.cinema-off-img').css('display', 'none');

            $('#cloned-site-content').remove();
        }

        if(vertical_enabled) {
            $('.game-container').attr('style', 'height: 750px; width: 440px;');
            $('.game-bar-below').attr('style', 'width: 440px;');

            window.logAction('vertical-mode-enabled');
        } else {
            $('.game-container').attr('style', 'height: 624px; width: 100%;');
            $('.game-bar-below').attr('style', 'width: 100%;');
        }
    }

    $( '.cinema' ).click(function() {
        cinema_enabled = !cinema_enabled;
        cinemaMode();
    });

    function cinemaMode() {

        if(vertical_enabled) {
            vertical_enabled = !vertical_enabled;
        }

        if(cinema_enabled) {
            $('.sidebar-aslots.gads-loaded').css('margin-top', '80px');
            $('#content').css('background-color', '#000');
            $('#content.site-content').css('padding-bottom', '0');
            $('#first-content-below').css('display', 'none');
            $('#first-sidebar').css('display', 'none');
            $('.cinema-on-img').css('display', 'none');
            $('.cinema-off-img').css('display', 'inline-block');
            $('.game-container').attr('style', 'height: 680px;');
            $('.game-bar-below').attr('style', 'width: 100%;');
            $('.game-left').css('max-width', 'none');

            if($( "#cloned-site-content" ).length <= 0) {
                $( "#content" ).after( '<div id="cloned-site-content" class="site-content">' +
                    '<div class="container">' +
                    '<div class="row">' +
                    '<section id="primary" class="content-area">' +
                    '<main id="main" class="site-main" role="main">' +
                    '<div class="game-content">' +
                    '<div class="game-left">' + $('#first-content-below').html() + '</div>' +
                    '<div id="first-sidebar" class="sidebar">' +
                    '<div class="sidebar-content">' + $('#first-sidebar').html() + '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' );
            }

            window.logAction('cinema-enabled');
        } else {
            $('.sidebar-aslots.gads-loaded').css('margin-top', '0px');
            $('#content').css('background-color', 'transparent');
            $('#content.site-content').css('padding-bottom', '2rem');
            $('#first-content-below').css('display', 'block');
            $('#first-sidebar').css('display', 'block');
            $('.cinema-on-img').css('display', 'inline-block');
            $('.cinema-off-img').css('display', 'none');
            $('.game-container').attr('style', 'height: 624px;');
            $('.game-left').css('max-width', '1340px');

            $('#cloned-site-content').remove();
        }
    }

    function setGameIFrame() {
        if(gameCode.match(/gamedistribution\.com/)) {
            if(window.marketingCookiesAllowed) {
                gameCode = gameCode + '?gdpr-targeting=1'
            } else {
                gameCode = gameCode + '?gdpr-targeting=0'
            }
        }
        var gameCodeProtocol = gameCode.substring(0, 4);
        if(gameCodeProtocol === 'http') {
            $('#game-iframe-container').html('<iframe id="game-iframe" name="game-iframe" class="iframe-container" src="' + gameCode + '"  scrolling="no" height="100%" width="100%" frameborder="0" allowtransparency="true" allow="autoplay; fullscreen" allowfullscreen="allowfullscreen"></iframe>');
        } else {
            $('#game-iframe-container').html(gameCode);
        }
    }

        if(typeof window.gameId !== 'undefined') {
        var playtimeCount = 0;
        var playtimeInterval = setInterval(function() {
            $.post( window.apiEndpoint + '/api/playtime/', {
                'project_id': window.projectId,
                'game_id': window.gameId,
                'session_id': window.sessionId,
                'origin': window.origin,
                'screen_width': screen.width,
                'screen_height': screen.height,
                'mobile': window.md.mobile(),
                'phone': window.md.phone(),
                'tablet': window.md.tablet(),
            } );
            if (++playtimeCount === 180) {
                window.clearInterval(playtimeInterval);
            }
        }, 60 * 1000);
    }

    if(typeof window.categoryId !== 'undefined') {
        $.post( window.apiEndpoint + '/api/analytics/categories/', {
            'project_id': window.projectId,
            'category_id': window.categoryId,
            'session_id': window.sessionId,
            'origin': window.origin,
            'screen_width': screen.width,
            'screen_height': screen.height,
            'mobile': window.md.mobile(),
            'phone': window.md.phone(),
            'tablet': window.md.tablet(),
        } );
    }
        var random_games = window.getPromotionGames(2);
    for (var i = 0; i < random_games.length; i++) {
        $('.more-games-promotion-game.promotion-slot' + (i + 1)).html('<img data-url="' + random_games[i].link + '" src="https://gameforge.com/en-US/littlegames/content/themes/casual/custom/img/promotion/' + random_games[i].img_title + '_348x164.jpg" srcset="https://gameforge.com/en-US/littlegames/content/themes/casual/custom/img/promotion/' + random_games[i].img_title + '_348x164.jpg 1x, https://gameforge.com/en-US/littlegames/content/themes/casual/custom/img/promotion/' + random_games[i].img_title + '_696x328.jpg 2x"  alt="' + random_games[i].title + '" title="' + random_games[i].title + '" loading="lazy"><div class="label">Ad</div>');
    }

    $( document ).on( 'click', '.more-games-promotion-game img', function() {
        if(typeof $(this).data('url') !== 'undefined') {
            window.open($(this).data('url'), '_blank');
        }
    });

    window.logAction = function logAction(action, metadata) {
        $.post( window.apiEndpoint + '/api/log/', {
            'project_id': window.projectId,
            'game_id': window.gameId,
            'session_id': window.sessionId,
            'origin': window.origin,
            'screen_width': screen.width,
            'screen_height': screen.height,
            'mobile': window.md.mobile(),
            'phone': window.md.phone(),
            'tablet': window.md.tablet(),
            'action': action,
            'metadata': metadata
        } );
    }

    var matomo_enabled = true;

    // if(matomo_enabled) {
    //     var _paq = window._paq = window._paq || [];
    //         _paq.push(["setDoNotTrack", true]);
    //         _paq.push(["disableCookies"]);
    //         _paq.push(['trackPageView']);
    //         _paq.push(['enableLinkTracking']);
    //         (function() {
    //             var u="https://analytics-live.gameforge.com/";
    //             _paq.push(['setTrackerUrl', u+'matomo.php']);
    //             _paq.push(['setSiteId', '3']);
    //             var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    //             g.type='text/javascript'; g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
    //         }
    //     )();
    // }

});
