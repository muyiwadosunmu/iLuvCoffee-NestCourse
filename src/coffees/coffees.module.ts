import { Injectable, Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity/flavor.entity';
import { Event } from '../events/entities/event.entity/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { DataSource } from 'typeorm';

/**We added this Mock Service to implement value based token  */
class MockCoffeesService {}
/**================ */

/**To implement useClass Token */
class ConfigService {}
class DevelopmentConfigServive {}
class ProductionConfigService {}

/**To implement useFactory --> Allows us to create  providers dynamicallu*/

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    return ['buddy brew', 'nescafe'];
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  // providers: [CoffeesService],
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      useFactory: async (connection: DataSource): Promise<string[]> => {
        // const coffeeBrands = await connection.quert('SELECT * ...)
        const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
        console.log('[!] Async Factory');
        return coffeeBrands;
      },
      inject: [DataSource],
    },
    // {
    //   provide: COFFEE_BRANDS,
    //   useFactory: (brandsFactory: CoffeeBrandsFactory) =>
    //     brandsFactory.create(),
    //   inject: [CoffeeBrandsFactory],
    // },
    // {
    //     provide: CoffeesService,
    //     useValue: new MockCoffeesService(), This would inject MockCoffeeService into our application anytime e call
    //     provide: 'COFFEE_BRANDS', useValue:['buddy brew','nescafe] ==> we could pass in non class based values as well
    /* provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigServive
          : ProductionConfigService, */
    // },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
