//////////////////////////////////////////////////////////////////////////////
// Developed By: Mitr Learning & Media										//
// Name: TideComp															//
// Description: TideComp is combined functionality for the Tide effect.		//
// Date Created: 07/05/2014													//
// Date Modified: 07/05/2014												//
// Version: 1.0:															//
//////////////////////////////////////////////////////////////////////////////

var TideComp = function()
{
	var earthCenterX = 0,
		earthCenterY = 0,
		moonCenterX = 0,
		moonCenterY = 0;

	var mouseX,mouseY;

	var widthOfMoon = 0,
		heightOfMoon = 0;

	var _canvas1,
		_canvas2,
		_canvas3,
		_canvas4,
		_canvas5;

	var contextForMoon,
		contextForEarth,
		contextForBg,
		contextForMoonShadow,
		contextForView;

	var imageOfMoon,
			imageOfEarth,
			imageOfOrbit,
			imageOfMoonShadow,
			imageOfEarthGlow,
			imageOfBg ,
			imageOfFlag,
			imageOfView;

	var scaleFactor1 = 1,
		scaleFactor2 = 1;

	var p =
	{
		speed:10,
		moonRotationDiif:0.1,
		earthRotationDiif:3,

		width:350,
		height:350,

		moonImgPath:"",
		earthImgPath:"",
		orbitImgPath:"",
		flagImgPath:"",
		viewImgPath:"",
		earthGlowImgPath:"",
		BgImgPath:"",

		earthShadowImgPath:"",
		earthShadowWidth:250,
		earthShadowHeight:250,

		moonShadowImgPath:"",
		moonhShadowWidth:30,
		moonShadowHeight:30,

		maxWidthscaleOfOrbit:1.05,
		minWidthscaleOfOrbit:0.9,
		maxHeightscaleOfOrbit:1.1,
		minHeightscaleOfOrbit:1,


		moonOrbitRadius:150,
		moonAngle:180,
		earthAngle:180,

		timeChangedEvent:"",
		tideChangedEvent:"",
		heightChangedEvent:"",

		loadDelay:500,

		showFlag: true,
		showView: true,
		showOrbit:true,
		
		resetTimer:false,
		
		sunDirection:"left",
		
		moonTitle:'Drag to rotate the Moon around Earth.'
	}
	var pTimeMinutes = 0;
	var pTimeTableMinutes = 0;
	var earthAngle = 0,
		moonAngle = 0;  //In Degree
	var	pTimeMinutesOld = 0;
	var	pTimeTableMinutesOld = 0;
		isAllowToUpdate = true,
		isOldDataDrawn = false,
		isDragging = false,
		isPlaying = false,
		allowMoonDrag = false;

	var dayVal=0,
		hoursVal=0,
		minutesVal=0;

	var tideHeight = 20;

	var sliderTimeStep = 4;

	var playInterval;
	var requestFrameVal;

	var MOONROTATETIME = 29.5417;
	var DEGTORADIAN = Math.PI/180;
	var FLOATVAL = 4;
	
	var minInMonth = 42700

	//====================================================================
	// PUBLIC FUNCTIONS
	//====================================================================

	this.init= function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		p.x = globalResizeCalc(p.x);
		p.y = globalResizeCalc(p.y);
		p.width = globalResizeCalc(p.width);
		p.height = globalResizeCalc(p.height);
		p.earthRadius = globalResizeCalc(p.earthRadius);
		//p.moonRadius = globalResizeCalc(p.moonRadius);
		p.moonOrbitRadius = globalResizeCalc(p.moonOrbitRadius);
		p["earthShadowWidth"] = globalResizeCalc(p["earthShadowWidth"]);
		p["earthShadowHeight"] = globalResizeCalc(p["earthShadowHeight"]);
		
		p["moonRadius"] = globalResizeCalc(p["moonRadius"]);

		creatingCanvas();
		creatingImages();
		creatingOtherStuff();
		startLab();

		if (BrowserDetect.any()) {
			$(_canvas5).unbind('touchstart', onDown).bind('touchstart', onDown);
			
			$(_canvas5).unbind('touchmove', title).bind('touchmove', title);
			$(window).unbind('touchmove', title).bind('touchmove', title);
			// $(_canvas5).unbind('commonToolTipActiveAndMoving').bind('commonToolTipActiveAndMoving', function(e){
				// title({type:mousemove,
						// pageX: e.pageX,
						// pageY: e.pageY
					// })
			// });
		} else {
			$(_canvas5).unbind('mousedown', onDown).bind('mousedown', onDown);
			$(_canvas5).unbind('mousemove', title).bind('mousemove', title);
			$(document).unbind('mouseup', onUp).bind('mouseup', onUp);
		}
		
		p.moonTitle = GCTConv(GlobalTextObj.moonTitle);
		$(_canvas5).attr(
		{
			p_title:  GCTConv(GlobalTextObj.moonTitle)
		})
		// _canvas5.addEventListener("touchstart", onDown, false);
		// $("#CanvasForView").mousedown(onDown);
		//
		// $(document).mouseup(onUp);
	}
	//====================================
	function startLab()
	{
		//sliderTimeStep = 4;
		pTimeMinutes = 0;
		pTimeMinutesOld = 0;
		earthAngle = 0,
		moonAngle = 0;  //In Degree
		tideHeight = 0;
		dayVal=0,
		hoursVal=0,
		minutesVal=0;
		setMoonRotation()
		setEarthRotation();
		getScaleValForOrbit();
		generateAnimation();
		setTideHeight();
	}
	//====================================
	this.jump = function(_day,_hour,_min)
	{
		pTimeMinutes = getMin(_day,_hour,_min)
		
		setEarthRotation();
		setMoonRotation();
		displayDHM();
		generateDataTable();
		getScaleValForOrbit();
		generateAnimation();
		setTideHeight();
		onRequestFrameFn()
		cancelAnimationFrame(requestFrameVal);
	}
	//====================================
	this.playFn = function ()
	{
		isPlaying = true;
		allowMoonDrag = false;
		clearInterval(playInterval);
		
		
		globalAnimClassObject.start({"id":"tideCompWatch","fps":"18","frame":exitFrame})
		
		//playInterval = setInterval(exitFrame,50);
		if(isAllowToUpdate)
		{
			cancelAnimationFrame(requestFrameVal);
			requestFrameVal = requestAnimationFrame(onRequestFrameFn);
		};
	}
	function exitFrame()
	{
		if(isAllowToUpdate)
		{
			pTimeMinutesOld = pTimeMinutes;
		}
		pTimeMinutes += sliderTimeStep;
		if((pTimeMinutes >= minInMonth - sliderTimeStep) && p.resetTimer)
			pTimeMinutes = sliderTimeStep;
		
		setEarthRotation();
		setMoonRotation();
		displayDHM();
		
		getScaleValForOrbit();
		generateAnimation();
		setTideHeight();
		generateDataTable();
	}
	//====================================
	this.pauseFn = function()
	{
		isPlaying = false;
		//clearInterval(playInterval);
		globalAnimClassObject.stop("tideCompWatch");
		cancelAnimationFrame(requestFrameVal);
	}
	//====================================
	this.resetFn = function()
	{
		isPlaying = false;
		//clearInterval(playInterval);
		globalAnimClassObject.stop("tideCompWatch");
		cancelAnimationFrame(requestFrameVal);
		startLab();
		displayDHM();
	}
	//====================================
	this.setSpeed = function(arg)
	{
		sliderTimeStep = arg;
	}
	//====================================
	this.getSnapShot = function()
	{
		return {x:p.x,y:p.y,width:p.width,height:p.height}
	}
	//====================================
	this.addEventListener = function(_evt, _fun)
	{
		p[_evt] = _fun;
	}
	//====================================================================
	this.showOrbit = function(bool)
	{
		p.showOrbit = bool
		!isPlaying ? generateAnimation() : null
	}
	//====================================================================
	this.showFlag = function(bool)
	{
		p.showFlag = bool;
		!isPlaying ? generateAnimation() : null
	}
	//====================================================================
	this.showView = function(bool)
	{
		p.showView = bool;
		!isPlaying ? generateAnimation() : null
	}
	//====================================================================
	 this.onTabChange = function (arg)
	{
		isAllowToUpdate = arg;
		isOldDataDrawn = arg;
		if(arg && isPlaying)
		{
			cancelAnimationFrame(requestFrameVal);
			drawGraph(getDays(pTimeMinutes),tideHeight);
			requestFrameVal = requestAnimationFrame(onRequestFrameFn);
		}
		else
		{
			cancelAnimationFrame(requestFrameVal);
		}
	} 
	//====================================================================
	/* this.onPan = function ()
	{
		pTimeMinutesOld = 0;
		drawGraph(getDays(pTimeMinutes),tideHeight);
	} */
	//====================================================================
	// this.onTableInit = function ()
	// {
		// var _arr = [];
		// for(var i = pTimeMinutes - sliderTimeStep; i >= 0; i-=sliderTimeStep)
		// {
			// _o = getDHM(i);
			// //tideHeight = getTideHeight(getMoonAngle(pTimeMinutes),getEarthAngle(pTimeMinutes));
			// _arr.push({d:_o.d, h:_o.h, m:_o.m, height:getTideHeight(getMoonAngle(i),getEarthAngle(i))});
		// }
		// //_arr.reverse();
		// return(_arr);
	// }
	//====================================
	function displayDHM()
	{
		var _getDHMObj = getDHM(pTimeMinutes);
		dayVal = _getDHMObj.d;
		hoursVal = _getDHMObj.h;
		minutesVal = _getDHMObj.m;
		/*dayVal = parseInt(pTimeMinutes/1440);
		hoursVal = parseInt((pTimeMinutes - dayVal*1440)/60);
		minutesVal = (pTimeMinutes - hoursVal*60 - dayVal*1440);	*/

	}
	//====================================
	function getDHM(_min)
	{
		var _d = parseInt(_min/1440);
		var _h = parseInt((_min - _d*1440)/60);
		var _m = (_min - _h*60 - _d*1440);
		return {d:_d, h:_h, m:_m};
	}
	//====================================
	function getMin(_day,_hour,_min)
	{
		_min = parseInt(_min) + parseInt(_day) * 1440 + parseInt(_hour) * 60
	
		return _min
	}
	//====================================
	function setEarthRotation()
	{
		earthAngle = getEarthAngle(pTimeMinutes);
		if(earthAngle > 360)
		{
			earthAngle -= 360;
		}
		////trace("earthAngle : " + earthAngle + " pTimeMinutes : " + pTimeMinutes);
	}
	//====================================
	function getEarthAngle(pTimeMinutesArg)
	{
		return (pTimeMinutesArg * 360) / (24 * 60);
	}
	//====================================
	function setMoonRotation()
	{
		moonAngle =  getMoonAngle(pTimeMinutes);

		if(moonAngle > 360)
		{
			moonAngle -= 360;
		}
		var obj = getObjectRotaion(earthCenterX,earthCenterY,p["moonOrbitRadius"],moonAngle);

		moonCenterX = Number(obj.x.toFixed(FLOATVAL));
		moonCenterY = Number(obj.y.toFixed(FLOATVAL));
	}
	//====================================
	function getMoonAngle(pTimeMinutesArg)
	{
		return Number(( (pTimeMinutesArg * 360) / (24 * 60 * MOONROTATETIME) ).toFixed(FLOATVAL));
	}
	//====================================
	function getPTimeMinutes(angle)
	{
		return Number(((24 * 60 * MOONROTATETIME)*angle/(360)).toFixed(0));
	}
	//====================================
	function setTideHeight()
	{
		tideHeight = getTideHeight(getMoonAngle(pTimeMinutes),getEarthAngle(pTimeMinutes));
/* 		console.clear()
		console.log(tideHeight)
		console.log(tideHeight / 3.3898305) */
	}
	//====================================
	function getTideHeight(mAngle, eAngle)
	{
		var ampFactor = 2.5*(Math.cos(mAngle*DEGTORADIAN*2)*0.5 + 1.5);
		var cosTerm = Math.cos((eAngle - mAngle)*DEGTORADIAN*2);
		return Number((ampFactor * cosTerm + 15).toFixed(2));
	}
	//====================================
	function getDays(tmeMin)
	{
		var daysPast = Number(tmeMin/1440).toFixed(FLOATVAL);
		return daysPast;
	}
	//====================================
	drawGraph = function(x,y)
	{
			//trace("isDragging");
			var tempdiff = pTimeMinutes - pTimeMinutesOld;
			if((pTimeMinutes - pTimeMinutesOld) > 40)
			{
				var counter=0;
				var pointArr = [];
				for(var i=pTimeMinutesOld; i<pTimeMinutes; i+= 20)
				{
					var temp = getTideHeight(getMoonAngle(pTimeMinutesOld),getEarthAngle(pTimeMinutesOld));
					pointArr.push({"x":getDays(pTimeMinutesOld),"y":temp});
					//trace("drawing old data")
					pTimeMinutesOld += 20;

				}
				if(isDragging)
				{
					p["heightChangedEvent"](
					{
						x:getDays(pTimeMinutesOld),
						y:temp,
						flag:false,
						array:pointArr,
						flag2:isDragging
					});
				}
				else
				{
					p["heightChangedEvent"](
					{
						x:getDays(pTimeMinutesOld),
						y:temp,
						flag:true,
						array:pointArr
					});
				}
			}
			else
			{
				p["heightChangedEvent"](
				{
					x:x,
					y:y,
					flag:false,
					array:pointArr
				});
			}
	}
	function onRequestFrameFn ()
	{
		drawGraph(getDays(pTimeMinutes),tideHeight);
		requestFrameVal = requestAnimationFrame(onRequestFrameFn);
	}
	//====================================
	generateDataTable = function()
	{
		p["timeChangedEvent"](
		{
			day: dayVal,
			hours:hoursVal,
			minute: minutesVal,
			height: tideHeight,
			moonAngle:moonAngle,
			isPlaying:isPlaying,
		});
		////trace("D : " + dayVal + " H : "+ hoursVal + " M : " + minutesVal + " Height : " + tideHeight);
	}
	//====================================
	function getObjectRotaion(centerX,centerY,orbitRadius,angle)
	{
		// ...... Calculating moon's X & Y position ..... //
		var orbit_x = Number((centerX + orbitRadius*Math.cos( angle*DEGTORADIAN)).toFixed(2));
		var orbit_y = Number((centerY - orbitRadius*Math.sin( angle*DEGTORADIAN)).toFixed(2));
		// ******************************************* //

		return {"x":orbit_x,"y":orbit_y};
	}

	function getScaleValForOrbit()
	{
		var orbAnglRef_1 = (moonAngle%360);
		if( orbAnglRef_1 <= 90 )
		{
			orbAnglRef_1 = orbAnglRef_1 + 0;
			neapTide(orbAnglRef_1);
		}
		else if( orbAnglRef_1 > 90 && orbAnglRef_1 <= 180 )
		{
			orbAnglRef_1 = orbAnglRef_1 - 90;
			springTide(orbAnglRef_1);
		}
		else if( orbAnglRef_1 > 180 && orbAnglRef_1 <= 270 )
		{
			orbAnglRef_1 = orbAnglRef_1 - 180;
			neapTide(orbAnglRef_1);
		}
		else if( orbAnglRef_1 > 270 && orbAnglRef_1 <= 360 )
		{
			orbAnglRef_1 = orbAnglRef_1 - 270;
			springTide(orbAnglRef_1);
		}

		orbAnglRef_1 = (moonAngle%360);
		
		//console.log("orbAnglRef_1 : " + orbAnglRef_1)
		
		// +++++++ Trigering Spring and Neap Tide Time ++++++++//
		if( (orbAnglRef_1 >= 0 && orbAnglRef_1 <= 5 ) || (orbAnglRef_1 >= 355.0067 && orbAnglRef_1 <= 360 ) || (orbAnglRef_1 >= 175.006 && orbAnglRef_1 <= 184.9927) )
		{
			drawText("Spring");
		}
		else if( (orbAnglRef_1 >= 85.007 && orbAnglRef_1 <= 95) || (orbAnglRef_1 >= 265 && orbAnglRef_1 <= 275) )
		{
			drawText("Neap");
		}
		else
		{
			drawText("none");
		}
		// ******************************************* //
	}
	//====================================
	drawText = function(arg)
	{
		if(p["tideChangedEvent"])
		{
		p["tideChangedEvent"](
		{
			text:arg
		});
		}
	}
	//====================================
	function springTide(orbAnglRef)
	{
		scaleFactor1 = p["minHeightscaleOfOrbit"] + orbAnglRef * ((p["maxHeightscaleOfOrbit"]-p["minHeightscaleOfOrbit"])/90);
		scaleFactor2 = p["maxWidthscaleOfOrbit"] - orbAnglRef * ((p["maxWidthscaleOfOrbit"]-p["minWidthscaleOfOrbit"])/90);
	}
	//====================================
	function neapTide(orbAnglRef)
	{
		scaleFactor1 = p["maxHeightscaleOfOrbit"] - orbAnglRef * ((p["maxHeightscaleOfOrbit"]-p["minHeightscaleOfOrbit"])/90);
		scaleFactor2 = p["minWidthscaleOfOrbit"] + orbAnglRef * ((p["maxWidthscaleOfOrbit"]-p["minWidthscaleOfOrbit"])/90);
	}
	//====================================
	generateAnimation = function ()
	{
		 //Creating Background.........
		_canvas3.width = _canvas3.width; // cleaning...
		contextForBg.drawImage(imageOfBg, 0, 0, p["width"], p["height"]);
		//End of Background/

		//Creating Orbit Animation........
		if(p.showOrbit)
			{
				contextForBg.translate(earthCenterX, earthCenterY);
				contextForBg.rotate(moonAngle*Math.PI/180*-1);
				contextForBg.translate(-earthCenterX, -earthCenterY);
				contextForBg.drawImage(imageOfOrbit, earthCenterX-(imageOfOrbit.width*scaleFactor1/2), earthCenterY-(imageOfOrbit.width*scaleFactor2/2),(imageOfOrbit.width*scaleFactor1),(imageOfOrbit.width*scaleFactor2));
			}//End of Orbit Animation/

		//Creating Earth GLOW.........
		contextForBg.drawImage(imageOfEarthGlow, (earthCenterX - (imageOfEarthGlow.width / 2)), (earthCenterY - (imageOfEarthGlow.height / 2)),imageOfEarthGlow.width,imageOfEarthGlow.height);
		//End of Earth GLOW.........

		//Creating Earth Animation.........
		_canvas2.width = _canvas2.width;   // cleaning...
		contextForEarth.translate(earthCenterX, earthCenterY);
		contextForEarth.rotate(earthAngle*DEGTORADIAN*-1);
		contextForEarth.translate(-earthCenterX, -earthCenterY);
		contextForEarth.drawImage(imageOfEarth, (earthCenterX-imageOfEarth.width/2), (earthCenterY-imageOfEarth.height/2),imageOfEarth.width,imageOfEarth.height);
		//End of Earth Animation/

		//Creating Moon Animation.........
		_canvas1.width = _canvas1.width;   // cleaning...
		contextForMoon.translate(moonCenterX, moonCenterY);
		contextForMoon.rotate(moonAngle*DEGTORADIAN*-1);
		contextForMoon.translate(-moonCenterX, -moonCenterY);
		
		imageOfMoon.width =  p.moonRadius
		imageOfMoon.height =  p.moonRadius
		
		contextForMoon.drawImage(imageOfMoon, (moonCenterX-imageOfMoon.width/2), (moonCenterY-imageOfMoon.height/2),imageOfMoon.width,imageOfMoon.height);
		//End of Moon Animation/
		
		if (p.showFlag)
			{
				contextForMoon.drawImage(imageOfFlag, (moonCenterX - imageOfFlag.width * 2.5), (moonCenterY - imageOfFlag.height), imageOfFlag.width, imageOfFlag.height);
			}

		if (p.showView)
			{
				_canvas5.width = _canvas5.width;
				contextForView.translate(earthCenterX, earthCenterY);
				contextForView.rotate((moonAngle * Maths.TO_RADIANS * -1));
				contextForView.translate(-earthCenterX, -earthCenterY);
				contextForView.drawImage(imageOfView, (earthCenterX - imageOfView.height / 5), (earthCenterY - imageOfView.height / 2), imageOfView.width, imageOfView.height);
			}

		//Creating Moon Shadow Animation.........
		_canvas4.width = _canvas4.width;   // cleaning...
		
		imageOfMoonShadow.width =  p.moonRadius + globalResizeCalc(2)
		imageOfMoonShadow.height =  p.moonRadius + globalResizeCalc(2)
		
		if(p.sunDirection == "right")
			{
				contextForMoonShadow.translate((moonCenterX+imageOfMoonShadow.width/2), (moonCenterY-imageOfMoonShadow.height/2));
				contextForMoonShadow.scale(-1, 1);
				contextForMoonShadow.drawImage(imageOfMoonShadow, 0/*(moonCenterX-imageOfMoonShadow.width/2)*/,0 /*(moonCenterY-imageOfMoonShadow.height/2)*/,imageOfMoonShadow.width,imageOfMoonShadow.height);
			}
			else
			{
				contextForMoonShadow.drawImage(imageOfMoonShadow, (moonCenterX-imageOfMoonShadow.width/2),(moonCenterY-imageOfMoonShadow.height/2),imageOfMoonShadow.width,imageOfMoonShadow.height);
			}

		//End of Moon Shadow Animation/
	}

	//====================================
	creatingCanvas = function ()
	{
		var _div = document.createElement("div");
		p.target.append(_div)

		p.target = $(_div)
		p.target.css({"position":"absolute"})

		_canvas1 = document.createElement("canvas");
		_canvas2 = document.createElement("canvas");
		_canvas3 = document.createElement("canvas");
		_canvas4 = document.createElement("canvas");
		_canvas5 = document.createElement("canvas");

		_canvas1.setAttribute("id","CanvasForMoon_"+p.id);
		_canvas2.setAttribute("id","CanvasForEarth_"+p.id);
		_canvas3.setAttribute("id","CanvasForBg_"+p.id);
		_canvas4.setAttribute("id","CanvasForMoonShadow_"+p.id);
		_canvas5.setAttribute("id","CanvasForView_"+p.id);


		_canvas1.setAttribute("width",p["width"]);		_canvas1.setAttribute("height",p["height"]);
		_canvas2.setAttribute("width",p["width"]); 		_canvas2.setAttribute("height",p["height"]);
		_canvas3.setAttribute("width",p["width"]);		_canvas3.setAttribute("height",p["height"]);
		_canvas4.setAttribute("width",p["width"]);		_canvas4.setAttribute("height",p["height"]);
		_canvas5.setAttribute("width",p["width"]);		_canvas5.setAttribute("height",p["height"]);

		p["target"].append(_canvas3)
		p["target"].append(_canvas1)
		p["target"].append(_canvas4)
		p["target"].append(_canvas2)
		p["target"].append(_canvas5)

		$("#CanvasForMoon_"+p.id).css({"position":"absolute","left":p.x+"px","top":p.y+"px",});
		$("#CanvasForEarth_"+p.id).css({"position":"absolute","left":p.x+"px","top":p.y+"px",});
		$("#CanvasForBg_"+p.id).css({"position":"absolute","left":p.x+"px","top":p.y+"px",});
		$("#CanvasForMoonShadow_"+p.id).css({"position":"absolute","left":p.x+"px","top":p.y+"px"});
		$("#CanvasForView_"+p.id).css({"position":"absolute","left":p.x+"px","top":p.y+"px"});

		contextForMoon = _canvas1.getContext("2d");
		contextForEarth = _canvas2.getContext("2d");
		contextForBg = _canvas3.getContext("2d");
		contextForMoonShadow = _canvas4.getContext("2d");
		contextForView = _canvas5.getContext("2d");

		widthOfMoon = p["width"];
		heightOfMoon = p["height"];

		earthCenterX = widthOfMoon/2;
		earthCenterY = heightOfMoon/2;
	}
	//====================================
	creatingImages = function ()
	{
		imageOfMoon = gizmoImageObj[p.moonImgPath]
		imageOfEarth = gizmoImageObj[p.earthImgPath]
		imageOfOrbit = gizmoImageObj[p.orbitImgPath]
		imageOfMoonShadow  = gizmoImageObj[p.moonShadowImgPath]
		imageOfBg = gizmoImageObj[p.BgImgPath]
		imageOfEarthGlow = gizmoImageObj[p.earthGlowImgPath]
		imageOfFlag = gizmoImageObj[p.flagImgPath]
		imageOfView = gizmoImageObj[p.viewImgPath]


		//console.log(gizmoImageObj)
		imageOfMoon.width = globalResizeCalc(imageOfMoon.width)
		imageOfMoon.height = globalResizeCalc(imageOfMoon.height)

		imageOfEarth.width = globalResizeCalc(imageOfEarth.width)
		imageOfEarth.height = globalResizeCalc(imageOfEarth.height)

		if(imageOfOrbit)
		{
			imageOfOrbit.width = globalResizeCalc(imageOfOrbit.width)
			imageOfOrbit.height = globalResizeCalc(imageOfOrbit.height)
		}

		imageOfMoonShadow.width = globalResizeCalc(imageOfMoonShadow.width)
		imageOfMoonShadow.height = globalResizeCalc(imageOfMoonShadow.height)

		imageOfBg.width = globalResizeCalc(imageOfBg.width)
		imageOfBg.height = globalResizeCalc(imageOfBg.height)

		imageOfEarthGlow.width = globalResizeCalc(imageOfEarthGlow.width)
		imageOfEarthGlow.height = globalResizeCalc(imageOfEarthGlow.height)

		if(imageOfFlag)
		{
			imageOfFlag.width = globalResizeCalc(imageOfFlag.width)
			imageOfFlag.height = globalResizeCalc(imageOfFlag.height)
		}

		if(imageOfView)
		{
			imageOfView.width = globalResizeCalc(imageOfView.width)
			imageOfView.height = globalResizeCalc(imageOfView.height)
		}

		//imageOfMoon.src = p["moonImgPath"];
		// imageOfEarth.src = p["earthImgPath"];
		// imageOfOrbit.src = p["orbitImgPath"];
		// moonShadow.src = p["moonShadowImgPath"];
		// imageOfBg.src = p["BgImgPath"];


		$(imageOfEarth).load(function ()
			{
				generateAnimation();
			})
	}
	//====================================
	creatingOtherStuff = function()
	{
		//var _earthShadow = document.createElement("div");

		_earthShadow/* .src */ = gizmoImageObj[p.earthShadowImgPath]//.src//p["earthShadowImgPath"];
		_earthShadow.width = globalResizeCalc(_earthShadow.width)
		_earthShadow.height = globalResizeCalc(_earthShadow.height)

		_earthShadow.setAttribute("id","earthShadow_"+p.id);
		p["target"].append(_earthShadow);

		earthShadow = $("#earthShadow_"+p.id)
		var leftVal = p["width"] / 2 - p["earthShadowWidth"] / 2;//(p["earthShadowWidth"]/2)*-1;
		var topVal = p["height"] / 2 - p["earthShadowHeight"] / 2;//(p["earthShadowHeight"]/2)*-1;
		earthShadow.css(
		{
				"position":"absolute",
				"left":p.x+"px"/* "50%" */,"top":p.y+"px"/* "50%" */,
				"margin-top":topVal+"px",
				"margin-left":leftVal+"px",
				"width":p["earthShadowWidth"]+"px",
				"height":p["earthShadowHeight"]+"px",
				"pointer-events":"none",
				"-moz-pointer-events":"none",
				"-webkit-pointer-events":"none"
				//"background":"url("+gizmoImageObj[p.earthShadowImgPath].src+")"
		}).addClass("earthShadow");

		if(p.sunDirection == "right")
		{
			earthShadow.css(
				{
					"transform": "rotateY(180deg)"
				})
		}


	}
	//====================================

	function onMove(e)
	{
		addPointerGrabbing(true);
		if(isPlaying || !allowMoonDrag) return;
		if (e.type == "touchstart" || e.type == "touchmove") {
			e.pageX = e.originalEvent.touches[0].pageX;
			e.pageY = e.originalEvent.touches[0].pageY;
		}

		isDragging = true;
		mouseX = e.pageX - $(_canvas2).offset().left;
		mouseY = e.pageY - $(_canvas2).offset().top;

		var earth = new Object();
		earth.x = earthCenterX;
		earth.y = earthCenterY;

		var arg2 = new Object();
		arg2.x = mouseX;
		arg2.y = mouseY;

		pTimeMinutesOld = 0;

		var moonOffset = newMoonAngle - moonAngle ;

		var newMoonAngle = getAngle(earth,arg2);

		var obj = getObjectRotaion(earthCenterX,earthCenterY,p["moonOrbitRadius"],newMoonAngle);
		moonCenterX = obj.x;
		moonCenterY = obj.y;
		//generateAnimation();
		pTimeMinutes = getPTimeMinutes(newMoonAngle);

		//setTimeout(function(){

			generateDataTable();
			setEarthRotation();
			//setMoonRotation();
			displayDHM();
			setTideHeight();
			moonAngle = newMoonAngle;
			getScaleValForOrbit();
			generateAnimation();

			if(isAllowToUpdate)
			{
				drawGraph(getDays(pTimeMinutes),tideHeight);
			}
			////trace(" time : " + pTimeMinutes + " :: " + newMoonAngle)
		//},50);
	}
	function onDown(e)
	{
		if (e.type == "touchstart") {
			e.pageX = e.originalEvent.touches[0].pageX;
			e.pageY = e.originalEvent.touches[0].pageY;
		}
		
		mouseX = e.pageX - $(this).offset().left;
		mouseY = e.pageY - $(this).offset().top;

		var MW = p.moonRadius/2;
		var MH = p.moonRadius/2;

		////trace((mouseX > (moonCenterX-MW) && mouseX < (moonCenterX + MW) && mouseY > (moonCenterY-MH) && mouseY < (moonCenterY + MH)))


		if (mouseX > (moonCenterX - MW) && mouseX < (moonCenterX + MW) && mouseY > (moonCenterY - MH) && mouseY < (moonCenterY + MH) && !isPlaying)
			{
				if (BrowserDetect.any()) {
					$(_canvas5).unbind('touchmove', onMove).bind('touchmove', onMove);
					$(_canvas5).unbind('touchend', onUp).bind('touchend', onUp);
				} else {
					$(window).unbind('mousemove', onMove).bind('mousemove', onMove);
					$(window).unbind('mouseup', onUp).bind('mouseup', onUp);
				}
				allowMoonDrag = true;
				addPointerGrabbing(true);
				// _canvas5.addEventListener("touchmove", onMove, false);
				// _canvas5.addEventListener("touchend", onUp, false);
				// $(window).unbind("mousemove", onMove).bind("mousemove", onMove);
				// $(window).unbind("mouseup", onUp).bind("mouseup", onUp);
			}
			else
			{
				allowMoonDrag = false;
			}
		e.preventDefault();
	}
	function onUp(e)
	{
		addPointerGrabbing(false);
		allowMoonDrag = false;
		_canvas5.removeEventListener("touchmove", onMove, false);
		$(window).unbind("mousemove", onMove);
		$(window).unbind("mouseup", onUp);
		isDragging = false;
	}
	function getAngle(earth,mouse)
	{
		var temp = (Math.atan((mouse.y-earth.y)/(mouse.x-earth.x))/DEGTORADIAN);
		var angle = 0;
		if(mouse.x == earth.x && mouse.y > earth.y )
		{
			angle = 90;
		}
		else if(mouse.x > earth.x && mouse.y > earth.y )
		{
			angle = temp;
		}
		else if (mouse.x < earth.x && mouse.y > earth.y )
		{
			angle = temp + 180;
		}
		else if (mouse.x < earth.x && mouse.y < earth.y )
		{
			angle = temp + 180;
		}
		else if (mouse.x == earth.x && mouse.y < earth.y )
		{
			angle = 270;
		}
		else if (mouse.x > earth.x && mouse.y < earth.y )
		{
			angle = temp + 360;
		}

		return Number((360 - angle).toFixed(2));
	}
	trace = function(msg)
	{
		console.log(msg);
	}

	function title(e)
	{
		if (e.type == "touchstart" || e.type == "touchmove") {
			e.pageX = e.originalEvent.touches[0].pageX;
			e.pageY = e.originalEvent.touches[0].pageY;
		}
		mouseX = e.pageX - $(_canvas5).offset().left;
		mouseY = e.pageY - $(_canvas5).offset().top;
		var MW = p.moonRadius/2;
		var MH = p.moonRadius/2;
		if (mouseX > (moonCenterX - MW) && mouseX < (moonCenterX + MW) && mouseY > (moonCenterY - MH) && mouseY < (moonCenterY + MH) && !isPlaying)
			{
				p.moonTitle = p.moonTitle;
				$(_canvas5).attr(
					{
						p_title:  GCTConv(GlobalTextObj.moonTitle)
					})
					$(_canvas5).addClass("commongrab")
				}
				else
					{
						if ($(_canvas5).attr("p_title")) $(_canvas5).attr("p_title","");
						$(_canvas5).removeClass("commongrab")
					}
					e.preventDefault();
		}
}
