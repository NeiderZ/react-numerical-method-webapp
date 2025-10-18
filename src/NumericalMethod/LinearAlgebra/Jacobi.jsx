import React, { useEffect, useState } from "react";
import "../Method.css";
import { number } from "mathjs";

function Jacobi() {
    const [size, setSize] = useState(1);
    const [matrixA, setMatrixA] = useState([]);
    const [resMatrix, setResMatrix] = useState([]);
    const [xStart, setXStart] = useState([]);
    const [errorLimit, setErrorLimit] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        const n = Number(size);
        setMatrixA(Array(n).fill(0).map(() => Array(n).fill("")));
        setResMatrix(Array(n).fill(""));
        setXStart(Array(n).fill(""));
    }, [size]);

    const defineMatrixA = (i, j, val) =>{
        const matrix = [...matrixA];
        matrix[i][j] = val;
        setMatrixA(matrix);
    }

    const defineResMatrix = (i, val) => {
        const b = [...resMatrix];
        b[i] = val;
        setResMatrix(b);
    }

    const defineXStart = (i, val) => {
        const start = [...xStart];
        start[i] = val;
        setXStart(start);
    }

    function cal(){

        let n = Number(size);
        let a = matrixA.map(row => row.map(Number));
        let res = resMatrix.map((Number));
        let xold = xStart.map((Number))
        let iter = 1;
        let errorTarget = Number(errorLimit);
        

        if(!size){
            alert("Input size")
            return;
        }

        if(a.some(row => row.some(isNaN)) || res.some(isNaN) || xold.some(isNaN)){
            alert("Input all matrix values")
            return;
        }

        let xres = new Array(n).fill(0);
        let error = new Array(n).fill(1);
        let correctData = [];

        do{
            for(let j = 0;j < n;j++){
                xres[j] = res[j]
                for(let k = 0;k < n;k++){
                    if(j !== k) xres[j] -= a[j][k] * xold[k]
                }
                xres[j] /= a[j][j]
                error[j] = Math.abs((xres[j] - xold[j]) / xres[j])
            }

            correctData.push({
            iteration: iter,
            x: [...xres],
            e: [...error]
            });

            xold = [...xres];
            iter++;
        }while(error.every(e => e > errorTarget) || error.some(e => Number.isNaN(e)));

        setData(correctData);

    }

    return (
        <div>
            <h2>Jacobi Iteration Method</h2>
            <input placeholder="size" value={size} onChange={(e) => setSize(e.target.value)} type="number" min={1} style={{ width: "50px" }}/> &nbsp;&nbsp;
            <input placeholder="Error (0.0001)" value={errorLimit} onChange={(e) => setErrorLimit(e.target.value)} type="number" min={0} max={1} style={{ width: "100px" }}/>
            <br /><br />
            <div style={{display: "flex", alignItems: "center", marginBottom: "8px", justifyContent: "center"}}>
                <div>
                    <h2>[A]</h2>
                    {matrixA.map((_, rows) => (
                    <div key={rows}>
                        {matrixA.map((_, cols) => (
                            <input key={cols} value={matrixA[rows][cols]} onChange={(e) => defineMatrixA(rows, cols, e.target.value)} style={{width: "40px", marginRight: "5px", marginBottom: "5px"}}></input>
                        ))}
                    </div>
                    ))}
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div style={{display: "flex", flexDirection: "column"}}>
                    <h2>{"{X}"}</h2>
                    {resMatrix.map((_, i) => (
                        <input key={i} value={"x" + (i+1)} disabled={true}  style={{width: "40px", marginRight: "5px", marginBottom: "5px"}}></input>
                    ))}
                </div>
                &nbsp;&nbsp;<h2>=</h2>&nbsp;&nbsp;
                <div style={{display: "flex", flexDirection: "column"}}>
                    <h2>{"{B}"}</h2>
                    {resMatrix.map((_, i) => (
                        <input key={i} value={resMatrix[i]} onChange={(e) => defineResMatrix(i, Number(e.target.value))} style={{width: "40px", marginRight: "5px", marginBottom: "5px"}}></input>
                    ))}
                </div>
            </div>
            <h2>{"{X"}<sub>0</sub>{"}"}</h2>
            {xStart.map((_, i) => (
                <input key={i} value={xStart[i]} onChange={(e) => defineXStart(i, Number(e.target.value))} style={{width: "40px", marginRight: "5px", marginBottom: "5px"}}></input>
            ))}
            <br /><br />
            <button onClick={cal}>Calculate</button>
            <br /><br />
            <h2>Result</h2>
            <table border="1" cellPadding="8" style={{borderCollapse: "collapse"}}>
                <thead>
                    <tr>
                        <th>Iteration</th>
                        {data.length > 0 && data[0].x.map((_, idx) => (
                            <th key={"x"+idx}>x{idx + 1}</th>
                        ))}
                        {data.length > 0 && data[0].e.map((_, idx) => (
                            <th key={"e"+idx}>error{idx + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr key={idx}>
                            <td>{row.iteration}</td>
                            {row.x.map((val, i) => (
                                <td key={"x"+i}>{val.toFixed(6)}</td>
                            ))}
                            {row.e.map((val, i) => (
                                <td key={"e"+i}>{val.toExponential(2)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Jacobi;
