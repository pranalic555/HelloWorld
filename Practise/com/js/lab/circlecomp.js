var CircleComp = function ()
{
	var p = 
	{
		x:0, y:0,
		width:500, height:500,
		centerX: 25 ,centerY: 25,
		center:"",
		border:false, arcWidth:2,
		fillColor:"#fff", lineColor:"#fff",
		centerFillColor:"#fff",centerLineColor:"#fff",
		canvas:"", ctx:"",
		unit:10,
		minActRadius:0.1, radius:10, maxActRadius:20, 
		diameter:0, area:0, circumference:0,		
		globalAlpha:0.8,
		pointArr:[],
		diameterArr:[],
		centerAngleArr:[],
		congruentArcArr:[],
		congruentCordArr:[],
		equiDistantCordArr:[],
		arcArr:[],
		inscribedAngleArr:[],
		inscribedQuadrilateralArr:[],
		pointRadius:10,
		fontSize: 15,
		fontColor:"#000",
		showCenterPoint:true,
		centerPoint:"A",
		refPoint:"", // {txt:"a",angle:Math.PI},
		minLineWidth:1,
		maxLineWidth:2,
		enableSanpping:false,
		diameterLineWidth:3,
		inscribedAngleLineWidth:3,
		QuadrilateralLineWidth:3,
		congruentCordLineWidth:3,
		centerAngleLineWidth:3,
		congruentArcLineWidth:3,
		equiDistantCordLineWidth:3,
		pointLineWidth:5,
		nonDragPointLineWidth:2,
		angleLineWidth:2
	}
	var curPoint,_angleDiff;
	var _thisRef = this;
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
		//p.unit = globalResizeCalc(p.unit);
		p.minLineWidth = globalResizeCalc(p.minLineWidth);
		p.maxLineWidth = globalResizeCalc(p.maxLineWidth);
		p.diameterLineWidth = globalResizeCalc(p.diameterLineWidth);
		p.inscribedAngleLineWidth = globalResizeCalc(p.inscribedAngleLineWidth);
		p.QuadrilateralLineWidth = globalResizeCalc(p.QuadrilateralLineWidth);
		p.congruentCordLineWidth = globalResizeCalc(p.congruentCordLineWidth);
		p.centerAngleLineWidth = globalResizeCalc(p.centerAngleLineWidth);
		p.congruentArcLineWidth = globalResizeCalc(p.congruentArcLineWidth);
		p.equiDistantCordLineWidth = globalResizeCalc(p.equiDistantCordLineWidth);
		p.pointLineWidth = globalResizeCalc(p.pointLineWidth);
		p.nonDragPointLineWidth = globalResizeCalc(p.nonDragPointLineWidth);
		p.pointRadius = globalResizeCalc(p.pointRadius);
		p.angleLineWidth = globalResizeCalc(p.angleLineWidth);
		p.centerX = globalResizeCalc(p.centerX) * p.unit;
		p.centerY = globalResizeCalc(p.centerY) * p.unit;
		p.center = {x:p.centerX,y:p.centerY,isDraggable:false,pointId:"centerPoint"+p.id,center:{x:p.centerX,y:p.centerY}};
		p.minActRadius = globalResizeCalc(p.minActRadius) * p.unit;
		p.maxActRadius = globalResizeCalc(p.maxActRadius) * p.unit;
		p.radius = globalResizeCalc(p.radius) * p.unit;
		p.fontSize = globalResizeCalc(p.fontSize);
		createCanvas();
		updateCanvas();
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
	this.mouseEvent = function (e)
	{
		switch(e.type)
		{
			case "mousedown":
					curPoint = getPointOnCanvas(e.x,e.y,true);
					if(curPoint)
					{
						addPointerGrabbing(true);
						return true;
					}
					else
					{
						addPointerGrabbing(false);
						return false;
					}
				break;
			case "mousemove":
				if(curPoint)
				{
					curPoint.x = e.x;
					curPoint.y = e.y;
					movePoint(curPoint);
				}
				if(p.mouseEvent && curPoint)
				{
					p.mouseEvent(e,curPoint);
				}
				if(getPointOnCanvas(e.x,e.y))
				{
					$("body").addClass("commongrab");
					return true;
				}else
				{
					$("body").removeClass("commongrab");
					return false;
				}
				break;
			case "mouseup":
					$("body").removeClass("commongrab");
					addPointerGrabbing(false);
					curPoint = "";
					return false;
				break;
		}
		
		
	}
	this.updateVal = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		if(_obj.radius)
		{
			p.radius = globalResizeCalc(p.radius) * p.unit;
			_thisRef.addRefPoint(p.refPoint.id,p.refPoint.angle,p.refPoint.fillColor,p.refPoint.lineColor,p.refPoint.text);
			updateWithNewRadius()	
		}
		updateCanvas()
	}
	this.getVal = function()
	{
		return p;
	}
	
	this.getPointArray  =function()
	{
		return p.pointArr.concat(p.diameterArr).concat(p.centerAngleArr).concat(p.congruentCordArr).concat(p.congruentArcArr).concat(p.arcArr).concat(p.equiDistantCordArr).concat(p.inscribedAngleArr).concat(p.inscribedQuadrilateralArr);
	}
	
	this.addDiameter = function (id,startAngle,_fillColor,_lineColor,char1,char2)
	{
		createPoints("diameter",id,startAngle,startAngle+Math.PI,_fillColor,_lineColor,char1,char2)
	}
	this.removeDiameter = function (id)
	{
		if(p.diameterArr[id])
			p.diameterArr[id].visible = false;	
		updateCanvas()
	}
	this.addCenterAngle = function (id,startAngle,endAngle,_fillColor,_lineColor,char1,char2)
	{
		createPoints("centerAngle",id,startAngle,endAngle,_fillColor,_lineColor,char1,char2)
	}
	this.removeCenterAngle = function (id)
	{
		if(p.centerAngleArr[id])
			p.centerAngleArr[id].visible = false;
		updateCanvas()
	}
	this.addCongruentCord = function (id,startAngle,endAngle,_fillColor,_lineColor,char1,char2,char3,_fillColor1,_lineColor1)
	{
		createPoints("congruentCord",id,startAngle,endAngle,_fillColor,_lineColor,char1,char2,char3,_fillColor1,_lineColor1)
	}
	this.removeCongruentCord = function (id)
	{
		if(p.congruentCordArr[id])
			p.congruentCordArr[id].visible = false;
		updateCanvas()
	}
	this.addCongruentArc = function (id,startAngle,endAngle,_fillColor,_lineColor,char1,char2)
	{
		createPoints("congruentArc",id,startAngle,endAngle,_fillColor,_lineColor,char1,char2)
	}
	this.removeCongruentArc = function (id)
	{
		if(p.congruentArcArr[id])
			p.congruentArcArr[id].visible = false;
		updateCanvas()
	}
	this.addEquiDistantCord = function (id,angle,rad,_fillColor,_lineColor,char1,char2,char3)
	{
		createEquiDistantCord(id,angle,rad,_fillColor,_lineColor,char1,char2,char3)
	}
	this.removeEquiDistantCord = function (id)
	{
		if(p.equiDistantCordArr[id])
			p.equiDistantCordArr[id].visible = false;
		updateCanvas()
	}
	this.addInscribedAngle = function (id,startAngle,middleAngle,endAngle,_fillColor,_lineColor,char1,char2,char3)
	{
		createPointsForThree("inscribedAngle",id,startAngle,middleAngle,endAngle,_fillColor,_lineColor,char1,char2,char3)
	}
	
	this.removeInscribedAngle = function (id)
	{
		if(p.inscribedAngleArr[id])
			p.inscribedAngleArr[id].visible = false;
		updateCanvas()
	}
	
	this.addInscribedQuadrilateral = function (id,firstAngle,secondAngle,thirdAngle,fourthAngle,_fillRectColor,_fillColor,_lineColor,char1,char2,char3,char4)
	{
		createPointsForFour("inscribedQuadrilateral",id,firstAngle,secondAngle,thirdAngle,fourthAngle,_fillRectColor,_fillColor,_lineColor,char1,char2,char3,char4)
	}
	
	this.removeInscribedQuadrilateral = function (id)
	{
		if(p.inscribedQuadrilateralArr[id])
			p.inscribedQuadrilateralArr[id].visible = false;
		updateCanvas()
	}
	
	this.addRefPoint = function(id,startAngle,_fillColor,_lineColor,char)
	{
		var _point = findRefPoint(startAngle,p.radius,true);
		
		addProperties(_point,id,3,"refPoint",char,true,true,startAngle,_lineColor,_fillColor);
		
		p.refPoint = _point;	
		updateWithNewRadius()	
		updateCanvas()
	}
	
	this.getSnapShot = function ()
	{
		return {x:p.x,y:p.y,width:p.width,height:p.height}
	}
	
	this.getCongruentCordArray = function ()
	{
		return p.congruentCordArr;
	}
	
	this.getCongruentArcArray = function ()
	{
		return p.congruentArcArr;
	}
	
	this.getCongruentAngleArray = function ()
	{
		return p.congruentAngleArr;
	}
	
	this.getEquiDistantCordArray = function ()
	{
		return p.equiDistantCordArr;
	}
	
	this.getCenterAngleArray = function ()
	{
		return p.centerAngleArr;
	}
	
	this.getDiameterArray = function ()
	{
		return p.diameterArr;
	}
	
	this.getInscribedAngleArray = function ()
	{
		return p.inscribedAngleArr;
	}
	
	this.getInscirbedQuadrilateralArray = function ()
	{
		return p.inscribedQuadrilateralArr;
	}
	
	this.getEquiDistantPoints = function(angle,_rad)
	{
		var _angle = Math.acos(_rad/p.radius);
		angle = angle < 0 ? Math.PI*2 + angle : angle;
		return {"0":Maths.getPoint(p.center,(angle-_angle),p.radius),"1":Maths.getPoint(p.center,(angle+_angle),p.radius),"angleDiff":_angle}
	}
	
	function createEquiDistantCord(id,angle,rad,_fillColor,_lineColor,char1,char2,char3)
	{
		var _point = findRefPoint(angle,rad,false);
		addProperties(_point,id,0,"equiDistantCord",char1,true,true,angle,_lineColor,_fillColor);
		
		var _tempArr = _thisRef.getEquiDistantPoints(angle,rad)
		
		_point.notOnArc = true; // for acr measuring tool.
		
		var _point_1 = _tempArr[0];	 
		var _point_2 = _tempArr[1];  
		
		addProperties(_point_1,id,1,"equiDistantCord",char2,false,false,(angle-_tempArr.angleDiff),_lineColor,_fillColor)
		addProperties(_point_2,id,2,"equiDistantCord",char3,false,false,(angle+_tempArr.angleDiff),_lineColor,_fillColor)
		
		var tempArr = new Object();
		tempArr.id = id;
		tempArr.cordDist = rad;
		tempArr.visible = true;
		tempArr.lineColor = _lineColor;
		tempArr.fillColor = _fillColor;
		tempArr.array = [_point,_point_1,_point_2];
		
		p.equiDistantCordArr[id] = tempArr;
		
		updateCanvas()
	}
	
	function createPointsForFour(type,id,firstAngle,secondAngle,thirdAngle,fourthAngle,_fillRectColor,_fillColor,_lineColor,char1,char2,char3,char4)
	{
		var _point_1 = findRefPoint(firstAngle,p.radius,false);
		var _point_2 = findRefPoint(secondAngle,p.radius,false);
		var _point_3 = findRefPoint(thirdAngle,p.radius,false);
		var _point_4 = findRefPoint(fourthAngle,p.radius,false);
		
		addProperties(_point_1,id,0,type,char1,true,true,firstAngle,_lineColor,_fillColor,_fillRectColor)
		addProperties(_point_2,id,1,type,char2,true,true,secondAngle,_lineColor,_fillColor,_fillRectColor)
		addProperties(_point_3,id,2,type,char3,true,true,thirdAngle,_lineColor,_fillColor,_fillRectColor)
		addProperties(_point_4,id,3,type,char4,true,true,fourthAngle,_lineColor,_fillColor,_fillRectColor)
		
		var tempArr = new Object();
		tempArr.id = id;
		tempArr.visible = true;
		tempArr.lineColor = _lineColor;
		tempArr.fillColor = _fillColor;
		tempArr.fillRectColor = _fillRectColor;
		tempArr.array = [_point_1,_point_2,_point_3,_point_4];
		
		p.inscribedQuadrilateralArr[id] = tempArr;
		
		updateCanvas()
	}
	function addProperties(_point,_id,_pointId,_type,_text,_isDraggable,_allowAngleChange,_angle,_lineColor,_fillColor,_fillRectColor,_ref)
	{
		_point.id = _id;
		_point.parent = p.id;
		_point.pointId = _id+"~"+_pointId;
		_point.type = _type;
		_point.center = p.center;
		_point.text = _text;
		_point.angle = _angle;
		_point.isDraggable = _isDraggable;
		_point.allowAngleChange = _allowAngleChange;
		_point.lineColor = _lineColor;
		_point.fillColor = _fillColor;
		if(_fillRectColor)
			_point.fillRectColor = _fillRectColor;
		if(_ref)
			_point.ref = _ref;
	}
	function createPointsForThree(type,id,startAngle,middleAngle,endAngle,_fillColor,_lineColor,char1,char2,char3)
	{
		var _point_1 = findRefPoint(startAngle,p.radius,false);
		var _point_2 = findRefPoint(middleAngle,p.radius,false);
		var _point_3 = findRefPoint(endAngle,p.radius,false);
		
		
		addProperties(_point_1,id,0,type,char1,true,true,startAngle,_lineColor,_fillColor,false,_point_2);
		addProperties(_point_2,id,1,type,char2,true,true,middleAngle,_lineColor,_fillColor);
		addProperties(_point_3,id,2,type,char3,true,true,endAngle,_lineColor,_fillColor);
		
		var tempArr = new Object();
		tempArr.id = id;
		tempArr.visible = true;
		tempArr.lineColor = _lineColor;
		tempArr.fillColor = _fillColor;
		tempArr.array = [_point_1,_point_2,_point_3];
		
		p.inscribedAngleArr[id] = tempArr;
		
		updateCanvas()
	}
	function createPoints(type,id,startAngle,endAngle,_fillColor,_lineColor,char1,char2,char3,_fillColor1,_lineColor1)
	{
		var _point_1 = findRefPoint(startAngle,p.radius,false);
		var _point_2 = findRefPoint(endAngle,p.radius,false);
		
		
		addProperties(_point_1,id,1,type,char1,true,true,startAngle,_lineColor,_fillColor,false,_point_2);
		addProperties(_point_2,id,2,type,char2,true,true,endAngle,_lineColor,_fillColor,false,_point_1);
		
		if(type == "congruentCord")
		{
			var _point_3 = Maths.getMidPoint(_point_1,_point_2);
			_point_3.notOnArc = true; // for acr measuring tool.
			addProperties(_point_3,id,3,type,char3,false,false,"",_lineColor1,_fillColor1);
		}
		
		var tempArr = new Object();
		tempArr.id = id;
		tempArr.visible = true;
		tempArr.lineColor = _lineColor;
		tempArr.fillColor = _fillColor;
		if(type == "congruentCord")
		{
			tempArr.array = [_point_1,_point_2,_point_3];
		}
		else
		{
			tempArr.array = [_point_1,_point_2];
		}
		switch(type)
		{
			case "diameter"	:
					p.diameterArr[id] = tempArr;
				break;
			case "centerAngle"	:
					p.centerAngleArr[id] = tempArr;
				break;
			case "congruentArc"	:
					p.congruentArcArr[id] = tempArr;
				break;
			case "congruentCord"	:
					p.congruentCordArr[id] = tempArr;
				break;
		}
		updateCanvas()
	}
	
	function updateCanvas()
	{
		calculations()
		clearCanvas();
		drawCircle();
		drawPoints();
		updatePointArr();
	}
	function calculations()
	{
		var tempR = p.radius/p.unit/globalResizeCalc(1);
		p.rad = Number(tempR.toFixed(1));
		p.diameter = p.rad * 2;
		p.area = Math.pow(p.rad,2)*Math.PI;
		p.circumference = p.rad*2*Math.PI;
	}
	function checkAviability(arr,id)
	{
		for(var i in arr)
		{
			if(arr[i].id == id)
				return true;
		}
		return false;
	}
	function updateWithNewRadius()
	{
		updateWithNewRadiusEachArray(p.diameterArr);
		updateWithNewRadiusEachArray(p.centerAngleArr);
		updateWithNewRadiusEachArray(p.congruentCordArr);
		updateWithNewRadiusEachArray(p.congruentArcArr);
		updateWithNewRadiusEachArray(p.inscribedAngleArr);
		updateWithNewRadiusEachArray(p.inscribedQuadrilateralArr);
		updateWithNewRadiusEachArray(p.equiDistantCordArr,true);
		
	}
	function updateWithNewRadiusEachArray(arr,flag)
	{
		if(arr)
		{
			for(var i in arr)
			{
				if(arr[i].visible)
				{
					for(var j in arr[i]['array'])
					{
						updateWithNewRadiusEachPoint(arr[i]['array'][j]);
					}
				}
			}
		}
	}
	function updateWithNewRadiusEachPoint(point)
	{
		var tempP1 = findRefPoint(point.angle,p.radius,false);
		point.x = tempP1.x;  point.y = tempP1.y;
	}
	function createCanvas()
	{
		p.canvas = document.createElement("canvas");
		p.ctx = p.canvas.getContext("2d");
		$(p.canvas).addClass("canvas"+p.id)
		p.canvas.setAttribute("width",p.width);
		p.canvas.setAttribute("height",p.height);
		var _div = document.createElement("div");
		(p.target) ? p.target.append(_div) : $(".wrapper").append(_div);
		p.target = $(_div);
		p.target.css({"position":"absolute"});
		p.target.append(p.canvas);
		$(p.canvas).css({
						"position":"absolute",
						"left":p.x+"px",
						"top":p.y+"px",
						})
		
	}
	function clearCanvas()
	{
		p.canvas.width = p.canvas.width;
	}
	function drawCircle()
	{
		p.ctx.beginPath();
		p.ctx.arc(p.centerX,p.centerY,p.radius,0,2*Math.PI);
		p.ctx.lineWidth = p.minLineWidth;
		p.ctx.strokeStyle = p.lineColor;
		p.ctx.stroke();
		p.ctx.globalAlpha = p.globalAlpha;
		p.ctx.fillStyle = p.fillColor;
		p.ctx.fill();
		p.ctx.globalAlpha = 1;
		p.ctx.closePath();
	}
	function drawPoints()
	{
		if(p.inscribedQuadrilateralArr)
		{
			for(var i in p.inscribedQuadrilateralArr)
			{
				if(p.inscribedQuadrilateralArr[i].visible)
				{
					var _p1 = p.inscribedQuadrilateralArr[i]['array'][0];
					var _p2 = p.inscribedQuadrilateralArr[i]['array'][1];
					var _p3 = p.inscribedQuadrilateralArr[i]['array'][2];
					var _p4 = p.inscribedQuadrilateralArr[i]['array'][3];
					
					
					p.ctx.lineWidth = p.QuadrilateralLineWidth;
					p.ctx.beginPath();
					p.ctx.moveTo(_p1.x,_p1.y);
					p.ctx.lineTo(_p2.x,_p2.y);
					p.ctx.lineTo(_p3.x,_p3.y);
					p.ctx.lineTo(_p4.x,_p4.y);
					p.ctx.lineTo(_p1.x,_p1.y);
					p.ctx.strokeStyle = p.inscribedQuadrilateralArr[i].lineColor;
					p.ctx.stroke();
					p.ctx.fillStyle = p.inscribedQuadrilateralArr[i].fillRectColor;
					p.ctx.fill();
					p.ctx.closePath();
					
					/* drawTextOnPoint (_p1,_p1.text,p.ctx);
					drawTextOnPoint (_p2,_p2.text,p.ctx);
					drawTextOnPoint (_p3,_p3.text,p.ctx);
					drawTextOnPoint (_p4,_p4.text,p.ctx); */
				}
			}
			for(var i in p.inscribedQuadrilateralArr)
			{
				if(p.inscribedQuadrilateralArr[i].visible)
				{
					var _p1 = p.inscribedQuadrilateralArr[i]['array'][0];
					var _p2 = p.inscribedQuadrilateralArr[i]['array'][1];
					var _p3 = p.inscribedQuadrilateralArr[i]['array'][2];
					var _p4 = p.inscribedQuadrilateralArr[i]['array'][3];
					drawTextOnPoint (_p1,_p1.text,p.ctx);
					drawTextOnPoint (_p2,_p2.text,p.ctx);
					drawTextOnPoint (_p3,_p3.text,p.ctx);
					drawTextOnPoint (_p4,_p4.text,p.ctx);
				}
			}
		}
		
		if(p.centerAngleArr)
		{
			for(var i in p.centerAngleArr)
			{
				if(p.centerAngleArr[i].visible)
				{
					var _p1 = p.centerAngleArr[i]['array'][0];
					var _p2 = p.centerAngleArr[i]['array'][1];
					
					p.ctx.beginPath();
					p.ctx.moveTo(_p1.x,_p1.y);
					p.ctx.lineTo(p.centerX,p.centerY);
					p.ctx.lineTo(_p2.x,_p2.y);
					p.ctx.moveTo(_p1.x,_p1.y);
					p.ctx.lineWidth = p.centerAngleLineWidth;
					p.ctx.strokeStyle = p.centerAngleArr[i].lineColor;
					p.ctx.stroke();
					p.ctx.closePath();
					/* 
					drawTextOnPoint (_p1,_p1.text,p.ctx);
					drawTextOnPoint (_p2,_p2.text,p.ctx); */
					
					drawAngle(_p1,{x:p.centerX,y:p.centerY},_p2,1,true);
				}
			}
			
			for(var i in p.centerAngleArr)
			{
				if(p.centerAngleArr[i].visible)
				{
					var _p1 = p.centerAngleArr[i]['array'][0];
					var _p2 = p.centerAngleArr[i]['array'][1];
					drawTextOnPoint (_p1,_p1.text,p.ctx);
					drawTextOnPoint (_p2,_p2.text,p.ctx);
				}
			}
		}
		
		if(p.congruentCordArr)
		{
			for(var i in p.congruentCordArr)
			{
				if(p.congruentCordArr[i].visible)
				{
					var _p1 = p.congruentCordArr[i]['array'][0];
					var _p2 = p.congruentCordArr[i]['array'][1];
					var _p3 = p.congruentCordArr[i]['array'][2];
					
					p.ctx.beginPath();
					p.ctx.moveTo(_p1.x,_p1.y);
					p.ctx.lineTo(_p2.x,_p2.y);
					
					p.ctx.lineWidth = p.congruentCordLineWidth;
					p.ctx.strokeStyle = p.congruentCordArr[i].lineColor;
					p.ctx.stroke();
					p.ctx.fillStyle = p.congruentCordArr[i].fillColor;
					p.ctx.fill();
					p.ctx.closePath();
					
					/* drawTextOnPoint (_p1,_p1.text,p.ctx);
					drawTextOnPoint (_p3,_p3.text,p.ctx);
					drawTextOnPoint (_p2,_p2.text,p.ctx); */
				}
			}
			
			for(var i in p.congruentCordArr)
			{
				if(p.congruentCordArr[i].visible)
				{
					var _p1 = p.congruentCordArr[i]['array'][0];
					var _p2 = p.congruentCordArr[i]['array'][1];
					var _p3 = p.congruentCordArr[i]['array'][2];
					
					drawTextOnPoint (_p1,_p1.text,p.ctx);
					drawTextOnPoint (_p3,_p3.text,p.ctx);
					drawTextOnPoint (_p2,_p2.text,p.ctx);
				}
			}
		}
		
		if(p.congruentArcArr)
		{
			for(var i in p.congruentArcArr)
			{
				if(p.congruentArcArr[i].visible)
				{
					var _p1 = p.congruentArcArr[i]['array'][0];
					var _p2 = p.congruentArcArr[i]['array'][1];
					
					p.ctx.beginPath(); 
					p.ctx.arc(p.centerX,p.centerY,p.radius,_p1.angle,_p2.angle);
					p.ctx.lineWidth = p.congruentArcLineWidth;
					p.ctx.strokeStyle = p.congruentArcArr[i].lineColor;
					p.ctx.stroke();
					p.ctx.closePath(); 
					/* drawTextOnPoint (_p1,_p1.text,p.ctx);
					drawTextOnPoint (_p2,_p2.text,p.ctx); */
				}
			}
			for(var i in p.congruentArcArr)
			{
				if(p.congruentArcArr[i].visible)
				{
					var _p1 = p.congruentArcArr[i]['array'][0];
					var _p2 = p.congruentArcArr[i]['array'][1];
					drawTextOnPoint (_p1,_p1.text,p.ctx);
					drawTextOnPoint (_p2,_p2.text,p.ctx);
				}
			}
		}
		
		if(p.equiDistantCordArr)
		{
			for(var i in p.equiDistantCordArr)
			{
				if(p.equiDistantCordArr[i].visible)
				{
					var _p = p.equiDistantCordArr[i]['array'][0];
					var _p1 = p.equiDistantCordArr[i]['array'][1];
					var _p2 = p.equiDistantCordArr[i]['array'][2];
					
					p.ctx.beginPath(); 
					p.ctx.moveTo(_p1.x,_p1.y);
					p.ctx.lineTo(_p2.x,_p2.y);
					p.ctx.moveTo(p.centerX,p.centerY);
					p.ctx.lineTo(_p.x,_p.y);
					p.ctx.lineWidth = p.equiDistantCordLineWidth;
					p.ctx.strokeStyle = p.equiDistantCordArr[i].lineColor;
					p.ctx.fillStyle = p.equiDistantCordArr[i].fillColor;
					p.ctx.stroke();
					p.ctx.closePath(); 
					
					/* drawTextOnPoint (_p,_p.text,p.ctx);
					drawTextOnPoint (_p1,_p1.text,p.ctx);
					drawTextOnPoint (_p2,_p2.text,p.ctx); */
					
					var _tempD = Maths.getDistance(_p,{x:p.centerX,y:p.centerY});
					if(_tempD >= (p.pointRadius*4)+globalResizeCalc(5))
						drawAngle(_p1,_p,{x:p.centerX,y:p.centerY},1,true);
					setTicks(_p,{x:p.centerX,y:p.centerY},1,p.equiDistantCordArr[i].lineColor)
				}
			}
			for(var i in p.equiDistantCordArr)
			{
				if(p.equiDistantCordArr[i].visible)
				{
					var _p = p.equiDistantCordArr[i]['array'][0];
					var _p1 = p.equiDistantCordArr[i]['array'][1];
					var _p2 = p.equiDistantCordArr[i]['array'][2];
					drawTextOnPoint (_p,_p.text,p.ctx);
					drawTextOnPoint (_p1,_p1.text,p.ctx);
					drawTextOnPoint (_p2,_p2.text,p.ctx);
				}
			}
		}
		
		if(p.inscribedAngleArr)
		{
			for(var i in p.inscribedAngleArr)
			{
				if(p.inscribedAngleArr[i].visible)
				{
					var _p1 = p.inscribedAngleArr[i]['array'][0];
					var _p2 = p.inscribedAngleArr[i]['array'][1];
					var _p3 = p.inscribedAngleArr[i]['array'][2];
					
					p.ctx.beginPath();
					p.ctx.moveTo(_p2.x,_p2.y);
					p.ctx.lineTo(_p1.x,_p1.y);
					p.ctx.lineTo(_p3.x,_p3.y);
					
					p.ctx.fillStyle = p.inscribedAngleArr[i].fillColor;
					p.ctx.strokeStyle = p.inscribedAngleArr[i].lineColor;
					p.ctx.lineWidth = p.inscribedAngleLineWidth;
					
					p.ctx.stroke();
					p.ctx.closePath();
					
					/* drawTextOnPoint (_p1,_p1.text,p.ctx);
					drawTextOnPoint (_p2,_p2.text,p.ctx);
					drawTextOnPoint (_p3,_p3.text,p.ctx); */
				}
			}
			for(var i in p.inscribedAngleArr)
			{
				if(p.inscribedAngleArr[i].visible)
				{
					var _p1 = p.inscribedAngleArr[i]['array'][0];
					var _p2 = p.inscribedAngleArr[i]['array'][1];
					var _p3 = p.inscribedAngleArr[i]['array'][2];
					
					drawTextOnPoint (_p1,_p1.text,p.ctx);
					drawTextOnPoint (_p2,_p2.text,p.ctx);
					drawTextOnPoint (_p3,_p3.text,p.ctx);
				}
			}
		}
		
		if(p.diameterArr)
		{
			for(var i in p.diameterArr)
			{
				if(p.diameterArr[i].visible)
				{
					var _p1 = p.diameterArr[i]['array'][0];
					var _p2 = p.diameterArr[i]['array'][1];
					
					p.ctx.beginPath();
					p.ctx.moveTo(_p1.x,_p1.y);
					p.ctx.lineTo(_p2.x,_p2.y);
					p.ctx.lineWidth = p.diameterLineWidth;
					p.ctx.strokeStyle = p.diameterArr[i].lineColor;
					p.ctx.stroke();
					p.ctx.closePath();
					
					/* drawTextOnPoint (_p1,_p1.text,p.ctx);
					drawTextOnPoint (_p2,_p2.text,p.ctx); */
				}
			}
			for(var i in p.diameterArr)
			{
				if(p.diameterArr[i].visible)
				{
					var _p1 = p.diameterArr[i]['array'][0];
					var _p2 = p.diameterArr[i]['array'][1];
					drawTextOnPoint (_p1,_p1.text,p.ctx);
					drawTextOnPoint (_p2,_p2.text,p.ctx);
				}
			}
					
		}	
		
		if(p.showCenterPoint)
		{
			drawPointCircle(p.center,p.centerFillColor,p.centerLineColor,p.ctx)
			drawTextOnPoint (p.center,p.centerPoint,p.ctx);
		}
		
		if(p.refPoint)
		{
			drawTextOnPoint (p.refPoint,p.refPoint.text,p.ctx);
		}
		
		
	}
	
	function drawAngle(prevPoint,curPoint,nextPoint,tickNum,isCenter)
	{
		var startAngle = Math.PI + Maths.getAngle(curPoint,nextPoint,true);
		var endAngle = Math.PI + Maths.getAngle(curPoint,prevPoint,true);
		
		var sideLen1 = Maths.getDistance(curPoint,nextPoint);
		var sideLen2 = Maths.getDistance(curPoint,nextPoint);
		
		var arcRadius = (sideLen1 < sideLen2)?sideLen1 : sideLen2;
		arcRadius = arcRadius/10;
		if(arcRadius > 15)
			arcRadius = 15;
		var _CONST = 1.414;
		
		var _center = ((endAngle + startAngle)/2);
		
		if(startAngle > endAngle)
		{
			_center = _center+ Math.PI;
		}
		else
		{
			_center = _center ;
		}
		var angle = Number((Maths.getAngleBtn3(nextPoint,prevPoint,curPoint)).toFixed(2));
		
		var allowToDraw = false;
		
		p.ctx.beginPath();
		if(!(89.9 <= angle && angle <= 90.1))
		{
			//if(!(angle <= 178 && angle >= 182))
			{
				var min = startAngle < endAngle ? startAngle : endAngle;
				var max = startAngle >= endAngle ?startAngle : endAngle;
				if(min + Math.PI >max)
				{
					var tempA = min;
					_center = Math.PI - _center;
					min = max;
					max = tempA;
				}
				startAngle = min;
				endAngle = max;
				
				if(endAngle <startAngle)
				{
					_center = ((endAngle + startAngle)/2);
				}
				else
				{
					_center = ((endAngle + startAngle)/2) + Math.PI;
				}
				p.ctx.arc(curPoint.x,curPoint.y,arcRadius*3,startAngle,endAngle,true);
				p.ctx.strokeStyle = p.anglelineColor;
				p.ctx.lineWidth = p.angleLineWidth;
				p.ctx.stroke();
				p.ctx.closePath();
				
				if(typeof(tickNum) != "undefined" && tickNum !=0)
				{
					var factor = tickNum >1 ? 0.1 :0;
					var _center1 = _center - (tickNum/2)*factor;
					for(var k = 0;k< tickNum;k++ )
					{
						var temp = Maths.getPoint(curPoint,_center1,arcRadius*3 + globalResizeCalc(8));
						p.ctx.beginPath();
						p.ctx.moveTo(temp.x,temp.y);
						temp = Maths.getPoint(curPoint,_center1,arcRadius*3 - globalResizeCalc(8));
						p.ctx.lineTo(temp.x,temp.y);
						p.ctx.stroke();
						p.ctx.closePath();
						_center1 = _center1 + (tickNum/2)*factor;
						
					}
				}
			}
		}
		else
		{
			var tempRadius = globalResizeCalc(20);
			
			var p1 = new Object();
			var p2 = new Object();
			var p3 = new Object();
			
			if(!isCenter)
			{
				if(p.pointArr[0].x < p.pointArr[2].y)
				{
					_center = _center + Maths.PI;
				}
				if(p.pointArr[0].y < p.pointArr[1].y)
				{
					_center = _center + Math.PI;
				}
			}
			p1.x = curPoint.x + ((tempRadius)*Math.cos(startAngle));
			p1.y = curPoint.y + ((tempRadius)*Math.sin(startAngle));
			
			p2.x = curPoint.x + ((tempRadius*_CONST) * Math.cos(_center));
			p2.y = curPoint.y + ((tempRadius*_CONST) * Math.sin(_center));
			
			p3.x = curPoint.x + ((tempRadius)*Math.cos(endAngle));
			p3.y = curPoint.y + ((tempRadius)*Math.sin(endAngle));
			
			p.ctx.moveTo(p1.x,p1.y);
			p.ctx.lineTo(p2.x,p2.y);
			p.ctx.lineTo(p3.x,p3.y);
			
			p.ctx.strokeStyle = p.anglelineColor;
			p.ctx.lineWidth = p.angleLineWidth;
			p.ctx.stroke();
			p.ctx.closePath();
		}
		
	}
	
	function setTicks(_p1,_p2,_n,_tickColor)
	{
		var centerpoint = Maths.getMidPoint(_p1,_p2)
		var a = Maths.getAngle(_p2,_p1,true);
		
		var _tp1 = Maths.getPoint(centerpoint,(a+Math.PI/2),globalResizeCalc(8));
		var _tp2 = Maths.getPoint(centerpoint,(a-Math.PI/2),globalResizeCalc(8));
		p.ctx.beginPath()
		p.ctx.lineWidth = p.angleLineWidth
		p.ctx.moveTo(_tp1.x,_tp1.y)
		p.ctx.lineTo(_tp2.x,_tp2.y)
		p.ctx.strokeStyle = _tickColor
		p.ctx.stroke()
		p.ctx.closePath()
	}
	
	function drawPointCircle(_p,_fillColor,_lineColor,ctx)
	{
		ctx.beginPath();
		ctx.arc(_p.x,_p.y,p.pointRadius,0,2*Math.PI);
		if(_p.isDraggable)
			ctx.lineWidth = p.pointLineWidth;
		else
			ctx.lineWidth = p.nonDragPointLineWidth;	
		ctx.strokeStyle = _lineColor;
		ctx.stroke();
		ctx.fillStyle = _fillColor;
		ctx.fill();
		ctx.closePath();
	}
	function drawTextOnPoint(_p,txt,ctx)
	{
		ctx.beginPath();
		drawPointCircle(_p,_p.fillColor,_p.lineColor,ctx)
		ctx.font = "italic bold "+p.fontSize+"px Arial"
		ctx.fillStyle = p.fontColor;
		var width = ctx.measureText(txt).width/2;
		var height = p.fontSize/3;
		ctx.moveTo(_p.x - width, _p.y + height);
		ctx.fillText(txt, _p.x - width, _p.y + height);
		ctx.closePath();
	}
	function setSnap(xVal,yVal,text,type)
	{
		var a = Maths.getAngle(p.center,{x:xVal,y:yVal},true);
		a = (a < 0) ?  Math.PI*2 + a : a;
		
		
		var _counter = 0;
		do
		{
			var pt = Maths.getPoint(p.center,a+Math.PI,p.radius)
			xVal = pt.x
			yVal = pt.y
		
			var tempArr = p.pointArr.concat(p.diameterArr).concat(p.centerAngleArr).concat(p.congruentCordArr).concat(p.arcArr).concat(p.inscribedAngleArr).concat(p.inscribedQuadrilateralArr);
			var hitRadius = 10
			for(var i in tempArr)
			{
				if(text != tempArr[i].text)
				{
					if((tempArr[i].x-hitRadius <= xVal && tempArr[i].x+hitRadius >= xVal) && (tempArr[i].y-hitRadius <= yVal && tempArr[i].y+hitRadius >= yVal))
					{
						return tempArr[i];
					}	
				}
			}
			if(type == "diameter")
			{
				a -= Math.PI;
				_counter++;
			}
			else
				_counter = 2;
		}while(_counter <= 1)
		return {x:xVal,y:yVal}
	}
	function movePoint(_point)
	{
		if(p.enableSanpping)
		{
			var t = setSnap(_point.x,_point.y,_point.text,_point.type)
			_point.x = t.x
			_point.y = t.y
		}
		var prevAngle = _point.angle;
		var angle = Maths.getAngle(_point,{x:p.centerX,y:p.centerY},true);
		angle = (angle < 0) ?  Math.PI*2 + angle : angle;
		switch(_point.type)
		{
			case "refPoint":
					var newRadius = Maths.getDistance(_point,p.center);
					newRadius = (newRadius < p.maxActRadius) ? newRadius : p.maxActRadius;
					p.radius = (p.minActRadius < newRadius) ? newRadius : p.minActRadius;
					var temp = Number((p.radius/p.unit/globalResizeCalc(1)).toFixed(1));
					p.radius = temp*p.unit*globalResizeCalc(1);
					_thisRef.addRefPoint(_point.id,angle,_point.fillColor,_point.lineColor,_point.text);
					(p.onRadiusChange)? p.onRadiusChange({value:(p.radius/p.unit/globalResizeCalc(1))}) : null;
				break;
			case "diameter":
					if(_point.allowAngleChange)
					{
						_thisRef.addDiameter(_point.id,angle,_point.fillColor,_point.lineColor,_point.text,_point.ref.text);
					}
					else
					{
						_thisRef.addDiameter(_point.id,angle+Math.PI,_point.fillColor,_point.lineColor,_point.ref.text,_point.text);
					}
					
				break;
			case "equiDistantCord":
					var pointSetArr = p.equiDistantCordArr[_point.id];
					var _newRad = Maths.getDistance(_point,{x:p.centerX,y:p.centerY});
					_newRad = _newRad >= p.radius-globalResizeCalc(20) ? p.radius-globalResizeCalc(20) : _newRad;
					_thisRef.addEquiDistantCord(_point.id,angle,_newRad,pointSetArr.fillColor,pointSetArr.lineColor,pointSetArr.array[0].text,pointSetArr.array[1].text,pointSetArr.array[2].text);
				break;
			case "centerAngle":
					var pointSetArr = p.centerAngleArr[_point.id];
					switch(_point.pointId.split("~")[1]*1)
					{
						case 1:
								var _newAngle = angle + _angleDiff;
								_thisRef.addCenterAngle(_point.id,angle,_newAngle,_point.fillColor,_point.lineColor,pointSetArr.array[0].text,pointSetArr.array[1].text);
							break;
						case 2:
								_thisRef.addCenterAngle(_point.id,pointSetArr.array[0].angle,angle,_point.fillColor,_point.lineColor,pointSetArr.array[0].text,pointSetArr.array[1].text);
							break;
					}
				break;
			case "congruentCord":
					var pointSetArr = p.congruentCordArr[_point.id];
					switch(_point.pointId.split("~")[1]*1)
					{
						case 1:
								var _newAngle = angle + _angleDiff;
								_thisRef.addCongruentCord(_point.id,angle,_newAngle,_point.fillColor,_point.lineColor,pointSetArr.array[0].text,pointSetArr.array[1].text,pointSetArr.array[2].text,pointSetArr.array[2].fillColor,pointSetArr.array[2].lineColor);
							break;
						case 2:
								_thisRef.addCongruentCord(_point.id,pointSetArr.array[0].angle,angle,_point.fillColor,_point.lineColor,pointSetArr.array[0].text,pointSetArr.array[1].text,pointSetArr.array[2].text,pointSetArr.array[2].fillColor,pointSetArr.array[2].lineColor);
							break;
					}
				break;
			case "congruentArc":
					var pointSetArr = p.congruentArcArr[_point.id];
					switch(_point.pointId.split("~")[1]*1)
					{
						case 1:
								var _newAngle = angle + _angleDiff;
								_thisRef.addCongruentArc(_point.id,angle,_newAngle,_point.fillColor,_point.lineColor,pointSetArr.array[0].text,pointSetArr.array[1].text);
							break;
						case 2:
								_thisRef.addCongruentArc(_point.id,pointSetArr.array[0].angle,angle,_point.fillColor,_point.lineColor,pointSetArr.array[0].text,pointSetArr.array[1].text);
							break;
					}
				break;
			case "inscribedAngle":
					var pointSetArr = p.inscribedAngleArr[_point.id];
					switch(_point.pointId.split("~")[1]*1)
					{
						case 0:
								_thisRef.addInscribedAngle(_point.id,angle,pointSetArr.array[1].angle,pointSetArr.array[2].angle,_point.fillColor,_point.lineColor,pointSetArr.array[0].text,pointSetArr.array[1].text,pointSetArr.array[2].text);
							break;
						case 1:
								_thisRef.addInscribedAngle(_point.id,pointSetArr.array[0].angle,angle,pointSetArr.array[2].angle,_point.fillColor,_point.lineColor,pointSetArr.array[0].text,pointSetArr.array[1].text,pointSetArr.array[2].text);
							break;
						case 2:
								_thisRef.addInscribedAngle(_point.id,pointSetArr.array[0].angle,pointSetArr.array[1].angle,angle,_point.fillColor,_point.lineColor,pointSetArr.array[0].text,pointSetArr.array[1].text,pointSetArr.array[2].text);
							break;
					}
				break;
			case "inscribedQuadrilateral":
					var pointSetArr = p.inscribedQuadrilateralArr[_point.id];
					switch(_point.pointId.split("~")[1]*1)
					{
						case 0:
								_thisRef.addInscribedQuadrilateral(_point.id,angle,pointSetArr.array[1].angle,pointSetArr.array[2].angle,pointSetArr.array[3].angle,_point.fillRectColor,_point.fillColor,_point.lineColor,pointSetArr.array[0].text,pointSetArr.array[1].text,pointSetArr.array[2].text,pointSetArr.array[3].text);
							break;
						case 1:
								_thisRef.addInscribedQuadrilateral(_point.id,pointSetArr.array[0].angle,angle,pointSetArr.array[2].angle,pointSetArr.array[3].angle,_point.fillRectColor,_point.fillColor,_point.lineColor,pointSetArr.array[0].text,pointSetArr.array[1].text,pointSetArr.array[2].text,pointSetArr.array[3].text);
							break;
						case 2:
								_thisRef.addInscribedQuadrilateral(_point.id,pointSetArr.array[0].angle,pointSetArr.array[1].angle,angle,pointSetArr.array[3].angle,_point.fillRectColor,_point.fillColor,_point.lineColor,pointSetArr.array[0].text,pointSetArr.array[1].text,pointSetArr.array[2].text,pointSetArr.array[3].text);
							break;
						case 3:
								_thisRef.addInscribedQuadrilateral(_point.id,pointSetArr.array[0].angle,pointSetArr.array[1].angle,pointSetArr.array[2].angle,angle,_point.fillRectColor,_point.fillColor,_point.lineColor,pointSetArr.array[0].text,pointSetArr.array[1].text,pointSetArr.array[2].text,pointSetArr.array[3].text);
							break;
					}
				break;
		}
	}	
	function findRefPoint(angle,rad,flag)
	{
		if(rad > p.maxActRadius*p.unit) 
			rad = p.maxActRadius*p.unit;
		
		if(flag)
		{
			p.radius = rad;
		}
		else	
			flag = false;
		var tempPoint = Maths.getPoint(p.center,angle,rad);// p.centerX + p.radius * Math.cos(angle);
		
		tempPoint.isAllow = flag;
		
		return tempPoint;
	}
	function getPointOnCanvas(xVal,yVal,flag)
	{
		
		if(p.refPoint)
		{
			var curPoint = checkPointHit(xVal,yVal,p.refPoint);
			if(curPoint)
					return curPoint;
			
		}
		
		for(var i in p.diameterArr)
		{
			if(p.diameterArr[i].visible)
			{
				var _p1 = p.diameterArr[i]['array'][0];
				var _p2 = p.diameterArr[i]['array'][1];
				
				var curPoint = checkPointHit(xVal,yVal,_p2) ? _p2 : checkPointHit(xVal,yVal,_p1) 
				if(curPoint)
					return curPoint;
				
			}
		}
		
		
		for(var i in p.inscribedAngleArr)
		{
			if(p.inscribedAngleArr[i].visible)
			{
				var _p1 = p.inscribedAngleArr[i]['array'][0];
				var _p2 = p.inscribedAngleArr[i]['array'][1];
				var _p3 = p.inscribedAngleArr[i]['array'][2];
				
				var curPoint = checkPointHit(xVal,yVal,_p3) ? _p3 : checkPointHit(xVal,yVal,_p2) ? _p2 : checkPointHit(xVal,yVal,_p1);
				if(curPoint)
					return curPoint;
			}
		}
		
		for(var i in p.congruentCordArr)
		{
			if(p.congruentCordArr[i].visible)
			{
				var _p1 = p.congruentCordArr[i]['array'][0];
				var _p2 = p.congruentCordArr[i]['array'][1];
				
				if(flag)	
					findAngleDiff(_p1,_p2)
				
				var curPoint = checkPointHit(xVal,yVal,_p2) ? _p2 : checkPointHit(xVal,yVal,_p1);
				if(curPoint)
					return curPoint;
			}
		}
		
		for(var i in p.congruentArcArr)
		{
			if(p.congruentArcArr[i].visible)
			{
				var _p1 = p.congruentArcArr[i]['array'][0];
				var _p2 = p.congruentArcArr[i]['array'][1];
				
				if(flag)	
					findAngleDiff(_p1,_p2)
				
				var curPoint = checkPointHit(xVal,yVal,_p2) ? _p2 : checkPointHit(xVal,yVal,_p1);
				if(curPoint)
					return curPoint;
			}
		}
		
		for(var i in p.equiDistantCordArr)
		{
			if(p.equiDistantCordArr[i].visible)
			{
				var _p = p.equiDistantCordArr[i]['array'][0];
				
				var curPoint = checkPointHit(xVal,yVal,_p);
				if(curPoint)
					return curPoint;
			}
		}
		
		for(var i in p.centerAngleArr)
		{
			if(p.centerAngleArr[i].visible)
			{
				var _p1 = p.centerAngleArr[i]['array'][0];
				var _p2 = p.centerAngleArr[i]['array'][1];
				
				if(flag)	
					findAngleDiff(_p1,_p2)
				
				var curPoint = checkPointHit(xVal,yVal,_p2) ? _p2 : checkPointHit(xVal,yVal,_p1);
				if(curPoint)
					return curPoint;
				
			}
		}
		for(var i in p.inscribedQuadrilateralArr)
		{
			if(p.inscribedQuadrilateralArr[i].visible)
			{
				var _p1 = p.inscribedQuadrilateralArr[i]['array'][0];
				var _p2 = p.inscribedQuadrilateralArr[i]['array'][1];
				var _p3 = p.inscribedQuadrilateralArr[i]['array'][2];
				var _p4 = p.inscribedQuadrilateralArr[i]['array'][3];
				
				var curPoint = checkPointHit(xVal,yVal,_p4) ? _p4 : checkPointHit(xVal,yVal,_p3) ? _p3 : checkPointHit(xVal,yVal,_p2) ? _p2 : checkPointHit(xVal,yVal,_p1);
				if(curPoint)
					return curPoint;
			}
		}
	}
	function findAngleDiff(_p1,_p2)
	{
		var _angleIn360 = Maths.getAngleBtn3(_p1,_p2,{x:p.centerX,y:p.centerY},true)*Maths.TO_RADIANS;
		var _sign = _angleIn360 >= Math.PI ? -1 : 1;
		_angleDiff = _sign * Maths.getAngleBtn3(_p1,_p2,{x:p.centerX,y:p.centerY})*Maths.TO_RADIANS; 
	}
	function checkPointHit(xVal,yVal,point)
	{
		if(globalResizeCalc(15) >= Maths.getDistance(point,{x:xVal,y:yVal}) )
		{
			return point;
		}
		return false;
	}
	function updatePointArr()
	{
		p.pointArr = [];
		for(var i in p.diameterArr)
		{
			if(p.diameterArr[i].visible)
			{
				p.pointArr.push(p.diameterArr[i]['array'][0]);
				p.pointArr.push(p.diameterArr[i]['array'][1]);
			}
		}
		for(var i in p.centerAngleArr)
		{
			if(p.centerAngleArr[i].visible)
			{
				p.pointArr.push(p.centerAngleArr[i]['array'][0]);
				p.pointArr.push(p.centerAngleArr[i]['array'][1]);
			}
		}
		for(var i in p.congruentCordArr)
		{
			if(p.congruentCordArr[i].visible)
			{
				p.pointArr.push(p.congruentCordArr[i]['array'][0]);
				p.pointArr.push(p.congruentCordArr[i]['array'][1]);
				p.pointArr.push(p.congruentCordArr[i]['array'][2]);
			}
		}
		for(var i in p.congruentArcArr)
		{
			if(p.congruentArcArr[i].visible)
			{
				p.pointArr.push(p.congruentArcArr[i]['array'][0]);
				p.pointArr.push(p.congruentArcArr[i]['array'][1]);
			}
		}
		for(var i in p.equiDistantCordArr)
		{
			if(p.equiDistantCordArr[i].visible)
			{
				p.pointArr.push(p.equiDistantCordArr[i]['array'][0]);
				p.pointArr.push(p.equiDistantCordArr[i]['array'][1]);
				p.pointArr.push(p.equiDistantCordArr[i]['array'][2]);
			}
		}
		for(var i in p.inscribedAngleArr)
		{
			if(p.inscribedAngleArr[i].visible)
			{
				p.pointArr.push(p.inscribedAngleArr[i]['array'][0]);
				p.pointArr.push(p.inscribedAngleArr[i]['array'][1]);
				p.pointArr.push(p.inscribedAngleArr[i]['array'][2]);
			}
		}
		for(var i in p.inscribedQuadrilateralArr)
		{
			if(p.inscribedQuadrilateralArr[i].visible)
			{
				p.pointArr.push(p.inscribedQuadrilateralArr[i]['array'][0]);
				p.pointArr.push(p.inscribedQuadrilateralArr[i]['array'][1]);
				p.pointArr.push(p.inscribedQuadrilateralArr[i]['array'][2]);
				p.pointArr.push(p.inscribedQuadrilateralArr[i]['array'][3]);
			}
		}
		if(p.refPoint)
		{
			p.pointArr.push(p.refPoint);
		}
		if(p.showCenterPoint)
		{
			p.pointArr.push(p.center);
		}
		(p.onUpdate) ? p.onUpdate({array : p.pointArr}) : null;
	}
}