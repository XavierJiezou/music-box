module.exports = {
    // publicPath: process.env.NODE_ENV === "production" ? "/music-box" : "/",
    devServer: {
        proxy: {
            '/wangyi': {
                target: 'https://autumnfish.cn',
                changeOrigin: true,
                pathRewrite: {
                    '^/wangyi': ''
                }
            },
            '/qq': {
                target: 'https://api.zsfmyz.top',
                changeOrigin: true,
                pathRewrite: {
                    '^/qq': ''
                }
            },
            '/kugou': {
                target: 'http://mobilecdn.kugou.com/api/v3/search/song',
                changeOrigin: true,
                pathRewrite: {
                    '^/kugou': ''
                }
            },
            '/musicurlkugou': {
                target: 'http://m.kugou.com/app/i/getSongInfo.php',
                changeOrigin: true,
                pathRewrite: {
                    '^/musicurlkugou': ''
                }
            },   
            '/mvurlkugou': {
                target: 'http://m.kugou.com/app/i/mv.php',
                changeOrigin: true,
                pathRewrite: {
                    '^/mvurlkugou': ''
                }
            },                        
            '/kuwo': {
                target: 'http://search.kuwo.cn/r.s',
                changeOrigin: true,
                pathRewrite: {
                    '^/kuwo': ''
                }
            },
            '/musicurlkuwo': {
                target: 'https://www.kuwo.cn/url',
                changeOrigin: true,
                pathRewrite: {
                    '^/musicurlkuwo': ''
                }
            },            
            '/migu': {
                target: 'https://m.10086.cn/migu/remoting/scr_search_tag',
                changeOrigin: true,
                pathRewrite: {
                    '^/migu': ''
                }
            },
            '/baidu': {
                target: 'http://musicapi.taihe.com/v1/restserver/ting',
                changeOrigin: true,
                pathRewrite: {
                    '^/baidu': ''
                }
            }
        }
    }
}