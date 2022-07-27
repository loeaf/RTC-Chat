$(function(){

	//tab 메뉴
	$(".tab_list li button").click(function(){
		var tab_id = $(this).attr("data-tab");

		$(".tab_list li").removeClass("active");
		$(".tabArea .tab_cont").removeClass("active");

		$(this).parent().addClass("active");
		$("#"+tab_id).addClass("active");
	});

	//감정표현 열기, 닫기
	$(".meta_feeling_open_btn").on("click", function() {
		if ($(".meta_feeling_open_btn").hasClass("on")) {
			$(".meta_feeling_open_btn").removeClass("on");
			$(".emoticon_box").removeClass("on");
		} else {
			$(".meta_feeling_open_btn").addClass("on");
			$(".emoticon_box").addClass("on");
		}
	});

	//상단 아이콘들 열기, 닫기
	$(".icon_updown_btn").on("click", function() {
		if ($(".icon_updown_btn").hasClass("on")) {
			$(".icon_updown_btn").removeClass("on");
			$(".updown_box").stop().slideUp();
		} else {
			$(".icon_updown_btn").addClass("on");
			$(".updown_box").stop().slideDown();
		}
	});

	//시점 토글
	$(".meta_viewpoint_btn").on("click", function() {
		$(".meta_viewpoint_btn").toggleClass("viewpoint03");
		$(".meta_viewpoint_btn").toggleClass("on");
	});

	//사운드 음소거 토글
	$(".meta_sound_btn").on("click", function() {
		$(".meta_sound_btn").toggleClass("on");
	});

	//마이크 음소거 토글
	$(".meta_mike_btn").on("click", function() {
		$(".meta_mike_btn").toggleClass("on");
	});

	//메뉴 안 1:1대화허용 토글
	$(".meta_conversation_btn").on("click", function() {
		$(".meta_conversation_btn").toggleClass("on");
	});

	// 친구목록 iframe 열고,닫기
	$('#chating_friend_list_btn').click(function (e) {
		$('#iframe').contents().find('#chating_wrap').addClass("friend_list_open");
		$('#iframe').contents().find('#chating_wrap').removeClass("chating_room_open");
		$('#iframe').contents().find('#chating_wrap').removeClass("chating_invite_open");
		chatingFriendList();
	});

	// 채팅방 iframe 열고,닫기
	$('#chating_room_open_btn').click(function (e) {
		$('#iframe').contents().find('#chating_wrap').addClass("chating_room_open");
		$('#iframe').contents().find('#chating_wrap').removeClass("friend_list_open");
		$('#iframe').contents().find('#chating_wrap').removeClass("chating_invite_open");
		chatingRoomIframeWrap();
		$('#chating_room_open_btn').addClass('on');
	});

});

function chatingFriendList() {
	$('.chating_widget_chat').toggleClass('chating_widget_chat_visible');
	$('#chating_room_open_btn').removeClass('on');
}

function chatingRoomIframeWrap() {
	$('.chating_widget_chat').toggleClass('chating_room_iframe_wrap');
	$('.chating_widget_chat').toggleClass('chating_widget_chat_visible');
	$('#chating_room_open_btn').removeClass('on');
}

//레이어 열기
function layerClickOpen(popID, tt){
	$("#" + popID).addClass('open');
	$(".tab_list li").removeClass("active");
	$(".tabArea .tab_cont").removeClass("active");
	$(".tab_list li:first-child").addClass("active");
	$(".tabArea .tab_cont:first-child").addClass("active");
}

//레이어 닫기
function layerClickClose(popID){
	$("#" + popID).removeClass('open');
	$(".tab_list li").removeClass("active");
	$(".tabArea .tab_cont").removeClass("active");
	$(".tab_list li:first-child").addClass("active");
	$(".tabArea .tab_cont:first-child").addClass("active");
}
