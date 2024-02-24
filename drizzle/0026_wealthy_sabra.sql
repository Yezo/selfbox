CREATE TABLE IF NOT EXISTS "songs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"artist" varchar,
	"album" varchar,
	"duration" varchar,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userProfile" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"description" varchar(256),
	"pronouns" "user_pronouns" DEFAULT 'Don''t specify',
	"website" varchar(50)
);
--> statement-breakpoint
DROP TABLE "profile";--> statement-breakpoint
DROP TABLE "Songs";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "songs" ADD CONSTRAINT "songs_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userProfile" ADD CONSTRAINT "userProfile_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
