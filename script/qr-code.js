function canvas() {
  $('canvas').attr('id', 'canvas'); //canvasにidをつける
};

function hidden() {
  $('#op-qrcode').empty();
};

function toggle_color_pick2() {
  if ($('#toggle_color_pick_btn')[0].value == 'Open') {
    $('#toggle_color_pick_btn')[0].value = 'Close'
    $('#sub_color').css('display','');
  }else {
    $('#toggle_color_pick_btn')[0].value = 'Open'
    $('#sub_color').css('display','none');
  }
}

$('#make').on('click', function(){ //makeボタンが押された場合の処理
  hidden(); //二回目にmakeがクリックされた場合の処理
  var input = $('#ip-qrcode').val(); //テキストを取得
  var size = $('#size').val(); //サイズを取得
  var text = unescape(encodeURIComponent(input));//日本語対応
  if (input == '') { //テキストが入力されていなかった場合の処理
    alert('文字を入力してください。');
  } else if (size > 0) { //サイズが指定されている場合の処理
    $('#op-qrcode').qrcode({text: text, width: size, height: size});
    // QRコードのサイズ指定
    $('#op-qrcode').css('width',size);
    $('#op-qrcode').css('height',size);
    canvas();
  } else { //サイズが指定されていない場合の処理
    $('#op-qrcode').qrcode({text: text, width: 500, height: 500});
    $('#op-qrcode').css('width',500);
    $('#op-qrcode').css('height',500);
    canvas();
  }
  back_color();
});

function back_color() {
  // QRコードの色付け
  let left_color = document.getElementById('left_color');
  if ($('#toggle_color_pick_btn')[0].value == 'Open') {
    // 単色処理
    $('#op-qrcode').css('background',`${left_color.value}`);
  }else {
    // 角度を取得
    var angle = $('#angle').val();
    // 副色を取得
    let right_color = document.getElementById('right_color');
    // グラデーションの処理
    $('#op-qrcode').css('background',`linear-gradient(${angle}, ${left_color.value}, ${right_color.value})`);
    $('#op-qrcode').css('background',`-webkit-linear-gradient(${angle-30}deg, ${left_color.value}, ${right_color.value})`);
    $('#op-qrcode').css('background',`-moz-linear-gradient(${angle-30}deg, ${left_color.value}, ${right_color.value})`);
  }
};
