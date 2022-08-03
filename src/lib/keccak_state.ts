import f from './keccak_f';

class KeccakState {
  
  state: number[];
  blockSize: number;
  count: number;
  squeezing: boolean;

  constructor() {
    // initialization
    this.state = [
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0
    ]
  
    this.blockSize = 0;
    this.count = 0
    this.squeezing = false
  }

  
  initialize (rate: number, capacity: number): boolean {
    
    for (let i = 0; i < 50; ++i) {
      this.state[i] = 0;
    }

    this.blockSize = rate / 8;
    this.count = 0;
    this.squeezing = false;
    
    return true;
  
  }
  
  async absorb (data: number[]) : Promise<boolean>{
    for (let i = 0; i < data.length; ++i) {
      this.state[Math.floor(this.count / 4)] ^= data[i] << (8 * (this.count % 4));
      this.count += 1;
      if (this.count === this.blockSize) {
        f(this.state);
        this.count = 0;
      }
    }
    return true;
  }
  
  absorbLastFewBits (bits: number): boolean {
    // set the state 
    this.state[Math.floor(this.count / 4)] ^= bits << (8 * (this.count % 4));

    // because blocksize is nullable -> we need to deal with this nullable problem
    if ((bits & 0x80) !== 0 && this.count === (this.blockSize - 1)) {
      f(this.state);
    } 
    
    this.state[Math.floor((this.blockSize - 1) / 4)] ^= 0x80 << (8 * ((this.blockSize - 1) % 4));
    
    f(this.state);
    
    this.count = 0;
    this.squeezing = true;
    
    return true;
  }
  
  squeeze (length: number) : Buffer {
    
    if (!this.squeezing) {
      
      this.absorbLastFewBits(0x01);
    
    }
  
    const output = Buffer.alloc(length);
    
    for (let i = 0; i < length; ++i) {
      
      output[i] = (this.state[Math.floor(this.count / 4)] >>> (8 * (this.count % 4))) & 0xff;
      this.count += 1;
    
      if (this.count === this.blockSize) {
      
        f(this.state);
        this.count = 0;
      
      }
    
    }
  
    return output;
  
  }
  
}

export default KeccakState;
