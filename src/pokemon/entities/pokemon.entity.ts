// Las entities son las representacion de la informacion que vamos a grabar en la base de datos

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document{

    // Definimos las caracteristicas de nuestros atributos con el decorador @Prop()
    @Prop({
        unique: true,
        index: true
    })
    name: string;

    @Prop({
        unique: true,
        index: true
    })
    nro: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon)
