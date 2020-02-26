import globalThis from '@ungap/global-this';
import objectAssign from 'object-assign';
import Promise from 'pinkie-promise';

globalThis.Promise = globalThis.Promise || Promise;
Object.assign = Object.assign || objectAssign;
