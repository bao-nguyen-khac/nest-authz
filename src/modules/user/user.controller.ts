import { Controller, Get, UseGuards } from '@nestjs/common';
import { CheckPolicies } from 'src/decorators/policy.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { User } from 'src/decorators/user.decorator';
import { Action } from 'src/enums/action.enum';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { PoliciesGuard } from 'src/guards/policy.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { TokenType } from 'src/types/token.type';
import { Article } from '../article/article.entity';
import { AppAbility } from '../casl/casl-ability.factory';

@Controller('user')
export class UserController {
  @Get('info')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Article))
  getUserInfor(@User() user: TokenType) {
    return user;
  }
}
