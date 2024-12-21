<?php
// Activer les en-têtes CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Gérer les requêtes OPTIONS pour CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Connexion à la base de données
try {
    $pdo = new PDO('mysql:host=localhost;dbname=demande_db', 'user', 'password');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur de connexion à la base de données.']);
    exit();
}

// Détection de l'action via GET ou POST
$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'GET' && isset($_GET['action'])) {
    // Gérer les actions en GET
    if ($_GET['action'] === 'getUserRequests') {
        // Récupérer les demandes d'un utilisateur
        if (isset($_GET['user_id'])) {
            $userId = intval($_GET['user_id']); // Sécuriser l'ID utilisateur
            $stmt = $pdo->prepare("SELECT * FROM demandes WHERE user_id = ?");
            $stmt->execute([$userId]);
            $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (!empty($requests)) {
                echo json_encode(['success' => true, 'requests' => $requests]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Aucune demande trouvée pour cet utilisateur.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Paramètre user_id manquant.']);
        }
    } elseif ($_GET['action'] === 'getAllRequests') {
        try {
            if (isset($_GET['user_id'])) {
                $userId = intval($_GET['user_id']); // Sanitize the user_id
                $stmt = $pdo->prepare("SELECT * FROM demandes WHERE user_id = ?");
                $stmt->execute([$userId]);
            } else {
                $stmt = $pdo->query("SELECT * FROM demandes");
            }
    
            $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            if (!empty($requests)) {
                echo json_encode(['success' => true, 'requests' => $requests]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Aucune demande trouvée.']);
            }
        } catch (Exception $e) {
            error_log('Erreur lors de getAllRequests: ' . $e->getMessage());
            echo json_encode(['success' => false, 'message' => 'Erreur lors de la récupération des demandes.']);
        }
    }
    
} elseif ($method === 'POST') {
    // Gérer les actions en POST
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->action)) {
        if ($data->action === 'addRequest') {
            // Ajouter une nouvelle demande
            if (isset($data->userId, $data->title, $data->description)) {
                $stmt = $pdo->prepare("INSERT INTO demandes (user_id, titre, description, statut) VALUES (?, ?, ?, ?)");
                $stmt->execute([$data->userId, $data->title, $data->description, 'en attente']);
                echo json_encode(['success' => true, 'message' => 'Demande ajoutée avec succès.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Données manquantes pour ajouter une demande.']);
            }
        } elseif ($data->action === 'cancelRequest') {
            // Annuler une demande
            if (isset($data->requestId)) {
                $stmt = $pdo->prepare("UPDATE demandes SET statut = 'annulée' WHERE id = ? AND statut = 'en attente'");
                $stmt->execute([$data->requestId]);
                echo json_encode(['success' => true, 'message' => 'Demande annulée avec succès.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Paramètre requestId manquant pour annuler une demande.']);
            }
        } elseif ($data->action === 'updateRequestStatus') {
            // Modifier le statut d'une demande
            if (isset($data->requestId, $data->status)) {
                $stmt = $pdo->prepare("UPDATE demandes SET statut = ? WHERE id = ?");
                $stmt->execute([$data->status, $data->requestId]);
                echo json_encode(['success' => true, 'message' => 'Statut de la demande mis à jour avec succès.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Paramètres requestId ou status manquants.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Action POST non reconnue.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Aucune action spécifiée.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Méthode HTTP non reconnue.']);
}
