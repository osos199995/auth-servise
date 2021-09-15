import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('books')
export class BookEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column('text')
    title: string
    @Column('text')
    description: string
}
