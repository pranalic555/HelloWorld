//////////////////////////////////////////////////////////////////
// Developed By: Mitr Learning & Media							//
// Name: Maths Class											//
// Description: This section holds all required maths functions.//
// Date Created: 27/09/2014										//
// Date Modified: 27/09/2014									//
// Version: 1.0:												//
//////////////////////////////////////////////////////////////////
//================================================================================

function Maths()
{
}


//================================================================================
// STATIC CONSTANTS
//================================================================================
Maths.TO_DEGREES = 180 / Math.PI;
Maths.TO_RADIANS = Math.PI / 180;

//================================================================================
// STATIC FUNCTIONS
//================================================================================


//================================================================================
// Return random number with in given range. 
Maths.randomNumber = function (min,max,numOfDes,step)
{
	var newRand = Math.random() * (max - min) + min;
	if(!step)
		return Number((newRand).toFixed(numOfDes));
	var temp = newRand + 0;
	newRand = newRand - temp%step;
	return Number((newRand).toFixed(numOfDes));
}
//================================================================================
// Returns percent value.
Maths.numberToPercent = function(number, total)
{
	var a = number * 100 / total;
	return a;
}
//================================================================================
// Returns percent value.
Maths.percentToNumber = function(percent, total)
{
	return percent / 100 * total;
}
//================================================================================
// Converts from radians to degrees.
Maths.radiansToDegrees = function (radians)
{
	return radians * Maths.TO_DEGREES;
}
//================================================================================
// Converts from degrees to radians.
Maths.degreesToRadians = function (degrees)
{
	return degrees * Maths.TO_RADIANS;
}
//================================================================================
// Returns distance between given points 
Maths.getDistance = function(p1,p2)
{
	return Math.sqrt(Math.pow((p1.x-p2.x),2)+Math.pow((p1.y-p2.y),2));
}
//================================================================================
// Returns angle between given points with optional parameter isRad.
Maths.getAngle = function (p1,p2,isRad)
{
	if(isRad)
		return Math.atan2((p1.y-p2.y),(p1.x-p2.x));
	else
		return Math.atan2((p1.y-p2.y),(p1.x-p2.x))*Maths.TO_DEGREES;
}
//================================================================================
// Returns Angle between three points
Maths.getAngleBtn3 = function(p0,p1,c,flag) 
{
	p0.x = Number(p0.x).toFixed(4)*1
	p0.y = Number(p0.y).toFixed(4)*1
	p1.x = Number(p1.x).toFixed(4)*1
	p1.y = Number(p1.y).toFixed(4)*1
	c.x = Number(c.x).toFixed(4)*1
	c.y = Number(c.y).toFixed(4)*1
	var p0c = Math.sqrt(Math.pow(c.x-p0.x,2)+
						Math.pow(c.y-p0.y,2)); // p0->c (b)   
	var p1c = Math.sqrt(Math.pow(c.x-p1.x,2)+
						Math.pow(c.y-p1.y,2)); // p1->c (a)
	var p0p1 = Math.sqrt(Math.pow(p1.x-p0.x,2)+
						 Math.pow(p1.y-p0.y,2)); // p0->p1 (c)
	if( typeof flag != "undefined")
	{
		var angle_1 = (Maths.getAngle(p0,c));
		angle_1 = angle_1 < 0 ? 360 + angle_1 : angle_1;
		var angle_2 = (Maths.getAngle(p1,c));
		angle_2 = angle_2 < 0 ? 360 + angle_2 : angle_2;
		
		var finalAngle = angle_1 < angle_2 ? (angle_2 - angle_1) : (360-angle_1 + angle_2);
		finalAngle = finalAngle == 360 ? 0 : finalAngle;
		return finalAngle;
	}
	var _tempNum = (p1c*p1c+p0c*p0c-p0p1*p0p1).toFixed(2)*1;
	var _tempDen = (2*p1c*p0c).toFixed(2)*1;
	return Math.acos((_tempNum)/(_tempDen))*Maths.TO_DEGREES;
}
//================================================================================
// Check if point lie on line
Maths.isPointOnLine = function(_p,_p1,_p2,hitArea)
{
	/*
	var minX = (_p1.x <= _p2.x)? _p1.x : _p2.x;
	var maxX = (_p1.x > _p2.x)? _p1.x : _p2.x;
	var minY = (_p1.y <= _p2.y)? _p1.y : _p2.y;
	var maxY = (_p1.y > _p2.y)? _p1.y : _p2.y;
	
	if(Math.abs(_p1.x-_p2.x) < hitArea)
	{
		if(((minX - hitArea/2) <= _p.x && (maxX + hitArea/2) >= _p.x) && (minY <= _p.y && maxY >= _p.y))
		{
			var len1 = Maths.getDistance(_p,_p1);
			var len2 = Maths.getDistance(_p,_p2);
			
			if(len1 > len2)
				return _p2;
			else
				return _p1;
		}
	}
	if(Math.abs(_p1.y-_p2.y) < hitArea)
	{
		if(((minY - hitArea/2) <= _p.y && (maxY + hitArea/2) >= _p.y) && (minX <= _p.x && maxX >= _p.x))
		{
			var len1 = Maths.getDistance(_p,_p1);
			var len2 = Maths.getDistance(_p,_p2);
			
			if(len1 > len2)
				return _p2;
			else
				return _p1;
		}
	}
	if(minX <= _p.x && _p.x <= maxX && minY <= _p.y && _p.y <= maxY)
	{
		var _SLOPE = (_p2.y - _p1.y)/(_p2.x - _p1.x);
		var _C = _p1.y - _SLOPE*_p1.x;
		
		var _intercept = _p1.y - (_SLOPE) * _p1.x;
		
		if( (_SLOPE * _p.x + _intercept) > (_p.y - hitArea) && (_SLOPE * _p.x + _intercept) < (_p.y + hitArea) )
		{
			var len1 = Maths.getDistance(_p,_p1);
			var len2 = Maths.getDistance(_p,_p2);
			
			if(len1 > len2)
				return _p2;
			else
				return _p1;
		}
		else
		{
			return false;			
		}
	}
	return false;	
	 */
	
	var len1 = Maths.getDistance(_p,_p1);
	var len2 = Maths.getDistance(_p,_p2);
		
	var _center = Maths.getMidPoint(_p1,_p2);
	
	var dist = Maths.getDistance(_p, _center);
	var mainDist = Maths.getDistance(_p1, _center);
	var pointAngle = Maths.getAngle(_p, _center);
	pointAngle = pointAngle < 0 ? 360 + pointAngle : pointAngle;
	
	var mainAngle = Maths.getAngle(_center, _p1);
	mainAngle = mainAngle < 0 ? 360 + mainAngle : mainAngle;
	
	var finalAngle = pointAngle - mainAngle  + 90;
	
	var _tempP = {};
	
	_tempP.x = _center.x + dist * Math.cos((finalAngle) * Maths.TO_RADIANS);
	_tempP.y = _center.y + dist * Math.sin((finalAngle) * Maths.TO_RADIANS);
	
	var tempObj = {a:(_center.x - hitArea / 2),b:(_center.x + hitArea / 2),c:(_center.y - mainDist),d:(_center.y + mainDist), p :_tempP}
	
	if ((_center.x - hitArea / 2) <= _tempP.x && (_center.x + hitArea / 2) >= _tempP.x && (_center.y - mainDist) <= _tempP.y && (_center.y + mainDist) >= _tempP.y) 
	{
		tempObj.flag = true;
	}
	else 
	{
		tempObj.flag = false;
	}
	if(tempObj.flag)
	{
		if(len1 > len2)
			return _p2;
		else
			return _p1;
	}
	return false;
}
//================================================================================
// Returns mid point between given points
Maths.getMidPoint = function (_p1,_p2)
{
	var newPoint = new Object();
	newPoint.x = (_p1.x+_p2.x)/2;
	newPoint.y = (_p1.y+_p2.y)/2;
	return newPoint;
}
//================================================================================
// Check if number is prime or not
Maths.isPrime = function (num)
{
	if(num == 1)
		return false;
	for(var i = 2; i < num; i ++)
	{
		if(num%i == 0)
		{
			return false;
		}
	}
	
	return true;
}
//================================================================================
// return integer part - may be negative
Maths.trunc = function(n) {
    return (n < 0) ? Math.ceil(n) : Math.floor(n);
}
//================================================================================
// return fraction part
Maths.frac = function (n) 
{
	return n - Maths.trunc(n);
}
//================================================================================
// return Point Object with given angle and radius
Maths.getPoint = function(p,angle,rad)
{
	var temp = new Object();
	
	temp.x = p.x + (rad * Math.cos(angle));
	temp.y = p.y + (rad * Math.sin(angle));
	
	return temp;	
}
//================================================================================
//Return Number with given decimal number.
Maths.getRound = function(num,dec)
{
	var tempArr = (""+num).split(".");
	if(tempArr[1])
	{
		var str = tempArr[1];
		if( dec < str.length)
		{
			var newStr = "0.";
			for(var i = 0; i < dec-1;i++)
			{
				newStr += "0";
			}
			if( 5 <= str[dec]*1 )
			{
				newStr += "1";
			}
			else
			{
				newStr += "0";
			}
			num = ((tempArr[0]+"."+tempArr[1].slice(0,dec))*1 + Number(newStr)).toFixed(dec);
		}
	}	
	return num;
}
//================================================================================
//Return Number with given decimal number.
Maths.log = function(n, base){
    var log = Math.log;
    return log(n)/(base ? log(base) : 1);
}
//================================================================================
// returns cube root of value
Maths.cbrt = Math.cbrt || function(x) 
{
	var y = Math.pow(Math.abs(x), 1/3);
	return x < 0 ? -y : y;
};