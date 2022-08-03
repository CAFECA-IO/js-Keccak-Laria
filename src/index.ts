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
  isReady: boolean;

  // user constructor to initialize params
  constructor (name = 'keccak256') {

    // ++ todo: do map : select the standard (keccak 256 or 512 ...)

    this.rate = 1088;
    this.capacity = 512;
    this.delimitedSuffix = null;
    this.hashBitLength = 256;
    this.options = null;

    this.state = new KeccakState();
    // braing state and call initialize
    this.isReady = this.state.initialize(this.rate, this.capacity);
    this.finalized = false;

  }

  // update  
  update (data: any, encoding?: BufferEncoding | undefined) : any {
    // check is buffer or string
    if (!Buffer.isBuffer(data) && typeof data !== 'string') {
      throw new TypeError('Data should be a string or a buffer');
    } 
    if (this.finalized) {
      throw new Error('Digest is already called');
    }
    if (!Buffer.isBuffer(data)) {
      data = Buffer.from(data, encoding);
    } 
    // do absorb
    this.state.absorb(data);

    return this;
  }

  digest (encoding?: BufferEncoding | undefined) : string {
  
    if (this.finalized) {
      throw new Error('Digest is already called');
    }
    
    this.finalized = true

    // call absorbLastFewBits
    if (this.delimitedSuffix) {
      this.state.absorbLastFewBits(this.delimitedSuffix);
    } 
    
    // set result to digest
    let digest = this.state.squeeze(this.hashBitLength / 8)
    
    if (encoding !== undefined) {
      digest = digest.toString(encoding);
    }
    // call resetState()
    this.resetState();
    let result = digest;
    // resturn result
    return result;
  }

  // remove result from memory
  resetState () : any {
    // bring state and call initialize
    this.state.initialize(this.rate, this.capacity);
    // return this
    return this;
  }

}

export default Keccak;