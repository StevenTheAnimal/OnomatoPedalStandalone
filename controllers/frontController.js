// const OpMain = require('../models/opMain');
const fs = require('fs');
const browser = require('browser-detect');
const stems = [1, 2, 3, 4];
const stemKeys = [ 'stem1', 'stem2', 'stem3', 'stem4']
//--------------------------------------------
//use below PATH when testing with "npm start"
//const PATH = "./";
//use BELOW PATH when building with "npm run pack"
const PATH = "resources/app.asar/";
//--------------------------------------------
const rawdataV1 = fs.readFileSync(PATH + 'json/opv1.json');
const opv1 = JSON.parse(rawdataV1);
const rawdataV2 = fs.readFileSync(PATH + 'json/opv2.json');
const opv2 = JSON.parse(rawdataV2);
const rawdataOPData = fs.readFileSync(PATH + 'json/opdata.json');
const OpMain = JSON.parse(rawdataOPData);
const rawdataPedals = fs.readFileSync(PATH + 'json/eqdPedals.json');
const eqdPedals = JSON.parse(rawdataPedals);
const rawV1PaperData = fs.readFileSync(PATH + 'json/v1animsound.json');
const v1PaperData = JSON.parse(rawV1PaperData);
const rawEnData = fs.readFileSync(PATH + 'json/v1language/en.json');
const lnEnData = JSON.parse(rawEnData);
const rawJpData = fs.readFileSync(PATH + 'json/v1language/jp.json');
const lnJpData = JSON.parse(rawJpData);
const rawdata = fs.readFileSync(PATH + 'json/animation.json');
const animaData = JSON.parse(rawdata);
const rawDKdata = fs.readFileSync(PATH + 'json/disabledKeysV1.json');
const disabledKeyData = JSON.parse(rawDKdata);

let language = [], pedalListing = [], v2Names = [];

// Prepare language data
language.push(lnEnData, lnJpData);

// Prepare v1 pedal listing
for(let p = 0; p < opv1.length; p++) {
    if(opv1[p].id == 21) {
    } else {
    let imgPath = 'images/opv1-cover/' + opv1[p].onomoid + '.gif';
    let linkPath = '/v1/' + opv1[p].onomoid;
    let v1pedal = {
        "id": opv1[p].id,
        "onomoid": opv1[p].onomoid,
        "onomoname":opv1[p].onomoname,
        "pedalFull":opv1[p].name,
        "artist": opv1[p].artist,
        "image": imgPath,
        "link": linkPath
    }
    pedalListing.unshift(v1pedal);
}}

// Prepare v2 pedal listing
for(let p = 0; p < opv2.length; p++) {
    let imgPath = 'images/v2cover/' + opv2[p].cover;
    let linkPath = '/v2/' + opv2[p].name;
    let v2pedal = {
        "id": opv2[p].id,
        "onomoid": opv2[p].name,
        "onomoname":opv2[p].onomoname,
        "pedalFull":opv2[p].pedalname,
        "artist": opv2[p].artist,
        "image": imgPath,
        "link": linkPath
    }
    pedalListing.unshift(v2pedal);
}

// Prepare v2 pedal name listing
    for(let v2 = 0; v2 < opv2.length; v2++) {
        let name = opv2[v2].name;
        v2Names.push(name);
    }

const thekeys = ['Q', 'W', 'E', 'R', 'A', 'S', 'D', 'F', 'Z', 'X', 'C', 'V'];
const thesamples = ['sampleQ', 'sampleW', 'sampleE', 'sampleR', 'sampleA', 'sampleS', 'sampleD', 'sampleF', 'sampleZ', 'sampleX', 'sampleC', 'sampleV'];
const keyPads = ['keyQ', 'keyW', 'keyE', 'keyR', 'keyA', 'keyS', 'keyD', 'keyF', 'keyZ', 'keyX', 'keyC', 'keyV'];

function shuffle(arra1) { 
    var ctr = arra1.length, temp, index; 
    while (ctr > 0) { 
        index = Math.floor(Math.random() * ctr); ctr--; 
        temp = arra1[ctr]; arra1[ctr] = arra1[index]; arra1[index] = temp; 
    } 
    return arra1; 
    }

const home_get = (req, res) => {
     res.render('index', { 
        title: 'Home', 
        nav:'home', 
        fillPedalNames: eqdPedals,
        allPedals: pedalListing,
        language: language
    });
};

