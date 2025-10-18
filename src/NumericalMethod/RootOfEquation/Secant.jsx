import React, {useState} from "react"
import { evaluate } from "mathjs"
import '../Method.css'
import Plot from "react-plotly.js"

function Secant(){
    const[fxIn,setFxIn] = useState("")
    const[x0In,setX0In] = useState("")
    const[x1In,setX1In] = useState("")
    const[data,setData] = useState([])

    function calculate(){

        if(!fxIn || !x0In || !x1In){
            alert("Wrong Input")
            return;
        }
        
        const f = (x) =>{
            try{
                return evaluate(fxIn, {x})
            }catch(err){
                alert("Wrong Equation")
                return;
            }
        }

        let xnew, x0 = Number(x0In), x1 = Number(x1In), error = 1, iteration = 0;
        const data = [];

        //for plot the graph
        let fxnew;

        do{
            xnew = x1 - (f(x1) * (x1 - x0)) / (f(x1) - f(x0));
            error = Math.abs((xnew - x1) / xnew);
            fxnew = f(xnew);
            data.push({Iteration: iteration, xnew, fxnew, e: error});
            x0 = x1;
            x1 = xnew;
        }while(error > 0.0001);

        setData(data);

    }

    return(
        <div>
            <h2>Secant Method</h2>
            <input placeholder="Equation (เช่น x^2-sin(x))" value={fxIn} onChange={(e) => setFxIn(e.target.value)}></input>
            <br/><br/>
            <input placeholder="x0" value={x0In} onChange={(e) => setX0In(e.target.value)}></input>&nbsp;&nbsp;&nbsp;&nbsp;
            <input placeholder="x1" value={x1In} onChange={(e) => setX1In(e.target.value)}></input>
            <br/><br/>
            <button onClick={calculate}>Calculate</button>
            <h2>Result</h2>
            <br/><br/>
            {data && (
                            <Plot data={[
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
                                                <td>{row.xnew.toFixed(6)}</td>
                                                <td>{row.fxnew.toFixed(6)}</td>
                                                <td>{row.e.toFixed(6)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                            </table>
                        )}
        </div>
    );
}

export default Secant