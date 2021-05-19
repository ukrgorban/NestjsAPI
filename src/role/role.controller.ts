import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";

@Controller('roles')
export class RoleController {

  constructor(private roleService: RoleService) {}

  @Post()
  create(@Body() dto: CreateRoleDto){
    return this.roleService.createRole(dto)
  }

  @Get('/:value')
  getByValue(@Param('value') value: string ){
    return this.roleService.getRoleByValue(value)
  }

}
