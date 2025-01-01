kaboom({
    font: "sink",
    background: [0, 0, 0, 1],
});

loadSprite("player", "Sprites/player.png");
loadSprite("ghost", "Sprites/ghost.png");
loadSprite("bullet", "Sprites/bullet.png");
loadSound("gameover", "Sounds/gameover.mp3");
loadSound("points", "Sounds/ting.mp3");

debug.log("Welcome to Shoot the Ghost Game! Use left and right arrow keys to move the player and space to shoot the ghosts. Avoid the ghosts. Hunt 20 ghosts to win the game!");

const speed = 300;
const proofSpeed = 190;
const ghostSpeed = 200;
const bulletspeed = 300;
let hunt = 0;
let game = true;

const player = add([
    sprite("player"),
    pos(480, 480),
    area(),
    scale(0.1),
]);

setInterval(() => {
    if (game == true) {
        for (let i = 0; i < 3; i++) {
            let a = add([
                sprite("ghost"),
                pos(rand(0, width()), 0),
                scale(0.1),
                area(),
                "ghost",
            ]);
            a.onUpdate(() => {
                a.move(0, ghostSpeed);
                if (a.pos.y >= height()) {
                    destroy(a);
                }
            });
        }
    }
}, 6000);

onKeyDown("left", () => {
    player.move(-speed, 0);
});

onKeyDown("right", () => {
    player.move(+speed, 0);
});

onKeyDown("space", () => {
    if (game == true) {
        const b = add([
            sprite("bullet"),
            scale(0.2),
            area(),
            pos(player.pos),
        ]);

        b.onUpdate(() => {
            b.move(0, -bulletspeed);
            if (b.pos.y < 0) {
                destroy(b);
            }
        });
    
        b.onCollide("ghost", (a) => {
            destroy(a);
            destroy(b);
            hunt += 1;
            debug.log("Hunts: " + hunt);
            play("points");
        });
    }
});

player.onCollide("ghost", (a) => {
    game = false;
    debug.log("Game Over, refresh to play again!");
    play("gameover");
    destroy(player);
    destroy(a);
});

player.onUpdate(() => {
    if (hunt >= 20) {
        game = false;
        debug.log("You Win! Refresh to play again!");
        destroy(player);
    }
});