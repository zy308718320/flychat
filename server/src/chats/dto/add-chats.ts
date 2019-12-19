import { ApiModelProperty } from '@nestjs/swagger';

export class AddChatsDto {
  @ApiModelProperty({description: '对话列表'})
  readonly chatList: string;
}
