import { Component } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Component()
export class BcryptService {

  public async hashString(plainText: string): Promise<string> {
    return hash(plainText, 10);
  }

  public async compareHash(plainText: string, hashString: string): Promise<boolean> {
    return compare(plainText, hashString);
  }
}
