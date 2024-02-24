ALTER TYPE "user_pronouns" ADD VALUE 'Do not specify';--> statement-breakpoint
ALTER TABLE "userProfile" ALTER COLUMN "pronouns" SET DEFAULT 'Do not specify';