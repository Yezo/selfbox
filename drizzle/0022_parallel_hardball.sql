DO $$ BEGIN
 CREATE TYPE "user_pronouns" AS ENUM('Don't specify', 'They/them', 'He/him', 'She/her');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
