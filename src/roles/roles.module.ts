import {  Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/roles.entity';

import { RolesRepository } from './roles.repository';

@Module({
  imports : [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [
    RolesService,
    RolesRepository
  ],
  exports : [RolesService]
})
export class RolesModule {
}
