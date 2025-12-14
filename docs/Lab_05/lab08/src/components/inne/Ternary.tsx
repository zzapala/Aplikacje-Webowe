


function Ternary() {
    const a: boolean = true;
    const b: boolean = false;


    return (
        <>
            <div>
                {a ? <p>a jest <b>prawdą!</b></p> : <p>a jest <b>fałszem!</b></p>}
            </div>
            <div>
                {b ? <p>b jest <b>prawdą!</b></p> : <p>b jest <b>fałszem!</b></p>}
            </div>
        </>
    );
}

export default Ternary;