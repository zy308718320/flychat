import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumberString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiModelProperty({description: '昵称'})
  readonly nickname: string;

  @IsNotEmpty()
  @ApiModelProperty({description: '头像'})
  readonly portrait: string;

  @IsNumberString()
  @ApiModelProperty({description: '用户名'})
  readonly username: string;

  @IsNotEmpty()
  @ApiModelProperty({description: '密码'})
  readonly password: string;

  @IsNumber()
  @ApiModelProperty({description: '性别'})
  readonly gender: number;

  @ApiModelProperty({description: '备注'})
  readonly explain: string;

  @IsEmail()
  @ApiModelProperty({description: '邮箱'})
  readonly email: string;
}
