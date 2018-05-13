import { Component } from '@nestjs/common';
import { compileFile } from 'pug';

@Component()
export class PugService {

  public compileFile(path: string, locals: any) {
    return compileFile(path, {})(locals);
  }
}
