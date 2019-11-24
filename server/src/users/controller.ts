import { Controller, Post, Body, UseGuards, Get, Request,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './service';
import { AuthService } from '../auth/service';
import { CreateUserDto } from './dto/create-user';
import { UserEntity } from './entities';

@Controller('node/users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('userInfo')
  userInfo(@Request() req): UserEntity {
    return new UserEntity(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('online')
  async online(@Request() req) {
    return this.usersService.updateStatus(req.user.username, 1, req.body.clientId || null);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('offline')
  async offline(@Request() req) {
    return this.usersService.updateStatus(req.user.username, 0, null);
  }
}
