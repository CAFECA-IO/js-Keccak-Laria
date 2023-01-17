// call keccak and test final result
// import Keccak from '../index';
const Keccak = require('../index');

const keccak = new Keccak();
const keccak256 = new Keccak('keccak256');
const keccak512 = new Keccak('keccak512');
const keccak224 = new Keccak('keccak224');
const keccak384 = new Keccak('keccak384');

// overall test
describe("Check overall Keccak output hash is correct", () => {

    // keccak256: check input data -> output corrected hash
    test("keccak256 - check output value equals to expected hash", () => {
        const result = keccak256.update("Clemmy").digest('hex');
        expect(result).toBe("bc36d594fb78cbd38b741826c49755e1c15ae5049c91c3f014511ec1a83786d6");
    });

    // keccak512: check input data -> output corrected hash
    test("keccak512 - check output value equals to expected hash", () => {
        const result = keccak512.update("Clemmy").digest('hex');
        expect(result).toBe("1c7c0ae2004ff2cefaa37d32e369032b1b2ebc4101955aa7ddcd457f8ff8d67ae184cdf2e5a95aaac8f82a6d1771eacb63547a2b1cec0bc79ca897df9dc10eb3");
    });

    // test keccak224: check input data -> output corrected hash
    test("keccak224 - check output value equals to expected hash", () => {
        const result = keccak224.update("Clemmy").digest('hex');
        expect(result).toBe("407d8c3b7431a31016df538c79a72a6dbafd674304401201b5deefff");
    });

    // test keccak384: check input data -> output corrected hash
    test("keccak384 - check output value equals to expected hash", () => {
        const result = keccak384.update("Clemmy").digest('hex');
        expect(result).toBe("ccd839809b6e2e023348c712a6122c3b64ee3c618958327773c42e96b2cd80e4ef42b5a41ecc7fe73355e345568cf7be");
    });

});

// index.ts test
// check constructor map error
describe('Check rate equals to undefined error', () => {
  // test for buffer type error
  test('Check rate equals to undefined error', () => {
    const keccakUndefined = new Keccak('keccak000');
  });
});

// check update error
describe('Check update error', () => {
  // test for buffer type error
  test('Check buffer type error', () => {
    expect(() => {
      keccak.update({test: 'test for not buffer'});
    }).toThrow(TypeError);
  });
  // check finalized == true in update
  test('Check already digest error', () => {
    // test for finalize exception
    expect(() => {
      keccak.update('test1').digest('hex');
      keccak.update('test2');
    }).toThrow(Error);
  });
});

// check digest error
describe('Check digest error', () => {
  // test for buffer type error
  test('Check already digest error', () => {
    expect(() => {
      keccak.digest('hex');
      keccak.digest('hex');
    }).toThrow(Error);
  });
});
