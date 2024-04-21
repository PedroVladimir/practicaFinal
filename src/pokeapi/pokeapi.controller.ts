import { Controller, Get, Param } from '@nestjs/common';
import { PokeapiService } from './pokeapi.service';

@Controller('pokeapi')
export class PokeapiController {
    constructor (private readonly pokeapiService : PokeapiService ){}

    @Get(':pokemon')
    async getPokemonNombre(@Param('pokemon') pokemon : string) : Promise<any> {
        return this.pokeapiService.getPokemon(pokemon);
    }
}