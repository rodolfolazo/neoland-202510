curl -X PATCH \
 -H 'Authorization: Basic user-0' \
 -H 'Content-Type: application/json' \
 -d '{
    "email":"annie@mail.com",
    "newEmail":"annie@mail.ie",
    "newEmailRepeat":"annie@mail.ie"
    }' \
 http://localhost:8080/users/email -v
