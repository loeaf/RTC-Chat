
// 해당 팝업 사이즈
var _width = '450';
var _height = '600';

// 팝업을 가운데 위치시키기 위해 아래와 같이 값 구하기
var _left = Math.ceil(( window.screen.width - _width )/2);
var _top = Math.ceil(( window.screen.height - _height )/2); 

// 충전하기 첫번째 윈도우 팝업
function openWinRecharge() {
	window.open('recharge_step1.html', '충전하기', 'width='+ _width +', height='+ _height +', left=' + _left + ', top='+ _top );
}
// 충전하기 두번째 윈도우 팝업
function openWinRechargeStep2() {
	window.open('recharge_step2.html', '충전하기', 'width='+ _width +', height='+ _height +', left=' + _left + ', top='+ _top );
}

// 내역보기 윈도우 팝업
function openWinBreakdown() {
	window.open('breakdown.html', '내역보기', 'width='+ _width +', height='+ _height +', left=' + _left + ', top='+ _top );
}