-- Here, you can execute any CQL commands, e.g.
CREATE KEYSPACE kingboo WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};

DROP TABLE IF EXISTS kingboo.scrap_activity;
DROP TYPE IF EXISTS kingboo.search_place_identifier;
DROP TYPE IF EXISTS kingboo.raw_room;
DROP TYPE IF EXISTS kingboo.raw_hotel;
DROP TABLE IF EXISTS kingboo.raw_search_result;

CREATE TABLE kingboo.scrap_activity
(
    search_id            text PRIMARY KEY,
    scraping_started_at  timestamp,
    scraping_finished_at timestamp
);

CREATE TYPE kingboo.search_place_identifier(
    "destination" text,
    "destId" text,
    "destType" text,
    "placeIdLat" text,
    "placeIdLon" text,
    );

CREATE TYPE kingboo.raw_room(
    "shortDescription" text,
    "longDescription" text,
    "personCount" text,
    "beds" text,
    "bonuses" frozen<list<text>>,
    );

CREATE TYPE kingboo.raw_hotel(
    "hotelId" text,
    "collectedAt" timestamp,
    "name" text,
    "price" text,
    "tax" text,
    "distanceFromCenter" text,
    "distanceFromCenterOrderIndex" int,
    "districtName" text,
    "coords" text,
    "hotelLink" text,
    "rate" text,
    "secondaryRateType" text,
    "secondaryRate" text,
    "numberOfReviews" text,
    "starRating" int,
    "newlyAdded" text,
    "bonuses" frozen<list<text>>,
    "rooms" frozen<list<kingboo.raw_room>>,
    "debug" text,
    );

CREATE TABLE kingboo.raw_search_result
(
    search_id               text,
    created_at              timestamp,
    search_place_identifier kingboo.search_place_identifier,
    collecting_time_sec     int,
    hotels_count            int,
    hotels                  frozen<list<kingboo.raw_hotel>>,
    PRIMARY KEY (search_id, created_at)
) WITH CLUSTERING ORDER BY (created_at DESC);
