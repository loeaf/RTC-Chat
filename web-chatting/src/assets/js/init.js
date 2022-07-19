// 엔진 로드 후 실행할 초기화 함수(Module.postRun)
function init() {
  // angular 함수 호출
  window.angularComponentRef.zone.run(() => {
    window.angularComponentRef.mapInited(Module);
  });

  // captureMap();
  // console.log("<<init");
}

function captureMap() {
  const mapCanvas = Module.canvas;
  if (null === mapCanvas) {
    return;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = mapCanvas.width;
  canvas.height = mapCanvas.height;

  //
  const img = new Image();
  img.src = mapCanvas.toDataURL();

  img.onload = () => {
    ctx.drawImage(img, 0, 0);

    // ctx.beginPath();
    // ctx.rect(20, 20, 150, 100);
    // ctx.stroke();

    canvas.toBlob((e) => {
      const data = URL.createObjectURL(e);
      const elink = document.createElement("a");

      elink.setAttribute("href", data);
      elink.setAttribute("download", "MapScreenShot.png");
      document.body.appendChild(elink);
      //   elink.click();
      //   document.body.removeChild(elink);

      return true;
    });
  };
}

var Module = {
  TOTAL_MEMORY: 256 * 1024 * 1024,
  postRun: [init],
  canvas: (function () {
    // Canvas 엘리먼트 생성
    var canvas = document.createElement("canvas");

    // Canvas id, Width, height 설정
    canvas.id = "canvas";
    canvas.width = "calc(100%)";
    canvas.height = "100%";

    // Canvas 스타일 설정
    //canvas.style.position = "fixed";
    canvas.style.top = "0px";
    canvas.style.left = "0px";

    canvas.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });

    // 화면 저장을 위해 버퍼 설정이 필요합니다.
    var context = canvas.getContext("webgl", {
      preserveDrawingBuffer: true,
    });
    canvas.getContext("webgl2", {
      preserveDrawingBuffer: true,
    });

    // 생성한 Canvas 엘리먼트를 body에 추가합니다.
    document.querySelector("#map").appendChild(canvas);
    return canvas;
  })(),
};

// 엔진 파일 로드
(function () {
  // 1. XDWorldEM.asm.js 파일 로드
  var file = "./assets/js/engine/XDWorldEM.asm.js";

  var xhr = new XMLHttpRequest();
  xhr.open("GET", file, true);
  xhr.onload = function () {
    var script = document.createElement("script");
    script.innerHTML = xhr.responseText;
    document.body.appendChild(script);

    // 2. XDWorldEM.html.mem 파일 로드
    setTimeout(function () {
      (function () {
        var memoryInitializer = "./assets/js/engine/XDWorldEM.html.mem";
        var xhr = (Module["memoryInitializerRequest"] = new XMLHttpRequest());
        xhr.open("GET", memoryInitializer, true);
        xhr.responseType = "arraybuffer";
        xhr.onload = function () {
          // 3. XDWorldEM.js 파일 로드
          var url = "./assets/js/engine/XDWorldEM.js";
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);
          xhr.onload = function () {
            var script = document.createElement("script");
            script.innerHTML = xhr.responseText;
            document.body.appendChild(script);
          };
          xhr.send(null);
        };
        xhr.send(null);
      })();
    }, 1);
  };
  xhr.send(null);
})();
