let angle = 0;
let myDregrees;
let colorData;
let data;
let color1 = "#9400D3";
let color2 = "#4B0082";
let color3 = "#c84e89";
let color4 = "#F15F79";
let odd = true;
let hasChanged = false;
let osc;
let volume;
let meter;
let message = String.fromCodePoint(0x1F641)

window.addEventListener('blur', () => document.title = message + "Miss You. Please come back.");
window.addEventListener('focus', () => document.title = "Color Palette");

let synth = new Tone.MembraneSynth().toMaster();

function decibelsToGain(value) {
  return Math.exp(value / 8.6858);
}

fetch("data.json")
  .then(response => response.json())
  .then(jsonData => (data = jsonData))
  .then(() => randomColor());

function randomColor() {
  colorData = data[Math.floor(Math.random() * data.length)].colors;
  if (odd) {
    color1 = colorData[0];
    color2 = colorData[1];
  } else {
    color3 = colorData[0];
    color4 = colorData[1];
  }
}

function gradientColor(ratio, color1, color2) {
  var hex = function(x) {
    x = x.toString(16);
    return x.length == 1 ? "0" + x : x;
  };

  var r = Math.ceil(
    parseInt(color1.substring(1, 3), 16) * ratio +
      parseInt(color2.substring(1, 3), 16) * (1 - ratio)
  );
  var g = Math.ceil(
    parseInt(color1.substring(3, 5), 16) * ratio +
      parseInt(color2.substring(3, 5), 16) * (1 - ratio)
  );
  var b = Math.ceil(
    parseInt(color1.substring(5, 7), 16) * ratio +
      parseInt(color2.substring(5, 7), 16) * (1 - ratio)
  );

  return "#" + hex(r) + hex(g) + hex(b);
}

function setup() {
  createCanvas(800, 550, WEBGL);
  angleMode(DEGREES);

  Tone.Master.volume.value = -24;
  osc = new Tone.Oscillator();
  volume = new Tone.Gain();
  osc.connect(volume);
  volume.connect(Tone.Master);
  meter = new Tone.Meter();
  Tone.Master.connect(meter);
}

function draw() {
  const level = meter.getLevel();
  const gain = decibelsToGain(level);

  background("#fff");
  dataValues.map((values, index) => {
    push();

    var ratio = index / dataValues.length;

    translate(values.translateValue, 0);
    if (mouseX > values.firstMousePos && mouseX < values.lastMousePos) {
      rotateY(mouseX * values.rotationSpeed);
      hasChanged = false;
    }

    if (mouseX < 0 && hasChanged === false) {
      odd = true;
      randomColor();
      hasChanged = true;
    }

    if (mouseX > 805 && hasChanged === false) {
      odd = false;
      randomColor();
      hasChanged = true;
    }

    if (mouseX > values.colorChangePos) {
      fill(gradientColor(ratio, color1, color2));
      strokeWeight(0);
    } else {
      strokeWeight(0.0);
      fill(gradientColor(ratio, color3, color4));
    }

    box(25, 500, 10);
    pop();
  });
}

function mouseMoved() {
  if (
    (mouseX < 0 && mouseX > -10) ||
    (mouseX > 800 && mouseX < 810 && mouseY > 15 && mouseY < 540)
  ) {
    synth.triggerAttackRelease("C2", "8n");
  }

  volume.gain.value = mouseX / width;
}

let dataValues = [
  {
    translateValue: -380,
    firstMousePos: 0,
    lastMousePos: 31,
    rotationSpeed: 6,
    colorChangePos: 21,
    color: "#07d3f1"
  },
  {
    translateValue: -340,
    firstMousePos: 45,
    lastMousePos: 72,
    rotationSpeed: 5,
    colorChangePos: 61,
    color: "#07d3f1"
  },

  {
    translateValue: -300,
    firstMousePos: 85,
    lastMousePos: 113,
    rotationSpeed: 4.8,
    colorChangePos: 100,
    color: "#30cb99"
  },
  {
    translateValue: -260,
    firstMousePos: 126,
    lastMousePos: 154,
    rotationSpeed: 4.7,
    colorChangePos: 140,
    color: "#28cdaa"
  },
  {
    translateValue: -220,
    firstMousePos: 165,
    lastMousePos: 194,
    rotationSpeed: 4.65,
    colorChangePos: 180,
    color: "#21ceba"
  },
  {
    translateValue: -180,
    firstMousePos: 205,
    lastMousePos: 235,
    rotationSpeed: 4.6,
    colorChangePos: 220,
    color: "#19d0cb"
  },
  {
    translateValue: -140,
    firstMousePos: 246,
    lastMousePos: 277,
    rotationSpeed: 4.55,
    colorChangePos: 261,
    color: "#11d1dc"
  },
  {
    translateValue: -100,
    firstMousePos: 286,
    lastMousePos: 315,
    rotationSpeed: 4.568,
    colorChangePos: 298,
    color: "#07d3f1"
  },

  {
    translateValue: -60,
    firstMousePos: 325,
    lastMousePos: 354,
    rotationSpeed: 4.55,
    colorChangePos: 338,
    color: "#07d3f1"
  },

  {
    translateValue: -20,
    firstMousePos: 366,
    lastMousePos: 397,
    rotationSpeed: 4.52,
    colorChangePos: 379,
    color: "#07d3f1"
  },

  {
    translateValue: 20,
    firstMousePos: 407,
    lastMousePos: 437,
    rotationSpeed: 4.5,
    colorChangePos: 419,
    color: "#07d3f1"
  },
  {
    translateValue: 60,
    firstMousePos: 445,
    lastMousePos: 477,
    rotationSpeed: 4.5,
    colorChangePos: 458,
    color: "#07d3f1"
  },
  {
    translateValue: 100,
    firstMousePos: 486,
    lastMousePos: 518,
    rotationSpeed: 4.49,
    colorChangePos: 498,
    color: "#07d3f1"
  },
  {
    translateValue: 140,
    firstMousePos: 527,
    lastMousePos: 560,
    rotationSpeed: 4.49,
    colorChangePos: 538,
    color: "#07d3f1"
  },

  {
    translateValue: 180,
    firstMousePos: 567,
    lastMousePos: 600,
    rotationSpeed: 4.48,
    colorChangePos: 578,
    color: "#07d3f1"
  },

  {
    translateValue: 220,
    firstMousePos: 605,
    lastMousePos: 637,
    rotationSpeed: 4.48,
    colorChangePos: 617,
    color: "#07d3f1"
  },

  {
    translateValue: 260,
    firstMousePos: 642,
    lastMousePos: 676,
    rotationSpeed: 4.48,
    colorChangePos: 657,
    color: "#07d3f1"
  },

  {
    translateValue: 300,
    firstMousePos: 685,
    lastMousePos: 722,
    rotationSpeed: 4.48,
    colorChangePos: 696,
    color: "#07d3f1"
  },
  {
    translateValue: 340,
    firstMousePos: 723,
    lastMousePos: 762,
    rotationSpeed: 4.49,
    colorChangePos: 734,
    color: "#07d3f1"
  },
  {
    translateValue: 380,
    firstMousePos: 766,
    lastMousePos: 803,
    rotationSpeed: 4.48,
    colorChangePos: 775,
    color: "#07d3f1"
  }
];
