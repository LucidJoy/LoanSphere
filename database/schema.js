import {
  char,
  date,
  doublePrecision,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const historicalDataPrices = pgTable("historical_data_prices", {
  regionId: integer("region_id").notNull(),
  housingType: text("housing_type").notNull(),
  priceDate: date("price_date").notNull(),
  price: doublePrecision("price").notNull(),
});

export const historicalDataRegion = pgTable("historical_data_region", {
  regionId: integer("region_id").notNull(),
  regionState: char("region_state", { length: 4 }).notNull(),
  regionName: varchar("region_name").notNull(),
});
