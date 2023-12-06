import * as fs from "fs";
import * as os from "os";

type Game = {
    id : number,
    r: number,
    g: number,
    b: number,
    power: number,
}

function createGames() {
    const input = fs.readFileSync('src/day2/input.txt','utf8');

    return input.split(os.EOL).map(line => {
        return line.split(/[,;:]/).reduce((game: Game, part) => {
            const value = part.match(/\d{1,}/);
            switch (true) {
                case part.includes('Game'):
                    game.id = Number(value); break;
                case part.includes('red'):
                    game.r = Number(value) > game.r ? Number(value) : game.r; break;
                case part.includes('blue'):
                    game.b = Number(value) > game.b ? Number(value) : game.b; break;
                case part.includes('green'):
                    game.g = Number(value) > game.g ? Number(value) : game.g; break;
            }

            game.power = game.r * game.g * game.b;

            return game;
        }, { id:0, b:0, g:0, r:0, power:0 });
    });
}

const partOne = function() {
    const validGame = {r:12, g:13, b:14}
    const games = createGames();

    const validGames = games.filter(game=>{
        return game.r <= validGame.r
            && game.g <= validGame.g
            && game.b <= validGame.b;
    });

    const totalGameId = validGames.reduce((total, game) => {
        return game.id + total;
    }, 0)

    console.log(`Part One: ${totalGameId}`)
}

const partTwo = function() {
    const games = createGames();

    const totalGamePower = games.reduce((total, game) => {
        return game.power + total;
    }, 0)

    console.log(`Part Two: ${totalGamePower}`)
}

partOne(); //1734
partTwo(); //70387
