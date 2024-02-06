let v1FrontSampler = sampler;
let samplerNum = samplerNumOG;
counter = 0;
let toneStarted = false;

////////// Keys/Pads to Play Sample
    let keyPlayed = false;
    let keyToPitch = {};
    let padToPitch = {};

    // Prepare PadsToPitch listing
    if(mobile || isTouch) {
        for (let i = 0; i < allV1Pads.length; i++) {
            let thepad = allV1Pads[i].pad;
            let note = allV1Pads[i].pitch.toUpperCase().replace('M', '#'); 
           if(allV1Pads[i].enabled) {
                padToPitch[thepad] = note;
            } else {
                padToPitch[thepad] = null;
            }
            }
        }

    // Prepare KeysToPitch listing
    for (let i = 0; i < allKeys.length; i++) {
        let thekey = allKeys[i].key.toLowerCase();
        let note = allKeys[i].pitch.toUpperCase().replace('M', '#'); 
       if(allKeys[i].enabled) {
        if(thekey == 'space') {
            keyToPitch[' '] = note;
            } else if(thekey == 'one') { keyToPitch['1'] = note; 
            } else if(thekey == 'two') { keyToPitch['2'] = note; 
            } else if(thekey == 'three') { keyToPitch['3'] = note; 
            } else if(thekey == 'four') { keyToPitch['4'] = note; 
            } else if(thekey == 'five') { keyToPitch['5'] = note; 
            } else if(thekey == 'six') { keyToPitch['6'] = note; 
            } else if(thekey == 'seven') { keyToPitch['7'] = note; 
            } else if(thekey == 'eight') { keyToPitch['8'] = note; 
            } else if(thekey == 'nine') { keyToPitch['9'] = note; 
            } else if(thekey == 'zero') { keyToPitch['0'] = note; 
           } else {
            keyToPitch[thekey] = note;
           }
        } else {
            keyToPitch[thekey] = null;
        }
    }
    
    // Prepare Sampler
    for(let keyid = 0; keyid < allKeys.length; keyid++ ) {
    if(allKeys[keyid].enabled == true) {
        v1FrontSampler[counter] = new Tone.Sampler({
        'C3': allKeys[keyid].sample
        }, {
            'release' : 1,
            'onload' : ()=>{
            Tone.context.updateInterval = 0;
            Tone.context.lookAhead = 0;
            }
        }).toDestination();
        v1FrontSampler[counter].context.resume(); // necessary for Safari
        samplerNum[counter] = {
            'thekey': allKeys[keyid].key,
            'id': counter
        }
        counter++;
    } else {}
    }

if(mobile || isTouch) {
    // Play Sample Function on Drumpads / mobile
        function touchPad(id){
        //// Find index# of sample for the pad
        function theIndex(id) {
            let i;
            for (let ke = 0; ke < allV1Pads.length; ke++) {
                if (allV1Pads[ke].pad == id) {
                    i = ke;
                    break;
                }
            }
            return i;
        }
        // Do nothing with other pads
        if (padToPitch[id] == null) {
        } else {
        let index = theIndex(id);
        v1FrontSampler[index].triggerAttackRelease(padToPitch[id]);
        }
        }

            $('div.tapKey').on('touchstart', async (event) => {
                // event.preventDefault();
                if(!toneStarted) {
                    await Tone.start();
                    toneStarted = true;
                }
                let id = event.target.id;
                touchPad(id);
                $(id).css('opacity', '0.8');
                setTimeout(()=>{
                    $(id).css('opacity', '0.3');
                }, 100);
            });
    }

    // Play Sample Function on Keyboard
    function onkeydown(e){
        const x = e.keyCode || e.which;
        e.preventDefault();

        //// Find index# of sample for the key
        function theIndex(k) {
            let daindex, s;
            for (let ke = 0; ke < samplerNum.length; ke++) {
                if (samplerNum[ke].thekey == k) {
                    daindex = ke;
                    break;
                } else {
                    daindex = 0;
                }
            }
            return daindex;
        }

        //// Do nothing with other keys
        if (keyToPitch[e.key] == null) {
        } else {

        let index;
        switch (x) {

            // 1 - 0
            case 49:
            index = theIndex('ONE');
            break;
            case 50:
            index = theIndex('TWO');
            break;
            case 51:
            index = theIndex('THREE');
            break;
            case 52:
            index = theIndex('FOUR');
            break;
            case 53:
            index = theIndex('FIVE');
            break;
            case 54:
            index = theIndex('SIX');
            break;
            case 55:
            index = theIndex('SEVEN');
            break;
            case 56:
            index = theIndex('EIGHT');
            break;
            case 57:
            index = theIndex('NINE');
            break;
            case 48:
            index = theIndex('ZERO');
            break;

            // Q - P
            case 81:
            index = theIndex('Q');
            break;
            case 87:
            index = theIndex('W');
            break;
            case 69:
            index = theIndex('E');
            break;
            case 82:
            index = theIndex('R');
            break;
            case 84:
            index = theIndex('T');
            break;
            case 89:
            index = theIndex('Y');
            break;
            case 85:
            index = theIndex('U');
            break;
            case 73:
            index = theIndex('I');
            break;
            case 79:
            index = theIndex('O');
            break;
            case 80:
            index = theIndex('P');
            break;

            // A - L
            case 65:
            index = theIndex('A');
            break;
            case 83:
            index = theIndex('S');
            break;
            case 68:
            index = theIndex('D');
            break;
            case 70:
            index = theIndex('F');
            break;
            case 71:
            index = theIndex('G');
            break;
            case 72:
            index = theIndex('H');
            break;
            case 74:
            index = theIndex('J');
            break;
            case 75:
            index = theIndex('K');
            break;
            case 76:
            index = theIndex('L');
            break;

            // Z - M
            case 90:
            index = theIndex('Z');
            break;
            case 88:
            index = theIndex('X');
            break;
            case 67:
            index = theIndex('C');
            break;
            case 86:
            index = theIndex('V');
            break;
            case 66:
            index = theIndex('B');
            break;
            case 78:
            index = theIndex('N');
            break;
            case 77:
            index = theIndex('M');
            break;

            // SPACE
            case 32:
            index = theIndex('SPACE');
            break;
        }
        v1FrontSampler[index].triggerAttackRelease(keyToPitch[e.key]);
        }
    }
