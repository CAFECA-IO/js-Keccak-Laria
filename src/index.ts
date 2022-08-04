// need to put final structure here
import KeccakState from "./lib/keccak_state";

type Nullable<T> = T | null;

/**
 * Keccak class used to organize the keccak related functions
 */
class Keccak {

  rate: number | undefined;
  capacity: number  | undefined;
  delimitedSuffix: Nullable<number>;
  hashBitLength: number;
  options: any;
  state: any;
  finalized: boolean;
  isReady: boolean;

  // user constructor to initialize params
  /**
   * use constructor to set rate, capacity, delimitedSuffix, options
   * @param algorithm keccak algorithm given by user
   */
  constructor (algorithm = 'keccak256') {

    let algoMap = new Map<string, number>();
    // set algorithm map to algoMap
    algoMap.set("keccak224", 1152);
    algoMap.set("keccak256", 1088);
    algoMap.set("keccak384", 832);
    algoMap.set("keccak512", 576);

    // map algorithm name with values
    // if rate is undefined, we set it to 1088 (keccak256)
    this.rate = algoMap.get(algorithm) == undefined ? 1088: algoMap.get(algorithm);
    this.capacity = (this.rate == undefined) ? 512 : 1600 - this.rate;
    this.delimitedSuffix = null;
    this.hashBitLength = (this.rate == undefined) ? 256 : (1600 - this.rate) / 2;
    this.options = null;
    // create KeccakState
    this.state = new KeccakState();
    // bring state and call initialize
    this.isReady = this.state.initialize(this.rate, this.capacity);
    this.finalized = false;

  }

  // update  
  /**
   * update function to absorb data
   * @param data data given by user
   * @param encoding (optional) encoding type 
   */
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
    // do absorb function
    this.state.absorb(data);

    return this;
  }

  // digest
  /**
   * digest function to squeeze data
   * @param encoding encoding type 
   */
  digest (encoding: BufferEncoding | undefined) : string {
  
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

  // remove result (state before) from memory 
  /**
   * resetState function to reset state
   */
  resetState () : any {
    // bring state and call initialize
    this.state.initialize(this.rate, this.capacity);
  }

}

export default Keccak;