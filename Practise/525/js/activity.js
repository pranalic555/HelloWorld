var drugDosage = function() {

    var m = 
	{
        _this: null,
        spineObj: null,
        veinObj: null,
		curZoomLevelX: 0,
        curZoomLevelY: 0,
		curGZoomLevelX: 0,
        curGZoomLevelY: 0,
		pChecked : 0,
		pillFlag : false,
		timer : 0,
    }
	
	var pDrugBrain, pAddDyeSliderValue, pGizmoBrain, pAdvancedFeatures
	var pDrawBarGraph, pBarChartTot
	var pDataPoints
	var pActive, pCurrentTab
	var pTime, pDeltaTime, pSpeed, pStep
	var pPillType, pPillList
	var pSituationGhostStat
	var aList =[]
	var tSeconds;
	var pDrugInBody ,pDrugInOrgan;
	var pDrugInBody, pDrugInOrgan
	var pWaterInBody, pWaterInOrgan
	var pFlowIntoBody, pFlowOutOfBody
	var pFlowIntoOrgan, pFlowOutOfOrgan
	var pMemList = ["patient_0.png","patient_1.png","patient_2.png","patient_3.png"];
	var pPillPopActive = 0
	
	//neutral , takePill , smile ,frown
	
    this.init = function() 
	{
        m._thisRef = this;
        m.spineObj = new SpineClass();
        m.veinObj = new VeinClass();

        m.spineObj.tabComp.addEventListener("change", tabEvent);
        m.spineObj.controlBtn.addEventListener("click", systemBtnEvent);
        m.spineObj.controlBtn.setDisable("pause");
        m.spineObj.controlBtn.setDisable("reset");

        m.spineObj.sliderComp.addEventListener("slide", sliderEvent);
        m.spineObj.sliderComp.addEventListener("change", sliderEvent);
        m.spineObj.tField.addEventListener("change", tFieldEvent);
    
		m.spineObj.dropDown.addEventListener("onIndxSelect", dropDownEvent);
		
        m.spineObj.pillButton.addEventListener("click", onPillButton);
		m.spineObj.recordBtn.addEventListener("click", recordData);
        m.spineObj.exportBtn.addEventListener("click", genBtnEvent);

        m.spineObj.checkBox.addEventListener("change", checkBoxEvt)

		m.spineObj.advControlsB.addEventListener("onevent", barControlBtnEvent);
		m.spineObj.advControlsG.addEventListener("onevent", graphControlBtnEvent);
		
		m.spineObj.cameraIcon_0.addEventListener("click", onCameraClick);
		m.spineObj.cameraIcon_2.addEventListener("click", onCameraClick);
		m.spineObj.cameraIcon_3.addEventListener("click", onCameraClick);
	
		m.spineObj.status_bk.updateStyle("contDiv" , {"width" : "70%"});
		m.spineObj.pillButton.disable()
		beginSprite()
		initialize()
		
		
		m.spineObj.tableObj.setCellStyle(0,0,{"border-top":"1px solid #A7A7A7",});
		m.spineObj.tableObj.setCellStyle(0,1,{"border-top":"1px solid #A7A7A7",});
		m.spineObj.tableObj.setCellStyle(0,2,{"border-top":"1px solid #A7A7A7",});
		
    }
	
	function beginSprite()
	{
		
		pTime = 0.0
		pStep = 0
		pDeltaTime = 1.0 //-- 1 second?
		pSpeed = 1  //-- this should be adjustable with a slider
		pPillList = []
		pPillType = "aspirin"
		pDrugInBody = 0.0
		pDrugInOrgan = 0.0
		pWaterInBody = 3000.0
		pWaterInOrgan = 900.0
		pFlowOutOfBody = 0.2
		pFlowIntoBody = 0.2
		pFlowIntoOrgan = 0.0
		pFlowOutOfOrgan = 0.0 

		pAdvancedFeatures = 0
		pBarChartTot = []
		pActive = 0 
		pCurrentTab = "description"
		aList = convertSeconds_ReturnInList(pTime)
		aDay = aList[0]
		aHr = aList[1]
		aMin = aList[2]
		m.spineObj.tField_D.setValue(aDay);
		m.spineObj.tField_H.setValue(aHr);
		m.spineObj.tField_M.setValue(aMin);
		
		pSituationGhostStat = 0
		displayThings()
		// $(".jugadDiv").hide();
	}
  
	function initialize()
	{
		if(pGizmoBrain == null) 
		{
			//pGizmoBrain = sendAllSprites(#fetchNamedElement, "gizmobrain")
		}

		pDrawBarGraph = 1
		//sendallsprites(#bufferXAxisLabels, "bar", [" ", " "])
		doBarGraph(0)
		doTheGraph("cycle")
	}
	
	function resetData()
	{
		pActive = 0
		pTime = 0.0
		pDrugInBody = 0.0
		pDrugInOrgan = 0.0
		m.pillFlag = false
		pPillList = []
		pDataPoints = []
		bigList = {}
		bigList2 = {}
		idCounter = 1;
		tList
		doBarGraph(0,true)
		doTheGraph("reset")
		pPillPopActive = 0
		curImg = "patient_0"
		m.spineObj.patientImg_0.setSource(gizmoImageObj['patient_0.png'].src);
		m.spineObj.tableObj.clearData();
		m.spineObj.graphComp.cleanAll();
		m.spineObj.pillButton.disable()
		m.spineObj.dropDown.setStatus(true)
		setClock()
		displayThings()
	}
   
    function tabEvent(e)
	{
        $(".acthold").hide();
		// $(".jugadDiv").hide();
        $("#acttab_" + e.index).show();
		if(e.index == 2)
		{
			m.spineObj.advControlsB.show()
			m.spineObj.advControlsG.hide()
			if(m.spineObj.dropDown.getSelcetedIndex() == 0 || m.spineObj.dropDown.getSelcetedIndex() == 1)
				// $(".jugadDiv").show();
			
			dropDownEvent({value:m.spineObj.dropDown.getSelcetedIndex()},true);
		}
		else if(e.index == 3)
		{
			m.spineObj.advControlsG.show()
			m.spineObj.advControlsB.hide()
		}
		else
		{
			m.spineObj.advControlsB.hide()
			m.spineObj.advControlsG.hide()
		}
    }

    function sliderEvent(e) 
	{
		var sVal = Number(e.value)
        m.spineObj.tField.setValue(m.spineObj.sliderComp.value());
		pSpeed = 1 + (sVal-1) * 5
    }

    function tFieldEvent(e) 
	{
        m.spineObj.sliderComp.value(Number(m.spineObj.tField.getValue()));
    }

	function dropDownEvent(e,flag)
	{
		var val = Number(e.value)
		switch(val)
		{
			case 0:
				aVal = 0.0 // -- flow in/out of organ
				aStat = 0 	//-- advanced features
				bVal = 900.0  //-- water capacity of organ
				pPillType = "aspirin"
				m.pChecked = 0;
				pAdvancedFeatures = 0;
				m.spineObj.organ_value.setText("n/a")
				m.spineObj.purpDot_Img.hide();
				m.spineObj.organG_label.hide();
				m.spineObj.organB_label.hide();
				// m.spineObj.tabComp.activeTab() == 2 ? $(".jugadDiv").show() :  $(".jugadDiv").hide() ;
			break;
			case 1:
				aVal = 0.0
				aStat = 0
				bVal = 900.0
				pPillType = "cold"
				m.pChecked = 0;
				pAdvancedFeatures = 0;
				m.spineObj.organ_value.setText("n/a")
				m.spineObj.purpDot_Img.hide();
				m.spineObj.organG_label.hide();
				m.spineObj.organB_label.hide();
				// m.spineObj.tabComp.activeTab() == 2 ? $(".jugadDiv").show() :  $(".jugadDiv").hide() ;
			break;
			case 2:
				aVal = 0.1
				aStat = 1
				bVal = 300.0
				pPillType = "targetA"
				m.pChecked = 1;
				pAdvancedFeatures = 1;
				if(!flag)
					m.spineObj.organ_value.setText("0.00")
				m.spineObj.purpDot_Img.show();
				m.spineObj.organG_label.show();
				m.spineObj.organB_label.show();
				// $(".jugadDiv").hide();
			break;
			case 3:
				aVal = 0.1
				aStat = 1
				bVal = 900.0
				pPillType = "targetB"
				m.pChecked = 1; 
				pAdvancedFeatures = 1;
				if(!flag)
					m.spineObj.organ_value.setText("0.00")
				m.spineObj.purpDot_Img.show();
				m.spineObj.organG_label.show();
				m.spineObj.organB_label.show();
				// $(".jugadDiv").hide();
			break;
			
		}
		
		pFlowIntoOrgan = aVal
		pFlowOutOfOrgan = aVal
		pWaterInOrgan = bVal
		
		doBarGraph(0);
		
	}
 
	var change = false
	function onPillButton(e)
	{ 
		pPillList.push([pTime,pPillType])
		m.timer = 0;
		m.spineObj.patientImg_0.setSource(gizmoImageObj['patient_1.png'].src);
		// if(currState != "pause")
			globalAnimClassObject.start({id:"testTime",fps:25,frame:watchEvent})
		change = false
		m.pillFlag = true 
		pPillPopActive = 1;
		doBarGraph(0)
		displayThings()
		
	}
	var curImg = "patient_0"
	function watchEvent()
		{
			// console.log("here")
			if(Number((m.timer).toFixed(1)) > 0.8)
				{
					if(currState == "pause" && curImg == "patient_3")
					{
							m.spineObj.patientImg_0.setSource(gizmoImageObj['patient_3.png'].src);
					}
					else
						m.spineObj.patientImg_0.setSource(gizmoImageObj[curImg+'.png'].src);
						// m.spineObj.patientImg_0.setSource(gizmoImageObj['patient_0.png'].src);
					change = true
					globalAnimClassObject.stop('testTime');
					
				}		
			m.timer += 0.1 ;
		}
		
    function checkBoxEvt(e) 
	{
       m.spineObj.barChart.showNumbers(e.checked);
    }

	var currState = "reset"
    function systemBtnEvent(e)
	{
		currState = e.btnType
        switch (e.btnType) 
		{
            case "play":
                m.spineObj.controlBtn.setDisable("play");
                m.spineObj.controlBtn.setEnable("pause");
                m.spineObj.controlBtn.setEnable("reset");
				pActive = 1;
				m.spineObj.pillButton.enable()
				m.spineObj.dropDown.setStatus(false)
				globalAnimClassObject.start({id:'frameId',fps:50,frame:exitFrame});
			break;
            case "pause":
                m.spineObj.controlBtn.setEnable("play");
                m.spineObj.controlBtn.setDisable("pause");
                globalAnimClassObject.stop('frameId');
			break;
            case "reset":
                m.spineObj.controlBtn.setEnable("play");
                m.spineObj.controlBtn.setDisable("reset");
                m.spineObj.controlBtn.setDisable("pause");
				resetData()
                globalAnimClassObject.stop('frameId');
			break;
        }
    }


	
	function exitFrame()
	{
		
		if(pActive)
		{
			for(var i = 1;i <= pSpeed ; i++ )
			{

				// -- deal with incremental water/drug flows of things
				myDeleteList = []
				// -- find out how much drug to add to the body
				var len  = pPillList.length;
				////console.log(len)
					for(var j = 0 ; j < len ;j++)
					{	
						thisPill = pPillList[j]
						pillType = thisPill[1]
						aStartTime = thisPill[0]
						
						if(pillType == "aspirin") 
						{

							if(pTime - aStartTime > 1800 && pTime - aStartTime < 2700 )
							{
								myAmount = 2. * 0.8 /9 //-- for an aspirin, 80% of the 200 mg goes in to body, peaks at 1.5 hours
								//////////console.log(myAmount,"MY")
								addDrugToBody(myAmount)
							}
							if(pTime - aStartTime > 2700) 
							{
								myDeleteList.push(j)
							}
						}
						else if( pillType == "cold")
						{
							if(pTime - aStartTime > 1800 && pTime - aStartTime < 2700) 
							{
								myAmount = 2. * 0.4 /9 
								addDrugToBody(myAmount)
							}
							else if( pTime - aStartTime > 2700 && pTime - aStartTime < 17000 )
							{
								myAmount = 0.015  
								addDrugToBody(myAmount)
							}         
							else if(pTime - aStartTime > 17000 && pTime - aStartTime < 21000 ) 
							{
								myAmount = 0.001  
								addDrugToBody(myAmount)
							}
							if( pTime - aStartTime > 21000 ) 
							{
								myDeleteList.push(j)
							}
						}
					else if(pillType == "targetA" ) 
						{
							if(pTime - aStartTime > 1800 && pTime - aStartTime < 2700 ) 
							{
								myAmount = 2. * 0.8 /9 
								addDrugToBody(myAmount)
								
							}
							if(pTime - aStartTime > 2700)
							{
								myDeleteList.push(j)
								////console.log(j,"amount",pTime - aStartTime)
							}
						}
					else if(pillType == "targetB")
						{
							if( pTime - aStartTime > 1100 && pTime - aStartTime < 2100) 
							{
								myAmount = .04  
								addDrugToBody(myAmount)
							}
							else if( pTime - aStartTime > 2100 && pTime - aStartTime < 19000)
							{
								myAmount = 0.002  
								addDrugToBody(myAmount)				
							}
							else if(pTime - aStartTime > 19000 && pTime - aStartTime < 21000)
							{
								myAmount = 0.03 
								addDrugToBody(myAmount)
							}
							if(pTime - aStartTime > 21000) 
							{
								myDeleteList.push(j)
							}
						}
					} // j  over 
     // -- remove any pills that were marked for deletion
	myDeleteList.sort(function(a, b){return a-b});
    for(var k = myDeleteList.length-1 ; k >= 0 ; k--)
	{ 
		pPillList.splice(myDeleteList[k],1)
        //put "this was a pill deletion"
	}   
    
	if(pTime > 720000)
		{
			globalAnimClassObject.stop("frameId")
			break;
		}
	advanceInTime()
    pTime = pTime + pDeltaTime
	
	if((parseInt(pTime) % 1200) == 0)  
		{
			doTheGraph("add")  
		}
      
	} // i over 
    doBarGraph(0)
	displayThings()
	changeMouthFace()
	setClock();
  
   
	}
} //exitFrame

function advanceInTime()
{
	
  if(pWaterInBody == 0)
  {
	pWaterInBody = 1.0 
  }
  
  if(pWaterInOrgan == 0)
  {
	pWaterInOrgan = 1.0 
  }
  
  //////////console.log(pDrugInOrgan ,"pDrugInOrgan")
  var drugPerWaterInBody = (pDrugInBody/pWaterInBody)
  var drugPerWaterInOrgan = (pDrugInOrgan/pWaterInOrgan)
  
  //-- throw one chunk of water (including drug) in to the trash
  removeDrugFromBody(drugPerWaterInBody*pFlowOutOfBody)
  removeWaterFromBody(pFlowOutOfBody)
  
  //-- move chunk of content from body to organ
  removeDrugFromBody(drugPerWaterInBody*pFlowIntoOrgan)
  addDrugToOrgan(drugPerWaterInBody*pFlowIntoOrgan)
  removeWaterFromBody(pFlowIntoOrgan)
  addWaterToOrgan(pFlowIntoOrgan)
  
  
  //-- move chunk from organ to body 
  removeDrugFromOrgan(drugPerWaterInOrgan*pFlowOutOfOrgan)
  addDrugToBody(drugPerWaterInOrgan*pFlowOutOfOrgan)
  removeWaterFromOrgan(pFlowOutOfOrgan)
  addWaterToBody(pFlowOutOfOrgan)
  
  //-- add clear fluid to the body
  addWaterToBody(pFlowIntoBody)
  
  
 
}



function addDrugToOrgan(howMuch)
{
	//////console.log(pDrugInOrgan,"a")
	pDrugInOrgan = pDrugInOrgan + howMuch
}

function addDrugToBody(howMuch)
{
	pDrugInBody = pDrugInBody + howMuch
	
}

function removeDrugFromOrgan(howMuch)
{
	//////console.log(pDrugInOrgan,"R")
	pDrugInOrgan = pDrugInOrgan - howMuch
}
  
function removeDrugFromBody(howMuch)
{
	pDrugInBody = pDrugInBody - howMuch
}
  
function addWaterToBody(howMuch)
{
	pWaterInBody = pWaterInBody + howMuch
}
  
function addWaterToOrgan(howMuch)
{
	pWaterInOrgan = pWaterInOrgan + howMuch
}
 
function removeWaterFromBody(howMuch)
{
	pWaterInBody = pWaterInBody - howMuch
}

function removeWaterFromOrgan(howMuch)
{
	pWaterInOrgan = pWaterInOrgan - howMuch
}


function displayThings()
{
	//the floatPrecision = 4 
 var bodyPerc = pDrugInBody/pWaterInBody
 var organPerc = pDrugInOrgan/pWaterInOrgan
  //bodySpr = sendAllSprites(#fetchNamedElement, "body")
 // organSpr = sendAllSprites(#fetchNamedElement, "organ")
  
 // --  sprite(bodySpr).blend = min(100, integer(bodyPerc*10))
 // --  sprite(organSpr).blend = min(100, integer(organPerc*10))
  blood = 5.5
  organblood = 0.183
  //the floatPrecision = 2
	var bloodDrug = pDrugInBody/blood
	bloodDrug = bloodDrug.toFixed(2);
	
  m.spineObj.blood_value.setText(bloodDrug)
  
  //---------------- hard coded hack ---------  THIS REALLY HURTS
  //aSpr = sendAllSprites(#fetchNamedElement, "additional.features.checkbox")
  
  var organDrug = pDrugInOrgan/organblood
  organDrug = organDrug.toFixed(2);
  if(m.pChecked == 1)
  {
	   m.spineObj.organ_value.setText(organDrug)
  }
  else
  {
	  m.spineObj.organ_value.setText("n/a")
  }
  
}

var pDataPoints = new Array()
var bigList = {}
var bigList2 = {}

	function doTheGraph(which)
	{
		if(pDrugInBody == 0 && pDrugInOrgan == 0) return;
		waterInBody = pWaterInBody
		drugInBody = pDrugInBody
		waterInOrgan = pWaterInOrgan
		drugInOrgan = pDrugInOrgan
		theStep = pTime

		blood = 5.5
		organblood = 0.183
		bodyConc = drugInBody / blood
		organConc = drugInOrgan / organblood
		if(m.pillFlag)
		{
			pDataPoints.push([pTime/3600., bodyConc, organConc, which])
			if(pDataPoints.length > 600 ) 
			{
				if(pDataPoints.length > 1)
				{
					pDataPoints.splice(1,1)	
				}   
			}
			for(var i = 0 ; i < pDataPoints.length ;i++)
			{
				aData = pDataPoints[i]
				t = aData[0]
				y1 = aData[1]
				y2 = aData[2]
				aType = aData[3]
				if(y1 > 0.05)
				{
					bigList={
					"id":idCounter++,
					"x": Number(t),
					"y": Number(y1),
					"color":"#10AEA1",
					}
				}
				if(pAdvancedFeatures && y2 > 0.10) 
				{
					bigList2 =
					{
					"id":idCounter++,
					"x": Number(t),
					"y": Number(y2),
					"color":"#8F62EF",
					}
				}
			}
		}	
		m.spineObj.graphComp.drawInterPoint(bigList)
		m.spineObj.graphComp.drawInterPoint(bigList2)	   
	}
var idCounter = 1;
var graphArr = new Array();
function drawPoints(bigList)
	{
			m.spineObj.graphComp.cleanAll();
			
			for(var i=0; i<bigList.length; i++)
			{
				graphArr.push({
					x:bigList[i].x,
					y:bigList[i].y, 
					id:i+1, 
					color: bigList[i].color});
			}
			m.spineObj.graphComp.drawInterPoint(graphArr)
			
	}

	var pBarChartTot = new Array()
	var bars = new Array()
	var bars2 = new Array()
	var barArr = new Array()
	var barArr2 = new Array()
	
	function doBarGraph(useBufferLabels, _reset)
	{
		if(!pDrawBarGraph) 
		{
		//break;  //exit
		}	 
		if(useBufferLabels == null)
		{
			useBufferLabels = 0  
		}

		if(!_reset)
			if(pDrugInBody == 0 && pDrugInOrgan == 0) return;
		// console.log(pDrugInBody)
		// console.log(pDrugInOrgan)
		waterInBody = pWaterInBody
		drugInBody = pDrugInBody
		waterInOrgan = pWaterInOrgan
		drugInOrgan = pDrugInOrgan
		theStep = pTime
		bodyConc = drugInBody/waterInBody
		organConc = drugInOrgan/waterInOrgan
		
		if(!pAdvancedFeatures) 
		{
			organConc = 0.00  
		}

		m.spineObj.barChart.reArrangeGraph({barProp:{start: 0.3,end:0.9,gap:0.3}});
		
		if(pAdvancedFeatures) 
		{
			blood = 5.5
			organblood = 0.183
			pBarChartTot = [drugInBody / blood , drugInOrgan / organblood]  //--[drugInBody, drugInOrgan] --[bodyConc, organConc]
			//aList = duplicate(pBarChartTot)
			aList = pBarChartTot.slice(0)
			////////console.log(aList,"list")
			colSpacing = 0.05 //-- in virtual units
			colN = aList.length
			colW = 0.3  //-- in virtual units

			L = 0.04
			T = 0
			R = 0
			B = 0

			solution = (aList[0])
			solution2 = (aList[1])
			bars.push({"x": 0.3 , "y" : solution})
			bars2.push({"x": 0.5 , "y" : solution2 })
		}
		else
		{
			blood = 5.5
			organblood = 0.183
			pBarChartTot = [drugInBody / blood ]
			// --    pBarChartTot = [drugInBody, drugInBody] / blood  --[bodyConc]
			//aList = duplicate(pBarChartTot)
			aList = pBarChartTot.slice(0)
			colSpacing = 0.05 // -- in virtual units
			colN = aList.length
			colW = 0.3  //-- in virtual units

			L = 0.04
			T = 0
			R = 0
			B = 0
			solution = (aList[0]);
			bars.push({"x": 0.3 , "y" : solution})
		}
		var barX ,barY,barX2 ,barY2 ;
		//console.log(colN)
		if(colN == 1)
		{
			for(var i = 0 ;i < bars.length ; i++)
			{
				barArr = []
				barX = Number(bars[i].x);
				barY = Number((bars[i].y));
				barArr.push({
				data:[{x : barX , y: Number(barY.toFixed(2))}],
				id:1,
				color:"rgba(3,170,155,0.5)", 
				borderColor:"#03AA9B",
				borderWidth:1,
				reset:true,
				label:""});				
			}
			m.spineObj.barChart.setUserLines(barArr);
		}
		else
		{
			barArr = []
			barArr2 = []
			for(var i = 0 ;i < bars.length ; i++)
			{
				barX = Number(bars[i].x);
				barY = Number(bars[i].y);
				barArr.push({
				data:[{x :barX, y: Number(barY.toFixed(2))}],
				id:1,
				color:"rgba(3,170,155,0.5)", 
				borderColor:"#03AA9B",
				borderWidth:1,
				reset:true,
				label:""});
			}
			
			m.spineObj.barChart.setUserLines(barArr);
			for(var j = 0 ;j < bars2.length ; j++)
			{
				barX2 = Number(bars2[j].x);
				barY2 = Number(bars2[j].y);
				barArr2.push({
				data:[{x : barX2, y: Number(barY2.toFixed(2))}],
				id:2,
				color:"rgba(143,98,239,0.5)", 
				borderColor:"#8F62EF",
				borderWidth:1,
				reset:true,
				label:""});
			}
			m.spineObj.barChart.setUserLines(barArr2);
		}
	}

	function recordData(aFlag)
	{
		if(pDrugInBody == 0 && pDrugInOrgan == 0)return;
		if(aFlag == null) 
		{
			aFlag = ""
		}
		waterInBody = pWaterInBody
		drugInBody = pDrugInBody
		waterInOrgan = pWaterInOrgan
		drugInOrgan = pDrugInOrgan
		blood = 5.5
		organblood = 0.183
		bodyConc = drugInBody / blood
		organConc = drugInOrgan / organblood
		var body = (bodyConc.toFixed(2))
		var organ = (organConc.toFixed(2))
		if(!pAdvancedFeatures)  
		{
			organConc = " n/a "
			organ = " n/a "
		}

		if(!pAdvancedFeatures) 
		{
			drugInOrgan = " n/a "
		}
		var tList = new Array();
		tList = [];
		theTime = secondsToTime(pTime)
		tList.push(theTime)
		tList.push(body)
		tList.push(organ)
		m.spineObj.tableObj.addData(tList);
	}

function changeMouthFace()
{
	/* if(pDrugBrain == null)
	{
		return
	} */
  
  //pSprite.member = pMemList[4] -- neutralize to flat face in case nothing pops up
	if(!pPillPopActive)
		{
				curImg = "patient_0"
				m.spineObj.patientImg_0.setSource(gizmoImageObj['patient_0.png'].src);
		}	 
	else if(change)
	{
		waterInBody = pWaterInBody
		drugInBody = pDrugInBody
		waterInOrgan = pWaterInOrgan
		drugInOrgan = pDrugInOrgan
  
		blood = 5.5
		organblood = 0.183
		bodyConc = drugInBody / blood
		organConc = drugInOrgan / organblood
  
  //--  bodyConc = drugInBody/waterInBody
 // --  organConc = drugInOrgan/waterInOrgan

  if(pPillType == "aspirin" ) 
  {
    highVal = 30.0
    lowVal = 11.0
			if(bodyConc > highVal) 
			{
			 // -- not happy overdose
			 curImg = "patient_4"
			  m.spineObj.patientImg_0.setSource(gizmoImageObj['patient_4.png'].src);
			 // pSprite.member = pMemList[2]
			}
			else if(bodyConc < lowVal)
			{
				//sad 
				curImg = "patient_0"
				m.spineObj.patientImg_0.setSource(gizmoImageObj['patient_0.png'].src);
			}
			else if( bodyConc <= highVal && bodyConc >= lowVal )
			{
				// -- happy
				curImg = "patient_3"
				 m.spineObj.patientImg_0.setSource(gizmoImageObj['patient_3.png'].src);
			  //pSprite.member = pMemList[1]
			}
  }
  else if(pPillType == "cold")
  {
    //--    highVal = 6.5 -- changing how this pill functions, want same happy region as aspirin, but "long lasting"
    //--    lowVal = 1.5
    highVal = 30.0
    lowVal = 11.0
    
			if(bodyConc > highVal) 
			{
			 // -- not happy overdose
			 curImg = "patient_4"
			  m.spineObj.patientImg_0.setSource(gizmoImageObj['patient_4.png'].src);
			 // pSprite.member = pMemList[2]
			}
			else if(bodyConc < lowVal)
			{
				//sad 
				curImg = "patient_0"
				m.spineObj.patientImg_0.setSource(gizmoImageObj['patient_0.png'].src);
			}
			else if(bodyConc <= highVal && bodyConc >= lowVal) 
			{
				//-- happy
			  //pSprite.member = pMemList[1]
			  curImg = "patient_3"
			   m.spineObj.patientImg_0.setSource(gizmoImageObj['patient_3.png'].src);
			}
      
	} 
  else if(pPillType == "targetA" )
  {
		highVal = 135.0
		lowVal = 90.0
			if(organConc > highVal) 
			{
			 // -- not happy overdose
			 curImg = "patient_4"
			  m.spineObj.patientImg_0.setSource(gizmoImageObj['patient_4.png'].src);
			 // pSprite.member = pMemList[2]
			}
			else if(organConc < lowVal)
			{
				//sad 
				curImg = "patient_0"
				m.spineObj.patientImg_0.setSource(gizmoImageObj['patient_0.png'].src);
			}
			else if( organConc <= highVal && organConc >= lowVal) 
			{
			  // console.log("HAPPY ")
			  curImg = "patient_3"
			   m.spineObj.patientImg_0.setSource(gizmoImageObj['patient_3.png'].src);
			} 
	}
	else if(pPillType == "targetB")
	{
		highVal = 135.0
		lowVal = 90.0
			if(organConc > highVal) 
			{
			 // -- not happy overdose
			 curImg = "patient_4"
			  m.spineObj.patientImg_0.setSource(gizmoImageObj['patient_4.png'].src);
			}
			else if(organConc < lowVal)
			{
				//sad 
				curImg = "patient_0"
				m.spineObj.patientImg_0.setSource(gizmoImageObj['patient_0.png'].src);
			}
			else if(organConc <= highVal && organConc >= lowVal)
			{
			 // console.log("HAPPY ..")
			 curImg = "patient_3"
			  m.spineObj.patientImg_0.setSource(gizmoImageObj['patient_3.png'].src);
			}
      
	}

	}
  
 
}
  

	
	function secondsToTime(pTime)
	{
		var str = "";
		var secs = Math.round(pTime);
		var numdays = Math.floor(secs / 86400);

		var numhours = Math.floor((secs % 86400) / 3600);

		var numminutes = Math.floor(((secs % 86400) % 3600) / 60);

		var numseconds = ((secs % 86400) % 3600) % 60;
		
		if(numhours < 10)
		numhours = "0"+numhours 
		if(numminutes < 10)
		numminutes = "0"+numminutes 
		if(numseconds < 10)
		numseconds = "0"+numseconds 
		
		
		var obj = {
			"d": numdays,
			"h": numhours,
			"m": numminutes,
			"s": numseconds
		}
		str = numdays+":"+numhours+":"+numminutes+":"+numseconds;
		return str;
	}

function setClock()
	{
	
	tSeconds = pTime
	
    aList = convertSeconds_ReturnInList(tSeconds)
	
    aDay = aList[0]
    aHr = aList[1]
    aMin = aList[2]
    m.spineObj.tField_D.setValue(aDay);
	m.spineObj.tField_H.setValue(aHr);
	m.spineObj.tField_M.setValue(aMin);
    
    //the floatPrecision = 4
   // -- now update display of things
    
    tList = convertSeconds_ReturnInList(tSeconds)
    aRot3 = tList[3]*6.
    mins = tList[2]
    
    hrs = tList[1] + mins/60.
    if(hrs > 12.0 )
	{
		hrs = hrs - 12
	}
    aRot1 = hrs*30
    
    aRot2 = mins*6
	smallArrow = [{
					x: 0,
					y: 0
				}, {
					x: Math.cos(aRot1 * Math.PI / 180),
					y: Math.sin(aRot1 * Math.PI / 180)
				}]
				///////////minute///////// 
				// pSprite.rotation = myAng
			bigArrow = [{
					x: 0,
					y: 0
				}, {
					x: Math.cos(aRot2 * Math.PI / 180),
					y: Math.sin(aRot2 * Math.PI / 180)
				}]
				//////////// seconds ///////////	
			newArrow = [{
					x: 0,
					y: 0
				}, {
					x: Math.cos(aRot3 * Math.PI / 180),
					y: Math.sin(aRot3 * Math.PI / 180)
				}]
			var e1 = new Object();
			e1.bigArw = bigArrow;
			e1.smallArw = smallArrow;
			e1.newArw = newArrow;
			e1.angleA = aRot1
			e1.angleB = aRot2
			e1.angleC = aRot3
			
			//////////console.log(e)
			m.veinObj.clockObj.clock(e1);
	}
	
	var nSeconds ,nMinutes , nSecondsExtra ,nHours ,nMinutesExtra , nDays ,nHoursExtra ;
	function convertSeconds_ReturnInList(nSeconds) 
	{
		if( nSeconds == null ) 
		return
	
		nSeconds = parseInt(nSeconds)
		nMinutes = nSeconds / 60
		nSecondsExtra = nSeconds % 60
		nHours = parseInt(nMinutes) / 60
		nMinutesExtra = parseInt(nMinutes) % 60
		nDays = parseInt(nHours) / 24
		nHoursExtra = parseInt(nHours) % 24
		//console.log(nSecondsExtra, nMinutesExtra, nHoursExtra,nSeconds , nMinutes,nHours, nDays  )
		aList = []
		aList.push(parseInt(nDays))
		aList.push(nHoursExtra)
		aList.push(nMinutesExtra)
		aList.push(nSecondsExtra)
		return aList
	}

	//--------------------------------Graph Control--------------------------------//
	
	function barControlBtnEvent(e) {
            m.spineObj.advControlsB.setEnabled("increase");
            m.spineObj.advControlsB.setEnabled("decrease");
            switch (e.panType) {
                case "panx":
                    switch (e.btnType) {
                        case "reset":
                            m.curZoomLevelX = 0;
                            break;
                        case "increase":
                            if (m.curZoomLevelX < 1) {
                                m.curZoomLevelX++;
                            }
                            break;
                        case "decrease":
                            if (m.curZoomLevelX > -3) {
                                m.curZoomLevelX--;
                            }
                            break;
                    }
                    if (m.curZoomLevelX == 1) {
                        m.spineObj.advControlsB.setDisabled("increase");
                    }
                    if (m.curZoomLevelX == -3) {
                        m.spineObj.advControlsB.setDisabled("decrease");
                    }
                    //setGraphZoomX(e.btnType);
                    break;
                case "panxy":
                    switch (e.btnType) {
                        case "reset":
                            m.curZoomLevelX = 0;
                            m.curZoomLevelY = 0;
                            break;
                        case "increase":
                            if (m.curZoomLevelX < 1) {
                                m.curZoomLevelX++;
                            }
                            if (m.curZoomLevelY < 1) {
                                m.curZoomLevelY++;
                            }
                            break;
                        case "decrease":
                            if (m.curZoomLevelX > -3) {
                                m.curZoomLevelX--;
                            }
                            if (m.curZoomLevelY > -3) {
                                m.curZoomLevelY--;
                            }
                            break;
                    }
                    if (m.curZoomLevelX >= 1 && m.curZoomLevelY >= 1) {
                        m.spineObj.advControlsB.setDisabled("increase");
                    }
                    if (m.curZoomLevelX <= -3 && m.curZoomLevelY <= -3) {
                        m.spineObj.advControlsB.setDisabled("decrease");
                    }
                    //--------------------
                    //setGraphZoomX(e.btnType);
                  setBarZoomY(e.btnType);
                    break;
                case "pany":
                    switch (e.btnType) {
                        case "reset":
                            m.curZoomLevelY = 0;
                            break;
                        case "increase":
                            if (m.curZoomLevelY < 1) {
                                m.curZoomLevelY++;
                            }
                            break;
                        case "decrease":
                            if (m.curZoomLevelY > -3) {
                                m.curZoomLevelY--;
                            }
                            break;
                    }
                    if (m.curZoomLevelY >= 1) {
                        m.spineObj.advControlsB.setDisabled("increase");
                    }
                    if (m.curZoomLevelY <= -3) {
                        m.spineObj.advControlsB.setDisabled("decrease");
                    }
                  setBarZoomY(e.btnType);
                    break;
            }
        }

        function setBarZoomX(_type) {
            var unitX, labelIntervalX, majorIntervalX, minorIntervalX;
            switch (m.curZoomLevelX) {
              
                case -3:
                    unitX = 6;
                    labelIntervalX = 50;
                    majorIntervalX = 50;
                    minorIntervalX = 5;
                    break;
                case -2:
                    unitX = 4.0;
                    labelIntervalX = 10;
                    majorIntervalX = 10;
                    minorIntervalX = 5;
                    break;
                case -1:
                    unitX = 1.5;
                    labelIntervalX = 5;
                    majorIntervalX = 5;
                    minorIntervalX = 1;
                    break;
                case 0:
                    unitX = 0.75;
                    labelIntervalX = 2;
                    majorIntervalX = 2;
                    minorIntervalX = 1;
                    if (_type == "reset") {
                        m.spineObj.barChart.reArrangeGraph({
                            xReg: "center",
                            zoomValX: 1
                        });
                    }
                    break;
                case 1:
                    unitX = 0.4;
                    labelIntervalX = 2;
                    majorIntervalX = 2;
                    minorIntervalX = 1;
                    break;
                
            }
            m.spineObj.barChart.reArrangeGraph({
                unitX: unitX,
                labelIntervalX: labelIntervalX,
                majorIntervalX: majorIntervalX,
                minorIntervalX: minorIntervalX,
            });
        }

        function setBarZoomY(_type) {
            var unitY, labelIntervalY, majorIntervalY, minorIntervalY;
            switch (m.curZoomLevelY) {
               
                case -3:
                    unitY = 9;
                    labelIntervalY = 50;
                    majorIntervalY = 50;
                    minorIntervalY = 25;
                    break;
                case -2:
                    unitY = 4;
                    labelIntervalY = 20;
                    majorIntervalY = 20;
                    minorIntervalY = 10;
                    break;
                case -1:
                    unitY = 2;
                    labelIntervalY = 20;
                    majorIntervalY = 20;
                    minorIntervalY = 10;
                    break;
                case 0:
                   	leastCountY = 7.5;
					labelIntervalY=10;
					majorIntervalY=10;
					minorIntervalY=5;
					unitY = 1;
                    if (_type == "reset") {
                        m.spineObj.barChart.reArrangeGraph({
                            yReg: "center",
                            zoomValY: 1
                        });
                    }
                    break;
                case 1:
                    unitY = 0.4;
                    labelIntervalY = 2;
                    majorIntervalY = 2;
                    minorIntervalY = 0;
                    break;
             
            }
            m.spineObj.barChart.reArrangeGraph({
                unitY: unitY,
                labelIntervalY: labelIntervalY,
                majorIntervalY: majorIntervalY,
                minorIntervalY: minorIntervalY,
            });
        }
	
	//-------------------------------xxxxxxxxxxxxxxx-------------------------------//
	
		function graphControlBtnEvent(e) {
            m.spineObj.advControlsG.setEnabled("increase");
            m.spineObj.advControlsG.setEnabled("decrease");
            switch (e.panType) {
                case "panx":
                    switch (e.btnType) {
                        case "reset":
                            m.curGZoomLevelX = 0;
                            break;
                        case "increase":
                            if (m.curGZoomLevelX < 0) {
                                m.curGZoomLevelX++;
                            }
                            break;
                        case "decrease":
                            if (m.curGZoomLevelX > -3) {
                                m.curGZoomLevelX--;
                            }
                            break;
                    }
                    if (m.curGZoomLevelX == 0) {
                        m.spineObj.advControlsG.setDisabled("increase");
                    }
                    if (m.curGZoomLevelX == -3) {
                        m.spineObj.advControlsG.setDisabled("decrease");
                    }
                    setGraphZoomX(e.btnType);
                    break;
                case "panxy":
                    switch (e.btnType) {
                        case "reset":
                            m.curGZoomLevelX = 0;
                            m.curGZoomLevelY = 0;
                            break;
                        case "increase":
                            if (m.curGZoomLevelX < 1) {
                                m.curGZoomLevelX++;
                            }
                            if (m.curGZoomLevelY < 1) {
                                m.curGZoomLevelY++;
                            }
                            break;
                        case "decrease":
                            if (m.curGZoomLevelX > -3) {
                                m.curGZoomLevelX--;
                            }
                            if (m.curGZoomLevelY > -3) {
                                m.curGZoomLevelY--;
                            }
                            break;
                    }
                    if (m.curGZoomLevelX >= 1 && m.curGZoomLevelY >= 1) {
                        m.spineObj.advControlsG.setDisabled("increase");
                    }
                    if (m.curGZoomLevelX <= -3 && m.curGZoomLevelY <= -3) {
                        m.spineObj.advControlsG.setDisabled("decrease");
                    }
                    //--------------------
                    setGraphZoomX(e.btnType);
					setGraphZoomY(e.btnType);
                    break;
                case "pany":
                    switch (e.btnType) {
                        case "reset":
                            m.curGZoomLevelY = 0;
                            break;
                        case "increase":
                            if (m.curGZoomLevelY < 1) {
                                m.curGZoomLevelY++;
                            }
                            break;
                        case "decrease":
                            if (m.curGZoomLevelY > -3) {
                                m.curGZoomLevelY--;
                            }
                            break;
                    }
                    if (m.curGZoomLevelY >= 1) {
                        m.spineObj.advControlsG.setDisabled("increase");
                    }
                    if (m.curGZoomLevelY <= -3) {
                        m.spineObj.advControlsG.setDisabled("decrease");
                    }
                  setGraphZoomY(e.btnType);
                    break;
            }
        }

        function setGraphZoomX(_type) {
            var unitX, labelIntervalX, majorIntervalX, minorIntervalX;
            switch (m.curGZoomLevelX) {
              
                case -3:
                    unitX = 25;
                    labelIntervalX = 100;
                    majorIntervalX = 100;
                    minorIntervalX = 20;
                    break;
                case -2:
                    unitX = 5;
                    labelIntervalX = 10;
                    majorIntervalX = 10;
                    minorIntervalX = 5;
                    break;
                case -1:
                    unitX = 2.5;
                    labelIntervalX = 2;
                    majorIntervalX = 2;
                    minorIntervalX = 2;
                    break;
                case 0:
                    unitX = 1;
					leastCountX = 46;
					labelIntervalX = 1;
					majorIntervalX = 1;
					minorIntervalX = 1;
                    if (_type == "reset") {
                        m.spineObj.graphComp.reArrangeGraph({
                            xReg: "center",
                            zoomValX: 1
                        });
                    }
                    break;
                case 1:
                    unitX = 1;
					leastCountX = 46;
					labelIntervalX = 1;
					majorIntervalX = 1;
					minorIntervalX = 1;
                    break;
                
            }
            m.spineObj.graphComp.reArrangeGraph({
                unitX: unitX,
                labelIntervalX: labelIntervalX,
                majorIntervalX: majorIntervalX,
                minorIntervalX: minorIntervalX,
            });
        }

        function setGraphZoomY(_type) {
            var unitY, labelIntervalY, majorIntervalY, minorIntervalY;
            switch (m.curGZoomLevelY) {
               
                case -3:
                    unitY = 17;
                    labelIntervalY = 100;
                    majorIntervalY = 100;
                    minorIntervalY = 50;
                    break;
                case -2:
                    unitY = 3.8;
                    labelIntervalY = 20;
                    majorIntervalY = 20;
                    minorIntervalY = 10;
                    break;
                case -1:
                    unitY = 2;
                    labelIntervalY = 20;
                    majorIntervalY = 20;
                    minorIntervalY = 10;
                    break;
                case 0:
					leastCountY=7;
					labelIntervalY=10;
					majorIntervalY=10;
					minorIntervalY=5;
					unitY=1;
                    if (_type == "reset") {
                        m.spineObj.graphComp.reArrangeGraph({
                            yReg: "center",
                            zoomValY: 1
                        });
                    }
                    break;
                case 1:
                    unitY = 0.4;
                    labelIntervalY = 2;
                    majorIntervalY = 2;
                    minorIntervalY = 0;
                    break;
             
            }
            m.spineObj.graphComp.reArrangeGraph({
                unitY: unitY,
                labelIntervalY: labelIntervalY,
                majorIntervalY: majorIntervalY,
                minorIntervalY: minorIntervalY,
            });
        }
	
	
	
	//------------------------------*********************----------------------------//
    function genBtnEvent(e)
	{
        exportToApiObj.exportCSV(m.spineObj.tableObj.getTable());
    }

    function onCameraClick(e)
	{
		switch(e.id)
		{
			case "cameraIcon_0":
			exportToApiObj.exportImage({
			x: globalResizeCalc(553),
            y: globalResizeCalc(63),
            width: globalResizeCalc(435),
            height: globalResizeCalc(415)
			});
			break;
			case "cameraIcon_2":
			exportToApiObj.exportImage({
			x: globalResizeCalc(540),
            y: globalResizeCalc(30),
            width: globalResizeCalc(477),
            height: globalResizeCalc(532)
			});
			break;
			case "cameraIcon_3":
			exportToApiObj.exportImage({
			x: globalResizeCalc(540),
            y: globalResizeCalc(30),
            width: globalResizeCalc(475),
            height: globalResizeCalc(532)
			});
			break;
			
			
		}
        
    }
	
}	

