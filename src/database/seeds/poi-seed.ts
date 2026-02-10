import { POIType } from "../../config/constants";
import { AppDataSource } from "../../config/database";
import { PointOfInterest } from "../entities/poi.entity";

export const seedPOIs = async () => {
  const poiRepository = AppDataSource.getRepository(PointOfInterest);

  // Check if POIs already exist
  const existingPOIs = await poiRepository.count();
  if (existingPOIs > 0) {
    console.log("POIs already seeded");
    return;
  }

  const poisData = [
    {
      name: "Main Gate",
      type: POIType.GATE,
      description:
        "Main entrance to Gaborone Game Reserve. Entry permits and information available here.",
      latitude: -24.6392493,
      longitude: 25.9501358,
      facilities: ["Parking", "Restrooms", "Information Center"],
      best_time_to_visit: "Opening hours: 6:00 AM - 6:30 PM",
      accessibility_notes: "Fully accessible with paved parking",
      is_active: true,
      display_order: 1,
    },
    {
      name: "Maokana",
      type: POIType.PICNIC_AREA,
      description:
        "Shaded picnic area with braai facilities. Perfect for family outings.",
      latitude: -24.6415988,
      longitude: 25.9520771,
      facilities: [
        "Parking",
        "Restrooms",
        "Braai Stands",
        "Seating",
        "Shade",
        "Tables",
      ],
      best_time_to_visit: "All day",
      accessibility_notes: "Limited parking available",
      is_active: true,
      display_order: 2,
    },
    {
      name: "Zebra Viewpoint",
      type: POIType.VIEWPOINT,
      description:
        "Popular spot for observing zebra herds. Best viewing in early morning and late afternoon.",
      latitude: -24.638,
      longitude: 25.948,
      facilities: ["Parking Area", "Viewing Platform"],
      best_time_to_visit:
        "Early morning (6:00-8:00 AM) and late afternoon (4:00-6:00 PM)",
      accessibility_notes: "Short walk to viewing platform",
      is_active: true,
      display_order: 3,
    },
    {
      name: "Mokabi",
      type: POIType.PICNIC_AREA,
      description:
        "Shaded picnic area with braai facilities. Perfect for family outings.",
      latitude: -24.642,
      longitude: 25.954,
      facilities: [
        "Parking",
        "Restrooms",
        "Braai Stands",
        "Seating",
        "Shade",
        "Tables",
        "Toilets",
      ],
      best_time_to_visit: "All day",
      accessibility_notes: "Limited parking available",
      is_active: true,
      display_order: 4,
    },
    {
      name: "Central Picnic Area",
      type: POIType.PICNIC_AREA,
      description:
        "Shaded picnic area with braai facilities. Perfect for family gatherings.",
      latitude: -24.639,
      longitude: 25.95,
      facilities: [
        "Braai Stands",
        "Picnic Tables",
        "Restrooms",
        "Water Taps",
        "Shade Shelters",
      ],
      best_time_to_visit: "All day",
      accessibility_notes: "Wheelchair accessible with paved paths",
      is_active: true,
      display_order: 5,
    },
    {
      name: "Riverside Picnic Spot",
      type: POIType.PICNIC_AREA,
      description:
        "Scenic picnic location near the seasonal river with great wildlife viewing.",
      latitude: -24.645,
      longitude: 25.947,
      facilities: ["Braai Stands", "Picnic Tables", "Parking"],
      best_time_to_visit: "Morning and afternoon",
      accessibility_notes: "Uneven terrain, not wheelchair accessible",
      is_active: true,
      display_order: 6,
    },
    {
      name: "Main Watering Hole",
      type: POIType.WATERING_HOLE,
      description:
        "Primary artificial watering hole. Attracts diverse wildlife, especially during dry season.",
      latitude: -24.64,
      longitude: 25.952,
      facilities: ["Viewing Area", "Parking"],
      best_time_to_visit:
        "Early morning and late afternoon for best wildlife activity",
      accessibility_notes: "View from vehicle or short walk",
      is_active: true,
      display_order: 7,
    },
    {
      name: "North Watering Point",
      type: POIType.WATERING_HOLE,
      description:
        "Smaller watering point frequented by warthogs and smaller mammals.",
      latitude: -24.633,
      longitude: 25.956,
      facilities: ["Parking"],
      best_time_to_visit: "All day",
      accessibility_notes: "Accessible from main trail",
      is_active: true,
      display_order: 8,
    },
    {
      name: "Acacia Bird Hide",
      type: POIType.BIRD_HIDE,
      description:
        "Wooden bird hide overlooking acacia woodland. Over 50 bird species recorded here.",
      latitude: -24.641,
      longitude: 25.949,
      facilities: ["Bird Hide", "Benches", "Information Board"],
      best_time_to_visit:
        "Early morning (6:00-9:00 AM) for optimal birdwatching",
      accessibility_notes: "Requires 200m walk on bush path",
      is_active: true,
      display_order: 9,
    },
    {
      name: "Wetland Bird Hide",
      type: POIType.BIRD_HIDE,
      description:
        "Bird hide overlooking seasonal wetland. Excellent for waterfowl and waders.",
      latitude: -24.648,
      longitude: 25.953,
      facilities: ["Bird Hide", "Benches", "Spotting Scope"],
      best_time_to_visit: "Early morning, best during rainy season (Nov-Mar)",
      accessibility_notes: "Accessible via boardwalk",
      is_active: true,
      display_order: 10,
    },
    {
      name: "Central Restrooms",
      type: POIType.RESTROOM,
      description: "Modern restroom facilities centrally located.",
      latitude: -24.6395,
      longitude: 25.9505,
      facilities: ["Restrooms", "Disabled Access", "Water"],
      best_time_to_visit: "All day",
      accessibility_notes: "Fully accessible",
      is_active: true,
      display_order: 11,
    },
    {
      name: "Sunset Viewpoint",
      type: POIType.VIEWPOINT,
      description:
        "Elevated viewpoint offering panoramic views of the reserve. Popular spot for sunset photography.",
      latitude: -24.644,
      longitude: 25.958,
      facilities: ["Parking", "Viewing Platform"],
      best_time_to_visit:
        "Late afternoon (5:00-6:30 PM) for spectacular sunsets",
      accessibility_notes: "Short uphill walk",
      is_active: true,
      display_order: 12,
    },
  ];

  const pois = poisData.map((data) => {
    const poi = new PointOfInterest();
    Object.assign(poi, data);
    return poi;
  });

  await poiRepository.save(pois);
  console.log(`✅ Seeded ${pois.length} POIs successfully`);
};
