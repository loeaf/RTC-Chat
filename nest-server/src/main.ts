import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {createProxyMiddleware} from 'http-proxy-middleware';
import {LoggerService} from '../config/LoggerService';
var proxy = require('http-proxy');
var apiProxy = proxy.createProxyServer();

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
      cors: true
    }
  );
  const API_SERVICE_URL = "http://localhost:3000";
  // sample = http://localhost:3001/mok-server/users
  app.useLogger(new LoggerService(this))
  app.use(
      '/mok-server/**',
      createProxyMiddleware({
        target: API_SERVICE_URL,
        changeOrigin: true,
        pathRewrite(pathReq, req) {
          const pathname = pathReq.split('/mok-server/');
          console.log(`${API_SERVICE_URL}/${pathname[1]}`);
          return `${API_SERVICE_URL}/${pathname[1]}`;
        }
      })
  );

  // WebPage 관련 프록시 설정 Sample
  // app.use(
  //   ['/**'],
  //   createProxyMiddleware({
  //     target: 'http://localhost:4201',
  //     changeOrigin: true,
  //     pathRewrite(pathReq, req) {
  //       console.log(`http://localhost:4201${pathReq}`);
  //       return `http://localhost:4201${pathReq}`;
  //     }
  //   })
  // );
  await app.listen(3001);
}
bootstrap();
