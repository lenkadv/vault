# Manual private video handoff

1. Give the owner the exact approved media path, thumbnail, title, description,
   and tags. Tell them to upload it as private with subscriber notifications off.
2. Record `publish_state: waiting-owner` and keep the item approved.
3. Wait for the owner to confirm the upload is private and processing completed.
   Ask for the video id when available.
4. After the owner confirms private, processed state, set the receipt to
   `prepared`, record the exact completion time, and make the separate move to
   published.

If privacy or processing is unknown, keep the item approved as
`needs-verification`. Showing upload instructions is not completion.

