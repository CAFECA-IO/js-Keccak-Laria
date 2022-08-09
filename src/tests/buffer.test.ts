import {
  convertUint8ArrayToHexString,
  convertUint8ArrayToBase64,
  convertUint8ArrayToBinaryString,
  isArrayBuffer,
} from '../lib/buffer';

// check buffer output
describe('Check buffer output', () => {
  // test uint8array to hex string
  test('test Uint8Array to hex string', () => {
    const hexString = convertUint8ArrayToHexString(new Uint8Array([1, 2, 3]));
    expect(hexString).toStrictEqual('010203');
  });

  // test uint8array to base64
  test('test Uint8Array to base64', () => {
    const base64String = convertUint8ArrayToBase64(new Uint8Array([1, 2, 3]));
    expect(base64String).toBe('AQID');
  });

  // test for buffer type error
  test('test Uint8Array to binary string', () => {
    const binaryString = convertUint8ArrayToBinaryString(new Uint8Array([1, 2, 3]));
    expect(binaryString).toBe('00000001000000100000011');
  });
});

describe('Check isArrayBuffer output', () => {
  // test for true value
  test('test isArrayBuffer function - true', () => {
    const testArray = new ArrayBuffer(8);
    const view = new Int32Array(testArray);
    const trueResult = isArrayBuffer(view);
    expect(trueResult).toStrictEqual(true);
  });

  // test for false value
  test('test isArrayBuffer function - false', () => {
    const falseResult = isArrayBuffer('test');
    expect(falseResult).toStrictEqual(false);
  });
});
