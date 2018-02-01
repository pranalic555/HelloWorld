//////////////////////////////////////////////////////////////////
// Developed By: Mitr Learning & Media							//
// Name: CommonComponent										//
// Description: All required common components.			 		//
// Date Created: 07/05/2014										//
// Date Modified: 07/05/2014									//
// Version: 1.0:												//
//////////////////////////////////////////////////////////////////

//================================================================================
//////////////////////////////////////////////////////////////////
// Developed By: Mitr Learning & Media							//
// Name: GLOBALFUNCCLS											//
// Description: All global open functions can be found here.	//
// platform.													//
// Date Created: 07/05/2014										//
// Date Modified: 07/05/2014									//
// Version: 1.0:												//
//////////////////////////////////////////////////////////////////
//================================================================
//================================================================
// Resize Claculation Class
var globalResizeCalc = function(_obj)
{
	return parseFloat(_obj) * screenScalingValue;
}
//================================================================
//================================================================
/*jQuery.fn.show = function() {
    this.css('visibility', 'visible');
};

jQuery.fn.hide = function() {
    this.css('visibility', 'hidden');
};*/
//================================================================
//================================================================
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
var getRandomNum = function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//================================================================
var BrowserDetect = {
	Android: function() {
		return navigator.userAgent.match(/Android/i) ? true : false;
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i) ? true : false;
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i) ? true : false;
	},
	Windows_surface: function() {
		return navigator.userAgent.match(/Trident/i) && navigator.userAgent.match(/Tablet/i)  ? true : false;
	},
	any: function() {
		return (BrowserDetect.Android() || BrowserDetect.BlackBerry() || BrowserDetect.iOS() || BrowserDetect.Windows());
	},
	ie9: function() {
		return navigator.userAgent.match(/MSIE 9.0/i) ? true : false;
	},
	ie10: function() {
		return navigator.userAgent.match(/MSIE 10.0/i) ? true : false;
	},
	ie: function() {
		return navigator.userAgent.match(/MSIE/i) || navigator.userAgent.match(/Trident/i) ? true : false;
	},
	FF: function() {
		return typeof InstallTrigger !== 'undefined';
	},
	safari: function() {
		return navigator.userAgent.match(/Safari/i) ? true : false;
	}
};
//================================================================
//================================================================
if (typeof console == "undefined") {
    window.console = {
        log: function () {}
    };
}
//================================================================
//================================================================
this.onWindowMouseUp = function()
{
	$(window).trigger("mouseup");
	$(document).trigger("mouseup");
}
//================================================================
$(document).bind("keypress", function(e)
{
	var $focused = $(':focus');
	if($focused.prop('tagName') != "INPUT" && $focused.prop('tagName') != "TEXTAREA" && !($focused.attr("contenteditable")))
	{
           e.preventDefault();
	}

});
//================================================================
function GlobalCodeOnInit()
{
	/*$(document).scroll(function(e) {
       $(document).scrollTop(0);
    });*/
	$("body").append('<a id="falseclickforblur"></a>');
}

