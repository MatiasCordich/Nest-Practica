import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Este metodo nos sirve para darle un prefijo a nuestra url que ira primero despues de los endpoints seria http//localhost:3000/api/v1
  app.setGlobalPrefix('api/v1')

  // Usar pipes globales

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )
  
  await app.listen(3000);
}
bootstrap();
