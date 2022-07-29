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

// js don't support shift over 32 bits
// custom the left shift function
function rot(num: number, bits: number): number {
    return num * Math.pow(2,bits);
}


// load the leftshift in the list
function load (b: number[]): number {
    // sum
    let sum = 0;
    for (let i = 0; i < 8; i++) {
        sum = sum + rot(b[i], 8*i);
    }
    
    return sum;
}

// store the number in list
function store (a: number): number[] {
    // lanes
    let storeList = [];
    for (let i = 0; i < 8; i++) {
        storeList.push((rot(a,(8*i))) % 256);
    }
    return storeList;
}

function Keccak (s: number): number {

    // call load function to get sum
    // load([1,1,1,1,1,1,1,1]);
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