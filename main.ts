function increment () {
    val = (val + 1) % 60
    max = val
    updateDisplay()
    updateMusic()
    // the following introduces a fun game
    // "I can guess your number"
    // requires another device listening on channel 1
    radio.sendNumber(val)
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () { melodyEnabled = !melodyEnabled})
input.onButtonPressed(Button.A, function () {
    decrement()
    basic.showLeds(`
        . . . . .
        . . . . .
        # # # # #
        . . . . .
        . . . . .
        `)
    basic.clearScreen()
})
function decrement () {
    if (val <= 0) {
        return
    }
    val--
    updateDisplay()
    updateMusic()
    radio.sendNumber(val)
}
input.onButtonPressed(Button.B, function () {
    increment()
    basic.showLeds(`
        . . # . .
        . . # . .
        # # # # #
        . . # . .
        . . # . .
        `)
    basic.clearScreen()
})
input.onGesture(Gesture.Shake, function () {
    reset()
})
function updateDisplay () {
    const brightness = 0.1
    haloDisplay.clear()
    const range = haloDisplay.range(1, val)
    range.showColor(kitronik_halo_hd.rgb(153 * brightness, 51 * brightness, 255 * brightness))
    const rangeRemoved = haloDisplay.range(1 + val, max - val)
    rangeRemoved.showColor(kitronik_halo_hd.rgb(255 * brightness, 51 * brightness, 0 * brightness))
    haloDisplay.show()
}
function updateMusic(){
    if (!melodyEnabled) return;

    let note = melody[melodyPos++ % melody.length]
    music.playTone(note.note, note.duration * 0.1);
}
function reset () {
    val = 0
    max = 0
    haloDisplay.clear()
    haloDisplay.show()
    melodyPos = 0
    radio.sendNumber(val)
}
let max = 0
let val = 0
let haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
let melody = CustomMelodies.littleStar
let melodyPos = 0
let melodyEnabled = false
music.setVolume(32)
radio.setGroup(1)
reset()
basic.forever(function () {
	
})
