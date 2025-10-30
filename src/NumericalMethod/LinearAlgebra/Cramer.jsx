import React, { useState } from "react";
import "../Method.css";

function Cramer() {
    const [size, setSize] = useState("");
    const [matrix, setMatrix] = useState([]);

    function cal(){

        let n = Number(size);

        if(!size){
            alert("Input size")
            return;
        }
    }

    return (
        <div>
            <h2>Cramer's Rule</h2>
            <input placeholder="size" value={size} onChange={(e) => setSize(e.target.value)} type="number" min={1} style={{ width: "80px" }}/>
            <br /><br />
            <button onClick={cal} style={{ backgroundColor: '#007bff', color: 'white' }}>Do it</button>
        </div>
    );
}

export default Cramer;
