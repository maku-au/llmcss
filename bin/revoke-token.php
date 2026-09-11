#!/usr/bin/env php
<?php
declare(strict_types=1);
require dirname(__DIR__) . '/api/lib.php';

$arg = $argv[1] ?? '';
if ($arg === '') {
    fwrite(STDERR, "Usage: php bin/revoke-token.php <email|llmcss_live_...|prefix>\n");
    exit(1);
}

$pdo = llmcss_db();
$now = gmdate('c');
if (str_starts_with($arg, 'llmcss_live_')) {
    $hash = llmcss_token_hash($arg);
    $st = $pdo->prepare('UPDATE licenses SET status=\'revoked\', revoked_at=?, token_once=NULL WHERE token_hash=?');
    $st->execute([$now, $hash]);
} elseif (filter_var($arg, FILTER_VALIDATE_EMAIL)) {
    $st = $pdo->prepare('UPDATE licenses SET status=\'revoked\', revoked_at=?, token_once=NULL WHERE email=? AND status=\'active\'');
    $st->execute([$now, strtolower($arg)]);
} else {
    $st = $pdo->prepare('UPDATE licenses SET status=\'revoked\', revoked_at=?, token_once=NULL WHERE token_prefix=? AND status=\'active\'');
    $st->execute([$now, $arg]);
}
fwrite(STDOUT, "revoked rows: " . $st->rowCount() . "\n");
