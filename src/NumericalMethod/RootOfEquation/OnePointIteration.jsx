import React,{useState} from "react";
import { evaluate } from "mathjs";
import '../Method.css'
import Plot from 'react-plotly.js'

function OnePointIteration(){
    const[fxIn,setFxIn] = useState("");
    const[xStart,setXStart] = useState("");
    const[data,setData] = useState([]);

    function calculate(){

        if(!fxIn || !xStart){
            alert("Wrong Input");
            return;
        }

        const f = (x) =>{
            try{
                return evaluate(fxIn, {x});
            }catch(err){
                alert("Invalid Equation");
                return;
            }
        }

        let xnew, xold = Number(xStart), error = 1, iteration = 0;
        let fxold;
        const data = [];

        do{
            xnew = f(xold);
            error = Math.abs((xnew - xold) / xnew);
            //to plot the graph
            fxold = f(xold);
            data.push({Iteration: iteration, xold, fxold, e: error});
            xold = xnew;
            iteration++;
        }while(error > 0.0001);

        setData(data);

    }

    return(
        <div>
            <h2>One Point Iteration Method</h2>
            <input placeholder="Equation (เช่น x^2-1)" value={fxIn} onChange={(e) => setFxIn(e.target.value)}></input>
            <br/><br/>
            <input placeholder="x at begin" value={xStart} onChange={(e) => setXStart(e.target.value)}></input>
            <br/><br/>
            <button onClick={calculate} style={{ backgroundColor: '#007bff', color: 'white' }}>Calculate</button>
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
                        title: 'One Point Iteration Graph',
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

export default OnePointIteration