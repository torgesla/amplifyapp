import { setServers } from "dns";
import { useEffect} from "react";
import styled from 'styled-components'

interface errorProps{
    errors : string[],
    showErrors : boolean,
    doClose : () => void
}
const fields_dict : {[id :string] : string[]} = {
    'name' : ['Navn', 'Navn Navnesen'],
    'email' : ['E-post', 'navn@bedrift.landkode'],
    'phone' :['Telefonnummer', '(+XX)XXX XX XXX eks. 954 32 127'],
    'zip' :  ['Postnummer', 'XXXX']
}
    
export default ({errors, showErrors, doClose} : errorProps) => {
    useEffect(() => {
    }, [errors])
    useEffect(() => {
        document.addEventListener("mousedown", () => {
            doClose()
        })
    })
    const StyledModal = styled.div`
        display: ${showErrors ? 'block' : 'none'};
        position: fixed;
        border-radius: 3px;
        margin: 0.5rem 1rem;
        width: 11rem;
        background: white;
        color: black;
        border: 2px solid white;
    `
    return( 
        <StyledModal>
            <div>Du har feil format i felt{errors.length===1 ? 'et' : 'ene'}:</div>
            <ul>
                {errors.map((error) =>{
                    <li>{fields_dict[error][0]}</li>
                })}
            </ul>
        </StyledModal>
    )
};
