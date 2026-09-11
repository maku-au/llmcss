<?php
declare(strict_types=1);
require __DIR__ . '/lib.php';

llmcss_rate_limit('pro', 120, 60);

$name = (string)($_GET['name'] ?? '');
$name = preg_replace('/\.json$/', '', $name) ?? '';
$path = llmcss_pro_file($name);
if ($path === null) {
    llmcss_json_out(['error' => 'not_found'], 404);
}

$token = llmcss_bearer();
if (!$token) {
    llmcss_json_out(['error' => 'unauthorized', 'hint' => 'Authorization: Bearer llmcss_live_...'], 401);
}
$row = llmcss_find_active_by_token($token);
if (!$row) {
    llmcss_json_out(['error' => 'invalid_or_revoked'], 403);
}

$json = file_get_contents($path);
if ($json === false) {
    llmcss_json_out(['error' => 'not_found'], 404);
}

http_response_code(200);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: private, no-store, no-cache, must-revalidate');
header('X-Content-Type-Options: nosniff');
header('Vary: Authorization');
echo $json;
exit;
