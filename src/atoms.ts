import {atom} from 'recoil';
const successSubmitAtom = atom({
    key: "successSubmit",
    default: false
  })
const errorsAtom = atom({
    key: 'errors',
    default: [] as boolean[]
})
export {successSubmitAtom, errorsAtom}