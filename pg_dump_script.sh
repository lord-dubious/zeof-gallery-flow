
#!/bin/bash

# PostgreSQL Database Dump Script for Supabase Project

# Configuration - using Supabase project connection details
DB_NAME="postgres"
DB_USER="postgres"
DB_HOST="vbkgqcdvbijtlcooiuga.supabase.co"
DB_PORT="5432"
DB_PASSWORD="" # You'll need to add your database password

# Create a directory for the dump if it doesn't exist
mkdir -p db_dumps

# Generate current timestamp for the filename
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DUMP_FILE="db_dumps/db_dump_${TIMESTAMP}.sql"

# Perform the dump
echo "Creating database dump to ${DUMP_FILE}..."
PGPASSWORD="${DB_PASSWORD}" pg_dump \
  -h ${DB_HOST} \
  -p ${DB_PORT} \
  -U ${DB_USER} \
  -d ${DB_NAME} \
  --schema=public \
  --no-owner \
  --no-acl \
  -F p \
  -f ${DUMP_FILE}

# Check if dump was successful
if [ $? -eq 0 ]; then
  echo "Database dump completed successfully"
  echo "The dump file is located at: ${DUMP_FILE}"
else
  echo "Error: Database dump failed"
fi
