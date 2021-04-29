-- Here, you can execute any CQL commands, e.g.
CREATE KEYSPACE kingboo WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};

DROP TABLE IF EXISTS kingboo.scrap_activity;
DROP TYPE IF EXISTS kingboo.raw_hotel;
DROP TYPE IF EXISTS kingboo.search_place_identifier;
DROP TABLE IF EXISTS kingboo.raw_search_result;

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

CREATE TABLE kingboo.scrap_activity
(
    "searchId"           text,
    "scrapingStartedAt"  timestamp,
    "scrapingFinishedAt" timestamp,
    PRIMARY KEY ("searchId")
);

CREATE TABLE kingboo.raw_search_result
(
    "searchId"              text,
    "createdAt"             timestamp,
    "searchPlaceIdentifier" kingboo.search_place_identifier,
    "collectingTimeSec"     int,
    "hotelsCount"           int,
    "hotels"                frozen<list<kingboo.raw_hotel>>,
    PRIMARY KEY ("searchId", "createdAt")
) WITH CLUSTERING ORDER BY ("createdAt" DESC)
   AND DEFAULT_TIME_TO_LIVE = 259200; -- 3 days
