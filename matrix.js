class Matrix {
	constructor(rows = 1, cols = 1) {
		this.rows = rows;
		this.cols = cols;
		this.matrix = [];

		for (var i = 0; i < this.rows; i++) {
			this.matrix[i] = [];
			for (var j = 0; j < this.cols; j++) {
				this.matrix[i][j] = 0;
			}
			// this.matrix[i] = temp
		}
	}

	


	toArray() {
		var arr = [];
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.cols; j++) {
				arr.push(this.matrix[i][j]);
			}
		}
		return arr;
	}

	static fromArray(arr) {
		let m = new Matrix(arr.length, 1);
		for (var i = 0; i < arr.length; i++) {
			m.matrix[i][0] = arr[i];
		}
		return m;
	}

	randomize(lowerlim = -1, upperlim = 1) {
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.cols; j++) {
				this.matrix[i][j] = random(lowerlim, upperlim);
			}
		}
	}

	print() {
		console.table(this.matrix);
	}
	static add(m, n) {
		if (n instanceof Matrix) {
			if (n.rows == m.rows && n.cols == m.cols) {
				let sum = new Matrix(m.rows, m.cols);
				for (var i = 0; i < sum.rows; i++) {
					for (var j = 0; j < sum.cols; j++) {
						sum.matrix[i][j] = m.matrix[i][j] + n.matrix[i][j];
					}
				}
				return sum;
			}
		} else {
			let sum = new Matrix(m.rows, m.cols);
			for (var i = 0; i < sum.rows; i++) {
				for (var j = 0; j < sum.cols; j++) {
					sum.matrix[i][j] = m.matrix[i][j] + n;
				}
			}
			return sum;
		}
		//  console.table(this.matrix);
	}

	static sub(m, n) {
		if (n instanceof Matrix) {
			if (n.rows == m.rows && n.cols == m.cols) {
				let diff = new Matrix(m.rows, m.cols);
				for (var i = 0; i < diff.rows; i++) {
					for (var j = 0; j < diff.cols; j++) {
						diff.matrix[i][j] = m.matrix[i][j] - n.matrix[i][j];
					}
				}
				return diff;
			}
		} else {
			let diff = new Matrix(m.rows, m.cols);
			for (var i = 0; i < diff.rows; i++) {
				for (var j = 0; j < diff.cols; j++) {
					diff.matrix[i][j] = m.matrix[i][j] - n;
				}
			}
			return diff;
		}
		//  console.table(this.matrix);
	}

	static multiply(m, n) {
		
		if ((n instanceof Matrix) & (m instanceof Matrix)) {
			let product = new Matrix(m.rows, m.cols);
			for (var i = 0; i < product.rows; i++) {
				for (var j = 0; j < product.cols; j++) {
					product.matrix[i][j] = (m.matrix[i][j] * n.matrix[i][j]);
				}
			}
			return product
		} 
		
		else {
		
			var product = new Matrix(m.rows,m.cols);
			for (var i = 0; i < product.rows; i++) {
				for (var j = 0; j < product.cols; j++) {
					product.matrix[i][j]=m.matrix[i][j]*n
				}
			}
			return product;
		}
		
		//  console.table(this.matrix);
	}

	static	dotProduct(m,n) {
		if (m.cols != n.rows) {
			console.log("col must be equal to rows");
			return null;
		}
		let result = new Matrix(m.rows, n.cols);
		for (var i = 0; i < result.rows; i++) {
			for (var j = 0; j < result.cols; j++) {
				var s = 0;
				for (var k = 0; k < m.cols; k++) {
					s =s+( m.matrix[i][k] * n.matrix[k][j]);
				}
				result.matrix[i][j] = s;
			}
		}
		return result;
	}

	applyFunction(fx) {
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.cols; j++) {
				this.matrix[i][j] = fx(this.matrix[i][j]);
			}
		}
	}

	static ApplyFunction(a, fx) {
		let arr = new Matrix(a.rows, a.cols);
		for (var i = 0; i < arr.rows; i++) {
			for (var j = 0; j < arr.cols; j++) {
				let val = a.matrix[i][j];
				arr.matrix[i][j] = fx(val);
			}
		}
		return arr;
	}

	 t() {
		let t = new Matrix(this.cols, this.rows);
		for (var i = 0; i < t.rows; i++) {
			for (var j = 0; j < t.cols; j++) {
				t.matrix[i][j] = this.matrix[j][i];
			}
		}
		 return t;
	}
}
