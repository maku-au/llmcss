<?php
declare(strict_types=1);

function llmcss_home(): string {
    $home = getenv('HOME') ?: (getenv('HOMEDRIVE') && getenv('HOMEPATH') ? getenv('HOMEDRIVE') . getenv('HOMEPATH') : '');
    return is_string($home) && $home !== '' ? rtrim($home, '/\\') : dirname(__DIR__, 2);
}

function llmcss_env_path(): string {
    $explicit = getenv('LLMCSS_ENV_PATH');
    if (is_string($explicit) && $explicit !== '') return $explicit;
    return llmcss_home() . '/.llmcss/.env';
}

function llmcss_env(): array {
    static $env = null;
    if ($env !== null) return $env;
    $env = [];
    $path = llmcss_env_path();
    if (!is_readable($path)) {
        return $env;
    }
    foreach (file($path, FILE_IGNORE_NEW_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#')) continue;
        $eq = strpos($line, '=');
        if ($eq === false) continue;
        $k = trim(substr($line, 0, $eq));
        $v = trim(substr($line, $eq + 1));
        $v = trim($v, "\"'");
        $env[$k] = $v;
    }
    return $env;
}

function llmcss_env_get(string $key, string $default = ''): string {
    $env = llmcss_env();
    $v = $env[$key] ?? $default;
    return is_string($v) ? $v : $default;
}

function llmcss_data_dir(): string {
    $d = llmcss_env_get('LLMCSS_DATA_DIR', llmcss_home() . '/.llmcss');
    return rtrim($d, '/');
}

function llmcss_pro_registry(): string {
    return rtrim(llmcss_env_get('LLMCSS_PRO_REGISTRY', llmcss_home() . '/.llmcss/pro-registry'), '/');
}

function llmcss_origin(): string {
    return rtrim(llmcss_env_get('LLMCSS_PUBLIC_ORIGIN', 'https://llmcss.io'), '/');
}

function llmcss_cf_cidrs(): array {
    return [
        '173.245.48.0/20', '103.21.244.0/22', '103.22.200.0/22', '103.31.4.0/22',
        '141.101.64.0/18', '108.162.192.0/18', '190.93.240.0/20', '188.114.96.0/20',
        '197.234.240.0/22', '198.41.128.0/17', '162.158.0.0/15', '104.16.0.0/13',
        '104.24.0.0/14', '172.64.0.0/13', '131.0.72.0/22',
        '2400:cb00::/32', '2606:4700::/32', '2803:f800::/32', '2405:b500::/32',
        '2405:8100::/32', '2a06:98c0::/29', '2c0f:f248::/32',
    ];
}

function llmcss_ip_in_cidr(string $ip, string $cidr): bool {
    $parts = explode('/', $cidr, 2);
    if (count($parts) !== 2) return false;
    [$subnet, $bits] = $parts;
    $ipBin = inet_pton($ip);
    $subBin = inet_pton($subnet);
    if ($ipBin === false || $subBin === false || strlen($ipBin) !== strlen($subBin)) return false;
    $bits = (int)$bits;
    $len = strlen($ipBin);
    $mask = '';
    $full = intdiv($bits, 8);
    $rem = $bits % 8;
    $mask .= str_repeat("\xff", $full);
    if ($rem) $mask .= chr((0xff << (8 - $rem)) & 0xff);
    $mask = str_pad($mask, $len, "\x00");
    return ($ipBin & $mask) === ($subBin & $mask);
}

function llmcss_is_cloudflare_addr(string $ip): bool {
    foreach (llmcss_cf_cidrs() as $cidr) {
        if (llmcss_ip_in_cidr($ip, $cidr)) return true;
    }
    return false;
}

function llmcss_client_ip(): string {
    $remote = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    if (llmcss_is_cloudflare_addr($remote)) {
        foreach (['HTTP_CF_CONNECTING_IP', 'HTTP_TRUE_CLIENT_IP'] as $h) {
            if (!empty($_SERVER[$h]) && filter_var($_SERVER[$h], FILTER_VALIDATE_IP)) {
                return $_SERVER[$h];
            }
        }
        $xff = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '';
        if ($xff !== '') {
            $first = trim(explode(',', $xff)[0]);
            if (filter_var($first, FILTER_VALIDATE_IP)) return $first;
        }
    }
    return $remote;
}

function llmcss_json_out(array $data, int $status = 200, array $extraHeaders = []): never {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store, no-cache, must-revalidate, private');
    header('X-Content-Type-Options: nosniff');
    foreach ($extraHeaders as $h) header($h);
    echo json_encode($data, JSON_UNESCAPED_SLASHES);
    exit;
}

function llmcss_db(): PDO {
    static $pdo = null;
    if ($pdo instanceof PDO) return $pdo;
    $dir = llmcss_data_dir();
    if (!is_dir($dir)) {
        mkdir($dir, 0700, true);
    }
    $path = $dir . '/licenses.sqlite';
    $pdo = new PDO('sqlite:' . $path, null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $pdo->exec('PRAGMA journal_mode=WAL');
    $pdo->exec('PRAGMA foreign_keys=ON');
    llmcss_migrate($pdo);
    @chmod($path, 0600);
    return $pdo;
}

function llmcss_migrate(PDO $pdo): void {
    $pdo->exec('CREATE TABLE IF NOT EXISTS licenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        token_hash TEXT NOT NULL UNIQUE,
        token_prefix TEXT NOT NULL,
        token_once TEXT,
        status TEXT NOT NULL DEFAULT \'active\',
        polar_customer_id TEXT,
        polar_subscription_id TEXT,
        polar_checkout_id TEXT,
        polar_order_id TEXT,
        created_at TEXT NOT NULL,
        revealed_at TEXT,
        revoked_at TEXT
    )');
    $pdo->exec('CREATE TABLE IF NOT EXISTS polar_events (
        event_id TEXT PRIMARY KEY,
        event_type TEXT NOT NULL,
        received_at TEXT NOT NULL
    )');
    $pdo->exec('CREATE TABLE IF NOT EXISTS rate_limits (
        ip TEXT NOT NULL,
        bucket TEXT NOT NULL,
        window_start INTEGER NOT NULL,
        count INTEGER NOT NULL,
        PRIMARY KEY (ip, bucket, window_start)
    )');
    $pdo->exec('CREATE INDEX IF NOT EXISTS idx_licenses_checkout ON licenses(polar_checkout_id)');
    $pdo->exec('CREATE INDEX IF NOT EXISTS idx_licenses_sub ON licenses(polar_subscription_id)');
    $pdo->exec('CREATE INDEX IF NOT EXISTS idx_licenses_hash ON licenses(token_hash)');
    $pdo->exec('CREATE UNIQUE INDEX IF NOT EXISTS idx_licenses_order_id ON licenses(polar_order_id) WHERE polar_order_id IS NOT NULL');
    $pdo->exec('CREATE UNIQUE INDEX IF NOT EXISTS idx_licenses_checkout_id ON licenses(polar_checkout_id) WHERE polar_checkout_id IS NOT NULL');
}

function llmcss_rate_limit(string $bucket, int $max, int $windowSeconds = 60): void {
    $ip = llmcss_client_ip();
    $now = time();
    $window = intdiv($now, $windowSeconds) * $windowSeconds;
    $pdo = llmcss_db();
    $pdo->prepare('DELETE FROM rate_limits WHERE window_start < ?')->execute([$now - 3600]);
    $pdo->prepare('INSERT INTO rate_limits (ip, bucket, window_start, count) VALUES (?,?,?,1)
        ON CONFLICT(ip, bucket, window_start) DO UPDATE SET count = count + 1')
        ->execute([$ip, $bucket, $window]);
    $st = $pdo->prepare('SELECT count FROM rate_limits WHERE ip=? AND bucket=? AND window_start=?');
    $st->execute([$ip, $bucket, $window]);
    $count = (int)$st->fetchColumn();
    if ($count > $max) {
        llmcss_json_out(['error' => 'rate_limited'], 429);
    }
}

function llmcss_token_hash(string $token): string {
    $pepper = llmcss_env_get('LLMCSS_TOKEN_PEPPER');
    if ($pepper === '') {
        throw new RuntimeException('LLMCSS_TOKEN_PEPPER is not set');
    }
    return hash_hmac('sha256', $token, $pepper);
}

function llmcss_issue_token(array $meta): array {
    $raw = 'llmcss_live_' . bin2hex(random_bytes(24));
    $hash = llmcss_token_hash($raw);
    $prefix = substr($raw, 0, 22);
    $now = gmdate('c');
    $pdo = llmcss_db();
    $pdo->prepare('INSERT INTO licenses
        (email, token_hash, token_prefix, token_once, status, polar_customer_id, polar_subscription_id, polar_checkout_id, polar_order_id, created_at)
        VALUES (?,?,?,?,\'active\',?,?,?,?,?)')
        ->execute([
            $meta['email'] ?? 'unknown',
            $hash,
            $prefix,
            $raw,
            $meta['polar_customer_id'] ?? null,
            $meta['polar_subscription_id'] ?? null,
            $meta['polar_checkout_id'] ?? null,
            $meta['polar_order_id'] ?? null,
            $now,
        ]);
    llmcss_ensure_zip();
    return ['token' => $raw, 'prefix' => $prefix];
}

function llmcss_ensure_zip(): string {
    $dir = llmcss_data_dir() . '/zips';
    if (!is_dir($dir)) mkdir($dir, 0700, true);
    $zipPath = $dir . '/llmcss-pro-catalog.zip';
    $registry = llmcss_pro_registry();
    $need = !is_file($zipPath);
    if (!$need) {
        $need = filemtime($zipPath) < (int)@filemtime($registry . '/index.json');
    }
    if ($need && is_dir($registry) && class_exists('ZipArchive')) {
        $zip = new ZipArchive();
        if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) === true) {
            $files = glob($registry . '/*.json') ?: [];
            foreach ($files as $f) {
                $zip->addFile($f, 'registry/' . basename($f));
            }
            $license = dirname($registry) . '/LICENSE';
            if (is_file($license)) $zip->addFile($license, 'LICENSE');
            $zip->close();
            @chmod($zipPath, 0600);
        }
    }
    return $zipPath;
}

/**
 * The Pro registry index, the same source llmcss_ensure_zip() packs. Every id
 * offered to a buyer is taken from here, never from the request.
 */
function llmcss_pro_index(): array {
    static $items = null;
    if (is_array($items)) return $items;
    $items = [];
    $path = llmcss_pro_registry() . '/index.json';
    if (is_readable($path)) {
        $json = json_decode((string)file_get_contents($path), true);
        if (is_array($json) && isset($json['items']) && is_array($json['items'])) {
            $items = $json['items'];
        }
    }
    return $items;
}

function llmcss_pro_ids_of_kind(string $kind): array {
    $ids = [];
    foreach (llmcss_pro_index() as $item) {
        if (!is_array($item)) continue;
        if (($item['kind'] ?? '') !== $kind) continue;
        $id = $item['id'] ?? null;
        if (is_string($id) && $id !== '') $ids[] = $id;
    }
    return $ids;
}

/**
 * Section ids that make up one page kit. The Pro registry kit file wins when it
 * carries a sections list; otherwise the public blueprint manifest is read,
 * which is generated from src/registry/templates-themed.mjs and ships beside
 * this api directory in the docroot.
 */
function llmcss_kit_sections(string $kitId): array {
    $kitFile = llmcss_pro_file($kitId);
    if ($kitFile !== null) {
        $json = json_decode((string)file_get_contents($kitFile), true);
        if (is_array($json) && isset($json['sections']) && is_array($json['sections'])) {
            return array_values(array_filter($json['sections'], 'is_string'));
        }
    }
    foreach ([__DIR__ . '/../templates.json', __DIR__ . '/../public/templates.json'] as $manifest) {
        if (!is_readable($manifest)) continue;
        $json = json_decode((string)file_get_contents($manifest), true);
        if (!is_array($json)) continue;
        $blueprints = $json['pageBlueprints'] ?? $json['blueprints'] ?? [];
        if (!is_array($blueprints)) continue;
        foreach ($blueprints as $bp) {
            if (!is_array($bp) || ($bp['id'] ?? '') !== $kitId) continue;
            if (isset($bp['sections']) && is_array($bp['sections'])) {
                return array_values(array_filter($bp['sections'], 'is_string'));
            }
        }
    }
    return [];
}

/**
 * Builds (and caches) a zip holding one page kit plus the section files it is
 * composed from. Returns null when the id is not a kit in the Pro registry.
 */
function llmcss_ensure_kit_zip(string $kitId): ?string {
    if (!in_array($kitId, llmcss_pro_ids_of_kind('kit'), true)) return null;
    $kitFile = llmcss_pro_file($kitId);
    if ($kitFile === null || !class_exists('ZipArchive')) return null;

    $registry = llmcss_pro_registry();
    $dir = llmcss_data_dir() . '/zips';
    if (!is_dir($dir)) mkdir($dir, 0700, true);
    $zipPath = $dir . '/llmcss-pro-' . $kitId . '.zip';

    $need = !is_file($zipPath);
    if (!$need) {
        $need = filemtime($zipPath) < (int)@filemtime($registry . '/index.json');
    }
    if ($need) {
        $allowed = llmcss_pro_ids_of_kind('section');
        $zip = new ZipArchive();
        if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) === true) {
            $zip->addFile($kitFile, 'registry/' . basename($kitFile));
            foreach (llmcss_kit_sections($kitId) as $sectionId) {
                if (!in_array($sectionId, $allowed, true)) continue;
                $f = llmcss_pro_file($sectionId);
                if ($f !== null) $zip->addFile($f, 'registry/' . basename($f));
            }
            $license = dirname($registry) . '/LICENSE';
            if (is_file($license)) $zip->addFile($license, 'LICENSE');
            $zip->close();
            @chmod($zipPath, 0600);
        }
    }
    return is_file($zipPath) ? $zipPath : null;
}

