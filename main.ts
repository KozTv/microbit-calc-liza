function increment () {
    val = (val + 1) % 60
    max = val
    updateDisplay()
    updateMusic()
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
    val += 0 - 1
    updateDisplay()
    updateMusic()
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
    brightness = 0.1
    haloDisplay.clear()
    range = haloDisplay.range(1, val)
    range.showColor(kitronik_halo_hd.rgb(153 * brightness, 51 * brightness, 255 * brightness))
    rangeRemoved = haloDisplay.range(1 + val, max - val)
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
}
let rangeRemoved: kitronik_halo_hd.ZIPHaloHd = null
let range: kitronik_halo_hd.ZIPHaloHd = null
let brightness = 0
let max = 0
let val = 0
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
let melody = CustomMelodies.littleStar
let melodyPos = 0
let melodyEnabled = false
music.setVolume(32)
reset()
basic.forever(function () {
	
})
