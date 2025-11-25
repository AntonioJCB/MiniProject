let image = null;
let grayImage = null;
let redImage = null;
let greenImage = null;
let rainbowImage = null;
let blurImage = null;
let reImage = null;

function loadImage() {
  let inputimage = document.getElementById("imagefile");

  let canvaImage = document.getElementById("canvaImage");

  image = new SimpleImage(inputimage);
  grayImage = new SimpleImage(inputimage);
  redImage = new SimpleImage(inputimage);
  greenImage = new SimpleImage(inputimage);
  reImage = new SimpleImage(inputimage);
  rainbowImage = new SimpleImage(inputimage);
  blurImage = new SimpleImage(inputimage);

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

function changeRainbowFilter() {
  let height = rainbowImage.getHeight();
  const bandHeight = height / 7;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < rainbowImage.getWidth(); x++) {
      let pixel = rainbowImage.getPixel(x, y);
      let avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
      // --- Banda 0: Rojo ---
      if (y < bandHeight) {
        pixel.setRed(Math.min(2 * avg, 255));
        pixel.setGreen(0);
        pixel.setBlue(0);
      }
      // --- Banda 1: Naranja ---
      else if (y < bandHeight * 2) {
        pixel.setRed(Math.min(2 * avg, 255));
        pixel.setGreen(Math.min(0.8 * avg, 255));
        pixel.setBlue(0);
      }
      // --- Banda 2: Amarillo ---
      else if (y < bandHeight * 3) {
        pixel.setRed(Math.min(2 * avg, 255));
        pixel.setGreen(Math.min(2 * avg, 255));
        pixel.setBlue(0);
      }
      // --- Banda 3: Verde ---
      else if (y < bandHeight * 4) {
        pixel.setRed(0);
        pixel.setGreen(Math.min(2 * avg, 255));
        pixel.setBlue(0);
      }
      // --- Banda 4: Azul ---
      else if (y < bandHeight * 5) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(Math.min(2 * avg, 255));
      }
      // --- Banda 5: Índigo ---
      else if (y < bandHeight * 6) {
        pixel.setRed(Math.min(0.8 * avg, 255));
        pixel.setGreen(0);
        pixel.setBlue(Math.min(2 * avg, 255));
      }
      // --- Banda 6: Violeta ---
      else {
        pixel.setRed(Math.min(1.6 * avg, 255));
        pixel.setGreen(0);
        pixel.setBlue(Math.min(1.6 * avg, 255));
      }
    }
  }
}

function doRainbowFilter() {
  let canvaImage = document.getElementById("canvaImage");
  if (imageIsLoaded(rainbowImage)) {
    changeRainbowFilter();
    rainbowImage.drawTo(canvaImage);
  }
}

function changeBlurFilter() {
  let n = Math.random();
  for (let pixel of blurImage.values()) {
    if (n < 0.5) {
      pixel.setRed(pixel.getRed());
      pixel.setGreen(pixel.getGreen());
      pixel.setBlue(pixel.getBlue());
    } else {
      let x = pixel.getX();
      let y = pixel.getY();
      let coords = nearbyPixel(x, y, 10, blurImage);
      let newPixel = blurImage.getPixel(coords.newX, coords.newY);
      pixel.setRed(newPixel.getRed());
      pixel.setGreen(newPixel.getGreen());
      pixel.setBlue(newPixel.getBlue());
    }
  }

  function nearbyPixel(x, y, range, image) {
    let width = image.getWidth();
    let height = image.getHeight();
    let dx = Math.floor(Math.random() * (range * 2 + 1)) - range;
    let dy = Math.floor(Math.random() * (range * 2 + 1)) - range;
    let newX = x + dx;
    let newY = y + dy;
    if (newX < 0) newX = 0;
    if (newX >= width) newX = width - 1;
    if (newY < 0) newY = 0;
    if (newY >= height) newY = height - 1;
    return { newX, newY };
  }
}

function doBlurFilter() {
  let canvaImage = document.getElementById("canvaImage");
  if (imageIsLoaded(blurImage)) {
    changeBlurFilter();
    blurImage.drawTo(canvaImage);
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
