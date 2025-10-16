import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      walletAddress: '5a4XqoEJc8K9N2P1Q7R3S6T4U8V5W7X9Y2Z1A3B4C5D6E7F8G9H1J2K3L4M5',
      name: 'Alex Johnson',
      bio: 'Blockchain developer with 5+ years of experience',
      specialties: ['Blockchain', 'Smart Contracts', 'Web3'],
      rating: 4.9,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      walletAddress: '8b7YrPdKfL3M9N1Q5S2T6U4V7W3X8Y1Z4A2B5C6D7E8F9G1H2J3K4L5M6N7',
      name: 'Maria Garcia',
      bio: 'UX Designer specializing in Web3 interfaces',
      specialties: ['UI/UX Design', 'Web3 Design', 'Figma'],
      rating: 4.8,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      walletAddress: '3c8ZsQeLfM4N8P2R6T1U5V3W7X9Y2Z1A4B5C6D7E8F9G1H2J3K4L5M6N7O8',
      name: 'David Chen',
      bio: 'AI Researcher focused on machine learning applications',
      specialties: ['Machine Learning', 'AI Research', 'Data Science'],
      rating: 4.95,
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });