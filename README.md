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
## How to build it, run it and test it?
build:
```
npm run build
```
run:
```
npm run start
```
test
```
npm run test
```
output:

![](https://i.imgur.com/TAZ2t7q.png)

## Support keccak algorithm
```
keccak224
keccak256
keccak384
keccak512
```
## How to use it?
1. create Keccak with algorithm name
```
const keccak256 = new Keccak('keccak256');
```
2. use update function with your text and digest function with encoding type you want to get hash output value
```
const hashResult = keccak256.update('Your test text').digest('hex');
```
3. test the result - if your run the code from step 1 and step 2 without any modification, you will get the result down below
```
console.log(hashResult);
// hashResult = d215f22cf53667dcd80f18a730123452db9454a4a2f3db447cba9ddd8c3a34c9
```
## Problem you may face with
1. Get digest is already called error
```
// You need to call your update before digest
const hashResult = new Keccak('keccak256').update('Your test text').digest('hex');
```
## Folder Structure and files
src/lib/ : keccak f function and keccakState class

src/tests/ : test files

index.ts : main keccak class 

jest.config.js :  jest related config

package.json : script and installation related settings

tsconfig.json : use for typescript config

## Priciple to check (in Chinese)
https://github.com/CAFECA-IO/js-Keccak-Laria/wiki/Principle


