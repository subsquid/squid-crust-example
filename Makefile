process: migrate
	@node -r dotenv/config lib/processor.js


serve:
	@npx squid-graphql-server


migrate:
	@npx sqd db:migrate


migration:
	@npx sqd db:create-migration Data


build:
	@npm run build


codegen:
	@npx sqd codegen


typegen: crustVersions.json
	@npx squid-substrate-typegen typegen.json


crustVersions.json:
	@make explore


explore:
	@npx squid-substrate-metadata-explorer \
		--chain wss://rpc-crust-mainnet.decoo.io \
		--archive https://crust.indexer.gc.subsquid.io/v4/graphql \
		--out crustVersions.json


up:
	@docker-compose up -d


down:
	@docker-compose down


.PHONY: process serve start codegen migration migrate up down
