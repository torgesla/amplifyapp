import styled from 'styled-components'

interface errorProps{
    in_errors : string[],
    showErrors : boolean
}
const fields_dict : {[id :string] : string} = {
    'name' : 'Navn',
    'email' : 'E-post',
    'phone' :'Telefonnummer',
    'zip' :  'Postnummer'
}
    
export default ({in_errors, showErrors} : errorProps) => {
    const StyledModal = styled.div`
        position: fixed;
        display: ${showErrors ? 'block' : 'none'};
        background-color: rgb(18,60,105);
        left: 67vw;
        top: 15vh;
        height: 50vh;
        width: 20vw;
        color: white;
        border-radius: 3px;
        margin: 0.5rem 1rem;
    `
    const ErrorsList = styled.ul`
        list-style-type:none
    `
    const listItems = in_errors.map((error) =>
        <li>{fields_dict[error]}</li>
    );
    return( 
        <StyledModal>
            <div>Du har feil format i felt{in_errors.length===1 ? 'et' : 'ene'}:</div>
            <ErrorsList>{listItems}</ErrorsList>
        </StyledModal>
    )
};
