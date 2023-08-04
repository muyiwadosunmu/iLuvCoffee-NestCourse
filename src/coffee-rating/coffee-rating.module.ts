import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { DatabseModule } from 'src/databse/databse.module';

@Module({
  imports: [
    DatabseModule.register({
      type: 'postgres',
      host: 'localhost',
      password: 'password',
      port: 5432,
      synchronize: true, // Disable for production
    }),
    CoffeesModule,
  ],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
