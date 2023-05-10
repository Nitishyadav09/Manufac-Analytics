import React, { useEffect, useState } from 'react';
import { Wine } from '../CalculationLandingPage';


interface GammaCalculationLandingPageI{
    getAlcoholList:number[];
    filterRelevantData:any;
}

const GammaCalculationLandingPage:React.FC<GammaCalculationLandingPageI>=(props)=>{
    
    // getAlcoholList is the LIST of alcohol class available in the dataset
    // filterRelevantData is a FUNCTION used in CalculationLanding.tsx to give the filtered list of respective alcohol classes which further gives the mean, median & mode of the Gamma
    
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
        Gamma Mean
        </td>
        {getAlcoholList?.map((item:number)=>{
        return(<td>
          {filterRelevantData(item,'gammaMean')}
        </td>)})}
      </tr>
      <tr>
        <td>
        Gamma Median
        </td>
        {getAlcoholList?.map((item:number)=>{
        return(<td>
          {filterRelevantData(item,'gammaMedian')}
        </td>)})}
      </tr>
      <tr>
        <td>
        Gamma Mode
        </td>
        {getAlcoholList?.map((item:any)=>{
        return(<td>
          {filterRelevantData(item,'gammaMode')}
        </td>)})}
      </tr>
    </tbody>
   </table>
</>)
}

export default GammaCalculationLandingPage;