import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigManagerService {
  constructor(private readonly configService: ConfigService) {}

  private getOrThrow<T>(key: string, parser: (value: any) => T): T {
    const value = this.configService.get(key);
    if (value === undefined) {
      throw new Error(`Missing configuration value for key: ${key}`);
    }
    return parser(value);
  }

  private getOptional<T>(
    key: string,
    parser: (value: any) => T,
  ): T | undefined {
    const value = this.configService.get(key);
    if (value === undefined) {
      return undefined;
    }
    return parser(value);
  }

  get(key: string): string | number | boolean | undefined {
    return this.configService.get(key);
  }

  getAsNumberOrThrow(key: string): number {
    return this.getOrThrow(key, Number);
  }

  getAsNumber(key: string): number | undefined {
    return this.getOptional(key, Number);
  }

  getAsBooleanOrThrow(key: string): boolean {
    return this.getOrThrow(key, Boolean);
  }

  getAsBoolean(key: string): boolean | undefined {
    return this.getOptional(key, Boolean);
  }

  getAsStringOrThrow(key: string): string {
    return this.getOrThrow(key, String);
  }

  getAsString(key: string): string | undefined {
    return this.getOptional(key, String);
  }

  getAsArrayOrThrow(key: string): string[] {
    return this.getOrThrow(key, (value) => String(value).split(','));
  }

  getAsArray(key: string): string[] | undefined {
    return this.getOptional(key, (value) => String(value).split(','));
  }

  getAsObjectOrThrow(key: string): Record<string, unknown> {
    return this.getOrThrow(key, (value) => JSON.parse(String(value)));
  }

  getAsObject(key: string): Record<string, unknown> | undefined {
    return this.getOptional(key, (value) => JSON.parse(String(value)));
  }
}
