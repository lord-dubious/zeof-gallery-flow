
#!/bin/bash

# PostgreSQL Database Dump Script

# Configuration
DB_NAME="your_database_name"
DB_USER="your_database_user"
DB_HOST="localhost"
DB_PORT="5432"

# Create a directory for the dump if it doesn't exist
mkdir -p db_dumps

# Generate current timestamp for the filename
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DUMP_FILE="db_dumps/db_dump_${TIMESTAMP}.sql"

# Perform the dump
echo "Creating database dump to ${DUMP_FILE}..."
pg_dump -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -d ${DB_NAME} -s -c -f ${DUMP_FILE}

# Check if dump was successful
if [ $? -eq 0 ]; then
  echo "Database dump completed successfully"
  echo "The dump file is located at: ${DUMP_FILE}"
else
  echo "Error: Database dump failed"
fi
