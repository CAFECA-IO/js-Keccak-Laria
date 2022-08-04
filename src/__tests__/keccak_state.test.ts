// call keccak and test final result
import KeccakState from '../lib/keccak_state';
import f from '../lib/keccak_f';
const keccakState = new KeccakState();

// check long data
describe("Check absorb long data", () => {
    // test for long data
    test("check this.count === this.blockSize", () => {
        keccakState.initialize(1088, 512);
        const data = Buffer.from('x'.repeat(10*1024*1024))
        keccakState.absorb(data);
    });
});

// check absorb no input keccak and squeeze default value 
describe("Check squeeze data without any data", () => {
    // test for squeezing
    test("check this.count === this.blockSize", () => {
        keccakState.initialize(1088, 512);
        const data = Buffer.from('');
        keccakState.absorb(data);
        keccakState.squeeze(256);
    });
});

// check absorb function calculation
test("check absorb function state value", () => {

    const data = Buffer.from('Clemmy');
    let state = [];
    for (let i = 0; i < 50; ++i) {
        state[i] = 0;
    }

    let count = 0;
    let blockSize = 1088 / 8;

    // mock coculation
    for (let i = 0; i < data.length; ++i) {
        // do math calculation -> do data(in blocksize) xor state and store result to state
        state[Math.floor(count / 4)] ^= data[i] << (8 * (count % 4));
        count += 1;
        // call f(state)
        if (count === blockSize) {
          // 完成 p block 和 state 的一區塊運算：run f(this.state)
          f(state);
          count = 0;
        }
    }

    // call keccakState to compare
    keccakState.initialize(1088, 512);
    keccakState.absorb(data);
    expect(keccakState.state).toStrictEqual(state);

});

// check squeeze function calculation
test("check absorbFewBits function state value", () => {
    // mock coculation
    let state = [];
    for (let i = 0; i < 50; ++i) {
        state[i] = 0;
    }
    let count = 0;
    
    state[Math.floor(count / 4)] ^= 0x01 << (8 * (count % 4));
    state[Math.floor((1088/8 - 1) / 4)] ^= 0x80 << (8 * ((1088/8 - 1) % 4));
    // call f(state)
    state = f(state);

    // call keccakState to compare
    keccakState.initialize(1088, 512);
    keccakState.absorbLastFewBits(0x01);
    expect(keccakState.state).toStrictEqual(state);

});

// check squeeze function calculation
test("check squeeze function state value", () => {
    
    const data = Buffer.from('Clemmy');
    let state = [];
    for (let i = 0; i < 50; ++i) {
        state[i] = 0;
    }

    let count = 0;
    let blockSize = 1088 / 8;

    // mock coculation
    for (let i = 0; i < data.length; ++i) {
        // do math calculation -> do data(in blocksize) xor state and store result to state
        state[Math.floor(count / 4)] ^= data[i] << (8 * (count % 4));
        count += 1;
        // call f(state)
        if (count === blockSize) {
          // 完成 p block 和 state 的一區塊運算：run f(this.state)
          f(state);
          count = 0;
        }
    }

    // create buffer with length
    // use keccak256 to test
    const output = Buffer.alloc(((1600 - 1088) / 2) / 8);

    for (let i = 0; i < ((1600 - 1088) / 2) / 8; ++i) {
        // 數學運算： 截斷後 8 bits 並去除
        output[i] = (state[Math.floor(count / 4)] >>> (8 * (count % 4))) & 0xff;
        count += 1;

        if (count === blockSize) {
            // call f(state)
            f(state);
            count = 0;
        }
    
    }

    // call keccakState to compare
    keccakState.initialize(1088, 512);
    keccakState.absorb(data);
    const result = keccakState.squeeze(((1600 - 1088) / 2 ) / 8 );
    // call keccakState output result to compare
    expect(result).toStrictEqual(output);

});