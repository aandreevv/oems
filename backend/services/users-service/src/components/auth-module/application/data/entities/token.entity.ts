import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccountEntity } from '../../../../account-module/application/data/entities/account.entity';

@Entity()
export class TokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @ManyToOne(() => AccountEntity)
  account: AccountEntity;
}
