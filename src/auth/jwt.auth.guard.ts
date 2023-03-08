import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info) {
        if (err || !user) {
            
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: 'Usuario no autorizado',
            }, HttpStatus.UNAUTHORIZED);
        }
        return user;

    }

}