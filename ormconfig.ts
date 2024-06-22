import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'NextAuthDB',
  synchronize: false,
  logging: true, 
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'], 
  subscribers: ['dist/subscribers/*{.ts,.js}'], 
};

export default ormconfig;
