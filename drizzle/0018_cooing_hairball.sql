ALTER TABLE "profiles" ADD COLUMN "profiles" "user_pronouns" DEFAULT 'Don't specify';--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN IF EXISTS "user_pronouns";