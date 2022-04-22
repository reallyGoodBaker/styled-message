const {message, rgb, Colors} = require('../src/message-builder.js')

const helloText =
    message('Hello')
        .color(Colors.cyan)
        .bgColor(rgb(0, 60, 0))
        .bold(),

    worldText =
        message.copyStyle(helloText, ' World')
        .deleteline()
        .bgColor('#600')

console.log(helloText + worldText);