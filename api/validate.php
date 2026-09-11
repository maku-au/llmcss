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
llmcss_json_out([
    'valid' => true,
    'prefix' => $row['token_prefix'],
    'status' => $row['status'],
    'plan' => 'Pro',
    'created_at' => $row['created_at'],
]);
