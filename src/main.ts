import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);
  // TODO: 프로그램 
  

  const config = new DocumentBuilder()
  .setTitle('핸드폰 인증')
  .setDescription('핸드폰 인증 API 문서')
  .setVersion('1.0')
  .addTag('phone')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
)

  await app.listen(process.env.PORT || 8001);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