function llmcss_find_active_by_token(string $token): ?array {
    if (!str_starts_with($token, 'llmcss_live_')) return null;
    $hash = llmcss_token_hash($token);
    $st = llmcss_db()->prepare('SELECT * FROM licenses WHERE token_hash = ? AND status = \'active\' LIMIT 1');
    $st->execute([$hash]);
    $row = $st->fetch();
    return $row ?: null;
}

function llmcss_bearer(): ?string {
    $hdr = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if (preg_match('/^Bearer\s+(\S+)/i', $hdr, $m)) return $m[1];
    $q = $_GET['token'] ?? '';
    return is_string($q) && $q !== '' ? $q : null;
}

function llmcss_header_ci(string $name): string {
    $key = 'HTTP_' . strtoupper(str_replace('-', '_', $name));
    return (string)($_SERVER[$key] ?? '');
}

function llmcss_polar_verify(string $raw): bool {
    $secret = llmcss_env_get('POLAR_WEBHOOK_SECRET');
    if ($secret === '') return false;

    $id = llmcss_header_ci('webhook-id');
    $ts = llmcss_header_ci('webhook-timestamp');
    $sigHeader = llmcss_header_ci('webhook-signature');
    $legacy = llmcss_header_ci('polar-signature');

    if ($legacy !== '' && hash_equals(hash_hmac('sha256', $raw, $secret), strtolower($legacy))) {
        return true;
    }
    if ($id === '' || $ts === '' || $sigHeader === '') {
        return false;
    }
    if (abs(time() - (int)$ts) > 300) {
        return false;
    }

    $signed = $id . '.' . $ts . '.' . $raw;
    $keys = [$secret, base64_encode($secret)];
    foreach (['whsec_', 'polar_whs_'] as $prefix) {
        if (str_starts_with($secret, $prefix)) {
            $rest = substr($secret, strlen($prefix));
            $dec = base64_decode($rest, true);
            if ($dec !== false) $keys[] = $dec;
        }
    }

    $provided = [];
    foreach (preg_split('/\s+/', $sigHeader) as $part) {
        if (str_starts_with($part, 'v1,')) $provided[] = substr($part, 3);
    }
    foreach ($keys as $key) {
        $digest = base64_encode(hash_hmac('sha256', $signed, $key, true));
        foreach ($provided as $p) {
            if (hash_equals($digest, $p)) return true;
        }
    }
    return false;
}

