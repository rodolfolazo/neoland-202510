curl -H 'Content-Type: application/json' \
    -d '{"name": "Fernando","email":"fernando@mail.com","username":"fernando123","password":"123123123","passwordRepeat":"123123123"}' \
    "http://localhost:8080/users" -v
