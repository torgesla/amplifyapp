import {atom} from 'recoil';
const successSubmitAtom = atom({
    key: "successSubmit",
    default: false
  })
const errorsAtom = atom({
    key: 'errors',
    default: [] as boolean[]
})
const windowWidthAtom = atom({
  key: 'width',
  default: -1 as number
})
const windowHeightAtom = atom({
  key: 'width',
  default: -1 as number
})
export {successSubmitAtom, errorsAtom, windowHeightAtom, windowWidthAtom}