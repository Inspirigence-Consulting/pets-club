import { prisma } from "@/lib/prisma";
import { jsonResponse, handleApiError, requireAuth } from "@/lib/api-utils";

export async function GET() {
  try {
    await requireAuth(["ADMIN"]);

    const [
      dogsCount,
      puppiesByStatus,
      allStockItems,
      pendingListings,
      upcomingVetRecords,
      littersCount,
      totalListings,
      vendorsCount,
    ] = await Promise.all([
      // Total active dogs count
      prisma.dog.count({ where: { status: "ACTIVE" } }),

      // Puppies grouped by status
      prisma.puppy.groupBy({
        by: ["status"],
        _count: { _all: true },
      }),

      // All stock items (to compute low stock in-memory since Prisma
      // does not support column-to-column comparisons)
      prisma.stockItem.findMany({
        select: { quantity: true, minQuantity: true },
      }),

      // Pending listings count
      prisma.listing.count({ where: { status: "PENDING_REVIEW" } }),

      // Upcoming vet records (next 30 days)
      prisma.vetRecord.count({
        where: {
          nextDueDate: {
            gte: new Date(),
            lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
        },
      }),

      // Active litters count
      prisma.litter.count({
        where: { status: { in: ["PLANNED", "EXPECTED", "BORN"] } },
      }),

      // Total listings
      prisma.listing.count(),

      // Active vendors
      prisma.vendor.count({ where: { status: "ACTIVE" } }),
    ]);

    // Compute low stock count
    const lowStockCount = allStockItems.filter(
      (item: { quantity: number; minQuantity: number }) =>
        item.quantity <= item.minQuantity
    ).length;

    // Map Prisma enum statuses to frontend keys
    const statusMap: Record<string, string> = {
      AVAILABLE: "disponible",
      RESERVED: "reserve",
      SOLD: "vendu",
      KEPT: "garde",
    };

    const puppiesStatusCounts: Record<string, number> = {
      disponible: 0,
      reserve: 0,
      vendu: 0,
      garde: 0,
    };
    let totalPuppies = 0;
    for (const group of puppiesByStatus) {
      const key = statusMap[group.status] ?? group.status.toLowerCase();
      puppiesStatusCounts[key] = group._count._all;
      totalPuppies += group._count._all;
    }

    return jsonResponse({
      totalPuppies,
      puppiesByStatus: puppiesStatusCounts,
      activeBreedingDogs: dogsCount,
      lowStockAlerts: lowStockCount,
      pendingListings,
      upcomingVetAppointments: [],
      recentActivity: [],
    });
  } catch (error) {
    return handleApiError(error);
  }
}
