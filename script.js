let image = null;
let grayImage = null;
let redImage = null;
let greenImage = null;
let reImage = null;

function loadImage() {
  let inputimage = document.getElementById("imagefile");

  let canvaImage = document.getElementById("canvaImage");

  image = new SimpleImage(inputimage);
  grayImage = new SimpleImage(inputimage);
  redImage = new SimpleImage(inputimage);
  greenImage = new SimpleImage(inputimage);
  reImage = new SimpleImage(inputimage);

  image.drawTo(canvaImage);
}

function changeGrayScale() {
  for (let pixel of grayImage.values()) {
    let avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
}

function doGrayScale() {
  let canvaImage = document.getElementById("canvaImage");
  if (imageIsLoaded(grayImage)) {
    changeGrayScale();
    grayImage.drawTo(canvaImage);
  }
}

function changeRedFilter() {
  let avg = 0;
  for (let pixel of redImage.values()) {
    avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
      pixel.setRed(avg * 2);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen(avg * 2 - 255);
      pixel.setBlue(avg * 2 - 255);
    }
  }
}

function doRedFilter() {
  let canvaImage = document.getElementById("canvaImage");
  if (imageIsLoaded(redImage)) {
    changeRedFilter();
    redImage.drawTo(canvaImage);
  }
}

function changeGreenDotFilter() {
  let avg = 0;
  for (let pixel of greenImage.values()) {
    avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    let x = pixel.getX();
    let y = pixel.getY();
    if (x % 2 == 0 && y % 2 == 0) {
      pixel.setRed(avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else if (x % 5 == 0 && y % 5 == 0) {
      pixel.setRed(0);
      pixel.setGreen(0);
      pixel.setBlue(avg);
    } else {
      pixel.setRed(0);
      pixel.setGreen(avg);
      pixel.setBlue(0);
    }
  }
}

function doGreenDotFilter() {
  let canvaImage = document.getElementById("canvaImage");
  if (imageIsLoaded(greenImage)) {
    changeGreenDotFilter();
    greenImage.drawTo(canvaImage);
  }
}

function resetImage() {
  let canvas = document.getElementById("canvaImage");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  reImage.drawTo(canvas);
}

function imageIsLoaded(img) {
  if (img == null || !img.complete()) {
    alert("Image not loaded");
    return false;
  } else {
    return true;
  }
}
