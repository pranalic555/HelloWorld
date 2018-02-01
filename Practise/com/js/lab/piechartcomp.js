
var PieChartComp = function ()
{
	var p = 
	{
		x:10, y:10,
		width: 350, height:350,
		border:false,
		background:"#0000FF", pointColor:"red",
		minVal:1,
		pointFillColor:"rgba(255,0,0,1)",
		radius:150,
		pointRadius:6,
		pointLineWidth:2,
		partArr:[	
					{id:"lable_1",correctVal:125,val:100,lable:"A",color:"#58FAD0",fontColor:"#000"},
					{id:"lable_2",correctVal:125,val:150,lable:"B",color:"#D0A9F5",fontColor:"#000"},
					{id:"lable_3",correctVal:125,val:200,lable:"C",color:"#F3E2A9",fontColor:"#000"},
					{id:"lable_4",correctVal:125,val:50,lable:"D",color:"#F5A9A9",fontColor:"#000"},
				],
		interVal:1,
		totalVal:500,
		highLightLineWidth:2,
		highLightColor:"#FF0000",
		borderColor:"#000000",
		showHighLight:true,
		resetHighLightOnMove:true,
		allowToMove:true,
		showlable:true,
		lableRadius:100,
		fontSize:12,
		fontColor:"black",
		grideArr:[],
		userVal:[],
		padding:10,
		
		breakLableLine:false,
		preStr : "",
		postStr : "",
		lineHeight : 18,
		lableRadiusMin : 75,
		lableRadiusMax : 105,
		
		lineColor:"#00000", // line color for sections
		
		showBorder:false, // circle border
		pie_borderColor:"#000000",// circle border color
		
		lable_Shadow:false,//lable shadow
	}
	
	var canvasBase, contextBase;
	var TO_VALUE, TO_ANGLE;
	var curPickedPoint, prevAngle;
	var isOutOfAngle = false;
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function (_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		p.x = globalResizeCalc(p.x);
		p.y = globalResizeCalc(p.y);
		p.width = globalResizeCalc(p.width);
		p.height = globalResizeCalc(p.height);
		
		p.radius = globalResizeCalc(p.radius);
		
		p.centerX = globalResizeCalc(p.centerX);
		p.centerY = globalResizeCalc(p.centerY);
		
		p.pointRadius = globalResizeCalc(p.pointRadius);
		p.pointLineWidth = globalResizeCalc(p.pointLineWidth);
		
		p.lableRadius = globalResizeCalc(p.lableRadius);
		
		p.lableRadiusMin = globalResizeCalc(p.lableRadiusMin);
		p.lableRadiusMax = globalResizeCalc(p.lableRadiusMax);
		
		p.fontSize = globalResizeCalc(p.fontSize);
		
		p.highLightLineWidth = globalResizeCalc(p.highLightLineWidth);
		
		p.padding = globalResizeCalc(p.padding);
		p.lineHeight = globalResizeCalc(p.lineHeight);
		
		TO_VALUE = (p.totalVal/(Math.PI*2));
		TO_ANGLE = ((Math.PI*2)/p.totalVal);
		
		minAngleDiff = p.minVal * TO_ANGLE;
		
		p.title = p.title ? p.title : GlobalToolTipObj.tooltip.pieChart.point;
		
		createView();
		setInitValues()
		drawOnCanvas();
		
		p.showBorder ? drawBorder() : null;
		if(p.allowToMove)
		{
			$(canvasBase).unbind("mousedown",mouseEvent).bind("mousedown",mouseEvent);
			$(canvasBase).unbind("mousemove",mouseEvent).bind("mousemove",mouseEvent);
			$(canvasBase).unbind("mouseup",mouseEvent).bind("mouseup",mouseEvent);
		}
		this.setCorrectValues(p.partArr)
	}
	
	//================================================================================
	this.addEventListener = function(_evt, _fun)
	{
		p[_evt] = _fun;
	}
	
	//================================================================================
	this.show = function ()
	{
		p.target.show();
	}
	
	//================================================================================
	this.hide = function ()
	{
		p.target.hide();
	}
	
	//================================================================================
	this.getVal = function()
	{
		return p.partArr;
	}
	//================================================================================
	this.update = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		
		TO_VALUE = (p.totalVal/(Math.PI*2));
		TO_ANGLE = ((Math.PI*2)/p.totalVal);
		
		minAngleDiff = p.minVal * TO_ANGLE;
		for( var i in p.partArr)
		{
			p.partArr[i].labelRad = p.partArr[i].labelRad ? globalResizeCalc(p.partArr[i].labelRad) : null;
		}
		setInitValues();
		drawOnCanvas()
	}
	
	//================================================================================
	this.setHighLight = function(flag,_arr)
	{
		var userData= new Object();
		userData = _arr;
		
		for(var i in userData)
		{
			p.userVal.push(userData[i].point);
		}
		//console.log(p.userVal)
		p.showHighLight = flag;
		drawOnCanvas();
	}
	
	//================================================================================
	this.allowChange = function(flag)
	{
		p.allowToMove = flag;
		if(p.allowToMove)
		{
			if(BrowserDetect.any())
			{
				$(canvasBase).unbind("touchstart",mouseEvent).bind("touchstart",mouseEvent);
				$(canvasBase).unbind("touchmove",mouseEvent).bind("touchmove",mouseEvent);
				$(canvasBase).unbind("touchend",mouseEvent).bind("touchend",mouseEvent);
			}
			else
			{
				$(canvasBase).unbind("mousedown",mouseEvent).bind("mousedown",mouseEvent);
				$(canvasBase).unbind("mousemove",mouseEvent).bind("mousemove",mouseEvent);
				$(canvasBase).unbind("mouseup",mouseEvent).bind("mouseup",mouseEvent);
			}
		}
		else
		{
			if(BrowserDetect.any())
			{
				$(canvasBase).unbind("touchstart",mouseEvent);
				$(canvasBase).unbind("touchmove",mouseEvent);
				$(canvasBase).unbind("touchend",mouseEvent);
			}
			else
			{
				$(canvasBase).unbind("mousedown",mouseEvent);
				$(canvasBase).unbind("mousemove",mouseEvent);
				$(canvasBase).unbind("mouseup",mouseEvent);
			}
		}
		
		drawOnCanvas();
	}
	
	//================================================================================
	this.setCorrectValues = function(arr)
	{
		for( var i in arr)
		{
			p.partArr[i].correctVal = arr[i].correctVal;
			p.partArr[i].val = arr[i].val;
			p.partArr[i].lable = arr[i].lable;
			p.partArr[i].color = arr[i].color;
			
			p.partArr[i].labelRad = p.partArr[i].labelRad ? globalResizeCalc(p.partArr[i].labelRad) : null;
		}
		p.partArr;
		setInitValues();
		drawOnCanvas();
	}
	
	//================================================================================
	this.showText = function(flag)
	{
		p.showlable = flag;
		drawOnCanvas();
	}
	//================================================================================
	this.setMouseEvent = function(e)
	{
		if(p.allowToMove)
		{
			mouseEvent(e);
		}
	}
