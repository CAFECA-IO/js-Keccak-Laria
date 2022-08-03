// need to put final structure here

import KeccakState from "./lib/keccak_state";

type Nullable<T> = T | null;

class Keccak {

  rate: number;
  capacity: number;
  delimitedSuffix: Nullable<number>;
  hashBitLength: number;
  options: any;
  state: any;
  finalized: boolean;

  constructor (name = 'keccak256') {
    // do map : select the standard (keccak 256 or 512 ...)

    this.rate = 1088;
    this.capacity = 512;
    this.delimitedSuffix = null;
    this.hashBitLength = 256;
    this.options = null;

    this.state = new KeccakState();
    this.state.initialize(this.rate, this.capacity);
    this.finalized = false;

  }

  update (data: any, encoding?: BufferEncoding | undefined) {

    if (!Buffer.isBuffer(data) && typeof data !== 'string') {
      throw new TypeError('Data should be a string or a buffer');
    } 
    if (this.finalized) {
      throw new Error('Digest is already called');
    }
    if (!Buffer.isBuffer(data)) {
      data = Buffer.from(data, encoding);
    } 

    this.state.absorb(data);

    return this;
  }

  digest (encoding?: BufferEncoding | undefined) {
    
    if (this.finalized) {
      throw new Error('Digest is already called');
    }
    
    this.finalized = true

    if (this.delimitedSuffix) {
      this.state.absorbLastFewBits(this.delimitedSuffix);
    } 
    
    let result = this.state.squeeze(this.hashBitLength / 8)
    
    if (encoding !== undefined) {
      result = result.toString(encoding);
    }

    this.resetState()

    return result;
  }

  // remove result from memory
  resetState () {
    this.state.initialize(this.rate, this.capacity);
    return this;
  }

}

export default Keccak;