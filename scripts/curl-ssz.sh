#!/usr/bin/env bash
set -eo pipefail

if [ -n "$CI_COMMIT_TAG" ] || [ "$SSZ_ENV" == "prod" ];
then
    echo "Getting $1 from prod"
    curl -k -s -n https://www.ssz-webdav.stadt-zuerich.ch/HDB_Dropzone/${1} -o input/${1}
else
    echo "Getting $1 from integ"
    curl -k -s -n --proxy 159.100.254.195:56948 https://ssz-webdav.integ.stadt-zuerich.ch/HDB_Dropzone/${1} -o input/${1}
fi
