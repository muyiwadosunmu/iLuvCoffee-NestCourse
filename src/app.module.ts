import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { CoffeesService } from './coffees/coffees.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { type } from 'os';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabseModule } from './databse/databse.module';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot(
      //   {
      //   //If we're hosting on heroku all our congig could be stored
      //   ignoreEnvFile: true,
      // }
      {
        validationSchema: Joi.object({
          DATABASE_HOST: Joi.required(),
          DATABASE_PORT: Joi.number().default(5432), //To test we removed the databse_host
        }),
      },
    ),
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true, //Disable this on production
    }),
    CoffeeRatingModule,
    DatabseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
