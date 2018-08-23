#!/usr/bin/env bash
set -euo pipefail

cat config/dot.netrc| sed "s/%%PWD%%/${SSZ_DAV_PASSWORD}/g" > /root/.netrc
mkdir -p target