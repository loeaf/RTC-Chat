$(function(){
  setTimeout(function() {
    //하단 검색박스 화살표 클릭
    $(".talk_send_more_btn .label").on("click",function(){
      if( $(this).parent().hasClass("open")){
        $(this).next("ul").stop().slideUp();
        $(this).parent().removeClass("open");
      }else{
        $(this).next("ul").stop().slideDown();
        $(this).parent().addClass("open");
      }
      return false;
    });

    //tab 메뉴 (친구목록)
    $(".friend_list .chating_tab li button").click(function(){
      var tab_id = $(this).attr("data-tab");

      $(".friend_list .chating_tab li").removeClass("active");
      $(".friend_list .chating_tab_area .tab_cont").removeClass("active");

      $(this).parent().addClass("active");
      $("#"+tab_id).addClass("active");
    });

    //tab 메뉴 (친구초대)
    $(".chating_invite .chating_tab li button").click(function(){
      var tab_id = $(this).attr("data-tab");

      $(".chating_invite .chating_tab li").removeClass("active");
      $(".chating_invite .chating_tab_area .tab_cont").removeClass("active");

      $(this).parent().addClass("active");
      $("#"+tab_id).addClass("active");
    });

    //tab 메뉴 (채팅방)
    $(".chating_room_tab li button").click(function(){
      var tab_id = $(this).attr("data-tab");

      $(".chating_room_tab li").removeClass("active");
      $(".chating_room .chating_tab_area .tab_cont").removeClass("active");

      $(this).parent().addClass("active");
      $("#"+tab_id).addClass("active");
    });

    // 닫기 클릭시 탭 첫번째로 활성화
    $(".top_close_area .top_close").on("click",function(){
      //tab 메뉴 (친구목록) 첫번째 활성화
      $(".friend_list .chating_tab li").removeClass("active");
      $(".friend_list .chating_tab_area .tab_cont").removeClass("active");
      $(".friend_list .chating_tab li:first-child").addClass("active");
      $(".friend_list .chating_tab_area .tab_cont:first-child").addClass("active");

      //tab 메뉴 (친구초대) 첫번째 활성화
      $(".chating_invite .chating_tab li").removeClass("active");
      $(".chating_invite .chating_tab_area .tab_cont").removeClass("active");
      $(".chating_invite .chating_tab li:first-child").addClass("active");
      $(".chating_invite .chating_tab_area .tab_cont:first-child").addClass("active");

      //tab 메뉴 (채팅방) 첫번째 활성화
      $(".chating_room_tab li").removeClass("active");
      $(".chating_room .chating_tab_area .tab_cont").removeClass("active");
      $(".chating_room_tab li:first-child").addClass("active");
      $(".chating_room .chating_tab_area .tab_cont:first-child").addClass("active");

      $(".talk_send_more_btn").removeClass("open");
      $(".talk_send_more_btn .label").next("ul").stop().slideUp();
    });


    // 친구목록 열기
    $(".friend_list_on_btn").on("click",function(){
      $("#chating_wrap").removeClass("chating_room_open");
      $("#chating_wrap").removeClass("chating_invite_open");
      $("#chating_wrap").addClass("friend_list_open");
      $('.chating_widget_chat',parent.document).removeClass('chating_room_iframe_wrap');
    });

    // 친구초대 열기
    $(".invite_on_btn").on("click",function(){
      $("#chating_wrap").removeClass("chating_room_open");
      $("#chating_wrap").removeClass("friend_list_open");
      $("#chating_wrap").addClass("chating_invite_open");
      $('.chating_widget_chat',parent.document).removeClass('chating_room_iframe_wrap');
    });

    // 채팅방 열기
    $(".chating_room_on_btn").on("click",function(){
      $("#chating_wrap").removeClass("friend_list_open");
      $("#chating_wrap").removeClass("chating_invite_open");
      $("#chating_wrap").addClass("chating_room_open");
      $('.chating_widget_chat',parent.document).addClass('chating_room_iframe_wrap');
      $('#chating_room_open_btn',parent.document).addClass('on');
    });

  }, 3000);
});

//레이어 열기
function layerClickOpenM(popID){
	$('#wrap').removeClass('layerOpen');
	$('#wrap').addClass('layerOpen');
	$('#' + popID).addClass('open');
	$('body').append('<div class="mask" style="display:block"></div>');
}

//레이어 닫기
function layerClickCloseM(popID){
	$('#' + popID).removeClass('open');
	$('#wrap').removeClass('layerOpen');
	$('.mask').remove();
}
