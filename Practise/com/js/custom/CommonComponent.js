//////////////////////////////////////////////////////////////////
// Developed By: Mitr Learning & Media							//
// Name: CommonComponent										//
// Description: All required common components.			 		//
// Date Created: 07/05/2014										//
// Date Modified: 07/05/2014									//
// Version: 1.0:												//
//////////////////////////////////////////////////////////////////

//================================================================================
// TAB COMPONENT
var TabComp = function()
{
	// Default starts ...
	var p = 
	{
		//target:"",
		x:0,
		y:0,
		width:600,
		height:600,
		tabs:["LABEL 1","LABEL 2"],
		tabwidth:"auto", // or array of sizes.
		shadowMargin:20,
		leftMargin:20,
		labelSize:"0.7em",
		tabHeight:23,
		tabType:"normal",
		selectedTab:0,
		//tabColors:["#FF0000","#FFFF00"]
	}
	// Default ends ...
	var _thisObj = this;
	var baseDiv;
	var tabButtons = new Array();
	var tabClkButtons = new Array();
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		p.x = globalResizeCalc(p.x);
		p.y = globalResizeCalc(p.y);
		p.width = globalResizeCalc(p.width);
		p.height = globalResizeCalc(p.height);
		p.shadowMargin = globalResizeCalc(p.shadowMargin);
		p.leftMargin = globalResizeCalc(p.leftMargin);
		p.tabHeight = globalResizeCalc(p.tabHeight);
		//-----------
		createPlaceHolders();
	}
	//================================================================================
	this.addEventListener = function(_evt, _fun)
	{
		p[_evt] = _fun;
	}
	//================================================================================
	this.show = function()
	{
		p.target.show();
	}
	//================================================================================
	this.hide = function()
	{
		p.target.hide();
	}
	//================================================================================
	this.activeTab = function(actTab)
	{
		if(typeof(actTab) != "undefined")
		{
			for(var i = 0; i < tabButtons.length; i++)
			{
				if($(tabButtons[i]).attr("tabid").split("_")[1] == actTab)
				{
					$(tabClkButtons[i]).trigger("click");
					break;
				}
			}
		}
		else
		{
			return p.selectedTab;
		}
	}
	//================================================================================
	this.setDisableTab = function(tab_Id)
	{
		$(tabClkButtons[tab_Id]).unbind("click", showTab);
		$(tabClkButtons[tab_Id]).css({"opacity":0.5,"cursor":"default"});
	}
	//================================================================================
	this.setEnableTab = function(tab_Id)
	{
		$(tabClkButtons[tab_Id]).unbind("click", showTab).bind("click", showTab);
		$(tabClkButtons[tab_Id]).css({"opacity":1,"cursor":"pointer"});
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function createPlaceHolders()
	{
		//canvas = document.createElement("canvas");
		//context = canvas.getContext("2d");
		//canvas.width = p.width;
		//canvas.height = p.height;
		//---------
		var _tDiv = document.createElement("div");
		if(p.target)
		{
			p.target.append(_tDiv);
		}
		else
		{
			$("body").append(_tDiv);
		}
		p.target = $(_tDiv);
		p.visible == false ? p.target.css("display", "none") : null;
		p.index ? p.target.css("z-index", p.index) : null;
		//p.title ? p.target.attr("p_title", p.title) : null;
		//---------
		p.target.css(
		{
			"position":"absolute",
			"left": p.x+"px",
			"top": p.y+"px",
			"width":p.width + "px",
			"height":p.height + "px"
		});
		//---------------------------------------
		drawTabs("#e5e5e5", true, false);
		//---------------------------------------
		baseDiv = document.createElement("div");
		p.target.append(baseDiv);
		$(baseDiv).css(
		{
			"position":"absolute",
			"left":p.shadowMargin + "px",
			"top":(p.shadowMargin + (p.tabHeight - 1)) + "px",
			"width":(p.width - (p.shadowMargin * 2)) + "px",
			"height":(p.height - (p.shadowMargin * 2) - p.tabHeight) + "px",
			"background": "#FFFFFF",
			"box-shadow": "rgba(0, 0, 0, 0.5) 0px 0px 20px"
		});
		//---------------------------------------
		if(p.tabType != "simulation")
		{
			if(p.tabColors)
			{
				$(baseDiv).css("background", p.tabColors[0] == "" ? "#FFFFFF" : p.tabColors[0]);
				drawTabs("#FFFFFF", false, false, tabButtons, p.tabColors);
			}
			else
			{
				drawTabs("#FFFFFF", false, false, tabButtons);
			}
			drawTabs("rgba(255, 0, 0, 0.5)", false, true, tabClkButtons);
		}
		else
		{
				p.tabColors ? $(baseDiv).css("background", p.tabColors[0] == "" ? "#FFFFFF" : p.tabColors[0]) : null;
		}
		addEvents();
	}
	//================================================================================
	function drawTabs(_col, _bool, _text, _arr, _tabCol)
	{
		var _xPos = p.leftMargin;
		//var _tWid = p.tabwidth == "auto" ? (canvas.width - (p.shadowMargin * 2)) / p.tabs.length : p.tabwidth;
		for(var i = 0; i < p.tabs.length; i++)
		{
			var _tWid = typeof(p.tabwidth) == "number" ? globalResizeCalc(p.tabwidth) : (p.width - (p.shadowMargin * 2)) / p.tabs.length;
			if(p.tabwidth != "auto" && p.tabwidth.length && p.tabwidth[i])
			{
				_tWid = globalResizeCalc(p.tabwidth[i]);
			}
			//-------------------------
			if(_tabCol)
			{
				if(_tabCol[i])
				{
					_col = _tabCol[i];
				}
			}
			var _div = document.createElement("div");
			p.target.append(_div);
			$(_div).attr("tabid", "tabComp_"+i);
			$(_div).css(
			{
				"position":"absolute",
				"left":_xPos+"px",
				"top":(p.shadowMargin)+"px",
				"width":_tWid+"px",
				"height":(p.tabHeight)+"px",
				"overflow":"hidden",
				"background":"rgba(0, 0, 0, 0)",
			});
			if(p.tabType == "simulation")
			{
				p.tabColors ? $(_div).css({"background": p.tabColors[0] == "" ? "#FFFFFF" : p.tabColors[0]}) : $(_div).css({"background":"rgba(255, 255, 255, 1)",});
					
				$(_div).css("cursor", "default");
				$(_div).css({
					"left":p.leftMargin+"px",
					"z-index":"1",
				});
				$(_div).html('<div style="position: relative; text-align:center; font-size:'+p.labelSize+'; display: table-cell; width: '+_tWid+'px; height: '+p.tabHeight+'px; vertical-align: middle;">'+p.tabs[i]+'</div>');
			}
			else
			{
				if(_text)
				{
					$(_div).css("cursor", "pointer");
					//$(_div).append('<div style="position: relative; text-align:center; font-size:'+p.labelSize+'; color:#333; display: table-cell; width: '+(_tWid - 14)+'px; height: '+p.tabHeight+'px; vertical-align: middle; padding-left:'+globalResizeCalc(14)+'px;" p_title="'+(p.title ? GCTConv(p.title) : "")+'">'+p.tabs[i]+'</div>');
					$(_div).append('<div style="position: relative; text-align:center; font-size:'+p.labelSize+'; color:#333; display: table-cell; width: '+(_tWid)+'px; height: '+p.tabHeight+'px; vertical-align: middle;" p_title="'+(p.title ? GCTConv(p.title) :  GetGlobalTooltip("tooltip", "tabs"))+'">'+p.tabs[i]+'</div>');
					$(_div).bind("click", showTab);
					if(BrowserDetect.any())
					{
						$(_div).bind("touchstart", showTab).bind("touchend", showTab);
					}
					else
					{
						$(_div).bind("mousedown", showTab);
					}
				}
				else
				{
					//$(_div).html('<div style="position: absolute; width:100%; height: 0px; border-left: '+globalResizeCalc(20)+'px solid rgba(255, 255, 255, 0); border-bottom: '+globalResizeCalc(50)+'px solid '+_col+'; left: -'+globalResizeCalc(10)+'px;"></div>');
					
					var _cnv = document.createElement("canvas");
					$(_div).append(_cnv);
					var _ctx = _cnv.getContext("2d");
					_cnv.width = _tWid;
					_cnv.height = p.tabHeight;
					_ctx.fillStyle = _col;
					_ctx.moveTo(globalResizeCalc(10), 0);
					_ctx.lineTo(_cnv.width, 0);
					_ctx.lineTo(_cnv.width, _cnv.height);
					_ctx.lineTo(0, _cnv.height);
					_ctx.lineTo(globalResizeCalc(10), 0);
					_ctx.fill();
				}
			}
			
			if(_arr)
			{
				_arr.push(_div);
			}
			_xPos += _tWid;
		}
	}
	//================================================================================
	function addEvents()
	{
		for(var i = 0; i < tabButtons.length; i++)
		{
			if(i == p.selectedTab)
			{
				$(tabButtons[i]).show();
			}
			else
			{
				$(tabButtons[i]).hide();
			}
		}
	}
	//================================================================================
	function showTab(e)
	{
		if(e.type == "mousedown" || e.type == "touchstart")
		{
			focusOutInput();
			audioPlayerObj.playAudio("down");
			if(e.type == "mousedown")
			{
				$(document).unbind("mouseup", showTab).bind("mouseup", showTab);
			}
		}
		else if(e.type == "mouseup" || e.type == "touchend")
		{
			audioPlayerObj.playAudio("up");
			$(document).unbind("mouseup", showTab);
		}
		else
		{
			for(var i = 0; i < tabButtons.length; i++)
			{
				if($(tabButtons[i]).attr("tabid") == $(this).attr("tabid"))
				{
					$(tabButtons[i]).show();
					if(p.tabColors)
					{
						$(baseDiv).css("background", p.tabColors[i] == "" ? "#FFFFFF" : p.tabColors[i]);
					}
					else
					{
						$(baseDiv).css("background", "#FFFFFF");
					}
					innerActiveTab(i);
				}
				else
				{
					$(tabButtons[i]).hide();
				}
			}
			e.index = Number($(this).attr("tabid").split("_")[1]);
			p.change ? p.change(e) : null;
		}
	}
	//================================================================================
	function innerActiveTab(_i)
	{
		p.selectedTab = _i;
	}
}
//================================================================================
//================================================================================
// SLIDER COMPONENT
var SliderComp = function()
{
	// Default starts ...
	var p = 
	{
		//target:"",
		x:0,
		y:0,
		width:10,
		height:10,
		color:1,
		min:0,
		max:100,
		//restrictMax:50,
		//restrictMin:10,
		value:50,
		inverse:false,
		horizontal:true,
		autoTrigger:false,
		
		knobHeight:35,
		knobWidth:11,
		willHighLight : false
	}
	// Default ends ...
	var _thisObj = this;
	var isDisabled = false;
	var sliderDiv;
	//------------
	var slidCnv = document.createElement("canvas");
	var slidKnobBg = document.createElement("canvas");
	var slidCtx = slidCnv.getContext("2d");
	var slidImg = new Image();
	slidImg.onload = drawKnob;
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		p.x = globalResizeCalc(p.x);
		p.y = globalResizeCalc(p.y);
		p.width = globalResizeCalc(p.width);
		p.height = globalResizeCalc(p.height);
		p.knobWidth = globalResizeCalc(p.knobWidth);
		p.knobHeight = globalResizeCalc(p.knobHeight);
		
		typeof(p.knobColor) != "undefined" ? p.color = 3 : null;
		if(p.color)
		{
			switch(p.color)
			{
				case 1:
					p.color =  "#F44D3F";
					break;
				case 2:
					p.color =  "#4B53EC";
					break;
				case 3:
					p.color =  "#979797";
					break;
			}
		}
		//---------
		var _tDiv = document.createElement("div");
		if(p.target)
		{
			p.target.append(_tDiv);
		}
		else
		{
			$("body").append(_tDiv);
		}
		p.target = $(_tDiv);
		p.visible == false ? p.target.css("display", "none") : null;
		p.index ? p.target.css("z-index", p.index) : null;
		//---------
		//---------
		createBaseLine();
	}
	this.value = function(_val)
	{
		if(_val == undefined)
		{
			//p.value = $(sliderDiv).slider("value");
			return  p.value;
		}
		else
		{
			p.minStep ? $(sliderDiv).slider("option","step",p.minStep) : null;
			$(sliderDiv).slider("value", _val);
			$(sliderDiv).slider("option","step",p.step);
		}
	}
	//================================================================================
	this.addEventListener = function(_evt, _fun)
	{
		p[_evt] = _fun;
	}
	//================================================================================
	this.show = function()
	{
		p.target.show();
	}
	//================================================================================
	this.hide = function()
	{
		p.target.hide();
	}
	//================================================================================
	this.enable = function()
	{
		isDisabled = false;
		$(sliderDiv).slider("option", "disabled", false);
		$(sliderDiv).css("opacity", "1");
		var _str = $(sliderDiv).children("a").attr("style");
		if(_str.indexOf("cursor") != -1)
		{
			_str = _str.replace(_str.substring(_str.indexOf("cursor"),_str.indexOf(";", _str.indexOf("cursor")) + 1), "");
			$(sliderDiv).children("a").attr("style", _str);
		}
		$(sliderDiv).children("a").addClass("commongrab").removeAttr("href");
		//---------------------
		if(BrowserDetect.any())
		{
			$(sliderDiv).unbind("touchstart", onEventAudio).bind("touchstart", onEventAudio);
			$(sliderDiv).unbind("touchend", onEventAudio).bind("touchend", onEventAudio);
		}
		else
		{
			$(sliderDiv).unbind("mousedown", onEventAudio).bind("mousedown", onEventAudio);
		}
	}
	//================================================================================
	this.disable = function()
	{
		isDisabled = true;
		$(sliderDiv).slider("option", "disabled", true);
		$(sliderDiv).css("opacity", "0.5");
		$(sliderDiv).children("a").removeClass("commongrab");
		$(sliderDiv).children("a").css("cursor", "default");
		//---------------------
		if(BrowserDetect.any())
		{
			$(sliderDiv).unbind("touchstart", onEventAudio).unbind("touchend", onEventAudio);
		}
		else
		{
			$(sliderDiv).unbind("mousedown", onEventAudio);
		}
	}
	//================================================================================
	this.updateMaxMin = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		p.value = p.value > p.max ? p.max : p.value < p.min ? p.min : p.value;
		$(sliderDiv).slider({min: p.min,max: p.max, value:p.value, step: p.step});
	}
	//================================================================================
	this.getMaxMin = function()
	{
		return ({min: p.min,max: p.max});
	}
	//================================================================================
	this.updateRestrictMax = function(_val)
	{
		p.restrictMax = _val;
	}
	//================================================================================
	this.updateRestrictMin = function(_val)
	{
		p.restrictMin = _val;
	}
	//================================================================================
	this.updateTitle = function(_val)
	{
		p.title = _val;
		$(slidCnv).attr("p_title", GCTConv(p.title));
		$(sliderDiv).children("a").attr("p_title", GCTConv(p.title));
	}
	//================================================================================
	this.changeColor = function(_color,_flagForBg,_flagForKnob)
	{
		p.color = _color;
		
		if(!_flagForKnob)
			drawKnob();
		
		if(!_flagForBg)
		{
			$(sliderDiv).css(
			{
				"background":p.color,
			});
		}
	}
	//================================================================================
	this.visibleKnob = function(flag)
	{
		if(flag)
		{
			$(slidCnv).show();
			$(slidKnobBg).show();
		}
		else
		{
			$(slidCnv).hide();
			$(slidKnobBg).hide();
		}
	}
	//================================================================================
	this.setHighLightKnob = function(_flag,_color,_blurVal,_spreadVal)
	{
		if(_flag)
		{
			if(typeof _blurVal == "undefined")
				_blurVal = 5;
			if(typeof _spreadVal == "undefined")
				_spreadVal = 1;
			
			$(slidKnobBg).css("box-shadow","0px 0px "+ globalResizeCalc(_blurVal) + "px "+ globalResizeCalc(_spreadVal)+ "px "+_color);
		}
		else
		{
			$(slidKnobBg).css("box-shadow","");
		}
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function createBaseLine()
	{
		if(p.target != undefined)
		{
			p.target.css(
			{
				"position":"absolute",
				"left": p.x+"px",
				"top": p.y+"px"
			});
			//----------------------------
			sliderDiv = document.createElement("div");
			p.target.append(sliderDiv);
			$(sliderDiv).slider();
			$(sliderDiv).css(
			{
				"position":"absolute",
				"left":"0px",
				"top":globalResizeCalc(13)+"px",
				"width":p.width+"px",
				"height":p.height+"px",
				"background":p.color,
				"border-radius":"5px",
				"box-shadow":"3px 5px 5px rgba(0,0,0,0.5) inset"
			});
			$(sliderDiv).children("a").css(
			{
				"position":"absolute",
				"text-align": "center",
				"outline":"none"
			});//.addClass("commongrab");
			
			$(sliderDiv).slider(
			{
				min: p.min,
				max: p.max,
				orientation: p.horizontal ? "horizontal" : "vertical",
				step: p.step ? p.step : null,
				change: sliderEvents,
				create: sliderEvents,
				slide: sliderEvents,
				start: sliderEvents,
				stop: sliderEvents
			});
			
			if(p.horizontal)
			{
				$(sliderDiv).children("a").css(
				{
					"top": "0px",
					"left": "0px",
					"width":globalResizeCalc(25)+"px",
					"height":p.knobHeight+"px",
					"margin-top":-(p.knobHeight-p.height)/2+"px",
					"margin-left": -(p.knobHeight-p.height)/2 +"px",
				});
				$(slidKnobBg).css(
				{
					"position":"absolute",
					"top":globalResizeCalc(1)+"px",
					"left": globalResizeCalc(13)+"px",
					"width":globalResizeCalc(3)+"px",
					"height":globalResizeCalc(33)+"px",
				});
			}
			else
			{
				$(sliderDiv).children("a").css(
				{
					"bottom": "0px",
					"left": "0px",
					"width":p.knobHeight+"px",
					"height":globalResizeCalc(15)+"px",
					"margin-bottom":globalResizeCalc(-8)+"px",
					"margin-left":-(p.knobHeight-p.width)/2+"px",
				});
				$(slidKnobBg).css(
				{
					"position":"absolute",
					"top": globalResizeCalc(8)+"px",
					"left": globalResizeCalc(1)+"px",
					"width":globalResizeCalc(33)+"px",
					"height":globalResizeCalc(4)+"px",
				});
			}
			
			/*if(BrowserDetect.any())
			{
				$(sliderDiv).unbind("touchstart", onEventAudio).bind("touchstart", onEventAudio);
				$(sliderDiv).unbind("touchend", onEventAudio).bind("touchend", onEventAudio);
			}
			else
			{
				$(sliderDiv).unbind("mousedown", onEventAudio).bind("mousedown", onEventAudio);
			}*/
			_thisObj.enable();
			
			$(sliderDiv).slider("option", "value", p.inverse ? (p.max + p.min) - p.value : p.value);
			slidImg.src = "../com/images/slider_grad.png";
		
			if(p.autoTrigger)
			{
				setTimeout(function()
				{
				triggerEvent("slide");
				triggerEvent("change");
				},10)
			}
			
			
		}
	}
	
   function triggerEvent(_evt) 
	{
		$slider = $(sliderDiv);
		var _customEvent = {
			id: p.id,
			type: _evt,
			value: p.value
		}
		var _customUI = {
			value: p.value
		}
		$slider.slider('option', _evt).call($slider, _customEvent, _customUI);
	}
	//================================================================================
	function drawKnob()
	{
		if(p.willHighLight)
			$(sliderDiv).children("a").append(slidKnobBg);
		$(sliderDiv).children("a").append(slidCnv);
		p.title ? _thisObj.updateTitle(p.title) : _thisObj.updateTitle(GetGlobalTooltip("tooltip", "sliderKnob"));
		//------------------------
		slidCnv.width = p.knobWidth;
		slidCnv.height = p.knobHeight;
		
		//----------
		if(!p.horizontal)
		{
			$(slidCnv).css(
			{
				/* "transform": "rotate(-90deg)",
				"-webkit-transform": "rotate(-90deg)",
				"-ms-transform": "rotate(-90deg)",
				"margin-top":globalResizeCalc(-8)+"px" */
				"position":"absolute",
				"top":globalResizeCalc(4)+"px",
				"left":"0px"
			});
			slidCnv.width = p.knobHeight;
			slidCnv.height = p.knobWidth;
			
			slidCtx.translate(0,p.knobWidth);
			slidCtx.rotate(-Math.PI/2);
		}
		else
		{
			$(slidCnv).css(
			{
				"transform": "rotate(0deg)",
				"-webkit-transform": "rotate(0deg)",
				"-ms-transform": "rotate(0deg)"
			});
			slidCnv.width = p.knobWidth;
			slidCnv.height = p.knobHeight;
		}
		slidCtx.beginPath();
		slidCtx.moveTo(globalResizeCalc(1.5), globalResizeCalc(1.5));
		slidCtx.bezierCurveTo(globalResizeCalc(5.5), globalResizeCalc(-1.5), globalResizeCalc(5.5), globalResizeCalc(-1.5), globalResizeCalc(9.5), globalResizeCalc(1.5));
		slidCtx.bezierCurveTo(globalResizeCalc(12), globalResizeCalc(17), globalResizeCalc(12), globalResizeCalc(17), globalResizeCalc(9.5), globalResizeCalc(34));
		slidCtx.bezierCurveTo(globalResizeCalc(5.5), globalResizeCalc(37.5), globalResizeCalc(5.5), globalResizeCalc(37.5), globalResizeCalc(1.5), globalResizeCalc(34));
		slidCtx.bezierCurveTo(globalResizeCalc(-1.5), globalResizeCalc(17), globalResizeCalc(-1.5), globalResizeCalc(17), globalResizeCalc(1.5), globalResizeCalc(1.5));
		slidCtx.fillStyle = typeof(p.knobColor) != "undefined" ? p.knobColor : p.color;;
		slidCtx.fill();
		slidCtx.drawImage(slidImg, 0, 0, p.knobWidth, p.knobHeight);
	}
	//================================================================================
	function onEventAudio(e)
	{
		if(e.type == "mousedown")
		{
			$(document).unbind("mouseup", onEventAudio).bind("mouseup", onEventAudio);
		}
		if(e.type == "mousedown" || e.type == "touchstart")
		{
			e.type = "mousedown";
			addPointerGrabbing(true);
			audioPlayerObj.playAudio("down");
		}
		else if(e.type == "mouseup" || e.type == "touchend")
		{
			e.type = "mouseup";
			addPointerGrabbing(false);
			audioPlayerObj.playAudio("up");
			$(document).unbind("mouseup", onEventAudio);
			
		}
		
		if(p[e.type])
		{
			p[e.type](e);
		}
	}
	//================================================================================
	function sliderEvents(e, ui)
	{
		var flagForRestrict = false;
		if(p.id)
		{
			e.id = p.id;
		}
		e.value = p.inverse ? (p.max + p.min) - Number(ui.value) : ui.value;
		switch(e.type)
		{
			case "slidechange":
				e.type = "change";
				break;
			case "slidecreate":
				e.type = "create";
				break;
			case "slide":
				if(typeof p.restrictMax != "undefined")
				{
					if(p.restrictMax < ui.value)
					{
						e.value = p.restrictMax
						$(sliderDiv).slider("value", p.restrictMax)
						flagForRestrict = true;
					}
				}
				if(typeof p.restrictMin != "undefined")
				{
					if(p.restrictMin > ui.value)
					{
						e.value = p.restrictMin
						$(sliderDiv).slider("value", p.restrictMin)
						flagForRestrict = true;
					}
				}
				if(isDisabled) 
					return false;
				e.type = "slide";
				break;
			case "slidestart":
				e.type = "start";
				break;
			case "slidestop":
				e.type = "stop";
				if(p.restrictMax)
				{
					if($(sliderDiv).slider("value") > p.restrictMax)
					{
						$(sliderDiv).slider("value", p.restrictMax)
					}
				}
				if(p.restrictMin)
				{
					if($(sliderDiv).slider("value") < p.restrictMin)
					{
						$(sliderDiv).slider("value", p.restrictMin)
					}
				}
				break;
		}
		p.value = e.value;
		
		if(p.restrictMax)
		{
			if(p.value >= p.restrictMax)
			{
				p.value = p.restrictMax;
				
			}
		}
		if(p.restrictMin)
		{
			if(p.value <= p.restrictMin)
			{
				p.value = p.restrictMin;
			}
		}
		e.value = p.value;
		if(p[e.type])
		{
			p[e.type](e, ui);
		}
		
		if(flagForRestrict)
			return false;
	}
}
//================================================================================
//================================================================================
//================================================================================
// CHECK BOX COMPONENT
var CheckBoxComp = function()
{
	// Default starts ...
	var p = 
	{
		//target:"",
		id:"unnamed",
		checked: true,
		label:"",
		x:0,
		y:0,
		width:411,
		fontSize:"1em",
		labelColor:"#000000",
		labelTextShadow:"none",
		//change:""
	}
	// Default ends ...
	var _thisObj = this;
	var cb_bg, labelDiv;
	var prevState = false;
	var tickImg = new Image();
	tickImg.onload = updateView
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		p.x = globalResizeCalc(p.x);
		p.y = globalResizeCalc(p.y);
		//---------
		var _tDiv = document.createElement("div");
		if(p.target)
		{
			p.target.append(_tDiv);
		}
		else
		{
			$("body").append(_tDiv);
		}
		p.target = $(_tDiv);
		p.visible == false ? p.target.css("display", "none") : null;
		p.index ? p.target.css("z-index", p.index) : null;
		//---------
		p.target.css(
		{
			"position":"absolute",
			"left": p.x+"px",
			"top": p.y+"px",
			"width": p.width+"px",
			"font-size":p.fontSize,
			"cursor": "pointer"
		});
		//--------------------------
		cb_bg = document.createElement("canvas");
		p.target.append(cb_bg);
		cb_bg.width = globalResizeCalc(30);
		cb_bg.height = globalResizeCalc(30);
		$(cb_bg).css(
		{
			"position": "absolute",
			"left": "0px",
			"top": "0px"
			//"background": "url(../com/images/cb.png) no-repeat"
		});
		p.title ? $(cb_bg).attr("p_title", GCTConv(p.title)) : $(cb_bg).attr("p_title", GetGlobalTooltip("tooltip", "genricClick"));
		//--------------------------
		
		/* -----------------------Code Added by Vishal to fix checkbox vertically center Title issue--------------------------------- */
		
		var textDimention = getTextDimentions(p.label,p.fontSize);
		var probableTop = cb_bg.height/2 - textDimention.height/2; 
		
		// ========= Ref line to check checkBox center ===============
		var _refLine = document.createElement("div");
		$(_refLine).css(
		{
			"position": "absolute",
			"left": "0px",
			"top": cb_bg.height/2+"px",
			"height":"1px",
			//"background": "#ff0000",
			"width": "100%",
			"display":"none"
		});
		p.target.append(_refLine);
		
		//================ Text parent having display table =================
		var _refTextWarapper = document.createElement("div");
		$(_refTextWarapper).css(
		{
			"position": "absolute",
			"left": (cb_bg.width+globalResizeCalc(5))+"px",
			"height":cb_bg.height+"px",
			"display":"table",
			//"background": "rgba(204, 204, 204, 0.6)",
		});
		p.target.append(_refTextWarapper);
		
		// ============ Text having display Cell vertical middle ==========
		labelDiv = document.createElement("span");
		$(_refTextWarapper).append(labelDiv);
		$(labelDiv).css(
		{
			"white-space": "nowrap",
			"color":p.labelColor,
			"text-shadow":p.labelTextShadow,
			"display":"table-cell",
			"vertical-align":"middle"
		}).html(p.label);
		
		// ========= This hack is added. Since in 7-8 Gizmo position of textLabel is set by using custom class moveUp by arshad
		if($(labelDiv).children().length > 0)
		{
			var _labelChildArr = $(labelDiv).children();
			/* $(labelDiv).empty();
			$(labelDiv).html($(_labelChildArr[0]).html()); */
			//changed to remove style only
			$(_labelChildArr).attr("style","")
		}
		
		/* ------------------------------------------------------------------ */
		
		p.verticalAlign ? $(labelDiv).css("top",globalResizeCalc(-5)+"px") : null;
		p.title ? $(labelDiv).attr("p_title", GCTConv(p.title)) : $(cb_bg).attr("p_title", GetGlobalTooltip("tooltip", "genricClick"));
		//--------------------------
		_thisObj.setEnable();
		//--------------------------
		tickImg.src = "../com/images/cb.png";
		//updateView();
	}
	function getTextDimentions(txt,fontSize) 
	{
		$(".wrapper").append("<span class='sampleTextDiv' style='font-size:" + fontSize + ";display:none'>" + txt + "</span>"); 
		var textObj = new Object();
		textObj.width = $(".sampleTextDiv").width();    
		textObj.height = $(".sampleTextDiv").height();
		$(".sampleTextDiv").remove();
		return textObj;
	}
	//================================================================================
	this.addEventListener = function(_evt, _fun)
	{
		p[_evt] = _fun;
	}
	//================================================================================
	this.setLabel = function(arg)
	{
		$(labelDiv).html(arg);
	}
	//================================================================================
	this.setTitle = function(_title)
	{
		p.title = _title;
		$(labelDiv).attr("p_title", GCTConv(p.title));
		$(cb_bg).attr("p_title", GCTConv(p.title));
	}
	//================================================================================
	this.setLabelColor = function(_col)
	{
		p.labelColor = _col;
		$(labelDiv).css(
		{
			"color":p.labelColor
		});
	}
	//================================================================================
	this.getLabelColor = function()
	{
		return p.labelColor;
	}
	//================================================================================
	this.setStatus = function(bool)
	{
		if (bool)
		{
			p.checked = true;
		}
		else
		{
			p.checked = false;
		}
		updateView();
	}
	//================================================================================
	this.getStatus = function()
	{
		return p.checked;
	}
	//================================================================================
	this.setEnable = function()
	{
		p.target.css(
		{
			'cursor':'pointer',
			'opacity':1
		});
		if(BrowserDetect.any())
		{
			p.target.unbind("touchstart", oncbEvent).bind("touchstart", oncbEvent).unbind("touchend", oncbEvent).bind("touchend", oncbEvent);
		}
		else
		{
			p.target.unbind("click", oncbEvent).bind("click", oncbEvent);
			p.target.unbind("mousedown", oncbEvent).bind("mousedown", oncbEvent);
		}
	}
	//================================================================================
	this.setDisable = function()
	{
		p.target.css(
		{
			'cursor':'default',
			'opacity':0.5

		});
		if(BrowserDetect.any())
		{
			p.target.unbind("touchstart", oncbEvent).unbind("touchend", oncbEvent);
		}
		else
		{
			p.target.unbind("click", oncbEvent);
			p.target.unbind("mousedown", oncbEvent);
		}
	}
	//================================================================================
	this.show = function()
	{
		p.target.show();
	}
	//================================================================================
	this.setCss = function(_obj)
	{
		p.target.css(_obj);
	}
	//================================================================================
	this.hide = function()
	{
		p.target.hide();
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	
	
	function oncbEvent(e)
	{
		if(e.type == "mousedown" || e.type == "touchstart")
		{
			focusOutInput();
			audioPlayerObj.playAudio("down");
			drawCB(true);
			$(window).unbind("mouseup", oncbEvent).bind("mouseup", oncbEvent);
			
			// prevState = p.checked;
		}
		else if(e.type == "mouseup" || e.type == "touchend")
		{
			audioPlayerObj.playAudio("up");
			$(window).unbind("mouseup", oncbEvent);
			//p.checked = !prevState;
			updateView();
			
		}
		if(e.type == "click" || e.type == "touchend")
		{
			//--------
			p.checked = !p.checked;
			updateView();
			//--------
			e.id = p.id;
			e.checked = p.checked;
			if(p.change)
			{
				p.change(e);
			}
		}
	}
	//================================================================================
	function updateView()
	{
		drawCB();
	}
	//================================================================================
	function drawCB(_downBool)
	{
		cb_bg.width = cb_bg.width;
		_lWid = globalResizeCalc(4);
		var _ctx = cb_bg.getContext("2d");
		//--------------
		_ctx.beginPath();
		_ctx.strokeStyle = _downBool ? "#545454" : "#999999";
		_ctx.lineWidth = _lWid;
		_ctx.fillStyle = _downBool ? "rgba(153, 153, 153, 0.6)" : "rgba(255, 255, 255, 0.6)";
		_ctx.rect(_lWid / 2, _lWid / 2, cb_bg.width - _lWid, cb_bg.height - _lWid);
		_ctx.fill();
		_ctx.stroke();
		//--------------
		if(p.checked)
		{
			_ctx.beginPath();
			_ctx.drawImage(tickImg, 0, 0, cb_bg.width, cb_bg.height);
		}
	}
}
//================================================================================
//================================================================================
// TEXT FIELD COMPONENT 
var TextFieldComp = function()
{
	// Default starts ...
	var p = 
	{
		//target:"",
		value:5,
		x:0,
		y:0,
		width:57,
		height:33,
		border:"none",
		innerBorder:"none",
		bgColor:"#E5E5E5",
		fontSize:"1em",
		align:"right",
		paddingTop:4,
		padding:6,
		type:"normal",
		toFixed:0,
		maxlength:4,
		incrDecrVarValue:1,
		autoValidate:true,
		showControls:false,
		rSideLineShow:true,
		preTxt:"",
		sufTxt:"",
		isNumber:true,
		restrict:"",
		bgNone : false,
		color:"#000000",
		bold:false,
		controlBtnWidth:24,
		controlBtnHeight:11,
		controlBtnLineWidth:2,
		controlBtnPadding:1,
		
		showControlsLeft:1,
		textVerticallyCenterBool : false,
		restrictAfterDecimal:false,
		afterDecimalLength:0,
		allowChangeOnEnterPress : true,
		//buttonBg : "rgb(153, 220, 197)"//"rgb(251, 183, 178)"
	}
	// Default ends ...
	var _thisObj = this;
	var textBox, textBoxHolder;
	var inc;
	var dec;
	var outerWidth;
	var incDecLeft;
	var rightDiv;
	var colorComb;
	var updateWidth;
	var conWid, conHgt, incClick, idHold;
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		
		p.x = Math.round(globalResizeCalc(p.x));
		p.y = Math.round(globalResizeCalc(p.y));
		
		p.padding = Math.round(globalResizeCalc(p.padding));
		p.paddingTop = Math.round(globalResizeCalc(p.paddingTop));
		
		if(p.showControls)
		{
			outerWidth = p.width+30;
			incDecLeft = p.width; 
			outerWidth = Math.round(globalResizeCalc(outerWidth));
			incDecLeft = Math.round(globalResizeCalc(incDecLeft));
		}
		else
		{
			outerWidth = Math.ceil(globalResizeCalc(p.width));
		}
		p.width = Math.round(globalResizeCalc(p.width));
		p.height = Math.round(globalResizeCalc(p.height));
		
		p.controlBtnPadding = globalResizeCalc(p.controlBtnPadding);
		//---------
		p.restrict = p.restrict == "number" ? "1234567890.-" : p.restrict;
		//---------
		var _tDiv = document.createElement("div");
		if(p.target)
		{
			p.target.append(_tDiv);
		}
		else
		{
			$("body").append(_tDiv);
		}
		p.target = $(_tDiv);
		p.visible == false ? p.target.css("display", "none") : null;
		
		p.class ? p.target.attr('class', p.class): null;
		//---------
		p.target.css(
		{
			"position": "absolute",
			"left": p.x+"px",
			"top": p.y+"px",
			"width": outerWidth,
			"height": p.height,
			"border": p.border,
			"padding-top": p.paddingTop+"px",
			"box-sizing": "border-box",
			"-webkit-box-sizing": "border-box",
			"-moz-box-sizing": "border-box",
			"-ms-box-sizing": "border-box",
			"-o-box-sizing": "border-box",
			"outline": "none",
			"white-space": "nowrap",
			"overflow": "hidden",
			"font-size":p.fontSize,
			"color":p.color
		}).attr("id",p.id+"_TextField");
		p.index ? p.target.css("z-index", p.index) : null;
		p.bold ? p.target.css("font-weight","bold") : null;
		textBox = p.type == "normal" ? document.createElement("div") : document.createElement("input");
		
		//commented to hide auto increment-decrement button in input field for devices.
		//BrowserDetect.any() ? p.isNumber ? textBox.type = "number" : null : null;
		
		p.onFocusColor ? $(textBox).bind("focusin",onFocusIn) : null ;
		
		textBoxHolder = document.createElement("div");
		p.target.append(textBoxHolder)
		if(p.rSideLineShow)
		{
			rightDiv = document.createElement("div");
			updateWidth = p.width-globalResizeCalc(8);
			p.target.append(rightDiv);
		}
		else
		{
			updateWidth = p.width;
		}
		
		
		//p.target.append(textBox).append(rightDiv);
		
		
		$(textBoxHolder).css(
		{
			"position":"absolute",
			"width": updateWidth,
			"height": p.height,
			"left":"0px",
			"top": "0px", // fixed top position, as this is appended inside its parent div.
			"border": p.innerBorder,
			"box-sizing":"border-box"
			/* "background": p.bgColor,
			"box-shadow": "rgba(0, 0, 0, 0.4) 3px 3px 5px inset", */
		});
		
		if(!p.bgNone)
		{
			$(textBoxHolder).css(
			{
				"background": p.bgColor,
				"box-shadow": "rgba(0, 0, 0, 0.4) 3px 3px 5px inset",
			});
		}
		$(textBoxHolder).append(textBox);
		$(textBox).css(
		{
			"position":"absolute",
			"width": updateWidth,
			"height": $(textBoxHolder).height(),
			"left":"0px",
			"top": "0px", // fixed top position, as this is appended inside its parent div.
			"border":"0px solid #ff0000",
			"background": "rgba(0,0,0,0)",
			"font": "inherit",
			"color":p.color,
			"text-align": p.align,
			"padding": "0px "+p.padding+"px",
			"padding-top": p.paddingTop+"px",
			"box-sizing": "border-box",
			"outline": "none",
			"white-space": "nowrap",
		}).attr("spellcheck","false");
		p.bold ? $(textBox).css("font-weight","bold") : null;
		if(p.title)
		{
			p.title.textfield ? $(textBox).attr("p_title", GCTConv(p.title.textfield)) :$(textBox).attr("p_title", GCTConv(p.title));
		}else
		{
			$(textBox).attr("p_title", GetGlobalTooltip("tooltip", "textFeild"))
		}
		//=============right side div style===============================
		switch(Number(p.rSideLine))
		{
			case 1:
				colorComb = '0,172,239';
			break;
			case 2:
				colorComb = '75,83,236';
			break;
			case 3:
				colorComb = '244,77,63';
			break;
			case 4:
				colorComb = '0,168,110';
			break;
			case 5:
				colorComb = '154,54,205';
			break;
			case 6:
				colorComb = '151,151,151';
			break;
			default:
				colorComb = p.rSideLine;
			break;
		
				
		}
		if(p.rSideLineShow)
		{
			$(rightDiv).css({
				"position":"absolute",
				"width": globalResizeCalc(5)+"px",
				"height":p.height+"px",
				"top":globalResizeCalc(0)+"px",
				"right":globalResizeCalc(0)+"px",
				"background":"rgba("+colorComb+",1)",
			});
		}
		//-----------------------
		if(p.showControls) // if controls are ON, then append control divs.
		{
			idHold = document.createElement("div");
			idHold.setAttribute("id","isHold");
			inc = document.createElement("canvas");
			dec = document.createElement("canvas");
			p.target.append(idHold);
			var _bPix = p.controlBtnPadding < 1 ? 1 : p.controlBtnPadding;
			
			var _btnWidth = (!p.buttonBg) ? globalResizeCalc(p.controlBtnWidth + p.controlBtnLineWidth) : globalResizeCalc(24);
			
			$(idHold).css(
			{
				"position":"absolute",
				"left":updateWidth + globalResizeCalc(p.showControlsLeft)+"px",
				"top": "0px",
				"width": _btnWidth+"px",
				"height": p.height+"px",
				"background":"rgba(255, 0, 0, 0)",
			
			});
			$(idHold).append(inc).append(dec);
			inc.width = p.controlBtnWidth;
			inc.height = p.controlBtnHeight;
			inc.disabled = false;
			$(inc).css(
			{
				"position":"absolute",
				"width":globalResizeCalc(p.controlBtnWidth)+"px",
				"height": globalResizeCalc(p.controlBtnHeight)+"px",
				"left":"4%",
				//"margin-left":"-"+globalResizeCalc(12)+"px",
				"top": _bPix+"px",
				
				
			}).attr("data-"+p.id+"_inc", "true");
			drawButtons("inc", "normal");
			//------------------
			dec.width = p.controlBtnWidth;
			dec.height = p.controlBtnHeight;
			dec.disabled = false;
			$(dec).css(
			{
				"position":"absolute",
				"width":globalResizeCalc(p.controlBtnWidth)+"px",
				"height": globalResizeCalc(p.controlBtnHeight)+"px",
				"left":"4%",
				//"margin-left":"-"+globalResizeCalc(12)+"px",
				"bottom": _bPix+"px",
			}).attr("data-"+p.id+"_dec", "true");
			drawButtons("dec", "normal");
			
			if(p.buttonBg)
			{
				$(inc).css({
								"box-shadow" : ""+_bPix+"px "+_bPix+"px 0px 0px #999999, -"+_bPix+"px -"+_bPix+"px 0px 0px #FFFFFF",
								"background" : p.buttonBg,
								"width":globalResizeCalc(p.controlBtnWidth-4),
								"height":"45%",
								"left":"4%",
								"top": _bPix+"px",
							});
				$(dec).css({
								"box-shadow" : ""+_bPix+"px "+_bPix+"px 0px 0px #999999, -"+_bPix+"px -"+_bPix+"px 0px 0px #FFFFFF",
								"background" : p.buttonBg,
								"width":globalResizeCalc(p.controlBtnWidth-4),
								"height":"45%",
								"left":"4%",
								"bottom": _bPix+"px",
							});
			}
			
			//-------------------------------------
			if(p.title)
			{
				p.title.increase ? $(inc).attr("p_title", GCTConv(p.title.increase)) : $(inc).attr("p_title", GetGlobalTooltip("tooltip", "textFeild"));
				p.title.decrease ? $(dec).attr("p_title", GCTConv(p.title.decrease)) : $(dec).attr("p_title", GetGlobalTooltip("tooltip", "textFeild"));
			}
			//-------------------------------------
			bindEvents(true)
			
			
		}
		if(p.type == "normal")
		{
			$(textBox).css({"cursor":"default"});
			$(textBox).removeAttr("p_title");
		}
		//----------------
		$(textBox).unbind("keyup", onTextFieldUpdate).bind("keyup", onTextFieldUpdate);
		$(textBox).unbind("focus", onTextFieldUpdate).bind("focus", onTextFieldUpdate);
		$(textBox).unbind("keypress", onTextFieldUpdate).unbind("keydown", onTextFieldUpdate);
		
		$(textBox).bind("keypress", onTextFieldUpdate);
		
		if(BrowserDetect.Android())
			$(textBox).unbind("keyup", onTextFieldUpdate).bind("keyup", onTextFieldUpdate);
		
		if(p.autoValidate || p.change)
		{
			$(textBox).unbind("focusout").bind("focusout", onTextFieldUpdate);
		}
		_thisObj.setValue(p.value);
		setEnableDisableControls();
	}
	//================================================================================
	this.validate = function()
	{
		var _vval = _thisObj.getValue();
		
		/* if(_vval.indexOf(".") != -1 && !isNaN(_vval))
		{
			_thisObj.setValue(getRound(_vval,p.toFixed));
		} */
		if(p.isNumber && _vval != "")
		{	
			_vval = Number(_thisObj.getValue());
			_vval = isNaN(_vval) ? 0 : _vval;
			
			var _multVal = Math.pow(10,p.toFixed);
			if(p.min)
			{
				_vval = _vval < p.min ? p.min : _vval;
				_thisObj.setValue(p.toFixed > 0 ? ((_vval*_multVal).toFixed(1)*1).toFixed(0)/_multVal : (p.toFixed == 0) ? Math.round(_vval) : _vval);
			}
			if(p.max)
			{
				_vval = _vval > p.max ? p.max : _vval;
				_thisObj.setValue(p.toFixed > 0 ? ((_vval*_multVal).toFixed(1)*1).toFixed(0)/_multVal : (p.toFixed == 0) ? Math.round(_vval) : _vval);
			}
		}
	}
	//================================================================================
	this.addEventListener = function(_evt, _fun)
	{
           p[_evt] = _fun;
	}
	//================================================================================
	this.dispatchEvent = function(_evt)
	{
		if(p[_evt])
		{
			p[_evt]();
		}
	}
	//================================================================================
	this.getValue = function()
	{
		if(p.type == "normal")
		{
			if(!p.textVerticallyCenterBool)
			{
				return $(textBox).text();
			}
			else
			{
				return $(textBox).find("span").text();
			}
			
		}
		else
		{
			var _tVal = $(textBox).val(); // to return value without preTex & sufTxt.
			if(p.preTxt != "")
			{
				_tVal = _tVal.replace(p.preTxt,"");
			}
			else if(p.sufTxt != "")
			{
				_tVal = _tVal.replace(p.sufTxt,"");
			}
			return _tVal;
		}
	}
	//================================================================================
	this.setValue = function(_tempVal)
	{
		/* if(!isNaN(_tempVal))
		{
			_tempVal = _tempVal > p.max ? p.max : _tempVal;
			_tempVal = _tempVal < p.min ? p.min : _tempVal;
		} */
		_tempVal = p.toFixed && !isNaN(_tempVal) ? (((_tempVal*10).toFixed(p.toFixed-1))/10).toFixed(p.toFixed) : _tempVal;
		_tempVal = p.preTxt + _tempVal + p.sufTxt;
		
		//========= Vertical align center ==============
		if(p.type == "normal")
			{
				$(textBox).css(
				{
					"display":"table",
					"padding":"0px",
					"padding-right": "2px"
				}).empty();
				var _span = document.createElement("span");
				$(_span).css(
				{
					"display": "table-cell",
					"vertical-align": "middle",
					"padding": "0px "+p.padding+"px",  // added to align span text (09/1/2016)
					"padding-top": p.paddingTop+"px",  // added to align span text (09/1/2016)
				})
				$(_span).html(_tempVal);
				$(textBox).append(_span);
			}
			else
			{
				var textDimention = getTextDimentions(p.label,p.fontSize);
				var parentHt = $(textBox).parent().height();
				var _margin = parentHt/2 - textDimention.height/2;
				_margin +=  globalResizeCalc(1);
				//console.log(_tempVal,textDimention,_margin);
				$(textBox).css(
				{
					"padding-top":"0px",
					"top":_margin+"px",
					"height":"auto",
					//"line-height":($(textBox).parent().height()+globalResizeCalc(1))+"px",
				}).val(_tempVal);
			}
		//=================================================
		
		
		
		if(typeof(p.min) != "undefined" || typeof(p.max) != "undefined")
		{
			setEnableDisableControls();
		}
	}
	function getTextDimentions(txt,fontSize) 
	{
		$(".wrapper").append("<span class='sampleTextDiv' style='font-size:" + fontSize + ";display:none'>" + txt + "</span>"); 
		var textObj = new Object();
		textObj.width = $(".sampleTextDiv").width();    
		textObj.height = $(".sampleTextDiv").height();
		$(".sampleTextDiv").remove();
		return textObj;
	}
	//================================================================================
	this.updateVal = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		if(typeof(_obj.value) != "undefined" || typeof(_obj.min) != "undefined" || typeof(_obj.max) != "undefined")
		{
			setEnableDisableControls();
		}
	}
	//================================================================================
	this.show = function()
	{
		p.target.show();
	}
	//================================================================================
	this.hide = function()
	{
		p.target.hide();
	}
	//================================================================================
	this.enable = function()
	{
		if(p.type != "normal")
		{
			$(textBox).removeAttr("disabled").removeClass("inputDis");
			p.target.css("opacity", 1);
		}
		
		setEnableDisableControls();
		if(p.showControls)
		{
			bindEvents(true)
		}
	}
	//================================================================================
	this.disable = function()
	{
		if(p.type != "normal")
		{
			$(textBox).attr("disabled", "true").addClass("inputDis");
			p.target.css("opacity", 0.5);
		}
		if(p.showControls)
		{
			dec.disabled = true;
			drawButtons("dec", "disabled");
			drawButtons("inc", "disabled");
			inc.disabled = true;
			bindEvents(false)
		}
	}
	//================================================================================
	this.getFocus = function()
	{
			$(textBox).focus();
	}
	//================================================================================
	this.changeTitle = function(_title)
	{
		if(_title)
		{
			p.title = _title;
			$(textBox).attr("p_title", GCTConv(p.title));
		}
	}
	//================================================================================
	this.updateMaxMin = function(_min, _max)
	{
		p.min = _min;
		p.max = _max;
		setEnableDisableControls();
	}
	//================================================================================
	this.getMaxMin = function()
	{
		return ({min: p.min,max: p.max});
	}
	//================================================================================
	this.changeRSideline = function(_color)
	{
		$(rightDiv).css({"background":_color})
	}
	this.setCss = function(_obj)
	{
		p.target.css(_obj);
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function bindEvents(flag)
	{
		if(flag)
		{
			$(idHold).unbind("click", onTextFieldUpdate).bind("click", onTextFieldUpdate);
			if(BrowserDetect.any())
			{
				$(idHold).unbind("touchstart", onMouseEvent).bind("touchstart", onMouseEvent);
				$(idHold).unbind("touchend", onMouseEvent).bind("touchend", onMouseEvent);
			}
			else
			{
				$(idHold).unbind("mousedown", onMouseEvent).bind("mousedown", onMouseEvent);
				$(idHold).unbind("mousemove", onMouseEvent).bind("mousemove", onMouseEvent);
				$(idHold).unbind("mouseout", onMouseEvent).bind("mouseout", onMouseEvent);
			}
		}
		else
		{
			$(idHold).unbind("click", onTextFieldUpdate);
			if(BrowserDetect.any())
			{
				$(idHold).unbind("touchstart", onMouseEvent);
				$(idHold).unbind("touchend", onMouseEvent);
			}
			else
			{
				$(idHold).unbind("mousedown", onMouseEvent);
				$(idHold).unbind("mousemove", onMouseEvent);
				$(idHold).unbind("mouseout", onMouseEvent);
			}
		}
	}
	function onFocusIn()
	{
		$(textBoxHolder).css({background:p.onFocusColor});
		$(window).unbind("focusout",onFocusOut).bind("focusout",onFocusOut);
	}
	//================================================================================
	function onFocusOut()
	{
		$(window).unbind("focusout",onFocusOut);
		$(textBoxHolder).css({background:p.bgColor})
	}
	//================================================================================
	function getRound(num,dec)
	{
		var tempArr = (""+num).split(".");
		if(tempArr[1])
		{
			var str = tempArr[1];
			if( dec < str.length)
			{
				var newStr = "0.";
				for(var i = 0; i < dec-1;i++)
				{
					newStr += "0";
				}
				if( 5 <= str[dec]*1 )
				{
					newStr += "1";
				}
				else
				{
					newStr += "0";
				}
				num = ((tempArr[0]+"."+tempArr[1].slice(0,dec))*1 + Number(newStr)).toFixed(dec);
			}
		}	
		return num;
	}
	function onTextFieldUpdate(e)
	{
		var txtVal = _thisObj.getValue();
		//console.log(e.type);
		if(e.type == "focus") 	// to return value without preTex & sufTxt.
		{
			p.type == "normal" ? $(textBox).text(txtVal) : $(textBox).val(txtVal);
			p.onFocus ? p.onFocus({id:p.id}) : null;
		}
		if(e.type == "click") // if increment or decrement is clicked do this
		{
			var _incClick = (e.pageY >= $(this).offset().top && e.pageY <= ($(this).offset().top + $(this).height() / 2));
			if(_incClick)
			{
				if(!inc.disabled)
				{
					txtVal = Number(txtVal) + p.incrDecrVarValue;
					/*drawButtons("dec", "normal");
					dec.disabled = false;
					if(txtVal >= p.max)
					{
						drawButtons("inc", "disabled");
						inc.disabled = true;
					}*/
					_thisObj.setValue(txtVal);
					onEnterUpdate(e);
					p.textChange ? p.textChange({id: p.id, val: _thisObj.getValue()}) : null;
					setEnableDisableControls();
				}
			}
			else
			{
				if(!dec.disabled)
				{
					txtVal = Number(txtVal) - p.incrDecrVarValue;
					/*drawButtons("inc", "normal");
					inc.disabled = false;
					if(txtVal <= p.min)
					{
						dec.disabled = true;
						drawButtons("dec", "disabled");
					}*/
					_thisObj.setValue(txtVal);
					onEnterUpdate(e);
					p.textChange ? p.textChange({id: p.id, val: _thisObj.getValue()}) : null;
					setEnableDisableControls();
				}
			}
		}            
		if(e.type == "focusout")
		{
			onEnterUpdate(e);
		}
		else if(e.type == "keypress" || e.type == "keydown")
		{
			//var key = e.which ? e.which : e.keyCode;
			var key = e.which;
			if(key == 13)
			{
				audioPlayerObj.playAudio("confirm");
				if(p.allowChangeOnEnterPress) // to solve HGC-10973, This is added because on enter press "focusout and keypress" both are being dispatched and causing bug in 163, 128, 157.
				{
					onEnterUpdate(e);
				}
				return false;
			}
			//----------------------
			/*if(e.type == "keydown")
			{
			//if(p.restrict != "" && p.restrict.indexOf(String.fromCharCode(key)) == -1 && (key != 37) && (key != 39) && (key != 46) && (key != 8))
			if(p.restrict != "" && p.restrict.indexOf(String.fromCharCode(key)) == -1 && (key != 37) && (key != 39) && (key != 40) && (key != 8))
			{
				return false;
			}
			}
			else
			{*/
			if(p.restrict != "" && p.restrict.toLowerCase().indexOf(String.fromCharCode(key).toLowerCase()) == -1 && key != 0 && key != 8)
			{
				//if (key != 46 && key != 189 && key != 190 && key != 37 && key != 39 && key > 31 && (key < 48 || key > 57))
				return false;
			}
			//}
			var _dotIndex = _thisObj.getValue().indexOf(".");
			
			var startSelectionIndex = document.activeElement.selectionEnd < document.activeElement.selectionStart ? document.activeElement.selectionEnd : document.activeElement.selectionStart;
			var endSelectionIndex = document.activeElement.selectionEnd > document.activeElement.selectionStart ? document.activeElement.selectionEnd : document.activeElement.selectionStart;
			var selectedCount = Math.abs(endSelectionIndex - startSelectionIndex);
			if(p.restrictAfterDecimal && _dotIndex != -1 && (startSelectionIndex == endSelectionIndex || !(startSelectionIndex < _dotIndex && _dotIndex < endSelectionIndex)) && key == 46)
			{
				return false;
			}
			//----------------------
			var maxL = _thisObj.getValue().length;
			
			if( selectedCount <= 0 && (maxL >= p.maxlength && key != 0 && key != 8))
			{
				return false;
			}
			
			
			if(p.restrictAfterDecimal && key != 0 && key != 8)
			{
				// console.log("entered ... ")
				var curValue = ""+_thisObj.getValue()
				
				var startSubStr = curValue.slice(0,startSelectionIndex); 
				var endSubStr = curValue.slice(endSelectionIndex,curValue.length); 
				var newValue = (startSubStr+String.fromCharCode(e.which)+endSubStr); //*1;
				
				if(newValue > p.maxValue)
					return false;
				if(newValue < p.minValue)
					return false;
				newValue = ""+newValue;
				var prevDecVal = newValue.split(".")[0];
				prevDecVal = prevDecVal ? prevDecVal : ""
				var postDecVal = newValue.split(".")[1];
				postDecVal = postDecVal ? postDecVal : "";
				
				if(postDecVal.length > p.afterDecimalLength)
				{
					return false;
				} 
			}
			p.onKeyPress ? p.onKeyPress(e) : null;
		}
		else if(e.type == "keyup")
		{
			(txtVal.length > p.maxlength) ? _thisObj.setValue(txtVal.split(txtVal[p.maxlength-1])[0]) : null;
			var key = e.which;
			if(key == 13)
			{
				//console.error(":")
				$(e.currentTarget).blur();
			}
			p.onKeyUp ? p.onKeyUp(e) : null;
			// alert(txtVal + " :: "+p.maxlength +" :: " + (txtVal.length > p.maxlength))
			//e.id = p.id;
			//p.change ? p.change(e) : null;
		}
	}
	//================================================================================
	function setEnableDisableControls()
	{
		if(p.showControls)
		{
			var txtVal = _thisObj.getValue();
			//p.type == "normal" ? txtVal = $(textBox).html() : txtVal = $(textBox).val();
			//-------------------------
			if(txtVal >= p.max)
			{
				drawButtons("inc", "disabled");
				inc.disabled = true;
			}
			else
			{
				drawButtons("inc", "normal");
				inc.disabled = false;
			}
			//-------------------------
			if(txtVal <= p.min)
			{
				dec.disabled = true;
				drawButtons("dec", "disabled");
			}
			else
			{
				dec.disabled = false;
				drawButtons("dec", "normal");
			}
		}
	}
	//================================================================================
	function onMouseEvent(e)
	{
	   if(e.type == "mousedown" || e.type == "touchstart")
		{
			if(e.type == "touchstart")
			{
				e.pageX = e.originalEvent.touches[0].pageX;
				e.pageY = e.originalEvent.touches[0].pageY;
			}
			incClick = (e.pageY >= $(this).offset().top && e.pageY <= ($(this).offset().top + $(this).height() / 2)) ? inc : dec;
			if(!incClick.disabled)
			{
				audioPlayerObj.playAudio("down");
				$(incClick).css(
				{
					'transform':'scale(0.9)',
					'-ms-transform':'scale(0.9)',
					'-webkit-transform':'scale(0.9)',
				});
			}
			if(!BrowserDetect.any())
			{
				$(window).unbind("mouseup", onMouseEvent).bind("mouseup", onMouseEvent);
			}
		}
		if(e.type == "mouseup" || e.type == "touchend")
		{
			if(!incClick.disabled)
			{
				audioPlayerObj.playAudio("up");
			}
			$(window).unbind("mouseup", onMouseEvent);
			$(inc).css(
			{
				'transform':'scale(1)',
				'-ms-transform':'scale(1)',
				'-webkit-transform':'scale(1)',
			});
			$(dec).css(
			{
				'transform':'scale(1)',
				'-ms-transform':'scale(1)',
				'-webkit-transform':'scale(1)',
			});
		}
		if(e.type == "mousemove")
		{
			incClick = (e.pageY >= $(this).offset().top && e.pageY <= ($(this).offset().top + $(this).height() / 2)) ? inc : dec;
			if(!incClick.disabled)
			{
				$(idHold).css("cursor", "pointer");
			}
			else
			{
				$(idHold).css("cursor", "default");
			}
		}
		if(e.type == "mouseout")
		{
			$(idHold).css("cursor", "default");
		}
	}
	//================================================================================
	function onEnterUpdate(e)
	{
		p.isNumber && isNaN(_thisObj.getValue()) ? _thisObj.setValue(0) : null; 
		
		p.autoValidate ? _thisObj.validate() : null;
		e.id = p.id;
		p.change ? p.change(e) : null;
		setEnableDisableControls();
	}
	//================================================================================
	function drawButtons(_btn, _type)
	{
		if(_btn == "inc")
		{
			inc.width = inc.width
			inc.getContext("2d").beginPath();
			inc.getContext("2d").fillStyle = _type == "normal" ? "#666666" : "#B3B3B3";
			inc.getContext("2d").lineWidth = p.controlBtnLineWidth;
			inc.getContext("2d").strokeStyle = p.buttonBg ? p.buttonBg : "#ffffff";
			inc.getContext("2d").moveTo(inc.width / 2, p.controlBtnLineWidth/2);
			inc.getContext("2d").lineTo(inc.width - p.controlBtnLineWidth/2, inc.height - p.controlBtnLineWidth/2);
			inc.getContext("2d").lineTo(p.controlBtnLineWidth/2, inc.height - p.controlBtnLineWidth/2);
			inc.getContext("2d").lineTo(inc.width / 2, p.controlBtnLineWidth/2);
			inc.getContext("2d").fill();
			inc.getContext("2d").stroke();
			inc.getContext("2d").closePath();
		}
		else if(_btn == "dec")
		{
			dec.width = dec.width
			dec.getContext("2d").beginPath();
			dec.getContext("2d").fillStyle = _type == "normal" ? "#666666" : "#B3B3B3";
			dec.getContext("2d").lineWidth = p.controlBtnLineWidth;
			dec.getContext("2d").strokeStyle = p.buttonBg ? p.buttonBg : "#ffffff";
			dec.getContext("2d").moveTo(dec.width / 2, dec.height - p.controlBtnLineWidth/2);
			dec.getContext("2d").lineTo(dec.width - p.controlBtnLineWidth/2, p.controlBtnLineWidth/2);
			dec.getContext("2d").lineTo(p.controlBtnLineWidth/2, p.controlBtnLineWidth/2);
			dec.getContext("2d").lineTo(dec.width / 2, dec.height - p.controlBtnLineWidth/2);
			dec.getContext("2d").fill();
			dec.getContext("2d").stroke();
			dec.getContext("2d").closePath();
		}
	}
	//================================================================================
}
//================================================================================
//================================================================================
// CONTROL BUTTON COMPONENT
var ControlButton = function()
{
	// Default starts ...
	var p = 
	{
		//target:"",
		id:"",
		orientation:"horizontal",
		x:0,
		y:0,
		control:"wh",
		//click:""
	}
	// Default ends ...
	var _thisObj = this;
	var btnName;
	var legend, incBtn, resBtn, decBtn;
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		p.x = globalResizeCalc(p.x);
		p.y = globalResizeCalc(p.y);
		//---------
		var _tDiv = document.createElement("div");
		if(p.target)
		{
			p.target.append(_tDiv);
		}
		else
		{
			$("body").append(_tDiv);
		}
		p.target = $(_tDiv);
		p.visible == false ? p.target.css("display", "none") : null;
		p.index ? p.target.css("z-index", p.index) : null;
		//---------
		p.target.css(
		{
			"position":"absolute",
			"left": p.x+"px",
			"top": p.y+"px",
			"-ms-transform": "scale("+globalResizeCalc(1)+")",
			"-webkit-transform":"scale("+globalResizeCalc(1)+")",
			"transform": "scale("+globalResizeCalc(1)+")",
			"transform-origin": "0 0",
			"-webkit-transform-origin": "0 0",
			"-ms-transform-origin": "0 0",
		});
		//---------
		legend = document.createElement("div");
		incBtn = document.createElement("div");
		resBtn = document.createElement("div");
		decBtn = document.createElement("div");
		p.target.append(legend).append(incBtn).append(resBtn).append(decBtn);
		
		$(legend).attr(
		{
			"class": "controlLegend controllegend_"+p.control,
		})
		$(incBtn).attr(
		{
			"class": "controlbtnComponent controlbtnComponentInc controlbtnComponentNormal",
			"data-type": "increase"
		})
		$(resBtn).attr(
		{
			"class": "controlbtnComponent controlbtnComponentRes controlbtnComponentNormal",
			"data-type": "reset"
		})
		$(decBtn).attr(
		{
			"class": "controlbtnComponent controlbtnComponentDec controlbtnComponentNormal",
			"data-type": "decrease"
		})
		//-------------------------------
		if(p.title)
		{
			p.title.increase ? $(incBtn).attr("p_title", GCTConv(p.title.increase)) : null;
			p.title.reset ? $(resBtn).attr("p_title", GCTConv(p.title.reset)) : null;
			p.title.decrease ? $(decBtn).attr("p_title", GCTConv(p.title.decrease)) : null;
		}
		//-------------------------------
		if(BrowserDetect.any())
		{
			$(incBtn).bind("touchstart", btnEvt).bind("touchend", btnEvt);
			$(resBtn).bind("touchstart", btnEvt).bind("touchend", btnEvt);
			$(decBtn).bind("touchstart", btnEvt).bind("touchend", btnEvt);
		}
		else
		{
			$(incBtn).mousedown(btnEvt).click(btnEvt);
			$(resBtn).mousedown(btnEvt).click(btnEvt);
			$(decBtn).mousedown(btnEvt).click(btnEvt);
		}
	}
	//================================================================================
	this.addEventListener = function(_evt, _fun)
	{
		p[_evt] = _fun;
	}
	//================================================================================
	this.show = function()
	{
		p.target.show();
	}
	//================================================================================
	this.hide = function()
	{
		p.target.hide();
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function btnEvt(e)
	{
		if(e.type == "mousedown")
		{
			$(window).unbind("mouseup", onWindowUp).bind("mouseup", onWindowUp);
		}
		//-----------------------------
		if(e.type == "mousedown" || e.type == "touchstart")
		{
			focusOutInput();
			//--------
			audioPlayerObj.playAudio("down");
			btnName = $(this);
			$(this).removeClass("controlbtnComponentNormal");
			e.preventDefault();
		}
		//-----------------------------
		if(e.type == "click" || e.type == "touchend")
		{
			e.id = p.id;
			e.btnType = btnName.data("type");
			p.click ? p.click(e) : null;
			onWindowUp(e);
		}
	}
	function onWindowUp(e)
	{
		audioPlayerObj.playAudio("up");
		$(".controlbtnComponent").addClass("controlbtnComponentNormal");
		$(window).unbind("mouseup", onWindowUp);
	}
}
//================================================================================
//================================================================================
//	CONTROL BUTTON COMPONENT
//	Events
//	onevent
//		selectionchanged
//		increase
//		decrease
//		reset
var GraphControlButton = function()
{
	// Default starts ...
	var p = 
	{
		//target:"",
		id:"",
		x:0,
		y:0,
		restrict:"",
		rotation:0,
		//click:""
		holderBG:"rgba(255,255,255,0)",
		subMenu:["x","y","xy"]
	}
	// Default ends ...
	var _thisObj = this;
	var panType = "panxy";
	var subm, submhold, plus, reset, minus, panx, pany, panxy, arrow, curElem;
	var advConImg = new Image();
	advConImg.onload = createDisplay;
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		p.x = globalResizeCalc(p.x);
		p.y = globalResizeCalc(p.y);
		//---------
		var _tDiv = document.createElement("div");
		if(p.target)
		{
			p.target.append(_tDiv);
		}
		else
		{
			$("body").append(_tDiv);
		}
		p.target = $(_tDiv);
		p.visible == false ? p.target.css("display", "none") : null;
		p.index ? p.target.css("z-index", p.index) : null;
		//---------
		p.target.css(
		{
			"position":"absolute",
			"left": p.x+"px",
			"top": p.y+"px",
			"transform":"rotate("+p.rotation+"deg)",
			"-webkit-transform":"rotate("+p.rotation+"deg)",
			"-ms-transform":"rotate("+p.rotation+"deg)",
		});
		//---------
		advConImg.src = "../com/images/graphbuttons.png";
	}
	//================================================================================
	this.addEventListener = function(_evt, _fun)
	{
		p[_evt] = _fun;
	}
	//================================================================================
	this.getSelected = function()
	{
		return panType;
	}
	//================================================================================
	this.show = function()
	{
		p.target.show();
	}
	//================================================================================
	this.hide = function()
	{
		p.target.hide();
	}
	//================================================================================
	// increase/reset/decrease
	this.setDisabled = function(_targ)
	{
		var _type = BrowserDetect.any() ? "touchstart" : "mousedown";
		switch(_targ)
		{
			case "increase":
			$(plus).css(
			{
				"opacity" : 0.5,
				"cursor":"default"
			});
			$(plus).unbind(_type, btnEvt).unbind("click", btnEvt);
			break;
			case "reset":
			$(reset).css(
			{
				"opacity" : 0.5,
				"cursor":"default"
			});
			$(reset).unbind(_type, btnEvt).unbind("click", btnEvt);
			break;
			case "decrease":
			$(minus).css(
			{
				"opacity" : 0.5,
				"cursor":"default"
			});
			$(minus).unbind(_type, btnEvt).unbind("click", btnEvt);
			break;
		}
	}
	//================================================================================
	this.setEnabled = function(_targ)
	{
		var _type = BrowserDetect.any() ? "touchstart" : "mousedown";
		switch(_targ)
		{
			case "increase":
			$(plus).css(
			{
				"opacity" : 1,
				"cursor":"pointer"
			});
			$(plus).unbind(_type, btnEvt).bind(_type, btnEvt).unbind("click", btnEvt).bind("click", btnEvt);
			break;
			case "reset":
			$(reset).css(
			{
				"opacity" : 1,
				"cursor":"pointer"
			});
			$(reset).unbind(_type, btnEvt).bind(_type, btnEvt).unbind("click", btnEvt).bind("click", btnEvt);
			break;
			case "decrease":
			$(minus).css(
			{
				"opacity" : 1,
				"cursor":"pointer"
			});
			$(minus).unbind(_type, btnEvt).bind(_type, btnEvt).unbind("click", btnEvt).bind("click", btnEvt);
			break;
		}
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function createDisplay()
	{
		subm = document.createElement("canvas");
		subm.width = 25;
		subm.height = 25;
		subm.xPos = -108;
		subm.name = "subm";
		p.target.append(subm);
		$(subm).css(
		{
			"position":"absolute",
			"right": "0px",
			"bottom": "0px",
			"width": globalResizeCalc(25)+"px",
			"height": globalResizeCalc(25)+"px",
			"background":"rgba(255,255,255,0.5)",
			"box-shadow": "0px 0px 5px rgba(0,0,0,0.5)",
			"cursor":"pointer",
		});
		p.title ? p.title.subm ? $(subm).attr("p_title", GCTConv(p.title.subm)) :$(subm).attr("p_title", setToolTipTxt('subm')) : $(subm).attr("p_title", setToolTipTxt('subm'));
		
		
		subm.width = subm.width;
		switch(p.subMenu[p.subMenu.length-1])
		{
			case "xy":
				subm.getContext("2d").drawImage(advConImg, -108, 0);
				panType = "panxy";
				break;
			case "x":
				subm.xPos = -143;
				subm.getContext("2d").drawImage(advConImg, -143, 0);
				panType = "panx";
				break;
			case "y":
				subm.xPos = -179;
				subm.getContext("2d").drawImage(advConImg, -179, 0);
				panType = "pany";
				break;
		}
		p.subMenuHide ? $(subm).hide() : null;
		//---------------------
		//---------------------
		//---------------------
		var _holder = document.createElement("div");
		p.target.append(_holder);
		$(_holder).css(
		{
			"position":"absolute",
			"right": "0px",
			"bottom": globalResizeCalc(30)+"px",
			"background":p.holderBG,
			"box-shadow": "0px 0px 5px rgba(0,0,0,0.5)"
		});
		//---------------------
		plus = document.createElement("canvas");
		plus.width = 25;
		plus.height = 25;
		plus.xPos = 0;
		plus.name = "plus";
		$(_holder).append(plus);
		$(plus).css(
		{
			"width": globalResizeCalc(25)+"px",
			"height": globalResizeCalc(25)+"px",
			"background":"rgba(255,255,255,0.5)",
			"margin-bottom": globalResizeCalc(-5)+"px",
			"cursor":"pointer"
		});
		plus.getContext("2d").drawImage(advConImg, 0, 0);
		p.title ? p.title.increase ? $(plus).attr("p_title", GCTConv(p.title.increase)) :$(plus).attr("p_title", setToolTipTxt('increase')) : $(plus).attr("p_title", setToolTipTxt('increase'));
		//---------------------
		reset = document.createElement("canvas");
		reset.width = 25;
		reset.height = 25;
		reset.xPos = -36;
		reset.name = "reset";
		$(_holder).append(reset);
		$(reset).css(
		{
			"width": globalResizeCalc(25)+"px",
			"height": globalResizeCalc(25)+"px",
			"background":"rgba(255,255,255,0.5)",
			"margin-bottom": globalResizeCalc(-5)+"px",
			"cursor":"pointer"
		});
		reset.getContext("2d").drawImage(advConImg, -36, 0);
		p.title ? p.title.reset ? $(reset).attr("p_title", GCTConv(p.title.reset)) : $(reset).attr("p_title", setToolTipTxt('reset')) : $(reset).attr("p_title", setToolTipTxt('reset')) ;
		//---------------------
		minus = document.createElement("canvas");
		minus.width = 25;
		minus.height = 25;
		
		minus.name = "minus";
		$(_holder).append(minus);
		$(minus).css(
		{
			"width": globalResizeCalc(25)+"px",
			"height": globalResizeCalc(25)+"px",
			"background":"rgba(255,255,255,0.5)",
			"margin-bottom": globalResizeCalc(-5)+"px",
			"cursor":"pointer"
		});
		if(p.rotation == 90 || p.rotation == 270)
		{
			minus.getContext("2d").drawImage(advConImg, -257, 0);
			minus.xPos = -257;
		}
		else
		{
			minus.getContext("2d").drawImage(advConImg, -72, 0);
			minus.xPos = -72;
		}
		p.title ? p.title.decrease ? $(minus).attr("p_title", GCTConv(p.title.decrease)) :  $(minus).attr("p_title", setToolTipTxt('decrease')) : $(minus).attr("p_title", setToolTipTxt('decrease'));
		//---------------------
		//---------------------
		//---------------------
		submhold = document.createElement("div");
		p.target.append(submhold);
		$(submhold).css(
		{
			"position":"absolute",
			"right": "0px",
			"bottom": "0px",
			"display": "none"
		});
		//---------------------
		var _hold = document.createElement("div");
		$(submhold).append(_hold);
		
		$(_hold).css(
		{
			"position":"absolute",
			"right": globalResizeCalc(40)+"px",
			"bottom": "0px",
			"width":(p.subMenu.length*Math.round(globalResizeCalc(25)))+"px",
			"height": globalResizeCalc(25)+"px",
			"background":"rgba(255,255,255,0.5)",
			"box-shadow": "0px 0px 5px rgba(0,0,0,0.5)"
		});
		//---------------------
		if(p.subMenu.indexOf("x") != -1)
		{
			panx = document.createElement("canvas");
			panx.width = 25;
			panx.height = 25;
			panx.xPos = -143;
			panx.name = "panx";
			$(panx).css(
			{
				"width": Math.round(globalResizeCalc(25))+"px",
				"height": Math.round(globalResizeCalc(25))+"px",
				"background":"rgba(255,255,255,0.5)",
				"margin-bottom": globalResizeCalc(-5)+"px",
				"display": "inline-block",
				"cursor":"pointer"
			});
			p.title ? p.title.panx ? $(panx).attr("p_title", GCTConv(p.title.panx)) :$(panx).attr("p_title", setToolTipTxt('panx')) : $(panx).attr("p_title", setToolTipTxt('panx'));
			panx.getContext("2d").drawImage(advConImg, -143, 0);
		}
		//---------------------
		if(p.subMenu.indexOf("y") != -1)
		{
			pany = document.createElement("canvas");
			pany.width = 25;
			pany.height = 25;
			pany.xPos = -179;
			pany.name = "pany";
			$(pany).css(
			{
				"width": Math.round(globalResizeCalc(25))+"px",
				"height": Math.round(globalResizeCalc(25))+"px",
				"background":"rgba(255,255,255,0.5)",
				"margin-bottom": globalResizeCalc(-5)+"px",
				"display": "inline-block",
				"cursor":"pointer"
			});
			p.title ? p.title.pany ? $(pany).attr("p_title", GCTConv(p.title.pany)) :$(pany).attr("p_title", setToolTipTxt('pany')) : $(pany).attr("p_title", setToolTipTxt('pany'));
			pany.getContext("2d").drawImage(advConImg, -179, 0);
		}
		//---------------------
		if(p.subMenu.indexOf("xy") != -1)
		{
			panxy = document.createElement("canvas");
			panxy.width = 25;
			panxy.height = 25;
			panxy.xPos = -108;
			panxy.name = "panxy";
			$(panxy).css(
			{
				"width": Math.round(globalResizeCalc(25))+"px",
				"height": Math.round(globalResizeCalc(25))+"px",
				"background":"rgba(255,255,255,0.5)",
				"margin-bottom": globalResizeCalc(-5)+"px",
				"display": "inline-block",
				"cursor":"pointer"
			});
			p.title ? p.title.panxy ? $(panxy).attr("p_title", GCTConv(p.title.panxy)) :$(panxy).attr("p_title", setToolTipTxt('panxy')) : $(panxy).attr("p_title", setToolTipTxt('panxy'));
			panxy.getContext("2d").drawImage(advConImg, -108, 0);
		}
		for(var i = 0; i < p.subMenu.length; i++)
		{
			switch(p.subMenu[i])
			{
				case "x":
					$(_hold).append(panx);
					break;
				case "y":
					$(_hold).append(pany);
					break;
				case "xy":
					$(_hold).append(panxy);
					break;
			}
		}
		//---------------------
		//---------------------
		//---------------------
		arrow = document.createElement("canvas");
		arrow.width = 12;
		arrow.height = 25;
		$(submhold).append(arrow);
		$(arrow).css(
		{
			"position":"absolute",
			"right": globalResizeCalc(25)+"px",
			"bottom": "0px",
			"width": globalResizeCalc(12)+"px",
			"height": globalResizeCalc(25)+"px"
		});
		arrow.getContext("2d").drawImage(advConImg, -229, -2);
		//---------------------
		//---------------------
		//---------------------
		if(BrowserDetect.any())
		{
			$(subm).unbind("touchstart", btnEvt).bind("touchstart", btnEvt);
			$(plus).unbind("touchstart", btnEvt).bind("touchstart", btnEvt);
			$(reset).unbind("touchstart", btnEvt).bind("touchstart", btnEvt);
			$(minus).unbind("touchstart", btnEvt).bind("touchstart", btnEvt);
			$(panx).unbind("touchstart", btnEvt).bind("touchstart", btnEvt);
			$(pany).unbind("touchstart", btnEvt).bind("touchstart", btnEvt);
			$(panxy).unbind("touchstart", btnEvt).bind("touchstart", btnEvt);
			
			$(subm).unbind("touchend", btnEvt).bind("touchend", btnEvt);
			$(plus).unbind("touchend", btnEvt).bind("touchend", btnEvt);
			$(reset).unbind("touchend", btnEvt).bind("touchend", btnEvt);
			$(minus).unbind("touchend", btnEvt).bind("touchend", btnEvt);
			$(panx).unbind("touchend", btnEvt).bind("touchend", btnEvt);
			$(pany).unbind("touchend", btnEvt).bind("touchend", btnEvt);
			$(panxy).unbind("touchend", btnEvt).bind("touchend", btnEvt);
		}
		else
		{
			$(subm).unbind("mousedown", btnEvt).bind("mousedown", btnEvt);
			$(plus).unbind("mousedown", btnEvt).bind("mousedown", btnEvt);
			$(reset).unbind("mousedown", btnEvt).bind("mousedown", btnEvt);
			$(minus).unbind("mousedown", btnEvt).bind("mousedown", btnEvt);
			$(panx).unbind("mousedown", btnEvt).bind("mousedown", btnEvt);
			$(pany).unbind("mousedown", btnEvt).bind("mousedown", btnEvt);
			$(panxy).unbind("mousedown", btnEvt).bind("mousedown", btnEvt);
			$(subm).unbind("click", btnEvt).bind("click", btnEvt);
			$(plus).unbind("click", btnEvt).bind("click", btnEvt);
			$(reset).unbind("click", btnEvt).bind("click", btnEvt);
			$(minus).unbind("click", btnEvt).bind("click", btnEvt);
			$(panx).unbind("click", btnEvt).bind("click", btnEvt);
			$(pany).unbind("click", btnEvt).bind("click", btnEvt);
			$(panxy).unbind("click", btnEvt).bind("click", btnEvt);
		}
		//--------------------------------------
		switch(p.subMenu[p.subMenu.length-1])
		{
			case "x":
				showOver(panx, true);
				break;
			case "y":
				showOver(pany, true);
				break;
			case "xy":
				showOver(panxy, true);
				break;
		}
		//--------------------------------------
		
		if(p.restrict != "")
		{
			$(subm).unbind("touchstart", btnEvt);
			$(subm).unbind("touchend", btnEvt);
			$(subm).unbind("mousedown", btnEvt);
			$(subm).unbind("click", btnEvt);
			$(subm).css(
			{
				"background":"none",
				"box-shadow":"none",
				"cursor":"default"
			});
			if(p.restrict == "x")
			{
				subm.width = subm.width;
				subm.getContext("2d").drawImage(advConImg, -143, 0);
			}
			else if(p.restrict == "y")
			{
				subm.width = subm.width;
				subm.getContext("2d").drawImage(advConImg, -179, 0);
			}
			$(subm).removeAttr("p_title");
		}
		
	}
	//================================================================================
	function btnEvt(e)
	{
		if(e.type == "mousedown" || e.type == "touchstart")
		{
			focusOutInput();
			audioPlayerObj.playAudio("down");
			e.type == "mousedown" ? $(window).unbind("mouseup", btnEvt).bind("mouseup", btnEvt) : null;
			curElem = this;
			showOver(curElem, true);
		}
		else if(e.type == "mouseup" || e.type == "touchend")
		{
			audioPlayerObj.playAudio("up");
			e.type == "mouseup" ? $(window).unbind("mouseup", btnEvt) : null;
			showOver(curElem, false);
		}
		if(e.type == "click" || e.type == "touchend")
		{
			e.id = p.id;
			e.panType = panType;
			switch(this.name)
			{
				case "subm":
					showSubMenu();
				break;
				case "panx":
				case "pany":
				case "panxy":
					panType = this.name;
					
					if(p.subMenu.indexOf("x") != -1)
						showOver(panx, false);
					if(p.subMenu.indexOf("y") != -1)
						showOver(pany, false);
					if(p.subMenu.indexOf("xy") != -1)
						showOver(panxy, false);
					
					showOver(this, true);
					
					subm.xPos = this.xPos;
					subm.width = subm.width;
					subm.getContext("2d").drawImage(advConImg, subm.xPos, 0);
					showSubMenu(false);
					
					e.panType = panType;
					e.btnType = "selectionchanged";
					p.onevent ? p.onevent(e) : null;
				break;
				case "plus":
					e.btnType = "increase";
					p.onevent ? p.onevent(e) : null;
				break;
				case "reset":
					e.btnType = "reset";
					p.onevent ? p.onevent(e) : null;
				break;
				case "minus":
					e.btnType = "decrease";
					p.onevent ? p.onevent(e) : null;
				break;
			}
		}
		e.preventDefault();
	}
	//================================================================================
	function showOver(_elem, _bool)
	{
		_elem.width = _elem.width;
		if(_bool)
		{
			_elem.getContext("2d").drawImage(advConImg, _elem.xPos, -41);
			$(_elem).css("background", "#666666");
		}
		else
		{
			_elem.getContext("2d").drawImage(advConImg, _elem.xPos, 0);
			$(_elem).css("background", "rgba(255,255,255,0.5)");
		}
	}
	//================================================================================
	function showSubMenu(_bool)
	{
		if(typeof(_bool) == "undefined")
		{
			$(submhold).toggle();
		}
		else if(_bool)
		{
			$(submhold).show();
		}
		else
		{
			$(submhold).hide();
		}
	}
	//================================================================================
	function setToolTipTxt(_btn)
	{
		return GetGlobalTooltip("tooltip", _btn);
	}
}
//================================================================================
//================================================================================
// NORMAL BUTTON COMPONENT
var ButtonComp = function()
{
	// Default starts ...
	var p = 
	{
		//target:"",
		id:"",
		x:0,
		y:0,
		width:192,
		height:46,
		fontSize:"1em",
		orientation:"horizontal",
		border:false,
		bgColor:"#F2F2F2",
		label:"LABEL",
		visibility:true,
		selected:false,
		paddingTop:0,
		//click:""
		//srcUp:""
		//srcDown:""
	}
	// Default ends ...
	var _thisObj = this;
	var inDiv, innerDiv;
	var isClicked = false;
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		p.x = Math.round(globalResizeCalc(p.x));
		p.y = Math.round(globalResizeCalc(p.y));
		p.width = Math.round(globalResizeCalc(p.width));
		p.height = Math.round(globalResizeCalc(p.height));
		p.paddingTop = Math.round(globalResizeCalc(p.paddingTop));
		//---------
		var _tDiv = document.createElement("div");
		if(p.target)
		{
			p.target.append(_tDiv);
		}
		else
		{
			$("body").append(_tDiv);
		}
		p.target = $(_tDiv);
		p.visible == false ? p.target.css("display", "none") : null;
		p.index ? p.target.css("z-index", p.index) : null;
		//---------
		p.target.css(
		{
			"position":"absolute",
			"left": p.x+"px",
			"top": p.y+"px",
			"width": p.width+"px",
			"height": p.height+"px",
			"text-align":"center",
			"cursor": "pointer",
		});
		
		p.target.attr("p_title", p.title ? GCTConv(p.title) : GetGlobalTooltip("tooltip", "genricClick"));
		//---------
		var _wid = p.width//p.target.css("width");
		var _hgt = p.height//p.target.css("height");
		//---------
		inDiv = document.createElement("div");
		p.target.append(inDiv);
		$(inDiv).css(
		{
			"width":_wid,
			"height":_hgt,
			"position":"absolute",
			"overflow":"hidden"
		});
		//---------
		innerDiv = document.createElement("div");
		$(inDiv).append(innerDiv);
		$(innerDiv).css(
		{
			"width":_wid,
			"height":_hgt,
			"display":"table-cell",
			"font-size":p.fontSize,
			"padding-top":p.paddingTop+"px",
			"font-weight":"bold",
			"vertical-align":"middle",
			"color":"#333333",
			/*"background": "rgba(255, 255,255,0.6)"*/
		}).html(p.label);
		//
		if(p.srcUp)
			{
				$(innerDiv).css({"background": "url("+gizmoImageObj[p.srcUp].src+") no-repeat"});
				$(innerDiv).css({"background-size": _wid+"px "+_hgt+"px"});
			}
		else
			{
				p.target.css({"background": p.bgColor});
			}
		//
		p.title ? $(innerDiv).attr("p_title", p.title ? GCTConv(p.title) : GetGlobalTooltip("tooltip", "genricClick")) : null;
		//---------
		var _bPix = globalResizeCalc(2) < 2 ? 2 : globalResizeCalc(2);
		//---------
		
		_thisObj.enable();
		
		if(p.border)
		{
			p.target.css("box-shadow" , "0px 0px 0px "+globalResizeCalc(3)+"px rgba(255, 255, 255, 0.6) , 0px 0px 0px "+globalResizeCalc(8)+"px rgba(0,0,0,0.2), "+_bPix+"px "+_bPix+"px 0px 0px #000000, -"+_bPix+"px -"+_bPix+"px 0px 0px #FFFFFF");
		}
		else
		{
			if(!p.srcUp)
			{
				p.target.css("box-shadow" , ""+_bPix+"px "+_bPix+"px 0px 0px #000000, -"+_bPix+"px -"+_bPix+"px 0px 0px #FFFFFF");
			}
		}
		makeOverState(false);
	}
	//================================================================================
	this.addEventListener = function(_evt, _fun)
	{
		p[_evt] = _fun;
	}
	//================================================================================
	this.setState = function(_stat)
	{
		if(_stat)
		{
			_thisObj.enable();
		}
		else
		{
			_thisObj.disable();
		}
	}
	//================================================================================
	this.showBtn = function(bool)
	{
		if(bool)
		{
			_thisObj.show();
		}
		else
		{
			_thisObj.hide();
		}
	}
	//================================================================================
	this.setSelected = function(_bool)
	{
		makeOverState(_bool);
	}
	//================================================================================
	this.show = function()
	{
		p.target.show();
	}
	//================================================================================
	this.setLabel = function (_str)
	{
		p.label = _str
		$(innerDiv).html(p.label);
	}
	//================================================================================
	this.hide = function()
	{
		p.target.hide();
	}
	//================================================================================
	this.enable = function()
	{
		if(BrowserDetect.any())
		{
			p.target.off('touchstart', btnEvt).off("touchend", btnEvt).on('touchstart', btnEvt).on("touchend", btnEvt);
		}
		else
		{
			p.target.off('mousedown', btnEvt).off("click", btnEvt).on('mousedown', btnEvt).on("click", btnEvt);
		
			if(p.highLightColor)
				p.target.off('mouseover', onOver).off("mouseout", onOut).on('mouseover', onOver).on("mouseout", onOut);
		}
		p.target.css(
		{
			"opacity":1,
			"cursor":"pointer"
		});
	}
	//================================================================================
	this.disable = function()
	{
		if(BrowserDetect.any())
		{
			p.target.off('touchstart', btnEvt).off("touchend", btnEvt);
		}
		else
		{
			p.target.off('mousedown', btnEvt).off("click", btnEvt);
			
			if(p.highLightColor)
				p.target.off('mouseover', onOver).off("mouseout", onOut);
		}
		p.target.css(
		{
			"opacity":0.5,
			"cursor":"default"
		});
		if(p.highLightColor)
			$(innerDiv).css("color","#333333");
	}
	//================================================================================
	this.updateTop = function(_top)
	{
		p.target.css(
		{
			"top":_top,
		});
	}
	//================================================================================
	this.updateIndex = function(_index)
	{
		p.target.css(
		{
			"z-index":_index,
		});
	}
	this.setOpacity = function(_val){
		p.target.css(
		{
			"opacity":_val,
		});
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function onOver(e)
	{
		$(innerDiv).css("color",p.highLightColor);
	}
	function onOut(e)
	{
		$(innerDiv).css("color","#333333");
	}
	function btnEvt(e)
	{
		var _bPix = globalResizeCalc(1) < 1 ? 1 : globalResizeCalc(1);
		if(e.type == "mousedown")
		{
			$(window).off("mouseup mouseleave", onWindowUp).on("mouseup mouseleave", onWindowUp);
			
		}
		//-----------------------------
		if(e.type == "mousedown" || e.type == "touchstart")
		{
			isClicked = true;
			focusOutInput();
			audioPlayerObj.playAudio("down");
			btnName = $(this);
			
			e.id = p.id;
			e.btnType = btnName.data("type");
			p.mousedown ? p.mousedown(e) : null;
			
			makeOverState(true);
			
			if(BrowserDetect.any()) // added only for Devices as it was creating issue in keyboard event.
				e.preventDefault();
		}
		//-----------------------------
		if(e.type == "click" || e.type == "touchend")
		{
			if(isClicked)
			{
				audioPlayerObj.playAudio("up");
				//--------
				e.id = p.id;
				e.btnType = btnName.data("type");
				p.click ? p.click(e) : null;
			}
			isClicked = false;
			onWindowUp(e);
		}
	}
	//================================================================================
	function onWindowUp(e)
	{
		if(e.type == "mouseleave")
		{
			if(isClicked)
			{
				audioPlayerObj.playAudio("up");
				e.id = p.id;
				e.btnType = btnName.data("type");
				p.click ? p.click(e) : null;
			}
			isClicked = false;
		}
		if(!p.selected)
		{
			makeOverState(false);
		}
		$(window).off("mouseup mouseleave", onWindowUp);
		//focusOutInput();
	}
	//================================================================================
	function makeOverState(_bool)
	{
		var _bPix = globalResizeCalc(1) < 1 ? 1 : globalResizeCalc(1);
		if(_bool)
		{
			if(p.srcDown)
			{
				$(innerDiv).css({"background": "url("+gizmoImageObj[p.srcDown].src+") no-repeat"});
				$(innerDiv).css({"background-size": p.width+"px "+p.height+"px"});
			}
			else	// behave normally
			{
				$(innerDiv).css(
				{
					"background": "#666666",
					"color":"#FFFFFF",
				});
			
				if(p.border)
				{
					p.target.css("box-shadow" , "0px 0px 0px "+globalResizeCalc(3)+"px rgba(255, 255, 255, 0.6) , 0px 0px 0px "+globalResizeCalc(8)+"px rgba(0,0,0,0.2), "+_bPix+"px "+_bPix+"px 0px 0px #545454, -"+_bPix+"px -"+_bPix+"px 0px 0px #545454");
				}
				else
				{
					if(!p.srcDown)
					{
						p.target.css("box-shadow" , _bPix+"px "+_bPix+"px 0px 0px #545454, -"+_bPix+"px -"+_bPix+"px 0px 0px #545454");
					}
				}
			}
		}
		else
		{
			///p.target.removeClass("ButtonCompCssDown");
			if(p.srcUp)
			{
				$(innerDiv).css({"background": "url("+gizmoImageObj[p.srcUp].src+") no-repeat"});
				$(innerDiv).css({"background-size": p.width+"px "+p.height+"px"});
			}
			else
			{
				$(innerDiv).css(
				{
					"background": p.bgColor,
					"color":"#333333",
				});
			}
			if(p.border)
			{
				p.target.css("box-shadow" , "0px 0px 0px "+globalResizeCalc(3)+"px rgba(255, 255, 255, 0.6) , 0px 0px 0px "+globalResizeCalc(8)+"px rgba(0,0,0,0.2), "+_bPix+"px "+_bPix+"px 0px "+_bPix+"px #999999, -"+_bPix+"px -"+_bPix+"px 0px "+_bPix+"px #FFFFFF");
			}
			else
			{
				//p.target.css("box-shadow" , ""+_bPix+"px "+_bPix+"px 0px 0px #999999, -"+_bPix+"px -"+_bPix+"px 0px 0px #FFFFFF");
				if(!p.srcUp)
				{
					p.target.css("box-shadow" , ""+_bPix+"px "+_bPix+"px 0px "+_bPix+"px #999999, -"+_bPix+"px -"+_bPix+"px 0px "+_bPix+"px #FFFFFF");
				}
			}
		}
	}
}
//================================================================================
//================================================================================
// TOOL COMPONENT
var ToolComp = function()
{
	// Default starts ...
	var p = 
	{
		//target:"",
		id:"",
		top:true,
		left:true,
		//click:"",
		subMenuList:["camera","arrow","help","sound"],
		is3d: false,
	}
	// Default ends ...
	var _thisObj = this;
	var toolBorderWid = globalResizeCalc(7);
	var toolHead, toolArrow, camera, arrows, tooltip, sound, headLogo, helpImg, onlyText, _holderDiv;
	var logoArray = [[-20,-316], [-133,-316], [-203,-316], [-266,-316], [-336,-316]];
	var logoArrayIndex = 1;
	var toolShowing = false;
	var hidePos, showPos;
	var soundToggle = true;
	//var hiddenPos = parseInt($(".wrapper").css("height")) - 36;
	var hiddenPos = $(window).height() - globalResizeCalc(36);
	var helpMoved, lastHelpPos;
	//-----------------------
	var toolImage = new Image();
	toolImage.onload = onImgLoaded;
	//-----------------------
	var msgBox;
	//-----------------------
	var arrowsArray = new Array();
	var curArrow, lastMousePoint;
	var arrowColor = [{x:-286,y:-3}, {x:-286,y:-72}, {x:-286,y:-142}, {x:-286,y:-211}];
	var arrowColorIndex = 0;
	var arrowLastPage, arrowMoved, lastArrowPos;
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		//---------
		var _tDiv = document.createElement("div");
		if(p.target)
		{
			p.target.append(_tDiv);
		}
		else
		{
			$("body").append(_tDiv);
		}
		p.target = $(_tDiv);
		p.visible == false ? p.target.css("display", "none") : null;
		p.index ? p.target.css("z-index", p.index) : null;
		p.title ? p.target.attr("p_title", GCTConv(p.title)) : null;
		//-----------------------
		p.target.css(
		{
			"position": "fixed",
			"width": globalResizeCalc(140)+"px",
			"background": "#666666",
			"text-align":"center",
			"color": "#FFFFFF",
			"font-size": "0.9em",
			"z-index": 100
		});
		//-----------------------
		toolImage.src = "../com/images/tools.png";
		//-----------------------
		msgBox = new MsgBoxComp();
		msgBox.init();
	}
	//================================================================================
	this.openClose = function(_bool, _callback)
	{
		toolArrow.width = toolArrow.width;
		if(_bool)
		{
			if(!p.top)
			{
				p.target.animate({"top":$(window).height() - p.target.outerHeight()}, 200, function(){_callback ? _callback() : null;});
			}
			else
			{
				p.target.animate({"bottom":$(window).height() - p.target.outerHeight()}, 200, function(){_callback ? _callback() : null;});
			}
			p.top ? toolArrow.getContext("2d").drawImage(toolImage, -18,-383) : toolArrow.getContext("2d").drawImage(toolImage, -48,-383);
			if(BrowserDetect.any())
			{
				$(document).unbind("touchstart", toolCloseOnWinUp).bind("touchstart", toolCloseOnWinUp);
			}
			else
			{
				$(document).unbind("mousedown", toolCloseOnWinUp).bind("mousedown", toolCloseOnWinUp);
			}
			
		}
		else
		{
			if(!p.top)
			{
				p.target.animate({"top":hiddenPos}, 200, function(){_callback ? _callback() : null;});
			}
			else
			{
				p.target.animate({"bottom":hiddenPos}, 200, function(){_callback ? _callback() : null;});
			}
			p.top ? toolArrow.getContext("2d").drawImage(toolImage, -48,-383) : toolArrow.getContext("2d").drawImage(toolImage, -18,-383);
			$(document).unbind("mousedown", toolCloseOnWinUp);
			$(document).unbind("touchstart", toolCloseOnWinUp);
		}
		toolShowing = _bool;
	}
	//================================================================================
	this.addEventListener = function(_evt, _fun)
	{
		p[_evt] = _fun;
	}
	//================================================================================
	this.show = function()
	{
		p.target.show();
	}
	//================================================================================
	this.hide = function()
	{
		p.target.hide();
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function clickCameraEvt(e)
	{
		if(e.type == "mouseup" || e.type == "touchend")
		{
			if(!BrowserDetect.ie9())
				audioPlayerObj.playAudio("camera");
		}
	}
	//================================================================================
	function clickEvt(e, val)
	{
		if(e.type == "mousedown" || e.type == "touchstart")
		{
			focusOutInput();
			audioPlayerObj.playAudio("down");
			if(e.type == "mousedown")
			{
				$(window).unbind("mouseup", clickEvt).bind("mouseup", clickEvt);
			}
		}
		else if(e.type == "click")
		{
			//--------
			$.event.trigger({type: "ToolBoxClicked", toolBtn:val});
			switch(val)
			{
				case "toolHead":
					if(toolShowing)
					{
						_thisObj.openClose(false);
					}
					else
					{
						_thisObj.openClose(true);
					}
				break;
				case "sound":
					sound.width = sound.width;
					if(soundToggle)
					{
						sound.getContext("2d").drawImage(toolImage, -133,-239);
					}
					else
					{
						sound.getContext("2d").drawImage(toolImage, -22,-239);
					}
					soundToggle = !soundToggle;
					if(p.soundToggleEvnt)
						p.soundToggleEvnt({isEnable:soundToggle})
					audioPlayerObj.enable(soundToggle);
					audioPlayerObj.playAudio("up");
				break;
				case "arrows":
					$(".pointerBox").css("right","0px");
					$(".toolLogo").css(
					{
						"background-position":"-1px -419px",
					});
				break;
				case "camera":
					if(p.is3d) {
						p.onCameraClick3d ? p.onCameraClick3d() : null;
					}
					_thisObj.openClose(false, function(){
						exportToApiObj.exportImage();
					});
					
				break;
				case "help":
					//$(helpIcon).show();
				break;
				default:
					e.instance = val;
					p.click ? p.click(e) : null;
				break;
			}
		}
		else if(e.type == "mouseup" || e.type == "touchend")
		{
			audioPlayerObj.playAudio("up");
			if(e.type == "mouseup")
			{
				$(window).unbind("mouseup", clickEvt);
			}
		}
	}
	//================================================================================
	function showTitleonMouse(e)
	{
		if(e.type == "touchstart" || e.type == "touchmove")
		{
			e.pageX = e.originalEvent.touches[0].pageX;
			e.pageY = e.originalEvent.touches[0].pageY;
		}
		
		if(e.type == "mousedown" || e.type == "touchstart")
		{
			ToolComp.ISACTIVE = true;
			helpMoved = false;
			lastHelpPos = {x:e.pageX, y:e.pageY};
			//-----------------------
			$(window).unbind("mousemove", showTitleonMouse).bind("mousemove", showTitleonMouse);
			$(window).unbind("mouseup", showTitleonMouse).bind("mouseup", showTitleonMouse);
		}
		else if(e.type == "mousemove" || e.type == "touchmove")
		{
			if(!helpMoved && (lastHelpPos.x != e.pageX || lastHelpPos.y != e.pageY))
			{
				_thisObj.openClose(false);
				helpMoved = true;
			}
			if(helpMoved)
			{
				$(helpIcon).css("opacity", 1).show();
				var elementMouseIsOver = document.elementFromPoint(e.pageX, e.pageY);
				//console.clear();
				//console.log(elementMouseIsOver);
				//---------
				$.event.trigger({
					type: "commonToolTipActiveAndMoving",
					pageX: e.pageX,
					pageY: e.pageY
				});
				//---------
				
				var _txt = $(elementMouseIsOver).attr("p_title");
				if(!_txt)
				{
					if($(elementMouseIsOver).is("i") || $(elementMouseIsOver).is("b")  || $(elementMouseIsOver).is("p"))
						_txt = $(elementMouseIsOver).parent().attr("p_title");
				}
				if(_txt)
				{
					$(onlyText).html(_txt);
					$(onlyText).children(".localMJ_i").css("font-size", "1.15em");
					/*if(String(_txt).indexOf("\\begin{equation}") != -1)
					{
						console.log("onlyText");
						$(onlyText).css("opacity", 0);
						MathJax.Hub.Queue(["Typeset",MathJax.Hub, "onlyText_"+p.id], function()
						{
							$(onlyText).css("opacity", 1);
						});
					}*/
				}
				else
				{
					$(onlyText).html("<b>?</b>");
				}
				$(helpTextDiv).css("left", (-1 * ($(helpTextDiv).outerWidth(true) / 2))+"px");
				//-----------------------------------
				var arrowSpc = globalResizeCalc(10);
				helpImg.width = $(helpTextDiv).outerWidth(true);
				helpImg.height = $(helpTextDiv).outerHeight(true) + arrowSpc;
				$(helpImg).css(
				{
					"width":helpImg.width,
					"height":helpImg.height
				});
				var _wid = helpImg.width - globalResizeCalc(2);
				var _hgt = helpImg.height - globalResizeCalc(2);
				var _cuGap = globalResizeCalc(5);
				var _pad = globalResizeCalc(1);
				var _ctx = helpImg.getContext("2d");
				_ctx.beginPath();
				_ctx.fillStyle = "#9BD1FF";
				_ctx.strokeStyle = "#23537E";
				_ctx.lineWidth = globalResizeCalc(2);
				//------------
				if(e.pageY <= 70 || e.pageX - ($(helpTextDiv).outerWidth(true) / 2) < 5 || e.pageX + ($(helpTextDiv).outerWidth(true) / 2) + 5 > globalResizeCalc(1024))
				{
					if(e.pageX <= ($(window).width()/2))
					{
						$(helpIcon).css(
						{
							"left": (e.pageX + ($(helpTextDiv).outerWidth(true) / 2) + globalResizeCalc(60))+"px",
							"top": (e.pageY - globalResizeCalc(15))+"px"
						});
						$(helpImg).css(
						{
							"left": $(helpTextDiv).css("left"),
							"top":"0px"
						});
						_ctx.moveTo(_cuGap + arrowSpc, _pad);
						_ctx.lineTo(_wid - _cuGap - arrowSpc, _pad);
						_ctx.quadraticCurveTo(_wid - arrowSpc, _pad, _wid - arrowSpc, _cuGap);
						_ctx.lineTo(_wid - arrowSpc, $(helpTextDiv).outerHeight(true) - _cuGap);
						_ctx.quadraticCurveTo(_wid - arrowSpc, $(helpTextDiv).outerHeight(true), _wid - _cuGap - arrowSpc, $(helpTextDiv).outerHeight(true));
						_ctx.lineTo(_cuGap + arrowSpc, $(helpTextDiv).outerHeight(true));
						_ctx.quadraticCurveTo(_pad + arrowSpc, $(helpTextDiv).outerHeight(true), _pad + arrowSpc, $(helpTextDiv).outerHeight(true) - _cuGap);
						
						_ctx.lineTo(_pad + arrowSpc, ($(helpTextDiv).outerHeight(true) / 2) + globalResizeCalc(5));
						_ctx.lineTo(_pad, ($(helpTextDiv).outerHeight(true) / 2));
						_ctx.lineTo(_pad + arrowSpc, ($(helpTextDiv).outerHeight(true) / 2) - globalResizeCalc(5));
						
						_ctx.lineTo(_pad + arrowSpc, _cuGap);
						_ctx.quadraticCurveTo(_pad + arrowSpc, _pad, _cuGap + arrowSpc, _pad);
					}
					else
					{
						$(helpIcon).css(
						{
							"left": (e.pageX - ($(helpTextDiv).outerWidth(true) / 2) - globalResizeCalc(60))+"px",
							"top": (e.pageY - globalResizeCalc(15))+"px"
						});
						$(helpImg).css(
						{
							"left": $(helpTextDiv).css("left"),
							"top":"0px"
						});
						_ctx.moveTo(_cuGap + arrowSpc, _pad);
						_ctx.lineTo(_wid - _cuGap - arrowSpc, _pad);
						_ctx.quadraticCurveTo(_wid - arrowSpc, _pad, _wid - arrowSpc, _cuGap);
						
						_ctx.lineTo(_wid - arrowSpc, ($(helpTextDiv).outerHeight(true) / 2) - globalResizeCalc(5));
						_ctx.lineTo(_wid, ($(helpTextDiv).outerHeight(true) / 2));
						_ctx.lineTo(_wid - arrowSpc, ($(helpTextDiv).outerHeight(true) / 2) + globalResizeCalc(5));
						
						_ctx.lineTo(_wid - arrowSpc, $(helpTextDiv).outerHeight(true) - _cuGap);
						_ctx.quadraticCurveTo(_wid - arrowSpc, $(helpTextDiv).outerHeight(true), _wid - _cuGap - arrowSpc, $(helpTextDiv).outerHeight(true));
						_ctx.lineTo(_cuGap + arrowSpc, $(helpTextDiv).outerHeight(true));
						_ctx.quadraticCurveTo(_pad + arrowSpc, $(helpTextDiv).outerHeight(true), _pad + arrowSpc, $(helpTextDiv).outerHeight(true) - _cuGap);
						_ctx.lineTo(_pad + arrowSpc, _cuGap);
						_ctx.quadraticCurveTo(_pad + arrowSpc, _pad, _cuGap + arrowSpc, _pad);
					}
				}
				else
				{
					$(helpIcon).css(
					{
						"left": e.pageX+"px",
						"top": (e.pageY + globalResizeCalc(-60))+"px",
					});
					$(helpImg).css(
					{
						"left": $(helpTextDiv).css("left"),
						"top":"0px"
					});
					
					_ctx.moveTo(_cuGap + arrowSpc, _pad);
					_ctx.lineTo(_wid - _cuGap - arrowSpc, _pad);
					_ctx.quadraticCurveTo(_wid - arrowSpc, _pad, _wid - arrowSpc, _cuGap);
					_ctx.lineTo(_wid - arrowSpc, $(helpTextDiv).outerHeight(true) - _cuGap);
					_ctx.quadraticCurveTo(_wid - arrowSpc, $(helpTextDiv).outerHeight(true), _wid - _cuGap - arrowSpc, $(helpTextDiv).outerHeight(true));
					_ctx.lineTo((_wid / 2) + globalResizeCalc(5), $(helpTextDiv).outerHeight(true));
					_ctx.lineTo((_wid / 2), helpImg.height - globalResizeCalc(2));
					_ctx.lineTo((_wid / 2) - globalResizeCalc(5), $(helpTextDiv).outerHeight(true));
					_ctx.lineTo(_cuGap + arrowSpc, $(helpTextDiv).outerHeight(true));
					_ctx.quadraticCurveTo(_pad + arrowSpc, $(helpTextDiv).outerHeight(true), _pad + arrowSpc, $(helpTextDiv).outerHeight(true) - _cuGap);
					_ctx.lineTo(_pad + arrowSpc, _cuGap);
					_ctx.quadraticCurveTo(_pad + arrowSpc, _pad, _cuGap + arrowSpc, _pad);
				}
				_ctx.fill();
				_ctx.stroke();
			}
		}
		else if(e.type == "mouseup" || e.type == "touchend")
		{
			ToolComp.ISACTIVE = false;
			$(window).unbind("mousemove", showTitleonMouse);
			$(window).unbind("mouseup", showTitleonMouse);
			//--------------------------------
			if(!helpMoved)
			{
				msgBox.showMsg(GetGlobalTooltip("alert", "help"));
			}
			$(helpIcon).animate({left:$(tooltip).offset().left - globalResizeCalc(5), top:$(tooltip).offset().top - globalResizeCalc(20), opacity:0}, 500, function(){$(this).hide();});
		}
		e.preventDefault();
	}
	//================================================================================
	function showArrowonMouse(e)
	{
		if(e.type == "touchstart" || e.type == "touchmove")
		{
			e.pageX = e.originalEvent.touches[0].pageX;
			e.pageY = e.originalEvent.touches[0].pageY;
		}
		
		if(e.type == "mousedown" || e.type == "touchstart")
		{
			ToolComp.ISACTIVE = true;
			arrowMoved = false;
			lastArrowPos = {x:e.pageX, y:e.pageY};
			//------------------
			curArrow = this;
			//--------------------------------
			$(window).unbind("mousemove", showArrowonMouse).bind("mousemove", showArrowonMouse);
			$(window).unbind("mouseup", showArrowonMouse).bind("mouseup", showArrowonMouse);
			arrowLastPage = {x:e.pageX, y:e.pageY};
			//--------------------------------
			audioPlayerObj.playAudio("down");
			$(curArrow).addClass("commongrabbing");
			//addPointerGrabbing(true); // commented as Gizmo getting hanged during arrow dragged. Since this function updates all the DOM childrens
		}
		else if(e.type == "mousemove" || e.type == "touchmove")
		{
			if(!arrowMoved && (lastArrowPos.x != e.pageX || lastArrowPos.y != e.pageY))
			{
				//--------------------------------
				headLogo.width = headLogo.width;
				headLogo.getContext("2d").drawImage(toolImage, logoArray[logoArrayIndex][0], logoArray[logoArrayIndex][1]);
				//--------------------------------
				if($(curArrow).attr("data-makeduplicate") == "true")
				{
					_thisObj.openClose(false);
					curArrow = document.createElement("canvas");
					$(".wrapper").append(curArrow);
					curArrow.width = 110;
					curArrow.height = 40;
					$(curArrow).css(
					{
						"position":"absolute",
						"left": "-100px",
						"top": "-100px",
						"width": globalResizeCalc(110)+"px",
						"height": globalResizeCalc(40)+"px",
						//"cursor": "pointer",
						"z-index": 100
					}).addClass("commongrab").attr("p_title", GetGlobalTooltip("tooltip", "arrow"));
					//-----------------------
					curArrow.getContext("2d").drawImage(toolImage, arrowColor[arrowColorIndex].x, arrowColor[arrowColorIndex].y);
					arrowColorIndex++;
					if(arrowColorIndex > 3)
					{
						arrowColorIndex = 0;
					}
					//-----------------------
					arrowsArray.push(curArrow);
					if(BrowserDetect.any())
					{
						$(curArrow).unbind("touchstart", showArrowonMouse).bind("touchstart", showArrowonMouse);
						$(curArrow).unbind("touchmove", showArrowonMouse).bind("touchmove", showArrowonMouse);
						$(curArrow).unbind("touchend", showArrowonMouse).bind("touchend", showArrowonMouse);
					}
					else
					{
						$(curArrow).unbind("mousedown", showArrowonMouse).bind("mousedown", showArrowonMouse);
						$(curArrow).unbind("dblclick", showArrowonMouse).bind("dblclick", showArrowonMouse);
					}
				}
				arrowMoved = true;
			}
			if(arrowMoved)
			{
				if(BrowserDetect.any())
				{
					e.pageY -= 35;
				}
				if(!lastMousePoint || Math.abs(e.pageX - lastMousePoint.x) > 5 ||Math.abs(e.pageY - lastMousePoint.y) > 5)
				{
					var angleInDegrees = 0;
					if(lastMousePoint)
					{
						var deltaX = e.pageX - lastMousePoint.x;
						var deltaY = e.pageY - lastMousePoint.y;
						angleInDegrees = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
						
						var tempangle = (Math.atan((e.pageY-lastMousePoint.y)/(e.pageX-lastMousePoint.x))*(180 / Math.PI));
						var snapangle = (Math.round(tempangle/10))*10;
						var temp = snapangle;
						var angle = 0;
						if(e.pageX == lastMousePoint.x && e.pageY > lastMousePoint.y )
						{
							angle = 90;
						}//going down straight
						else if(e.pageX > lastMousePoint.x)
						{
							angle = temp;
						}
						else if (e.pageX < lastMousePoint.x)
						{
							angle = temp + 180;
						}
						else if (e.pageX == lastMousePoint.x && e.pageY < lastMousePoint.y )
						{
							angle = 270;
						}
						
						//angle += 125;
						$(curArrow).css(
						{
							"left":(e.pageX - 55)+"px",
							"top":(e.pageY - 20)+"px",
							"transform": "rotate(" + angle + "deg)",
							"-webkit-transform": "rotate(" + angle + "deg)",
							"-moz-transform": "rotate(" + angle + "deg)",
							"-ms-transform": "rotate(" + angle + "deg)"
						});
						$(curArrow).addClass("commongrabbing");
						//addPointerGrabbing(true); // commented as Gizmo getting hanged during arrow dragged. Since this function updates all the DOM childrens
					}
					lastMousePoint = {x:e.pageX, y:e.pageY};
					isAct = true;
					
				}
				arrowLastPage = {x:e.pageX, y:e.pageY};
			}
		}
		else if(e.type == "mouseup" || e.type == "touchend")
		{
			ToolComp.ISACTIVE = false;
			addPointerGrabbing(false);
			e.pageX = arrowLastPage.x;
			e.pageY = arrowLastPage.y;
			//--------------------------------
			headLogo.width = headLogo.width;
			headLogo.getContext("2d").drawImage(toolImage, logoArray[0][0], logoArray[0][1]);
			var _flagToRemove = true;
			//--------------------------------
			if(!arrowMoved && $(curArrow).attr("data-makeduplicate") == "true")
			{
				_flagToRemove = false;
				msgBox.showMsg(GetGlobalTooltip("alert", "arrow"));
			}
			/*console.log(e.pageX+" >= "+$(headLogo).offset().left+" && "+($(headLogo).offset().left + $(headLogo).width()));
			console.log(e.pageY+" >= "+$(headLogo).offset().top+" && "+($(headLogo).offset().top + $(headLogo).height()));
			console.log("================================");*/
			
			if(	_flagToRemove &&
				((e.pageX >= $(headLogo).offset().left && e.pageX <= ($(headLogo).offset().left + $(headLogo).width()) && e.pageY >= $(headLogo).offset().top && e.pageY <= ($(headLogo).offset().top + $(headLogo).height()) ) ||
				(e.pageX >= $(p.target).offset().left && e.pageX <= ($(p.target).offset().left + $(p.target).width()) && e.pageY >= $(p.target).offset().top && e.pageY <= ($(p.target).offset().top + $(p.target).height())) ))
			{
				 $(curArrow).remove();
			}
			//--------------------------------
			audioPlayerObj.playAudio("up");
			//--------------------------------
			$(window).unbind("mousemove", showArrowonMouse);
			$(window).unbind("mouseup", showArrowonMouse);
		}
		else if(e.type == "dblclick")
		{
			$(curArrow).remove();
		}
		e.preventDefault();
	}
	//================================================================================
	function onImgLoaded()
	{
		toolHead = document.createElement("div");
		p.target.append(toolHead);
		$(toolHead).css(
		{
			"position":"absolute",
			"left":"0px",
			"width": "100%",
			"text-align":"left",
			"cursor": "pointer"
		});
		if(BrowserDetect.any())
		{
			$(toolHead).unbind("touchstart", clickEvt).bind("touchstart", clickEvt);
			$(toolHead).unbind("touchend", clickEvt).bind("touchend", clickEvt);
		}
		else
		{
			$(toolHead).unbind("mousedown", clickEvt).bind("mousedown", clickEvt);
		}
		$(toolHead).bind("click", function(e){clickEvt(e, "toolHead");});
		//-----------------------
		headLogo = document.createElement("canvas");
		$(toolHead).append(headLogo);
		headLogo.width = 52;
		headLogo.height = 52;
		$(headLogo).css(
		{
			"position": "absolute",
			"width": globalResizeCalc(52)+"px",
			"height": globalResizeCalc(52)+"px"
		});
		headLogo.getContext("2d").drawImage(toolImage, logoArray[0][0], logoArray[0][1]);
		//-----------------------
		_holderDiv = document.createElement("div");
		p.target.append(_holderDiv);
		$(_holderDiv).css(
		{
			//"margin": "50px 0px"
			"margin": p.top ? "40px 0px 60px 0px" : "60px 0px 40px 0px"
		});
		//-----------------------
		//-----------------------
		camera = document.createElement("canvas");
		//$(_holderDiv).append(camera);
		camera.width = 48;
		camera.height = 36;
		$(camera).css(
		{
			"width": globalResizeCalc(47)+"px",
			"height": globalResizeCalc(36)+"px",
			"display": "inline-block",
			"cursor": "pointer"
		});
		camera.getContext("2d").drawImage(toolImage, -22, 0);
		if(BrowserDetect.any())
		{
			$(camera).unbind("touchstart", clickEvt).bind("touchstart", clickCameraEvt);
			$(camera).unbind("touchend", clickEvt).bind("touchend", clickCameraEvt);
		}
		else
		{
			$(camera).unbind("mouseup", clickEvt).bind("mouseup", clickCameraEvt);
		}
		$(camera).bind("click", function(e){clickEvt(e, "camera");});
		//-----------------------
		//$(_holderDiv).append("<br>Screen shot<br>");
		arrows = document.createElement("canvas");
		//$(_holderDiv).append(arrows);
		arrows.width = 57;
		arrows.height = 40;
		$(arrows).css(
		{
			"width": globalResizeCalc(57)+"px",
			"height": globalResizeCalc(40)+"px",
			"display": "inline-block",
			//"margin-top": "25px"
		}).addClass("commongrab").attr("data-makeduplicate", "true");
		if(BrowserDetect.any())
		{
			$(arrows).unbind("touchstart", showArrowonMouse).bind("touchstart", showArrowonMouse);
			$(arrows).unbind("touchmove", showArrowonMouse).bind("touchmove", showArrowonMouse);
			$(arrows).unbind("touchend", showArrowonMouse).bind("touchend", showArrowonMouse);
		}
		else
		{
			$(arrows).unbind("mousedown", showArrowonMouse).bind("mousedown", showArrowonMouse);
		}
		//-----------------------
		//$(_holderDiv).append("<br>Arrows<br>");
		tooltip = document.createElement("canvas");
		//$(_holderDiv).append(tooltip);
		tooltip.width = 45;
		tooltip.height = 40;
		$(tooltip).css(
		{
			"width": globalResizeCalc(45)+"px",
			"height": globalResizeCalc(40)+"px",
			"display": "inline-block",
			"cursor": "pointer"
			//"margin-top": "25px",
		});
		tooltip.getContext("2d").drawImage(toolImage, -22,-155);
		if(BrowserDetect.any())
		{
			$(tooltip).unbind("touchstart", clickEvt).bind("touchstart", clickEvt);
			$(tooltip).unbind("touchend", clickEvt).bind("touchend", clickEvt);
		}
		else
		{
			$(tooltip).unbind("mousedown", clickEvt).bind("mousedown", clickEvt);
		}
		$(tooltip).bind("click", function(e){clickEvt(e, "help");});
		
		if(BrowserDetect.any())
		{
			$(tooltip).unbind("touchstart", showTitleonMouse).bind("touchstart", showTitleonMouse);
			$(tooltip).unbind("touchmove", showTitleonMouse).bind("touchmove", showTitleonMouse);
			$(tooltip).unbind("touchend", showTitleonMouse).bind("touchend", showTitleonMouse);
		}
		else
		{
			$(tooltip).unbind("mousedown", showTitleonMouse).bind("mousedown", showTitleonMouse);
		}
		//-----------------------
		//$(_holderDiv).append("<br>Help<br>");
		sound = document.createElement("canvas");
		//$(_holderDiv).append(sound);
		sound.width = 49;
		sound.height = 39;
		$(sound).css(
		{
			"width": globalResizeCalc(49)+"px",
			"height": globalResizeCalc(39)+"px",
			"display": "inline-block",
			"cursor": "pointer"
			//"margin-top": "25px",
		});
		sound.getContext("2d").drawImage(toolImage, -22,-239);
		if(BrowserDetect.any())
		{
			$(sound).unbind("touchstart", clickEvt).bind("touchstart", clickEvt);
			$(sound).unbind("touchend", clickEvt).bind("touchend", clickEvt);
		}
		else
		{
			$(sound).unbind("mousedown", clickEvt).bind("mousedown", clickEvt);
		}
		$(sound).bind("click", function(e){clickEvt(e, "sound");});
		//-----------------------
		//$(_holderDiv).append("<br>Sound");
		
		//-----------------------
		//-----------------------
		addToList()
		//-----------------------
		// ----------------------- Help icon
		helpIcon = document.createElement("div");
		$("body").append(helpIcon);
		$(helpIcon).css(
		{
			"position":"absolute",
			"display":"none",
			"z-index": 101
		}).attr("id", "helpIcon");
	
		helpTextDiv = document.createElement("div");
		$(helpIcon).append(helpTextDiv);
		$(helpTextDiv).css(
		{
			"position": "absolute",
			"top": "0px",
			"left": "0px",
			"min-width": "70px",
			"text-align":"center"
		}).attr("id", "helpTextDiv");
		
		helpImg = document.createElement("canvas");
		$(helpIcon).append(helpImg);
		$(helpImg).css(
		{
			"position": "absolute"
		}).attr("id", "helpImg");
		/*$(helpImg).css(
		{
			"position": "absolute",
			"top": globalResizeCalc(25)+"px",
			"left": globalResizeCalc(-5)+"px",
			"width": globalResizeCalc(10)+"px",
			"height": globalResizeCalc(10)+"px",
			"background": "#9BD1FF",
			"border-right": "2px solid #23537E",
			"border-bottom": "2px solid #23537E",
			"-webkit-transform": "rotate(45deg)",
			"transform": "rotate(45deg)",
			"-ms-transform": "rotate(45deg)",
		}).attr("id", "helpImg");*/
		
		onlyText = document.createElement("div");
		$(helpTextDiv).append(onlyText);
		$(onlyText).css(
		{
			"position": "relative",
			"padding": globalResizeCalc(10)+"px "+globalResizeCalc(20)+"px",
			"font-size": "0.6em",
			"font-weight": "bold",
			"color": "#000000",
			"white-space": "nowrap",
			"z-index": 1
		}).attr("id", "onlyText_"+p.id);
		//-----------------------
		//-----------------------
		//-----------------------
		
		//-----------------------
		//-----------------------
		var _borderRadius = Math.round(globalResizeCalc(15));
		//-----------------------
		if(p.left)
		{
			//-----------------------
			toolArrow = document.createElement("canvas");
			toolArrow.width = 16;
			toolArrow.height = 12;
			$(toolHead).append('<div style="display: inline-block; margin-left: '+globalResizeCalc(61)+'px;">Tools</div>');
			$(toolHead).append(toolArrow);
			$(toolArrow).css(
			{
				"display": "inline-block",
				"width":globalResizeCalc(16)+"px",
				"height":globalResizeCalc(12)+"px",
				"margin-left": globalResizeCalc(10)+"px"
			});
			//-----------------------
			//-----------------------
			if(p.top)
			{
				arrows.getContext("2d").drawImage(toolImage, -197,-74);
				logoArrayIndex = 4;
				p.target.css(
				{
					"bottom":hiddenPos+"px",
					"left":"0px",
					"box-shadow": "2px 2px 4px rgba(0,0,0,0.5)",
					"border-right":toolBorderWid+"px solid #EBEBEB",
					"border-bottom":toolBorderWid+"px solid #EBEBEB",
					"border-bottom-right-radius":_borderRadius+"px"
				});
				$(toolHead).css(
				{
					"bottom":globalResizeCalc(5)+"px"
				});
				$(headLogo).css(
				{
					"left": globalResizeCalc(3)+"px",
					"bottom": globalResizeCalc(-25)+"px"
				});
				toolArrow.getContext("2d").drawImage(toolImage, -48,-383);
			}
			else
			{
				arrows.getContext("2d").drawImage(toolImage, -77,-74);
				logoArrayIndex = 2;
				p.target.css(
				{
					"top":hiddenPos+"px",
					"left":"0px",
					"box-shadow": "2px -2px 4px rgba(0,0,0,0.5)",
					"border-right":toolBorderWid+"px solid #EBEBEB",
					"border-top":toolBorderWid+"px solid #EBEBEB",
					"border-top-right-radius":_borderRadius+"px"
				});
				$(toolHead).css(
				{
					"top":"5px"
				});
				$(headLogo).css(
				{
					"left": globalResizeCalc(3)+"px",
					"top": globalResizeCalc(-32)+"px"
				});
				toolArrow.getContext("2d").drawImage(toolImage, -18,-383);
			}
		}
		else //======================================================
		{
			//-----------------------
			toolArrow = document.createElement("canvas");
			toolArrow.width = 16;
			toolArrow.height = 12;
			$(toolHead).append(toolArrow);
			$(toolHead).append('<div style="display: inline-block; margin-left: '+globalResizeCalc(10)+'px;">Tools</div>');
			$(toolArrow).css(
			{
				"display": "inline-block",
				"width":globalResizeCalc(16)+"px",
				"height":globalResizeCalc(12)+"px",
				"margin-left": globalResizeCalc(10)+"px"
			});
			//-----------------------
			if(p.top)
			{
				arrows.getContext("2d").drawImage(toolImage, -135,-74);
				logoArrayIndex = 3;
				p.target.css(
				{
					"bottom":hiddenPos+"px",
					"right":"0px",
					"box-shadow": "-2px 2px 4px rgba(0,0,0,0.5)",
					"border-left":toolBorderWid+"px solid #EBEBEB",
					"border-bottom":toolBorderWid+"px solid #EBEBEB",
					"border-bottom-left-radius":_borderRadius+"px"
				});
				$(toolHead).css(
				{
					"bottom":globalResizeCalc(5)+"px"
				});
				$(headLogo).css(
				{
					"right": globalResizeCalc(3)+"px",
					"bottom": globalResizeCalc(-25)+"px"
				});
				toolArrow.getContext("2d").drawImage(toolImage, -48,-383);
			}
			else
			{
				arrows.getContext("2d").drawImage(toolImage, -15,-74);
				logoArrayIndex = 1;
				p.target.css(
				{
					"top":hiddenPos+"px",
					"right":"0px",
					"box-shadow": "-2px -2px 4px rgba(0,0,0,0.5)",
					"border-left":toolBorderWid+"px solid #EBEBEB",
					"border-top":toolBorderWid+"px solid #EBEBEB",
					"border-top-left-radius":_borderRadius+"px"
				});
				$(toolHead).css(
				{
					"top":"5px"
				});
				$(headLogo).css(
				{
					"right": globalResizeCalc(3)+"px",
					"top": globalResizeCalc(-32)+"px"
				});
				toolArrow.getContext("2d").drawImage(toolImage, -18,-383);
			}
		}
	}
	
	
	function addToList()
	{
		for(var i = 0; i < p.subMenuList.length; i++)
		{
			var _tempItem,_tempItemName;
			switch(p.subMenuList[i].toLowerCase())
			{
				case "camera":
						_tempItem = camera
						_tempItemName = "<br>Screen shot<br>"
					break;
				case "arrows": case "arrow":
						_tempItem = arrows
						_tempItemName = "<br>Arrows<br>"
					break;
				case "help":
						_tempItem = tooltip
						_tempItemName = "<br>Help<br>"
					break;
				case "sound":
						_tempItem = sound
						_tempItemName = "<br>Sound<br>"
					break;
			}
			if(Number(i) != 0)
				$(_tempItem).css("margin-top",globalResizeCalc(25));
			$(_holderDiv).append(_tempItem);
			$(_holderDiv).append(_tempItemName);
		}
	}
	//================================================================================
	function toolCloseOnWinUp(e)
	{
		if(e.type == "touchstart")
		{
			e.pageX = e.originalEvent.touches[0].pageX;
			e.pageY = e.originalEvent.touches[0].pageY;
		}
		if(e.pageX < p.target.offset().left || e.pageX > (p.target.offset().left + p.target.outerWidth(true)) || e.pageY < p.target.offset().top || e.pageY > (p.target.offset().top + p.target.outerHeight(true)))
		{
			_thisObj.openClose(false);
		}
	}
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
ToolComp.ISACTIVE = false;        // Static Property
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//================================================================================
//================================================================================
// CAMERA COMPONENT
var CameraComp = function()
{
	// Default starts ...
	var p = 
	{
		//target:"",
		id:"",
		x:0,
		y:0,
		viewerWidth:450,
		viewerHeight:445,
		frame:20,
		border:false,
		left:true,
		top:true,
		//click:""
		whiteBorder:false
	}
	// Default ends ...
	var _thisObj = this;
	var _tDiv, activeCamera;
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		p.x = globalResizeCalc(p.x);
		p.y = globalResizeCalc(p.y);
		//---------
		var _pDiv = document.createElement("div");
		_tDiv = document.createElement("div");
		
		var _line1Div = document.createElement("div");
		var _line2Div = document.createElement("div");
		
		if(p.target)
		{
			p.target.append(_pDiv);
		}
		else
		{
			$("body").append(_pDiv);
		}
		p.target = $(_pDiv);
		p.visible == false ? p.target.css("display", "none") : null;
		p.index ? p.target.css("z-index", p.index) : null;
		//---------
		p.target.css(
		{
			"position": "absolute",
			"left": p.x + "px",
			"top": p.y + "px",
			/*"background":"rgba(238, 238, 105, 0.3)",*/
			/* "-ms-transform": "scale("+globalResizeCalc(1)+")",
			"-webkit-transform":"scale("+globalResizeCalc(1)+")",
			"transform": "scale("+globalResizeCalc(1)+")", */
			"transform-origin": "0 0",
			"-webkit-transform-origin": "0 0",
			"-ms-transform-origin": "0 0",
		});
		
		$(_tDiv).css(
		{
			"position": "absolute",
			"width": globalResizeCalc(27)+"px",
			"height": globalResizeCalc(21)+"px",
			"background":"url(../com/images/camera.png) no-repeat",
			"background-size": globalResizeCalc(56)+"px "+ globalResizeCalc(21)+"px",
			"cursor": "pointer",
			"z-index":1
		});
		$(_tDiv).attr("p_title", p.title ? GCTConv(p.title) :  GetGlobalTooltip("tooltip", "camera"));
		
		if(p.border)
		{
			p.target.append(_line1Div).append(_line2Div).append(_tDiv);
		
			$(_line1Div).css(
			{
				"position": "absolute",
				"width":  globalResizeCalc(4)+"px",
				"height":  globalResizeCalc(60)+"px",
				"background":"url(../com/images/gradianLine.png) no-repeat",
				"background-size":"100% 100%"
			});
			$(_line2Div).css(
			{
				"position": "absolute",
				"width":  globalResizeCalc(4)+"px",
				"height":  globalResizeCalc(60)+"px",
				"background":"url(../com/images/gradianLine.png) no-repeat",
				"background-size":"100% 100%"
			});
			if(p.whiteBorder)
			{
				$(_line1Div).css({
					"background":"url(../com/images/gradianLineWhite.png) no-repeat",
					"background-size":"100% 100%"
				});
				$(_line2Div).css({
					"background":"url(../com/images/gradianLineWhite.png) no-repeat",
					"background-size":"100% 100%"
				});
			}
			//leftTop
			if(p.left && p.top)
			{
				$(_line1Div).css(
				{
					"left":"0px",
					"top":"0px"
				});
				$(_line2Div).css(
				{
					"left": globalResizeCalc(30)+"px",
					"top":globalResizeCalc(-27)+"px",			
					"transform": "rotate(-90deg)",
					"-ms-transform": "rotate(-90deg)",
					"-moz-transform": "rotate(-90deg)",
					"-webkit-transform": "rotate(-90deg)"
				});
				$(_tDiv).css(
				{
					"left":globalResizeCalc(-2)+"px",
					"top":globalResizeCalc(-2)+"px"
				});
			}
			//leftBottom
			if(p.left && !p.top)
			{
				$(_line1Div).css(
				{
					"left":"0px",
					"top":"0px",
					"transform": "rotate(180deg)",
					"-ms-transform": "rotate(180deg)",
					"-moz-transform": "rotate(180deg)",
					"-webkit-transform": "rotate(180deg)"
				});
				$(_line2Div).css(
				{
					"left":globalResizeCalc(30)+"px",
					"top":globalResizeCalc(27)+"px",			
					"transform": "rotate(-90deg)",
					"-ms-transform": "rotate(-90deg)",
					"-moz-transform": "rotate(-90deg)",
					"-webkit-transform": "rotate(-90deg)"
				});
				$(_tDiv).css(
				{
					"left":globalResizeCalc(-2)+"px",
					"top":globalResizeCalc(40)+"px"
				});
			}
			//rightBottom
			if(!p.left && !p.top)
			{
				$(_line1Div).css(
				{
					"left":globalResizeCalc(30)+"px",
					"top":globalResizeCalc(29)+"px",		
					"transform": "rotate(90deg)",
					"-ms-transform": "rotate(90deg)",
					"-moz-transform": "rotate(90deg)",
					"-webkit-transform": "rotate(90deg)"
				});
				$(_line2Div).css(
				{
					"left":globalResizeCalc(57)+"px",
					"top":globalResizeCalc(5)+"px",		
					"transform": "rotate(180deg)",
					"-ms-transform": "rotate(180deg)",
					"-moz-transform": "rotate(180deg)",
					"-webkit-transform": "rotate(180deg)"
				});
				$(_tDiv).css(
				{
					"left":globalResizeCalc(37)+"px",
					"top":globalResizeCalc(40)+"px"
				});
			}
			//rightTop
			if(!p.left && p.top)
			{
				$(_line1Div).css(
				{
					"left":globalResizeCalc(30)+"px",
					"top":globalResizeCalc(-26)+"px",			
					"transform": "rotate(90deg)",
					"-ms-transform": "rotate(90deg)",
					"-moz-transform": "rotate(90deg)",
					"-webkit-transform": "rotate(90deg)"
				});
				$(_line2Div).css(
				{
					"left":globalResizeCalc(57)+"px",
					"top":globalResizeCalc(5)+"px",			
					"transform": "rotate(0deg)",
					"-ms-transform": "rotate(0deg)",
					"-moz-transform": "rotate(0deg)",
					"-webkit-transform": "rotate(0deg)"
				});
				$(_tDiv).css(
				{
					"left":globalResizeCalc(37)+"px",
					"top":globalResizeCalc(-2)+"px"
				});
			}
		}
		else
		{
			p.target.append(_tDiv);
		}
		if(BrowserDetect.any())
		{
			$(_tDiv).bind("touchstart", clickEvt);
			$(_tDiv).bind("touchend", clickEvt);
		}
		else
		{
			$(_tDiv).bind("mousedown", clickEvt);
			$(_tDiv).bind("click", clickEvt);
		}
		//-------------------------------
		$(document).on("commonCameraRenderDone", function(e)
		{
			activeCamera ? p.target.show() : null;
			activeCamera = false;
		});
	}
	//================================================================================
	this.addEventListener = function(_evt, _fun)
	{
		p[_evt] = _fun;
	}
	//================================================================================
	this.show = function()
	{
		p.target.show();
	}
	//================================================================================
	this.hide = function()
	{
		p.target.hide();
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function clickEvt(e)
	{
		if(e.type == "mousedown")
		{
			$(window).unbind("mouseup", clickEvt).bind("mouseup", clickEvt);
		}
		else if(e.type == "mouseup")
		{
			$(_tDiv).css({"background-position":"0px 0px","background-size":globalResizeCalc(56)+"px "+globalResizeCalc(21)+"px"});
			$(window).unbind("mouseup", clickEvt);
		}
		else if(e.type == "click" || e.type == "touchend")
		{
			activeCamera = true;
			p.target.hide();
			
			if(!BrowserDetect.ie9())
				audioPlayerObj.playAudio("camera");
			//--------
			e.id = p.id;
			p.click ? p.click(e) : null;
			$(_tDiv).css({"background-position":"0px 0px","background-size":globalResizeCalc(56)+"px "+globalResizeCalc(21)+"px"});
		}
		
		if(e.type == "mousedown" || e.type == "touchstart")
		{
			focusOutInput();
		$(_tDiv).css({"background-position":globalResizeCalc(-30)+"px 0px" ,"background-size":globalResizeCalc(56)+"px "+globalResizeCalc(21)+"px"});
		}
		e.preventDefault();
	}
}
//================================================================================
//================================================================================
// MESSAGE BOX COMPONENT
var MsgBoxComp = function()
{
	// Default starts ...
	var p = 
	{
		//target:"",
		id:"",
		//click:""
	}
	// Default ends ...
	var _thisObj = this;
	var msgWin, _inDiv;
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		//----------------------------------
		msgWin = document.createElement("div");
		$("body").append(msgWin);
		$(msgWin).css(
		{
			"position": "fixed",
			"left": "0px",
			"top": "0px",
			"width": "100%",
			"height": "100%",
			"background": "rgba(0,0,0,0.3)",
			"z-index": 104,
			"display": "none"
		});
		_inDiv = document.createElement("div");
		$(msgWin).append(_inDiv);
		$(_inDiv).text("ksjk sd sjds dksjdsjd ks jdksjdksjdjs ds djskdjskdjsd dfuhduhfd huhhvksss");
		$(_inDiv).css(
		{
			"position":"absolute",
			"left":"50%",
			"top":"50%",
			"width":"350px",
			"background":"#FFFFFF",
			"box-shadow":"rgba(0, 0, 0, 0.5) 0px 0px 20px",
			"text-align":"center",
			"padding":"30px",
			"cursor":"default"
		});
	}
	//================================================================================
	this.showMsg = function(_msg, _bool)
	{
		focusOutInput();
		$(_inDiv).html(_msg);
		setTimeout(function()
		{
			$(_inDiv).css(
			{
				"margin-left": -1 * ($(_inDiv).outerWidth()/2),
				"margin-top": -1 * ($(_inDiv).outerHeight()/2)
			});
			$(msgWin).show();
			$(msgWin).unbind("click", btnEvt);
			if(!_bool)
			{
				$(msgWin).bind("click", btnEvt);
			}
		}, 100);
	}
	//================================================================================
	this.hideMsg = function()
	{
		$(msgWin).hide();
	}
	//================================================================================
	this.addEventListener = function(_evt, _fun)
	{
		p[_evt] = _fun;
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function btnEvt(e)
	{
		_thisObj.hideMsg();
	}
}
//================================================================================
//================================================================================
// TOOL TIP COMPONENT
var ToolTipComp = function()
{
	// Default starts ...
	var p = 
	{
		//target:"",
		id:"",
		//click:""
		index:103
	}
	// Default ends ...
	var _thisObj = this;
	var msgWin;
	var topPad = 20;
	var evtInited = false;
	var lastMousePos;
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		//----------------------------------
		msgWin = document.createElement("div");
		if(p.target)
		{
			p.target = eval(p.target);
			p.target.append(msgWin);
		}
		else
		{
			p.parent ? p.parent.append(msgWin) : $("body").append(msgWin);
		}
		
		$(msgWin).css(
		{
			"position": "fixed",
			"left":"-500px",
			"background": "rgb(255, 244, 221)",
			"font-size": ".75em",
			"padding": "3px 6px",
			"box-shadow":"rgba(0, 0, 0, 0.5) 3px 3px 5px",
			"text-align": "center",
			"display": "table",
			"z-index":p.index
		});
		$(msgWin).hide();
		if(BrowserDetect.any())
		{
			topPad = 50;
		}
	}
	//================================================================================
	this.showTip = function(_msg, e)
	{
		if(!ToolComp.ISACTIVE)
		{
			$(msgWin).html(_msg);
			$(msgWin).show();
			if(String(_msg).indexOf("\\begin{equation}") != -1)
			{
				printKatex(msgWin, _msg)
			} 
			btnEvt(e);
		}
	}
	//================================================================================
	this.hideTip = function()
	{
		$(document).unbind("touchstart", btnEvt);
		$(document).unbind("touchmove", btnEvt);
		$(document).unbind("touchend", btnEvt);
		$(document).unbind("mousemove", btnEvt);
		$(document).unbind("mouseup", btnEvt);
		evtInited = false;
		$(msgWin).hide();
	}
	//================================================================================
	this.addEventListener = function(_evt, _fun)
	{
		p[_evt] = _fun;
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function btnEvt(e)
	{
		if(!e && !lastMousePos)
		{
			return false;
		}
		if(e)
		{
			if(BrowserDetect.any())
			{
				lastMousePos = {pageX:e.touches[0].pageX, pageY:e.touches[0].pageY, type: "touchmove"};
			}
			else
			{
				lastMousePos = {pageX:e.pageX, pageY:e.pageY, type: "mousemove"};
			}
		}
		else
		{
			e = {type:lastMousePos.type};
		}
		if(e.type == "touchmove" || e.type == "touchstart")
		{
			/* e.pageX = e.touches[0].pageX;
			e.pageY = e.touches[0].pageY; */
		}
		if(e.type == "mouseup" || e.type == "touchend")
		{
			_thisObj.hideTip();
		}
		else
		{
			var _flag = checkBoundary()
			var _newL = (lastMousePos.pageX - ($(msgWin).outerWidth() / 2));
			if(e.dir)
			{
				var _newT = $(msgWin).outerHeight() + topPad;
			}
			else
			{
				var _newT = _flag ? (lastMousePos.pageY - $(msgWin).outerHeight() - topPad) : (lastMousePos.pageY + topPad);
			}
			$(msgWin).css(
			{
				"left":_newL+"px",
				"top":_newT+"px"
			});
		}
	}
	function checkBoundary()
	{
		var minX = ($(msgWin).outerWidth()/2), maxX = globalResizeCalc(1024)-($(msgWin).outerWidth()*0.65);
		var minY = ($(msgWin).outerHeight()+topPad), maxY = globalResizeCalc(680)-($(msgWin).outerHeight());
		
		lastMousePos.pageX = minX >= lastMousePos.pageX ? minX : lastMousePos.pageX;
		lastMousePos.pageX = maxX <= lastMousePos.pageX ? maxX : lastMousePos.pageX;
		lastMousePos.pageY = maxY <= lastMousePos.pageY ? maxY : lastMousePos.pageY;
		if(minY >= lastMousePos.pageY)
		{
			lastMousePos.pageY = lastMousePos.pageY+globalResizeCalc(10);
			return false;
		}
		else
		{
			lastMousePos.pageY = lastMousePos.pageY;
			return true;
		}
	}
}
//================================================================================
//================================================================================
// ARROW COMPONENT
var ArrowPanelComp = function()
{
	// Default starts ...
	var p = 
	{
		//target:"",
		id:"",
		//click:""
	}
	// Default ends ...
	var _thisObj = this;
	var bgPos = [0, 2, -18, -38, -58, -78, -98, -117]
	var pDivRef, lastMousePoint, angleStore, baseDivArr, lastMouse;
	var isAct = false;
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		//--------------------------
		baseDivArr = new Array();
		for(var i = 1; i <= 7; i++)
		{
			var _div = document.createElement("div");
			p.target.append(_div);
			$(_div).attr("data-id", i).css(
			{
				"width":"20px",
				"height":"20px",
				"margin":"2px 2px 2px 2px",
				"background":"url(../com/images/arrowPanelSprite.png) no-repeat",
				"background-position": bgPos[i]+"px 0px",
				//"border":"1px solid #000000",
				"cursor":"pointer"
			}).addClass("arrowPanelCompElem")
			baseDivArr.push($(_div));
			if(BrowserDetect.any())
			{
				$(_div).bind("touchstart", makeDuplicate);
				$(_div).bind("touchmove", onBtnEvt);
				$(_div).bind("touchend", onBtnEvt);
			}
			else
			{
				$(_div).bind("mousedown", makeDuplicate);
			}
		}
		p.target.css(
		{
			"margin-top":((p.target.height() / 2))+"px"
		});
	}
	//================================================================================
	function makeDuplicate(e)
	{
		if(e.pageX == undefined)
		{
			e.pageX = e.originalEvent.touches[0].pageX;
			e.pageY = e.originalEvent.touches[0].pageY;
		}
		if(e.pageX != undefined && e.pageY !=undefined)
		{
			lastMouse = {pageX:e.pageX, pageY:e.pageY};
		}
		if($(this).data("id") == "7")
		{
			p.target.animate({"right":(-1 * (Number($(".pointerBox").width()) + 10))+"px"}, 200);
		}
		else
		{
			if($(this).css("cursor") == "pointer")
			{
				//$(this).css("opacity", 0).css("cursor", "default");
				pDivRef = document.createElement("div");
				var _div = document.createElement("div");
				$("body").append(pDivRef);
				$(pDivRef).append(_div)
				$(pDivRef).data("id", $(this).data("id")).css(
				{
					"position":"absolute",
					"width":"30px",
					"height":"36px",
					"left":(e.pageX - 15)+"px",
					"top":(e.pageY - 18)+"px"
					
				});
				$(_div).css(
				{
					"position":"absolute",
					"width":"15px",
					"height":"18px",
					"right":"0px",
					"bottom":"0px",
					"background":"url(../com/images/arrowPanelSprite.png) no-repeat",
					"background-position": bgPos[$(this).data("id")]+"px 0px",
					"-webkit-transform": "rotate(-17deg)",
					"transform": "rotate(-17deg)",
					"-moz-transform": "rotate(-17deg)",
					"-ms-transform": "rotate(-17deg)"
				});
				if(BrowserDetect.any())
				{
					$(pDivRef).bind("touchstart", onBtnEvt);
					$(pDivRef).bind("touchmove", onBtnEvt);
					$(pDivRef).bind("touchend", onBtnEvt);
				}
				else
				{
					$(pDivRef).bind("mousedown", onBtnEvt);
				}
				onBtnEvt(e);
			}
		}
	}
	//================================================================================
	function onBtnEvt(e)
	{
		if(e.type == "touchmove")
		{
			e.pageX = e.originalEvent.touches[0].pageX;
			e.pageY = e.originalEvent.touches[0].pageY;
		}
		if(e.pageX != undefined && e.pageY !=undefined)
		{
			lastMouse = {pageX:e.pageX, pageY:e.pageY};
		}
		if(e.type == "mousemove" || e.type == "touchmove")
		{
			if(BrowserDetect.any())
			{
				e.pageY -= 35;
			}
			if(!lastMousePoint || Math.abs(e.pageX - lastMousePoint.x) > 5 ||Math.abs(e.pageY - lastMousePoint.y) > 5)
			//if(!isAct)
			{
				var angleInDegrees = 0;
				if(lastMousePoint)
				{
					var deltaX = e.pageX - lastMousePoint.x;
					var deltaY = e.pageY - lastMousePoint.y;
					angleInDegrees = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
					
					var tempangle = (Math.atan((e.pageY-lastMousePoint.y)/(e.pageX-lastMousePoint.x))*(180 / Math.PI));
					var snapangle = (Math.round(tempangle/10))*10;
					var temp = snapangle;
					var angle = 0;
					if(e.pageX == lastMousePoint.x && e.pageY > lastMousePoint.y )
					{
						angle = 90;
					}//going down straight
					else if(e.pageX > lastMousePoint.x)
					{
						angle = temp;
					}
					else if (e.pageX < lastMousePoint.x)
					{
						angle = temp + 180;
					}
					else if (e.pageX == lastMousePoint.x && e.pageY < lastMousePoint.y )
					{
						angle = 270;
					}
					
					angle += 125;
					$(pDivRef).css(
					{
						"left":(e.pageX - 15)+"px",
						"top":(e.pageY - 18)+"px",
						"transform": "rotate(" + angle + "deg)",
						"-webkit-transform": "rotate(" + angle + "deg)",
						"-moz-transform": "rotate(" + angle + "deg)",
						"-ms-transform": "rotate(" + angle + "deg)"
					});
				}
				lastMousePoint = {x:e.pageX, y:e.pageY};
				isAct = true;
			}
			
			$(pDivRef).hide();
			var tracedElem = document.elementFromPoint(e.pageX, e.pageY);
			$(pDivRef).show();
			
			if($(tracedElem).attr("class") =="toolDropper")
			{
				$(pDivRef).hide();
			}
			
			if(e.pageX >= p.target.offset().left && e.pageX <= p.target.offset().left + p.target.width() && e.pageY >= p.target.offset().top && e.pageY <= p.target.offset().top + p.target.height())
			{
				//$(".arrowPanelCompElem[data-id='"+$(pDivRef).data("id")+"']").css("opacity", 1);
				//$(pDivRef).css("opacity", 0);
			}
			else
			{
				//$(".arrowPanelCompElem[data-id='"+$(pDivRef).data("id")+"']").css("opacity", 0);
				//$(pDivRef).css("opacity", 1);
			}
		}
		if(e.type == "mouseup" || e.type == "touchend")
		{
			if(e.type == "touchend")
			{
				e.pageX = lastMouse.pageX;
				e.pageY = lastMouse.pageY;
			}
			if(e.pageX >= p.target.offset().left && e.pageX <= p.target.offset().left + p.target.width() && e.pageY >= p.target.offset().top && e.pageY <= p.target.offset().top + p.target.height())
			{
				$(".arrowPanelCompElem[data-id='"+$(pDivRef).data("id")+"']").css("opacity", 1).css("cursor", "pointer");
				$(pDivRef).hide();
			}
			$(window).unbind("mousemove", onBtnEvt).unbind("mouseup", onBtnEvt);
		}
		if(e.type == "mousedown" || e.type == "touchstart")
		{
			try
			{
				if($(this).css("left"))
				{
					pDivRef = this;
				}
			}
			catch(e){}
			$(window).unbind("mousemove", onBtnEvt).unbind("mouseup", onBtnEvt).bind("mousemove", onBtnEvt).bind("mouseup", onBtnEvt);
		}
		e.preventDefault();
	}
}
//================================================================================
//================================================================================
// SYSTEM BUTTON COMPONENT
var SystemButtonComp = function()
{
	// Default starts ...
	var p = 
	{
		//target:"",
		id:"",
		orientation:"horizontal",
		x:0,
		y:0,
		content:"controls",
		onSelect:"",
		//click:"",
		solidBG:false,
		whiteColor: false,
		playSwitch:false,
		margin:5,
	}
	var _thisObj = this;
	var btnName;
	var isMouseDown = false;
	var playBtn, resBtn, pauseBtn, fastForwardBtn, rewindBtn, nextBtn, prevBtn;
	var _leftPos = 0;
	var playIsOn = true;
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		p.x = globalResizeCalc(p.x);
		p.y = globalResizeCalc(p.y);
		//---------
		var _tDiv = document.createElement("div");
		if(p.target)
		{
			p.target.append(_tDiv);
		}
		else
		{
			$("body").append(_tDiv);
		}
		p.target = $(_tDiv);
		p.visible == false ? p.target.css("display", "none") : null;
		p.index ? p.target.css("z-index", p.index) : null;
		p.margin = globalResizeCalc(p.margin);
		//---------
		p.target.css(
		{
			"position":"absolute",
			"left": p.x+"px",
			"top": p.y+"px",
			"transform-origin": "0 0",
			"-webkit-transform-origin": "0px 0px",
			"-ms-transform-origin": "0 0",							
		});
		if(p.showButtons.length == 0)
		{
			p.showButtons = ["play", "fastForward", "pause", "reset"];
		}
		//---------------------
		/* if(p.showButtons.indexOf('play') != (-1))
		{
			playBtn = document.createElement("div");
			//p.target.append(playBtn);
			$(playBtn).css({
				"position":"absolute",
				"top":"0px",
				"left":	_leftPos+"px",
				"width":globalResizeCalc(50)+"px",
				"height":globalResizeCalc(43)+"px",
				"background": "url(../com/images/systemButtons.png) no-repeat",
				"background-position": globalResizeCalc(-1)+"px "+globalResizeCalc(-2)+"px",
				"background-size": globalResizeCalc(220)+"px "+globalResizeCalc(133)+"px",
				"cursor":"pointer",
				"border":"0px solid"				
			}).attr(
			{
				"data-type": "play"
			});
			_leftPos = 	_leftPos+parseInt($(playBtn).css('width'))+margin;
			
		}
		if(p.showButtons.indexOf('fastForward') != (-1))
		{
			fastForwardBtn = document.createElement("div");
			//p.target.append(fastForwardBtn);
			$(fastForwardBtn).css({
				"position":"absolute",
				"top":"0px",
				"left":	_leftPos+"px",
				"width":globalResizeCalc(45)+"px",
				"height":globalResizeCalc(43)+"px",
				"background": "url(../com/images/systemButtons.png) no-repeat",
				"background-position": globalResizeCalc(-167)+"px "+globalResizeCalc(-2)+"px",
				"background-size": globalResizeCalc(220)+"px "+globalResizeCalc(133)+"px",
				"cursor":"pointer",
				"border":"0px solid"				
			}).attr(
			{
				"data-type": "fastForward"
			});
			_leftPos = 	_leftPos+parseInt($(fastForwardBtn).css('width'))+margin;
		}
		if(p.showButtons.indexOf('pause') != (-1))
		{
			pauseBtn = document.createElement("div");
			//p.target.append(pauseBtn);
			$(pauseBtn).css({
				"position":"absolute",
				"top":"0px",
				"left":	_leftPos+"px",
				"width":globalResizeCalc(42)+"px",
				"height":globalResizeCalc(43)+"px",
				"background": "url(../com/images/systemButtons.png) no-repeat",
				"background-position": globalResizeCalc(-58)+"px "+globalResizeCalc(-2)+"px",
				"background-size": globalResizeCalc(220)+"px "+globalResizeCalc(133)+"px",
				"cursor":"pointer",
				"border":"0px solid"				
			}).attr(
			{
				"data-type": "pause"
			});
			_leftPos = 	_leftPos+parseInt($(pauseBtn).css('width'))+margin;
		}
		if(p.showButtons.indexOf('reset') != (-1))
		{
			resBtn = document.createElement("div");
			//p.target.append(resBtn);
			$(resBtn).css({
				"position":"absolute",
				"top":"0px",
				"left":_leftPos+"px",
				"width":globalResizeCalc(50)+"px",
				"height":globalResizeCalc(40)+"px",
				"background": "url(../com/images/systemButtons.png) no-repeat",
				"background-position": globalResizeCalc(-105)+"px "+globalResizeCalc(-2)+"px",
				"background-size": globalResizeCalc(220)+"px "+globalResizeCalc(133)+"px",
				"cursor":"pointer",
				"border":"0px solid"				
			}).attr(
			{
				"data-type": "reset"
			});
			_leftPos = 	_leftPos+parseInt($(resBtn).css('width'))+margin;
		} */
		//---------------------
		for(var i in p.showButtons)
		{
			var tempDiv;
			if(i == 0)
				tempDiv = createElement("left",p.showButtons[i])
			else if(i == p.showButtons.length-1)
				tempDiv = createElement("right",p.showButtons[i])
			else 
				tempDiv = createElement("middle",p.showButtons[i]);
			
			p.target.append(tempDiv);
			
		}
		
		for(var i in p.showButtons)
		{
			addToolTip(p.showButtons[i]);
			_thisObj.setEnable(p.showButtons[i]);
		}
		/*
		_thisObj.setEnable("play");
		_thisObj.setEnable("pause");
		_thisObj.setEnable("reset");
		_thisObj.setEnable("fastForward");
		*/
	}
	
	//================================================================================
	this.addEventListener = function(_evt, _fun)
	{
		p[_evt] = _fun;
	} 
	//================================================================================
	this.setEnable = function(_btn)
	{
		if(typeof(_btn) != "undefined")
		{
			var _btnObj;
			switch(_btn)
			{
				case "play":
					_btnObj = $(playBtn);
				break;
				case "pause":
					_btnObj = $(pauseBtn);
				break;
				case "reset":
					_btnObj = $(resBtn);
				break;
				case "fastForward":
					_btnObj = $(fastForwardBtn);
				break;
				case "rewind":
					_btnObj = $(rewindBtn);
				break;
				case "next":
					_btnObj = $(nextBtn);
				break;
				case "prev":
					_btnObj = $(prevBtn);
				break;
			}
			if(BrowserDetect.any())
			{
				_btnObj.unbind("touchstart", btnEvt).bind("touchstart", btnEvt);
			}else
			{
				_btnObj.unbind("mousedown", btnEvt).bind("mousedown", btnEvt);
			}
			_btnObj.unbind("click", btnEvt).bind("click", btnEvt);
			_btnObj.css({"opacity":1,"cursor":"pointer"});
			_btnObj.find("div").css({"opacity":1,"cursor":"pointer"});
		}
	}
	//================================================================================
	this.setDisable= function(_btn)
	{
		if(typeof(_btn) != "undefined")
		{
			var _btnObj;
			switch(_btn)
			{
				case "play":
					_btnObj = $(playBtn);
				break;
				case "pause":
					_btnObj = $(pauseBtn);
				break;
				case "reset":
					_btnObj = $(resBtn);
				break;
				case "fastForward":
					_btnObj = $(fastForwardBtn);
				break;
				case "rewind":
					_btnObj = $(rewindBtn);
				break;
				case "next":
					_btnObj = $(nextBtn);
				break;
				case "prev":
					_btnObj = $(prevBtn);
				break;
			}
			if(BrowserDetect.any())
			{
				_btnObj.unbind("touchstart", btnEvt);
				_btnObj.unbind("touchend", onWindowUp);
			}else
			{
				_btnObj.unbind("mousedown", btnEvt);
			}
			_btnObj.unbind("click", btnEvt);
			_btnObj.css({"opacity":0.5, "cursor":"default"});
			_btnObj.find("div").css({"opacity":0.5, "cursor":"default"});
		}
	}
	//================================================================================
	this.setPlayOn = function(_flag)
	{
		var bgBackPos = $(playBtn).css('background-position').split(" ");
		var symBackPos = $(playBtn).find("div").css('background-position').split(" ");
		var bgPosY = p.whiteColor ? globalResizeCalc(-92) : globalResizeCalc(-4);
		var symPosY = globalResizeCalc(-5);
		if(_flag)
		{
			symBackPos[0] = getProperties("play")[4] + "px";
			$(playBtn).data("type","play");
			playIsOn = true;
			var _tempTitle = p.title.play ? GCTConv(p.title.play) : GetGlobalTooltip("tooltip", "playBtn");
			$(playBtn).attr("p_title",GCTConv(_tempTitle));
		}
		else 
		{
			symBackPos[0] = getProperties("pause")[4] + "px";
			$(playBtn).data("type","pause");
			playIsOn = false;
			var _tempTitle = p.title.pause ? GCTConv(p.title.pause) : GetGlobalTooltip("tooltip", "pauseBtn");
			$(playBtn).attr("p_title",GCTConv(_tempTitle));
		}
		$(playBtn).css('background-position',bgBackPos[0]+' '+bgPosY+'px');
		$(playBtn).find("div").css('background-position',symBackPos[0]+' '+symPosY+'px');
	}
	//================================================================================
	this.show = function()
	{
		p.target.show();
	}
	//================================================================================
	this.hide = function()
	{
		p.target.hide();
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function btnEvt(e)
	{
		var backPos;
		if(e.type == "mousedown" || e.type == "touchstart")
		{
			focusOutInput();
			audioPlayerObj.playAudio("down");
			btnName = $(this);
			//backPos = $(btnName).css('background-position').split(" ");
			//$(this).css('background-position',backPos[0]+' '+globalResizeCalc(-47)+'px');
			changeButtonState(this,"down")
			if(BrowserDetect.any())
			{
				$(window).unbind("touchend", onWindowUp).bind("touchend", onWindowUp);
			}
			else
			{
				$(window).unbind("mouseup mouseleave", onWindowUp).bind("mouseup mouseleave", onWindowUp);
			}
			isMouseDown = true;
		}
		else
		{
			//backPos = $(btnName).css('background-position').split(" ");
			//$(this).css('background-position',backPos[0]+' '+globalResizeCalc(-4)+'px');
			changeButtonState(this,"up")
			onWindowUp(e);
		}
	}
	//================================================================================
	function onWindowUp(e)
	{
		e.id = p.id;
		e.btnType = btnName.data("type");
		
		p.click && isMouseDown ? p.click(e) : null;
		
		isMouseDown = false ;
		if(e.type !="mouseleave" && e.type !="mouseup")
			audioPlayerObj.playAudio("up");
		for(var i in p.showButtons)
		{
			var _btnObj;
			switch(p.showButtons[i])
			{
				case "play":
					_btnObj = $(playBtn);
				break;
				case "pause":
					_btnObj = $(pauseBtn);
				break;
				case "reset":
					_btnObj = $(resBtn);
				break;
				case "fastForward":
					_btnObj = $(fastForwardBtn);
				break;
				case "rewind":
					_btnObj = $(rewindBtn);
				break;
				case "next":
					_btnObj = $(nextBtn);
				break;
				case "prev":
					_btnObj = $(prevBtn);
				break;
			}
			changeButtonState(_btnObj,"up");
		}
		/* $(playBtn).css('background-position',globalResizeCalc(-1)+"px "+globalResizeCalc(-2)+"px");
		$(resBtn).css('background-position',globalResizeCalc(-105)+"px "+globalResizeCalc(-2)+"px");
		$(pauseBtn).css('background-position', globalResizeCalc(-59)+"px "+globalResizeCalc(-2)+"px");
		$(fastForwardBtn).css('background-position',globalResizeCalc(-167)+"px "+globalResizeCalc(-2)+"px"); */
		$(window).unbind("touchend", onWindowUp);
		$(window).unbind("mouseup mouseleave", onWindowUp);
	}
	//================================================================================
	function addToolTip(_btn)
	{
		if(typeof(_btn) != "undefined")
		{
			switch(_btn)
			{
				case "play":
						var _tempTitle = p.title ? p.title.play ? GCTConv(p.title.play) : GetGlobalTooltip("tooltip", "playBtn") : GetGlobalTooltip("tooltip", "playBtn");
						$(playBtn).attr("p_title",GCTConv(_tempTitle));
						$(playBtn).find("div").attr("p_title",GCTConv(_tempTitle));
				break;
				case "pause": 
						var _tempTitle = p.title ? p.title.pause ? GCTConv(p.title.pause) : GetGlobalTooltip("tooltip", "pauseBtn") : GetGlobalTooltip("tooltip", "pauseBtn");
						$(pauseBtn).attr("p_title",GCTConv(_tempTitle));
						$(pauseBtn).find("div").attr("p_title",GCTConv(_tempTitle));
				break;
				case "reset":
						var _tempTitle = p.title ? p.title.reset ? GCTConv(p.title.reset) : GetGlobalTooltip("tooltip", "resetBtn") : GetGlobalTooltip("tooltip", "resetBtn");
						$(resBtn).attr("p_title",GCTConv(_tempTitle));
						$(resBtn).find("div").attr("p_title",GCTConv(_tempTitle));
				break;
				case "fastForward": 
						var _tempTitle = p.title ? p.title.fastforward ? GCTConv(p.title.fastforward) : GetGlobalTooltip("tooltip", "fastforwardBtn") : GetGlobalTooltip("tooltip", "fastforwardBtn");
						$(fastForwardBtn).attr("p_title",GCTConv(_tempTitle));
						$(fastForwardBtn).find("div").attr("p_title",GCTConv(_tempTitle));
				break;
				case "rewind": 
						var _tempTitle = p.title ? p.title.rewind ? GCTConv(p.title.rewind) : GetGlobalTooltip("tooltip", "rewindBtn") : GetGlobalTooltip("tooltip", "rewindBtn");
						$(rewindBtn).attr("p_title",GCTConv(_tempTitle));
						$(rewindBtn).find("div").attr("p_title",GCTConv(_tempTitle));
				break;
				case "next":
						var _tempTitle = p.title ? p.title.next ? GCTConv(p.title.next) : GetGlobalTooltip("tooltip", "nextBtn") : GetGlobalTooltip("tooltip", "nextBtn");
						$(nextBtn).attr("p_title",GCTConv(_tempTitle));
						$(nextBtn).find("div").attr("p_title",GCTConv(_tempTitle));
				break;
				case "prev":
						var _tempTitle = p.title ? p.title.prev ? GCTConv(p.title.prev) : GetGlobalTooltip("tooltip", "prevBtn") : GetGlobalTooltip("tooltip", "prevBtn");
						$(prevBtn).attr("p_title",GCTConv(_tempTitle));
						$(prevBtn).find("div").attr("p_title",GCTConv(_tempTitle));
				break;
			}
		}
	}
	//================================================================================
	function createElement(type,id)
	{
		var tempDiv = document.createElement("div");
		var bgPosX,bgPosY,bgWidthWithOutScale,bgWidth,bgHeight,symPosX,symPosY;
		
		var _tempArr = getProperties(id);
		bgPosX = _tempArr[0]
		bgPosY = _tempArr[1]
		bgWidth = _tempArr[2]
		bgHeight = _tempArr[3]
		symPosX = _tempArr[4]
		symPosY = _tempArr[5]
		bgWidthWithOutScale = _tempArr[6]
		
		$(tempDiv).css({
				"float":"left",
				"width":bgWidth+"px",
				"height":bgHeight+"px",
				"background": "url(../com/images/systemButtons.png) no-repeat",
				"background-position": bgPosX+"px "+bgPosY+"px",
				"background-size": globalResizeCalc(500)+"px "+globalResizeCalc(135)+"px",
				"cursor":"pointer",
				"border":"0px solid"		
				}).attr(
			{
				"data-type": id
			});
		switch(id)
		{
			case "play" : playBtn = tempDiv;
				break;
			case "pause" : pauseBtn = tempDiv;
				break;
			case "reset" : resBtn = tempDiv;
				break;
			case "fastForward" : fastForwardBtn = tempDiv;
				break;
			case "rewind" : rewindBtn = tempDiv;
				break;
			case "next" : nextBtn = tempDiv;
				break;
			case "prev" : prevBtn = tempDiv;
				break;
		}
		if(type != "left")
			$(tempDiv).css("margin-left",p.margin);
		
		var innerDiv = document.createElement("div");
		$(innerDiv).css({
				"position":"absolute",
				"width":bgWidth+"px",
				"height":"100%",
				"background": "url(../com/images/systemButtons.png) no-repeat",
				"background-position": symPosX+"px "+symPosY+"px",
				"background-size": globalResizeCalc(500)+"px "+globalResizeCalc(135)+"px",
				"cursor":"pointer",
				"border":"0px solid"	
		});
		$(tempDiv).append(innerDiv);
		return tempDiv;
	}
	//================================================================================
	function getProperties(id)
	{
		var type,_arr = []; 
		var i = p.showButtons.indexOf(id);
		if(i == 0)
			type = "left";
		else if(i == p.showButtons.length-1)
			type = "right";
		else 
			type = "middle";
		
		switch(type)
		{
			case "left":
						_arr[0] = globalResizeCalc(-1);
						_arr[2] = globalResizeCalc(50);
						_arr[6] = 50;
				break;
			case "middle":
						_arr[0] = globalResizeCalc(-58.5);
						_arr[2] = globalResizeCalc(43);
						_arr[6] = 43;
				break;
			case "right":
						_arr[0] = globalResizeCalc(-105);
						_arr[2] = globalResizeCalc(50);
						_arr[6] = 50;
				break;
		}
		_arr[3] = globalResizeCalc(38);
		_arr[1] = p.whiteColor ? globalResizeCalc(-92) : globalResizeCalc(-4);
		switch(id)
		{
			case "play" : _arr[4] = globalResizeCalc(-(333 - _arr[6]/2 ));
				break;
			case "pause" : _arr[4] = globalResizeCalc(-(198- _arr[6]/2 ));
				break;
			case "reset" : _arr[4] = globalResizeCalc(-(479- _arr[6]/2 ));
				break;
			case "fastForward" : _arr[4] = globalResizeCalc(-(428- _arr[6]/2 ));
				break;
			case "rewind" : _arr[4] = globalResizeCalc(-(243- _arr[6]/2 ));
				break;
			case "next" : _arr[4] = globalResizeCalc(-(380- _arr[6]/2 ));
				break;
			case "prev" : _arr[4] = globalResizeCalc(-(289- _arr[6]/2 ));
				break;
		}
		_arr[5] = globalResizeCalc(-5);
		
		return _arr;
	}
	//================================================================================
	function changeButtonState(_btnDiv,state)
	{
		var bgBackPos = $(_btnDiv).css('background-position').split(" ");
		var symBackPos = $(_btnDiv).find("div").css('background-position').split(" ");
		var bgPosY,symPosY;
		if(state == "down")
		{
			bgPosY = globalResizeCalc(-48);
			symPosY = globalResizeCalc(-46);
		}
		else
		{
			bgPosY = p.whiteColor ? globalResizeCalc(-92) : globalResizeCalc(-4);
			symPosY = globalResizeCalc(-5);
		}
		
		if(p.playSwitch && btnName.data("type") == $(_btnDiv).data("type") && ($(_btnDiv).data("type") == "play" || $(_btnDiv).data("type") == "pause")) 
		{
			if(playIsOn && state == "up")
			{
				symBackPos[0] = getProperties("pause")[4] + "px";
				$(_btnDiv).data("type","pause");
				playIsOn = false;
			}
			else if(!playIsOn && state == "up")
			{
				symBackPos[0] = getProperties("play")[4] + "px";
				$(_btnDiv).data("type","play");
				playIsOn = true;
			}
		}
		$(_btnDiv).css('background-position',bgBackPos[0]+' '+bgPosY+'px');
		$(_btnDiv).find("div").css('background-position',symBackPos[0]+' '+symPosY+'px');
	}
}
//================================================================================
//================================================================================
//================================================================================
// COLOR BAR COMPONENT
var ColorBarComp = function()
{
	//Default Starts
	var p = 
	{
		id:"",
		x:50,
		y:0,
		width:450,
		height:45,
		colorStyle:"244,77,63",
		bold:false,
		sqrBox:true,
		lineBox:true,
		cursor:"default",
		fontSize:"1em",
		bgAlpha:0.3,
		paddingTop:10,
		paddingBottom:10,
		paddingLeft:10,
		paddingRight:10
	}
	
	var _thisObj = this;
	var barBox, sqrBox, rectBox, bgDiv;
	var colorComb, textField;
	var updateWidth;
	var margin = globalResizeCalc(8);
       
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		p.x = globalResizeCalc(p.x);
		p.y = globalResizeCalc(p.y);
		p.width = globalResizeCalc(p.width);
		p.height = globalResizeCalc(p.height);
		switch(Number(p.colorStyle))
		{
			case 1:
			colorComb = '0,172,239';
			break;
			case 2:
			colorComb = '75,83,236';
			break;
			case 3:
			colorComb = '244,77,63';
			break;
			case 4:
			colorComb = '0,168,110';
			break;
			case 5:
			colorComb = '154,54,205';
			break;
			default:
			colorComb = p.colorStyle; 
			break;
		}
		//---------
		p.bold = p.bold ? "bold" : "normal";
		//---------
		var _tDiv = document.createElement("div");
		if(p.target)
		{
			p.target.append(_tDiv);
		}
		else
		{
			$("body").append(_tDiv);
		}
		p.target = $(_tDiv);
		p.visible == false ? p.target.css("display", "none") : null;
		p.index ? p.target.css("z-index", p.index) : null;
		p.title ? p.target.attr("p_title", GCTConv(p.title)) : null;
		//---------
		p.target.css(
		{
			"position":"absolute",
			"left": p.x+"px",
			"top": p.y+"px",
			"width": p.width+"px",
			"height": p.height+"px"				
		});
		if(p.sqrBox)
		{
			sqrBox = document.createElement("div");
		}
		if(p.lineBox)
		{
			rectBox = document.createElement("div");
			updateWidth = p.width - margin;
		}else
		{
			 updateWidth = p.width;
		}
		
		bgDiv = document.createElement("div");
		p.target.append(sqrBox).append(rectBox).append(bgDiv);
		sqrBoxTop = p.height/2 - globalResizeCalc(21)/2;
		$(sqrBox).css({
			"position":"absolute",
			"right":globalResizeCalc(20)+"px",
			"top":sqrBoxTop+"px",
			"width":globalResizeCalc(21)+"px",
			"height":globalResizeCalc(21)+"px",
			"background": "rgba("+colorComb+",1)"
		});		
		$(rectBox).css(
		{
			"position":"absolute",
			"right": globalResizeCalc(0)+"px",
			"top": globalResizeCalc(0)+"px",
			"width": globalResizeCalc(5)+"px",
			"height": p.height +"px",
			"background": "rgba("+colorComb+",1)"
		});
		
		$(bgDiv).css(
		{
			"position":"absolute",
			"left": globalResizeCalc(0)+"px",
			"top": globalResizeCalc(0)+"px",
			"width": updateWidth+"px",
			"height": p.height+"px",
			"background": "rgba("+colorComb+","+p.bgAlpha+")"
		});
		textField = document.createElement("div");
		$(textField).empty();
		$(p.target).append(textField);
		$(textField).css({
			"position":"relative",
			"padding-top":globalResizeCalc(p.paddingTop)+"px",
			"padding-bottom":globalResizeCalc(p.paddingBottom)+"px",
			"padding-left":globalResizeCalc(p.paddingLeft)+"px",
			"padding-right":globalResizeCalc(p.paddingRight)+"px",
			"font-size":p.fontSize,
			"margin-left": globalResizeCalc(2)+"px",
			"font-weight": p.bold,
			"cursor": p.cursor
		}).attr("id", "colorBarMathjax_"+p.id);
		this.setColor(colorComb);
		if(p.text)
		{
			setLabelTextFn(p.text);
		}
	}
	//=========================================================================
	this.setLabelText = function(_text)
	{
		setLabelTextFn(_text)
	}
	//================================================================================
	this.setColor = function(_bgColor)
	{
		if(_bgColor.indexOf("#") != -1)
		{
			colorComb = hexToRgb(_bgColor);
			colorComb = String(colorComb.r+", "+colorComb.g+", "+colorComb.b);
		}		
		$(sqrBox).css({
			"background": "rgba("+colorComb+",1)"
		});		
		$(rectBox).css(
		{
			"background": "rgba("+colorComb+",1)"
		});
		$(bgDiv).css(
		{
			"background": "rgba("+colorComb+","+p.bgAlpha+")"
		});
	}
	//================================================================================
	this.show = function()
	{
		p.target.show();
	}
	//================================================================================
	this.hide = function()
	{
		p.target.hide();
	}
	//=======================================================================
	// PRIVATE FUNCTIONS
	//=======================================================================
	function hexToRgb(hex) {
    	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : hex;
	}
	function setLabelTextFn(_txt)
	{
		if(_txt)
		{
			_txt = p.emdash ? _txt.replace(/-/g, "&ndash;") : _txt;
		   $(textField).html(_txt);
			if(String(_txt).indexOf("\\begin{equation}") != -1)
			{
				$(textField).css(
				{
					"padding-top":"0px",
					"opacity":0
				});
				setTimeout(function()
				{
					MathJax.Hub.Queue(["Typeset",MathJax.Hub, "colorBarMathjax_"+p.id], function()
					{
						$(textField).css("opacity", 1);
					});
				}, 10);
			}
			else
			{
				$(textField).css(
				{
					"padding-top":globalResizeCalc(p.paddingTop)+"px"
				});
			}
		}
	}
}
//================================================================================
//================================================================================
//================================================================================
// STATUS BOOK COMPONENT
var StatusBook = function()
{
	// Default starts ...
	var p =
	{
		//target:"",
		x:0,
		y:0,
		width:414,
		height:368,
		headDivTop:10,
		headingFont:1.16,
		subMarginLeft:55,
		subMarginTop: 30,
		subHeadingFont:0.83,
		contMarginLeft:70,
		contMarginTop: 30,
		contHeadingFont:0.83,
		mainHeading:"HEADING",
		subHeading:"SUB - HEADING",
		content:"Main content goes here.",
		src:"../com/images/description.png",
		inside:false,
		shadow:true
	}
	// Default ends ...
	var headDiv, contentBgDiv, subDiv, holdDiv, contDiv;
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		p.x = globalResizeCalc(p.x);
		p.y = globalResizeCalc(p.y);
		p.width = globalResizeCalc(p.width);
		p.height = globalResizeCalc(p.height);
		//
		p.headDivTop = globalResizeCalc(p.headDivTop);
	    p.subMarginLeft = globalResizeCalc(p.subMarginLeft);
	    p.subMarginTop = globalResizeCalc(p.subMarginTop);
	    p.contMarginLeft = globalResizeCalc(p.contMarginLeft);
	    p.contMarginTop = globalResizeCalc(p.contMarginTop);
		//---------
		var _tDiv = document.createElement("div");
		if(p.target)
		{
			p.target.append(_tDiv);
		}
		else
		{
			$("body").append(_tDiv);
		}
		p.target = $(_tDiv);
		p.visible == false ? p.target.css("display", "none") : null;
		p.index ? p.target.css("z-index", p.index) : null;
		p.title ? p.target.attr("p_title", GCTConv(p.title)) : null;
		//---------
		p.target.css({
			"position":"absolute",
			"left": p.x+"px",
			"top": p.y+"px",
			"width":p.width+"px",
			"height":p.height+"px",
			"background":"rgba(0,0,0,0)",
			"cursor": "default"
		});
		headDiv = document.createElement("div");
		//---------
		holdDiv = document.createElement("div");
		!p.inside ? p.target.append(headDiv) : null;	// append headDiv to target if TITLE is outside the Status BOOK.
		
		p.target.append(holdDiv);
		
		p.inside ? $(holdDiv).append(headDiv) : null;  // append headDiv to holDiv if TITLE is inside the Status BOOK.
		
		$(headDiv).css(
		{
			"margin-top": p.headDivTop+"px",
			"text-align":"center",
			"width": "100%",
			"font-family":"Arial",
			"font-size":p.headingFont+"em",
			"background": "rgba(255,0,0,0)",
			//"display": "none"
		});
		//---------
		//---------
		$(holdDiv).css(
		{
			"position":"absolute",
			"left": "0px",
			"bottom": "0px",
			"width":p.width+"px",
			"height":p.height+"px",
			/* "box-shadow": "5px 5px 6px 2px rgba(0, 0, 0, 0.3)",  */
			"background":"url("+p.src+") no-repeat",
			"background-size": "100% 100%",
			"overflow":"hidden"
		});
		p.shadow ? $(holdDiv).css({"box-shadow": "5px 5px 6px 2px rgba(0, 0, 0, 0.3)"}) : null;
		//---------
		subDiv = document.createElement("div");
		contDiv = document.createElement("div");
		$(holdDiv).append(subDiv).append(contDiv);
		//---------
		//
		$(subDiv).css(
		{
			"margin-top": p.subMarginTop+"px",
			"margin-left": p.subMarginLeft+"px",
			"text-align":"left",
			"width": "86%",
			"font-family":"Arial",
			"font-size":p.subHeadingFont+"em",
			"background": "rgba(255,0,0,0)",
			//"display": "none"
		});
		//
		$(contDiv).css(
		{
			"margin-left": p.contMarginLeft+"px",
			"margin-top": p.contMarginTop+"px",
			"text-align":"left",
			"width": "80%",
			"font-family":"Arial",
			"font-size":p.contHeadingFont+"em",
			"background": "rgba(255,0,0,0)",
			//"display": "none"
		});
		
		updateStatusBox();	
		//p.target.css("background-size", "100% 100%");
	}
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.setMainHeading = function(_Mainstr)
	{
		p.mainHeading =_Mainstr;
		updateStatusBox();
	}
	//================================================================================
	this.setSubHeading = function(_Substr)
	{
		p.subHeading =_Substr;
		updateStatusBox();
	}
	//================================================================================
	this.setContentHeading = function(_Contstr)
	{
		p.content =_Contstr;
		updateStatusBox();
	}
	//================================================================================
	this.updateStyle = function(divType,divProp)
	{
		if(divType == "contDiv")
			{
				$(contDiv).css(divProp);
			}
		else if(divType == "subDiv")
			{
				$(subDiv).css(divProp);
			}
		else if(divType == "headDiv")
			{
				$(headDiv).css(divProp);
			}
	}
	//================================================================================
	this.getMainHeading = function()
	{
		return p.mainHeading;
	}
	//================================================================================
	this.getSubHeading = function()
	{
		return p.subHeading;
	}
	//================================================================================
	this.getContentHeading = function()
	{
		return p.content;
	}
	//================================================================================
	this.show = function()
	{
		//p.target.show();
		p.target.css("visibility", "visible");
	}
	//================================================================================
	this.hide = function()
	{
		//p.target.hide();
		p.target.css("visibility", "hidden");
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function updateStatusBox()
	{
		$(headDiv).html(p.mainHeading); 
		$(subDiv).html(p.subHeading);
		$(contDiv).html(p.content);
		
		!p.inside ? $(holdDiv).css("height", (p.height - $(headDiv).outerHeight(true) - parseInt($(headDiv).css("margin-top")))+"px") : null;
	}
}
//================================================================================
//================================================================================
//================================================================================
// RADIO BUTTON COMPONENT
var RadioButtonComp = function()
{
	// Default starts ...
	var p = 
	{
		//target:"",
		id:"",
		x:0,
		y:0,
		selectedIndex:0,
		orientation:"v",
		padding:10,
		radioLabelMargin:5,
		fontSize:"1em",
		labelColor:"#000000",
		//labelArr:[] // Array of label texts.
		//width:411,
		enabled:true,
		optionLableArr: [],
		optionRadioArr: [],
		verticalAlign:false,
		labelTextShadow:"none"
	}
	// Default ends ...
	var _thisObj = this;
	var rdContainer, rdDiv, rd_bg, labelDiv;
	var radioArr = new Array();
	var height = globalResizeCalc(29);
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		p.x = globalResizeCalc(p.x);
		p.y = globalResizeCalc(p.y);
		p.padding = globalResizeCalc(p.padding);
		p.radioLabelMargin = globalResizeCalc(p.radioLabelMargin);
		p.width ? p.width = globalResizeCalc(p.width) : null;
		//---------
		var _tDiv = document.createElement("div");
		if(p.target)
		{
			p.target.append(_tDiv);
		}
		else
		{
			$("body").append(_tDiv);
		}
		p.target = $(_tDiv);
		p.visible == false ? p.target.css("display", "none") : null;
		p.index ? p.target.css("z-index", p.index) : null;
		//---------
		p.target.css(
		{
			"position":"absolute",
			"left": p.x+"px",
			"top": p.y+"px",
		});
		//--------------------------
		p.optionLableArr = [];
		p.optionRadioArr = [];
		//--------------------------
		if(p.labelArr.length != 0)
		{
			for(var i=0; i<p.labelArr.length; i++)
			{
				rdContainer = document.createElement("div");
				
				p.target.append(rdContainer);
				rdDiv = document.createElement("div");
				rd_bg = document.createElement("canvas");
				labelDiv = document.createElement("div");
				
				$(rdContainer).append(rdDiv).append(labelDiv);
				$(rdDiv).append(rd_bg);
				
				$(rdDiv).css(
				{
					"display":"table-cell",
					//"vertical-align": "middle",
					"width": Math.round(height) + "px"
				});
				
				rd_bg.width = Math.round(height);
				rd_bg.height = Math.round(height);
				$(rd_bg).css(
				{
					"margin-bottom": globalResizeCalc(-5) + "px"
				});
				$(rd_bg).attr("p_title", p.title ? typeof(p.title) == "object" ? GCTConv(p.title[i]) : GCTConv(p.title) : GetGlobalTooltip("tooltip", "genricClick"));
				
				p.optionRadioArr.push(rd_bg);
				if(p.setXY)
				{
					var _XY = p.setXY[i].split(":");
					$(rdContainer).css(
					{
						"position": "absolute",
						"cursor": "pointer",
						"display":"table",
						"left":globalResizeCalc(_XY[0])+"px",
						"top":globalResizeCalc(_XY[1])+"px",
						"width": p.width+"px"
					});
				}
				else
				{
					$(rdContainer).css(
					{
						"cursor": "pointer",
						"width": p.width+"px",
						"height": height+"px"
					});
					if(p.orientation == "v")
					{
						$(rdContainer).css(
						{
							"display": "table",
							"margin-bottom":p.padding+"px"
						});
					}
					else
					{
						$(rdContainer).css(
						{
							"display": "inline-block",
							"margin-right":p.padding+"px"
						});
					}
				}
				$(rdContainer).attr("data-radiogroup_"+p.id, i);
				radioArr.push($(rdContainer));
				$(labelDiv).css(
				{
					"display":"table-cell",
					//"vertical-align": "middle",
					//"padding-top": "4px",
					"padding-left": p.radioLabelMargin+"px",
					"white-space": "nowrap",
					"font-size":p.fontSize,
					"color":p.labelColor,
					"text-shadow":p.labelTextShadow
				}).html(p.labelArr[i]);
				p.optionLableArr.push(labelDiv);
				
				p.verticalAlign ? $(labelDiv).css("vertical-align","middle") : null;
				
				$(labelDiv).attr("p_title", p.title ? typeof(p.title) == "object" ? GCTConv(p.title[i]) : GCTConv(p.title) : GetGlobalTooltip("tooltip", "genricClick"));
				
				//--------------------------
				this.setEnable(true);
			}
			drawRadioSel();
		}
	}
	//================================================================================
	this.setText = function(strArr,titleArr)
	{
		for(var i = 0; i< strArr.length; i++)
		{
			if(strArr[i])
				$(p.optionLableArr[i]).html(strArr[i]);
			
			if(typeof(titleArr) != "undefined" && titleArr[i])
			{
				$(p.optionLableArr[i]).attr("p_title",GCTConv(titleArr[i]));
				$(p.optionRadioArr[i]).attr("p_title",GCTConv(titleArr[i]));
			}
			else
			{
				$(p.optionLableArr[i]).attr("p_title",GCTConv(GetGlobalTooltip("tooltip", "genricClick")));
				$(p.optionRadioArr[i]).attr("p_title",GCTConv(GetGlobalTooltip("tooltip", "genricClick")));
			}
		}
	}
	//================================================================================
	this.addEventListener = function(_evt, _fun)
	{
		p[_evt] = _fun;
	}
	//================================================================================
	this.setSelected = function(_index)
	{
		p.selectedIndex = _index;
		radioSelChanged();
	}
	//================================================================================
	this.getSelected = function()
	{
		return p.selectedIndex;
	}
	//================================================================================
	this.setLabelColor = function(_col)
	{
		p.labelColor = _col;
		$(labelDiv).css(
		{
			"color":p.labelColor
		});
	}
	//================================================================================
	this.getLabelColor = function()
	{
		return p.labelColor;
	}
	//================================================================================
	this.setEnable = function(_bool, _indArr)
	{
		p.enabled = _bool;
		var _arr = typeof(_indArr) == "undefined" ? radioArr : _indArr;
		for(var i = 0; i < _arr.length; i++)
		{
			var _ind = typeof(_indArr) == "undefined" ? i : _indArr[i];
			if(p.enabled)
			{
				
				if(BrowserDetect.any())
				{
					radioArr[_ind].unbind("touchstart", onRdEvent).bind("touchstart", onRdEvent).unbind("touchend", onWindowEvt).bind("touchend", onWindowEvt);
				}
				else
				{
					radioArr[_ind].unbind("mousedown", onRdEvent).bind("mousedown", onRdEvent);
				}
				radioArr[_ind].unbind("click", onRdEvent).bind("click", onRdEvent);
				radioArr[_ind].css({"cursor": "pointer", "opacity": 1});
			}
			else
			{
				if(BrowserDetect.any())
				{
					radioArr[_ind].unbind("touchstart", onRdEvent).unbind("touchend", onWindowEvt);
				}
				else
				{
					radioArr[_ind].unbind("mousedown", onRdEvent);
				}
				radioArr[_ind].unbind("click", onRdEvent);
				radioArr[_ind].css({"cursor": "default", "opacity": 0.5});
			}
		}
	}
	//================================================================================
	this.getEnable = function()
	{
		return p.enabled;
	}
	//================================================================================
	this.show = function(_arr)
	{
		if(typeof _arr == "undefined")
			p.target.show();
		else
		{
			for(var i in _arr)
			{
				var _ind = Number(_arr[i]);
				$(radioArr[_ind]).show();
			}
		}
	}
	//================================================================================
	this.hide = function(_arr)
	{
		if(typeof _arr == "undefined")
			p.target.hide();
		else
		{
			for(var i in _arr)
			{
				var _ind = Number(_arr[i]);
				$(radioArr[_ind]).hide();
			}
		}
	}//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function onRdEvent(e)
	{
		var _id = $(this).attr("data-radiogroup_"+p.id);
		if(p.selectedIndex != _id)
		{
			if(e.type == "mousedown" || e.type == "touchstart")
			{
				focusOutInput();
				audioPlayerObj.playAudio("down");
				radioArr[_id].find("canvas")[0].down = true;
				drawRadioSel();
				if(e.type == "mousedown")
				{
					$(window).unbind("mouseup", onWindowEvt).bind("mouseup", onWindowEvt);
				}
			}
			else
			{
				p.selectedIndex = _id;
				radioSelChanged();
			}
		}
	}
	//================================================================================
	function onWindowEvt(e)
	{
		audioPlayerObj.playAudio("up");
		for(var i = 0; i < radioArr.length; i++)
		{
			radioArr[i].find("canvas")[0].down = false;
		}
		drawRadioSel();
		$(window).unbind("mouseup", onWindowEvt);
	}
	//================================================================================
	function drawRadioSel()
	{
		for(var i = 0; i < radioArr.length; i++)
		{
			var _cnv = radioArr[i].find("canvas")[0];
			_cnv.width = _cnv.width;
			_cnv.getContext("2d").beginPath();
			_cnv.getContext("2d").arc(_cnv.width / 2,_cnv.height / 2, (_cnv.width / 2) - globalResizeCalc(2), 0, 2*Math.PI);
			_cnv.getContext("2d").fillStyle = _cnv.down ? "rgba(153, 153, 153, 0.6)" : "rgba(255, 255, 255, 0.6)";
			_cnv.getContext("2d").fill();
			_cnv.getContext("2d").lineWidth = globalResizeCalc(4);
			_cnv.getContext("2d").strokeStyle = _cnv.down ? "#545454" : "#999999";
			_cnv.getContext("2d").stroke();
			if(p.selectedIndex == i)
			{
				_cnv.getContext("2d").beginPath();
				_cnv.getContext("2d").arc(_cnv.width / 2,_cnv.height / 2, (_cnv.width / 2) - globalResizeCalc(7), 0, 2*Math.PI);
				_cnv.getContext("2d").fillStyle = "#666666";
				_cnv.getContext("2d").fill();
			}
		}
	}
	//================================================================================
	function radioSelChanged()
	{
		for(var i = 0; i < radioArr.length; i++)
		{
			radioArr[i].find("canvas")[0].down = false;
		}
		drawRadioSel();
		if(p.onRdSelect)
		{
			p.onRdSelect({id:p.id,selected:p.selectedIndex});
		}
	}
}
//================================================================================
//================================================================================
//================================================================================
//=====DROP DOWN COMPONENT=====
var DropDownComp = function()
{
	//=====Default starts=====
	var p = 
	{
		id:"",
		x:50,
		y:0,
		width:200,
		boxHeight:30,
		fontSize:"1em",
		align:"left",
		downwards:true,
		border:true,
		customAlpha:0.6,
		
		paddingTop:10,
		listLeftPadding:18
	}
	
	var DrpDnContainer, tab, indicator, itemCont, lowerHolder, ulParentDiv;
	var curListTop = 0;
	var curSelIndex = 0;
	var innerDivHeight = 0;
	var listArr = new Array();
	var selTxt;
	var _thisObj = this;
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		p.x = globalResizeCalc(p.x);
		p.y = globalResizeCalc(p.y);
		p.width = globalResizeCalc(p.width);
		p.boxHeight = globalResizeCalc(p.boxHeight);
		p.paddingTop = globalResizeCalc(p.paddingTop);
		p.listLeftPadding = globalResizeCalc(p.listLeftPadding);
		typeof(p.bgColor) == "undefined" ? p.bgColor = "rgba(255, 255, 255,"+p.customAlpha+")" : null;
		typeof(p.height) != "undefined" ? p.height = globalResizeCalc(p.height) : null;
		//---------
		var _tDiv = document.createElement("div");
		var updatedWidth = p.width-globalResizeCalc(35);
		if(p.target)
		{
			p.target.append(_tDiv);
		}
		else
		{
			$("body").append(_tDiv);
		}
		p.target = $(_tDiv);
		p.visible == false ? p.target.css("display", "none") : null;
		p.index ? p.target.css("z-index", p.index) : null;
		p.title ? p.target.attr("p_title", GCTConv(p.title)) : null;
		//---------
		p.target.css(
		{
			"position":"absolute",
			"left": p.x+"px",
			"top": p.y+"px",
			"background": "rgba(0, 0, 0,0.2)",
		});
		
		DrpDnContainer = document.createElement("div");
		tab = document.createElement("div");
		indicator = document.createElement("div");
		lowerHolder = document.createElement("div");
		
		ulParentDiv = document.createElement("div");
		itemCont = document.createElement("ul");
		//=====================================================
		p.target.append(DrpDnContainer);
		$(DrpDnContainer).append(tab).append(indicator);
		//=====================================================
		$(DrpDnContainer).css({
			"background":"rgba(255, 255, 255, 0.6)",
			"float":"left",
			"width":p.width+"px",
			"height":"auto",
			"cursor":"pointer"
		});
		p.title ? $(DrpDnContainer).attr("p_title", GCTConv(p.title)) : null;
		//-------------------
		var _bPix = globalResizeCalc(1) < 1 ? 1 : globalResizeCalc(1);
		var tabHeight = p.boxHeight - p.paddingTop*2//globalResizeCalc(20)
		if(p.border)
		{
			p.target.css("box-shadow" , "0px 0px 0px "+globalResizeCalc(3)+"px rgba(255, 255, 255, 0.6) , 0px 0px 0px "+globalResizeCalc(8)+"px rgba(0,0,0,0.2), "+_bPix+"px "+_bPix+"px 0px 0px rgba(0,0,0,0), -"+_bPix+"px -"+_bPix+"px 0px 0px #FFFFFF");
		}
		else
		{
			p.target.css("box-shadow" , "0px 0px 0px "+globalResizeCalc(3)+"px rgba(255, 255, 255, 0.6)")
		}
		
		//-------------------
		//====dropDown container area=====
		$(tab).css({
			"text-align":p.align,
			"background": p.bgColor,
			"box-shadow": _bPix+"px "+_bPix+"px 0px 0px #999999, -"+_bPix+"px -"+_bPix+"px 0px 0px #ffffff",
			"color": "#363336",
			"font-family": "Arial",
			"font-weight": "bold",
			"font-size": p.fontSize,
			"padding":p.paddingTop+"px 0px",
			"padding-left":globalResizeCalc(6)+"px",
			"width":(updatedWidth+globalResizeCalc(6))+"px",
			"float":"left",
			"height":"auto",
			"word-wrap": "break-word"
		});
		p.title ? $(tab).attr("p_title", GCTConv(p.title)) : null;
		//====traingle indicator container=====
		$(indicator).css({
			"float":"right",
			"right":globalResizeCalc(4)+"px",
			"background": "url(../com/images/ddarrow.png) no-repeat "+p.bgColor,
			"background-position":"center",
			"background-size":globalResizeCalc(13)+"px "+globalResizeCalc(8)+"px",
			"box-shadow": _bPix+"px "+_bPix+"px 0px 0px #999999, -"+_bPix+"px -"+_bPix+"px 0px 0px #ffffff",
			"width":  globalResizeCalc(18)+"px",
			"height":  tabHeight+"px"
		});
		p.title ? $(indicator).attr("p_title", GCTConv(p.title)) : null;
		
		//====listDrpDownComponent=====
		
		
		$(lowerHolder).css(
			{
				"position":"absolute",
				"left":"0px",
				/* "top":"100%", */
				"display":"inline-block",
				"width": p.width +"px",
				"background":"rgba(0, 0, 0,0.2)",
				"display":"block"
			});
		
		if(p.border)
		{
			$(lowerHolder).css({
					"box-shadow":" 0px 0px 0px "+globalResizeCalc(8)+"px rgba(0,0,0,0.2)",
					"margin-top":globalResizeCalc(15)+"px",
			});
		}
		else
		{
			$(lowerHolder).css({
					"box-shadow":"0px 0px 0px "+globalResizeCalc(3)+"px rgba(255, 255, 255, 0.6)",
					"margin-top":globalResizeCalc(3)+"px",
			})
		}
		
		
		$(ulParentDiv).css(
			{
				//"float":"left",
				"display":"inline-block",
				"width":p.width,
			});
		
		//p.height ? $(ulParentDiv).css({"height":p.height,"overflow":"hidden","position":"absolute"}) : null;
		p.height ? $(ulParentDiv).css({"height":p.height,"overflow":"hidden"}) : null;
		
		p.target.append(lowerHolder);
		$(lowerHolder).append(ulParentDiv);
		$(ulParentDiv).append(itemCont);
		
		setListItemFn();
		
		if(BrowserDetect.any())
		{
			$(DrpDnContainer).unbind("touchstart", downEvt).bind("touchstart", downEvt);
			$(DrpDnContainer).unbind("touchend", downEvt).bind("touchend", downEvt);
		}
		else
		{
			$(DrpDnContainer).unbind("mousedown", downEvt).bind("mousedown", downEvt);
		}
		$(DrpDnContainer).unbind("click", btnEvt).bind("click", btnEvt);
		
		setTabContainerHt();
		//--------------------------------
		if(p.selectedIndex)
		{
			_thisObj.setSelcetedIndex(p.selectedIndex);
		}
		
		$(lowerHolder).hide();
	}
	
	function setListItemFn()
	{
		if(p.tabItem.length != 0)
		{ 
			$(itemCont).empty();
			
			listArr = new Array();
			
			var containerWidth= p.width;
			containerWidth -= globalResizeCalc(22);
			$(itemCont).css(
			{
				"position":"relative",
				"top":"0px",
				"list-style-type": "none",
				"display":"inline-block",
				"background":"rgba(0, 0, 0,0.2)",
				"width": containerWidth+"px",
				"padding":p.paddingTop/2+"px "+globalResizeCalc(12)+"px "+globalResizeCalc(12)+"px "+globalResizeCalc(12)+"px",
				"margin": "0px",
				"padding": "0px",
				"z-index":100,
				"background":"#fff"
			});
			if(typeof p.height != "undefined")
			{
				$(lowerHolder).css("max-height", p.height+"px");
			}
			var newHeight = 0;
			for(var i=0; i<p.tabItem.length; i++)
			{
				var listIndxComp = document.createElement("li");                        
				$(itemCont).append(listIndxComp);
				$(listIndxComp).attr({
					"data-dropdownid":i,
				});
				$(listIndxComp).css({
					"text-align":p.align,
					"padding":p.paddingTop+"px",
					"background":"#FFFFFF",
					"font-family": "Arial",
					"font-weight": "bold",
					"font-size": p.fontSize,
					"cursor":"pointer",
					"padding-left":p.listLeftPadding+"px",
				});
				
				listArr.push($(listIndxComp));
				$(listIndxComp).unbind('click',onListClick).bind('click',onListClick);
				if(BrowserDetect.any())
				{
					$(listIndxComp).unbind('touchstart', onOptionAud).bind('touchstart',onOptionAud).unbind('touchend', onOptionAud).bind('touchend',onOptionAud);
				}
				else
				{
					$(listIndxComp).unbind('mousedown', onOptionAud).bind('mousedown',onOptionAud);
					$(listIndxComp).unbind('mouseover',onMouseIn).bind('mouseover',onMouseIn);
					$(listIndxComp).unbind('mouseout',onMouseOut).bind('mouseout',onMouseOut);
				}

				$(listIndxComp).html('<span>' + p.tabItem[i] + '</span>');
				if(i == 0)
				{
					$(listIndxComp).css('background','#666').css('color','#fff').addClass('selected');
				}
				newHeight += $(listIndxComp).outerHeight();
			}
			innerDivHeight = newHeight;
			//
			//console.log(p.height + " : " + innerDivHeight)
			if(p.height && (p.height+$(listIndxComp).outerHeight()) < innerDivHeight)
			{
				createSlider();
				$(lowerHolder).css({"height": $(itemCont).height()});
			}
			else
			{
				$(lowerHolder).css({"height": "auto"});
				$(itemCont).css({"width": $(lowerHolder).width()});
			}
			//
		
		}
		//
		
		$(tab).html(p.tabItem[0]);
		selTxt = p.tabItem[0];
	}
	//=================================================================================
	//================================================================================
	var sliderBase, sliderKnob;
	function createSlider()
	{
		sliderBase = document.createElement("div");
		$(lowerHolder).append(sliderBase);
		
		$(sliderBase).css(
		{
			"position":"absolute",
			"right": "0px",
			"top": "0px",
			"width":globalResizeCalc(20)+"px",
			"height":p.height+"px",
			"background": "#E5E5E5",
			"box-shadow": "2px 2px 10px rgba(0,0,0,0.5) inset"
		});
		//------------
		sliderHold = document.createElement("div");
		$(sliderBase).append(sliderHold);
		$(sliderHold).css(
		{
			"position":"absolute",
			"left": globalResizeCalc(5)+"px",
			"top": globalResizeCalc(5)+"px",
			"width":(globalResizeCalc(20) - globalResizeCalc(10))+"px",
			"height":(parseInt($(sliderBase).css("height")) - p.paddingTop)+"px",
		});
		//------------
		sliderKnob = document.createElement("div");
		$(sliderHold).append(sliderKnob);
		$(sliderKnob).css(
		{
			"position":"absolute",
			"left": "0px",
			"top": "0px",
			"width":(globalResizeCalc(20) - globalResizeCalc(10))+"px",
			"height": p.boxHeight + "px", //globalResizeCalc(39)+"px",
			"background": "#FFFFFF",
			"background-size": p.paddingTop+"px "+globalResizeCalc(17)+"px",
			"background-position": "center",
			"box-shadow": "2px 2px 5px rgba(0,0,0,0.5)",
		}).attr("p_title", GetGlobalTooltip("tooltip", "tablescroll"));
		$(sliderKnob).addClass("commongrab");
		$(sliderKnob).draggable(
		{
			"containment": "parent",
			drag:onSlideEvent
		});
		
		if(BrowserDetect.any())
		{
			$(sliderKnob).unbind("touchstart", onDownEvt).bind("touchstart", onDownEvt).unbind("touchend", onDownEvt).bind("touchend", onDownEvt);
		}
		else
		{
			$(sliderKnob).unbind("mousedown", onDownEvt).bind("mousedown", onDownEvt);
		}
		
	}
	//================================================================================
	function onSlideEvent(event, ui)
	{
		var _y = parseInt($(sliderKnob).css("top"));
		var _max = parseInt($(sliderHold).css("height"))- parseInt($(sliderKnob).css("height"));
		var newTop = (innerDivHeight - p.height) *  (_y / _max ) ;
		newTop = Math.abs(newTop)*-1;
		$(itemCont).css("top",newTop)
	}
	//================================================================================
	function onDownEvt(e)
	{
		if(e.type == "mousedown" || e.type == "touchstart")
		{
			focusOutInput();
			addPointerGrabbing(true);
			audioPlayerObj.playAudio("down");
			if(!BrowserDetect.any())
			{
				$(document).unbind("mouseup", onDownEvt).bind("mouseup", onDownEvt);
			}
		}
		else if(e.type == "mouseup" || e.type == "touchend")
		{
			audioPlayerObj.playAudio("up");
			addPointerGrabbing(false);
			$(document).unbind("mouseup", onDownEvt);
		}
	}
	//================================================================================
	this.addEventListener = function(_evt, _fun)
	{
		p[_evt] = _fun;
	}
	this.setStatus = function(bool)
	{
		if(bool)
		{
			if(BrowserDetect.any())
			{
				$(DrpDnContainer).unbind("touchstart", downEvt).bind("touchstart", downEvt);
				$(DrpDnContainer).unbind("touchend", downEvt).bind("touchend", downEvt);
			}
			else
			{
				$(DrpDnContainer).unbind("mousedown", downEvt).bind("mousedown", downEvt);
				$(DrpDnContainer).css('cursor','pointer');
			}
			$(DrpDnContainer).unbind("click", btnEvt).bind("click", btnEvt);
			$(DrpDnContainer).css("opacity", 1);
		}
		else
		{
		   if(BrowserDetect.any())
			{
				$(DrpDnContainer).unbind("touchstart", downEvt);
				$(DrpDnContainer).unbind("touchend", downEvt);
			}
			else
			{
				$(DrpDnContainer).unbind("mousedown", downEvt);
				$(DrpDnContainer).css('cursor','default');
			}
			$(DrpDnContainer).unbind("click", btnEvt);
			$(DrpDnContainer).css("opacity", 0.7);
		}
	}
	//================================================================================
	//===setSelcetedIndex()======================================
	this.setSelcetedIndex = function(indx)
	{
		//console.log(_thisObj.setSelcetedIndex.caller);
		resetIndexItem();
		$(tab).html(p.tabItem[indx]);
		setTabContainerHt();
		curSelIndex = indx;
		selTxt = p.tabItem[indx]
		setListItem(indx);
	}
	//================================================================================
	this.getSelcetedIndex = function()
	{
		return curSelIndex;
	}
	//================================================================================
	this.updateListItem = function(_listArr)
	{
		p.tabItem = [];
		for(var i=0;i<_listArr.length;i++)
		{
		   p.tabItem[i] = _listArr[i];
		}
		$(lowerHolder).show();
		setListItemFn();
		setTabContainerHt();
		$(lowerHolder).hide();
	}
	//================================================================================
	this.show = function()
	{
		p.target.show();
	}
	//================================================================================
	this.hide = function()
	{
		p.target.hide();
	}
	this.setSelectedText = function(_txt)
	{
		selTxt = _txt;
	}
	this.getSelectedText = function()
	{
		return selTxt;
	}
	this.updateCss = function(_css)
	{
		p.target.css(_css);
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function onMouseIn(e)
	{
		$(this).css('background','#666').css('color','#fff');
	}
	//=================================================================================
	function onMouseOut(e)
	{
		if(!$(this).hasClass('selected')){
			$(this).css('background','#fff').css('color','#000');
		}
	}
	//=================================================================================
	function onOptionAud(e)
	{
		if(e.type == "mousedown" || e.type == "touchstart")
		{
			audioPlayerObj.playAudio("down");
			if(e.type == "mousedown")
			{
				$(document).unbind("mouseup", onOptionAud).bind("mouseup", onOptionAud);
			}
		}
		else if(e.type == "mouseup" || e.type == "touchend")
		{
			audioPlayerObj.playAudio("up");
			$(document).unbind("mouseup", onOptionAud);
		}
	}
	//=================================================================================
	function onWindowUp(e)
	{
		if(e.type == "touchstart")
		{
			e.pageX = e.originalEvent.touches[0].pageX;
			e.pageY = e.originalEvent.touches[0].pageY;
		}
		var _xCond = e.pageX < p.target.offset().left || e.pageX > (p.target.offset().left + p.target.outerWidth(true));
		if(p.downwards)
		{
			var _yCond = e.pageY < p.target.offset().top || e.pageY > (p.target.offset().top + p.target.outerHeight(true) + $(lowerHolder).outerHeight(true));
		}
		else
		{
			var _yCond = e.pageY > (p.target.offset().top + p.target.outerHeight(true)) || e.pageY < (p.target.offset().top - $(lowerHolder).outerHeight(true));
		}
		if(_xCond || _yCond)
		{
			//$(itemCont).hide();
			$(lowerHolder).hide();
			$(document).unbind("mousedown", onWindowUp);
			$(document).unbind("touchstart", onWindowUp);
		}
	}
	//=================================================================================
	function downEvt(e)
	{
		var _bPix = globalResizeCalc(1) < 1 ? 1 : globalResizeCalc(1);
		if(e.type == "mousedown" || e.type == "touchstart")
		{
			focusOutInput();
			$(tab).css({
				"background": "#666666",
				"box-shadow": "0px 0px 0px "+_bPix+"px #545454",
				"color": "#FFFFFF",
			});
			//====traingle indicator container=====
			$(indicator).css({
				"background": "url(../com/images/ddarrowdown.png) no-repeat #666666",
				"background-position":"center",
				"background-size":globalResizeCalc(13)+"px "+globalResizeCalc(8)+"px",
				"box-shadow": "0px 0px 0px "+_bPix+"px #545454"
			});
			$(document).unbind("mouseup", downEvt).bind("mouseup", downEvt);
			//=======================
			audioPlayerObj.playAudio("down");
			//=======================
			if(p["downEvt"])
			{
				p["downEvt"](
				{
					id:p["id"]
				});
			}
		}
		else if(e.type == "mouseup" || e.type == "touchend")
		{
			$(document).unbind("mouseup", downEvt);
			$(tab).css({
				"background": p.bgColor,
				"box-shadow": _bPix+"px "+_bPix+"px 0px 0px #999999, -"+_bPix+"px -"+_bPix+"px 0px 0px #ffffff",
				"color": "#363336",
			});
			//====traingle indicator container=====
			$(indicator).css({
				"background": "url(../com/images/ddarrow.png) no-repeat "+p.bgColor,
				"background-position":"center",
				"background-size":globalResizeCalc(13)+"px "+globalResizeCalc(8)+"px",
				"box-shadow": _bPix+"px "+_bPix+"px 0px 0px #999999, -"+_bPix+"px -"+_bPix+"px 0px 0px #ffffff"
			});
			//=======================
			audioPlayerObj.playAudio("up");
			//=======================
		}
	}
	//=================================================================================
	function btnEvt(e)
	{
		setTabContainerHt();
		if($(lowerHolder).css('display') == 'none') //($(itemCont).css('display') == 'none')
		{
			//$(itemCont).show();
			$(lowerHolder).show();
			if(BrowserDetect.any())
			{
				$(document).unbind("touchstart", onWindowUp).bind("touchstart", onWindowUp);
			}
			else
			{
				$(document).unbind("mousedown", onWindowUp).bind("mousedown", onWindowUp);
			}
		}else
		{
			//$(itemCont).hide();
			$(lowerHolder).hide();
			$(document).unbind("touchstart", onWindowUp);
			$(document).unbind("mousedown", onWindowUp);
		}
	}
	//=================================================================================
	function setTabContainerHt()
	{
		if(p.downwards)
		{
			$(lowerHolder).css('top',"100%");
			/*
			if(p.border)
			{
				$(lowerHolder).css('top',($(p.target).height() - globalResizeCalc(0))+'px');
			}
			else
			{
				$(lowerHolder).css('top',($(p.target).height() + globalResizeCalc(6))+'px');
			}
			*/
		}
		else
		{
			$(lowerHolder).css('top',"")
			
			if(p.border)
			{
				$(lowerHolder).css('bottom',(p.target.outerHeight(true) + globalResizeCalc(15))+'px');
			}
			else
			{
				$(lowerHolder).css('bottom',(p.target.outerHeight(true) + globalResizeCalc(5))+'px');
			}
		}
		$(indicator).css('height',($(tab).height()+p.paddingTop*2)+'px');
		
		if($(tab).outerHeight() >= p.boxHeight)
		{
			$(DrpDnContainer).css("height",$(tab).outerHeight()+"px")
		}
		else
		{
			$(DrpDnContainer).css("height",p.boxHeight+"px")
		}
	}
	//=================================================================================
	function onListClick(e)
	{
		var curIndx = $(this).attr('data-dropdownid');
		resetIndexItem();
		$(this).css('background','#666').css('color','#fff');
		$(this).unbind('hover');
		$(tab).html(p.tabItem[curIndx]);
		selTxt = p.tabItem[curIndx];
		curListTop = $(p.target).height();
		setTabContainerHt();
		//$(this).parent().hide();
		$(this).parent().parent().parent().hide();
		//=================================================
		curSelIndex = curIndx;
		if(p["onIndxSelect"])
		{
			p["onIndxSelect"](
			{
				id:p["id"],
				value:curSelIndex
			});
		}
		setListItem(curSelIndex);
		
		if($(tab).outerHeight() >= p.boxHeight)
		{
			$(DrpDnContainer).css("height",$(tab).outerHeight()+"px")
		}
		else
		{
			$(DrpDnContainer).css("height",p.boxHeight+"px")
		}
	}
	//=================================================================================
	function resetIndexItem()
	{
		for(var i=0; i<p.tabItem.length; i++)
		{
			listArr[i].css('background','#fff').css('color','#000');
		}
	}
	//=================================================================================
	function setListItem(index)
	{
		for(var i = 0; i < listArr.length; i++)
		{
			if(i == index)
			{
				listArr[i].css('background','#666').css('color','#fff').addClass('selected');
			}
			else
			{
				listArr[i].removeClass('selected');
			}
		}
	}
}
//================================================================================
//================================================================================
//================================================================================
// TEXT LABEL COMPONENT
var TextLabelComp = function()
{
	
	// Default starts ...
	var p = 
	{
		//target:"",
		x:0,
		y:0,
		//width:600,
		//height:600,
		align:"left",
		html:"",
		color:"#000000",
		border:"1px solid transparent",
		bold:false,
		fontFamily:"inherit",
		fontSize:"1em",
		//mathjax:true // In case you need to enable MathJax. This only supports LaTex.
		bgColor:"",
		paddingTop:0,
		paddingRight:0,
		paddingBottom:0,
		paddingLeft:0,
		color:"",
		emdash:false,
		cursor:"default",
		katex:false,
		//rotation:0
	}
	// Default ends ...
	var _thisObj = this;
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		p.x = globalResizeCalc(p.x);
		p.y = globalResizeCalc(p.y);
		if(p.width)
		{
			p.width = globalResizeCalc(p.width);
		}
		if(p.height)
		{
			p.height = globalResizeCalc(p.height);
		}
		//---------
		p.bold = p.bold ? "bold" : "normal";
		//---------
		var _tDiv = document.createElement("div");
		if(p.target)
		{
			p.target.append(_tDiv);
		}
		else
		{
			$("body").append(_tDiv);
		}
		p.target = $(_tDiv);
		p.visible == false ? p.target.css("display", "none") : null;
		p.index ? p.target.css("z-index", p.index) : null;
		p.title ? p.target.attr("p_title", GCTConv(p.title)) : null;
		//---------
		p.target.attr("id", p.id+"_mathjaxid");
		p.class ? p.target.attr("class", p.class) : null;
		//---------
		p.target.css(
		{
			"position":"absolute",
			"left":p.x+"px",
			"top":p.y+"px",
			"font-family":p.fontFamily,
			"text-align":p.align,
			"font-size":p.fontSize,
			"background":p.bgColor,
			"padding-top":globalResizeCalc(p.paddingTop)+"px",
			"padding-right":globalResizeCalc(p.paddingRight)+"px",
			"padding-bottom":globalResizeCalc(p.paddingBottom)+"px",
			"padding-left":globalResizeCalc(p.paddingLeft)+"px",
			"border":p.border,
			"color":p.color,
			"font-weight":p.bold,
			"cursor":p.cursor
		});
		if(p.border)
		{
			p.target.css({"border": p.border});
		}
		//---------
		if(typeof(p.rotation) != "undefined")
		{
			p.target.css(
			{
				'-webkit-transform-origin':'left center',
				'-ms-transform-origin':'left center',
				'transform-origin':'left center'
			});
		}
		//---------
		if(p.width)
		{
			p.target.css("width", p.width+"px");
		}
		if(p.height)
		{
			p.target.css("height", p.height+"px");
		}
		//---------
		this.setText(p.html);
	}
	//================================================================================
	this.setText = function(_html)
	{
		if(typeof(p.rotation) != "undefined")
		{
			p.target.css(
			{
				'-webkit-transform':'rotate(0deg)',
				'-ms-transform':'rotate(0deg)',
				'transform':'rotate(0deg)'
			});
		}
		p.html = p.emdash ? _html.replace(/-/g, "&ndash;") : _html;
		
		if(String(p.html).indexOf("localMJ_i") != -1 || String(p.html).indexOf("localMJ_n") != -1)
		{
			p.target.css("margin-top", "-"+globalResizeCalc(5)+"px");
		}
		else
		{
			p.target.css("margin-top", "auto");
		} 
		p.target.html(p.html);
		if(String(_html).indexOf("\\begin{equation}") != -1)
		{
			if (p.katex) 
			{
				printKatex(p.target[0], _html)
				$("#"+p.id+"_mathjaxid"+" .katex").css("font-weight",p.bold);
			} 
			else 
			{
				p.target.css({
				"padding-top": "0px",
				"opacity": 0
				});
				var mjObj = MathJax.Hub.getAllJax(p.id + "_mathjaxid")[0],
				mjHubParam = mjObj ? ["Text", mjObj, _html] : ['Typeset', MathJax.Hub, p.id + '_mathjaxid'];
				/* if(!mjObj)
				{
				p.target.html(p.html);
				} */
				MathJax.Hub.Queue(mjHubParam, p.id + "_mathjaxid", function() {
				var mjD = p.target.children(".MathJax_Display");
				if (mjD && $(p.target).text().indexOf('\\') != 0) {
				mjD.css("text-align", p.align);
				p.target.css("opacity", 1);
				}
				});
			}
		}
		else
		{
			//p.target.html(p.html); 
			p.target.css(
			{
				"padding-top":globalResizeCalc(p.paddingTop)+"px",
			});
		}
		if(typeof(p.rotation) != "undefined")
		{
			p.target.css(
			{
				"left":(p.x + (p.target.outerWidth(true) / 2))+"px",
				"top":(p.y + (p.target.outerWidth(true) / 2))+"px",
				'-webkit-transform':'rotate('+p.rotation+'deg)',
				'-ms-transform':'rotate('+p.rotation+'deg)',
				'transform':'rotate('+p.rotation+'deg)'
			});
		}
	}
	//================================================================================
	this.getTextOnly = function(_html)
	{
		return p.target.text();;
	}
	//================================================================================
	this.getText = function(_html)
	{
		return p.html;
	}
	//================================================================================
	this.setColor = function(_col)
	{
		p.color = _col;
		p.target.css("color", p.color);
	}
	//================================================================================
	/* this.getStyle = function()
	{
		return p.target.attr("style").split(";");
	} */
	//================================================================================
	this.setStyle = function(_val)
	{
		p.target.css(_val);
	}
	//================================================================================
	this.show = function()
	{
		p.target.show();
	}
	//================================================================================
	this.hide = function()
	{
		p.target.hide();
	}
	//================================================================================
	this.enable = function()
	{
		p.target.css("opacity", 1);
	}
	//================================================================================
	this.disable = function()
	{
		p.target.css("opacity", 0.5);
	}
}
//================================================================================
//================================================================================
//================================================================================
// IMAGE COMPONENT
var ImageComp = function()
{
	// Default starts ...
	var p = 
	{
		//target:"",
		x:0,
		y:0,
		//width:600,
		//height:600,
		type:"img",//(img/div)
		backgroundFit:false,
		clickable:false
	}
	// Default ends ...
	var _thisObj = this;
	var _div;
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		p.x = globalResizeCalc(p.x);
		p.y = globalResizeCalc(p.y);
		if(p.width)
		{
			p.width = globalResizeCalc(p.width);
		}
		if(p.height)
		{
			p.height = globalResizeCalc(p.height);
		}
		//---------------------
		_div = document.createElement(p.type);
		if(p.target)
		{
			p.target.append(_div);
		}
		else
		{
			$("body").append(_div);
		}
		//---------------------
		p.target = $(_div);
		p.target.css(
		{
			"position":"absolute",
			"left":p.x+"px",
			"top":p.y+"px"
		}).attr("titleId", p.id);
		p.type == "img" ? p.target.attr("draggable", "false") : null;
		!p.clickable ? p.target.css({"pointer-events":"none"}) : null;
		//---------------------
		p.visible == false ? p.target.css("display", "none") : null;
		p.index ? p.target.css("z-index", p.index) : null;
		p.title ? p.target.attr("p_title", GCTConv(p.title)) : null;
		//---------------------
		if(p.width)
		{
			p.target.css("width", p.width+"px");
		}
		if(p.height)
		{
			p.target.css("height", p.height+"px");
		}
		if(p.class)
		{
			p.target.attr({
				'class':p.class,
			});
		}
		//---------------------------
		if(p.type == "img")
		{
			if(p.src)
			{
				p.target.attr("src", p.src);
			}
			else if(p.txtsrc)
			{
				p.target.attr("src", gizmoImageObj[p.txtsrc].src);
			}
		}
		else
		{
			if(p.src)
			{
				p.target.css({"background": "url("+p.src+") no-repeat"});
			}
			else if(p.txtsrc)
			{
				p.target.css({"background": "url("+gizmoImageObj[p.txtsrc].src+") no-repeat"});
			}
			p.target.css({"background-size": "100% 100%"});
		}
	}
	//================================================================================
	this.getElem = function()
	{
		return p.target;
	}
	//================================================================================
	this.getId = function()
	{
		return p.id;
	}
	//================================================================================
	this.setSource = function(arg)
	{
		if(p.type == "img")
		{
			p.target.attr("src", arg);
		}
		else
		{
			p.target.css(
			{
				"background": "url("+arg+") no-repeat",
				"background-size":"100% 100%"
			});
		}
	}
	//================================================================================
	this.setTxtSource = function(arg)
	{
		if(p.type == "img")
		{
			p.target.attr("src", gizmoImageObj[arg].src);
		}
		else
		{
			p.target.css({"background": "url("+gizmoImageObj[arg].src+") no-repeat"});
		}
	}
	//================================================================================
	this.animStart = function(type,duration,animProp,easing,callBack)
	{
		callBack = typeof(callBack) == "undefined" ? function(){} : callBack;
		if(type == "fadeIn" || type == "fadeOut")
		{
			p.target[type](duration,callBack);
		}
		else if(type == "animate")
		{
			easing = typeof(easing) == "undefined" ? "linear" : easing;
			p.target[type](animProp,duration,easing,callBack);
		}
	}
	//================================================================================
	this.animStop = function(clearQueue,jumpToEnd)
	{
		clearQueue = typeof(clearQueue) == "undefined" ? false : clearQueue;
		jumpToEnd = typeof(jumpToEnd) == "undefined" ? false : jumpToEnd;
		p.target.stop(clearQueue,jumpToEnd);
	}
	//================================================================================
	this.show = function()
	{
		p.target.show();
	}
	//================================================================================
	this.hide = function()
	{
		p.target.hide();
	}
	//================================================================================
	this.setPosition = function(_posObj){
		p.target.css({
			"position":"absolute",
			"left":_posObj.x+"px",
			"top":_posObj.y+"px"
		});
	}
	//================================================================================
	this.setTitle = function(_title)
	{
		
		p.target.attr("p_title",GCTConv(_title));
	}
}
//================================================================================
//================================================================================
//================================================================================
// TRACE PAD TOOL
//================================================================================
// TRACE PAD TOOL
//================================================================================
var TracePad = function()
{
	// Default starts ...
	var p = 
	{
		id:"tracePadComp",
		x:0, y:0,
		width:300, height:300,
		border:false,
	}
	// Default ends ...
	var _thisObj = this;
	var canvas, context;
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		p.x = globalResizeCalc(p.x);
		p.y = globalResizeCalc(p.y);
		p.width = globalResizeCalc(p.width);
		p.height = globalResizeCalc(p.height);
		//----------------
		canvas = document.createElement("canvas");
		context = canvas.getContext("2d");
		//----------------
		if(p.target)
		{
			p.target.css(
			{
				"position":"absolute",
			});
			//----------------
			p.target.append(canvas);
			//---------------------------------
			createBaseCanvas();
		}
		
		if(BrowserDetect.any())
		{
			$(canvas).unbind("touchstart", mouseEvent).bind("touchstart", mouseEvent);
			$(canvas).unbind("touchmove", mouseEvent).bind("touchmove", mouseEvent);
			$(canvas).unbind("touchend", mouseEvent).bind("touchend", mouseEvent);
			$(window).unbind("touchmove", mouseEvent).bind("touchmove", mouseEvent);			
		}
		else
		{
			//......................
			$(canvas).unbind("mousedown", mouseEvent).bind("mousedown", mouseEvent);
			$(canvas).unbind("mousemove",mouseEvent).bind("mousemove",mouseEvent);
			$(canvas).unbind("mouseover",mouseEvent).bind("mouseover",mouseEvent);
			$(canvas).unbind("mouseout",mouseEvent).bind("mouseout",mouseEvent);
			$(canvas).unbind("mouseup",mouseEvent).bind("mouseup",mouseEvent);
		}
	
	}
	//================================================================================
	this.show = function()
	{
		$(canvas).show();
	}
	//================================================================================
	this.hide = function()
	{
		$(canvas).hide();
	}
	//================================================================================
	this.addTitle = function(_title)
	{
		if(typeof(_title) == "undefined" || _title == "")
		{
			$(canvas).removeAttr("p_title");
		}
		else
		{
			$(canvas).attr("p_title", _title);
		}
	}
	//================================================================================
	this.addEventListener = function(_evt, _fun)
	{
		p[_evt] = _fun;
	}
	//================================================================================
	this.removeEventListener = function(_evt)
	{
		delete p[_evt];
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function createBaseCanvas()
	{
		canvas.width = p.width;
		canvas.height = p.height;
		$(canvas).css(
		{
			"position": "absolute",
			"left": p.x+"px",
			"top": p.y+"px",
			"background-color":p.bgColor,
			"box-shadow":p.bgShadow
		}).attr("id", "canvas_"+p.id);
		p.index ? $(canvas).css("z-index", p.index) : null;
		p.visible == false ? p.target.css("display", "none") : null;
		p.border ? $(canvas).css("border", "0.1em solid red") : null; 
	}
	
	//================================================================================
	//================================================================================
	var checkForMouseOut = false;
	var isMouseDown = false;
	var prevX,prevY;
	var prevPageX,prevPageY;
	function mouseEvent(e)
	{
		var flag = false;
		if(e.type == "touchstart" || e.type == "touchmove")
		{
			e.pageX = e.originalEvent.touches[0].pageX;
			e.pageY = e.originalEvent.touches[0].pageY;
			prevPageX = e.pageX;
			prevPageY = e.pageY;
		}
		if(e.type == "touchend")
		{
			e.pageX = prevPageX;
			e.pageY = prevPageY;
		}
		var mouseX = e.pageX - $(canvas).offset().left;
		var mouseY = e.pageY - $(canvas).offset().top;
		
		if(e.type == "mousedown" || e.type == "touchstart" )
		{
			prevX = mouseX;
			prevY = mouseY;
			
			focusOutInput();
			if(!BrowserDetect.any())
			{
				$(canvas).unbind("mousemove",mouseEvent);
				$(window).unbind("mousemove",mouseEvent).bind("mousemove",mouseEvent);
				$(window).unbind("mouseup",mouseEvent).bind("mouseup",mouseEvent);
			}
			checkForMouseOut = false;
			isMouseDown = true;
			e.type = "mousedown";
		}
		else if(e.type == "mousemove" || e.type == "touchmove")
		{
			if(prevX == mouseX && prevY == mouseY)
				flag = true;
			e.type = "mousemove";
			
			if((mouseX < 0 || mouseX > p.width || mouseY < 0 || mouseY > p.height) && !checkForMouseOut && isMouseDown)
			{
				checkForMouseOut = true;
				e.type = "mouseout";
			}
			if(mouseX >= 0 && mouseX <= p.width && mouseY >= 0 && mouseY <= p.height && checkForMouseOut && isMouseDown)
			{
				checkForMouseOut = false;
				e.type = "mouseover";
			}
		}
		else if(e.type == "mouseup" || e.type == "touchend" )
		{
			checkForMouseOut = false;
			isMouseDown = false;
			if(!BrowserDetect.any())
			{
				$(window).unbind("mouseup",mouseEvent);
				$(window).unbind("mousemove",mouseEvent);
				$(canvas).unbind("mousemove",mouseEvent).bind("mousemove",mouseEvent);
			}
			e.type = "mouseup";
		}
		e.x = mouseX;
		e.y = mouseY;
		e.id = p.id;
		
		if(!flag)
			(p.mouseEvent) ? p.mouseEvent(e) : null;
				
		e.preventDefault();
	}
}
//================================================================================
//================================================================================
//To create a child from the given parents
//================================================================================
var BreedingFormula = function(){
    this.createChild=function(parent1, parent2){
        var c = new Object();
        var combineColor = parent1.getFurColor()+parent2.getFurColor();
//        trace("combineColor : "+combineColor);
        var combineEye = parent1.getEyeColor()+parent2.getEyeColor();
//        trace("combineEye : "+combineEye);
        c.color1 = String(combineColor).charAt(parseInt(getRandomNum(0,1)));
//        trace("charCodeAt1 "+c.color1.charCodeAt(0))
        c.color2 = String(combineColor).charAt(2+parseInt(getRandomNum(0,1)));
//        trace("charCodeAt2 "+c.color2.charCodeAt(0))
        //check for f comes before F then swap it
        if(parseInt(c.color1.charCodeAt(0)) > parseInt(c.color2.charCodeAt(0))){
            var temp = c.color1;
            c.color1 = c.color2;
            c.color2 = temp;
        }
        c.color = c.color1+c.color2;
//        trace("Color "+c.color);
        
        var combineEye = parent1.getEyeColor()+parent2.getEyeColor();
        c.eye1 = String(combineEye).charAt(parseInt(getRandomNum(0,1)));
        c.eye2 = String(combineEye).charAt(2+parseInt(getRandomNum(0,1)));
        //check for e comes before E then swap it
        if(parseInt(c.eye1.charCodeAt(0)) > parseInt(c.eye2.charCodeAt(0))){
            var temp = c.eye1;
            c.eye1 = c.eye2;
            c.eye2 = temp;
        }
        c.eye = c.eye1+c.eye2;
//        trace("Eye "+c.eye);
        
        var type1Counter=0, type2Counter=0, type3Counter=0, type4Counter=0;
        switch(c.color){
            case 'FF':
                switch(c.eye){
                    case 'EE':
                        c.mouseType = 'mouse_1';
                        type1Counter++;
                      break;
                    case 'ee':
                       c.mouseType = 'mouse_2';
                       type2Counter++;
                      break;
                    case 'Ee':
                        c.mouseType = 'mouse_1';
                        type1Counter++;
                       break;
                }
                break;
            case 'ff':
                switch(c.eye){
                    case 'EE':
                        c.mouseType = 'mouse_3';
                        type3Counter++;
                      break;
                    case 'ee':
                        c.mouseType = 'mouse_4';
                        type4Counter++;
                      break;
                    case 'Ee':
                        c.mouseType = 'mouse_3';
                        type3Counter++;
                       break;
                }
                break;
            case 'Ff':
                switch(c.eye){
                    case 'EE':
                        c.mouseType = 'mouse_1'; 
                        type1Counter++;
                      break;
                    case 'ee':
                        c.mouseType = 'mouse_2';
                        type2Counter++;
                      break;
                    case 'Ee':
                        c.mouseType = 'mouse_1';
                        type1Counter++;
                       break;
                }
                break;
        }
        c.children = type1Counter+" "+type2Counter+" "+type3Counter+" "+type4Counter;
//        trace("type1Counter "+type1Counter+" type2Counter "+type2Counter+" type3Counter "+type3Counter+" type4Counter "+type4Counter);
        return c;
    }
    
}
//================================================================================
// POPUP COMPONENT
var PopUpComp = function()
{
	// Default starts ...
	var p = 
	{
		"target":"body",
		"id":"popUp",
		"x":250,
		"y":250,
		"text":"Please put your test here.",
		"width":250,
		"height":250, 
		"textAlign":"center",
		"fontSize":"0.85em",
		"paddingTop":5,
		"paddingLeft":5,
		"pointerDir":4,
		"pointerPos":"middle",
		"pointerSize":100,
		"index":1,
		"pointerRadius":10,
		
		"bg":"#ff0",
		"border":"0.1em solid #999",
		"shadow":"rgba(0, 0, 0, 0.5) 3px 3px 5px",
		
		"pointerLineWidth":2,
		"pointerLineColor":"rgb(0,0,0)",
		"pointerFillColor":"rgb(255,255,0)",
		"pointedHead":false

	}
	// Default ends ...
	var _thisObj = this;
	var containerDiv,msgWin,pointerDiv;
	var topPad = 20;
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		//----------------------------------
		p.x = globalResizeCalc(p.x);
		p.y = globalResizeCalc(p.y);
		p.width = globalResizeCalc(p.width);
		p.height = globalResizeCalc(p.height);
		p.paddingLeft = globalResizeCalc(p.paddingLeft);
		p.paddingTop = globalResizeCalc(p.paddingTop);
		
		p.pointerPos = !isNaN(p.pointerPos) ? globalResizeCalc(p.pointerPos) : p.pointerPos;
		p.pointerSize = globalResizeCalc(p.pointerSize);
		p.pointerRadius = globalResizeCalc(p.pointerRadius);
		p.pointerLineWidth = globalResizeCalc(p.pointerLineWidth);
		
		
		containerDiv = document.createElement("div");
		
		msgWin = document.createElement("div");
		pointerDiv = document.createElement("canvas");
		
		$(p.target).append(containerDiv);
		
		$(containerDiv).append(msgWin);
		$(containerDiv).append(pointerDiv);
		
		$(containerDiv).css({
			"position":"absolute",
			"left":p.x+"px",
			"top":p.y+"px",
			"z-index":p.index,
			"cursor":"default",
		});
		
		$(msgWin).css(
		{
			"position": "absolute",
			"left":"0px",
			"top":"0px",
			"font-size": p.fontSize,
			"text-align": p.textAlign,
			"width":p.width,
			"padding": p.paddingLeft+"px "+p.paddingTop+"px",
			"background":p.bg,
			"border":p.border,
			"box-shadow":p.shadow,
			"display": "inline-block",
			"z-index":1
		}).text(p.text);
		createUI()
	}
	function createUI()
	{
		var pointerLeft = 0,pointerTop = 0;
		var rotateVal = 0;
		
		var cntx = pointerDiv.getContext('2d');
		cntx.beginPath();
		var pointerVal = p.pointerRadius*2 + p.pointerLineWidth*2;
		switch(Number(p.pointerDir))
		{
			case 1:
					pointerDiv.width = p.pointerSize;
					pointerDiv.height = pointerVal;
					pointerDiv.width = pointerDiv.width;
					pointerLeft = p.pointerSize * -1;
					
					if(isNaN(p.pointerPos))
					{
						switch(p.pointerPos)
						{
							case "middle":
										pointerTop = $(msgWin).outerHeight()/2 - pointerDiv.height/2 ; 
								break;
							case "start":
										pointerTop = -pointerDiv.height/2 + p.pointerLineWidth/2;
								break;
							case "end":
										pointerTop = $(msgWin).outerHeight() - pointerDiv.height/2 - p.pointerLineWidth/2;
								break;
						}
					}
					else
					{
						pointerTop = p.pointerPos;
					}
					
					cntx.moveTo((p.pointerRadius+p.pointerLineWidth),(pointerDiv.height/2));
					cntx.lineTo(pointerDiv.width,(pointerDiv.height/2));
					cntx.moveTo((p.pointerRadius+p.pointerLineWidth),(pointerDiv.height/2)); 
					if(p.pointedHead)
					{
						drawArrow(cntx,{x:pointerDiv.width,y:(pointerDiv.height/2)},{x:(p.pointerRadius+p.pointerLineWidth),y:(pointerDiv.height/2)})
					}
					else
					{
						cntx.arc((p.pointerRadius+p.pointerLineWidth),(pointerDiv.height/2), p.pointerRadius, 0, 2*Math.PI);
					}
				break;
			case 2:
					pointerDiv.width = pointerVal;
					pointerDiv.height = p.pointerSize;
					pointerDiv.width = pointerDiv.width;
					if(isNaN(p.pointerPos))
					{
						switch(p.pointerPos)
						{
							case "middle":
										pointerLeft = $(msgWin).outerWidth()/2 - pointerDiv.width/2 ; 
								break;
							case "start":
										pointerLeft = -pointerDiv.width/2 + p.pointerLineWidth/2;
								break;
							case "end":
										pointerLeft = $(msgWin).outerWidth() - pointerDiv.width/2 - p.pointerLineWidth/2;
								break;
						}
					}
					else
					{
						pointerLeft = p.pointerPos;
					}
					//pointerLeft = p.pointerPos;
					pointerTop = p.pointerSize * -1 + globalResizeCalc(1);
					
					
					cntx.moveTo((pointerDiv.width/2),p.pointerRadius+p.pointerLineWidth);
					cntx.lineTo((pointerDiv.width/2),pointerDiv.height);
					cntx.moveTo((pointerDiv.width/2),(p.pointerRadius+p.pointerLineWidth));
					if(p.pointedHead)
					{
						drawArrow(cntx,{x:(pointerDiv.width/2),y:pointerDiv.height},{x:(pointerDiv.width/2),y:(p.pointerRadius+p.pointerLineWidth)})
					}
					else
					{
						cntx.arc((pointerDiv.width/2),(p.pointerRadius+p.pointerLineWidth), p.pointerRadius, 0, 2*Math.PI);
					}
				break;
			case 3:
					
					pointerDiv.width = p.pointerSize;
					pointerDiv.height = pointerVal;
					pointerDiv.width = pointerDiv.width;
					if(isNaN(p.pointerPos))
					{
						switch(p.pointerPos)
						{
							case "middle":
										pointerTop = $(msgWin).outerHeight()/2 - pointerDiv.height/2; 
								break;
							case "start":
										pointerTop = pointerDiv.height/2 + p.pointerLineWidth/2;
								break;
							case "end":
										pointerTop = $(msgWin).outerHeight() - pointerDiv.height/2 - p.pointerLineWidth/2;
								break;
						}
					}
					else
					{
						pointerTop = p.pointerPos;
					}
					
					pointerLeft = p.width ;
					cntx.moveTo((pointerDiv.width-p.pointerRadius-p.pointerLineWidth),(pointerDiv.height/2));
					cntx.lineTo(0,(pointerDiv.height/2));
					cntx.moveTo((pointerDiv.width-p.pointerRadius-p.pointerLineWidth),(pointerDiv.height/2));
					if(p.pointedHead)
					{
						drawArrow(cntx,{x:0,y:(pointerDiv.height/2)},{x:(pointerDiv.width-p.pointerRadius-p.pointerLineWidth),y:(pointerDiv.height/2)})
					}
					else
					{
						cntx.arc((pointerDiv.width-p.pointerRadius-p.pointerLineWidth),(pointerDiv.height/2), p.pointerRadius, 0, 2*Math.PI);
					}
				break;
			case 4:
					
					
					
					pointerDiv.width = pointerVal;
					pointerDiv.height = p.pointerSize;
					pointerDiv.width = pointerDiv.width;
					if(isNaN(p.pointerPos))
					{
						switch(p.pointerPos)
						{
							case "middle":
										pointerLeft = $(msgWin).outerWidth()/2 - pointerDiv.width/2 - p.pointerLineWidth/2; 
								break;
							case "start":
										pointerLeft = -pointerDiv.width/2 + p.pointerLineWidth/2;
								break;
							case "end":
										pointerLeft = $(msgWin).outerWidth() - pointerDiv.width/2 - p.pointerLineWidth/2;
								break;
						}
					}
					else
					{
						pointerLeft = p.pointerPos;
					}
					pointerTop = $(msgWin).outerHeight();
					
					cntx.moveTo((pointerDiv.width/2),(pointerDiv.height - p.pointerRadius-p.pointerLineWidth));
					cntx.lineTo((pointerDiv.width/2),0);
					cntx.moveTo((pointerDiv.width/2),(pointerDiv.height - p.pointerRadius-p.pointerLineWidth));
					if(p.pointedHead)
					{
						drawArrow(cntx,{x:(pointerDiv.width/2),y:0},{x:(pointerDiv.width/2),y:(pointerDiv.height - p.pointerRadius-p.pointerLineWidth)})
					}
					else
					{
						cntx.arc((pointerDiv.width/2),(pointerDiv.height - p.pointerRadius-p.pointerLineWidth), p.pointerRadius, 0, 2*Math.PI);
					}
				break;
		}
		
		
		cntx.lineWidth = p.pointerLineWidth;
		cntx.lineCap = "round";
		cntx.strokeStyle = p.pointerLineColor;
		cntx.stroke();
		cntx.fillStyle = p.pointerFillColor;
		cntx.fill();
		
		cntx.closePath();
		$(pointerDiv).css(
		{
			"position":"absolute",
			"left":pointerLeft,
			"top":pointerTop,
		});
	}
	//================================================================================
	function drawArrow(ctx,start,end)
	{
		var _angle = Maths.getAngle(start,end,true);
		var _angle_1 = _angle + (45)*Maths.TO_RADIANS;
		var _angle_2 = _angle - (45)*Maths.TO_RADIANS;
		
		var p1 = Maths.getPoint(end,(_angle+Math.PI),p.pointerRadius-p.pointerLineWidth);
		var p2 = Maths.getPoint(end,_angle_1,p.pointerRadius*0.75);
		var p3 = Maths.getPoint(end,_angle_2,p.pointerRadius*0.75);
		
		ctx.moveTo(p1.x,p1.y);
		ctx.lineTo(p2.x,p2.y);
		ctx.lineTo(end.x,end.y);
		ctx.lineTo(p3.x,p3.y);
		ctx.lineTo(p1.x,p1.y);
	}
	//================================================================================
	this.show = function(_msg)
	{
		$(containerDiv).show();
	}
	//================================================================================
	this.hide = function()
	{
		$(containerDiv).hide();
	}
	//================================================================================
	this.setText = function(_data)
	{
		$(msgWin).text(_data);
	}
	//================================================================================
	this.addEventListener = function(_evt, _fun)
	{
		p[_evt] = _fun;
	}
	//================================================================================
	this.setStyle = function(_val)
	{
		$(p.target).css(_val);
	}
	//================================================================================
	this.updateVals = function(_obj)
	{
		
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		createUI()
	}
}
//================================================================================






