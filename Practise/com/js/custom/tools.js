//////////////////////////////////////////////////////////////////
// Developed By: Mitr Learning & Media							//
// Name: Measuring Tools										//
// Description: This section holds all required tools.	 		//
// Date Created: 07/05/2014										//
// Date Modified: 07/05/2014									//
// Version: 1.0:												//
//////////////////////////////////////////////////////////////////
//================================================================================
// Circumference TOOL
var ArcMeasuringTool = function()
{
	// Default starts ...
	var p = 
	{
		//target:"",
		id:"arcMeasuringTool",
		x:0,
		y:0,
		radius:10,
		lineWidth:5,
		width:300,
		height:300,
		mouseEvent:"",
		unit:10,
		snappingDis:20,
		hitArea:20,
		centerPoint:{x:315,y:290},
		rulerShow:true,
		showInDegree:false,
		restrict: false,
		toolSet:[
					{
						"id":"tool_1",
						"p1":
							{
								"x":100,
								"y":100,
								"ref":""
							},
						"p2":
							{
								"x":200,
								"y":100,
								"ref":""
							},
						"visible":true,
						"color":"red"
					}
				],
		"change":""
	}
	// Default ends ...
	var _thisObj = this;
	var canvas, context;
	var curPointObj;
	var snapingPointsArr;
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
		p.radius = globalResizeCalc(p.radius);
		p.lineWidth = globalResizeCalc(p.lineWidth);
		p.snappingDis = globalResizeCalc(p.snappingDis);
		
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
		p.title ? p.target.attr("title", p.title) : null;
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
		
		for(var j in p.toolSet)
		{
			if(p.toolSet[j].p1 && p.toolSet[j].p2)
			{
				p.toolSet[j].p1.x = globalResizeCalc(p.toolSet[j].p1.x);
				p.toolSet[j].p1.y = globalResizeCalc(p.toolSet[j].p1.y);
				p.toolSet[j].p2.x = globalResizeCalc(p.toolSet[j].p2.x);
				p.toolSet[j].p2.y = globalResizeCalc(p.toolSet[j].p2.y);
				
				p.toolSet[j].p1.orgX = p.toolSet[j].p1.x;
				p.toolSet[j].p1.orgY = p.toolSet[j].p1.y;
				p.toolSet[j].p2.orgX = p.toolSet[j].p2.x;
				p.toolSet[j].p2.orgY = p.toolSet[j].p2.y;
			}
		}
		
		//----------------
		canvas = document.createElement("canvas");
		context = canvas.getContext("2d");
		//----------------
		if(p.target)
		{
			//----------------
			p.target.append(canvas);
			//---------------------------------
			createBaseCanvas();
		}
		
		drawOnCanvas();
	}
	//================================================================================
	this.mouseEvent = function(e)
	{
		var mouseX = e.x	//e.pageX - $(this).offset().left;
		var mouseY = e.y	//e.pageY - $(this).offset().top;
		if(e.type == "mousedown" || e.type == "touchend")
		{
			curPointObj = getPointOnCanvas(mouseX,mouseY);
			if(curPointObj)
			{
				addPointerGrabbing(true);
				return true;
			}
			else
			{
				addPointerGrabbing(false);
				return false;
			}
		}
		else if(e.type == "mousemove" || e.type == "touchend")
		{
			if(curPointObj)
			{
				curPointObj.isPlaced = false;
				if(BrowserDetect.any())
					mouseY -= 55;
				var index,tempPoint;
				if(snapingPointsArr)
				{
					index = checkForSnaping(mouseX,mouseY);
					tempPoint = snapingPointsArr[index];
				}
				if(tempPoint)
				{
					curPointObj.x = tempPoint.x;
					curPointObj.y = tempPoint.y;
					curPointObj.id = tempPoint.parent;
					curPointObj.center = tempPoint.center;
					curPointObj.ref = tempPoint.pointId; //index;
					curPointObj.pId = tempPoint.id;
					if(!tempPoint.notOnArc)
						curPointObj.isPlaced = true;
					curPointObj.angle = tempPoint.angle;
				}
				else
				{
					curPointObj.x = mouseX;
					curPointObj.y = mouseY;
					curPointObj.id = "";
					curPointObj.center = "";
					curPointObj.ref = "";
					curPointObj.pId = "";
					curPointObj.angle = "";
					
					p.restrict ? restrictBoundary(curPointObj) : null;
				}
				calculateDistance();
				drawOnCanvas();
			}
			if(getPointOnCanvas(mouseX,mouseY))
			{
				$("body").addClass("commongrab");
				return true;
			}
			else
			{
				$("body").removeClass("commongrab");
				return false;
			}
		}
		else if(e.type == "mouseup" || e.type == "touchend")
		{
			addPointerGrabbing(false);
			$("body").removeClass("commongrab");
			curPointObj = null;
			return false;
			//canvas.removeEventListener("mousemove", mouseEvent, false);
		}
	}
	//================================================================================
	this.setSnapPoints = function (arg)
	{
		snapingPointsArr = arg;
		_thisObj.updateTool();
	}
	//================================================================================
	this.updateTool = function()
	{
		for(var i in p.toolSet)
		{
			if(p.toolSet[i])
			{
				var flag = true;
				var index = findIndexById(p.toolSet[i].p1.ref)
				if(p.toolSet[i].p1.ref != "" &&  index == -1)
					flag = false;
				if(p.toolSet[i].p1.ref && snapingPointsArr[index]) 
				{
					var index = findIndexById(p.toolSet[i].p1.ref)
					p.toolSet[i].p1.x = snapingPointsArr[index].x;
					p.toolSet[i].p1.y = snapingPointsArr[index].y;
					p.toolSet[i].p1.angle = snapingPointsArr[index].angle;
				}
				index = findIndexById(p.toolSet[i].p2.ref)
				if(p.toolSet[i].p2.ref != "" &&  index == -1)
					flag = false;
				if(p.toolSet[i].p2.ref && snapingPointsArr[index])
				{
					p.toolSet[i].p2.x = snapingPointsArr[index].x;
					p.toolSet[i].p2.y = snapingPointsArr[index].y;
					p.toolSet[i].p2.angle = snapingPointsArr[index].angle;
				}
				if(p.onNoPointFound && !flag)
				{
					p.onNoPointFound({id:""+p.toolSet[i].id});
					resetToolByIndex(i);
					p.toolSet[i].visible = false;
				}
			}
		}
		calculateDistance();
		drawOnCanvas();
	}
	//================================================================================
	function restrictBoundary(tempPoint)
	{
		var minPadding = p.radius + p.lineWidth;
		if((tempPoint.x - minPadding) <= 0)
			tempPoint.x = minPadding;
		if((tempPoint.x + minPadding) >= p.width)
			tempPoint.x = p.width - minPadding;
		if((tempPoint.y - minPadding) <= 0)
			tempPoint.y = minPadding;
		if((tempPoint.y + minPadding) >= p.height)
			tempPoint.y = p.height - minPadding;
	}
	//================================================================================
	function resetToolByIndex(index)
	{
		if(p.toolSet[index])
		{
			var p1 = p.toolSet[index].p1;
			var p2 = p.toolSet[index].p2;
			
			p1.id = "";
			p1.center = "";
			p1.ref = "";
			p1.pId = "";
			p1.angle = "";
			p1.isPlaced = "";
			p2.id = "";
			p2.center = "";
			p2.ref = "";
			p2.pId = "";
			p2.angle = "";
			p2.isPlaced = "";
		}
	}
	//================================================================================
	this.getPointArray = function ()
	{
		var tempArr = [];
		for(var j in p.toolSet)
		{
			if(p.toolSet[j].visible)
			{
				tempArr.push(p.toolSet[j].p1);
				tempArr.push(p.toolSet[j].p2);
			}
		}
		return tempArr;
	}
	//================================================================================
	this.showTool = function(id,flag)
	{
		for(var i in p.toolSet)
		{
			if(id == p.toolSet[i].id)
			{
				p.toolSet[i].visible = flag;
				p.toolSet[i].p1.x = p.toolSet[i].p1.orgX;
				p.toolSet[i].p1.y = p.toolSet[i].p1.orgY;
				p.toolSet[i].p1.ref = "";
				p.toolSet[i].p1.center = "";
				p.toolSet[i].p1.angle = "";
				p.toolSet[i].p1.isPlaced = false;
					
				p.toolSet[i].p2.x = p.toolSet[i].p2.orgX;
				p.toolSet[i].p2.y = p.toolSet[i].p2.orgY;
				p.toolSet[i].p2.ref = "";
				p.toolSet[i].p2.center = "";
				p.toolSet[i].p2.angle = "";
				p.toolSet[i].p2.isPlaced = false;
				
				break;
			}
		}
		calculateDistance();
		drawOnCanvas();
	}
	//================================================================================
	this.addEventListener = function(_evt, _fun)
	{
		p[_evt] = _fun;
	}
	//================================================================================
	this.show = function()
	{
		p.visible = true;
		p.target.show();
	}
	//================================================================================
	this.hide = function()
	{
		p.visible = false;
		p.target.hide();
	}
	//================================================================================
	
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
			"background-color":p.bgColor,
			"box-shadow":p.bgShadow
		}).attr("id", "canvas_"+p.id);
		
		p.index ? $(canvas).css("z-index", p.index) : null;
	}
	//================================================================================
	function findIndexById(id)
	{
		for(var i in snapingPointsArr)
		{
			if(id == snapingPointsArr[i].pointId)
				return i;
		}
		return -1;
	}
	//================================================================================
	function drawOnCanvas()
	{
		canvas.width = canvas.width;
		for(var i in p.toolSet)
		{
			if(p.toolSet[i].visible)
			{
				var p1 = p.toolSet[i].p1 //new Object();
				var p2 = p.toolSet[i].p2 //new Object();
				
				context.beginPath();
				context.arc(p1.x, p1.y, p.radius, 0, 2 * Math.PI, false);
				context.lineWidth = p.lineWidth;
				context.strokeStyle = p.toolSet[i].color;
				context.stroke();
				context.closePath();
				
				context.beginPath();
				context.arc(p2.x, p2.y, p.radius, 0, 2 * Math.PI, false);
				context.lineWidth = p.lineWidth;
				context.strokeStyle = p.toolSet[i].color;
				context.stroke();
				context.closePath();
				
				
				
				var flag = false;
				if(p1.isPlaced && p2.isPlaced && p1.id != undefined && p2.id != undefined)
				{
					if(p1.id == p2.id)
					{
						p.centerPoint = p1.center;
						flag = true;
					}
				}
				var _radius = Maths.getDistance(p.centerPoint,p1);
				
				if(!flag)
				{
					//.................. Open Tool .................. //
					var length = Maths.getDistance(p1,p2);
					var angle = Maths.getAngle(p1,p2,true);
					
					var _c = Maths.getMidPoint(p1,p2);
					
					var x1 = p1.x - p.radius * Math.cos(angle);
					var y1 = p1.y - p.radius * Math.sin(angle);
					
					var x2 = p2.x + (p.radius) * Math.cos(angle);
					var y2 = p2.y + (p.radius) * Math.sin(angle);
					
					var _startAngle = Maths.getAngle(p1,p2,true);
					var _endAngle = _startAngle + Math.PI;
					
					context.beginPath();
					context.moveTo(x1,y1);
					context.lineTo(x2,y2);
					context.lineWidth = p.lineWidth;
					context.strokeStyle = p.toolSet[i].color;
					context.stroke();
					context.closePath();
					
					context.beginPath();
					context.arc(_c.x, _c.y, p.radius, _startAngle, _endAngle, false);
					context.lineWidth = p.lineWidth;
					context.strokeStyle = p.toolSet[i].color;
					context.stroke();
					context.closePath();
				// ............................................... //
				}
				else
				{
					var R = Maths.getDistance(p.centerPoint,p1);
					var r = p.radius;
					var adjustableAngle = Math.atan(r/R);
					
					var startAngle = Math.PI + Maths.getAngle(p.centerPoint,p1,true) + (adjustableAngle);
					var endAngle = Math.PI + Maths.getAngle(p.centerPoint,p2,true) - (adjustableAngle);
					
					context.beginPath(); 
					if(p.toolSet[i].length > 1)
						context.arc(p.centerPoint.x, p.centerPoint.y, _radius, startAngle, endAngle, false);
					// if(startAngle < endAngle || (Math.abs(startAngle-endAngle) > adjustableAngle))
					context.lineWidth = p.lineWidth;
					context.strokeStyle = p.toolSet[i].color;
					context.stroke();
					context.closePath();
				}
				// ............................................... // 
				
				
			}
		}
	}
	//================================================================================
	function calculateDistance()
	{
		var obj = new Object();
		for(var i in p.toolSet)
		{
			if(p.toolSet[i].visible && p.toolSet[i].p1.isPlaced && p.toolSet[i].p2.isPlaced)
			{
				p.toolSet[i].p1.angle = p.toolSet[i].p1.angle%(Math.PI*2);
				p.toolSet[i].p2.angle = p.toolSet[i].p2.angle%(Math.PI*2);
				var startAngle = (p.toolSet[i].p1.angle < 0) ? Math.PI*2 + p.toolSet[i].p1.angle : p.toolSet[i].p1.angle;
				var endAngle = (p.toolSet[i].p2.angle < 0) ? Math.PI*2 + p.toolSet[i].p2.angle : p.toolSet[i].p2.angle;
				if(p.toolSet[i].p1.center)
					var _radius = Maths.getDistance(p.toolSet[i].p1,p.toolSet[i].p1.center); 
				else
					var _radius = Maths.getDistance(p.toolSet[i].p1,p.toolSet[i].p2.center); 
				
				var _angle1 = 0;
				if(endAngle > startAngle)
				{
					_angle1 = endAngle - startAngle;
				}
				else
				{
					_angle1 = (Math.PI*2 - startAngle) + endAngle ;
				}
				
				var length = (_radius/p.unit/globalResizeCalc(1)) * 2 * Math.PI * (_angle1*Maths.TO_DEGREES /360);
				
				if(!isNaN(length))
				{
					if(p.showInDegree)
					{
						obj[""+p.toolSet[i].id] = Maths.getRound(_angle1*Maths.TO_DEGREES,4);
					}
					else
					{
						obj[""+p.toolSet[i].id] = Math.abs(length).toFixed(5);
					}
				}
				else
				{
					obj[""+p.toolSet[i].id] = (Maths.getDistance(p.toolSet[i].p1,p.toolSet[i].p2) / p.unit / globalResizeCalc(1)).toFixed(1);
					obj[""+p.toolSet[i].id+"_ruler"] = true;
				}
			}
			else if(p.toolSet[i].visible)
			{
				if(p.rulerShow)
				{
					obj[""+p.toolSet[i].id] = (Maths.getDistance(p.toolSet[i].p1,p.toolSet[i].p2) / p.unit / globalResizeCalc(1)).toFixed(4);
					obj[""+p.toolSet[i].id+"_ruler"] = true;
				}
				else
				{
					obj[""+p.toolSet[i].id] = "arc not defined";
				}
			}
			p.toolSet[i].length = obj[""+p.toolSet[i].id]
		}
		if(p.visible)
		{			
			p.change ? p.change(obj) : null;	
		}
	}
	//================================================================================
	function checkForSnaping(xVal,yVal)
	{
		var minDist = p.snappingDis;
		var returnVal = null;
		for(var i in snapingPointsArr)
		{
			if(snapingPointsArr[i])
			{
				var curDist = Maths.getDistance(snapingPointsArr[i],{x:xVal,y:yVal})
				if(curDist <= minDist)
				{
					curDist = minDist;
					returnVal = i;
				}
			}
		}
		return returnVal;
	}
	//================================================================================
	function getPointOnCanvas(xVal,yVal)
	{
		
		for(var i = p.toolSet.length -1; i >= 0; i--)
		{
			if(p.toolSet[i].visible)
			{
				var flag = false;
	
				if(p.toolSet[i].p1.isPlaced && p.toolSet[i].p2.isPlaced && p.toolSet[i].p1.id != undefined && p.toolSet[i].p2.id != undefined)
				{
					if(p.toolSet[i].p1.id == p.toolSet[i].p2.id)
					{
						p.centerPoint = p.toolSet[i].p1.center;
						flag = true;
					}
				}
				if(flag)
				{
					var angle = Maths.getAngle({x:xVal,y:yVal},p.centerPoint,true);
					angle = angle < 0 ? Math.PI*2+angle : angle;
					var startAngle = (p.toolSet[i].p1.angle < 0) ? Math.PI*2 + p.toolSet[i].p1.angle : p.toolSet[i].p1.angle;
					var endAngle = (p.toolSet[i].p2.angle < 0) ? Math.PI*2 + p.toolSet[i].p2.angle : p.toolSet[i].p2.angle;
					var curRad = Maths.getDistance({x:xVal,y:yVal},p.centerPoint);
					var rad = Maths.getDistance(p.toolSet[i].p1,p.centerPoint);

					
					var _angleDiff = Math.atan(p.radius/rad);
					
					if(rad - p.hitArea/2 <= curRad && rad + p.hitArea/2 >= curRad)
					{
						if(endAngle > startAngle)
						{
							startAngle = startAngle + _angleDiff;
							endAngle = endAngle - _angleDiff;
							if(startAngle < angle && angle <  endAngle)
							{
								var mid = (endAngle - startAngle)/2;
								if((startAngle+mid) < angle)
								{
									return p.toolSet[i].p2;
								}
								else
								{
									return p.toolSet[i].p1;
								}
							}
						}
						else
						{
							startAngle = startAngle + _angleDiff;
							endAngle = endAngle - _angleDiff;
							
							if((startAngle < angle && angle <=  Math.PI*2) || (0 <= angle && angle <  endAngle))//&& )
							{
								if(0 < angle && angle < startAngle)
								{
									return p.toolSet[i].p2;
								}
								else
								{
									return p.toolSet[i].p1;
								}
							}
						}
					}
				}
				else
				{
					if((p.toolSet[i].p1.x-p.radius <= xVal && p.toolSet[i].p1.x+p.radius >= xVal) && (p.toolSet[i].p1.y-p.radius <= yVal && p.toolSet[i].p1.y+p.radius >= yVal))
					{
						if(p.toolSet[i].p1.ref == "" || p.toolSet[i].p1.isNotDraggable || !p.toolSet[i].p1.id)
						{
							return p.toolSet[i].p1;
						}
						return null;
					}
					
					if((p.toolSet[i].p2.x-p.radius <= xVal && p.toolSet[i].p2.x+p.radius >= xVal) && (p.toolSet[i].p2.y-p.radius <= yVal && p.toolSet[i].p2.y+p.radius >= yVal))
					{
						if(p.toolSet[i].p2.ref == "" || p.toolSet[i].p2.isNotDraggable || !p.toolSet[i].p2.id)
						{
							return p.toolSet[i].p2;
						}
						return null;
					}
					var tempReturn = Maths.isPointOnLine({x:xVal,y:yVal},p.toolSet[i].p1,p.toolSet[i].p2,p.hitArea);
					if(tempReturn)
						return tempReturn ;
				}
			}
		}
		return null;
	}
	
}
//================================================================================
//================================================================================
// MEASURING TOOL
var MeasuringTool = function()
{
	// Default starts ...
	var p = 
	{
		//target:"",
		id:"lengthMeasuringTool",
		x:0,
		y:0,
		radius:10,
		lineWidth:5,
		width:0,
		height:0,
		mouseEvent:"",
		unit:10,
		snappingDis:20,
		hitArea:20,
		isFilled:false,
		showLable:false,
		restrict : false,
		rectPadding:10,
		lableFont:12,
		lableLineWidth:3,
		labelColor:"black",
		labelBgColor:"#E6E6E6",
		labelLineColor:"#999",
		precision : 4,
		lableStartText:"L = ",
		toolSet:[
					{
						"id":"tool_1",
						"p1":
							{
								"x":100,
								"y":100,
								"ref":""
							},
						"p2":
							{
								"x":200,
								"y":100,
								"ref":""
							},
						"visible":true,
						"color":"red"
					}
				],
		"change":""
	}
	// Default ends ...
	var _thisObj = this;
	var canvas, context;
	var curPointObj;
	var snapingPointsArr;
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
		p.radius = globalResizeCalc(p.radius);
		p.lineWidth = globalResizeCalc(p.lineWidth);
		p.snappingDis = globalResizeCalc(p.snappingDis);
		
		p.lableFont = globalResizeCalc(p.lableFont);
		p.rectPadding = globalResizeCalc(p.rectPadding);
		p.lableLineWidth = globalResizeCalc(p.lableLineWidth);
		
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
		p.title ? p.target.attr("title", p.title) : null;
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
		
		for(var j in p.toolSet)
		{
			p.toolSet[j].p1.x = globalResizeCalc(p.toolSet[j].p1.x);
			p.toolSet[j].p1.y = globalResizeCalc(p.toolSet[j].p1.y);
			p.toolSet[j].p2.x = globalResizeCalc(p.toolSet[j].p2.x);
			p.toolSet[j].p2.y = globalResizeCalc(p.toolSet[j].p2.y);
			
			p.toolSet[j].p1.orgX = p.toolSet[j].p1.x;
			p.toolSet[j].p1.orgY = p.toolSet[j].p1.y;
			p.toolSet[j].p2.orgX = p.toolSet[j].p2.x;
			p.toolSet[j].p2.orgY = p.toolSet[j].p2.y;
		}
		
		//----------------
		canvas = document.createElement("canvas");
		context = canvas.getContext("2d");
		//----------------
		if(p.target)
		{
			//----------------
			p.target.append(canvas);
			//---------------------------------
			createBaseCanvas();
		}
		calculateDistance();
		drawOnCanvas();
	}
	//================================================================================
	this.mouseEvent = function(e)
	{
		var mouseX = e.x	//e.pageX - $(this).offset().left;
		var mouseY = e.y	//e.pageY - $(this).offset().top;
		if(e.type == "mousedown" || e.type == "touchend")
		{
			//canvas.addEventListener("mousemove", mouseEvent, false);
			curPointObj = getPointOnCanvas(mouseX,mouseY);
			
			if(curPointObj)
			{
				addPointerGrabbing(true);
				return true;
			}
			else
			{
				addPointerGrabbing(false);
				return false;
			}
		}
		else if(e.type == "mousemove" || e.type == "touchend")
		{
			if(curPointObj)
			{
				if(BrowserDetect.any())
					mouseY -= 55;
				var index,tempPoint;
				if(snapingPointsArr)
				{
					index = checkForSnaping(mouseX,mouseY);
					tempPoint = snapingPointsArr[index];
				}
				if(tempPoint)
				{
					curPointObj.x = tempPoint.x;
					curPointObj.y = tempPoint.y;
					curPointObj.id = tempPoint.id;
					curPointObj.ref = index;
				}
				else
				{
					curPointObj.x = mouseX;
					curPointObj.y = mouseY;
					curPointObj.id = "";
					curPointObj.ref = "";
					p.restrict ? restrictBoundary(curPointObj) : null;
				}
				calculateDistance();
				drawOnCanvas();
			}
			
			if(getPointOnCanvas(mouseX,mouseY))
			{
				$("body").addClass("commongrab");
				return true;
			}
			else
			{
				$("body").removeClass("commongrab");
				return false;
			}
		}
		else if(e.type == "mouseup" || e.type == "touchend")
		{
			addPointerGrabbing(false);
			$("body").removeClass("commongrab");
			curPointObj = null;
			return false;
			//canvas.removeEventListener("mousemove", mouseEvent, false);
		}
	}
	//================================================================================
	this.setSnapPoints = function (arg)
	{
		snapingPointsArr = arg;
		var str = "";
		for(var i in snapingPointsArr)
		{
			str = str + " : " + snapingPointsArr[i].id
		}
		//console.log(str)
		_thisObj.updateTool();
	}
	//================================================================================
	this.updateTool = function()
	{
		for(var i in p.toolSet)
		{
			if(p.toolSet[i] )
			{
				if(p.toolSet[i].visible)
				{
					if(p.toolSet[i].p1.ref && snapingPointsArr[p.toolSet[i].p1.ref]) 
					{
						p.toolSet[i].p1.x = snapingPointsArr[p.toolSet[i].p1.ref].x;
						p.toolSet[i].p1.y = snapingPointsArr[p.toolSet[i].p1.ref].y;
					}
					
					
					if(p.toolSet[i].p2.ref && snapingPointsArr[p.toolSet[i].p2.ref])
					{
						p.toolSet[i].p2.x = snapingPointsArr[p.toolSet[i].p2.ref].x;
						p.toolSet[i].p2.y = snapingPointsArr[p.toolSet[i].p2.ref].y;
					}
					
					if(p.onNoPointFound)
					{
						var flag = true;
						
						if(p.toolSet[i].p1.ref != "" &&  !checkPresence(p.toolSet[i].p1.ref, p.toolSet[i].p1.id))
							flag = false;
					
						if(p.toolSet[i].p2.ref != "" &&  !checkPresence(p.toolSet[i].p2.ref, p.toolSet[i].p2.id))
							flag = false;
						
						if(!flag)
						{
							p.onNoPointFound({id:""+p.toolSet[i].id});
							resetToolByIndex(i);
							p.toolSet[i].visible = false;
						}
					}
				}
			}
		}
		calculateDistance();
		drawOnCanvas();
	}
	//================================================================================
	this.getDistance = function (id)
	{
		for(var i in p.toolSet)
		{
			if(id == p.toolSet[i].id)
			{
				var length = Maths.getDistance(p.toolSet[i].p1,p.toolSet[i].p2) / p.unit; 
				if(length > 0)
					return length / globalResizeCalc(1);		/// divided because to convert scale values.  
				else
					return 0;
			}
		}
		return;
	}
	//================================================================================
	this.getPointArray = function ()
	{
		var tempArr = [];
		for(var j in p.toolSet)
		{
			if(p.toolSet[j].visible)
			{
				tempArr.push(p.toolSet[j].p1);
				tempArr.push(p.toolSet[j].p2);
			}
		}
		return tempArr;
	}
	//================================================================================
	this.showTool = function(id,flag)
	{
		for(var i in p.toolSet)
		{
			if(id == p.toolSet[i].id)
			{
				p.toolSet[i].visible = flag;
				p.toolSet[i].p1.x = p.toolSet[i].p1.orgX;
				p.toolSet[i].p1.y = p.toolSet[i].p1.orgY;
				p.toolSet[i].p1.ref = "";
				p.toolSet[i].p1.id = "";
				
				p.toolSet[i].p2.x = p.toolSet[i].p2.orgX;
				p.toolSet[i].p2.y = p.toolSet[i].p2.orgY;
				p.toolSet[i].p2.ref = "";
				p.toolSet[i].p2.id = "";
				
				break;
			}
		}
		calculateDistance();
		drawOnCanvas();
	}
	//================================================================================
	this.addEventListener = function(_evt, _fun)
	{
		p[_evt] = _fun;
	}
	//================================================================================
	this.show = function()
	{
		p.visible = true;
		p.target.show();
	}
	//================================================================================
	this.hide = function()
	{
		p.visible = false;
		p.target.hide();
	}
	//================================================================================
	
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function restrictBoundary(tempPoint)
	{
		var minPadding = p.radius + p.lineWidth;
		if((tempPoint.x - minPadding) <= 0)
			tempPoint.x = minPadding;
		if((tempPoint.x + minPadding) >= p.width)
			tempPoint.x = p.width - minPadding;
		if((tempPoint.y - minPadding) <= 0)
			tempPoint.y = minPadding;
		if((tempPoint.y + minPadding) >= p.height)
			tempPoint.y = p.height - minPadding;
	}
	//================================================================================
	function resetToolByIndex(index)
	{
		if(p.toolSet[index])
		{
			var p1 = p.toolSet[index].p1;
			var p2 = p.toolSet[index].p2;
			
			p1.id = "";
			p1.center = "";
			p1.ref = "";
			p1.pId = "";
			p1.angle = "";
			p1.isPlaced = "";
			p2.id = "";
			p2.center = "";
			p2.ref = "";
			p2.pId = "";
			p2.angle = "";
			p2.isPlaced = "";
		}
	}
	//================================================================================
	function checkPresence(index,id)
	{
		if(snapingPointsArr[index])
		{
			if(snapingPointsArr[index].id == id)
				return true;
		}
		return false;
	}
	//================================================================================
	function createBaseCanvas()
	{
		canvas.width = p.width;
		canvas.height = p.height;
		$(canvas).css(
		{
			"position": "absolute",
			"background-color":p.bgColor,
			"box-shadow":p.bgShadow
		}).attr("id", "canvas_"+p.id);
		
		p.index ? $(canvas).css("z-index", p.index) : null;
	}
	//================================================================================
	function drawOnCanvas()
	{
		canvas.width = canvas.width;
		for(var i in p.toolSet)
		{
			if(p.toolSet[i].visible)
			{
				var p1 = p.toolSet[i].p1 //new Object();
				var p2 = p.toolSet[i].p2 //new Object();
				
				context.beginPath();
				context.arc(p1.x, p1.y, p.radius, 0, 2 * Math.PI, false);
				context.lineWidth = p.lineWidth;
				context.strokeStyle = p.toolSet[i].color;
				context.stroke();
				if(p.isFilled)
				{
					context.fillStyle = p.toolSet[i].color;
					context.fill();
				}
				context.closePath();
				
				var length = Maths.getDistance(p1,p2);
				var angle = Maths.getAngle(p1,p2,true);
				
				var x1 = p1.x - p.radius * Math.cos(angle);
				var y1 = p1.y - p.radius * Math.sin(angle);
				
				var x2 = p2.x + (p.radius) * Math.cos(angle);
				var y2 = p2.y + (p.radius) * Math.sin(angle);
				
				
				context.beginPath();
				context.moveTo(x1,y1);
				context.lineTo(x2,y2);
				context.lineWidth = p.lineWidth;
				context.strokeStyle = p.toolSet[i].color;
				context.stroke();
				context.closePath();
				
				context.beginPath();
				context.arc(p2.x, p2.y, p.radius, 0, 2 * Math.PI, false);
				context.lineWidth = p.lineWidth;
				context.strokeStyle = p.toolSet[i].color;
				context.stroke();
				if(p.isFilled)
				{
					context.fillStyle = p.toolSet[i].color;
					context.fill();
				}
				context.closePath();
				
				
				if(p.showLable)
				{
					var text = p.lableStartText + p.toolSet[i].length;
					context.beginPath();
					context.font = p.lableFont+'pt Arial';
					context.textAlign = 'center';
					//context.fillStyle = p.labelColor;
					//context.fillText(text, x1, y1);
					
					var metrics = context.measureText(text);
					var rectWidth = metrics.width + p.rectPadding;
					var rectHeight = p.lableFont + p.rectPadding ;
					
					var tempPoint = Maths.getMidPoint(p1,p2);
					var rectX = tempPoint.x - rectWidth/2;
					var rectY = tempPoint.y - rectHeight/2 ;
					
					
					context.rect(rectX, rectY, rectWidth, rectHeight);
					context.strokeStyle = p.labelLineColor;
					context.fillStyle = p.labelBgColor;
					context.fill();
					context.lineWidth  = p.lableLineWidth;
					context.stroke();
					context.closePath();
					
					context.beginPath();
					context.font = p.lableFont+'pt Arial';
					context.textAlign = 'center';
					context.fillStyle = p.labelColor;
					context.fillText(text, tempPoint.x, tempPoint.y + p.lableFont/2);
					context.closePath();
				}
				
			}
		}
	}
	//================================================================================
	function calculateDistance()
	{
		var obj = new Object();
				
		for(var i in p.toolSet)
		{
			if(p.toolSet[i].visible)
			{
				var length = _thisObj.getDistance(p.toolSet[i].id)
				
				if(length <= 0)
					length = 0;
				
				p.toolSet[i].length = Maths.getRound(length,p.precision);
				obj[""+p.toolSet[i].id] = length;
			}
		}
		if(p.visible)
		{
			p.change ? p.change(obj) : null;	
		}
	}
	//================================================================================
	function checkForSnaping(xVal,yVal)
	{
		var minDist = p.snappingDis;
		var returnVal = null;
		for(var i in snapingPointsArr)
		{
			if(snapingPointsArr[i])
			{
				var curDist = Maths.getDistance(snapingPointsArr[i],{x:xVal,y:yVal})
				if(curDist <= minDist)
				{
					curDist = minDist;
					returnVal = i;
				}
			}
		}
		return returnVal;
	}
	//================================================================================
	function getPointOnCanvas(xVal,yVal)
	{
		//for(var i in p.toolSet)
		for(var i = p.toolSet.length -1; i >= 0; i--)
		{
			if(p.toolSet[i].visible)
			{
				//console.log(snapingPointsArr[p.toolSet[i].p1.ref])
				if((p.toolSet[i].p1.x-p.radius <= xVal && p.toolSet[i].p1.x+p.radius >= xVal) && (p.toolSet[i].p1.y-p.radius <= yVal && p.toolSet[i].p1.y+p.radius >= yVal))
				{
					if(p.toolSet[i].p1.ref == "" || snapingPointsArr[p.toolSet[i].p1.ref].isNotDraggable)
					{
						return p.toolSet[i].p1;
					}
					return null;
				}
				
				if((p.toolSet[i].p2.x-p.radius <= xVal && p.toolSet[i].p2.x+p.radius >= xVal) && (p.toolSet[i].p2.y-p.radius <= yVal && p.toolSet[i].p2.y+p.radius >= yVal))
				{
					if(p.toolSet[i].p2.ref == "" || snapingPointsArr[p.toolSet[i].p2.ref].isNotDraggable)
					{
						return p.toolSet[i].p2;
					}
					return null;
				}
				var tempReturn = Maths.isPointOnLine({x:xVal,y:yVal},p.toolSet[i].p1,p.toolSet[i].p2,p.hitArea);
				if(tempReturn)
					return tempReturn ;
			}
		}
		
		return null;
	}
	
}
//================================================================================