function llmcss_event_seen(string $eventId): bool {
    $st = llmcss_db()->prepare('SELECT 1 FROM polar_events WHERE event_id = ?');
    $st->execute([$eventId]);
    return (bool)$st->fetchColumn();
}

function llmcss_event_mark(string $eventId, string $type): void {
    llmcss_db()->prepare('INSERT OR IGNORE INTO polar_events (event_id, event_type, received_at) VALUES (?,?,?)')
        ->execute([$eventId, $type, gmdate('c')]);
}

function llmcss_revoke_subscription(?string $subscriptionId): void {
    llmcss_revoke_from_polar(['subscription_id' => $subscriptionId]);
}

function llmcss_revoke_from_polar(array $data): void {
    $sub = $data['subscription_id'] ?? $data['subscription']['id'] ?? null;
    $order = $data['order_id'] ?? $data['order']['id'] ?? null;
    if (!is_string($order) || $order === '') {
        $maybe = $data['id'] ?? null;
        if (is_string($maybe) && $maybe !== '' && !isset($data['subscription_id'])) {
            $order = $maybe;
        }
    }
    $checkout = $data['checkout_id'] ?? $data['checkout']['id'] ?? null;
    if (!is_string($sub) && !is_string($order) && !is_string($checkout)) return;
    $now = gmdate('c');
    $pdo = llmcss_db();
    $pdo->prepare('UPDATE licenses SET status=\'revoked\', revoked_at=?, token_once=NULL
        WHERE status=\'active\' AND (
            (? IS NOT NULL AND polar_subscription_id = ?)
            OR (? IS NOT NULL AND polar_order_id = ?)
            OR (? IS NOT NULL AND polar_checkout_id = ?)
        )')->execute([
            $now,
            is_string($sub) ? $sub : null, is_string($sub) ? $sub : null,
            is_string($order) ? $order : null, is_string($order) ? $order : null,
            is_string($checkout) ? $checkout : null, is_string($checkout) ? $checkout : null,
        ]);
}

