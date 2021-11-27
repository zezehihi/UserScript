// ==UserScript==
// @name         烦死了跳转
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  自用
// @author       1Dtfc
// @require      https://cdn.staticfile.org/jquery/3.4.1/jquery.min.js
// @match        https://www.yuque.com/r/goto?*
// @icon         none
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log(document.domain)
    let link = '';
    window.onload=function () {
        switch (document.domain){
            case 'www.yuque.com':
                link =$('p:last').html()
        }


        $(location).attr('href', $('p:last').html());
    }

    // Your code here...
})();