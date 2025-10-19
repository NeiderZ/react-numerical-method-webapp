import React, {useState} from "react";
import {evaluate, derivative} from "mathjs";
import '../Method.css'

function SingleSimpson(){
    const[fxIn,setFxIn] = useState("");
    const[aIn,setAIn] = useState("");
    const[bIn,setBIn] = useState("");
    const[result,setResult] = useState("");
    const[data,setData] = useState([]);
    const[error,setError] = useState("");

    function calculate(){
        if(!fxIn || !aIn || !bIn){
            alert("Wrong Input");
            return;
        }

        const f = (x) =>{
            try{
                return evaluate(fxIn, {x});
            } catch(err){
                alert("Invalid Equation");
                return NaN;
            }
        }

        let a = Number(aIn), b = Number(bIn)

        function simpson(a, b, n){
            let h = (b - a) / (2 * n)
            let sumOdd = 0, sumEven = 0
            let xi = a
            for(let i = 1;i < n * 2;i++){
                xi += h
                if(i % 2 === 0) sumEven += f(xi)
                else sumOdd += f(xi)
            }
            return (h / 3) * (f(a) + f(b) + 4 * sumOdd + 2 * sumEven)
        }

        function realRes(a, b){
            return simpson(a, b, 1000)
        }

        let res = simpson(a, b, 1)

        let error = Math.abs((realRes(a, b) - res) / realRes(a, b)) * 100

        setResult(res);
        setError(error);

    }
 
    return(
        <div>
            <h2>Single Simpson's Rule</h2>
            <input placeholder="Equation (เช่น x^3-2x^2-5)" value={fxIn} onChange={(e) => setFxIn(e.target.value)}></input>
            <br></br>
            <br></br>
            <input placeholder="a" value={aIn} onChange={(e) => setAIn(e.target.value)}></input> &nbsp;&nbsp;&nbsp;&nbsp;
            <input placeholder="b" value={bIn} onChange={(e) => setBIn(e.target.value)}></input> &nbsp;&nbsp;&nbsp;&nbsp;
            <br/>
            <br/>
            <button onClick={calculate}>Calculate</button>
            <h2>result = {result}</h2>
            <h2>Error = {error}%</h2>
            <br/>
            <br/>
        </div>
    );
}

export default SingleSimpson