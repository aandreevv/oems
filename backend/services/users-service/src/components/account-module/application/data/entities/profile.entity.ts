import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccountEntity } from './account.entity';
import { LanguageEnum } from '../enums/language.enum';
import { FollowEntity } from './follow.entity';
import { ConnectionEntity } from './connection.entity';
import { InterestEntity } from './interest.entity';

@Entity()
export class ProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @JoinColumn()
  @OneToOne(() => AccountEntity, (account) => account.profile, { onDelete: 'CASCADE' })
  account: AccountEntity;

  @Column()
  fullName: string;

  @Column({ unique: true })
  username: string;

  @Column()
  dateOfBirth: Date;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ enum: LanguageEnum, default: LanguageEnum.UKRAINIAN })
  language: LanguageEnum;

  @OneToMany(() => FollowEntity, (follow) => follow.follower)
  followers: FollowEntity[];

  @OneToMany(() => FollowEntity, (follow) => follow.following)
  followings: FollowEntity[];

  @OneToMany(() => ConnectionEntity, (connection) => connection.profile)
  connections: ConnectionEntity[];

  @OneToMany(() => InterestEntity, (interest) => interest.profile)
  interests: InterestEntity[];
}
