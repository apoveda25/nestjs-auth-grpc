import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { SearchUserRoleScopesDto } from './dto/search-user-role-scopes.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'searchUserRoleScopes')
  async searchUserRoleScopes(searchUserRoleScopesDto: SearchUserRoleScopesDto) {
    return this.authService.searchUserRoleScopes(searchUserRoleScopesDto);
  }
}
