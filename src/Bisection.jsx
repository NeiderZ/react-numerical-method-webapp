import React, {useState} from "react"
import {evaluate} from 'mathjs'
import './Method.css'
import Plot from 'react-plotly.js'

function Bisection(){
    const [fxIn, setFxIn] = useState("");
    const [xlIn, setXlIn] = useState("");
    const [xrIn, setXrIn] = useState("");
    const [errorLimitIn, setErrorLimit] = useState("");
    const [result, setResult] = useState("");
    const [data, setData] = useState([]);

    function calculate(){

        if(!fxIn || !xlIn || !xrIn || !errorLimitIn){
            alert("Wrong input");
            return;
        }

        let xl = Number(xlIn);
        let xr = Number(xrIn);
        let fxm;
        const errorLimit = Number(errorLimitIn);
        const data = []; 

        const f = (x) => {
            try{
                return evaluate(fxIn, {x});
            } catch (err){
                alert("Invalid Equation");
                return NaN;
            }
        }

        let xm, xmOld, iteration = 0, error = 1;

        do{
            xm = (xl + xr) / 2;
            fxm = f(xm);
            if(fxm * f(xr) < 0) xl = xm;
            else xr = xm;
            if(iteration == 0){
                xmOld = xm;
                data.push({Iteration: iteration, xm, fxm, e: "-"});
                iteration++;
                continue;
            }
            error = Math.abs((xm - xmOld) / xm);
            data.push({Iteration: iteration, xm, fxm, e: error});
            xmOld = xm;
            iteration++;
        }while(error > errorLimit);

        setResult(xm.toFixed(6));
        setData(data);
    }

    return(
        <div>
            <h2>Bisection Method</h2>
            <input placeholder="Equation (เช่น x^4-13)" value={fxIn} onChange={(e) => setFxIn(e.target.value)}/>
            <br/><br/>
            <input placeholder="xl" value={xlIn} onChange={(e) => setXlIn(e.target.value)}/> &nbsp;&nbsp;&nbsp;&nbsp;
            <input placeholder="xr" value={xrIn} onChange={(e) => setXrIn(e.target.value)}/> &nbsp;&nbsp;&nbsp;&nbsp;
            <input placeholder="Error" value={errorLimitIn} onChange={(e) => setErrorLimit(e.target.value)}/>
            <br/><br/>
            <button onClick={calculate}>Calculate</button>
            <h2>Result = {result}</h2>
            <br/><br/>
            {data && (
                <Plot
                    data={[
                        {
                            x: data.map(d => d.xm),
                            y: data.map(d => d.fxm),
                            type: 'scatter',
                            mode: 'lines+markers',
                            name: 'Bisection points',
                            line: {color: 'blue'},
                            marker: {color: 'red', size: 8}
                        }
                    ]}
                    layout={{
                        width: 1024,
                        height: 500,
                        title: 'Bisection Convergence Graph',
                        xaxis: {title: 'Iteration'},
                        yaxis: {title: 'xm'},
                    }}
                    config={{
                        scrollZoom: true,
                        displayModeBar: true,
                        responsive: true
                    }}
                />
            )}
            {data.length > 0 && (
                <table border="1" cellPadding="10" style={{marginTop: "20px", borderCollapse: "collapse", width: 1024}}>
                    <thead>
                        <tr>
                            <th>Iteration</th>
                            <th>xm</th>
                            <th>f(xm)</th>
                            <th>Error</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td>{row.Iteration}</td>
                                <td>{row.xm.toFixed(6)}</td>
                                <td>{row.fxm.toFixed(6)}</td>
                                <td>{typeof row.e === "string" ? row.e : row.e.toFixed(6)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Bisection