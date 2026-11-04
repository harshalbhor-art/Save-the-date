CREATE TABLE `rsvps` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`contact` text NOT NULL,
	`attendance` text NOT NULL,
	`adults` integer NOT NULL,
	`children` integer NOT NULL,
	`diet` text NOT NULL,
	`stay` text NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`language` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
