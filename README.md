# squid-statemine

Sample [squid](https://subsquid.io) project to demonstrate its structure and conventions.
It accumulates [stetemine](https://parachains.info/details/statemine) information about assets and asset balances and serves them via graphql API.

## Prerequisites

* node 16.x
* docker

## Notes on the example

> :memo: **Note:** The peculiarity of this sample project is that it allows to showcase a slightly more complex project with multiple events and various states for 

The Crust network provides Web3 decentralized storage services. The Squid API in this sample project is focused on gathering information about work accomplished by nodes, adding and/or removing files, and Storage Orders placed by users who want data to be persisted on the network.

Starting from the squid-template project, here are the necessary steps to get to the final result, stored in this repository:

### 1. Install necessary dependencies

Start by installing the dependencies of the project with

```bash
npm i
```

Crust network offers an `npm` package with the definition of the types used in their blockchain. Install this package with the command

```bash
npm i @crustio/type-definitions
```

### 2. Change the `schema.graphql` file

To define the new entities and make sure they will be saved in the database, the starting point is the `schema.graphql` file.

### 3. Regenerate the TypeScript entity models

The `sqd codegen` command reads the `schema.graphql` file and automatically generates TypeScript classes, modeling the entities. You can find these in the `src/model/generated` folder.

### 4. Generate type-safe wrapper Interfaces for Substrate entities

The Squid framework offers an automated tool to generate Interfaces for Substrate entities (Events, Extrinsics, Storage items, ...). This is very useful to deal with Runtime upgrades, that might change the definition of these types.

#### Generate a typesBundle file

Our documentation has a [mini-guide on how to](https://docs.subsquid.io/faq/where-do-i-get-a-type-bundle-for-my-chain) create a JSON file that defines types used in the blockchain, starting from polkadot types definitions.

Please head over to our documentation, follow [the guide](https://docs.subsquid.io/faq/where-do-i-get-a-type-bundle-for-my-chain) and generate a file named `crustTypesBundle.json` (or cheat and take a sneak peek at the one in this repository.)

#### Explore the chain

Run this command to collect blockchain metadata information in a file.

```bash
npx squid-substrate-metadata-explorer \
    --chain wss://rpc-crust-mainnet.decoo.io \
    --archive https://crust.indexer.gc.subsquid.io/v4/graphql \
    --out crustVersions.json
```

#### Edit the config file

The `typegen.json` file offers the ability to configure the interface creation process, by defining which events, extrinsics or storage items are going to be processed by the API, for which the process will generate interfaces. Edit the file to look like this:

```json
{
  "outDir": "src/types",
  "chainVersions": "crustVersions.json",
  "typesBundle": "crustTypesBundle.json",
  "events": [
    "swork.WorksReportSuccess",
    "swork.JoinGroupSuccess",
    "market.FileSuccess"
  ],
  "calls": []
}
```

#### Generate interfaces

Previously collected metadata is used by the following command to generate TypeScript files defining interfaces. You can find them in `src/types`.

```bash
npx squid-substrate-typegen typegen.json
```

### 5. Define the business logic

The only thing left to do is develop the business logic. To do so, edit the `src/processor.ts` file. Remember to:

* change the data source for the `SubstrateProcessor` class
* correctly set the typesBundle by importing the previously installed `npm` package
* define functions to process event data and bind them to the processor class using the `addEventHandler` method

### 6. Reset the database and run the API

To make sure we are starting from scratch, launch these commands to reset the database and apply the new schema. Make sure the database container is up (otherwise, launch `docker-compose up -d`).

```bash
sqd db drop
sqd db create
rm -rf db/migrations/*.js
sqd db create-migration Init
sqd db migrate
```

Now the only thing left to do is to build and run the processor, and launch the graphql server.

```bash
npm run build
node -r dotenv/config lib/processor.js
# in a different console window, since the previous command will block the terminal
npx squid-graphql-server
```

## Disclaimer

This is alpha-quality software. Expect some bugs and incompatible changes in coming weeks.
