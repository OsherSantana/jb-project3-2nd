// backend/models/user.ts
import {
    AllowNull,
    BelongsToMany,
    Column,
    DataType,
    Default,
    Model,
    PrimaryKey,
    Table,
    Unique
} from "sequelize-typescript";
import Vacation from "./vacation";
import VacationTag from "./tag";

@Table({
    underscored: true,
    tableName: 'users'
})
export default class User extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        field: 'first_name'
    })
    firstName: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        field: 'last_name'
    })
    lastName: string;

    @Unique
    @AllowNull(false)
    @Column(DataType.STRING)
    email: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    password: string;

    @AllowNull(false)
    @Default('user')
    @Column(DataType.ENUM('user', 'admin'))
    role: 'user' | 'admin';

    @BelongsToMany(() => Vacation, () => VacationTag)
    taggedVacations: Vacation[];
}