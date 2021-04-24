const ESC_INIT = [0x1b, 0x40];
const ESC_BIT_IMAGE = [0x1b, 0x2a]
const DOTS_DENSITY = 24
const LUMINANCE = {
    RED: 0.299,
    GREEN: 0.587,
    BLUE: 0.114
}
const LINE_FEED = 0x0a;

function calculateLuminance(pixel) {
    return LUMINANCE.RED * pixel[0] + LUMINANCE.GREEN * pixel[1] + LUMINANCE.BLUE * pixel[2]
}

function calculateSlice(x, y, image) {
    const threshold = 127;
    let slice = 0;

    for (let bit = 0; bit < 8; bit++) {
        if ((y + bit) >= image.length)
            continue;

        luminance = calculateLuminance(image[y + bit][x])

        slice |= (luminance < threshold ? 1 : 0) << 7 - bit
    }

    return slice;
}

function collectStripe(x, y, image) {
    let slices = [];
    let z = y + DOTS_DENSITY;

    let i = 0
    while (y < z && i < 3){
      slices.push(calculateSlice(x, y, image));

      y += 8
    }

    return slices;
}

function manipulateImage(image) {
    let data = [];
    const imageWidth = image[0].length;

    for (let y = 0; y < image.length; y += DOTS_DENSITY){
        data.push(...ESC_BIT_IMAGE, 33, (0x00ff & imageWidth), (0xff00 & imageWidth) >> 8);

        for (let x = 0; x < imageWidth; x++) {
            data.push(...collectStripe(x, y, image));
        }

        data.push(LINE_FEED);
    }

    return data;
}

function printImage(image) {
    let transformedImage = [];

    transformedImage.push(...ESC_INIT);

    transformedImage.push(...manipulateImage(image));

    return new Uint8Array(transformedImage);
}
function printText(text) {
    return new Uint8Array(text.split('').map(char => char.charCodeAt(0)))
}