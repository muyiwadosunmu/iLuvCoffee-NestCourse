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

@Module({
  imports: [
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
