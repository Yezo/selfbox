CREATE TABLE IF NOT EXISTS "userSocialMedia" (
	"userId" text PRIMARY KEY NOT NULL,
	"twitter" varchar(30),
	"instagram" varchar(30),
	"linkedin" varchar(30)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userSocialMedia" ADD CONSTRAINT "userSocialMedia_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
