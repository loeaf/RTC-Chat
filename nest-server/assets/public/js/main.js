$(function () {
  //레이어팝업 검은배경 유무 (.maskYesBtn 과 .maskYesBtnClose 이 추가됨)
  $(".myLand_view .myLand_pop_open, .maskYesBtn").click(function () {
    $("#wrap").addClass("layerBg");
  });
  $(".myLand_pop .close, .maskYesBtnClose").click(function () {
    $("#wrap").removeClass("layerBg");
  });

  //홍보용 slider
  var promotion_slider = new Swiper(".promotion_slider .swiper-container", {
    centeredSlides: true,
    spaceBetween: 0,
    autoHeight: true,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".promotion_slider .pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".promotion_slider .swiper-next",
      prevEl: ".promotion_slider .swiper-prev",
    },
  });

  // tooltip 왼쪽 나옴
  $(".tip_w").powerTip({ placement: "w" });
  $(".tip_w").on("click", function () {
    if ($(this).parent().hasClass("active")) {
      $(".r_menu_list li").removeClass("active");
    } else {
      $(".r_menu_list li").removeClass("active");
      $(".r_menu_list .cityStyle_layer").removeClass("active");
      $(".r_menu_list .cityChoiceStyle_layer").removeClass("active");
      $(this).parent().addClass("active");
    }
    $.powerTip.hide();
  });
  $(".r_menu_list .active .tip_w").on("mouseenter", function () {
    $(this).powerTip("hide", true);
  });

  // tooltip 오른쪽으로 나옴
  $(".tip_e").powerTip({ placement: "e" });
  $(".tip_e").on("click", function () {
    if ($(this).parent().hasClass("active")) {
      $(".info_btn_list li").removeClass("active");
    } else {
      $(".info_btn_list li").removeClass("active");
      $(this).parent().addClass("active");
    }
    $.powerTip.hide();
  });
  $(".l_menu_list .active .tip_e").on("mouseenter", function () {
    $(this).powerTip("hide", true);
  });

  // tooltip 아래로 나옴
  $(".tip_s").powerTip({ placement: "s" });
  $(".tip_s").on("click", function () {
    $.powerTip.hide();
  });
  $("#header .util_icon .active .tip_s").on("mouseenter", function () {
    $(this).powerTip("hide", true);
  });

  // tooltip 위로 나옴
  $(".tip_n").powerTip({ placement: "n" });
  $(".tip_n").on("click", function () {
    $.powerTip.hide();
  });
  $("#header .util_icon .active .tip_n").on("mouseenter", function () {
    $(this).powerTip("hide", true);
  });

  //검색 결과 화면
  $(".search_input button").on("click", function () {
    // if ($(".search_view .land_search_area").hasClass("open")) {
    //   // $(".search_view .land_search_area").removeClass("open");
    // } else {
    //   $(".search_view .land_search_area").addClass("open");
    // }
  });

  $(".search_input input").keydown(function (keyNum) {
    if (keyNum.keyCode == 13) {
      $(".search_input .submit button").click();
    }
  });

  //검색 결과 화면 체크시 class추가
  $(".check_style_mix input:checkbox").on("click", function () {
    if ($(this).prop("checked")) {
      $(this).parent().addClass("check_on");
    } else {
      $(this).parent().removeClass("check_on");
    }
  });

  // 면적 조건 설정
  $("#landAreaSlider").slider({
    range: true,
    min: 0,
    max: 500,
    values: [0, 500],
    slide: function (event, ui) {
      $("#landAreaFor").val(ui.values[0] + "평 ~ " + ui.values[1] + "평");
    },
  });
  $("#landAreaFor").val($("#landAreaSlider").slider("values", 0) + "평 ~ " + $("#landAreaSlider").slider("values", 1) + "평");

  // 가격 조건 설정
  $("#landPriceSlider").slider({
    range: true,
    min: 0,
    max: 100,
    values: [0, 100],
    slide: function (event, ui) {
      $("#landPriceFor").val(ui.values[0] + " TR ~ " + ui.values[1] + " TR");
    },
  });
  $("#landPriceFor").val($("#landPriceSlider").slider("values", 0) + " TR ~ " + $("#landPriceSlider").slider("values", 1) + " TR");

  // 검색 상세페이지 중 토지정보 높이
  // var winHeight = $(window).height();
  // var lsl_address = $(".land_search_layer .lsl_address").innerHeight();
  // var lsl_price = $(".land_search_layer .lsl_price").innerHeight();
  // var lsl_img = $(".land_search_layer .lsl_img").innerHeight();
  // var lsl_intro = $(".land_search_layer .lsl_intro").innerHeight();
  // var lsl_bottom = $(".land_search_layer .lsl_bottom").innerHeight();
  // var lsl_Sum = lsl_address + lsl_price + lsl_img + lsl_intro + lsl_bottom;
  // var lsl_intro_height = winHeight - lsl_Sum - 1;
  // $(".land_search_layer .lsl_info").css("min-height",lsl_intro_height);


  // <<<<<<<<아래코드 필요 시 우현에게 문의>>>>>>>>>>>>>>>>>
  //select 스타일  a,button
  // $(".select_style .label").on("click", function () {
  //   // console.log('여기오냐구')
  //   if ($(this).parent().hasClass("open")) {
  //     // console.log('닫고')
  //     $(this).next("ul").stop().slideUp();
  //     $(this).parent().removeClass("open");
  //   } else {
  //     // console.log('열고')
  //     $(this).next("ul").stop().slideDown();
  //     $(this).parent().addClass("open");
  //   }
  //   return false;
  // });

  //조건검색 클릭시 상세 표출
  $(".setting_view .setting_search_btn").on("click", function () {
    // if ($(".setting_view").hasClass("search_open")) {
    // 	$(".setting_view").removeClass("search_open");
    // } else {
    // 	$(".setting_view").addClass("search_open");
    // }
  });
  //조건검색 다시하기 클릭시 조검검색 표출
  $(".setting_view .setting_search_again_btn").on("click", function () {
    if ($(".setting_view").hasClass("search_open")) {
      $(".setting_view").removeClass("search_open");
    } else {
      $(".setting_view").addClass("search_open");
    }
  });

  //tab 메뉴
  $(".tab_list li button").click(function () {
    // var tab_id = $(this).attr('data-tab');
    //
    // $('.tab_list li').removeClass('active');
    // $('.tabArea .tab_cont').removeClass('active');
    //
    // $(this).parent().addClass('active');
    // $("#"+tab_id).addClass('active');
  });

  //토큰 충전 하기
  $(".token_tab .token_recharge_btn").click(function () {
    $(".token_tab .token_cont").toggleClass("recharge_acitve");
  });
  //토큰 충전 완료시
  $(".token_tab .token_charging_btn").click(function () {
    if ($(".menu_view_open").hasClass("open")) {
      $(".menu_view_open").removeClass("open");
    }
    $(".login_layer_right").removeClass("open");
    $("#token_recharge_pop").addClass("open");
    $("#wrap").removeClass("wallet_open");
  });

  //토큰 환전 하기
  $(".token_tab .token_exchange_btn").click(function () {
    $(".token_tab .token_cont").toggleClass("exchange_acitve");
  });
  //환전 계좌 정보 입력 (은행선택)
  $(".token_tab .token_exchange_request_btn").click(function () {
    if ($(".menu_view_open").hasClass("open")) {
      $(".menu_view_open").removeClass("open");
    }
    $(".login_layer_right").removeClass("open");
    $("#token_exchange_bank_pop").addClass("open");
    $("#wrap").removeClass("wallet_open");
  });

  //메뉴 안의 목록 클릭시 오른쪽 팝업 오픈
  $(".result_list a.more").click(function (e) {
    $(".land_search_layer").addClass("open");
    $("#wrap").addClass("details_open");
  });
  $(".land_search_layer .close").click(function (e) {
    $(".land_search_layer").removeClass("open");
    $("#wrap").removeClass("details_open");
  });

  //로그인 후 아이콘 클릭시 레이어 팝업
  //$(".login_box .my_info button").click(function(){
  //  $(".login_layer_right").addClass("open");
  //  $("#wrap").addClass("wallet_open");
  //});
  //$(".login_layer_right .my_login_info .close").click(function(){
  //  $(".login_layer_right").removeClass("open");
  //  $("#wrap").removeClass("wallet_open");
  //});
  //로그인 후 버튼 백그라운드 랜덤으로 변경
  // var backgroundColor = ["#FF5857", "#FF800B", "#FFCA12", "#07CAB5", "#005DFD", "#0A1E50"];
  // $(".my_info button").css("background-color", backgroundColor[Math.floor(Math.random() * backgroundColor.length)]);

  //특별분양신청 클릭시 레이어팝업
  $(".special_sale_btn").click(function (e) {
    // e.preventDefault();
    // if ($(".menu_view_open").hasClass("open")) {
    //   $(".menu_view_open").removeClass("open");
    // }
    // $(".land_search_layer").removeClass("open");
    // $("#special_sale_apply_pop").addClass("open");
    // $("#wrap").removeClass("details_open");
  });

  //계약하기 클릭시 레이어팝업
  $(".contract_btn").click(function(e){
    e.preventDefault();
    if ($(".menu_view_open").hasClass("open")) {
      $(".menu_view_open").removeClass("open");
    }
    $(".land_search_layer").removeClass("open");
    $("#contract_pop").addClass("open");
    $("#wrap").removeClass("details_open");
  });

  //특별분양신청 동의 체크 확인
  $(".agree_box input[type='checkbox'].agree_checked").change(function () {
    var a = $(".agree_box input[type='checkbox'].agree_checked");
    if (a.length == a.filter(":checked").length) {
      $(".special_sale_agree_pop .next_view .next").addClass("check_on");
    } else {
      $(".special_sale_agree_pop .next_view .next").removeClass("check_on");
    }
  });

  //특별분양신청 닫기 클릭시 div삭제
  $(".special_sale_apply_pop .result_core .close, .contract_pop .result_core .close").click(function () {
    $(this).parent().hide();
  });

  //도움말 팁 박스 위치
  $(".tip_area .tip_btn").mouseover(function () {
    var divoffset = $(this).offset();
    $(".tip_area .tip_box").css({ top: divoffset.top + 33, left: divoffset.left + -5 });
    $(this).parent(".tip_area").addClass("box_fixed");
  });
  $(".tip_area .tip_btn").mouseleave(function () {
    $(this).parent(".tip_area").removeClass("box_fixed");
  });

  //토지상세 list slideToggle
  // $(".lsl_unfold .unfold_box .arrow").click(function () {
  //   $(this).parent().next(".cont").slideToggle();
  //   $(this).parents(".unfold_box").toggleClass("on");
  // });

  //공지시항 list slideToggle
  $(".more_view .notice_list .arrow").click(function () {
    $(this).parent().next(".cont").slideToggle();
    $(this).parents(".list").toggleClass("on");
  });

  //더보기 show hide
  $(".more_view .more_main_go").click(function () {
    //뒤로 버튼 누르면 무조건 처음으로
    $(".more_view .more_view_main").show(0);
    $(".more_view .more_view_notice").hide(0);
    $(".more_view .more_view_support").hide(0);
  });
  $(".more_view .notice_go").click(function () {
    //공지사항 버튼 클릭시
    $(".more_view .more_view_main").hide(0);
    $(".more_view .more_view_notice").show(0);
  });
  $(".more_view .support_go").click(function () {
    //고객지원 버튼 클릭시
    $(".more_view .more_view_main").hide(0);
    $(".more_view .more_view_support").show(0);
  });

  //메인 하단 오른쪽 지역 선택
  $(".r_map_list .cityChoiceStyle_area button").click(function () {
    if ($(this).parents(".control_group_r").hasClass("open")) {
      $(".control_group_r").removeClass("open");
      $(".cityStyle_layer").fadeOut(0);
    } else {
      $(this).parents(".control_group_r").addClass("open");
      $(".cityStyle_layer").fadeIn(400);
    }
  });
  //지역 리스트 텍스트 추출
  $(".r_map_list .cityStyle_area button").click(function () {
    var cityText = $(this).text();
    $(".control_group_r").removeClass("open");
    $(".cityStyle_layer").fadeOut(0);
    // $(".r_map_list .cityChoiceStyle_area button").text(cityText);
  });

  //메인 하단 오른쪽 반응형시 지도 선택
  $(".r_map_list .mapChoice_area button").click(function () {
    if ($(this).parents(".control_group_r").hasClass("openMapList")) {
      $(".control_group_r").removeClass("openMapList");
    } else {
      $(this).parents(".control_group_r").addClass("openMapList");
    }
  });
  //지도 리스트 텍스트 추출
  $(".r_map_list .mapStyle_area button").click(function () {
    var mapChoiceText = $(this).text();
    $(".control_group_r").removeClass("openMapList");
    $(".r_map_list .mapChoice_area button").text(mapChoiceText);
  });

  //목록 상세 주소전체보기
  $(".land_search_layer .address_detail .address_view").click(function () {
    var addressType01 = $(".land_search_layer .address .type01").text();
    var addressType0201 = $(".land_search_layer .address .type0201").text();
    var addressType0202 = $(".land_search_layer .address .type0202").text();

    if ($(this).parent(".address_detail").hasClass("open")) {
      $(this).siblings(".address_detail_box").stop().slideUp();
      $(this).parent(".address_detail").removeClass("open");
      $(".land_search_layer .address_detail .address_detail_box .type01").empty(addressType01);
      $(".land_search_layer .address_detail .address_detail_box .type0201").empty(addressType0201);
      $(".land_search_layer .address_detail .address_detail_box .type0202").empty(addressType0202);
    } else {
      $(".land_search_layer .address_detail .address_detail_box .type01").text(addressType01);
      $(".land_search_layer .address_detail .address_detail_box .type0201").text(addressType0201);
      $(".land_search_layer .address_detail .address_detail_box .type0202").text(addressType0202);
      $(this).siblings(".address_detail_box").stop().slideDown();
      $(this).parent(".address_detail").addClass("open");
    }
  });

  // nft 상세 Details 버튼
  $(".details_area .details_label").on("click", function () {
    if ($(this).parent().hasClass("open")) {
      $(this).next(".details_cont").stop().slideUp();
      $(this).parent().removeClass("open");
    } else {
      $(this).next(".details_cont").stop().slideDown();
      $(this).parent().addClass("open");
    }
    return false;
  });

  // nft 상세 공유하기
  $(".nft_utility .nft_share").on("click", function () {
    if ($(this).parent("li").hasClass("open")) {
      $(this).next(".nft_utility_box").stop().slideUp();
      $(this).parent("li").removeClass("open");
    } else {
      $(".util_more .nft_utility_box").stop().slideUp();
      $(".nft_utility li").removeClass("open");
      $(this).next(".nft_utility_box").stop().slideDown();
      $(this).parent("li").addClass("open");
    }
    return false;
  });
  // nft 상세 더보기
  $(".nft_utility .nft_more").on("click", function () {
    if ($(this).parent("li").hasClass("open")) {
      $(this).next(".nft_utility_box").stop().slideUp();
      $(this).parent("li").removeClass("open");
    } else {
      $(".share_list .nft_utility_box").stop().slideUp();
      $(".nft_utility li").removeClass("open");
      $(this).next(".nft_utility_box").stop().slideDown();
      $(this).parent("li").addClass("open");
    }
    return false;
  });

  // 메뉴 콘텐츠 맨 하단 공지사항 슬라이드
  // var noticeBanner = new Swiper(".notice_area .swiper-container", {
  //   direction: "vertical", //방향 셋팅 vertical 수직, horizontal 수평 설정이 없으면 수평
  //   slidesPerView: 1, //한번에 보여지는 페이지 숫자
  //   spaceBetween: 30, //페이지와 페이지 사이의 간격
  //   debugger: true, //드레그 기능 true 사용가능 false 사용불가
  //   mousewheel: true, //마우스 휠기능 true 사용가능 false 사용불가
  //   loop: true, //반복 기능 true 사용가능 false 사용불가
  //   centeredSlides: true, //선택된 슬라이드를 중심으로 true 사용가능 false 사용불가 djqt
  //   // effect: 'fade', // 페이지 전환효과 slidesPerView효과와 같이 사용 불가
  //   speed: 1000,
  //   autoplay: {
  //     //자동 스크를링
  //     delay: 3500, //시간 1000 이 1초
  //     disableOnInteraction: false,
  //   },
  // });

  // dialogBox
  $(".dialogClick").on("click", function () {
    $(".dialogBox").fadeOut();
    $(".dialogBox").fadeIn();
    setTimeout(function () {
      testEle = $(".dialogBox");
      testEle.fadeOut();
    }, 3000);
  });

  //로그인 후 이름이나 사진 클릭시
  $(".login_box .my_info_open").on("click", function () {
    if ($(".login_box").hasClass("active")) {
      $(".login_box").removeClass("active");
    } else {
      $(".login_box").addClass("active");
    }
    return false;
  });
  $("body").on("click",function(){
    $(".login_box").removeClass("active");
  });

  //분양일정
  $(".sch_btn").on("click",function(){
    // if( $(".sch_pop").hasClass("sch_open")){
    //   $(".sch_pop").removeClass("sch_open");
    // }else{
    //   $(".sch_pop").addClass("sch_open");
    // }
    // return false;
  });
  $(".sch_pop .sch_pop_close").on("click",function(){
    $(".sch_pop").removeClass("sch_open");
  });

  //크롬 제외 다른 브라우저에서 뜨는 알림 레이어
  var userAgent = window.navigator.userAgent.toLowerCase();
  // var platform = navigator.platform.toLowerCase();
  switch (true) {
    case userAgent.indexOf("edge") > -1:
      //bwName = "MS Edge"; // MS 엣지
      $(".browser_check_box").addClass("not_chrome");
      break;
    case userAgent.indexOf("edg/") > -1:
      //bwName = "Edge (chromium based)"; // 크롬 기반 엣지
      $(".browser_check_box").addClass("not_chrome");
      break;
    case userAgent.indexOf("opr") > -1 && !!window.opr:
      $(".browser_check_box").addClass("not_chrome");
      //bwName = "Opera"; // 오페라
      break;
    case userAgent.indexOf("chrome") > -1 && !!window.chrome:
          // && platform.indexOf("linux armv81") < 0 && platform.indexOf("linux armv8i") < 0
          // && platform.indexOf("linux armv8l") < 0 && platform.indexOf("linux aarch64") < 0:
      // 이 case문에서 OS를 타서 모바일 환경에서 접속했는데도 불구하고, PC버전 크롬으로 간주하지 않도록 조건 추가
      //bwName = "Chrome"; // 크롬
      $(".browser_check_box").removeClass("not_chrome");
      break;
    case userAgent.indexOf("trident") > -1:
      $(".browser_check_box").addClass("not_chrome");
      //bwName = "MS IE"; // 익스플로러
      break;
    case userAgent.indexOf("firefox") > -1:
      //bwName = "Mozilla Firefox"; // 파이어폭스
      $(".browser_check_box").addClass("not_chrome");
      break;
    case userAgent.indexOf("safari") > -1:
      $(".browser_check_box").addClass("not_chrome");
      //bwName = "Safari"; // 사파리
      break;
    // case userAgent.indexOf("whale") > -1:
    //   $(".browser_check_box").addClass("not_chrome");
    //   //bwName = "Whale"; // 네이버 웨일
    //   break;
    default:
      //bwName = "other"; // 기타
      $(".browser_check_box").addClass("not_chrome");
  }
  $(".browser_check_box .close").on("click",function(){
    $(".browser_check_box").css("display","none");
  });

  // 고객지원 푸터 이벤트
  $(".more_view_support .support_footer .foot_btn").click(function(){
    $(this).parents(".more_view_support").toggleClass("foot_on");
  });

  // 스크린 사이즈
  $(window).on('load resize', function () {
    $('#view_contents').css('height','100%');
  });

  //이용가이드
  // window.onload = function() {
  //   $(".user_guide_area").fadeIn();
  //   // $(".search_view").addClass("open");
  //   $("#wrap").addClass("user_guide_load");
  // };
  // $(".service_info .user_guide_open").on("click",function(){
  //   $(".user_guide_area").fadeIn();
  //   $(".search_view").addClass("open");
  // });
  // $(".user_guide_area .close").on("click",function(){
  //   $("#wrap").removeClass("user_guide_load");
  //   $(".user_guide_area").fadeOut();
  //   $(".search_view").removeClass("open");
  // });

  //반응형
  $(window).on("load resize", function () {
    var winWidth = $(window).width();
    var winHeight = $(window).height();

    if (window.innerWidth <= 890) {
      //가로 890이하(포함)

      //메뉴 안의 목록 클릭시 오른쪽 팝업 오픈
      $(".result_list a.more").click(function () {
        $(".menu_view_open").removeClass("open"); //list 목록 닫기
      });

      //대메뉴 클릭시 상세 페이지 닫힘
      $("#nav li a").on("click", function () {
        $(".land_search_layer").removeClass("open"); //상세 닫기
        $(".login_layer_right").removeClass("open"); //마이월넷 닫기
        $("#wrap").removeClass("details_open"); //메인 맨 하단 버튼 모음 위치
        $("#wrap").removeClass("wallet_open"); //메인 맨 하단 버튼 모음 위치
      });

      //로그인 후 아이콘 클릭시 레이어 팝업
      $(".login_box .my_info button").click(function () {
        $(".menu_view_open").removeClass("open"); //list 목록 닫기
      });
    }

    // if(window.innerWidth <= 1023){ //가로 1023이하(포함)
    //   //이용가이드
    //   $(".user_guide_load .search_view").removeClass("open");
    //   $(".user_guide_fixpage .search_view").removeClass("open");
    //   window.onload = function() {
    //     $(".user_guide_load .search_view").removeClass("open");
    //   };
    // } else {
    //   if($("#wrap").hasClass("user_guide_load")){
    //     $(".search_view").addClass("open");
    //   } else if($("#wrap").hasClass("user_guide_fixpage")){
    //     $(".search_view").addClass("open");
    //   } else {
    //     $(".search_view").removeClass("open");
    //   }
    // }

    if(window.innerWidth <= 1023){ //가로 1023이하(포함)
      //이용가이드
      $(".user_guide_load .search_view").removeClass("open");
      $(".user_guide_fixpage .search_view").removeClass("open");
      $(".user_guide_load .nav_search").removeClass("active"); //추가
      $(".user_guide_fixpage .nav_search").removeClass("active"); //추가
    } else {
      if($("#wrap").hasClass("user_guide_load")){
        $("#nav li").removeClass("active"); //추가
        $(".menu_view_open").removeClass("open"); //추가
        $(".nav_search").addClass("active"); //추가
        $(".search_view").addClass("open");
      } else if($("#wrap").hasClass("user_guide_fixpage")){
        $("#nav li").removeClass("active"); //추가
        $(".menu_view_open").removeClass("open"); //추가
        $(".nav_search").addClass("active"); //추가
        $(".search_view").addClass("open");
      } /* 제거 else {
		$(".search_view").removeClass("open");
	} */
    }









    if(window.innerWidth <= 520){ //가로 520이하(포함)
      //기본 세팅
      let vh = window.innerHeight * 0.01; document.documentElement.style.setProperty('--vh', `${vh}px`);
      //화면 리사이즈시 변경
      window.addEventListener('resize', () => { let vh = window.innerHeight * 0.01; document.documentElement.style.setProperty('--vh', `${vh}px`); });
      window.addEventListener('touchend', () => { let vh = window.innerHeight * 0.01; document.documentElement.style.setProperty('--vh', `${vh}px`); });
    }

  });
  $(window).trigger("resize");

});

