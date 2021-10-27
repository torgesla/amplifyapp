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
    comment: string
}
const Header = styled.h1`
position: relative;
left: 10%;
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
width: 100%;
height:400px;
top: 75px;
position: absolute;
`
const FieldSet = styled.fieldset`
    border-width: 0;
    border-color: red;
    height: 100%; 
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
position: relative;
text-decoration: none;
-webkit-backface-visibility: hidden;
transition: all .3s cubic-bezier(.25,.8,.25,1);
`
const defaultFormData = {name:'', email:'', phone:'', areacode:'', comment:''}
export default () => {
    let errors : string[] = []
    const [succesSubmit, setSuccessSubmit] = useRecoilState(successSubmitAtom);
    const { register, handleSubmit} = useForm();
    const [showErrors, setShowErrors] = useState<boolean>(false);
    /* const [errors, setErrors] = useState<string[]>(['fisk']) */
    const [formData, setFormData] =useState<FormData>(defaultFormData);

    const sendToValidation = (data : FormData) : Promise<string[]> => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        const errors2 : Promise<string[]> = fetch('http://localhost:5000/api', requestOptions)
            .then(response => response.json())
            .then(errors => errors);
        return errors2;
    }
    const formValidation = async (data : FormData) => {

        const nameValid : string = Boolean(data.name.trim()) ? 'ok':'name' ;
        const epostValid : string = emailRegex.test(data.email) ? 'ok':'email';
        const phoneValid : string = validator.isMobilePhone(data.phone) ? 'ok':'phone';
        const areacodeValid : string =  data.areacode.length == 4 ? 'ok':'zip';
        const checksArray : string[] = [nameValid, epostValid, phoneValid, areacodeValid];
        const errorsArray : string[] = checksArray.filter(x => x!== 'ok')
        const allGood = errorsArray.length === 0;

        if(!allGood){
            errors =errorsArray;
            setShowErrors(true);
            return
        }
        errors = await sendToValidation(data)
        const allGoodbackend : boolean = errors.length === 0;
        setSuccessSubmit(allGood && allGoodbackend);
        setShowErrors(true);
    };
    const clearSubmit = () => {
        errors = [];
        setSuccessSubmit(false);
        setShowErrors(false);
    };
    const Submit = (data : any) => {
        setFormData(data);
        formValidation(data);
    };
    return(
    <>  
        <Header>Spørreskjema - case Torgeir Laurvik</Header>
        <FormContainer>
            <form onSubmit={handleSubmit(Submit)}>
                <FieldSet>
                    <legend style={{color:"white", textAlign:"center"}}>Informasjonsskjema</legend>
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
                    </FieldsContainer>
                    <SubmitButton type="submit">Send inn!</SubmitButton>
                </FieldSet>
            </form>
        </FormContainer>
        {showErrors ? (<ErrorMessage errors={errors} showErrors={showErrors} doClose={() => clearSubmit()}/>) : null}
    </>
    )
};
