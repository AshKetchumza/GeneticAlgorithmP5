// Ashley Sanders
// Based off of Daniel Shiffmans Smart Rockets 

var population;
var lifespan = 500;
var lifeP;
var count = 0;
var target;
var maxforce = 0.2;
var iterations = 1;
var wins = 0;
var firstGen = 0;

var ran = Math.floor((Math.random() * 550) + 50);
var ranX = Math.floor((Math.random() * 350) + 50);
var ranY = Math.floor((Math.random() * 100) + 50);

var rx = Math.floor((Math.random() * 350) + 100);
var ry = Math.floor((Math.random() * 300) + 50);
var rw = Math.floor((Math.random() * 120) + 50);
var rh = 10;
var r1x = Math.floor((Math.random() * 350) + 100);
var r1y = Math.floor((Math.random() * 300) + 50);
var r1w = Math.floor((Math.random() * 120) + 50);
var r1h = 10;
var r2x = Math.floor((Math.random() * 350) + 100);
var r2y = Math.floor((Math.random() * 300) + 50);
var r2w = Math.floor((Math.random() * 120) + 50);
var r2h = 10;
var r3x = Math.floor((Math.random() * 350) + 100);
var r3y = Math.floor((Math.random() * 300) + 50);
var r3w = Math.floor((Math.random() * 120) + 50);
var r3h = 10;
var r4x = Math.floor((Math.random() * 350) + 100);
var r4y = Math.floor((Math.random() * 300) + 50);
var r4w = Math.floor((Math.random() * 120) + 50);
var r4h = 10;
var r5x = Math.floor((Math.random() * 350) + 100);
var r5y = Math.floor((Math.random() * 300) + 50);
var r5w = Math.floor((Math.random() * 120) + 50);
var r5h = 10;
var r6x = Math.floor((Math.random() * 350) + 100);
var r6y = Math.floor((Math.random() * 300) + 50);
var r6w = Math.floor((Math.random() * 120) + 50);
var r6h = 10;
var r7x = Math.floor((Math.random() * 350) + 100);
var r7y = Math.floor((Math.random() * 300) + 50);
var r7w = Math.floor((Math.random() * 120) + 50);
var r7h = 10;
var r8x = Math.floor((Math.random() * 350) + 100);
var r8y = Math.floor((Math.random() * 300) + 50);
var r8w = Math.floor((Math.random() * 120) + 50);
var r8h = 10;
var r9x = Math.floor((Math.random() * 350) + 100);
var r9y = Math.floor((Math.random() * 300) + 50);
var r9w = Math.floor((Math.random() * 120) + 50);
var r9h = 10;

function setup() {
  createCanvas(600, 400);
  rocket = new Rocket();
  population = new Population();
  lifeP = createP();
  var x = Math.floor((Math.random() * 300) + 100);
  var y = Math.floor((Math.random() * 200) + 50);
  target = createVector(x, y);

}

function draw() {
  background(0);
  population.run();
  lifeP.html("Lifespan: " + count + "<br/> Generation: " + iterations + "<br/> First successful gen: " + firstGen);

  count++;
  if (count == lifespan) {
    population.evaluate();
    population.selection();
    //population = new Population();
    count = 0;
    iterations += 1;
  }
  
  fill(255);
  rect(rx, ry, rw, rh);
  rect(r1x, r1y, r1w, r1h);
  rect(r2x, r2y, r2w, r2h);
  rect(r3x, r3y, r3w, r3h);
  rect(r4x, r4y, r4w, r4h);
  rect(r5x, r5y, r5w, r5h);
  rect(r6x, r6y, r6w, r6h);
  rect(r7x, r7y, r7w, r7h);
  rect(r8x, r8y, r8w, r8h);
  rect(r9x, r9y, r9w, r9h);
  fill(0,128,0);
  ellipse(target.x, target.y, 16, 16);
}

