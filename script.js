let image = null;
let grayImage = null;
let redImage = null;
let rainbowImage = null;
let reImage = null;

function loadImage() {
  let inputimage = document.getElementById("imagefile");

  let canvaImage = document.getElementById("canvaImage");

  image = new SimpleImage(inputimage);
  grayImage = new SimpleImage(inputimage);
  redImage = new SimpleImage(inputimage);
  rainbowImage = new SimpleImage(inputimage);
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
  alert("Image Red Filter Changed");
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
