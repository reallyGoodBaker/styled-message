const Colors = {
    black: 0, red: 1, green: 2, yellow: 3,
    blue: 4, magenta: 5, cyan: 6, white: 7
}

function parseHexStr(hexStr) {
    hexStr = hexStr.slice(1)

    if (hexStr.length === 3) {
        let r = parseInt(hexStr[0], 16),
            g = parseInt(hexStr[1], 16),
            b = parseInt(hexStr[2], 16)

        return [
            r + (r << 4),
            g + (g << 4),
            b + (b << 4)
        ]
    }

    if (hexStr.length === 6) {
        return [
            parseInt(hexStr.slice(0, 2), 16),
            parseInt(hexStr.slice(2, 4), 16),
            parseInt(hexStr.slice(4, 6), 16)
        ]
    }

    return 9
}

function rgb(r, g, b) {
    return [r, g, b]
}

class Message {
    styles = []

    constructor(msg) {
        this.rawMsg = msg
    }

    /**
     * @type {(color: number, bright?: boolean)=>this}
     */
    color(color, bright=false) {
        if(typeof color === 'string') {
            color = parseHexStr(color)
        }

        if (Array.isArray(color)) {
            this.styles.push(38, 2, ...color)
            return this
        }

        this.styles.push(color + 30 + (bright? 60: 0))
        return this
    }

    /**
     * @param {number | string} color
     */
    bgColor(color, bright=false) {
        if(typeof color === 'string') {
            color = parseHexStr(color)
        }

        if (Array.isArray(color)) {
            this.styles.push(48, 2, ...color)
            return this
        }

        this.styles.push(color + 40 + (bright? 60: 0))
        return this
    }

    [Symbol.toPrimitive]() {
        return this.toString()
    }

    toString() {
        return `\x1b[${this.styles.join(';')}m${this.rawMsg}\x1b[0m`
    }

    flicker() {
        this.styles.push(5)
        return this
    }

    outline() {
        this.styles.push(4)
        return this
    }

    italic() {
        this.styles.push(3)
        return this
    }

    deleteline() {
        this.styles.push(9)
        return this
    }

    bold() {
        this.styles.push(1)
        return this
    }

    copyStyle(message) {
        let msg = new Message(message)
        msg.styles = Array.from(this.styles)

        return msg
    }
}

/**
 * @param {string} msg 
 * @returns {Message}
 */
function message(msg) {
    return new Message(msg)
}

message.copyStyle = function(target, message) {
    if (target instanceof Message) {
        return target.copyStyle(message)
    }
    
    return null
}


module.exports = {
    message, rgb, Colors
}