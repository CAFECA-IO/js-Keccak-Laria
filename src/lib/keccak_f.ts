// set rc = round constants list
const RC = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648]

function f (s: number[]) {

  // 根據 keccak 原理算出： 12 + 2l = 24 rounds loop 
  for (let round = 0; round < 24; ++round) {

    // 1600 / 8 = 200 (換成 byte) 200/4 （根據數學運算 -> 4 個一組）= 50 -> state[50]

    // theta
    // column lo and hi
    const lo0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40]
    const hi0 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41]
    const lo1 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42]
    const hi1 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43]
    const lo2 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44]
    const hi2 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45]
    const lo3 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46]
    const hi3 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47]
    const lo4 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48]
    const hi4 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49]

    let lo = lo4 ^ (lo1 << 1 | hi1 >>> 31)
    let hi = hi4 ^ (hi1 << 1 | lo1 >>> 31)
    
    const t1lo0 = s[0] ^ lo
    const t1hi0 = s[1] ^ hi
    const t1lo5 = s[10] ^ lo
    const t1hi5 = s[11] ^ hi
    const t1lo10 = s[20] ^ lo
    const t1hi10 = s[21] ^ hi
    const t1lo15 = s[30] ^ lo
    const t1hi15 = s[31] ^ hi
    const t1lo20 = s[40] ^ lo
    const t1hi20 = s[41] ^ hi

    lo = lo0 ^ (lo2 << 1 | hi2 >>> 31)
    hi = hi0 ^ (hi2 << 1 | lo2 >>> 31)
    const t1lo1 = s[2] ^ lo
    const t1hi1 = s[3] ^ hi
    const t1lo6 = s[12] ^ lo
    const t1hi6 = s[13] ^ hi
    const t1lo11 = s[22] ^ lo
    const t1hi11 = s[23] ^ hi
    const t1lo16 = s[32] ^ lo
    const t1hi16 = s[33] ^ hi
    const t1lo21 = s[42] ^ lo
    const t1hi21 = s[43] ^ hi
    
    lo = lo1 ^ (lo3 << 1 | hi3 >>> 31)
    hi = hi1 ^ (hi3 << 1 | lo3 >>> 31)
    const t1lo2 = s[4] ^ lo
    const t1hi2 = s[5] ^ hi
    const t1lo7 = s[14] ^ lo
    const t1hi7 = s[15] ^ hi
    const t1lo12 = s[24] ^ lo
    const t1hi12 = s[25] ^ hi
    const t1lo17 = s[34] ^ lo
    const t1hi17 = s[35] ^ hi
    const t1lo22 = s[44] ^ lo
    const t1hi22 = s[45] ^ hi
    
    lo = lo2 ^ (lo4 << 1 | hi4 >>> 31)
    hi = hi2 ^ (hi4 << 1 | lo4 >>> 31)
    const t1lo3 = s[6] ^ lo
    const t1hi3 = s[7] ^ hi
    const t1lo8 = s[16] ^ lo
    const t1hi8 = s[17] ^ hi
    const t1lo13 = s[26] ^ lo
    const t1hi13 = s[27] ^ hi
    const t1lo18 = s[36] ^ lo
    const t1hi18 = s[37] ^ hi
    const t1lo23 = s[46] ^ lo
    const t1hi23 = s[47] ^ hi
    
    lo = lo3 ^ (lo0 << 1 | hi0 >>> 31)
    hi = hi3 ^ (hi0 << 1 | lo0 >>> 31)
    const t1lo4 = s[8] ^ lo
    const t1hi4 = s[9] ^ hi
    const t1lo9 = s[18] ^ lo
    const t1hi9 = s[19] ^ hi
    const t1lo14 = s[28] ^ lo
    const t1hi14 = s[29] ^ hi
    const t1lo19 = s[38] ^ lo
    const t1hi19 = s[39] ^ hi
    const t1lo24 = s[48] ^ lo
    const t1hi24 = s[49] ^ hi

    // rho & pi (對應到 r table 做位移)
    const t2lo0 = t1lo0
    const t2hi0 = t1hi0
    const t2lo16 = (t1hi5 << 4 | t1lo5 >>> 28)
    const t2hi16 = (t1lo5 << 4 | t1hi5 >>> 28)
    const t2lo7 = (t1lo10 << 3 | t1hi10 >>> 29)
    const t2hi7 = (t1hi10 << 3 | t1lo10 >>> 29)
    const t2lo23 = (t1hi15 << 9 | t1lo15 >>> 23)
    const t2hi23 = (t1lo15 << 9 | t1hi15 >>> 23)
    const t2lo14 = (t1lo20 << 18 | t1hi20 >>> 14)
    const t2hi14 = (t1hi20 << 18 | t1lo20 >>> 14)
    const t2lo10 = (t1lo1 << 1 | t1hi1 >>> 31)
    const t2hi10 = (t1hi1 << 1 | t1lo1 >>> 31)
    const t2lo1 = (t1hi6 << 12 | t1lo6 >>> 20)
    const t2hi1 = (t1lo6 << 12 | t1hi6 >>> 20)
    const t2lo17 = (t1lo11 << 10 | t1hi11 >>> 22)
    const t2hi17 = (t1hi11 << 10 | t1lo11 >>> 22)
    const t2lo8 = (t1hi16 << 13 | t1lo16 >>> 19)
    const t2hi8 = (t1lo16 << 13 | t1hi16 >>> 19)
    const t2lo24 = (t1lo21 << 2 | t1hi21 >>> 30)
    const t2hi24 = (t1hi21 << 2 | t1lo21 >>> 30)
    const t2lo20 = (t1hi2 << 30 | t1lo2 >>> 2)
    const t2hi20 = (t1lo2 << 30 | t1hi2 >>> 2)
    const t2lo11 = (t1lo7 << 6 | t1hi7 >>> 26)
    const t2hi11 = (t1hi7 << 6 | t1lo7 >>> 26)
    const t2lo2 = (t1hi12 << 11 | t1lo12 >>> 21)
    const t2hi2 = (t1lo12 << 11 | t1hi12 >>> 21)
    const t2lo18 = (t1lo17 << 15 | t1hi17 >>> 17)
    const t2hi18 = (t1hi17 << 15 | t1lo17 >>> 17)
    const t2lo9 = (t1hi22 << 29 | t1lo22 >>> 3)
    const t2hi9 = (t1lo22 << 29 | t1hi22 >>> 3)
    const t2lo5 = (t1lo3 << 28 | t1hi3 >>> 4)
    const t2hi5 = (t1hi3 << 28 | t1lo3 >>> 4)
    const t2lo21 = (t1hi8 << 23 | t1lo8 >>> 9)
    const t2hi21 = (t1lo8 << 23 | t1hi8 >>> 9)
    const t2lo12 = (t1lo13 << 25 | t1hi13 >>> 7)
    const t2hi12 = (t1hi13 << 25 | t1lo13 >>> 7)
    const t2lo3 = (t1lo18 << 21 | t1hi18 >>> 11)
    const t2hi3 = (t1hi18 << 21 | t1lo18 >>> 11)
    const t2lo19 = (t1hi23 << 24 | t1lo23 >>> 8)
    const t2hi19 = (t1lo23 << 24 | t1hi23 >>> 8)
    const t2lo15 = (t1lo4 << 27 | t1hi4 >>> 5)
    const t2hi15 = (t1hi4 << 27 | t1lo4 >>> 5)
    const t2lo6 = (t1lo9 << 20 | t1hi9 >>> 12)
    const t2hi6 = (t1hi9 << 20 | t1lo9 >>> 12)
    const t2lo22 = (t1hi14 << 7 | t1lo14 >>> 25)
    const t2hi22 = (t1lo14 << 7 | t1hi14 >>> 25)
    const t2lo13 = (t1lo19 << 8 | t1hi19 >>> 24)
    const t2hi13 = (t1hi19 << 8 | t1lo19 >>> 24)
    const t2lo4 = (t1lo24 << 14 | t1hi24 >>> 18)
    const t2hi4 = (t1hi24 << 14 | t1lo24 >>> 18)

    // chi 
    s[0] = t2lo0 ^ (~t2lo1 & t2lo2)
    s[1] = t2hi0 ^ (~t2hi1 & t2hi2)
    s[10] = t2lo5 ^ (~t2lo6 & t2lo7)
    s[11] = t2hi5 ^ (~t2hi6 & t2hi7)
    s[20] = t2lo10 ^ (~t2lo11 & t2lo12)
    s[21] = t2hi10 ^ (~t2hi11 & t2hi12)
    s[30] = t2lo15 ^ (~t2lo16 & t2lo17)
    s[31] = t2hi15 ^ (~t2hi16 & t2hi17)
    s[40] = t2lo20 ^ (~t2lo21 & t2lo22)
    s[41] = t2hi20 ^ (~t2hi21 & t2hi22)
    s[2] = t2lo1 ^ (~t2lo2 & t2lo3)
    s[3] = t2hi1 ^ (~t2hi2 & t2hi3)
    s[12] = t2lo6 ^ (~t2lo7 & t2lo8)
    s[13] = t2hi6 ^ (~t2hi7 & t2hi8)
    s[22] = t2lo11 ^ (~t2lo12 & t2lo13)
    s[23] = t2hi11 ^ (~t2hi12 & t2hi13)
    s[32] = t2lo16 ^ (~t2lo17 & t2lo18)
    s[33] = t2hi16 ^ (~t2hi17 & t2hi18)
    s[42] = t2lo21 ^ (~t2lo22 & t2lo23)
    s[43] = t2hi21 ^ (~t2hi22 & t2hi23)
    s[4] = t2lo2 ^ (~t2lo3 & t2lo4)
    s[5] = t2hi2 ^ (~t2hi3 & t2hi4)
    s[14] = t2lo7 ^ (~t2lo8 & t2lo9)
    s[15] = t2hi7 ^ (~t2hi8 & t2hi9)
    s[24] = t2lo12 ^ (~t2lo13 & t2lo14)
    s[25] = t2hi12 ^ (~t2hi13 & t2hi14)
    s[34] = t2lo17 ^ (~t2lo18 & t2lo19)
    s[35] = t2hi17 ^ (~t2hi18 & t2hi19)
    s[44] = t2lo22 ^ (~t2lo23 & t2lo24)
    s[45] = t2hi22 ^ (~t2hi23 & t2hi24)
    s[6] = t2lo3 ^ (~t2lo4 & t2lo0)
    s[7] = t2hi3 ^ (~t2hi4 & t2hi0)
    s[16] = t2lo8 ^ (~t2lo9 & t2lo5)
    s[17] = t2hi8 ^ (~t2hi9 & t2hi5)
    s[26] = t2lo13 ^ (~t2lo14 & t2lo10)
    s[27] = t2hi13 ^ (~t2hi14 & t2hi10)
    s[36] = t2lo18 ^ (~t2lo19 & t2lo15)
    s[37] = t2hi18 ^ (~t2hi19 & t2hi15)
    s[46] = t2lo23 ^ (~t2lo24 & t2lo20)
    s[47] = t2hi23 ^ (~t2hi24 & t2hi20)
    s[8] = t2lo4 ^ (~t2lo0 & t2lo1)
    s[9] = t2hi4 ^ (~t2hi0 & t2hi1)
    s[18] = t2lo9 ^ (~t2lo5 & t2lo6)
    s[19] = t2hi9 ^ (~t2hi5 & t2hi6)
    s[28] = t2lo14 ^ (~t2lo10 & t2lo11)
    s[29] = t2hi14 ^ (~t2hi10 & t2hi11)
    s[38] = t2lo19 ^ (~t2lo15 & t2lo16)
    s[39] = t2hi19 ^ (~t2hi15 & t2hi16)
    s[48] = t2lo24 ^ (~t2lo20 & t2lo21)
    s[49] = t2hi24 ^ (~t2hi20 & t2hi21)

    // iota
    s[0] ^= RC[round * 2]
    s[1] ^= RC[round * 2 + 1]
  }
  // return s
  return s;
}

export default f;