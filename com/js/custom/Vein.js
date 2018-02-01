//////////////////////////////////////////////////////////////////////////////////////
// Developed By: Mitr Learning & Media												//
// Name: Vein																		//
// Description: Acts as vein like a human body. This class is the controller for	//
// the activity.																	//
// Date Created: 10/09/2014															//
// Date Modified: 10/09/2014														//
// Version: 1.0:																	//
//////////////////////////////////////////////////////////////////////////////////////

var VeinClass = function(_callbackFn)
{
	var veinObjects = new Array();
	//========================================================================
	if(typeof(actComponentJson) != "undefined")
	{
		for(var i in actComponentJson)
		{
			for(var j = 0; j < actComponentJson[i].length; j++)
			{
				var _item = actComponentJson[i];
				this[_item[j].id] = eval("new "+i+"()");
				_item[j].target = eval(_item[j].target);
				this[_item[j].id].init(_item[j]);
				veinObjects.push(this[_item[j].id]);
			}
		}
	}
}