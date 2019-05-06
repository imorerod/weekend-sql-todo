CREATE TABLE "to-do" (
"id" serial primary key,
"task" varchar(200),
"completed" boolean);

INSERT INTO "to-do" ("task", "completed")
VALUES ('Complete Weekend Challenge', False);