import { Module } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { JokesController } from './jokes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Joke, JokeSchema } from './schemas/joke.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Joke.name, schema: JokeSchema }])],
  controllers: [JokesController],
  providers: [JokesService],
})
export class JokesModule {}
