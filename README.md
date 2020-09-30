# apex-specs-generator

This is a gulp task, which automatically generates any specification documents of Apex classes or triggers in markdown format.

## How to use

### download

```sh
git clone https://github.com/takahitomiyamoto/apex-specs-generator.git

cd apex-specs-generator

rm -rf .git

yarn install && yarn gulp:init
```

### setup

- [environment.json](https://github.com/takahitomiyamoto/sfdx-gulp-manifest#environmentjson)
- [Private Key and Certificate](https://github.com/takahitomiyamoto/sfdx-gulp-manifest#private-key-and-certificate)
- [Connected App](https://github.com/takahitomiyamoto/sfdx-gulp-manifest#connected-app)

### enjoy!!

```sh
yarn gulp:specs:apex:generate && yarn prettier
```

You can see your Apex specification documents in `docs/`.
