#!/bin/bash
echo 'Waiting for FaunaDB to be ready. Health check address ['"$FAUNADB_INITIALIZED_CHECK_ADDRESS"'] will be called every 5 seconds.'
# shellcheck disable=SC2016
timeout 60 bash -c 'until $(curl --output /dev/null --silent --head --fail $FAUNADB_INITIALIZED_CHECK_ADDRESS); do
    echo "waiting..."
    sleep 5
done'
echo "FaunaDB is ready."
echo "Initializing db..."
fauna add-endpoint "$FAUNADB_ADDRESS" --alias faunadb-client --key "$FAUNA_ADMIN_DB_SECRET"
echo "Listing endpoints:"
fauna list-endpoints
echo "Listing exisiting databases:"
fauna list-databases

if fauna create-database "$FAUNA_DB_NAME" --secret="$FAUNA_ADMIN_DB_SECRET" | grep -q ' created database'; then
  echo "Database '$FAUNA_DB_NAME' created"

  # fauna eval
  # DESCRIPTION
  #  Runs the specified query. Can read from stdin, file or command line.
  #  Outputs to either stdout or file.
  #  Output format can be specified.
  #
  # EXAMPLES
  #  $ fauna eval dbname "Paginate(Classes())"
  #  $ fauna eval dbname --file=/path/to/queries.fql
  #  $ echo "Add(1,1)" | fauna eval dbname --stdin
  #  $ fauna eval dbname "Add(2,3)" --output=/tmp/result"
  #  $ fauna eval dbname "Add(2,3)" --format=json --output=/tmp/result"
  fauna eval "$FAUNA_DB_NAME" --file="$FAUNA_PATH_TO_INIT_DB_SCRIPT"
fi
echo "END"
