![tradecore](https://tradecore.com/wp-content/themes/tradecore/assets/img/logo-below.png)

Project test
==============

Summery

The focus of the test is to assess the maintainability and extendability of the code you present.

This simulator is supposed to determine a battle outcome.
The Battlefield will support a configurable number of armies. Each army can have a configurable
number of squads (>2). Each squad consisted of a number of units (>5).
Once the simulator is started all army squads will start attacking each other until there is only one
army left.

Soldiers have health, recharge and experience.

Squads attaking each others.

When all squads are defeated army is defeated.

Squad health is equal to health of soldier with best health.

Squad recharge is equal to recharge of soldier with best recharge.

## Configuration

The following constraints should be configurable:

● The number of armies: 2 <= n

● The choice of attack strategy per army: random|weakest|strongest

● The number of squads per army: 2 <= n

● The number of units per squad: 5 <= n <= 10 (vehicle is always calculated as a single unit no
matter how many operators it has)

## Requirements

● Use ​Node.JS​ for development.

● You are required to provide a url to the git repository with the task including all
commits/changes. If you complete the task and send it without a git repository, your
application will be refused automatically.

● Task deadline is 5 days.

● Please use ES6+

● A battle log must exist.

● Please provide readme file with installation/run instructions

● Some ​unit tests​ for the project should be created.


## Installation 

To install application it is necessary to run:

```npm install```

## Starting application

to start application you should run:

```npm start```

it will compile application to ES6 and run it

Application can be run in dev mode with command:

```npm run dev```

Or you can just compile application:

```npm run compile```

## Testing

To run unit tests:

```npm test```

## Configuartion

In the root directory there is .env file which I used to configure simulation

So you can setup:

-- number of armies

-- number of squads

-- number of soldiers

-- simulation speed in MS

-- additional damag, it use to speed up simulation

-- log detailed, if you want just simple logs keep it to false

-- you can change strategy of attack to weakest or strongest, by default it will be on random
   to change strategy you can add Army[num]=stratgy

