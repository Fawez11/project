export const userUnblocked = (name) => `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Compte Débloqué</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            background-color: #28a745;
            color: #ffffff;
            padding: 10px;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            color: #333333;
            margin-bottom: 20px;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 14px;
            color: #666666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Compte Débloqué</h1>
        </div>
        <div class="content">
            <p>Bonjour ${name},</p>
            <p>Votre compte a été débloqué. Vous pouvez maintenant vous reconnecter à votre compte.</p>
            <p>Merci de votre patience.</p>
        </div>
        <div class="footer">
            <p>Si vous avez des questions, n'hésitez pas à <a href="mailto:support@example.com">nous contacter</a>.</p>
            <p>&copy; 2024 RebootKamp Tunisie. Tous droits réservés.</p>
        </div>
    </div>
</body>
</html>`;
