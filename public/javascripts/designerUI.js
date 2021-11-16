
const elementTypes = {
  GENERATOR: "Generator",
  QUEUE: "Queue",
  PROCESS: "Process",
  TERMINATOR: "Terminator",
}
                                     
let elementTypeArray = Object.values(elementTypes);// [ elementTypes.GENERATOR, elementTypes.QUEUE,  elementTypes.PROCESS, elementTypes.TERMINATOR ]

let canvasBackgroundColor = "#ffffff";

function ModelLocation(x, y) {
  this.x = x;
  this.y = y;
}

setInterval(myTimer, 1000);

function myTimer() {
  repaintUI();
}

function IdentifyBackgroundColor () {
  var canvas = document.getElementById("canvas");
  canvasBackgroundColor = window.getComputedStyle(canvas).backgroundColor;
}

function GeneratorElement(x,y) {
  Element.call(this, x,y, elementTypes.GENERATOR);

  this.draw = function(drawContext, canvas) {
    //canvas.drawImage(this.image, 0,0, 32, 32, this.x, this.y, 32, 32);
    var img1 = new Image();
    img1.src = "images/Generator.png"; 
    drawContext.drawImage(img1, this.x, this.y, 20, 20);
  }
  
}

function Element(x,y, elementType) {
  this.x = x;
  this.y = y;
  this.name = createUUID();
  this.elementType = elementType;
  //this.img = new Image();

  /*
  this.draw = function(drawContext, canvas) {
    //canvas.drawImage(this.image, 0,0, 32, 32, this.x, this.y, 32, 32);
    var img1 = new Image();
    img1.src = "images/Generator.png"; 
    drawContext.drawImage(img1, 100, 100);
  }
  */
};

function createUUID() {
  // http://www.ietf.org/rfc/rfc4122.txt
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}



const modelItems = [];

var modelLocation = new ModelLocation(-1, -1);

window.onload = function() {
  IdentifyBackgroundColor();
  constructItemTypeList();
  establishInterface();
}

repaintUI = function() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var boundings = canvas.getBoundingClientRect();

  context.beginPath();
  context.rect(1, 1, boundings.width, boundings.height);
  context.fillStyle = canvasBackgroundColor;
  context.fill();

  for (const modelItem of modelItems) {
    modelItem.draw(context, canvas);
  }
}

addGenerator = function(x, y)
{
  let generator = new GeneratorElement(x, y);
  modelItems.push(generator);
}
addQueue = function()
{

}
addProcess = function()
{

}
addTerminator = function()
{

}

itemTypeSelected = function(elementType) {
  switch (elementType) {

    case elementTypes.GENERATOR:
      addGenerator(modelLocation.x, modelLocation.y);
        break;
    case elementTypes.QUEUE:
      //addQueue(modelLocation.x, modelLocation.y);
         break;        
    case elementTypes.PROCESS:
      //addProcess(modelLocation.x, modelLocation.y);
        break;
    case elementTypes.TERMINATOR:
      //addTerminator(modelLocation.x, modelLocation.y);
      break;
    default:
      console.log("unknown elementType");
  }

  setItemSelectorVisibility(false);

  repaintUI();
}

addElementOfTypeType = function(elementType) {

}

constructItemTypeList = function() {
  var itemselector = document.getElementById("overlay-itemselector");


  for (const elementType of elementTypeArray) {
  
    let div = document.createElement('div');
    div.setAttribute("class", "itemSelectorButtonDiv");
    let input = document.createElement('input');

    input.type = "button";
    input.value= elementType;
    input.setAttribute("class", "itemSelectorButton");
    input.setAttribute("onclick", "itemTypeSelected('" + elementType + "')");

    div.appendChild(input);

    //document.body.appendChild(div);

    itemselector.append(div);
  }
}

getClientSize = function() {
  var deductedBody = (document.compatMode === "CSS1Compat") ? 
    document.documentElement :
    document.body;

    return { width: deductedBody.clientWidth, height: deductedBody.clientHeight }
}

setCanvasStaticHeightByViewPort = function(canvas) {
  var clientSize = getClientSize();
  canvas.height = clientSize.height;
}

turOfContextMenueOfCanvasArea = function(canvas, canvasWrapper) {
  canvas.oncontextmenu= function(e) { return false; }
  canvasWrapper.oncontextmenu= function(e) { return false; }
}

var setItemSelectorVisibility = function(visible){
    var itemselector = document.getElementById("overlay-itemselector");

    if(visible){
      itemselector.style.visibility = "visible";
    } else {
      itemselector.style.visibility = "hidden";
    }    
}

var setItemSelectorPosition = function(x, y) {
  var itemselector = document.getElementById("overlay-itemselector");
  var positionInfo = itemselector.getBoundingClientRect();
  var currentWidth = positionInfo.width;
  var currentHeight = positionInfo.height;
  var currentHalfWidth = x - Math.floor(currentWidth / 2) + "px";
  var currentHalfHeight = y - Math.floor(currentHeight / 2) + "px";
  itemselector.style.setProperty("left", currentHalfWidth);
  itemselector.style.setProperty("top", currentHalfHeight);
  modelLocation = new ModelLocation(x, y);
}

onMouseDown = function(e) {
  e.preventDefault();

  switch (event.which) {
    case 1:
      setItemSelectorVisibility(false);
      break;
    case 2:
      break;
    case 3:
      setItemSelectorVisibility(true);
      setItemSelectorPosition(e.x, e.y);
      break;
    default:
      console.log("Unknown left mouse down.");
  }
  
  return false;
}

onMouseUp = function(e) {
  console.log("Button up");
  
  return false;
}

establishInterface = function() {
  var canvas = document.getElementById("canvas");
  var canvasWrapper = document.getElementById("canvas-wrapper");
  setCanvasStaticHeightByViewPort(canvas);  
  turOfContextMenueOfCanvasArea(canvas, canvasWrapper);
  setItemSelectorVisibility(false);
  canvas.onmousedown = onMouseDown;
  canvas.onmouseup = onMouseUp;
}