#!/bin/bash

# Start MongoDB
mongod &

# Restore the data
mongorestore --db brewhub_db /data/db/brewhub_db_2

# Keep the container running
tail -f /dev/null
