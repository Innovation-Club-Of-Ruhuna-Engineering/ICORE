import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma'; // Adjust the import path based on your project structure

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit{
    async onModuleInit() {
        await this.$connect();
    }
}
