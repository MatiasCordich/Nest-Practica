import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configOptions } from './config/config.options';
import { CommonModule } from './common/common.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    PokemonModule,
    ConfigModule .forRoot(configOptions),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory:async (ConfigService:ConfigService) => {
        const mongoConfig = ConfigService.get('mongo')

        return { uri: mongoConfig.uri}
      }
    }),
    CommonModule
  ],
})
export class AppModule {}
