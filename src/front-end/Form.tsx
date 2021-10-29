import { useState} from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import validator from 'validator';
import {successSubmitAtom} from "../atoms";
import {emailRegex} from '../helpers';
import ErrorMessage from './ErrorMessage';
import styled from "styled-components";

type FormData = {
    name : string,
    email: string,
    phone: string,
    areacode: string,
    comment: string,
    applicant: string
}
const Header = styled.h1`
    position: relative;
    left: 10vw;
    font-family: Muli,sans-serif;
    transition: all .2s ease-in-out;
    color: rgb(18,60,105);
    display: inline;
    font-weight: 600;
    font-size: 58px;
    line-height: 1.2;
    padding: 5px 5px 5px 0;
`
const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgb(18,60,105);
    left: 0;
    width: 100vw;
    height:76vh;
    top: 12vh;
    position: absolute;
`
const FieldSet = styled.fieldset`
    border-width: 0;
    height: 55vh; 
`
const FieldsContainer = styled.div`
display: flex;
height: 100%;
flex-direction: row;
justify-content: center;
align-items: center;
text-align: center;
`
const LabelsContainer = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
`
const InputsContainer = styled.div`
    display: flex;
    padding: 8px;
    height: 100%;
    flex-direction: column;
    justify-content: space-around;
`
const Label = styled.label`
font-size: 20px;
align-self: flex-end;
color: white;
margin: auto 10px;

`
const InputField = styled.input`
height: 20px;
display: inline;
width: 300px;
margin: auto 10px;
font-family: muli, sans serif;
`
const Commentbox = styled.textarea`
display: inline;
width: 300px;
margin: auto 10px;
font-family: muli, sans serif;;
`
const SubmitButton = styled.button`
    position: absolute;
    left: 50vw;
    top: 60vh;
    transform: translate(-50%, -50%);
    text-align: center;
    font-family: Muli,sans-serif;
    margin: 0;
    background-color: #ff5e22;
    display: inline-block;
    box-sizing: border-box;
    border-radius: 10em;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    padding: 14px 22px;
    margin-top: 10px;
    text-decoration: none;
    -webkit-backface-visibility: hidden;
    transition: all .3s cubic-bezier(.25,.8,.25,1);
`
export default () => {
    const [succesSubmit, setSuccessSubmit] = useRecoilState(successSubmitAtom);
    const { register, handleSubmit} = useForm();
    const [showErrors, setShowErrors] = useState<boolean>(false);
    const [inErrors, setErrors] = useState<string[]>([])

    const localValidation = (data: FormData) : [boolean, string[]] => {
        const nameValid : string = Boolean(data.name.trim()) ? 'ok':'name' ;
        const epostValid : string = emailRegex.test(data.email) ? 'ok':'email';
        const phoneValid : string = validator.isMobilePhone(data.phone) ? 'ok':'phone';
        const areacodeValid : string =  data.areacode.length === 4 ? 'ok':'zip';
        const checksArray : string[] = [nameValid, epostValid, phoneValid, areacodeValid];
        const errors : string[] = checksArray.filter(x => x!== 'ok')
        const allGood = errors.length === 0;
        if(!allGood){
            setErrors(errors);
            setShowErrors(true);
        }
        return [allGood, errors];
    }
    const serverValidation = async (data: FormData) : Promise<[boolean,string[]]> =>{
        let allGood : boolean;
        let errors : string[];
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            };
            errors = await fetch('http://localhost:8080/api', requestOptions)
                            .then(response => response.json())
                            .then(errors => errors);
            allGood = errors.length === 0;
        }catch{
            console.log("Server didn't respond")
            /* So the app will work even if server is off */
            allGood = true;
            errors = [];
        }
        return [allGood, errors]
    }
    const formValidation = async (data : FormData) : Promise<void> => {
        /* Does both client and server-side validation of form data */
        const [allGood, frontendErrors] = localValidation(data);
        setErrors(frontendErrors);
        const [allGoodBackend,backendErrors] = await serverValidation(data);
        /* Find the union of errors from front and back-end */
        const errors : string[] = Array.from(new Set([...frontendErrors, ...backendErrors]));
        setErrors(errors);
        setSuccessSubmit(allGoodBackend);
        setShowErrors(!succesSubmit);
    };
    return(
    <>  
        <Header>Spørreskjema - case Torgeir Laurvik</Header>
        <FormContainer>
            <form onSubmit={handleSubmit(formValidation)}>
                <FieldSet>
                    <FieldsContainer>
                        <LabelsContainer>
                            <Label htmlFor={'name'}>Navn</Label>
                            <Label htmlFor={'email'}>E-post</Label>
                            <Label htmlFor={'phone'}>Telefon</Label>
                            <Label htmlFor={'areacode'}>Postnummer</Label>
                            <Label htmlFor={'comment'}>Kommentar</Label>
                        </LabelsContainer>
                        <InputsContainer>
                            <InputField {...register("name",        {required: true})}  className="required" name="name"        placeholder="Navn Navnesen" autoFocus/>
                            <InputField {...register("email",       {required: true})}  className="required" name="email"       placeholder="navn@domene.no" />
                            <InputField {...register("phone",       {required: true})}  className="required" name="phone"       placeholder="(+XX) XXX XX XXX" />
                            <InputField {...register("areacode",    {required: true})}  className="required" name="areacode"    placeholder="0000" />
                            <Commentbox {...register('comment')}                                             name="comment"/>
                        </InputsContainer>
                        {showErrors ? (<ErrorMessage inErrors={inErrors} showErrors={showErrors}/>) : null}
                    </FieldsContainer>
                    <SubmitButton type="submit">Send inn!</SubmitButton>
                </FieldSet>
            </form>
        </FormContainer>
    </>
    )
};
