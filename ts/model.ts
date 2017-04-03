'use strict';
import Config from './config';

namespace Model {
  export class Person {
    constructor(private name:string = 'dummy') {
    }

    public getName():string {
      if (Config.ENV != 'production') {
        return this.name;
      } else {
        return this.name + 'さん';
      }
    }
  }
}
export default Model;