//레이어 열기
function layerClickOpen(popID, tt) {
  $(".detail_view").removeClass("open");
  $("#wrap").removeClass("layerOpen");
  $("#wrap").addClass("layerOpen");
  $("#" + popID).addClass("open");
  $(".tab_list li").removeClass("active");
  $(".tabArea .tab_cont").removeClass("active");
  $(".tab_list li:first-child").addClass("active");
  $(".tabArea .tab_cont:first-child").addClass("active");
}

//레이어 닫기
function layerClickClose(popID) {
  $("#" + popID).removeClass("open");
  $("#wrap").removeClass("layerOpen");
  $("#nav li").removeClass("active");
  $(".tab_list li").removeClass("active");
  $(".tabArea .tab_cont").removeClass("active");
  $(".tab_list li:first-child").addClass("active");
  $(".tabArea .tab_cont:first-child").addClass("active");
}

// 숫자입력 안되게
function checkNumber(event, min, max) {
  // if (event.key === "." || event.key === "-" || (event.key >= min && event.key <= max)) {
  if ((event.key >= min && event.key <= max)) {
    return true;
  }

  return false;
}
//
// window.onbeforeunload = function () {
//   debugger;
//   console.log('sadasdasdsadas')
//   debugger;
//   // return alert('sadasdasd')
//   // return "저장되지 않은 변경사항이 있습니다. 정말 페이지를 떠나실 건 가요?";
// };
