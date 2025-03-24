-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "color" TEXT[],
ADD COLUMN     "size" JSONB[],
ALTER COLUMN "price" DROP DEFAULT;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
