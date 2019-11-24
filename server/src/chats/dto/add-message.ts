import { ApiModelProperty } from '@nestjs/swagger';

export class AddMessageDto {
  @ApiModelProperty({description: '消息接受人'})
  readonly fid: string;
  @ApiModelProperty({description: '消息内容'})
  readonly content: string;
}
