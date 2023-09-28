import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {

    // Validacion de los campos de la la informacion
    
    @IsInt()
    @IsPositive()
    @Min(1)
    nro: number;

    @IsString()
    @MinLength(1)
    name: string;


}
