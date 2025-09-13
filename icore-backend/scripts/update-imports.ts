import { execSync } from 'child_process';
import * as fs from 'fs';

const files = [
  'src/modules/project/dto/createProject.input.ts',
  'src/modules/project/project.service.ts',
  'src/modules/project/project.controller.ts',
  'src/modules/project/dto/updateProject.input.ts',
  'src/modules/project/dto/public-project.response.ts',
  'src/modules/project/dto/project-response.ts',
  'src/modules/project/dto/projectMembers.dto.ts',
  'src/modules/auth/auth.controller.ts',
  'src/modules/auth/auth.service.ts',
  'src/modules/user/dto/user-response.ts',
  'src/modules/user/user.controller.ts',
  'src/modules/user/user.service.ts'
];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const newContent = content.replace(/from ['"]generated\/prisma['"]/g, "from '@prisma/client'");
  fs.writeFileSync(file, newContent);
});
