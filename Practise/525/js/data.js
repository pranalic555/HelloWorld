var elementJson= [
	{
		class :"wrapper",
		x:0,
		y:0,
		height:680,
		width: 1024
	},
	{
		class:"acthold",		
		id:"acttab_0",
		target:'$(".wrapper")',
		x: 512,
		y: 26,
		width: 512,
		height: 562
	},
	{
		class:"acthold",		
		id:"acttab_1",
		target:'$(".wrapper")',
		x: 512,
		y: 26,
		width: 512,
		height: 562,
		visible:false,
	},
	{
		class:"acthold",		
		id:"acttab_2",
		target:'$(".wrapper")',
		x: 512,
		y: 26,
		width: 512,
		height: 562,
		visible:false,
	},
	{
		class:"acthold",		
		id:"acttab_3",
		target:'$(".wrapper")',
		x: 512,
		y: 26,
		width: 512,
		height: 562,
		visible:false,
	},
	{		
		id:"leftDiv",
		target:'$(".wrapper")',
		x: 0,
		y: 0,
		width: 505,
		height: 680,
	},
	{
		class: "watchCont",
		target: '$(".wrapper")',
		x: 117,
		y: 433,		   
		index:4,
    },
	{
		class:'bottomwhite',
		target:'$(".wrapper")',
		x:512,
		y:569,
		height:111,
		width:512,
	},
	{
		id:"jugad_barchartDiv",
		class:"jugadDiv",
		target:'$(".wrapper")',
		x:842,
		y:434,
		height:25,
		width:50,
		index:-5,
	}
	
]

