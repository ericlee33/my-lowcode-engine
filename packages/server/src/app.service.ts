import { Injectable, HttpCode, HttpStatus } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(params) {
    const result = new Array(25).fill(0).map(() => ({
      name: 'eric',
      salary: '10',
      address: 'beijing',
      email: 'ericfly33@gmail.com',
    }));

    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(result);
        //   {
        //   code: 200,
        //   data: [
        //     {
        //       displayName: 'name',
        //       value: 'salary',
        //     },
        //   ],
        // }
      }, 500);
    });
  }
}