function llmcss_product_matches(?string $productId): bool {
    $want = llmcss_env_get('POLAR_PRODUCT_ID_PRO');
    if ($want === '' || $productId === null || $productId === '') return true;
    return hash_equals($want, $productId);
}

function llmcss_extract_email(array $data): string {
    $candidates = [
        $data['customer']['email'] ?? null,
        $data['user']['email'] ?? null,
        $data['email'] ?? null,
        $data['customer_email'] ?? null,
    ];
    foreach ($candidates as $e) {
        if (is_string($e) && filter_var($e, FILTER_VALIDATE_EMAIL)) return strtolower($e);
    }
    return 'unknown@llmcss.io';
}

function llmcss_existing_for_checkout(?string $checkoutId): ?array {
    if (!$checkoutId) return null;
    $st = llmcss_db()->prepare('SELECT * FROM licenses WHERE polar_checkout_id = ? ORDER BY id DESC LIMIT 1');
    $st->execute([$checkoutId]);
    $row = $st->fetch();
    return $row ?: null;
}

function llmcss_existing_for_sub(?string $subId): ?array {
    if (!$subId) return null;
    $st = llmcss_db()->prepare('SELECT * FROM licenses WHERE polar_subscription_id = ? AND status=\'active\' ORDER BY id DESC LIMIT 1');
    $st->execute([$subId]);
    $row = $st->fetch();
    return $row ?: null;
}

