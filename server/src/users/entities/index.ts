import { Exclude } from 'class-transformer';

export class UserEntity {
  uid: string;
  @Exclude()
  username: string;
  nickname: string;
  portrait: string;
  explain: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
