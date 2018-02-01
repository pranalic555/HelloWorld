var Quadrilateral = function()
{
	// Default starts ...
	var p = 
	{
		//target:"",
		id:"quadrilateral",
		x:0,
		y:0,
		width:0,
		height:0,
		centerX:300,
		centerY:300,
		radius:8,
		boundaryMaxRadius:200,
		boundaryMinRadius:25,
		pointLineWidth:4,
		pointLineColor:'#3B42BC',
		pointFillColor:'#D2D4FA',
		NonDragpointFillColor:":'#D2D4FA",
		lineColor:'rgba(61, 48, 254, 1)',
		fillColor:'#AFB4FE',
		lineWidth:1,
		
		textColor:"#000000",
		
		numOfSides:4,
		sideLength:100,
		arrowSLen:15,
		arrowAngle:35,
		rectPadding:5,
		rectFont:12,
		lableRadius:85,
		lableRadiusInt:75,
		anglelineColor:'#3B42BC',
		angleLabelColor:"#000",
		angleLabelLineColor:'#3B42BC',
		angleLabelBg:'#ccc',
		padding_H:50,
		padding_V:50,
		isEnforceConvexity:true,
		globalAlpha:0.5,
		startCharCode:65,
		initialAngle:0,
		angle:[],
		side:[],
		Unit:25,
		maxHeight : 0,
		maxBase: 0,
		showSides:false,
		showAngle:false,
		showAngleLabel:false,
		angleLineWidth:2,
		colorType:1,//1-blue,2-green,0-pink
		tickWidth : 1,
		gridCenter:{},
		gridLineColor:"#FFFFFF",
		gridColorMinor:"#FFFFFF",
		gridLineWidth:1,
		gridLineWidthMinor:1,
		
		border:"none",
		gridColor:"#FBF3FF",
		bgColor:"transparent",
		
		shape:"quadrilateral",
		
		visible:true,
		
		angle1:100,//area of parallelogram
		
		tickLength:10,
		tickColor:"#3B42BC",
		showTicks:false,
		
		Max:200,
		Min:40,
		
		diagonalAngleBisector:0,
		diagonal1:false,
		diagonal2:false,
		centerPoint:false,
		congruentDiagonals:false,
		oneRightAngle:false,
		diagonalsPerp:false,
		shiftCenterX : 0,
		shiftCenterY : 0,
	}
	// Default ends ...
	var _thisObj = this;
	
	var canvas, context;
	var canvasLabel, contextLabel;
	var canvasAngle, contextAngle;
	var canvasGrid, contextGrid;
	
	var OldTouches = new Object()
	
	var curSelectedPoint;
	
	var curPointObj;
	var prevPointObj,point;
	
	var vectorClass;
	
	var pointArr //= [{x:,y:,id:}];
	var extndLineArr;
	var dataArr;
	var sendArr;
	
	var curRadius;
	
	var restricted = false;
	var pBlock = false;
	
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function(_obj)
	{
		dataArr = new Array();
		
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		p.x = globalResizeCalc(p.x);
		p.y = globalResizeCalc(p.y);
		p.width = globalResizeCalc(p.width);
		p.height = globalResizeCalc(p.height);
		p.centerX = p.width/2;
		p.centerY = p.height/2;
		p.shiftCenterY = globalResizeCalc(p.shiftCenterY)
		p.shiftCenterX = globalResizeCalc(p.shiftCenterX)
		if(p.shiftCenterX)
		{
			p.centerX += p.shiftCenterX
		}
		if(p.shiftCenterY)
		{
			p.centerY += p.shiftCenterY
		}
		
		p.radius = globalResizeCalc(p.radius);
		p.fontSize = globalResizeCalc(p.fontSize);
		
		p.arcWidth = globalResizeCalc(p.arcWidth);
		p.lineWidth = globalResizeCalc(p.lineWidth);
		p.angleLineWidth = globalResizeCalc(p.angleLineWidth);
		
		p.rectPadding = globalResizeCalc(p.rectPadding);
		p.rectFont = globalResizeCalc(p.rectFont);
		
		p.tickLength = globalResizeCalc(p.tickLength);
		p.tickWidth = globalResizeCalc(p.tickWidth);
		
		p.lableRadius = globalResizeCalc(p.lableRadius);
		p.lableRadiusInt = globalResizeCalc(p.lableRadiusInt);
		p.sideLength = globalResizeCalc(p.sideLength);
		
		p.padding_H = globalResizeCalc(p.padding_H);
		p.padding_V = globalResizeCalc(p.padding_V);
		p.boundaryMaxRadius = globalResizeCalc(p.boundaryMaxRadius);
		p.boundaryMinRadius = globalResizeCalc(p.boundaryMinRadius);
		
		p.side1 = globalResizeCalc(p.side1);
		p.base = globalResizeCalc(p.base);
		
		p.Unit = globalResizeCalc(p.Unit);
		
		p.Max = globalResizeCalc(p.Max);
		p.Min = globalResizeCalc(p.Min);
		
		p.angle2 = 180 - p.angle1;
		//----------------
		canvas = document.createElement("canvas");
		context = canvas.getContext("2d");
		
		//----------------
		canvasAngle = document.createElement("canvas");
		contextAngle = canvasAngle.getContext("2d");
		//----------------
		canvasLabel = document.createElement("canvas");
		contextLabel = canvasLabel.getContext("2d");
		//----------------
		canvasGrid = document.createElement("canvas");
		contextGrid= canvasGrid.getContext("2d");
		//----------------
		
		//---------------------------------
		createBaseCanvas();
		initializeArray();
		_thisObj.changeColor(p.colorType);
		_thisObj.changeShape(p.shape);
	}
	//================================================================================
	this.show = function()
	{
		p.target.show()
	}
	//================================================================================
	this.hide = function()
	{
		p.target.hide()
	}
	//================================================================================
	this.getSnapShot = function()
	{
		return {x:p.x,y:p.y,width:p.width,height:p.height}
	}
	//================================================================================
	this.showGrid = function(bool)
	{
		if(bool)
		{
			$(canvasGrid).show()
			p.gridCenter.x = pointArr[3].x
			p.gridCenter.y = pointArr[3].y
			drawGrid()
		}
		else $(canvasGrid).hide()
	}

	this.alignGrid = function()
	{
		p.gridCenter.x = pointArr[3].x
		p.gridCenter.y = pointArr[3].y
		drawGrid()
	}
	//================================================================================
	this.setQuadSides = function(_height,_base)
	{
		s = Math.sqrt((_height * _height) + (_base * _base))/2//_height/Math.sqrt(2)
		p.side[1] = p.side[3] = p.side[0] = p.side[2] = s * p.Unit

		p.angle[1] = p.angle[3] = Math.asin(_height / (Math.sqrt((_height * _height) + (_base * _base)))) * Maths.TO_DEGREES
		p.angle[0] = p.angle[2] = (Math.PI * Maths.TO_DEGREES)/2 - p.angle[1]
		
		createQuadrilateral()
	}
	//================================================================================
	this.getQuadData = function()
	{
		// _height = 2 * p.side[1] * Math.sin(p.angle[1] * Maths.TO_RADIANS) / p.Unit//p.side[1] * Math.sqrt(2) / p.Unit
		// _base = 2 * p.side[1] * Math.cos(p.angle[1] * Maths.TO_RADIANS) / p.Unit//p.side[0] * Math.sqrt(2) / p.Unit
		
		_height = Number((Maths.getDistance(pointArr[3],pointArr[2])/p.Unit).toFixed(1))
		_base = Number((Maths.getDistance(pointArr[3],pointArr[0])/p.Unit).toFixed(1))
		_area = parseFloat((_base * _height).toFixed(2))
		_perimeter = parseFloat((2 * _base + 2 * _height).toFixed(2))
		
		return {base:_base,height:_height,area:_area,perimeter:_perimeter}
	}
	//================================================================================
	this.changeColor = function(_arg)
	{
		p.colorType = _arg
		switch (_arg)
		{
			case 1:
				//blue
				p.pointLineColor = '#3B42BC'
				p.pointFillColor = '#D2D4FA'
				p.NonDragpointFillColor = '#D2D4FA'

				p.lineColor = 'rgba(61, 48, 254, 1)'
				p.fillColor = '#7D8AFD'
				break;
			case 0:
				//pink
				p.pointLineColor = '#954ABA'
				p.pointFillColor = '#e4cbf1'
				p.NonDragpointFillColor = '#c791e2'

				p.lineColor = '#954ABA'
				p.fillColor = '#e0a3ff'
				break;
			case 2:
				//green
				p.pointLineColor = '#45AF9C'
				p.pointFillColor = '#C2ECE3'
				p.NonDragpointFillColor = '#76cfb0'

				p.lineColor = '#45AF9C'
				p.fillColor = '#9BE0D3'
				break;
		}
		drawOnCanvas()
	}
	//================================================================================
	this.getValue = function()
	{
		return {base:Base,height:Height,area:Area}
	}
	//================================================================================
	this.clearData = function ()
	{
		dataArr = [];
	}
	//================================================================================
	this.addEventListener = function(_evt, _fun)
	{
		p[_evt] = _fun;
	}
	//================================================================================
	this.showTriangle = function(arg)
	{
		p.isTriangleShow = arg;
		drawOnCanvas();
	}
	//================================================================================
	this.update = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		
		if(_obj.shape != "undefined")
			_thisObj.changeShape(_obj.shape)
		drawOnCanvas()
	}
	//================================================================================
	this.showAngle = function(arg)
	{
		p.showAngle = arg;
		// exteriorAngles();
		drawOnCanvas();
	}
	//================================================================================
	this.showTicks = function(arg)
	{
		p.showTicks = arg
		drawOnCanvas()
	}
	//================================================================================
	this.setAngleView = function(arg)
	{
		p.isInterior = arg;
		exteriorAngles();
		drawOnCanvas();
	}
	//================================================================================
	this.makeRegularPolygon = function(arg)
	{
		p.isRegular = arg;
		
		createPoints(p.numOfSides,p.sideLength,p.initialAngle);
		exteriorAngles();
		drawOnCanvas();
	}
	//================================================================================
	this.getPointArray = function ()
	{
		return pointArr;
	}
	//================================================================================
	this.showBaseHeight = function(bool)
	{
		p.showBase = bool
		p.showHeight = bool
		drawOnCanvas()

		//return {base:base,height:height}
	}
	//================================================================================
	this.changeShape = function(_type)
	{	
		p.shape = _type
		p.side = []
		p.angle = []
		switch (_type)
		{
			case "Quadrilateral":
				for(var i = 0; i < 4;i++)
				{
					p.side[i] = getRandomNum(i+p.sideLength/2,p.sideLength);
					p.angle[i] = getRandomNum(90,120)
				}createQuadrilateral()
				break;
			case "Parallelogram":
				createRegularParallelogram()
				break;
			case "Rhombus":
				createRhombus()
				break;
			case "Rectangle":
				// p.angle[1] = p.angle[3] = getRandomNum(0,80)
				// p.angle[0] = p.angle[2] = 90 - p.angle[1]
				// p.side[0] = p.side[2] = p.side[1] = p.side[3] = getRandomNum(p.sideLength/1.5,p.sideLength);
				// createQuadrilateral()
				
				p.angle[1] = p.angle[3] = getRandomNum(15,80)
				p.angle[0] = p.angle[2] = 90 - p.angle[1]
				p.side[0] = p.side[2] = p.side[1] = p.side[3] = getRandomNum(p.sideLength/1.1,p.sideLength);
				createQuadrilateral()
				
				break;
			case "Square":
				p.angle[0] = p.angle[1] = p.angle[2] = p.angle[3] = Math.PI * Maths.TO_DEGREES/4
				p.side[0] = p.side[2] = p.side[1] = p.side[3] = getRandomNum(p.sideLength/2,p.sideLength);
				createQuadrilateral()
				break;
			case "Trapezoid":
				createTrapezoid()
				break;
			case "Isosceles trapezoid":
				createTrapezoid()
				break;
			case "Kite":
				createkite()
				break;
		}
		if(p.shape == "irRegularParallelogram")
			createParallelogram(p.side1,p.base,0)
		// else
			// createQuadrilateral()
	}
	//================================================================================
	this.getShape = function()
	{
		return p.shape
	}	
	//================================================================================
	// EVENT FUNCTIONS
	//================================================================================
	
	this.mouseEvent = function(e)
	{
		var mouseX = e.x;
		var mouseY = e.y;
		
		if(e.type == "mousedown")
		{
			curPointObj = getPointOnCanvas(mouseX,mouseY);
			if(curPointObj)
			{
				curSelectedPoint = curPointObj.id;
				OldTouches.x = mouseX
				OldTouches.y = mouseY
				addPointerGrabbing(true)
				return true;
			}
			else
			{
				addPointerGrabbing(false)
				curSelectedPoint = null;
				return false;
			}
			
		}
		else if(e.type == "mousemove")
		{
			for(var i in pointArr)
			{
				if(pointArr[i].id == curSelectedPoint)
					curPointObj = pointArr[i];
			}
			if(curPointObj)
			{
				// curPointObj.x = mouseX;
				// curPointObj.y = mouseY;
				switch (p.shape)
				{
					case "Quadrilateral":
						quadrilateral(curPointObj,e);
						break;
					case "Parallelogram":
						parallelogram(curPointObj,e)
						break;
					case "Rhombus":
						parallelogram(curPointObj,e)//rhombus(curPointObj,e)
						break;
					case "Rectangle":
						rectangle(curPointObj,e)
						break;
					case "Square":
						square(curPointObj,e)
						break;
					case "Trapezoid":
						trapezoid(curPointObj,e)
						break;
					case "Isosceles trapezoid":
						trapezoid(curPointObj,e)
						break;
					case "Kite":
						kite(curPointObj,e)
						break;
				}
				checkBoundary(curPointObj)
				if(p.shape == "irRegularParallelogram")
				{
					if(curPointObj.isAllowX)
					{
						if(Math.abs(OldTouches.x - mouseX) >= p.Unit/10)
						{
							var tempX = Number(mouseX.toFixed(0))

							tempX = Math.round(tempX * 10/p.Unit) * p.Unit/10
							curPointObj.x = tempX
							OldTouches.x = curPointObj.x
						}
					}
					if(curPointObj.isAllowY)
					{
						if(Math.abs(OldTouches.y - mouseY) >= p.Unit/10)
						{
							var tempY = Number(mouseY.toFixed(0))
							tempY = Math.round(tempY * 10/p.Unit) * p.Unit/10
							curPointObj.y = tempY
							OldTouches.y = curPointObj.y
						}
					}
					checkBoundary(curPointObj)
					irRegularParallelogram(curPointObj)
				}
				//exteriorAngles();
				
				if(!restricted)
				{
					drawOnCanvas();
				}
				
			}
			if(getPointOnCanvas(mouseX,mouseY))
			{
				$("body").addClass("commongrab")
				return true;
			}
			else
			{	
				$("body").removeClass("commongrab")
				return false;
			}
		}
		else if(e.type == "mouseup")
		{
			p.Enforcing = false
			curPointObj = null;
			curSelectedPoint = null;
			addPointerGrabbing(false)
			$("body").removeClass("commongrab")
			return false;			
		}
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	//Area of parallelogram
	function irRegularParallelogram(refPoint,affectedPoint)
	{
		switch (refPoint.id)
		{
			case 0:
				if(pointArr[3].y - 2*p.Unit < refPoint.y)
					refPoint.y = pointArr[3].y - 2*p.Unit
				if(refPoint.x > pointArr[2].x - p.Unit)
					refPoint.x = pointArr[2].x - p.Unit
				if(p.maxBase && refPoint.x < p.centerX - (p.maxBase * p.Unit)/2)
					refPoint.x = p.centerX - (p.maxBase * p.Unit)/2
				if(p.maxHeight && refPoint.y < pointArr[3].y - (p.maxHeight * p.Unit))
					refPoint.y = pointArr[3].y - (p.maxHeight * p.Unit)
				pointArr[1].x = refPoint.x + p.base
				pointArr[1].y = refPoint.y
				if(pointArr[1].x < pointArr[3].x + p.Unit)
				{
					pointArr[1].x = pointArr[3].x + p.Unit
					refPoint.x = pointArr[1].x - p.base
				}
				if(pointArr[1].x > p.centerX + (p.maxBase * p.Unit)/2)//(canvas.width - p.padding_H) )
				{
					pointArr[1].x = p.centerX + (p.maxBase * p.Unit)/2//(canvas.width - p.padding_H);
					p.base = Maths.getDistance(pointArr[3],pointArr[2])
					refPoint.x = pointArr[1].x - p.base
				}
				checkBoundary(refPoint)
				break;
			case 1:
				if(refPoint.y > pointArr[3].y - 2*p.Unit)
					refPoint.y = pointArr[3].y - 2*p.Unit
				if(refPoint.x < pointArr[3].x + p.Unit)
					refPoint.x = pointArr[3].x + p.Unit
				if(p.maxBase && refPoint.x > p.centerX + (p.maxBase * p.Unit)/2)
					refPoint.x = p.centerX + (p.maxBase * p.Unit)/2
				if(p.maxHeight && refPoint.y < pointArr[3].y - (p.maxHeight * p.Unit))
					refPoint.y = pointArr[3].y - (p.maxHeight * p.Unit)
				pointArr[0].x = refPoint.x - p.base
				pointArr[0].y = refPoint.y
				if(pointArr[0].x > pointArr[2].x - p.Unit)
				{
					pointArr[0].x = pointArr[2].x - p.Unit
					refPoint.x = pointArr[0].x + p.base
				}
				if(pointArr[0].x < p.centerX - (p.maxBase * p.Unit)/2 )//(0 + p.padding_H) )
				{
					pointArr[0].x = p.centerX - (p.maxBase * p.Unit)/2 //(0 + p.padding_H);
					p.base = Maths.getDistance(pointArr[3],pointArr[2])
					refPoint.x = pointArr[0].x + p.base
				}
				checkBoundary(refPoint)
				break;
			case 2:
				if(refPoint.x < pointArr[refPoint.id - 2].x + p.Unit)
					refPoint.x = pointArr[refPoint.id - 2].x + p.Unit
				if(refPoint.x < pointArr[refPoint.id + 1].x + 2.5*p.Unit)
					refPoint.x = pointArr[refPoint.id + 1].x + 2.5*p.Unit
				if(p.maxBase && refPoint.x > p.centerX + (p.maxBase * p.Unit)/2)
					refPoint.x = p.centerX + (p.maxBase * p.Unit)/2
				
				refPoint.x = Math.round(refPoint.x * 10/p.Unit) * p.Unit/10
				calculate()
				pointArr[refPoint.id - 1].x = pointArr[0].x + p.base
				if(pointArr[refPoint.id - 1].x > p.centerX + (p.maxBase * p.Unit)/2)//(p.width - p.padding_H) )
				{
					pointArr[refPoint.id - 1].x = p.centerX + (p.maxBase * p.Unit)/2//(p.width - p.padding_H);
					p.base = Maths.getDistance(pointArr[0],pointArr[refPoint.id - 1])
					refPoint.x = pointArr[3].x + p.base
				}
				if(pointArr[1].x < pointArr[3].x + p.Unit)
				{
					pointArr[1].x = pointArr[3].x + p.Unit
					refPoint.x = pointArr[3].x + Maths.getDistance(pointArr[0],pointArr[1])
				}
				pointArr[1].x = Math.round(pointArr[1].x * 10/p.Unit) * p.Unit/10
				refPoint.x = Math.round(refPoint.x * 10/p.Unit) * p.Unit/10
				checkBoundary(refPoint)
				break;
			case 3:
				if(refPoint.x > pointArr[1].x - p.Unit)
					refPoint.x = pointArr[1].x - p.Unit
				if(refPoint.x > pointArr[2].x - 2.5*p.Unit)
					refPoint.x = pointArr[2].x - 2.5*p.Unit
				if(p.maxBase && refPoint.x < p.centerX - (p.maxBase * p.Unit)/2)
					refPoint.x = p.centerX - (p.maxBase * p.Unit)/2
				
				refPoint.x = Math.round(refPoint.x * 10/p.Unit) * p.Unit/10
				calculate()
				pointArr[0].x = pointArr[1].x - p.base
				if(pointArr[0].x < p.centerX - (p.maxBase * p.Unit)/2 )// (0 + p.padding_H) )
				{
					pointArr[0].x = p.centerX - (p.maxBase * p.Unit)/2 //(0 + p.padding_H);
					p.base = Maths.getDistance(pointArr[0],pointArr[1])
					refPoint.x = pointArr[2].x - p.base
				}
				if(pointArr[0].x > pointArr[2].x - p.Unit)
				{
					pointArr[0].x = pointArr[2].x - p.Unit
					refPoint.x = pointArr[2].x - Maths.getDistance(pointArr[0],pointArr[1])
				}
				pointArr[0].x = Math.round(pointArr[0].x * 10/p.Unit) * p.Unit/10
				refPoint.x = Math.round(refPoint.x * 10/p.Unit) * p.Unit/10
				checkBoundary(refPoint)
				break;
		}
		calculate()
	}

	//================================================================================
	function quadrilateral(thePointMoved,e)
	{
		checkBoundaryCircle(e)
		thePointMoved.x = e.x
		thePointMoved.y = e.y
		pointMoved(thePointMoved)
	}
	
	function parallelogram(thePointMoved,e)
	{
		//console.log(p.Enforcing)
		if(p.Enforcing == true) return
		checkBoundary(e)
		// p.maxRadius = 120//-------------->>
		var center = new Vector(p.centerX,p.centerY)
		// var dist = Maths.getDistance(e,center)
		// var angle = Maths.getAngle(center,e,true)
		
		thePointMoved.x = e.x - p.centerX
		thePointMoved.y = e.y - p.centerY
		
		// Remember that we're enforcing so we don't get in an infinite loop
		p.Enforcing = true
		tMaxCoeff = 0.485//0.495
		tMinCoeff = 0.7//0.55
		var d1 = {}, d2 = {}, d3 = {}, d4 = {}, p1 = {}, p2 = {}
		// console.log(p.LenAB,p.LenBC)
		if(thePointMoved.id == 0)
		{
			
			d1 = new Vector(thePointMoved.x,thePointMoved.y)
			// make sure that it is still a parallegram
			if(d1.magnitude() >=  tMaxCoeff * (p.LenAB + p.LenBC))
			{
				d1 = d1.clone().normalise().multiplyNew(tMaxCoeff * (p.LenAB + p.LenBC))
			}
			else if(d1.magnitude() <= tMinCoeff * Math.abs(p.LenAB - p.LenBC))
			{
				d1 = d1.clone().normalise().multiplyNew(tMinCoeff * Math.abs(p.LenAB - p.LenBC))
			}
			var reversed1 = d1.clone().reverse()
			var intersection = getIntersectionPointsOfTwoCircles(d1, p.LenAB, reversed1, p.LenBC)
			
			if(intersection.status == "intersection")
			{
				p1 = intersection.p1
				p2 = intersection.p2
				angle1 = signedAngleBetween(d1, p1)
				if(angle1 > 180) 
					d2 = p1
				else
					d2 = p2    
			}
			else
			{
				return
			}
			
			if(d2.magnitude() >=  tMaxCoeff * (p.LenAB + p.LenBC))
			{
				d2 = d2.clone().normalise().multiplyNew(tMaxCoeff * (p.LenAB + p.LenBC))
			
				var reversed2 = d2.clone().reverse()
				var intersection = getIntersectionPointsOfTwoCircles(d2, p.LenAB, reversed2, p.LenBC)
			
				if(intersection.status == "intersection")
				{
					p1 = intersection.p1
					p2 = intersection.p2
					angle1 = signedAngleBetween(d2, p1)
					if(angle1 < 180) 
						d1 = p1
					else
						d1 = p2    
				}
				else
				{
					// p.Enforcing = false
					return
				}
			}
			p.RatioA_B = d1.magnitude() / d2.magnitude()
			p.AngleAOB = p.shape == "Parallelogram" ? Math.abs(p.d2.angle() - p.d1.angle()) : 90;
		}
		if(thePointMoved.id == 1)
		{
			// checkBoundary(e)
			d2 = new Vector(thePointMoved.x,thePointMoved.y)
			// make sure that it is still a parallegram
			if(d2.magnitude() >=  tMaxCoeff * (p.LenAB + p.LenBC))
			{		
				d2 = d2.clone().normalise().multiplyNew(tMaxCoeff * (p.LenAB + p.LenBC))
			}
			else if(d2.magnitude() <= tMinCoeff * Math.abs(p.LenAB - p.LenBC))
			{
				d2 = d2.clone().normalise().multiplyNew(tMinCoeff * Math.abs(p.LenAB - p.LenBC))
			}
			var reversed2 = d2.clone().reverse()
			var intersection = getIntersectionPointsOfTwoCircles(d2, p.LenAB, reversed2, p.LenBC)
			
			if(intersection.status == "intersection")
			{
				p1 = intersection.p1
				p2 = intersection.p2
				angle1 = signedAngleBetween(d2, p1)
				if(angle1 < 180) 
					d1 = p1
				else
					d1 = p2    
			}
			else
			{
				// p.Enforcing = false
				// console.log("return" + p.Enforcing)
				return
			}
			
			if(d1.magnitude() >=  tMaxCoeff * (p.LenAB + p.LenBC))
			{//console.log("A restricted B")
				d1 = d1.clone().normalise().multiplyNew(tMaxCoeff * (p.LenAB + p.LenBC))
			// }
			// else if(d1.magnitude() <= tMinCoeff * Math.abs(p.LenAB - p.LenBC))
			// {console.log("min")
				// d1 = d1.clone().normalise().multiplyNew(tMinCoeff * Math.abs(p.LenAB - p.LenBC))
			// }
				var reversed1 = d1.clone().reverse()
				var intersection = getIntersectionPointsOfTwoCircles(d1, p.LenAB, reversed1, p.LenBC)
				
				if(intersection.status == "intersection")
				{
					p1 = intersection.p1
					p2 = intersection.p2
					angle1 = signedAngleBetween(d1, p1)
					if(angle1 > 180) 
						d2 = p1
					else
						d2 = p2    
				}
				else
				{
					return
				}
			}
			p.RatioA_B = d1.magnitude() / d2.magnitude()
			p.AngleAOB = p.shape == "Parallelogram" ? Math.abs(p.d2.angle() - p.d1.angle()) : 90
		}
		if(thePointMoved.id == 2)
		{
			// checkBoundary(e)
			d3 = new Vector(thePointMoved.x,thePointMoved.y)
			d1 = d3.clone().reverse()
			d2_mag = d1.magnitude() / p.RatioA_B
			// console.log(d2_mag)
			if(d2_mag > p.Max || d2_mag < p.Min)
			{
				d2_mag = Math.min(p.Max, Math.max(p.Min, d2_mag))
				d1_mag = d2_mag * p.RatioA_B
				d1 = d1.clone().normalise().multiplyNew(d1_mag)
				d3 = d1.clone().reverse()
			}
			d2 = angleToVector(vectorToAngle(d3) + 180 - p.AngleAOB ).multiplyNew(d2_mag)
			d4 = d2.clone().reverse()
			// console.log(p.Max,p.Min,d2_mag)
			
			d1_mag = d4.magnitude() * p.RatioA_B
			if(d1_mag > p.Max || d1_mag < p.Min)
			{//console.log("D restricted C")
				d2 = d4.clone().reverse()
				d1_mag = Math.min(p.Max, Math.max(p.Min, d1_mag))
				d2_mag = d1_mag / p.RatioA_B
				d2 = d2.clone().normalise().multiplyNew(d2_mag)
				d4 = d2.clone().reverse()
				d1 = angleToVector(vectorToAngle(d4) - (180 - p.AngleAOB)).multiplyNew(d1_mag)
				d3 = d1.clone().reverse()
				// if(originalEvent)
				// {console.log("----")
					// parallelogram(pointArr[3],e,false)
				// }
			}
			
			p.LenAB = (d2.minusNew(d1)).magnitude()
			p.LenBC = (d3.minusNew(d2)).magnitude()
		}
		if(thePointMoved.id == 3)
		{
			// checkBoundary(e)
			d4 = new Vector(thePointMoved.x,thePointMoved.y)
			d2 = d4.clone().reverse()
			
			d1_mag = d2.magnitude() * p.RatioA_B
			
			if(d1_mag > p.Max || d1_mag < p.Min)
			{
				d1_mag = Math.min(p.Max, Math.max(p.Min, d1_mag))
				d2_mag = d1_mag / p.RatioA_B
				d2 = d2.clone().normalise().multiplyNew(d2_mag)
				d4 = d2.clone().reverse()
			}
			d1 = angleToVector(vectorToAngle(d4) - (180 - p.AngleAOB)).multiplyNew(d1_mag)
			d3 = d1.clone().reverse()
			// console.log(p.Max,p.Min,d1_mag)
			
			d2_mag = d1.magnitude() / p.RatioA_B
			// console.log(d2_mag > p.Max)
			if(d2_mag > p.Max || d2_mag < p.Min)
			{//console.log("C restricted D")
				d2_mag = Math.min(p.Max, Math.max(p.Min, d2_mag))
				d1_mag = d2_mag * p.RatioA_B
				d1 = d1.clone().normalise().multiplyNew(d1_mag)
				d3 = d1.clone().reverse()
				d2 = angleToVector(vectorToAngle(d3) + 180 - p.AngleAOB ).multiplyNew(d2_mag)
				d4 = d2.clone().reverse()
			}
			
			p.LenAB = (d2.minusNew(d1)).magnitude()
			p.LenBC = (d3.minusNew(d2)).magnitude()
		}
		setLocation(0,d1)
		setLocation(1,d2)
		setLocation(2,d1.clone().reverse())
		setLocation(3,d2.clone().reverse())
			
		// -- We're done enforcing
		p.Enforcing = false
		
		// ............. for length and angle consistancy 
		
		if(p.shape == "Rhombus")
			adjustments()
	}
	
	function square(thePointMoved,e)
	{
		checkBoundary(e)
		var dist = Maths.getDistance(e,{x:p.centerX,y:p.centerY})
		p.side[0] = p.side[2] = p.side[1] = p.side[3] = dist;
		p.angle[0] = p.angle[1] = p.angle[2] = p.angle[3] = Math.PI * Maths.TO_DEGREES/4;
		if(p.isRegular)
		{
			checkBoundaryCircle(e)
			var dist = Maths.getDistance(e,{x:p.centerX,y:p.centerY})
			p.side[0] = p.side[2] = p.side[1] = p.side[3] = dist
			if(thePointMoved.id == 0)
			{
				p.angle[1] = p.angle[0] = p.angle[2] = p.angle[3] = Maths.getAngle(e,{x:p.centerX,y:p.centerY})
			}
			if(thePointMoved.id == 1)
			{
				p.angle[1] = p.angle[0] = p.angle[2] = p.angle[3] = Maths.getAngle(e,{x:p.centerX,y:p.centerY}) + 90
			}
			if(thePointMoved.id == 2)
			{
				p.angle[1] = p.angle[0] = p.angle[2] = p.angle[3] = Maths.getAngle(e,{x:p.centerX,y:p.centerY}) + 180
			}
			if(thePointMoved.id == 3)
			{
				p.angle[1] = p.angle[0] = p.angle[2] = p.angle[3] = Maths.getAngle(e,{x:p.centerX,y:p.centerY}) + 270
			}
		}
		createQuadrilateral()
	}
	
	function rectangle(thePointMoved,e)
	{
		if(p.isRegular)
		{
			checkBoundaryCircle(e)
			var dist = Maths.getDistance(e,{x:p.centerX,y:p.centerY})
			p.side[0] = p.side[2] = p.side[1] = p.side[3] = dist
			if(thePointMoved.id == 0)
			{
				p.angle[1] = p.angle[3] = Maths.getAngle(e,{x:p.centerX,y:p.centerY})
				p.angle[0] = p.angle[2] = 90 - p.angle[1]
			}
			if(thePointMoved.id == 1)
			{
				p.angle[2] = p.angle[0] = Maths.getAngle(e,{x:p.centerX,y:p.centerY}) + 90
				p.angle[1] = p.angle[3] = 90 - p.angle[2]
			}
			if(thePointMoved.id == 2)
			{
				p.angle[1] = p.angle[3] = Maths.getAngle(e,{x:p.centerX,y:p.centerY}) + 180
				p.angle[0] = p.angle[2] = 90 - p.angle[1]
			}
			if(thePointMoved.id == 3)
			{
				p.angle[2] = p.angle[0] = Maths.getAngle(e,{x:p.centerX,y:p.centerY}) + 270
				p.angle[1] = p.angle[3] = 90 - p.angle[2]
			}
			createQuadrilateral()
		}
		else
		{
		thePointMoved.x = e.x
		thePointMoved.y = e.y
		checkBoundary(thePointMoved)
		
		switch (thePointMoved.id)
		{
			case 0:
				// p.angle[1] = p.angle[3] = Maths.getAngle(e,{x:p.centerX,y:p.centerY})// - 90
				// p.angle[0] = p.angle[2] = 90 - p.angle[1]
				thePointMoved.x <= p.centerX ? thePointMoved.x = p.centerX : null
				thePointMoved.y <= p.centerY ? thePointMoved.y = p.centerY : null
				
				pointArr[1].x = thePointMoved.x
				pointArr[1].y = (p.height+ 2*p.shiftCenterY) - thePointMoved.y
				
				pointArr[3].x = (p.width+ 2*p.shiftCenterX) - thePointMoved.x 
				pointArr[3].y = thePointMoved.y
				
				pointArr[2].x = pointArr[3].x
				pointArr[2].y = pointArr[1].y
				break;
			case 2:
				// p.angle[1] = p.angle[3] = Maths.getAngle(e,{x:p.centerX,y:p.centerY}) - Math.PI * Maths.TO_DEGREES
				// p.angle[0] = p.angle[2] = 90 - p.angle[1]
				thePointMoved.x >= p.centerX ? thePointMoved.x = p.centerX : null
				thePointMoved.y >= p.centerY ? thePointMoved.y = p.centerY : null
				pointArr[1].x = (p.width+ p.shiftCenterX) - thePointMoved.x 
				pointArr[1].y = 2*thePointMoved.y
				
				pointArr[0].x = (p.width + 2*p.shiftCenterX) - thePointMoved.x  
				pointArr[0].y = (p.height + 2*p.shiftCenterY) - thePointMoved.y
				
				pointArr[3].x =thePointMoved.x
				pointArr[3].y = pointArr[0].y
				break;
			case 1:
				// p.angle[0] = p.angle[2] = Maths.getAngle(e,{x:p.centerX,y:p.centerY}) + 90
				// p.angle[1] = p.angle[3] = 90 - p.angle[0]
				thePointMoved.x <= p.centerX ? thePointMoved.x = p.centerX : null
				thePointMoved.y >= p.centerY ? thePointMoved.y = p.centerY : null
				
				pointArr[0].x = thePointMoved.x
				pointArr[0].y = (p.height + 2*p.shiftCenterY)- thePointMoved.y
				
				pointArr[3].x = (p.width + 2*p.shiftCenterX)- thePointMoved.x
				pointArr[3].y = (p.height + 2*p.shiftCenterY)- thePointMoved.y
				
				pointArr[2].x = pointArr[3].x
				pointArr[2].y = thePointMoved.y
				break;
			case 3:
				// p.angle[0] = p.angle[2] = Maths.getAngle(e,{x:p.centerX,y:p.centerY}) + 270
				// p.angle[1] = p.angle[3] = 90 - p.angle[0]
				thePointMoved.x >= p.centerX ? thePointMoved.x = p.centerX : null
				thePointMoved.y <= p.centerY ? thePointMoved.y = p.centerY : null
				
				pointArr[0].x = (p.width + 2*p.shiftCenterX)- thePointMoved.x
				pointArr[0].y = thePointMoved.y
				
				pointArr[1].x = (p.width + 2*p.shiftCenterX)- thePointMoved.x
				pointArr[1].y = (p.height + 2*p.shiftCenterY)- thePointMoved.y
				
				pointArr[2].x = thePointMoved.x
				pointArr[2].y = pointArr[1].y
				
				break;
		}
		}
		// p.angle[1] = p.angle[3] = Maths.getAngle(e,{x:p.centerX,y:p.centerY})
		// p.angle[0] = p.angle[2] = 90 - p.angle[1]
		// createParallelogram()
	}
	
	function trapezoid(thePointMoved,e)
	{
		// -- If we're busy enforcing, don't respond
		if (p.Enforcing == true) return

		// -- Remember that we're enforcing so we don't get in an infinite loop
		p.Enforcing = true
		checkBoundary(e)
		switch (thePointMoved.id)
		{
			case 0:
			e.x > p.centerX - (p.Unit + p.radius) ? e.x = p.centerX - (p.Unit + p.radius) : null
			e.y > p.centerY - (p.Unit + p.radius) ? e.y = p.centerY - (p.Unit + p.radius) : null
			break
			case 1:
			e.x < p.centerX + (p.Unit + p.radius) ? e.x = p.centerX + (p.Unit + p.radius) : null
			e.y > p.centerY - (p.Unit + p.radius) ? e.y = p.centerY - (p.Unit + p.radius) : null
			break
			case 2:
			e.x < p.centerX + (p.Unit + p.radius) ? e.x = p.centerX + (p.Unit + p.radius) : null
			e.y < p.centerY + (p.Unit + p.radius) ? e.y = p.centerY + (p.Unit + p.radius) : null
			break
			case 3:
			e.x > p.centerX - (p.Unit + p.radius) ? e.x = p.centerX - (p.Unit + p.radius) : null
			e.y < p.centerY + (p.Unit + p.radius) ? e.y = p.centerY + (p.Unit + p.radius) : null
			break
		}
		thePointMoved.x = e.x //- p.centerX
		thePointMoved.y = e.y //- p.centerY
		var d1, d2, d3, d4;
		
		d1 = getLocation(pointArr[0])
		d2 = getLocation(pointArr[1])
		d3 = getLocation(pointArr[2])
		d4 = getLocation(pointArr[3])
		
		switch (thePointMoved.id)
		{
			case 0:
			p.shape == "Isosceles trapezoid" ? d2.x = -d1.x : null
			d2.y = d1.y
			d3.y = -d1.y
			d4.y =  -d1.y
			break
			case 1:
			p.shape == "Isosceles trapezoid" ? d1.x = -d2.x : null
			d1.y = d2.y
			d3.y = -d2.y
			d4.y =  -d2.y
			break
			case 2:
			p.shape == "Isosceles trapezoid" ? d4.x = -d3.x : null
			d4.y = d3.y
			d1.y = - d3.y
			d2.y = - d3.y
			break
			case 3:
			p.shape == "Isosceles trapezoid" ? d3.x = -d4.x : null
			d3.y = d4.y
			d1.y = -d4.y
			d2.y = -d4.y
			break
		}
		setLocation(0,d1)
		setLocation(1,d2)
		setLocation(2,d3)
		setLocation(3,d4)
		
		p.Enforcing = false
	}
	
	function kite(thePointMoved,e)
	{
		if(p.Enforcing == true) return
		// checkBoundary(e)
		checkBoundaryCircle(e)
		var center = new Vector(p.centerX,p.centerY)
		
		thePointMoved.x = e.x //- p.centerX
		thePointMoved.y = e.y //- p.centerY
		var d1, d2, d3, d4;
		if(thePointMoved.id == 0)
		{
			d1 = getLocation(pointArr[0])
			d2 = getLocation(pointArr[1])
			d3 = getLocation(pointArr[2])
			tAngle = vectorToAngle(d1)
			d3 = angleToVector(tAngle+180).multiplyNew(d3.magnitude())
			d2 = angleToVector(tAngle+90).multiplyNew(d2.magnitude())
			setLocation(0,d1)
			setLocation(1,d2)
			setLocation(2,d3)
			setLocation(3,d2.clone().reverse())
		}
		if(thePointMoved.id == 1)
		{
			d2 = getLocation(pointArr[1])
			d3 = getLocation(pointArr[2])
			d1 = getLocation(pointArr[0])

			tAngle = vectorToAngle(d2)      
			d1 = angleToVector(tAngle-90).multiplyNew(d1.magnitude())
			d3 = angleToVector(tAngle+90).multiplyNew(d3.magnitude())
			
			setLocation(0,d1)
			setLocation(1,d2)
			setLocation(2,d3)
			setLocation(3,d2.clone().reverse())
		}
		if(thePointMoved.id == 2)
		{
			d3 = getLocation(pointArr[2])
			d1 = getLocation(pointArr[0])
			d2 = getLocation(pointArr[1])
			tAngle = vectorToAngle(d3)
			d1 = angleToVector(tAngle-180).multiplyNew(d1.magnitude())
			d2 = angleToVector(tAngle-90).multiplyNew(d2.magnitude())
			setLocation(0,d1)
			setLocation(1,d2)
			setLocation(2,d3)
			setLocation(3,d2.clone().reverse())
		}
		if(thePointMoved.id == 3)
		{
			d2 = getLocation(pointArr[3])//.clone().reverse()//-pCorners[4].queryLocation()
			d3 = getLocation(pointArr[2])
			d1 = getLocation(pointArr[0])

			tAngle = vectorToAngle(d2)

			// d1 = angleToVector(tAngle-90).multiplyNew(d1.magnitude())
			d1 = angleToVector(90 + tAngle).multiplyNew(d1.magnitude())
			d3 = angleToVector(tAngle-90).multiplyNew(d3.magnitude())

			setLocation(0,d1)
			setLocation(1,d2.clone().reverse())
			setLocation(2,d3)
			setLocation(3,d2)
		}
		
		// ............. for length and angle consistancy 
		adjustments()
	}
	
	function adjustments()
	{	
		var dist = Maths.getDistance({x:p.centerX,y:p.centerY},{x:pointArr[2].x,y:pointArr[2].y});
		var ang = Maths.getAngle(pointArr[0],{x:p.centerX,y:p.centerY},true)
		ang = ang < 0 ? Math.PI*2 + ang : ang;
		ang = ang%(Math.PI*2)
		
		var temp = Maths.getPoint({x:p.centerX,y:p.centerY},ang+Math.PI,dist)
		pointArr[2].x = temp.x
		pointArr[2].y = temp.y
		
		var flag = true;
		var angCheck = Maths.getAngle(pointArr[1],{x:p.centerX,y:p.centerY},true);
		angCheck = angCheck < 0 ? Math.PI*2 + angCheck : angCheck;
		angCheck = angCheck%(Math.PI*2)
		
		
		var ang_1 = ang + Math.PI/2;
		ang_1 = ang_1 < 0 ? Math.PI*2 + ang_1 : ang_1;
		ang_1 = ang_1%(Math.PI*2)
		
		if(Math.abs(ang_1 - angCheck) > 0.1)
			flag = false;
		
		dist = Maths.getDistance({x:p.centerX,y:p.centerY},pointArr[3]);
		
		ang_1 = !flag ? ang - Math.PI/2 : ang_1;
		ang_1 = ang_1 < 0 ? Math.PI*2 + ang_1 : ang_1;
		
		temp = Maths.getPoint({x:p.centerX,y:p.centerY},ang_1,dist)
		pointArr[1].x = temp.x
		pointArr[1].y = temp.y
		
		var ang_2 = ang - Math.PI/2;
		ang_2 = !flag ? ang + Math.PI/2 : ang_2;
		ang_2 = ang_2 < 0 ? Math.PI*2 + ang_2 : ang_2;
		ang_2 = ang_2%(Math.PI*2)
		
		temp = Maths.getPoint({x:p.centerX,y:p.centerY},ang_2,dist)
		pointArr[3].x = temp.x
		pointArr[3].y = temp.y
		
	} 
	
	//Area of parallelogram
	function calculate()
	{
		p.angle1 = Maths.getAngleBtn3(pointArr[1],pointArr[3],pointArr[0])
		p.angle2 = 180 - p.angle1;
		p.base = Maths.getDistance(pointArr[2],pointArr[3])
		p.side = Maths.getDistance(pointArr[0],pointArr[3])
		p.PHeight = Math.sin(p.angle2*Maths.TO_RADIANS) * p.side
		Base = parseFloat((p.base/p.Unit).toFixed(1))
		Height = parseFloat((p.PHeight/p.Unit).toFixed(1))
		Area = parseFloat((Base*Height).toFixed(1))
		// Base * 10 % 10 == 0 ? Base = (Base * 10) / 10 : null
		// Height * 10 % 10 == 0 ? Height = (Height * 10) / 10 : null
		// Area * 10 % 10 == 0 ? Area = (Area * 10) / 10 : null
	}
	//------------------------------
	
	function createBaseCanvas()
	{
		var _div = document.createElement("div")
		p.target.append(_div)
		
		p.target = $(_div)
		p.target.css({
			"position": "absolute",
			})
	
		canvas.width = p.width;
		canvas.height = p.height;
		$(canvas).css(
		{
			"position": "absolute",
			"left": p.x+"px",
			"top": p.y+"px",
			"border":p.border,
			
		}).attr("id", "canvas_"+p.id);
		//-------
		canvasAngle.width = p.width;
		canvasAngle.height = p.height;
		$(canvasAngle).css(
		{
			"position": "absolute",
			"left": p.x + "px",
			"top": p.y + "px",
		}).attr("id", "canvasAngle_"+p.id);
		//-------
		canvasLabel.width = p.width;
		canvasLabel.height = p.height;
		$(canvasLabel).css(
		{
			"position": "absolute",
			"left": p.x + "px",
			"top": p.y + "px",
		}).attr("id", "canvasLabel_"+p.id);
		//-------
		canvasGrid.width = p.width;
		canvasGrid.height = p.height;
		$(canvasGrid).css(
		{
			"position": "absolute",
			"left": p.x + "px",
			"top": p.y + "px",
		}).attr("id", "canvasGrid_"+p.id);
		
		p.target.append(canvas);
		p.target.append(canvasAngle);
		p.target.append(canvasGrid);
		p.target.append(canvasLabel);
		
		p.index ? $(canvas).css("z-index", p.index) : null;
		p.labelIndex ? $(canvasGrid).css("z-index", p.labelIndex) : null;
		p.labelIndex ? $(canvasLabel).css("z-index", p.labelIndex) : null;
		
		!p.visible ? p.target.hide() : null;
	}
	//================================================================================
	function createQuadrilateral()
	{
		pointArr = new Array();
		
		for(var i = 1; i <= p.numOfSides; i++ )
		{	
			curAngle = i * 360.0 / p.numOfSides + p.angle[i-1]
			var temp = angleToVector(curAngle).multiplyEq(p.side[i-1]);
			var tempObj = new Object();
			tempObj = new Vector(temp.x + p.centerX,temp.y + p.centerY);
			tempObj.id = p.numOfSides - i;
			pointArr.push(tempObj);
		}
		pointArr.reverse();
		drawOnCanvas()
	}

	function createRegularParallelogram()
	{
		// p.InitialLen = 15.0 * p.Unit
		// p.Min = 5 * p.Unit
		// p.Max = /* Math.min(p.height,p.width)/4// */25 * p.Unit
		p.Z = new Vector(0,0)

		p.d1 = getParallelogramVector(0).multiplyEq(p.sideLength)
		p.d2 = getParallelogramVector(90).multiplyEq(p.sideLength)

		p.LenAB = (p.d2.minusNew(p.d1)).magnitude()
		p.LenBC = (p.d2.plusNew(p.d1)).magnitude()

		setLocation(0,p.d1)
		
		setLocation(1,p.d2)
		
		var dummy = p.d1.clone().reverse()
		setLocation(2,dummy)
		
		dummy = p.d2.clone().reverse()
		setLocation(3,dummy)
		
		p.RatioA_B = p.d1.magnitude() / p.d2.magnitude()
		p.AngleAOB = Math.abs(p.d2.angle() - p.d1.angle())
		
		p.Enforcing = false
		drawOnCanvas()
	}
	//================================================================================
	function createRhombus()
	{
		var tAngle =  getRandomNum(0,80)-40
		p.d1 = getRohmbusVector(0, tAngle).multiplyNew(p.sideLength)
		p.d2 = getRohmbusVector(90, tAngle).multiplyNew(p.sideLength)
		
		p.LenAB = (p.d2.minusNew(p.d1)).magnitude()
		p.LenBC = (p.d2.plusNew(p.d1)).magnitude()
		
		setLocation(0,p.d1)
		
		setLocation(1,p.d2)
		
		var dummy = p.d1.clone().reverse()
		setLocation(2,dummy)
		
		dummy = p.d2.clone().reverse()
		setLocation(3,dummy)
		
		p.RatioA_B = p.d1.magnitude() / p.d2.magnitude()
		p.AngleAOB = 90//Math.abs(p.d2.angle() - p.d1.angle())
		
		p.Enforcing = false
		drawOnCanvas()
	}
	//================================================================================
	function createkite()
	{
		var tAngle =  getRandomNum(0,80)-40
		p.d1 = getRohmbusVector(0, tAngle).multiplyNew(p.sideLength)		// C
		p.d2 = getRohmbusVector(90, tAngle).multiplyNew(p.sideLength)	// B
		p.d3 = p.d1.clone().reverse().normalise().multiplyNew(p.sideLength * 0.5)  // A
		p.LenAB = (p.d2.minusNew(p.d1)).magnitude()
		p.LenBC = (p.d2.plusNew(p.d1)).magnitude()
		
		setLocation(0,p.d3)
		
		setLocation(1,p.d2)
		
		// var dummy = p.d1.clone().reverse()
		setLocation(2,p.d1)
		
		dummy = p.d2.clone().reverse()	//D
		setLocation(3,dummy)
		
		p.RatioA_B = p.d1.magnitude() / p.d2.magnitude()
		p.AngleAOB = 90//Math.abs(p.d2.angle() - p.d1.angle())
		
		p.Enforcing = false
		drawOnCanvas()
	}
	//================================================================================
	function createTrapezoid()
	{
		d1 = getParallelogramVector(45).multiplyNew(p.sideLength)
		d1 = new Vector(-Math.abs(d1.x), Math.abs(d1.y))
		d2 = new Vector(-d1.x, d1.y)

		d4 = getParallelogramVector(-45).multiplyNew(p.sideLength)
		d4 = new Vector(-Math.abs(d4.x), -Math.abs(d4.y))
		d3 = new Vector(-d4.x, d4.y)
		
		setLocation(3,d1)
		setLocation(2,d2)
		setLocation(1,d3)
		setLocation(0,d4)
		
		trapezoid(pointArr[0],pointArr[0])
		trapezoid(pointArr[1],pointArr[1])
		trapezoid(pointArr[2],pointArr[2])
		trapezoid(pointArr[3],pointArr[3])
		p.Enforcing = false
		drawOnCanvas()
	}
	//================================================================================
	function createParallelogram(side,base,angleOffset)
	{
		pointArr = new Array();

		var curAngle = 0 + angleOffset
		var temp = angleToVector(curAngle)

		var tempObj = new Object();
		tempObj.id = pointArr.length;
		tempObj.x = temp.x + p.centerX;
		tempObj.y = temp.y + p.centerY/2;
		tempObj.y = Math.round(tempObj.y * 10/p.Unit) * p.Unit/10;
		tempObj.vector = new Vector(tempObj.x,tempObj.y);
		tempObj.isAllowX = true
		tempObj.isAllowY = true
		pointArr.push(tempObj);

		temp = angleToVector(curAngle).multiplyEq(base);

		tempObj = new Object();
		tempObj.id = pointArr.length;
		tempObj.x = temp.x + pointArr[0].x;
		tempObj.y = temp.y + pointArr[0].y;
		tempObj.y = Math.round(tempObj.y * 10/p.Unit) * p.Unit/10;
		tempObj.vector = new Vector(tempObj.x,tempObj.y);
		tempObj.isAllowX = true
		tempObj.isAllowY = true
		pointArr.push(tempObj);

		curAngle =  p.angle1 + angleOffset
		temp = angleToVector(curAngle).multiplyEq(side);

		tempObj = new Object();
		tempObj.id = pointArr.length;
		tempObj.x = temp.x + pointArr[1].x;
		tempObj.y = temp.y + pointArr[1].y;
		tempObj.y = Math.round(tempObj.y * 10/p.Unit) * p.Unit/10;
		tempObj.vector = new Vector(tempObj.x,tempObj.y);
		tempObj.isAllowX = true
		tempObj.isAllowY = false
		pointArr.push(tempObj);

		curAngle = Math.PI*Maths.TO_DEGREES + angleOffset
		temp = angleToVector(curAngle).multiplyEq(base);
		tempObj = new Object();
		tempObj.id = pointArr.length;
		tempObj.x = temp.x + pointArr[2].x;
		tempObj.y = temp.y + pointArr[2].y;
		tempObj.y = Math.round(tempObj.y * 10/p.Unit) * p.Unit/10;
		tempObj.vector = new Vector(tempObj.x,tempObj.y);
		tempObj.isAllowX = true
		tempObj.isAllowY = false
		pointArr.push(tempObj);

		p.gridCenter.x = pointArr[3].x
		p.gridCenter.y = pointArr[3].y

		
		// drawOnCanvas("OG",canvas,context)
		irRegularParallelogram(pointArr[3])
		irRegularParallelogram(pointArr[2])
		// irRegularParallelogram(pointArr[0])
		calculate()
		drawOnCanvas()
	}
	//================================================================================
	function drawLengthLabel(p1,p2,tF)
	{
		var _temp = Maths.getMidPoint(p1,p2)
		var x1 = _temp.x
		var y1 = _temp.y

		var text = (Maths.getDistance(p1,p2)/p.Unit).toFixed(tF)
		text = parseFloat(text)
		//text = text

		contextLabel.font = p.rectFont+'pt Arial';
		contextLabel.textAlign = 'center';
		contextLabel.fillStyle = p.angleLabelColor;
		contextLabel.fillText(text, x1, y1 + p.rectPadding);

		var metrics = contextLabel.measureText(text);
		var rectWidth = metrics.width + p.rectPadding;
		var rectHeight = p.rectFont + p.rectPadding;

		var rectX = x1 - rectWidth/2;
		var rectY = y1 - rectHeight/2// - p.rectPadding;
		contextLabel.beginPath();
		contextLabel.rect(rectX, rectY, rectWidth, rectHeight);
		contextLabel.fillStyle = p.angleLabelBg;
		contextLabel.fill();
		contextLabel.strokeStyle = p.angleLabelLineColor;
		contextLabel.stroke();
		contextLabel.closePath();

		contextLabel.font = p.rectFont+'pt Arial';
		contextLabel.textAlign = 'center';
		contextLabel.fillStyle = p.angleLabelColor;
		contextLabel.fillText(text, x1, y1 + globalResizeCalc(1) + p.rectPadding);
	}
	
	function drawOnCanvas()
	{
		canvas.width = canvas.width;
		canvasAngle.width = canvasAngle.width;
		canvasLabel.width = canvasLabel.width;
		
		//context.globalAlpha = p.globalAlpha;			// Edited for 269... 
		context.beginPath();		
		var curPoint = pointArr[0];
		context.moveTo(curPoint.x,curPoint.y);
		for(var i = 0; i < pointArr.length-1; i++)
		{
			var nextPoint = pointArr[i+1];
			context.lineTo(nextPoint.x,nextPoint.y);
		}
		context.closePath();
		context.lineWidth = p.lineWidth;
		
		context.globalAlpha = p.globalAlpha;
		context.fillStyle = p.fillColor;
		context.fill();
		context.globalAlpha = 1;	
		
		context.strokeStyle = p.lineColor;
      	context.stroke();

		if(p.diagonal1 == true)
		{
			context.beginPath();
			context.moveTo(pointArr[0].x,pointArr[0].y);
			context.lineTo(pointArr[2].x,pointArr[2].y);
			context.closePath();
			context.stroke();
		}
		if(p.diagonal2 == true)
		{
			context.beginPath();
			context.moveTo(pointArr[1].x,pointArr[1].y);
			context.lineTo(pointArr[3].x,pointArr[3].y);
			context.closePath();
			context.stroke();
		}
		if(p.diagonalAngleBisector != 0)
		{
			drawAngle(pointArr[2],pointArr[0],pointArr[1],1)
			drawAngle(pointArr[3],pointArr[0],pointArr[2],1)
			if(p.diagonalAngleBisector == 2)
			{
				drawAngle(pointArr[0],pointArr[2],pointArr[3],2)
				drawAngle(pointArr[1],pointArr[2],pointArr[0],2)
			}
		}
		if(p.oneRightAngle && (p.shape == "Rectangle" || p.shape == "Square"))
		{
			drawAngle(pointArr[3],pointArr[0],pointArr[1],0)
		}
		if(p.diagonalsPerp == true && (p.shape == "Rhombus" || p.shape == "Square"))
		{
			drawAngle(pointArr[1],{x:p.centerX,y:p.centerY},pointArr[0],0,true)
		}
		if(p.centerPoint == true)
		{
			var _iPoint = {x:p.centerX,y:p.centerY,id:4}
			context.beginPath();
			//..Circle Drawing p.radius
			context.arc(_iPoint.x, _iPoint.y, p.radius, 0, 2 * Math.PI);
			context.lineWidth = 2;
			context.strokeStyle = p.pointLineColor;

			context.stroke();
			// context.fillStyle = p.NonDragpointFillColor;
			context.fill();
			context.closePath();
			//..Adding Text
			context.beginPath();
			context.font = "italic bold "+p.fontSize+"px Arial"
			
			var txt = String.fromCharCode(p.startCharCode+_iPoint.id)
			var width = context.measureText(txt).width/2;
			var height = p.fontSize/3;
			context.fillStyle = p.fontColor;
			context.fillText(txt, _iPoint.x - width, _iPoint.y + height);
			
			context.closePath();
		}
		if(p.showHeight)
		{
			//height
			context.beginPath()
			var _point = pointArr[0].x > pointArr[3].x && pointArr[0].x < pointArr[2].x ? _point = pointArr[0] : _point = pointArr[1]
			var temp = angleToVector(90).multiplyEq(p.PHeight)
			context.moveTo(_point.x,_point.y + temp.y)
			context.lineTo(_point.x,_point.y)
			context.closePath()

			drawLengthLabel(_point,{x:_point.x,y:_point.y + temp.y},1)

			//right angle sign
			var diff = globalResizeCalc(15)
			if(_point.id == 1)
			{
				if(_point.x >= pointArr[3].x)
				{
					diff = -diff;
				}
			}
			context.moveTo(_point.x + diff,_point.y + temp.y)
			context.lineTo(_point.x + diff,_point.y + temp.y - globalResizeCalc(15))
			context.lineTo(_point.x,_point.y + temp.y - globalResizeCalc(15))
			context.lineWidth = 2
			context.strokeStyle = p.heightColor
			context.stroke()
		}
		if(p.showBase)
		{
			context.beginPath()
			context.moveTo(pointArr[3].x,pointArr[3].y)
			context.lineTo(pointArr[2].x,pointArr[2].y)
			context.strokeStyle = p.lineColor
			context.lineWidth = 2
			context.closePath()
			context.stroke()

			drawLengthLabel(pointArr[3],pointArr[2],1)
		}
		
		// Internal Angle Drawing ................
		if(p.showAngle)
		{
			var rad = curRadius / 10 ;
			//+++++++++++++++++++++++++++++++++++++++ Exterior Angle +++++++++++++++++++++++++++++++++++//
			
				for(var i in pointArr)
				{
					// ..................................... Calculations ........................................ //
					i = Number(i);
					
					var nextIndex = ( ((i % p.numOfSides) + 1) < p.numOfSides)? ((i % p.numOfSides) + 1) : 0;
					var prevIndex = (i + (p.numOfSides - 1)) % p.numOfSides;
				
					drawAngle(pointArr[prevIndex],pointArr[i],pointArr[nextIndex])
					
				}// ....... End Of For
		}// ....... End Of If
		if(p.showTicks)
		{
			switch (p.shape)
			{
				case "Parallelogram":
					setTicks(pointArr[0],pointArr[1],1,"parallel")
					setTicks(pointArr[3],pointArr[2],1,"parallel")
					setTicks(pointArr[2],pointArr[1],2,"parallel")
					setTicks(pointArr[3],pointArr[0],2,"parallel")
					break;
				case "Rhombus":
				case "Square":
					setTicks(pointArr[0],pointArr[1],1,"congruence")
					setTicks(pointArr[3],pointArr[2],1,"congruence")
					setTicks(pointArr[2],pointArr[1],1,"congruence")
					setTicks(pointArr[3],pointArr[0],1,"congruence")
					break;
				case "Trapezoid":
					setTicks(pointArr[0],pointArr[1],1,"parallel")
					setTicks(pointArr[3],pointArr[2],1,"parallel")
					break;
				case "Isosceles trapezoid":
					setTicks(pointArr[0],pointArr[1],1,"parallel")
					setTicks(pointArr[3],pointArr[2],1,"parallel")
					setTicks(pointArr[2],pointArr[1],1,"congruence")
					setTicks(pointArr[3],pointArr[0],1,"congruence")
					break;
				case "Kite":
					setTicks(pointArr[0],pointArr[1],1,"congruence")
					setTicks(pointArr[3],pointArr[2],2,"congruence")
					setTicks(pointArr[1],pointArr[2],2,"congruence")
					setTicks(pointArr[0],pointArr[3],1,"congruence")
					break;
			}
		}
		
		// Main Point Circel Drawing.....
		
		for(var i = 0; i < pointArr.length; i++)
		{
			if(pointArr[i])
			{
				drawPoint(pointArr[i])
			}
		}
	}
	
	function drawPoint(_iPoint)
	{
		context.beginPath();
		//..Circle Drawing p.radius
		context.arc(_iPoint.x, _iPoint.y, p.radius, 0, 2 * Math.PI);
		context.lineWidth = p.pointLineWidth;
		context.strokeStyle = p.pointLineColor;

		context.stroke();
		context.globalAlpha = 1;
		context.fillStyle = p.pointFillColor;
		context.fill();
		context.globalAlpha = 1;
		context.closePath();
		//..Adding Text
		context.beginPath();
		context.font = "italic bold "+p.fontSize+"px Arial"
		//context.textAlign = 'center';
		
		var txt = String.fromCharCode(p.startCharCode+_iPoint.id)
		var width = context.measureText(txt).width/2;
		var height = p.fontSize/3;
		context.fillStyle = p.fontColor;
		context.fillText(txt, _iPoint.x - width, _iPoint.y + height);
		
		context.closePath();
	}
	
	function drawAngle(prevPoint,curPoint,nextPoint,tickNum,isCenter)
	{
		// var index = i
		var startAngle = Math.PI + Maths.getAngle(curPoint,nextPoint,true);
		var endAngle = Math.PI + Maths.getAngle(curPoint,prevPoint,true);

		var sideLen1 = Maths.getDistance(curPoint,nextPoint);
		var sideLen2 = Maths.getDistance(curPoint,prevPoint);

		var arcRadius = (sideLen1 < sideLen2)? sideLen1 : sideLen2;
		arcRadius = arcRadius/10;
		if(arcRadius > 15)
			arcRadius = 15;
		//if(arcRadius > )
		var _CONST = 1.414;

		var _center = ((endAngle + startAngle)/2) ;

		if(startAngle > endAngle)
		{
			_center = _center;
		} 
		else
		{
			_center = _center + Math.PI;
		}

		var angle = Number((Maths.getAngleBtn3(nextPoint,prevPoint,curPoint)).toFixed(2));

		// ..................................... Calculations ........................................ //
		var allowToDraw = false;
		// ......................... Angle Line .................................... //
			if((arcRadius/globalResizeCalc(1)) > 5.5)
			{
				contextAngle.beginPath();
				if(!(89 <= angle && angle <= 91))
				{
					allowToDraw = true;
					// if(endAngle - startAngle > Math.PI)
					// {
						contextAngle.arc(curPoint.x,curPoint.y, arcRadius*3,startAngle,endAngle,true);
					// }
					// else
					// {
						// contextAngle.arc(pointArr[i].x,pointArr[i].y, arcRadius*3,startAngle,endAngle);
					// }
					if(typeof(tickNum) != "undefined" && tickNum != 0)
					{
						var factor = 0.1
						_center = _center - (tickNum / 2) * factor
						for(var k = 0; k < tickNum; k++)
						{
							var temp = Maths.getPoint(curPoint,_center,arcRadius*3 + globalResizeCalc(8))
							contextAngle.beginPath()
							contextAngle.moveTo(temp.x,temp.y);
							temp = Maths.getPoint(curPoint,_center,arcRadius*3 - globalResizeCalc(8))
							contextAngle.lineTo(temp.x,temp.y);
							contextAngle.stroke();
							contextAngle.closePath();
							_center = _center + (tickNum / 2) * factor
						}
					}
				}
				else
				{
					var tempRadius = globalResizeCalc(20);
					
					var p1 = new Object();//pointArr[i].plusNew(angleToVector(startAngle).multiplyNew(tempRadius))//new Object();
					var p2 = new Object();
					var p3 = new Object();
					if(!isCenter)
					{
						if(pointArr[0].x < pointArr[3].x)
						{
							_center = _center + Math.PI
						}
						if(pointArr[0].y < pointArr[1].y)
						{
							_center = _center + Math.PI
						}
					}
					p1.x = curPoint.x + ((tempRadius) * Math.cos(startAngle));
					p1.y = curPoint.y + ((tempRadius) * Math.sin(startAngle));
					
					p2.x = curPoint.x + ((tempRadius*_CONST) * Math.cos(_center));
					p2.y = curPoint.y + ((tempRadius*_CONST) * Math.sin(_center));
					
					p3.x = curPoint.x + ((tempRadius) * Math.cos(endAngle));
					p3.y = curPoint.y + ((tempRadius) * Math.sin(endAngle));
					
					//contextAngle.moveTo(pointArr[i].x,pointArr[i].y);
					contextAngle.moveTo(p1.x,p1.y);
					contextAngle.lineTo(p2.x,p2.y);
					contextAngle.lineTo(p3.x,p3.y);
					// contextLabel.lineTo(pointArr[i].x,pointArr[i].y);
				}
				contextAngle.strokeStyle = p.anglelineColor;
				contextAngle.lineWidth = p.angleLineWidth
				contextAngle.stroke();
				contextAngle.closePath();
			}
		// ......................... Angle Line .................................... //

			
				
		// ......................... Angle Lable .................................... //
		if(p.showAngleLabel)
		{
			if((arcRadius/globalResizeCalc(1)) > 5.5 && allowToDraw)
			{
				var x1 = curPoint.x + (p.lableRadius * Math.cos(_center));
				var y1 = curPoint.y + (p.lableRadius * Math.sin(_center));
				
				var text = angle + "°";
				
				contextLabel.font = p.rectFont+'pt Arial';
				contextLabel.textAlign = 'center';
				contextLabel.fillStyle = p.angleLabelColor;
				contextLabel.fillText(text, x1, y1);
				
				var metrics = contextLabel.measureText(text);
				var rectWidth = metrics.width + p.rectPadding;
				var rectHeight = p.rectFont + p.rectPadding;
				
				var rectX = x1 - rectWidth/2;
				var rectY = y1 - rectHeight/2 - p.rectPadding;
				
				contextLabel.beginPath();
				contextLabel.rect(rectX, rectY, rectWidth, rectHeight);
				contextLabel.fillStyle = p.angleLabelBg;
				contextLabel.fill();
				contextLabel.strokeStyle = p.angleLabelLineColor;
				contextLabel.stroke();
				contextLabel.closePath();
				
				contextLabel.font = p.rectFont+'pt Arial';
				contextLabel.textAlign = 'center';
				contextLabel.fillStyle = p.angleLabelColor;
				contextLabel.fillText(text, x1, y1);
				
			}
			// ......................... Angle Lable .................................... //
		}
		
	}
	
	function setTicks(_p1,_p2,_n,_tickStyle)
	{
		var segsToDraw = []
		if (_n > 0)
		{
			centerpoint = Maths.getMidPoint(_p1,_p2)
			d = _p2.minusNew(_p1)
			totalLength = d.magnitude() / p.tickLength
			if (totalLength > 0.0)
			{
				lenUnit = d.divideNew(totalLength)
				lengthSpan = (_n-2) * 0.05
				startOffset = 0.5 - (lengthSpan * 0.5)
				tickBump = new Vector(lenUnit.y,-lenUnit.x)
				for(var i = 0; i < _n; i++)
				{
					switch (_tickStyle)
					{
					case "congruence":
					// -- congruence ticks
						basepoint = _p1.plusNew(d.multiplyNew(startOffset + (i - 1) * 0.04))
						segsToDraw.push([basepoint.plusNew(tickBump),basepoint.minusNew(tickBump)])
						break;
					default :
					// -- parallel ticks
						basepoint = _p1.plusNew(d.multiplyNew(startOffset + (i*15 - 1) * 0.005))
						segsToDraw.push([basepoint.plusNew(tickBump.minusNew(lenUnit)),basepoint])
						segsToDraw.push([basepoint.minusNew(tickBump.plusNew(lenUnit)),basepoint])
						break;
					}
				}
			}
		}
		for(var i = 0; i < segsToDraw.length; i++)
		{
			contextAngle.beginPath()
			contextAngle.lineWidth = p.tickWidth
			contextAngle.moveTo(segsToDraw[i][0].x,segsToDraw[i][0].y)
			contextAngle.lineTo(segsToDraw[i][1].x,segsToDraw[i][1].y)
			contextAngle.strokeStyle = p.tickColor
			contextAngle.stroke()
			contextAngle.closePath()
		}
	}
	
	function drawGrid()
	{
		canvasGrid.width = canvasGrid.width
		// $(canvasGrid).css("border","1px solid rgba(0,0,0,0)")
		var _temp = new Object()
		_temp.x = p.gridCenter.x
		_temp.y = p.gridCenter.y

		contextGrid.strokeStyle = p.gridColor//"#CCCCCC"
		contextGrid.lineWidth = p.gridLineWidth//"#CCCCCC"
		
		//vertical lines--------
		for(var i = _temp.x; i < p.width; i += 2 * p.Unit)
		{
			var x = Math.round(i.toFixed(0)) + 0.5
			contextGrid.beginPath()
			contextGrid.moveTo(x,0)
			contextGrid.lineTo(x,p.height)
			contextGrid.strokeStyle = p.gridColor//"#CCCCCC"
			contextGrid.lineWidth = p.gridLineWidth//"#CCCCCC"
			contextGrid.closePath()
			contextGrid.stroke()
		}
		for(var i = _temp.x + p.Unit; i < p.width; i += 2 * p.Unit)
		{
			var x = Math.round(i.toFixed(0)) + 0.5
			contextGrid.beginPath()
			contextGrid.moveTo(x,0)
			contextGrid.lineTo(x,p.height)
			contextGrid.strokeStyle = p.gridColorMinor//"#CCCCCC"
			contextGrid.lineWidth = p.gridLineWidthMinor//"#CCCCCC"
			contextGrid.closePath()
			contextGrid.stroke()
		}
		for(var i = _temp.x - 2 * p.Unit; i > 0 ; i -= 2 * p.Unit)
		{
			var x = Math.round(i.toFixed(0)) + 0.5;
			contextGrid.beginPath()
			contextGrid.moveTo(x,0)
			contextGrid.lineTo(x,p.height)
			contextGrid.strokeStyle = p.gridColor//"#CCCCCC"
			contextGrid.lineWidth = p.gridLineWidth//"#CCCCCC"
			contextGrid.closePath()
			contextGrid.stroke()
		}
		for(var i = _temp.x - p.Unit; i > 0 ; i -= 2 * p.Unit)
		{
			var x = Math.round(i.toFixed(0)) + 0.5;
			contextGrid.beginPath()
			contextGrid.moveTo(x,0)
			contextGrid.lineTo(x,p.height)
			contextGrid.strokeStyle = p.gridColorMinor//"#CCCCCC"
			contextGrid.lineWidth = p.gridLineWidthMinor//"#CCCCCC"
			contextGrid.stroke()
			contextGrid.closePath()
		}
		
		//Horizontal lines--------
		for(var i = _temp.y; i < p.height; i += 2 * p.Unit)
		{
			var x = Math.round(i.toFixed(0)) + 0.5
			contextGrid.beginPath()
			contextGrid.moveTo(0,x)
			contextGrid.lineTo(p.width,x)
			contextGrid.strokeStyle = p.gridColor//"#CCCCCC"
			contextGrid.lineWidth = p.gridLineWidth//"#CCCCCC"
			contextGrid.stroke()
			contextGrid.closePath()
		}
		for(var i = _temp.y + p.Unit; i < p.height; i += 2 * p.Unit)
		{
			var x = Math.round(i.toFixed(0)) + 0.5
			contextGrid.beginPath()
			contextGrid.moveTo(0,x)
			contextGrid.lineTo(p.width,x)
			contextGrid.strokeStyle = p.gridColorMinor//"#CCCCCC"
			contextGrid.lineWidth = p.gridLineWidthMinor//"#CCCCCC"
			contextGrid.stroke()
			contextGrid.closePath()
		}
		for(var i = _temp.y - 2 * p.Unit; i > 0; i -= 2 * p.Unit)
		{
			var x = Math.round(i.toFixed(0)) + 0.5
			contextGrid.beginPath()
			contextGrid.moveTo(0,x)
			contextGrid.lineTo(p.width,x)
			contextGrid.strokeStyle = p.gridColor//"#CCCCCC"
			contextGrid.lineWidth = p.gridLineWidth//"#CCCCCC"
			contextGrid.stroke()
			contextGrid.closePath()
		}
		for(var i = _temp.y - p.Unit; i > 0; i -= 2 * p.Unit)
		{
			var x = Math.round(i.toFixed(0)) + 0.5
			contextGrid.beginPath()
			contextGrid.moveTo(0,x)
			contextGrid.lineTo(p.width,x)
			contextGrid.strokeStyle = p.gridColorMinor//"#CCCCCC"
			contextGrid.lineWidth = p.gridLineWidthMinor//"#CCCCCC"
			contextGrid.stroke()
			contextGrid.closePath()
		}
	}

	//================================================================================
	function getPointOnCanvas(xVal,yVal)
	{
		var hitRadius = p.radius;
		if(BrowserDetect.any())
		{
			hitRadius = 15;
		}
		//for(var i in pointArr)
		for(var i = pointArr.length-1; i >=0; i--)
		{
			if(pointArr[i])
			{
				if((pointArr[i].x-hitRadius <= xVal && pointArr[i].x+hitRadius >= xVal) && (pointArr[i].y-hitRadius <= yVal && pointArr[i].y+hitRadius >= yVal))
				{
					return pointArr[i];
				}
			}
		}
		return null;
	}
	//================================================================================
	this.getPoints = function()
	{
		var temp = new Array();
		for(var i in pointArr)
		{
			i = Number(i);
			temp[i] = new Object();
			temp[i].x = Number(((pointArr[i].x - p.centerX)/p.radius).toFixed(0));
			temp[i].y = Number(((p.centerY - pointArr[i].y)/p.radius).toFixed(0));
			temp[i].id = i;
			if(temp[i].x == -0)
				temp[i].x = 0;
			if(temp[i].y == -0)
				temp[i].y = 0;
		}
		return temp;
	}
	//================================================================================
	function pointMoved(thePointMoved)
	{
		if (pBlock) 
			return
		theCorner = pointArr.length - pointArr.indexOf(thePointMoved);
		if (theCorner < 0) 
			return
		//console.log("theCorner : " + theCorner);
		 
		theAngle = vectorToAngle(thePointMoved);
		theAngleDefault = theCorner * 360 / p.numOfSides;
		theAngleOffset = theAngle + theAngleDefault;
		
		//console.log("theAngle : " + theAngle + " :: " + theAngleDefault + " :: " + theAngleOffset);
		
		if (theAngleOffset > 0)
		{
			theAngleOffset = 360 - theAngleOffset ; 
		}
		
		if (theAngleOffset < -180)
		{
			theAngleOffset = 360 + theAngleOffset;
		}
		
		theRadius = getRadius(thePointMoved)
		
		// if (p.isRegular) 
		// {
			// enforceRegularity(theRadius, theAngleOffset);
		// }
		// else 
		// {
			checkBoundary(thePointMoved);
			if (p.numOfSides >= 3 && p.isEnforceConvexity) 
			{
				// enforceConvexity(thePointMoved, theRadius, theAngleOffset);
				enforceConvexityQuad(thePointMoved);
			}
		// }
	}
	//================================================================================
	function enforceRegularity (theRadius, theOffset)
	{
		pBlock = true; 
		if(theRadius > p.sideLength)
			theRadius = p.sideLength;
		createPoints(p.numOfSides,theRadius,theOffset);
		
		pBlock = false;	
	}
	//================================================================================
	
	
	function enforceConvexityQuad(thisCorner)
	{
		// var whichCorner = p.pointArr.indexOf(thisCorner)
		var whichCorner = thisCorner.id

		var curIndex = thisCorner.id;
		var prevIndex = thisCorner.id == 0 ? p.numOfSides-1 : curIndex - 1;
		var nextIndex = thisCorner.id == p.numOfSides-1 ? 0 : curIndex + 1;
		var nextCorner = pointArr[nextIndex]

		var oppIndex;
		if(whichCorner % 2 == 0)
		{
			if(whichCorner == 0)		
				oppIndex = 2;
			else
				oppIndex = 0;
		}
		else
		{
			if(whichCorner == 1)		
				oppIndex = 3;
			else
				oppIndex = 1;
		}
		var oppositeCorner = pointArr[oppIndex]

		previousCorner = pointArr[prevIndex]

		var crossbeam = getLocation(nextCorner) .minusNew( getLocation(previousCorner))  
		var previousToCurrent = getLocation(thisCorner) .minusNew(getLocation(previousCorner))
		var previousToOpposite = getLocation(oppositeCorner) .minusNew( getLocation(previousCorner))
		var perp = crossbeam.getNormal().normalise();


		var thisScalar = signedComponentScalar(previousToCurrent,perp)
		var thatScalar = signedComponentScalar(previousToOpposite,perp)

		var sourcePoint = component(previousToCurrent,crossbeam)

		var finalScalar = thisScalar
		if (thatScalar > 0)
			finalScalar = Math.min(finalScalar, (-1)*p.Unit)
		else 
			finalScalar = Math.max(finalScalar,(1)*p.Unit)

		setLocation(whichCorner , getLocation(previousCorner) .plusNew(sourcePoint .plusNew(perp.multiplyEq(finalScalar))))

	}
	
	function signedComponentScalar(u, v)
	{
		// return (u*v) / (v*v)
		var a = u.dot(v)
		var b = v.dot(v)
		var c = a/b
		return c
	}	
	
	function component(u,v)
	{
		var a = u.dot(v)
		var b = v.dot(v)
		var c = a/b
		var d = v.multiplyNew(c)
		return d
	}
	
	
	
	
	
	/* function enforceConvexity (thePointMoved, theRadius, theAngleOffset)
	{
		pBlock = true; 
		
		var curAngleSum = 0;
		
		for(var looper in pointArr)
		{
			looper = Number(looper);
			
			var thisPoint = pointArr[looper]
			var nextPoint = pointArr[( ((looper % p.numOfSides) + 1) < p.numOfSides)? ((looper % p.numOfSides) + 1) : 0  ]
			var lastPoint = pointArr[(looper + (p.numOfSides - 1)) % p.numOfSides]
			
			curAngleSum = curAngleSum + Number(Maths.getAngleBtn3(lastPoint,nextPoint,thisPoint));
		}
		expectedAngleSum = (p.numOfSides - 2 ) * 180;
		if(Math.floor(expectedAngleSum) == Math.floor(curAngleSum))
		{
			//restricted = false;
			
			prevPointObj = new Object();
			prevPointObj.x = thePointMoved.x;
			prevPointObj.y = thePointMoved.y;
		}
		else
		{
			//restricted = true;
			thePointMoved.x = prevPointObj.x;
			thePointMoved.y = prevPointObj.y;
			
		}
		pBlock = false; 
	} */
	
	//================================================================================
	function checkBoundary(refPoint)
	{
		if(refPoint.x < (0 + p.padding_H) )
		{
			refPoint.x = (0 + p.padding_H);
		}
		if(refPoint.x > (canvas.width - p.padding_H) )
		{
			refPoint.x = (canvas.width - p.padding_H);
		}
		if(refPoint.y < (0 + p.padding_V) )
		{
			refPoint.y = (0 + p.padding_V);
		}
		if(refPoint.y > (canvas.height - p.padding_V) )
		{
			refPoint.y = (canvas.height - p.padding_V);
		}
	}
	
	//================================================================================
	function checkBoundaryCircle(refPoint)
	{
		var center = new Vector(p.centerX,p.centerY)
		var dist = Maths.getDistance(center,refPoint)
		if(dist >= p.boundaryMaxRadius)
		{
			var angle = Maths.getAngle(refPoint,center,true)
			var tempPoint = Maths.getPoint(center,angle,p.boundaryMaxRadius)
			refPoint.x = tempPoint.x
			refPoint.y = tempPoint.y
		}
		if(dist <= p.boundaryMinRadius)
		{
			var angle = Maths.getAngle(refPoint,center,true)
			var tempPoint = Maths.getPoint(center,angle,p.boundaryMinRadius)
			refPoint.x = tempPoint.x
			refPoint.y = tempPoint.y
		}
	}
	//================================================================================
	function initializeArray()
	{
		pointArr = new Array();
		for(var i = 1; i <= p.numOfSides; i++ )
		{	
			var tempObj = new Vector(p.centerX,p.centerY);
			tempObj.id = p.numOfSides - i;
			pointArr.push(tempObj);
		}
		pointArr.reverse();
	}	
	//================================================================================
	// MATHS FUNCTIONS
	//================================================================================
	// vectorToAngle(v)
	// Returns a *signed* angle generated by the vector
	// NOTE: This is different from vector.angleBetween(vector(1,0,0)) because
	//		 angleBetween() does not provide for a signed angle difference.
	function vectorToAngle(v)
	{
		var tempX = p.centerX;
		var tempY = p.centerY;
		
		if (v.y < 0.0) 
			return 360-vectorToAngle(new Vector(v.x,-v.y))
		
		var temp = new Vector(1,0)
		var angle = Math.abs(temp.angle() - v.angle())
		return Number((angle).toFixed(1));
		// var upper = (tempX - v.x)*(tempX - (tempX+50));
		// var lower = 50 * Math.sqrt(Math.pow((tempX - v.x),2) + Math.pow((tempY - v.y),2))//     (p.centerX - v.x)(p.centerX - (p.centerX+50));
		// var temp = Maths.radiansToDegrees(Math.acos(upper/lower));
		// console.log(temp)
		// var angle = 0;
		// if( v.x == p.centerX && p.centerY > v.y)
		// {
			// angle = 90;
		// }
		// else if( ((v.x >= tempX) || (v.x <= tempX)) && tempY >= v.y )
		// {
			// angle = temp;
		// }
		// else if( ((v.x >= tempX) || (v.x <= tempX)) && tempY <= v.y )
		// {
			// angle = 360 - temp;
		// }
		// return angle;
	}
	// angleToVector(a)
	// Accepts an angle (in degrees) and returns a vector pointing in that direction.
	function angleToVector(a)
	{
		a = a * Maths.TO_RADIANS//Maths.degreesToRadians(a)
		return new Vector(Math.cos(a),Math.sin(a))
	}
	//================================================================================
	function getParallelogramVector(baseang)
	{
		var ang = baseang + getRandomNum(0,80) - 40
		ang = ang * Maths.TO_RADIANS

		return new Vector(Math.sin(ang),Math.cos(ang)).multiplyEq(getRandomNum(0,5) * 0.1 + 0.5)
	}
	//================================================================================
	function getRohmbusVector(baseang, angle)
	{
		var ang = baseang +  angle
		ang = ang * Maths.TO_RADIANS
		return new Vector(Math.sin(ang),Math.cos(ang)).multiplyNew((getRandomNum(0,8) * 0.1 + 0.2) * 1.2)
	}
  //================================================================================
	function getIntersectionPointsOfTwoCircles(C0, R0, C1, R1)
	{
		// C0 - Vector, C1 - Vector
		// --based on an article on www.magic-software.com, and its name is
		// --"Intersection of linear and Circular Components in 2D"
		U = C1.minusNew(C0)
		V = new Vector(U.y, -U.x)

		U2 = Math.pow(U.magnitude(), 2.0)
		s = 0.5 * ((R0 * R0 - R1 * R1) / U2 + 1)
		t2 = R0 * R0 / U2 - s * s
		
		if(t2 < 0)
		{
			return {p1: null, p2: null, status: "noIntersection"}
		}
		// --tangent outside
		if(U.magnitude() == R0 + R1)
		{
			X = C0.plusNew(U.multiplyNew(R0/(R0+R1)))
			return  {p1: X, p2: X, status: "tangentOutside"}
		}
  
		if(U.magnitude() == Math.abs(R0-R1))
		{
			if(U.magnitude() == 0 && R0 == R1)
			{
				return {p1: null, p2: null, status: "same"}
			}
			else
			{
				X = C0.plusNew(U.multiplyNew(R0/(R0-R1)))
				return {p1: X, p2: X, status: "tangentInner"}
			}
		}
		
		t = Math.sqrt(t2);
		X1 = C0.plusNew(U.multiplyNew(s).plusNew(V.multiplyNew(t)))
		X2 = C0.plusNew(U.multiplyNew(s).minusNew(V.multiplyNew(t)))
		return {p1: X1, p2: X2, status: "intersection"}
	}
	//================================================================================
// -- signedAngleBetween(vector1, vector2)
// -- Returns the *signed* angle between two vectors.
// -- Note that this is different from the built-in angleBetween() in that it is
// -- signed (duh).
	function signedAngleBetween(v1, v2)
	{
	  return angleDifference(vectorToAngle(v1),vectorToAngle(v2))
	}
//================================================================================
// -- angleDifference(a1,a2)
// -- Returns the signed angle to add to a2 to get to a1.
// -- Returns a result between -180 and 180 degrees.
	function angleDifference(a1,a2)
	{
		if (a2 > a1) return -angleDifference(a2, a1)
		d1 = a1 - a2
		if (d1 > 180) return d1 - 360
		return d1
	}
	//================================================================================
	function getRadius(v)
	{ 
		return Math.sqrt(Math.pow((p.centerX-v.x),2)+Math.pow((p.centerY-v.y),2))
	}
	//================================================================================
	function getCollisionPoint(p1,p2)
	{
		var tempObj = new Object();
		var x = 0;
		var y = 0;
		
		//console.log(p1.x + " :: " + p1.y + " ..... " + p2.x + " :: " + p2.y);
		// with x = 0
		x = 0;
		var tempX1 = ((p2.y - p1.y)/(p2.x - p1.x) * (x - p1.x) + p1.y);
		//console.log("x = 0   " + tempX1);
		// with x = 500
		x = p.width;
		var tempX2 = ((p2.y - p1.y)/(p2.x - p1.x) * (x - p1.x) + p1.y);
		//console.log("x = 500   " + tempX2);
		
		// with y = 0
		y = 0;
		var tempY1 = ((p2.x - p1.x)/(p2.y - p1.y) * (y - p1.y) + p1.x)
		//console.log("y = 0   "  + tempY1);
		
		// with y = 500
		y = p.height;
		var tempY2 = ((p2.x - p1.x)/(p2.y - p1.y) * (y - p1.y) + p1.x)
		//console.log("y = 500   " + tempY2);
		
		if( p1.x < p2.x )
		{
			if(0 <= tempX2 && tempX2 <= p.height)
			{
				//console.log(" right " + tempX2);
				extndLineArr.push({p:p2,x:p.width,y:tempX2});
			}
			else
			{
				if(p1.y > p2.y)
				{
					//console.log(" top " + tempY1);
					extndLineArr.push({p:p2,x:tempY1,y:0});
				}
				else
				{
					//console.log(" bottom " + tempY2);
					extndLineArr.push({p:p2,x:tempY2,y:p.height});
				}
			}
		}
		else
		{
			if(0 <= tempX1 && tempX1 <= p.height)
			{
				//console.log(" left " + tempX1)
				extndLineArr.push({p:p2,x:0,y:tempX1});
			}
			else
			{
				if(p1.y > p2.y)
				{
					//console.log(" top " + tempY1);
					extndLineArr.push({p:p2,x:tempY1,y:0});
				}
				else
				{
					//console.log(" bottom " + tempY2);
					extndLineArr.push({p:p2,x:tempY2,y:p.height});
				}
			}
		}
	}
	//================================================================================
	function exteriorAngles ()
	{
		extndLineArr = [];
		
		for(var looper = 0; looper < p.numOfSides ; looper++)
		{
			
			var thisPoint = pointArr[looper]
			var nextPoint = pointArr[( ((looper % p.numOfSides) + 1) < p.numOfSides)? ((looper % p.numOfSides) + 1) : 0  ]
			var lastPoint = pointArr[(looper + (p.numOfSides - 1)) % p.numOfSides]
			
			getCollisionPoint(thisPoint,nextPoint);
		}
	}
	
	function setLocation(_ind,_p)
	{
		pointArr[_ind].x = p.centerX + _p.x
		pointArr[_ind].y = p.centerY + _p.y
	}
	
	function getLocation(_p)
	{
		var v = new Vector(_p.x - p.centerX,_p.y - p.centerY)
		return v//{x:_p.x - p.centerX,y:_p.y - p.centerY}
	}
}
//================================================================================
