import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number = 0

    @Column()
    title: string = ""

    @Column({type: "varchar"}) //necessary to be compatible with postgres datetime types
    category: string | null  = ""

    @Column({type: "timestamptz"}) //necessary to be compatible with postgres datetime types
    start: Date = new Date()

    @Column({type: "timestamptz"})
    end: Date = new Date()

};