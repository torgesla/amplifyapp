import { useEffect, useState } from "react";
import {zip} from '../helpers';
import styled from 'styled-components'

interface errorProps{
    error_bools : boolean[],
    showErrors : boolean,
    doClose : ()=> void
}
const fields : string[]= ['Navn', 'E-post', 'Telefonnummer', 'Postnummer'];
const expected : string[]= ['Navn Navnesen', 'navn@bedrift.landkode eks. navn@gmail.com', '(+XX)XXX XX XXX eks. 954 32 127', 'XXXX, eks. 0289'];
    
export default ({error_bools, showErrors, doClose} : errorProps) => {
    const [errors, setErrors] = useState([] as string[][])
    useEffect(() => {
        const errorCategories : string[] = fields.filter((_, ind) => error_bools[ind])
        const expectedFormatCategories : string[] = expected.filter((_, ind) => error_bools[ind])
        setErrors(zip(errorCategories, expectedFormatCategories))
    }, [error_bools])
    useEffect(() => {
        document.addEventListener("mousedown", () => {
            doClose()
        })
    })
    const StyledModal = styled.div`
        display: ${showErrors ? 'block' : 'none'}
        border-radius: 3px;
        margin: 0.5rem 1rem;
        width: 11rem;
        background: transparent;
        color: white;
        border: 2px solid white;
    `

    return( 
        <StyledModal>
            <div className="error-list-header">Du har feil format i felt{errors.length===1 ? 'et' : 'ene'}:</div>
            <ul>
                {errors.map((error,_) => (
                    <li className="error-list">
                        Forventet data på formen: {error[1]} i {error[0].toLowerCase()}-feltet 
                    </li>
                ))}
            </ul>
        </StyledModal>
    )
};
