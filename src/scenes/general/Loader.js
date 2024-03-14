class Loader extends Phaser.Scene{
    constructor(){
        super('Loader')
    }

    init(){
        this.quest = undefined
        this.existing_inv = undefined
    }

    preload(){
        //path
        this.load.path = './assets'

        //load tilemap
        this.load.image('base-tileset', '/tilesets/base_tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON', '/tilesets/main-tileset-1.json')

        //load animated sprites
        this.load.spritesheet('water-pond', '/spritesheets/water-anims.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('tree-1', '/spritesheets/tree-1.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet('tree-2', '/spritesheets/tree-2.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet('tree-2-second', '/spritesheets/tree-2-second.png', {frameWidth: 128, frameHeight: 128})
        this.load.spritesheet('tree-3', '/spritesheets/tree-3.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet('bush-1', '/spritesheets/bush-1.png', {frameWidth: 16, frameHeight: 16})
        this.load.spritesheet('quest-icon', '/spritesheets/quest-icon.png', {frameWidth: 16, frameHeight: 16})
        this.load.spritesheet('enemy-1-anim', '/spritesheets/enemy-1.png', {frameWidth: 32, frameHeight: 50})
        this.load.spritesheet('enemy-2-anim', '/spritesheets/enemy-2.png', {frameWidth: 32, frameHeight: 50})
        this.load.spritesheet('boss-aoe', '/spritesheets/damage-aoe-boss.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('player', '/spritesheets/player.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('player-light-attack-anim', '/spritesheets/player-light-attack-anim.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('player-heavy-attack-anim', '/spritesheets/player-heavy-attack-anim.png', {frameWidth: 32, frameHeight: 32})

        //load images (tmp)
        this.load.image('continue-game-button-hover', '/img/continue-game-button-hover.png')
        this.load.image('continue-game-button', '/img/continue-game-button.png')
        this.load.image('cursor-2', '/img/cursor-2.png')
        this.load.image('cursor', '/img/cursor.png')
        this.load.image('enemy-1', '/img/enemy-1.png')
        this.load.image('Frozen Heart', '/img/frozen-heart.png')
        this.load.image('fruit', '/img/fruit.png')
        this.load.image('fullscreen' , '/img/fullscreen.png')
        this.load.image('mysterious herb', '/img/mysterious-herb.png')
        this.load.image('lesser nepian blood', '/img/nepian-blood.png')
        this.load.image('new-game-button-hover', '/img/new-game-button-hover.png')
        this.load.image('new-game-button', '/img/new-game-button.png')
        this.load.image('npc-1', '/img/npc-1.png') 
        this.load.image('rect', '/img/rect.png')
        this.load.image('save-arrow', '/img/save-arrow.png')
        this.load.image('save', '/img/save.png')

        //load quests
        this.load.json('quest-1', '/quests/quest-1.json')
        this.load.json('quest-2', '/quests/quest-2.json')
        this.load.json('quest-3', '/quests/quest-3.json')
        this.load.json('quest-4', '/quests/quest-4.json')
        this.load.json('quest-5', '/quests/quest-5.json')
        this.load.json('quest-6', '/quests/quest-6.json')
        this.load.json('quest-7', '/quests/quest-7.json')

        //load audio
        this.load.audio('in-water', '/audio/in-water.mp3')
        this.load.audio('walking', '/audio/walking-dirt.mp3')
        this.load.audio('attack-light', '/audio/attack-light.mp3')
        this.load.audio('attack-light-hit', '/audio/attack-light-hit.mp3')
        this.load.audio('attack-heavy', '/audio/attack-heavy.mp3')
        this.load.audio('attack-heavy-hit', '/audio/attack-heavy-hit.mp3')
        this.load.audio('collect-herb', '/audio/collect-herb.mp3')
        this.load.audio('enemy-1-hit', '/audio/enemy-hit.mp3')
        this.load.audio('enemy-2-hit', '/audio/enemy-hit-2.mp3')


        //load existing gamestates...
        if(window.localStorage.getItem('existing_quest') != null) {
            this.quest = window.localStorage.getItem('existing_quest')
            this.quest = JSON.parse(this.quest)
           // console.log(this.quest)   
        }

        if(window.localStorage.getItem('existing_inv') != null) {
            this.existing_inv = window.localStorage.getItem('existing_inv')
            const parse = JSON.parse(this.existing_inv)
            this.existing_inv = new Map(parse)
           // console.log(this.existing_inv)
        }
    }   

    create(){

    //player anims----------------------------
        this.anims.create({
            key: 'player-walk',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 1}),
            frameRate: 5,
            repeat: false
        })

        this.anims.create({
            key: 'player-light-attack',
            frames: this.anims.generateFrameNumbers('player-light-attack-anim', {start: 0, end: 4}),
            frameRate: 10,
            repeat: false
        })

        this.anims.create({
            key: 'player-heavy-attack',
            frames: this.anims.generateFrameNumbers('player-heavy-attack-anim', {start: 0, end: 9}),
            frameRate: 10,
            repeat: false
        })
        
        
    //enemy anims----------------------------
        this.anims.create({
            key: 'enemy-idle-anim',
            frames: this.anims.generateFrameNumbers('enemy-1-anim', {start: 0, end: 7}),
            frameRate: 10,
            repeat: -1
        })
  
        this.anims.create({
            key: 'enemy2-idle-anim',
            frames: this.anims.generateFrameNumbers('enemy-2-anim', {start: 0, end: 6}),
            frameRate: 10,
            repeat: -1
        })

        
        //boss mechanic
        this.anims.create({
            key: 'boss-aoe-anim',
            frames: this.anims.generateFrameNumbers('boss-aoe', {start: 0, end: 15}),
            frameRate: 8,
            repeat: 1
        })
    
    //sprite anims----------------------------
        //quest icon
        this.anims.create({
            key: 'quest-icon',
            frames: this.anims.generateFrameNumbers('quest-icon', {start: 0, end: 3}),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'water-moving',
            frames: this.anims.generateFrameNumbers('water-pond', {start: 0, end: 5}),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'tree-1-anim0',
            frames: this.anims.generateFrameNumbers('tree-1',{start: 0, end: 4}),
            frameRate: 3,
            repeat: -1,
            repeatDelay: 2500
        })

        this.anims.create({
            key: 'tree-1-anim1',
            frames: this.anims.generateFrameNumbers('tree-1',{start: 0, end: 4}),
            frameRate: 3,
            repeat: -1,
            repeatDelay: 3500
        })

        this.anims.create({
            key: 'tree-1-anim2',
            frames: this.anims.generateFrameNumbers('tree-1',{start: 0, end: 4}),
            frameRate: 3,
            repeat: -1,
            repeatDelay: 4500
        })

        this.anims.create({
            key: 'tree-1-anim3',
            frames: this.anims.generateFrameNumbers('tree-1',{start: 0, end: 4}),
            frameRate: 3,
            repeat: -1,
            repeatDelay: 5500
        })

        this.anims.create({
            key: 'tree-1-anim4',
            frames: this.anims.generateFrameNumbers('tree-1',{start: 0, end: 4}),
            frameRate: 3,
            repeat: -1,
            repeatDelay: 6500
        })

        this.anims.create({
            key: 'tree-1-anim5',
            frames: this.anims.generateFrameNumbers('tree-1',{start: 0, end: 4}),
            frameRate: 3,
            repeat: -1,
            repeatDelay: 7500
        })

        this.anims.create({
            key: 'tree-2-anim0',
            frames: this.anims.generateFrameNumbers('tree-2',{start: 0, end: 6}),
            frameRate: 6,
            repeat: -1,
            repeatDelay: 2500
        })
  
        this.anims.create({
            key: 'tree-2-anim1',
            frames: this.anims.generateFrameNumbers('tree-2',{start: 0, end: 6}),
            frameRate: 6,
            repeat: -1,
            repeatDelay: 3500
        })
 
        this.anims.create({
            key: 'tree-2-anim2',
            frames: this.anims.generateFrameNumbers('tree-2',{start: 0, end: 6}),
            frameRate: 6,
            repeat: -1,
            repeatDelay: 4500
        })
   
        this.anims.create({
            key: 'tree-2-anim3',
            frames: this.anims.generateFrameNumbers('tree-2',{start: 0, end: 6}),
            frameRate: 6,
            repeat: -1,
            repeatDelay: 5500
        })
 
        this.anims.create({
            key: 'tree-2-anim4',
            frames: this.anims.generateFrameNumbers('tree-2-second',{start: 0, end: 18}),
            frameRate: 6,
            repeat: -1,
            repeatDelay: 2500
        })

        this.anims.create({
            key: 'tree-2-anim5',
            frames: this.anims.generateFrameNumbers('tree-2-second',{start: 0, end: 18}),
            frameRate: 6,
            repeat: -1,
            repeatDelay: 3500
        })
 
        this.anims.create({
            key: 'tree-2-anim6',
            frames: this.anims.generateFrameNumbers('tree-2-second',{start: 0, end: 18}),
            frameRate: 6,
            repeat: -1,
            repeatDelay: 4500
        })
 
        this.anims.create({
            key: 'tree-2-anim7',
            frames: this.anims.generateFrameNumbers('tree-2-second',{start: 0, end: 18}),
            frameRate: 6,
            repeat: -1,
            repeatDelay: 5506
        })

        this.anims.create({
            key: 'tree-3-anim',
            frames: this.anims.generateFrameNumbers('tree-3',{start: 0, end: 7}),
            frameRate: 4,
            repeat: false,
        })

        this.anims.create({
            key: 'bush-1-anim',
            frames: this.anims.generateFrameNumbers('bush-1',{start: 0, end: 4}),
            frameRate: 5,
            repeat: -1
        })
        
        this.scene.start('menuScene', {qobj: this.quest, inv: this.existing_inv})
    }
}
