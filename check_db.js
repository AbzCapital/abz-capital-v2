const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    const investor = await prisma.investorRegistration.findFirst({
      where: {
        email: 'alusa@gmail.com'
      }
    });
    
    if (investor) {
      console.log('✅ DATA FOUND IN DATABASE:');
      console.log('ID:', investor.id);
      console.log('Name:', investor.full_name);
      console.log('Email:', investor.email);
      console.log('Type:', investor.investor_type);
      console.log('Amount:', investor.investment_amount);
      console.log('Status:', investor.status);
      console.log('Created:', investor.created_at);
    } else {
      console.log('❌ NO DATA FOUND - alusa@gmail.com is not in the database');
    }
  } catch (error) {
    console.error('Database error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
