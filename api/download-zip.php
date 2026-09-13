<?php
declare(strict_types=1);
require __DIR__ . '/lib.php';

llmcss_rate_limit('zip', 20, 60);

$token = llmcss_bearer();
if (!$token || !llmcss_find_active_by_token($token)) {
    llmcss_json_out(['error' => 'unauthorized'], 401);
}

// ?kit=<id> narrows the download to one page kit. The id is only ever matched
// against the kit list in the Pro registry index, so nothing from the request
// reaches a filesystem path.
$requested = $_GET['kit'] ?? '';
$kit = is_string($requested) ? trim($requested) : '';

if ($kit !== '') {
    $path = llmcss_ensure_kit_zip($kit);
    if ($path === null) {
        llmcss_json_out(['error' => 'unknown_kit'], 404);
    }
    $filename = 'llmcss-pro-' . $kit . '.zip';
} else {
    $path = llmcss_ensure_zip();
    if (!is_file($path)) {
        llmcss_json_out(['error' => 'zip_unavailable'], 500);
    }
    $filename = 'llmcss-pro-catalog.zip';
}

header('Content-Type: application/zip');
header('Content-Disposition: attachment; filename="' . $filename . '"');
header('Content-Length: ' . (string)filesize($path));
header('Cache-Control: private, no-store');
header('X-Content-Type-Options: nosniff');
readfile($path);
exit;
