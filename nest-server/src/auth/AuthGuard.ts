import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest(request: any) {
    const token = request.headers.authorization.split('Bearer ');
    if(token.length === 2) {
      request.userId = token[1];
      return true;
    } else {
      return false;
    }
  }
}

export interface CustomRequest extends Request{
  userId: string;
}
