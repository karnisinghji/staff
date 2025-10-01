const { Client } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: '../.env' });

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'contractor_worker_platform',
  user: process.env.DB_USER || 'platform_user',
  password: process.env.DB_PASSWORD || 'platform_password',
});

async function seedDatabase() {
  try {
    await client.connect();
    console.log('Connected to database for seeding');

    // Hash passwords
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Seed sample contractors
    const contractors = [
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'ABC Construction',
        email: 'contact@abcconstruction.com',
        phone: '+1-555-0101',
        location: 'New York, NY',
        companyName: 'ABC Construction LLC'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        name: 'Home Renovations Plus',
        email: 'info@homerenovations.com',
        phone: '+1-555-0102',
        location: 'Los Angeles, CA',
        companyName: 'Home Renovations Plus Inc'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        name: 'Smith Family Projects',
        email: 'john.smith@email.com',
        phone: '+1-555-0103',
        location: 'Chicago, IL',
        companyName: null
      }
    ];

    // Seed sample workers
    const workers = [
      {
        id: '550e8400-e29b-41d4-a716-446655440004',
        name: 'Mike Johnson',
        email: 'mike.carpenter@email.com',
        phone: '+1-555-0201',
        location: 'New York, NY',
        skillType: 'carpenter',
        experienceYears: 8,
        hourlyRate: 35.00,
        bio: 'Experienced carpenter specializing in custom furniture and home renovations.'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440005',
        name: 'Sarah Williams',
        email: 'sarah.plumber@email.com',
        phone: '+1-555-0202',
        location: 'Los Angeles, CA',
        skillType: 'plumber',
        experienceYears: 5,
        hourlyRate: 45.00,
        bio: 'Licensed plumber with expertise in residential and commercial plumbing systems.'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440006',
        name: 'Carlos Rodriguez',
        email: 'carlos.electrician@email.com',
        phone: '+1-555-0203',
        location: 'Chicago, IL',
        skillType: 'electrician',
        experienceYears: 12,
        hourlyRate: 50.00,
        bio: 'Master electrician with 12 years of experience in residential and industrial electrical work.'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440007',
        name: 'David Brown',
        email: 'david.painter@email.com',
        phone: '+1-555-0204',
        location: 'New York, NY',
        skillType: 'painter',
        experienceYears: 6,
        hourlyRate: 28.00,
        bio: 'Professional painter specializing in interior and exterior residential painting.'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440008',
        name: 'Lisa Chen',
        email: 'lisa.mason@email.com',
        phone: '+1-555-0205',
        location: 'Los Angeles, CA',
        skillType: 'mason',
        experienceYears: 10,
        hourlyRate: 40.00,
        bio: 'Skilled mason with expertise in brickwork, stonework, and concrete construction.'
      }
    ];

    // Insert contractors
    for (const contractor of contractors) {
      await client.query(`
        INSERT INTO users (id, role, name, email, phone, password_hash, location, is_verified)
        VALUES ($1, 'contractor', $2, $3, $4, $5, $6, true)
        ON CONFLICT (email) DO NOTHING
      `, [contractor.id, contractor.name, contractor.email, contractor.phone, hashedPassword, contractor.location]);

      await client.query(`
        INSERT INTO contractor_profiles (id, company_name)
        VALUES ($1, $2)
        ON CONFLICT (id) DO NOTHING
      `, [contractor.id, contractor.companyName]);
    }

    // Insert workers
    for (const worker of workers) {
      await client.query(`
        INSERT INTO users (id, role, name, email, phone, password_hash, location, is_verified)
        VALUES ($1, 'worker', $2, $3, $4, $5, $6, true)
        ON CONFLICT (email) DO NOTHING
      `, [worker.id, worker.name, worker.email, worker.phone, hashedPassword, worker.location]);

      await client.query(`
        INSERT INTO worker_profiles (id, skill_type, experience_years, hourly_rate, bio)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (id) DO NOTHING
      `, [worker.id, worker.skillType, worker.experienceYears, worker.hourlyRate, worker.bio]);
    }

    // Add some sample contacts
    await client.query(`
      INSERT INTO contacts (owner_id, contact_user_id)
      VALUES 
        ('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440004'),
        ('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440007'),
        ('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440005'),
        ('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001'),
        ('550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002')
      ON CONFLICT (owner_id, contact_user_id) DO NOTHING
    `);

    // Add some sample jobs
    await client.query(`
      INSERT INTO jobs (id, contractor_id, worker_id, job_type, title, description, location, estimated_duration, agreed_price, status)
      VALUES 
        (
          uuid_generate_v4(),
          '550e8400-e29b-41d4-a716-446655440001',
          '550e8400-e29b-41d4-a716-446655440004',
          'carpenter',
          'Kitchen Cabinet Installation',
          'Install custom kitchen cabinets in a modern home renovation project.',
          'Manhattan, NY',
          40,
          1400.00,
          'in_progress'
        ),
        (
          uuid_generate_v4(),
          '550e8400-e29b-41d4-a716-446655440002',
          NULL,
          'plumber',
          'Bathroom Plumbing Renovation',
          'Complete bathroom plumbing renovation including new fixtures and piping.',
          'Beverly Hills, CA',
          24,
          1200.00,
          'requested'
        ),
        (
          uuid_generate_v4(),
          '550e8400-e29b-41d4-a716-446655440003',
          '550e8400-e29b-41d4-a716-446655440006',
          'electrician',
          'Electrical Panel Upgrade',
          'Upgrade electrical panel to 200 amp service for home addition.',
          'Lincoln Park, Chicago',
          16,
          800.00,
          'completed'
        )
    `);

    console.log('✅ Database seeded successfully!');
    console.log('\n📧 Sample login credentials:');
    console.log('Contractors:');
    contractors.forEach(c => console.log(`  📧 ${c.email} | 🔑 password123`));
    console.log('\nWorkers:');
    workers.forEach(w => console.log(`  📧 ${w.email} | 🔑 password123`));

  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seedDatabase();