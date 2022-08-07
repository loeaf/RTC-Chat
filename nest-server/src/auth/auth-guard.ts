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
    // const testToken = `Bearer {"id":"53443ddd-c4a3-4e8a-b4a0-befc550a441e","nickName":"급하지만-허망한-자라"}`;
    // const token = testToken.split('Bearer ');
    if(token.length === 2) {
      request.userId = token[1];
      console.info(request);
      return true;
    } else {
      return false;
    }
  }
}

export interface CustomRequest extends Request{
  userId: string;
}
