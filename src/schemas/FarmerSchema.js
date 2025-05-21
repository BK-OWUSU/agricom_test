import { z } from "zod";

export const farmerSchema = z.object({
  // === Personal Info ===
  first_name: z
    .string()
    .min(1, "First name is required")
    .regex(/^[A-Za-z\s]+$/, "First name must contain only letters"),

  surname: z
    .string()
    .min(1, "Surname is required")
    .regex(/^[A-Za-z\s]+$/, "Surname must contain only letters"),

  last_name: z.string().optional(),

  gender: z
    .string()
    .refine(val => ["Male", "Female", "Other"].includes(val), {
      message: "Gender is required",
    }),

  date_of_birth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),

  national_id: z
    .string()
    .min(6, "National ID is required"), // adjust length based on your country's format

  marital_status: z
    .string()
    .refine(val => ["Single", "Married", "Divorced", "Widowed"].includes(val), {
      message: "Invalid marital status",
    }),

  contact_details: z
    .string()
    .min(1,"Contact is required")
    .regex(/^\d{10}$/, "Contact must be exactly 10 digits"),

  residential_address: z
    .string()
    .min(1, "Address is required"),

  educational_level: z
    .string()
    .refine(val => ["Primary", "Secondary", "Tertiary", "Other"].includes(val), {
      message: "Education level is required",
    }),

  region: z
    .string()
    .min(1, "Region is required"),

  district: z
    .string()
    .min(1, "District is required"),

  community_or_village: z
    .string()
    .min(1, "Community or village is required"),

  // === Farm Info ===
  farming_experience: z
    .string()
    .min(1, "Experience is required")
    .refine(val => /^\d+$/.test(val), {
      message: "Experience must be a number",
    }),

  land_ownership: z
    .string()
    .refine(val => ["Owned", "Rented", "Leased", "Communal", "Family", "Other"].includes(val), {
      message: "Invalid land ownership type",
    }),

  livestock_type: z.string().optional(),

  land_size: z.preprocess((val) => {
    if (val === "" || val === undefined || val === null) {
      return undefined;
    }
    return Number(val);
  },
  z.number({
      required_error: "Land size is required",
      invalid_type_error: "land size must be a number",
    })
    .min(0, "Land size must be a non-negative number")
  ),

  farm_location: z
    .string()
    .min(1, "Farm location required"),

  farm_gps_coordinate: z
    .string()
    .min(1, "GPS coordinates required"),

  crop_type: z
    .string()
    .min(1, "Crop type required")
    .refine(val => ["Legumes", "Cereals", "Vegetables" , "Fruits" , "Root & Tuber", "Cash Crops"].includes(val), {
      message: "Crop type is required", 
      }),

  soil_type: z
    .string()
    .refine(val => ["Clay", "Sandy", "Silt", "Loam", "Other"].includes(val), {
      message: "Soil type is required",
    }),

  farming_practice: z
    .string()
    .refine(val => ["Organic", "Conventional", "Mixed", "Other"].includes(val), {
      message: "Farming practice is required",
    }),

  mechanization: z
    .string()
    .refine(val => ["Low", "Medium", "High"].includes(val), {
      message: "Mechanization level is required",
    }),

  harvest_dates: z
    .string()
    .min(1, "Harvest date is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),

  yield_per_acre: z.preprocess((val) => {
    if (val === "" || val === undefined || val === null) {
      return undefined;
     }
    return Number(val);
  },

  z.number({
      required_error: "Yield-per-acre is required",
      invalid_type_error: "Yield-per-acre must be a number",
    })
    .min(0, "Yield-per-acre must be a non-negative number")
  ),

  market_prices: z.preprocess((val) => {
    if (val === "" || val === undefined || val === null) {
      return undefined;
    }
    return Number(val);
  },

  z.number({
      required_error: "Market price is required",
      invalid_type_error: "Market price must be a number",
    })
    .min(0, "Market price must be a non-negative number")
  ),

  revenue: z.preprocess((val) => {
    if (val === "" || val === undefined || val === null) {
      return undefined;
    }
    return Number(val);
  },
  
  z.number({
      required_error: "Revenue is required",
      invalid_type_error: "Revenue must be a number",
    })
    .min(0, "Revenue must be a non-negative number")
  ),

  // === Technology Use ===
  smartphone_ownership: z
    .string()
    .refine(val => ["Yes", "No"].includes(val), {
      message: "Smart phone ownership is required",
    }),


  internet_access: z
    .string()
    .refine(val => ["Yes", "No"].includes(val), {
      message: "Internet access info is required",
    }),


  ussd_sms_familiarity: z
    .string()
    .refine(val => ["Yes", "No"].includes(val), {
      message: "USSD/SMS familiarity is required",
    }),


  digital_platform_use: z
  .string()
    .refine(val => ["Yes", "No"].includes(val), {
      message: "Digital platform participation info is required",
    }),
});

//SCHEMA FOR STEPPERS

// Farmer Personal Info (including the newly added personal fields)
export const farmerInfoSchema = farmerSchema.pick({
  first_name: true,
  surname: true,
  last_name: true,
  gender: true,
  date_of_birth: true,         // added
  national_id: true,           // added
  marital_status: true,        // added
  contact_details: true,
  residential_address: true,
  educational_level: true,
  region: true,                // added
  district: true,              // added
  community_or_village: true,  // added
  farming_experience: true,
});

// Farm Info 
export const farmInfoSchema = farmerSchema.pick({
  farm_gps_coordinate: true,
  land_size: true,
  farm_location: true,
  harvest_dates:true,
  market_prices: true,
  revenue: true,
  yield_per_acre: true,
  crop_type: true,
  soil_type: true,
  farming_practice: true,
  mechanization: true,
  land_ownership: true,        // added
  livestock_type: true,        // added
});

// Technology Use
export const technologyUseSchema = farmerSchema.pick({
  smartphone_ownership: true,         // added
  internet_access: true,               // added
  ussd_sms_familiarity: true,         
  digital_platform_use: true, 
});
