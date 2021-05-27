import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { SearchUserRoleScopesDto } from './dto/search-user-role-scopes.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async searchUserRoleScopes(searchUserRoleScopesDto: SearchUserRoleScopesDto) {
    return await this.authRepository.searchUserRoleScopes(
      searchUserRoleScopesDto._id,
    );
  }
}
