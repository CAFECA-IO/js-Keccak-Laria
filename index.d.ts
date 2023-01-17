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

  constructor(algorithm?: string);
  update(data: any, encoding?: BufferEncoding | undefined): any;
  digest(encoding: BufferEncoding | undefined): string;
  resetState(): void;
}

export function keccak(data: any, algorithm?: string): string;
export function keccak224(data: any, algorithm?: string): string;
export function keccak256(data: any, algorithm?: string): string;
export function keccak384(data: any, algorithm?: string): string;
export function keccak512(data: any, algorithm?: string): string;