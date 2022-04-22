type RgbColor = [number, number, number];

export var rgb: (r: number, g: number, b: number) => RgbColor;

export enum Colors {
    black, red, green, yellow,
    blue, magenta, cyan, white
}

type Color = Colors | string | RgbColor;

interface Message {
    color(color: Color, bright=false): this;

    bgColor(color: Color, bright=false): this;

    flicker(): this;

    outline(): this;

    italic(): this;

    deleteline(): this;

    bold(): this;

    copyStyle(message: string): Message;
}
var Message: {
    new(msg: string): Message
}

export var message: {
    copyStyle(target: Message, message: string): Message;
    (message: string): Message
}