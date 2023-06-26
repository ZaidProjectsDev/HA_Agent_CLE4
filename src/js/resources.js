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
import asset_snd_popup from '../sound/menu/blipSelect.wav'
import asset_spt_interact from '../images/sprites/Interact.png';
import logo_image from '../images/Melodies_of_Enigma.png';

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
    sndPopUp: new Sound(asset_snd_popup),
    sptInteract: new ImageSource(asset_spt_interact),
    logo_image: new ImageSource(logo_image)
}
const resourceArray = []
for (const key in Resources) {
    resourceArray.push(Resources[key])
}
const ResourceLoader = new Loader(resourceArray)


export { Resources, ResourceLoader }