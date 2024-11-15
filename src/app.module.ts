import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JokesModule } from './jokes/jokes.module';
import { ConfigModule } from '@nestjs/config';
import { Joke, JokeSchema } from './jokes/schemas/joke.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    JokesModule,
    MongooseModule.forFeature([{ name: Joke.name, schema: JokeSchema }]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
