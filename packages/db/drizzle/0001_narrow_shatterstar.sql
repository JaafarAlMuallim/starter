PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_chirps` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`chirp` text,
	`user_id` text NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`updated_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_chirps`("id", "chirp", "user_id", "created_at", "updated_at") SELECT "id", "chirp", "user_id", "created_at", "updated_at" FROM `chirps`;--> statement-breakpoint
DROP TABLE `chirps`;--> statement-breakpoint
ALTER TABLE `__new_chirps` RENAME TO `chirps`;--> statement-breakpoint
PRAGMA foreign_keys=ON;