var Matrix = function(arr,m,n)
{
	//Private variables
	var _thisRef = this;
	
	//Public variables
	this.elements = [];
	
	//===================================================
	// Private Functions
	//===================================================
	function init(arg)
	{
		if(arg)
		{
			_thisRef.setElements(arg);
		}
	}
	
	//===================================================
	// Public Functions
	//===================================================
	
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	this.setElements = function(a)
	{
		var i, elements = a.elements || a;
		if (typeof(elements[0][0]) != 'undefined')
		{
			var b = elements.length,
				ki = b,
				nj, kj, j;
			this.elements = [];
			do {
				i = ki - b;
				nj = elements[i].length;
				kj = nj;
				this.elements[i] = [];
				do {
					j = kj - nj;
					this.elements[i][j] = elements[i][j]
				} while (--nj)
			} while (--b);
			return this
		}
		var n = elements.length,
			k = n;
		this.elements = [];
		do {
			i = k - n;
			this.elements.push([elements[i]])
		} while (--n);
		return this
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Return element of given index
	this.elem = function(i, j)
	{
		if (i < 1 || i > this.elements.length || j < 1 || j > this.elements[0].length)
		{
			return null
		}
		return this.elements[i - 1][j - 1]
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Return whole row of given number
	this.row = function(i)
	{
		if (i > this.elements.length)
		{
			return null
		}
		return this.elements[i - 1]
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Return whole column of given number
	this.col = function(j)
	{
		if (j > this.elements[0].length)
		{
			return null
		}
		var a = [],
			n = this.elements.length,
			k = n*1,
			i;
		do {
			i = k - n;
			a.push(this.elements[i][j - 1])
		} while (--n);
		return a;
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Returns number of Rows and columns in array
	this.dimensions = function()
	{
		return {
			rows: this.elements.length,
			cols: this.elements[0].length
		}
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Returns number of Rows
	this.rows = function()
	{
		return this.elements.length
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Returns number of Columns 
	this.cols = function()
	{
		return this.elements[0].length
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Check if given matrix is equal with current matrix
	this.eql = function(a)
	{
		var M = a.elements || a;
		if (typeof(M[0][0]) == 'undefined')
		{
			M = Matrix.create(M).elements
		}
		if (this.elements.length != M.length || this.elements[0].length != M[0].length)
		{
			return false
		}
		var b = this.elements.length,
			ki = b,
			i, nj, kj = this.elements[0].length,
			j;
		do {
			i = ki - b;
			nj = kj;
			do {
				j = kj - nj;
				if (Math.abs(this.elements[i][j] - M[i][j]) > 0)
				{
					return false
				}
			} while (--nj)
		} while (--b);
		return true
	},
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Return duplicate matrix
	this.dup = function()
	{
		return Matrix.create(this.elements)
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	//Maps the receiver to another matrix by calling iterator on each element of the receiver in turn. iterator receives the row and column index of each element as second and third arguments. Some examples:
	this.map = function(a)
	{
		var b = [],
			ni = this.elements.length,
			ki = ni,
			i, nj, kj = this.elements[0].length,
			j;
		do {
			i = ki - ni;
			nj = kj;
			b[i] = [];
			do {
				j = kj - nj;
				b[i][j] = a(this.elements[i][j], i + 1, j + 1)
			} while (--nj)
		} while (--ni);
		return Matrix.create(b)
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Check if number of rows and columns are same of given matrix with respect to current matrix
	this.isSameSizeAs = function(a)
	{
		var M = a.elements || a;
		if (typeof(M[0][0]) == 'undefined')
		{
			M = Matrix.create(M).elements
		}
		return (this.elements.length == M.length && this.elements[0].length == M[0].length)
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Add Matrix 
	this.add = function(a)
	{
		var M = a.elements || a;
		if (typeof(M[0][0]) == 'undefined')
		{
			M = Matrix.create(M).elements
		}
		if (!this.isSameSizeAs(M))
		{
			return null
		}
		return this.map(function(x, i, j)
		{
			return x + M[i - 1][j - 1]
		})
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Subtract Matrix 
	this.subtract = function(a)
	{
		var M = a.elements || a;
		if (typeof(M[0][0]) == 'undefined')
		{
			M = Matrix.create(M).elements
		}
		if (!this.isSameSizeAs(M))
		{
			return null
		}
		return this.map(function(x, i, j)
		{
			return x - M[i - 1][j - 1]
		})
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// A.canMultiplyFromLeft(B) returns true if AB is a mathematically valid expression. 
	// This is the case if A has the same number of columns as B has rows. 
	// Matrix can also be a Vector, as long as it has the same number of elements as the receiver has rows.
	this.canMultiplyFromLeft = function(a)
	{
		var M = a.elements || a;
		if (typeof(M[0][0]) == 'undefined')
		{
			M = Matrix.create(M).elements
		}
		return (this.elements[0].length == M.length)
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Return Multiplication of Matrix
	this.multiply = function(a)
	{
		if (!a.elements)
		{
			return this.map(function(x)
			{
				return x * a
			})
		}
		var b = a.modulus ? true : false;
		var M = a.elements || a;
		if (typeof(M[0][0]) == 'undefined')
		{
			M = Matrix.create(M).elements
		}
		if (!this.canMultiplyFromLeft(M))
		{
			return null
		}
		var d = this.elements.length,
			ki = d,
			i, nj, kj = M[0].length,
			j;
		var e = this.elements[0].length,
			elements = [],
			sum, nc, c;
		do {
			i = ki - d;
			elements[i] = [];
			nj = kj;
			do {
				j = kj - nj;
				sum = 0;
				nc = e;
				do {
					c = e - nc;
					sum += this.elements[i][c] * M[c][j]
				} while (--nc);
				elements[i][j] = sum
			} while (--nj)
		} while (--d);
		var M = Matrix.create(elements);
		return b ? M.col(1) : M
	}
	
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Alias for multiply
	this.x = function(a)
	{
		return this.multiply(a)
	},
	
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// This method returns a matrix formed from a subset of the receiver’s elements. It selects elements beginning at row i and column j of the receiver, and returns a matrix with n rows and m columns. The selection wraps to the other side of the receiver if n or m is large enough.
	this.minor = function(a, b, c, d)
	{
		var e = [],
			ni = c,
			i, nj, j;
		var f = this.elements.length,
			cols = this.elements[0].length;
		do {
			i = c - ni;
			e[i] = [];
			nj = d;
			do {
				j = d - nj;
				e[i][j] = this.elements[(a + i - 1) % f][(b + j - 1) % cols]
			} while (--nj)
		} while (--ni);
		return Matrix.create(e)
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Returns the matrix transpose of the receiver.
	this.transpose = function()
	{
		var a = this.elements.length,
			cols = this.elements[0].length;
		var b = [],
			ni = cols,
			i, nj, j;
		do {
			i = cols - ni;
			b[i] = [];
			nj = a;
			do {
				j = a - nj;
				b[i][j] = this.elements[j][i]
			} while (--nj)
		} while (--ni);
		return Matrix.create(b)
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Returns true if the receiver is square.
	this.isSquare = function()
	{
		return (this.elements.length == this.elements[0].length)
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Returns the value of the element of the receiver with the largest absolute value.
	this.max = function()
	{
		var m = 0,
			ni = this.elements.length,
			ki = ni,
			i, nj, kj = this.elements[0].length,
			j;
		do {
			i = ki - ni;
			nj = kj;
			do {
				j = kj - nj;
				if (Math.abs(this.elements[i][j]) > Math.abs(m))
				{
					m = this.elements[i][j]
				}
			} while (--nj)
		} while (--ni);
		return m
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Reads the receiver’s elements row by row from left to right and returns an object containing the indexes of the first exact match. Returns null if no match is found.
	this.indexOf = function(x)
	{
		var a = null,
			ni = this.elements.length,
			ki = ni,
			i, nj, kj = this.elements[0].length,
			j;
		do {
			i = ki - ni;
			nj = kj;
			do {
				j = kj - nj;
				if (this.elements[i][j] == x)
				{
					return {
						i: i + 1,
						j: j + 1
					}
				}
			} while (--nj)
		} while (--ni);
		return null
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	//If the receiver is square, returns its leading-diagonal elements as a Array. Otherwise, returns null.
	this.diagonal = function()
	{
		if (!this.isSquare)
		{
			return null
		}
		var a = [],
			n = this.elements.length,
			k = n,
			i;
		do {
			i = k - n;
			a.push(this.elements[i][i])
		} while (--n);
		return a;
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Returns a copy of the receiver converted to right triangular form. The conversion is done only by adding multiples of rows to other rows, so the determinant (if the matrix is square) is unchanged. This method can be used on non-square matrices, which lets you use it to solve sets of simultaneous equations. 
	this.toRightTriangular = function()
	{
		var M = this.dup(),
			els;
		var n = this.elements.length,
			k = n,
			i, np, kp = this.elements[0].length,
			p;
		do {
			i = k - n;
			if (M.elements[i][i] == 0)
			{
				for (j = i + 1; j < k; j++)
				{
					if (M.elements[j][i] != 0)
					{
						els = [];
						np = kp;
						do {
							p = kp - np;
							els.push(M.elements[i][p] + M.elements[j][p])
						} while (--np);
						M.elements[i] = els;
						break
					}
				}
			}
			if (M.elements[i][i] != 0)
			{
				for (j = i + 1; j < k; j++)
				{
					var a = M.elements[j][i] / M.elements[i][i];
					els = [];
					np = kp;
					do {
						p = kp - np;
						els.push(p <= i ? 0 : M.elements[j][p] - M.elements[i][p] * a)
					} while (--np);
					M.elements[j] = els
				}
			}
		} while (--n);
		return M
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Alias for toRightTriangular.
	this.toUpperTriangular = function()
	{
		return this.toRightTriangular()
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// If the receiver is square, returns its determinant, otherwise returns null. Note that if the receiver is singular, this method will return exactly zero, with no rounding errors.
	this.determinant = function()
	{
		if (!this.isSquare())
		{
			return null
		}
		var M = this.toRightTriangular();
		var a = M.elements[0][0],
			n = M.elements.length - 1,
			k = n,
			i;
		do {
			i = k - n + 1;
			a = a * M.elements[i][i]
		} while (--n);
		return a
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	//  Alias for determinant.
	this.det = function()
	{
		return this.determinant()
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Returns true if the receiver is square and has zero determinant.
	this.isSingular = function()
	{
		return (this.isSquare() && this.determinant() === 0)
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Returns the trace for square matrices, which is the sum of their leading-diagonal elements.
	this.trace = function()
	{
		if (!this.isSquare())
		{
			return null
		}
		var a = this.elements[0][0],
			n = this.elements.length - 1,
			k = n,
			i;
		do {
			i = k - n + 1;
			a += this.elements[i][i]
		} while (--n);
		return a
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Alias for trace.
	this.tr = function()
	{
		return this.trace()
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Returns the receiver’s rank, which is the number of linearly independent rows/columns it contains.
	this.rank = function()
	{
		var M = this.toRightTriangular(),
			rank = 0;
		var a = this.elements.length,
			ki = a,
			i, nj, kj = this.elements[0].length,
			j;
		do {
			i = ki - a;
			nj = kj;
			do {
				j = kj - nj;
				if (Math.abs(M.elements[i][j]) > 0)
				{
					rank++;
					break
				}
			} while (--nj)
		} while (--a);
		return rank
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Alias for rank.
	this.rk = function()
	{
		return this.rank()
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Returns the result of augmenting the receiver with matrix, that is, appending matrix to the right hand side of the receiver. Both matrices must have the same number of rows for this to work.
	this.augment = function(a)
	{
		var M = a.elements || a;
		if (typeof(M[0][0]) == 'undefined')
		{
			M = Matrix.create(M).elements
		}
		var T = this.dup(),
			cols = T.elements[0].length;
		var b = T.elements.length,
			ki = b,
			i, nj, kj = M[0].length,
			j;
		if (b != M.length)
		{
			return null
		}
		do {
			i = ki - b;
			nj = kj;
			do {
				j = kj - nj;
				T.elements[i][cols + j] = M[i][j]
			} while (--nj)
		} while (--b);
		return T
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Returns the matrix inverse of the receiver, if one exists. If the matrix is singular or not square, then null is returned. The inverse is computed using Gauss-Jordan elimination.
	this.inverse = function()
	{
		if (!this.isSquare() || this.isSingular())
		{
			return null
		}
		var a = this.elements.length,
			ki = a,
			i, j;
		var M = this.augment(Matrix.I(a)).toRightTriangular();
		var b, kp = M.elements[0].length,
			p, els, divisor;
		var c = [],
			new_element;
		do {
			i = a - 1;
			els = [];
			b = kp;
			c[i] = [];
			divisor = M.elements[i][i];
			do {
				p = kp - b;
				new_element = M.elements[i][p] / divisor;
				els.push(new_element);
				if (p >= ki)
				{
					c[i].push(new_element)
				}
			} while (--b);
			M.elements[i] = els;
			for (j = 0; j < i; j++)
			{
				els = [];
				b = kp;
				do {
					p = kp - b;
					els.push(M.elements[j][p] - M.elements[i][p] * M.elements[j][i])
				} while (--b);
				M.elements[j] = els
			}
		} while (--a);
		return Matrix.create(c)
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Alias for inverse.
	this.inv = function()
	{
		return this.inverse()
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Returns a copy of the receiver with all its elements rounded to the nearest integer.
	this.round = function()
	{
		return this.map(function(x)
		{
			return Math.round(x)
		})
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Returns a copy of the receiver in which any elements that differ from x by less than the value of 0 are set exactly equal to x.
	this.snapTo = function(x)
	{
		return this.map(function(p)
		{
			return (Math.abs(p - x) <= 0) ? x : p
		})
	}
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Returns a string representation of the receiver, useful for debugging.
	this.inspect = function()
	{
		var a = [];
		var n = this.elements.length,
			k = n,
			i;
		do {
			i = k - n;
			a.push( '[' + this.elements[i].join(', ') + ']' )
		} while (--n);
		return a.join('\n')
	}
	
	//
	init(arr);
}


Matrix.create = function(a)
{
	var M = new Matrix();
	return M.setElements(a)
};
Matrix.I = function(n)
{
	var a = [],
		k = n,
		i, nj, j;
	do {
		i = k - n;
		a[i] = [];
		nj = k;
		do {
			j = k - nj;
			a[i][j] = (i == j) ? 1 : 0
		} while (--nj)
	} while (--n);
	return Matrix.create(a)
};
Matrix.Diagonal = function(a)
{
	var n = a.length,
		k = n,
		i;
	var M = Matrix.I(n);
	do {
		i = k - n;
		M.elements[i][i] = a[i]
	} while (--n);
	return M
};
Matrix.Rotation = function(b, a)
{
	if (!a)
	{
		return Matrix.create([[Math.cos(b), -Math.sin(b)], [Math.sin(b), Math.cos(b)]])
	}
	var d = a.dup();
	if (d.elements.length != 3)
	{
		return null
	}
	var e = d.modulus();
	var x = d.elements[0] / e,
		y = d.elements[1] / e,
		z = d.elements[2] / e;
	var s = Math.sin(b),
		c = Math.cos(b),
		t = 1 - c;
	return Matrix.create([[t * x * x + c, t * x * y - s * z, t * x * z + s * y], [t * x * y + s * z, t * y * y + c, t * y * z - s * x], [t * x * z - s * y, t * y * z + s * x, t * z * z + c]])
};
Matrix.RotationX = function(t)
{
	var c = Math.cos(t),
		s = Math.sin(t);
	return Matrix.create([[1, 0, 0], [0, c, -s], [0, s, c]])
};
Matrix.RotationY = function(t)
{
	var c = Math.cos(t),
		s = Math.sin(t);
	return Matrix.create([[c, 0, s], [0, 1, 0], [-s, 0, c]])
};
Matrix.RotationZ = function(t)
{
	var c = Math.cos(t),
		s = Math.sin(t);
	return Matrix.create([[c, -s, 0], [s, c, 0], [0, 0, 1]])
};
Matrix.Random = function(n, m)
{
	return Matrix.Zero(n, m).map(function()
	{
		return Math.random()
	})
};
Matrix.Zero = function(n, m)
{
	var a = [],
		ni = n,
		i, nj, j;
	do {
		i = n - ni;
		a[i] = [];
		nj = m;
		do {
			j = m - nj;
			a[i][j] = 0
		} while (--nj)
	} while (--ni);
	return Matrix.create(a)
};

