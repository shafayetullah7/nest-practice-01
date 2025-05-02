import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './modules/cats/cats.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { SampleController } from './sample.controller';
import { ZodValidationPipe } from './common/pipes/zod.validation.pipe';

@Module({
  imports: [CatsModule],
  controllers: [AppController, SampleController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
