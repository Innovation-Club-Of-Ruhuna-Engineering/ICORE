import { ApiProperty } from '@nestjs/swagger';
import { ProjectRole } from '@prisma/client';

export class MemberResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: ProjectRole })
  role: ProjectRole;

  @ApiProperty()
  joinedAt: Date;

  @ApiProperty({ required: false })
  avatar?: string;
}

export class GuestMemberResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: ProjectRole })
  role: ProjectRole;

  @ApiProperty()
  joinedAt: Date;
}