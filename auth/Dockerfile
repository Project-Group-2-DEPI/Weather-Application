#build stage
FROM golang:alpine AS builder
WORKDIR /go/src/app
COPY src/ .
WORKDIR /go/src/app/main
RUN go get -v ./...
RUN go build -o /go/bin/app/ -v ./...

#final stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates
COPY --from=builder /go/bin/app /app
ENTRYPOINT /app/auth
LABEL Name=auth Version=0.0.1
EXPOSE 8000
