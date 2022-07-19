// var mapInited = false;

/**
 * 파일 수정 불가
 * 수정 필요시 현성길/부장에게 요청
 * @since 2021-06-01
 */

function jsInitMap() {
  // 엔진 구동 init 스크립트 로드
  var initScript = document.createElement("script");

  /*	브이월드 서비스 키를 사용하시는 경우 기본 init.js 활용,
        사용하지 않고 임시로 Google 영상 이미지를 적용하는 경우 init_without_key.js 를 활용합니다. */
  // initScript.src = "./assets/js/init_without_key.js";
  initScript.src = "./assets/js/init.js";

  document.body.appendChild(initScript);
}

// /**
//  * 맵 초기화 완료되었는지 여부
//  * @returns
//  */
// function jsIsMapInited(){
//     return mapInited;
// }


function showToast(msg, type){
  // angular 함수 호출
  window.angularComponentRef.zone.run(() => {
    window.angularComponentRef.showToast(msg, type);
  });
}


function catchAboutSession(message){
  // angular 함수 호출
  window.angularComponentRef2.zone.run(() => {
    window.angularComponentRef2.catchAboutSession(message);
  });
}

function asssetReset(){
  // angular 함수 호출
  window.angularComponentRef3.zone.run(() => {
    window.angularComponentRef3.asssetReset();
  });
}

window.onbeforeunload = function onbeforeunloadEvt(){
  // angular 함수 호출
  window.angularComponentRef5.zone.run(() => {
      window.angularComponentRef5.onbeforeunloadEvt();
  });
}