/*$(document).bind(BrowserDetect.any() ? "touchstart" : "mousedown", function(e)
{
	var $focused = $(':focus');
	if($focused.prop('tagName') == "INPUT")
	{
		$focused.blur();
	}
});*/
//$(document).bind("mousedown", function(e){e.preventDefault();});
//================================================================
function focusOutInput()
{
	$("#falseclickforblur").focus();
}
//================================================================
var trace = function(str){
    
    console.log(str);
}
//================================================================================
if(typeof(MathJax) != "undefined")
{
	MathJax.Hub.Config(
	{
		extensions: ["tex2jax.js"],
		jax: ["input/TeX", "output/HTML-CSS"],
		tex2jax: { inlineMath: [ ['$','$'], ["\\(","\\)"] ], displayMath: [ ['$$','$$'], ["\\[","\\]"] ], processEscapes: true },
		showMathMenu: false,
		showProcessingMessages: false,
		messageStyle: "none",
		displayAlign: "left"
	});
}
//================================================================================
function nDash(_num)
{
	return Number(_num) < 0 ? "–" + Math.abs(Number(_num)) : _num;
}
//================================================================================
//================================================================================
//================================================================================
// GlobalAnimClass is accepts objects
// id: Required to stop the particular animation.
// fps (optional): Frame per second.
// delay (optional): if delay given then fps will not work.
// start (optional): Callback when the animation starts.
// frame (optional): Callback when the animation is playing.
// stop (optional): Callback when the animation stops.
//================================================================================
var GlobalAnimClass = function()
{
    var animObjects = new Object();
    var _thisObj = this;
	var animPlaying = false;
	var requestId;
	//================================================================
    this.start = function(_obj)
	{
		if(_obj.id)
		{
			animObjects[_obj.id] = _obj;
			if(!_obj.immediate)
			{
				animObjects[_obj.id].oldDate = new Date();
			}
			animObjects[_obj.id].start ? animObjects[_obj.id].start() : null;
		}
        if(!animPlaying)
		{
			animPlaying = true;
			enterFrame();
		}
    }
	//================================================================
    this.stop = function(_id)
	{
		if (_id)
		{
			if(animObjects[_id])
			{
				animObjects[_id].stop ? animObjects[_id].stop() : null;
				animObjects[_id] != undefined ? delete animObjects[_id] : null;
			}
		}
		if(objectSize(animObjects) == 0)
		{
			animPlaying = false;
			cancelAnimationFrame(requestId);
		}
    }
	//================================================================
	 this.setFps = function(_id,_fps)
	{
		if (_id)
		{
			if(animObjects[_id])
			{
				animObjects[_id].fps = _fps; 
			}
		}
		
    }
	//================================================================
    function enterFrame()
	{
        var _newDate = new Date();
        //--------------------------
		for(var i in animObjects)
		{
			if(typeof animObjects[i] != "undefined")
			{
				if(animObjects[i].delay != undefined)
				{
					if(typeof(animObjects[i].oldDate) == "undefined" || (_newDate - animObjects[i].oldDate) >= animObjects[i].delay)
					{
						animObjects[i].oldDate = _newDate;
						animObjects[i].frame ? animObjects[i].frame(i) : null;
					}
				}
				else if(animObjects[i].fps != undefined)
				{
					if(typeof(animObjects[i].oldDate) == "undefined" || _newDate - animObjects[i].oldDate >= (1000/animObjects[i].fps))
					{
						animObjects[i].oldDate = _newDate;
						animObjects[i].frame ? animObjects[i].frame(i) : null;
					}
				}
			}
		}
		//--------------------------
		if(animPlaying)
		{
        	requestId = requestAnimationFrame(enterFrame);
		}
    }
	//================================================================
	function objectSize(obj)
	{
		var size = 0, key;
		for (key in obj)
		{
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	};
	//================================================================
	//================================================================
	(function()
	{
		var lastTime = 0;
		var vendors = ['webkit', 'moz'];
		for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x)
		{
			window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
		}
		if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element)
		{
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function()
			{
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
		if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id)
		{
			clearTimeout(id);
		};
	}());
	//================================================================
	//================================================================
}
var globalAnimClassObject = new GlobalAnimClass();
//================================================================================
//================================================================================
// ExportDataClass
// exportCSV function accepts 2 dimensional array as data parameter
//================================================================================
var ExportToAPI = function()
{
	var imageDiv, msgBox;
	//================================================================================
	// PUBLIC FUNCTION
	//================================================================================
	this.exportCSV = function(data)
	{
		msgBox = new MsgBoxComp();
		msgBox.init();
		if(BrowserDetect.ie9())
		{
			msgBox.showMsg(GetGlobalTooltip("snapshot", "messageie9data"));
			return false;
		}
		msgBox.showMsg("Processing table data.", true);
		//---------------------------------
		var _str = new Array();
		var _href = location.href.split(":")[0];
		 // This condition is added bcoz on clicking export button on empty table the screen becomes hang
		if(data != false)
		{
			for(var i = 0; i < data.length; i++)
			{
				for(var j = 0; j < data[i].length; j++)
				{
					var _tempStr = data[i][j].trim();
					if(_tempStr.indexOf(",") != -1)
						data[i][j] = '"'+_tempStr+'"'
					else
						data[i][j] = _tempStr
				}
				_str.push(data[i].toString());
			}
			
			_str = _str.join("\n")
		}
		else
		{
			_str = "There is no data in table"
		}
		//------------------------------
		/*var _form = document.createElement("form");
		var _element1 = document.createElement("textarea");
		var _element2 = document.createElement("input");
		
		_form.method = "POST";
		_form.action = "http://api.explorelearning.com/api/v3/Gizmos/post-spreadSheet";
		_form.target = "_blank";
		
		_element1.name = "delimitedStr";
		_element1.value = _str.join("\n");
		_element2.name = "preview";
		_element2.value = "true";
		
		_form.appendChild(_element1);
		_form.appendChild(_element2);
		
		document.body.appendChild(_form);
		_form.submit();
		
		document.body.removeChild(_form);*/
		
		//------------------------------
		$.ajax({
			type: "POST",
			crossDomain:"true",
			url: _href + "://api.explorelearning.com/api/v3/Gizmos/post-spreadSheet",
			data: {preview:"false", delimitedStr:_str},
			error: function () {
				alert("Error loading link (http://api.explorelearning.com/api/v3/Gizmos/post-spreadSheet).");
			},
			success: function (data, a, b) {
				if(typeof(data.CSVLOC) != "undefined")
				{
					if(BrowserDetect.any())
					{
						if(!window.open(data.CSVLOC.replace(/\\/g, ""), "_blank"))
						{
							msgBox.showMsg("Pop-up is blocked in your browser. Please go to settings and select allow pop-up.");
						}
					}
					else
					{
						if(BrowserDetect.ie() || BrowserDetect.FF() || BrowserDetect.safari())
						{
							// window.open(data.CSVLOC.replace(/\\/g, ""));
							//..added to show msg in safari...
							if(!window.open(data.CSVLOC.replace(/\\/g, ""), "_blank"))
							{
								msgBox.showMsg("Pop-up is blocked in your browser. Please go to settings and select allow pop-up.");
							}
						}
						else
						{
							location.href = data.CSVLOC.replace(/\\/g, "");
						}
					}
					msgBox.hideMsg();
				}
				else
				{
					console.log("Data ERROR: "+data);
					msgBox.showMsg("Processing table data ERROR.");
				}
			}
		});
		
	}
	//================================================================================
	//================================================================================
	this.exportImage = function(_obj)
	{
		msgBox = new MsgBoxComp();
		msgBox.init();
		if(BrowserDetect.ie9())
		{
			msgBox.showMsg(GetGlobalTooltip("snapshot", "messageie9"));
			//-----------------
			$.event.trigger({
				type: "commonCameraRenderDone"
			});
			//-----------------
			return false;
		}
		msgBox.showMsg(GetGlobalTooltip("snapshot", "processscrmessage"), true);
		//------------------------
		var _href = location.href.split(":")[0];
		setTimeout(function()
		{
			var areaObj = 
			{
				x:0,
				y:0,
				width:1024,
				height:680
			}
			if(_obj)
			{
				for(var i in _obj)
				{
					areaObj[i] = _obj[i];
				}
			}
			else
			{
				areaObj.x = globalResizeCalc(areaObj.x);
				areaObj.y = globalResizeCalc(areaObj.y);
				areaObj.width = globalResizeCalc(areaObj.width);
				areaObj.height = globalResizeCalc(areaObj.height);
			}
			html2canvas(document.getElementsByClassName("wrapper")[0], 
			{
				onrendered: function(canvas) 
				{
					var _actCtx = canvas.getContext("2d");
					var _cnv = document.createElement("canvas");
					var _ctx = _cnv.getContext("2d");
					_cnv.width = areaObj.width;
					_cnv.height = areaObj.height;
					_ctx.putImageData(_actCtx.getImageData(0,0,canvas.width, canvas.height), -1 * areaObj.x, -1 * areaObj.y);
					//showScreenShot(_cnv.toDataURL("image/png"), areaObj);
					//-----------------
					//-----------------
					 $.ajax({
						type: "POST",
						url: _href + "://api.explorelearning.com/api/v3/Gizmos/post-screenCapture",
						data:{imgByte: _cnv.toDataURL("image/png")},
						error: function () {
							alert("Error loading link (http://api.explorelearning.com/api/v3/Gizmos/post-screenCapture).");
						},
						success: function (data, a, b) {
							if(typeof(data.IMAGELOC) == "undefined")
							{
								console.log("data seems: "+data);
								msgBox.showMsg("Processing snapshot ERROR.");
							}
							else
							{
								var _img5Obj = new Image();
								_img5Obj.onload = function()
								{
									showScreenShot(_img5Obj.src, areaObj);
									//-----------------
									$.event.trigger({
										type: "commonCameraRenderDone"
									});
								}
								_img5Obj.src = data.IMAGELOC.replace(/\\/g, "");
							}
						}
					}); 
				}
			});
		}, 100);
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function showScreenShot(data, _obj)
	{		
		imageDiv = document.createElement("div");
		$("body").append(imageDiv);
		$(imageDiv).css( 
		{
			"position":"absolute",
			"top":"0px",
			"left":"0px",
			"width": globalResizeCalc(1024)+"px",
			"height": globalResizeCalc(680)+"px",
			"z-index": "103",
			"background": "rgba(0,0,0,0)"
		});
		//-------------------------------
		var _closeDiv = document.createElement("div");
		$(imageDiv).append(_closeDiv);
		$(_closeDiv).css(
		{
			"position":"absolute",
			"top":"0px",
			"right":"0px",
			"width":"100%",
			"height":"100%",
			"background": "rgba(0, 0, 0, 0.7)",
		})
		/*if(BrowserDetect.any())
		{
			$(_closeDiv).unbind("touchstart", closeAudio).bind("touchstart", closeAudio).unbind("touchend", closeAudio).bind("touchend", closeAudio);
		}
		else
		{
			$(_closeDiv).unbind("mousedown", closeAudio).bind("mousedown", closeAudio);
		}
		$(_closeDiv).unbind("click", closeScreenShot).bind("click", closeScreenShot);*/
		//-------------------------------
		var _img = document.createElement("img");
		$(imageDiv).append(_img);
		$(_img).attr("src", data);
		/*
		$(_img).css(
		{
			"position":"absolute",
			"top":"50%",
			"left":"50%",
			"width": _obj.width+"px",
			"height": _obj.height+"px",
			"margin-left": "-"+(_obj.width / 2)+"px",
			"margin-top": "-"+((_obj.height / 2) + globalResizeCalc(5))+"px"
		});
		*/
		var scaleFactor = 0.8;
		$(_img).css(
		{
			"position":"absolute",
			"top":"50%",
			"left":"50%",
			"width": (_obj.width * scaleFactor)+"px",
			"height": (_obj.height * scaleFactor)+"px",
			"margin-left": "-"+(_obj.width * scaleFactor / 2)+"px",
			"margin-top": "-"+((_obj.height * scaleFactor / 2) + globalResizeCalc(5))+"px",
			"image-rendering": "optimizeSpeed",            
			"image-rendering": "-moz-crisp-edges",          
			"image-rendering": "-webkit-optimize-contrast",
			"image-rendering": "-o-crisp-edges",            
			"image-rendering": "optimize-contrast",        
			//"-ms-interpolation-mode": "nearest-neighbor",  
			
		});
		//-------------------------------
		// This part of code will be moved to global language file...
		var _disclaimer = document.createElement("div");
		$(imageDiv).append(_disclaimer);
		$(_disclaimer).html(GetGlobalTooltip("snapshot", "messagepanel"));
		$(_disclaimer).css(
		{
			"position":"absolute",
			"bottom":globalResizeCalc(26)+"px",
			"left":"0px",
			"width": "100%",
			"color":"#FFFFFF",
			"text-align": "center",
			"cursor":"default"
		});
		//-------------------------------
		var _close = document.createElement("img");
		$(imageDiv).append(_close);
		$(_close).attr("src", "../com/images/snapclose.png");
		$(_close).css(
		{
			"position":"absolute",
			"top":"20px",
			"right":"20px",
			"width":globalResizeCalc(32)+"px",
			"height":globalResizeCalc(32)+"px",
			"cursor":"pointer"
		});
		if(BrowserDetect.any())
		{
			$(_close).unbind("touchstart", closeAudio).bind("touchstart", closeAudio).unbind("touchend", closeAudio).bind("touchend", closeAudio);
		}
		else
		{
			$(_close).unbind("mousedown", closeAudio).bind("mousedown", closeAudio);
		}
		$(_close).unbind("click", closeScreenShot).bind("click", closeScreenShot);
		//-------------------------------
		msgBox.hideMsg();
	}
	//================================================================================
	function closeScreenShot(e)
	{
		$.event.trigger({type: "screenShotClosed"});
		$(imageDiv).remove();
	}
	//================================================================================
	function closeAudio(e)
	{
		if(e.type == "mousedown" || e.type == "touchstart")
		{
			audioPlayerObj.playAudio("down");
			if(e.type == "mousedown")
			{
				$(document).unbind("mouseup", closeAudio).bind("mouseup", closeAudio);
			}
		}
		else if(e.type == "mouseup" || e.type == "touchend")
		{
			audioPlayerObj.playAudio("up");
			$(document).unbind("mouseup", closeAudio)
		}
	}
}
var exportToApiObj = new ExportToAPI();
//================================================================================
//================================================================================
function passEventIE(target, eventType, forwarded)
{
	$(target).unbind(eventType).bind(eventType,function (e) 
	{
		listener(e,forwarded);
	});
	
	function listener(e,forwarded)
	{
		var tempArr = [];
		$(forwarded+" div").each(function(index, element) 
		{
			var refDiv = $(this);
			var divX = refDiv.offset().left;
			var divY = refDiv.offset().top;
			var divW = refDiv.width();
			var divH = refDiv.height();
			
			if(e.pageX >=  divX && (divX+divW) >= e.pageX &&  e.pageY >=  divY && (divY+divH) >= e.pageY)
			{
				tempArr.push(refDiv);
			}
			
		});
		if(tempArr.length > 0)
			tempArr[tempArr.length-1].trigger(e.type);
	
	}
}
//================================================================================
//================================================================================
var PreloadImagesCls = function()
{
	var imgObj = new Object();
	var totalImages = 0;
	var imagesLoaded = 0;
	var callBack, preLoadDiv;
	//================================================================================
	this.loadImages = function(_arr, _cb)
	{
		callBack = _cb;
		totalImages = _arr.length;
		for(var i = 0; i < _arr.length; i++)
		{
			var j = _arr[i].split("/").reverse()[0].split(".")[0]
			imgObj[j] = new Image();
			imgObj[j].onload = loadedFn;
			imgObj[j].src = _arr[i];
		}
		//--------------------------------
		preLoadDiv = document.createElement("div");
		$("body").append(preLoadDiv);
		$(preLoadDiv).css(
		{
			"background":"url(../com/images/loading.gif) no-repeat",
			"width":globalResizeCalc(1024)+"px",
			"height":globalResizeCalc(696)+"px",
			"background-position": "center"
		});
	}
	//================================================================================
	this.getImage = function(_img)
	{
		return imgObj[_img];
	}
	//================================================================================
	function loadedFn()
	{
		imagesLoaded++;
		if(imagesLoaded >= totalImages - 1)
		{
			$(preLoadDiv).remove();
			$(preLoadDiv).hide();
			if(callBack)
			{
				callBack();
				callBack = null;
			}
		}
	}
}
var preloadImagesObj = new PreloadImagesCls();
//================================================================================
//================================================================================
function addPointerGrabbing(_bool)
{
	_bool ? $("div,img,canvas,input,td,a").addClass("commongrabbing") : $("div,img,canvas,input,td,a").removeClass("commongrabbing");
}
//================================================================================
function loadLangFile()
{
	try 
	{
		$('head').prepend('<script type="text/javascript" src="lang/en/text.js"></script>');
	}
	catch(err) 
	{
		console.log(err);
	}
	$('head').prepend('<script type="text/javascript" src="../com/lang/en.js"></script>');
}
loadLangFile();
//================================================================================
function GetGlobalTooltip(_obj, _elem)
{
	return (BrowserDetect.any() || BrowserDetect.Windows_surface()) ? GlobalToolTipObj[_obj][_elem].devices : GlobalToolTipObj[_obj][_elem].browsers;
}
//================================================================================
//================================================================================
//Global click to tap convertor.
function GCTConv(_str)
{
	//return BrowserDetect.any() ? _str.split("click").join("tap").split("Click").join("Tap") : _str;
	return (BrowserDetect.any() || BrowserDetect.Windows_surface())? _str.split("click").join("tap").split("Click").join("Tap") : _str;
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Prototype is added for doted line to support in IE9
//================================================================================
CanvasRenderingContext2D.prototype.dashedLine = function (x1, y1, x2, y2, dashLen) {
		if (dashLen == undefined) dashLen = 2;
		this.moveTo(x1, y1);
	
		var dX = x2 - x1;
		var dY = y2 - y1;
		var dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen);
		var dashX = dX / dashes;
		var dashY = dY / dashes;
	
		var q = 0;
		while (q++ < dashes) {
			x1 += dashX;
			y1 += dashY;
			this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1, y1);
		}
		this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x2, y2);
	};
