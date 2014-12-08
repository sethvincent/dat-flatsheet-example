# dat-flatsheet-example

This is a little experiment. An attempt at getting the editor from flatsheet to work with a dat instance.

## Installation

### Clone the repo:

```
git clone git@github.com:sethvincent/dat-flatsheet-example.git
```

### Change directory:

```
cd dat-flatsheet-example
```

### Install dependencies:

```
npm install
```

### Install dat globally:

```
npm i -g dat
```

### Create a dat instance:

```
dat init
```

### Load up the dat with some data. 
You can use whatever data you have on hand, or run this command to plop in some test data:

```
npm test
```

### Start the dat server

```
dat listen
```

### Start the editor
In a separate terminal tab or window

```
npm start
```


## todos:

- figure out why cors / post requests are failing
- make sure all the column renaming, sorting, and other basic features are working as expected
- better styles