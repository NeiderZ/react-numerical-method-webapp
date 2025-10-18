import React, {useState} from "react";
import {evaluate, derivative} from "mathjs";
import '../Method.css'
import Plot from 'react-plotly.js'

function FalsePosition(){
    const[fxIn,setFxIn] = useState("");
    const[xlIn,setXlIn] = useState("");
    const[xrIn,setXrIn] = useState("");
    const[errorLimitIn,setErrorLiminIn] = useState("");
    const[result,setResult] = useState("");
    const[data,setData] = useState([]);

    function calculate(){
        if(!fxIn || !xrIn || !xlIn || !errorLimitIn){
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

        let xl = Number(xlIn);
        let xr = Number(xrIn);
        let xnew, fxnew, xold, iteration = 0, error = 1;
        const errorLimit = Number(errorLimitIn);
        const data = [];

        do{
            xnew = (xl * f(xr) - xr * f(xl)) / (f(xr) - f(xl));
            fxnew = f(xnew);
            if(fxnew * f(xr) < 0) xl = xnew;
            else xr = xnew;
            if(iteration == 0){
                xold = xnew;
                data.push({Iteration: iteration, xnew, fxnew, e: "-"})
                iteration++;
                continue;
            }
            error = Math.abs((xnew - xold) / xnew);
            data.push({Iteration: iteration, xnew, fxnew, e: error})
            xold = xnew;
            iteration++;
        }while(error > errorLimit);

        setResult(xnew.toFixed(6));
        setData(data);

    }
 
    return(
        <div>
            <h2>False Position Method</h2>
            <input placeholder="Equation (เช่น x^3-2x^2-5)" value={fxIn} onChange={(e) => setFxIn(e.target.value)}></input>
            <br></br>
            <br></br>
            <input placeholder="xl" value={xlIn} onChange={(e) => setXlIn(e.target.value)}></input> &nbsp;&nbsp;&nbsp;&nbsp;
            <input placeholder="xr" value={xrIn} onChange={(e) => setXrIn(e.target.value)}></input> &nbsp;&nbsp;&nbsp;&nbsp;
            <input placeholder="error" value={errorLimitIn} onChange={(e) => setErrorLiminIn(e.target.value)}></input>
            <br/>
            <br/>
            <button onClick={calculate}>Calculate</button>
            <h2>result = {result}</h2>
            <br/>
            <br/>
            {data && (
                <Plot
                    data = {[
                        {
                            x: data.map(d => d.xnew),
                            y: data.map(d => d.fxnew),
                            type: "scatter",
                            mode: "lines+markers",
                            line: {color: "blue"},
                            marker: {color: "red", size: 8}
                        }
                    ]}
                    layout={{
                        width: 1024,
                        height: 500,
                        title: 'False Position Convergence Graph',
                        xaxis: {title: "Iteration"},
                        yaxis: {title: "x"}
                    }}
                    config={{
                        scrollZoom: true,
                        displayModeBar: true,
                        responsive: true
                    }}
                />
            )}
            {data && (
                <table border="1" cellPadding="10" style={{marginTop: "20px", borderCollapse: "collapse", width: 1024}}>
                    <thead>
                        <tr>
                            <th>Iteration</th>
                            <th>x</th>
                            <th>f(x)</th>
                            <th>error</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key = {index}>
                                <td>{row.Iteration}</td>
                                <td>{row.xnew.toFixed(6)}</td>
                                <td>{row.fxnew.toFixed(6)}</td>
                                <td>{typeof row.e === "string" ? row.e : row.e.toFixed(6)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default FalsePosition