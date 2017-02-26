<?php
require_once "jssdk/jssdk.php";
$jssdk = new JSSDK("wx42443601d9741b16", "165f6594d714cb00779ee05103521285");
$signPackage = $jssdk->GetSignPackage();
?>
	<!DOCTYPE html>
	<html>

	<head>
		<meta charset="UTF-8">
		<title></title>
		<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">

		<style>
			.box{
				width: 100px;
				height: 100px;
				background: green;
			}
		</style>
	</head>

	<body>
		<div id="testBtn" class="box" ></div>


	</body>
	<script src="http://res.wx.qq.com/open/js/jweixin-1.1.0.js"></script>
	<script>
		wx.config({
			debug: true,
			appId: '<?php echo $signPackage["appId"];?>',
			timestamp: <?php echo $signPackage["timestamp"];?>,
			nonceStr: '<?php echo $signPackage["nonceStr"];?>',
			signature: '<?php echo $signPackage["signature"];?>',
			jsApiList: [
				// 所有要调用的 API 都要加到这个列表中
				'chooseImage'
			]
		});
		wx.ready(function() {
			// 在这里调用 API
			alert('wx js sdk ready');

			var btn = document.getElementById('testBtn').onclick = function() {
				wx.chooseImage ({
                    success : function(res){
                        var localIds = res.localIds;
                        // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图
                    }
                });
			}
		});
	</script>

	</html>