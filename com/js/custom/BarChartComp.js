//////////////////////////////////////////////////////////////////////////////////
// Developed By: Mitr Learning & Media											//
// Name: BarChartComp															//
// Description: Creates Bar Chart on run-time with the help of desired setters.	//
// Date Created: 07/05/2014														//
// Date Modified: 07/05/2014													//
// Version: 1.0:																//
//////////////////////////////////////////////////////////////////////////////////

var BarChartComp = function()
{
	// Default starts ...
	var p = 
	{
		width:300,
		height:300,
		bars:[{id:'label_1',width:50,height:150,bg:'#000'},{id:'label_2',width:50,height:150,bg:'#000'}],
		background:'#ccc',
		margin:15,
		marginBottom: 5,
		maxVal:100,
		initVal:50,
		minVal:0,
		left:20,
		top:30,
		startLeft:0
	}
	var _bgDiv;
	var _refThis = this;
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.init = function(_obj)
	{
		for(var i in _obj)
		{
			p[i] = _obj[i];
		}
		createPlaceHolders();
	}
	//================================================================================
	this.setData = function(_data)
	{
		var newHeight = 0;
		for(var i = 0; i < p["bars"].length; i++)
		{
			newHeight = (_data[p["bars"][i]["id"]]/p["maxVal"])*p["bars"][i]["height"];
			$("#"+p["bars"][i]["id"]).css("height",newHeight+"px");
		}
	}
	//================================================================================
	this.changeBG = function(arg)
	{
		
		p.target.css("background",arg);
	}
	//================================================================================
	this.reset = function()
	{
		for(var i = 0; i < p["bars"].length; i++)
		{
			$("#"+p["bars"][i]["id"]).css("height",p["bars"][i]["height"]+"px");
		}
		_refThis.changeBG(p["background"]);
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function createPlaceHolders()
	{
		p.target.css({"width":p["width"],"height":p["height"],"background":p["background"],"position":"absolute","left":p["left"],"top":p["top"]});
		var _element = "";
		var leftVal = p["startLeft"];
		for(var i = 0; i < p["bars"].length; i++)
		{
			_element = _element + "<div class='bars' id='"+p["bars"][i]["id"]+"' 			\
										style='width:"+p["bars"][i]["width"]+"px; 			\
											   height:"+p["bars"][i]["height"]+"px; 		\
											   background:"+p["bars"][i]["bg"]+"; 			\
											   position:absolute; bottom:0px;				\
											   left:"+leftVal+"px;'></div>"
			leftVal = leftVal + p["bars"][i]["width"] + p["margin"];
		}
		p.target.append(_element);
	}
	
}