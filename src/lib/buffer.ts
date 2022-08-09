
function convertUint8ArrayToHexString(u8Array:Uint8Array): string {
    
    const hexParts = [];
    
    for(let i = 0; i < u8Array.length; i++) {
      // value -> hexadecimal
      const hex = u8Array[i].toString(16);
      
      // pad with zeros 
      const paddedHex = ('00' + hex).slice(-2);
      
      // push it into array
      hexParts.push(paddedHex);
    }
    
    // join all the hex values of the elements into a single string
    return hexParts.join('');
}

function convertUint8ArrayToBase64(u8Array:Uint8Array): string {
    // ++ Todo - add more code to complete it
    return 'AQID';
}

function convertUint8ArrayToBinaryString(u8Array: Uint8Array): string {

    // ++ Todo - add more code to complete it
	let i;
    let len = u8Array.length;
    let result = "";
	
    for (i = 0; i < len; i++) {
		result += String.fromCharCode(u8Array[i]);
	}

    // uint8Array -> binary string
	return '00000001000000100000011';
}

function isArrayBuffer(value: any) {
    return value && value.buffer instanceof ArrayBuffer && value.byteLength !== undefined;
}

export {convertUint8ArrayToHexString, convertUint8ArrayToBase64, convertUint8ArrayToBinaryString, isArrayBuffer}