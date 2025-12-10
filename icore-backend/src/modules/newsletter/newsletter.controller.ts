import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { CreateNewsletterSubscriberDto } from './dto/createNewsletterSubscriber';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  @HttpCode(HttpStatus.CREATED)
  async subscribeNewsletter(@Body() data: CreateNewsletterSubscriberDto) {
    return await this.newsletterService.subscribeNewsletter(data);
  }

  @Get('subscribers')
  async getAllSubscribers() {
    return await this.newsletterService.getAllSubscribers();
  }

  @Get('subscribers/:email')
  async getSubscriberByEmail(@Param('email') email: string) {
    return await this.newsletterService.getSubscriberByEmail(email);
  }

  @Delete('subscribers/:id')
  @HttpCode(HttpStatus.OK)
  async deleteSubscriber(@Param('id') id: string) {
    return await this.newsletterService.deleteSubscriber(id);
  }

  @Patch('subscribers/:id')
  async updateSubscriber(
    @Param('id') id: string,
    @Body() data: Partial<CreateNewsletterSubscriberDto>,
  ) {
    return await this.newsletterService.updateSubscriber(id, data);
  }
}
