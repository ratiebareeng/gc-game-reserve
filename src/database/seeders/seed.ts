import 'reflect-metadata';
import { AppDataSource } from '../../config/database';
import { ActivityType } from '../entities/activity-type.entity';
import { Animal } from '../entities/animal.entity';
import { PointOfInterest } from '../entities/poi.entity';
import { AnimalCategory, ConservationStatus, DietType, POIType } from '../../config/constants';

const seedDatabase = async () => {
  try {
    // Initialize database connection
    await AppDataSource.initialize();
    console.log('✅ Database connected');

    // Seed Activity Types
    const activityTypeRepo = AppDataSource.getRepository(ActivityType);
    const activityTypesCount = await activityTypeRepo.count();

    if (activityTypesCount === 0) {
      const activityTypes = [
        {
          name: 'Game Viewing',
          description: 'Entry for wildlife observation',
          price_per_person: 10.0,
          price_per_vehicle: 10.0,
          is_active: true,
        },
        {
          name: 'Picnic/Braai & Game Viewing',
          description: 'Entry with picnic and braai facilities',
          price_per_person: 15.0,
          price_per_vehicle: 10.0,
          is_active: true,
        },
      ];

      await activityTypeRepo.save(activityTypes);
      console.log('✅ Activity types seeded');
    }

    // Seed Animals
    const animalRepo = AppDataSource.getRepository(Animal);
    const animalsCount = await animalRepo.count();

    if (animalsCount === 0) {
      const animals = [
        {
          common_name: 'Zebra',
          scientific_name: 'Equus quagga',
          category: AnimalCategory.MAMMAL,
          description:
            'Zebras are iconic African herbivores known for their distinctive black and white striped coat. Each zebra has a unique stripe pattern, much like human fingerprints. They are highly social animals that live in family groups called harems.',
          habitat: 'Grasslands and savannas',
          diet: DietType.HERBIVORE,
          conservation_status: ConservationStatus.NEAR_THREATENED,
          interesting_facts: [
            'No two zebras have the exact same stripe pattern',
            'They can run up to 65 km/h to escape predators',
            'Zebras sleep standing up',
            'Their stripes may help confuse predators and regulate body temperature',
          ],
          average_lifespan: '20-25 years',
          average_weight: '350-450 kg',
          is_featured: true,
          display_order: 1,
        },
        {
          common_name: 'Ostrich',
          scientific_name: 'Struthio camelus',
          category: AnimalCategory.BIRD,
          description:
            "The ostrich is the world's largest living bird species. Unable to fly, they are powerful runners with long, strong legs that can deliver dangerous kicks. Their large eyes are the biggest of any land animal.",
          habitat: 'Open grasslands and semi-arid areas',
          diet: DietType.OMNIVORE,
          conservation_status: ConservationStatus.LEAST_CONCERN,
          interesting_facts: [
            'Can run up to 70 km/h, making them the fastest bird on land',
            'Their eggs are the largest of any bird species, weighing up to 1.5 kg',
            'They have the largest eyes of any land animal (5 cm in diameter)',
            'Contrary to myth, ostriches do not bury their heads in sand',
          ],
          average_lifespan: '40-45 years',
          average_weight: '100-160 kg (males), 90-120 kg (females)',
          is_featured: true,
          display_order: 2,
        },
        {
          common_name: 'Warthog',
          scientific_name: 'Phacochoerus africanus',
          category: AnimalCategory.MAMMAL,
          description:
            'Warthogs are members of the pig family with distinctive facial warts and impressive tusks. Despite their tough appearance, they are generally peaceful animals that prefer to flee rather than fight. They often kneel on their front legs while feeding.',
          habitat: 'Grasslands, savannas, and woodlands',
          diet: DietType.OMNIVORE,
          conservation_status: ConservationStatus.LEAST_CONCERN,
          interesting_facts: [
            'They use abandoned aardvark burrows for shelter and raising young',
            'When threatened, they back into their burrow with their tusks facing outward',
            'Baby warthogs are called piglets',
            'Their facial warts are made of cartilage and may help cushion blows during fights',
          ],
          average_lifespan: '12-18 years',
          average_weight: '60-150 kg',
          is_featured: true,
          display_order: 3,
        },
        {
          common_name: 'Red-billed Quelea',
          scientific_name: 'Quelea quelea',
          category: AnimalCategory.BIRD,
          description:
            "The red-billed quelea is considered the world's most abundant wild bird species. These small, sparrow-like birds form massive flocks that can number in the millions. During breeding season, males develop bright red beaks and plumage.",
          habitat: 'Grasslands and agricultural areas',
          diet: DietType.OMNIVORE,
          conservation_status: ConservationStatus.LEAST_CONCERN,
          interesting_facts: [
            'Flocks can contain millions of birds',
            'They are often called "feathered locusts" due to their impact on grain crops',
            'Estimated population exceeds 1.5 billion birds',
            'They can drink water very quickly, taking only 3 seconds',
          ],
          average_lifespan: '2-3 years',
          average_weight: '15-26 grams',
          is_featured: false,
          display_order: 4,
        },
      ];

      await animalRepo.save(animals);
      console.log('✅ Animals seeded');
    }

    // Seed Points of Interest
    const poiRepo = AppDataSource.getRepository(PointOfInterest);
    const poisCount = await poiRepo.count();

    if (poisCount === 0) {
      const pois = [
        {
          name: 'Main Gate',
          type: POIType.GATE,
          description: 'Primary entrance to Gaborone Game Reserve. Check-in and information point.',
          latitude: -24.6542,
          longitude: 25.9087,
          facilities: ['parking', 'restroom', 'information_center', 'ticket_office'],
          best_time_to_visit: 'Opening hours: 6:00 AM - 6:00 PM',
          is_active: true,
          display_order: 1,
        },
        {
          name: 'Kgale Viewpoint',
          type: POIType.VIEWPOINT,
          description: 'Elevated viewpoint offering panoramic views of the reserve. Popular spot for zebra and ostrich sightings.',
          latitude: -24.66,
          longitude: 25.91,
          facilities: ['parking', 'seating', 'shade'],
          best_time_to_visit: 'Early morning (6:00-9:00 AM) and late afternoon (4:00-6:00 PM)',
          accessibility_notes: 'Moderate walk from parking area (200m)',
          common_animals: [1, 2], // Zebra and Ostrich IDs
          is_active: true,
          display_order: 2,
        },
        {
          name: 'Watering Hole',
          type: POIType.WATERING_HOLE,
          description: 'Natural watering hole attracting various wildlife throughout the day. Excellent for photography.',
          latitude: -24.658,
          longitude: 25.912,
          facilities: ['parking', 'seating', 'bird_hide'],
          best_time_to_visit: 'All day, especially during hot afternoon hours',
          common_animals: [1, 3], // Zebra and Warthog IDs
          is_active: true,
          display_order: 3,
        },
        {
          name: 'North Picnic Area',
          type: POIType.PICNIC_AREA,
          description: 'Shaded picnic area with braai facilities. Perfect for family outings.',
          latitude: -24.655,
          longitude: 25.915,
          facilities: ['parking', 'restroom', 'braai_stand', 'seating', 'shade', 'tables'],
          best_time_to_visit: 'All day',
          accessibility_notes: 'Wheelchair accessible',
          is_active: true,
          display_order: 4,
        },
        {
          name: 'Bird Hide',
          type: POIType.BIRD_HIDE,
          description: 'Dedicated bird watching hide overlooking wetland area. Bring binoculars!',
          latitude: -24.663,
          longitude: 25.908,
          facilities: ['seating', 'shade'],
          best_time_to_visit: 'Early morning (6:00-9:00 AM) for best bird activity',
          accessibility_notes: 'Quiet zone - please maintain silence',
          common_animals: [4], // Red-billed Quelea ID
          is_active: true,
          display_order: 5,
        },
      ];

      await poiRepo.save(pois);
      console.log('✅ Points of Interest seeded');
    }

    console.log('✅ Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
