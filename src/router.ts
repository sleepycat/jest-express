import { next, NextFunction } from './next';
import { Request } from './request';
import { Response } from './response';

declare const jest: any;
// https://expressjs.com/en/4x/api.html#router
export class Router {
  public request: Request;
  public response: Response;
  public next: NextFunction;
  public all: any;
  public get: any;
  public param: any;
  public route: any;
  public use: any;

  constructor() {
    this.request = new Request();
    this.response = new Response();
    this.next = next;
    this.all = jest.fn();
    this.get = jest.fn((path: any, callback: any) => {
      if (typeof path === 'string' && typeof callback === 'function') {
        callback(this.request, this.response, this.next);
      } else {
        path(this.request, this.response, this.next);
      }
    });
    this.param = jest.fn();
    this.route = jest.fn(() => {
      return {
        get: this.get,
      };
    });
    this.use = jest.fn();
    return this;
  }

  public resetMocked() {
    this.all.mockReset();
    this.get.mockReset();
    this.param.mockReset();
    this.route.mockReset();
    this.use.mockReset();
  }
}
