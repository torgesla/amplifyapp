import styled from 'styled-components';
import {successSubmitAtom} from "../atoms";
import { useRecoilState } from "recoil";
export default () => {
    const [succesSubmit, setSuccessSubmit] = useRecoilState(successSubmitAtom);

    const Background = styled.div`
        display: flex;
        flex-direction: column;
        position: absolute;
        left: 0;
        width: 100%;
        height:80%;
        top: 10%;
        background-color: rgb(18,60,105);
       
    `
    const Message = styled.h1`
        position: absolute;
        width: 100%;
        text-align: center;
        top: 40%;  
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: min(10vh,5vw);
        color: orange;

    `
    const BackButton = styled.button`
        display: block;
        position: absolute;
        left: 50vw;
        top: 70vh;
        transform: translate(-50%, -50%);
        text-align: center;
        font-family: Muli,sans-serif;
        background-color: #ff5e22;
        box-sizing: border-box;
        border-radius: 10em;
        color: #fff;
        font-size: 18px;
        font-weight: 700;
        padding: 14px 22px;
        text-decoration: none;
        -webkit-backface-visibility: hidden;
        transition: all .3s cubic-bezier(.25,.8,.25,1);
    `
    return(
        <Background>
            <Message>
                Skjemaet er godkjent, og sendt inn! 
            </Message>
            <BackButton onClick={() => setSuccessSubmit(!succesSubmit)}>Gå tilbake</BackButton>
        </Background>
    )
};
