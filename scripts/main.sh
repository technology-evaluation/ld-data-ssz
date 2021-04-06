#!/usr/bin/env bash
echo "df /upload/integ/HDB_Full.zip" | sftp -b - statistikstadtzuerich@sftp.zazukoians.org
if [ $? -eq 0 ]
then
    echo "File HDB_Full.zip exists, running main pipeline..."
    npm run fetch
    npm run output:file
    # TODO generate views
    # TODO mv file
else
    echo "File HDB_Full.zip does not exist, checking for diff delivery..."

    echo "df /upload/integ/HDB_Diff.zip" | sftp -b - statistikstadtzuerich@sftp.zazukoians.org
    if [ $? -eq 0 ]
    then
      echo "File HDB_Diff.zip exists, running diff pipeline"
      npm run fetchDiff
      # npm run output:dimensions:store
      # npm run output:observations:store
      # TODO SPARQL
      # TODO DELETE
      # TODO generate views
      # TODO mv file
    else
      echo "File HDB_Diff.zip does not exist either, aborting..."
      exit 1
    fi
fi



