export const cartCancellationNotification = (cart, userName) => `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Annulation de Panier</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            background-color: #dc3545;
            color: #ffffff;
            padding: 15px;
            border-radius: 8px 8px 0 0;
        }
        .order-info {
            margin: 20px 0;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            padding: 15px;
            font-size: 14px;
            color: #666666;
            border-top: 1px solid #ddd;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Annulation de Panier</h1>
        </div>
        <div class="order-info">
            <h2>Détails de l'Annulation</h2>
            <p><strong>Client:</strong> ${userName}</p>
            <p><strong>ID Panier:</strong> ${cart.id}</p>
            <p><strong>Date d'annulation:</strong> ${new Date().toLocaleString(
              "fr-FR"
            )}</p>
            <p><strong>Raison:</strong> Annulation par le client</p>
        </div>
        <div class="footer">
            <p>Un client a annulé son panier. Les produits ont été remis en stock.</p>
            <p>&copy; ${new Date().getFullYear()} Osis. Tous droits réservés.</p>
        </div>
    </div>
</body>
</html>`;
