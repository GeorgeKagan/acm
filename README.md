## Prerequisites
* Docker & Docker Compose

## How to run
* Run `docker-compose up`
* Add resource: `curl -X POST http://localhost/resources/myres -H "Content-Type: application/json" -d '{"context": "secret", "ipRange": ["127.0.0.1/8"]}' -v | jq`
* Read resource: `curl http://localhost/resources/myres?ip=127.1.2.3 -v | jq`

## Troubleshooting
* If mongo is complaining, stop docker-compose and re-run it
* If your system doesn't have `jq`, just remove it