//================================================================================
// PROTRACTOR TOOL
//================================================================================

var ProtractorTool = function()
{
	// Default starts ...
	var p = 
	{
		//target:"",
		id:"angleMeasuring",
		x:0,
		y:0,
		radius:10,
		lineWidth:5,
		width:0,
		height:0,
		mouseEvent:"",
		snappingDis:20,
		restrict : false,
		hitArea:20,
		toolSet:[
					{
						"id":"tool_2",
						"p1":
							{
								"x":100,
								"y":300,
								"ref":""
							},
						"p2":
							{
								"x":200,
								"y":300,
								"ref":""
							},
						"p3":
							{
								"x":200,
								"y":100,
								"ref":""
							},
						"visible":true,
						"color":"blue"
					}
				],
		"change":""
	}
	// Default ends ...
	var _thisObj = this;
	var canvas, context;
	var curPointObj;
	var snapingPointsArr;
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
		p.radius = globalResizeCalc(p.radius);
		p.lineWidth = globalResizeCalc(p.lineWidth);
		p.snappingDis = globalResizeCalc(p.snappingDis);
		
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
		p.title ? p.target.attr("title", p.title) : null;
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
		for(var j in p.toolSet)
		{
			p.toolSet[j].p1.x = globalResizeCalc(p.toolSet[j].p1.x);
			p.toolSet[j].p1.y = globalResizeCalc(p.toolSet[j].p1.y);
			p.toolSet[j].p2.x = globalResizeCalc(p.toolSet[j].p2.x);
			p.toolSet[j].p2.y = globalResizeCalc(p.toolSet[j].p2.y);
			p.toolSet[j].p3.x = globalResizeCalc(p.toolSet[j].p3.x);
			p.toolSet[j].p3.y = globalResizeCalc(p.toolSet[j].p3.y);
			
			
			p.toolSet[j].p1.orgX = p.toolSet[j].p1.x;
			p.toolSet[j].p1.orgY = p.toolSet[j].p1.y;
			p.toolSet[j].p2.orgX = p.toolSet[j].p2.x;
			p.toolSet[j].p2.orgY = p.toolSet[j].p2.y;
			p.toolSet[j].p3.orgX = p.toolSet[j].p3.x;
			p.toolSet[j].p3.orgY = p.toolSet[j].p3.y;
		}
		
		//----------------
		canvas = document.createElement("canvas");
		context = canvas.getContext("2d");
		//----------------
		if(p.target)
		{
			//----------------
			p.target.append(canvas);
			//---------------------------------
			createBaseCanvas();
		}
		
		drawOnCanvas()
	}
	//================================================================================
	this.addEventListener = function(_evt, _fun)
	{
		p[_evt] = _fun;
	}
	//================================================================================
	this.show = function()
	{
		p.visible = true;
		p.target.show();
	}
	//================================================================================
	this.hide = function()
	{
		p.visible = false;
		p.target.hide();
	}
	//================================================================================
	this.setSnapPoints = function (arg)
	{
		snapingPointsArr = arg;
		_thisObj.updateTool();
	}
	//================================================================================
	this.getAngle = function (id)
	{
		for(var i in p.toolSet)
		{
			if(id == p.toolSet[i].id)
			{
				var angle = Maths.getAngleBtn3(p.toolSet[i].p1,p.toolSet[i].p3,p.toolSet[i].p2);
				if((p.toolSet[i].p1.x == p.toolSet[i].p2.x && p.toolSet[i].p1.y == p.toolSet[i].p2.y) ||(p.toolSet[i].p2.x == p.toolSet[i].p3.x && p.toolSet[i].p2.y == p.toolSet[i].p3.y))
				{
					if(p.notAngle)
						angle = "Not an angle.";
					else
						angle = 90
				}
				return angle;
			}
		}
		return;
	}
	//================================================================================
	this.getPointArray = function ()
	{
		var tempArr = [];
		for(var j in p.toolSet)
		{
			if(p.toolSet[j].visible)
			{
				tempArr.push(p.toolSet[j].p1);
				tempArr.push(p.toolSet[j].p2);
				tempArr.push(p.toolSet[j].p3);
			}
		}
		return tempArr;
	}
	//================================================================================
	this.mouseEvent = function(e)
	{
		var mouseX = e.x	//e.pageX - $(this).offset().left;
		var mouseY = e.y	//e.pageY - $(this).offset().top;
		if(e.type == "mousedown" || e.type == "touchstart")
		{
			//canvas.addEventListener("mousemove", mouseEvent, false);
			
			curPointObj = getPointOnCanvas(mouseX,mouseY);
			
			if(curPointObj)
			{
				addPointerGrabbing(true);
				return true;
			}
			else
			{
				addPointerGrabbing(false);
				return false;
			}
		}
		else if(e.type == "mousemove" || e.type == "touchmove")
		{
			if(curPointObj)
			{
				if(BrowserDetect.any())
					mouseY -= 55;
				var index,tempPoint;
				if(snapingPointsArr)
				{
					index = checkForSnaping(mouseX,mouseY);
					tempPoint = snapingPointsArr[index];
				}
				if(tempPoint)
				{
					curPointObj.x = tempPoint.x;
					curPointObj.y = tempPoint.y;
					curPointObj.id = tempPoint.id;
					curPointObj.ref = index;
				}
				else
				{
					curPointObj.x = mouseX;
					curPointObj.y = mouseY;
					curPointObj.id = "";
					curPointObj.ref = "";
					p.restrict ? restrictBoundary(curPointObj) : null;
				}
				drawOnCanvas();
				calculateAngle();
			}
			
			if(getPointOnCanvas(mouseX,mouseY))
			{
				$("body").addClass("commongrab");
				return true;
			}
			else
			{
				$("body").removeClass("commongrab");
				return false;
			}
		}
		else if(e.type == "mouseup" || e.type == "touchend")
		{
			addPointerGrabbing(false);
			$("body").removeClass("commongrab");
			curPointObj = null;
			return false;
			//canvas.removeEventListener("mousemove", mouseEvent, false);
		}
	}
	//================================================================================
	this.updateTool = function()
	{
		for(var i in p.toolSet)
		{
			if(p.toolSet[i])
			{
				if(p.toolSet[i].visible)
				{
					if(p.toolSet[i].p1.ref && snapingPointsArr[p.toolSet[i].p1.ref])
					{
						p.toolSet[i].p1.x = snapingPointsArr[p.toolSet[i].p1.ref].x;
						p.toolSet[i].p1.y = snapingPointsArr[p.toolSet[i].p1.ref].y;
					}
					if(p.toolSet[i].p2.ref && snapingPointsArr[p.toolSet[i].p2.ref])
					{
						p.toolSet[i].p2.x = snapingPointsArr[p.toolSet[i].p2.ref].x;
						p.toolSet[i].p2.y = snapingPointsArr[p.toolSet[i].p2.ref].y;
					}
					if(p.toolSet[i].p3.ref && snapingPointsArr[p.toolSet[i].p3.ref])
					{
						p.toolSet[i].p3.x = snapingPointsArr[p.toolSet[i].p3.ref].x;
						p.toolSet[i].p3.y = snapingPointsArr[p.toolSet[i].p3.ref].y;
					}
				
				
					if(p.onNoPointFound)
					{
						var flag = true;
						
						if(p.toolSet[i].p1.ref != "" &&  !checkPresence(p.toolSet[i].p1.ref, p.toolSet[i].p1.id))
							flag = false;
					
						if(p.toolSet[i].p2.ref != "" &&  !checkPresence(p.toolSet[i].p2.ref, p.toolSet[i].p2.id))
							flag = false;
						
						if(p.toolSet[i].p3.ref != "" &&  !checkPresence(p.toolSet[i].p3.ref, p.toolSet[i].p3.id))
							flag = false;
						
						if(!flag)
						{
							p.onNoPointFound({id:""+p.toolSet[i].id});
							resetToolByIndex(i);
							p.toolSet[i].visible = false;
						}
					}
				}
			}
		}
		drawOnCanvas();
		calculateAngle();
	}
	//================================================================================
	this.showTool = function(id,flag)
	{
		for(var i in p.toolSet)
		{
			if(id == p.toolSet[i].id)
			{
				p.toolSet[i].visible = flag;
				
				p.toolSet[i].p1.x = p.toolSet[i].p1.orgX;
				p.toolSet[i].p1.y = p.toolSet[i].p1.orgY;
				p.toolSet[i].p1.ref = "";
				
				p.toolSet[i].p2.x = p.toolSet[i].p2.orgX;
				p.toolSet[i].p2.y = p.toolSet[i].p2.orgY;
				p.toolSet[i].p2.ref = "";
				
				p.toolSet[i].p3.x = p.toolSet[i].p3.orgX;
				p.toolSet[i].p3.y = p.toolSet[i].p3.orgY;
				p.toolSet[i].p3.ref = "";
				
				break;
			}
		}
		drawOnCanvas();
		calculateAngle();
	}
	
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function restrictBoundary(tempPoint)
	{
		var minPadding = p.radius + p.lineWidth;
		if((tempPoint.x - minPadding) <= 0)
			tempPoint.x = minPadding;
		if((tempPoint.x + minPadding) >= p.width)
			tempPoint.x = p.width - minPadding;
		if((tempPoint.y - minPadding) <= 0)
			tempPoint.y = minPadding;
		if((tempPoint.y + minPadding) >= p.height)
			tempPoint.y = p.height - minPadding;
	}
	//================================================================================
	function resetToolByIndex(index)
	{
		if(p.toolSet[index])
		{
			var p1 = p.toolSet[index].p1;
			var p2 = p.toolSet[index].p2;
			var p3 = p.toolSet[index].p3;
			
			p1.id = "";
			p1.center = "";
			p1.ref = "";
			p1.pId = "";
			p1.angle = "";
			p1.isPlaced = "";
			p2.id = "";
			p2.center = "";
			p2.ref = "";
			p2.pId = "";
			p2.angle = "";
			p2.isPlaced = "";
			p3.id = "";
			p3.center = "";
			p3.ref = "";
			p3.pId = "";
			p3.angle = "";
			p3.isPlaced = "";
		}
	}
	//================================================================================
	function checkPresence(index,id)
	{
		if(snapingPointsArr[index])
		{
			if(snapingPointsArr[index].id == id)
				return true;
		}
		return false;
	}
	//================================================================================
	function createBaseCanvas()
	{
		canvas.width = p.width;
		canvas.height = p.height;
		$(canvas).css(
		{
			"position": "absolute",
			"background-color":p.bgColor,
			"box-shadow":p.bgShadow
		}).attr("id", "canvas_"+p.id);
		
		p.index ? $(canvas).css("z-index", p.index) : null;
	}
	//================================================================================
	function drawOnCanvas()
	{
		canvas.width = canvas.width;
		for(var i in p.toolSet)
		{
			if(p.toolSet[i].visible)
			{
				var p1 = p.toolSet[i].p1 //new Object();
				var p2 = p.toolSet[i].p2 //new Object();
				var p3 = p.toolSet[i].p3 //new Object();
				
				context.beginPath();
				context.arc(p1.x, p1.y, p.radius, 0, 2 * Math.PI, false);
				context.lineWidth = p.lineWidth;
				context.strokeStyle = p.toolSet[i].color;
				context.stroke();
				context.closePath();
				
				var length = Maths.getDistance(p1,p2);
				var angle = Maths.getAngle(p1,p2,true);
				
				var x1 = p1.x - p.radius * Math.cos(angle);
				var y1 = p1.y - p.radius * Math.sin(angle);
				
				var x2 = p2.x + (p.radius) * Math.cos(angle);
				var y2 = p2.y + (p.radius) * Math.sin(angle);
				
				
				context.beginPath();
				context.moveTo(x1,y1);
				context.lineTo(x2,y2);
				context.lineWidth = p.lineWidth;
				context.strokeStyle = p.toolSet[i].color;
				context.stroke();
				context.closePath();
				
				context.beginPath();
				context.arc(p2.x, p2.y, p.radius, 0, 2 * Math.PI, false);
				context.lineWidth = p.lineWidth;
				context.strokeStyle = p.toolSet[i].color;
				context.stroke();
				context.closePath();
				
				
				var length = Maths.getDistance(p2,p3);
				var angle = Maths.getAngle(p2,p3,true);
				
				var x1 = p2.x - p.radius * Math.cos(angle);
				var y1 = p2.y - p.radius * Math.sin(angle);
				
				var x2 = p3.x + (p.radius) * Math.cos(angle);
				var y2 = p3.y + (p.radius) * Math.sin(angle);
				
				context.beginPath();
				context.moveTo(x1,y1);
				context.lineTo(x2,y2);
				context.lineWidth = p.lineWidth;
				context.strokeStyle = p.toolSet[i].color;
				context.stroke();
				context.closePath();
				
				context.beginPath();
				context.arc(p3.x, p3.y, p.radius, 0, 2 * Math.PI, false);
				context.lineWidth = p.lineWidth;
				context.strokeStyle = p.toolSet[i].color;
				context.stroke();
				context.closePath();
				
			}
		}
	}
	//================================================================================
	function calculateAngle()
	{
		var obj = new Object();
				
		for(var i in p.toolSet)
		{
			if(p.toolSet[i].visible)
			{
				var angle = _thisObj.getAngle(p.toolSet[i].id);
				obj[""+p.toolSet[i].id] = angle;
			}
		}
		if(p.visible)
			p.change ? p.change(obj) : null;
	}
	//================================================================================
	
	//================================================================================
	function checkForSnaping(xVal,yVal)
	{
		var minDist = p.snappingDis;
		var returnVal = null;
		for(var i in snapingPointsArr)
		{
			if(snapingPointsArr[i])
			{
				var curDist = Maths.getDistance(snapingPointsArr[i],{x:xVal,y:yVal})
				if(curDist <= minDist)
				{
					curDist = minDist;
					returnVal = i;
				}
			}
		}
		return returnVal;
	}
	//================================================================================
	function getPointOnCanvas(xVal,yVal)
	{
		//for(var i in p.toolSet)
		for(var i = p.toolSet.length -1; i >= 0; i--)
		{
			if(p.toolSet[i].visible)
			{
				if((p.toolSet[i].p1.x-p.radius <= xVal && p.toolSet[i].p1.x+p.radius >= xVal) && (p.toolSet[i].p1.y-p.radius <= yVal && p.toolSet[i].p1.y+p.radius >= yVal))
				{
					if(p.toolSet[i].p1.ref == "" || snapingPointsArr[p.toolSet[i].p1.ref].isNotDraggable)
					{
						return p.toolSet[i].p1;
					}
					return null;
				}
				if((p.toolSet[i].p2.x-p.radius <= xVal && p.toolSet[i].p2.x+p.radius >= xVal) && (p.toolSet[i].p2.y-p.radius <= yVal && p.toolSet[i].p2.y+p.radius >= yVal))
				{
					if(p.toolSet[i].p2.ref == "" || snapingPointsArr[p.toolSet[i].p2.ref].isNotDraggable)
					{
						return p.toolSet[i].p2;
					}
					return null;
				}
				if((p.toolSet[i].p3.x-p.radius <= xVal && p.toolSet[i].p3.x+p.radius >= xVal) && (p.toolSet[i].p3.y-p.radius <= yVal && p.toolSet[i].p3.y+p.radius >= yVal))
				{
					if(p.toolSet[i].p3.ref == "" || snapingPointsArr[p.toolSet[i].p3.ref].isNotDraggable)
					{
						return p.toolSet[i].p3;
					}
					return null;
				}
				var temp =  Maths.isPointOnLine({x:xVal,y:yVal},p.toolSet[i].p1,p.toolSet[i].p2,p.hitArea);
				if(temp)
					return temp
				temp = Maths.isPointOnLine({x:xVal,y:yVal},p.toolSet[i].p3,p.toolSet[i].p2,p.hitArea);
				if(temp)
					return temp
				
			}
		}
		return null;
	}
	//================================================================================
}