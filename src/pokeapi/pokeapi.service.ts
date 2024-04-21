import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PokeapiService {

    private readonly url = 'https://pokeapi.co/api/v2';

    async getPokemon(name:string):Promise<any>{
      try {
        const response = await axios.get(`${this.url}/pokemon/${name}`);
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error('Error en la conexión');
      }
    }

    async getAllPokemon(limit : number):Promise<any>{
      try {
        const response = await axios.get(`${this.url}/pokemon?limit=${limit}`)
        return response.data.results;
      } catch (error) {
        console.error(error);
        throw new Error('Error en la conexión');
      }
    }

}
