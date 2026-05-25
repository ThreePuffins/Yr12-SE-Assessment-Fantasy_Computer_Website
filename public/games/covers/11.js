function loop(inputs) {
    if ((inputs | 0b000000) !== 0) {
        for (let i = 0; i < 128; i++) {
            for (let j = 0; j < 128; j++) {
                setPixel(i, j, "#ffffff");
            }
        }
    } else {
       for (let i = 0; i < 128; i++) {
            for (let j = 0; j < 128; j++) {
                setPixel(i, j, "#121212");
            }
        } 
    }
}