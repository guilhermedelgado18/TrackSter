const BotaoAdicionarItem = ({ onClick }) => {
    
    return (

        <>
        <button
            className="btn btn-success mb-4"
            id="btn-add"
            onClick={onClick}
            style={{
                backgroundColor: '#dc3545',
                borderColor: '#dc3545',
                color: 'white',
                borderRadius: '50%',
                position: 'fixed',
                fontSize: '2rem',
                fontWeight: 500,
                width: '4rem',
                height: '4rem',
                top: '90%',
                left: '95%'
            }}>
            +
        </button>

        </>

    )
    
};

export default BotaoAdicionarItem