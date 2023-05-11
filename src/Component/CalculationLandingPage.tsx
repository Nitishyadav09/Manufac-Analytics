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
   
  // function to find mean of gamma
    const getFlavanoidsMean=(dataSet: Wine[])=>{
       const TotalFlavanoids:number = dataSet?.reduce((initial:number,item:Wine)=>{return initial+Number(item?.["Flavanoids"])},0)
       return (TotalFlavanoids/(dataSet?.length)).toFixed(3);
      }
     
   // function to find median of gamma 
    const getFlavanoidsMedian=(dataSet: Wine[])=>{
        const ListFlavanoids:number[] = dataSet?.map((item:Wine)=> Number(item?.Flavanoids));
        const soredDataSet = ListFlavanoids?.sort((a:number,b:number)=> a-b);
        if(soredDataSet?.length % 2 === 0){
           return ((soredDataSet[soredDataSet.length / 2] + soredDataSet[(soredDataSet.length / 2) - 1]) / 2).toFixed(3);
        }
        else{
            return Number(soredDataSet[Math.ceil(soredDataSet.length/2)]).toFixed(3);
        }
       }

// function to find mode of gamma
       const getFlavanoidsMode=(dataSet: Wine[])=>{
          // Create an empty object to store the frequency count of each Flavanoids value
            const flavanoidsCount:any = {};
            
            
            // Iterate over each object in the data array and increment the count for the corresponding Flavanoids value
            dataSet.forEach((wine) => {
              const flavanoids:number = Number(wine["Flavanoids"]);
              if (flavanoidsCount.hasOwnProperty(flavanoids)) {
                flavanoidsCount[flavanoids]++;
              } else {
                flavanoidsCount[flavanoids] = 1;
              }
            });
            
            // Find the Flavanoids value with the highest frequency count
            let mode = null;
            let modeCount = 0;
            Object.keys(flavanoidsCount).forEach((flavanoids) => {
              const count = flavanoidsCount[flavanoids];
              if (count > modeCount) {
                mode = flavanoids;
                modeCount = count;
              }
            });
            
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
         if(soredDataSet?.length % 2 === 0){
            return ((soredDataSet[soredDataSet.length / 2] + soredDataSet[(soredDataSet.length / 2) - 1]) / 2).toFixed(3);
         }
         else{
             return (soredDataSet[Math.ceil((soredDataSet?.length/2))]).toFixed(3);
         }
        }
      
      // function to find mode of gamma
        const getGammaMode=(dataSet: Wine[])=>{
           // Create an empty object to store the frequency count of each Flavanoids value
             const gammasCount:any = {};
             
             
             // Iterate over each object in the data array and increment the count for the corresponding Flavanoids value
            
             const ListGamma:number[] = dataSet?.map((item:Wine)=> (Number(item?.["Ash"])*Number(item?.["Hue"]))/Number(item?.["Magnesium"]));

             dataSet.forEach((wine) => {
               const gammas:number = (Number(wine["Flavanoids"]) * Number(wine["Hue"]))/(Number(wine["Magnesium"]));
               console.log(gammasCount,"gammasCount")
               if (gammasCount.hasOwnProperty(gammas)) {
                
                 gammasCount[gammas]++;
               } else {
                 gammasCount[gammas] = 1;
               }
             });
             
             // Find the Flavanoids value with the highest frequency count
             let mode = null;
             let modeCount = 0;
             Object.keys(gammasCount).forEach((gammas) => {
               const count = gammasCount[gammas];
               if (count > modeCount) {
                 mode = gammas;
                 modeCount = count;
               }
             });
             
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
