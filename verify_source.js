require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verify() {
  try {
    console.log('Fetching latest 3 investor registrations...\n');
    const investors = await prisma.investorRegistration.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3,
      select: {
        id: true,
        full_name: true,
        email: true,
        phone_number: true,
        source: true,
        investor_type: true,
        createdAt: true
      }
    });

    investors.forEach((inv, idx) => {
      console.log(`Record ${idx + 1}:`);
      console.log(`  ID: ${inv.id}`);
      console.log(`  Name: ${inv.full_name}`);
      console.log(`  Email: ${inv.email}`);
      console.log(`  Phone: ${inv.phone_number}`);
      console.log(`  Source: ${inv.source}`);
      console.log(`  Type: ${inv.investor_type}`);
      console.log(`  Created: ${inv.createdAt}\n`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

verify();
