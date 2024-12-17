# osis_back

## E-commerce-project

welcome to osis-backend file

- cd osis-back
- npm intall (to install all the required depandicies)
- npm start (to start your server)

additional ! :

## Routes testing on thunder / postman :

- user register (post) : http://localhost:5000/api/auth/register
- user login (post) : http://localhost:5000/api/auth/login
- admin register (post) : http://localhost:5000/api/overseer/admin/register
- admin login : http://localhost:5000/api/overseer/admin/login

## testing bodies :

### user-register:

{
"socialTitle": "dev",
"firstName": "amine",
"lastName": "hafsi",
"enterprise": "magic brain",
"taxNumber": "1234",
"email": "mm@gmail.com",
"password": "Amine123"
}

### user-login :

{
"email": "mm@gmail.com",
"password": "Amine123"
}

### admin register :

{
"firstName": "ala",
"lastName": "hafsi",
"email": "ala@example.com",
"password": "Password123"
}

### admin login :

{
"email": "adem@example.com",
"password": "Password123"
}
