-- Here, you can execute any CQL commands, e.g.
-- TODO: Work in progress
CREATE KEYSPACE kingboo WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};

CREATE TABLE kingboo.room
(
    id int
);

CREATE TABLE kingboo.hotel
(
    id        int,
    month     text,
    timestamp timestamp,
    value      list<text>,
    PRIMARY KEY ((id, month), timestamp)
) WITH CLUSTERING ORDER BY (timestamp ASC);


