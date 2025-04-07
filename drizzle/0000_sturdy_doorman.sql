CREATE TABLE `contact_type` (
	`contact_type_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `contact_type_name_unique` ON `contact_type` (`name`);--> statement-breakpoint
CREATE TABLE `employer` (
	`employer_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `job` (
	`job_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`location` text,
	`job_description` text,
	`link` text,
	`note` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`referrer_id` integer,
	`office_type_id` integer,
	`employer_id` integer,
	FOREIGN KEY (`referrer_id`) REFERENCES `people`(`people_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`office_type_id`) REFERENCES `office_type`(`office_type_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`employer_id`) REFERENCES `employer`(`employer_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `job_status_history` (
	`history_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`note` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`job_id` integer,
	`status_id` integer,
	FOREIGN KEY (`job_id`) REFERENCES `job`(`job_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`status_id`) REFERENCES `status`(`status_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `office_type` (
	`office_type_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `office_type_name_unique` ON `office_type` (`name`);--> statement-breakpoint
CREATE TABLE `people` (
	`people_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`phone` text,
	`url` text,
	`note` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`employer_id` integer,
	`contact_type_id` integer,
	FOREIGN KEY (`employer_id`) REFERENCES `employer`(`employer_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`contact_type_id`) REFERENCES `contact_type`(`contact_type_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `people_email_unique` ON `people` (`email`);--> statement-breakpoint
CREATE TABLE `status` (
	`status_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `status_name_unique` ON `status` (`name`);--> statement-breakpoint
CREATE TABLE `task` (
	`task_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`due_date` text,
	`completed` integer,
	`note` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`job_id` integer,
	FOREIGN KEY (`job_id`) REFERENCES `job`(`job_id`) ON UPDATE no action ON DELETE no action
);