var gizmoImageObj;
var drug = new drugDosage();
$(document).ready(function(e) {
    var textImagePreloader = new preloadTextImages();
    textImagePreloader.init({
        imgTextFile: "images/img_525.txt"

    });
    textImagePreloader.preloadComplete = function(imgObj) {
        gizmoImageObj = imgObj;
        drug.init();
    }
});


var ClockCanvasClass = function() {
	var p = {
		id: "canvas",
		x: 10,
		y: 20,
		width: 475,
		height: 475,
	}
	var _thisObj = this;
	var spdCnv;
	var canvasOfClock, contextOfClock;
	var bigArrow = new Image();
	var smallArrow = new Image();
	var newArrow = new Image();
	var clockimg = new Image();
	var clockCenter = new Image();
	this.init = function(_obj) {
		for (var i in _obj) {
			p[i] = _obj[i];
		}
		p.x = globalResizeCalc(p.x);
		p.y = globalResizeCalc(p.y);
		p.width = globalResizeCalc(p.width);
		p.height = globalResizeCalc(p.height);
		canvasOfClock = document.createElement("canvas");
		var canvDiv = document.createElement("div");
		p.target.append(canvDiv);
		$(canvDiv).append(canvasOfClock);
		contextOfClock = canvasOfClock.getContext("2d");
		$(canvDiv).css({
			"position": "absolute",
			"left": p.x + "px",
			"top": p.y + "px",
			"width": p.width + "px",
			"height": p.height + "px",
			"z-index": 4,
		});
		//---------------------
		canvasOfClock.width = p.width;
		canvasOfClock.height = p.height;
		$(canvasOfClock).css({
			"position": "absolute"
		});
		/* clockimg.src = "images/Clock.png";
		bigArrow.src = "images/bigArrow.png";
		smallArrow.src = "images/smallArrow.png";
		newArrow.src = "images/newArrow.png";
		clockCenter.src = "images/clockCenter.png";  */
		
		clockimg.src = gizmoImageObj["clock.png"].src;
		bigArrow.src = gizmoImageObj["bigArrow.png"].src;
		smallArrow.src = gizmoImageObj["smallArrow.png"].src;
		newArrow.src = gizmoImageObj["newArrow.png"].src;
		clockCenter.src = gizmoImageObj["clockCenter.png"].src; 
		clockimg.width = globalResizeCalc(clockimg.width);
		clockimg.height = globalResizeCalc(clockimg.height);
		bigArrow.width = globalResizeCalc(bigArrow.width);
		bigArrow.height = globalResizeCalc(bigArrow.height);
		smallArrow.width = globalResizeCalc(smallArrow.width);
		smallArrow.height = globalResizeCalc(smallArrow.height);
		newArrow.width = globalResizeCalc(newArrow.width);
		newArrow.height = globalResizeCalc(newArrow.height) - globalResizeCalc(10);
		clockCenter.width = globalResizeCalc(clockCenter.width);
		clockCenter.height = globalResizeCalc(clockCenter.height);
		drawClock();
		//_thisObj.spd(0);
	}
	this.clock = function(e) {
		//////////console.log(e,"eeeeeeeeeeee")
		canvasOfClock.width = canvasOfClock.width;
		contextOfClock.drawImage(clockimg, 0, 0, clockimg.width, clockimg.height)
		contextOfClock.drawImage(clockCenter, clockimg.width / 2 - (clockCenter.width / 2), clockimg.height / 2 - (clockCenter.height / 2), clockCenter.width, clockCenter.height)
		contextOfClock.beginPath();
		contextOfClock.strokeStyle = "#909090";
		contextOfClock.lineWidth = globalResizeCalc(4.5)
		contextOfClock.save()
		contextOfClock.translate(canvasOfClock.width / 2, canvasOfClock.width / 2);
		contextOfClock.rotate((e.angleC * Math.PI / 180));
		contextOfClock.translate(-canvasOfClock.width / 2, -canvasOfClock.width / 2);
		contextOfClock.drawImage(newArrow, e.newArw[0].x + (canvasOfClock.width / 2) - (newArrow.width) / 2, e.newArw[0].y +(canvasOfClock.width / 2) - (newArrow.height), newArrow.width, newArrow.height);
		contextOfClock.restore()
		contextOfClock.save()
		contextOfClock.translate(canvasOfClock.width / 2, canvasOfClock.width / 2);
		contextOfClock.rotate(e.angleA * Math.PI / 180);
		contextOfClock.translate(-canvasOfClock.width / 2, -canvasOfClock.width / 2);
		contextOfClock.drawImage(smallArrow, e.smallArw[0].x + (canvasOfClock.width / 2) - (smallArrow.width) / 2, e.smallArw[0].y +(canvasOfClock.width / 2) - (smallArrow.height), smallArrow.width, smallArrow.height);
		contextOfClock.restore()
		contextOfClock.save()
		contextOfClock.translate(canvasOfClock.width / 2, canvasOfClock.width / 2);
		contextOfClock.rotate(e.angleB * Math.PI / 180);
		contextOfClock.translate(-canvasOfClock.width / 2, -canvasOfClock.width / 2);
		contextOfClock.drawImage(bigArrow, e.bigArw[0].x +(canvasOfClock.width / 2) - (bigArrow.width) / 2, e.bigArw[0].y + (canvasOfClock.width / 2) - (bigArrow.height), bigArrow.width, bigArrow.height);
		contextOfClock.restore()
		
		contextOfClock.stroke();
		contextOfClock.closePath();
		contextOfClock.drawImage(clockCenter, clockimg.width / 2 - (clockCenter.width / 2), clockimg.height / 2 - (clockCenter.height / 2), clockCenter.width, clockCenter.height)
	}

	function drawClock() {
		contextOfClock.drawImage(clockimg, 0, 0, clockimg.width, clockimg.height)
		contextOfClock.drawImage(newArrow, clockimg.width / 2 - (newArrow.width)/2, clockimg.height / 2 - (newArrow.height), newArrow.width, newArrow.height)
		contextOfClock.drawImage(smallArrow, clockimg.width / 2 - (smallArrow.width)/2, clockimg.height / 2 - (smallArrow.height), smallArrow.width, smallArrow.height)		
		contextOfClock.drawImage(bigArrow, clockimg.width / 2 - (bigArrow.width)/2, clockimg.height / 2 - (bigArrow.height), bigArrow.width, bigArrow.height)
		
		contextOfClock.drawImage(clockCenter, clockimg.width / 2 - (clockCenter.width / 2), clockimg.height / 2 - (clockCenter.height / 2), clockCenter.width, clockCenter.height)
	}
}