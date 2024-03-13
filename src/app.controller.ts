import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
  ) {}

  @Post(':topic')
  async publishToKafka(@Param('topic') topic: string, @Body() body: any) {
    console.log(`emitting to ${topic}`);
    await this.kafkaClient.emit(`${topic}`, body);
    return { message: 'Data published to Kafka topic' };
  }
}
