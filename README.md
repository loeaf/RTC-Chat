# RTC-Chat
- mok-server : 목업 서버로써 목업 데이터를 기본 Rest 형태로 제공
  -> localhost:3000
- nest-server : 리버스 프록시 및 token 발급
-> localhost:3001
-> localhost:3001/mok/api > localhost:3000으로 프록시 셋팅되어 있음
- web-chatting : 챗팅 client 서비스 지원
-> localhost:4200
