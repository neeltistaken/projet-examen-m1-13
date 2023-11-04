import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundError extends HttpException {
  constructor(message: string) {
    super(`${message} was not found.`, HttpStatus.NOT_FOUND);
  }
}

export class MissingParamError extends HttpException {
  constructor(message: string) {
    super(`${message} was not found. Missing parameter`, HttpStatus.NOT_FOUND);
  }
}
