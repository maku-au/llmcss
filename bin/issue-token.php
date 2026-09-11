#!/usr/bin/env php
<?php
declare(strict_types=1);
require dirname(__DIR__) . '/api/lib.php';

$email = $argv[1] ?? '';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fwrite(STDERR, "Usage: php bin/issue-token.php buyer@domain.tld\n");
    exit(1);
}

$issued = llmcss_issue_token(['email' => strtolower($email)]);
fwrite(STDOUT, "email\t" . strtolower($email) . "\n");
fwrite(STDOUT, "prefix\t" . $issued['prefix'] . "\n");
fwrite(STDOUT, "token\t" . $issued['token'] . "\n");
fwrite(STDOUT, "shown once. store it now.\n");
