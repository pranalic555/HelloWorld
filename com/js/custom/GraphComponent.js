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
var GraphComp = function()
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
		drawQuads: 0,
		//labelX: "",
		//labelY: "",
		lineType: true,
		//barProp:{start:1, end:1, gap:1},// start:1 end:1 means will start at 1 till 1+1 gap will skip 1. Gap can be array of interval.
		showBarNumbers:false,
		arrowXL: false,
		arrowXR: false,
		arrowYU: false,
		arrowYD: false,
		centerX: 0,
		centerY: 0,
		suffixX: "",
		suffixY: "",
		drawScaleX: false,
		drawScaleY: false,
		panX: true,
		panY: true,
		regPointStyle: "",
		drawGridLines: true,
		//-----------------------
		labelStyleXYFamily: "arial",
		labelStyleXYSize: "18px",
		labelStyleXYStyle: "normal",
		labelStyleXYColor: "#000000",
		//-----------------------
		stopLabelX:true,
		stopLabelY:true,
		//-----------------------
		stopAxisY:false,
		stopAxisX:false,
		//-----------------------
		labelStyle: "italic",
		borderStyle: "",
		gridColor: "#808080",
		gridXYColor: "#666666",
		gridXYWidth: 2,
		majorLineBigWidth:4,
		majorLineSmallWidth:1,
		gridXYMinorColor: "#CCCCCC",
		bgColor:"#FFFFFF",
		bgShadow:"none",//3px 3px 3px #000000",
		gridBgColor: "rgba(255,231,231,1)",
		gridBgShadow:"none",//3 3 3 #FF0000",
		dotSize:10,
		zoomX: true,
		zoomY: true,
		zoomFromCenterX: true,
		zoomFromCenterY: true,
		gridXVisible:true,
		gridYVisible:true,
		intervalXVisible:true,
		intervalYVisible:true,
		centerLabelXVisible:false,
		centerLabelYVisible:false,
		maxZoom: 2,
		minZoom: 0.5,
		zoomValX: 1,
		zoomValY: 1,
		marginLeft:100,
		marginTop:30,
		marginRight:30,
		marginBottom:30,
		leastCountX: 60,
		leastCountY: 60,
		labelIntervalX: 1,
		labelIntervalY: 1,
		unitX:1,
		unitY:1,
		majorIntervalX:1,
		majorIntervalY:1,
		minorIntervalX:1,
		minorIntervalY:1,
		xReg: "center",
		yReg: "center",
		provePoint: 0,
		provePointH: 0,
		probeColor: "#00A86E",
		probeFillColor: "#66CBA8",
		probeColorH: "#00A86E",
		probeFillColorH: "#66CBA8",
		proveArea: 10,
		probeVisible: true,
		probeVisibleH: false,
		probeInterPoint: [],
		probeInterPointH: [],
		probeSnap:true,
		probePaddingTop:0,
		probePaddingBottom:0,
		probePaddingLeft:0,
		probePaddingRight:0,
		//probeSnapVal:0.2,
		decimal: 1,
		decimalInNumber : false,
		updateOnDrag:false,
		toolTip:false,
		//dashed:[20, 10],
		//onViewChange:"",
		showXAxis:false,
		labelInBold:true,
		barValueHeight : 10,
		mouseCurType : "grab",	// grab or move
		customIndex:0,
		xLabelSuffix:"",
		yLabelSuffix:"",
		barLabelTop : 5,
		isMaths : true,
		toFixedX:true,
		toFixedY:true,
		showBarZeroVal: true,
		axisWidth:4,
		canvasLineBuffer:0,
		allowPointIndexing:false,
		dashedXAxis:false,
		leftGridMinor:true,
		rightGridMinor:true,
		dashedAxisLen:10,
		probeDimentionOffset:0,
		canvasClipBool : false,
	}
	// Default ends ...
	var _thisObj = this;
	var canvas, context;
	var canvasAxis, contextAxis;
	var canvasCustomDraw, contextCustomDraw;
	var canvasBarLabel, contextBarLabel;
	var canvasLine, contextLine;
	var canvasPoint, contextPoint;
	var canvasProve, contextProve;
	var labelXDiv, labelYDiv;
	var drawingObject;
	var oldTouchX, oldTouchY, oldTouchZoom;
	var baseGridIndex = 0;
	var userLines = new Array();
	var interSecPoints = new Array();
	var isOnDots, isOnProves, isOnProvesH, isOnLine, proveMove, proveMoveH;
	var numberX, numberY;
	var probeSnapPoints = new Array();
	var probeSnapPointsH = new Array();
	var mouseDownActivated = false;
	var toolTip, gapCount;
	var prevMouseX,prevMouseY;
	var prevProvePointInPix;
	var mouseMoved = false;
	var proveDecimal = 0
	var indexingArr = new Array();
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
			if(i == "majorLineBigWidth")
				p.axisWidth = p.majorLineBigWidth
		}
		p.x = globalResizeCalc(p.x);
		p.y = globalResizeCalc(p.y);
		p.width = globalResizeCalc(p.width);
		p.height = globalResizeCalc(p.height);
		p.marginLeft = globalResizeCalc(p.marginLeft);
		p.marginTop = globalResizeCalc(p.marginTop);
		p.marginRight = globalResizeCalc(p.marginRight);
		p.marginBottom = globalResizeCalc(p.marginBottom);
		p.labelStyleXYSize = globalResizeCalc(p.labelStyleXYSize)+"px";
		p.dotSize = globalResizeCalc(p.dotSize);
		p.unitX = p.unitX / globalResizeCalc(1);
		p.unitY = p.unitY / globalResizeCalc(1);
		p.axisWidth = globalResizeCalc(p.axisWidth);
		p.majorLineBigWidth = globalResizeCalc(p.majorLineBigWidth);
		p.majorLineSmallWidth = globalResizeCalc(p.majorLineSmallWidth);
		p.proveArea = globalResizeCalc(p.proveArea);
		p.probePaddingTop = globalResizeCalc(p.probePaddingTop);
		p.probePaddingBottom = globalResizeCalc(p.probePaddingBottom);
		p.probePaddingLeft = globalResizeCalc(p.probePaddingLeft);
		p.probePaddingRight = globalResizeCalc(p.probePaddingRight);
		p.barValueHeight = globalResizeCalc(p.barValueHeight);
		
		p.barLabelTop = globalResizeCalc(p.barLabelTop);
		
		p.dashedAxisLen = globalResizeCalc(p.dashedAxisLen);
				//----------------
		proveDecimal = (""+p.probeSnapVal).indexOf(".") == -1 ? 0 : ((""+p.probeSnapVal).split(".")[1]).length;
		
		if(p.arrows)
		{
			p.arrowX = true;
			p.arrowY = true;
		}
		if(p.arrowX)
		{
			p.arrowXR = true;
			p.arrowXL = true;
		}
		if(p.arrowY)
		{
			p.arrowYU = true;
			p.arrowYD = true;
		}
		if(!p.isMaths)
		{
			p.toFixedX = false;
			p.toFixedY = false;
		}
		//----------------
		canvas = document.createElement("canvas");
		context = canvas.getContext("2d");
		//----------------
		canvasAxis = document.createElement("canvas");
		contextAxis = canvasAxis.getContext("2d");
		//----------------
		canvasCustomDraw = document.createElement("canvas");
		contextCustomDraw = canvasCustomDraw.getContext("2d");
		//----------------
		canvasBarLabel = document.createElement("canvas");
		contextBarLabel = canvasBarLabel.getContext("2d");
		//----------------
		canvasLine = document.createElement("canvas");
		contextLine = canvasLine.getContext("2d");
		//----------------
		canvasPoint = document.createElement("canvas");
		contextPoint = canvasPoint.getContext("2d");
		//----------------
		canvasProve = document.createElement("canvas");
		contextProve = canvasProve.getContext("2d");
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
			"top": p.y+"px"
		});
		//----------------
		p.target.append(canvas);
		p.target.append(canvasCustomDraw);
		p.target.append(canvasBarLabel);
		p.target.append(canvasLine);
		p.target.append(canvasAxis);
		p.target.append(canvasProve);
		p.target.append(canvasPoint);
		//----------------
		if(p.customProveIndex)
		{
			$(canvasProve).css({
				"z-index" : p.customProveIndex
			});
		}
		//----------------
		if(p.customIndex)
		{
			$(canvasCustomDraw).css({
				"z-index" : p.customIndex
			});
		}if(p.customLineCanvas)
		{
			$(canvasLine).css({
				"z-index" : p.customLineCanvas
			});
		}if(p.customPointCanvas)
		{
			$(canvasPoint).css({
				"z-index" : p.customPointCanvas
			});
		}
		if(p.pointIndex)
		{
			$(canvasPoint).css({
				"z-index" : p.pointIndex
			});
		}
		//----------------
		createLabelDivs();
		//----------------
		if(p.title)
		{
			if(typeof(p.title) == "string")
			{
				p.title ? $(canvasPoint).attr("p_title", GCTConv(p.title)) : null;
			}
		}
		//----------------
		p.visible == false ? p.target.css("display", "none") : null;
		p.index ? p.target.css("z-index", p.index) : null;
		//----------------
		switch(p.drawQuads)
		{
			case 1:
			p.xReg = "left";
			p.yReg = "bottom";
			p.zoomFromCenterX = false;
			p.zoomFromCenterY = false;
			break;
		}
		//---------------------------------
		createBaseCanvas();
		drawProve();
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
		//---------------------------------
		if(BrowserDetect.any())
		{
			$(document).on("commonToolTipActiveAndMoving", function(e)
			{
				graphOver({pageX:e.pageX, pageY:e.pageY, type:"mousemove"});
				proveOverGraph({pageX:e.pageX, pageY:e.pageY, type:"mousemove"});
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
	this.reSetParams = function(_obj,_internal)
	{
		if(p.probeFreeze && !_internal)
		{
			prevProvePointInPix = pointToPixel(p.provePoint, 0, true).x; //To make probe stable.
		}
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		
		if(_obj.customIndex)
		{
			$(canvasCustomDraw).css({
				"z-index" : p.customIndex
			});
		}if(_obj.customLineCanvas)
		{
			$(canvasLine).css({
				"z-index" : p.customLineCanvas
			});
		}if(_obj.customPointCanvas)
		{
			$(canvasPoint).css({
				"z-index" : p.customPointCanvas
			});
		}
		if(_obj.pointIndex)
		{
			$(canvasPoint).css({
				"z-index" : p.pointIndex
			});
		}
		if(_obj.probeSnapVal)
		{
			proveDecimal = (""+p.probeSnapVal).indexOf(".") == -1 ? 0 : ((""+p.probeSnapVal).split(".")[1]).length;
		}		
	}
	this.drawCanvas = function()
	{
		createBaseGrid();
		drawCanvas();
	}
	//================================================================================
	this.provePoint = function(_val)
	{
		if(_val != undefined)
		{
			p.provePoint = _val;
			drawProve();
		}
		else
		{
			return p.provePoint;
		}
	}
	//================================================================================
	this.provePointH = function(_val)
	{
		if(_val != undefined)
		{
			p.provePointH = _val;

			drawProve();
		}
		else
		{
			return p.provePointH;
		}
	}
	//================================================================================
	this.proveShow = function(_bool, flag)
	{
		if(flag)
		{
			p.probeVisibleH = _bool;
		}
		else
		{
			p.probeVisible = _bool;
		}
		if(p.probeVisibleH || p.probeVisible)
		{
			$(canvasProve).show();
		}
		else
		{
			$(canvasProve).hide();
		}
		drawProve();
	}
	//================================================================================
	this.setIndex = function(_indx)
	{
		p.target.css({
			"z-index" : _indx
		})
	}
	//================================================================================
	this.showGridX = function(_bool)
	{
		p.gridXVisible = _bool;
		createBaseGrid();
	}
	//================================================================================
	this.showGridY = function(_bool)
	{
		p.gridYVisible = _bool;
		createBaseGrid();
	}
	//================================================================================
	this.getGraphArea = function()
	{
		var _ppMin = pixelToPoint(0,0);
		var _ppMax = pixelToPoint(canvas.mw, canvas.mh);
		var _ppCenter = pixelToPoint(canvas.mw/2, canvas.mh/2);
		return {min:{x:_ppMin.x, y:_ppMin.y}, max:{x:_ppMax.x, y:_ppMax.y}, center:{x:_ppCenter.x, y:_ppCenter.y}};
	}
	//================================================================================
	this.setMouseEvent = function(e,bool)
	{
		graphOver(e);
		if(!bool)
		{
			panGraph(e);
		}
	}
	//================================================================================
	this.setUserLines = function(_arr)
	{
		for(var i in _arr)
			this.drawLines(_arr[i],true);
		drawLineCanvas();
	}
	//================================================================================
	this.setInterPoint = function(_arr)
	{
		for(var i in _arr)
			this.drawInterPoint(_arr[i],true);
		drawPointCanvas();
	}
	//================================================================================
	this.drawLines = function(_obj,doNotDraw)
	{
		if(!mouseDownActivated || p.updateOnDrag)
		{
			if(_obj.id == undefined || _obj.data == undefined)
			{
				return false;
			}
			var _arr = _obj.data;
			var _id = _obj.id;
			if(!userLines[_id])
			{
				userLines[_id] = 
				{
					point:[],
					color:"#000000",
					lineWidth: 2
				};
			}
			//---------------
			if(typeof(_obj.label) != "undefined")
			{
				userLines[_id].label = _obj.label;
			}
			if(_obj.reset)
			{
				userLines[_id].point = new Array();
			}
			if(typeof(_obj.dashed) != "undefined")
			{
				userLines[_id].dashed = _obj.dashed;
			}
			if(typeof(_obj.allowParse) != "undefined")
			{
				userLines[_id].allowParse = _obj.allowParse;
			}
			for(var i = 0; i < _arr.length; i++)
			{
				userLines[_id].point.push(
				{
					x:_arr[i].x,
					y:_arr[i].y
				});
			}
			//---------------
			if(_obj.color)
			{
				userLines[_id].color = _obj.color;
			}
			//---------------
			if(_obj.title)
			{
				userLines[_id].title = _obj.title;
			}
			//---------------
			if(_obj.toolTip)
			{
				userLines[_id].toolTip = _obj.toolTip;
			}
			//---------------
			if(_obj.lineWidth)
			{
				userLines[_id].lineWidth = Math.max((globalResizeCalc(_obj.lineWidth)),1); // globalResizeCalc added for line width 02/11/2015
			}
			//---------------
			if(_obj.borderWidth && _obj.borderColor)
			{
				userLines[_id].borderWidth = _obj.borderWidth;
				userLines[_id].borderColor = _obj.borderColor;
			}
			//---------------
			if(_obj.showArrow)
			{
				userLines[_id].showArrow = _obj.showArrow;
			}
			else
			{
				userLines[_id].showArrow = null;
			}
			//---------------
			if(_obj.pan)
			{
				userLines[_id].pan = true;
			}
			else
			{
				userLines[_id].pan = false;
			}
			//---------------
			userLines[_id].removeLineCap = userLines[_id].removeLineCap == "undefined" ? false : true
			if(!doNotDraw)
				drawLineCanvas();
		}
	}
	//================================================================================
	this.showNumbers = function(_bool)
	{
		p.showBarNumbers = _bool;
		drawLineCanvas();
	}
	//================================================================================
	this.drawInterPoint = function(_obj,doNotDraw)
	{
		if(!mouseDownActivated || p.updateOnDrag)
		{
			
			if(indexingArr.indexOf(_obj.id) == -1)
			{
				indexingArr.push(_obj.id);
			}
			else if(p.allowPointIndexing)
			{
				var curIndex = indexingArr.indexOf(_obj.id);
				var lastIndex = indexingArr.length;
				moveArrayElement(indexingArr,curIndex,lastIndex);
			}
			removeUndefinedFromArray(indexingArr);
			
			_obj.xPix = _obj.x;
			_obj.yPix = _obj.y;
			interSecPoints[_obj.id] = _obj;
			interSecPoints[_obj.id].toolTip = typeof(_obj.toolTip) != "undefined" ? _obj.toolTip : "";
			interSecPoints[_obj.id].radius = typeof(_obj.radius) != "undefined" ? _obj.radius : p.dotSize;
			//
			if(isOnDots == _obj.id)
			{
				var _xVal = ((""+Number(interSecPoints[isOnDots].x).toFixed(p.decimal)*1).replace(/-/g, "&ndash;"));
				var _yVal = ((""+Number(interSecPoints[isOnDots].y).toFixed(p.decimal)*1).replace(/-/g, "&ndash;"));
				
				//.....................
				var _pTem = pointToPixel(interSecPoints[isOnDots].x, interSecPoints[isOnDots].y, true);
				var tempX = _pTem.x + $(canvasPoint).offset().left + interSecPoints[_obj.id].radius  //+ radius;
				var tempY = _pTem.y + $(canvasPoint).offset().top + interSecPoints[_obj.id].radius //+ radius;
				//.....................
				var mouseE = new Object();
				if(BrowserDetect.any())
				{
					mouseE.touches = [];
					mouseE.touches.push({pageX:tempX,pageY:tempY});
				}
				mouseE.pageX = tempX
				mouseE.pageY = tempY;			
				if(p.toolTip && checkCanvasBoundary(mouseE))
				{
					if(typeof(interSecPoints[isOnDots].toolTip) != "undefined" && String(interSecPoints[isOnDots].toolTip).length > 0)
					{
						if(interSecPoints[isOnDots].toolTip)
							toolTip.showTip(interSecPoints[isOnDots].toolTip,mouseE);
						else
							toolTip.hideTip()
					}
					else if(p.toolTip == "x")
					{
						toolTip.showTip(_xVal,mouseE);
					}
					else if(p.toolTip == "y")
					{
						toolTip.showTip(Number(_yVal),mouseE);
					}
					else
					{
						toolTip.showTip("("+_xVal+", "+_yVal+")",mouseE);
					}
				}
			}
			//---------------
			if(!doNotDraw)
				drawPointCanvas();
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
	this.setProvePoints = function(_arr)
	{
		p.probeInterPoint = _arr;
		drawProve();
	}
	//================================================================================
	this.cleanAll = function(_id)
	{
		if(_id != undefined)
		{
			userLines[_id] = undefined;
			interSecPoints[_id] = undefined;
		}
		else
		{
			userLines = new Array();
			interSecPoints = new Array();
		}
		drawLineCanvas();
		drawPointCanvas();
	}
	//================================================================================
	this.getSnapShot = function(_complete)
	{
		if(_complete)
		{
			return {x:p.x, y:p.y, width:canvas.width, height:canvas.height};
		}
		else
		{
			return {x:p.x + canvas.mx, y:p.y + canvas.my, width:canvas.mw, height:canvas.mh};
		}
	}
	//================================================================================
	this.addEventListener = function(_evt, _fun)
	{
		p[_evt] = _fun;
	}
	//================================================================================
	this.reArrangeGraph = function(_obj,zoomPoint)
	{
		_obj.unitX ? _obj.unitX = _obj.unitX / globalResizeCalc(1) : null;
		_obj.unitY ? _obj.unitY = _obj.unitY / globalResizeCalc(1) : null;
		
		var _ncenterPoint = zoomPoint ? zoomPoint : {x:_thisObj.getGraphArea().center.x, y:_thisObj.getGraphArea().center.y};
		var _centerPix = zoomPoint ? pointToPixel(zoomPoint.x,zoomPoint.y) : pointToPixel(_thisObj.getGraphArea().center.x, _thisObj.getGraphArea().center.y);
		
		_thisObj.reSetParams(_obj,true);
		var _newCenterPix = pointToPixel(_ncenterPoint.x, _ncenterPoint.y);
		
		setQuardZoomStyle();
		if(!isNaN(p.xReg) && p.zoomFromCenterX)
		{
			p.xReg += _centerPix.x - _newCenterPix.x;
		}
		if(!isNaN(p.yReg) && p.zoomFromCenterY)
		{
			p.yReg += _centerPix.y - _newCenterPix.y;
		}
		
		// added on 8/12/2015 : add to fix to axis values in runtime.
		
		if(!p.isMaths)
		{
			p.toFixedX = false;
			p.toFixedY = false;
		}
		else
		{
			p.toFixedX = true;
			p.toFixedY = true;
		}
		if(p.probeFreeze)
		{
			calcProve();
		}
		createLabelDivs();
		createBaseGrid();
		drawLineCanvas();
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
	this.getRegPoints = function()
	{
		return {x:p.xReg,y:p.yReg};
	}
	//================================================================================
	this.setPanX = function(_val,flagForLine,flagForPoint)//_val should be always 1 greater than actual value
	{
		p.xReg = canvas.mx;
		p.xReg = -1 * (pointToPixel(_val - 1, 0,true).x - p.marginLeft);
		calcProve();
		createBaseGrid();
		if(!flagForLine)
			drawLineCanvas();
		if(!flagForPoint)
			drawPointCanvas();
	}
	//================================================================================
	this.setPanY = function(_val)//_val should be always 1 greater than actual value
	{
		p.yReg = canvas.my;
		p.yReg = -1 * (pointToPixel(0, _val - 1,true).y - p.marginTop);
		createBaseGrid();
		drawLineCanvas();
		drawPointCanvas();
	}
	//================================================================================
	this.scratchPad = function()
	{
		return canvasCustomDraw;
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function createBaseCanvas()
	{
		//canvasLineBuffer = p.drawQuads == 1 && !p.lineType ? -1 * (p.majorLineBigWidth / 2) : canvasLineBuffer;
		//-------
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
		//-------
		canvasBarLabel.width = p.width;
		canvasBarLabel.height = p.height;
		$(canvasBarLabel).css(
		{
			"position": "absolute",
			"left": "0px",
			"top": "0px"
		}).attr("id", "canvasBarLabel_"+p.id);
		//-------
		canvas.mx = p.marginLeft;
		canvas.my = p.marginTop;
		canvas.mw = canvas.width - p.marginLeft - p.marginRight;
		canvas.mh = canvas.height - p.marginTop - p.marginBottom;
		//-------
		canvasLine.width = canvas.mw + (p.canvasLineBuffer * 2);
		canvasLine.height = canvas.mh + (p.canvasLineBuffer * 2);
		$(canvasLine).css(
		{
			"position": "absolute",
			"left": (canvas.mx - p.canvasLineBuffer) + "px",
			"top": (canvas.my - p.canvasLineBuffer) + "px"
		}).attr("id", "canvasLine_"+p.id);
		//-------
		canvasAxis.width = canvas.width;
		canvasAxis.height = canvas.height;
		$(canvasAxis).css(
		{
			"position": "absolute",
			"left": "0px",
			"top": "0px"
		}).attr("id", "canvasAxis_"+p.id);
		//-------
		canvasCustomDraw.width = p.width;
		canvasCustomDraw.height = p.height;
		$(canvasCustomDraw).css(
		{
			"position": "absolute",
			"left": "0px",
			"top": "0px"
		}).attr("id", "canvasCustomDraw_"+p.id);
		//-------
		canvasProve.width = canvas.width;
		canvasProve.height = canvas.height;
		$(canvasProve).css(
		{
			"position": "absolute",
			"left": "0px",
			"top": "0px"
		}).attr("id", "canvasProve_"+p.id);
		p.probeVisible || p.probeVisibleH ? $(canvasProve).show() : $(canvasProve).hide();
		//-------
		canvasPoint.width = canvas.mw + (p.dotSize * 2);
		canvasPoint.height = canvas.mh + (p.dotSize * 2);
		$(canvasPoint).css(
		{
			"position": "absolute",
			"left": (canvas.mx - p.dotSize) + "px",
			"top": (canvas.my - p.dotSize) + "px"
		}).attr("id", "canvasPoint_"+p.id);
		if(p.panX || p.panY)
		{
			if(p.mouseCurType == "move")
			{
				$(canvasPoint).addClass("commonpan");
			}
			else if(p.mouseCurType == "grab")
			{
				$(canvasPoint).addClass("commongrab");
			}
			$(labelXDiv).addClass("commongrab");
			$(labelYDiv).addClass("commongrab");
		}
		//-------
		//if(p.panX || p.panY)
		//{
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
			//------------------------------
			canvasPoint.removeEventListener("mouseout", graphOut, false);
			canvasPoint.addEventListener("mouseout", graphOut, false);
			//------------------------------
		/*}
		else
		{
			canvasPoint.removeEventListener("touchstart", panGraph, false);
			canvasPoint.removeEventListener("touchmove", panGraph, false);
			canvasPoint.removeEventListener("touchend", panGraph, false);
			//------------------------------
			canvasPoint.removeEventListener("mousedown", panGraph, false);
		}*/
		//------------------------------
		// Comented to remove the probe events as now the probe prints inside the graph area.
		if(BrowserDetect.any())
		{
			$(canvasProve).unbind("touchstart", provePanGraph).bind("touchstart", provePanGraph);
			$(canvasProve).unbind("touchmove", provePanGraph).bind("touchmove", provePanGraph);
			$(canvasProve).unbind("touchend", provePanGraph).bind("touchend", provePanGraph);
		}
		else
		{
			
			$(canvasProve).unbind("mousedown", provePanGraph).bind("mousedown", provePanGraph);
			$(canvasProve).unbind("mousemove", proveOverGraph).bind("mousemove", proveOverGraph);
		}
		//-------
		createBaseGrid();
	}
	//================================================================================
	function createBaseGrid()
	{
		probeSnapPoints = new Array();
		probeSnapPointsH = new Array();
		drawingObject = new Array();
		var _maxX = canvas.mx + canvas.mw;
		var _maxY = canvas.my + canvas.mh;
		//---------------------------------
		p.zoomValX = p.zoomValX < p.minZoom ? p.minZoom : p.zoomValX > p.maxZoom ? p.maxZoom : p.zoomValX;
		p.zoomValY = p.zoomValY < p.minZoom ? p.minZoom : p.zoomValY > p.maxZoom ? p.maxZoom : p.zoomValY;
		//---------------------------------
		if(p.drawQuads == 1)
		{
			if(p.xReg > canvas.mx)
			{
				p.xReg = "left";
			}
			if(p.yReg < canvas.my + canvas.mh)
			{
				p.yReg = "bottom";
			}
		}
		//---------------------------------
		switch(p.xReg)
		{
			case "left":
			p.xReg = canvas.mx;
			break;
			case "right":
			p.xReg = canvas.mx + canvas.mw;
			break;
			case "center":
			p.xReg = canvas.mx + (canvas.mw/2);
			break;
		}
		//---------------------------------
		switch(p.yReg)
		{
			case "top":
			p.yReg = canvas.my;
			break;
			case "bottom":
			p.yReg = canvas.my + canvas.mh;
			break;
			case "center":
			p.yReg = canvas.my + (canvas.mh/2);
			break;
		}
		//-------------------------------------------
		if(p.minorIntervalX && p.minorIntervalY)
		{
			//---------------------------------
			/// X CORDINATES POSITIVE
			probeSnapPoints.push(0);
			probeSnapPointsH.push(0);
			var zeroPos = pointToPixel(0, 0);
			
			if(p.gridYVisible)
			{
				var xNum = p.minorIntervalX;
				
				var xPix = pointToPixel(xNum, 0);
				while(xPix.x < _maxX)
				{
					drawingObject.push(
					{
						points:
						[{
							x: xPix.x,
							y: canvas.my,
						},
						{
							x: xPix.x,
							y: _maxY,
						}],
						strokeStyle: p.gridXYMinorColor,
						lineWidth: 1,
					});
					probeSnapPoints.push(Number(xNum.toFixed(p.decimal)));
					xNum+=p.minorIntervalX;
					xPix = pointToPixel(xNum, 0);
				}
				/// X CORDINATES NEGATIVE
				var xNum = -1 * p.minorIntervalX;
				//xNum = -1 * p.minorIntervalX;
				xPix = pointToPixel(xNum, 0);
				while(xPix.x > canvas.mx)
				{
					drawingObject.push(
					{
						points:
						[{
							x: xPix.x,
							y: canvas.my,
						},
						{
							x: xPix.x,
							y: _maxY,
						}],
						strokeStyle: p.gridXYMinorColor,
						lineWidth: 1,
					});
					probeSnapPoints.push(Number(xNum.toFixed(p.decimal)));
					xNum-=p.minorIntervalX;
					xPix = pointToPixel(xNum, 0);
				}
			}
			if(p.gridXVisible)
			{
				// Y CORDINATES POSITIVE
				var yNum = p.minorIntervalY;
				var yPix = pointToPixel(0, yNum);
				while(yPix.y > canvas.my)
				{
					drawingObject.push(
					{
						points:
						[{
							x: p.dashedXAxis ? p.xReg - (p.leftGridMinor ? p.dashedAxisLen/2 : 0)  : canvas.mx,
							y: yPix.y,
						},
						{
							x: p.dashedXAxis ? p.xReg + (p.rightGridMinor ? p.dashedAxisLen/2 : 0): _maxX,
							y: yPix.y,
						}],
						strokeStyle: p.gridXYMinorColor,
						lineWidth: p.dashedXAxis ? p.majorLineSmallWidth : 1,
					});
					probeSnapPointsH.push(Number(yNum.toFixed(p.decimal)));
					yNum+=p.minorIntervalY;
					yPix = pointToPixel(0, yNum);
				}
				// Y CORDINATES NEGATIVE
				yNum = -1 * p.minorIntervalY;
				yPix = pointToPixel(0, yNum);
				while(yPix.y < _maxY)
				{
					drawingObject.push(
					{
						points:
						[{
							x: p.dashedXAxis ? p.xReg - (p.leftGridMinor ? p.dashedAxisLen/2 : 0)  : canvas.mx,
							y: yPix.y,
						},
						{
							x: p.dashedXAxis ? p.xReg + (p.rightGridMinor ? p.dashedAxisLen/2 : 0)  : _maxX,
							y: yPix.y,
						}],
						strokeStyle: p.gridXYMinorColor,
						lineWidth: p.dashedXAxis ? p.majorLineSmallWidth : 1,
					});
					probeSnapPointsH.push(Number(yNum.toFixed(p.decimal)));
					yNum-=p.minorIntervalY;
					yPix = pointToPixel(0, yNum);
				}
			}
			baseGridIndex = drawingObject.length;
		}
		//---------------------------------
		var axisPointArr = [];
		//---------------------------------
		/// X CORDINATES POSITIVE
		var zeroPos = pointToPixel(0, 0);
		if(p.gridYVisible)
		{
			var xNum = 0,_arrowWidth = globalResizeCalc(13);
			var xPix = pointToPixel(xNum, 0);
			xNum == 0 && p.stopAxisY ? xPix.x = canvas.mx : null;
			while(xPix.x < _maxX)
			{
				var tempObj = {
					points:
					[{
						x: xPix.x,
						y: xNum == 0 && p.arrowYU ? canvas.my + _arrowWidth : canvas.my,
					},
					{
						x: xPix.x,
						y: xNum == 0 && p.arrowYD && p.drawQuads != 1 ? _maxY - _arrowWidth : _maxY,
					}],
					strokeStyle: (xNum == 0 && p.drawQuads != 1) ? p.gridXYColor : p.gridColor,
					lineWidth: (xNum == 0 && p.drawQuads != 1) ? p.axisWidth : p.majorLineSmallWidth,
					arrows: xNum == 0 ? "y" : "",
				}
				xNum == 0 && p.drawQuads != 1 ? axisPointArr.push(tempObj) : drawingObject.push(tempObj);
				xNum+=p.majorIntervalX;
				xPix = pointToPixel(xNum, 0);
			}
			/// X CORDINATES NEGATIVE
			xNum = -1 * p.majorIntervalX;
			xPix = pointToPixel(xNum, 0);
			while(xPix.x > canvas.mx)
			{
				var tempObj = {
					points:
					[{
						x: xPix.x,
						y: canvas.my,
					},
					{
						x: xPix.x,
						y: _maxY,
					}],
					strokeStyle: (xNum == 0 && p.drawQuads != 1) ? p.gridXYColor : p.gridColor,
					lineWidth: (xNum == 0 && p.drawQuads != 1) ? p.axisWidth : p.majorLineSmallWidth,
					arrows: "",
				}
				xNum == 0 && p.drawQuads != 1 ? axisPointArr.push(tempObj) : drawingObject.push(tempObj);
				xNum-=p.majorIntervalX;
				xPix = pointToPixel(xNum, 0);
			}
		}
		if(p.gridXVisible)
		{
			// Y CORDINATES POSITIVE
			var yNum = 0,_arrowWidth = globalResizeCalc(13);
			var yPix = pointToPixel(0, yNum);
			yNum == 0 && p.stopAxisX ? yPix.y = _maxY/* canvas.mh */ : null;
			while(yPix.y > canvas.my)
			{
				var tempObj = {
					points:
					[{
						x: p.dashedXAxis ? p.xReg - (p.leftGridMinor ? p.dashedAxisLen/2 : 0) : yNum == 0 && p.arrowXL && p.drawQuads != 1 ? canvas.mx + _arrowWidth : canvas.mx,
						y: yPix.y,
					},
					{
						x: p.dashedXAxis ? p.xReg + (p.rightGridMinor ? p.dashedAxisLen/2 : 0) : yNum == 0 && p.arrowXR ? _maxX - _arrowWidth : _maxX,
						y: yPix.y,
					}],
					strokeStyle: (yNum == 0 && p.drawQuads != 1) ? p.gridXYColor : p.gridColor,
					lineWidth: (yNum == 0 && p.drawQuads != 1) ? p.axisWidth : p.majorLineSmallWidth,
					arrows: yNum == 0 ? "x" : "",
				}
				yNum == 0 && p.drawQuads != 1 ? axisPointArr.push(tempObj) : drawingObject.push(tempObj);
				yNum+=p.majorIntervalY;
				yPix = pointToPixel(0, yNum);
			}
			// Y CORDINATES NEGATIVE
			yNum = -1 * p.majorIntervalY;
			yPix = pointToPixel(0, yNum);
			while(yPix.y < _maxY)
			{
				var tempObj = {
					points:
					[{
						x:  p.dashedXAxis ? p.xReg - (p.leftGridMinor ? p.dashedAxisLen/2 : 0) : canvas.mx,
						y: yPix.y,
					},
					{
						x:  p.dashedXAxis ? p.xReg + (p.rightGridMinor ? p.dashedAxisLen/2 : 0) : _maxX,
						y: yPix.y,
					}],
					strokeStyle: (yNum == 0 && p.drawQuads != 1) ? p.gridXYColor : p.gridColor,
					lineWidth: (yNum == 0 && p.drawQuads != 1) ? p.axisWidth : p.majorLineSmallWidth,
					arrows: "",
				}
				yNum == 0 && p.drawQuads != 1 ? axisPointArr.push(tempObj) : drawingObject.push(tempObj);
				yNum-=p.majorIntervalY;
				yPix = pointToPixel(0, yNum);
			}
		}
		baseGridIndex = drawingObject.length;
		//---------------------------
			for(var i in axisPointArr)
			{
				drawingObject.push(axisPointArr[i]);
			}
		//---------------------------
		var _newMaxY = p.drawQuads == 0 ? parseInt(p.labelStyleXYSize) + 10 : 0;
		//---------------------------
		numberX = new Array();
		numberY = new Array();
		
		if(p.gridYVisible && p.intervalYVisible)
		{
			xNum = 0
			xPix = pointToPixel(xNum, 0);
			while(xPix.x < (canvas.mx + canvas.mw))
			{
				if(xPix.x >= canvas.mx && (p.showXAxis == true || p.lineType == true))
				{
					numberX.push({label:p.lineType || p.showXAxis ? p.drawQuads == 0 && xNum == 0 && !p.centerLabelYVisible ? "" : xNum : "", x:xPix.x, y:p.stopAxisX ? _maxY + canvas.my : ((zeroPos.y > _maxY - _newMaxY && p.stopLabelX) ? _maxY - _newMaxY : (zeroPos.y < canvas.my && p.stopLabelX) ? canvas.my : zeroPos.y) + parseInt(p.labelStyleXYSize) + globalResizeCalc(5)});
				}
				xNum += p.labelIntervalX;
				xNum = Number(xNum.toFixed(p.decimal));
				xPix = pointToPixel(xNum, 0);
			}
			var _mxxx = _thisObj.getGraphArea().max.x;
			xNum = 0;
			xPix = pointToPixel(xNum, 0);
			while(xPix.x > canvas.mx)
			{
				if(xPix.x > canvas.mx && xNum < _mxxx)
				{
					numberX.push({label:p.lineType || p.showXAxis ? p.drawQuads == 0 && xNum == 0 && !p.centerLabelYVisible ? "" : xNum : "", x:xPix.x, y:p.stopAxisX ? _maxY + canvas.my : ((zeroPos.y > _maxY - _newMaxY && p.stopLabelX) ? _maxY - _newMaxY : (zeroPos.y < canvas.my && p.stopLabelX) ? canvas.my : zeroPos.y) + parseInt(p.labelStyleXYSize) + globalResizeCalc(5)});
				}
				xNum -= p.labelIntervalX;
				xNum = Number(xNum.toFixed(p.decimal));
				xPix = pointToPixel(xNum, 0);
			}
		}
		//---------------------------
		if(p.gridXVisible && p.intervalXVisible)
		{
			numberY = new Array();
			yNum = 0;
			yPix = pointToPixel(0, yNum);
			//---------------------------
			var _newMaxX = p.drawQuads == 0 ? parseInt(p.labelStyleXYSize) + 15 : 0;
			//---------------------------
			while(yPix.y > canvas.my)
			{
				if(yPix.y <= canvas.my + canvas.mh)
				{
					numberY.push({label:p.drawQuads == 0 && yNum == 0 && !p.centerLabelXVisible ? "" : yNum, x:(p.stopAxisY ? canvas.mx : (zeroPos.x > _maxX && p.stopLabelY) ? _maxX : (zeroPos.x < canvas.mx + _newMaxX && p.stopLabelY) ? canvas.mx + _newMaxX : zeroPos.x) - globalResizeCalc(8), y:yPix.y + (parseInt(p.labelStyleXYSize)/2) - globalResizeCalc(2)});
				}
				yNum += p.labelIntervalY;
				yNum = Number(yNum.toFixed(p.decimal));
				yPix = pointToPixel(0, yNum);
			}
			//---------------------------
			var _myyy = _thisObj.getGraphArea().min.y;
			yNum = 0;
			yPix = pointToPixel(0, yNum);
			while(yPix.y < _maxY)
			{
				if(yPix.y < canvas.my + canvas.mh && yNum < _myyy)
				{
					numberY.push({label:p.drawQuads == 0 && yNum == 0 && !p.centerLabelXVisible ? "" : yNum, x:(p.stopAxisY ? canvas.mx : (zeroPos.x > _maxX && p.stopLabelY) ? _maxX : (zeroPos.x < canvas.mx + _newMaxX && p.stopLabelY) ? canvas.mx + _newMaxX : zeroPos.x) - globalResizeCalc(8), y:yPix.y + (parseInt(p.labelStyleXYSize)/2) - globalResizeCalc(2)});
				}
				yNum -= p.labelIntervalY;
				yNum = Number(yNum.toFixed(p.decimal));
				yPix = pointToPixel(0, yNum);
			}
		}
		//---------------------------
		drawCanvas();
	}
	//================================================================================
	function drawCanvas(_cn, _ct)
	{
		var _cnv = canvas;
		var _ctx = context;
		var _mx = canvas.mx;
		var _my = canvas.my;
		var _mw = canvas.mw;
		var _mh = canvas.mh;
		var _pToN = new Object();
		if(_cn && _ct)
		{
			_cnv = _cn;
			_ctx = _ct;
		}
		_cnv.width = _cnv.width;
		_ctx.beginPath();
		_ctx.save();
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
		_ctx.restore();
		_ctx.closePath();
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
					_drawStart == 0 ? _ctx.moveTo(parseInt(_arr[j].x)+0.1, parseInt(_arr[j].y)+0.1) : _ctx.lineTo(parseInt(_arr[j].x)+0.1, parseInt(_arr[j].y)+0.1);
					_drawStart++;
				}
			}
			if(drawingObject[i].text && _drawStart > 0)
			{
				var _tObj = drawingObject[i].text;
				_ctx.fillStyle = p.labelStyleXYColor;
				_ctx.font = p.labelStyleXYStyle + " " + p.labelStyleXYSize + " " + p.labelStyleXYFamily;
				_ctx.textAlign = _tObj.textAlign ? _tObj.textAlign : "left";
				_ctx.fillText(_tObj.txt, parseInt(_tObj.x)+0.5, parseInt(_tObj.y)+0.5);
			}
			_ctx.stroke();
			
			if(drawingObject[i].arrows == "x")
			{
				_pToN.y = drawingObject[i].points[0].y
			}
			else if(drawingObject[i].arrows == "y")
			{
				_pToN.x = drawingObject[i].points[0].x
			}
		}
		for(var k = 0; k < numberX.length; k ++)
		{
			var _tObj = numberX[k];
			_ctx.fillStyle = p.labelStyleXYColor;
			_ctx.font = p.labelStyleXYStyle + " " + p.labelStyleXYSize + " " + p.labelStyleXYFamily;
			_ctx.textAlign = "center";
			//_ctx.fillText(_tObj.label < 0? "–"+Math.abs(_tObj.label) : _tObj.label, _tObj.x, _tObj.y);
			if(_tObj.label.toString().length > 0)
			{
				var str = Math.abs(_tObj.label);
				str = p.toFixedX ? str : Number(str).toFixed(p.decimal);
				_ctx.fillText(str+p.xLabelSuffix, parseInt(_tObj.x)+0.5, parseInt(_tObj.y)+0.5);
				//----------------
				_ctx.fillStyle = p.labelStyleXYColor;
				_ctx.font = p.labelStyleXYStyle + " " + p.labelStyleXYSize + " " + p.labelStyleXYFamily;
				_ctx.textAlign = "right";
				_ctx.fillText(_tObj.label < 0 ? "–" : "", parseInt(_tObj.x - (_ctx.measureText(str+p.xLabelSuffix).width/2) - globalResizeCalc(2))+0.5, parseInt(_tObj.y)+0.5);
			}
		}
		//--------------------------
		for(var k = 0; k < numberY.length; k ++)
		{
			var _tObj = numberY[k];
			_ctx.fillStyle = p.labelStyleXYColor;
			_ctx.font = p.labelStyleXYStyle + " " + p.labelStyleXYSize + " " + p.labelStyleXYFamily;
			_ctx.textAlign = "right";
			if(_tObj.label.toString().length > 0)
			{
				var str = Math.abs(_tObj.label);
				str = p.toFixedY ? str : Number(str).toFixed(p.decimal);
				str = _tObj.label < 0 ? "–" + str : str;
				_ctx.fillText(str+p.yLabelSuffix,parseInt(_tObj.x)+0.5, parseInt(_tObj.y)+0.5);
			}
		}
		//--------------------------
		if(p.labelX)
		{
			$(labelXDiv).html(p.labelX);
		}
		if(p.labelY)
		{
			$(labelYDiv).html(p.labelY);
		}
		//--------------------------
		_ctx.beginPath();
		_ctx.fillStyle = p.gridXYColor;
		if(p.gridXVisible && p.drawQuads != 1)
		{
			var _arrowWidth = globalResizeCalc(14);
			if(_pToN.y < canvas.my)
			{
				_pToN.y = canvas.my;
			}
			else if(_pToN.y > canvas.my + canvas.mh)
			{
				_pToN.y = canvas.my + canvas.mh;
			}
			else
			{
				//Right
				if(p.arrowXR)
				{
					_ctx.moveTo(parseInt(canvas.mx + canvas.mw)+0.5, parseInt(_pToN.y)+0.5);
					_ctx.lineTo(parseInt((canvas.mx + canvas.mw)-_arrowWidth)+0.5, parseInt(_pToN.y-_arrowWidth/2)+0.5);
					_ctx.lineTo(parseInt((canvas.mx + canvas.mw)-_arrowWidth)+0.5, parseInt(_pToN.y+_arrowWidth/2)+0.5);
					_ctx.lineTo(parseInt(canvas.mx + canvas.mw)+0.5, parseInt(_pToN.y)+0.5);
				}
				//Left
				if(p.arrowXL)
				{
					_ctx.moveTo(parseInt(canvas.mx)+0.5, parseInt(_pToN.y)+0.5);
					_ctx.lineTo(parseInt(canvas.mx+_arrowWidth)+0.5, parseInt(_pToN.y-_arrowWidth/2)+0.5);
					_ctx.lineTo(parseInt(canvas.mx+_arrowWidth)+0.5, parseInt(_pToN.y+_arrowWidth/2)+0.5);
					_ctx.lineTo(parseInt(canvas.mx)+0.5, parseInt(_pToN.y)+0.5);
				}
				//
			}
		}
		//====================
		if(p.gridYVisible && p.drawQuads != 1)
		{
			var _arrowWidth = globalResizeCalc(14);
			if(_pToN.x < canvas.mx)
			{
				_pToN.x = canvas.mx;
			}
			else if(_pToN.x> canvas.mx + canvas.mw)
			{
				_pToN.x = canvas.mx + canvas.mw;
			}
			else
			{
				//Top
				if(p.arrowYU)
				{
					_ctx.moveTo(parseInt(_pToN.x)+0.5, parseInt(canvas.my)+0.5);
					_ctx.lineTo(parseInt(_pToN.x-_arrowWidth/2)+0.5, parseInt(canvas.my+_arrowWidth)+0.5);
					_ctx.lineTo(parseInt(_pToN.x+_arrowWidth/2)+0.5, parseInt(canvas.my+_arrowWidth)+0.5);
					_ctx.lineTo(parseInt(_pToN.x)+0.5, parseInt(canvas.my)+0.5);
				}
				//Bottom
				if(p.arrowYD)
				{
					_ctx.moveTo(parseInt(_pToN.x)+0.5, parseInt(canvas.my + canvas.mh)+0.5);
					_ctx.lineTo(parseInt(_pToN.x-_arrowWidth/2)+0.5, parseInt(canvas.my + canvas.mh-_arrowWidth)+0.5);
					_ctx.lineTo(parseInt(_pToN.x+_arrowWidth/2)+0.5, parseInt(canvas.my + canvas.mh-_arrowWidth)+0.5);
					_ctx.lineTo(parseInt(_pToN.x)+0.5, parseInt(canvas.my + canvas.mh)+0.5);
				}
				//
			}
		}
		_ctx.fill();
		//--------------------------
		if(p.drawQuads == 1)
		{
			var _arrowWidth = globalResizeCalc(14);
			canvasAxis.width = canvasAxis.width;
			if(p.gridYVisible)
			{
				contextAxis.beginPath();
				contextAxis.strokeStyle = p.gridXYColor;
				contextAxis.fillStyle = p.gridXYColor;
				contextAxis.lineWidth = p.axisWidth;
				contextAxis.moveTo(parseInt(canvas.mx), p.arrowY ? parseInt(canvas.my + _arrowWidth) : parseInt(canvas.my));
				//contextAxis.lineTo(canvas.mx, p.arrowY ? canvas.my + canvas.mh + 2 : (canvas.my + 13) + canvas.mh + 2); ------------> Prev
				contextAxis.lineTo(parseInt(canvas.mx), p.arrowY ? parseInt(canvas.my + canvas.mh + globalResizeCalc(2)) : parseInt((canvas.my) + canvas.mh + globalResizeCalc(2)));  //  ------------> Updated
				contextAxis.stroke();
				if(p.arrowYU)
				{
					contextAxis.beginPath();
					contextAxis.strokeStyle = p.gridXYColor;
					contextAxis.fillStyle = p.gridXYColor;
					contextAxis.lineWidth = p.axisWidth;
					contextAxis.moveTo(parseInt(canvas.mx)+0.5, parseInt(canvas.my)+0.5);
					contextAxis.lineTo(parseInt(canvas.mx-_arrowWidth/2)+0.5, parseInt(canvas.my+_arrowWidth)+0.5);
					contextAxis.lineTo(parseInt(canvas.mx+_arrowWidth/2)+0.5, parseInt(canvas.my+_arrowWidth)+0.5);
					contextAxis.lineTo(parseInt(canvas.mx)+0.5, parseInt(canvas.my)+0.5);
					contextAxis.fill();
				}
			}
			if(p.gridXVisible)
			{
				contextAxis.beginPath();
				contextAxis.strokeStyle = p.gridXYColor;
				contextAxis.fillStyle = p.gridXYColor;
				contextAxis.lineWidth = p.axisWidth;
				contextAxis.moveTo(parseInt(canvas.mx), parseInt(canvas.my + canvas.mh));
				contextAxis.lineTo(p.arrowXR ? parseInt(canvas.mx + canvas.mw - _arrowWidth) : parseInt(canvas.mx + canvas.mw), parseInt(canvas.my + canvas.mh));
				contextAxis.stroke();
				if(p.arrowXR)
				{
					contextAxis.beginPath();
					contextAxis.strokeStyle = p.gridXYColor;
					contextAxis.fillStyle = p.gridXYColor;
					contextAxis.lineWidth = p.axisWidth;
					contextAxis.moveTo(parseInt((canvas.mx + canvas.mw))+0.5, parseInt(canvas.my + canvas.mh)+0.5);
					contextAxis.lineTo(parseInt((canvas.mx + canvas.mw)-_arrowWidth)+0.5, parseInt(canvas.my + canvas.mh - _arrowWidth/2)+0.5);
					contextAxis.lineTo(parseInt((canvas.mx + canvas.mw)-_arrowWidth)+0.5, parseInt(canvas.my + canvas.mh + _arrowWidth/2)+0.5);
					contextAxis.lineTo(parseInt((canvas.mx + canvas.mw))+0.5, parseInt(canvas.my + canvas.mh)+0.5);
					contextAxis.fill();
				}
			}
			if(_pToN.x < canvas.mx)
			{
				_pToN.x = canvas.mx;
			}
			else if(_pToN.x + _ctx.measureText(p.labelY).width + 30 > canvas.mx + canvas.mw)
			{
				_pToN.x = canvas.mx + canvas.mw - _ctx.measureText(p.labelY).width - globalResizeCalc(30);
			}
			//-----------------------------
			if(_pToN.y > canvas.my + canvas.mh)
			{
				_pToN.y = canvas.my + canvas.mh;
			}
		}
		//-------------------------------
		if(_pToN.y < canvas.my + 30)
		{
			_pToN.y = canvas.my + 30;
		}
		//-------------------------------
		if(_pToN.x> canvas.mx + canvas.mw - 35)
		{
			_pToN.x = canvas.mx + canvas.mw - 35;
		}
		if(p.labelX)
		{
			$(labelXDiv).css(
			{
				"bottom": -(_pToN.y - globalResizeCalc(5))+"px",
				"right": -(canvas.mx + canvas.mw)+"px",
			});
		}
		if(p.labelY)
		{
			$(labelYDiv).css(
			{
				"left":(_pToN.x + globalResizeCalc(15))+"px",
				"top":(canvas.my)+"px"
			});
		}
		//--------------------------
	}
	//================================================================================
	function drawLineCanvas()
	{
		canvasLine.width = canvasLine.width;
		if(!p.lineType)
		{
			canvasBarLabel.width = canvasBarLabel.width;
			var _ctx = canvasBarLabel.getContext("2d");
			//------------------------------------
			var _cnt = 0;
		}
		//------------------------------------
		gapCount = 0;
		for(var i = 0; i < userLines.length; i++)
		{
			if(userLines[i])
			{
				var _pnt = userLines[i].point;
				contextLine.beginPath();
				
				if(p.lineType)
				{
					contextLine.lineWidth = userLines[i].lineWidth;
					if(!userLines[i].removeLineCap)
						contextLine.lineCap = "round";
					if(!contextLine.setLineDash && typeof userLines[i].dashed != "undefined" && userLines[i].dashed[0])
					{
						var _pToN_1 = pointToPixel(_pnt[0].x, _pnt[0].y, true);
						var _pToN_2 = pointToPixel(_pnt[_pnt.length-1].x, _pnt[_pnt.length-1].y, true);
						typeof(userLines[i].dashed) != "undefined" ? contextLine.dashedLine(_pToN_1.x+ p.canvasLineBuffer,_pToN_1.y+ p.canvasLineBuffer, _pToN_2.x + p.canvasLineBuffer, _pToN_2.y + p.canvasLineBuffer, globalResizeCalc(10)) : null;
					}
					else
					{
						if(contextLine.setLineDash)
							contextLine.setLineDash([]);
						typeof userLines[i].dashed  != "undefined" && userLines[i].dashed[0] > 0 ? contextLine.setLineDash(userLines[i].dashed) : null;
						
						for(var j = 0; j < _pnt.length; j++)
						{
							var _pToN_2 = pointToPixel(_pnt[j].x, _pnt[j].y, true);
							if(j > 0)
							{
								var _pToN_1 = pointToPixel(_pnt[j - 1].x, _pnt[j - 1].y, true);
								if(userLines[i].allowParse)
								{
									contextLine.moveTo(tf(_pToN_1.x + p.canvasLineBuffer),tf(_pToN_1.y + p.canvasLineBuffer));
									contextLine.lineTo(tf(_pToN_2.x + p.canvasLineBuffer),tf(_pToN_2.y + p.canvasLineBuffer));
								}
								else
								{
									contextLine.moveTo(_pToN_1.x + p.canvasLineBuffer, _pToN_1.y + p.canvasLineBuffer);
									contextLine.lineTo(_pToN_2.x + p.canvasLineBuffer, _pToN_2.y + p.canvasLineBuffer);
								} 
							}
							//j == 0 ? contextLine.moveTo(_pToN.x, _pToN.y) : contextLine.lineTo(_pToN.x, _pToN.y);
						} 
					}
					
					contextLine.strokeStyle = userLines[i].color;
					contextLine.stroke();
					if(userLines[i].showArrow)
					{
						var _len = _pnt.length - 1;
						var _prevPoint = pointToPixel(_pnt[_len - 1].x, _pnt[_len - 1].y, true);
						var _endPoint = pointToPixel(_pnt[_len].x, _pnt[_len].y, true);
						_prevPoint.x += p.canvasLineBuffer;
						_prevPoint.y += p.canvasLineBuffer;
						_endPoint.x += p.canvasLineBuffer;
						_endPoint.y += p.canvasLineBuffer;
						
						
						plotArrow(_prevPoint, _endPoint, contextLine, userLines[i].lineWidth, userLines[i].color)
					}
				}
				else
				{
					if(p.barProp)
					{
						if(isNaN(p.barProp.gap))
						{
							var _barPropGap = p.barProp.gap[gapCount];
							gapCount++;
							if(gapCount == p.barProp.gap.length)
							{
								gapCount = 0;
							}
						}
						else
						{
							var _barPropGap = p.barProp.gap;
						}
						var zeroPos = pointToPixel(0, 0);
						var _maxY = canvas.my + canvas.mh;
						//------------
						var _pToN_1 = pointToPixel(p.barProp.start + _cnt, 0, true);
						var _pToN_2 = pointToPixel(p.barProp.start + _cnt + p.barProp.end, _pnt[0].y, true);
						var lineWidth = 0;
						
						if(userLines[i].borderWidth && userLines[i].borderColor)
						{
							lineWidth = userLines[i].borderWidth;
						}
						_pToN_1.x = tf(_pToN_1.x)
						_pToN_1.y = tf(_pToN_1.y)
						_pToN_2.x = tf(_pToN_2.x)
						_pToN_2.y = tf(_pToN_2.y)
						
						contextLine.fillStyle = userLines[i].color;
						contextLine.moveTo(_pToN_1.x, _pToN_1.y);
						contextLine.lineTo(_pToN_1.x, _pToN_2.y);
						contextLine.lineTo(_pToN_2.x, _pToN_2.y);
						contextLine.lineTo(_pToN_2.x, _pToN_1.y);
						contextLine.lineTo(_pToN_1.x, _pToN_1.y);  //moveTO - > lineTo
						contextLine.fill();
						
						if(userLines[i].borderWidth && userLines[i].borderColor)
						{
							contextLine.lineWidth = userLines[i].borderWidth;
							contextLine.strokeStyle = userLines[i].borderColor;
							contextLine.stroke();
						}
						//------------
						_ctx.fillStyle = p.labelStyleXYColor;
						p.labelInBold ? _ctx.font = "bold " + p.labelStyleXYSize + " " + p.labelStyleXYFamily : _ctx.font = p.labelStyleXYSize + " " + p.labelStyleXYFamily;
						_ctx.textAlign = "center";
						_ctx.fillText(userLines[i].label, parseInt(canvas.mx + _pToN_1.x + ((_pToN_2.x - _pToN_1.x) / 2))+0.5, parseInt(canvas.my + canvasLine.height + parseInt(p.labelStyleXYSize) + p.barLabelTop)+0.5);
						//------------
						if(p.showBarNumbers)
						{
							var _flagForFill = true;
							if(!p.showBarZeroVal && _pnt[0].y == 0)
							{
								_flagForFill = false;
							}
							_ctx.font = p.labelStyleXYSize + " " + p.labelStyleXYFamily;
							var _showBarNumbersY = 0.5;
							if(_pnt[0].y < 0)
							{
								_showBarNumbersY = parseInt(_pToN_2.y + canvas.my + parseFloat(p.labelStyleXYSize))+0.5;
							}
							else
							{
								_showBarNumbersY = parseInt(_pToN_2.y + canvas.my - p.barValueHeight)+0.5//globalResizeCalc(10);	//15
							}
							var _maxY = canvas.my + canvas.mh;
							if(_flagForFill && _maxY >= _showBarNumbersY)
							{
								if(p.decimalInNumber)
								{
									_ctx.fillText(Number(_pnt[0].y.toFixed(p.decimal)), parseInt(canvas.mx + _pToN_1.x + ((_pToN_2.x - _pToN_1.x)/2))+0.5, _showBarNumbersY);
								}
								else
								{
									_ctx.fillText(_pnt[0].y.toFixed(p.decimal), parseInt(canvas.mx + _pToN_1.x + ((_pToN_2.x - _pToN_1.x)/2))+0.5, _showBarNumbersY);
								}
							}
						}
						//------------
						_cnt += (_barPropGap+p.barProp.end);
					}
					else
					{
						console.log("Error: barProp is not defined");
					}
				}
				contextLine.closePath();
			}
		}
	}
	//================================================================================
	function drawPointCanvas()
	{
		canvasPoint.width = canvasPoint.width;
		//for(var i = 0; i < interSecPoints.length; i++)
		for(var k = 0; k < indexingArr.length; k++)
		{
			if(indexingArr[k] != "undefined" && String(indexingArr[k]).length > 0)
			{
				var i = indexingArr[k];
				if(interSecPoints[i])
				{
					var _iSec = interSecPoints[i];
					var _area = _thisObj.getGraphArea();
					
					var condition = p.canvasClipBool ? true : (_iSec.x >= _area.min.x && _iSec.x <= _area.max.x && _iSec.y <= _area.min.y && _iSec.y >= _area.max.y)
					
					if(condition)
					{
						var _pTem = pointToPixel(_iSec.x, _iSec.y, true);
						var _width = Math.max(0,_iSec.radius-globalResizeCalc(2));
						
						var _cX = _pTem.x + p.dotSize;
						var _cY = _pTem.y + p.dotSize;
						contextPoint.beginPath();
						contextPoint.arc(_cX, _cY,_width, 0, 2*Math.PI);
						contextPoint.fillStyle = _iSec.color;
						contextPoint.fill();
						if(interSecPoints[i].pan)
						{
							//Removed gradient drawing and put image to improve performance.
							if(_iSec.color != "transparent")
								contextPoint.drawImage(p.pointShadeImg,0,0, p.pointShadeImg.height, p.pointShadeImg.height,_cX-_width,_cY-_width, (_width*2),(_width*2));
						}
					}
				}
			}
		}
	}
	//================================================================================
	function calcProve()
	{
		var proveLineWidth = globalResizeCalc(0);
		var _ptp = pointToPixel(p.provePoint, 0, true);
		if(prevProvePointInPix != undefined && p.probeFreeze)
		{
			var _ptpNew = pixelToPoint(prevProvePointInPix, 0);
			p.provePoint = _ptpNew.x;
			if(!mouseDownActivated)
			{
				prevProvePointInPix = undefined;
			}
		}
		
		if(_ptp.x <= 0)
		{
			p.provePoint = pixelToPoint(0, 0).x;
		}
		if(_ptp.x >= canvas.mw)
		{
			p.provePoint = pixelToPoint(canvas.mw, 0).x;
		}
		// VERTICAL ============
		var _ptp = pointToPixel(0, p.provePointH, true);
		if(_ptp.y <= proveLineWidth)
		{
			p.provePointH = pixelToPoint(0,proveLineWidth).y;
		}
		if(_ptp.y >= canvas.mh-proveLineWidth)
		{
			p.provePointH = pixelToPoint(0, canvas.mh-proveLineWidth).y;
		}
		drawProve();
		returnViewChange("prove");
	}
	//================================================================================
	function drawProve()
	{
		canvasProve.width = canvasProve.width;
		var _temProve = p.probeInterPoint.sort(function(a,b) { return parseFloat(a.y) - parseFloat(b.y) } );
		
		var _ptp = pointToPixel(p.provePoint, 0);
		//........Commented to restrict probe in canvas area.
		//if(_ptp.x >= canvas.mx)
		{
			//........ hard coded to avoid probe hide ........//
			if(_ptp.x >=  canvas.mw+p.marginLeft)
				_ptp.x = canvas.mw+p.marginLeft;
			if(_ptp.x <=  0)
				_ptp.x = 0;
			//........ ......................................//
			var _x = tf(_ptp.x);
			var _y = tf(globalResizeCalc(1.5) + p.probePaddingTop);//canvas.my;
			var _h = tf(globalResizeCalc(1.5) + canvas.height - globalResizeCalc(3) - p.probePaddingBottom);
			contextProve.beginPath();
			contextProve.lineWidth = Math.round(globalResizeCalc(3));
			contextProve.strokeStyle = p.probeColor;
			contextProve.fillStyle = p.probeFillColor;
			contextProve.moveTo(_x, _y + globalResizeCalc(15));
			contextProve.lineTo(_x - p.proveArea, _y);
			contextProve.lineTo(_x + p.proveArea, _y);
			contextProve.lineTo(_x, _y + globalResizeCalc(15));
			contextProve.strokeStyle = p.probeBorderColor ? p.probeBorderColor : p.probeColor;
			contextProve.fill();
			contextProve.stroke();
			contextProve.closePath();
			contextProve.beginPath();
			contextProve.strokeStyle = p.probeColor;
			//-------------------------
			for(var jj = _temProve.length - 1; jj >= 0; jj--)
			{
				var _ptp2 = pointToPixel(_temProve[jj].x, _temProve[jj].y);
				if(_ptp2.y > canvas.my && _ptp2.y < (canvas.my + canvas.mh))
				{
					contextProve.lineTo(_ptp2.x, _ptp2.y - globalResizeCalc(8));
					contextProve.lineTo(_ptp2.x - globalResizeCalc(5), _ptp2.y);
					contextProve.lineTo(_ptp2.x, _ptp2.y + globalResizeCalc(8));
				}
			}
			//-------------------------
			contextProve.lineTo(_x, _h - globalResizeCalc(15));
			contextProve.fill();
			contextProve.stroke();
			contextProve.closePath();
			contextProve.beginPath();
			contextProve.moveTo(_x, _h - globalResizeCalc(15));
			contextProve.lineTo(_x + p.proveArea + globalResizeCalc(p.probeDimentionOffset), _h + globalResizeCalc(p.probeDimentionOffset));
			contextProve.lineTo(_x - p.proveArea - globalResizeCalc(p.probeDimentionOffset), _h + globalResizeCalc(p.probeDimentionOffset));
			contextProve.lineTo(_x, _h - globalResizeCalc(15));
			contextProve.strokeStyle = p.probeBorderColor ? p.probeBorderColor : p.probeColor;
			contextProve.fill();
			contextProve.stroke();
			contextProve.closePath();
			contextProve.beginPath();
			//-------------------------
			for(var jj = 0; jj < _temProve.length; jj++)
			{
				var _ptp2 = pointToPixel(_temProve[jj].x, _temProve[jj].y);
				if(_ptp2.y > canvas.my && _ptp2.y < (canvas.my + canvas.mh))
				{
					contextProve.lineTo(_ptp2.x, _ptp2.y + globalResizeCalc(8));
					contextProve.lineTo(_ptp2.x + globalResizeCalc(5), _ptp2.y);
					contextProve.lineTo(_ptp2.x, _ptp2.y - globalResizeCalc(8));
				}
			}
			//-------------------------
			contextProve.moveTo(_x, _h - globalResizeCalc(15));
			contextProve.lineTo(_x, _y + globalResizeCalc(15));
			contextProve.strokeStyle = p.probeColor;
			contextProve.stroke();
			contextProve.closePath();
		}
		//-------------------
		if(p.probeVisibleH)
		{
			var _ptp = pointToPixel(0, p.provePointH);
			if(_ptp.y >= canvas.my)
			{
				var _x = globalResizeCalc(1.5) + p.probePaddingLeft;
				var _y = _ptp.y;
				var _w = globalResizeCalc(1.5) + canvas.width - globalResizeCalc(3) - p.probePaddingRight;
				contextProve.beginPath();
				contextProve.lineWidth = globalResizeCalc(3);
				contextProve.strokeStyle = p.probeColorH;
				contextProve.fillStyle = p.probeFillColorH;
				contextProve.moveTo(_x + globalResizeCalc(15), _y );
				contextProve.lineTo(_x, _y - p.proveArea);
				contextProve.lineTo(_x, _y + p.proveArea);
				contextProve.lineTo(_x + globalResizeCalc(15), _y);
				//-------------------------
				contextProve.lineTo(_w - globalResizeCalc(15), _y);
				contextProve.lineTo(_w, _y + p.proveArea);
				contextProve.lineTo(_w, _y - p.proveArea);
				contextProve.lineTo(_w - globalResizeCalc(15), _y);
				//-------------------------
				contextProve.lineTo(_x+ globalResizeCalc(15), _y );
				contextProve.fill();
				contextProve.stroke();
			}
		}
	}
	//================================================================================
	function tf(num)
	{
		return parseInt(num)+0.5
	}
	//================================================================================
	function pointToPixel(_x, _y, _bool)
	{
		var xRet, yRet;
		if(_bool)
		{
			xRet = (p.xReg - p.marginLeft) + (_x * ((p.leastCountX * p.zoomValX) / p.unitX));
			yRet = (p.yReg - p.marginTop) + ((-1 * _y) * ((p.leastCountY * p.zoomValY) / p.unitY));
		}
		else
		{
			xRet = p.xReg + (_x * ((p.leastCountX * p.zoomValX) / p.unitX));
			yRet = p.yReg + ((-1 * _y) * ((p.leastCountY * p.zoomValY) / p.unitY));
		}
		return {x:xRet, y:yRet};
	}
	//================================================================================
	function pixelToPoint(_x, _y, _bool)
	{
		var xRet, yRet;
		if(_bool)
		{
			xRet = (( _x - ((p.xReg - p.marginLeft) - canvas.mx)) / ((p.leastCountX * p.zoomValX) / p.unitX));
			yRet = (( _y - ((p.yReg - p.marginTop) - canvas.my)) / ((p.leastCountY * p.zoomValY) / p.unitY));
		}
		else
		{
			xRet = (( _x - (p.xReg - canvas.mx)) / ((p.leastCountX * p.zoomValX) / p.unitX));
			yRet = -1 * (( _y - (p.yReg - canvas.my)) / ((p.leastCountY * p.zoomValY) / p.unitY));
		}
		return {x:xRet, y:yRet};
	}
	//================================================================================
	function graphOver(e)
	{
		if(e.type == "touchstart" || e.type == "touchmove")
		{
			prevMouseX = e.touches[0].pageX;
			prevMouseY = e.touches[0].pageY;
		}
		if(e.type == "touchend")
		{
			e = {touches:[{pageX:prevMouseX, pageY:prevMouseY}], type:"touchend", preventDefault:function(){return false;}};
		}
		if(e.type == "mousemove" || e.type == "mousedown" || e.type == "mouseup")
		{
			e.touches = [{pageX:e.pageX, pageY:e.pageY}];
		}
		if(e.type == "mouseover")
		{
			$(this).unbind("mousemove", graphOver).bind("mousemove", graphOver);
			$(this).unbind("mouseout", graphOver).bind("mouseout", graphOver);
		}
		
		else if(e.type == "mousemove")
		{
			var _bool = false;
			var _probeBool = false;
			var _probeBoolH = false;
			var ptpT = pixelToPoint(e.pageX - $(canvasLine).offset().left, e.pageY - $(canvasLine).offset().top, false);
			var _mousePoint = {x:e.touches[0].pageX - $(canvasPoint).offset().left - (p.dotSize), y :e.touches[0].pageY - $(canvasPoint).offset().top- (p.dotSize)}
			var mouserOverItem = {type:"graphOver",x:ptpT.x,y:ptpT.y};
			var isMouseOnLine = false;
			//for(var i = 0; i < interSecPoints.length; i++)
			// for loop reversed by vishal to fix jira issue //
			//for(var i = interSecPoints.length -1 ; i > 0; i--)
			for(var k = indexingArr.length - 1; k >= 0; k--)
			{
				var i = indexingArr[k];
				if(interSecPoints[i])
				{
					var _pTem = pointToPixel(interSecPoints[i].x, interSecPoints[i].y, true);
					//if(((e.pageX - $(canvasPoint).offset().left) >= _pTem.x) && (e.pageX - $(canvasPoint).offset().left) <= (_pTem.x + (p.dotSize * 2)) && ((e.pageY - $(canvasPoint).offset().top) >= _pTem.y) && (e.pageY - $(canvasPoint).offset().top) <= (_pTem.y + (p.dotSize * 2)))						
					if(getDistanceFor2pts(_pTem,_mousePoint) <= interSecPoints[i].radius)
					{
						if(p.mouseCurType == "move" && typeof (interSecPoints[i].pan) != "undefined")
						{
							$(canvasPoint).removeClass("commonpan");
							$(canvasPoint).addClass("commongrab");
						}
						interSecPoints[i].title ? $(canvasPoint).attr("p_title", GCTConv(interSecPoints[i].title)) : null;
						
						var _xVal = ((""+Number(interSecPoints[i].x).toFixed(p.decimal)*1).replace(/-/g, "&ndash;"));
						var _yVal = ((""+Number(interSecPoints[i].y).toFixed(p.decimal)*1).replace(/-/g, "&ndash;"));
						
						
						if(p.toolTip)
						{
							if(typeof(interSecPoints[i].toolTip) != "undefined" && String(interSecPoints[i].toolTip).length > 0)
							{
								if(interSecPoints[i].toolTip)
									toolTip.showTip(interSecPoints[i].toolTip, e);
							}
							else if(p.toolTip == "x")
							{
								toolTip.showTip(_xVal, e);
							}
							else if(p.toolTip == "y")
							{
								toolTip.showTip(_yVal, e);
							}
							else
							{
								toolTip.showTip("("+_xVal+", "+_yVal+")", e);
							}
						}
						if(interSecPoints[i].pan == "x" || interSecPoints[i].pan == "y" || interSecPoints[i].pan == "xy")
						{
							$(canvasPoint).addClass("commongrab");
						}
						mouserOverItem = interSecPoints[i];
						mouserOverItem.type = "point";
						_bool = true;
						break;
					}
					else
					{
						if(p.mouseCurType == "move" && !isMouseOnLine)
						{
							$(canvasPoint).removeClass("commongrab");
							$(canvasPoint).addClass("commonpan");
						}
						else 
							p.panX || p.panY ? null : $(canvasPoint).removeClass("commongrab");
						p.toolTip ? toolTip.hideTip() : null;
					}
				}
			}
			if(!_bool)
			{
				for(var i = 0; i < userLines.length; i++)
				{
					if(typeof(userLines[i]) != "undefined" && userLines[i].pan == true && userLines[i].point != "")
					{
						var _tempPoint = {x:e.touches[0].pageX - $(canvasPoint).offset().left - (p.dotSize), y :e.touches[0].pageY - $(canvasPoint).offset().top- (p.dotSize)}
						var _tempPoint1 = pointToPixel(userLines[i].point[0].x, userLines[i].point[0].y, true);
						var _tempPoint2 = pointToPixel(userLines[i].point[userLines[i].point.length-1].x, userLines[i].point[userLines[i].point.length-1].y, true);		
						
						//
						if(isPointOnLine(_tempPoint,_tempPoint1,_tempPoint2,globalResizeCalc(15)))
						{
							if(p.mouseCurType == "move")
							{
								$(canvasPoint).removeClass("commonpan");	
							}
							if(!$(canvasPoint).hasClass("commongrab"))
								$(canvasPoint).addClass("commongrab");
							isMouseOnLine = true;
							mouserOverItem = userLines[i];
							mouserOverItem.type = "line";
							
							if(p.toolTip)
								{
									if(typeof(userLines[i].toolTip) != "undefined" && String(userLines[i].toolTip).length > 0)
									{
										if(userLines[i].toolTip)
											toolTip.showTip(userLines[i].toolTip, e);
									}
								}
						}
						else
						{
							if(p.mouseCurType == "move")
							{
								$(canvasPoint).removeClass("commongrab");
								$(canvasPoint).addClass("commonpan");
							}
							else
								p.panX || p.panY ? null : $(canvasPoint).removeClass("commongrab");
							
							isMouseOnLine = false;
						}
					}
					if(isMouseOnLine)
					{
						userLines[i].title ? $(canvasPoint).attr("p_title", GCTConv(userLines[i].title)) : null;
						break;
					}
					
				}
			}
		
			if(p.probeVisible && !_bool && !isMouseOnLine)
			{
				var _proveTp = pointToPixel(p.provePoint, 0, true);
				if((e.pageX - $(canvasPoint).offset().left - p.dotSize) >= (_proveTp.x - p.proveArea) && (e.pageX - $(canvasPoint).offset().left - p.dotSize) <= (_proveTp.x + p.proveArea))
				{
					if(p.mouseCurType == "move")
					{
						$(canvasPoint).removeClass("commonpan");
					} 
					$(canvasPoint).addClass("commongrab");
					p.title ? p.title.probe ? $(canvasPoint).attr("p_title", GCTConv(p.title.probe)) : null : null;
					_probeBool = true;
					mouserOverItem = {id:"probe",value:p.provePoint};
					mouserOverItem.type = "probeV"
				}
				else
				{
					if(p.mouseCurType == "move" && !isMouseOnLine)
					{
						$(canvasPoint).removeClass("commongrab");
						$(canvasPoint).addClass("commonpan");
					}
					else
						p.panX || p.panY ? null : $(canvasPoint).removeClass("commongrab");
				}
				
			}
			if(p.probeVisibleH && !_bool && !_probeBool && !isMouseOnLine)
			{
				var _proveTp = pointToPixel(0, p.provePointH, true);
				if((e.pageY - $(canvasPoint).offset().top - p.dotSize) >= (_proveTp.y - p.proveArea) && (e.pageY - $(canvasPoint).offset().top - p.dotSize) <= (_proveTp.y + p.proveArea))
				{
					if(p.mouseCurType == "move")
					{
						$(canvasPoint).removeClass("commonpan");
					}
					$(canvasPoint).addClass("commongrab");
					p.title ? p.title.probeH ? $(canvasPoint).attr("p_title", GCTConv(p.title.probeH)) : null : null;
					_probeBoolH = true;
					mouserOverItem = {id:"probeH",value:p.provePointH};
					mouserOverItem.type = "probeH"
				}
				else
				{
					if(p.mouseCurType == "move" && !isMouseOnLine)
					{
						$(canvasPoint).removeClass("commongrab");
						$(canvasPoint).addClass("commonpan");
					}
					else
						p.panX || p.panY ? null : $(canvasPoint).removeClass("commongrab");
				}
			}
			if(!isMouseOnLine && !_bool && !_probeBool && !_probeBoolH)
			{
				typeof(p.title) != "string" ? $(canvasPoint).removeAttr("p_title") : null;
				p.panX || p.panY ? typeof(p.title) == "string" ? $(canvasPoint).attr("p_title",p.title) : $(canvasPoint).attr("p_title",GetGlobalTooltip("tooltip", "graphArea")) : null;
			}
			
			p.onGraphOver ? p.onGraphOver(mouserOverItem) : null;
		}
		else if(e.type == "mouseout")
		{
			$(this).unbind("mousemove", graphOver);
			$(this).unbind("mouseout", graphOver);
			var mouserOverItem = {type:"graphOut"};
			p.onGraphOver ? p.onGraphOver(mouserOverItem) : null;
		}
	}
	//================================================================================
	function graphOut(e)
	{
		p.onGraphOut ? p.onGraphOut(e) : null;
	}
	//================================================================================
	function panGraph(e)
	{
		if(e.type == "mouseover" || e.type == "mouseout")
		{
			return false;
		}
		//
		if(e.type == "touchstart" || e.type == "touchmove")
		{
			prevMouseX = e.touches[0].pageX;
			prevMouseY = e.touches[0].pageY;
		}
		if(e.type == "touchend")
		{
			e = {touches:[{pageX:prevMouseX, pageY:prevMouseY}], type:"touchend", preventDefault:function(){return false;}};
		}
		if(e.type == "mousemove" || e.type == "mousedown" || e.type == "mouseup")
		{
			e.touches = [{pageX:e.pageX, pageY:e.pageY}];
		}
		//------------------------------------------
		var ptpT = pixelToPoint(e.touches[0].pageX - $(canvasPoint).offset().left, e.touches[0].pageY - $(canvasPoint).offset().top, true);
		var _mousePoint = {x:e.touches[0].pageX - $(canvasPoint).offset().left - (p.dotSize), y :e.touches[0].pageY - $(canvasPoint).offset().top- (p.dotSize)}
		var mouserOverItem = {x:ptpT.x, y:ptpT.y};
		//------------------------------------------
		if(e.type == "touchstart" || e.type == "mousedown")
		{
			focusOutInput();
			// addPointerGrabbing(true);
			if($(canvasPoint).hasClass("commonpan") || $(canvasPoint).hasClass("commongrab"))
			{
				addPointerGrabbing(true);
			}
			
			prevProvePointInPix = undefined;
			
			isOnDots = undefined;
			isOnProves = undefined;
			isOnProvesH = undefined;
			oldTouchX = undefined;
			oldTouchY = undefined;
			oldTouchZoom = undefined;
			if(e.touches.length == 1)
			{
				if(p.probeVisible)
				{
					var _proveTp = pointToPixel(p.provePoint, 0, true);
					if((e.touches[0].pageX - $(canvasPoint).offset().left - p.dotSize) >= (_proveTp.x - p.proveArea) && (e.touches[0].pageX - $(canvasPoint).offset().left - p.dotSize) <= (_proveTp.x + p.proveArea))
					{
						isOnProves = true;
					}
				}
				if(p.probeVisibleH)
				{
					var _proveTp = pointToPixel(0, p.provePointH, true);
					if((e.touches[0].pageY - $(canvasPoint).offset().top - p.dotSize) >= (_proveTp.y - p.proveArea) && (e.touches[0].pageY - $(canvasPoint).offset().top - p.dotSize) <= (_proveTp.y + p.proveArea))
					{
						isOnProves = false;
						isOnProvesH = true;

					}
				}
				if(!isOnProves && !isOnProvesH)
				{
					prevProvePointInPix = pointToPixel(p.provePoint, 0, true).x; //To make probe stable.
				}
				for(var i = 0; i < userLines.length; i++)
					{
						if(typeof(userLines[i]) != "undefined" && userLines[i].pan == true && userLines[i].point != "")
						{
							var _tempPoint = {x:e.touches[0].pageX - $(canvasPoint).offset().left- (p.dotSize), y :e.touches[0].pageY - $(canvasPoint).offset().top- (p.dotSize)} 
							var _tempPoint1 = pointToPixel(userLines[i].point[0].x, userLines[i].point[0].y, true);
							var _tempPoint2 = pointToPixel(userLines[i].point[userLines[i].point.length-1].x, userLines[i].point[userLines[i].point.length-1].y, true);
							if(isPointOnLine(_tempPoint,_tempPoint1,_tempPoint2,globalResizeCalc(15)))
							{
								isOnProves = false;
								isOnProvesH = false;
								isOnLine = i;
								mouserOverItem = userLines[i];
								mouserOverItem.type = "line"
								break;
							}
						}
					}
				// for(var i = interSecPoints.length - 1; i >= 0; i--)
				for(var k = indexingArr.length - 1; k >= 0; k--)
				{
					var i = indexingArr[k];
					if(typeof(interSecPoints[i]) != "undefined")
					{
						var _pTem = pointToPixel(interSecPoints[i].x, interSecPoints[i].y, true);
						//if(((e.touches[0].pageX - $(canvasPoint).offset().left) >= _pTem.x) && (e.touches[0].pageX - $(canvasPoint).offset().left) <= (_pTem.x + (p.dotSize * 2)) && ((e.touches[0].pageY - $(canvasPoint).offset().top) >= _pTem.y) && (e.touches[0].pageY - $(canvasPoint).offset().top) <= (_pTem.y + (p.dotSize * 2)))						
						if(getDistanceFor2pts(_pTem,_mousePoint) <= interSecPoints[i].radius)
						{
							isOnProves = false;
							isOnProvesH = false;
							isOnLine = undefined;
							isOnDots = i;
							mouserOverItem = interSecPoints[i];
							mouserOverItem.type = "point";
							var _xVal = ((""+Number(interSecPoints[i].x).toFixed(p.decimal)*1).replace(/-/g, "&ndash;"));
							var _yVal = ((""+Number(interSecPoints[i].y).toFixed(p.decimal)*1).replace(/-/g, "&ndash;"));

							if(p.toolTip)
							{
								
								if(typeof(interSecPoints[i].toolTip) != "undefined" && String(interSecPoints[i].toolTip).length > 0)
								{
									if(interSecPoints[i].toolTip)
										toolTip.showTip(interSecPoints[i].toolTip, e);
								}
								else if(p.toolTip == "x")
								{
									toolTip.showTip(_xVal, e);
								}
								else if(p.toolTip == "y")
								{
									toolTip.showTip(_yVal, e);
								}
								else if(p.toolTip == "xy" || p.toolTip == true)
								{
									toolTip.showTip("("+_xVal+", "+_yVal+")", e);
								}
							}
							break;
						}
					}
				}
			}
			mouseDownActivated = true;
			//
			if(p.onMouseDown)
			{
				p.onMouseDown(
				{
					id: p.id ? p.id : "",
					type: "mousedown",
					isOnProves: isOnProves,
					isOnProvesH: isOnProvesH,
					isOnLine: isOnLine,
					isOnDots: isOnDots,
					mouserOverItem: mouserOverItem
				});
			}
		}
		//------------------------------------------
		if(e.type == "touchmove" || e.type == "mousemove")
		{
			if(e.touches.length == 1)
			{
				//===================================
				if(isOnProves)
				{
					proveDrawCalc(e, true);
				}
				else if(isOnProvesH)
				{
					proveDrawCalc(e,false);
				}
				else if(typeof(isOnLine) != "undefined")
				{
					var _pToP = pixelToPoint(e.touches[0].pageX - $(canvasPoint).offset().left - p.dotSize, e.touches[0].pageY - $(canvasPoint).offset().top - p.dotSize);
					returnViewChange("line", _pToP);
				}
				else if(typeof(isOnDots) != "undefined" && typeof(interSecPoints[isOnDots].pan) != "undefined")
				{
					var _pToP = pixelToPoint(e.touches[0].pageX - $(canvasPoint).offset().left - p.dotSize, e.touches[0].pageY - $(canvasPoint).offset().top - p.dotSize);
					
					if(interSecPoints[isOnDots].pan == "x")
					{
						interSecPoints[isOnDots].x = _pToP.x;
						returnViewChange("point", isOnDots);
					}
					else if(interSecPoints[isOnDots].pan == "y")
					{
						interSecPoints[isOnDots].y = _pToP.y;
						returnViewChange("point", isOnDots);
					}
					else if(interSecPoints[isOnDots].pan == "xy")
					{
						interSecPoints[isOnDots].x = _pToP.x;
						interSecPoints[isOnDots].y = _pToP.y;
						returnViewChange("point", isOnDots);
					}
				}
				else if((p.panX || p.panY) && mouseDownActivated)
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
					if(p.panY && (Math.abs(oldTouchY - e.touches[0].pageY) > 10 || oldTouchY == undefined))
					{
						if(oldTouchY != undefined)
						{
							p.yReg += (e.touches[0].pageY - oldTouchY);
							_temBool = true;
						}
						oldTouchY = e.touches[0].pageY;
					}
					setQuardZoomStyle();
					
					if(_temBool)
					{
						createBaseGrid();
					}
					returnViewChange("pan");
				}
				
				if(isOnDots)
				{
					if(BrowserDetect.any())
					{
						if(p.toolTip)
						{
							var _xVal = ((""+Number(interSecPoints[isOnDots].x).toFixed(p.decimal)*1).replace(/-/g, "&ndash;"));
							var _yVal = ((""+Number(interSecPoints[isOnDots].y).toFixed(p.decimal)*1).replace(/-/g, "&ndash;"));
						
							if(typeof(interSecPoints[isOnDots].toolTip) != "undefined" && String(interSecPoints[isOnDots].toolTip).length > 0)
							{
								if(interSecPoints[isOnDots].toolTip)
									toolTip.showTip(interSecPoints[isOnDots].toolTip,e);
							}
							else if(p.toolTip == "x")
							{
								toolTip.showTip(_xVal, e);
							}
							else if(p.toolTip == "y")
							{
								toolTip.showTip(_yVal, e);
							}
							else 
							{
								toolTip.showTip("("+_xVal+", "+_yVal+")", e);
							}
							
						}
					}
					if(!checkCanvasBoundary(e))
						p.toolTip ? toolTip.hideTip() : null;
				}
				if(p.onMouseMove)
				{
					p.onMouseMove(
					{
						id: p.id ? p.id : "",
						type: "mousemove",
						isOnProves: isOnProves,
						isOnProvesH: isOnProvesH,
						isOnLine: isOnLine,
						isOnDots: isOnDots,
						mouserOverItem: mouserOverItem
					});
				}
			}
			if(e.touches.length == 2)
			{
				
				var _ncenterPoint = {x:_thisObj.getGraphArea().center.x, y:_thisObj.getGraphArea().center.y};
				var _centerPix = pointToPixel(_thisObj.getGraphArea().center.x, _thisObj.getGraphArea().center.y);
				
				var _d = getDistance(e.touches[0].pageX, e.touches[0].pageY, e.touches[1].pageX, e.touches[1].pageY);
				if((p.zoomX || p.zoomY) && (Math.abs(_d - oldTouchZoom) > 10 || oldTouchZoom == undefined))
				{
					if((_d - oldTouchZoom) < 0)
					{
						(p.zoomX && p.zoomValX > p.minZoom) ? p.zoomValX -= 0.1 : null;
						(p.zoomY && p.zoomValY > p.minZoom) ? p.zoomValY -= 0.1 : null;
						//----------------------------
						var _newCenterPix = pointToPixel(_ncenterPoint.x, _ncenterPoint.y);
						
						if(!isNaN(p.xReg) && p.zoomFromCenterX)
						{
							p.xReg += _centerPix.x - _newCenterPix.x;
						}
						if(!isNaN(p.yReg) && p.zoomFromCenterY)
						{
							p.yReg += _centerPix.y - _newCenterPix.y;
						}
						//----------------------------
						setQuardZoomStyle();
						createBaseGrid();
					}
					if((_d - oldTouchZoom) > 0)
					{
						(p.zoomX && p.zoomValX < p.maxZoom) ? p.zoomValX += 0.1 : null;
						(p.zoomY && p.zoomValX < p.maxZoom) ? p.zoomValY += 0.1 : null;
						//----------------------------
						var _newCenterPix = pointToPixel(_ncenterPoint.x, _ncenterPoint.y);
						if(!isNaN(p.xReg) && p.zoomFromCenterX)
						{
							p.xReg += _centerPix.x - _newCenterPix.x;
						}
						if(!isNaN(p.yReg) && p.zoomFromCenterY)
						{
							p.yReg += _centerPix.y - _newCenterPix.y;
						}
						//----------------------------
						setQuardZoomStyle();
						createBaseGrid();
					}
					oldTouchZoom = _d;
				}
				returnViewChange("zoom");
			}
		}
		//--------------------------------------
		if(e.type == "mousedown")
		{
			$(window).unbind("mousemove", panGraph).bind("mousemove", panGraph);
			$(window).unbind("mouseup", panGraph).bind("mouseup", panGraph);
		}
		if(e.type == "mouseup" || e.type == "touchend")
		{
			p.toolTip ? toolTip.hideTip() : null;
			addPointerGrabbing(false);
			$(window).unbind("mousemove", panGraph);
			$(window).unbind("mouseup", panGraph);
			mouseDownActivated = false;
			
			prevProvePointInPix = undefined;
			
			isOnLine = undefined;
			isOnDots = undefined;
			isOnProves = undefined;
			isOnProvesH = undefined; 
			if(p.onMouseUp)
			{
				p.onMouseUp(
				{
					id: p.id ? p.id : "",
					type: e.type,
					mouserOverItem: mouserOverItem
				});
			}
		}
		//-------------------
		if(p.onMouseEvents)
		{
			p.onMouseEvents(e)
		}
		//-------------------
		e.preventDefault();
	}
	//================================================================================
	function proveDrawCalc(e, flag)
	{
		if(flag)
		{
			var _xPos = (e.touches ? e.touches[0].pageX : e.pageX) - $(canvasPoint).offset().left - p.dotSize;
			if(_xPos < 0)
			{
				_xPos = 0;
			}
			if(_xPos > canvas.mw)
			{
				_xPos = canvas.mw;
			}
			var _pToP = pixelToPoint(_xPos, (e.touches ? e.touches[0].pageY : e.pageY) - $(canvasPoint).offset().top - p.dotSize);
			//var _p2pNum = Number(_pToP.x.toFixed(p.decimal));
			var _p2pNum = _pToP.x;
			probeSnapPoints = probeSnapPoints.sort(function(a, b){return a-b});
			if(p.probeSnap)
			{
				if(p.probeSnapVal)
				{
					// _p2pNum = _p2pNum - _floatPrecision(_p2pNum % p.probeSnapVal);
					_p2pNum = _floatPrecision(Math.round(_p2pNum/p.probeSnapVal)*p.probeSnapVal ,proveDecimal);
				}
				else
				{
					for(var _psp = 0; _psp < probeSnapPoints.length - 1; _psp++)
					{
						if(_p2pNum > probeSnapPoints[_psp] && _p2pNum < probeSnapPoints[_psp + 1])
						{
							var _mid = probeSnapPoints[_psp] + ((probeSnapPoints[_psp + 1] - probeSnapPoints[_psp]) / 2);
							if(_p2pNum > _mid)
							{
								_p2pNum = probeSnapPoints[_psp + 1];
							}
							else
							{
								_p2pNum = probeSnapPoints[_psp];
							}
						}
					}
				}
			}
			p.provePoint = _p2pNum;
		}
		else
		{
			var _yPos = (e.touches ? e.touches[0].pageY : e.pageY) - $(canvasPoint).offset().top - p.dotSize;
			if(_yPos < 0)
			{
				_yPos = 0;
			}
			if(_yPos > canvas.mh)
			{
				_yPos = canvas.mh;
			}
			var _pToP = pixelToPoint((e.touches ? e.touches[0].pageX : e.pageX) - $(canvasPoint).offset().left - p.dotSize , _yPos);
			//var _p2pNum = Number(_pToP.x.toFixed(p.decimal));
			var _p2pNum = _pToP.y;
			probeSnapPointsH = probeSnapPointsH.sort(function(a, b){return a-b});
			if(p.probeSnap)
			{
				if(p.probeSnapVal)
				{
					_p2pNum = _p2pNum - (_p2pNum % p.probeSnapVal);
				}
				else
				{
					for(var _psp = 0; _psp < probeSnapPointsH.length - 1; _psp++)
					{
						if(_p2pNum > probeSnapPointsH[_psp] && _p2pNum < probeSnapPointsH[_psp + 1])
						{
							var _mid = probeSnapPointsH[_psp] + ((probeSnapPointsH[_psp + 1] - probeSnapPointsH[_psp]) / 2);
							if(_p2pNum > _mid)
							{
								_p2pNum = probeSnapPointsH[_psp + 1];
							}
							else
							{
								_p2pNum = probeSnapPointsH[_psp];
							}
						}
					}
				}
			}
			p.provePointH = _p2pNum;
		}
		calcProve()
		//returnViewChange("prove");
	}
	//================================================================================
	function proveOverGraph(e)
	{
		if(p.probeVisible)
		{
			var _proveTp = pointToPixel(p.provePoint, 0, true);
			if((e.pageX - $(canvasPoint).offset().left - p.dotSize) >= (_proveTp.x - p.proveArea) && (e.pageX - $(canvasPoint).offset().left - p.dotSize) <= (_proveTp.x + p.proveArea))
			{
				$(canvasProve).addClass("commongrab");
				p.title ? p.title.probe ? $(canvasProve).attr("p_title", GCTConv(p.title.probe)) : null : null;
			}
			else
			{
				$(canvasProve).removeClass("commongrab");
				$(canvasProve).removeAttr("p_title");
			}
		}
		if(p.probeVisibleH)
		{
			var _proveTp = pointToPixel(0, p.provePointH, true);
			if((e.pageY - $(canvasPoint).offset().top - p.dotSize) >= (_proveTp.y - p.proveArea) && (e.pageY - $(canvasPoint).offset().top - p.dotSize) <= (_proveTp.y + p.proveArea))
			{
				$(canvasProve).addClass("commongrab");
				p.title ? p.title.probe ? $(canvasProve).attr("p_title", GCTConv(p.title.probe)) : null : null;
			}
			else
			{
				$(canvasProve).removeClass("commongrab");
				$(canvasProve).removeAttr("p_title");
			}
		}
		//-------------------
		if(p.onMouseEvents)
		{
			p.onMouseEvents(e)
		}
		//-------------------
	}
	//================================================================================
	function provePanGraph(e)
	{
		if(e.type == "touchmove" || e.type == "touchstart")
		{
			e.pageX = e.originalEvent.touches[0].pageX;
			e.pageY = e.originalEvent.touches[0].pageY;
		}
		if(e.type == "mousedown")
		{
			$(window).unbind("mousemove", provePanGraph).bind("mousemove", provePanGraph);
			$(window).unbind("mouseup", provePanGraph).bind("mouseup", provePanGraph);
		}
		if(e.type == "mousedown" || e.type == "touchstart")
		{
			focusOutInput();
			var _proveTp = pointToPixel(p.provePoint, 0, true);
			if((e.pageX - $(canvasPoint).offset().left - p.dotSize) >= (_proveTp.x - p.proveArea) && (e.pageX - $(canvasPoint).offset().left - p.dotSize) <= (_proveTp.x + p.proveArea))
			{
				proveMove = true;
				addPointerGrabbing(true);
			}
			
			var _proveTp = pointToPixel(0, p.provePointH, true);
			if((e.pageY - $(canvasPoint).offset().top - p.dotSize) >= (_proveTp.y - p.proveArea) && (e.pageY - $(canvasPoint).offset().top - p.dotSize) <= (_proveTp.y + p.proveArea))
			{
				proveMoveH = true;

				addPointerGrabbing(true);
			}
			if(p.onMouseDown)
			{
				p.onMouseDown(
				{
					id: p.id ? p.id : "",
					type: "mousedown",
					proveMove: proveMove,
					proveMoveH: proveMoveH
				});
			}
		}
		if(e.type == "mousemove" || e.type == "touchmove")
		{
			if(proveMove)
			{
				proveDrawCalc(e, true);
			}
			else if(proveMoveH)
			{
				proveDrawCalc(e,false);
			}
			if(p.onMouseMove)
			{
				p.onMouseMove(
				{
					id: p.id ? p.id : "",
					type: "mousemove",
					proveMove: proveMove,
					proveMoveH: proveMoveH
				});
			}
		}
		if(e.type == "mouseup" || e.type == "touchend")
		{
			addPointerGrabbing(false);
			$(window).unbind("mousemove", provePanGraph);
			$(window).unbind("mouseup", provePanGraph);
			proveMove = false;
			proveMoveH = false;
		}
		//-------------------
		if(p.onMouseEvents)
		{
			p.onMouseEvents(e)
		}
		//-------------------
		e.preventDefault();
	}
	//================================================================================
	function returnViewChange(_typeStr, _id)
	{
		if(_typeStr && _typeStr != "")
		{
			if(_typeStr == "prove")
			{
				if(p.onProveChange)
				{
					p.onProveChange(
					{
						id: p.id ? p.id : "",
						type: _typeStr,
						value: p.provePoint,
						valueH:p.provePointH
					});
				}
			}
			else if(_typeStr == "point")
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
			else if(_typeStr == "line")
			{
				if(p.onLineChange)
				{
					p.onLineChange(
					{
						id: p.id ? p.id : "",
						type: _typeStr,
						value: {line:isOnLine, x:_id.x, y:_id.y}
					})
				}
			}
			else
			{
				calcProve();
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
					drawLineCanvas();
					drawPointCanvas();
				}
			}
		}
	}
	//================================================================================
	function getDistance(x1, y1, x2, y2)
	{
		var _d = Math.abs(Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1))));
		return _d;
	}
	//================================================================================
	function setQuardZoomStyle()
	{
		if(p.drawQuads == 1)
		{
			if(_thisObj.getGraphArea().min.x == 0)
			{
				p.zoomFromCenterX = false;
				p.zoomFromCenterY = false;
			}
			else
			{
				p.zoomFromCenterX = true;
				p.zoomFromCenterY = true;
			}
		}
	}
	//================================================================================
	function plotArrow(_prevPoint, _endPoint, _ctx, _lineWidth, _lineColor)
	{
		
		var _angle = Math.PI + getAngle(_prevPoint, _endPoint, true);
		
		var point1 = new Object();
		var point2 = new Object();
		var point3 = new Object();
		
		var angle = _angle + 0.5;
		var angle1 = _angle - 0.5;
		
		point1.x = _endPoint.x - globalResizeCalc(15) * Math.cos(angle);
		point1.y = _endPoint.y - globalResizeCalc(15) * Math.sin(angle);
		
		point2.x = _endPoint.x - globalResizeCalc(5) * Math.cos(_angle);
		point2.y = _endPoint.y - globalResizeCalc(5) * Math.sin(_angle);
		
		point3.x = _endPoint.x - globalResizeCalc(15) * Math.cos(angle1);
		point3.y = _endPoint.y - globalResizeCalc(15) * Math.sin(angle1);
		
		_ctx.beginPath();
		
		_ctx.moveTo(_endPoint.x,_endPoint.y);
		_ctx.lineTo(point1.x,point1.y);
		_ctx.lineTo(point2.x,point2.y);
		_ctx.lineTo(point3.x,point3.y);
		_ctx.lineTo(_endPoint.x,_endPoint.y);
		
		_ctx.lineWidth = _lineWidth;
		_ctx.lineJoin="round";
		_ctx.fillStyle = _lineColor;
		_ctx.strokeStyle = _lineColor;
		_ctx.fill();
		_ctx.stroke();
		_ctx.closePath();
	}
	//================================================================================
	function createLabelDivs()
	{
		if(p.labelX && !labelXDiv)
		{
			labelXDiv = document.createElement("div");
			p.target.append(labelXDiv);
			$(labelXDiv).css(
			{
				"position": "absolute",
				"font-weight":"bold",
				"pointer-events":"none",
				"white-space": "nowrap"
			});
		}
		if(p.labelY && !labelYDiv)
		{
			labelYDiv = document.createElement("div");
			p.target.append(labelYDiv);
			$(labelYDiv).css(
			{
				"position": "absolute",
				"font-weight":"bold",
				"pointer-events":"none",
				"white-space": "nowrap",
				//"background":"rgba(255,0,0,0.3)",
				"padding-right":globalResizeCalc(2)+"px",
				"padding-bottom":globalResizeCalc(2)+"px",
			});
		}
	}
	//================================================================================
	function checkCanvasBoundary(e)
	{
		if(e.type == "touchmove" || e.type == "touchstart")
		{
			e.pageX = e.touches[0].pageX;
			e.pageY = e.touches[0].pageY;
		}
		var _x = e.pageX - $(canvasPoint).offset().left;
		var _y = e.pageY - $(canvasPoint).offset().top;
		
		if(_x >= 0 && _x <= canvasPoint.width && _y >= 0 && _y <= canvasPoint.height)
			return true;
		return false;
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
	function getAngle(p1, p2, isRad)
	{
		return (isRad ? Math.atan2((p1.y-p2.y),(p1.x-p2.x)) : Math.atan2((p1.y-p2.y),(p1.x-p2.x))*(180 / Math.PI));
	}
	//================================================================================
	//=================These functions are reffered from Maths.js=====================
	//================================================================================
	function isPointOnLine(_p,_p1,_p2,hitArea)
	{
		var len1 = getDistanceFor2pts(_p,_p1);
		var len2 = getDistanceFor2pts(_p,_p2);
		var TO_RADIANS = Math.PI / 180;	
		var _center = getMidPoint(_p1,_p2);
		
		var dist = getDistanceFor2pts(_p, _center);
		var mainDist = getDistanceFor2pts(_p1, _center);
		var pointAngle = getAngle(_p, _center);
		pointAngle = pointAngle < 0 ? 360 + pointAngle : pointAngle;
		
		var mainAngle = getAngle(_center, _p1);
		mainAngle = mainAngle < 0 ? 360 + mainAngle : mainAngle;
		
		var finalAngle = pointAngle - mainAngle  + 90;
		
		_p.x = _center.x + dist * Math.cos((finalAngle) * TO_RADIANS);
		_p.y = _center.y + dist * Math.sin((finalAngle) * TO_RADIANS);
		
		var tempObj = {a:(_center.x - hitArea / 2),b:(_center.x + hitArea / 2),c:(_center.y - mainDist),d:(_center.y + mainDist), p :_p}
		
		if ((_center.x - hitArea / 2) <= _p.x && (_center.x + hitArea / 2) >= _p.x && (_center.y - mainDist) <= _p.y && (_center.y + mainDist) >= _p.y) 
		{
			tempObj.flag = true;
		}
		else 
		{
			tempObj.flag = false;
		}
		if(tempObj.flag)
		{
			if(len1 > len2)
				return _p2;
			else
				return _p1;
		}
		return false;
	}
	
	// Returns distance between given points 
	getDistanceFor2pts = function(p1,p2)
	{
		return Math.sqrt(Math.pow((p1.x-p2.x),2)+Math.pow((p1.y-p2.y),2));
	}
	// Returns mid point between given points
	getMidPoint = function (_p1,_p2)
	{
		var newPoint = new Object();
		newPoint.x = (_p1.x+_p2.x)/2;
		newPoint.y = (_p1.y+_p2.y)/2;
		return newPoint;
	}
	//====================================END========================================
}
//================================================================================