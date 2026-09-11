<?php
declare(strict_types=1);
require __DIR__ . '/lib.php';

header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

try {
    llmcss_rate_limit('checkout', 20, 60);
    $url = llmcss_polar_checkout_url();
} catch (Throwable $e) {
    error_log('llmcss checkout failed');
    http_response_code(502);
    header('Content-Type: text/html; charset=utf-8');
    echo '<!doctype html><meta charset="utf-8"><title>Checkout unavailable</title>';
    echo '<p>Polar checkout is not available right now. Email webmaster@llmcss.io</p>';
    exit;
}

header('Location: ' . $url, true, 302);
exit;
