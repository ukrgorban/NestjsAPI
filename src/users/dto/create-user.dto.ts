import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto{
  @ApiProperty({example: 'mail@gmail.com', description: 'Почтовый адресс'})
  @IsString({message: 'Должно быть строкой'})
  @IsEmail({}, {message: 'Не корректный email'})
  readonly email

  @ApiProperty({example: 'pass', description: 'Пароль'})
  @IsString({message: 'Должно быть строкой'})
  @Length(4, 10, {message: 'Должно быть 4 - 10 символов'})
  readonly password
}