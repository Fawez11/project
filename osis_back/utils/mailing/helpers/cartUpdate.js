export const cartUpdateNotification = (
  cart,
  products,
  userName
) => `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mise à jour du Panier</title>
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
            background-color: #007BFF;
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
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #f8f9fa;
            font-weight: bold;
        }
        .total-row {
            font-weight: bold;
            background-color: #f8f9fa;
        }
        .savings {
            color: #28a745;
            font-weight: bold;
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
            <h1>Mise à jour du Panier</h1>
        </div>
        <div class="order-info">
            <h2>Détails de la Mise à jour</h2>
            <p><strong>Client:</strong> ${userName}</p>
            <p><strong>ID Panier:</strong> ${cart.id}</p>
            <p><strong>Date de mise à jour:</strong> ${new Date(
              cart.updatedAt
            ).toLocaleString("fr-FR")}</p>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Produit</th>
                    <th>Quantité</th>
                    <th>Prix Unitaire</th>
                    <th>Remise</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${products
                  .map(
                    (p) => `
                    <tr>
                        <td>${p.name}</td>
                        <td>${p.order.quantity || 0}</td>
                        <td>${p.price}€</td>
                        <td>${p.order.discountPercentage || 0}%</td>
                        <td>${p.order.total || p.price}€</td>
                    </tr>
                `
                  )
                  .join("")}
                <tr class="total-row">
                    <td colspan="4">Total</td>
                    <td>${cart.totalPrice || 0}€</td>
                </tr>
                ${
                  cart.totalSaved > 0
                    ? `
                    <tr class="savings">
                        <td colspan="4">Économies Totales</td>
                        <td>${cart.totalSaved}€</td>
                    </tr>
                `
                    : ""
                }
            </tbody>
        </table>
        <div class="footer">
            <p>Un client a modifié son panier. Veuillez vérifier les changements dans le panneau d'administration.</p>
            <p>&copy; ${new Date().getFullYear()} Osis. Tous droits réservés.</p>
        </div>
    </div>
</body>
</html>`;
