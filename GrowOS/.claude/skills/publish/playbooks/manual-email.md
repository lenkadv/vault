# Manual email draft handoff

1. Give the owner the approved subject, preview, body, links, and audience only
   when one was approved. State clearly that nothing was sent or scheduled.
2. Record `publish_destination: manual`, the exact attempt time, and
   `publish_state: waiting-owner`. Keep status approved.
3. Wait for the owner to confirm they saved an unsent, unscheduled, non-public
   draft. Showing the package is not completion.
4. After the owner confirms, set the receipt to `prepared`, record the exact
   completion time, then make the separate move to published.

If they sent or scheduled it instead, record only what they actually say. Do not
claim the promised safe draft was verified.

