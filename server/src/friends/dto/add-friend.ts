import { ApiModelProperty } from '@nestjs/swagger';

export class AddFriendDto {
  @ApiModelProperty({description: '好友id'})
  readonly fid: string;
}
