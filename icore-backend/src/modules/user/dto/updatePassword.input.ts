import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdatePasswordDto {
  @ApiProperty({ 
    description: 'Current password',
    example: 'currentpass123' 
  })
  @IsString()
  currentPassword: string;

  @ApiProperty({ 
    description: 'New password',
    example: 'newpass123' 
  })
  @IsString()
  newPassword: string;
}
