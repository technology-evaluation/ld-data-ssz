#!/usr/bin/env bash
set -euo pipefail

curl --proxy ld.stadt-zuerich.ch:56948 -n -k -i -X PROPFIND https://ssz-webdav.integ.stadt-zuerich.ch/HDB_Dropzone/ --upload-file - -H "Depth: 1" <<end
<?xml version="1.0"?>
<a:propfind xmlns:a="DAV:">
<a:prop><a:resourcetype/></a:prop>
</a:propfind>
end
