import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'sql3.freesqldatabase.com',
  port: 3306,
  username: 'sql3715468',
  password: 'iECPDx16YJ',
  database: 'sql3715468',
  synchronize: true,
  logging: true, 
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'], 
  subscribers: ['dist/subscribers/*{.ts,.js}'], 
};

export default ormconfig;
