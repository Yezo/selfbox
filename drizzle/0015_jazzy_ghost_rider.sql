DO $$ BEGIN
 CREATE TYPE "user_pronouns" AS ENUM('Don't specify', 'They/them', 'He/him', 'She/her');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "profiles" RENAME TO "profile";--> statement-breakpoint
ALTER TABLE "profile" DROP CONSTRAINT "profiles_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "profile" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "user_pronouns" "user_pronouns" DEFAULT 'Don't specify';--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "website" varchar(50);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
