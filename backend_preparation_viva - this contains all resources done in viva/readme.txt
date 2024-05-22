IMAGE FOR APP 1

docker build -t inspireai-userprofiling-service-image-v3 -f Dockerfile1 .

docker run -d -p 8080:8080 inspireai-userprofiling-service-image-v3



IMAGE FOR APP 2

docker build -t inspireai-quoting-service-image-v3 -f Dockerfile2 .

docker run -d -p 8081:8081 inspireai-quoting-service-image-v3




