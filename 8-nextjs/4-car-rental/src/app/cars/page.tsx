export const dynamic = "force-dynamic";

import CatalogClient from "./_components/catalog-client";

export default function CarsPage() {
  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-[1440px]">
        <CatalogClient />
      </div>
    </div>
  );
}
