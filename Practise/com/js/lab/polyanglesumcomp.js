var PolyAngleSumComp = function()
{
	// Default starts ...
	var p = 
	{
		//target:"",
		id:"polyAnglCnv",
		x:0,
		y:0,
		width:0,
		height:0,
		centerX:300,
		centerY:300,
		radius:8,
		arcWidth:3,
		arcLineColor:'#3B42BC',
		lineColor:'#3B42BC',
		lineWidth:3,
		fillColor:'#AFB4FE',
		fontSize:10,
		fontColor:'blue',
		isTriangleShow:false,
		isRegular:true,
		isAngleLableShow:false,
		isInterior:true,
		numOfSides:3,
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
		padding:50,
		isEnforceConvexity:true,
		globalAlpha:1,
		startCharCode:65,
		initialAngle:0,
		unit:8,
		
		//for 194
		translateX:0,
		translateY:0,
		interiorAngleLimit : 5
	}
	// Default ends ...
	var _thisObj = this;
	
	var canvas, context;
	var canvasExtr, contextExtr;
	var canvasAngle, contextAngle;
	
	var curSelectedPoint;
	
	var curPointObj;
	var prevPointObj;
	
	var vectorClass;
	
	var pointArr;
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
		
		p.arcWidth = globalResizeCalc(p.arcWidth);
		p.pointLineWidth = globalResizeCalc(p.pointLineWidth);
		p.lineWidth = globalResizeCalc(p.lineWidth);
		p.fontSize = globalResizeCalc(p.fontSize);
		
		p.x = globalResizeCalc(p.x);
		p.y = globalResizeCalc(p.y);
		p.width = globalResizeCalc(p.width);
		p.height = globalResizeCalc(p.height);
		p.centerX = p.width/2;
		//globalResizeCalc(p.centerX);
		p.centerY = p.height/2;
		//globalResizeCalc(p.centerY);
		
		p.radius = globalResizeCalc(p.radius);
		
		p.rectPadding = globalResizeCalc(p.rectPadding);
		p.rectFont = globalResizeCalc(p.rectFont);
		
		p.lableRadius = globalResizeCalc(p.lableRadius);
		p.lableRadiusInt = globalResizeCalc(p.lableRadiusInt);
		p.sideLength = globalResizeCalc(p.sideLength);
		
		p.padding = globalResizeCalc(p.padding);
		
		p.translateX = globalResizeCalc(p.translateX);
		p.translateY = globalResizeCalc(p.translateY);
		
		//----------------
		canvas = document.createElement("canvas");
		context = canvas.getContext("2d");
		
		//----------------
		canvasExtr = document.createElement("canvas");
		contextExtr = canvasExtr.getContext("2d");
		//----------------
		canvasAngle = document.createElement("canvas");
		contextAngle = canvasAngle.getContext("2d");
		//----------------
		
		if(p.target)
		{
			p.target.css(
			{
				"position":"absolute"
			});
			//----------------
			p.target.append(canvasExtr);
			p.target.append(canvas);
			p.target.append(canvasAngle);
			
			//---------------------------------
			createBaseCanvas();
		}
		
		this.setNumberOfSides(p.numOfSides);
		
		exteriorAngles();
	}
	//================================================================================
	this.getSnapShot = function()
	{
		return {x:p.x,y:p.y,width:p.width,height:p.height}
	}
	//================================================================================
	this.updateData = function (flag,index)
	{
		var id = p.numOfSides;
		
		if(p.isAngleLableShow && flag)
		{
			if(!dataArr[id-3])
				dataArr[id-3] = [];
			dataArr[id-3][index] = id; 
			calculateData()
		}
		return sendArr;
	}
	//================================================================================
	function calculateData()
	{
		sendArr = [];
		for(var i in dataArr)
		{
			i = Number(i);
			if(dataArr[i])
			{
				var tempObj = [];
				tempObj[0] = i + 3;
				tempObj[1] = "";
				tempObj[2] = "";
				if(dataArr[i][0])
				{
					tempObj[1] = (Number(dataArr[i][0])-2) * 180 + "°";
				}
				if(dataArr[i][1])
				{
					tempObj[2] = 360+ "°";
				}
				sendArr.push(tempObj);
			}
		}
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
	this.setSideLength= function(arg)
	{
		p.sideLength = globalResizeCalc(arg);	
		createPoints(p.numOfSides,p.sideLength,p.initialAngle);
		exteriorAngles();
		drawOnCanvas();	
	}
	//================================================================================
	this.setNumberOfSides = function(arg)
	{
		p.numOfSides = arg;
		
		createPoints(p.numOfSides,p.sideLength,p.initialAngle);
		exteriorAngles();
		drawOnCanvas();		
	}
	//================================================================================
	this.showAngleLable = function(arg)
	{
		p.isAngleLableShow = arg;
		exteriorAngles();
		drawOnCanvas();
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
	this.setPointArray = function (arr)
	{
		pointArr = arr;
		exteriorAngles();
		drawOnCanvas();	
	}
	//================================================================================
	this.updateInteriorAngleLimit = function (_val) // added at 16/3/2016 to provide flexible in diappearing interior angle labels(HGC-8573)
	{
		p.interiorAngleLimit = _val
	}
	this.update = function (_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		p.sideLength = globalResizeCalc(p.sideLength);	
		_obj.translateX ? p.translateX = globalResizeCalc(p.translateX) : null;	
		_obj.translateY ? p.translateY = globalResizeCalc(p.translateY) : null;	
		createPoints(p.numOfSides,p.sideLength,p.initialAngle);
		exteriorAngles();
		drawOnCanvas();		
	}
	//================================================================================
	//================================================================================
	//================================================================================
	// EVENT FUNCTIONS
	//================================================================================
	
	this.getSelectedPoint = function(){
		return curSelectedPoint;
	}
	
	this.mouseEvent = function(e)
	{
		var mouseX = e.x;
		var mouseY = e.y;
		
		if(e.type == "mousedown")
		{
			curPointObj = getPointOnCanvas(mouseX,mouseY);
			if(curPointObj)
			{	
				addPointerGrabbing(true)
				curSelectedPoint = curPointObj.id;
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
				curPointObj.x = mouseX;
				curPointObj.y = mouseY;
				
				pointMoved(curPointObj);
				exteriorAngles();
				
				if(!restricted || p.isRegular) // added at 17/3/2016 to enable drawing after convexity is enforced.
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
			curPointObj = null;
			curSelectedPoint = null;
			$("body").removeClass("commongrab")
			addPointerGrabbing(false)
			return false;			
		}
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
		//-------
		canvasExtr.width = p.width;
		canvasExtr.height = p.height;
		$(canvasExtr).css(
		{
			"position": "absolute",
			"left": p.x + "px",
			"top": p.y + "px",
		}).attr("id", "canvasExtr_"+p.id);
		//-------
		canvasAngle.width = p.width;
		canvasAngle.height = p.height;
		$(canvasAngle).css(
		{
			"position": "absolute",
			"left": p.x + "px",
			"top": p.y + "px",
		}).attr("id", "canvasAngle_"+p.id);
		
		p.index ? $(canvas).css("z-index", p.index) : null;
		p.index ? $(canvasExtr).css("z-index", p.index) : null;
		p.index ? $(canvasAngle).css("z-index", p.index) : null;
	}
	//================================================================================
	function createPoints(numOfSides,radius,angleOffset)
	{
		pointArr = new Array();
		curRadius = radius;
		for(var i = 1; i <= numOfSides; i++ )
		{
			var curAngle = i * 360.0 / p.numOfSides + angleOffset;
			var temp = angleToVector(curAngle).multiplyEq(radius);
			
			var tempObj = new Object();
			tempObj.id = numOfSides - i;
			tempObj.x = temp.x + p.centerX + p.translateX;
			tempObj.y = temp.y + p.centerY - p.translateY;
			tempObj.vector = new Vector(tempObj.x,tempObj.y);
			pointArr.push(tempObj);
		}
		pointArr.reverse();
	}
	//================================================================================
	function drawOnCanvas()
	{
		canvas.width = canvas.width;
		canvasExtr.width = canvasExtr.width;
		canvasAngle.width = canvasAngle.width;
		
		//context.globalAlpha = p.globalAlpha;			// Edited for 269... 
		context.beginPath();		
		var curPoint = pointArr[0];
		context.moveTo(curPoint.x,curPoint.y);
		for(var i = 0; i < pointArr.length-1; i++)
		{
			var nextPoint = pointArr[i+1];
			context.lineTo(nextPoint.x,nextPoint.y);
		}
		context.lineWidth = p.lineWidth;
		context.closePath();
		context.globalAlpha = p.globalAlpha;
		context.fillStyle = p.fillColor;
		context.fill();
		context.globalAlpha = 1;	
		context.lineWidth = p.lineWidth;
		context.strokeStyle = p.lineColor;
      	context.stroke();
		
		if(p.isTriangleShow)
		{
			for(var i = 2; i < pointArr.length-1; i++)
			{
				var curPoint = pointArr[0];
				var nextPoint = pointArr[i];
				context.beginPath();
				context.moveTo(curPoint.x,curPoint.y);
				context.lineTo(nextPoint.x,nextPoint.y);
				context.closePath();
				context.lineWidth = p.arcWidth;
				context.strokeStyle = p.lineColor;
				context.stroke();
			}
			
		}
		// Main Point Circel Drawing.....
		
		for(var i = 0; i < pointArr.length; i++)
		{
			if(pointArr[i])
			{
				var _iPoint = pointArr[i];
				
				context.beginPath();
				//..Circle Drawing p.radius
				context.arc(_iPoint.x, _iPoint.y, p.radius, 0, 2 * Math.PI);
				context.lineWidth = p.pointLineWidth;
				context.strokeStyle = p.lineColor;
				context.stroke();
				context.fillStyle = p.pointFillColor;
				context.fill();
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
		}
		
		// External and Internal Angle Drawing ................
		if(p.isAngleLableShow)
		{
			var rad = curRadius / 10 ;
			// +++++++++++++++++++++++++++++++++++++++ Exterior Angle +++++++++++++++++++++++++++++++++++ //
			if(!p.isInterior)
			{
				for(var i in extndLineArr)
				{
					// ..................................... Calculations ........................................ //
					i = Number(i);
					
					var nextIndex = ( ((i % p.numOfSides) + 1) < p.numOfSides)? ((i % p.numOfSides) + 1) : 0;
					var lastIndex = (i + (p.numOfSides - 1)) % p.numOfSides;
				
					var startAngle = Math.PI + Maths.getAngle(extndLineArr[i].p,{x:extndLineArr[i].x,y:extndLineArr[i].y},true);
					var endAngle = Math.PI + Maths.getAngle(extndLineArr[i].p,extndLineArr[nextIndex].p,true);

					var sideLen1 = Maths.getDistance(extndLineArr[i].p,extndLineArr[nextIndex].p);
					var sideLen2 = Maths.getDistance(extndLineArr[i].p,extndLineArr[lastIndex].p);
					
					var arcRadius = (sideLen1 < sideLen2)? sideLen1 : sideLen2;
					arcRadius = arcRadius/10;
					if(arcRadius > 10)
						arcRadius = 10;
					//if(arcRadius > )
					var _CONST = 1.414;
					
					var _center =  ((endAngle + startAngle)/2) ;
						
					if(startAngle > endAngle)
						_center = _center;
					else
						_center = _center + Math.PI;
					
					var angle = Number((Maths.getAngleBtn3(extndLineArr[nextIndex].p,{x:extndLineArr[i].x,y:extndLineArr[i].y},extndLineArr[i].p)).toFixed(2));
					
					// ..................................... Calculations ........................................ //
					
					// ......................... Extended Line .................................... //
						contextExtr.beginPath();
						contextExtr.moveTo(extndLineArr[i].p.x,extndLineArr[i].p.y);
						contextExtr.lineTo(extndLineArr[i].x,extndLineArr[i].y);
						contextExtr.lineWidth = p.arcWidth;
						contextExtr.strokeStyle = p.lineColor;
						contextExtr.stroke();
						contextExtr.closePath();
					// ......................... Extended Line .................................... //	
					
					var allowToDraw = false;
					// ......................... Angle Line .................................... //
						// if((arcRadius/globalResizeCalc(1)) > 3)
						{
							contextExtr.beginPath();
							if(!(89 <= angle && angle <= 91))
							{
								allowToDraw = true;
								contextExtr.arc(extndLineArr[i].p.x,extndLineArr[i].p.y, arcRadius*3,startAngle,endAngle,true);
							}
							else
							{
								var tempRadius = globalResizeCalc(20);
								
								var p1 = new Object();
								var p2 = new Object();
								var p3 = new Object();
								
								p1.x = extndLineArr[i].p.x + ((tempRadius) * Math.cos(startAngle));
								p1.y = extndLineArr[i].p.y + ((tempRadius) * Math.sin(startAngle));
								
								p2.x = extndLineArr[i].p.x + ((tempRadius*_CONST) * Math.cos(_center));
								p2.y = extndLineArr[i].p.y + ((tempRadius*_CONST) * Math.sin(_center));
								
								p3.x = extndLineArr[i].p.x + ((tempRadius) * Math.cos(endAngle));
								p3.y = extndLineArr[i].p.y + ((tempRadius) * Math.sin(endAngle));
								
								//contextAngle.moveTo(extndLineArr[i].p.x,extndLineArr[i].p.y);
								contextExtr.moveTo(p1.x,p1.y);
								contextExtr.lineTo(p2.x,p2.y);
								contextExtr.lineTo(p3.x,p3.y);
								//contextExtr.lineTo(extndLineArr[i].p.x,extndLineArr[i].p.y);
							}
							contextExtr.lineWidth = p.arcWidth;
							contextExtr.strokeStyle = p.anglelineColor;
							contextExtr.stroke();
							contextExtr.closePath();
						}
					// ......................... Angle Line .................................... //
					
						
							
					// ......................... Angle Lable .................................... //
					if(/* (arcRadius/globalResizeCalc(1)) > 3 &&  */allowToDraw) // added at 16/3/2016 to always show angle label on exterior angles(HGC-8573)
					{
						var x1 = extndLineArr[i].p.x + (p.lableRadius * Math.cos(_center));
						var y1 = extndLineArr[i].p.y + (p.lableRadius * Math.sin(_center));
						
						// var x1 = extndLineArr[i].p.x + (arcRadius*5 * Math.cos(_center));
						// var y1 = extndLineArr[i].p.y + (arcRadius*5 * Math.sin(_center));
						
						var text = angle + "°";
						
						contextAngle.font = p.rectFont+'pt Arial';
						contextAngle.textAlign = 'center';
						contextAngle.fillStyle = p.angleLabelColor;
						contextAngle.fillText(text, x1, y1);
						
						var metrics = contextAngle.measureText(text);
						var rectWidth = metrics.width + p.rectPadding;
						var rectHeight = p.rectFont + p.rectPadding;
						
						var rectX = x1 - rectWidth/2;
						var rectY = y1 - rectHeight/2 - p.rectPadding;
						
						contextAngle.beginPath();
						contextAngle.rect(rectX, rectY, rectWidth, rectHeight);
						contextAngle.fillStyle = p.angleLabelBg;
						contextAngle.fill();
						contextAngle.strokeStyle = p.angleLabelLineColor;
						contextAngle.stroke();
						contextAngle.closePath();
						
						contextAngle.font = p.rectFont+'pt Arial';
						contextAngle.textAlign = 'center';
						contextAngle.fillStyle = p.angleLabelColor;
						contextAngle.fillText(text, x1, y1);
						
					}
					// ......................... Angle Lable .................................... //
					
					// ............................  Arrow .................................. //
						var point1 = new Object();
						var point2 = new Object();
						var point3 = new Object();
						
						var angle = startAngle + 0.25;
						var angle1 = startAngle - 0.25;
						
						//console.log("startAngle : " + startAngle + "     angle : " + angle );
						point1.x = extndLineArr[i].x - p.arrowSLen * Math.cos(angle);
						point1.y = extndLineArr[i].y - p.arrowSLen * Math.sin(angle);
						
						point2.x = extndLineArr[i].x - 5 * Math.cos(startAngle);
						point2.y = extndLineArr[i].y - 5 * Math.sin(startAngle);
						
						point3.x = extndLineArr[i].x - p.arrowSLen * Math.cos(angle1);
						point3.y = extndLineArr[i].y - p.arrowSLen * Math.sin(angle1);
						
						contextExtr.beginPath();
						
						contextExtr.moveTo(extndLineArr[i].x,extndLineArr[i].y);
						contextExtr.lineTo(point1.x,point1.y);
						contextExtr.lineTo(point2.x,point2.y);
						contextExtr.lineTo(point3.x,point3.y);
						contextExtr.lineTo(extndLineArr[i].x,extndLineArr[i].y);
						
						contextExtr.lineWidth = p.arcWidth;
						contextExtr.strokeStyle = p.lineColor;
						contextExtr.stroke();
						contextExtr.closePath();
					// ............................  Arrow .................................. //
					
				}// ....... End Of For
			}// ....... End Of If
			// +++++++++++++++++++++++++++++++++++++++ Interior Angle +++++++++++++++++++++++++++++++++++ //
			else
			{
				for(var i in extndLineArr)
				{
					// ..................................... Calculations ........................................ //
					i = Number(i);
					contextAngle.beginPath();
					
					var nextIndex = ( ((i % p.numOfSides) + 1) < p.numOfSides)? ((i % p.numOfSides) + 1) : 0;
					var prevIndex = (i + (p.numOfSides - 1)) % p.numOfSides;
					
					var sideLen1 = Maths.getDistance(extndLineArr[i].p,extndLineArr[nextIndex].p);
					var sideLen2 = Maths.getDistance(extndLineArr[i].p,extndLineArr[prevIndex].p);
					
					var arcRadius = (sideLen1 < sideLen2)? sideLen1 : sideLen2;
					arcRadius = arcRadius/15;
					if(arcRadius > 10)
						arcRadius = 10;
					
					var startAngle = Math.PI + Maths.getAngle(extndLineArr[i].p,extndLineArr[prevIndex].p,true);
					var endAngle = Math.PI + Maths.getAngle(extndLineArr[i].p,extndLineArr[nextIndex].p,true);
					
					var _center =  ((endAngle + startAngle)/2) ;
						
					if(startAngle > endAngle)
						_center = _center;
					else
						_center = _center + Math.PI;
					
					var angle =  Number(((endAngle - startAngle) * Maths.TO_DEGREES))//
					if(angle < 0 )
						angle = angle + 360;
					angle =  Number(angle.toFixed(2))
					var _CONST = 1.414;
					// ..................................... Calculations ........................................ //
					
					// if((arcRadius/globalResizeCalc(1)) > 9)
					if((arcRadius/globalResizeCalc(1)) > p.interiorAngleLimit)// added at 16/3/2016 to provide flexible in diappearing interior angle labels(HGC-8573)
					{
						
						if(!(89 <= angle && angle <= 91))
						{
							// ......................... Angle Line .................................... //
								contextAngle.beginPath();
								
								contextAngle.arc(extndLineArr[i].p.x,extndLineArr[i].p.y,arcRadius*3,startAngle,endAngle);
								contextAngle.lineWidth = p.arcWidth;
								contextAngle.strokeStyle = p.anglelineColor;
								contextAngle.stroke();
								contextAngle.closePath();
							// ......................... Angle Line .................................... //
							
							// ......................... Angle Lable .................................... //
						
								var lableRadius = p.lableRadiusInt;
								var x1 = extndLineArr[i].p.x - (lableRadius * Math.cos(_center));
								var y1 = extndLineArr[i].p.y - (lableRadius * Math.sin(_center));
								
								// var x1 = extndLineArr[i].p.x - (arcRadius*5 * Math.cos(_center));
								// var y1 = extndLineArr[i].p.y - (arcRadius*5 * Math.sin(_center));
								
								//(Maths.getAngleBtn3(extndLineArr[prevIndex].p,extndLineArr[nextIndex].p,extndLineArr[i].p)).toFixed(2);
								var text = angle + "°";
								
								contextAngle.beginPath();
								
								contextAngle.font = p.rectFont+'pt Arial';
								contextAngle.textAlign = 'center';
								contextAngle.fillStyle = p.angleLabelColor;
								contextAngle.fillText(text, x1, y1);
								
								var metrics = contextAngle.measureText(text);
								var rectWidth = metrics.width + p.rectPadding;
								var rectHeight = p.rectFont + p.rectPadding;
								
								var rectX = x1 - rectWidth/2;
								var rectY = y1 - rectHeight/1.8 - p.rectPadding;
								
								
								contextAngle.rect(rectX, rectY, rectWidth, rectHeight);
								contextAngle.strokeStyle = p.angleLabelLineColor;
								contextAngle.fillStyle = p.angleLabelBg;
								contextAngle.fill();
								contextAngle.stroke();
								contextAngle.closePath();
								
								contextAngle.beginPath();
								contextAngle.font = p.rectFont+'pt Arial';
								contextAngle.textAlign = 'center';
								contextAngle.fillStyle = p.angleLabelColor;
								contextAngle.fillText(text, x1, y1);
								contextAngle.closePath();
							// ......................... Angle Lable .................................... //
							
						}
						else
						{
							arcRadius = globalResizeCalc(20);
							contextAngle.beginPath();
							var p1 = new Object();
							var p2 = new Object();
							var p3 = new Object();
							
							p1.x = extndLineArr[i].p.x + ((arcRadius) * Math.cos(startAngle));
							p1.y = extndLineArr[i].p.y + ((arcRadius) * Math.sin(startAngle));
							
							p2.x = extndLineArr[i].p.x - ((arcRadius*_CONST) * Math.cos(_center));
							p2.y = extndLineArr[i].p.y - ((arcRadius*_CONST) * Math.sin(_center));
							
							p3.x = extndLineArr[i].p.x + ((arcRadius) * Math.cos(endAngle));
							p3.y = extndLineArr[i].p.y + ((arcRadius) * Math.sin(endAngle));
							
							//contextAngle.moveTo(extndLineArr[i].p.x,extndLineArr[i].p.y);
							contextAngle.moveTo(p1.x,p1.y);
							contextAngle.lineTo(p2.x,p2.y);
							contextAngle.lineTo(p3.x,p3.y);
							//contextAngle.lineTo(extndLineArr[i].p.x,extndLineArr[i].p.y);
							contextAngle.lineWidth = p.arcWidth;
							contextAngle.strokeStyle = p.anglelineColor;
							contextAngle.stroke();
							contextAngle.closePath();
						}
						
					
					}						
				}// ....... End Of For
			}// ....... End Of Else
		}// ....... End Of If
		
	}
	//================================================================================
	function getPointOnCanvas(xVal,yVal)
	{
		var hitRadius = p.radius;
		if(BrowserDetect.any())
		{
			hitRadius = 15;
		}
		for(var i in pointArr)
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
			temp[i].x = (pointArr[i].x)//Number(((pointArr[i].x - p.centerX)/p.unit/globalResizeCalc(1)).toFixed(0));
			temp[i].y = (pointArr[i].y)//Number(((p.centerY - pointArr[i].y)/p.unit/globalResizeCalc(1)).toFixed(0));
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
		
		if (p.isRegular) 
		{
			enforceRegularity(theRadius, theAngleOffset);
		}
		else 
		{
			checkBoundary(thePointMoved);
			if (p.numOfSides >= 3 && p.isEnforceConvexity) 
			{
				enforceConvexity(thePointMoved, theRadius, theAngleOffset);
			}
		}
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
	function enforceConvexity (thePointMoved, theRadius, theAngleOffset)
	{
		pBlock = true; 
		
		var curAngleSum = 0;
		
		for(var looper in pointArr)
		{
			looper = Number(looper);
			
			var thisPoint = pointArr[looper]
			var nextPoint = pointArr[( ((looper % p.numOfSides) + 1) < p.numOfSides)? ((looper % p.numOfSides) + 1) : 0  ]
			var lastPoint = pointArr[(looper + (p.numOfSides - 1)) % p.numOfSides]
			
			if(p.numOfSides == 3)
				curAngleSum = curAngleSum + Number(Maths.getAngleBtn3(lastPoint,nextPoint,thisPoint,true));
			else
				curAngleSum = curAngleSum + Number(Maths.getAngleBtn3(lastPoint,nextPoint,thisPoint));
		}
		curAngleSum = Math.round(curAngleSum)
		var expectedAngleSum = (p.numOfSides - 2 ) * 180;
		if(Math.floor(expectedAngleSum) == Math.floor(curAngleSum))
		{
			restricted = false;
			
			prevPointObj = new Object();
			prevPointObj.x = thePointMoved.x;
			prevPointObj.y = thePointMoved.y;
		}
		else
		{
			restricted = true;
			thePointMoved.x = prevPointObj.x;
			thePointMoved.y = prevPointObj.y;
			
		}
		pBlock = false; 
	}
	//================================================================================
	function checkBoundary(refPoint)
	{
		if(refPoint.x < (0 + p.padding) )
		{
			refPoint.x = (0 + p.padding);
		}
		if(refPoint.x > (canvas.width - p.padding) )
		{
			refPoint.x = (canvas.width - p.padding);
		}
		if(refPoint.y < (0 + p.padding) )
		{
			refPoint.y = (0 + p.padding);
		}
		if(refPoint.y > (canvas.height - p.padding) )
		{
			refPoint.y = (canvas.height - p.padding);
		}
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
		var upper = (tempX - v.x)*(tempX - (tempX+50));
		var lower = 50 * Math.sqrt(Math.pow((tempX - v.x),2) + Math.pow((tempY - v.y),2))//     (p.centerX - v.x)(p.centerX - (p.centerX+50));
		var temp = Maths.radiansToDegrees(Math.acos(upper/lower));
		var angle = 0;
		if( v.x == p.centerX && p.centerY > v.y)
		{
			angle = 90;
		}
		else if( ((v.x >= tempX) || (v.x <= tempX)) && tempY >= v.y )
		{
			angle = temp;
		}
		else if( ((v.x >= tempX) || (v.x <= tempX)) && tempY <= v.y )
		{
			angle = 360 - temp;
		}
		return angle;
	}
	// angleToVector(a)
	// Accepts an angle (in degrees) and returns a vector pointing in that direction.
	function angleToVector(a)
	{
		a = Maths.degreesToRadians(a)
		return new Vector(Math.cos(a),Math.sin(a))
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
	
}
//================================================================================






