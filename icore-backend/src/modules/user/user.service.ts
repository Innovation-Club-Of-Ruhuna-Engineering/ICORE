import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/config/database/database.service';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}


  async create(createUserDto: Prisma.UserCreateInput) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.databaseService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword, 
      }
    })
  }

  async findAll() {
    return this.databaseService.user.findMany({});
  }

  async findOneByEmail(email: string) {
    return this.databaseService.user.findUnique({
      where: { email },
    });
  }

  async findOneById(id: string) {
    return this.databaseService.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: { id }, 
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.user.delete({
      where: { id },
    });
  }
}
