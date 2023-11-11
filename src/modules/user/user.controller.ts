import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/role.decorator';
import { User } from 'src/decorators/user.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { TokenType } from 'src/types/token.type';

@Controller('user')
export class UserController {
  @Get('info')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUserInfor(@User() user: TokenType) {
    return user;
  }
}
