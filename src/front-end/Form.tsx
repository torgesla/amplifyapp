import { useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import validator from 'validator';
import { successSubmitAtom, errorsAtom, windowHeightAtom, windowWidthAtom } from "../atoms";
import {emailRegex} from '../helpers';
import ErrorMessage from './ErrorMessage';
import styled from "styled-components";


export default () => {
    const { register, handleSubmit} = useForm();
    const [showErrors, setshowErrors] = useState<boolean>(false);
    const [succesSubmit, setSuccessSubmit] = useRecoilState(successSubmitAtom);
    /* const [height, setHeight] =useRecoilState<number>(windowHeightAtom)
    const [width, setWidth] =useRecoilState<number>(windowWidthAtom) */
    const [errors, setErrors] = useRecoilState<boolean[]>(errorsAtom);
    
    const formValidation = (data : any) => {
        const nameValid = Boolean(data.name.trim());
        const epostValid = emailRegex.test(data.email);
        const phoneValid = validator.isMobilePhone(data.phone);
        const areacodeValid : boolean =  data.areacode.length == 4;
        const validsArray = [nameValid,epostValid,phoneValid,areacodeValid];
        const errorsArray = validsArray.map(x=>!x);
        const allGood = validsArray.every(x=>x);
        setErrors(errorsArray)
        setSuccessSubmit(allGood)
        setshowErrors(!allGood)        
    }
    const clearSubmit = () => {
        setErrors([])
        setSuccessSubmit(false)
        setshowErrors(false)
    }
    const Submit = (data : any) => formValidation(data);
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
        border-width: 2px;
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
    `
    const Commentbox = styled.textarea`
        display: inline;
        width: 300px;
        margin: auto 10px;
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
    return(
    <>  
        <Header>Spørreskjema - case Torgeir Laurvik</Header>
        <FormContainer>
            <form onSubmit={handleSubmit(Submit)}>
                <FieldSet>
                    <legend style={{color:"white", textAlign:"center"}}>Informasjonsskjema</legend>
                    <FieldsContainer>
                        <LabelsContainer>
                            <Label htmlFor={'name'}>Navn:</Label>
                            <Label>E-post:</Label>
                            <Label>Telefon:</Label>
                            <Label>Postnummer:</Label>
                            <Label>Kommentar:</Label>
                        </LabelsContainer>
                        <InputsContainer>
                            <InputField {...register("name", {required: true})} name="name" placeholder="Navn Navnesen" autoFocus/>
                            <InputField {...register("email", {required: true})} name="email" placeholder="navn@domene.no" />
                            <InputField {...register("phone", {required: true})} name="phone" placeholder="(+XX) XXX XX XXX" />
                            <InputField {...register("areacode", {required: true})} name="areacode" placeholder="0000" />
                            <Commentbox {...register('comment')} name="comment"/>
                        </InputsContainer>
                    </FieldsContainer>
                    <SubmitButton type="submit">Send inn!</SubmitButton>
                </FieldSet>
            </form>
        </FormContainer>
        {showErrors ? (<ErrorMessage error_bools={errors} showErrors={showErrors} doClose={() => clearSubmit()}/>) : null}
    </>
    )
};