//=============================================================================================================================================
// PRIVATE FUNCTIONS
//=============================================================================================================================================

	//================================================================================
	function mouseEvent(e)//,flag)
	{
		//if(!flag)
		{
			if(e.type == "touchstart" || e.type == "touchmove")
			{
				e.pageX = e.originalEvent.touches[0].pageX;
				e.pageY = e.originalEvent.touches[0].pageY;
			}
			var mouseX = e.pageX - $(canvasBase).offset().left;
			var mouseY = e.pageY - $(canvasBase).offset().top;
			
		}
		
		switch(e.type)
		{
			case "mousedown":
			case "touchstart":
						curPickedPoint = detectNode(mouseX,mouseY)
						
						if(curPickedPoint)
							addPointerGrabbing(true);
						else
							addPointerGrabbing(false);
						$(window).unbind("mouseup",mouseEvent).bind("mouseup",mouseEvent);
						
						isOutOfAngle = false;
				break;
				
			case "mousemove":
			case "touchmove":
						if(curPickedPoint)
						{
							curPickedPoint.curPoint.x = mouseX;
							curPickedPoint.curPoint.y = mouseY;
							movePoint(curPickedPoint);
							calculations();
							drawOnCanvas();
						}
						
						if(detectNode(mouseX,mouseY))
						{
							$("body").addClass("commongrab");
							$(canvasBase).attr({
								"p_title": p.title,
							});
						}
						else
						{
							$("body").removeClass("commongrab");
							$(canvasBase).removeAttr("p_title");
						}
				break;
				
			case "mouseup":
			case "touchend":
						$("body").removeClass("commongrab")
						addPointerGrabbing(false)	
						curPickedPoint = null;
						$(window).unbind("mouseup",mouseEvent);
						isOutOfAngle = false;
				break;
		}
		
	}
	
	//================================================================================
	function setInitValues()
	{
		var curDegree = Math.PI * (3/2);
		for(var i in p.partArr)
		{
			i = Number(i)
			if(i < p.partArr.length-1)
				p.partArr[i].nextRef = p.partArr[i+1];
			else
				p.partArr[i].nextRef = p.partArr[0];
			
			if(i == 0)
				p.partArr[i].prevRef = p.partArr[p.partArr.length-1];
			else
				p.partArr[i].prevRef = p.partArr[i-1];
			
			p.partArr[i].prevAngle = curDegree;
			
			curDegree = curDegree + (Maths.percentToNumber(Maths.numberToPercent(p.partArr[i].val,p.totalVal),Math.PI*2)%(Math.PI*2));
			
			curDegree = curDegree >= Math.PI*2 ? curDegree % (Math.PI*2) : curDegree;
			
			p.partArr[i].curAngle = curDegree;
			p.partArr[i].prevPoint = Maths.getPoint({x:p.centerX,y:p.centerY},curDegree,p.radius);
			p.partArr[i].curPoint = Maths.getPoint({x:p.centerX,y:p.centerY},curDegree,p.radius);
		}
	}
	
	//================================================================================
	function detectNode(xVal,yVal)
	{
		for(var i = 0; i < p.partArr.length; i++)
		{
			var _temp = p.partArr[i].curPoint;
			var hitArea = p.padding;
			
			if( ((_temp.x-hitArea) <= xVal) && ((_temp.x+hitArea) >= xVal) && ((_temp.y-hitArea) <= yVal) && ((_temp.y+hitArea) >= yVal))
			{
				return p.partArr[i];
			} 
		}
		return false;
	}
	//================================================================================	
	function movePoint(point)
	{		
		var angle = Maths.getAngle({x:point.curPoint.x,y:point.curPoint.y},{x:p.centerX,y:p.centerY},true);
		angle = (angle < 0) ?  Math.PI*2 + angle : angle;
		var minCheckAngle,maxCheckAngle;
		
		minCheckAngle = point.prevAngle + minAngleDiff;
		maxCheckAngle = point.nextRef.curAngle - minAngleDiff;
		
		minCheckAngle = (minCheckAngle < 0) ?  Math.PI*2 + minCheckAngle : minCheckAngle%(Math.PI*2);
		maxCheckAngle = (maxCheckAngle < 0) ?  Math.PI*2 + maxCheckAngle : maxCheckAngle%(Math.PI*2);
		
		angle = ((angle*TO_VALUE)/p.interVal -((angle*TO_VALUE)%p.interVal)) * TO_ANGLE ;
		
		if(minCheckAngle < maxCheckAngle)
		{
			var midCheckAngle = (maxCheckAngle - minCheckAngle) / 2 + minCheckAngle;
			var midCheckAngleInverse = (midCheckAngle + Math.PI)%(Math.PI*2) ;
			//angle = maxCheckAngle <=  angle && midCheckAngle <= angle ? (midCheckAngleInverse >= angle ? maxCheckAngle : minCheckAngle ) : minCheckAngle >=  angle && midCheckAngle >= angle ? minCheckAngle : angle;
		
			if(maxCheckAngle <=  angle && midCheckAngle <= angle)
			{
				if(!isOutOfAngle)
				{
					isOutOfAngle = true;
					angle = maxCheckAngle;
					prevAngle = angle;
				}
			}
			else if(minCheckAngle >=  angle && midCheckAngle >= angle) 
			{
				if(!isOutOfAngle)
				{
					isOutOfAngle = true;
					angle = minCheckAngle;
					prevAngle = angle;
				}
			}
			else
			{
				isOutOfAngle = false;
			}
			if(isOutOfAngle)
			{
				angle = prevAngle;
			}
		
		}
		else if(minCheckAngle > maxCheckAngle)
		{
			
			var midCheckAngle = ((minCheckAngle - maxCheckAngle) / 2) + maxCheckAngle;
			//angle = minCheckAngle >=  angle && midCheckAngle <= angle ? minCheckAngle : maxCheckAngle <=  angle && midCheckAngle >= angle ? maxCheckAngle : angle;
			
			if(minCheckAngle >=  angle && midCheckAngle <= angle)
			{
				if(!isOutOfAngle)
				{
					isOutOfAngle = true;
					angle = minCheckAngle;
					prevAngle = angle;
				}
			}
			else if(maxCheckAngle <=  angle && midCheckAngle >= angle) 
			{
				if(!isOutOfAngle)
				{
					isOutOfAngle = true;
					angle = maxCheckAngle;
					prevAngle = angle;
				}
			}
			else
			{
				isOutOfAngle = false;
			}
			if(isOutOfAngle)
			{
				angle = prevAngle;
			}
		}
		else
		{
			angle = minCheckAngle;
		}
		
		point.nextRef.prevAngle = angle;
		point.nextRef.prevPoint = Maths.getPoint({x:p.centerX,y:p.centerY},point.curAngle,p.radius);
		point.curAngle = angle;
		point.curPoint = Maths.getPoint({x:p.centerX,y:p.centerY},point.curAngle,p.radius);
		
		p.resetHighLightOnMove ? p.showHighLight = false : null;
		p.pointChange ? p.pointChange({flag:true}) : null;
	}	
	//================================================================================
	function calculations()
	{
		for(var i in p.partArr)
		{
			var curPoint = p.partArr[i];
			if(curPoint.curAngle > curPoint.prevAngle)
			{
				var angle = Math.abs(curPoint.curAngle-curPoint.prevAngle);
			}
			else
			{
				var angle = curPoint.curAngle + Math.PI*2 - curPoint.prevAngle;
			}
			
			curPoint.val = Math.round(angle*TO_VALUE);
		}
	}	
	//================================================================================
	function createView()
	{
		var _temp = document.createElement("div");
		if(p.target)
		{
			p.target.append(_temp);
		}
		else
		{
			$("body").append(_temp);
		}
		p.target = $(_temp);
		p.visible == false ? p.target.css("display", "none") : null;
		
		p.index ? p.target.css("z-index", p.index) : null;
		//---------
		
		canvasBase = document.createElement("canvas");
		
		p.target.append(canvasBase);
		
		canvasBase.width = p.width;
		canvasBase.height = p.height;
		contextBase = canvasBase.getContext("2d");
		
		p.target.css(
		{
			"position": "absolute",
			"left": p.x+"px",
			"top": p.y+"px",
			"background": p.background,
		});
		
		$(canvasBase).css({
			"position": "absolute",
			"left":"0px", "top":"0px",
		});
		p.border == true ? $(canvasBase).css("border", "1px solid blue") : null;
		//---------	
	}	
	//================================================================================
	function drawOnCanvas()
	{
		canvasBase.width = canvasBase.width;
		
		p.showBorder ? drawBorder() : null;
		
		if(p.partArr.length > 1)
		{
			for(var i in p.partArr)
			{
				tempObj = p.partArr[i];
				drawCurve(tempObj.curAngle,tempObj.prevAngle,tempObj.curPoint, tempObj.prevPoint ,tempObj.color,i);
			}
			for(var i in p.partArr)
			{
				tempObj = p.partArr[i];
				if(tempObj.val != p.userVal[i] && p.showHighLight)
				{
					drawHighLight(tempObj.curAngle,tempObj.prevAngle,tempObj.curPoint, tempObj.prevPoint, i, p.highLightColor);
				}
				else
				{
					drawHighLight(tempObj.curAngle,tempObj.prevAngle,tempObj.curPoint, tempObj.prevPoint, i, p.lineColor);
				}
			}
			for(var i in p.partArr)
			{	
				if(p.allowToMove)
				{
					drawPoint(p.partArr[i].curPoint);
				}
				
				var _radBool;
				if(p.partArr[i].labelRad)
					_radBool = p.partArr[i].labelRad;
				else
					_radBool = i%2 == 0 ? true : false;
				
				if(p.showlable)
				{
					if(p.breakLableLine)
					{
						if(p.partArr[i].lable != "")
							drawLable(p.partArr[i].curAngle, p.partArr[i].prevAngle, p.partArr[i].lable, _radBool , p.preStr+p.partArr[i].val+p.postStr);
						else
							drawLable(p.partArr[i].curAngle, p.partArr[i].prevAngle, p.preStr+p.partArr[i].val+p.postStr, _radBool, p.partArr[i].lable);
					}
					else
					{
						drawLable(p.partArr[i].curAngle, p.partArr[i].prevAngle, p.partArr[i].lable+" "+p.preStr+p.partArr[i].val+p.postStr, _radBool);
					}
				}
			}
		}
		else if(p.partArr.length == 1)
		{
			
			tempObj = p.partArr[0];
			contextBase.beginPath();
			contextBase.arc(p.centerX,p.centerY,p.radius,0,Math.PI*2);
			contextBase.fillStyle = tempObj.color;
			contextBase.fill();
			contextBase.closePath();
			
			var _radBool;
			if(p.partArr[0].labelRad)
				_radBool = p.partArr[0].labelRad;
			else
				_radBool = i%2 == 0 ? true : false;
			
			drawLable(p.partArr[0].curAngle, p.partArr[0].prevAngle, p.partArr[0].lable, _radBool , p.preStr+p.partArr[0].val+p.postStr, p.partArr.length);
		}
		else
		{
			contextBase.beginPath();
			contextBase.arc(p.centerX,p.centerY,p.radius,0,Math.PI*2);
			contextBase.fillStyle = "#cccccc";
			contextBase.fill();			
			contextBase.closePath();
		}
	}	
	//================================================================================
	function drawCurve(cur,prev,curPoint,prevPoint,color,i)
	{
		contextBase.beginPath();
		contextBase.moveTo(p.centerX,p.centerY);
		contextBase.arc(p.centerX,p.centerY,p.radius,prev,cur);
		contextBase.lineTo(curPoint.x,curPoint.y);
		contextBase.lineTo(p.centerX,p.centerY);
		contextBase.fillStyle = color;
		contextBase.fill();
		contextBase.closePath();		
	}	
	//================================================================================
	function drawHighLight(cur,prev,curPoint,prevPoint,i,_color)
	{
		contextBase.beginPath();
		contextBase.moveTo(p.centerX,p.centerY);
		contextBase.arc(p.centerX,p.centerY,p.radius,prev,cur);
		contextBase.lineTo(curPoint.x,curPoint.y);
		contextBase.lineTo(p.centerX,p.centerY);
		contextBase.lineWidth = p.highLightLineWidth;
		contextBase.strokeStyle = _color;
		contextBase.stroke();
		contextBase.closePath();
	}
	//================================================================================
	function drawBorder()
	{		
		contextBase.beginPath();
		contextBase.arc(p.centerX,p.centerY,p.radius + globalResizeCalc(3),0,Math.PI*2);
		contextBase.strokeStyle = p.pie_borderColor;
		contextBase.lineWidth = p.highLightLineWidth;
		contextBase.fillStyle = "#ffffff";
		contextBase.fill();	
		contextBase.stroke();
		contextBase.closePath();
	}
	//================================================================================
	function drawPoint(curPoint)
	{
		contextBase.beginPath();
		contextBase.arc(curPoint.x,curPoint.y,p.pointRadius,0,Math.PI*2);
		if(p.showHighLight)
			contextBase.fillStyle = p.highLightColor;
		else
			contextBase.fillStyle = p.pointFillColor;
		contextBase.fillStyle = p.pointFillColor;
		contextBase.fill(); 
		var _diffLeftTop = globalResizeCalc(1.5);
		var _grd = contextBase.createRadialGradient(curPoint.x - _diffLeftTop, curPoint.y - _diffLeftTop, 0, curPoint.x - _diffLeftTop, curPoint.y - _diffLeftTop, p.pointRadius*2 - (0.2 * globalResizeCalc(1)));
		_grd.addColorStop(0, "rgba(255,255,255,1)");
		_grd.addColorStop(0.7, "rgba(255,255,255,0)");
		contextBase.fillStyle = _grd;
		contextBase.arc(curPoint.x, curPoint.y, p.pointRadius, 0, 2*Math.PI);
		contextBase.strokeStyle = "rgba(0,0,0,0.2)";
		contextBase.lineWidth = globalResizeCalc(3)
		contextBase.fill();
		contextBase.closePath();
	}

	//================================================================================
	function drawLable(cur, prev, lable, radBool , lable_2, _length)
	{
		var startAngle = Math.PI + prev;
		var endAngle = Math.PI + cur;
		
		var _center = (startAngle > endAngle) ? ((endAngle + startAngle)/2) : ((endAngle + startAngle)/2) + Math.PI;
		
		if(typeof radBool == "boolean")
			var _radius = radBool ? p.lableRadiusMin : p.lableRadiusMax;
		else
			var _radius = radBool;
		
		var lablePoint = Maths.getPoint({x:p.centerX,y:p.centerY},_center,_radius);
		
		var x1 = lablePoint.x;
		var y1 = (_length == 1) ?  p.centerY : lablePoint.y;
		
		if(p.lable_Shadow)
		{
			contextBase.beginPath();	
			contextBase.font = "bold " + p.fontSize+'pt Arial';
			contextBase.textAlign = 'center';
			contextBase.fillStyle = "#000000";
			contextBase.globalAlpha = 0.5;
			if(!lable_2)
			{
				contextBase.fillText(lable, x1 + 2, y1 + 2);
			}
			else
			{
				contextBase.fillText(lable, x1 + 2, y1 + 2);
				contextBase.fillText(lable_2, x1 + 2, y1 + p.lineHeight + 2);
			}
			contextBase.closePath();
		}
	
		contextBase.beginPath();	
		contextBase.font = "bold " + p.fontSize+'pt Arial';
		contextBase.textAlign = 'center';
		contextBase.fillStyle = p.fontColor;
		contextBase.globalAlpha = 1;
		if(!lable_2)
		{
			contextBase.fillText(lable, x1, y1);
		}
		else
		{
			contextBase.fillText(lable, x1, y1);
			contextBase.fillText(lable_2, x1, y1+p.lineHeight);
		}
		contextBase.closePath();
	}	
}


