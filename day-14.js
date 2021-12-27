#! /usr/local/bin/node

const fs = require('fs');

const getLines = () => fs.readFileSync('./input-14.txt', 'utf8').trim().split('\n');

const parseLines = (lines) => {
  const template = lines.shift();
  lines.shift();
  const translations = {};
  for (const line of lines) {
    const [ input, output ] = line.split(' -> ');
    translations[input] = output;
  };

  return {
    template,
    translations,
  }
}

const step = (template, translations) => {
  let result = '';
  for (let i = 0; i < template.length - 1; i++) {
    const key = template.substring(i, i + 2);
    result += template[i] + translations[key];
  }
  result += template[template.length - 1];
  return result;
}

const partOne = () => {
  const lines = getLines();
  console.log(lines);
  let { template, translations } = parseLines(lines);
  for (let i = 0; i < 40; i++) {
    template = step(template, translations);
  }
  const freq = {};
  for (const char of template) {
    if (freq[char]) {
      freq[char]++;
    } else {
      freq[char] = 1;
    }
  }
  console.log(freq);
};

partOne();