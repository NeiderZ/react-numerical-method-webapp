import React, {useState} from "react"
import {evaluate} from 'mathjs'
import '../Method.css'
import Plot from 'react-plotly.js'

function Graphical(){
    const [fxIn, setFxIn] = useState("");
    const [errorLimitIn, setErrorLimit] = useState("");
    const [result, setResult] = useState("");
    const [data, setData] = useState([]);

    function calculate(){

        if(!errorLimitIn){
            alert("Wrong input");
            return;
        }

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

        let res;

        let x1, x2;
        for(let i = 0;i < 10;i++){
            if(f(i) * f(i+1) <= 0){
                x1 = i;
                x2 = i + 1;
                break;
            }
        }

        for(let i = x1;i <= x2;i+=errorLimit){
            res = f(i);
            data.push({x: i, fx: res});
            if(f(i) == 0 || f(i) * f(i+errorLimit) <= 0){
                setResult(i.toFixed(6));
                break;
            }
        }

        setData(data);
    }

    return(
        <div>
            <h2>Graphical Method</h2>
            <input placeholder="Equation (เช่น 43x-180)" value={fxIn} onChange={(e) => setFxIn(e.target.value)}/>
            <br/><br/>
            <input placeholder="Error" value={errorLimitIn} onChange={(e) => setErrorLimit(e.target.value)}/>
            <br/><br/>
            <button onClick={calculate} style={{ backgroundColor: '#007bff', color: 'white' }}>Calculate</button>
            <h2>Result = {result}</h2>
            <br/><br/>
            {data && (
                <Plot
                    data={[
                        {
                            x: data.map(d => d.x),
                            y: data.map(d => d.fx),
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
                            <th>x</th>
                            <th>fx</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td>{row.x.toFixed(6)}</td>
                                <td>{row.fx.toFixed(6)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Graphical