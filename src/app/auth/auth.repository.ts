import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { aql } from 'arangojs/aql';
import { ArangodbService } from '../../arangodb/arangodb.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly arangoService: ArangodbService) {}

  async searchUserRoleScopes(userId: string) {
    const Users = this.arangoService.collection('Users');
    const UsersHasRole = this.arangoService.collection('UsersHasRole');
    const RolesHasScope = this.arangoService.collection('RolesHasScope');

    try {
      const cursor = await this.arangoService.query(aql`
        FOR user_v IN ${Users}
        FILTER user_v._id == ${userId}
        LET data = (
            FOR role_v, has_role_e IN OUTBOUND user_v._id ${UsersHasRole}
            RETURN {
                role: role_v,
                scopes: (
                    FOR scope_v, has_scope_e IN OUTBOUND role_v._id ${RolesHasScope}
                    RETURN scope_v
                )
            }
        )[0]
        RETURN MERGE(user_v, data)
    `);

      return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
