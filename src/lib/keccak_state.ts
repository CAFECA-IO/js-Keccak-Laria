import f from './keccak_f';

/**
 * KeccakState class used to create state and put it into keccak related functions
 */
class KeccakState {
  state: number[];
  blockSize: number;
  count: number;
  squeezing: boolean;

  /**
   * use constructor to set state, blockSize, count and squeezing
   */
  constructor() {
    // initialization
    this.state = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // blockSize = p block bitrate (unit: bytes)
    this.blockSize = 0;
    this.count = 0;
    this.squeezing = false;
  }

  /**
   * use constructor to set state, blockSize, count and squeezing
   * @param rate keccak bitrate given by user
   * @param capacity keccak capacity given by user
   * @returns initial status boolean
   */
  initialize(rate: number, capacity: number): boolean {
    // initialize state
    for (let i = 0; i < 50; ++i) {
      this.state[i] = 0;
    }
    // rate / 8 =  p block size which we need to use these p block to do xor with state
    this.blockSize = rate / 8;
    this.count = 0;
    this.squeezing = false;
    // return initialize status
    return true;
  }

  /**
   * keccak absorb function
   * @param data data(input message) number[] list
   * @returns absorb status boolean
   */
  // Buffer -> ArrayBuffer
  async absorb(data: ArrayBuffer): Promise<boolean> {
    // absorb the data
    // add this line
    const view = new Uint8Array(data);

    for (let i = 0; i < data.byteLength; ++i) {
      // do math calculation -> do data(in blocksize) xor state and store result to state
      // data -> view
      this.state[Math.floor(this.count / 4)] ^= view[i] << (8 * (this.count % 4));
      this.count += 1;
      // call f(state)
      if (this.count === this.blockSize) {
        // 完成 p block 和 state 的一區塊運算：run f(this.state)
        f(this.state);
        this.count = 0;
      }
    }
    // return absorb status(boolean)
    return true;
  }

  /**
   * keccak absorbLastFewBits function -> deal with no data keccak
   * @param bits bits need to be calculated
   * @returns absorb status boolean
   */
  absorbLastFewBits(bits: number): boolean {
    // set the state and use it to do xor
    this.state[Math.floor(this.count / 4)] ^= bits << (8 * (this.count % 4));

    // 0x80 = 1000 0000 = 128 -> bits & 0x80 means: 確認不小於 8 bits -> 則處理多餘 bits
    // call f(state) -> use for sha3
    // if ((bits & 0x80) !== 0 && this.count === (this.blockSize - 1)) {
    //   f(this.state);
    // }

    this.state[Math.floor((this.blockSize - 1) / 4)] ^= 0x80 << (8 * ((this.blockSize - 1) % 4));
    // call f(state)
    f(this.state);
    // call count
    this.count = 0;
    this.squeezing = true;
    // return absorb status
    return true;
  }

  /**
   * keccak squeeze function
   * @param length output bits length
   * @returns output result
   */
  // : Buffer -> ArrayBuffer
  squeeze(length: number): ArrayBuffer {
    // if no absorb function with input data which need to squeeze -> 針對 0x01 call absorbLastFewBits
    if (!this.squeezing) {
      this.absorbLastFewBits(0x01);
    }
    // create buffer with length
    // const output = Buffer.alloc(length);
    const output = new ArrayBuffer(length); // 2 bytes for each char
    const view = new Uint8Array(output);

    for (let i = 0; i < length; ++i) {
      // 數學運算： 截斷後 8 bits 並去除
      // output -> view
      view[i] = (this.state[Math.floor(this.count / 4)] >>> (8 * (this.count % 4))) & 0xff;
      this.count += 1;

      if (this.count === this.blockSize) {
        // call f(state)
        f(this.state);
        this.count = 0;
      }
    }
    // return output buffer -> view
    return view;
  }
}

export default KeccakState;