function llmcss_existing_for_order(?string $orderId): ?array {
    if (!$orderId) return null;
    $st = llmcss_db()->prepare('SELECT * FROM licenses WHERE polar_order_id = ? ORDER BY id DESC LIMIT 1');
    $st->execute([$orderId]);
    $row = $st->fetch();
    return $row ?: null;
}

function llmcss_grant_from_polar(array $data, string $eventType = ''): void {
    $productId = $data['product_id'] ?? $data['product']['id'] ?? $data['items'][0]['product']['id'] ?? null;
    if (is_string($productId) && !llmcss_product_matches($productId)) {
        return;
    }
    $checkoutId = $data['checkout_id'] ?? $data['checkout']['id'] ?? null;
    $subId = $data['subscription_id'] ?? $data['subscription']['id'] ?? null;
    $orderId = $data['order_id'] ?? $data['order']['id'] ?? null;
    if ((!is_string($orderId) || $orderId === '') && str_starts_with($eventType, 'order.')) {
        $orderId = $data['id'] ?? null;
    }
    if ((!is_string($checkoutId) || $checkoutId === '') && str_starts_with($eventType, 'checkout.')) {
        $checkoutId = $data['id'] ?? null;
    }
    if ((!is_string($subId) || $subId === '') && str_starts_with($eventType, 'subscription.')) {
        $subId = $data['id'] ?? null;
    }
    $email = llmcss_extract_email($data);

    if (llmcss_existing_for_checkout(is_string($checkoutId) ? $checkoutId : null)) return;
    if (llmcss_existing_for_sub(is_string($subId) ? $subId : null)) return;
    if (llmcss_existing_for_order(is_string($orderId) ? $orderId : null)) return;

    try {
        llmcss_issue_token([
            'email' => $email,
            'polar_customer_id' => $data['customer']['id'] ?? $data['customer_id'] ?? null,
            'polar_subscription_id' => is_string($subId) ? $subId : null,
            'polar_checkout_id' => is_string($checkoutId) ? $checkoutId : null,
            'polar_order_id' => is_string($orderId) ? $orderId : null,
        ]);
    } catch (PDOException $e) {
        if (!str_contains($e->getMessage(), 'UNIQUE')) {
            throw $e;
        }
    }
}

