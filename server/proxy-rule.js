let rp = require('request-promise');
module.exports = {
    summary: 'a rule to hack response',
    *beforeSendRequest(requestDetail){
        const newRequestOptions = requestDetail.requestOptions;
        delete newRequestOptions.headers['Accept-Encoding'];
        return {
            requestOptions: newRequestOptions
        };
    },
    *beforeSendResponse(requestDetail, responseDetail) {
        if (requestDetail.url.indexOf('https://pan.baidu.com/api/download') !== -1) {

            return new Promise((resolve, reject) => {
                rp({
                    uri: requestDetail.url,
                    headers:requestDetail.requestOptions.headers
                }).then((res)=>{
                    console.log('res!!!!!!', res);
                    let contents = global.mainWindow.webContents;
                    contents.send('down-list', res);
                    responseDetail.response.statusCode = 502;
                    resolve({ response: responseDetail.response });
                });

            })

        }
    },
};