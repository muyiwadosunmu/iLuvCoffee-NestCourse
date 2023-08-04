import { DynamicModule, Module } from '@nestjs/common';
import { DataSourceOptions, DataSource } from 'typeorm';
import { createConnection } from 'typeorm';

@Module({})
export class DatabseModule {
  static register(options: DataSourceOptions): DynamicModule {
    return {
      module: DatabseModule,
      providers: [
        {
          provide: 'CONNECTION',
          useValue: createConnection(options),
        },
      ],
    };
  }
}
