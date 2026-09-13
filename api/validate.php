<?php
declare(strict_types=1);
require __DIR__ . '/lib.php';

llmcss_rate_limit('validate', 60, 60);

$token = llmcss_bearer();
if (!$token) {
    llmcss_json_out(['valid' => false, 'error' => 'missing_token'], 401);
}
$row = llmcss_find_active_by_token($token);
if (!$row) {
    llmcss_json_out(['valid' => false, 'error' => 'invalid_or_revoked'], 401);
}
// renews_at is the subscription period end. The licenses table does not store
// one yet: nothing in the Polar webhook handler persists current_period_end, so
// this is null today and the account page falls back to the issue date. Filling
// it needs either a column plus a write in polar-webhook.php on
// subscription.active and subscription.updated, or a GET
// https://api.polar.sh/v1/subscriptions/{polar_subscription_id} call with
// POLAR_ACCESS_TOKEN on every validate, which this endpoint deliberately avoids.
$renews = $row['current_period_end'] ?? null;

llmcss_json_out([
    'valid' => true,
    'prefix' => $row['token_prefix'],
    'status' => $row['status'],
    'plan' => 'Pro',
    'created_at' => $row['created_at'],
    'renews_at' => (is_string($renews) && $renews !== '') ? $renews : null,
]);
