type Nullable<T> = T | null;

declare class Keccak {
  rate: number | undefined;
  capacity: number | undefined;
  delimitedSuffix: Nullable<number>;
  hashBitLength: number;
  options: any;
  state: any;
  finalized: boolean;
  isReady: boolean;

  constructor(algorithm: string);
  update(data: any, encoding?: BufferEncoding | undefined): any;
  digest(encoding: BufferEncoding | undefined): string;
  resetState();
}