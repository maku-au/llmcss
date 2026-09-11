<?php
declare(strict_types=1);
require __DIR__ . '/lib.php';

llmcss_rate_limit('reveal', 30, 60);

$checkoutId = (string)($_GET['checkout_id'] ?? '');
if ($checkoutId === '' || strlen($checkoutId) > 80) {
    llmcss_json_out(['error' => 'missing_checkout_id'], 400);
}

$result = llmcss_reveal_once($checkoutId);
if ($result['status'] === 'missing') {
    llmcss_json_out(['ready' => false, 'error' => 'not_ready'], 404);
}
if ($result['status'] === 'revoked') {
    llmcss_json_out(['ready' => true, 'revoked' => true], 403);
}
if ($result['status'] === 'shown') {
    llmcss_json_out([
        'ready' => true,
        'token' => $result['token'],
        'shown_once' => true,
        'zip' => '/api/download-zip.php',
    ]);
}

$row = $result['row'] ?? [];
llmcss_json_out([
    'ready' => true,
    'token' => null,
    'shown_once' => false,
    'message' => 'Token already revealed. Use the zip download with your saved token, or ask the operator to re-issue.',
    'prefix' => $row['token_prefix'] ?? null,
]);
