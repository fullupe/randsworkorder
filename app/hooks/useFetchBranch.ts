import { useFetchData } from "./useFetchData";




export const useFetchBrache =()=>{

    const {DataApiBranchOnly}=useFetchData()
    
    //groupBy BRANCH
    const result = DataApiBranchOnly.reduce(function(r: { [x: string]: any[]; }, a: { branch: string | number; }){
    r[a.branch]=r[a.branch] || [];
    r[a.branch].push(a);
    return r;
    
    },Object.create(null));
    
    const BranchOffice = Object.entries(result)


    return {BranchOffice }

}
