import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EncryptDecryptService {
  constructor() {}

  encrypt(key: string, value: string): string {
    const encryptedValue: any[] = [];
    for (let i = 0; i < value.length; i++) {
      const key_c = key[i % key.length].charCodeAt(0);
      // eslint-disable-next-line security/detect-object-injection
      const value_c = value[i].charCodeAt(0);
      encryptedValue.push((value_c + key_c) % 127);
    }

    return encryptedValue.join('*');
  }

  decrypt(key: string, encryptedValue: string): string {
    const decryptedValue: any[] = [];
    const splitEncryptedValue: string[] = encryptedValue.split('*');
    splitEncryptedValue.forEach((value: string, index: number) => {
      const key_c = key[index % key.length].charCodeAt(0);
      decryptedValue.push(String.fromCharCode(Number(value) - key_c + 127));
    });

    return decryptedValue.join('');
  }
}
