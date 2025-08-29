const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Clear existing data
  console.log('Clearing existing data...');
  await prisma.booking.deleteMany();
  await prisma.car.deleteMany();
  await prisma.user.deleteMany();

  // Create some test users
  console.log('Creating test users...');
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      password: '$2b$10$EXAMPLEHASH', // In a real app, use bcrypt to hash passwords
      phone: '+977-9841000001',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: '$2b$10$EXAMPLEHASH',
      phone: '+977-9841000002',
    },
  });

  // Create some cars
  console.log('Creating cars...');
  const cars = [
    {
      make: 'Toyota',
      model: 'Corolla',
      year: 2022,
      type: 'Sedan',
      transmission: 'Automatic',
      seats: 5,
      pricePerDay: 10000,
      location: 'Kathmandu',
      imageUrl: '/images/cars/car-1.jpg',
      description: 'Comfortable and fuel-efficient sedan perfect for city driving.',
      features: JSON.stringify(['Bluetooth', 'Air Conditioning', 'GPS', 'USB Charger']),
    },
    {
      make: 'Suzuki',
      model: 'Swift',
      year: 2021,
      type: 'Hatchback',
      transmission: 'Manual',
      seats: 5,
      pricePerDay: 8000,
      location: 'Pokhara',
      imageUrl: '/images/cars/car-2.jpg',
      description: 'Compact and agile, great for navigating narrow streets.',
      features: JSON.stringify(['Air Conditioning', 'Power Steering', 'CD Player']),
    },
    {
      make: 'Hyundai',
      model: 'Creta',
      year: 2023,
      type: 'SUV',
      transmission: 'Automatic',
      seats: 5,
      pricePerDay: 15000,
      location: 'Chitwan',
      imageUrl: '/images/cars/car-3.jpg',
      description: 'Spacious SUV with great ground clearance for all road conditions.',
      features: JSON.stringify(['Bluetooth', 'Air Conditioning', 'GPS', 'Rear Camera', 'Sunroof']),
    },
    {
      make: 'Toyota',
      model: 'Hiace',
      year: 2022,
      type: 'Van',
      transmission: 'Manual',
      seats: 12,
      pricePerDay: 20000,
      location: 'Dharan',
      imageUrl: '/images/cars/car-4.jpg',
      description: 'Perfect for large groups or family trips.',
      features: JSON.stringify(['Air Conditioning', 'Power Windows', 'Music System']),
    },
    {
      make: 'Kia',
      model: 'Seltos',
      year: 2023,
      type: 'SUV',
      transmission: 'Automatic',
      seats: 5,
      pricePerDay: 18000,
      location: 'Biratnagar',
      imageUrl: '/images/cars/car-5.jpg',
      description: 'Premium SUV with modern features and comfortable ride.',
      features: JSON.stringify(['Leather Seats', 'Sunroof', 'Touchscreen', 'Android Auto', 'Apple CarPlay']),
    },
  ];

  // Add cars to database
  for (const carData of cars) {
    await prisma.car.create({
      data: carData,
    });
  }

  console.log('Database has been seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
