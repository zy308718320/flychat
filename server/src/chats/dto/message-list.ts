import { ApiModelProperty } from '@nestjs/swagger';

export class MessageListDto {
  @ApiModelProperty({description: '对话人'})
  readonly fid: string;
}
