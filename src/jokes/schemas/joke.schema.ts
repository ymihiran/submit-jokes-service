import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JokeDocument = Joke & Document;

@Schema({ timestamps: true })
export class Joke {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  type: string;

  @Prop({ default: 'pending' })  
  status: string;  
}

export const JokeSchema = SchemaFactory.createForClass(Joke);
