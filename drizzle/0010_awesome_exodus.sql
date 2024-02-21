CREATE TABLE IF NOT EXISTS "bios" (
	"id" serial PRIMARY KEY NOT NULL,
	"bio" varchar(256),
	"userId" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bios" ADD CONSTRAINT "bios_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
