CREATE TABLE "historical_data_prices" (
	"region_id" integer NOT NULL,
	"housing_type" text NOT NULL,
	"price_date" date NOT NULL,
	"price" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE "historical_data_region" (
	"region_id" integer NOT NULL,
	"region_state" char(4) NOT NULL,
	"region_name" varchar NOT NULL
);
