CREATE TYPE "public"."role" AS ENUM('admin', 'technical', 'customer');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "role" DEFAULT 'customer' NOT NULL;