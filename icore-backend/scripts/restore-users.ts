import { PrismaClient, Role, Status, User } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

interface UserData extends Omit<User, 'dateOfBirth' | 'createdAt' | 'updatedAt'> {
  dateOfBirth?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

const prisma = new PrismaClient();

async function restoreUsers() {
  try {
    // Try to read JSON file first
    const jsonPath = path.join(__dirname, '../data/users.json');
    let users;

    try {
      const jsonData = fs.readFileSync(jsonPath, 'utf8');
      users = JSON.parse(jsonData);
    } catch (jsonError) {
      // If JSON fails, try CSV
      console.log('JSON file not found or invalid, trying CSV...');
      const csvPath = path.join(__dirname, '../data/users.csv');
      const csvData = fs.readFileSync(csvPath, 'utf8');
      
      // Parse CSV (simple implementation - adjust based on your CSV structure)
      users = csvData
        .split('\n')
        .slice(1) // Skip header row
        .filter(line => line.trim())
        .map(line => {
          const [
            id, email, username, password, firstName, lastName, contactNumber,
            gender, department, batch, pitch, regNumber, refreshToken,
            bio, title, location, dateOfBirth, company, institution,
            fieldOfStudy, graduationYear, yearsOfExperience, avatarUrl,
            coverImageUrl, website, github, linkedin, youtube, instagram,
            twitter, experiences, skills, role, status, createdAt, updatedAt
          ] = line.split(',').map(field => field.trim());

          return {
            id,
            email,
            username,
            password,
            firstName,
            lastName,
            contactNumber: contactNumber || null,
            gender: gender || null,
            department: department || null,
            batch: batch || null,
            pitch: pitch || null,
            regNumber: regNumber || null,
            refreshToken: refreshToken || null,
            bio: bio || null,
            title: title || null,
            location: location || null,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
            company: company || null,
            institution: institution || null,
            fieldOfStudy: fieldOfStudy || null,
            graduationYear: graduationYear || null,
            yearsOfExperience: yearsOfExperience ? parseInt(yearsOfExperience) : null,
            avatarUrl: avatarUrl || null,
            coverImageUrl: coverImageUrl || null,
            website: website || null,
            github: github || null,
            linkedin: linkedin || null,
            youtube: youtube || null,
            instagram: instagram || null,
            twitter: twitter || null,
            experiences: experiences ? JSON.parse(experiences) : null,
            skills: skills ? JSON.parse(skills) : null,
            role: role || 'GENERAL',
            status: status || 'PENDING',
            createdAt: createdAt ? new Date(createdAt) : new Date(),
            updatedAt: updatedAt ? new Date(updatedAt) : new Date(),
          };
        });
    }

    // Create users in batches
    const batchSize = 5;
    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);
      await Promise.all(
        batch.map((user: UserData) => {
          const { experiences, skills, ...rest } = user;
          return prisma.user.create({
            data: {
              ...rest,
              dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : null,
              createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
              updatedAt: user.updatedAt ? new Date(user.updatedAt) : new Date(),
              role: (user.role as Role) || 'GENERAL',
              status: (user.status as Status) || 'PENDING',
              experiences: experiences ? JSON.parse(experiences as string) : null,
              skills: skills ? JSON.parse(skills as string) : null
            }
          });
        })
      );
      console.log(`Restored users ${i + 1} to ${Math.min(i + batchSize, users.length)}`);
    }

    console.log('Successfully restored all users!');
  } catch (error) {
    console.error('Error restoring users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

restoreUsers();
