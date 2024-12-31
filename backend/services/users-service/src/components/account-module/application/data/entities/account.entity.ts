import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity()
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => ProfileEntity, (profile) => profile.account, { cascade: ['update'] })
  profile: ProfileEntity;
}
