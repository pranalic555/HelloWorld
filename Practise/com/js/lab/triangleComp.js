var Triangle = function()
{
	var p =
	{
		x:0,
		y:0,
		width:100,
		height:100,
		index:0,
		labelIndex:1,//INDEX for CANVAS LABEL//!important
		AC:50,
		AB:50,
		BC:60,
		minBase:20,
		minHeight:25,
		maxBase:50,
		defaultBase:50,
		defaultHeight:50,
		maxHeight:40,
		Unit:9,

		canvas:"",
		ctx:"",
		canvasSquare:"",
		contextSquare:"",
		canvasLabel:"",
		contextLabel:"",
		canvasGrid:"",
		contextGrid:"",

		pointArr:[],
		center:{},
		curPointObj:"",
		curSelectedPoint:"",
		angle_A:0,
		angle_B:0,
		angle_C:0,
		flag:false,
		maxPoints:3,
		twoSides:false,
		twoAngles:false,
		threeSides:false,
		threeAngles:false,
		noConditions:true,
		rightAngle:false,
		showSquare:false,
		BCsnap:[],
		Bsnap:[],
		Csnap:[],
		snap:[],

		threePading:95,
		ogPading:0,
		pointLineWidth:4,
		pointLineColor:'#3B42BC',
		pointFillColor:'#D2D4FA',
		NonDragpointFillColor:":'#D2D4FA",
		lineColor:'rgba(61, 48, 254, 1)',
		fillColor:'#AFB4FE',
		lineWidth:1,

		fontColor:'black',
		fontSize:15,

		anglelineColor:'#3B42BC',
		angleLabelColor:"#000",
		angleLabelLineColor:'#3B42BC',
		angleLabelBg:'#ccc',

		squareFillColor:"#67efc0",
		squareLineColor:"#3ad09c",
		
		textColor:"#000000",
		lineWidth:1,
		//fontSize:10,
		//fontColor:"#000000",
		startCharCode:65,
		dotRadius:globalResizeCalc(10),
		dotFillStyle:"#C8CAF8",
		defaultAngle:90,

		padding_H:50,
		padding_V:50,

		lableRadiusInt:75,
		rectPadding:5,
		rectFont:12,

		showSides:false,
		showLabel:false,
		//trigonometry------
		maxHyp:500,
		isBRadial:false,
		Hyp:200,
		//colorType:1,
		adjacent:0,
		hypotenuse:0,
		opposite:0,
		showOpposite:false,
		showAdjacent:false,
		showHypotenuse:false,
		sideColor:["#FF0101","#009600","#9933CC"],
		
		//AREA
		baseInPx:0,
		heightInPx:0,
		gridCenter:{},

		heightColor:"#CCCCCC",
		heightLineWidth:1,
		baseColor:'#3B42BC',
		gridColor:"#FFFFFF",
		gridLineWidth:1,
		
		showBase:false,
		showHeight:false,
	}
	var A;
	var B;
	var C;
	var Base, Height, Area
	var OldTouches = new Object()
	var _thisObj = this;
	this.init = function(_obj)
	{
		p.ogPading = p.padding_H;
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
		p.fontSize = globalResizeCalc(p.fontSize)
		p.rectPadding = globalResizeCalc(p.rectPadding)
		p.pointLineWidth = globalResizeCalc(p.pointLineWidth)
		p.lineWidth = globalResizeCalc(p.lineWidth)

		p.lableRadiusInt = globalResizeCalc(p.lableRadiusInt)
		p.rectFont = globalResizeCalc(p.rectFont)

		p.Unit = globalResizeCalc(p.Unit)
		// console.log(p.Unit)
		//p.Unit = Math.round(p.Unit/10) * 10
		// console.log(p.Unit)
		p.padding_H = globalResizeCalc(p.padding_H)
		p.padding_V = globalResizeCalc(p.padding_V)

		
		/*
		//....  changed .... //
		p.width -= p.width%p.Unit != 0 ? p.width%p.Unit : 0 ;
		p.height -= p.height%p.Unit != 0 ? p.height%p.Unit : 0;
		
		p.padding_H = p.padding_H < p.Unit ? p.Unit : p.Unit * (3);
		p.padding_V = p.padding_V < p.Unit ? p.Unit : p.Unit * (3);
		// ...... End .... //
		*/
		//p.maxHyp = //globalResizeCalc(p.maxHyp)
		//console.log(p.maxHyp/p.Unit+" : maxHyp")
		p.Hyp = globalResizeCalc(p.Hyp)

		//p.pointArr =
		p.center.x = p.centerX
		p.center.y = p.centerY+(p.centerY/1.5);
		p.AngleB = Math.PI*Maths.TO_DEGREES/4


		var _div = document.createElement("div");
		(p.target) ? p.target.append(_div) : $("body").append(_div)
		p.target = $(_div)
		createCanvas();

		switch (p.activityType)
		{
			
			case "pythagorean":
				createPythaPoints()
				break;
			case "trigonometry":
				createTrigPoints(inPixel(p.maxHyp) /* * p.Unit */)
				break;
			case "classify":
				createPoints();
				findASnapPoint();
				findBSnapPoint()
				findCSnapPoint()
				break;
			case "area":
				createIrregularPoints()
				break;
		}
		p.colorType != "undefined" ? this.changeColor(p.colorType) : null
		// calcDetails()

	}
// ----------------------- public Functions ----------------------
	this.show = function()
	{
		p.target.show()
	}
	
	this.hide = function()
	{
		p.target.hide()
	}
	
	this.showBaseHeight = function(bool)
	{
		p.showBase = bool
		p.showHeight = bool
		drawOnCanvas()
	}
	
	this.showTrignometrySides = function(_arr)
	{
		p.showOpposite = false
		p.showAdjacent = false
		p.showHypotenuse = false
		if(_arr && _arr.length != 0)
		{
			if(_arr.indexOf("opposite") != -1)
			{
				p.showOpposite = true
			}
			if(_arr.indexOf("adjacent") != -1)
			{
				p.showAdjacent = true
			}
			if(_arr.indexOf("hypotenuse") != -1)
			{
				p.showHypotenuse = true
			}
		}
		drawOnCanvas()
	}
	
	this.changeTypeTo = function(type)
	{
		switch (type)
		{
			case "pythagorean":
			p.activityType = "pythagorean";
			createPythaPoints();
			break;
			case "converse":
			p.activityType = "converse";
			createConversePoints();
			break;
			case "area":
			p.activityType = "area";
			createIrregularPoints()
			break;
		}
	}
	
	this.resetTriangle = function()
	{
		createIrregularPoints()
	}

	this.showSides = function(_bool)
	{
		p.showSides = _bool
		drawOnCanvas()
	}

	this.showGrid = function(bool)
	{
		if(bool)
		{
			$(p.canvasGrid).show()
			p.gridCenter.x = p.pointArr[2].x
			p.gridCenter.y = p.pointArr[2].y
			drawGrid()
		}
		else $(p.canvasGrid).hide()
	}

	this.alignGrid = function()
	{
		p.gridCenter.x = p.pointArr[2].x
		p.gridCenter.y = p.pointArr[2].y
		drawGrid()
	}

	this.getSnapShot = function()
	{
		return {x:p.x,y:p.y,width:p.width,height:p.height}
	}

	this.setAngleB = function(val)
	{
		p.AngleB = val
		createTrigPoints(p.hypotenuse * p.Unit)
	}

	this.getAngleB = function()
	{
		return parseFloat(Maths.getAngleBtn3(p.pointArr[1],p.pointArr[2],p.pointArr[0]).toFixed(2))
	}

	this.getTrignoData = function()
	{
		return {opp:p.opposite,hyp:p.hypotenuse,adj:p.adjacent}
	}

	this.checkAngle = function ()
	{
		p.angle_A = Maths.getAngleBtn3(p.pointArr[1],p.pointArr[2],p.pointArr[0]);
		p.angle_B = Maths.getAngleBtn3(p.pointArr[0],p.pointArr[2],p.pointArr[1]);
		p.angle_C = Maths.getAngleBtn3(p.pointArr[0],p.pointArr[1],p.pointArr[2]);
		if((p.angle_A >= 0 && p.angle_A <= 0.8) || (p.angle_B >= 0 && p.angle_B <= 0.8) || (p.angle_C >= 0 && p.angle_C <= 0.8))
		{
			return "notatriangle";
		}else
		if((Math.round(p.angle_A) > 90) || (Math.round(p.angle_B) > 90) || (Math.round(p.angle_C) > 90))
		{
				return "Obtuse" ;
		}
		else
		if((Math.round(p.angle_A) == 90) || (Math.round(p.angle_B) == 90) || (Math.round(p.angle_C) == 90))
		{
			return "Right" ;
		}else
		if(Math.round(p.angle_A + p.angle_B + p.angle_C) == 180)
		{
			return "Acute" ;
		}
	}

	this.checkSides = function ()
	{
		p.AB = Maths.getDistance(p.pointArr[0],p.pointArr[1]);
		p.AC = Maths.getDistance(p.pointArr[0],p.pointArr[2]);
		p.BC = Maths.getDistance(p.pointArr[1],p.pointArr[2]);
		// if((Math.round(p.AB) == 0) && (Math.round(p.AB) == 0) && (Math.round(p.AC) == 0))
		if((p.AB >= 0 && p.AB <= 1) || (p.AB >= 0 && p.AB <= 1) || (p.AC >= 0 && p.AC <= 1))
		{
			return "notatriangle";
		}
		else
		if((Math.round(p.AB) == Math.round(p.AC)) && (Math.round(p.AB) == Math.round(p.BC)) && (Math.round(p.AC) == Math.round(p.BC)))
		{
			if(Math.round(p.AB) != 0  &&  Math.round(p.AC !=0) && Math.round(p.BC) != 0)
				return "Equilateral";
		}else
		if((Math.round(p.AB) == Math.round(p.AC)) || (Math.round(p.AC) == Math.round(p.BC)) || (Math.round(p.AB) == Math.round(p.BC)))
		{
			if(p.threeSides || p.threeAngles)
				return "Equilateral";
			else
				return "Isosceles" ;
		}else
		{
				return "Scalene";
		}
	}

	this.getValue = function()
	{
		return {base:Base,height:Height,area:Area}
	}
	
	this.updateHyp = function(_val)
	{
		p.maxHyp = _val;
	}
	
	this.setCondition = function(_condition)
	{
		p.padding_H = p.ogPading ;
		p.flag=true;
		p.maxBase = p.defaultBase;
		p.noConditions = false;
		p.rightAngle = false;
		p.twoSides = false;
		p.twoAngles = false;
		p.threeSides = false;
		p.threeAngles = false;
		for(var i in p.pointArr)
			p.pointArr[i].showAngle = false;

		switch(_condition)
		{
			case "noCondition":
				p.noConditions = true;
			break;
			case "2sides":
				p.twoSides = true;
				p.pointArr[0].x = p.center.x;
				p.curSelectedPoint = 1
				isosceles(p.pointArr[1],p.pointArr[1])
			break;
			case "3sides":
				p.threeSides = true;
				p.padding_H = p.threePading;
				getEquilateral();
			break;
			case "1right":
				p.rightAngle = true;
				getRight();
				p.curSelectedPoint = 1
				rightAngle(p.pointArr[1],p.pointArr[1])
			break;
			case "2angles":
				p.twoAngles = true;
				p.pointArr[0].x = p.center.x;
				p.curSelectedPoint = 2
				isosceles(p.pointArr[2],p.pointArr[2])
				p.pointArr[1].showAngle=true;
				p.pointArr[2].showAngle=true;
			break;
			case "3angles":
				p.threeAngles = true;
				p.padding_H = p.threePading;
				for(var i in p.pointArr)
					p.pointArr[i].showAngle = true;
				getEquilateral();
			break;
		}
		drawOnCanvas();
	}

	this.changeColor = function(_arg)
	{
		p.colorType = _arg
		switch (_arg)
		{
			case 1:
				//blue
				p.pointLineColor = '#3B42BC'
				p.pointFillColor = '#D2D4FA'
				p.NonDragpointFillColor = '#7C85F8'

				p.lineColor = 'rgba(61, 48, 254, 1)'
				p.fillColor = '#AFB4FE'
				p.anglelineColor = "rgba(61, 48, 254, 1)"
				break;
			case 0:
				//pink
				p.pointLineColor = '#7928a2'
				p.pointFillColor = '#e4cbf1'
				p.NonDragpointFillColor = '#c791e2'

				p.lineColor = '#7928A2'
				p.fillColor = '#e0a3ff'
				p.anglelineColor = "#7928A2"
				break;
			case 2:
				//green
				p.pointLineColor = '#008557'
				p.pointFillColor = '#bee8d9'
				p.NonDragpointFillColor = '#76cfb0'

				p.lineColor = '#008557'
				p.fillColor = '#67efc0'
				p.anglelineColor = "#008557"
				break;
		}
		drawOnCanvas()
	}

	this.mouseEvent = function(e)
	{
		var mouseX = e.x;
		var mouseY = e.y;

		var _obj = new Object();
		if(e.type == "mousedown")
		{//console.log(e)
			p.curPointObj = getPointOnCanvas(mouseX,mouseY);
			
			
			if(p.curPointObj)
			{
				// console.log(p.pointArr[0].x + " :: " + p.pointArr[2].x + " :: " + p.Unit);
				
				p.curSelectedPoint = p.curPointObj.id;
				
				addPointerGrabbing(true);
				OldTouches.x = e.x;
				OldTouches.y = e.y;
				return true
			}
			else
			{
				p.curSelectedPoint = null;
				addPointerGrabbing(false);
				return false
			}
		}
		else if(e.type == "mousemove")
		{
			var dummy = getPointOnCanvas(mouseX,mouseY)

			if(p.curPointObj)
			{
				if(p.activityType == "classify")
					p.noConditions ? noCondition(p.curPointObj,e) : p.twoAngles || p.twoSides ? isosceles(p.curPointObj,e) : p.rightAngle ? rightAngle(p.curPointObj,e) : p.threeSides || p.threeAngles ? equilateral(p.curPointObj,e) : null
				else if(p.activityType == "trigonometry")
					trigonometry(p.curPointObj,e)
				else if(p.activityType == "area")
					irRegulartriangle(p.curPointObj,e)
				else if(p.activityType == "pythagorean" || p.activityType == "converse")
					pythagorean(p.curPointObj,e);
				drawOnCanvas();
			}
			if(dummy && (dummy.isAllowX || dummy.isAllowY))
			{
				$("body").addClass("commongrab")
				return true
			}
			else
			{
				$("body").removeClass("commongrab")
				dummy = null
				return false
			}
		}
		else if(e.type == "mouseup")
		{
			p.curPointObj = null;
			addPointerGrabbing(false);
			p.curSelectedPoint = null;
			dummy = null
		}
	}

	this.setShowSides = function(_bool)
	{
		p.showSquare = _bool;
		drawOnCanvas();
	}
	
	this.getSides = function()
	{
		var AB = Maths.getDistance(p.pointArr[1],p.pointArr[0]);
		var BC = Maths.getDistance(p.pointArr[0],p.pointArr[2]);
		var AC = Maths.getDistance(p.pointArr[1],p.pointArr[2]);
		var temp = new Array();
		temp.push(BC/p.Unit);
		temp.push(AC/p.Unit);
		temp.push(AB/p.Unit);
		return temp;
	}

	this.showValue = function(_bool)
	{
		p.showLabel = _bool;
		drawOnCanvas();		
	}
	
	this.showAngleLabel = function(_bool)
	{
		for(var i=0;i<p.pointArr.length;i++)
		{
			p.pointArr[i].showAngle = _bool;
			p.pointArr[i].showAngleLabel = _bool;
		}
		drawOnCanvas();
	}

	this.getPointArray = function ()
	{
		return p.pointArr;
	}
	
	// -------------------- Private Functions ------------------------
	
	function noCondition(thePointMoved,e)
	{
		switch (thePointMoved.id)
		{
			case 0:
				thePointMoved.x = e.x;
				thePointMoved.y = e.y;
				thePointMoved.y >= p.pointArr[1].y ? thePointMoved.y = p.pointArr[1].y : null
				checkBoundary(thePointMoved)
				findASnapPoint();
				setASnap(p.pointArr[0].x,p.pointArr[0].y);
				break;
			case 1:
				thePointMoved.x = e.x;
				if(thePointMoved.x >= p.center.x - (5*p.Unit/2))
				{
					thePointMoved.x = p.center.x - (5*p.Unit/2);
				}
				p.flag = true;
				if(Maths.getAngleBtn3(p.pointArr[0],p.pointArr[2],thePointMoved) > 57 && Maths.getAngleBtn3(p.pointArr[0],p.pointArr[2],thePointMoved) < 63)
				{
					var Ac = Maths.getDistance(p.pointArr[0],{x:p.pointArr[0].x,y:p.center.y})
					var d = Ac/Math.tan(60*Maths.TO_RADIANS);
					thePointMoved.x = p.pointArr[0].x - d
				}
				checkBoundary(thePointMoved)
				findBSnapPoint();
				setBSnap(p.pointArr[1].x);
				// p.pointArr[2].x = p.width - thePointMoved.x ;
				break;
			case 2:
				thePointMoved.x = e.x;
				if(thePointMoved.x <= p.center.x + (5*p.Unit/2))
				{
					thePointMoved.x = p.center.x + (5*p.Unit/2);
				}
				p.flag = true;
				if(Maths.getAngleBtn3(p.pointArr[0],p.pointArr[1],thePointMoved) > 57 && Maths.getAngleBtn3(p.pointArr[0],p.pointArr[1],thePointMoved) < 63)
				{
					var Ac = Maths.getDistance(p.pointArr[0],{x:p.pointArr[0].x,y:p.center.y})
					var d = Ac/Math.tan(60*Maths.TO_RADIANS);
					thePointMoved.x = p.pointArr[0].x + d
				}
				checkBoundary(thePointMoved)
				findCSnapPoint();
				setCSnap(p.pointArr[2].x);
				break;
		}
	}

	function isosceles(thePointMoved,e)
	{
		switch (thePointMoved.id)
		{
			case 0:;
				thePointMoved.y = e.y
				thePointMoved.y >= p.pointArr[1].y ? thePointMoved.y = p.pointArr[1].y : null
				checkBoundary(thePointMoved)
				findASnapPoint();
				setASnap(p.pointArr[0].x,p.pointArr[0].y);
				break;
			case 1:
				thePointMoved.x = e.x
				checkBoundary(thePointMoved)
				findBCSnapPoint();
				setBCSnap(p.pointArr[1].x);
				p.pointArr[2].x = p.width - thePointMoved.x ;
				break;
			case 2:
				thePointMoved.x = e.x
				checkBoundary(thePointMoved)
				findBCSnapPoint();
				setBCSnap(p.pointArr[2].x);
				p.pointArr[1].x = p.width - thePointMoved.x ;
				break;
		}
	}

	function rightAngle(thePointMoved,e)
	{
		switch (thePointMoved.id)
		{
			case 0:
				var angle = Math.abs(Maths.getAngle(p.center,e,true));
				var r = (Maths.getDistance(p.pointArr[1],p.pointArr[2]))/2
				thePointMoved.x = p.centerX - r * Math.cos(angle);
				thePointMoved.y = p.pointArr[thePointMoved.id + 1].y - r * Math.sin(angle);
				thePointMoved.y > p.pointArr[thePointMoved.id + 1].y ? thePointMoved.y = p.pointArr[thePointMoved.id + 1].y : null
				findASnapPoint();
				setASnap(p.pointArr[0].x,p.pointArr[0].y);
				break;
			case 1:
				thePointMoved.x = e.x
				checkBoundary(thePointMoved)
				p.pointArr[2].x = p.width - thePointMoved.x ;
				getRight()
				findASnapPoint();
				setASnap(p.pointArr[0].x,p.pointArr[0].y);
				break;
			case 2:
				thePointMoved.x = e.x
				checkBoundary(thePointMoved)
				p.pointArr[1].x = p.width - thePointMoved.x ;
				getRight()
				findASnapPoint();
				setASnap(p.pointArr[0].x,p.pointArr[0].y);
				break;
		}
	}

	function equilateral(thePointMoved,e)
	{
		// console.log("Case : " + thePointMoved.id)
		switch (thePointMoved.id)
		{
			case 0:
				thePointMoved.y = e.y;
				thePointMoved.y >= p.pointArr[1].y ? thePointMoved.y = p.pointArr[1].y - (e.y - p.pointArr[1].y) : null
				checkBoundary(thePointMoved)
				calculateEQ();				
				break;
			case 1:
				thePointMoved.x = e.x;
				checkBoundary(thePointMoved)
				p.pointArr[2].x = p.width - thePointMoved.x ;
				checkBoundary(p.pointArr[2])
				p.pointArr[0].y = thePointMoved.y - Math.sin(60*Maths.TO_RADIANS)*(Maths.getDistance(p.pointArr[1],p.pointArr[2]))
				break;
			case 2:
				thePointMoved.x = e.x;
				checkBoundary(thePointMoved)
				p.pointArr[1].x = p.width - thePointMoved.x;
				checkBoundary(p.pointArr[1])
				p.pointArr[0].y = thePointMoved.y - Math.sin(60*Maths.TO_RADIANS)*(Maths.getDistance(p.pointArr[1],p.pointArr[2]))
				break;
		}
	}

	function irRegulartriangle(thePointMoved,e)
	{
		if(thePointMoved.isAllowX)
		{
			if(Math.abs(OldTouches.x - e.x) >= p.Unit/10)
			{
				var tempX = Number(e.x.toFixed(0))
				tempX = Math.round(tempX * 10/p.Unit) * p.Unit/10
				thePointMoved.x = tempX
				if(thePointMoved.id == 1)
				{
					if(thePointMoved.x < p.pointArr[2].x + 2*p.Unit)
						thePointMoved.x = p.pointArr[2].x + 2*p.Unit
				}
				else if(thePointMoved.id == 2)
				{
					if(thePointMoved.x > p.pointArr[1].x - 2*p.Unit)
						thePointMoved.x = p.pointArr[1].x - 2*p.Unit
				}
				if(thePointMoved.x >= p.centerX + 7*p.Unit)
					thePointMoved.x = p.centerX + 7*p.Unit
				if(thePointMoved.x <= p.centerX - 7*p.Unit)
					thePointMoved.x = p.centerX - 7*p.Unit
				OldTouches.x = thePointMoved.x
			}
		}
		if(thePointMoved.isAllowY)
		{
			if(Math.abs(OldTouches.y - e.y) >= p.Unit/10)
			{
				var tempY = Number(e.y.toFixed(0))
				tempY = Math.round(tempY * 10/p.Unit) * p.Unit/10
				thePointMoved.y = tempY
				if(thePointMoved.id == 0)
				{
					if(thePointMoved.y > p.pointArr[thePointMoved.id + 1].y - 2*p.Unit)
						thePointMoved.y = p.pointArr[thePointMoved.id + 1].y - 2*p.Unit
					if(thePointMoved.y < p.pointArr[thePointMoved.id + 1].y - 7*p.Unit)
						thePointMoved.y = p.pointArr[thePointMoved.id + 1].y - 7*p.Unit
				}
				OldTouches.y = thePointMoved.y
			}
		}
		checkBoundary(thePointMoved)
		calculateAreaData()
	}

	function trigonometry(thePointMoved,e)
	{
		switch (thePointMoved.id)
		{
			case 1:
			//Snapping has to be done in gizmo 286---//////////////////////////////////////////////
			//-----------------------------------------------------------------------------------//
				var angle = Maths.getAngle(p.pointArr[0],e,false);
				angle <= 0 ? angle = 180 : angle <= 90 ? angle = 90 : null
				var angle2 = Maths.getAngle(p.pointArr[0],p.pointArr[1],false)
				var diff = (angle - angle2)/Math.abs(angle - angle2)
				if(p.isBRadial)
				{
					getBInTrig(angle)
					// var r = (Maths.getDistance(p.pointArr[0],p.pointArr[1]))
					// thePointMoved.x = p.pointArr[0].x - r * Math.cos(angle*Maths.TO_RADIANS);
					// thePointMoved.x <= p.pointArr[0].x ? thePointMoved.x = p.pointArr[0].x : thePointMoved.y = p.pointArr[thePointMoved.id + 1].y - r * Math.sin(angle*Maths.TO_RADIANS);
				}
				else
				{
					thePointMoved.isAllowY ? thePointMoved.y = e.y/* p.pointArr[0].y - r * Math.sin((angle2+diff)*Maths.TO_RADIANS) */ : null;
					thePointMoved.isAllowX ? thePointMoved.x = e.x/* p.pointArr[0].x - r * Math.cos((angle2+diff)*Maths.TO_RADIANS) */ : null;
					thePointMoved.x <= p.pointArr[0].x ? thePointMoved.x = p.pointArr[0].x : null
					thePointMoved.y >= p.pointArr[0].y ? thePointMoved.y = p.pointArr[0].y : null
					p.Hyp = inUnit(Maths.getDistance(thePointMoved,p.pointArr[0]))//in Unit
					if(p.Hyp >= p.maxHyp/*  * p.Unit */)//in Unit
					{
						var angle = Maths.getAngle(p.pointArr[0],p.pointArr[1])
						getBInTrig(angle)
						p.Hyp = p.maxHyp/*  * p.Unit */
						// p.pointArr[1].x = p.pointArr[0].x - p.maxHyp * Math.cos(angle*Maths.TO_RADIANS);
						// p.pointArr[1].y = p.pointArr[0].y - p.maxHyp * Math.sin(angle*Maths.TO_RADIANS);
					}
				}
				p.pointArr[2].x = thePointMoved.x

				break;
			case 2:
				thePointMoved.isAllowX ? thePointMoved.x = e.x : null;
				thePointMoved.isAllowY ? thePointMoved.y = e.y : null;
				thePointMoved.x <= p.pointArr[0].x + 2 ? thePointMoved.x = p.pointArr[0].x + 2 : null
				var angle = Maths.getAngle(p.pointArr[0],p.pointArr[1])
				p.adj = inUnit(Maths.getDistance(thePointMoved,p.pointArr[0]))//in Unit
				p.Hyp = p.adj / Math.cos(Math.PI - angle*Maths.TO_RADIANS)//in Unit
				if(p.Hyp <= p.maxHyp/*  * p.Unit */)//in Unit
				{
					p.pointArr[1].x = p.pointArr[0].x - inPixel(p.Hyp) * Math.cos(angle*Maths.TO_RADIANS);
					p.pointArr[1].y = p.pointArr[0].y - inPixel(p.Hyp) * Math.sin(angle*Maths.TO_RADIANS);
				}
				else
				{
					// console.clear()
					// console.log(p.maxHyp/p.Unit+" : maxHyp")
					// console.log(p.Hyp/p.Unit+" : Hyp")
					p.pointArr[1].x = p.pointArr[0].x - inPixel(p.maxHyp)/*  * p.Unit */ * Math.cos(angle*Maths.TO_RADIANS);
					p.pointArr[1].y = p.pointArr[0].y - inPixel(p.maxHyp)/* * p.Unit */ * Math.sin(angle*Maths.TO_RADIANS);
					p.adj = /* Maths.getDistance(p.pointArr[0],p.pointArr[1]) */p.maxHyp * Math.cos(Math.PI - angle*Maths.TO_RADIANS)
					p.pointArr[2].x = p.pointArr[0].x + inPixel(p.adj)
					//p.Hyp =

				}
				break;
		}
	}

	function pythagorean(thePointMoved,e)
	{
		// console.log(Math.abs(OldTouches.x - e.x) + " :: "  + p.Unit)
		if(thePointMoved.isAllowX)
		{
			if(Math.abs(OldTouches.x - e.x) >= p.Unit)
			{
				if(thePointMoved.id == 0)
				{
					var tempX = Number(e.x.toFixed(0))
					tempX = Math.round(tempX * 1/p.Unit) * p.Unit
					thePointMoved.x = tempX
					if(p.activityType == "pythagorean")
					{
						if(thePointMoved.x >= p.pointArr[2].x - (p.minBase*p.Unit))
						{
							thePointMoved.x = p.pointArr[2].x - (p.minBase*p.Unit);
						}
						if(thePointMoved.x <= p.pointArr[2].x - (p.maxBase*p.Unit))
						{
							thePointMoved.x = p.pointArr[2].x - (p.maxBase*p.Unit)
						}
						checkBoundary(thePointMoved);
						var d = (Math.round(Maths.getDistance(p.pointArr[0],p.pointArr[2])/p.Unit))
						var pt = Maths.getPoint(p.pointArr[2],180*Maths.TO_RADIANS,d*p.Unit)
						p.pointArr[0].x = pt.x
						p.pointArr[2].y = thePointMoved.y;
					}
					else if(p.activityType == "converse")
					{
						thePointMoved.x = e.x;
						if(thePointMoved.y >= p.pointArr[2].y - (p.minHeight*p.Unit))
						{
							thePointMoved.y = p.pointArr[2].y - (p.minHeight*p.Unit);
						}
						if(thePointMoved.x <= p.pointArr[1].x - (p.maxBase*p.Unit))
						{
							thePointMoved.x = p.pointArr[1].x - (p.maxBase*p.Unit)
						}
						if(thePointMoved.x >= p.pointArr[2].x + (p.maxBase*p.Unit))
						{
							thePointMoved.x = p.pointArr[2].x + (p.maxBase*p.Unit)
						}
						findASnapPoint();
						setASnap(thePointMoved.x,thePointMoved.y)
						checkBoundary(thePointMoved);
						if(thePointMoved.x % p.Unit != 0 )
						{
							// thePointMoved.x = thePointMoved.x - thePointMoved.x%p.Unit;
						}
					}
				}
				else if(thePointMoved.id == 2)
				{					
					var tempX = Number(e.x.toFixed(0))
					tempX = Math.round(tempX * 1/p.Unit) * p.Unit;
					thePointMoved.x = tempX

					if(p.activityType == "pythagorean")
					{
						checkBoundary(thePointMoved);
						if(thePointMoved.x >= p.center.x+(2*p.padding_H))
						if(thePointMoved.x % p.Unit != 0 )
						{
							thePointMoved.x = thePointMoved.x - thePointMoved.x%p.Unit;
						}					
						if(thePointMoved.y <= p.pointArr[1].y + (p.minHeight*p.Unit))
						{
							thePointMoved.y = p.pointArr[1].y + (p.minHeight*p.Unit);
						}						
						if(thePointMoved.x <= p.pointArr[0].x + (p.minBase*p.Unit)) //this is change
						{
							thePointMoved.x = p.pointArr[0].x + (p.minBase*p.Unit);
						}
						if(thePointMoved.x >= p.pointArr[0].x + (p.maxBase*p.Unit))
						{
							thePointMoved.x = p.pointArr[0].x + (p.maxBase*p.Unit)
						}
						if(thePointMoved.x >= p.pointArr[0].x + (p.maxBase*p.Unit))
						{
							thePointMoved.x = p.pointArr[0].x + (p.maxBase*p.Unit)
						}
						var d = (Math.round(Maths.getDistance(p.pointArr[2],p.pointArr[0])/p.Unit))
						var pt = Maths.getPoint(p.pointArr[0],0,d*p.Unit)
						p.pointArr[2].x = pt.x
						p.pointArr[2].y = pt.y
						p.pointArr[1].x  = thePointMoved.x;
					}
					else if(p.activityType == "converse")
					{	
						if(thePointMoved.y <= p.pointArr[0].y + (p.minHeight*p.Unit))
						{
							thePointMoved.y = p.pointArr[0].y + (p.minHeight*p.Unit);
						}
						if(thePointMoved.x >= p.center.x - (p.minBase*p.Unit)/2)
						{
							thePointMoved.x = p.center.x - (p.minBase*p.Unit)/2;
						}
						if(thePointMoved.x <= p.pointArr[1].x - (p.maxBase*p.Unit))
						{
							thePointMoved.x = p.pointArr[1].x - (p.maxBase*p.Unit)
						}
						checkBoundary(thePointMoved);
						moveA(thePointMoved);
						p.pointArr[1].y = thePointMoved.y;		
					}
				}else if(thePointMoved.id == 1)
				{				
					var tempX = Number(e.x.toFixed(0))
					tempX = Math.round(tempX * 1/p.Unit) * p.Unit
					thePointMoved.x = tempX
					checkBoundary(thePointMoved);
					if(thePointMoved.x >= p.center.x+(2*p.padding_H))
					if(thePointMoved.x % p.Unit != 0 )
					{
						thePointMoved.x = thePointMoved.x - thePointMoved.x%p.Unit;
					}
					if(p.activityType == "pythagorean")
					{
						if(thePointMoved.x <= p.pointArr[0].x + (p.minBase*p.Unit)) //  this is change
						{
							thePointMoved.x = p.pointArr[0].x + (p.minBase*p.Unit);
						}
						if(thePointMoved.x >= p.pointArr[0].x + (p.maxBase*p.Unit))
						{
							thePointMoved.x = p.pointArr[0].x + (p.maxBase*p.Unit)
						}
						if(thePointMoved.x >= p.pointArr[0].x + (p.maxBase*p.Unit))
						{
							thePointMoved.x = p.pointArr[0].x + (p.maxBase*p.Unit)
						}
						p.pointArr[2].x = thePointMoved.x;	
						var d = (Math.round(Maths.getDistance(p.pointArr[2],p.pointArr[0])/p.Unit))
						var pt = Maths.getPoint(p.pointArr[2],Math.PI,d*p.Unit)
						p.pointArr[0].x = pt.x
					}
					else  if(p.activityType == "converse")
					{
						if(thePointMoved.x <= p.center.x + (p.minBase*p.Unit)/2)
						{
							thePointMoved.x = p.center.x + (p.minBase*p.Unit)/2;
						}
						if(thePointMoved.x >= p.pointArr[2].x + (p.maxBase*p.Unit))
						{
							thePointMoved.x = p.pointArr[2].x + (p.maxBase*p.Unit)
						}
						if(thePointMoved.x >= p.pointArr[2].x + (p.maxBase*p.Unit))
						{
							thePointMoved.x = p.pointArr[2].x + (p.maxBase*p.Unit)
						}
						checkBoundary(thePointMoved);
						if(thePointMoved.x % p.Unit != 0 )
						{
							thePointMoved.x = thePointMoved.x - thePointMoved.x%p.Unit;
						}
						moveA(thePointMoved);
						p.pointArr[2].y = thePointMoved.y;	
					}
				}
				if(p.activityType != "converse" && thePointMoved.id != 0)
					OldTouches.x = thePointMoved.x
			}
		}		
		if(thePointMoved.isAllowY)
		{
			if(Math.abs(OldTouches.y - e.y) >= p.Unit/5)
			{
				if(thePointMoved.id == 0)
				{
					var tempY = Number(e.y.toFixed(0))
					tempY = Math.round(tempY * 5/p.Unit) * p.Unit/5
					thePointMoved.y = tempY
					if(p.activityType == "pythagorean")
					{
						if(thePointMoved.y <= p.pointArr[1].y + (p.minHeight*p.Unit))
						{
							thePointMoved.y = p.pointArr[1].y + (p.minHeight*p.Unit);
						}			
						if(thePointMoved.y >= p.pointArr[1].y + (p.maxHeight*p.Unit))
						{
							thePointMoved.y = p.pointArr[1].y + (p.maxHeight*p.Unit)
						}
						checkBoundary(thePointMoved);
						p.pointArr[2].y = thePointMoved.y;
						var d = Maths.getDistance(p.pointArr[2],p.pointArr[1])/p.Unit
						d = (d - (d%0.2))
						if(d<p.minHeight) 
							d = p.minHeight
						var pt = Maths.getPoint({x:thePointMoved.x,y:p.pointArr[1].y},90*Maths.TO_RADIANS,d * p.Unit)
						thePointMoved.y = pt.y
						p.pointArr[2].y = thePointMoved.y;
						checkBoundary(thePointMoved);
					}
					else if(p.activityType == "converse")
					{
						if(thePointMoved.y >= p.pointArr[2].y - (p.minHeight*p.Unit))
						{
							thePointMoved.y = p.pointArr[2].y - (p.minHeight*p.Unit);
						}		
						if(thePointMoved.y <= p.pointArr[2].y - (p.maxHeight*p.Unit))
						{
							thePointMoved.y = p.pointArr[2].y - (p.maxHeight*p.Unit)
						}
						findASnapPoint();
						setASnap(thePointMoved.x,thePointMoved.y)
						checkBoundary(thePointMoved);
					}
				}
				else if(thePointMoved.id == 2)
				{					
					var tempY = Number(e.y.toFixed(0))
					tempY = Math.round(tempY * 5/p.Unit) * p.Unit/5
					thePointMoved.y = tempY

					if(p.activityType == "pythagorean")
					{
						if(thePointMoved.y <= p.pointArr[1].y + (p.minHeight*p.Unit))
						{
							thePointMoved.y = p.pointArr[1].y + (p.minHeight*p.Unit);
						}
						if(thePointMoved.y >= p.pointArr[1].y + (p.maxHeight*p.Unit))
						{
							thePointMoved.y = p.pointArr[1].y + (p.maxHeight*p.Unit)
						}
						var d = Maths.getDistance(thePointMoved,p.pointArr[1])/p.Unit
						d = (d - (d%0.2))
						if(d<p.minHeight) 
							d = p.minHeight
						var pt = Maths.getPoint(p.pointArr[1],90*Maths.TO_RADIANS,d*p.Unit)
						thePointMoved.y = pt.y
						checkBoundary(thePointMoved);
						// pythagorean(p.pointArr[1],p.pointArr[1])
						p.pointArr[0].y = thePointMoved.y;
					}
					else if(p.activityType == "converse")
					{	
						if(thePointMoved.y <= p.pointArr[0].y + (p.minHeight*p.Unit))
						{
							thePointMoved.y = p.pointArr[0].y + (p.minHeight*p.Unit);
						}
						if(thePointMoved.y >= p.pointArr[0].y + (p.maxHeight*p.Unit))
						{
							thePointMoved.y = p.pointArr[0].y + (p.maxHeight*p.Unit)
						}
						checkBoundary(thePointMoved);
						moveA(thePointMoved);
						p.pointArr[1].y = thePointMoved.y;		
					}
				}else if(thePointMoved.id == 1)
				{
					var tempY = Number(e.y.toFixed(0))
					tempY = Math.round(tempY * 5/p.Unit) * p.Unit/5
					thePointMoved.y = tempY
					
					if(p.activityType == "pythagorean")
					{
						if(thePointMoved.y >= p.pointArr[2].y - (p.minHeight*p.Unit))
						{
							thePointMoved.y = p.pointArr[2].y - (p.minHeight*p.Unit);
						}	
						if(thePointMoved.y <= p.pointArr[2].y - (p.maxHeight*p.Unit))
						{
							thePointMoved.y = p.pointArr[2].y - (p.maxHeight*p.Unit)
						}
						var d = Maths.getDistance(thePointMoved,p.pointArr[2])/p.Unit
						d = (d - (d%0.2))
						if(d<p.minHeight) 
							d = p.minHeight
						var pt = Maths.getPoint(p.pointArr[2],-90*Maths.TO_RADIANS,d*p.Unit)
						thePointMoved.y = pt.y
						checkBoundary(thePointMoved);
					}
					else  if(p.activityType == "converse")
					{
						if(thePointMoved.y <= p.pointArr[0].y + (p.minHeight*p.Unit))
						{
							thePointMoved.y = p.pointArr[0].y + (p.minHeight*p.Unit);
						}
						if(thePointMoved.y >= p.pointArr[0].y + (p.maxHeight*p.Unit))
						{
							thePointMoved.y = p.pointArr[0].y + (p.maxHeight*p.Unit)
						}
						checkBoundary(thePointMoved);
						p.pointArr[2].y = thePointMoved.y;	
					}
				}
				OldTouches.y = thePointMoved.y
			}
		}
	}
	
	function calcTrignoData()
	{
		p.opposite = (Maths.getDistance(p.pointArr[1],p.pointArr[2])/p.Unit).toFixed(4)
		p.opposite = parseFloat(p.opposite)// * 10 % 10 == 0 ? p.opposite = (p.opposite * 10) / 10 : p.opposite * 100 % 10 == 0 ? p.opposite = (p.opposite * 100) / 100 : null
		p.hypotenuse = (Maths.getDistance(p.pointArr[1],p.pointArr[0])/p.Unit).toFixed(4)
		p.hypotenuse = parseFloat(p.hypotenuse)//* 10 % 10 == 0 ? p.hypotenuse = (p.hypotenuse * 10) / 10 : p.hypotenuse * 100 % 10 == 0 ? p.hypotenuse = (p.hypotenuse * 100) / 100 : null
		p.adjacent = (Maths.getDistance(p.pointArr[0],p.pointArr[2])/p.Unit).toFixed(4)
		p.adjacent = parseFloat(p.adjacent)//* 10 % 10 == 0 ? p.adjacent = (p.adjacent * 10) / 10 : p.adjacent * 100 % 10 == 0 ? p.adjacent = (p.adjacent * 100) / 100 : null

	}

	function getBInTrig(_angle)
	{
		var radius = (Maths.getDistance(p.pointArr[0],p.pointArr[1]))
		radius >= inPixel(p.maxHyp)/*  * p.Unit */ ? radius = inPixel(p.maxHyp)/*  * p.Unit */ : null
		p.pointArr[1].x = p.pointArr[0].x - radius * Math.cos(_angle*Maths.TO_RADIANS);
		/* p.pointArr[1].x <= p.pointArr[0].x ? p.pointArr[1].x = p.pointArr[0].x :  */p.pointArr[1].y = p.pointArr[0].y - radius * Math.sin(_angle*Maths.TO_RADIANS);

	}

	function inPixel(_arg)
	{
		return _arg * p.Unit
	}
	
	function inUnit(_arg)
	{
		return _arg / p.Unit
	}
	
	function createCanvas()
	{
	
		p.canvasSquare = document.createElement("canvas");
		p.contextSquare = p.canvasSquare.getContext("2d");
		p.canvasSquare.setAttribute("width",p.width);
		p.canvasSquare.setAttribute("height",p.height);
		$(p.canvasSquare).addClass("canvasSquare"+p.id);
		
		p.target.css({"position":"absolute"})
		p.target.append(p.canvasSquare)
		$(p.canvasSquare).css({
						"position":"absolute",
						"left":p.x+"px",
						"top":p.y+"px",
						});
	
	
		p.canvas = document.createElement("canvas");
		p.ctx = p.canvas.getContext("2d");
		p.canvas.setAttribute("width",p.width);
		p.canvas.setAttribute("height",p.height);
		$(p.canvas).addClass("canvas"+p.id)

		p.target.css({"position":"absolute"})
		p.target.append(p.canvas)
		$(p.canvas).css({"position":"absolute",
						"left":p.x+"px",
						"top":p.y+"px",
						})

		p.canvasGrid = document.createElement("canvas");
		p.contextGrid = p.canvasGrid.getContext("2d");
		p.canvasGrid.setAttribute("width",p.width);
		p.canvasGrid.setAttribute("height",p.height);
		p.target.append(p.canvasGrid)
		$(p.canvasGrid).addClass("canvasGrid"+p.id)
		$(p.canvasGrid).css({"position":"absolute",
						"left":p.x+"px",
						"top":p.y+"px",
						})

		p.canvasLabel = document.createElement("canvas");
		p.contextLabel = p.canvasLabel.getContext("2d");
		p.canvasLabel.setAttribute("width",p.width);
		p.canvasLabel.setAttribute("height",p.height);
		p.target.append(p.canvasLabel)
		$(p.canvasLabel).addClass("canvasLabel"+p.id)
		$(p.canvasLabel).css({"position":"absolute",
						"left":p.x+"px",
						"top":p.y+"px",
						})
		if(p.index)
		{
			$(p.canvas).css({"z-index":p.index})
			$(p.canvasSquare).css({"z-index":p.index})
		}
		if(p.labelIndex)
		{
			$(p.canvasLabel).css({"z-index":p.labelIndex})
			$(p.canvasGrid).css({"z-index":p.labelIndex})
		}
	}

	function createPoints()
	{
		p.pointArr = new Array();
		var pt = p.minHeight * p.Unit/2;
		var d = 1;
		for(var i=0;i<p.maxPoints;i++)
		{
			var curAngle = i * 180.0 - p.defaultAngle;
			var temp = angleToVector(curAngle).multiplyEq(pt/d);
			var tempObj = new Object();
			tempObj.x = temp.x + p.centerX;
			tempObj.y = temp.y + p.center.y;

			p.pointArr[i] = new Vector(tempObj.x,tempObj.y);
			p.pointArr[i].id = i;
			p.pointArr[i].isAllowX = true
			p.pointArr[i].isAllowY = true
			p.pointArr[i].showAngle = false;
			p.defaultAngle = 0;
			pt = p.minBase * p.Unit/2;
			d = 2;
		}
		p.angle_A = Maths.getAngleBtn3(p.pointArr[1],p.pointArr[2],p.pointArr[0]);
		p.angle_B = Maths.getAngleBtn3(p.pointArr[0],p.pointArr[2],p.pointArr[1]);
		p.angle_C = Maths.getAngleBtn3(p.pointArr[0],p.pointArr[1],p.pointArr[2]);
		drawOnCanvas();
	}

	function createTrigPoints(_hyp)
	{
		p.pointArr = new Array();
		
		var tempObj = new Vector((p.centerX*0.5).toFixed(5)*1,(p.centerY*1.6).toFixed(5)*1);
		tempObj.id = p.pointArr.length;
		tempObj.isAllowX = false
		tempObj.isAllowY = false
		tempObj.showAngle = true
		tempObj.showAngleLabel = true
		p.pointArr.push(tempObj);
		
		temp = angleToVector(-p.AngleB).multiplyEq(_hyp);
		tempObj = new Vector((temp.x + p.pointArr[0].x).toFixed(5)*1,(temp.y + p.pointArr[0].y).toFixed(5)*1);
		tempObj.id = p.pointArr.length;		
		tempObj.isAllowX = true
		tempObj.isAllowY = true
		tempObj.showAngle = false
		p.pointArr.push(tempObj);

		tempObj = new Vector((p.pointArr[1].x).toFixed(5)*1,(p.pointArr[0].y).toFixed(5)*1);
		tempObj.id = p.pointArr.length;
		tempObj.isAllowX = true
		tempObj.isAllowY = false		
		tempObj.showAngle = true
		p.pointArr.push(tempObj);		
		drawOnCanvas()
	}

	function createPythaPoints()
	{
		p.pointArr = new Array();

		var x = getRandomNum(5,6)/10.5
		var y = getRandomNum(13,16)/11;
		var tempObj = new Vector(Math.round(p.centerX*x),Math.round(p.centerY*y));
		var tempY = tempObj.y;
		tempY = Math.round(tempY * 5/p.Unit) * p.Unit/5
		tempObj.y = Math.round(tempY)
		tempObj.id = p.pointArr.length;
		tempObj.isAllowX = true
		tempObj.isAllowY = true
		tempObj.showAngle = false
		tempObj.showAngleLabel = false
		p.pointArr.push(tempObj);
		// console.log(p.pointArr)
		
		
		var pt = Maths.getPoint(p.pointArr[0],0,p.defaultBase*p.Unit)
		tempObj = new Vector(pt.x,pt.y)
		tempObj.x = p.pointArr[0].x + p.defaultBase*p.Unit;
		tempObj.y = p.pointArr[0].y;
		tempObj.id = 2
		tempObj.isAllowX = true
		tempObj.isAllowY = true
		tempObj.showAngle = false
		tempObj.showAngleLabel = false
		p.pointArr[2] = tempObj;
		
		
		var obj = Maths.getPoint(p.pointArr[0],-36.86*Maths.TO_RADIANS,p.maxHyp*p.Unit)
		tempObj = new Vector(obj.x,obj.y)
		tempObj.id = 1
		
		tempObj.x = p.pointArr[2].x;
		tempObj.y = p.pointArr[2].y  - p.defaultHeight*p.Unit;
		
		tempObj.isAllowX = true
		tempObj.isAllowY = true
		tempObj.showAngle = false
		tempObj.showAngleLabel = false
		p.pointArr[1] = tempObj;
		
		
	
	
		// for(var i=0;i<p.pointArr.length;i++)
		// {
			/* pythagorean(p.pointArr[0],p.pointArr[0])
			//console.log(d)
			var pt = Maths.getPoint(p.pointArr[0],0,d)
			/* p.pointArr[2].x = pt.x
			p.pointArr[2].y = pt.y 
			pythagorean(p.pointArr[2],pt) */
		// }
		drawOnCanvas()
	}
	
	function createIrregularPoints()
	{
		p.pointArr = new Array()
		var tempObj = new Object()

		var rand = Math.round(getRandomNum(p.centerX - 5*p.Unit,p.centerX)/p.Unit) * p.Unit//) * p.Unit/10
		tempObj = new Vector(rand,Math.round((p.centerY - p.Unit)/p.Unit)* p.Unit)
		tempObj.id = 2
		tempObj.isAllowX = true
		tempObj.isAllowY = false
		p.pointArr.push(tempObj)

		tempObj = new Object()
		rand = Math.round(getRandomNum((p.pointArr[0].x + 2 * p.Unit)/p.Unit,(p.centerX + 5*p.Unit)/p.Unit))*p.Unit// * p.Unit/10
		tempObj = new Vector(rand,Math.round((p.centerY - p.Unit)/p.Unit)* p.Unit)
		tempObj.id = 1
		tempObj.isAllowX = true
		tempObj.isAllowY = false
		p.pointArr.push(tempObj)

		tempObj = new Object()
		rand = Math.round(getRandomNum((p.centerX - 5*p.Unit),(p.centerX + 5*p.Unit))/p.Unit)*p.Unit// * 10/p.Unit) * p.Unit/10
		tempObj = new Vector(rand,0)
		rand = Math.round(getRandomNum(p.padding_V/p.Unit,(p.centerY - 3 * p.Unit)/p.Unit)) * p.Unit// * p.Unit/10
		tempObj = new Vector(tempObj.x,rand)
		tempObj.id = 0
		tempObj.isAllowX = true
		tempObj.isAllowY = true
		p.pointArr.push(tempObj)

		p.pointArr.reverse()
		calculateAreaData()
		drawOnCanvas()
	}

	function createConversePoints()
	{
		p.pointArr = new Array()
		var tempObj = new Object()

		var randX = Math.round(getRandomNum(p.padding_H/p.Unit,(p.centerX - p.minBase)/p.Unit)) * p.Unit//) * p.Unit/10
		var randY = Math.round(getRandomNum((p.centerY - 2.5*p.minHeight)/p.Unit,(p.height - p.padding_V)/p.Unit)) * p.Unit
		tempObj = new Vector(randX,randY)
		tempObj.id = 2
		tempObj.isAllowX = true
		tempObj.isAllowY = true
		p.pointArr.push(tempObj)

		tempObj = new Object()
		randX = Math.round(getRandomNum((p.centerX + 3*p.minBase)/p.Unit,(p.canvas.width - p.padding_H)/p.Unit))*p.Unit// * p.Unit/10
		randX -= globalResizeCalc(10)
		if(randX >= p.pointArr[0].x + (p.maxBase*p.Unit))
		{
			randX = p.pointArr[0].x + (p.maxBase*p.Unit)
		}
		tempObj = new Vector(randX,randY)
		tempObj.id = 1
		tempObj.isAllowX = true
		tempObj.isAllowY = true
		p.pointArr.push(tempObj)

		tempObj = new Object()
		randX = Math.round(getRandomNum(p.pointArr[0].x,p.pointArr[1].x))// * 10/p.Unit) * p.Unit/10
		randY = Math.round(getRandomNum(p.padding_V/p.Unit,(p.centerY - 3 * p.Unit)/p.Unit)) * p.Unit// * p.Unit/10
		if(randY <= p.pointArr[1].y - (p.maxHeight*p.Unit))
		{
			randY = p.pointArr[1].y - (p.maxHeight*p.Unit)
		}
		tempObj = new Vector(randX,randY)
		// tempObj = new Vector(tempObj.x,randY)
		tempObj.id = 0
		tempObj.isAllowX = true
		tempObj.isAllowY = true
		p.pointArr.push(tempObj)

		p.pointArr.reverse();
		
		var dist = Maths.getDistance(p.pointArr[1],p.pointArr[2])
		dist = dist/p.Unit < 15 ? 15*p.Unit : dist
		var pt = Maths.getPoint(p.pointArr[2],0,dist)
		p.pointArr[1].x = pt.x
		
		var dist = Maths.getDistance(p.pointArr[2],p.pointArr[0])
		dist = dist/p.Unit < 15 ? 15*p.Unit : dist
		var pt = Maths.getPoint(p.pointArr[2],Maths.getAngle(p.pointArr[0],p.pointArr[2],true),dist)
		p.pointArr[0].x = pt.x
		p.pointArr[0].y = pt.y
		
		var dist = Maths.getDistance(p.pointArr[1],p.pointArr[0])
		dist = dist/p.Unit < 15 ? 15*p.Unit : dist
		var pt = Maths.getPoint(p.pointArr[1],Maths.getAngle(p.pointArr[0],p.pointArr[1],true),dist)
		p.pointArr[0].x = pt.x
		p.pointArr[0].y = pt.y
		
		drawOnCanvas()
		
		if(p.pointArr)
		for(var i=0;i<p.pointArr.length;i++)
		{
			pythagorean(p.pointArr[i],p.pointArr[i]);
		}
	}
	
	function calculateAreaData()
	{
		var theta = Maths.getAngleBtn3(p.pointArr[2],p.pointArr[0],p.pointArr[1])
		if(theta == 90)
		{
			p.heightInPx = (Maths.getDistance(p.pointArr[0],p.pointArr[1])).toFixed(1)
		}
		else if(theta > 90)
		{
			theta = Math.PI * Maths.TO_DEGREES - theta
			p.heightInPx = Maths.getDistance(p.pointArr[0],p.pointArr[1]) * Math.sin(theta*Maths.TO_RADIANS)
		}
		else
		{
			p.heightInPx = Maths.getDistance(p.pointArr[0],p.pointArr[1]) * Math.sin(theta*Maths.TO_RADIANS)
		}
		p.baseInPx = (Maths.getDistance(p.pointArr[2],p.pointArr[1])).toFixed(1)
		Base = inUnit(p.baseInPx/*/ p.Unit */).toFixed(1)
		Height = inUnit(p.heightInPx/* /p.Unit */).toFixed(1)
		Area = (Base * Height).toFixed(1)
		Base = parseFloat(Base)//* 10 % 10 == 0 ? Base = (Base * 10) / 10 : null
		Height = parseFloat(Height)//* 10 % 10 == 0 ? Height = (Height * 10) / 10 : null
		Area = parseFloat(Area)//* 10 % 10 == 0 ? Area = (Area * 10) / 10 : null
	}

	function angleToVector(a)
	{
		var a = Maths.degreesToRadians(a)
		return new Vector(Math.cos(a),Math.sin(a))
	}
	
	function drawLengthLabel(p1,p2,tF)
	{
		var _temp = Maths.getMidPoint(p1,p2)
		
		var x1 = _temp.x
		var y1 = _temp.y
		var text;
		var makeLableHide = false
		if(typeof(tF) == "string")
		{
			text = tF;
			if(!isNaN(text))
			{
				p.contextLabel.font = p.rectFont+'pt Arial';
				text = Number(text)
			}
			else
				p.contextLabel.font = 'italic ' + p.rectFont+'pt Arial';
			if(!isNaN(text))
				p.contextLabel.font = p.rectFont+'pt Arial';
			else
				p.contextLabel.font = 'italic ' + p.rectFont+'pt Arial';
		}
		else
		{
		// console.log(p1)
		// console.log(p2)
		var d = ((Maths.getDistance(p1,p2)).noExponents()*1).toFixed(tF)*1
			text = Maths.getRound(d/p.Unit,tF)*1
			if(p.activityType == "pythagorean" || p.activityType == "converse")
				text = text*1
			
			if(text*1 == 0)
				text = 0;
			p.contextLabel.font = p.rectFont+'pt Arial';
			
			
			if(text < 2)
				makeLableHide = true;
		}
		
		//if(!makeLableHide)
		{
		
			var x1 = _temp.x;
			var y1 = _temp.y;
			
			
			p.contextLabel.font = p.rectFont+'pt Arial';
			p.contextLabel.textAlign = 'center';
			p.contextLabel.fillStyle = p.angleLabelColor;
			p.contextLabel.fillText(text, x1, y1+p.rectPadding);
			
			var metrics = p.contextLabel.measureText(text);
			var rectWidth = metrics.width + p.rectPadding;
			var rectHeight = p.rectFont + p.rectPadding;
			
			var rectX = x1 - rectWidth/2;
			var rectY = y1 - rectHeight/2 //- p.rectPadding;
			
			p.contextLabel.beginPath();
			p.contextLabel.rect(rectX, rectY, rectWidth, rectHeight);
			p.contextLabel.fillStyle = p.angleLabelBg;
			p.contextLabel.fill();
			p.contextLabel.strokeStyle = p.angleLabelLineColor;
			p.contextLabel.stroke();
			p.contextLabel.closePath();
			
			p.contextLabel.font = p.rectFont+'pt Arial';
			p.contextLabel.textAlign = 'center';
			p.contextLabel.fillStyle = p.angleLabelColor;
			p.contextLabel.fillText(text, x1, y1 + p.rectPadding + globalResizeCalc(1)/2);
		}
	}

	function drawOnCanvas()
	{
		p.activityType == "trigonometry" ? calcTrignoData() : null
		
		p.canvas.width = p.canvas.width;
		p.canvasLabel.width = p.canvasLabel.width;
		p.canvasSquare.width = p.canvasSquare.width;
		
		p.ctx.beginPath();
		var tpoint = p.pointArr[0];
		p.ctx.moveTo(tpoint.x,tpoint.y);
		for(var i=0; i<p.pointArr.length-1; i++)
		{
			var nextPoint = p.pointArr[i+1];
			p.ctx.lineTo(nextPoint.x,nextPoint.y);
		}
		p.ctx.closePath();
		p.ctx.fillStyle = p.fillColor//"#C8CAF8";
		p.ctx.globalAlpha = p.globalAlpha;
		p.ctx.fill();
		p.ctx.globalAlpha = 1;
		p.ctx.lineWidth = p.lineWidth;
		p.ctx.strokeStyle = p.lineColor//"#0000FF";
		p.ctx.stroke();

		if(p.showHeight)
		{
			var nextIndex
			var prevIndex
			//console.log(p.showHeight)
			var upperPoint;
			for(var i in p.pointArr)
			{
				i = Number(i)
				nextIndex = ( ((i % 3) + 1) < 3)? ((i % 3) + 1) : 0;
				prevIndex = (i + (3 - 1)) % 3;

				if(p.pointArr[i].y < p.pointArr[nextIndex].y && p.pointArr[i].y < p.pointArr[prevIndex].y)
				{
					upperPoint = p.pointArr[i]
					break
				}
			}
			//SHOWBASE
			// if(p.showBase)
			// {
				p.ctx.beginPath();
				p.ctx.moveTo(p.pointArr[prevIndex].x,p.pointArr[prevIndex].y)
				p.ctx.lineTo(p.pointArr[nextIndex].x,p.pointArr[nextIndex].y )
				p.ctx.closePath();
				p.ctx.lineWidth = p.heightLineWidth
				p.ctx.stroke()

				drawLengthLabel(p.pointArr[nextIndex],p.pointArr[prevIndex],1)
			// }
			//HEIGHT
			// if(p.showHeight)
			// {
				var temp = angleToVector(90).multiplyEq(p.heightInPx)
				p.ctx.beginPath();
				p.ctx.moveTo(upperPoint.x,upperPoint.y)
				p.ctx.lineTo(upperPoint.x,upperPoint.y + temp.y)
				p.ctx.closePath();
				p.ctx.strokeStyle = p.heightColor
				p.ctx.lineWidth = p.heightLineWidth
				p.ctx.stroke()

				var direction
				upperPoint.x > Maths.getMidPoint(p.pointArr[2],p.pointArr[1]).x ? direction = -1 : direction = 1
				var d = p.heightInPx/3;
				//.......... For Right Angle Symbol size ........ //
				var diffX = Math.abs(p.pointArr[0].x - p.pointArr[2].x);
				d = d * (diffX/125)
				d = d > globalResizeCalc(30) ? globalResizeCalc(30) : d;
				if(p.activityType == "area")
					d = globalResizeCalc(15);
				//.......... ... ........ //
				
				//right angle sign
				p.ctx.moveTo(upperPoint.x + direction*d,upperPoint.y + temp.y)
				p.ctx.lineTo(upperPoint.x + direction*d,upperPoint.y + temp.y - d)
				p.ctx.lineTo(upperPoint.x,upperPoint.y + temp.y - d)
				p.ctx.lineWidth = globalResizeCalc(2)
				p.ctx.stroke()
				p.ctx.closePath();

				if(upperPoint.x < p.pointArr[2].x)
				{
					p.ctx.beginPath();
					p.ctx.moveTo(upperPoint.x,upperPoint.y + temp.y)
					p.ctx.lineTo(p.pointArr[2].x,p.pointArr[2].y)
					p.ctx.closePath();
					p.ctx.stroke()
				}
				else if(upperPoint.x > p.pointArr[1].x)
				{
					p.ctx.beginPath();
					p.ctx.moveTo(upperPoint.x,upperPoint.y + temp.y)
					p.ctx.lineTo(p.pointArr[1].x,p.pointArr[1].y)
					p.ctx.closePath();
					p.ctx.stroke()
				}
				drawLengthLabel(upperPoint,{x:upperPoint.x,y:upperPoint.y + temp.y},1)
			// }
		}

		// Draw angles
		for(var i in p.pointArr)
		{
			i = Number(i);
			p.ctx.beginPath();

			var nextIndex = ( ((i % 3) + 1) < 3)? ((i % 3) + 1) : 0;
			var prevIndex = (i + (3 - 1)) % 3;

			var sideLen1 = Maths.getDistance(p.pointArr[i],p.pointArr[nextIndex]);
			var sideLen2 = Maths.getDistance(p.pointArr[i],p.pointArr[prevIndex]);

			var arcRadius = (sideLen1 < sideLen2)? sideLen1/10 : sideLen2/10;
			//arcRadius = arcRadius/15;
					if(arcRadius > 12)
						arcRadius = 12;

			var startAngle = Math.PI + Maths.getAngle(p.pointArr[i],p.pointArr[prevIndex],true);
			var endAngle = Math.PI + Maths.getAngle(p.pointArr[i],p.pointArr[nextIndex],true);

			var _center = ((endAngle + startAngle)/2) ;

			if(startAngle > endAngle)
			{
				var t = startAngle;
				_center = _center;
				startAngle = endAngle;
				endAngle = t;
			}
			//else
				//_center = _center + Math.PI;

			var angle =  Number((endAngle - startAngle) * Maths.TO_DEGREES)//

			if(angle < 0 )
				angle = angle + 360;
			angle =  Number(angle.toFixed(2))
			var _CONST = 1.414;
			var lim1,lim2
			if(p.activityType == "converse")
				lim1 = lim2 = 90
			else
			{
				lim1 = 89
				lim2 = 91
			}
			if((arcRadius/globalResizeCalc(1)) > 4.5)
			{
				if(!(lim1 <= angle && angle <= lim2))
				{
					if(p.pointArr[i].showAngle && !p.rightAngle)
					{
						p.ctx.lineWidth = 2;
						p.ctx.strokeStyle = p.anglelineColor;;
						//var angle;
						if(endAngle - startAngle > Math.PI)
						{
							p.ctx.beginPath();
							p.ctx.arc(p.pointArr[i].x,p.pointArr[i].y,arcRadius*3,startAngle,endAngle,true);
							p.ctx.stroke();
							p.ctx.closePath();

							var MidAngle = (endAngle + startAngle)/2 - Math.PI;
						}
						else
						{
							p.ctx.beginPath();
							p.ctx.arc(p.pointArr[i].x,p.pointArr[i].y,arcRadius*3,startAngle,endAngle);
							p.ctx.stroke();
							p.ctx.closePath();

							var MidAngle = (startAngle + endAngle)/2;
						}

						if(p.twoAngles || p.threeAngles)
						{
							var temp = Maths.getPoint(p.pointArr[i],MidAngle,arcRadius*3 + globalResizeCalc(8))
							p.ctx.beginPath()
							p.ctx.moveTo(temp.x,temp.y);
							temp = Maths.getPoint(p.pointArr[i],MidAngle,arcRadius*3 - globalResizeCalc(8))
							p.ctx.lineTo(temp.x,temp.y);
							p.ctx.stroke();
							p.ctx.closePath();
						}

						if(p.pointArr[i].showAngleLabel)
						{
							var lableRadius = p.lableRadiusInt;
							var x1 = p.pointArr[i].x + (lableRadius * Math.cos(_center));
							var y1 = p.pointArr[i].y + (lableRadius * Math.sin(_center));

							var text = angle + "°";

							p.contextLabel.font = p.rectFont+'pt Arial';
							p.contextLabel.textAlign = 'center';
							p.contextLabel.fillStyle = p.angleLabelColor;
							p.contextLabel.fillText(text, x1, y1 + p.rectPadding );

							var metrics = p.contextLabel.measureText(text);
							var rectWidth = metrics.width + p.rectPadding;
							var rectHeight = p.rectFont + p.rectPadding;

							var rectX = x1 - rectWidth/2;
							var rectY = y1 - rectHeight/2;

							p.contextLabel.beginPath();
							p.contextLabel.rect(rectX, rectY, rectWidth, rectHeight);
							p.contextLabel.fillStyle = p.angleLabelBg;
							p.contextLabel.fill();
							p.contextLabel.strokeStyle = p.angleLabelLineColor;
							p.contextLabel.stroke();
							p.contextLabel.closePath();

							p.contextLabel.font = p.rectFont+'pt Arial';
							p.contextLabel.textAlign = 'center';
							p.contextLabel.fillStyle = p.angleLabelColor;
							p.contextLabel.fillText(text, x1, y1 + p.rectPadding + globalResizeCalc(1));
						}
					}
				}
				else
				{
					arcRadius = globalResizeCalc(20);
					p.ctx.beginPath();
					var p1 = new Object();
					var p2 = new Object();
					var p3 = new Object();

					p1.x = p.pointArr[i].x + ((arcRadius) * Math.cos(startAngle));
					p1.y = p.pointArr[i].y + ((arcRadius) * Math.sin(startAngle));

					//_center < Math.PI ? _center = _center + Math.PI : null
					p2.x = p.pointArr[i].x + ((arcRadius*_CONST) * Math.cos(_center));
					p2.y = p.pointArr[i].y + ((arcRadius*_CONST) * Math.sin(_center));

					p3.x = p.pointArr[i].x + ((arcRadius) * Math.cos(endAngle));
					p3.y = p.pointArr[i].y + ((arcRadius) * Math.sin(endAngle));
					if(p.rightAngle || p.pointArr[i].showAngle)
					{
						p.ctx.moveTo(p1.x,p1.y);
						p.ctx.lineTo(p2.x,p2.y);
						p.ctx.lineTo(p3.x,p3.y);
						p.ctx.lineWidth = 2;
						p.ctx.strokeStyle = p.anglelineColor;
						p.ctx.stroke();
						p.ctx.closePath();
					}
				}
			}
		}
		if(p.showLabel)
		{
			var max=0;
			for(i = 0 ;i < p.pointArr.length;i++)
			{
				var nextIndex = ( ((i % 3) + 1) < 3)? ((i % 3) + 1) : 0;
				var prevIndex = (i + (3 - 1)) % 3;
				var m = Maths.getDistance(p.pointArr[i],p.pointArr[nextIndex]);
				if(m > max)
				{
					max = m;
					drawLengthLabel(p.pointArr[i],p.pointArr[nextIndex],"c")
					drawLengthLabel(p.pointArr[nextIndex],p.pointArr[prevIndex],"a")
					drawLengthLabel(p.pointArr[prevIndex],p.pointArr[i],"b")
				}
			}
		}else
		if(p.showSides)
		{
			for(i = 0 ;i < p.pointArr.length;i++)
			{
				var nextIndex = ( ((i % 3) + 1) < 3)? ((i % 3) + 1) : 0;
				var prevIndex = (i + (3 - 1)) % 3;

				if(Maths.getDistance(p.pointArr[i],p.pointArr[nextIndex]).toFixed(2)*1 != 0)
					drawLengthLabel(p.pointArr[i],p.pointArr[nextIndex],2)
			}
		}
		else if(p.twoSides)
		{
			var Mid1 = Maths.getMidPoint(p.pointArr[0],p.pointArr[1])
			var Mid2 = Maths.getMidPoint(p.pointArr[0],p.pointArr[2])

			var angle1 = Maths.getAngle(p.pointArr[1],p.pointArr[0]) + 90
			var angle2 = Maths.getAngle(p.pointArr[2],p.pointArr[0]) + 90

			var temp = angleToVector(angle1).multiplyEq(globalResizeCalc(8))

			p.ctx.lineWidth = 2;
			p.ctx.beginPath()
			p.ctx.moveTo(Mid1.x + temp.x,Mid1.y + temp.y);
			temp = angleToVector(angle1 + 180).multiplyEq(globalResizeCalc(8))
			p.ctx.lineTo(Mid1.x + temp.x,Mid1.y + temp.y);
			p.ctx.closePath()
			p.ctx.stroke()

			temp = angleToVector(angle2).multiplyEq(globalResizeCalc(8))
			p.ctx.beginPath()
			p.ctx.moveTo(Mid2.x + temp.x,Mid2.y + temp.y);
			temp = angleToVector(angle2 + 180).multiplyEq(globalResizeCalc(8))
			p.ctx.lineTo(Mid2.x + temp.x,Mid2.y + temp.y);
			p.ctx.closePath()
			p.ctx.stroke()
		}
		else if(p.threeSides)
			{
				var Mid1 = Maths.getMidPoint(p.pointArr[0],p.pointArr[1])
				var Mid2 = Maths.getMidPoint(p.pointArr[0],p.pointArr[2])


				var angle1 = Maths.getAngle(p.pointArr[1],p.pointArr[0]) + 90
				var angle2 = Maths.getAngle(p.pointArr[2],p.pointArr[0]) + 90


				var temp = angleToVector(angle1).multiplyEq(globalResizeCalc(8))

				p.ctx.lineWidth = 2;
				p.ctx.beginPath()
				p.ctx.moveTo(Mid1.x + temp.x,Mid1.y + temp.y);
				temp = angleToVector(angle1 + 180).multiplyEq(globalResizeCalc(8))
				p.ctx.lineTo(Mid1.x + temp.x,Mid1.y + temp.y);
				p.ctx.closePath()
				p.ctx.stroke()

				temp = angleToVector(angle2).multiplyEq(globalResizeCalc(8))
				p.ctx.beginPath()
				p.ctx.moveTo(Mid2.x + temp.x,Mid2.y + temp.y);
				temp = angleToVector(angle2 + 180).multiplyEq(globalResizeCalc(8))
				p.ctx.lineTo(Mid2.x + temp.x,Mid2.y + temp.y);
				p.ctx.closePath()
				p.ctx.stroke()

				temp = angleToVector(90).multiplyEq(globalResizeCalc(8))
				p.ctx.beginPath()
				p.ctx.moveTo(p.center.x + temp.x,p.center.y + temp.y);
				temp = angleToVector(90 + 180).multiplyEq(globalResizeCalc(8))
				p.ctx.lineTo(p.center.x + temp.x,p.center.y + temp.y);
				p.ctx.closePath()
				p.ctx.stroke()
			}
	
		if(p.showHypotenuse)
		{
			p.ctx.beginPath();
			p.ctx.moveTo(p.pointArr[0].x,p.pointArr[0].y)
			p.ctx.lineTo(p.pointArr[1].x,p.pointArr[1].y)
			p.ctx.strokeStyle = p.sideColor[2]//"#FF0000"//p.pointLineColor
			p.ctx.lineWidth = 4//p.pointLineColor
			p.ctx.stroke();
			p.ctx.closePath();
		}
		if(p.showAdjacent)
		{
			p.ctx.beginPath();
			p.ctx.moveTo(p.pointArr[0].x,p.pointArr[0].y)
			p.ctx.lineTo(p.pointArr[2].x,p.pointArr[2].y)
			p.ctx.strokeStyle = p.sideColor[1]//"#FF0000"//p.pointLineColor
			p.ctx.lineWidth = 4//p.pointLineColor
			p.ctx.stroke();
			p.ctx.closePath();
		}
		if(p.showOpposite)
		{
			p.ctx.beginPath();
			p.ctx.moveTo(p.pointArr[1].x,p.pointArr[1].y)
			p.ctx.lineTo(p.pointArr[2].x,p.pointArr[2].y)
			p.ctx.strokeStyle = p.sideColor[0]//"#FF0000"//p.pointLineColor
			p.ctx.lineWidth = 4//p.pointLineColor
			p.ctx.stroke();
			p.ctx.closePath();
		}
			for(var i=0;i<p.pointArr.length;i++)
				{
					var point = p.pointArr[i];

					//Draw Points
					p.ctx.beginPath();
					p.ctx.arc(point.x,point.y,p.dotRadius,0,2 * Math.PI);
					p.ctx.closePath();

					point.isAllowX || point.isAllowY ? p.ctx.lineWidth = p.pointLineWidth : p.ctx.lineWidth = p.pointLineWidth/2;
					p.ctx.strokeStyle = p.pointLineColor
					p.ctx.stroke();

					point.isAllowX || point.isAllowY ? p.ctx.fillStyle = p.pointFillColor : p.ctx.fillStyle = p.NonDragpointFillColor;
					//p.ctx.fillStyle = p.pointFillColor//p.NonDragpointFillColor
					p.ctx.fill();

					if(p.activityType != "converse")
						{
							//..Adding Text
							p.ctx.beginPath();
							p.ctx.font = "italic bold "+p.fontSize+"px Arial"
							var txt = String.fromCharCode(p.startCharCode+point.id)
							var width = p.ctx.measureText(txt).width/2;
							var height = p.fontSize/3;
							p.ctx.fillStyle = p.fontColor
							p.ctx.fillText(txt, point.x - width, point.y + height);
							p.ctx.closePath();
						}
					}
				p.showSquare ? drawSquare() : null
				// console.log(p.showSquare)
			
	}

	function drawSquare()
	{
			var temp = new Object();
			var temp1 = new Object();
			var nextIndex;		
			var prevIndex;		
			p.canvasSquare.width = p.canvasSquare.width;
			var max=0;
			var ind;
			var arrPoint = [];
			var angle,side;
			var a;
			for(var i = 0; i <  p.pointArr.length; i ++)
			{
				nextIndex = ( ((i % 3) + 1) < 3)? ((i % 3) + 1) : 0;
				prevIndex = (i + (3 - 1)) % 3;
				angle =  Maths.getAngle(p.pointArr[i],p.pointArr[nextIndex],true);
				side = Maths.getDistance(p.pointArr[i],p.pointArr[nextIndex])
				// console.log(i,nextIndex,(side/p.Unit*side/p.Unit).toFixed(2)*1)
				
				a = 90 * Maths.TO_RADIANS;
				
				temp = Maths.getPoint(p.pointArr[i],angle+a,side)
				temp1 = Maths.getPoint(p.pointArr[nextIndex],angle+a,side)
					
				var m = Maths.getDistance(p.pointArr[i],p.pointArr[nextIndex]);
				
				arrPoint.push({p1:p.pointArr[i],p2:temp1,s:side});
				if(m > max)
				{
					max = m;
					ind = i;
				}
				
				p.contextSquare.beginPath();
				p.contextSquare.fillStyle = p.squareFillColor;
				p.contextSquare.lineWidth = p.lineWidth;
				p.contextSquare.strokeStyle = p.squareLineColor;
				p.contextSquare.moveTo(p.pointArr[i].x,p.pointArr[i].y);
				p.contextSquare.lineTo(temp.x,temp.y);
				p.contextSquare.lineTo(temp1.x,temp1.y);
				p.contextSquare.lineTo(p.pointArr[nextIndex].x,p.pointArr[nextIndex].y);
				p.contextSquare.fill();
				p.contextSquare.stroke();
				p.contextSquare.closePath();
			}
			var counter = 3 
			var charArr = ["b²","a²","c²"];
			while(counter--)
			{
				if(p.showLabel)
				{
						drawLengthLabel(arrPoint[ind].p1,arrPoint[ind].p2,charArr[counter]);
				}
				else
				{
					var tempSIdeLiength = (arrPoint[ind].s/p.Unit)
					drawLengthLabel(arrPoint[ind].p1,arrPoint[ind].p2,(tempSIdeLiength*tempSIdeLiength).toFixed(2));
				}
				
				ind++;
				if(ind >= 3)
					ind = 0;
			}
			
	}
	
	function drawGrid()
	{
		p.canvasGrid.width = p.canvasGrid.width
		$(p.canvasGrid).css({"border":"1px solid #CCCCCC"})
		var _temp = new Object()
		_temp.x = p.gridCenter.x
		_temp.y = p.gridCenter.y

		p.contextGrid.strokeStyle = p.gridColor//"#CCCCCC"
		p.contextGrid.lineWidth = p.gridLineWidth//"#CCCCCC"

		//vertical lines--------
		for(var i = _temp.x; i < p.width; i += 2 * p.Unit)
		{
			var x = Math.round(i.toFixed(0)) - 0.5
			p.contextGrid.beginPath()
			p.contextGrid.moveTo(x,0)
			p.contextGrid.lineTo(x,p.height)
			p.contextGrid.strokeStyle = p.gridColor//"#CCCCCC"
			p.contextGrid.lineWidth = p.gridLineWidth//"#CCCCCC"
			p.contextGrid.closePath()
			p.contextGrid.stroke()
		}
		for(var i = _temp.x + p.Unit; i < p.width; i += 2 * p.Unit)
		{
			var x = Math.round(i.toFixed(0)) + 0.5
			p.contextGrid.beginPath()
			p.contextGrid.moveTo(x,0)
			p.contextGrid.lineTo(x,p.height)
			p.contextGrid.strokeStyle = p.gridColorMinor//"#CCCCCC"
			p.contextGrid.lineWidth = p.gridLineWidthMinor//"#CCCCCC"
			p.contextGrid.closePath()
			p.contextGrid.stroke()
		}
		for(var i = _temp.x - 2 * p.Unit; i > 0 ; i -= 2 * p.Unit)
		{
			var x = Math.round(i.toFixed(0)) - 0.5
			p.contextGrid.beginPath()
			p.contextGrid.moveTo(x,0)
			p.contextGrid.lineTo(x,p.height)
			p.contextGrid.strokeStyle = p.gridColor//"#CCCCCC"
			p.contextGrid.lineWidth = p.gridLineWidth//"#CCCCCC"
			p.contextGrid.closePath()
			p.contextGrid.stroke()
		}
		for(var i = _temp.x - p.Unit; i > 0 ; i -= 2 * p.Unit)
		{
			var x = Math.round(i.toFixed(0)) + 0.5
			p.contextGrid.beginPath()
			p.contextGrid.moveTo(x,0)
			p.contextGrid.lineTo(x,p.height)
			p.contextGrid.strokeStyle = p.gridColorMinor//"#CCCCCC"
			p.contextGrid.lineWidth = p.gridLineWidthMinor//"#CCCCCC"
			p.contextGrid.stroke()
			p.contextGrid.closePath()
		}
		
		//Horizontal lines--------
		for(var i = _temp.y; i < p.height; i += 2 * p.Unit)
		{
			var x = Math.round(i.toFixed(0)) + 0.5
			p.contextGrid.beginPath()
			p.contextGrid.moveTo(0,x)
			p.contextGrid.lineTo(p.width,x)
			p.contextGrid.strokeStyle = p.gridColor//"#CCCCCC"
			p.contextGrid.lineWidth = p.gridLineWidth//"#CCCCCC"
			p.contextGrid.stroke()
			p.contextGrid.closePath()
		}
		for(var i = _temp.y + p.Unit; i < p.height; i += 2 * p.Unit)
		{
			var x = Math.round(i.toFixed(0)) - 0.5
			p.contextGrid.beginPath()
			p.contextGrid.moveTo(0,x)
			p.contextGrid.lineTo(p.width,x)
			p.contextGrid.strokeStyle = p.gridColorMinor//"#CCCCCC"
			p.contextGrid.lineWidth = p.gridLineWidthMinor//"#CCCCCC"
			p.contextGrid.stroke()
			p.contextGrid.closePath()
		}
		for(var i = _temp.y - 2 * p.Unit; i > 0; i -= 2 * p.Unit)
		{
			var x = Math.round(i.toFixed(0)) + 0.5
			p.contextGrid.beginPath()
			p.contextGrid.moveTo(0,x)
			p.contextGrid.lineTo(p.width,x)
			p.contextGrid.strokeStyle = p.gridColor//"#CCCCCC"
			p.contextGrid.lineWidth = p.gridLineWidth//"#CCCCCC"
			p.contextGrid.stroke()
			p.contextGrid.closePath()
		}
		for(var i = _temp.y - p.Unit; i > 0; i -= 2 * p.Unit)
		{
			var x = Math.round(i.toFixed(0)) - 0.5
			p.contextGrid.beginPath()
			p.contextGrid.moveTo(0,x)
			p.contextGrid.lineTo(p.width,x)
			p.contextGrid.strokeStyle = p.gridColorMinor//"#CCCCCC"
			p.contextGrid.lineWidth = p.gridLineWidthMinor//"#CCCCCC"
			p.contextGrid.stroke()
			p.contextGrid.closePath()
		}
	}

	function getPointOnCanvas(xVal,yVal)
	{
		var hitRadius = p.dotRadius

		if(BrowserDetect.any())
		{
			hitRadius = 10;
		}
		for(var i = p.pointArr.length-1; i >= 0 ; i--)
		{
			if(p.pointArr[i] && (p.pointArr[i].isAllowX || p.pointArr[i].isAllowY))
			{
				if((p.pointArr[i].x-hitRadius <= xVal && p.pointArr[i].x+hitRadius >= xVal) && (p.pointArr[i].y-hitRadius <= yVal && p.pointArr[i].y+hitRadius >= yVal))
				{
					return p.pointArr[i];
				}
			}
		}
		return null;
	}

	function findASnapPoint()
	{
		p.snap=[];
		// Equilateral
		var NewCenter = Maths.getMidPoint(p.pointArr[1],p.pointArr[2]);
		var equilateralSide ;
		var snapDistance =3 * p.Unit;
		equilateralSide  = (p.pointArr[1].minusNew(p.pointArr[2])).magnitude();
		var equilateralX  = (p.pointArr[1].x + p.pointArr[2].x) * 0.5;
		var equilateralY  = (20 * p.Unit) + Math.sqrt(3) * equilateralSide  * 0.5;

		var equilateralSnap  = new Vector(NewCenter.x,NewCenter.y - Math.sin(60*Maths.TO_RADIANS)*(Maths.getDistance(p.pointArr[1],p.pointArr[2])));

		p.snap["isosceles"] = new Vector(NewCenter.x,p.pointArr[0].y);
		p.snap["equilateral"] = equilateralSnap;

			//Center
		
		if(p.activityType == "converse")
		{
			p.snap = [];
		}
		
		// Right(top)
		
		var angle = Maths.getAngle({x:NewCenter.x,y:p.pointArr[1].y},p.pointArr[0],true);
		var r = (Maths.getDistance(p.pointArr[1],p.pointArr[2]) / 2)
		var rightX = equilateralX;
		var rightY = (20 * p.Unit) + equilateralSide * 0.5;
		
		var NewCenter = Maths.getMidPoint(p.pointArr[1],p.pointArr[2]);
		
		var rightSnap = new Vector(NewCenter.x - r * Math.cos(angle), NewCenter.y - r * Math.sin(angle));
// Right(left)
		if(!p.twoAngles && !p.twoSides)
			p.snap["leftRight"] = new Vector(p.pointArr[1].x, p.pointArr[0].y);

//Right(right)
		if(!p.twoAngles && !p.twoSides)
			p.snap["rightRight"] = new Vector( p.pointArr[2].x, p.pointArr[0].y);
		p.snap["topRight"] = rightSnap;
		p.snap["centerRight"] = new Vector(NewCenter.x - r * Math.cos(Math.PI/2), NewCenter.y - r * Math.sin(Math.PI/2));

		// console.log(p.snap)
	}

	function findBCSnapPoint()
	{
		p.BCsnap=[];
		if(p.pointArr[0].x == p.center.x)
		{
			// Equilateral
			var h = (p.pointArr[0].y - p.center.y)
			var b = h / Math.sqrt(3);
			var temp = p.centerX - b
			p.BCsnap["leftEquilateral"] = new Vector(temp,p.center.y);
			temp = p.centerX + b
			p.BCsnap["rightEquilateral"] = new Vector(temp,p.center.y);
			temp = p.centerX - h
			p.BCsnap["leftRight"] = new Vector(temp,p.center.y);
			temp = p.centerX + h
			p.BCsnap["rightRight"] = new Vector(temp,p.center.y);
		}
		else
		{
			p.BCsnap["centerBase"] = new Vector(p.pointArr[0].x,p.center.y);
		} 
	}

	function findBSnapPoint()
	{
		p.Bsnap = []		
		var d = Maths.getDistance(p.pointArr[0],p.pointArr[2])
		p.Bsnap["isosceles"] = new Vector(p.pointArr[2].x-d,p.center.y);
		var d1 = Maths.getDistance({x:p.pointArr[0].x,y:p.center.y},p.pointArr[2])
		p.Bsnap["isosceles1"] =new Vector(p.pointArr[0].x - d1,p.center.y)
		// console.log(Maths.getAngleBtn3(p.pointArr[0],p.pointArr[1],p.pointArr[2]))
		if(Maths.getRound(Maths.getAngleBtn3(p.pointArr[0],p.pointArr[1],p.pointArr[2]),2) == 60)
		{
			var pt = new Vector(p.pointArr[2].x-d,p.center.y)
			p.Bsnap["equilateral"] = pt
		}
		p.Bsnap["leftRight"] = new Vector(p.pointArr[0].x, p.pointArr[0].y);
	}
	
	function findCSnapPoint()
	{
		p.Csnap = [];
		var d = Maths.getDistance(p.pointArr[0],p.pointArr[1])
		p.Csnap["isosceles"] = new Vector(p.pointArr[1].x + d,p.center.y);
		var d1 = Maths.getDistance({x:p.pointArr[0].x,y:p.center.y},p.pointArr[1])
		p.Csnap["isosceles1"] =new Vector(p.pointArr[0].x + d1,p.center.y)
		if(Maths.getRound(Maths.getAngleBtn3(p.pointArr[0],p.pointArr[2],p.pointArr[1]),2) == 60)
		{
			p.Csnap["equilateral"] = new Vector(p.pointArr[1].x + d,p.center.y)	
		}
		p.Csnap["leftRight"] = new Vector(p.pointArr[0].x, p.pointArr[0].y);
	}
	
	function getRight()
	{
		var angle = Maths.getAngle({x:p.centerX,y:p.pointArr[1].y},p.pointArr[0],true);
		var r = (Maths.getDistance(p.pointArr[1],p.pointArr[2]) / 2)
		p.pointArr[0].x = p.center.x - r * Math.cos(angle);
		p.pointArr[0].y = p.center.y - r * Math.sin(angle);
	}

	function getEquilateral()
	{
		checkBoundary(p.pointArr[1]);
		checkBoundary(p.pointArr[2]);
		p.pointArr[0].y = p.center.y - Math.sin(60*Maths.TO_RADIANS)*(Maths.getDistance(p.pointArr[1],p.pointArr[2]))
		p.pointArr[0].x = p.center.x;
		calculateEQ();
		drawOnCanvas();
	}

	function calculateEQ()
	{		
		var h = Maths.getDistance(p.pointArr[0],p.center);
		h = h / Math.cos(30*Maths.TO_RADIANS);
		var temp = new Object();
		temp = Maths.getPoint(p.pointArr[0],120*Maths.TO_RADIANS,h);
		p.pointArr[1].x = temp.x;
		p.pointArr[1].y = temp.y;
		
		temp = Maths.getPoint(p.pointArr[0],60*Maths.TO_RADIANS,h);
		p.pointArr[2].x = temp.x;
		p.pointArr[2].y = temp.y;
		
	}
	
	function setASnap(xVal,yVal)
	{
		for(var i in p.snap)
		{
			if(p.snap[i].y-10 <= yVal && p.snap[i].y+10 >= yVal & p.snap[i].x-10 <= xVal && p.snap[i].x+10 >= xVal)
			{
				p.pointArr[0].y = p.snap[i].y;
				p.pointArr[0].x = p.snap[i].x;
			}
		}
	}

	function setBSnap(xVal)
	{
		for(var i in p.Bsnap)
		{
			if(p.Bsnap[i].x-10 <= xVal && p.Bsnap[i].x+10 >= xVal)
			{
				// console.log(i)
				p.pointArr[1].x = p.Bsnap[i].x;
			}
		}
	}
	
	function setCSnap(xVal)
	{
		for(var i in p.Csnap)
		{
			if(p.Csnap[i].x-10 <= xVal && p.Csnap[i].x+10 >= xVal)
			{
				// console.log(i)
				p.pointArr[2].x = p.Csnap[i].x;
			}
		}
	}
	
	function setBCSnap(xVal)
	{
		for(var i in p.BCsnap)
		{
			if(p.BCsnap[i])
			{
				if(p.pointArr[p.curSelectedPoint].x == p.center.x)
				{
					if((p.BCsnap[i].x + p.center.x)-10 <= xVal && (p.BCsnap[i].x+p.center.x)+10 >= xVal)
					{
						p.pointArr[p.curSelectedPoint].x = p.BCsnap[i].x + p.center.x;
					}
				}
				else if((p.BCsnap[i].x-10 <= xVal && p.BCsnap[i].x+10 >= xVal))
				{
					p.pointArr[p.curSelectedPoint].x = p.BCsnap[i].x;
				}
			}
		}
	}

	function moveA(refPoint)
	{
		var angle = Maths.getAngle(refPoint,p.pointArr[0],false);
		if(Math.round(angle) >= 87 && Math.round(angle) <= 93)
		{
			p.pointArr[0].x = refPoint.x;
		}
	}
	
	function checkBoundary(refPoint)
	{
		if(refPoint.x <= (0 + p.padding_H) )
		{
			refPoint.x = (0 + p.padding_H );
		}
		if(refPoint.x >= (p.canvas.width - p.padding_H) )
		{
			refPoint.x = (p.canvas.width - p.padding_H );
		}
		if(refPoint.y <= (0 + p.padding_V) )
		{
			refPoint.y = (0 + p.padding_V);
		}
		if(refPoint.y >= (p.canvas.height - p.padding_V) )
		{
			refPoint.y = (p.canvas.height - p.padding_V);
		}
	}

}
