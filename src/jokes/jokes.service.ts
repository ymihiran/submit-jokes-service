import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Joke, JokeDocument } from './schemas/joke.schema';
import { Model } from 'mongoose';
import { CreateJokeDto } from './dto/create-joke.dto';

@Injectable()
export class JokesService {
  constructor(@InjectModel(Joke.name) private jokeModel: Model<JokeDocument>) {}

  async create(createJokeDto: CreateJokeDto): Promise<Joke> {
    const createdJoke = new this.jokeModel(createJokeDto);
    return createdJoke.save();
  }

  async findAll(): Promise<Joke[]> {
    return this.jokeModel.find().exec();
  }

  async findByType(type: string): Promise<Joke[]> {
    return this.jokeModel.find({ type }).exec();
  }

  async findPending(): Promise<Joke[]> {
    return this.jokeModel.find({ status: 'pending' }).exec();
  }

  async getJokeTypes(): Promise<string[]> {
    return this.jokeModel.distinct('type').exec();
  }

  async approveJoke(id: string): Promise<Joke> {
    const joke = await this.jokeModel.findById(id);
    if (!joke) throw new Error('Joke not found');
    joke.status = 'approved';
    return joke.save();
  }

  async rejectJoke(id: string): Promise<void> {
    const joke = await this.jokeModel.findById(id);
    if (!joke) throw new Error('Joke not found');
    await joke.deleteOne();
  }
}
