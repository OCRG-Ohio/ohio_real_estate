-- CreateTable
CREATE TABLE "Page" (
    "page_id" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("page_id")
);

-- CreateTable
CREATE TABLE "Counter" (
    "counter_id" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "Counter_pkey" PRIMARY KEY ("counter_id")
);

-- CreateTable
CREATE TABLE "Asset" (
    "asset_id" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "size" INTEGER NOT NULL,
    "data" BYTEA NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("asset_id")
);

-- CreateTable
CREATE TABLE "Article" (
    "article_id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "teaser" TEXT NOT NULL,
    "content" TEXT,
    "featuredImage" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Article_pkey" PRIMARY KEY ("article_id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city_state" TEXT,
    "price" DOUBLE PRECISION,
    "beds" INTEGER NOT NULL,
    "baths" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "type" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Page_page_id_key" ON "Page"("page_id");

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");
