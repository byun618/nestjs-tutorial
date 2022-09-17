import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // dto에 정의되지 않은 키들은 넘겨지지 않는다.
    }),
  )

  await app.listen(3000)
}
bootstrap()
