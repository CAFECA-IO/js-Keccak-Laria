
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
    return num * Math.pow(2 , bits);
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
        storeList.push((rot(a,(8 * i))) % 256);
    }
    return storeList;
}

function Keccak (s: number): number {
   
    // call load function to get sum
    // load([1,1,1,1,1,1,1,1]);
    // call f function to set lanes

    // KeccakF ();
    
    // call load function to get store
    store(1);
    return s;

}

async function KeccakF (lanes: number[][]): Promise<number[][]> {
    
    const R = 1;
    let result: number[][] = [];
    // pass last lane into KeccakR function
    let lastLane = await KeccakR(lanes, R);
    for (let i = 1; i < 24 ; i++) {
        if(i < 23) {
            lastLane = await KeccakR(lastLane, R);
        } else {
            result = await KeccakR(lastLane, R);
            return result;
        } 
    }    
    return result;
}

// ++ Todo: need to complete χ and ι and test
async function KeccakR (lanes: number[][], R: number): Promise<number[][]> {
    // θ
    let C = [];
    let D = [];
    let result: number[][] = []; 

    for (let x = 0; x < 5; x++) {
        // C = [lanes[x][0] ^ lanes[x][1] ^ lanes[x][2] ^ lanes[x][3] ^ lanes[x][4] for x in range(5)]
        // use the large bit handler
        C.push(lanes[x][0] ^ lanes[x][1] ^ lanes[x][2] ^ lanes[x][3] ^ lanes[x][4]);
    }
    for (let x = 0; x < 5; x++) {
        // D = [C[(x+4)%5] ^ ROL64(C[(x+1)%5], 1) for x in range(5)]
        // use the large bit handler
        D.push(C[(x+4)%5] ^ rot(C[(x+1)%5], 1));
    }    
    for (let x = 0; x < 5 ; x++) {
        // initialize
        result[x] = [];
        for (let y = 0; y < 5 ; y++) {
            result[x][y] = lanes[x][y] ^ D[x]
        }
    }

    // ρ and π
    let a = 1;
    let b = 0;
    let x = a;
    let y = b;
    let current = lanes[x][y];

    for (let t = 0; t < 24; t++) {
        x = b;
        y = (2 * a + 3 * b) % 5;
        // set the last x and y
        a = x;
        b = y;
        // pass lanes to rot function
        lanes[x][y] = rot(current, (t + 1) * (t + 2) / 2);
        current = lanes[x][y];
    }

    // χ
    for (let y = 0; y < 5; y++) {
        let t = [];
        for (let x = 0; x < 5; x++) {
            t.push(lanes[x][y]);
            lanes[x][y] = t[x] ^ ((~t[(x + 1) % 5]) & t[(x + 2) % 5]);
        }

    }
    // for y in range(5):
    //     T = [lanes[x][y] for x in range(5)]
    //     for x in range(5):
    //         lanes[x][y] = T[x] ^((~T[(x+1)%5]) & T[(x+2)%5])
    // // ι
    // for j in range(7):
    //     R = ((R << 1) ^ ((R >> 7)*0x71)) % 256
    //     if (R & 2):
    //         lanes[0][0] = lanes[0][0] ^ (1 << ((1<<j)-1))

    return lanes;
}

function Padding (state: number): number {
    return state;
}

export default ProcessKeccak;