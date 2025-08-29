import { PrismaClient } from '../app/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.car.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminPassword = await bcrypt.hash('admin', 10);
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'mirebhai@gmail.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Create some test users (with hashed passwords)
  const user1Password = await bcrypt.hash('password123', 10);
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      password: user1Password,
      role: 'USER',
    },
  });

  const user2Password = await bcrypt.hash('password123', 10);
  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: user2Password,
      role: 'USER',
    },
  });

  // Seed cars using images from cars-listing-6 and random Nepali prices
  const carImages = [
    'car-1.png', 'car-2.png', 'car-3.png', 'car-4.png', 'car-5.png',
    'car-6.png', 'car-7.png', 'car-8.png', 'car-9.png', 'car-10.png',
    'car-11.png', 'car-12.png', 'car-13.png', 'car-14.png', 'car-15.png',
    'car-16.png', 'car-17.png', 'car-18.png', 'car-19.png', 'car-20.png',
  ];

  const makes = ['Toyota', 'Honda', 'Hyundai', 'Suzuki', 'Kia', 'Ford', 'Mahindra', 'Tata', 'Nissan', 'Volkswagen'];
  const models = ['Corolla', 'Civic', 'i20', 'Swift', 'Seltos', 'Figo', 'Scorpio', 'Nexon', 'Magnite', 'Polo'];
  const types = ['Sedan', 'Hatchback', 'SUV', 'Van', 'Pickup', 'Crossover'];
  const transmissions = ['Automatic', 'Manual'];
  const locations = ['Kathmandu', 'Pokhara', 'Chitwan', 'Dharan', 'Biratnagar', 'Butwal', 'Hetauda', 'Nepalgunj'];
  const descriptions = [
    'Spacious and comfortable, perfect for family trips.',
    'Fuel efficient and easy to drive in the city.',
    'Ideal for both city and highway journeys.',
    'Modern features and a smooth ride.',
    'Great ground clearance for all road conditions.',
    'Perfect for group travel and long tours.',
    'Reliable and affordable transportation.',
    'Premium interiors and advanced safety features.'
  ];
  const featuresList = [
    ['Bluetooth', 'Air Conditioning', 'GPS', 'USB Charger'],
    ['Air Conditioning', 'Music System', 'Rear Camera'],
    ['Power Steering', 'Power Windows', 'ABS'],
    ['Touchscreen', 'Android Auto', 'Apple CarPlay'],
    ['Leather Seats', 'Sunroof', 'Alloy Wheels'],
    ['Fog Lights', 'Reverse Parking Sensor', 'Cruise Control'],
    ['Navigation', 'Heated Seats', 'Keyless Entry'],
    ['Rear AC Vents', 'Hill Assist', 'Traction Control']
  ];

  function randomElement<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
  function randomInt(min: number, max: number): number { return Math.floor(Math.random() * (max - min + 1)) + min; }

  const cars = carImages.map((img, idx) => {
    const make = randomElement(makes);
    const model = randomElement(models);
    const year = randomInt(2018, 2024);
    const type = randomElement(types);
    const transmission = randomElement(transmissions);
    const seats = randomInt(4, 8);
    const pricePerDay = randomInt(0, 65000);
    const location = randomElement(locations);
    const description = randomElement(descriptions);
    const features = randomElement(featuresList);
    return {
      make,
      model,
      year,
      type,
      transmission,
      seats,
      pricePerDay,
      location,
      imageUrl: `/assets/imgs/cars-listing/cars-listing-6/${img}`,
      description,
      features,
    };
  });


  // Add cars to database
  for (const carData of cars) {
    await prisma.car.create({
      data: carData,
    });
  }

  console.log('Database has been seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
