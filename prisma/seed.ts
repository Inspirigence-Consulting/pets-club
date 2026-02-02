import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@petsclub.ma" },
    update: {},
    create: {
      email: "admin@petsclub.ma",
      name: "Pets Club Admin",
      password: adminPassword,
      role: "ADMIN",
      phone: "+212600000000",
    },
  });
  console.log("Admin user created:", admin.email);

  // Stock categories
  const categories = [
    { name: "Croquettes", slug: "croquettes" },
    { name: "Médicaments", slug: "medicaments" },
    { name: "Accessoires", slug: "accessoires" },
    { name: "Hygiène", slug: "hygiene" },
    { name: "Compléments", slug: "complements" },
  ];

  for (const cat of categories) {
    await prisma.stockCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log("Stock categories created");

  // Sample dogs
  const sire = await prisma.dog.create({
    data: {
      name: "Royal Prince",
      breed: "Pomeranian",
      gender: "MALE",
      dateOfBirth: new Date("2021-03-15"),
      color: "Orange",
      weight: 3.2,
      registrationNumber: "LOF-2021-PM-001",
      titles: ["Champion du Maroc", "Best in Show"],
      healthTests: {
        patella: "Clear",
        cardiac: "Normal",
        eyes: "Clear",
      },
      isBreeder: true,
      status: "ACTIVE",
      description: "Mâle reproducteur exceptionnel, lignée championne.",
    },
  });

  const dam = await prisma.dog.create({
    data: {
      name: "Belle Étoile",
      breed: "Pomeranian",
      gender: "FEMALE",
      dateOfBirth: new Date("2022-01-20"),
      color: "Cream",
      weight: 2.8,
      registrationNumber: "LOF-2022-PM-002",
      titles: ["Championne Junior"],
      healthTests: {
        patella: "Clear",
        cardiac: "Normal",
        eyes: "Clear",
      },
      isBreeder: true,
      status: "ACTIVE",
      description: "Femelle de beauté exceptionnelle, tempérament doux.",
    },
  });
  console.log("Sample dogs created");

  // Sample litter
  const litter = await prisma.litter.create({
    data: {
      name: "Portée Royale 2025",
      sireId: sire.id,
      damId: dam.id,
      birthDate: new Date("2025-11-10"),
      weaningDate: new Date("2026-01-10"),
      puppyCount: 4,
      status: "WEANED",
    },
  });

  // Sample puppies
  const puppyData = [
    { name: "Loki", gender: "MALE" as const, color: "Orange", status: "AVAILABLE" as const, price: 25000 },
    { name: "Luna", gender: "FEMALE" as const, color: "Cream", status: "AVAILABLE" as const, price: 28000 },
    { name: "Milo", gender: "MALE" as const, color: "Orange Sable", status: "RESERVED" as const, price: 25000 },
    { name: "Nala", gender: "FEMALE" as const, color: "White", status: "SOLD" as const, price: 30000 },
  ];

  for (const p of puppyData) {
    await prisma.puppy.create({
      data: {
        name: p.name,
        gender: p.gender,
        color: p.color,
        dateOfBirth: new Date("2025-11-10"),
        price: p.price,
        status: p.status,
        slug: p.name.toLowerCase(),
        litterId: litter.id,
        description: `Chiot ${p.gender === "MALE" ? "mâle" : "femelle"} ${p.color}, issu de la portée Royale 2025.`,
        photos: [],
        ...(p.status === "SOLD"
          ? {
              buyerName: "Jean Martin",
              buyerEmail: "jean@example.com",
              soldAt: new Date("2026-01-15"),
            }
          : {}),
      },
    });
  }
  console.log("Sample puppies created");

  // Sample stock items
  const croquettes = await prisma.stockCategory.findUnique({
    where: { slug: "croquettes" },
  });

  if (croquettes) {
    await prisma.stockItem.create({
      data: {
        name: "Royal Canin Mini Puppy",
        sku: "RC-MINI-PUP-4KG",
        categoryId: croquettes.id,
        quantity: 3,
        minQuantity: 5,
        unit: "BAG",
        costPrice: 350,
        supplier: "Royal Canin Maroc",
        notes: "Alerte: stock bas",
      },
    });

    await prisma.stockItem.create({
      data: {
        name: "Orijen Original",
        sku: "ORI-ORIG-6KG",
        categoryId: croquettes.id,
        quantity: 8,
        minQuantity: 3,
        unit: "BAG",
        costPrice: 650,
        supplier: "Champion Petfoods",
      },
    });
  }

  const medicaments = await prisma.stockCategory.findUnique({
    where: { slug: "medicaments" },
  });

  if (medicaments) {
    await prisma.stockItem.create({
      data: {
        name: "Milbemax Chiot",
        sku: "MBX-CHIOT-2",
        categoryId: medicaments.id,
        quantity: 12,
        minQuantity: 5,
        unit: "DOSE",
        costPrice: 85,
        supplier: "Elanco",
      },
    });
  }
  console.log("Sample stock items created");

  // Sample vet records
  await prisma.vetRecord.create({
    data: {
      date: new Date("2025-12-15"),
      type: "VACCINE",
      description: "Primo-vaccination CHPPIL",
      product: "Nobivac DHPPi+L",
      dose: "1 dose SC",
      cost: 250,
      nextDueDate: new Date("2026-01-15"),
      vetName: "Dr. Amrani",
      dogId: sire.id,
    },
  });

  await prisma.vetRecord.create({
    data: {
      date: new Date("2026-01-20"),
      type: "DEWORMING",
      description: "Vermifugation de routine",
      product: "Milbemax",
      dose: "1 comprimé",
      cost: 85,
      nextDueDate: new Date("2026-04-20"),
      vetName: "Dr. Amrani",
      dogId: dam.id,
    },
  });
  console.log("Sample vet records created");

  // Demo vendor + listing
  const vendorPassword = await bcrypt.hash("vendor123", 12);
  const vendorUser = await prisma.user.upsert({
    where: { email: "vendeur@example.com" },
    update: {},
    create: {
      email: "vendeur@example.com",
      name: "Ahmed Benali",
      password: vendorPassword,
      role: "VENDOR",
      phone: "+212611111111",
    },
  });

  const vendor = await prisma.vendor.create({
    data: {
      userId: vendorUser.id,
      shopName: "Élevage Benali",
      description: "Éleveur passionné de Bergers Allemands depuis 15 ans.",
      phone: "+212611111111",
      city: "Casablanca",
      status: "ACTIVE",
    },
  });

  await prisma.listing.create({
    data: {
      vendorId: vendor.id,
      title: "Berger Allemand mâle, lignée de travail",
      description:
        "Magnifique chiot Berger Allemand de 4 mois, issu de parents titrés en ring. Vacciné, vermifugé, pucé. Parents testés HD/ED. Parfait pour famille active ou sport canin.",
      breed: "Berger Allemand",
      gender: "MALE",
      age: "4 mois",
      price: 15000,
      city: "Casablanca",
      phone: "+212611111111",
      status: "PUBLISHED",
      paymentStatus: "PAID",
      publishedAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      slug: "berger-allemand-male-lignee-travail",
      photos: [],
    },
  });

  await prisma.listing.create({
    data: {
      vendorId: vendor.id,
      title: "Berger Allemand femelle, robe noire et feu",
      description:
        "Belle femelle de 3 mois, sociabilisée, habituée aux enfants. Carnet de santé à jour. LOF en cours.",
      breed: "Berger Allemand",
      gender: "FEMALE",
      age: "3 mois",
      price: 12000,
      city: "Casablanca",
      phone: "+212611111111",
      status: "PENDING_REVIEW",
      paymentStatus: "PAID",
      slug: "berger-allemand-femelle-noire-feu",
      photos: [],
    },
  });
  console.log("Demo vendor and listings created");

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
