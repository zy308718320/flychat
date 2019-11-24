import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('MASTER_KEY'),
    });
  }

  async validate(payload: any) {
    return {
      uid: payload.uid,
      username: payload.username,
      nickname: payload.nickname,
      portrait: payload.portrait,
      explain: payload.explain,
    };
  }
}
