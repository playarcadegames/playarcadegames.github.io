window.jQuery(document).ready(function($){

        var userLang = navigator.language || navigator.userLanguage;
    window.getPromotionGames = function(n = 1) {
        var promotion_games = [{
                'img_title': 'aion',
                'video_title': 'aion',
                'title': 'Aion',
                'link': 'https://gameforge.com/play/aion'
            },
            {
                'img_title': 'elsword',
                'video_title': 'elsword',
                'title': 'Elsword',
                'link': 'https://gameforge.com/play/elsword'
            },
            {
                'img_title': 'metin2',
                'video_title': 'metin2',
                'title': 'Metin2',
                'link': 'https://gameforge.com/play/metin2'
            },
            {
                'img_title': 'nostale',
                'video_title': 'nostale',
                'title': 'Nostale',
                'link': 'https://gameforge.com/play/nostale'
            },
            {
                'img_title': 'rom',
                'video_title': 'rom',
                'title': 'Runes of Magic',
                'link': 'https://gameforge.com/play/runes_of_magic'
            },
            {
                'img_title': 'tera',
                'video_title': 'tera',
                'title': 'TERA',
                'link': 'https://gameforge.com/play/tera'
            },
            {
                'img_title': 'wizard101',
                'video_title': 'wizard101',
                'title': 'Wizard101',
                'link': 'https://gameforge.com/play/wizard101'
            },
            {
                'img_title': 'ikariam',
                'video_title': 'ikariam',
                'title': 'Ikariam',
                'link': 'https://gameforge.com/play/ikariam'
            },
            {
                'img_title': 'ogame',
                'video_title': 'ogame',
                'title': 'OGame',
                'link': 'https://gameforge.com/play/ogame'
            }
        ];

        if(typeof window.origin === 'undefined' || window.origin === null || window.origin === '' || window.origin === 'littlegames') {
            var promotion_games_length = promotion_games.length;
            for (var i = 0; i < promotion_games_length; i++) {
                /*
                * Old kid with affiliate id TNT: c-00000-a9f00-2012-022770e5
                * New kid with affiliate id littlegames: c-00000-aal00-2012-022770e6
                */
                promotion_games[i].link += '?kid=c-00000-aal00-2012-022770e6';
            }
        }

        var result = new Array(n),
            len = promotion_games.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = promotion_games[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function areCookiesEnabled() {
        try {
          document.cookie = 'cookietest=1';
          var cookiesEnabled = document.cookie.indexOf('cookietest=') !== -1;
          document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
          return cookiesEnabled;
        } catch (e) {
          return false;
        }
    }

    function selectAd(mobileDetection) {

        /*
            $('.sidebar-aslot-300x250').html('<div style="width: 300px; height: 250px; margin: 0 auto; background-color: orange;"></div>');
            $('.sidebar-aslot-300x600').html('<div style="width: 300px; height: 600px; margin: 0 auto; background-color: orange;"></div>');
            $('.below-game-aslot-728x90').html('<div style="width: 728px; height: 90px; margin: 0 auto; background-color: orange;"></div>');
            $('.below-game-aslot-970x90').html('<div style="width: 970px; height: 90px; margin: 0 auto; background-color: orange;"></div>');
            $('.below-game-aslot-300x600').html('<div style="width: 300px; height: 600px; margin: 0 auto; background-color: orange;"></div>');
        */

        var adprovider = window.getUrlParameter('adprovider');

        if(adprovider == 'google') {
            appendGAds('DE', 'de-DE');
        } else if(adprovider == 'nitropay') {
            appendNAds();
        } else if(adprovider == 'valueimpression') {
            appendVAds();
        } else if(adprovider == 'revshare') {
            appendRevenueShareGames(mobileDetection);
        } else {
            $.get( "https://little-games.com/api/countries/locate", function( country ) {
                
                var randomInt = getRandomInt(1, 10);
                console.log('random revenueshare games: ' + randomInt);
                if(randomInt == 1) {
                    appendRevenueShareGames(mobileDetection);
                } else {
                    if(window.adsFrequencyCapping <= 5) {
                        if(country == 'AT' && (userLang == 'de' || userLang == 'de-de' || userLang == 'de-DE' || userLang == 'de-de' || userLang == 'de-AT' || userLang == 'de-at')) {
                            appendGAds(country, userLang);
                        } else if(country == 'AU' && (userLang == 'en' || userLang == 'en-AU' || userLang == 'en-au')) {
                            appendGAds(country, userLang);
                        } else if(country == 'BE' && (userLang == 'be' || userLang == 'nl' || userLang == 'fr' || userLang == 'nl-NL' || userLang == 'nlnl' || userLang == 'nl-BE' || userLang == 'nl-be' || userLang == 'nl-NL' || userLang == 'nl-nl' || userLang == 'fr-BE' || userLang == 'fr-be' || userLang == 'fr-FR' || userLang == 'fr-fr')) {
                            appendGAds(country, userLang);
                        } else if(country == 'CA' && (userLang == 'en' || userLang == 'en-CA' || userLang == 'en-ca' || userLang == 'fr' || userLang == 'fr-CA' || userLang == 'fr-ca')) {
                            appendGAds(country, userLang);
                        } else if(country == 'CH' && (userLang == 'fr' || userLang == 'de' || userLang == 'it' || userLang == 'fr-CH' || userLang == 'fr-ch' || userLang == 'de-CH' || userLang == 'de-ch' || userLang == 'it-CH' || userLang == 'it-ch')) {
                            appendGAds(country, userLang);
                        } else if(country == 'DE' && (userLang == 'de' || userLang == 'de-DE' || userLang == 'de-de' || userLang == 'de-CH' || userLang == 'de-ch' || userLang == 'de-AT' || userLang == 'de-at')) {
                            appendGAds(country, userLang);
                        } else if(
                            (country == 'AR' || country == 'BO' || country == 'CL' || country == 'CO' || country == 'CR' || country == 'EC' || country == 'SV'
                              || country == 'GT' || country == 'HN' || country == 'MX' || country == 'NI' || country == 'PA' || country == 'PY' || country == 'PE'
                              || country == 'PR' || country == 'ES' || country == 'UY' || country == 'VE')
                            && (userLang == 'es' || userLang == 'es-ES' || userLang == 'es-es' || userLang == 'es-ar' || userLang == 'es-AR' || userLang == 'es-bo'
                                || userLang == 'es-BO' || userLang == 'es-cl' || userLang == 'es-CL' || userLang == 'es-co' || userLang == 'es-CO' || userLang == 'es-cr'
                                || userLang == 'es-CR' || userLang == 'es-do' || userLang == 'es-DO' || userLang == 'es-ec' || userLang == 'es-EC' || userLang == 'es-sv'
                                || userLang == 'es-SV' || userLang == 'es-gt' || userLang == 'es-GT' || userLang == 'es-hn' || userLang == 'es-HN' || userLang == 'es-mx'
                                || userLang == 'es-MX' || userLang == 'es-ni' || userLang == 'es-NI' || userLang == 'es-pa' || userLang == 'es-PA' || userLang == 'es-py'
                                || userLang == 'es-PY' || userLang == 'es-pe' || userLang == 'es-PE' || userLang == 'es-pr' || userLang == 'es-PR' || userLang == 'es-es'
                                || userLang == 'es-ES' || userLang == 'es-uy' || userLang == 'es-UY' || userLang == 'es-ve' || userLang == 'es-VE'
                            )) {
                                appendGAds(country, userLang);
                        } else if(country == 'FI' && (userLang == 'fi')) {
                            appendGAds(country, userLang);
                        } else if(country == 'FR' && (userLang == 'fr' || userLang == 'fr-FR' || userLang == 'fr-fr' || userLang == 'fr-BE' || userLang == 'fr-be' || userLang == 'fr-CA' || userLang == 'fr-ca' || userLang == 'fr-CH' || userLang == 'fr-ch' || userLang == 'fr-LU' || userLang == 'fr-lu')) {
                            appendGAds(country, userLang);
                        } else if(country == 'GB' && (userLang == 'en' || userLang == 'en-GB' || userLang == 'en-gb')) {
                            appendGAds(country, userLang);
                        } else if(country == 'IE' && (userLang == 'en' || userLang == 'en-IE' || userLang == 'en-ie')) {
                            appendGAds(country, userLang);
                        } else if(country == 'IT' && (userLang == 'it' || userLang == 'it-IT' || userLang == 'it-it' || userLang == 'it-CH' || userLang == 'it-ch')) {
                            appendGAds(country, userLang);
                        } else if(country == 'LU' && (userLang == 'lb' || userLang == 'de' || userLang == 'de-LU' || userLang == 'de-lu' || userLang == 'fr' || userLang == 'fr-LU' || userLang == 'fr-lu')) {
                            appendGAds(country, userLang);
                        } else if(country == 'NL' && (userLang == 'nl' || userLang == 'nl-BE' || userLang == 'nl-be')) {
                            appendGAds(country, userLang);
                        } else if(country == 'NO' && (userLang == 'no' || userLang == 'nb' || userLang == 'nn' || userLang == 'no-NO' || userLang == 'no-no')) {
                            appendGAds(country, userLang);
                        } else if(country == 'NZ' && (userLang == 'en' || userLang == 'en-NZ' || userLang == 'en-nz')) {
                            appendGAds(country, userLang);
                        } else if(country == 'BR' && (userLang == 'pt' || userLang == 'pt-BR' || userLang == 'pt-br')) {
                            appendGAds(country, userLang);
                        } else if(country == 'PT' && (userLang == 'pt' || userLang == 'pt-PT' || userLang == 'pt-pt')) {
                            appendGAds(country, userLang);
                        } else if(country == 'SE' && (userLang == 'sv' || userLang == 'sv-SV' || userLang == 'sv-sv' || userLang == 'sv-FI' || userLang == 'sv-fi')) {
                            appendGAds(country, userLang);
                        } else if(country == 'US' && (userLang == 'en' || userLang == 'en-US' || userLang == 'en-us')) {
                            appendGAds(country, userLang);
                        } else if(country == 'TR' && (userLang == 'tr')) {
                            appendGAds(country, userLang);
                        } else if(country == 'BG' && (userLang == 'bg')) {
                            appendGAds(country, userLang);
                        } else if(country == 'BS' && (userLang == 'bs')) {
                            appendGAds(country, userLang);
                        } else if(country == 'HR' && (userLang == 'hr')) {
                            appendGAds(country, userLang);
                        } else if(country == 'CZ' && (userLang == 'cs')) {
                            appendGAds(country, userLang);
                        } else if(country == 'DK' && (userLang == 'da')) {
                            appendGAds(country, userLang);
                        } else if(country == 'EE' && (userLang == 'et')) {
                            appendGAds(country, userLang);
                        } else if(country == 'GR' && (userLang == 'el')) {
                            appendGAds(country, userLang);
                        } else if(country == 'HU' && (userLang == 'hu')) {
                            appendGAds(country, userLang);
                        } else if(country == 'JP' && (userLang == 'ja')) {
                            appendGAds(country, userLang);
                        } else if(country == 'PL' && (userLang == 'pl')) {
                            appendGAds(country, userLang);
                        } else if(country == 'RO' && (userLang == 'ro' || userLang == 'ro-mo' || userLang == 'ro-MO')) {
                            appendGAds(country, userLang);
                        } else if(country == 'RU' && (userLang == 'ru' || userLang == 'ru-mo' || userLang == 'ru-MO')) {
                            appendGAds(country, userLang);
                        } else if(country == 'RS' && (userLang == 'sr')) {
                            appendGAds(country, userLang);
                        } else if(country == 'SK' && (userLang == 'sk')) {
                            appendGAds(country, userLang);
                        } else if(country == 'SI' && (userLang == 'sl')) {
                            appendGAds(country, userLang);
                        } else {
                            if(country != 'AT' && country != 'BE' && country != 'BG' && country != 'HR' && country != 'CY' && country != 'CZ' && country != 'DK' && country != 'EE' && country != 'FI'
                                && country != 'FR' && country != 'GF' && country != 'DE' && country != 'GR' && country != 'HU' && country != 'IE' && country != 'IT' && country != 'LV' && country != 'LT' && country != 'MT'
                                && country != 'MC' && country != 'NL' && country != 'PL' && country != 'PT' && country != 'RO' && country != 'SK' && country != 'SI' && country != 'ES' && country != 'SE') {
                                    appendAds();
                            } else {
                                appendRevenueShareGames(mobileDetection);
                            }
                        }
                    } else {
                        if(window.adsFrequencyCapping < 50 && country != 'AT' && country != 'BE' && country != 'BG' && country != 'HR' && country != 'CY' && country != 'CZ' && country != 'DK' && country != 'EE' && country != 'FI'
                            && country != 'FR' && country != 'GF' && country != 'DE' && country != 'GR' && country != 'HU' && country != 'IE' && country != 'IT' && country != 'LV' && country != 'LT' && country != 'MT'
                            && country != 'MC' && country != 'NL' && country != 'PL' && country != 'PT' && country != 'RO' && country != 'SK' && country != 'SI' && country != 'ES' && country != 'SE') {
                                appendAds();
                        } else {
                            appendRevenueShareGames(mobileDetection);
                        }
                    }
                }
            });
        }
    }

    function appendRevenueShareGames(mobileDetection) {
        appendRevenueShareBlock(mobileDetection, '970x250');
        appendRevenueShareBlock(mobileDetection, '300x600');
    }

    function appendRevenueShareBlock(mobileDetection, name) {

        console.log('appending revenueshareblock: ' + name);
        if(!mobileDetection.mobile()) {

            if(name == '970x250') {
                var fallback_random_games = getPromotionGames(3);

                var fallback_games_html = '';
                for (var i = 0; i < fallback_random_games.length; i++) {
                    fallback_games_html += '<div class="fallback-game">\n' +
                        '<a href="' + fallback_random_games[i].link + '" class="link" target="_blank">\n' +
                        '<div class="media"><video class="video" preload="none" data-cookieconsent="ignore" ' + fallback_random_games[i].img_title + '_696x328.jpg" loop muted>' + fallback_random_games[i].video_title + '_404x190.mp4" type="video/mp4"></video>\n' +
                        '<img src="https://gameforge.com/en-US/littlegames/content/themes/casual/custom/img/promotion/' + fallback_random_games[i].img_title + '_696x328.jpg" style="border: 0;" alt="' + fallback_random_games[i].title + '"></div>\n' +
                    '</a><div class="label">Ad</div></div>';
                }
                $('.below-game-aslot-970x90').css('height', '150px');
                $('.below-game-aslot-970x90').html('<div class="fallback-games">' + fallback_games_html + '</div>');

                var fallback_games_970x250_html = '';
                for (var i = 0; i < fallback_random_games.length; i++) {
                    fallback_games_970x250_html += '<div class="fallback-game-970x250">\n' +
                        '<a href="' + fallback_random_games[i].link + '" class="link" target="_blank">\n' +
                        '<div class="media"><video class="video" preload="none" data-cookieconsent="ignore" ' + fallback_random_games[i].img_title + '_696x328.jpg" loop muted>' + fallback_random_games[i].video_title + '_404x190.mp4" type="video/mp4"></video>\n' +
                        '<img src="https://gameforge.com/en-US/littlegames/content/themes/casual/custom/img/promotion/' + fallback_random_games[i].img_title + '_696x328.jpg" style="border: 0;" alt="' + fallback_random_games[i].title + '"></div>\n' +
                    '</a><div class="label">Ad</div></div>';
                }
                $('.below-game-aslot-970x90').css('width', 'auto');
                $('.below-game-aslot-970x90').css('height', 'auto');
                $('.below-game-aslot-970x90').html('<div class="fallback-games-970x250">' + fallback_games_970x250_html + '</div>');
                $('.below-game-aslot-728x90').css('width', 'auto');
                $('.below-game-aslot-728x90').css('height', 'auto');
                $('.below-game-aslot-728x90').html('<div class="fallback-games-970x250">' + fallback_games_970x250_html + '</div>');
            }

            if(name == '300x600') {
                var fallback_random_games_300x600 = getPromotionGames(6);
                var fallback_games_300x250_html = '';
                var fallback_games_300x600_html = '';
                for (var i = 0; i < fallback_random_games_300x600.length; i++) {
                    if(i <= 1) {
                        fallback_games_300x250_html += '<div class="fallback-game-300x250">\n' +
                            '<a href="' + fallback_random_games_300x600[i].link + '" class="link" target="_blank">\n' +
                            '<div class="media"><video class="video" preload="none" data-cookieconsent="ignore" ' + fallback_random_games_300x600[i].img_title + '_696x328.jpg" loop muted>' + fallback_random_games_300x600[i].video_title + '_404x190.mp4" type="video/mp4"></video>\n' +
                            '<img src="https://gameforge.com/en-US/littlegames/content/themes/casual/custom/img/promotion/' + fallback_random_games_300x600[i].img_title + '_696x328.jpg" style="border: 0;" alt="' + fallback_random_games_300x600[i].title + '"></div>\n' +
                        '</a><div class="label">Ad</div></div>';
                    } else {
                        fallback_games_300x600_html += '<div class="fallback-game-300x600">\n' +
                            '<a href="' + fallback_random_games_300x600[i].link + '" class="link" target="_blank">\n' +
                            '<div class="media"><video class="video" preload="none" data-cookieconsent="ignore" ' + fallback_random_games_300x600[i].img_title + '_696x328.jpg" loop muted>' + fallback_random_games_300x600[i].video_title + '_404x190.mp4" type="video/mp4"></video>\n' +
                            '<img src="https://gameforge.com/en-US/littlegames/content/themes/casual/custom/img/promotion/' + fallback_random_games_300x600[i].img_title + '_696x328.jpg" style="border: 0;" alt="' + fallback_random_games_300x600[i].title + '"></div>\n' +
                        '</a><div class="label">Ad</div></div>';
                    }
                }
                $('.sidebar-aslot-300x250').html('<div class="fallback-games-300x250">' + fallback_games_300x250_html + '</div>');
                $('.sidebar-aslot-300x600').html('<div class="fallback-games-300x600">' + fallback_games_300x600_html + '</div>');

                //$('.below-game-aslot-728x90').css('height', '150px');
                //$('.below-game-aslot-728x90').html('<div class="fallback-games">' + fallback_games_html + '</div>');
            }

            $(".fallback-games .link, .fallback-games-970x250 .link, .fallback-games-300x600 .link, .fallback-games-300x250 .link").on({
                mouseenter: function () {
                    if($('.media video', this).length > 0) {
                        var playPromise = $('.media video', this).get(0).play();

                        if (playPromise !== undefined) {
                            playPromise.then(_ => {
                                $('.media video', this).css('display', 'block');
                                $('.media video', this).css('zIndex', '20');
                                $('.media img', this).css('display', 'none');
                                $('.media img', this).css('zIndex', '10');
                            })
                            .catch(error => {
                            });
                        }
                    }
                },
                mouseleave: function () {
                    if($('.media video', this).length > 0) {
                        $('.media img', this).css('display', 'block');
                        $('.media video', this).css('display', 'none');
                        $('.media video', this).get(0).pause();
                        $('.media video', this).currentTime = 0;
                    }
                }
            });
        }
    }

    function appendAds() {
        var randomInt = getRandomInt(1, 2);
        if(randomInt == 1) {
            appendNAds();
        } else if(randomInt == 2) {
            appendVAds();
        }
    }

    function appendNAds() {

        var script   = document.createElement("script");
        script.type  = "text/javascript";
        script.setAttribute('async','async');
        script.src = "//s.nitropay.com/ads-634.js";
        document.getElementsByTagName('head')[0].appendChild(script);

        window['nitroAds'] = window['nitroAds'] || {
            createAd: function() {
                window.nitroAds.queue.push(['createAd', arguments]);
        },
            queue: []
        };

        /*
            sidebar-aslot-300x250 //$(window).width() min 1136px
            sidebar-aslot-300x600 //$(window).width() min 1136px
            below-game-aslot-970x90 //$(window).width() min 1346px
            below-game-aslot-728x90 //$(window).width() smaller than 1345px
            below-game-aslot-300x600 //$(window).width() min 856px
        */

        if($(window).width() >= 1136) {

            if($('.sidebar-aslot-300x250').length > 0) {
                console.log('na sidebar-aslot-300x250 loaded');
                window['nitroAds'].createAd('sidebar-aslot-300x250', {
                          refreshLimit: 10,
                          refreshTime: 30,
                                                    sizes: [
                            [300, 250]
                          ],
                          report: {
                            enabled: false
                          }
                });
            }

            if($('.sidebar-aslot-300x600').length > 0) {
                console.log('na sidebar-aslot-300x600 loaded');
                window['nitroAds'].createAd('sidebar-aslot-300x600', {
                          refreshLimit: 10,
                          refreshTime: 30,
                                                    sizes: [
                            [300, 600],
                            [300, 250]
                          ],
                          report: {
                            enabled: false
                          }
                });
            }
        }

        if($('.below-game-aslot-728x90').length > 0 && $(window).width() > 774 && $(window).width() <= 1345) {
            console.log('na below-game-aslot-728x90 loaded');
            window['nitroAds'].createAd('below-game-aslot-728x90', {
                      refreshLimit: 10,
                      refreshTime: 30,
                                            sizes: [
                        [728, 90],
                        [468, 60]
                      ],
                      report: {
                        enabled: false
                      }
            });
        }
        if($('.below-game-aslot-970x90').length > 0 && $(window).width() >= 1346) {
            console.log('na below-game-aslot-970x90 loaded');
            window['nitroAds'].createAd('below-game-aslot-970x90', {
                      refreshLimit: 10,
                      refreshTime: 30,
                                            sizes: [
                        [970, 90],
                        [728, 90],
                        [468, 60]
                      ],
                      report: {
                        enabled: false
                      }
            });
        }

        if($('.below-game-aslot-300x600').length > 0 && $(window).width() >= 856) {
            console.log('na below-game-aslot-300x600 loaded');
            window['nitroAds'].createAd('below-game-aslot-300x600', {
                      refreshLimit: 10,
                      refreshTime: 30,
                      renderVisible: true,
                                            sizes: [
                        [300, 600],
                        [300, 250]
                      ],
                      report: {
                        enabled: false
                      }
            });
        }
    }

    function appendVAds() {

        /*
            sidebar-aslot-300x250 //$(window).width() min 1136px
            sidebar-aslot-300x600 //$(window).width() min 1136px
            below-game-aslot-970x90 //$(window).width() min 1346px
            below-game-aslot-728x90 //$(window).width() smaller than 1345px
            below-game-aslot-300x600 //$(window).width() min 856px
        */

        var script   = document.createElement("script");
        script.type  = "text/javascript";
        script.setAttribute('async','async');
        script.src = "//services.vlitag.com/adv1/?q=bc5c12fc99c8e569fe0a8691f28e6d78";
        document.getElementsByTagName('head')[0].appendChild(script);

        var inlineAds   = document.createElement("script");
        inlineAds.type  = "text/javascript";
        inlineAds.text  = 'var vitag = vitag || {}; vitag.outStreamConfig = { enableMobile: false };';
        document.getElementsByTagName('head')[0].appendChild(inlineAds);

        if($(window).width() >= 1136) {

            if($('.sidebar-aslot-300x250').length > 0) {
                console.log('vi sidebar-aslot-300x250 loaded');

                var inlineAds   = document.createElement("script");
                inlineAds.type  = "text/javascript";
                inlineAds.text  = 'vitag.videoDiscoverConfig = { random: true, noFixedVideo: true }; (vitag.Init = window.vitag.Init || []).push(function () { viAPItag.initInstreamBanner("vi_1206746492") });';
                document.getElementsByTagName('head')[0].appendChild(inlineAds);
            }

            if($('.sidebar-aslot-300x600').length > 0) {
                console.log('vi sidebar-aslot-300x600 loaded');

                var inlineAds   = document.createElement("script");
                inlineAds.type  = "text/javascript";
                inlineAds.text  = '(vitag.Init = window.vitag.Init || []).push(function(){ viAPItag.display("vi_1206746496"); });';
                document.getElementsByTagName('head')[0].appendChild(inlineAds);
            }
        }

        if($('.below-game-aslot-728x90').length > 0 && $(window).width() > 774 && $(window).width() <= 1345) {
            console.log('vi below-game-aslot-728x90 loaded');

            var inlineAds   = document.createElement("script");
            inlineAds.type  = "text/javascript";
            inlineAds.text  = '(vitag.Init = window.vitag.Init || []).push(function(){ viAPItag.display("vi_1206746494"); });';
            document.getElementsByTagName('head')[0].appendChild(inlineAds);
        }

        if($('.below-game-aslot-970x90').length > 0 && $(window).width() >= 1346) {
            console.log('vi below-game-aslot-970x90 loaded');

            var inlineAds   = document.createElement("script");
            inlineAds.type  = "text/javascript";
            inlineAds.text  = '(vitag.Init = window.vitag.Init || []).push(function(){ viAPItag.display("vi_1206746900"); });';
            document.getElementsByTagName('head')[0].appendChild(inlineAds);
        }

        if($('.below-game-aslot-300x600').length > 0 && $(window).width() >= 856) {
            console.log('vi below-game-aslot-300x600 loaded');

            $(".aslot.below-game-aslot-300x600").prepend("<div class='advertisement-notice'>Ad</div>");
            var inlineAds   = document.createElement("script");
            inlineAds.type  = "text/javascript";
            inlineAds.text  = '(vitag.Init = window.vitag.Init || []).push(function(){ viAPItag.display("vi_1206746901"); });';
            document.getElementsByTagName('head')[0].appendChild(inlineAds);

        }
    }

    function appendGAds(country, userLang) {

        $('.aslot').addClass('gads-loaded');
        $('.below-game-more-games-and-ad').addClass('gads-loaded');
        $('.sidebar-aslots').addClass('gads-loaded');

        var loadAdsByGoogle = false;
        var sidebarAslot300x250 = '';
        var sidebarAslot300x600 = '';
        var belowGameAslot970x90 = '';
        var belowGameAslot728x90 = '';
        var belowGameAslot300x600 = '';

        if(country == 'AT') {
            var sidebarAslot300x250 = '1820528143';
            var sidebarAslot300x600 = '3703427781';
            var belowGameAslot970x90 = '3748462149';
            var belowGameAslot728x90 = '3748462149';
            var belowGameAslot300x600 = '5498906948';
        } else if(country == 'AU') {
            var sidebarAslot300x250 = '7578275375';
            var sidebarAslot300x600 = '1216865242';
            var belowGameAslot970x90 = '5292643951';
            var belowGameAslot728x90 = '5292643951';
            var belowGameAslot300x600 = '4122230187';
        } else if(country == 'BE') {
            var sidebarAslot300x250 = '7034913498';
            var sidebarAslot300x600 = '1782586811';
            var belowGameAslot970x90 = '2904096790';
            var belowGameAslot728x90 = '2904096790';
            var belowGameAslot300x600 = '9362049154';
        } else if(country == 'CA') {
            var sidebarAslot300x250 = '5215820002';
            var sidebarAslot300x600 = '4313801870';
            var belowGameAslot970x90 = '8474993454';
            var belowGameAslot728x90 = '8474993454';
            var belowGameAslot300x600 = '8412828983';
        } else if(country == 'CH') {
            var sidebarAslot300x250 = '9246784496';
            var sidebarAslot300x600 = '4025606774';
            var belowGameAslot970x90 = '2712525101';
            var belowGameAslot728x90 = '2712525101';
            var belowGameAslot300x600 = '9055212806';
        } else if(country == 'DE') {
            var sidebarAslot300x250 = '2325948698';
            var sidebarAslot300x600 = '1511560473';
            var belowGameAslot970x90 = '8038141079';
            var belowGameAslot728x90 = '8038141079';
            var belowGameAslot300x600 = '8712211883';
        } else if(country == 'ES') {
            var sidebarAslot300x250 = '8863641111';
            var sidebarAslot300x600 = '6516679377';
            var belowGameAslot970x90 = '9985151092';
            var belowGameAslot728x90 = '9985151092';
            var belowGameAslot300x600 = '6036213514';
        } else if(country == 'FI') {
            var sidebarAslot300x250 = '5203597701';
            var sidebarAslot300x600 = '1915089384';
            var belowGameAslot970x90 = '3036599360';
            var belowGameAslot728x90 = '3036599360';
            var belowGameAslot300x600 = '9410436020';
        } else if(country == 'FR') {
            var sidebarAslot300x250 = '8795972368';
            var sidebarAslot300x600 = '5978237334';
            var belowGameAslot970x90 = '6725059400';
            var belowGameAslot728x90 = '6725059400';
            var belowGameAslot300x600 = '9315874785';
        } else if(country == 'GB') {
            var sidebarAslot300x250 = '4446691489';
            var sidebarAslot300x600 = '9917482345';
            var belowGameAslot970x90 = '9435833287';
            var belowGameAslot728x90 = '9435833287';
            var belowGameAslot300x600 = '1403749260';
        } else if(country == 'IE') {
            var sidebarAslot300x250 = '2270312603';
            var sidebarAslot300x600 = '6017985921';
            var belowGameAslot970x90 = '7139495909';
            var belowGameAslot728x90 = '7139495909';
            var belowGameAslot300x600 = '8048967488';
        } else if(country == 'IT') {
            var sidebarAslot300x250 = '1276574997';
            var sidebarAslot300x600 = '5690478633';
            var belowGameAslot970x90 = '3410492749';
            var belowGameAslot728x90 = '3410492749';
            var belowGameAslot300x600 = '4772966879';
        } else if(country == 'LU') {
            var sidebarAslot300x250 = '4624372574';
            var sidebarAslot300x600 = '8951271022';
            var belowGameAslot970x90 = '9685127565';
            var belowGameAslot728x90 = '9685127565';
            var belowGameAslot300x600 = '4572401686';
        } else if(country == 'NL') {
            var sidebarAslot300x250 = '3119719215';
            var sidebarAslot300x600 = '9493555873';
            var belowGameAslot970x90 = '9301984185';
            var belowGameAslot728x90 = '9301984185';
            var belowGameAslot300x600 = '5693911661';
        } else if(country == 'NO') {
            var sidebarAslot300x250 = '7797330824';
            var sidebarAslot300x600 = '2545004149';
            var belowGameAslot970x90 = '4979595796';
            var belowGameAslot728x90 = '4979595796';
            var belowGameAslot300x600 = '1754666652';
        } else if(country == 'NZ') {
            var sidebarAslot300x250 = '6951589411';
            var sidebarAslot300x600 = '1942805310';
            var belowGameAslot970x90 = '8136082102';
            var belowGameAslot728x90 = '8136082102';
            var belowGameAslot300x600 = '4824937763';
        } else if(country == 'PT') {
            var sidebarAslot300x250 = '8727269116';
            var sidebarAslot300x600 = '6101105773';
            var belowGameAslot970x90 = '3474942431';
            var belowGameAslot728x90 = '3474942431';
            var belowGameAslot300x600 = '7222615753';
        } else if(country == 'SE') {
            var sidebarAslot300x250 = '7031044064';
            var sidebarAslot300x600 = '3091799050';
            var belowGameAslot970x90 = '8152554045';
            var belowGameAslot728x90 = '8152554045';
            var belowGameAslot300x600 = '5526390701';
        } else if(country == 'US') {
            var sidebarAslot300x250 = '5134077538';
            var sidebarAslot300x600 = '2529946913';
            var belowGameAslot970x90 = '6822934850';
            var belowGameAslot728x90 = '6822934850';
            var belowGameAslot300x600 = '4964538560';
        }

        var gAdsScript   = document.createElement("script");
        gAdsScript.type  = "text/javascript";
        gAdsScript.setAttribute('async','async');
        gAdsScript.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        document.getElementsByTagName('head')[0].appendChild(gAdsScript);

        /*
            sidebar-aslot-300x250 //$(window).width() min 1136px
            sidebar-aslot-300x600 //$(window).width() min 1136px
            below-game-aslot-970x90 //$(window).width() min 1346px
            below-game-aslot-728x90 //$(window).width() smaller than 1346px
            below-game-aslot-300x600 //$(window).width() min 856px
            if $(window).width() smaller than 1490px, dont show gads on sidebar-aslot-300x250 and sidebar-aslot-300x600!!!!
        */

       if($(window).width() >= 1490) {
            console.log('gads sidebar-aslot-300x600 loaded');

            $('.sidebar-aslot-300x250').hide();
            /*
            console.log('gads sidebar-aslot-300x250 loaded');
            if($('.sidebar-aslot-300x250').length > 0 && sidebarAslot300x250 !== '') {
                $('.sidebar-aslot-300x250').html('<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-7334381417072742" data-ad-slot="' + sidebarAslot300x250 + '" data-ad-format="auto" data-full-width-responsive="true"></ins>');

                var inlineGads   = document.createElement("script");
                inlineGads.type  = "text/javascript";
                inlineGads.text  = '(adsbygoogle = window.adsbygoogle || []).push({});'
                document.getElementsByTagName('head')[0].appendChild(inlineGads);
            }
            */

            if($('.sidebar-aslot-300x600').length > 0 && sidebarAslot300x600 !== '') {
                $('.sidebar-aslot-300x600').html('<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-7334381417072742" data-ad-slot="' + sidebarAslot300x600 + '" data-ad-format="auto" data-full-width-responsive="true"></ins>');

                var inlineGads   = document.createElement("script");
                inlineGads.type  = "text/javascript";
                inlineGads.text  = '(adsbygoogle = window.adsbygoogle || []).push({});'
                document.getElementsByTagName('head')[0].appendChild(inlineGads);
            }
        } else {
            if($(window).width() >= 1136) {
                console.log('gads sidebar-aslot-300x600 loaded');

                var dir = $('html').attr('dir');
                if(typeof dir !== 'undefined' && dir == 'rtl') {
                    $('.sidebar-aslot-300x600').css('padding-right', '100px');
                } else {
                    $('.sidebar-aslot-300x600').css('padding-left', '100px');
                }

                $('.sidebar-aslot-300x600').html('<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-7334381417072742" data-ad-slot="' + sidebarAslot300x600 + '" data-ad-format="auto" data-full-width-responsive="true"></ins>');

                var inlineGads   = document.createElement("script");
                inlineGads.type  = "text/javascript";
                inlineGads.text  = '(adsbygoogle = window.adsbygoogle || []).push({});'
                document.getElementsByTagName('head')[0].appendChild(inlineGads);
            }
        }

        if($(window).width() > 774 && $(window).width() <= 1345) {
            console.log('gads below-game-aslot-728x90 loaded');

            if($('.below-game-aslot-728x90').length > 0 && belowGameAslot728x90 !== '') {
                $('.below-game-aslot-728x90').html('<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-7334381417072742" data-ad-slot="' + belowGameAslot728x90 + '" data-ad-format="auto" data-full-width-responsive="true"></ins>');

                var inlineGads   = document.createElement("script");
                inlineGads.type  = "text/javascript";
                inlineGads.text  = '(adsbygoogle = window.adsbygoogle || []).push({});'
                document.getElementsByTagName('head')[0].appendChild(inlineGads);
            }
        }

        if($(window).width() >= 1346) {
            console.log('gads below-game-aslot-970x90 loaded');

            if($('.below-game-aslot-970x90').length > 0 && belowGameAslot970x90 !== '') {
                $('.below-game-aslot-970x90').html('<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-7334381417072742" data-ad-slot="' + belowGameAslot970x90 + '" data-ad-format="auto" data-full-width-responsive="true"></ins>');

                var inlineGads   = document.createElement("script");
                inlineGads.type  = "text/javascript";
                inlineGads.text  = '(adsbygoogle = window.adsbygoogle || []).push({});'
                document.getElementsByTagName('head')[0].appendChild(inlineGads);
            }
        }

        if($(window).width() >= 856) {
            console.log('gads below-game-aslot-300x600 loaded');

            if($('.below-game-aslot-300x600').length > 0 && belowGameAslot300x600 !== '') {
                $('.below-game-aslot-300x600').html('<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-7334381417072742" data-ad-slot="' + belowGameAslot300x600 + '" data-ad-format="auto" data-full-width-responsive="true"></ins>');

                var inlineGads   = document.createElement("script");
                inlineGads.type  = "text/javascript";
                inlineGads.text  = '(adsbygoogle = window.adsbygoogle || []).push({});'
                document.getElementsByTagName('head')[0].appendChild(inlineGads);
            }
        }
    }

    window.initTubia = function() {

        $('.game-walkthrough-video').css('height', 'auto');

        window['TUBIA_OPTIONS'] = {
            'container': 'game-video-iframe-container',
            'publisherId': '7d9471aa787545c0a106e90840f9be1d',
            'gameId': $('#game-video-iframe-container').data('game-id'),
            'title': $('#game-video-iframe-container').data('game-title')
        };

        if(window.marketingCookiesAllowed) {
            window['TUBIA_OPTIONS'].gdprTracking = true;
            window['TUBIA_OPTIONS'].gdprTargeting = true;
        } else {
            window['TUBIA_OPTIONS'].gdprTracking = false;
            window['TUBIA_OPTIONS'].gdprTargeting = false;
        }

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://player.tubia.com/libs/gd/gd.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'tubia-playerjs'));
    }

    var delay = (function(){
      var timer = 0;
      return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
      };
    })();

    
    window.loadMarketingScripts = function(mobileDetection) {

        console.log('loading marketing scripts');
        if(window.marketingCookiesAllowed && areCookiesEnabled() && window.gameId !== "undefined") {

            if(typeof window.origin === 'undefined' || window.origin === null || window.origin === '' || window.origin === 'littlegames') {
                                console.log('fc count:' + window.adsFrequencyCapping);
                selectAd(mobileDetection);
                window.adsFrequencyCapping++;
                var in60Minutes = 1/24;
                Cookies.set('lg_fc', window.adsFrequencyCapping, {
                    expires: in60Minutes
                });
            }
        } else {
            appendRevenueShareGames(mobileDetection);
        }
    }

});
