export const verifyEmail = (url, name) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Verified</title>
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
            background-color: #007BFF;
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
        .content a {
            display: inline-block;
            padding: 10px 20px;
            color: #ffffff;
            background-color: #28a745;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .content a:hover {
            background-color: #218838;
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
            <h1>Votre compte a été vérifié !</h1>
        </div>
        <div class="content">
            <p>Bonjour ${name},</p>
            <p>Félicitations ! Votre compte a été vérifié avec succès. Vous pouvez maintenant accéder à toutes nos fonctionnalités.</p>
            <p>Cliquez sur le bouton ci-dessous pour vérifier votre compte :</p>
            <a href="${url}">Vérifiez votre compte</a>
        </div>
        <div class="footer">
            <p>Si vous avez des questions, n'hésitez pas à <a href="mailto:hello@rbk.com">nous contacter</a>.</p>
            <p>&copy; 2024 RebootKamp Tunisie. Tous droits réservés.</p>
        </div>
    </div>
</body>
</html>
`;
