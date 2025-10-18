import React, {useState} from "react";
import { evaluate, derivative } from "mathjs";
import '../Method.css'
import Plot from "react-plotly.js";

function NewtonRaphson(){
    const[fxIn,setFxIn] = useState("")
    const[xBegin,setXBegin] = useState("")
    const[data,setData] = useState([])

    function calculate(){
        if(!fxIn || !xBegin){
            alert("Wrong Input")
            return;
        }

        const f = (x) =>{
            try{
                return evaluate(fxIn, {x})
            }catch(err){
                alert("Invalid Equation")
                return NaN;
            }
        }

        const fd = (x) =>{
            const diff = derivative(fxIn, 'x').toString();
            return evaluate(diff, {x});
        }

        const data = [];
        let xnew, xold = Number(xBegin), error = 1, iteration = 0;
        let fxold;

        do{
            xnew = xold - f(xold) / fd(xold);
            error = Math.abs((xnew - xold) / xnew);
            //to plot
            fxold = f(xold);
            data.push({Iteration: iteration, xold, fxold, e: error});
            xold = xnew;
        }while(error > 0.0001);

        setData(data);

    }

    return(
        <div>
            <h2>Newton Raphson Method</h2>
            <input placeholder="Equation (เช่น x^2-sin(x))" value={fxIn} onChange={(e) => setFxIn(e.target.value)}></input>
            <br/><br/>
            <input placeholder="x at begin" value={xBegin} onChange={(e) => setXBegin(e.target.value)}></input>
            <br/><br/>
            <button onClick={calculate}>Calculate</button>
            <h2>Result</h2>
            <br/><br/>
            {data && (
                <Plot data={[
                        {
                            x: data.map(d => d.xold),
                            y: data.map(d => d.fxold),
                            type: "scatter",
                            mode: "lines+markers",
                            line: {color: "blue"},
                            marker: {color: "red", size: 8}
                        }
                    ]}
                    layout={{
                        width: 1024,
                        height: 500,
                        title: 'Newton Raphson Graph',
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
                                    <td>{row.xold.toFixed(6)}</td>
                                    <td>{row.fxold.toFixed(6)}</td>
                                    <td>{row.e.toFixed(6)}</td>
                                </tr>
                            ))}
                        </tbody>
                </table>
            )}
        </div>
    );
}

export default NewtonRaphson