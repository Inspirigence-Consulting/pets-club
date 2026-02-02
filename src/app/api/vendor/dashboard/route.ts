import { prisma } from "@/lib/prisma";
import { jsonResponse, errorResponse, handleApiError, requireAuth } from "@/lib/api-utils";

export async function GET() {
  try {
    const session = await requireAuth(["VENDOR", "ADMIN"]);

    const vendor = await prisma.vendor.findUnique({
      where: { userId: session.user.id },
    });

    if (!vendor) {
      return errorResponse("Profil vendeur non trouvé", 404);
    }

    const [activeCount, pendingCount, totalCount] = await Promise.all([
      prisma.listing.count({ where: { vendorId: vendor.id, status: "PUBLISHED" } }),
      prisma.listing.count({ where: { vendorId: vendor.id, status: "PENDING_REVIEW" } }),
      prisma.listing.count({ where: { vendorId: vendor.id } }),
    ]);

    return jsonResponse({ activeCount, pendingCount, totalCount });
  } catch (error) {
    return handleApiError(error);
  }
}
