// Simulated DVLA Vehicle Enquiry Service response shape.
// Mirrors: POST https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles

export type DvlaTaxStatus = "Taxed" | "Untaxed" | "SORN";
export type DvlaMotStatus = "Valid" | "Not valid" | "No details held by DVLA";

export interface DvlaVehicle {
  registrationNumber: string;
  make: string;
  model: string;
  colour: string;
  fuelType: "PETROL" | "DIESEL" | "ELECTRICITY" | "HYBRID ELECTRIC";
  engineCapacity: number; // cc
  yearOfManufacture: number;
  monthOfFirstRegistration: string; // YYYY-MM
  taxStatus: DvlaTaxStatus;
  taxDueDate: string;
  motStatus: DvlaMotStatus;
  motExpiryDate: string;
  co2Emissions: number;
  euroStatus: string;
  markedForExport: boolean;
  typeApproval: string;
  wheelplan: string;
  revenueWeight?: number;
}

const FIXTURES: Record<string, Omit<DvlaVehicle, "registrationNumber">> = {
  AB12CDE: {
    make: "FORD",
    model: "Focus ST-Line",
    colour: "Magnetic Grey",
    fuelType: "PETROL",
    engineCapacity: 1499,
    yearOfManufacture: 2019,
    monthOfFirstRegistration: "2019-03",
    taxStatus: "Taxed",
    taxDueDate: "2026-02-28",
    motStatus: "Valid",
    motExpiryDate: "2026-04-12",
    co2Emissions: 122,
    euroStatus: "EURO 6",
    markedForExport: false,
    typeApproval: "M1",
    wheelplan: "2 AXLE RIGID BODY",
  },
  LX21KZV: {
    make: "VOLKSWAGEN",
    model: "Golf GTI",
    colour: "Pure White",
    fuelType: "PETROL",
    engineCapacity: 1984,
    yearOfManufacture: 2021,
    monthOfFirstRegistration: "2021-07",
    taxStatus: "Taxed",
    taxDueDate: "2026-07-31",
    motStatus: "Valid",
    motExpiryDate: "2026-07-15",
    co2Emissions: 168,
    euroStatus: "EURO 6",
    markedForExport: false,
    typeApproval: "M1",
    wheelplan: "2 AXLE RIGID BODY",
  },
  EV70BYD: {
    make: "TESLA",
    model: "Model 3 Long Range",
    colour: "Midnight Silver",
    fuelType: "ELECTRICITY",
    engineCapacity: 0,
    yearOfManufacture: 2020,
    monthOfFirstRegistration: "2020-11",
    taxStatus: "Taxed",
    taxDueDate: "2026-11-30",
    motStatus: "Valid",
    motExpiryDate: "2026-10-22",
    co2Emissions: 0,
    euroStatus: "EURO 6",
    markedForExport: false,
    typeApproval: "M1",
    wheelplan: "2 AXLE RIGID BODY",
  },
  RV68OMG: {
    make: "LAND ROVER",
    model: "Range Rover Sport HSE",
    colour: "Santorini Black",
    fuelType: "DIESEL",
    engineCapacity: 2993,
    yearOfManufacture: 2018,
    monthOfFirstRegistration: "2018-09",
    taxStatus: "SORN",
    taxDueDate: "2025-09-01",
    motStatus: "Not valid",
    motExpiryDate: "2025-10-04",
    co2Emissions: 198,
    euroStatus: "EURO 6",
    markedForExport: false,
    typeApproval: "M1",
    wheelplan: "2 AXLE RIGID BODY",
  },
};

function normalise(reg: string) {
  return reg.replace(/\s+/g, "").toUpperCase();
}

// UK plate regex (current style + common older formats, permissive)
const UK_PLATE = /^[A-Z]{1,3}[0-9]{1,4}[A-Z]{0,3}$/;

export function isValidUkPlate(reg: string) {
  return UK_PLATE.test(normalise(reg));
}

export async function lookupVehicle(reg: string): Promise<DvlaVehicle> {
  const key = normalise(reg);
  if (!isValidUkPlate(key)) {
    throw new Error("Enter a valid UK registration (e.g. AB12 CDE).");
  }
  // Realistic latency
  await new Promise((r) => setTimeout(r, 850 + Math.random() * 600));

  const fixture = FIXTURES[key];
  if (fixture) return { registrationNumber: key, ...fixture };

  // Deterministic synthetic record for unknown plates
  const makes = ["BMW", "AUDI", "MERCEDES-BENZ", "TOYOTA", "VAUXHALL", "NISSAN", "KIA"];
  const models: Record<string, string> = {
    BMW: "3 Series 320d M Sport",
    AUDI: "A4 40 TFSI S line",
    "MERCEDES-BENZ": "C220d AMG Line",
    TOYOTA: "Corolla Hybrid Excel",
    VAUXHALL: "Astra SRi Turbo",
    NISSAN: "Qashqai N-Connecta",
    KIA: "Sportage GT-Line",
  };
  const seed = [...key].reduce((a, c) => a + c.charCodeAt(0), 0);
  const make = makes[seed % makes.length];
  return {
    registrationNumber: key,
    make,
    model: models[make],
    colour: ["Silver", "Black", "Grey", "White", "Blue"][seed % 5],
    fuelType: seed % 4 === 0 ? "DIESEL" : "PETROL",
    engineCapacity: 1598 + (seed % 4) * 200,
    yearOfManufacture: 2017 + (seed % 8),
    monthOfFirstRegistration: `${2017 + (seed % 8)}-0${1 + (seed % 9)}`,
    taxStatus: seed % 7 === 0 ? "Untaxed" : "Taxed",
    taxDueDate: "2026-05-31",
    motStatus: seed % 11 === 0 ? "Not valid" : "Valid",
    motExpiryDate: "2026-03-18",
    co2Emissions: 110 + (seed % 80),
    euroStatus: "EURO 6",
    markedForExport: false,
    typeApproval: "M1",
    wheelplan: "2 AXLE RIGID BODY",
  };
}
