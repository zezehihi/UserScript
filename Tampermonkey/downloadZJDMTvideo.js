// ==UserScript==
// @name         下载及播放浙江省大学生多媒体作品设计竞赛网移动应用视频
// @namespace    http://tampermonkey.net/
// @version      0.39
// @description  下载及播放浙江省大学生多媒体作品设计竞赛网移动应用视频，自用。
// @author       Dtfc
// @match        http://dmtds.zjnu.edu.cn/zpShow.aspx?id=*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/flv.js/1.6.2/flv.min.js
// ==/UserScript==

(function() {
    'use strict';
    //配置项
    //是否自动下载
    var ZD=false
    ///////
    var d_url=''
    var d_name=''
    var d_t=''
if(window.location.search.substring(1).length){
    d_t=window.location.search.substring(1).split("&")[1].replace(/[^\d]/g,"");
}
    
    var link = document.createElement('a');
    document.body.appendChild(link);
    //更换为js播放器
    $('#player_div').html(`<div class="mainContainer">
    <video id="videoElement" class="centeredVideo" controls autoplay width="100%" height="100%"></video>
</div>`)

    //获取视频参数
    function getParams(){
        $.ajax({
            url: "ashx/zpShow.ashx?dateTime=" + new Date().valueOf(),
            data: para,
            dataType: "json",
            success: function (data) {
                d_url=data.URL_Str;
                console.log('获取视频链接：',d_name,data.URL_Str)
                if(ZD){
                    downloadThisVideo();
                }
                //获取视频链接后放视频
                var player = document.getElementById('videoElement');
                if (flvjs.isSupported()) {
                    var flvPlayer = flvjs.createPlayer({
                        type: 'flv',
                        "isLive": true,//<数据源是否为实时流
                        url: d_url,//<==自行修改

                    });
                    flvPlayer.attachMediaElement(videoElement);
                    flvPlayer.load(); //加载
                }


            }}
              )
    }

    //下载视频并修改视频文件名称
    function downloadThisVideo(){
        link.href = d_url;
        d_name=$(".col_1").html().replace("作品名称： ",'')+'.flv';
        link.download = d_t+d_name; // 自定义文件名
        link.click() // 下载文件
    }
    //添加下载视频按钮
    const btnHtml = `<div id="downBtn" style="    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: block;
    margin: 0 auto;
    cursor:pointer;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    font-size: 16px;">下载视频</div>`
    $('#inf_span').before(btnHtml)
    //为动态添加的元素下载点击事件
    $("body").on("click","#downBtn",function(){
        downloadThisVideo();
    });

    getParams();



})();