//================================================================================
	function  getHCF(m,n)
	{
	  var temp,remainder;
	  if(m==0)
		return m
		if(m<n)           
		{
			temp=m;
			m=n; 
			n=temp;
		}
		while(1)
		{
			remainder=m%n;
			if(remainder==0)
				return n;
			else
				m=n;
				n=remainder;
		}	  
	}
//================================================================================
	function getMinimizedFraction(cur_num,cur_den)
	{
		var hcf  = getHCF(cur_num,cur_den)
		
		var numerator=0,denominator=0;
		if(hcf>1)
		{
			numerator=cur_num/hcf;
			denominator=cur_den/hcf;
		}
		else if(cur_num==cur_den)
		{
			numerator=1;
			denominator=1;
		}
		else
		{
			numerator = cur_num;
			denominator = cur_den;
		}
		if((numerator == cur_num) && (denominator==cur_den))
			flag= true;
		else
			flag = false;
		return {n : numerator,d : denominator,flag : flag};
	} 
//================================================================================


	Number.prototype.noExponents = function()
	{
		var data= String(this).split(/[eE]/);
		if(data.length== 1) 
			return data[0]; 

		var  z = '', sign = this < 0? '-' : '',
		str = data[0].replace('.', ''),
		mag = Number(data[1]) + 1;

		if(mag < 0)
		{
			z = sign + '0.';
			while(mag++) 
				z += '0';
			return z + str.replace(/^\-/,'');
		}
		mag -= str.length;  
		while(mag--) 
			z += '0';
		return str + z;
	}
	