const v1pedal_get = (req, res) => {    
    const isMobile = browser(req.headers['user-agent']).mobile;
    const onomoid = req.params.onomoid;
    let pedal = [], paper = [], allV1Keys = [], allV1Pads = [];
    let shuffledPedals = [];
    for(let p = 0; p < pedalListing.length; p++) {
        if(pedalListing[p].onomoid != onomoid) {
            shuffledPedals.push(pedalListing[p]);
        }
    }
    shuffle(shuffledPedals);
    
    // Find the pedal in the opv1 array
    for(let p = 0; p < opv1.length; p++) {
        if (opv1[p].onomoid == onomoid) {
            pedal = opv1[p];
            paper = v1PaperData[p];
            break;
        }
    }

    allV1Keys = [];
    for(let d = 0; d < disabledKeyData.length; d++) {
        allV1Keys.push(disabledKeyData[d]);
    }

    // Prepare v1 keysToPich listing
    let offset = disabledKeyData.length;
    for(let p = 0; p < thekeys.length; p++) {
        let thesamplekey = thesamples[p];
        let theSample = paper[thesamplekey];
        let key = {
            "key": thekeys[p],
            "pitch": 'c3',
            "sample": theSample,
            "enabled": true
        };
        let id = offset + p; 
        allV1Keys[id] = key;
    }

    // Prepare v1 padsToPitch listing
    for(let pp = 0; pp < keyPads.length; pp++) {
        let thepad = keyPads[pp];
        let thesamplekey = thesamples[pp];
        let theSample = paper[thesamplekey];
        let pad = {
            "pad": thepad,
            "pitch": 'c3',
            "sample": theSample,
            "enabled": true
        };
        allV1Pads[pp] = pad;
    }

    if(pedal.length == 0) {
        res.redirect('/404');
    } else {
        res.render('v1Pedal', {
            nav:'v1', 
            thepedal: pedal,
            allKeys: allV1Keys,
            allPads: allV1Pads,
            paper: paper,
            morePedals: shuffledPedals,
            language: language,
            mobile: isMobile,
            sampler: [],
            samplerNum: []
        })
    }
}

const v2pedal_get = (req, res) => {
    const onomoid = req.params.onomoid;
    const isMobile = browser(req.headers['user-agent']).mobile;
    let merch =[], opDB=[], coverFileName, video, videoURL;
    let shuffledPedals = [];
    for(let p = 0; p < pedalListing.length; p++) {
        if(pedalListing[p].onomoid != onomoid) {
            shuffledPedals.push(pedalListing[p]);
        }
    }
    shuffle(shuffledPedals);
    let finalShuffle = shuffledPedals.slice(0, 6);

    // Find the pedal data
    for(let p = 0; p < OpMain.length; p++) {
        if ( OpMain[p].name == onomoid ) {
            opDB = OpMain[p];
        }
    }  
    // Find the pedal merch info
    for(let p = 0; p < opv2.length; p++) {
        if ( opv2[p].name == onomoid ) {
            for(let m = 0; m < opv2[p].links.length; m++ ) {
                merch.push(opv2[p].links[m]);
                coverFileName = 'images/v2cover/' + opv2[p].cover;
            } 
            video = opv2[p].video;
            videoURL = '../sound/video/' + opv2[p].videourl + '.mp4';
        }
    }  

    let stemFiles = opDB.stems.stemBooleans;
    let stemFileNames = [], thenav, theView;
    for (let f = 0; f < stemKeys.length; f++) {
        let filename = `${onomoid}/stems/` + stemKeys[f] + `.mp3`;
        stemFileNames.push(filename);
    }
    if(video) {
        thenav = 'v2-vbg';
        theView = 'v2Pedal-VideoBG';
    } else {
        thenav = 'v2';
        theView = 'v2Pedal';
    }
        res.render(theView, { 
            title: 'V2',
            nav: thenav, 
            name: onomoid, 
            pedal: opDB,
            eqdPedals: eqdPedals,
            stemFiles: stemFiles,
            stems: stems,
            stemFileNames: stemFileNames,
            mobile: isMobile,
            animation: animaData,
            merch: merch,
            cover: true,
            coverFile: coverFileName,
            morePedals: pedalListing,
            language: language,
            morePedals: finalShuffle,
            videoURL: videoURL
        });
};

module.exports = {
    home_get,
    v1pedal_get,
    v2pedal_get
}