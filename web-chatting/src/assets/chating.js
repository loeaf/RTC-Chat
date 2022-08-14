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
