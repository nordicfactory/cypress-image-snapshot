---
'@oaknorthai/cypress-image-snapshot': patch
---

Fix error messages for snapshot failures

Previously had dimensions the wrong way round and always reported a size issue as the failure cause, even if we're allowing size mismatches.
