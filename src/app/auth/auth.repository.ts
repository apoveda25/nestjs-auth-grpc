import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { aql } from 'arangojs/aql';
import { ArangodbService } from '../../arangodb/arangodb.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly arangoService: ArangodbService) {}

  async searchUserScopes(userId: string) {
    const UsersHasRole = this.arangoService.collection('UsersHasRole');
    const RolesHasScope = this.arangoService.collection('RolesHasScope');

    try {
      const cursor = await this.arangoService.query(aql`
      FOR v_role, e_has_role IN OUTBOUND ${userId} ${UsersHasRole}
      RETURN {
        scopes: (
          FOR v_scope, e_has_scope IN OUTBOUND v_role._id ${RolesHasScope}
          RETURN v_scope
        )
      }
    `);

      return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
