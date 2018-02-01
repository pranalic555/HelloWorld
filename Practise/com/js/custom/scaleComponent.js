//////////////////////////////////////////////////////////////////////////////
// Developed By: Mitr Learning & Media										//
// Name: GraphComponent														//
// Description: Creates graph on run-time with the help of desired setters.	//
// Date Created: 07/05/2014													//
// Date Modified: 07/05/2014												//
// Version: 1.0:															//
//////////////////////////////////////////////////////////////////////////////

//================================================================================
// GARPH COMPONENT
var scaleComp = function()
{
	// Default starts ...
	var p =
	{
		//id:"",
		//target:"",
		gridId: "grid",
		width: 500,
		height: 500,
		labelPlusSign: false,
		lineType: true,
		showBarNumbers:false,
		arrowX: false,
		centerX: 0,
		suffixX: "",
		drawScaleX: false,
		panX: true,
		regPointStyle: "",
		drawGridLines: true,
		//-----------------------
		labelStyleXYFamily: "arial",
		labelStyleXYSize: 18,
		labelStyleXYStyle: "normal",
		labelStyleXYColor: "#000000",
		labelXType:"normal",//"fraction","percentage",
		labelXVisible:true,
		//----------------------
		borderStyle: "",
		gridColor: "#666666",
		gridXYColor: "#666666",
		gridXMajorWidth: 4,
		gridXMinorWidth: 2,
		gridXMinorColor: "#666666",
		minorHeight:7,
		majorHeight:7,
		bgColor:"#FFFFFF",
		bgShadow:"none",//3px 3px 3px #000000",
		gridBgColor: "rgba(255,231,231,1)",
		gridBgShadow:"none",//3 3 3 #FF0000",
		dotSize:10,
		zoomX: true,
		zoomFromCenterX: true,
		gridXVisible:true,
		gridYVisible:true,
		maxZoom: 2,
		minZoom: 0.5,
		zoomValX: 1,
		zoomValY: 1,
		marginLeft:0,
		marginTop:0,
		marginRight:0,
		marginBottom:0,
		leastCountX: 60,
		labelIntervalX: 1,
		unitX:1,
		majorIntervalX:1,
		minorIntervalX:1,
		// minorIntervalY:1,
		xReg: "center",
		yReg: "center",
		decimal: 1,
		updateOnDrag:false,
		toolTip:false,
		//onViewChange:"",
		arrows:true,
		outOf:5,//only for %
		axisWidth:4,
		floatPrecision:1,
		simplifyFraction:false,
		toolTipInNumber:false,
		rotation:0,
		isMaths : false,
		negativeLabelAlign:true,
		labelTop:15,
		mouseCursorPointer:"move",
		bottomGridMinor:true,
		topGridMinor:true,
		bottomGridMajor:true,
		topGridMajor:true,
		orientation:"horizontal",
	}
	// Default ends ...
	var _thisObj = this;
	var canvas, context;
	var canvasCustomDraw, contextCustomDraw;
	var canvasPoint, contextPoint;
	var drawingObject;
	var oldTouchX, oldTouchY, oldTouchZoom;
	var baseGridIndex = 0;
	var userLines = new Array();
	var interSecPoints = new Array();
	var isOnDots
	var numberX;
	var mouseDownActivated = false;
	var toolTip;
	
	var indexingArr = [];
	
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
		p.marginLeft = globalResizeCalc(p.marginLeft);
		p.marginTop = globalResizeCalc(p.marginTop);
		p.marginRight = globalResizeCalc(p.marginRight);
		p.marginBottom = globalResizeCalc(p.marginBottom);
		p.labelStyleXYSize = globalResizeCalc(p.labelStyleXYSize);
		p.dotSize = globalResizeCalc(p.dotSize);
		p.unitX = p.unitX / globalResizeCalc(1);
		// p.unitY = p.unitY / globalResizeCalc(1);
		
		
		p.axisWidth = globalResizeCalc(p.axisWidth);
		p.minorHeight = globalResizeCalc(p.minorHeight);
		p.majorHeight = globalResizeCalc(p.majorHeight);
		p.gridXMajorWidth = globalResizeCalc(p.gridXMajorWidth);
		p.gridXMinorWidth = globalResizeCalc(p.gridXMinorWidth);
		
		
		p.labelTop = globalResizeCalc(p.labelTop);
		
		//----------------
		if(p.arrows)
		{
			p.arrowX = true;
		}
		//----------------
		canvas = document.createElement("canvas");
		context = canvas.getContext("2d");
		//----------------
		canvasPoint = document.createElement("canvas");
		contextPoint = canvasPoint.getContext("2d");
		//----------------
		canvasCustomDraw = document.createElement("canvas");
		contextCustomDraw = canvasCustomDraw.getContext("2d");
		//----------------
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
		//----------------
		p.target.css(
		{
			"position":"absolute",
			"left": p.x+"px",
			"top": p.y+"px",
			"width":p.width,
			"height":p.height,
			"-webkit-transform-origin": "50% 50%", /* Chrome, Safari, Opera */
			"-moz-transform-origin": "50% 50%", /* FF 9 */
			"-ms-transform-origin": "50% 50%", /* IE 9 */
			"-o-transform-origin": "50% 50%", /* Opera  */
			"transform-origin": "50% 50%",
			"-webkit-transform": "rotate("+p.rotation+"deg)", /* Chrome, Safari, Opera */
			"-moz-transform": "rotate("+p.rotation+"deg)", /* FF 9 */
			"-ms-transform": "rotate("+p.rotation+"deg)", /* IE 9 */
			"-o-transform": "rotate("+p.rotation+"deg)", /* Opera  */
			"transform": "rotate("+p.rotation+"deg)"
		});
		
		if(p.orientation == "vertical")
		{
			p.target.css(
			{
				"-webkit-transform": "rotate(270deg)", /* Chrome, Safari, Opera */
				"-moz-transform": "rotate(270deg)", /* FF 9 */
				"-ms-transform": "rotate(270deg)", /* IE 9 */
				"-o-transform": "rotate(270deg)", /* Opera  */
				"transform": "rotate(270deg)"
			});
		}
		
		//----------------
		p.target.append(canvas);
		p.target.append(canvasCustomDraw);
		p.target.append(canvasPoint);
		//----------------
		//----------------
		p.title ? $(canvasPoint).attr("p_title", p.title) : null;
		//----------------
		p.visible == false ? p.target.css("display", "none") : null;
		p.index ? p.target.css("z-index", p.index) : null;
		//----------------

		//---------------------------------
		createBaseCanvas();

		//---------------------------------
		
		p.pointShadeImg = new Image();
		p.pointShadeImg.onload = function()
		{
			drawPointCanvas();
		}
		p.pointShadeImg.src = "../com/images/graphpointshade.png";
		//---------------------------------
		
		if(p.toolTip)
		{
			toolTip = new ToolTipComp();
			toolTip.init({});
		}
		else
		{
			toolTip = {showTip:function(){}, hideTip:function(){}};
		}
		if(BrowserDetect.any())
		{
			$(document).on("commonToolTipActiveAndMoving", function(e)
			{
				graphOver({pageX:e.pageX, pageY:e.pageY, type:"mousemove"});
			});
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
	this.reSetParams = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
	}
	//================================================================================
	this.setLabelXType = function(_type)
	{
		p.labelXType = _type
		createBaseGrid()
		drawPointCanvas();
	}
	//================================================================================
	this.showGridX = function(_bool)
	{
		p.gridXVisible = _bool;
		createBaseGrid();
	}
	//================================================================================
	this.getGraphArea = function()
	{
		var _ppMin = pixelToPoint(0,0);
		var _ppMax = pixelToPoint(canvas.mw, canvas.mh);
		var _ppCenter = pixelToPoint(canvas.mw/2, canvas.mh/2);
		return {min:{x:_ppMin.x/* , y:_ppMin.y */}, max:{x:_ppMax.x/* , y:_ppMax.y */}, center:{x:_ppCenter.x/* , y:_ppCenter.y */}};
	}
	//================================================================================
	
	this.drawInterPoint = function(_obj)
	{
		if((!mouseDownActivated || p.updateOnDrag) && _obj)
		{
			_obj.xPix = _obj.x;
			_obj.yPix = 0;
			if(_obj.decimal == undefined)
				_obj.decimal = p.decimal;
			
			if(indexingArr.indexOf(_obj.id) == -1)
			{
				indexingArr.push(_obj.id);
			}
			else
			{
				var curIndex = indexingArr.indexOf(_obj.id);
				var lastIndex = indexingArr.length;
				moveArrayElement(indexingArr,curIndex,lastIndex);
			}
			removeUndefinedFromArray(indexingArr);
			
			if(typeof _obj.showToolTip != "boolean")
				_obj.showToolTip = true
			
			_obj.ring = !_obj.ring ? false : true;
			_obj.ringRadius = _obj.ringRadius == undefined ? p.dotSize + globalResizeCalc(2) : _obj.ringRadius;
			_obj.ringWidth = _obj.ringWidth == undefined ? globalResizeCalc(2) : _obj.ringWidth;
			interSecPoints[_obj.id] = _obj;
			
			if(typeof isOnDots != "undefined" && typeof interSecPoints[isOnDots].showToolTip != "undefined" )
			{
				var _toolTip = Number(interSecPoints[isOnDots].x).toFixed(interSecPoints[isOnDots].decimal)
				_toolTip = p.toolTipInNumber ? _toolTip*1 : _toolTip;
				//.....................
				var _pTem = pointToPixel(interSecPoints[isOnDots].x, interSecPoints[isOnDots].y, true);
				var tempX = _pTem.x + $(canvasPoint).offset().left //+ radius;
				var tempY = _pTem.y + $(canvasPoint).offset().top //+ radius;
				//.....................
				var mouseE = new Object();
				if(BrowserDetect.any())
				{
					mouseE.touches = [];
					mouseE.touches.push({pageX:tempX,pageY:tempY});
				}
				mouseE.pageX = tempX
				mouseE.pageY = tempY;
				
				p.toolTip ? toolTip.showTip(_toolTip,mouseE) : null;
			}
			drawPointCanvas();
		}
		
		
	}

	this.changePointer = function(_arg)
	{
		if(_arg == "none")
		{
			$(canvasPoint).removeClass("commongrab");
			$(canvasPoint).removeClass("commonpan");
			addPointerGrabbing(false)
		}
		else
		{
			if(p.panX)
			{
				$(canvasPoint).addClass("commongrab");
				$(canvasPoint).addClass("commonpan");
			}
		}
	}
	
	//================================================================================
	function removeUndefinedFromArray(_arr)
	{
		for(var i = 0; i < _arr.length; i++)
		{
			if(typeof _arr[i] == "undefined")
			{
				_arr.splice(i,1);
				i--;
			}
		}
	}
	//================================================================================
	this.setZoom = function(_type, _value, _zoomx, _zoomy)
	{
		if(_type == "reset")
		{
			p.zoomValX = p.zoomValY = 1;
		}
		else if(_type == "increase")
		{
			p.zoomValX = _zoomx ? p.zoomValX + _value : p.zoomValX;
			p.zoomValY = _zoomy ? p.zoomValY + _value : p.zoomValY;
		}
		else if(_type == "decrease")
		{
			p.zoomValX = _zoomx ? p.zoomValX - _value : p.zoomValX;
			p.zoomValY = _zoomy ? p.zoomValY - _value : p.zoomValY;
		}
		returnViewChange("zoom");
		createBaseGrid();
	}
	//================================================================================
	this.cleanAll = function(_id)
	{
		if(_id != undefined)
		{
			interSecPoints[_id] = undefined;
		}
		else
		{
			interSecPoints = new Array();
		}
		// drawLineCanvas();
		drawPointCanvas();
	}
	//================================================================================
	this.getSnapShot = function()
	{
		return {x:p.x + canvas.mx, y:p.y + canvas.my, width:canvas.mw, height:canvas.mh};
	}
	//================================================================================
	this.addEventListener = function(_evt, _fun)
	{
		p[_evt] = _fun;
	}
	//================================================================================
	this.reArrangeGraph = function(_obj)
	{
		_obj.unitX ? _obj.unitX = _obj.unitX / globalResizeCalc(1) : null;
		_obj.unitY ? _obj.unitY = _obj.unitY / globalResizeCalc(1) : null;

		var newCenterX = _thisObj.getGraphArea().center.x
		if(_obj.newZoomCenter != undefined)
			newCenterX = _obj.newZoomCenter
		var _ncenterPoint = {x:newCenterX, y:_thisObj.getGraphArea().center.y};
		var _centerPix = pointToPixel(_thisObj.getGraphArea().center.x, _thisObj.getGraphArea().center.y);

		_thisObj.reSetParams(_obj);
		var _newCenterPix = pointToPixel(_ncenterPoint.x, _ncenterPoint.y);
		if(!isNaN(p.xReg) && p.zoomFromCenterX)
		{
			p.xReg += _centerPix.x - _newCenterPix.x;
		}
		createBaseGrid();
		drawPointCanvas();
		returnViewChange("zoom");
	}
	//================================================================================
	this.getPointToPixel = function(_x, _y, _bool)
	{
		return pointToPixel(_x, _y, _bool);
	}
	//================================================================================
	this.getPixelToPoint = function(_x, _y, _bool)
	{
		return pixelToPoint(_x, _y, _bool);
	}
	//================================================================================
	this.setPanX = function(_val)
	{
		p.xReg = canvas.mx;
		p.xReg = -1 * (pointToPixel(_val - 1, 0,true).x - p.marginLeft);
		// p.xReg = (pointToPixel(_val, 0,true).x - p.marginLeft);
		createBaseGrid();
		drawPointCanvas();
	}
	//================================================================================
	this.scratchPad = function()
	{
		return canvasCustomDraw;
	}
	//================================================================================
	this.getPointValue = function(_id) // Recently added...
	{
		return interSecPoints[_id].x;
	}
	//================================================================================
	
	// PRIVATE FUNCTIONS
	//================================================================================
	//================================================================================
	function createBaseCanvas()
	{
		canvas.width = p.width;
		canvas.height = p.height;
		$(canvas).css(
		{
			"position": "absolute",
			"left": "0px",
			"top": "0px",
			"background-color":p.bgColor,
			"box-shadow":p.bgShadow
		}).attr("id", "canvas_"+p.id);
		
		canvasCustomDraw.width = p.width;
		canvasCustomDraw.height = p.height;
		$(canvasCustomDraw).css(
		{
			"position": "absolute",
			"left": "0px",
			"top": "0px",
		}).attr("id", "canvasCustomDraw_"+p.id);
		//-------

		//-------
		canvas.mx = p.marginLeft;
		canvas.my = p.marginTop;
		canvas.mw = canvas.width - p.marginLeft - p.marginRight;
		canvas.mh = canvas.height - p.marginTop - p.marginBottom;
		//-------
		canvasPoint.width = canvas.mw + (p.dotSize * 2);
		canvasPoint.height = canvas.mh + (p.dotSize * 2);
		$(canvasPoint).css(
		{
			"position": "absolute",
			"left": (canvas.mx/*  - p.dotSize */) + "px",
			"top": (canvas.my/*  - p.dotSize */) + "px"
		}).attr("id", "canvasPoint_"+p.id);
		if(p.panX)
		{
			$(canvasPoint).addClass("commongrab");
			$(canvasPoint).addClass("commonpan");
		}

		canvasPoint.removeEventListener("touchstart", panGraph, false);
		canvasPoint.removeEventListener("touchmove", panGraph, false);
		canvasPoint.removeEventListener("touchend", panGraph, false);
		canvasPoint.addEventListener("touchstart", panGraph, false);
		canvasPoint.addEventListener("touchmove", panGraph, false);
		canvasPoint.addEventListener("touchend", panGraph, false);
		//------------------------------
		canvasPoint.removeEventListener("mousedown", panGraph, false);
		canvasPoint.addEventListener("mousedown", panGraph, false);
		//------------------------------
		canvasPoint.removeEventListener("mouseover", graphOver, false);
		canvasPoint.addEventListener("mouseover", graphOver, false);

		createBaseGrid();
	}
	//================================================================================
	//================================================================================
	function createBaseGrid()
	{
		var dec;
		drawingObject = new Array();
		var _maxX = canvas.mx + canvas.mw - globalResizeCalc(13);
		var _minX = canvas.mx + globalResizeCalc(13);
		var _maxY = canvas.my + canvas.mh;
		//---------------------------------
		p.zoomValX = p.zoomValX < p.minZoom ? p.minZoom : p.zoomValX > p.maxZoom ? p.maxZoom : p.zoomValX;
		p.zoomValY = p.zoomValY < p.minZoom ? p.minZoom : p.zoomValY > p.maxZoom ? p.maxZoom : p.zoomValY;
		//---------------------------------

		//---------------------------------
		switch(p.xReg)
		{
			case "left":
			// p.xReg = canvas.mx + (p.leastCountX) / (2 * p.unitX)//(p.majorIntervalX * p.unitX * p.leastCountX)/2;
			p.xReg = canvas.mx + globalResizeCalc(30)// + p.marginLeft + (((p.leastCountX * p.zoomValX) / p.unitX));
			break;
			case "right":
			p.xReg = canvas.mx + canvas.mw - globalResizeCalc(30)// - (p.leastCountX) / (2 * p.unitX)//(p.labelIntervalX * p.unitX * p.leastCountX)/2;
			break;
			case "center":
			p.xReg = canvas.mx + (canvas.mw/2);
			break;
		}
		//---------------------------------
		p.yReg = canvas.my + (canvas.mh/2);

		//-------------------------------------------
		if(p.minorIntervalX)
		{
			//---------------------------------
			/// X CORDINATES POSITIVE

			var zeroPos = pointToPixel(0, 0);

			if(p.gridYVisible)
			{
				var xNum = p.minorIntervalX;
				var xMNum = p.majorIntervalX;
				var xPix = pointToPixel(xNum, 0);
				while(xPix.x < _maxX)
				{
					if((Number(xNum.toFixed(12)) == Number(xMNum.toFixed(12))))
					{
						xMNum += p.majorIntervalX;
					}
					else
					{
						if(xPix.x > _minX)
						drawingObject.push(
						{
							points:
							[{
								x: xPix.x,
								y: p.yReg - (p.topGridMinor ? p.minorHeight/2 : 0),
							},
							{
								x: xPix.x,
								// y: p.yReg //+ p.minorHeight/2,
								y: p.yReg + (p.bottomGridMinor ? p.minorHeight/2 : 0),
							}],
							strokeStyle: p.gridXMinorColor,
							lineWidth: p.gridXMinorWidth,
						});
					}
					xNum+=p.minorIntervalX;
					xPix = pointToPixel(xNum, 0);
				}
				/// X CORDINATES NEGATIVE
				var xNum = -1 * p.minorIntervalX;
				xMNum = -1 * p.majorIntervalX;

				xPix = pointToPixel(xNum, 0);
				while(xPix.x > canvas.mx + globalResizeCalc(13))
				{
					if((Number(xNum.toFixed(12)) == Number(xMNum.toFixed(12))))
					{
						xMNum -= p.majorIntervalX;
					}
					else
					{
						if(xPix.x > _minX && xPix.x < _maxX)
						drawingObject.push(
						{
							points:
							[{
								x: xPix.x,
								y: p.yReg - (p.topGridMinor ? p.minorHeight/2 : 0),
							},
							{
								x: xPix.x,
								// y: p.yReg// + p.minorHeight/2,
								y: p.yReg + (p.bottomGridMinor ? p.minorHeight/2 : 0),
							}],
							strokeStyle: p.gridXMinorColor,
							lineWidth: p.gridXMinorWidth,
						});
					}
					xNum-=p.minorIntervalX;
					xPix = pointToPixel(xNum, 0);
				}
			}
			baseGridIndex = drawingObject.length;
		}
		//---------------------------------
		/// X CORDINATES POSITIVE
		var zeroPos = pointToPixel(0, 0);
		if(p.gridYVisible)
		{
			var xNum = 0;
			var xPix = pointToPixel(xNum, 0);
			while(xPix.x < _maxX)
			{
				if(xPix.x > _minX)
				drawingObject.push(
				{
					points:
					[{
						x: xPix.x,
						y: p.yReg - (p.topGridMajor ? p.majorHeight/2 : 0)
					},
					{
						x: xPix.x,
						y: p.yReg + (p.bottomGridMajor ? p.majorHeight/2 : 0),
					}],
					strokeStyle: /* (xNum == 0) ? p.gridXYColor : */ p.gridColor,
					lineWidth: /* (xNum == 0) ? 4 :  */p.gridXMajorWidth,
				});
				xNum+=p.majorIntervalX;
				xPix = pointToPixel(xNum, 0);
			}
			/// X CORDINATES NEGATIVE
			xNum = -1 * p.majorIntervalX;
			xPix = pointToPixel(xNum, 0);
			while(xPix.x > canvas.mx + 13)
			{
				if(xPix.x > _minX && xPix.x < _maxX)
				drawingObject.push(
				{
					points:
					[{
						x: xPix.x,
						y: p.yReg - (p.topGridMajor ? p.majorHeight/2 : 0),
					},
					{
						x: xPix.x,
						y: p.yReg + (p.bottomGridMajor ? p.majorHeight/2 : 0),
					}],
					strokeStyle: /* (xNum == 0) ? p.gridXYColor :  */p.gridColor,
					lineWidth: /* (xNum == 0) ? 4  :*/ p.gridXMajorWidth,
				});
				xNum-=p.majorIntervalX;
				xPix = pointToPixel(xNum, 0);
			}
		}
		if(p.gridXVisible)
		{
			// X AXIS
			var yNum = 0;
			var yPix = pointToPixel(0, yNum);
			//if(canvas.mx + 13 > _minX)
			drawingObject.push(
			{
				points:
				[{
					x:/* yNum == 0 && p.arrowX ? canvas.mx + 13 : */canvas.mx + globalResizeCalc(13),
					y: yPix.y,
				},
				{
					x:/* yNum == 0 && p.arrowX ? _maxX - 13 : */_maxX,
					y: yPix.y,
				}],
				strokeStyle: (yNum == 0) ? p.gridXYColor : p.gridColor,
				lineWidth: (yNum == 0) ? p.axisWidth : 1,
			});

		}

		baseGridIndex = drawingObject.length;
		//---------------------------
		numberX = new Array();

		if(p.labelXVisible)
		{
			xNum = 0
			xPix = pointToPixel(xNum, 0);
			while(xPix.x < (canvas.mx + canvas.mw - globalResizeCalc(13)))
			{
				if(p.labelXType == "percentage") 
					_label = parseFloat(((Number(xNum) * 100) / p.outOf).toFixed(0)) + "%"
				else if(p.labelXType == "fraction")
				{
					frac = (""+p.labelIntervalX).split(".")[1]
					
					dec = p.minimumDenominator ?  p.minimumDenominator : 1;
					if(frac && !p.minimumDenominator)
					{
						for(var i = 0;i < frac.length;i++)
						{
							dec += "0"
						}
					}
					_label = p.minimumDenominator ? Math.round(xNum / p.labelIntervalX) +"/" +dec : (xNum * Number(dec)) +"/" +dec;
					
					if(p.simplifyFraction )
					{
						var obj = getMinimizedFraction(xNum*Number(dec),dec*1)
						_label = obj.n +"/" +obj.d
					}
					else
					{
						if(_label.split("/")[0] % _label.split("/")[1] == 0)
						{
							var obj = getMinimizedFraction(_label.split("/")[0],_label.split("/")[1])
							_label = obj.n +"/" +obj.d
						}
					}
				}
				else
				{
					_label = xNum
					if(typeof p.floatPrecision != undefined)
					{
						_label = Math.abs(_label) >= 0 && Math.abs(_label) < 10 ? xNum.toFixed(p.floatPrecision) : (_label).toFixed(p.floatPrecision);
					}
				}
				if(xPix.x >= canvas.mx + globalResizeCalc(13))
				{
					numberX.push({label: _label , x:xPix.x, y:(zeroPos.y > _maxY ? _maxY : zeroPos.y < canvas.my ? canvas.my : zeroPos.y) + parseInt(p.labelStyleXYSize) + p.labelTop})
				}
				xNum += p.labelIntervalX;
				xNum = Number(xNum.toFixed(p.decimal));
				xPix = pointToPixel(xNum, 0);
			}
			var _mxxx = _maxX;
			xNum = -p.labelIntervalX;
			xPix = pointToPixel(xNum, 0);
			while(xPix.x > canvas.mx - globalResizeCalc(13))
			{
				if(p.labelXType == "percentage")
				{
					_label = parseFloat(((Number(xNum) * 100) / p.outOf).toFixed(0)) + "%"

				}
				else if(p.labelXType == "fraction")
				{
					frac = (""+p.labelIntervalX).split(".")[1]
					
					dec = p.minimumDenominator ?  p.minimumDenominator : 1;
					if(frac && !p.minimumDenominator)
					{
						for(var i = 0;i < frac.length;i++)
						{
							dec += "0"
						}
					}
					_label = p.minimumDenominator ? Math.round(xNum / p.labelIntervalX) +"/" +dec : (xNum * Number(dec)) +"/" +dec;
					
					if(p.simplifyFraction )
					{
						var obj = getMinimizedFraction(xNum*Number(dec),dec*1)
						_label = obj.n +"/" +obj.d
					}
					else
					{
						if(_label.split("/")[0] % _label.split("/")[1] == 0)
						{
							var obj = getMinimizedFraction(_label.split("/")[0],_label.split("/")[1])
							_label = obj.n +"/" +obj.d
						}
					}		
				}
				else
				{
					_label = xNum;
					if(typeof p.floatPrecision != undefined)
					{
						_label = Math.abs(_label) >= 0 && Math.abs(_label) < 10 ? xNum.toFixed(p.floatPrecision) : (_label).toFixed(p.floatPrecision);
					}
				}
				if(xPix.x > canvas.mx && xPix.x < _mxxx)
				{
					numberX.push({label:_label, x:xPix.x, y:(zeroPos.y > _maxY ? _maxY : zeroPos.y < canvas.my ? canvas.my : zeroPos.y) + parseInt(p.labelStyleXYSize) + p.labelTop});
				}
				xNum -= p.labelIntervalX;
				xNum = Number(xNum.toFixed(p.decimal));
				xPix = pointToPixel(xNum, 0);
			}
		}
		//---------------------------
		//---------------------------
		drawCanvas();
	}
	//================================================================================
	//================================================================================
	function drawCanvas(_cn, _ct)
	{
		var w,h;
		var _cnv = canvas;
		var _ctx = context;
		var _mx = canvas.mx;
		var _my = canvas.my;
		var _mw = canvas.mw;
		var _mh = canvas.mh;
		if(_cn && _ct)
		{
			_cnv = _cn;
			_ctx = _ct;
		}
		_cnv.width = _cnv.width;
		_ctx.beginPath();
		//_ctx.save();
		_ctx.rect(canvas.mx, canvas.my, canvas.mw, canvas.mh);
		_ctx.fillStyle = p.gridBgColor;
		if(p.gridBgShadow && p.gridBgShadow != "none")
		{
			_ctx.shadowOffsetX = parseInt(p.gridBgShadow.split(" ")[0]);
			_ctx.shadowOffsetY = parseInt(p.gridBgShadow.split(" ")[1]);
			_ctx.shadowBlur = parseInt(p.gridBgShadow.split(" ")[2]);
			_ctx.shadowColor = p.gridBgShadow.split(" ")[3];
		}
		if(p.borderStyle != "none" && p.borderStyle != "")
		{
			_ctx.StrokeStyle = p.borderStyle;
			_ctx.stroke();
		}
		_ctx.fill();
		_ctx.closePath();
		//_ctx.restore();
		//------------------------------------------
		for(var i = 0; i < drawingObject.length; i++)
		{
			_ctx.beginPath();
			drawingObject[i].strokeStyle ? _ctx.strokeStyle = drawingObject[i].strokeStyle : null;
			drawingObject[i].lineWidth ? _ctx.lineWidth = drawingObject[i].lineWidth : null;
			var _arr = drawingObject[i].points;	
			var _drawStart = 0;
			for(var j = 0; j < _arr.length; j++)
			{
				if(_arr[j].x >= canvas.mx && _arr[j].x <= (canvas.mx + canvas.mw) && _arr[j].y >= canvas.my && _arr[j].y <= (canvas.my + canvas.mh))
				{
					_drawStart == 0 ? _ctx.moveTo(_arr[j].x, _arr[j].y) : _ctx.lineTo(_arr[j].x, _arr[j].y);
					_drawStart++;
				}
			}
			if(drawingObject[i].text && _drawStart > 0)
			{
				var _tObj = drawingObject[i].text;
				_ctx.fillStyle = p.labelStyleXYColor;
				_ctx.font = p.labelStyleXYStyle + " " + p.labelStyleXYSize + "px " + p.labelStyleXYFamily;
				_ctx.textAlign = _tObj.textAlign ? _tObj.textAlign : "left";
				_ctx.fillText(_tObj.txt, _tObj.x, _tObj.y);
			}
			_ctx.stroke();
			_ctx.closePath();
		}
		//--------------------------
		for(var k = 0; k < numberX.length; k ++)
		{
			var _tObj = numberX[k];
			_ctx.fillStyle = p.labelStyleXYColor;
			_ctx.font = p.labelStyleXYStyle + " " + p.labelStyleXYSize + "px " + p.labelStyleXYFamily;
			_ctx.textAlign = "center";
			if(p.labelXType == "fraction")
			{
				numerator = (""+_tObj.label).split("/")[0]
				var w = 0;
				numerator < 0 ? w = _ctx.measureText(-1*numerator).width/2 : null;
				denominator = (""+_tObj.label).split("/")[1]
				var mulFactor = 1;
					
				if(denominator*1 != 1 && numerator*1 != 0)
				{
					_ctx.font = p.labelStyleXYStyle + " " + p.labelStyleXYSize + "px " + p.labelStyleXYFamily;
					_ctx.fillText(Number(numerator) < 0 ? "–"+Math.abs(numerator).toFixed(p.floatPrecision) : numerator, _tObj.x, _tObj.y);
					
					height = p.labelStyleXYSize/2
					_ctx.fillText(Number(denominator), _tObj.x, _tObj.y + 3*height );
					width = _ctx.measureText(denominator).width
					width = width < _ctx.measureText(Math.abs(numerator)).width ? _ctx.measureText(Math.abs(numerator)).width : width;
					_ctx.beginPath()
					_ctx.strokeStyle = p.labelStyleXYStyle
					_ctx.lineWidth = 2
					_ctx.strokeStyle = "#000000"
					_ctx.moveTo(_tObj.x - width/2 - globalResizeCalc(2),_tObj.y + height - globalResizeCalc(2))
					_ctx.lineTo(_tObj.x + width/2 + globalResizeCalc(2),_tObj.y + height - globalResizeCalc(2))
					_ctx.stroke()
					_ctx.closePath()
				}
				else
				{
					_ctx.font = p.labelStyleXYStyle + " " + p.labelStyleXYSize*1.3 + "px " + p.labelStyleXYFamily;
					numerator < 0 ? w = _ctx.measureText(-1*numerator).width/2 : null;
					h = p.labelStyleXYSize/2;
					_ctx.fillText(Number(numerator) < 0 ? "–"+Math.abs(numerator).toFixed(p.floatPrecision) : numerator, _tObj.x-w, _tObj.y+h);
				}
			}
			else if(p.labelXType == "percentage")
			{
				numerator = (""+_tObj.label).split("%")[0]
				_ctx.fillText(Number(numerator) < 0 ? "–"+Math.abs(numerator).toFixed(p.floatPrecision)+"%" : numerator+"%", _tObj.x, _tObj.y);
			}
			else
			{
				numerator = _tObj.label
				var w = 0;
				numerator < 0 && p.negativeLabelAlign ? w = _ctx.measureText(-1*numerator).width/2 : null;
				var str = Math.abs(numerator).toFixed(p.floatPrecision);
				str = p.isMaths ? Number(str) : str;
				str = Number(numerator) < 0 ? "–"+str : str; 
				_ctx.fillText(str, _tObj.x-w, _tObj.y);
			}

		}
		//--------------------------

		//--------------------------
		var _pToN = pointToPixel(0, 0, false);
		//--------------------------

		//--------------------------
		_ctx.beginPath();
		_ctx.fillStyle = p.gridXYColor;
		if(p.gridXVisible && p.arrowX)
		{
			//Right
			_ctx.moveTo((canvas.mx + canvas.mw), _pToN.y);
			_ctx.lineTo((canvas.mx + canvas.mw)-globalResizeCalc(13), _pToN.y- globalResizeCalc(7));
			_ctx.lineTo((canvas.mx + canvas.mw)-globalResizeCalc(13), _pToN.y+globalResizeCalc(7));
			_ctx.lineTo((canvas.mx + canvas.mw), _pToN.y);
			//Left
			_ctx.moveTo(canvas.mx, _pToN.y);
			_ctx.lineTo(canvas.mx+globalResizeCalc(13), _pToN.y-globalResizeCalc(7));
			_ctx.lineTo(canvas.mx+globalResizeCalc(13), _pToN.y+globalResizeCalc(7));
			_ctx.lineTo(canvas.mx, _pToN.y);
		}
		_ctx.fill();
		_ctx.closePath();
		//--------------------------
	}
	//================================================================================
	//================================================================================
	
	function drawPointCanvas()
	{
		canvasPoint.width = canvasPoint.width;
		var tempArr = interSecPoints.slice(0)
		var radius;
		for(var k = 0; k < tempArr.length; k++)
		{
			
			if(indexingArr[k] != "undefined" && String(indexingArr[k]).length > 0)
			{
				var i = indexingArr[k];
				
				if(tempArr[i])
				{
					var _iSec = tempArr[i];
					var _area = _thisObj.getGraphArea();
					radius = _iSec.radius ? _iSec.radius : p.dotSize
					if(_iSec.x >= _area.min.x && _iSec.x <= _area.max.x/*  && _iSec.y <= _area.min.y && _iSec.y >= _area.max.y */)
					{
						var _pTem = pointToPixel(_iSec.x, _iSec.y, true);
						contextPoint.beginPath();
						contextPoint.arc(_pTem.x, _pTem.y, radius - globalResizeCalc(2), 0, 2*Math.PI);
						contextPoint.fillStyle = _iSec.color;
						contextPoint.fill();
						if(tempArr[i].pan)
						{
							
								
							/* var _grd = contextPoint.createRadialGradient(_pTem.x - globalResizeCalc(3) + p.dotSize, _pTem.y - globalResizeCalc(3) + p.dotSize, 0, _pTem.x - globalResizeCalc(3) + p.dotSize, _pTem.y - globalResizeCalc(3) + p.dotSize, p.dotSize - globalResizeCalc(2));
							_grd.addColorStop(0, "rgba(255,255,255,0.8)");
							_grd.addColorStop(1, _iSec.color);
							contextPoint.fillStyle = _grd;
							contextPoint.fill(); */
							if(_iSec.color != "transparent")
								contextPoint.drawImage(p.pointShadeImg,_pTem.x+globalResizeCalc(1)-radius,_pTem.y+globalResizeCalc(1)-radius, radius*2-globalResizeCalc(3), radius*2-globalResizeCalc(3));
						}
						if(_iSec.ring)
						{
							contextPoint.beginPath();
							contextPoint.arc(_pTem.x, _pTem.y, _iSec.ringRadius, 0, 2*Math.PI);
							contextPoint.strokeStyle = _iSec.color;
							contextPoint.lineWidth = _iSec.ringWidth;
							contextPoint.stroke();
							contextPoint.closePath();
						}
					}
				}
			}
		}
	}
	//================================================================================
	//================================================================================
	function pointToPixel(_x, _y, _bool)
	{
		var xRet, yRet;
		if(_bool)
		{
			xRet = (p.xReg - p.marginLeft) + (_x * ((p.leastCountX * p.zoomValX) / p.unitX));
			yRet = p.yReg//(p.yReg - p.marginTop) + ((-1 * _y) * ((p.leastCountY * p.zoomValY) / p.unitY));
		}
		else
		{
			xRet = p.xReg + (_x * ((p.leastCountX * p.zoomValX) / p.unitX));
			yRet = p.yReg// + ((-1 * _y) * ((p.leastCountY * p.zoomValY) / p.unitY));
		}
		return {x:xRet, y:yRet};
	}
	//================================================================================
	//================================================================================
	function pixelToPoint(_x, _y, _bool)
	{
		var xRet, yRet;
		if(_bool)
		{
			xRet = (( _x - ((p.xReg - p.marginLeft) - canvas.mx)) / ((p.leastCountX * p.zoomValX) / p.unitX));
			yRet = 0//(( _y - ((p.yReg - p.marginTop) - canvas.my)) / ((p.leastCountY * p.zoomValY) / p.unitY));
		}
		else
		{
			xRet = (( _x - (p.xReg - canvas.mx)) / ((p.leastCountX * p.zoomValX) / p.unitX));
			yRet = 0//-1 * (( _y - (p.yReg - canvas.my)) / ((p.leastCountY * p.zoomValY) / p.unitY));
		}
		return {x:xRet, y:yRet};
	}
	//================================================================================
	
			// return an object with full width/height (including borders), top/bottom coordinates
	var getPositionData = function(el) {
		return $.extend({
			width: el.outerWidth(false),
			height: el.outerHeight(false)
		}, el.offset());
	};

	// get rotated dimensions   
	var transformedDimensions = function(el, angle) {
		var dimensions = getPositionData(el);
		return {
			width: dimensions.width + Math.ceil(dimensions.width * Math.cos(angle)),
			height: dimensions.height + Math.ceil(dimensions.height * Math.cos(angle))
		};
	};
		
		
	//================================================================================
	function graphOver(e)
	{
		var radius;
		if(e.type == "mouseover")
		{
			$(this).unbind("mousemove", graphOver).bind("mousemove", graphOver);
			$(this).unbind("mouseout", graphOver).bind("mouseout", graphOver);
		}
		else if(e.type == "mousemove")
		{
			for(var i = interSecPoints.length-1; i >=0 ; i--)
			{
				if(mouseDownActivated)	
					i = isOnDots
				if(interSecPoints[i])
				{
					radius = interSecPoints[i].radius ? interSecPoints[i].radius : p.dotSize
					var _pTem = pointToPixel(interSecPoints[i].x, interSecPoints[i].y, true);
					
					if(p.orientation != "vertical")
					{
							if((((e.pageX - $(canvasPoint).offset().left) >= _pTem.x-(radius)) && (e.pageX - $(canvasPoint).offset().left) <= (_pTem.x + (radius)) && ((e.pageY - $(canvasPoint).offset().top) >= _pTem.y - (radius)) && (e.pageY - $(canvasPoint).offset().top) <= (_pTem.y + (radius))) || mouseDownActivated)
					{
						var tempX = _pTem.x + $(canvasPoint).offset().left //+ radius;
						var tempY = _pTem.y + $(canvasPoint).offset().top //+ radius;
						/* if(BrowserDetect.any())
						{
							e.touches[0].pageX = tempX;
							e.touches[0].pageY = tempY;
						}
						else */
						{
							e.pageX = tempX;
							e.pageY = tempY;
						}
						if(interSecPoints[i].showToolTip)
						{
							var _toolTip = Number(interSecPoints[i].x).toFixed(interSecPoints[i].decimal)
							_toolTip = p.toolTipInNumber ? _toolTip*1 : _toolTip;
							p.toolTip ? toolTip.showTip(_toolTip,e) : null;
						}
						if(interSecPoints[i].pan == "x")
						{
							interSecPoints[i].title ? $(canvasPoint).attr("p_title", GCTConv(interSecPoints[i].title)) : $(canvasPoint).removeAttr("p_title");
							$(canvasPoint).addClass("commongrab");
							$(canvasPoint).removeClass("commonpan");
						}
						break;
					}
					else
					{
						p.panX || p.panY ? $(canvasPoint).addClass("commonpan") : $(canvasPoint).removeClass("commongrab")
						p.toolTip ? toolTip.hideTip() : null;
						p.title ? $(canvasPoint).attr("p_title", p.title) : $(canvasPoint).removeAttr("p_title");
					}
					}
					else
					{
					
					var savedPositionData = getPositionData($(canvasPoint));
				
					
					var _cnvPtLeft = savedPositionData.left;
					var _cnvPtTop = savedPositionData.top;
					
					var _xx = _cnvPtLeft + _pTem.y;
					var _yy = (savedPositionData.width - _pTem.x)  + _cnvPtTop;
					_pTem.x = _xx;
					_pTem.y = _yy;
					
					if((((e.pageX) >= _pTem.x-(radius)) && (e.pageX) <= (_pTem.x + (radius)) && ((e.pageY) >= _pTem.y - (radius)) && (e.pageY) <= (_pTem.y + (radius))) || mouseDownActivated)
					{
						if(interSecPoints[i].showToolTip)
						{
							var _toolTip = Number(interSecPoints[i].x).toFixed(interSecPoints[i].decimal)
							_toolTip = p.toolTipInNumber ? _toolTip*1 : _toolTip;
							p.toolTip ? toolTip.showTip(_toolTip,e) : null;
						}
						if(interSecPoints[i].pan == "x")
						{
							interSecPoints[i].title ? $(canvasPoint).attr("p_title", GCTConv(interSecPoints[i].title)) : $(canvasPoint).removeAttr("p_title");
							$(canvasPoint).addClass("commongrab");
							$(canvasPoint).removeClass("commonpan");
						}
						break;
					}
					else
					{
						p.panX || p.panY ? $(canvasPoint).addClass("commonpan") : $(canvasPoint).removeClass("commongrab")
						p.toolTip ? toolTip.hideTip() : null;
						p.title ? $(canvasPoint).attr("p_title", p.title) : $(canvasPoint).removeAttr("p_title");
					}
					}
					
				
				}
			}
		}
		else if(e.type == "mouseout")
		{
			$(this).unbind("mousemove", graphOver);
			$(this).unbind("mouseout", graphOver);
		}
	}
	//================================================================================
	//================================================================================
	function panGraph(e)
	{
		if(e.type == "mousemove" || e.type == "mousedown")
		{
			e.touches = [{pageX:e.pageX, pageY:e.pageY}];
		}
		//------------------------------------------
		if(e.type == "touchstart" || e.type == "mousedown")
		{
			if($(canvasPoint).hasClass("commongrab"))
			{
				$(canvasPoint).addClass("commonpan")
				addPointerGrabbing(true);
			}
			isOnDots = undefined;
			isOnProves = undefined;
			oldTouchX = undefined;
			oldTouchY = undefined;
			oldTouchZoom = undefined;
			var radius;
			if(e.touches.length == 1)
			{
				//for(var i = interSecPoints.length - 1; i >= 0; i--)
				for(var k = indexingArr.length - 1; k >= 0; k--)
				{
					if(indexingArr[k] != "undefined" && String(indexingArr[k]).length > 0)
					{
						var i = indexingArr[k];
						if(interSecPoints[i])
						{
							radius = interSecPoints[i].radius ? interSecPoints[i].radius : p.dotSize
							var _pTem = pointToPixel(interSecPoints[i].x, interSecPoints[i].y, true);
							if(((e.touches[0].pageX - $(canvasPoint).offset().left) >= _pTem.x - radius) && (e.touches[0].pageX - $(canvasPoint).offset().left) <= (_pTem.x + (radius)) && ((e.touches[0].pageY - $(canvasPoint).offset().top) >= _pTem.y - radius) && (e.touches[0].pageY - $(canvasPoint).offset().top) <= (_pTem.y + (radius)))
							{
								isOnProves = false;
								isOnDots = i;
								if(interSecPoints[isOnDots].showToolTip)
								{
									var _toolTip = Number(interSecPoints[isOnDots].x).toFixed(interSecPoints[isOnDots].decimal)
									_toolTip = p.toolTipInNumber ? _toolTip*1 : _toolTip;
									p.toolTip ? toolTip.showTip(_toolTip,e) : null;
								}
								break;
							}
							else
							{
								p.toolTip ? toolTip.hideTip() : null;
							}
						}
					}
				} 
			}
			mouseDownActivated = true;
			if(p.onMouseDown)
			{
				p.onMouseDown(
				{
					id: p.id ? p.id : "",
					holdId:isOnDots, // Recently added...
					type: e.type
				});
			}
		}
		//------------------------------------------
		if(e.type == "touchmove" || e.type == "mousemove")
		{
			if(e.touches.length == 1)
			{
				//===================================
				if(typeof(isOnDots) != "undefined" && interSecPoints[isOnDots].pan)
				{
					var _pToP = pixelToPoint(e.touches[0].pageX - $(canvasPoint).offset().left, e.touches[0].pageY - $(canvasPoint).offset().top);
					if(interSecPoints[isOnDots].pan == "x")
					{
						if(interSecPoints[isOnDots].pan == "x")
						{
							interSecPoints[isOnDots].x = _pToP.x;
						}
						showPointToolTip(e,interSecPoints[isOnDots])
						returnViewChange("point", isOnDots);
					}
				}
				else if(p.panX)
				{
					var _temBool = false;
					if(p.panX && (Math.abs(oldTouchX - e.touches[0].pageX) > 10 || oldTouchX == undefined))
					{
						if(oldTouchX != undefined)
						{
							p.xReg += (e.touches[0].pageX - oldTouchX);
							_temBool = true;
						}
						oldTouchX = e.touches[0].pageX;
					}

					if(_temBool)
					{
						createBaseGrid();
					}
					returnViewChange("pan");
				}
			}
		}
		if(e.type == "touchend")
			p.toolTip ? toolTip.hideTip() : null;
		//--------------------------------------
		if(e.type == "mousedown")
		{
			$(window).unbind("mousemove", panGraph).bind("mousemove", panGraph);
			$(window).unbind("mouseup", panGraph).bind("mouseup", panGraph);
		}
		if(e.type == "mouseup" || e.type == "touchend")
		{
			addPointerGrabbing(false);
			$(window).unbind("mousemove", panGraph);
			$(window).unbind("mouseup", panGraph);
			p.toolTip ? toolTip.hideTip() : null;
			mouseDownActivated = false;
			if(p.onMouseUp)
			{
				p.onMouseUp(
				{
					id: p.id ? p.id : "",
					holdId:isOnDots,
					type: e.type
				});
			}
			isOnDots = undefined;
		}
		e.preventDefault();
	}
	//================================================================================
	//================================================================================
	function showPointToolTip(e,_point)
	{
		var _graphData = _thisObj.getGraphArea();
		_point.x = _graphData.min.x >=  _point.x ? _graphData.min.x : _point.x;
		_point.x = _graphData.max.x <=  _point.x ? _graphData.max.x : _point.x;
		
		var _pTem = pointToPixel(_point.x, _point.y, true);
		
		var tempX = _pTem.x + $(canvasPoint).offset().left// + p.dotSize;
		var tempY = _pTem.y + $(canvasPoint).offset().top //+ p.dotSize;
		
		if(BrowserDetect.any())
		{
			e.touches[0].pageX = tempX;
			e.touches[0].pageY = tempY;
		}
		else
		{
			e.pageX = tempX;
			e.pageY = tempY;
		}
		var _toolTip = Number(_point.x).toFixed(_point.decimal)
		_toolTip = p.toolTipInNumber ? _toolTip*1 : _toolTip;
		p.toolTip ? toolTip.showTip(_toolTip, e) : null; 
	}
	function returnViewChange(_typeStr, _id)
	{
		if(_typeStr && _typeStr != "")
		{
			if(_typeStr == "point")
			{
				if(p.onPointChange)
				{
					p.onPointChange(
					{
						id: p.id ? p.id : "",
						type: _typeStr,
						value: {point:_id, x:interSecPoints[_id].x, y:interSecPoints[_id].y}
					});
				}
				else
				{
					drawPointCanvas();
				}
			}
			else
			{
				if(p.onViewChange)
				{
					p.onViewChange(
					{
						id: p.id ? p.id : "",
						type: _typeStr
					});
				}
				else
				{
					drawCanvas();
					drawPointCanvas();
				}
			}
		}
	}
	//================================================================================
	//================================================================================
	function getDistance(x1, y1, x2, y2)
	{
		var _d = Math.abs(Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1))));
		return _d;
	}
}
