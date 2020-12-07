function sigmoid(X){
		return 1 / (1 + Math.exp(-X));

	}
function dsigmoid(Y){
		return Y * (1 - Y);
	}
class NeuralNetwork{
	constructor(input, hidden, output) {
		this.lr = 0.2;
		this.weights_ih = new Matrix(hidden, input);
		this.weights_ho = new Matrix(output, hidden);
		this.bias_h = new Matrix(hidden, 1);
		this.bias_o = new Matrix(output, 1);
		
		this.bias_o.randomize();		
		this.bias_h.randomize();

		this.weights_ih.randomize();
		this.weights_ho.randomize();


		this.output_e;
		this.hidden_e=new Matrix(hidden,1);

		this.hidden_in;
		this.hidden_out;

		this.output_in;
		this.output_out;


	}



	feedForward(input) {
		input = Matrix.fromArray(input);
		this.hidden_in = Matrix.dotProduct(this.weights_ih, input);
		this.hidden_in = Matrix.add(this.hidden_in, this.bias_h);
		this.hidden_out = Matrix.ApplyFunction(this.hidden_in, sigmoid);
		
		this.output_in = Matrix.dotProduct(this.weights_ho, this.hidden_out);
		this.output_in = Matrix.add(this.output_in, this.bias_o);
		this.output_out = Matrix.ApplyFunction(this.output_in, sigmoid)
		
		return this.output_out.toArray();
		

	}

	deltaWeights(input,output,error) { 
		var gradient = Matrix.multiply(error, Matrix.ApplyFunction(output, dsigmoid));
		gradient=Matrix.multiply(gradient,this.lr)
		return Matrix.dotProduct(gradient,input.t());
	}
	deltaBias(output,error) { 
		var gradient= Matrix.multiply(error, Matrix.ApplyFunction(output, dsigmoid));
		return Matrix.multiply(gradient, this.lr);
		
	}



	train(input, target) {
		var output = this.feedForward(input);
		target = Matrix.fromArray(target);
		input = Matrix.fromArray(input);


		this.output_e = Matrix.sub(target, output);
		this.hidden_e = Matrix.dotProduct(this.weights_ho.t(), this.output_e);

		var delta_wih = this.deltaWeights(input, this.hidden_out, this.hidden_e);
		var delta_who = this.deltaWeights(this.hidden_out, this.output_out, this.output_e);

		var delta_bias_h = this.deltaBias(this.hidden_out, this.hidden_e);
		var delta_bias_o = this.deltaBias(this.output_out, this.output_e);

		this.weights_ih = Matrix.add(this.weights_ih, delta_wih);
		this.weights_ho = Matrix.add(this.weights_ho, delta_who);

		this.bias_h=Matrix.add(this.bias_h,delta_bias_h)
		this.bias_o=Matrix.add(this.bias_o,delta_bias_o)



	}
}