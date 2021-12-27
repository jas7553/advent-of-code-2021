#! /usr/local/bin/node

const fs = require('fs');

const getLines = () => fs.readFileSync('./input-16.txt', 'utf8').trim().split('\n');

const parseLines = (lines) => lines[0].split('').map(c => (parseInt(c, 16).toString(2)).padStart(4, '0')).join('');

const parsePacket = (packet) => {
  const header = packet.substring(0, 6);
  const body = packet.substring(6, packet.length);

  const version = parseInt(header.substring(0, 3), 2);
  const idType = parseInt(header.substring(3, 6), 2);

  if (idType === 4) {
    let literalValue = '';
    let chunkStart = 0;
    let chunk = body.substring(chunkStart, chunkStart + 5);
    let numberOfChunks = 1;
    while (chunk[0] !== '0') {
      literalValue += chunk.substring(1, chunk.length);
      chunkStart += 5
      chunk = body.substring(chunkStart, chunkStart + 5);
      numberOfChunks++
    }
    literalValue += chunk.substring(1, chunk.length);

    return {
      version,
      idType,
      literalValue: parseInt(literalValue, 2),
      length: 6 + (numberOfChunks * 5),
    }
  } else {
    const lengthIdType = body[0];
    if (lengthIdType === '0') {
      const totalLengthOfSubpackets = parseInt(body.substring(1, 16), 2);
      const subPackets = [];
      let lengthOfSubpackets = 0;
      while (lengthOfSubpackets < totalLengthOfSubpackets) {
        const subPacket = parsePacket(body.substring(16 + lengthOfSubpackets, body.length));
        subPackets.push(subPacket);
        lengthOfSubpackets += subPacket.length;
      }

      return {
        version,
        idType,
        subPackets,
        length: 6 + 1 + 15 + totalLengthOfSubpackets,
      }
    } else {
      const numberOfSubPackets = parseInt(body.substring(1, 12), 2);
      const subPackets = []
      let lengthOfSubpackets = 0;
      for (let i = 0; i < numberOfSubPackets; i++) {
        const subPacket = parsePacket(body.substring(12 + lengthOfSubpackets, body.length));
        subPackets.push(subPacket);
        lengthOfSubpackets += subPacket.length;
      }

      return {
        version,
        idType,
        subPackets,
        length: 6 + 1 + 11 + lengthOfSubpackets,
      }
    }
  }
}

const sumVersions = (packet) => {
  if (packet.subPackets) {
    return packet.version + packet.subPackets.reduce((subTotal, subPacket) => subTotal + sumVersions(subPacket), 0);
  } else {
    return packet.version;
  }
}

const calculateValue = (packet) => {
  if (packet.idType === 4) {
    return packet.literalValue;
  } else if (packet.idType === 0) {
    return packet.subPackets.reduce((subTotal, subPacket) => subTotal + calculateValue(subPacket), 0);
  } else if (packet.idType === 1) {
    return packet.subPackets.reduce((subTotal, subPacket) => subTotal * calculateValue(subPacket), 1);
  } else if (packet.idType === 2) {
    return Math.min(...packet.subPackets.map(subPacket => calculateValue(subPacket)));
  } else if (packet.idType === 3) {
    return Math.max(...packet.subPackets.map(subPacket => calculateValue(subPacket)));
  } else if (packet.idType === 5) {
    return calculateValue(packet.subPackets[0]) > calculateValue(packet.subPackets[1]) ? 1 : 0;
  } else if (packet.idType === 6) {
    return calculateValue(packet.subPackets[0]) < calculateValue(packet.subPackets[1]) ? 1 : 0;
  } else if (packet.idType === 7) {
    return calculateValue(packet.subPackets[0]) === calculateValue(packet.subPackets[1]) ? 1 : 0;
  } else {
    throw new Error(`Unexpected packet: ${packet}`);
  }
}

const partOne = () => {
  const lines = getLines();
  const transmission = parseLines(lines);
  const packet = parsePacket(transmission);
  console.log('version sum:', sumVersions(packet));
};

partOne();

const partTwo = () => {
  const lines = getLines();
  const transmission = parseLines(lines);
  const packet = parsePacket(transmission);
  const value = calculateValue(packet);
  console.log('value:', value);
};

partTwo();
