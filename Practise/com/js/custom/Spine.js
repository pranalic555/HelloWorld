//////////////////////////////////////////////////////////////////////////////////////
// Developed By: Mitr Learning & Media												//
// Name: Spine																		//
// Description: Acts as spine like a human body. This class is the controller for	//
// the activity.																	//
// Date Created: 07/05/2014															//
// Date Modified: 07/05/2014														//
// Version: 1.0:																	//
//////////////////////////////////////////////////////////////////////////////////////

var SpineClass = function(_callbackFn)
{
	var spineElements = new Array();
	var spineObjects = new Array();
	var originFontSize = parseInt($("body").css("font-size"));
	var makeInvisibleDivs = new Array();
	//========================================================================
	for(var i = 0; i < elementJson.length; i++)
	{
		var e = elementJson[i];
		var _div = document.createElement("div");
		if(e.target != undefined)
		{
			e.target = eval(e.target);
			e.target.append(_div);
		}
		else
		{
			$("body").append(_div);
		}
		spineElements.push({element:$(_div), e:e});
		e.css != undefined ? $(_div).attr("style", e.css) : null;
		$(_div).css("position", "absolute");
		//-----
		if(typeof(e.index) != "undefined")
		{
			if(e.index < 100)
			{
				$(_div).css("z-index", e.index);
			}
			else
			{
				alert("ERROR!!: z-index set to more than the allowed number in "+e.id+".");
				return false;
			}
		}
		//-----
		e.class != undefined ? $(_div).addClass(e.class) : null;
		e.id != undefined ? $(_div).attr("id", e.id) : null;
		/*e.x != undefined ? $(_div).css("left", globalResizeCalc(e.x)) : null;
		e.y != undefined ? $(_div).css("top", globalResizeCalc(e.y)) : null;
		e.width != undefined ? $(_div).css("width", globalResizeCalc(e.width)) : null;
		e.height != undefined ? $(_div).css("height", globalResizeCalc(e.height)) : null;*/
		setElementResize();
		e.visible != undefined ? e.visible ? $(_div).show() : makeInvisibleDivs.push(_div) : null;
		$(_div).html(e.content ? e.content : "");
	}
	//========================================================================
	for(var i in componentJson)
	{
		for(var j = 0; j < componentJson[i].length; j++)
		{
			var _item = componentJson[i];
			this[_item[j].id] = eval("new "+i+"()");
			_item[j].target = eval(_item[j].target);
			this[_item[j].id].init(_item[j]);
			//---------------
			if(typeof(_item[j].index) != "undefined")
			{
				if(_item[j].index >= 100)
				{
					alert("ERROR!!: z-index set to more than the allowed number in "+_item[j].id+".");
					return false;
				}
			}
			//---------------
			spineObjects.push(this[_item[j].id]);
		}
	}
	//========================================================================
	for(var i = 0; i < makeInvisibleDivs.length; i++)
	{
		$(makeInvisibleDivs[i]).hide();
	}
	//$(window).resize(setElementResize);
	//========================================================================
	function setElementResize()
	{
		$("body").css("font-size", globalResizeCalc(originFontSize)+"px");
		for(var i = 0; i < spineElements.length; i++)
		{
			var d = spineElements[i].element;
			var e = spineElements[i].e;
			e.x != undefined ? $(d).css("left", globalResizeCalc(e.x)) : null;
			e.y != undefined ? $(d).css("top", globalResizeCalc(e.y)) : null;
			e.width != undefined ? $(d).css("width", globalResizeCalc(e.width)) : null;
			e.height != undefined ? $(d).css("height", globalResizeCalc(e.height)) : null;
		}
		/*for(var i = 0; i < spineObjects.length; i++)
		{
			if(spineObjects[i].onResizeReAlign)
			{
				spineObjects[i].onResizeReAlign();
			}
		}*/
	}
	//========================================================================
	GlobalCodeOnInit();
}