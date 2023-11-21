# Use an official MongoDB image as the base image
FROM mongo:4

# Expose the default MongoDB port (27017)
EXPOSE 27017

# Copy initialization script
COPY brewhub_db_2 /data/db/brewhub_db_2
COPY restore.sh /docker-entrypoint-initdb.d/restore.sh

# Make the script executable
RUN chmod +x /docker-entrypoint-initdb.d/restore.sh