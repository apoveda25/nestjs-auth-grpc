import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { SearchUserScopesDto } from './dto/search-user-scopes.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async searchUserScopes(searchUserScopesDto: SearchUserScopesDto) {
    return await this.authRepository.searchUserScopes(searchUserScopesDto._id);
  }
}
