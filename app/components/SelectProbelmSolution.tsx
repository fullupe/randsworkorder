import React from 'react'

import options from '@/tpmParts';


import Select  from 'react-select';
import makeAnimated from"react-select/animated"
const animatedComponents = makeAnimated()
type Props = {
    setProblemSolutions:any
}

function SelectProbelmSolution({setProblemSolutions}: Props) {
  return (
    <div className="max-w-smd z-10 flex flex-col mx-auto space-y-2 w-full">
    <p className="text-orange-900 font-mono font-bold mb-0">Solution / part Change</p>


    <Select
    className="text-black  text-sm  flex-1 w-full"
    //defaultValue={[options[2], options[3]]}
    isMulti
    //value="problemDesc"
    options={options}
    //className="basic-multi-select"
    //classNamePrefix="select"
    closeMenuOnSelect={false}
    isSearchable={true}
    components={animatedComponents}// @ts-ignore
    onChange={(item)=>setProblemSolutions(item)}
     
  />

 
  </div>
  )
}

export default SelectProbelmSolution