# js-Keccak-Laria

## Requirement
```
node / v12.5.0^
```
## Before we get started
run command down below
```
npm install
```
## How to use it?
1. create Keccak with algorithm name
```
// you can replace keccak256 with any keccak algorithm name
const keccak256 = new Keccak('keccak256');
```
2. use update and digest to get hash output
```
// inherit code from step 1
// you can add your text in the test text and replace hex in digest with any Encoding type you want
const hashResult = keccak256.update('Your test text').digest('hex');
```
3. test the result - if your run the code from step 1 and step 2 without any modification, you will get the result below
console.log(hashResult);
// hashResult = d215f22cf53667dcd80f18a730123452db9454a4a2f3db447cba9ddd8c3a34c9
