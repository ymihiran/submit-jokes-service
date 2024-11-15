import { Controller, Get, Post, Body, Query, HttpException, HttpStatus } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { CreateJokeDto } from './dto/create-joke.dto';

@Controller('jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @Post()
  async create(@Body() createJokeDto: CreateJokeDto) {
    try {
      const joke = await this.jokesService.create(createJokeDto);
      return { message: 'Joke submitted successfully', joke };
    } catch (error) {
      throw new HttpException('Failed to submit joke', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(@Query('type') type: string) {
    if (type) {
      return this.jokesService.findByType(type);
    }
    return this.jokesService.findAll();
  }


}