//================================================================================

	function moveArrayElement(_arr,old_index, new_index) {
		if (new_index >= _arr.length) {
			var k = new_index - _arr.length;
			while ((k--) + 1) {
				_arr.push(undefined);
			}
		}
		_arr.splice(new_index, 0, _arr.splice(old_index, 1)[0]);
	};
	
	//================================================================================
	
	function katexFilter(_str) {
	    _str = _str.replace(/\\boldsymbol/g, "");
	    _str = _str.replace(/\\bullet/g, "\\cdot");
	    _str = _str.replace(/\\bf/g, "");
	    _str = _str.replace(/\•/g, "\\cdot");
	    _str = _str.replace(/\–/g, "-");
	   _str = _str.replace(/\&ndash;/g, "-");
	   _str = _str.replace(/π/g, "\\pi");
	    return _str;
	}

	function printKatex(elem, txt) {
	   // console.log(txt);
	    if (String(txt).indexOf("\\begin{equation}") != -1) {
	        txt = txt.split("\\begin{equation}")[1].split("\\end{equation}")[0];
	        txt = katexFilter(txt);
	        katex.render(txt, elem);
	        $(elem).css({
	            "opacity": 1
	        });
	    }
	}
	
//========================== Floating Value toFixed ============================//
//..............num : Number to be fixed.
//.........fixedVal : Number of decimal to show.
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

