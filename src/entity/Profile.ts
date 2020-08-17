import {Entity, PrimaryGeneratedColumn, Column, OneToOne} from "typeorm";
import {CUser} from "./CUser";

@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    gender: string;

    @Column()
    photo: string;

    @OneToOne(type => CUser, user => user.profile) // specify inverse side as a second parameter
    user: CUser;

}