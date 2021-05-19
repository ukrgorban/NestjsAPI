import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../role/role.model";
import { UserRoles } from "../role/user-roles.model";


interface UserCreationAttrs{
  email,
  password
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({example: 1, description: 'Уникальное значение'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({example: 'mail@gmail.com', description: 'Почтовый адресс'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string

  @ApiProperty({example: 'pass', description: 'Пароль'})
  @Column({type: DataType.STRING, allowNull: false})
  password: string

  @ApiProperty({example: true, description: 'Забанен пользователь '})
  @Column({type: DataType.BOOLEAN, defaultValue: false})
  banned: boolean

  @ApiProperty({example: 'За спам', description: 'Причина блокировки'})
  @Column({type: DataType.STRING, allowNull: true})
  banReason: string

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[]
}