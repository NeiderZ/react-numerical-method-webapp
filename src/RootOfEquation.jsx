import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './NumericalMethod/Method.css';
import Bisection from './NumericalMethod/RootOfEquation/Bisection';
import Graphical from './NumericalMethod/RootOfEquation/Graphical';
import FalsePosition from './NumericalMethod/RootOfEquation/FalsePosition';
import OnePointIteration from './NumericalMethod/RootOfEquation/OnePointIteration';
import NewtonRaphson from './NumericalMethod/RootOfEquation/NewtonRaphson';
import Secant from './NumericalMethod/RootOfEquation/Secant';

function RootOfEquation() {
    const navigate = useNavigate();
    const { methodParam } = useParams();
    const [method, setMethod] = useState(methodParam);

    useEffect(() => {
        if (methodParam && methodParam !== method) {
            setMethod(methodParam);
        }
    }, [methodParam]);

    const handleMethodChange = (e) => {
        const selectedMethod = e.target.value;
        setMethod(selectedMethod);
        navigate(`/RootOfEquation/${selectedMethod}`);
    };

    const renderMethod = () => {
        switch(method) {
            case "graphical":
                return <Graphical />;
            case 'bisection':
                return <Bisection />;
            case 'false-position':
                return <FalsePosition />;
            case 'one-point-iteration':
                return <OnePointIteration />;
            case 'newton-raphson':
                return <NewtonRaphson />;
            case 'secant':
                return <Secant />;
            default:
                return <Graphical />;
        }
    };

    return (
        <div>
            <select className='custom-select' value={method} onChange={handleMethodChange}>
                <option value=''>Select Method</option>
                <option value="graphical">Graphical Method</option>
                <option value="bisection">Bisection Method</option>
                <option value="false-position">False Position Method</option>
                <option value="one-point-iteration">One Point Iteration Method</option>
                <option value="newton-raphson">Newton Raphson Method</option>
                <option value="secant">Secant Method</option>
            </select>

            <div style={{padding: '2em'}}>
                {renderMethod()}
            </div>
        </div>
    );
}

export default RootOfEquation;
