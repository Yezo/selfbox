ALTER TABLE "profiles" RENAME TO "profile";--> statement-breakpoint
ALTER TABLE "Songs" RENAME TO "songs";--> statement-breakpoint
ALTER TABLE "profile" DROP CONSTRAINT "profiles_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "songs" DROP CONSTRAINT "Songs_userId_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "songs" ADD CONSTRAINT "songs_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
