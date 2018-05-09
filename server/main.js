let rp = require('request-promise');

module.exports=function () {
    // 动态注入js

    // 代理
    require('./proxy')();

    // session
    const {session} = require('electron');

    const conf = {
        // proxyRules:['https://pan.baidu.com/api/*'],
        proxyRules:'https=localhost:8001'
    };
    session.defaultSession.setProxy(conf, ()=>{
        console.log('代理设置完毕')
    });

    // Modify the user agent for all requests to the following urls.
    const filter = {
        urls: ['https://*.pan.baidu.com/api/*',]
    };

    // session.defaultSession.webRequest.onBeforeSendHeaders(filter,async (details, callback) => {
    //     const url = details.url;
    //     //点击下载
    //     if(url.indexOf('https://pan.baidu.com/api/download') !== -1){
    //         console.log(details)
    //         rp({
    //             uri: details.url,
    //             headers:details.requestHeaders
    //         }).then((res)=>{
    //             console.log('res!!!!!!', res);
    //             let contents = global.mainWindow.webContents;
    //             contents.send('down-list', res);
    //         });
    //     }
    //     callback({cancel: false, requestHeaders: details.requestHeaders})
    // })

};