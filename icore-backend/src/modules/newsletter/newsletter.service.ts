import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/config/database/database.service';
import { CreateNewsletterSubscriberDto } from './dto/createNewsletterSubscriber';

@Injectable()
export class NewsletterService {
  constructor(private readonly prisma: DatabaseService) {}

  async subscribeNewsletter(data: CreateNewsletterSubscriberDto) {
    return await this.prisma.newsletterSubscriber.create({
      data,
    });
  }

  async getAllSubscribers() {
    return await this.prisma.newsletterSubscriber.findMany({
      orderBy: {
        subscribedAt: 'desc',
      },
    });
  }

  async getSubscriberByEmail(email: string) {
    return await this.prisma.newsletterSubscriber.findUnique({
      where: { email },
    });
  }

  async deleteSubscriber(id: string) {
    return await this.prisma.newsletterSubscriber.delete({
      where: { id },
    });
  }

  async updateSubscriber(
    id: string,
    data: Partial<CreateNewsletterSubscriberDto>,
  ) {
    return await this.prisma.newsletterSubscriber.update({
      where: { id },
      data,
    });
  }
}
