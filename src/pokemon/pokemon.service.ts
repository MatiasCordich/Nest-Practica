import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreatePokemonDto } from "./dto/create-pokemon.dto";
import { UpdatePokemonDto } from "./dto/update-pokemon.dto";
import { isValidObjectId, Model } from "mongoose";
import { Pokemon } from "./entities/pokemon.entity";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class PokemonService {
  constructor(
    // Inyectamos el modelo de la siguiente manera con el decorador InjectModel()
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto): Promise<Object> {

    // Nos aseguramos que a la hora de escribir el nombre del pokemon no tenga caracteres especiales como mayuscula
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {

      // Creamos nuestro nuevo pokemon a partir del modelo y lo creamos con el metodo que nos ofrece para los modelos
      const newPokemon = await this.pokemonModel.create(createPokemonDto);

      // Retornamos el nuevo pokeon creado
      return { msg: "Pokemon CREADO", newPokemon };

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(): Promise<Pokemon[]> {

    let pokemons: Pokemon[];

    // Primero buscamos nuestra lista de pokemones en la DB
    pokemons = await this.pokemonModel.find();

    // Si la lista esta vacia entonces devuelvo un mensaje de error
    if (pokemons.length == 0) throw new BadRequestException("No hay pokemones en la lista");
    
    // Caso contrario que me de la lista de pokemones
    return pokemons;
  }

  async findOne(id: string): Promise<Pokemon> {

    let pokemon: Pokemon;

    // Primero vamos a hacer unas capas de validaciones que seran las siguientes

    // Primero valido si mi id que le pase por parametro es un numero, si lo es quiero que me busques el pokemon por el id

    /**
     * En EL param paso un 2 por teclado
     * Ese 2 cuando lo escribo es un string
     * Lo transformo en un number poniendole el signo + adelante
     * Valido con isNan() que me dice si NO es un Numero
     * isNan(+2), COMO +2 ahora es un number si lo pongo en isNaN() me va a dar FALSE
     * Por eso pongo !isNan() para que me de TRUE y asi validar que el numero que pase por parametro, que era un string y se trasnformo en number, es un numero
     */

    if (!isNaN(+id)) pokemon = await this.pokemonModel.findOne({ nro: id });

    // Segundo, valido si existe el pokemon encontrado y si mi id es un MongoID, si lo es entonces busco por ID

    if (!pokemon && isValidObjectId(id)) {
      pokemon = await this.pokemonModel.findById(id);
    }

    // Tercero, valido si existe el pokemon encontrado y si existe por su nombre
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: id.toLowerCase().trim(),
      });
    }

    if (!pokemon) {
      // Si el pokemon buscado por id no existe mostarme un error

      if (!pokemon) throw new NotFoundException("El pokemon no existe");
    }

    return pokemon;
  }

  async update(term: string,updatePokemonDto: UpdatePokemonDto): Promise<Object> {

    // Primero buscamos el pokemon a actualizar
    let pokemon: Pokemon;

    pokemon = await this.findOne(term);

    // Si el pokemon a encontrar no existe mostarme un error

    if (!pokemon) throw new NotFoundException("El pokemon no existe");

    // Si el pokemon existe voy a modificar la data del DTO de la variable pokemon

    // Nos aseguramos que a la hora de escribir el nombre del pokemon no tenga caracteres especiales como mayuscula
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      // Actulizamos la data del pokemon encontrado
      await pokemon.updateOne(updatePokemonDto);

      // Creamos una variable que contenga la nueva informacion, para eso va a tener, todas la propiedades del objeto pokemon (convertidas en JSON) y voy a sobreescribirles las propiedades que tiene updatePokemonDto

      const updatedPokemon = { ...pokemon.toJSON(), ...updatePokemonDto };

      return { msg: "Pokemon MODIFICADO", updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string): Promise<Object> {
    // Primero buscamos el pokemon a eliminar mediante el id
    const pokemonToDelete = await this.findOne(id);

    // Si el pokemon a eliminar no existe, entonces mostarme un error

    if (!pokemonToDelete) throw new NotFoundException("El pokemon no existe");

    // Si existe entonces eliminalo

    const deletedPokemon = await pokemonToDelete.deleteOne();

    return { msg: "Pokemon ELIMINADO", deletedPokemon };
  }

  // Vamos a crear algunos metodos que nos sirven para poder modularizar el codigo

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException("El Pokemon ya existe");
    }

    throw new InternalServerErrorException("No se pudo crear el pokemon");
  }
}