var componentJson=
{	
	TabComp:[								
		{	// Tab Component
			id:"tabCompLeft",
			target:'$("#leftDiv")',
			x:0,
			y: 0,
			width:504,
			height:685,
			tabHeight:26,
			tabType:"simulation",
			tabs:["SIMULATION"],
			tabwidth:145,
			title:GlobalTextObj.tabComp_title,
			leftMargin:296,
			topMargin:10,
			shadowMargin:0,
			index:2,
		},
		{												// Tab Component
			id:"tabComp",
			target:'$(".wrapper")',
			x: 512,
			y: 0,
			width: 512,
			height: 562,
			tabHeight:26,
			tabs:["DESCRIPTION","TABLE","BAR CHART","GRAPH"],
			tabwidth:124,
			title:GlobalTextObj.tabComp_title,
			leftMargin:5,
			topMargin:10,
			shadowMargin:0,
			tabColors:["#FFFFFF","#FFFFFF","#EEFFEE"],
		},
	],
	
	StatusBook:
		[
			{
				id:"status_bk",
				target:'$("#acttab_0")',
				x:41,
				y:16,
				width:435,
				height: 434,
				subMarginLeft:132,
				subMarginTop:41,
				subHeadingFont:1.3,
				contMarginLeft:60,
				contMarginTop:31,
				contHeadingFont:0.85,
				bold:true,
				mainHeading:"",
				subHeading:GlobalTextObj.subHeadingText,
				content:GlobalTextObj.contentText,  // set the content of the box.
				index:2,	
			},
		], 

	
	GraphComp:									
	[
		{	
			id:"barChart",
			target:'$("#acttab_2")',
			gridBgColor:"#EEFFEE",
			bgColor:"#EEFFEE",
			width: 512,
			height: 535,
			//labelX: "<b>Time</b>",
			labelY: "Drug conc. (mcg/cc)",
			
			marginLeft:66,
			marginTop:31,
			marginRight:51,
			marginBottom:97,
			
			arrowXR: true,
			arrowY: true,
			zoomX:false,
			zoomY:false,
			leastCountX:150,
			labelIntervalX:10,
			majorIntervalX:10,
			minorIntervalX:5,
			unitX:1,
			
			leastCountY:7.5,
			labelIntervalY:10,
			majorIntervalY:10,
			minorIntervalY:5,
			unitY:1,
			
			lineType: false,
			probeVisible:false,
			updateOnDrag:true,
			title:GlobalTextObj.graphComp_title,
			toolTip:true,
			panX:false,
			panY:true,
			decimal:2,
			dotSize:9,
			drawQuads:1,
			index:2,
			
			isMaths : true,
			toFixedY:true,
			barProp:{start:0, end:1, gap:0},
			barValueHeight:8,
			labelStyleXYSize: "18px",
			
			labelInBold:true,
			decimalInNumber :false,
			
			intervalXVisible:true,
			intervalYVisible:true,
			
			gridXYColor: "#808080",
			majorLineBigWidth:4,
			majorLineSmallWidth:3,
			gridXYMinorColor: "#CCCCCC",
			gridColor: "#CCCCCC",
			decimal:2,
		},
		
		{	
			id:"graphComp",
			target:'$("#acttab_3")',
			gridBgColor:"#EEFFEE",
			bgColor:"#EEFFEE",
			x:0,
			y:0,
			width: 525,
			height: 535,
			arrows: true,
			labelX: "Time (hr)",
			labelY: "Drug conc. (mcg/cc)",
			
			zoomX:false,
			zoomY:false,
			marginLeft:65,
			marginTop:37,
			marginRight:58,
			marginBottom:112,
			
			unitX:1,
			leastCountX:46,
			labelIntervalX:1,
			majorIntervalX:1,
			minorIntervalX:1,
			
			
			unitY:1,
			leastCountY:7,
			labelIntervalY:10,
			majorIntervalY:10,
			minorIntervalY:5,
			
			
			probeVisible:false,
			updateOnDrag:true,
			title:GlobalTextObj.graphComp_title,
			toolTip:true,
			panX:true,
			panY:true,
			decimal:2,
			dotSize:6,
			drawQuads: 1,
			index:2,
			majorLineSmallWidth:3,
			gridColor: "#CCCCCC",
			gridXYMinorColor: "#CCCCCC",
			mouseCurType: "move",
		}
	],
	

	TableComp:
	[
		{
			id:"tableObj",
			target : "$('#acttab_1')",
			x:28,
			y:22,
			width:461,
			height:425,
			maxRows:13, //10
			scrollerDisplay:true,
			bodyAlign: "center",
			fontSize:"0.9em",
			emdash:false,
			headerHeight:37,
			barHeight:8,
			visible:true,
			index:2,
			refreshScroller:true,
			cols:[
					{
						label:"Time (d:h:m:s)",
						//bg:'#E5E5E5', 
						border:"0.1em solid #A7A7A7", 
						width:33,
						bg: '#E5E5E5',
						barColor:"#666666",
					},
					{
						label:"Blood", 
						//bg:'#FEFEFE', 
						border:"0.1em solid #A7A7A7", 
						width:34,
						bg: '#E5E5E5',
						barColor:"#00AA9B",
					},
					{
						label:"Organ", 
						//bg:'#E5E5E5', 
						border:"0.1em solid #A7A7A7", 
						width:33,
						bg: '#E5E5E5',
						barColor:"#8F62EF",
					},				
				],
		},
	],
	
	ImageComp:
	[
	
		{
			id:"mainBGImg",
			target: '$("#leftDiv")',
			x: 0,
			y: 25,
			height: 656,
			width: 503,
			index:3,
			txtsrc:"mainBG.png",
			
		},
		{
			id:"wireImg",
			target: '$("#leftDiv")',
			x: 211,
			y: 114,
			height: 263,
			width: 153,
			index:5,
			txtsrc:"wires.png",
			
		},
		{
			id:"patientImg_0",
			target: '$("#leftDiv")',
			x: 264,
			y: 45,
			height: 618,
			width: 219,
			index:4,
			txtsrc:"patient_0.png",
			
		},
		{
			id:"greenDot_Img",
			target: '$("#acttab_3")',
			x: 145,
			y: 455,
			height: 16,
			width: 16,
			index:3,
			txtsrc:"green_dot.png",
			
		},
		{
			id:"purpDot_Img",
			target: '$("#acttab_3")',
			x: 298,
			y: 455,
			height: 16,
			width: 16,
			index:3,
			txtsrc:"purp_dot.png",
			visible:false,
			
		},
		
	],
	
	SliderComp:
    [
        {
            id:"sliderComp",
            target:'$(".bottomwhite")',
            x:243,
            y:49,
			width:164,
			height:8,
			min:1,
			max:30,
			step:1,
			value:1,
			color:3,
			index:2,
			title: GlobalTextObj.sliderComp_title
        },
	],
	
	TextFieldComp:
	[	
		{
			id:"tField_D",
			target:'$("#leftDiv")',
			x:121,
			y:521,
			value:0,
			type:"normal",
			align:"left",
			bgColor:"#FFFFFF",
			restrict:"0123456789.",
			max:1000.00,
			min:0.00,
			width:56,
			index:2,
			paddingTop:5,
			showControls:false,
			rSideLineShow:false,
			index:3,
			title:GlobalTextObj.tField_title,
			isNumber: false,	
			
		},
		{
			id:"tField_H",
			target:'$("#leftDiv")',
			x:121,
			y:564,
			value:0,
			type:"normal",
			align:"left",
			bgColor:"#FFFFFF",
			restrict:"0123456789.",
			max:1000.00,
			min:0.00,
			width:56,
			index:2,
			paddingTop:5,
			showControls:false,
			rSideLineShow:false,
			index:3,
			title:GlobalTextObj.tField_title,
			isNumber: false,	
			
		},
		{
			id:"tField_M",
			target:'$("#leftDiv")',
			x:121,
			y:606,
			value:0,
			type:"normal",
			align:"left",
			bgColor:"#FFFFFF",
			restrict:"0123456789.",
			max:1000.00,
			min:0.00,
			width:56,
			index:2,
			paddingTop:5,
			showControls:false,
			rSideLineShow:false,
			index:3,
			title:GlobalTextObj.tField_title,
			isNumber: false,	
			
		},
		{
			id:"tField",
			target:'$(".bottomwhite")',
			x:423,
			y:50,
			value:1,
			type:"input",
			restrict:"0123456789",
			max:30,
			min:1,
			width:57,
			index:2,
			showControls:false,
			rSideLine:6,
			rSideLineShow:true,
			title:GlobalTextObj.tField_title,
			isNumber: false,	
			
		},
	],
	
	TextLabelComp:								
	[
		{
				id:"drugLevel_label",
				target:'$("#leftDiv")',
				x: 60,
				y: 66,
				index:3,
				color:"#FFFFFF",
				html:GlobalTextObj.textLabel_1,		
				visible:true,
				bold:true,
				fontSize: "1em",
		},
		{
				id:"blood_label",
				target:'$("#leftDiv")',
				x: 43,
				y: 111,
				index:3,
				html:GlobalTextObj.textLabel_2,  
				visible:true,
				fontSize: "0.8em",
				bold:true,
		},
		{
				id:"blood_value",
				target:'$("#leftDiv")',
				x: 115,
				y: 109,
				index:3,
				html:GlobalTextObj.textLabel_8,  
				visible:true,
				fontSize: "1em",
		},
		{
				id:"organ_label",
				target:'$("#leftDiv")',
				x: 43,
				y: 166,
				index:3,
				html:GlobalTextObj.textLabel_3,  
				visible:true,
				fontSize: "0.8em",
				bold:true,
		},
		{
				id:"organ_value",
				target:'$("#leftDiv")',
				x: 115,
				y: 162,
				index:3,
				html:GlobalTextObj.textLabel_9,  
				visible:true,
				fontSize: "1em",
		},
		{
				id:"unit_label",
				target:'$("#leftDiv")',
				x: 45,
				y: 203,
				index:3,
				color:"#FFFFFF",
				html:GlobalTextObj.textLabel_4,  
				visible:true,
				fontSize: "0.9em",
		},
		{
				id:"day_label",
				target:'$("#leftDiv")',
				x: 70,
				y: 528,
				index:3,
				html:GlobalTextObj.textLabel_5,  
				visible:true,
				fontSize: "0.8em",
		},
		{
				id:"hrs_label",
				target:'$("#leftDiv")',
				x: 63,
				y: 572,
				index:3,
				html:GlobalTextObj.textLabel_6,  
				visible:true,
				fontSize: "0.8em",
		},
		{
				id:"min_label",
				target:'$("#leftDiv")',
				x: 49,
				y: 613,
				index:3,
				html:GlobalTextObj.textLabel_7,  
				visible:true,
				fontSize: "0.8em",
		},
		{
				id:"instruct1_label",
				target:'$("#acttab_1")',
				x: 52,
				y: 446,
				index:3,
				html:GlobalTextObj.textLabel_10,  
				visible:true,
				fontSize: "0.9em",
		},
		{
				id:"bloodB_label",
				target:'$("#acttab_2")',
				x: 149,
				y: 449,
				index:3,
				html:GlobalTextObj.textLabel_12,  
				visible:true,
				fontSize: "0.9em",
		},
		{
				id:"organB_label",
				target:'$("#acttab_2")',
				x: 330,
				y: 449,
				index:3,
				html:GlobalTextObj.textLabel_13,  
				visible:false,
				fontSize: "0.9em",
		},
		{
				id:"bloodG_label",
				target:'$("#acttab_3")',
				x: 169,
				y: 454,
				index:3,
				html:GlobalTextObj.textLabel_12,  
				visible:true,
				fontSize: "0.9em",
		},
		{
				id:"organG_label",
				target:'$("#acttab_3")',
				x: 321,
				y: 454,
				index:3,
				html:GlobalTextObj.textLabel_13,  
				visible:false,
				fontSize: "0.9em",
		},
		{
				id:"instruct2_label",
				target:'$("#acttab_3")',
				x: 41,
				y: 490,
				index:3,
				html:GlobalTextObj.textLabel_14,  
				visible:true,
				fontSize: "0.9em",
		},
		{
				id:"controlLabel",
				target:'$(".bottomwhite")',
				x: 26,
				y: 18,
				index:2,
				html:GlobalTextObj.textLabel_15,		
				visible:true,
				//bold:true,
				fontSize: "0.9em",
		},
		{
				id:"sliderLabel",
				target:'$(".bottomwhite")',
				x: 225,
				y: 18,
				index:2,
				html:GlobalTextObj.textLabel_16,  
				visible:true,
				fontSize: "0.9em",
		},
	],
	
	 DropDownComp:
        [
			{
				id: "dropDown",
				target: '$("#leftDiv")',
				width: 188,	
				height:170,				
				x: 24,
				y: 310,
				index: 10,
				fontSize: "0.9em",
				listLeftPadding:6 ,
				downwards:true,
				title: GlobalTextObj.dropdown_title,
				tabItem: [GlobalTextObj.DropDownComp1_txt_1, GlobalTextObj.DropDownComp1_txt_2, GlobalTextObj.DropDownComp1_txt_3, GlobalTextObj.DropDownComp1_txt_4,]
			},
        ],
	
	CheckBoxComp:
		[
			{
				id:"checkBox",
				target:'$("#acttab_2")', 
				x:154,
				y:485,
				checked: false,
				index:2,
				label:GlobalTextObj.checkBox_0_label,
				title:GlobalTextObj.checkBox_0_title
			
			},
		],
		
		
	ButtonComp: 
	[
		{
			id: "pillButton",
			target: '$("#leftDiv")',
			x: 17,
			y: 250,
			width: 202,
			height: 38,
			orientation: "horizontal",
			align:"center",
			index: 3,
			visibility: true,
			label:  GlobalTextObj.pillBtn_Label ,
			title: GlobalTextObj.pillBtn_Title
		},
		{
			id: "recordBtn",
			target: '$("#acttab_1")',
			x: 102,
			y: 481,
			width: 143,
			height: 38,
			orientation: "horizontal",
			align:"center",
			index: 3,
			visibility: true,
			label:  GlobalTextObj.recordBtn_Label ,
			title: GlobalTextObj.recordBtn_Title
		},
		{
			id:"exportBtn",
			target:'$("#acttab_1")',
			x:273,
			y:481,
			width:142,
			height:38,
			index:2,
			label:GlobalTextObj.exportBtn_label,
			title:GlobalTextObj.export_title
		},
	],
	
	GraphControlButton:					// Graph Control Buttons
	[
		{
			id:"advControlsB",
			target:'$(".wrapper")',
			x:1012,
			y:343,
			restrict:"y",
			visible: false,
			index : 2,
			title:{increase:GlobalTextObj.increase_title, reset:GlobalTextObj.reset_title, decrease:GlobalTextObj.decrease_title}
		
		},
		{
			id:"advControlsG",
			target:'$(".wrapper")',
			x:1012,
			y:329,
			restrict:"",
			visible: false,
			index : 2,
			title:{increase:GlobalTextObj.increase_title, reset:GlobalTextObj.reset_title, decrease:GlobalTextObj.decrease_title}
		
		}
		
	],
	
	CameraComp:							
	[
		{
			id:"cameraIcon_0",
			target:'$("#acttab_0")',
			x:428,
			y:24,
			index:6,
			border:true,
			left:false,
			title:GlobalTextObj.cameraIcon_title
		},
		{
			id:"cameraIcon_2",
			target:'$("#acttab_2")',
			x:440,
			y:9,
			index:6,
			border:true,
			left:false,
			title:GlobalTextObj.cameraIcon_title
		},
		{
			id:"cameraIcon_3",
			target:'$("#acttab_3")',
			x:440,
			y:9,
			index:6,
			border:true,
			left:false,
			title:GlobalTextObj.cameraIcon_title
		}
	],
	
	SystemButtonComp:
    [
        {
            id:"controlBtn",
            target:'$(".bottomwhite")',
            orientation:"horizontal",
            x:48,
            y:48,
            content:"controls",
            onSelect:"",
            showButtons:['play','pause','reset'],
			title:{play:GlobalTextObj.systemButton_title_play, pause:GlobalTextObj.systemButton_title_pause, reset:GlobalTextObj.systemButton_title_reset},
			index:2,
        }
    ],
	
	ToolComp:								//Tool Box
	[
		{
			id:"toolPanel",
			left:true,
			top:true
		}
	],
	
	
}

var actComponentJson = 
{

ClockCanvasClass:
			[{
					id: "clockObj",
					target: '$(".watchCont")',
					x: -80,
					y: -80,
					width:160,
					height:160,
					index: 4
			}], 
}