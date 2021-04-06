#!/usr/bin/env bash
set -u
echo "Working in environment: $SFTPENV"
echo "df /upload/$SFTPENV/HDB_Full.zip" | sftp -b - statistikstadtzuerich@sftp.zazukoians.org
if [ $? -eq 0 ]
then
    set -eo pipefail
    echo "File HDB_Full.zip exists, running main pipeline..."
    npm run fetch
    npm run output:file
    ./scripts/ssz-views.sh
    # TODO mv file
    set +eo pipefail
else
    echo "File HDB_Full.zip does not exist, checking for diff delivery..."

    echo "df /upload/$SFTPENV/HDB_Diff.zip" | sftp -b - statistikstadtzuerich@sftp.zazukoians.org
    if [ $? -eq 0 ]
    then
      set -eo pipefail
      echo "File HDB_Diff.zip exists, running diff pipeline"
      npm run fetchDiff
      # npm run output:dimensions:store
      # npm run output:observations:store
      # TODO SPARQL
      # TODO DELETE
      # TODO generate views
      # TODO mv file
      set +eo pipefail
    else
      echo "File HDB_Diff.zip does not exist either, aborting..."
      exit 1
    fi
fi



