[![dependencies status](https://david-dm.org/takahitomiyamoto/apex-specs-generator.svg)](https://david-dm.org/takahitomiyamoto/apex-specs-generator)
[![devDependency status](https://david-dm.org/takahitomiyamoto/apex-specs-generator/dev-status.svg)](https://david-dm.org/takahitomiyamoto/apex-specs-generator#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/takahitomiyamoto/apex-specs-generator.svg)](https://codeclimate.com/github/takahitomiyamoto/apex-specs-generator)

![GitHub issues](https://img.shields.io/github/issues/takahitomiyamoto/apex-specs-generator)
![GitHub forks](https://img.shields.io/github/forks/takahitomiyamoto/apex-specs-generator)
![GitHub stars](https://img.shields.io/github/stars/takahitomiyamoto/apex-specs-generator)
![GitHub license](https://img.shields.io/github/license/takahitomiyamoto/apex-specs-generator?color=blue)

<a href="https://twitter.com/intent/tweet?text=Happy Coding!!&url=https%3A%2F%2Fgithub.com%2Ftakahitomiyamoto%2Fapex-specs-generator"><img alt="Twitter" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Ftakahitomiyamoto%2Fapex-specs-generator"></a>

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

## Acknowledgments

- [ApexDoc](https://github.com/SalesforceFoundation/ApexDoc)
- [TypeDoc](https://github.com/TypeStrong/typedoc)
