import { PrismaClient } from '@generated';
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

  // Create sample gallery images
  // const galleryImages = await Promise.all([
  //   prisma.gallery.upsert({
  //     where: { id: 'gallery-1' },
  //     update: {},
  //     create: {
  //       id: 'gallery-1',
  //       title: 'Students in Science Lab',
  //       description: 'Students conducting experiments in our state-of-the-art science laboratory',
  //       imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
  //       category: 'students',
  //       isPublished: true
  //     }
  //   }),
  //   prisma.gallery.upsert({
  //     where: { id: 'gallery-2' },
  //     update: {},
  //     create: {
  //       id: 'gallery-2',
  //       title: 'School Library',
  //       description: 'Our well-stocked library providing a quiet space for study and research',
  //       imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800',
  //       category: 'facilities',
  //       isPublished: true
  //     }
  //   }),
  //   prisma.gallery.upsert({
  //     where: { id: 'gallery-3' },
  //     update: {},
  //     create: {
  //       id: 'gallery-3',
  //       title: 'Sports Day Celebration',
  //       description: 'Annual sports day with students participating in various athletic events',
  //       imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
  //       category: 'activities',
  //       isPublished: true
  //     }
  //   }),
  //   prisma.gallery.upsert({
  //     where: { id: 'gallery-4' },
  //     update: {},
  //     create: {
  //       id: 'gallery-4',
  //       title: 'Art Exhibition',
  //       description: 'Student artwork displayed in our annual art exhibition',
  //       imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800',
  //       category: 'activities',
  //       isPublished: true
  //     }
  //   }),
  //   prisma.gallery.upsert({
  //     where: { id: 'gallery-5' },
  //     update: {},
  //     create: {
  //       id: 'gallery-5',
  //       title: 'Computer Lab',
  //       description: 'Modern computer lab equipped with latest technology for digital learning',
  //       imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800',
  //       category: 'facilities',
  //       isPublished: true
  //     }
  //   })
  // ]);
  // console.log('✅ Gallery images created:', galleryImages.length);

  // Create sample applicants
  const applicants = await Promise.all([
    prisma.applicant.create({
      data: {
        name: 'John Doe',
        phoneNumber: '+1234567890'
      }
    }),
    prisma.applicant.create({
      data: {
        name: 'Jane Smith',
        phoneNumber: '+1234567891'
      }
    }),
    prisma.applicant.create({
      data: {
        name: 'Mike Johnson',
        phoneNumber: '+1234567892'
      }
    })
  ]);
  console.log('✅ Sample applicants created:', applicants.length);

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