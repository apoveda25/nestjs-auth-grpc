import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { SearchUserScopesDto } from './dto/search-user-scopes.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'searchUserScopes')
  async searchUserScopes(searchUserScopesDto: SearchUserScopesDto) {
    return this.authService.searchUserScopes(searchUserScopesDto);
  }
}
