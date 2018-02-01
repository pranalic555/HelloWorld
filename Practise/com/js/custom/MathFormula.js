//////////////////////////////////////////////////////////////////////////////////////
// Developed By: Mitr Learning & Media												//
// Name: MathFormula																//
// Description: All mathematical calculation are done in this class.				//
// Date Created: 07/05/2014															//
// Date Modified: 07/05/2014														//
// Version: 1.0:																	//
//////////////////////////////////////////////////////////////////////////////////////

//================================================================================
// EXPONENTIAL FORMULA CLASS
var ExponentialFormula = function(_obj)
{
	var p = {};
	for(var i in _obj)
	{
		p[i] = Number(_obj[i]);
	}
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.string = function()
	{
		return makeString();
	}
	this.left = function()
	{
		return makeString().split(" = ")[0];
	}
	this.right = function()
	{
		return makeString().split(" = ")[1];
	}
	this.y = function()
	{
		if(p.c != undefined && p.r != undefined && p.t != undefined)
		{
			var _y = p.c * Math.pow((1+p.r), p.t);
			return _y;
		}
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function makeString()
	{
		var _ret = "";
		if(p.c == 0)
		{
			_ret = "<i>y</i> = 0";
		}
		else
		{
			_ret = "<i>y</i> = ";
			_ret += p.c != undefined ? p.c == 1 ? "" : p.c == -1 ? "-" : p.c : "<i>c</i>";
			_ret += "(1";
			_ret += p.r != undefined ? p.r >= 0 ? " + "+p.r : " - "+Math.abs(p.r) : "<i>r</i>";
			_ret += ")<sup>";
			_ret += p.t != undefined ? p.t : "<i>t</i>";
			_ret += "</sup>"
		}
		return _ret;
	}
}

//================================================================================
// BASIC EXPONENTIAL FORMULA CLASS
var BasicExpoFormula = function(_obj)
{
	var p = {};
	for(var i in _obj)
	{
		p[i] = Number(_obj[i]);
	}
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.string = function()
	{
		return makeString();
	}
	this.left = function()
	{
		return makeString().split(" = ")[0];
	}
	this.right = function()
	{
		return makeString().split(" = ")[1];
	}
	this.x = function()
	{
		if(p.a != undefined && p.b != undefined && p.x != undefined)
		{
			var _y = p.a * Math.pow(p.b, p.x);
			return _y;
		}
	}
	this.y = function()
	{
		if(p.a != undefined && p.b != undefined && p.x != undefined)
		{
			var _y = p.a * Math.pow(p.b, p.x);
			return _y;
		}
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function makeString()
	{
		var _ret = "";
		_ret = "<i>y</i> = ";
		if(p.a == 0 || p.b == 0)
		{
			_ret = "<i>y</i> = 0";
		}
		else if(p.a == 1 &&  p.b == 1)
		{
			_ret += 1;
			_ret += "<sup><i>x</i></sup>";
		}
		else
		{
			_ret = "<i>y</i> = ";
			_ret += p.a != undefined ? p.a == 1 ? "" : p.a == -1 ? "–" : p.a : "<i>a</i>";
			_ret += p.a == 1 ? "" : " &#8226; ";
			_ret += p.b != undefined ? p.b == 1 ? "1" : p.b == -1 ? "–" : p.b : "<i>b</i>";
			_ret += "<sup><i>x</i></sup>";
		}
		return _ret;
	}
}//================================================================================
// SLOPE INTERCEPT FORMULA CLASS
var SlopeInterceptFormula = function(_obj)
{
	var p = {};
	for(var i in _obj)
	{
		p[i] = Number(_obj[i]);
	}
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.string = function()
	{
		return makeString();
	}
	this.left = function()
	{
		return makeString().split(" = ")[0];
	}
	this.right = function()
	{
		return makeString().split(" = ")[1];
	}
	this.y = function()
	{
		if(p.m != undefined && p.b != undefined && p.x != undefined)
		{
			var _y = p.m*p.x + p.b;
			return _y;
		}
	}
	this.getXY = function()
	{
		if(p.m != undefined && p.b != undefined)
		{
			var _point = new Object();
			var _x = -p.b/p.m;			
			_point.y = p.m*_x + p.b;
			_point.x = _point.y - p.b/p.m;			
			return _point;
		}
	}
	this.getIntersectionPoint = function()
	{
		if(p.m1 != undefined && p.b1 != undefined &&  p.m2 != undefined &&  p.b2 != undefined)
		{
			var obj = new Object();
			var x = 0;
			if((p.b2 - p.b1) == 0)
			{
				x = 0;
			}else
			{
				x = (p.b2 - p.b1)/(p.m1-p.m2);
			}
			var y = p.m1*x + p.b1;
			obj.x = x;
			obj.y = y;
			return obj;			
		}
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function makeString()
	{
		var _ret = "";
		if(p.m == 0)
		{
			_ret = "<i>y</i> = "+p.b;
		}else if(p.b == 0)
		{
			_ret += "<i>y</i> = ";
			_ret += p.m != undefined ? p.m == 1 ? "" : p.m == -1 ? "-" : p.m : "<i>m</i>";
			_ret += "<i>x</i>";
		}
		else
		{
			_ret = "<i>y</i> = ";
			_ret += p.m != undefined ? p.m == 1 ? "" : p.m == -1 ? "-" : p.m : "<i>a</i>";
			_ret += p.m > 0 || p.m < 0 ? "<i>x</i>" : "";
			_ret += p.b != undefined && p.m != undefined && p.b > 0? " + "  : p.b < 0 ? " - " :"";
			_ret += p.b != undefined ? Math.abs(p.b) : "";
			//_ret += "<i>x</i>";
		}
		return _ret;
	}
}
//================================================================================
// STANDARD FORM OF LINE
var PolyLinearForm = function(_obj)
{
	var p =
	{
	};
	for(var i in _obj)
	{
		p[i] = Number(_obj[i]);
	}
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.string = function()
	{
		return makeString();
	}
	this.getXY = function()
	{
		var tempObj = new Object();
		var x = p.x;
		var y = 1;
		
		p.a !=0 ? y = (x- p.a) : y = x;
		isNaN(p.b) ? "" : p.b !=0 ? y = y * (x- p.b) : y = y*x;
		isNaN(p.c) ? "" : p.c !=0 ? y = y * (x- p.c) : y = y*x;
		isNaN(p.d) ? "" : p.d !=0 ? y = y * (x- p.d) : y = y*x;

		tempObj.x = x;
		tempObj.y = y;
		return tempObj;
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function makeString()
	{		
		var x = p.x;
		var y = 1;
		var _ret = "";
		
		if(isNaN(p.b) && isNaN(p.c) && isNaN(p.d))
		{
		 p.a == 0 ? _ret=" <i>y = x</i>" :  p.a > 0 ? _ret += "<i> y = x - </i>"+p.a : _ret += "<i> y = x</i> + "+p.a * -1 ;
		}
		else
		{
		p.a == 0 ? _ret=" <i>y = </i>(<i>x</i>) " : p.a > 0 ? _ret += "<i> y = </i>(<i>x - </i>"+p.a +")" : _ret += "<i> y = </i>(<i>x</i> + "+p.a * -1 +")" ;
		isNaN(p.b) ? _ret += "": p.b == 0 ? _ret += " (<i>x</i>)" : p.b > 0 ? _ret += " (<i>x</i> - "+p.b +")" : _ret += " (<i>x</i> + "+p.b * -1 +")";
		isNaN(p.c) ? _ret += "": p.c == 0 ? _ret += " (<i>x</i>)" : p.c > 0 ? _ret += " (<i>x - </i> "+p.c +")" : _ret += " (<i>x</i> + "+p.c * -1 +")";
		isNaN(p.d) ? _ret += "": p.d == 0 ? _ret += " (<i>x</i>)" : p.d > 0 ? _ret += " (<i>x - </i>"+p.d +")" : _ret += " (<i>x </i>+ "+p.d * -1 +")";
		}
		//p.a == 0 && isNaN(p.b) && isNaN(p.c) && isNaN(p.d) ?  _ret=" <i>y = x</i>" : p.a > 0 ? _ret += "<i> y = x -</i>"+p.a : _ret += "<i> y = x +</i> "+p.a * -1 ;
		return  "<span>"+_ret+"</span>";
	}
}
//================================================================================
// STANDARD FORM OF LINE
var StandardLineForm = function(_obj)
{
	var p = {};
	for(var i in _obj)
	{
		p[i] = Number(_obj[i]);
	}
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.string = function()
	{
		return makeString();
	}
	this.getXY = function()
	{
		var tempObj = new Object();
		var x = p.x;
		var y = 0;
		if(p.a == 0 && p.b == 0)
		{
			x = 0;
			y = 0;
		}
		else if(p.a == 0)
		{
			y = Number(p.c /p.b);
		}
		else if(p.b == 0)
		{
			p.c != 0 ? x = p.c/p.a :  x = 0 , y = p.x;
		}
		else if(typeof p.a != "undefined" && typeof p.b != "undefined" && typeof p.c != "undefined")
		{
			y = (p.c - p.a*x)/p.b;
			x = (p.c - p.b*y)/p.a;
		}
		tempObj.x = x;
		tempObj.y = y;
		return tempObj;	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function makeString()
	{		
		//p.a = Number(p.a).toFixed(1) * 1;
		//p.b = Number(p.b).toFixed(1) * 1;
		//p.c = Number(p.c).toFixed(1) * 1;
				
		var _ret = "";
		if(p.a == 0 && p.b == 0)
		{
			_ret = "0 = " + p.c;
		}
		else
		{			
			if(p.a != 0 && p.b != 0)
			{
				p.a == 1 ? p.a = " " :  p.a == -1 ? p.a = " –"  : p.a = p.a;
				
				_ret = p.a + "<i>x </i>";

				_ret = p.b > 0 && p.b == 1 ? _ret + " +<i> y </i>" : p.b > 0 ? _ret +" + " +p.b+ "<i>y </i>" : p.b == -1 ? _ret + " – <i>y </i>" : _ret + " - " + Math.abs(p.b) + "<i>y </i>";

				_ret += " = "+ p.c 
			}
			else if(p.a == 0 && p.b != 0)
			{
				p.b == 1 ? p.b = " " : p.b == -1 ?  p.b = " – " : p.b = p.b;
				_ret = p.b+"<i>y </i>" + " = " + p.c;
			}
			else if(p.a != 0 && p.b == 0)
			{
				p.a == 1 ? p.a = " " :  p.a == -1 ? p.a = " –"  : p.a = p.a;
				_ret = p.a+"<i>x </i>" + " = " + p.c;
			}
		}
		return _ret;
	}
}
//================================================================================
// Solving Equations by Graphing Each Side
var Graphing_EachSide = function(_obj)
{
	var p = {};
	for(var i in _obj)
	{
		p[i] = Number(_obj[i]);
	}
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.getXY = function()
	{
		var tempObj = new Object();
		var x = p.x;
		var y1 = 0;
		var y2 = 0;
		if(p.e == 0)
		{
			y1 = (p.a * x) + p.b;
		}
		else
		{
			y1 = p.a * (x + p.b)
		}
		
		y2 = (p.c * x ) + p.d;
		
		tempObj.y1 = y1;
		tempObj.y2 = y2;
		return tempObj;
	}
}
//================================================================================
// RADICAL FUNCTIONS
var RadicalFunction = function(_obj)
{
    var p = {};
    for (var i in _obj)
    {
        p[i] = Number(_obj[i]);
    }
    //================================================================================
    // PUBLIC FUNCTIONS
    //================================================================================
    this.string = function()
    {
        return makeString();
    }
    this.getXY = function()
    {
        var tempObj = new Object();
        if (typeof p.x != 'undefined')
        {
            var x = p.x;
            var y = 0;
        }
        else {
            var x = 0;
            var y = p.y;
        }

        if (p.a == 0 && p.h == 0 && p.k == 0)
        {
            x = 0;
            y = 0;
        }
        else if (p.a == 0 && p.h == 0 && p.k != 0)
        {
            y = p.k;
            x = 0;
        }
        else if (p.a != 0 && p.h == 0 && p.k == 0)
        {
            if (_obj.type == 0)
            {                            
                if(isNaN(Math.sqrt(x)))
                {
                    if(Math.round(x) >= 0.1)
                    {
						y = Number(p.a * Math.sqrt(Math.abs(x)))*-1;
					}                  
                    x = Number(Math.pow((y / p.a),2));       
                }
                else
                {
                    y = Number(p.a * Math.sqrt(Math.abs(x)));  
                    x = Number(Math.pow((y / p.a),2));                                       
                }
            }
            else
            {                
                y = Number(p.a * Math.cbrt(x));
                x = Number(Math.pow((y / p.a), 3));                
            }
        }
        else if (p.a == 0 && p.h != 0 && p.k == 0)
        {
            y = 0;
            x = p.h;

        }
        else if (typeof p.a != "undefined" && typeof p.h != "undefined" && typeof p.k != "undefined")
        {

            if (_obj.type == 0)
            {                               
                if (!isNaN(Math.sqrt(x - p.h)))
                    y = (p.a * Math.sqrt(x - p.h)) + p.k;
                else
                {
                    var sqrt = Math.sqrt(Math.abs(x - p.h)) * -1;
                    y = (p.a * sqrt) + p.k;
                    if (x < p.h)
                    {
                        y = p.k;
                        if(p.a!=0)
                        x = p.h;
                    }
                }

            }
            else if (_obj.type == 1)
            {                
				y = (p.a * Math.cbrt(x - p.h)) + p.k;            
            }
        }

        tempObj.x = x;
        tempObj.y = y;
        
        return tempObj;
    }
    //================================================================================
    // PRIVATE FUNCTIONS
    //================================================================================
    function makeString()
    {
        var _ret = "";
		var sqrt_mod=(_obj.type==0)?"\\sqrt":"\\space \\sqrt[3]";
        if (p.h == 0 && p.k == 0)
        {
            var a = (p.a == 1) ? '' : (p.a == -1) ? "-" : p.a;            
            _ret = "\\begin{equation}\\ y = " + a + " "+sqrt_mod+"{x} \\end{equation}";
        }
        if (p.h != 0 && p.k != 0)
        {
            var a = (p.a == 1) ? '' : (p.a == -1) ? "-" : p.a;
            _ret = "\\begin{equation}\\ y = " + a;
            p.h < 0 ? _ret += ""+sqrt_mod+"{x +" + Math.abs(p.h) + "}" : _ret += ""+sqrt_mod+"{x -" + Math.abs(p.h) + "}";
            p.k < 0 ? _ret += "-" + Math.abs(p.k) + "\\end{equation}" : _ret += "+" + Math.abs(p.k) + "\\end{equation}";
        }
        else if (p.h == 0 && p.k != 0)
        {
            var a = (p.a == 1) ? '' : (p.a == -1) ? "-" :p.a;
            (p.k > 0) ? _ret = "\\begin{equation}\\ y = " + a + " "+sqrt_mod+"{x} + " + p.k + " \\end{equation}" : _ret = "\\begin{equation}\\ y = " + p.a + " "+sqrt_mod+"{x} - " + Math.abs(p.k) + " \\end{equation}";

        }
        else if (p.k == 0 && p.h != 0)
        {
            var a = (p.a == 1) ? '' : (p.a == -1) ? "-" :p.a;
            var hText = (p.h > 0) ? '-' + Math.abs(p.h) : '+' + Math.abs(p.h);
            _ret = "\\begin{equation}\\ y = " + a + " "+sqrt_mod+"{x" + hText + "} \\end{equation}";

        }
        if (p.a == 0)
        {
            _ret = "\\begin{equation}\\ y = "+p.k+" \\end{equation}";
        }

        return _ret;
    }
}
// Rational Function
var RationalFunction = function(_obj)
{
	var p = {};
	for(var i in _obj)
	{
		p[i] = Number(_obj[i]);
	}
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.string = function()
	{
		return makeString();
	}
	this.getXY = function()
	{
		var tempObj = new Object();
		if(typeof p.x!='undefined')
		{
			var x = p.x;
			var y = 0;
		}
		else
		{
			var x = 0;
			var y = p.y;
		}
		
		if(p.a == 0 && p.h == 0 && p.k==0)
		{
			x = 0;
			y = 0;
		}
		else if(p.a == 0 && p.h == 0 && p.k!=0)
		{   
			   
				y=p.k;                        
				x=0;
		}
		else if(p.a != 0 && p.h == 0 && p.k == 0)
		{
			y = Number(p.a / x);
			x = Number(p.a / y);
		}
		else if(p.a == 0 && p.h != 0 && p.k == 0)
		{
			y=0;
			x=p.h;
		}
		else if(typeof p.a != "undefined" && typeof p.h != "undefined" && typeof p.k != "undefined")
		{
			if(y!=0){
				x = (p.a /(y - p.k))+ p.h;
				y = (p.a /(x - p.h))+ p.k;			
			}
			else
			{
				y = (p.a /(x - p.h))+ p.k;	
				x = (p.a /(y - p.k))+ p.h;
								
			}
			
		}
		tempObj.x = x;
		tempObj.y = y;
		return tempObj;
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function makeString()
	{				
		var _ret = "";
		if(p.h == 0 && p.k == 0)
		{
			_ret = "<i>y</i> = ~|"+ p.a+" ~frac <i> x </i>";
		}
		else
		{			
			if(p.h != 0 && p.k != 0)
			{
			   // '<i>y</i> = ~| <i>    a  </i> ~frac <i> x </i> – <i> h </i> ~|+ <i>k</i>'
				_ret ="<i>y</i> = ~| "+ p.a+" ~frac <i> x </i>";
				p.h < 0 ? _ret +=" + "+Math.abs(p.h)+" ~|": _ret +=" - "+p.h+" ~|";
				p.k < 0 ? _ret += " - "+Math.abs(p.k):_ret +=" + "+ p.k;
			}
			else if(p.h == 0 && p.k != 0)
			{
				_ret ="<i>y</i> = ~| "+ p.a+" ~frac <i> x </i>~|"+ (p.k<0 ? " - "+Math.abs(p.k) : "+ "+p.k);
			}
			else if(p.h != 0 && p.k == 0)
			{
				_ret ="<i>y</i> = ~| "+ p.a+" ~frac <i> x </i>";
				p.h < 0 ? _ret +=" + "+Math.abs(p.h): _ret +=" - "+p.h;
			}
		}
		return _ret;
	}
}

//================================================================================
// SLOPE INTERCEPT FORMULA A CLASS
var SlopeActivityA = function(_obj)
{
	var p = {};
	for(var i in _obj)
	{
		p[i] = Number(_obj[i]);
	}
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.string = function()
	{
		return makeString();
	}
	this.y = function()
	{
		if(p.m != undefined && p.a != undefined &&  p.b != undefined)
		{
			var tempObj = new Object();
			var x = p.x;
			var y = 0;
			y = p.m*(x - p.a)+p.b;
			p.m == 0 ? x = ((y - p.b) + p.m*p.a) : x = ((y - p.b) + p.m*p.a)/p.m;
			tempObj.x = x;
			tempObj.y = y;
			return tempObj;
		}
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function makeString()
	{
		var _ret = "";
		if(p.m == 0)
		{
			_ret = "<i>y = </i>"+p.b;
		}
		else if(p.m == 1)
		{
			_ret = p.b == 0 && p.a >0 ? "<i>y</i> = <i>x</i> -"+p.a : p.b == 0 && p.a <0 ? "<i>y</i> = <i>x</i> + "+Math.abs(p.a):"";
			_ret = p.b == 0 && p.a == 0 ? "<i>y</i> = <i>x</i>" : p.b == 0 && p.a >0 ? "<i>y</i> = <i>x</i> - "+p.a:p.b == 0 && p.a <0 ? "<i>y</i> = <i>x</i> + "+Math.abs(p.a) : p.b < 0 && p.a == 0 ? "<i>y</i> + "+Math.abs(p.b)+" = <i>x</i>": p.b > 0 && p.a == 0 ? "<i>y</i> - "+p.b+" = <i>x</i>": p.b > 0 && p.a >0 ? "<i>y</i> - "+p.b+ " = <i>x</i> - "+p.a : p.b < 0 && p.a <0 ? "<i>y</i> + "+Math.abs(p.b)+ " = <i>x</i> + "+Math.abs(p.a):p.b > 0 && p.a <0 ? "<i>y</i> - "+Math.abs(p.b)+ " = <i>x</i> + "+Math.abs(p.a) : p.b < 0 && p.a >0 ?"<i>y</i> + "+Math.abs(p.b)+ " = <i>x</i> - "+p.a:"";
		}
		else
		{
			_ret = p.b == 0 && p.a == 0 ? "<i> y </i> = "+p.m+"<i>x </i>" : p.b == 0 && p.a >0 ? "<i>y</i> = "+p.m+"(<i>x </i> - "+p.a+")":p.b == 0 && p.a <0 ? "<i>y = </i>"+p.m+"(<i>x </i>+ "+Math.abs(p.a)+")" :p.b < 0 && p.a == 0 ? "<i>y </i>+ "+Math.abs(p.b)+" = "+p.m+"<i>x</i>":p.b > 0 && p.a == 0 ? "<i>y </i>- "+p.b+" = "+p.m+"<i>x</i>":(p.b > 0 && p.a >0) && p.m == -1 ? "<i>y </i>- "+p.b+ " = -(<i>x </i>- "+p.a+")" :(p.b > 0 && p.a >0) ? "<i>y </i>- "+p.b+ " = "+p.m+"(<i>x </i>- "+p.a+")" :(p.b < 0 && p.a <0)&& p.m == -1  ? "<i>y </i>+ "+Math.abs(p.b)+ " =  -(<i>x </i>+ "+Math.abs(p.a)+")": p.b < 0 && p.a <0 ? "<i>y </i>+ "+Math.abs(p.b)+ " = "+p.m+"(<i>x </i>+ "+Math.abs(p.a)+")": (p.b > 0 && p.a <0) && p.m == -1 ? "<i>y </i>- "+Math.abs(p.b)+ " =  -(<i>x </i>+ "+Math.abs(p.a)+")" : p.b > 0 && p.a <0 ? "<i>y </i>- "+Math.abs(p.b)+ " = "+p.m+"(<i>x </i>+ "+Math.abs(p.a)+")" : (p.b < 0 && p.a >0) && p.m == -1 ? "<i>y </i>+ "+Math.abs(p.b)+ " =  -(<i>x </i>- "+p.a+")": p.b < 0 && p.a >0 ? "<i>y </i>+ "+Math.abs(p.b)+ " = "+p.m+"(<i>x </i>- "+p.a+")" :"";
		}
		return _ret;
	}
}
//================================================================================
// SLOPE INTERCEPT FORMULA B CLASS
var SlopeActivityB = function(_obj)
{
	var p = {};
	for(var i in _obj)
	{
		p[i] = Number(_obj[i]);
	}
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.string = function()
	{
		return makeString();
	}
	this.left = function()
	{
		return makeString().split(" = ")[0];
	}
	this.right = function()
	{
		return makeString().split(" = ")[1];
	}
	this.y = function()
	{
		if(p.x1 != undefined && p.y1 != undefined &&  p.x2 != undefined &&  p.y2 != undefined && p.x != undefined)
		{
			var m = (p.y2 - p.y1) / (p.x2 - p.x1);
			var c = p.y2 - m*p.x2
			var _y = m*p.x + c;
			return _y;
		}
	}
	this.getSlope = function()
	{
		if(p.x1 != undefined && p.y1 != undefined &&  p.x2 != undefined &&  p.y2 != undefined)
		{
			var m = (p.y2 - p.y1) / (p.x2 - p.x1);
			return m;
		}
	}
	this.getC = function()
	{
		if(p.x1 != undefined && p.y1 != undefined &&  p.x2 != undefined &&  p.y2 != undefined)
		{
			var m = (p.y2 - p.y1) / (p.x2 - p.x1);
			var c = p.y2 - m*p.x2;
			return c;
		}
	}
	this.getX = function()
	{
		if(p.x1 != undefined && p.y1 != undefined &&  p.x2 != undefined &&  p.y2 != undefined)
		{
			var m = (p.y2 - p.y1) / (p.x2 - p.x1);
			var c = p.y2 - m*p.x2;
			var _xx = ((-c)/m)*10;
			var x = m*_xx + c;
			return x;
		}
	}
	this.getY = function()
	{
		if(p.x1 != undefined && p.y1 != undefined &&  p.x2 != undefined &&  p.y2 != undefined)
		{
			var m = (p.y2 - p.y1) / (p.x2 - p.x1);
			var c = p.y2 - m*p.x2;
			var _xx = ((-c)/m)*10;
			var x = m*_xx + c;
			var y = m*x+c;
			return y;
		}
	}
	this.getRiseRun = function()
	{
		if(p.x1 != undefined && p.y1 != undefined &&  p.x2 != undefined &&  p.y2 != undefined)
		{
			var _obj = new Object();
			_obj.rise = p.y2 - p.y1;
			_obj.run = p.x2 - p.x1;
			return _obj;
		}
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function makeString()
	{
		var obj = new Object();
		obj.rise = "Rise = <i>y</i><sub>2</sub> - <i>y</i><sub>1</sub> = ";
		obj.rise += ""+p.y2+"</span>";
		obj.rise +=  p.y1 != undefined && p.y1 > 0? " - "  : p.y1 < 0 ? " - (-" : p.y1 == 0 ? " - " : "";
		obj.rise += ""+Math.abs(p.y1);
		obj.rise +=  p.y1 != undefined && p.y1 < 0? ")" : "";
		obj.rise += ""+" = ";
		obj.rise += ""+(p.y2 - p.y1);
		obj.rise = obj.rise;
		
		obj.run = "Run = <i>x</i><sub>2</sub> - <i>x</i><sub>1</sub> = ";
		obj.run += ""+p.x2;
		obj.run +=  p.x1 != undefined && p.x1 > 0? " - "  : p.x1 < 0 ? " - (-" :p.x1 == 0 ? " - " : "";
		obj.run += ""+Math.abs(p.x1);
		obj.run +=  p.x1 != undefined && p.x1 < 0? ")"  : "";
		obj.run += ""+" = ";
		obj.run += ""+(p.x2 - p.x1)+"";
		obj.run = obj.run;		
		return obj;
	}
}
//================================================================================
// QUADRATICS FORMULA CLASS
var QuadraticsFormula = function(_obj)
{
	var p = {};
	for(var i in _obj)
	{
		p[i] = Number(_obj[i]);
	}
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.string = function()
	{
		return makeString();
	}
	this.left = function()
	{
		return makeString().split(" = ")[0];
	}
	this.right = function()
	{
            return makeString().split(" = ")[1];
	}
	this.y = function()
	{
            var _y = 0;
            if(p.a != undefined && p.x != undefined)
            {
                _y = p.a * Math.pow(p.x, 2);
            }
            
            if( p.b != undefined && p.x != undefined )
            {
                _y = _y + p.b * p.x;
            }
            if( p.c != undefined && p.x != undefined )
            {
                _y = _y + p.c;
            }
            return _y;
	}
	this.getVertex = function()
	{
	   if(p.a != undefined && p.b != undefined && p.c != undefined)
		{
			var _point = new Object();
			_point.x = -p.b/(2*p.a);
			p.x = _point.x;
			_point.y = p.a * Math.pow(p.x, 2) + p.b * p.x + p.c;
			return _point;
		} 
	}
	this.getXIntercepts = function()
	{
		if(p.a != undefined && p.b != undefined && p.c != undefined)
		{
			var tempObject = new Object();
			if(p.a != 0 && ( Math.pow(p.b, 2)-4 * p.a * p.c) > 0)
			{
				tempObject.x1 = (-(p.b) - Math.sqrt( Math.pow(p.b, 2)-4 * p.a * p.c)) / (2 * p.a);
				tempObject.x2 = (-(p.b)+Math.sqrt(Math.pow(p.b, 2)- 4 * p.a * p.c)) / (2 * p.a);
			}else if(p.a == 0)
			{
				if ( p.b != 0)
				{
					tempObject.x1 = -p.c/p.b
				}
				else if (p.b == 0)
				{
					return false;
				}
			}
			else if(( Math.pow(p.b, 2)-4 * p.a * p.c) == 0)
			{
				tempObject.x1 = (-(p.b) - Math.sqrt( Math.pow(p.b, 2)-4 * p.a * p.c)) / (2 * p.a);
			}
			else if(( Math.pow(p.b, 2)-4 * p.a * p.c) < 0)
			{
				return false;
			}
			return tempObject;
		}
	}
	this.getYIntercepts = function()
	{
		p.x = 0;
		var yIntr = p.c;
		return yIntr;
	}
	this.getAxisSymmetric = function()
	{
		if(p.a != undefined && p.b != undefined && p.c != undefined)
		{
			var axisObj = -p.b/(2*p.a);
			return axisObj;
		}
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function makeString()
	{
		var _ret = "";
		var _res = 0;
		_ret = "<i>y</i> = ";
		
		if(p.a != 0)
		{
			_ret += p.a != undefined ? p.a == 1 ? "" : p.a == -1 ? "-" : p.a : "<i>a</i>";
			_ret += "<i>x</i><sup>2</sup> ";
			_res++;
		}
		if(p.b != 0)
		{
			if(_res > 0 && p.b > 0)
				_ret += " + ";
			else if(_res >= 0 && p.b < 0)
			{
				if(p.a == 0)
					_ret += "-";
				else
					_ret += " - ";
			}
			p.b = Math.abs(p.b);
			_ret += p.b != undefined ? p.b > 0 ? "" + p.b+"<i>x</i>" : p.b < 0 ? p.b+"<i>x</i> " : "" : " + <i>b</i>x ";
			_res++;
		}
		if(p.c != 0)
		{
			if(_res > 0 && p.c > 0)
				_ret += " + ";
			else if(_res > 0 && p.c < 0)
				_ret += " - ";
			p.c = Math.abs(p.c);
			_ret += p.c != undefined ? p.c > 0 ? "" + p.c : p.c < 0 ? p.c : "" : " + <i>c</i>";
		}
		if(p.a == 0 && p.b == 0 && p.c == 0)
		{
			_ret += "0";
		}
		// console.log(_ret)
		return _ret;
	}
    //================================================================================
    // PUBLIC FUNCTIONS
    //================================================================================
}
// SLOPE LINEAR EQUATION FORMULA CLASS
var SolveLinearEquation = function(_obj){
    var p = {};
    for(var i in _obj){
        p[i] = Number(_obj[i]);
    }
    //================================================================================
    // PUBLIC FUNCTIONS
    //================================================================================
    this.y = function(){
        if(p.a != undefined && p.b != undefined && p.x != undefined && p.c != undefined){
            var _y = undefined;
            if(p.b != 0){
                _y = (p.c - p.a*p.x)/p.b;
            }
            return _y;
        }
    }
}

//To solve two linear equations simultaneously
//of the form a1x + b1y = c1 & a2x + b2y = c2
var SolveTwoEquationsSimultn = function(_obj){
    var p = {};
    for(var i in _obj){
        p[i] = Number(_obj[i]);
    }
    //================================================================================
    // PUBLIC FUNCTIONS
    //================================================================================
    this.xy = function(){
        var _x = undefined, _y=undefined;
        if(p.b2*p.a1 - p.a2*p.b1 != 0){
            _y = (p.c2*p.a1 - p.a2*p.c1)/(p.b2*p.a1 - p.a2*p.b1);
        }else{
			_y = p.b2*p.a1 - p.a2*p.b1;
        }
        if(p.a1 != 0){
            _x = (p.c1 - p.b1*_y)/p.a1;
        }else{
             _y = p.c1/p.b1;
            _x = (p.c2 - p.b2*_y)/p.a2;
        }
        return {x:_x, y:_y};
    }
}
//========================================================================================
var QuadraticsFormulaB = function(_obj)
{
	var p = {};
	for(var i in _obj)
	{
		p[i] = Number(_obj[i]);
	}
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.string = function()
	{
		return makeString();
	}
	this.left = function()
	{
		return makeString().split(" = ")[0];
	}
	this.right = function()
	{
            return makeString().split(" = ")[1];
	}
	this.y = function()
	{
            var _y = 0;			
            if(p.a != undefined && p.x != undefined && p.b != undefined)
            {
                _y = p.a * Math.pow(p.x, 2);
            }
			if( p.b != undefined && p.x != undefined )
            {
                _y = _y + p.b * p.x;
            }
            if( p.c != undefined && p.x != undefined )
            {
                _y = _y + p.c;
            }
            return _y;
	}
	this.getVertex = function()
	{
	   if(p.a != undefined && p.b != undefined && p.c != undefined)
		{
			var _point = new Object();
			_point.x = -p.b/(2*p.a);
			p.x = _point.x;
			_point.y = p.a * Math.pow(p.x, 2) + p.b * p.x + p.c;
			return _point;
		} 
	}
	this.getXIntercepts = function()
	{
		if(p.a != undefined && p.b != undefined && p.c != undefined)
		{
			
			var tempObject = new Object();
			if(p.a != 0 && ( (Math.pow(p.b, 2)).toFixed(4)*1-4 * p.a * p.c) > 0)
			{
				tempObject.x1 = (-(p.b) - Math.sqrt( (Math.pow(p.b, 2)).toFixed(4)*1-4 * p.a * p.c)) / (2 * p.a);
				tempObject.x2 = (-(p.b)+Math.sqrt((Math.pow(p.b, 2)).toFixed(4)*1- 4 * p.a * p.c)) / (2 * p.a);
			}else if(p.a == 0)
			{
				if ( p.b != 0)
				{
					tempObject.x1 = -p.c/p.b
				}
				else if (p.b == 0)
				{
					return false;
				}
			}
			else if(( (Math.pow(p.b, 2)).toFixed(4)*1 -4 * p.a * p.c) == 0)
			{
				tempObject.x1 = (-(p.b) - Math.sqrt( (Math.pow(p.b, 2)).toFixed(4)*1-4 * p.a * p.c)) / (2 * p.a);
			}
			else if(( (Math.pow(p.b, 2)).toFixed(4)*1-4 * p.a * p.c) < 0)
			{
				return false;
			}
			return tempObject;
		}
	}
	this.getYIntercepts = function()
	{
		p.x = 0;
		var yIntr = p.c;
		return yIntr;
	}
	this.getAxisSymmetric = function()
	{
		if(p.a != undefined && p.b != undefined && p.c != undefined)
		{
			var axisObj = -p.b/(2*p.a);
			return axisObj;
		}
	}
	this.getPolyForm = function()
	{
		var _ret = "";
		var _res = 0;
		_ret = "<i>y</i> = ";
		
		if(p.a != 0)
		{
			_ret += p.a != undefined ? p.a == 1 ? "" : p.a == -1 ? "-" : p.a : "<i>a</i>";
			_ret += "<i>x</i><sup>2</sup> ";
			_res++;
		}
		if(p.b != 0)
		{
			if(_res > 0 && p.b > 0)
				_ret += " + ";
			else if(_res > 0 && p.b < 0)
				_ret += " - ";
			p.b = Math.abs(p.b);
			_ret += p.b != undefined ?  p.b == 1 ? "<i>x</i>" : p.b == -1 ? " <i>x</i> " :  p.b > 0 ? "" + p.b+"<i>x</i>" : p.b < 0 ? p.b+"<i>x</i> " : "" : " + <i>b</i>x</i> ";
			_res++;
		}
		if(p.c != 0)
		{
			if(_res > 0 && p.c > 0)
				_ret += " + ";
			else if(_res > 0 && p.c < 0)
				_ret += " - ";
			p.c = Math.abs(p.c);
			_ret += p.c != undefined ? p.c > 0 ? "" + p.c : p.c < 0 ? p.c : "" : " + <i>c</i>";
		}
		if(p.a == 0 && p.b == 0 && p.c == 0)
		{
			_ret += "0";
		}
		return ""+_ret+"</i>";
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function makeString()
	{
		var _ret = "";
		var _res = 0;
		_ret = "<i>y</i> = ";
		if(p.a == 0 && p.b == 0 && p.c == 0)
		{
			_ret += "0";
		}else if(p.a == 0)
		{
			_ret += p.c;
		}else
		{
			if(p.a != 0)
			{
				_ret += p.a != undefined ? p.a == 1 ? "" : p.a == -1 ? "-" : p.a : "<i>a</i>";
				_res++;
			}
			if(p.b == 0)
			{
				if(_res > 0)
				{
					_ret += "<i>x</i><sup>2</sup></i>";
				}
				_res++;
			}
			if(p.b != 0)
			{
				_ret += "(<i>x</i></i>";
				_ret += p.b != undefined ? p.b == 1 || p.b > 0 ? " - "+p.b : p.b == -1 || p.b < 0 ? " + "+Math.abs(p.b) : p.b : "<i>a</i>";
				p.b = Math.abs(p.b);
				_ret += ")<sup>2</sup></i>";
				_res++;
			}
			if(p.c == 0)
			{
				if(_res > 0)
				{
					_ret += "";
				}
				_res++;
			}
			if(p.c != 0)
			{
				if(_res > 0 && p.c > 0)
					_ret += " + ";
				else if(_res > 0 && p.c < 0)
					_ret += " - ";
				p.c = Math.abs(p.c);
				_ret += p.c != undefined ? p.c > 0 ? "" + p.c : p.c < 0 ? p.c : "" : " + <i>c</i>";
			}
		}
		return _ret;
	}
    //================================================================================
    // PUBLIC FUNCTIONS
    //================================================================================
}
//================================================================================
// LINEAR SOLVING SYSTEM FORM OF LINE
var LinearSolvingLineForm = function(_obj)
{
	var p = {};
	for(var i in _obj)
	{
		p[i] = Number(_obj[i]);
	}
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.string = function()
	{
		return makeString();
	}
	
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.eqn = function()
	{
		return makeEqn();
	}
	this.xy = function(){
        var _x = undefined, _y=undefined;
        if(p.b2*p.a1 - p.a2*p.b1 != 0){
            _y = (p.c2*p.a1 - p.a2*p.c1)/(p.b2*p.a1 - p.a2*p.b1);
        }else{
            //console.log("PArallel Lines....");
        }
        if(p.a1 != 0){
            _x = (p.c1 - p.b1*_y)/p.a1;
        }else{
             _y = p.c1/p.b1;
            _x = (p.c2 - p.b2*_y)/p.a2;
        }
        return {x:_x, y:_y};
    }
	
	this.y = function(){
        if(p.a != undefined && p.b != undefined && p.x != undefined && p.c != undefined){
			var _y = undefined;
            if(p.b != 0){
				p.x = Number(p.x.toFixed(2));
                _y = (p.c - p.a*p.x)/p.b;
            }
			else
			{
				if(p.a*p.x == p.c)
				{
					_y = "any";
				}
				else
				{
					_y = "–";
				}
			}
            return _y;
        }
    }
	this.x = function ()
	{
		if(p.a != undefined && p.b != undefined && p.x != undefined && p.c != undefined)
		{
			var _x;
			if(p.a != 0)
			{
				_x = p.c/p.a;
			}
			else
			{
				_x = "infinite";
			}
			return _x;
		}
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function makeEqn(){
		
		var _ret = "";
		var a = p.a;
		var b = p.b;
		if(a<0){
			a = a;
		}else{
			a = a;
		}
		if(b<0){
			b = b;
		}else{
			b = "+"+b;
		}
		_ret = "<span class='localMJ_i'>"+ a+"(1)"+b+"(1) = "+p.c +"</span>"
		return _ret
	}
	function makeString()
	{		
		//p.a = Number(p.a).toFixed(1) * 1;
		//p.b = Number(p.b).toFixed(1) * 1;
		//p.c = Number(p.c).toFixed(1) * 1;
		
		
		var _ret = "";
		if(p.a == 0 && p.b == 0)
		{
			_ret = "0 = " + p.c;
		}
		else
		{			
			if(p.a != 0 && p.b != 0)
			{
				p.a == 1 ? p.a = " " : p.a = p.a;
				_ret = p.a + "<span class='localMJ_i'>x </span>";

				_ret = p.b > 0 ? p.b == 1 ? _ret + " +<span class='localMJ_i'> y </span>" : _ret + " + "+ p.b + "<span class='localMJ_i'>y </span>" : _ret + " - " + Math.abs(p.b) + "<span class='localMJ_i'>y </span>";

				_ret += " = "+ p.c 
			}
			else if(p.a == 0 && p.b != 0)
			{
				p.b == 1 ? p.b = " " : p.b = p.b;				
				_ret = p.b+"<span class='localMJ_i'>y </span>" + " = " + p.c;
			}
			else if(p.a != 0 && p.b == 0)
			{
				p.a == 1 ? p.a = " " : p.a = p.a;
				_ret = p.a+"<span class='localMJ_i'>x </span>" + " = " + p.c;
			}
		}
		return "<span class='localMJ_n'>"+_ret+"</span>";
	}
}
//================================================================================
// Absolute FORM OF LINE
var AbsoluteLineForm = function(_obj)
{

	var p = {};
	for (var i in _obj)
	{
		p[i] = Number(_obj[i]);
	}
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.string = function(format)
	{
		if (typeof format == 'undefined') {
			format = null;
		}
		return makeString(format);
	}
	this.getXY = function()
	{

		if (p.a != undefined && p.b != undefined)
		{
			var tempObj = new Object();
			var x = p.x;
			var x_mod = Math.abs(p.x);
			var y = 0;

			y = p.a * x + p.b;
			x = (y - p.b) / p.a;

			var y_ = p.a * x_mod + p.b;

			tempObj.x = x;
			tempObj.y = y;
			tempObj.y_mod = y_;
			tempObj.mod = Math.abs(y);
			return tempObj;
		}
	}
	//================================================================================
	// PRIVATE FUNCTIONS
	//================================================================================
	function makeString(format)
	{
		var _ret = "";
		var a = p.a;
		var b = p.b;
		if (a == 0 && b == 0)
		{
			_ret = "0";
		}
		if(a == 0)
		{
			_ret = b;
		}
		else 
		{
			if(a == 1)
			{
				a = '';
			}
			if(a == -1)
			{
				a = '-';
			}
			if (b > 0) {
				b = " + " + b;
			} else if (b == 0) {
				b = "";
			} else {
				b = " - " + Math.abs(b);
			}
			if (format == 'mod_x') {
				_ret = a + "|<i>x</i>|" + b;
			} else if (format == 'mod') {
				_ret = "|"+a + "<i>x</i>" + b+"|";
			} else {
				_ret = a + "<i>x</i>" + b;
			}

		}

		return [_ret + " ","" + _ret + ""];
	}
}
//============================================================
// Absolute value equation FORMULA CLASS
var AbsValEqnt = function(_obj)
{
	var p = {};
	for(var i in _obj)
	{
		p[i] = Number(_obj[i]);
	}
	//================================================================================
	// PUBLIC FUNCTIONS
	//================================================================================
	this.string = function()
	{
		return makeString();
	}
	this.left = function()
	{
		return makeString().split(" = ")[0];
	}
	this.right = function()
	{
        return makeString().split(" = ")[1];
	}
	this.makeString = function()
	{
		var _ret;
		if(p.a != 0)
		{
			if(p.b == 0)
			{
				_ret = "<span class='localMJ_i'> | </span>"+p.a+"<em>x</em> <span class='localMJ_i'>|</span>";
			}
			else
			{
				var signVal = "+"
				p.b < 0 ? signVal = "-" : signVal = "+" ;					
				_ret = "<span class='localMJ_i'> | </span>"+p.a +"<em>x</em> <span class='localMJ_i'> </span>"+ signVal + " " +Math.abs(p.b)+ "<span class='localMJ_i'> |</span>";	
			}
		}
		else
		{
			_ret = "<span class='localMJ_i'>|</span>"+p.b+"<span class='localMJ_i'> | </span>";
		}
		if(p.a == 1 || p.a == -1)
		{
			var signVal = "+"
			var signVal1 = " "
			p.b < 0 ? signVal = "-" : signVal = "+";
			if(p.a < 0)
			signVal1 = "-"; 
			_ret =  "<span class='localMJ_i'> | </span>"+ signVal1 +"<em>x</em> <span class='localMJ_i'> </span>"+ signVal +" " +Math.abs(p.b)+ "<span class='localMJ_i'> |</span>";	
		}		   
		if(((p.a == 1) || (p.a == -1)) && p.b == 0)
		{
			var signVal = "+"
			p.b < 0 ? signVal = "-" : signVal = "+";
			_ret =  "<span class='localMJ_i'> | </span><em>x</em> <span class='localMJ_i'> |</span>";	
		}
		return _ret;
	}
	this.y = function()
	{
		if(p.a != undefined && p.b != undefined)
		{
			var tempObj = new Object();
			var x = p.x;
			var y = 0;
			y = Math.abs((p.a*x) + p.b);
			x = Math.abs((y-p.b)/p.a);
			tempObj.x = x;
			tempObj.y = y;
			return tempObj;
		}        
	}	
}
//================================================================================