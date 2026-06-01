const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    const investors = await prisma.investorRegistration.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    });

    if (investors.length > 0) {
      console.log('✅ RECENT INVESTOR RECORDS:');
      investors.forEach((investor, index) => {
        console.log(`\n--- Record ${index + 1} ---`);
        console.log('ID:', investor.id);
        console.log('Name:', investor.full_name);
        console.log('Email:', investor.email);
        console.log('Phone:', investor.phone_number);
        console.log('Source:', investor.source);
        console.log('Created:', investor.createdAt);
      });
    } else {
      console.log('❌ NO DATA FOUND IN DATABASE');
    }
  } catch (error) {
    console.error('Database error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
