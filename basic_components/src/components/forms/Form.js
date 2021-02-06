import React,{useState,useRef,useEffect} from 'react'
import Button from '../button/Button'
import Dropdown from '../dropdown/Dropdown'
import TextInput from '../textInput/TextInput'
import './Form.css'

function Form({name}) {
    let select1 = {
        name: 'Tested Biomarker',
        values: ["ECG", "Glucose", "CBC"],
        width:'12rem'
    }
    let select2={
        name: 'unit',
        values: ['mgdl', 'mg', 'cm'] ,
        width: '4rem'
    }
    const [tests,setTests]=useState([select1,select2]);

///use state not working
const countRows=useRef(0);
const formRef=useRef(null);

const refRow=useRef(null);
const [labResults,setLabResults]=useState(new Map());
const keys=useRef(new Set(['ECG','Glucose','CBC']));
const deleteKeys=useRef([]);

 
///one time initialisation when component is mounted
 useEffect(()=>{
     
     let backButton = formRef.current.children[2].children[0];
     console.log(countRows.current);
     backButton.disabled = true;
     backButton.style.opacity = 0.5; 
     let submitButton = formRef.current.children[2].children[1];
     console.log(submitButton);
     submitButton.disabled = true;
     submitButton.style.opacity = 0.5;
 },[])   


//////////////////////////
const submitHandler=(e)=>{
   console.log(e.target);
   //reinitializing values after submission
   deleteKeys.current.splice(0,deleteKeys.current.length);
   console.log(deleteKeys);
   select1.values.forEach((value)=>{
       keys.current.add(value);
   })
     setTests([{...select1},{...select2}]);
     console.log(keys.current,tests);
     let tempRes=labResults;
     tempRes.clear();
     setLabResults(tempRes);
     console.log(labResults);
   
     //activating save button to add new form and deactivating back button 
    let lastRowElements = formRef.current.children[2].children;
    let refRowElements = refRow.current.children;
    var l = refRowElements.length;
    refRowElements[l - 1].disabled = false; //save button
    refRowElements[l - 1].style.opacity = 1;
    let backButton = lastRowElements[0];
    backButton.disabled = true;
    backButton.style.opacity = 0.5; 
    //deactivating submit button
    e.target.disabled=true;
    e.target.style.opacity=0.5;
}
/////////////////////////////////
const saveHandler=(e)=>{ 
console.log(e.target);


}
///////////////////////////////
const eventBubbling=(e)=>{
   
  if(e.target.type==='submit'){
      console.log(e.currentTarget.children);
      //initially when there were multiple rows ref was changed based on target
     // refRow.current = e.currentTarget;
      let rowElements = refRow.current.children;
      var l = rowElements.length;
      let selectedTest = rowElements[2].value;
      let selectedUnit=rowElements[5].value;
   //   let defaultValue='Select';
      let selectedValue=rowElements[l-2].value;
     
  //    if (selectedTest !== defaultValue && selectedUnit !== defaultValue && selectedValue.trim() !== '') {
      if (selectedValue.trim() !== ''){
         deleteKeys.current.push(selectedTest);
         keys.current.delete(selectedTest);
         console.log(keys.current);
      
     setTests(([select1,select2])=>(
         [select1={
             name:'Tested Biomarker',
             values: Array.from(keys.current),
             width:'12rem'
         },{...select2}]
     )   
     )
     console.log(tests);
          setLabResults((prevLabResults)=>(prevLabResults.set(selectedTest, { 'unit': selectedUnit, 'value': selectedValue })));
        //  labResults.current.set(selectedTest, { 'unit': selectedUnit, 'value': selectedValue });
          console.log(labResults);
        //   setCountRows((prevCount) => (prevCount + 1));
       // countRows.current+=1;
          console.log(countRows.current )
         countRows.current= rowElements[2].children.length-1;
          console.log(e.target)
          if(countRows.current===0){
              e.target.disabled=true;
              e.target.style.opacity='0.5';
              let submitButton=formRef.current.children[2].children[1];
              submitButton.disabled=false;
              submitButton.style.opacity=1;
          }
          if(countRows.current>=1){
              let backButton=formRef.current.children[2].children[0];
              backButton.disabled=false;
              backButton.style.opacity=1;
          }
    }
      else{
          alert('invalid entry');
      }
      rowElements[l - 2].value = '';
     

  }   
}

///////////////
const backHandler=(e)=>{
    console.log(e.target);
   // setCountRows((prevCount)=>(prevCount-1));
   countRows.current+=1;
    console.log(countRows.current);
    let deletedKey = deleteKeys.current.pop();
        keys.current.add(deletedKey);
        ///error here is  returning true and false value
        let tempRes=labResults;
        tempRes.delete(deletedKey);
        setLabResults(tempRes);
        ///labResults.keys() was giving error as it's returning iterable object not an array
        console.log(Array.from(labResults.keys()));
        console.log(keys.current);
        console.log(deleteKeys.current);
    setTests(([select1, select2]) => (
        [select1 = {
            name: 'Tested Biomarker',
            values: Array.from(keys.current),
            width:'12rem'
        }, { ...select2 }]
    )
    )
    console.log(tests);
    let lastRowElements = formRef.current.children[2].children;
    let refRowElements = refRow.current.children;
    let submitButton = lastRowElements[1];
    var l = refRowElements.length;
    if (countRows.current === 3) {
        let backButton = lastRowElements[0];
        backButton.disabled = true;
        backButton.style.opacity = 0.5; 
    }
    
    else if (countRows.current > 0) {
        refRowElements[l-1].disabled = false; //save button
        refRowElements[l-1].style.opacity = 1;
        submitButton.disabled=true;
        submitButton.style.opacity=0.5;
    }
    else if(countRows===0){
        submitButton.disabled=false;
        submitButton.style.opacity=1;
    }
   
    refRowElements[l - 2].value = '';
    
}
    return (
        <>
        <div className={`container-fluid `} id="lab-report" >  
           
            <div className={`grid form`} ref={formRef}>
            <div className='row'>
                    <h3 >{name}</h3>
            </div>
       
                <div className='row'  onClick={(e) => eventBubbling(e)} ref={refRow} >
                    {tests.map((test) => (<Dropdown key={tests.indexOf(test)} name={test.name} values={test.values} changeHandler={(e) => null} className='col' style={{width:`${test.width}`}}/>))}
                    <TextInput name="result" changeHandler={(e) => null} style={{ backgroundColor: 'aliceBlue' }} className='col' />
                    <Button name='Save' clickHandler={saveHandler}  variant='primary' color='white' className='col' ></Button>

                    </div>
               
                <div className='row flex-end'>
                    <Button name='Back' clickHandler={backHandler} variant='secondary' color='white'
                        className='col'  ></Button>  
                    <Button name='Submit' clickHandler={submitHandler} variant='secondary' color='white'
                    className='col'  ></Button>   
                                
                </div>              

            </div>
            
        </div>
        <div  id='logged-values' >
                <div className='container' >
                    <b>{`Logged values:`}</b>
                {
                 (labResults.size!==0) ?  ( Array.from(labResults.keys()).map((key)=>(
                        <>                      
                        <p key={key}>{`${key}: value= ${labResults.get(key).value} ${labResults.get(key).unit}`}</p>
                        
                        </>
                        ))
                 ):(<></>)
                }
             </div>
        </div>
        </>
    )
}

export default Form
