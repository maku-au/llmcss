<?php
declare(strict_types=1);
require __DIR__ . '/lib.php';

header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo 'method not allowed';
    exit;
}

$raw = file_get_contents('php://input') ?: '';
if ($raw === '' || !llmcss_polar_verify($raw)) {
    http_response_code(403);
    echo 'invalid signature';
    exit;
}

$event = json_decode($raw, true);
if (!is_array($event)) {
    http_response_code(400);
    echo 'invalid json';
    exit;
}

$type = (string)($event['type'] ?? $event['event'] ?? '');
$eventId = (string)(llmcss_header_ci('webhook-id') ?: ($event['id'] ?? ''));
$data = $event['data'] ?? [];
if (!is_array($data)) $data = [];

try {
    $pdo = llmcss_db();
    $pdo->beginTransaction();
    if ($eventId !== '' && llmcss_event_seen($eventId)) {
        $pdo->commit();
        http_response_code(202);
        echo '';
        exit;
    }
    if ($eventId !== '') llmcss_event_mark($eventId, $type);

    switch ($type) {
        case 'order.paid':
        case 'order.created':
        case 'checkout.updated':
        case 'checkout.confirmed':
        case 'subscription.created':
        case 'subscription.active':
        case 'subscription.uncanceled':
            $status = $data['status'] ?? '';
            if ($type === 'checkout.updated' && $status !== 'succeeded' && $status !== 'confirmed') {
                break;
            }
            if ($type === 'order.created') {
                $paid = ($data['status'] ?? '') === 'paid';
                if (!$paid) break;
            }
            llmcss_grant_from_polar($data, $type);
            break;
        case 'subscription.canceled':
        case 'subscription.revoked':
        case 'order.refunded':
            llmcss_revoke_from_polar($data);
            break;
    }
    $pdo->commit();
} catch (Throwable $e) {
    if (isset($pdo) && $pdo->inTransaction()) $pdo->rollBack();
    error_log('llmcss webhook error type=' . $type);
    http_response_code(500);
    echo 'error';
    exit;
}

http_response_code(202);
echo '';
