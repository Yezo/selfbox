DO $$ BEGIN
 CREATE TYPE "user_pronouns" AS ENUM('Don't specify', 'They/them', 'He/him', 'She/her');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"bio" varchar(256),
	"user_pronouns" "user_pronouns" DEFAULT 'Don't specify',
	"website" varchar(50)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
