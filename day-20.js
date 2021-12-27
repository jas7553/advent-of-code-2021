#! /usr/local/bin/node

const fs = require('fs');

const getLines = () => fs.readFileSync('./input-20-sample.txt', 'utf8').trim().split('\n');

const parseLines = (lines) => {
  const imageEnancingAlgorithm = lines.shift();
  lines.shift();

  return {
    algorithm: imageEnancingAlgorithm,
    image: lines,
  };
};

const enhance = (image, algorithm, border) => {
  const newImage = [image[0]];
  for (let row = 1; row < image.length - 1; row++) {
    let newRow = border;
    for (let col = 1; col < image[row].length - 1; col++) {
      const newPixel = calculatePixel(image, algorithm, row, col);
      newRow += newPixel;
    }
    newImage.push(newRow + border)
  }
  newImage.push(image[image.length - 1]);

  const borderOpposite = border === '.' ? '#' : '.';
  newImage[0] = borderOpposite.repeat(newImage[0].length);
  for (let row = 1; row < newImage.length - 1; row++) {
    newImage[row] = borderOpposite + newImage[row].substring(1, newImage[row].length - 1) + borderOpposite;
  }
  newImage[newImage.length - 1] = borderOpposite.repeat(newImage[0].length);

  return newImage;
};

const calculatePixel = (image, algorithm, row, col) => {
  let surrounding = '';
  for (let r = row - 1; r < row + 2; r++) {
    surrounding += image[r].substring(col - 1, col + 2);
  }
  const binaryNumber = surrounding.split('').map(c => c === '.' ? '0' : '1').join('');
  const decimalNumber = parseInt(binaryNumber, 2);
  return algorithm[decimalNumber];
};

const addBorders = (image, border) => {
  for (let i = 0; i < 4; i++) { // top
    // if ([...image[1]].some(pixel => pixel === '#')) {
      image.unshift(border.repeat(image[0].length));
    // }
  }
  for (let i = 0; i < 4; i++) { // bottom
    // if ([...image[image.length - 2]].some(pixel => pixel === '#')) {
      image.push(border.repeat(image[0].length));
    // }
  }
  for (let i = 0; i < 4; i++) { // left
    // if ([...image.map(row => row[1])].some(pixel => pixel === '#')) {
      image = image.map(row => border + row);
    // }
  }
  for (let i = 0; i < 4; i++) { // right
    // if ([...image.map(row => row[row.length - 2])].some(pixel => pixel === '#')) {
      image = image.map(row => row + border);
    // }
  }
  return image;
}

const printImage = (image) => {
  image.forEach(line => console.log(line));
};

const countOnPixels = (image) => {
  return image.reduce((total, row) => total + row.split('').reduce((subTotal, pixel) => subTotal += pixel === '#' ? 1 : 0, 0), 0);
}

const partOne = () => {
  const lines = getLines();
  let { algorithm, image } = parseLines(lines);
  console.log('original image');
  printImage(image);
  console.log();

  for (let i = 0; i < 2; i++) {
    console.log(algorithm[0], algorithm[256]);
    const border = algorithm[0] === algorithm[256] ? '.' : (i % 2 === 0 ? '.' : '#' );
    image = enhance(addBorders(image, border), algorithm, border);
  }

  console.log('enhanced image');
  printImage(image);

  console.log('on pixels', countOnPixels(image));
};

partOne();
