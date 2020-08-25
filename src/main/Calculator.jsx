import React, { useState } from 'react';
import Button from './../components/button/Button';
import Display from '../components/display/Display'
import './Calculator.css'


const  Calculator = () => {   

    const [displayValue, setDisplayValue] = useState(0);
    const [clearDisplay,setClearDisplay] = useState(false);
    const [operation, setOperation] = useState(null);
    const [value, setValue] = useState([0,0]);
    const [current, setCurrent] = useState(0);

    function clearMemory(){
        setDisplayValue(0);
        setClearDisplay(false);
        setOperation(null);
        setValue([0,0]);
        setCurrent(0);
    }

    function addDigit(digit){
        if(digit === '.' && displayValue.includes('.')){
            return 
        }

       
        const clear = displayValue == "0" 
         ||  clearDisplay ;
        

         const currentValue = clear ? '' : displayValue;
         const newDisplayValue = currentValue + digit;

         setDisplayValue(newDisplayValue);
         setClearDisplay(false);

        if(digit !== '.'){
            const i = current;
            const newValue = Number(newDisplayValue);
            const values = value;
            values[i] = newValue;
           
           setValue(values);
        }
     }

    function initOperation(op ){
        if(current === 0){
            setOperation(op);
            setCurrent(1);
            setClearDisplay(true);
        }else{
            const equals = op == "=";
            const currentOperation = operation;
            const values = [...value]

            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
            } catch(e){
                values[0] = this.state.values[0];
            }

           
            values[1] = 0;
            
            setValue(values);
            setDisplayValue(values[0]);
            setOperation(equals ? null : operation);
            setCurrent(equals ? 0 : 1);
            setClearDisplay(!equals);
        }
    }

  
        return(
            <div className="calculator" >
                <Display value={displayValue}  />
                <Button label="AC" click={()=>clearMemory()} triple />
                <Button label="/"  click={op => initOperation(op)} operation/>
                <Button label="7" click={ digite => addDigit(digite)} />
                <Button label="8" click={ digite => addDigit(digite)}  />
                <Button label="9" click={digite => addDigit(digite)} />
                <Button label="*"  click={op => initOperation(op)} operation/>
                <Button label="4" click={ digite => addDigit(digite)} />
                <Button label="5" click={digite => addDigit(digite)} />
                <Button label="6"  click={digite => addDigit(digite)} />
                <Button label="-"  click={ op => initOperation(op) } operation/>
                <Button label="1" click={digite => addDigit(digite)} />
                <Button label="2" click={digite => addDigit(digite)} />
                <Button label="3" click={digite => addDigit(digite)} />
                <Button label="+"  click={op => initOperation(op)} operation/>
                <Button label="0"  click={digite => addDigit(digite)} double/>
                <Button label="." click={digite => addDigit(digite)}  />
                <Button label="="  click={op => initOperation(op)} operation/>
            </div>
        );
   
}

export default Calculator;