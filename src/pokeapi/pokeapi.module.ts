import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PokeapiController } from './pokeapi.controller';
import { PokeapiService } from './pokeapi.service';
import { LoggerMiddleware } from '../middleware/logger.middleware';

@Module({
  controllers: [PokeapiController],
  providers: [PokeapiService]
})
export class PokeapiModule implements NestModule{
  configure(consumer : MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('pokeapi')
  }
}
