ALTER TABLE "profiles" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_user_id_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
