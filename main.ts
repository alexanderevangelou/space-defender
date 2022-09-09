namespace SpriteKind {
    export const powerUp = SpriteKind.create()
    export const mode = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    laser = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 9 9 9 9 . . . 
        . . . . . . . 9 9 9 9 5 9 . . . 
        9 9 9 9 9 9 9 9 9 5 5 9 9 . . . 
        . . . . . . . . 9 9 9 9 . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, spaceship, 200, 0)
    laser.setKind(SpriteKind.Projectile)
    music.pewPew.play()
    if (double_fire_mode && double_fire_mode.lifespan > 0) {
        laser.y += -5
        laser = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . 9 9 9 9 . . . 
            . . . . . . . 9 9 9 9 5 9 . . . 
            9 9 9 9 9 9 9 9 9 5 5 9 9 . . . 
            . . . . . . . . 9 9 9 9 . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, spaceship, 200, 0)
        laser.y += 5
    }
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 100)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, sprite).value += -15
    music.smallCrash.play()
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    enemyDeath(status.spriteAttachedTo())
})
function enemyDeath (enemy: Sprite) {
    enemy.destroy(effects.disintegrate, 500)
    if (Math.percentChance(10)) {
        powerUp = sprites.create(img`
            . . . . 8 8 8 8 8 8 8 8 . . . . 
            . . 8 8 8 8 8 8 8 8 8 8 8 8 . . 
            . 8 8 8 8 7 7 7 7 7 7 8 8 8 8 . 
            . 8 8 2 7 7 5 5 5 5 7 7 2 8 8 . 
            8 8 8 2 7 7 5 5 5 5 7 7 2 8 8 8 
            8 8 2 2 7 7 5 5 5 5 7 7 2 2 8 8 
            8 8 2 2 7 7 5 5 5 5 7 7 2 2 8 8 
            8 8 2 2 7 7 7 7 7 7 7 7 2 2 8 8 
            8 8 2 2 7 7 7 7 7 7 7 7 2 2 8 8 
            8 8 2 2 7 7 2 2 2 2 2 2 2 2 8 8 
            8 8 2 2 7 7 2 2 2 2 2 2 2 2 8 8 
            8 8 8 2 7 7 2 2 2 2 2 2 2 8 8 8 
            . 8 8 2 7 7 2 2 2 2 2 2 2 8 8 . 
            . 8 8 8 8 7 2 2 2 2 2 8 8 8 8 . 
            . . 8 8 8 8 8 8 8 8 8 8 8 8 . . 
            . . . . 8 8 8 8 8 8 8 8 . . . . 
            `, SpriteKind.powerUp)
        powerUp.x = enemy.x
        powerUp.y = enemy.y
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.powerUp, function (sprite, otherSprite) {
    double_fire_mode = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . 9 9 9 9 . . 
        . . . . . . . . 9 9 9 9 5 9 . . 
        . 9 9 9 9 9 9 9 9 9 5 5 9 9 . . 
        . . . . . . . . . 9 9 9 9 . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . 9 9 9 9 . . 
        . . . . . . . . 9 9 9 9 5 9 . . 
        . 9 9 9 9 9 9 9 9 9 5 5 9 9 . . 
        . . . . . . . . . 9 9 9 9 . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.mode)
    double_fire_mode.setPosition(48, 7)
    otherSprite.destroy()
    double_fire_mode.lifespan = 10000
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    enemyDeath(otherSprite)
    scene.cameraShake(6, 1000)
    music.bigCrash.play()
})
let statusbar: StatusBarSprite = null
let BAD_SHIP: Sprite = null
let powerUp: Sprite = null
let double_fire_mode: Sprite = null
let laser: Sprite = null
let spaceship: Sprite = null
effects.starField.startScreenEffect()
spaceship = sprites.create(img`
    . . . . . . . . . . . 6 4 4 4 
    . . . . . . . . . 6 6 6 6 6 . 
    . . . . . . . 6 6 6 6 6 . . . 
    . . . . . . 6 6 6 6 6 6 . . . 
    . . . 8 8 8 8 8 8 8 8 a . . . 
    . 6 6 6 6 6 6 6 6 6 a a a . . 
    6 6 6 6 6 6 6 6 6 6 a a a . . 
    . 6 6 6 6 6 6 6 6 6 a a a . . 
    . . . 8 8 8 8 8 8 8 8 a . . . 
    . . . . . . 6 6 6 6 6 6 . . . 
    . . . . . . . 6 6 6 6 6 . . . 
    . . . . . . . . . 6 6 6 6 6 . 
    . . . . . . . . . . . 6 4 4 4 
    `, SpriteKind.Player)
spaceship.setPosition(0, 53)
controller.moveSprite(spaceship)
spaceship.setStayInScreen(true)
info.setLife(5)
let enemyspeed = 20
let enemySpawnTime = 2000
game.onUpdateInterval(5000, function () {
    enemyspeed += 10
    enemyspeed = Math.min(enemyspeed, 50)
    enemySpawnTime += -500
    enemySpawnTime = Math.max(enemySpawnTime, 500)
})
forever(function () {
    BAD_SHIP = sprites.create(img`
        . . . . . . 3 . 
        . . . . . . 3 . 
        . . . . . 3 3 4 
        . . . . . 3 2 . 
        . . . . 3 3 2 . 
        . . . . 3 2 2 . 
        . 2 3 3 3 2 2 . 
        2 2 2 2 2 2 2 . 
        2 2 2 2 2 2 2 . 
        . 2 3 3 2 2 2 . 
        . . . 3 3 2 2 . 
        . . . . 3 3 2 . 
        . . . . . 3 2 . 
        . . . . . 3 3 4 
        . . . . . . 3 . 
        . . . . . . 3 . 
        `, SpriteKind.Player)
    BAD_SHIP.x = scene.screenWidth()
    BAD_SHIP.vx = 0 - enemyspeed
    BAD_SHIP.y = randint(10, scene.screenHeight() - 10)
    BAD_SHIP.setKind(SpriteKind.Enemy)
    statusbar = statusbars.create(15, 2, StatusBarKind.EnemyHealth)
    statusbar.setOffsetPadding(0, -20)
    statusbar.setColor(5, 12)
    statusbar.max = 100
    statusbar.attachToSprite(BAD_SHIP)
    pause(enemySpawnTime)
})
