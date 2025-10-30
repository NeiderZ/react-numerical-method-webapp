import { useEffect, useState } from 'react'
import Plotly from 'react-plotly.js'
import '../Method.css'

function Lagrance() {
    const [amountOfTableIn, setAmountOfTableIn] = useState(1)
    const [xTableIn, setXTableIn] = useState([])
    const [yTableIn, setYTableIn] = useState([])
    const [xTargetIn, setXTargetIn] = useState('')
    const [amountOfPoint, setAmountOfPoint] = useState(20)
    const [result, setResult] = useState(null)
    const [plotPoints, setPlotPoints] = useState([])

    useEffect(() => {
        const n = Number(amountOfTableIn)
        setXTableIn(Array(n).fill(''))
        setYTableIn(Array(n).fill(''))
    }, [amountOfTableIn])

    const defineXTableIn = (i, val) => {
        const tempX = [...xTableIn]
        tempX[i] = val
        setXTableIn(tempX)
    }

    const defineYTableIn = (i, val) => {
        const tempY = [...yTableIn]
        tempY[i] = val
        setYTableIn(tempY)
    }

    async function calculate() {
        const xTable = xTableIn.map(Number)
        const yTable = yTableIn.map(Number)
        const xTarget = Number(xTargetIn)
        const n = xTable.length

        try {
            await fetch("http://localhost:5000/api/save-data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ xTable, yTable })
            });
            console.log("Data saved to MongoDB ✅");
        } catch (err) {
            console.error("Error saving data:", err);
        }

        if (isNaN(xTarget) || yTable.some(isNaN) || xTable.some(isNaN)) {
            alert("wrong input")
            return
        }

        let finalResult = 0
        for (let i = 0; i < n; i++) {
            let Li = 1
            for (let j = 0; j < n; j++) {
                if (i !== j) {
                    Li *= (xTarget - xTable[j]) / (xTable[i] - xTable[j])
                }
            }
            finalResult += Li * yTable[i]
        }
        setResult(finalResult)

        const minX = Math.min(...xTable)
        const maxX = Math.max(...xTable)
        const numPlotPoints = Number(amountOfPoint)
        const plotPointsTemp = []

        for (let k = 0; k < numPlotPoints; k++) {
            const x = minX + (maxX - minX) * k / (numPlotPoints - 1)
            let y = 0
            for (let i = 0; i < n; i++) {
                let Li = 1
                for (let j = 0; j < n; j++) {
                    if (i !== j) {
                        Li *= (x - xTable[j]) / (xTable[i] - xTable[j])
                    }
                }
                y += Li * yTable[i]
            }
            plotPointsTemp.push({ x, y })
        }

        setPlotPoints(plotPointsTemp)
    }

    return (
        <div>
            <input
                placeholder='define n of table'
                value={amountOfTableIn}
                onChange={(e) => setAmountOfTableIn(e.target.value)}
                style={{ width: '100px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div>
                    <h2>X</h2>
                    {xTableIn.map((_, i) => (
                        <div key={i}>
                            <input
                                value={xTableIn[i]}
                                onChange={(e) => defineXTableIn(i, e.target.value)}
                            /><br />
                        </div>
                    ))}
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div>
                    <h2>Y</h2>
                    {yTableIn.map((_, i) => (
                        <div key={i}>
                            <input
                                value={yTableIn[i]}
                                onChange={(e) => defineYTableIn(i, e.target.value)}
                            /><br />
                        </div>
                    ))}
                </div>
            </div>

            <br /><br />
            <input
                value={xTargetIn}
                onChange={(e) => setXTargetIn(e.target.value)}
                placeholder='x target'
                style={{ width: '100px' }}
            />
            <br /><br />
            <input
                value={amountOfPoint}
                onChange={(e) => setAmountOfPoint(e.target.value)}
                placeholder='n point'
                type='number'
                min={2}
                style={{ width: '100px' }}
            />
            <br /><br />

            <button
                onClick={calculate}
                style={{ backgroundColor: '#007bff', color: 'white' }}
            >
                Calculate
            </button>

            <h2>Result = {result}</h2>

            <Plotly
                data={[
                    {
                        x: plotPoints.map((p) => p.x),
                        y: plotPoints.map((p) => p.y),
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red', size: 6 },
                        line: { color: 'blue' },
                        name: 'Lagrange Curve'
                    },
                ]}
                layout={{
                    width: 1000,
                    height: 700,
                    title: { text: 'Lagrange Interpolation Graph' },
                    xaxis: { title: 'X' },
                    yaxis: { title: 'Y' },
                    line: {color: 'blue'}
                }}
            />
        </div>
    )
}

export default Lagrance
