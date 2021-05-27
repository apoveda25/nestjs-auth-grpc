import { Matches } from 'class-validator';

export class SearchUserRoleScopesDto {
  @Matches(
    /^Users[/][0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  )
  _id: string;
}
