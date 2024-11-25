import { Controller, Get, Post, Body, Query, Param, HttpException, HttpStatus, Delete } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { CreateJokeDto } from './dto/create-joke.dto';

@Controller('jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  // Create a new joke
  @Post()
  async create(@Body() createJokeDto: CreateJokeDto) {
    try {
      const joke = await this.jokesService.create(createJokeDto);
      return { message: 'Joke submitted successfully', joke };
    } catch (error) {
      throw new HttpException('Failed to submit joke', HttpStatus.BAD_REQUEST);
    }
  }

  // Get all jokes or filter by type
  @Get()
  async findAll(@Query('type') type: string) {
    if (type) {
      return this.jokesService.findByType(type);
    }
    return this.jokesService.findAll();
  }

  // Get all available joke types (distinct types)
  @Get('types')
  async getTypes() {
    return this.jokesService.getJokeTypes();
  }

  // Get all pending jokes (status = 'pending')
  @Get('pending')
  async getPendingJokes() {
    try {
      const pendingJokes = await this.jokesService.findPending();
      if (pendingJokes.length === 0) {
        return { message: 'No pending jokes available' };
      }
      return pendingJokes;
    } catch (error) {
      throw new HttpException('Error fetching pending jokes', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Approve a joke by changing its status to 'approved'
  @Post(':id/approve')
  async approveJoke(@Param('id') id: string) {
    try {
      const approvedJoke = await this.jokesService.approveJoke(id);
      return { message: 'Joke approved successfully', joke: approvedJoke };
    } catch (error) {
      throw new HttpException('Error approving joke', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Reject a joke and delete it
  @Delete(':id')
  async rejectJoke(@Param('id') id: string) {
    try {
      await this.jokesService.rejectJoke(id);
      return { message: 'Joke rejected and deleted successfully' };
    } catch (error) {
      throw new HttpException('Error rejecting joke', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