function Population() {
  this.rockets = [];
  this.popsize = 100;
  this.matingpool = [];

  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.evaluate = function() {

    var maxfit = 0;
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }
    console.log(this.rockets);

    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxfit;
    }

    this.matingpool = [];
    for (var i = 0; i < this.popsize; i++) {
      var n = this.rockets[i].fitness * 100;
      for (var j = 0; j < n; j++) {
        this.matingpool.push(this.rockets[i]);
      }
    }
  }

  this.selection = function() {
    var newRockets = [];
    for (var i = 0; i < this.rockets.length; i++) {
      var parentA = random(this.matingpool).dna;
      var parentB = random(this.matingpool).dna;
      var child = parentA.crossover(parentB);
      child.mutation();
      newRockets[i] = new Rocket(child);
    }
    this.rockets = newRockets;
  }

  this.run = function() {
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }
}

function DNA(genes) {
  if (genes) {
    this.genes = genes;
  } else {
    this.genes = [];
    for (var i = 0; i < lifespan; i++) {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(maxforce);
    }
  }

  this.crossover = function(partner) {
    var newgenes = [];
    var mid = floor(random(this.genes.length));
    for (var i = 0; i < this.genes.length; i++) {
      if (i > mid) {
        newgenes[i] = this.genes[i];
      } else {
        newgenes[i] = partner.genes[i];
      }
    }
    return new DNA(newgenes);
  }
  
  this.mutation = function() {
    for (var i = 0; i < this.genes.length; i++) {
      if (random(1) < 0.01) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxforce);
      }
    }
  }
  
}

function Rocket(dna) {
  this.pos = createVector(width / 2, height);
  this.vel = createVector();
  this.acc = createVector();
  this.completed = false;
  this.crashed = false;
  
  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.fitness = 0;

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.calcFitness = function() {
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);

    this.fitness = map(d, 0, width, width, 0);
    if (this.completed) {
      this.fitness *= 10;
    }
    if (this.crashed) {
      this.fitness /= 10;
    }

  }

  this.update = function() {
    
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if (d < 10) {
      this.completed = true;
      this.pos = target.copy();
      if(wins == 0){
            wins += 1;
            firstGen = iterations;
         }
    }
    
    if (this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry + rh) {
      this.crashed = true;
    }
      if (this.pos.x > r1x && this.pos.x < r1x + r1w && this.pos.y > r1y && this.pos.y < r1y + r1h) {
      this.crashed = true;
    }
      if (this.pos.x > r2x && this.pos.x < r2x + r2w && this.pos.y > r2y && this.pos.y < r2y + r2h) {
      this.crashed = true;
    }
      if (this.pos.x > r3x && this.pos.x < r3x + r3w && this.pos.y > r3y && this.pos.y < r3y + r3h) {
      this.crashed = true;
    }
      if (this.pos.x > r4x && this.pos.x < r4x + r4w && this.pos.y > r4y && this.pos.y < r4y + r4h) {
      this.crashed = true;
    }
      if (this.pos.x > r5x && this.pos.x < r5x + r5w && this.pos.y > r5y && this.pos.y < r5y + r5h) {
      this.crashed = true;
    }
      if (this.pos.x > r6x && this.pos.x < r6x + r6w && this.pos.y > r6y && this.pos.y < r6y + r6h) {
      this.crashed = true;
    }
      if (this.pos.x > r7x && this.pos.x < r7x + r7w && this.pos.y > r7y && this.pos.y < r7y + r7h) {
      this.crashed = true;
    }
      if (this.pos.x > r8x && this.pos.x < r8x + r8w && this.pos.y > r8y && this.pos.y < r8y + r8h) {
      this.crashed = true;
    }
      if (this.pos.x > r9x && this.pos.x < r9x + r9w && this.pos.y > r9y && this.pos.y < r9y + r9h) {
      this.crashed = true;
    }
    
    if (this.pos.x > width || this.pos.x < 0) {
      this.crashed = true;
    }
    if (this.pos.y > height || this.pos.y < 0) {
      this.crashed = true;
    }
    
    
    
    this.applyForce(this.dna.genes[count]);
    if (!this.completed && !this.crashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
    }
  }

  this.show = function() {
    push();
    noStroke();
    fill(255, 150);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    ellipse(0, 0, 25, 5);
    pop();
  }

}