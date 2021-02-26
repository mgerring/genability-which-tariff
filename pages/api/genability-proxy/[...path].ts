import { createProxyMiddleware } from 'http-proxy-middleware';

const authString = Buffer.from(`${process.env.GEN_APP_ID}:${process.env.GEN_APP_KEY}`).toString('base64');

export default createProxyMiddleware({
    target: 'http://api.genability.com',
    changeOrigin: true,
    onProxyReq: function (proxyReq, req, res) {
      proxyReq.setHeader('Authorization', 'Basic ' + authString);
      proxyReq.setHeader('Accept-Encoding', '');
    },
    pathRewrite: {
      '^/api/genability-proxy': '',
    }
});