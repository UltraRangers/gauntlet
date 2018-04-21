import { Component } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

@Component()
export class JsonWebTokenService {

  public sign(data: any) {
    return sign(data, 'secret');
  }

  public verify(token: any) {
    try {
      const data = verify(token, 'secret');
      return data;
    } catch (error) {
      return;
    }
  }
}
