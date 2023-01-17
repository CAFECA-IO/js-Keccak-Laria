type Nullable<T> = T | null;

export class Keccak {
  rate: number | undefined;
  capacity: number | undefined;
  delimitedSuffix: Nullable<number>;
  hashBitLength: number;
  options: any;
  state: any;
  finalized: boolean;
  isReady: boolean;

  static keccak(data: any, algorithm?: string): string;
  static keccak224(data: any): string;
  static keccak256(data: any): string;
  static keccak384(data: any): string;
  static keccak512(data: any): string;

  constructor(algorithm?: string);
  update(data: any, encoding?: BufferEncoding | undefined): any;
  digest(encoding: BufferEncoding | undefined): string;
  resetState();
}