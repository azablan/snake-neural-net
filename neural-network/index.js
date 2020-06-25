const sigmoid = x => 1 / (1 + Math.E**(-x));
const getRandom = (min, max) => Math.random() * (max - min) + min;
const getRandomWeightArray = size => new Array(size).fill().map(() => getRandom(-1, 1));

class Neuron {
  constructor(weights, bias) {
    this.weights = weights;
    this.bias = bias;
  }

  activate(inputs) {
    if (inputs.length !== this.weights.length)
      throw Error('num inputs does not match num weights');

    const weightedSum = inputs.reduce((sum, input, idx) => sum + (input * this.weights[idx]), 0);
    return weightedSum + this.bias;
    return sigmoid(weightedSum + this.bias); // TODO no activation function
  }
}

class NeuralLayer {
  constructor(numInputs, numNeurons) {
    this.neurons = new Array(numNeurons).fill().map(
      () => new Neuron(getRandomWeightArray(numInputs), 0)
    );
  }

  forward(inputs) {
    this.outputs = this.batchActivate(inputs);
  }

  batchActivate(batchInputs) {
    return batchInputs.map(input => this.activate(input));
  }

  activate(inputs) {
    return this.neurons.map(neuron => neuron.activate(inputs));
  }
}

const input = [
  [1, 2, 3, 2.5],
  [2.0, 5.0, -1.0, 2.0],
  [-1.5, 2.7, 3.3, -0.8],
];

h1 = new NeuralLayer(4, 5);
h2 = new NeuralLayer(5, 5);

h1.forward(input);
console.log(h1.outputs);
h2.forward(h1.outputs);
console.log(h2.outputs);
