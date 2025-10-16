import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { NotificationModule } from './notification/notification.module';
import { DisputeModule } from './dispute/dispute.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'kalenda',
      password: process.env.DB_PASSWORD || 'kalenda',
      database: process.env.DB_NAME || 'kalenda',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    NotificationModule,
    DisputeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}