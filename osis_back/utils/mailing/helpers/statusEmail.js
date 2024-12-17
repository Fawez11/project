export const orderStatus = (products, category = null) => `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liste des Produits</title>
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
        .category-info {
            margin: 20px 0;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 5px;
        }
        .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            padding: 20px 0;
        }
        .product-card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            background-color: #fff;
        }
        .product-image {
            width: 100%;
            height: 150px;
            object-fit: cover;
            border-radius: 4px;
            margin-bottom: 10px;
        }
        .product-name {
            font-weight: bold;
            margin: 10px 0;
            color: #333;
        }
        .product-price {
            color: #28a745;
            font-weight: bold;
            font-size: 1.1em;
        }
        .product-original-price {
            text-decoration: line-through;
            color: #999;
            font-size: 0.9em;
            margin-right: 10px;
        }
        .discount-badge {
            background-color: #dc3545;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8em;
            display: inline-block;
            margin-left: 10px;
        }
        .stock-status {
            margin-top: 10px;
            font-size: 0.9em;
        }
        .in-stock {
            color: #28a745;
        }
        .low-stock {
            color: #ffc107;
        }
        .out-of-stock {
            color: #dc3545;
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
            <h1>Liste des Produits${category ? ` - ${category}` : ""}</h1>
        </div>
        
        <div class="product-grid">
            ${products
              .map(
                (product) => `
                <div class="product-card">
                    ${
                      product.media && product.media[0]
                        ? `
                        <img src="${product.media[0].url}" alt="${product.name}" class="product-image">
                    `
                        : ""
                    }
                    <div class="product-name">${product.name}</div>
                    <div class="price-section">
                        ${
                          product.isOnSale
                            ? `
                            <span class="product-original-price">${product.price}€</span>
                            <span class="product-price">${product.finalPrice}€</span>
                            <span class="discount-badge">-${product.discountPercentage}%</span>
                        `
                            : `
                            <span class="product-price">${product.price}€</span>
                        `
                        }
                    </div>
                    <div class="stock-status ${
                      product.quantity > 10
                        ? "in-stock"
                        : product.quantity > 0
                        ? "low-stock"
                        : "out-of-stock"
                    }">
                        ${
                          product.quantity > 10
                            ? "En stock"
                            : product.quantity > 0
                            ? `Stock faible: ${product.quantity} restants`
                            : "Rupture de stock"
                        }
                    </div>
                </div>
            `
              )
              .join("")}
        </div>

        <table>
            <thead>
                <tr>
                    <th>Produit</th>
                    <th>Prix</th>
                    <th>Stock</th>
                    <th>Statut</th>
                </tr>
            </thead>
            <tbody>
                ${products
                  .map(
                    (product) => `
                    <tr>
                        <td>${product.name}</td>
                        <td>
                            ${
                              product.isOnSale
                                ? `<span class="product-original-price">${product.price}€</span>
                                 <span class="product-price">${product.finalPrice}€</span>`
                                : `<span class="product-price">${product.price}€</span>`
                            }
                        </td>
                        <td>${product.quantity}</td>
                        <td>${
                          product.availability ? "Disponible" : "Indisponible"
                        }</td>
                    </tr>
                `
                  )
                  .join("")}
            </tbody>
        </table>

        <div class="footer">
            <p>Cet email a été généré automatiquement par le système.</p>
            <p>&copy; ${new Date().getFullYear()} Osis. Tous droits réservés.</p>
        </div>
    </div>
</body>
</html>`;
