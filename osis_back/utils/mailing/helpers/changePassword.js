export const changePassword = (name, url) => `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #007BFF;
            padding: 20px;
            text-align: center;
            color: white;
        }
        .header img {
            max-width: 150px;
            height: auto;
        }
        .content {
            padding: 20px;
            line-height: 1.6;
        }
        .content p {
            margin: 0 0 15px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #007BFF;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="YOUR_LOGO_URL" alt="Logo de l'entreprise" />
            <h1>Changer votre mot de passe</h1>
        </div>
        <div class="content">
            <p>Bonjour ${name},</p>
            <p>Pour changer votre mot de passe, veuillez cliquer sur le lien ci-dessous :</p>
            <a href="${url}" class="button">Changer le mot de passe</a>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Nom de votre entreprise. Tous droits réservés.</p>
            <p style="color: gray; font-size: 12px;">Veuillez ne pas répondre à cet e-mail. Cette boîte de réception n'est pas surveillée.</p>
        </div>
    </div>
</body>
</html>
`;
