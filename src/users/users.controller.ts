import { Body, Controller, Get, Post, UseGuards, UsePipes } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {}


  // @ts-ignore
  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({status: 200, type: User})
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto){
    return this.userService.createUser(userDto)
  }

  // @ts-ignore
  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({status: 200, type: [User]})
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll(){
    return this.userService.getAllUsers()
  }


  @ApiOperation({ summary: 'Выдача ролей' })
  @ApiResponse({status: 200, type: [User]})
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post( '/role')
  addRole(@Body() dto: AddRoleDto){
    return this.userService.addRole(dto)
  }


  @ApiOperation({ summary: 'Забанить пользоватиля' })
  @ApiResponse({status: 200, type: [User]})
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post( '/ban')
  ban(@Body() dto: BanUserDto){
    return this.userService.ban(dto)
  }

}
