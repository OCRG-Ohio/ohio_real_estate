-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "category" TEXT,
ADD COLUMN     "content" TEXT,
ADD COLUMN     "featuredImage" TEXT,
ALTER COLUMN "beds" DROP NOT NULL,
ALTER COLUMN "baths" DROP NOT NULL,
ALTER COLUMN "area" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "type" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Media" (
    "asset_id" SERIAL NOT NULL,
    "mime_type" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "propertyId" INTEGER,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("asset_id")
);

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
