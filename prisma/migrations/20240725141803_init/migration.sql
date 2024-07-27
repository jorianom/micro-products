-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "createTime" TIMESTAMP NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
