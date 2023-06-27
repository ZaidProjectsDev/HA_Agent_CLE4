import {ImageSource, Sound, Resource, Loader, SpriteSheet} from 'excalibur'
import fishImage from '../images/fish.png'
import genericNoise from '../images/generic_noise_test.png';
import _128x32Button from '../images/128x32_button.png';
import _512x256Title from '../images/512x256_title.png';
import _bazooka from '../images/bazooka_idle.png';
import _fireEffect from '../images/fire_spritesheet.png';
import _backgroundTest from '../images/testing/HighresMap1.jpg';
import _backgroundTestCollider from '../images/testing/Map_HAPlein_01_collision.png';
import asset_interior_a from '../images/interior/Interior_A.jpg';
import asset_bgm_interior_a from '../sound/bgm/Interior_A.mp3';
import asset_bgb_exterior from '../sound/bgm/Exterior.mp3';
import asset_snd_wrong from '../sound/menu/Wrong.wav';
import asset_snd_unlock from '../sound/menu/Door_open.mp3';
import asset_snd_unlock_piano from '../sound/menu/Unlock.wav';
import asset_spt_hat from '../images/sprites/DetectiveHat.png';
import pianoA from '../sound/piano/A.wav';
import pianoB from '../sound/piano/B.wav';
import pianoC from '../sound/piano/C.wav';
import pianoD from '../sound/piano/D.wav';
import pianoImg from '../images/Piano.jpg';
import asset_snd_popup from '../sound/menu/blipSelect.wav'
import asset_spt_interact from '../images/sprites/Interact.png';
import asset_spt_npc_cop from '../images/sprites/cop.png';
import asset_spt_npc_cap_brown from '../images/sprites/cap_brown.png';
import asset_spt_npc_top_hat_brown from '../images/sprites/top_hat_brown.png';
import asset_spt_npc_white_hat from '../images/sprites/white_hat.png';
import asset_spt_npc_lady_blue from '../images/sprites/lady_blue.png';
import asset_spt_npc_lady_red from '../images/sprites/lady_red.png';
import asset_snd_voice1 from '../sound/voice/Voice1.wav';
import asset_snd_voice2 from '../sound/voice/Voice2.wav';
import asset_snd_voice3 from '../sound/voice/Voice3.wav';
import asset_snd_voice4 from '../sound/voice/Voice4.wav';
import asset_snd_voice5 from '../sound/voice/Voice5.wav';
import asset_snd_voice6 from '../sound/voice/Voice6.wav';
import asset_snd_voice7 from '../sound/voice/Voice7.wav';
import asset_spt_pianohelp from '../images/interior/Puzzlescheme.png';
const Resources = {
    Fish: new ImageSource(fishImage),
    GenericNoise: new ImageSource(genericNoise),
    b128x32Button: new ImageSource(_128x32Button),
    t512x256Title : new ImageSource(_512x256Title),
    _bazooka: new ImageSource(_bazooka),
    _fireEffect: new ImageSource(_fireEffect),
    backgroundImageTest: new ImageSource(_backgroundTest),
    backgroundImageCollision: new ImageSource(_backgroundTestCollider),
    bkgInteriorA: new ImageSource(asset_interior_a),
    bgmInteriorA: new Sound(asset_bgm_interior_a),
    bgmExterior: new Sound(asset_bgb_exterior),
    sndPopUp: new Sound(asset_snd_popup),
    sndUnlock: new Sound(asset_snd_unlock),
    sndWrong: new Sound(asset_snd_wrong),
    sndUnlockPiano: new Sound(asset_snd_unlock_piano),
    pianoA: new Sound(pianoA),
    pianoB: new Sound(pianoB),
    pianoC: new Sound(pianoC),
    pianoD: new Sound(pianoD),
    pianoImg: new ImageSource(pianoImg),
    sptInteract: new ImageSource(asset_spt_interact),
    sptHat : new ImageSource(asset_spt_hat),
    npc_cop: new ImageSource(asset_spt_npc_cop),
    npc_cap_brown : new ImageSource(asset_spt_npc_cap_brown),
    npc_top_hat: new ImageSource(asset_spt_npc_top_hat_brown),
    npc_white_hat: new ImageSource(asset_spt_npc_white_hat),
    npc_lady_blue: new ImageSource(asset_spt_npc_lady_blue),
    npc_lady_red: new ImageSource(asset_spt_npc_lady_red),
    voice_1: new Sound(asset_snd_voice1),
    voice_2: new Sound(asset_snd_voice2),
    voice_3: new Sound(asset_snd_voice3),
    voice_4: new Sound(asset_snd_voice4),
    voice_5: new Sound(asset_snd_voice5),
    voice_6: new Sound(asset_snd_voice6),
    voice_7: new Sound(asset_snd_voice7),
    pianoHelpImg: new ImageSource(asset_spt_pianohelp)
}
const resourceArray = []
for (const key in Resources) {
    resourceArray.push(Resources[key])
}
const ResourceLoader = new Loader(resourceArray)


export { Resources, ResourceLoader }