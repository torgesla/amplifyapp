import Form from './Form'
import ConfirmationPage from './ConfirmationPage'
import {successSubmitAtom} from '../atoms'
import {useRecoilState} from 'recoil'

export default () => {
  const [successSubmit,_] = useRecoilState(successSubmitAtom)
  return (<>{successSubmit ? <ConfirmationPage/> : <Form/>}</>);
}
