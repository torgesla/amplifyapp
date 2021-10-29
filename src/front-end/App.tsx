import Form from './Form'
import ConfirmationPage from './ConfirmationPage'
import {successSubmitAtom} from '../atoms'
import {useRecoilState} from 'recoil'

export default () => {
  const [successSubmit,_] = useRecoilState(successSubmitAtom)
  /* renders confirmationpage when form is successfully validated */
  return (<>{successSubmit ? <ConfirmationPage/> : <Form/>}</>);
}