function _floatPrecision(num, fixedVal) 
{
    var multiplier = Math.pow(10, fixedVal);
    return Number((num * multiplier).toFixed(0) / multiplier);
}

//========================== Granularity ============================//
//........variable : Given Number to be change.
//.........granVal : Step value.
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function _granularity(variable,granVal)
{
	var _n = variable % granVal;
	if(Math.abs(_n) > granVal/2)
	{
		if (variable>0)
		{
			_graddedval = variable  - _n + granVal;
		}
		else
		{
			_graddedval = variable  - _n - granVal;
		}
	}
	else
	{
		_graddedval = variable  - _n;
	}
	return _graddedval;
}
//==============================================================================//

  function hexToRgba(sent_hex,opacity) {
	var hex, resultStr,
	colors = {'aliceblue': '#f0f8ff', 'antiquewhite': '#faebd7', 'aqua': '#00ffff', 'aquamarine': '#7fffd4', 'azure': '#f0ffff', 'beige': '#f5f5dc', 'bisque': '#ffe4c4', 'black': '#000000', 'blanchedalmond': '#ffebcd', 'blue': '#0000ff', 'blueviolet': '#8a2be2', 'brown': '#a52a2a', 'burlywood': '#deb887', 'cadetblue': '#5f9ea0', 'chartreuse': '#7fff00', 'chocolate': '#d2691e', 'coral': '#ff7f50', 'cornflowerblue': '#6495ed', 'cornsilk': '#fff8dc', 'crimson': '#dc143c', 'cyan': '#00ffff', 'darkblue': '#00008b', 'darkcyan': '#008b8b', 'darkgoldenrod': '#b8860b', 'darkgray': '#a9a9a9', 'darkgreen': '#006400', 'darkkhaki': '#bdb76b', 'darkmagenta': '#8b008b', 'darkolivegreen': '#556b2f', 'darkorange': '#ff8c00', 'darkorchid': '#9932cc', 'darkred': '#8b0000', 'darksalmon': '#e9967a', 'darkseagreen': '#8fbc8f', 'darkslateblue': '#483d8b', 'darkslategray': '#2f4f4f', 'darkturquoise': '#00ced1', 'darkviolet': '#9400d3', 'deeppink': '#ff1493', 'deepskyblue': '#00bfff', 'dimgray': '#696969', 'dodgerblue': '#1e90ff', 'firebrick': '#b22222', 'floralwhite': '#fffaf0', 'forestgreen': '#228b22', 'fuchsia': '#ff00ff', 'gainsboro': '#dcdcdc', 'ghostwhite': '#f8f8ff', 'gold': '#ffd700', 'goldenrod': '#daa520', 'gray': '#808080', 'green': '#008000', 'greenyellow': '#adff2f', 'honeydew': '#f0fff0', 'hotpink': '#ff69b4', "indianred ": '#cd5c5c', "indigo ": '#4b0082', 'ivory': '#fffff0', 'khaki': '#f0e68c', 'lavender': '#e6e6fa', 'lavenderblush': '#fff0f5', 'lawngreen': '#7cfc00', 'lemonchiffon': '#fffacd', 'lightblue': '#add8e6', 'lightcoral': '#f08080', 'lightcyan': '#e0ffff', 'lightgoldenrodyellow': '#fafad2', 'lightgrey': '#d3d3d3', 'lightgreen': '#90ee90', 'lightpink': '#ffb6c1', 'lightsalmon': '#ffa07a', 'lightseagreen': '#20b2aa', 'lightskyblue': '#87cefa', 'lightslategray': '#778899', 'lightsteelblue': '#b0c4de', 'lightyellow': '#ffffe0', 'lime': '#00ff00', 'limegreen': '#32cd32', 'linen': '#faf0e6', 'magenta': '#ff00ff', 'maroon': '#800000', 'mediumaquamarine': '#66cdaa', 'mediumblue': '#0000cd', 'mediumorchid': '#ba55d3', 'mediumpurple': '#9370d8', 'mediumseagreen': '#3cb371', 'mediumslateblue': '#7b68ee', 'mediumspringgreen': '#00fa9a', 'mediumturquoise': '#48d1cc', 'mediumvioletred': '#c71585', 'midnightblue': '#191970', 'mintcream': '#f5fffa', 'mistyrose': '#ffe4e1', 'moccasin': '#ffe4b5', 'navajowhite': '#ffdead', 'navy': '#000080', 'oldlace': '#fdf5e6', 'olive': '#808000', 'olivedrab': '#6b8e23', 'orange': '#ffa500', 'orangered': '#ff4500', 'orchid': '#da70d6', 'palegoldenrod': '#eee8aa', 'palegreen': '#98fb98', 'paleturquoise': '#afeeee', 'palevioletred': '#d87093', 'papayawhip': '#ffefd5', 'peachpuff': '#ffdab9', 'peru': '#cd853f', 'pink': '#ffc0cb', 'plum': '#dda0dd', 'powderblue': '#b0e0e6', 'purple': '#800080', 'red': '#ff0000', 'rosybrown': '#bc8f8f', 'royalblue': '#4169e1', 'saddlebrown': '#8b4513', 'salmon': '#fa8072', 'sandybrown': '#f4a460', 'seagreen': '#2e8b57', 'seashell': '#fff5ee', 'sienna': '#a0522d', 'silver': '#c0c0c0', 'skyblue': '#87ceeb', 'slateblue': '#6a5acd', 'slategray': '#708090', 'snow': '#fffafa', 'springgreen': '#00ff7f', 'steelblue': '#4682b4', 'tan': '#d2b48c', 'teal': '#008080', 'thistle': '#d8bfd8', 'tomato': '#ff6347', 'turquoise': '#40e0d0', 'violet': '#ee82ee', 'wheat': '#f5deb3', 'white': '#ffffff', 'whitesmoke': '#f5f5f5', 'yellow': '#ffff00', 'yellowgreen': '#9acd32'};
	// get sent_hex value to lower case and remove spaces
	sent_hex = sent_hex.toLowerCase().replace(' ','');
	opacity = opacity == undefined ? 1 : opacity;

	if (colors.hasOwnProperty(sent_hex)) {
		// strip # from HEX
		hex = colors[sent_hex].substr(1);
		var r = parseInt(hex.substring(0, 2), 16);
		var g = parseInt(hex.substring(2, 4), 16);
		var b = parseInt(hex.substring(4, 6), 16);
		resultStr = {r:r,g:g,b:b,a:opacity};
		// if sent_hex is not a proper color name check if it is a proper hex value
		// if not - give an error message
	} else if ( ! sent_hex.match(/^#?([0-9A-Fa-f]){3}\s*$|^#?([0-9A-Fa-f]){6}\s*$/) ) {
		resultStr = 'Invalid HEX value or color name';
		// if sent_hex is a proper hex value calculate rgb and rgba
	} else {
		// strip # from HEX
		hex = ( sent_hex.charAt(0) === "#" ? sent_hex.substr(1) : sent_hex );
		// check if 6 letters are provided
		switch(hex.length)
		{
			case 6: //for calculating 6 letters hex value
					var r = parseInt(hex.substring(0, 2), 16);
					var g = parseInt(hex.substring(2, 4), 16);
					var b = parseInt(hex.substring(4, 6), 16);
		
				break;
			case 3:	//for calculating 3 letters hex value
					var r = parseInt(hex.substring(0, 1) + hex.substring(0, 1), 16);
					var g = parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16);
					var b = parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16);
				break;
		}
		resultStr = {r:r,g:g,b:b,a:opacity};
	}
    return resultStr;
  }
  
   
  //========== Function added to show the error message for unsupported WebGL Browsers ===================//

function detect3dSupport()
{
	var is3dSupported = Detector.webgl;

    if (!is3dSupported) 
		{
			var disabler = document.createElement('div');
			
			$(disabler).css(
				{
					'position': 'absolute',
					'left': 0,
					'top': 0,
					'width': '100%',
					'height': '100%',
					'background': 'rgba(0, 0, 0, 0.8)',
					'z-index': '10000',
					'font-size': '2em',
					'text-align': 'center',
					'color': 'rgba(255, 255, 255, 1)',
					'padding-top':'25%',
				// }).html('Your browser, operating system, or computer hardware doesn\'t seem to support WebGL which is required to view this Gizmo. Contact ExploreLearning for more information.');
				}).html("This Gizmo requires WebGL and associated hardware to operate. To determine that your system is WebGL compliant, click <a href='http://get.webgl.org/'>here</a>.");
					
			$('body').append(disabler);
		}
		
    return is3dSupported;
}

var _originalLogCopy = console.log;
function enableConsole(flag)
{
	if(flag)
	{
		console.log = _originalLogCopy;
	}
	else
	{
		console.log = function(){};
	}
};
enableConsole(false);