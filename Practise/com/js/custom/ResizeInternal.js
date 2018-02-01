/*if($.browser.msie) 
{
	if(parseInt($.browser.version)<=9)
	{
		location.href = "inner.html?"+location.href.split("?")[1];
	}

}*/
var screenScalingValue = 1;
onResizeFn = function()
{
	var shellWidth = 1024;
	var shellHeight= 680;
	var newShellHeight;
	var newShellWidth;
	var agent=navigator.userAgent.toLowerCase();
    var is_ipad = ((agent.indexOf('ipad') != -1));

	var actWid = Number($(window).width());
	var actHgt = Number($(window).height())
	
	if(actHgt < actWid)
	{
		newShellHeight = actHgt;
		var scale = Number(shellHeight/newShellHeight);
		newShellWidth = (shellWidth/shellHeight)*newShellHeight;
		var _aleft = ($(window).width()/2)-(Number(newShellWidth)/2);
		if(_aleft<0)
		{
			newShellWidth = actWid;
			scale = Number(shellWidth/newShellWidth);
			newShellHeight = (shellHeight/shellWidth)*newShellWidth;
		}
		/*$('#myframe').css(
		{
			"transform": "translate(-"+(shellWidth/2)+"px,-"+(shellHeight/2)+"px) scale("+(1/scale)+","+(1/scale)+") translate("+(shellWidth/2)+"px,"+(shellHeight/2)+"px)",
			"-ms-transform": "translate(-"+(shellWidth/2)+"px,-"+(shellHeight/2)+"px) scale("+(1/scale)+","+(1/scale)+") translate("+(shellWidth/2)+"px,"+(shellHeight/2)+"px)",
			"-webkit-transform": "translate(-"+(shellWidth/2)+"px,-"+(shellHeight/2)+"px) scale("+(1/scale)+","+(1/scale)+") translate("+(shellWidth/2)+"px,"+(shellHeight/2)+"px)"
		});*/
	}
	else
	{
		newShellWidth = actWid;
		var scale = Number(shellWidth/newShellWidth);
		newShellHeight = (shellHeight/shellWidth)*newShellWidth;
		/*$('#myframe').css(
		{
			"transform": "translate(-"+(shellWidth/2)+"px,-"+(shellHeight/2)+"px) scale("+(1/scale)+","+(1/scale)+") translate("+(shellWidth/2)+"px,"+(shellHeight/2)+"px)",
			"-ms-transform": "translate(-"+(shellWidth/2)+"px,-"+(shellHeight/2)+"px) scale("+(1/scale)+","+(1/scale)+") translate("+(shellWidth/2)+"px,"+(shellHeight/2)+"px)",
			"-webkit-transform": "translate(-"+(shellWidth/2)+"px,-"+(shellHeight/2)+"px) scale("+(1/scale)+","+(1/scale)+") translate("+(shellWidth/2)+"px,"+(shellHeight/2)+"px)"
		});*/
	}
	screenScalingValue = 1/scale;
	if(screenScalingValue < 0.6)
	{
		screenScalingValue = 0.6;
	}
	var _left = ($(window).width()/2)-(Number(newShellWidth)/2);
	var _top = ($(window).height()/2)-(Number(newShellHeight)/2);
	//$('#myframe').css("left", _left);
	//$('#myframe').css("top", _top);
}

$(document).ready(function(e) {
    onResizeFn();
	//$(window).resize(onResizeFn);
});