import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Este metodo nos sirve para darle un prefijo a nuestra url que ira primero despues de los endpoints seria http//localhost:3000/api/v1
  app.setGlobalPrefix('api/v1')
  
  await app.listen(3000);
}
bootstrap();
