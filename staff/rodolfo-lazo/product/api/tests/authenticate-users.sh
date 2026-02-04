curl -H 'Content-Type: application/json' \
 -d '{"username":"annie123","password":"123123123"}' \
 "http://localhost:8080/users/auth" -v

 curl -H 'Content-Type: application/json' \
 -d '{"username":"fernando123","password":"123123123"}' \
 "http://localhost:8080/users/auth" -v

 curl -H 'Content-Type: application/json' \
 -d '{"username":"fernando123","password":"123123123"}' \
 "http://localhost:8080/users/auth" -v
