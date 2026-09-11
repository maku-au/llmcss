#!/usr/bin/env php
<?php
declare(strict_types=1);
require dirname(__DIR__) . '/api/lib.php';

$pdo = llmcss_db();
$pdo->exec("UPDATE licenses SET token_once=NULL WHERE token_once IS NOT NULL AND created_at < datetime('now', '-2 days')");
$pdo->exec("DELETE FROM rate_limits WHERE window_start < " . (time() - 86400));
$pdo->exec("DELETE FROM polar_events WHERE received_at < datetime('now', '-30 days')");
llmcss_ensure_zip();
