import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {createProxyMiddleware} from 'http-proxy-middleware';
var proxy = require('http-proxy');
var apiProxy = proxy.createProxyServer();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const API_SERVICE_URL = "http://localhost:3000";
  app.use(
      '/mok/api',
      createProxyMiddleware({
        target: API_SERVICE_URL,
        changeOrigin: true,
        pathRewrite(pathReq, req) {
          const pathname = pathReq.split('?')[0];
          let url = `${pathname}?`;
          console.log(url);
          url = Object
              .entries(req.query)
              .reduce(
                  (newUrl, [key, value]) => `${newUrl}&${key}=${encodeURI(<string>value)}`,
                  url,
              );
          return url;
        }
      })
  );

  await app.listen(3001);
}
bootstrap();
