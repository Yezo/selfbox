ALTER TABLE "songs" RENAME TO "Songs";--> statement-breakpoint
ALTER TABLE "Songs" DROP CONSTRAINT "songs_userId_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Songs" ADD CONSTRAINT "Songs_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
