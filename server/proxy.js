module.exports=function () {
    const {dialog,ipcMain} = require('electron');

    const AnyProxy = require('anyproxy');
    const options = {
        port: 8001,
        rule: require('./proxy-rule.js'),
        webInterface: {
            enable: true,
            webPort: 8002
        },
        forceProxyHttps: true,
        dangerouslyIgnoreUnauthorized:true,
        wsIntercept: false, // 不开启websocket代理
        silent: false
    };
    const proxyServer = new AnyProxy.ProxyServer(options);

    proxyServer.on('ready', () => { /* */ });
    proxyServer.on('error', (e) => { /* */ });
    proxyServer.start();

    ipcMain.on('get-exist-ssl', (event, arg) => {

        // 校检证书
        if (!AnyProxy.utils.certMgr.ifRootCAFileExists()) {
            AnyProxy.utils.certMgr.generateRootCA((error, keyPath) => {
                // let users to trust this CA before using proxy
                console.log('生成完毕',keyPath);
                if (!error) {
                    event.sender.send('exist-ssl',{
                        ssl:false,
                        path:keyPath
                    });
                } else {
                    console.error('error when generating rootCA', error);
                }
            });
        }else{
            console.log('存在证书')
            event.sender.send('exist-ssl',{
                ssl:true,
                path:AnyProxy.utils.certMgr.getRootCAFilePath()
            })
        }


    });



};

