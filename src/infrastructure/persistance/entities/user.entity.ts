import {BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity('users')
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column('text')
    name: string
    @Column('text',{unique: true})
    email: string
    @Column('text')
    password: string
    @Column('boolean',{default:false})
    authenticated: boolean
    @Column('jsonb',{ nullable: true ,default:[]})
    permissions?: string[];
}
