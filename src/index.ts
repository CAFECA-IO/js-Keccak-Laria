import Keccak from "./keccak";

let keccak = new Keccak('keccak256').update('Clemmy').digest('hex');
console.log(keccak);
//bc36d594fb78cbd38b741826c49755e1c15ae5049c91c3f014511ec1a83786d6