import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {

  transform(value: string, metadata: ArgumentMetadata) {
    
    // Validamos que el param (value) que le pasamos por parametro sea un MongoID

    // Si no es un MongoID que me devuelve un error
    if(!isValidObjectId(value)) throw new BadRequestException(`${value} no es un MongoID valido`)


    // Si lo es, que me devuelve el valor
    
    return value;
  }
}
