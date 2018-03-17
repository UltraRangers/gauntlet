import { IsArray, IsBoolean, IsDate, IsEmail, IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  public id?: number;

  @IsEmail()
  @Column('text')
  public email: string;

  @IsNotEmpty()
  @Column('text')
  public password: string;

  @IsBoolean()
  @Column('boolean', { default: true })
  public enabled?: boolean;

  @IsDate()
  @Column('timestamp', { default: new Date() })
  public created?: Date;

  @IsArray()
  @ManyToMany((type) => Role)
  @JoinTable({
    name: 'user_role'
  })
  public roles: Role[];
}