//================================================================================
// Local Replacement For MathJax (Fractions)
//================================================================================
	
var FractionLabel = function()
{
	
	// Default starts ...
	var p = 
	{
		x:0,
		y:0,
		align:"left",
		html:"",
		border:"none",
		bold:false,
		fontFamily:"inherit",
		fontSize:"1em",
		bgColor:"",
		paddingTop:0,
		marginLeft:10,
		lineSize:"0.1em",
		fractionPading:"0.05em",
		minHeight:50,
		fractionPaddingLR:0,
		htmlArr:[],
		/* wholeDivWidth:15,
		fractDivWidth:100, */
	}
	// Default ends ...
	var _thisObj = this;
	var defaultColor = "black";
	var _tDiv,_innerDiv;
	
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		p.x = globalResizeCalc(p.x);
		p.y = globalResizeCalc(p.y);
		p.marginLeft = globalResizeCalc(p.marginLeft);
		p.fractionPaddingLR = globalResizeCalc(p.fractionPaddingLR);
		p.minHeight ? p.minHeight = globalResizeCalc(p.minHeight) : null;
		p.fractDivWidth ? p.fractDivWidth = globalResizeCalc(p.fractDivWidth) : null;
		p.wholeDivWidth ? p.wholeDivWidth = globalResizeCalc(p.wholeDivWidth) : null;
		if(p.width)
		{
			p.width = globalResizeCalc(p.width);
		}
		if(p.height)
		{
			p.height = globalResizeCalc(p.height);
		}
		//---------
		p.bold = p.bold ? "bold" : "normal";
		//---------
		_tDiv = document.createElement("div");
		_innerDiv = document.createElement("div");
		$(_innerDiv).append(_tDiv);
		p.target ? p.target.append(_innerDiv) : $("body").append(_innerDiv);
		p.target = $(_innerDiv);
		p.visible == false ? p.target.css("display", "none") : null;
		p.index ? p.target.css("z-index", p.index) : null;
		p.title ? p.target.attr("p_title", GCTConv(p.title)) : null;
		//---------
		p.target.attr("id", p.id);
		//p.class ? p.target.attr("class", p.class) : null;
		//---------
		p.target.css(
		{
			"position":"absolute",
			"left":p.x+"px",
			"top":p.y+"px",
			"font-family":p.fontFamily,
			"text-align":p.align,
			"font-weight":p.bold, 
			"font-size":p.fontSize,
			"cursor":"default"
		});
		if(p.border)
		{
			p.target.css({"border": p.border});
		}
		//---------
		if(p.bgColor)
		{
			p.target.css({"background": p.bgColor});
		}
		//---------
		if(p.width)
		{
			p.target.css("width", p.width+"px");
		}
		if(p.height)
		{
			p.target.css("height", p.height+"px");
		}
		//---------
		if(p.align == "right")
		{
			$(_tDiv).css({
				"position":"absolute",
				"right":"0px"
			})
		}
		else if(p.align == "center")
		{
			$(_tDiv).css({
				"position":"relative",
				"margin":"0 auto",
				"display":"inline-block"
			})
		}
		
		//---------
		this.setText(p.html);
	}
	//================================================================================
	
	
	this.setText = function(_html)
	{
		$(_tDiv).empty();
		p.htmlArr = [];
		var _tempInnerDiv = document.createElement("div");
		
		$(_tDiv).append(_tempInnerDiv);
		$(_tempInnerDiv).css({"width":"auto","display":"table"});
		$(_tempInnerDiv).css("height","0px");
		p.minHeight ? $(_tempInnerDiv).css("min-height",p.minHeight) : null;
		if(_html)
		{
			p.html = p.emdash ? _html.replace(/-/g, "&ndash;") : _html;
			
			var arr = p.html.split("~|");
			
			for(var i = 0; i < arr.length; i++)
			{
				var tempNum = tempDeno = _tempDiv = undefined;
				var tempColor = getStrValue(arr[i],"~color|","|color~")
				if(tempColor)
				{
					defaultColor = tempColor;
					arr[i] = arr[i].split("|color~")[1];
				}
				
				_tempDiv = document.createElement("div");
				
				if(arr[i].indexOf("~frac") != -1)
				{
					$(_tempDiv).addClass(p.id+"fraction");
					var split = arr[i].split("~frac")
					if( split.length == 2 )
					{
						tempNum = document.createElement("span");
						$(tempNum).html(split[0]).addClass(p.id+'top');
						tempDeno = document.createElement("span");
						$(tempDeno).html(split[1]).addClass(p.id+'bottom');
						
						p.fractDivWidth ? $(tempDeno).css("width",p.fractDivWidth) : null;
						
						$(_tempDiv).append(tempNum).append(tempDeno);
					}
					
					p.htmlArr.push({n:$(tempNum).text(),d:$(tempDeno).text()})
				}
				else
				{
					$(_tempDiv).html(arr[i]);
					$(_tempDiv).addClass(p.id+"Whole");
					p.htmlArr.push({w:$(_tempDiv).text()});
					p.wholeDivWidth ? $(_tempDiv).css("width",p.wholeDivWidth) : null;
				}
				$(_tempInnerDiv).append(_tempDiv);
				
				if(defaultColor)
				{
					$(_tempDiv).css({
						"display":"table-cell",
						"color":defaultColor+" !important",
					})
					if(arr[i].indexOf("~frac") != -1)
					{
						$(tempNum).css({
							"color": defaultColor +" !important",
						})
						$(tempDeno).css({
							"border-top": p.lineSize+" solid "+defaultColor,
							"color":defaultColor +" !important",
						});
					}
				}
			}
			
			var tempHeight = $("."+p.id+"fraction").outerHeight(true)*2.2
			$("."+p.id+"Whole").css({
				/* "float":"left", */
				/* "line-height":tempHeight+"px" */
				"vertical-align":"middle",
				"word-break":"normal"
			})
			$("."+p.id+"fraction").css(
			{
				/* "float":"left", */
				"display": "inline-block",
				"text-align": "center",
				"margin":p.lineSize+" " +p.marginLeft+"px",
				"font-weight": p.bold,
				"box-sizing":"border-box",
				"word-break":"normal"
			});
			$("."+p.id+"top").css(
			{
				"display":"inline-block",
				"padding-bottom":p.fractionPading,
				"word-break":"normal"
			});
			p.topColor ? $("."+p.id+"top").css({"color":p.topColor}) : null;
			
			$("."+p.id+"bottom").css({
				"padding-top":p.fractionPading,
				"padding-left":p.fractionPaddingLR,
				"padding-right":p.fractionPaddingLR,
				"display":"block",
				"word-break":"normal"
			});	
			p.barColor ? $("."+p.id+"bottom").css({"border-top": p.lineSize+" solid "+p.barColor}) : null;
			p.bottomColor ? $("."+p.id+"bottom").css({"color":p.bottomColor}) : null;
			
			$(_tDiv).css(
			{
				"padding-top":globalResizeCalc(p.paddingTop)+"px",
			});
			if(p.align == "center")
			{
				//var widthTempInner = $(_tempInnerDiv)[0].offsetWidth;
				//$(_tDiv).css("width",widthTempInner)
			}
		}
	}
	
	//================================================================================
	
	this.getValue = function ()
	{
		return p.htmlArr;
	}
	//================================================================================
	this.getWidth = function ()
	{
		return $(_tDiv).children().outerWidth();
	}
	//================================================================================
	function getStrValue(_str, FirstString, LastString)
	{
		var STR = ""+_str;
		var STRFirst = FirstString;
		var STRLast = LastString;
		var FinalString;
	 
		var Pos1 = STR.indexOf(FirstString) + FirstString.length;
		var Pos2 = STR.indexOf(LastString);
		var FinalString = STR.substring(Pos1, Pos2);
		if(Pos1 > 0 && Pos2 > 0)
			return FinalString;
	}
	
	//================================================================================
	this.setStyle = function(_val)
	{
		p.target.css(_val);
	}
	//================================================================================
	this.show = function()
	{
		p.target.show();
		_thisObj.setText(p.html);
	}
	//================================================================================
	this.hide = function()
	{
		p.target.hide();
	}
}
	