import Tile from "./tile";

export default class Grid  {
    constructor (tiles, yDim, xDim) {
        this.tiles = tiles
        this.yDim = yDim
        this.xDim = xDim
        this.addTile()
    }

    static initTiles(yDim, xDim) {
        var tiles = Array(yDim)
        for (var y = 0; y < yDim; y++) {
            tiles[y] = Array(xDim)
            for (var x = 0; x < xDim; x++) {
                tiles[y][x] = new Tile(0)
            }
        }

        return tiles
    }

    static init (yDim, xDim) {
        var tiles = Grid.initTiles(yDim, xDim)
        console.log(tiles)
        return new Grid(tiles, yDim, xDim)
    }

    isFull () {
        var result = false
        for (var y = 0; y < this.yDim; y++) {
            for (var x = 0; x < this.xDim; x++) {
                if (this.tiles[y][x].value === 0) {
                    result = true
                }
            }
        }

        return result
    }

    addTile () {
      var generateTile = false
      while (generateTile !== true) {
        var xAlea = this.alea(this.xDim)
        var yAlea = this.alea(this.yDim)
        if (this.tiles[yAlea][xAlea].value === 0) {
            var val = Math.random() < 0.9 ? 2 : 4
          this.tiles[yAlea][xAlea].increment(val)
          generateTile = true
        }
      } 
    }

    canMove () {
        if (this.isFull !== true) {
            return true
        }
    }

    getLine (index) {
        var line = Array(this.xDim)
        for (var x = 0; x < this.xDim; x++) {
            line[x] = this.tiles[index][x]
        }
        return line
    }

    setLine (index, line) {
        this.tiles[index] = line
    }

    initList (line) {
        for (var i = 0; i < this.xDim; i++) {
            if ( typeof line[i] !== 'object') {
                line[i] = new Tile(0)
            }
        }
    }

    mergeLine (line) {
        var list = Array()
        console.log(line)
        for (var i = 0; i < this.xDim; i++) {
            var num = line[i].value
            if (i < this.xDim - 1 && line[i].value !== 0 && line[i].value === line[i + 1].value) {
                num *= 2
                i++
            }
            list.push(new Tile(num))
        }
        if (list.length == 0) {
            return line
        } else {
            this.initList(list)
            return list
        }
        
    }

    moveLine (line) {
        var l = Array()
        for (var i = 0; i < this.yDim; i++) {
            if (line[i].value !== 0) {
                l.push(line[i])
            }
        }
        if (l.length === 0) {
            return line
        } else {
            var newLine = Array(this.yDim)
            for (var j = 0; j < this.yDim; j++) {
                var tile = l[j]
                if (typeof tile === 'object') {
                    newLine[j]  = tile
                } else {
                    newLine[j] = new Tile(0)
                }
            }

            return newLine
        }
    }

    compare (line1, line2) {
        if (line1 == line2) {
            return true;
          } else if (line1.length != line2.length) {
            return false;
          }
      
          for (var i = 0; i < line1.length; i++) {
            if (line1[i].value != line2[i].value) {
              return false;
            }
          }
          return true;
    }

    left () {
        var needAddTile = false
        for (var y = 0; y < this.yDim; y++) {
            var res = 0
            var line = this.getLine(y)
            var merged = this.mergeLine(this.moveLine(line))
            this.setLine(y, merged)
            if (needAddTile !== true && this.compare(line, merged) !== true) {
                needAddTile = true
            }
        }
        if (needAddTile === true) {
            this.addTile()
        }
    }

    right () {
        this.tiles = this.rotate(180)
        this.left()
        this.tiles = this.rotate(180)
    }

    down() {
        this.tiles = this.rotate(270);
        this.left();
        this.tiles = this.rotate(90);
      }
    
    up() {
        this.tiles = this.rotate(90);
        this.left();
        this.tiles = this.rotate(270);
      }

    alea (N) {
        return (Math.floor((N * Math.random() * 1)))
    }

    rotate(angle) {
        var newTiles = Grid.initTiles(4, 4)
        console.log(newTiles)
        console.log(this.tiles)
        var offsetX = 3 
        var offsetY = 3
        if (angle == 90) {
          offsetY = 0
        } else if (angle == 270) {
          offsetX = 0
        }

        Math.radians = function(degrees) {
            return degrees * Math.PI / 180;
          }
    
        var rad = Math.radians(angle)
        var cos = Math.cos(rad)
        var sin = Math.sin(rad)
        for (var x = 0; x < 4; x++) {
          for (var y = 0; y < 4; y++) {
            var newX = Math.round((x * cos) - (y * sin)) + offsetX
            var newY = Math.round((x * sin) + (y * cos)) + offsetY
            newTiles[newX][newY] = this.tiles[x][y]
          }
        }
        return newTiles
      }
}