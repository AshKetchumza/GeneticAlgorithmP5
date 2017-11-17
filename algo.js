// Coding Rainbow
// Daniel Shiffman
// https://youtube.com/shiffman

var population;
var lifespan = 400;
var lifeP;
var count = 0;
var target;
var maxforce = 0.2;
var iterations = 1;
var wins = 0;
var firstGen = 0;

var rx = 120;
var ry = 150;
var rw = 50;
var rh = 10;
var r1x = 200;
var r1y = 150;
var r1w = 50;
var r1h = 10;
var r2x = 280;
var r2y = 150;
var r2w = 50;
var r2h = 10;
var r3x = 360;
var r3y = 150;
var r3w = 50;
var r3h = 10;
var r4x = 440;
var r4y = 150;
var r4w = 50;
var r4h = 10;

function setup() {
  createCanvas(600, 400);
  rocket = new Rocket();
  population = new Population();
  lifeP = createP();
  target = createVector(width / 2, 50);

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
  
  fill(255,48,48);
  rect(rx, ry, rw, rh);
  rect(r1x, r1y, r1w, r1h);
  rect(r2x, r2y, r2w, r2h);
  rect(r3x, r3y, r3w, r3h);
  rect(r4x, r4y, r4w, r4h);
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