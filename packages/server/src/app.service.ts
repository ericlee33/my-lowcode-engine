import { Injectable, HttpCode, HttpStatus } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(params) {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve({
          code: 200,
          data: [
            {
              displayName: '123',
              value: '123',
            },
          ],
        });
      }, 500);
    });
  }
}
