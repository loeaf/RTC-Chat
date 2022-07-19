$(function(){

	//상단메뉴 링크 마우스오버시 //**삭제
	//$('#header a').on('mouseenter', function() { //**삭제
	//	detailViewClose(); //**삭제
	//}); //**삭제

	//도움말 레이어 열기/닫기 //**추가
	$(".util_icon .icon_help a").click(function(){ //**추가
		detailViewClose(); //**추가

		$("#wrap").addClass("layerOpen"); //**추가
		$("#helpPop").addClass("open"); //**추가
		$("#wrap").addClass("maskOn"); //**추가
	}); //**추가
	$(".help_pop .close").click(function(){ //**추가
		$("#helpPop").removeClass('open'); //**추가
		$("#wrap").removeClass("layerOpen"); //**추가
		$("#wrap").removeClass("maskOn"); //**추가
	}); //**추가

	//왼쪽 사이드 팝업
	$('.maskNoBtn').click(function(){
		$("#wrap").addClass("maskNo");
	});
	$('.maskNoBtnClose').click(function(){
		$("#wrap").removeClass("maskNo");
	});

	//메뉴레이어 열기/닫기
	$(".l_menu_list .menu a").click(function(){
		//toggleInfoClose();
		detailViewClose();

		$("#wrap").addClass("layerOpen");
		$("#menu_view").addClass("open");
		$("#wrap").addClass("maskOn"); //**추가
	});
	$(".menu_view .close").click(function(){
		$("#menu_view").removeClass('open');
		$("#wrap").removeClass("layerOpen");
		$("#wrap").removeClass("maskNo");
		$("#wrap").removeClass("maskOn"); //**추가
	});

	//메뉴상세 slider
    var top_slider = new Swiper('.top_slider .swiper-container', {
		centeredSlides: true,
		spaceBetween: 0,
		autoHeight: true,
		loop: true,
		//autoplay: {
		//	delay: 2000,
		//	disableOnInteraction: false,
		//},
		pagination: {
			el: ".top_slider .pagination",//**추가
			clickable: true,
		},
		navigation: {
			nextEl: '.top_slider .swiper-next',
			prevEl: '.top_slider .swiper-prev',
		},
    });

	//지구정보 slider //**추가
    var district_slider = new Swiper('.district_slider .swiper-container', { //**추가
		centeredSlides: true, //**추가
		spaceBetween: 0, //**추가
		autoHeight: true, //**추가
		loop: true, //**추가
		//autoplay: { //**추가
		//	delay: 2000, //**추가
		//	disableOnInteraction: false, //**추가
		//}, //**추가
		pagination: { //**추가
			el: ".district_slider .pagination", //**추가
			clickable: true, //**추가
		}, //**추가
		navigation: { //**추가
			nextEl: '.district_slider .swiper-next', //**추가
			prevEl: '.district_slider .swiper-prev', //**추가
		}, //**추가
    }); //**추가

	//지구정보
	/*
	$(".l_menu_list .district-info a").click(function(){
		//var info_open = $(this);
		if($(this).hasClass('open')){
			toggleInfoClose();
		} else {
			$(this).addClass("open");
			$(".control_group_l .info_list").stop().slideDown(300);
			//$(".control_group_l .info_list").addClass("active");
		}
		detailViewClose();
	});
	*/

	//지구정보 레이어 열기/닫기
	$(".l_menu_list .district-info a").click(function(){
		$("#wrap").addClass("layerOpen");
		$("#info_view").addClass("open");
		$("#wrap").addClass("maskOn"); //**추가
		$(".detail_view").removeClass('open');//**추가
	});
	$(".info_view .open_info_list").click(function(){
		$("#info_view").removeClass('open');
		$("#wrap").removeClass("layerOpen");
		$("#wrap").removeClass("maskOn"); //**추가
		infoViewEventClose();
	});

	// tooltip 왼쪽 나옴
	$(".tip_w").powerTip({ placement: "w" });
	$(".tip_w").on("click", function() {

		if ($(this).parent().hasClass("active")) {
			$(".r_menu_list li").removeClass("active");

		} else {
			$(".r_menu_list li").removeClass("active");
			$(this).parent().addClass("active");
		}

		$.powerTip.hide();
		//$('.r_menu_list .active .tip_w').on('mouseenter', function() {
		//	$(this).powerTip("hide", true);
		//});

	});
	$('.r_menu_list .active .tip_w').on('mouseenter', function() {
		$(this).powerTip("hide", true);
	});

	// 툴팁 오른쪽으로 나옴
	$(".tip_e").powerTip({ placement: "e" });
	$(".tip_e").on("click", function() {
		//$.powerTip.hide(); //**삭제

		if ($(this).parent().hasClass("active")) { //**추가
			$(".info_btn_list li").removeClass("active"); //**추가
		} else { //**추가
			$(".info_btn_list li").removeClass("active"); //**추가
			$(this).parent().addClass("active"); //**추가
		} //**추가
		$.powerTip.hide(); //**추가
	});
	$('.l_menu_list .active .tip_e').on('mouseenter', function() {
		$(this).powerTip("hide", true);
	});

	// 툴팁 아래로 나옴
	$(".tip_s").powerTip({ placement: "s" });
	$(".tip_s").on("click", function() {
		$.powerTip.hide();
	});
	$('#header .util_icon .active .tip_s').on('mouseenter', function() {
		$(this).powerTip("hide", true);
	});

	// 툴팁 위로 나옴 //**추가
	$(".tip_n").powerTip({ placement: "n" }); //**추가
	$(".tip_n").on("click", function() { //**추가
		$.powerTip.hide(); //**추가
	}); //**추가
	$('#header .util_icon .active .tip_n').on('mouseenter', function() { //**추가
		$(this).powerTip("hide", true); //**추가
	}); //**추가

	$(".r_menu_list .close, .info_btn_list .close").on("click", function() { //**추가수정
		$(this).parent().parent().removeClass("active");
	});
	$(".r_menu_list .icon_streetView, .r_menu_list .icon_aerialPhotograph, .l_menu_list a").on("click", function() {
		//$(this).parent().removeClass("active");
		$(".r_menu_list li").removeClass("active");
	});

	// 일조정보
	// 계절별 태양위치
	$("#seasonal-slider").slider({
		//min: 1,
		//max: 4,
		orientation: "horizontal",
		range: "min",
		animate: true,
		slide: function(event, ui) {
			$(".valueTxt").val(ui.value);
		}
	});
	$(".valueTxt").val($("#seasonal-slider").slider("value"));

	// 시간별 태양위치
	$("#hourly-slider").slider({
		//min: 1,
		//max: 3,
		orientation: "horizontal",
		range: "min",
		animate: true,
		slide: function(event, ui) {
			$(".valueTxt2").val(ui.value);
		}
	});
	$(".valueTxt2").val($("#hourly-slider").slider("value"));

	// 스크롤바
	$(".detail_info_group, .menu_view_con").mCustomScrollbar();
	$(".check_land .land_list").mCustomScrollbar();//**추가

	//메뉴 리스트에서 내용 누를경우 나오는 팝업 //**추가
	$(".thumb_list .thumb_con li a").on("click", function() { //**추가
		$("#wrap").removeClass("layerOpen"); //**추가
		$("#wrap").removeClass("maskNo"); //**추가
		$("#wrap").removeClass("maskOn"); //**추가
		$("#menu_view").removeClass('open'); //**추가
	}); //**추가

	//토지이용 누르면 나오는 레이어팝업  //**추가
	$(".check_landUse").on("click", function() { //**추가
		if ($(".info_list_wrap .check_land").hasClass("active")) { //**추가
			$(".check_land").removeClass("active"); //**추가
			$("input:checkbox[id='info_check_01']").attr("checked"); //**추가
		} else { //**추가
			$(".check_land").addClass("active"); //**추가
			$("input:checkbox[id='info_check_01']").removeAttr("checked"); //**추가
		} //**추가
	}); //**추가
	$(".check_land .close").on("click", function() { //**추가
		$(".check_land").removeClass("active"); //**추가
		$(".info_list_wrap .check_land").removeClass("active"); //**추가
		$("input:checkbox[id='info_check_01']").removeAttr("checked"); //**추가
	}); //**추가

	//새로고침 될때마다 일정 class 추가  //**추가
	window.onload = function() { //**추가
		$(".detail_view").addClass('open');//**추가
		$(".info_btn_list_down a").addClass('on'); //**추가
		$(".info_btn_list").stop().slideDown(300); //**추가
		$(".district_page .detail_view").removeClass('open'); //**추가 지구정보쪽(index.html)은 .detail_view가 처음부터 활성화가 안됨
	}; //**추가

	//동영상 레이어 팝업 열기/닫기  //**추가
	$("a.videoShow").on("click", function() { //**추가
		$(".layerVideoBox").addClass('video_active'); //**추가
	}); //**추가
	$(".layerVideoBox .close").on("click", function() { //**추가
		$(".layerVideoBox").removeClass('video_active'); //**추가
	}); //**추가

	//견본주택보기 레이어 팝업 열기/닫기 //**추가
	$("a.sampleHouseShow").on("click", function() { //**추가
		$(".layerSampleHouse").addClass('house_active'); //**추가
	}); //**추가
	$(".layerSampleHouse .close, .sampleHouseClose").on("click", function() { //**추가
		$(".layerSampleHouse").removeClass('house_active'); //**추가
	}); //**추가

});



