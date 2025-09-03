import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@school.com',
      password: hashedPassword,
      role: 'super_admin'
    }
  });
  console.log('✅ Admin user created:', admin.username);

  // Create sample news articles
  const newsArticles = await Promise.all([
    prisma.news.upsert({
      where: { slug: 'welcome-to-new-academic-year' },
      update: {},
      create: {
        title: 'Welcome to the New Academic Year',
        content: 'We are excited to welcome all students back for another amazing academic year. This year promises to be filled with learning, growth, and new opportunities.',
        slug: 'welcome-to-new-academic-year',
        imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9e1?w=800',
        tag: 'announcement',
        author: 'School Principal',
        isPublished: true
      }
    }),
    prisma.news.upsert({
      where: { slug: 'science-fair-2024' },
      update: {},
      create: {
        title: 'Annual Science Fair 2024',
        content: 'Our annual science fair will showcase innovative projects from students across all grades. Join us for an evening of discovery and creativity.',
        slug: 'science-fair-2024',
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
        tag: 'event',
        author: 'Science Department',
        isPublished: true
      }
    }),
    prisma.news.upsert({
      where: { slug: 'sports-championship-victory' },
      update: {},
      create: {
        title: 'School Team Wins Regional Championship',
        content: 'Congratulations to our school team for winning the regional sports championship! Their dedication and teamwork have made us all proud.',
        slug: 'sports-championship-victory',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
        tag: 'achievement',
        author: 'Sports Department',
        isPublished: true
      }
    })
  ]);
  console.log('✅ News articles created:', newsArticles.length);

  // Create sample events
  const events = await Promise.all([
    prisma.event.upsert({
      where: { slug: 'parent-teacher-conference' },
      update: {},
      create: {
        title: 'Parent-Teacher Conference',
        date: new Date('2024-12-15T14:00:00Z'),
        description: 'Annual parent-teacher conference to discuss student progress and development.',
        expectedAttendance: '200+',
        location: 'School Auditorium',
        slug: 'parent-teacher-conference',
        imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800'
      }
    }),
    prisma.event.upsert({
      where: { slug: 'graduation-ceremony-2024' },
      update: {},
      create: {
        title: 'Graduation Ceremony 2024',
        date: new Date('2024-06-20T16:00:00Z'),
        description: 'Celebrating the achievements of our graduating class of 2024.',
        expectedAttendance: '500+',
        location: 'School Grounds',
        slug: 'graduation-ceremony-2024',
        imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9e1?w=800'
      }
    }),
    prisma.event.upsert({
      where: { slug: 'cultural-festival' },
      update: {},
      create: {
        title: 'Annual Cultural Festival',
        date: new Date('2024-05-10T10:00:00Z'),
        description: 'A celebration of diverse cultures through music, dance, and art performances.',
        expectedAttendance: '300+',
        location: 'School Auditorium',
        slug: 'cultural-festival',
        imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800'
      }
    })
  ]);
  console.log('✅ Events created:', events.length);

  // Create sample images
  const images = await Promise.all([
    prisma.image.upsert({
      where: { title: 'School Building' },
      update: {},
      create: {
        title: 'School Building',
        imageUrl: '/uploads/school-building.jpg',
        fileSize: 134000,
        mimeType: 'image/jpeg',
        usedAt: ['home', 'about'],
        isDefault: true
      }
    }),
    prisma.image.upsert({
      where: { title: 'Students in Classroom' },
      update: {},
      create: {
        title: 'Students in Classroom',
        imageUrl: '/uploads/students-classroom.jpg',
        fileSize: 79000,
        mimeType: 'image/jpeg',
        usedAt: ['students', 'academics', 'gallery']
      }
    }),
    prisma.image.upsert({
      where: { title: 'School Logo' },
      update: {},
      create: {
        title: 'School Logo',
        imageUrl: '/uploads/school-logo.jpg',
        fileSize: 81000,
        mimeType: 'image/jpeg',
        usedAt: ['header', 'footer']
      }
    }),
    prisma.image.upsert({
      where: { title: 'Sports Activities' },
      update: {},
      create: {
        title: 'Sports Activities',
        imageUrl: '/uploads/sports-activities.jpg',
        fileSize: 69000,
        mimeType: 'image/jpeg',
        usedAt: ['sports', 'activities']
      }
    }),
    prisma.image.upsert({
      where: { title: 'Transportation Services' },
      update: {},
      create: {
        title: 'Transportation Services',
        imageUrl: '/uploads/transportation.jpg',
        fileSize: 133000,
        mimeType: 'image/jpeg',
        usedAt: ['transportation', 'services']
      }
    })
  ]);
  console.log('✅ Sample images created:', images.length);

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
