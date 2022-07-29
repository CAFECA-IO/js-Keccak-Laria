function ProcessKeccak (message: string, n: number): number {
    // do 數字判斷

    // absorb
    Keccak(12333);
    Padding(12312);
    //squezzeout
    Keccak(12333);

    const hash_result = 123;
    return hash_result;

}

function load (d: number): number {
    // sum
    return d;
}

function store (d: number): number {
    // lanes
    return d;
}

function Keccak (s: number): number {

    // call load function to get sum
    load(1);
    // call f function to set lanes
    KeccakF (1);
    // call load function to get store
    store(1);
    return s;

}

function KeccakF (lanes: number): number {
    // for loop call function R
    KeccakR(1);
    return lanes;
}

function KeccakR (lanes: number): number {
    return lanes;
}

function Padding (state: number): number {
    return state;
}


export default ProcessKeccak;