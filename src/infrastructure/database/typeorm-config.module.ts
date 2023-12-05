import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeormMysqlConfig } from './typeorm-mysql.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeormMysqlConfig,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
  ],
})
export class TypeormConfigModule {}