//지구정보 레이어 닫기
function toggleInfoClose(){
	$(".l_menu_list .district-info a").removeClass("open");
	$(".control_group_l .info_list").stop().slideUp(300);
	//$(".info_list input[name=info_check]").prop("checked", false);
}

//지구정보 활성화/체크박스 보이게
function infoViewEventClose(){
	$(".detail_view").removeClass('open');
	$("#wrap").removeClass("layerOpen");
	$(".focusOn").focus().removeClass("focusOn");
	$(".control_group_l .info_list").stop().slideDown(300); //**추가
	$(".l_menu_list .district-info a").addClass("on");
}

//상세레이어 닫기
function detailViewClose(){
	$(".detail_view").removeClass('open');
	$("#wrap").removeClass("layerOpen");
	$(".focusOn").focus().removeClass("focusOn");
}

//정보상세 레이어 열기
function layerClickOpen(popID, tt){
	$(".detail_view").removeClass('open');
	$("#wrap").removeClass("layerOpen");
	$("#wrap").addClass("layerOpen");
	$("#" + popID).addClass('open');
	$("#" + popID).find('.close').focus();
	$(tt).addClass("focusOn");
}

//정보상세 레이어 닫기
function layerClickClose(popID){
	$("#" + popID).removeClass('open');
	$("#wrap").removeClass("layerOpen");
	$(".focusOn").focus().removeClass("focusOn");
}
