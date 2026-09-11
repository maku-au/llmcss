<?php
declare(strict_types=1);
require __DIR__ . '/lib.php';

llmcss_rate_limit('zip', 20, 60);

$token = llmcss_bearer();
if (!$token || !llmcss_find_active_by_token($token)) {
    llmcss_json_out(['error' => 'unauthorized'], 401);
}

$path = llmcss_ensure_zip();
if (!is_file($path)) {
    llmcss_json_out(['error' => 'zip_unavailable'], 500);
}

header('Content-Type: application/zip');
header('Content-Disposition: attachment; filename="llmcss-pro-catalog.zip"');
header('Content-Length: ' . (string)filesize($path));
header('Cache-Control: private, no-store');
header('X-Content-Type-Options: nosniff');
readfile($path);
exit;
