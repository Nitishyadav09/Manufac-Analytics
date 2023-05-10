import React, { useEffect, useState } from 'react';
import { Wine } from '../CalculationLandingPage';


interface FlavanoidCalculationLandingPageI{
    getAlcoholList:number[];
    filterRelevantData:any;
}

const FlavanoidCalculationLandingPage:React.FC<FlavanoidCalculationLandingPageI>=(props)=>{
    
    // getAlcoholList is the LIST of alcohol class available in the dataset
    // filterRelevantData is a FUNCTION used in CalculationLanding.tsx to give the filtered list of respective alcohol classes which further gives the mean, median & mode of the flavanoid
    const {getAlcoholList,filterRelevantData} = props;
    
return(
  <>
    <table>
    <thead>
        <tr>
          <td>Measure</td>
        {getAlcoholList?.map((item:number)=>{
          return(<td>
            {`Alcohol ${item}`}
            </td>)
        })}
        </tr>
    </thead>
    <tbody>
      <tr>
        <td>
        Flavanoids Mean
        </td>
        {getAlcoholList?.map((item:number)=>{
        return(<td>
          {filterRelevantData(item,'mean')}
        </td>)})}
      </tr>
      <tr>
        <td>
        Flavanoids Median
        </td>
        {getAlcoholList?.map((item:number)=>{
        return(<td>
          {filterRelevantData(item,'median')}
        </td>)})}
      </tr>
      <tr>
        <td>
        Flavanoids Mode
        </td>
        {getAlcoholList?.map((item:number)=>{
        return(<td>
          {filterRelevantData(item,'mode')}
        </td>)})}
      </tr>
    </tbody>
   </table>
</>)
}

export default FlavanoidCalculationLandingPage;