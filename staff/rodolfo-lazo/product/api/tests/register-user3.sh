curl -H 'Content-Type: application/json' \
    -d '{
        "name": "Aline",
        "email":"aline@mail.com",
        "username":"aline123",
        "password":"123123123",
        "passwordRepeat":"123123123"
        }' \
    "http://localhost:8080/users" -v
