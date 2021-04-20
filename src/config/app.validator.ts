import { plainToClass } from 'class-transformer';
import { IsString, IsUrl, ValidateNested, validateSync } from 'class-validator';

class AppVariables {
  @IsString()
  name: string;

  @IsUrl({ require_tld: false })
  host: string;
}

class ArangoDBVariables {
  @IsUrl({ require_tld: false }, { each: true })
  urls: string[];

  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString({ each: true })
  certs: string[];
}

class EnvironmentVariables {
  @ValidateNested()
  app: AppVariables;

  @ValidateNested()
  arangodb: ArangoDBVariables;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
