<?php
require_once("jssdk.php");
$jssdk = new jssdk("wx3b5019935778a513", "d0bfce2ecd1ce5e9fe17a78124a3d5bd");
$signPackage = $jssdk->GetSignPackage();
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<title>微信开发</title>
		<meta name="viewport" content="width=device-width" />
		<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
		<style type="text/css">
			button{
				width: 80%;
				height: 40px;
				background: green;
				color: #fff;
				border-radius: 5px;
			}
		</style>
	</head>
	<body>
		<button onclick="test()">
			点击拍照
		</button>
		<button onclick="code()">
			点击扫码
		</button>
		<div id="img">
			
		</div>
		<script type="text/javascript">
			wx.config({
				debug: true, // 用于调试，如果为true每进行一次操作都会弹出
				appId: '<?php echo $signPackage["appId"];?>', // 必填，公众号的唯一标识
				timestamp: <?php echo $signPackage["timestamp"];?>, // 必填，生成签名的时间戳
				nonceStr: '<?php echo $signPackage["nonceStr"];?>', // 必填，生成签名的随机串
				signature: '<?php echo $signPackage["signature"];?>',// 必填，签名，见附录1
				jsApiList: [
					'checkJsApi',
			        'onMenuShareTimeline',
			        'onMenuShareAppMessage',
			        'onMenuShareQQ',
			        'onMenuShareWeibo',
			        'onMenuShareQZone',
			        'hideMenuItems',
			        'showMenuItems',
			        'hideAllNonBaseMenuItem',
			        'showAllNonBaseMenuItem',
			        'translateVoice',
			        'startRecord',
			        'stopRecord',
			        'onVoiceRecordEnd',
			        'playVoice',
			        'onVoicePlayEnd',
			        'pauseVoice',
			        'stopVoice',
			        'uploadVoice',
			        'downloadVoice',
			        'chooseImage',
			        'previewImage',
			        'uploadImage',
			        'downloadImage',
			        'getNetworkType',
			        'openLocation',
			        'getLocation',
			        'hideOptionMenu',
			        'showOptionMenu',
			        'closeWindow',
			        'scanQRCode',
			        'chooseWXPay',
			        'openProductSpecificView',
			        'addCard',
			        'chooseCard',
			        'openCard'
				] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
			
		</script>
	</body>
</html>