function llmcss_reveal_once(string $checkoutId): array {
    $pdo = llmcss_db();
    $pdo->exec('BEGIN IMMEDIATE');
    try {
        $st = $pdo->prepare('SELECT * FROM licenses WHERE polar_checkout_id = ? LIMIT 1');
        $st->execute([$checkoutId]);
        $row = $st->fetch();
        if (!$row) {
            $pdo->exec('COMMIT');
            return ['status' => 'missing'];
        }
        if ($row['status'] !== 'active') {
            $pdo->exec('COMMIT');
            return ['status' => 'revoked', 'row' => $row];
        }
        $once = $row['token_once'];
        if (!is_string($once) || $once === '') {
            $pdo->exec('COMMIT');
            return ['status' => 'already', 'row' => $row];
        }
        $up = $pdo->prepare('UPDATE licenses SET token_once=NULL, revealed_at=? WHERE id=? AND token_once IS NOT NULL');
        $up->execute([gmdate('c'), $row['id']]);
        $won = $up->rowCount() === 1;
        $pdo->exec('COMMIT');
        if ($won) {
            return ['status' => 'shown', 'token' => $once, 'row' => $row];
        }
        return ['status' => 'already', 'row' => $row];
    } catch (Throwable $e) {
        try { $pdo->exec('ROLLBACK'); } catch (Throwable $ignore) {}
        throw $e;
    }
}

function llmcss_pro_file(string $name): ?string {
    if (!preg_match('/^[a-z0-9][a-z0-9_-]{0,80}$/', $name)) return null;
    $path = llmcss_pro_registry() . '/' . $name . '.json';
    return is_file($path) ? $path : null;
}

function llmcss_polar_checkout_url(): string {
    $token = llmcss_env_get('POLAR_ACCESS_TOKEN');
    $product = llmcss_env_get('POLAR_PRODUCT_ID_PRO');
    $origin = llmcss_origin();
    if ($token === '' || $product === '') {
        throw new RuntimeException('Polar is not configured');
    }
    $body = json_encode([
        'products' => [$product],
        'success_url' => $origin . '/account?checkout_id={CHECKOUT_ID}',
        'embed_origin' => $origin,
    ], JSON_UNESCAPED_SLASHES);
    $ch = curl_init('https://api.polar.sh/v1/checkouts/');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $token,
            'Content-Type: application/json',
            'Accept: application/json',
        ],
        CURLOPT_POSTFIELDS => $body,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 15,
    ]);
    $res = curl_exec($ch);
    $code = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if (!is_string($res) || $code >= 400) {
        throw new RuntimeException('Polar checkout failed');
    }
    $json = json_decode($res, true);
    if (!is_array($json) || empty($json['url'])) {
        throw new RuntimeException('Polar checkout missing url');
    }
    return (string)$json['url'];
}
