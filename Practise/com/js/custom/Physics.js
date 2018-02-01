

// ++++++++++++++++++++++++ Vector +++++++++++++++++++++++++++ //
var Vector = function (x,y,z) 
{
	this.x= x || 0; 
	this.y = y || 0; 
	this.z = z || 0; 
};
Vector.prototype = 
{
	reset: function ( x, y, z) 
	{
		this.x = x;
		this.y = y;
		this.z = z;

		return this;
	},

	toString : function (decPlaces) 
	{
	 	decPlaces = decPlaces || 3; 
		var scalar = Math.pow(10,decPlaces); 
		return "[" + Math.round (this.x * scalar) / scalar + ", " + Math.round (this.y * scalar) / scalar + ", " + Math.round (this.z * scalar) / scalar + "]";
	},
	
	clone : function () 
	{
		return new Vector(this.x, this.y, this.z);
	},
	
	copyTo : function (v) 
	{
		v.x = this.x;
		v.y = this.y;
		v.z = this.z;
	},
	
	copyFrom : function (v) 
	{
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
	},	
	
	magnitude : function () 
	{
		return Math.sqrt((this.x*this.x)+(this.y*this.y)+(this.z*this.z));
	},
		
	normalise : function () 
	{
		
		var m = this.magnitude();
				
		this.x = this.x/m;
		this.y = this.y/m;
		this.z = this.z/m;

		return this;	
	},
	
	reverse : function () 
	{
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
		
		return this; 
	},
	
	plusEq : function (v) 
	{
		this.x+=v.x;
		this.y+=v.y;
		this.z+=v.z;
		
		return this; 
	},
	
	plusNew : function (v) 
	{
		 return new Vector(this.x+v.x, this.y+v.y, this.z+v.z); 
	},
	
	minusEq : function (v) 
	{
		this.x-=v.x;
		this.y-=v.y;
		this.z-=v.z;
		
		return this; 
	},
	
	getNormal : function ()
	{
		return new Vector(-this.y,this.x, this.z); 
	},
	
	minusNew : function (v) 
	{
	 	return new Vector(this.x-v.x, this.y-v.y, this.z-v.z); 
	},	
	
	multiplyEq : function (scalar) 
	{
		this.x*=scalar;
		this.y*=scalar;
		this.z*=scalar;
		
		return this; 
	},
	
	multiplyNew : function (scalar) 
	{
		var returnvec = this.clone();
		return returnvec.multiplyEq(scalar);
	},
	
	divideEq : function (scalar) 
	{
		this.x/=scalar;
		this.y/=scalar;
		this.z/=scalar;
		return this; 
	},
	
	divideNew : function (scalar) 
	{
		var returnvec = this.clone();
		return returnvec.divideEq(scalar);
	},

	dot : function (v) 
	{
		return (this.x * v.x) + (this.y * v.y) + (this.z * v.z) ;
	},
	
	angle : function (useRadians) 
	{
		return Math.atan2(this.y,this.x) * (useRadians ? 1 : Maths.TO_DEGREES);
	},
	
	rotate : function (angle, useRadians) 
	{
		var cosRY = Math.cos(angle * (useRadians ? 1 : Maths.TO_RADIANS));
		var sinRY = Math.sin(angle * (useRadians ? 1 : Maths.TO_RADIANS));
		
		VectorConst.clone.copyFrom(this); 

		this.x= (VectorConst.clone.x*cosRY)-(VectorConst.clone.y*sinRY);
		this.y= (VectorConst.clone.x*sinRY)+(VectorConst.clone.y*cosRY);
		
		return this; 
	},	
		
	equals : function (v) 
	{
		return((this.x==v.x)&&(this.y==v.x));
	},
		
	length : function () 
	{
		return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2)+Math.pow(this.z,2));
	},
	
	angleBetween : function (v) 
	{
		this.z = this.z == undefined ? 0 : this.z;
		v.z = v.z == undefined ? 0 : v.z;
		return Math.acos((this.x*v.x+this.y*v.y+this.z*v.z)/(Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2)+Math.pow(this.z,2))*Math.sqrt(Math.pow(v.x,2)+Math.pow(v.y,2)+Math.pow(v.z,2))));
	},
	
	crossProduct: function(v)
	{
		var x = (this.y * v.z) - (this.z * v.y);
		var y = (this.x * v.z) - (this.z * v.x);
		var z = (this.x * v.y) - (this.y * v.x);
		return new Vector(x, y, z);
	}
};
var VectorConst = 
{
	clone : new Vector()
};
// ++++++++++++++++++++++++ Vector +++++++++++++++++++++++++++ //