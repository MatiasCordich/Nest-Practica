import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name, // .name simplemente es el DOCUMENTO, no la CLASE que creamos
        schema: PokemonSchema, // el nombre del schema que creamos y exportamos
      }
    ])
  ]
})
export class PokemonModule {}
