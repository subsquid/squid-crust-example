process:
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


typegen: kusamaVersions.json
	@npx squid-substrate-typegen typegen.json


kusamaVersions.json:
	@make explore


explore:
	@npx squid-substrate-metadata-explorer \
		--chain wss://kusama-rpc.polkadot.io \
		--archive https://kusama.indexer.gc.subsquid.io/v4/graphql \
		--out kusamaVersions.json


up:
	@docker-compose up -d


down:
	@docker-compose down

redo:
	@npm ci
	@npm run build
	@docker-compose up -d
	@sleep 3
	@npx sqd db:migrate
	@node -r dotenv/config lib/processor.js

.PHONY: process serve start codegen migration migrate up down
