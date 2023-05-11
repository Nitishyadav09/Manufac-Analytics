import React from 'react';
import Data from '../Dataset/Wine-Data.json'
import FlavanoidCalculationLandingPage from './FlavanoidCalculation/FlavanoidCalculationLandingPage';
import GammaCalculationLandingPage from './GammaCalculation/GammaCalculationLandingPage';

interface CalculationLandingPageI{}

export interface Wine {
    Alcohol: number;
    'Malic Acid': number;
    Ash: number| string;
    'Alcalinity of ash': number;
    Magnesium: number;
    'Total phenols': number;
    Flavanoids: number| string;
    'Nonflavanoid phenols': number| string;
    Proanthocyanins: string;
    'Color intensity': number| string;
    Hue: number;
    'OD280/OD315 of diluted wines': number | string;
    Unknown: number;
  }
  

const CalculationLandingPage:React.FC<CalculationLandingPageI>=(props)=>{

  // below in two variable we are finding number of distinct alcohol class available in the dataset.
  const getAlcoholDistinctList:any=new Set(Data?.map((item:Wine)=>{return item?.["Alcohol"]}));
  const getAlcoholList:number[]=[...getAlcoholDistinctList];
   
  // function to find mean of Flavanoids
    const getFlavanoidsMean=(dataSet: Wine[])=>{
       const TotalFlavanoids:number = dataSet?.reduce((initial:number,item:Wine)=>{return initial+Number(item?.["Flavanoids"])},0)
       return (TotalFlavanoids/(dataSet?.length)).toFixed(3);
      }
     
   // function to find median of Flavanoids 
    const getFlavanoidsMedian=(dataSet: Wine[])=>{
        const ListFlavanoids:number[] = dataSet?.map((item:Wine)=> Number(item?.Flavanoids));
        const soredDataSet = ListFlavanoids?.sort((a:number,b:number)=> a-b);
        const middleIndex = Math.floor(soredDataSet.length / 2);
   // If the array has an odd number of elements, the median is the middle element
        if (soredDataSet.length % 2 === 1) {
           return Number(soredDataSet[middleIndex]).toFixed(3);
         }
   // If the array has an even number of elements, the median is the average of the middle two elements
        return (soredDataSet[middleIndex - 1] + soredDataSet[middleIndex]) / 2;
       }

// function to find mode of Flavanoids
       const getFlavanoidsMode=(dataSet: Wine[])=>{
         // Create an empty object to store the frequency count of each Flavanoids value
          const flavanoidsCount:any = {};
          const ListFlavanoids:number[] = dataSet?.map((item:Wine)=> Number(item?.Flavanoids));
          // Loop through the array of data and count the number of occurrences of each value
          ListFlavanoids.forEach((value:number) => {
            if (value in flavanoidsCount) {
              flavanoidsCount[value]++;
            } else {
              flavanoidsCount[value] = 1;
            }
          });
        
          // Find the value with the highest count
          let mode:any;
          let maxCount:number = 0;
          for (const value in flavanoidsCount) {
            if (flavanoidsCount[value] > maxCount) {
              mode = value;
              maxCount = flavanoidsCount[value];
            }
          }
        
          return Number(mode).toFixed(3);
        
       }
    
    // “Gamma” is calculated as Gamma = (Ash * Hue) / Magnesium
      
    // function to find mean of gamma
    const getGammaMean=(dataSet: Wine[])=>{
        const TotalGamma:number = dataSet?.reduce((initial:number,item:Wine)=>{return initial+(Number(item?.["Ash"])*Number(item?.["Hue"]))/Number(item?.["Magnesium"])},0)
        return (TotalGamma/(dataSet.length)).toFixed(3);
       }
     
    // function to find median of gamma
     const getGammaMedian=(dataSet: Wine[])=>{
         const ListGamma:number[] = dataSet?.map((item:Wine)=> (Number(item?.["Ash"])*Number(item?.["Hue"]))/Number(item?.["Magnesium"]));
         const soredDataSet = ListGamma?.sort((a:number,b:number)=> a-b);
         const middleIndex = Math.floor(soredDataSet.length / 2);
   // If the array has an odd number of elements, the median is the middle element
        if (soredDataSet.length % 2 === 1) {
           return Number(soredDataSet[middleIndex]).toFixed(3);
         }
   // If the array has an even number of elements, the median is the average of the middle two elements
        return Number((soredDataSet[middleIndex - 1] + soredDataSet[middleIndex]) / 2).toFixed(3);
        }
      
   // function to find mode of gamma
  
        const getGammaMode=(dataSet: Wine[])=>{
          // Create an object to store the count of each unique value
          const gammasCount:any = {};

          // Iterate over each object in the data array and increment the count for the corresponding Flavanoids value
            
          const ListGamma:number[] = dataSet?.map((item:Wine)=> (Number(item?.["Ash"])*Number(item?.["Hue"]))/Number(item?.["Magnesium"]));
        
          // Loop through the array of data and count the number of occurrences of each value
          ListGamma.forEach((value:number) => {
            if (value in gammasCount) {
              gammasCount[value]++;
            } else {
              gammasCount[value] = 1;
            }
          });
        
          // Find the value with the highest count
          let mode:any;
          let maxCount:number = 0;
          for (const value in gammasCount) {
            if (gammasCount[value] > maxCount) {
              mode = value;
              maxCount = gammasCount[value];
            }
          }
        
          return Number(mode).toFixed(3);
        }
        // function to filter data first acc. to alcohol class and then call releavant mean,median & mode functions.
       
        const filterRelevantData=(itemNumber:number,type:string)=>{
          const FilterData:Wine[] =  Data?.filter((item:Wine)=>{ return item?.["Alcohol"]===itemNumber})
          switch(type){
            case "mean" : return getFlavanoidsMean(FilterData);
            case "median" : return getFlavanoidsMedian(FilterData);
            case "mode" : return getFlavanoidsMode(FilterData);
            case "gammaMean" : return getGammaMean(FilterData);
            case "gammaMedian" : return getGammaMedian(FilterData);
            case "gammaMode" : return getGammaMode(FilterData);
          }
        }


return(
  <div>
  <h3>Flavanoids (Mean, Median, Mode):</h3>
  <FlavanoidCalculationLandingPage getAlcoholList={getAlcoholList} filterRelevantData={filterRelevantData}/>
  <h3>Gamma (Mean, Median, Mode):</h3>
  <GammaCalculationLandingPage getAlcoholList={getAlcoholList} filterRelevantData={filterRelevantData}/>
  </div>)
}

export default CalculationLandingPage;
