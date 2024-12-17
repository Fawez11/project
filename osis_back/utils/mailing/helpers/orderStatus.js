export const orderStatus = (cart, userName, status) => `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Statut de Commande</title>
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
            background-color: ${
              status === "accepted"
                ? "#28a745"
                : status === "rejected"
                ? "#dc3545"
                : "#007BFF"
            };
            color: #ffffff;
            padding: 15px;
            border-radius: 8px 8px 0 0;
        }
        .status-badge {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 4px;
            color: white;
            font-weight: bold;
            background-color: ${
              status === "accepted"
                ? "#28a745"
                : status === "rejected"
                ? "#dc3545"
                : "#007BFF"
            };
            margin: 10px 0;
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
        .message {
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
            background-color: ${
              status === "accepted"
                ? "#d4edda"
                : status === "rejected"
                ? "#f8d7da"
                : "#cce5ff"
            };
            color: ${
              status === "accepted"
                ? "#155724"
                : status === "rejected"
                ? "#721c24"
                : "#004085"
            };
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Mise à jour de votre commande</h1>
        </div>
        
        <div class="order-info">
            <h2>Détails de la Commande</h2>
            <p><strong>Client:</strong> ${userName}</p>
            <p><strong>Commande N°:</strong> ${cart.id}</p>
            <p><strong>Date:</strong> ${new Date(cart.createdAt).toLocaleString(
              "fr-FR"
            )}</p>
            <div class="status-badge">
                ${
                  status === "accepted"
                    ? "Commande Acceptée"
                    : status === "rejected"
                    ? "Commande Refusée"
                    : "En Attente"
                }
            </div>
            <div class="message">
                ${
                  status === "accepted"
                    ? "Votre commande a été acceptée et sera traitée dans les plus brefs délais."
                    : status === "rejected"
                    ? "Votre commande a été refusée. Pour plus d'informations, veuillez nous contacter."
                    : "Votre commande est en cours de traitement."
                }
            </div>
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
                ${cart.products_orders
                  .map(
                    (p) => `
                    <tr>
                        <td>${p.name}</td>
                        <td>${p.order.quantity}</td>
                        <td>${p.price}€</td>
                        <td>${p.order.discountPercentage || 0}%</td>
                        <td>${p.order.total}€</td>
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
            ${
              status === "accepted"
                ? "<p>Merci de votre confiance ! Nous préparons votre commande.</p>"
                : status === "rejected"
                ? "<p>Nous sommes désolés que votre commande n'ait pas pu être traitée.</p>"
                : "<p>Nous traitons votre commande dans les plus brefs délais.</p>"
            }
            <p>Pour toute question, n'hésitez pas à nous contacter.</p>
            <p>&copy; ${new Date().getFullYear()} Osis. Tous droits réservés.</p>
        </div>
    </div>
</body>
</html>`;
