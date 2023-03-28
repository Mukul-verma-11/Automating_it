import { NextPage } from "next";
 import * as tf from "@tensorflow/tfjs";
 import sem_1 from "../sem_1.json";
 import sem_2 from "../sem_2.json";
 import sem_3 from "../sem_3.json";
 import sem_4 from "../sem_4.json";
 import { useEffect, useState } from "react";
 import styles from '../../styles/admin.module.css'
 
 const SEMESTER = {
  SEM_1 : sem_1,
  SEM_2 : sem_2,
  SEM_3 : sem_3,
  SEM_4 : sem_4
 }

 const MLearning = ({setDataset,setPDataset}) => {

  const [semester,setSemester] = useState(SEMESTER.SEM_1)

   const [subject, setSubject] = useState(null);
   const createModal = () => {
     const modal = tf.sequential();
 
     // add input layer
     modal.add(tf.layers.dense({ inputShape: [1], units: 1, useBias: true }));
 
     // add output layer
     modal.add(tf.layers.dense({ units: 1, useBias: true }));
 
     return modal;
   };
 
   const convertToTensor = (data) => {
     return tf.tidy(() => {
       // shuffle the data
       tf.util.shuffle(data);
 
       // convert into tensors
       const inputs = data.map((data) => Number(data.x));
       const labels = data.map((data) => Number(data.y));
 
       const inputTensors = tf.tensor2d(inputs, [inputs.length, 1]);
       const labelTensors = tf.tensor2d(labels, [labels.length, 1]);
 
       // normalize data from 0-1 range
       const inputMax = inputTensors.max();
       const inputMin = inputTensors.min();
       const labelMax = labelTensors.max();
       const labelMin = labelTensors.min();
 
       // normalized inputs
       const normalizedInputs = inputTensors
         .sub(inputMin)
         .div(inputMax.sub(inputMin));
       const normalizedLabels = labelTensors
         .sub(labelMin)
         .div(labelMax.sub(labelMin));
       return {
         inputs: normalizedInputs,
         labels: normalizedLabels,
         inputMax,
         inputMin,
         labelMax,
         labelMin,
       };
     });
   };
 
   const subjects = Object.keys(semester);
 
   const trainModel = async (
     model,
     inputs,
     labels
   ) => {
     // prepare modal for training
     model.compile({
       optimizer: tf.train.adam(),
       loss: tf.losses.meanSquaredError,
       metrics: ["mse"],
     });
 
     const batchSize = 32;
     const epochs = 50;
 
     return await model.fit(inputs, labels, {
       batchSize,
       epochs,
       shuffle: true,
     });
   };
 
   const trainAndPredict = async (data) => {
     const modal = createModal();
     const { inputMax, inputMin, labelMax, labelMin, inputs, labels } =
       convertToTensor(data);
     await trainModel(modal, inputs, labels);
     const xs = tf.linspace(0, 1, 100);
     const unNormXs = xs.mul(inputMax.sub(inputMin)).add(inputMin);
     const preds = modal.predict(unNormXs.reshape([100, 1]));
     const inps = await unNormXs.array();
     const predictions = await preds.array();
     return {
      dataSet: data,
      predictions: predictions?.map((pred, index) => ({
        x: inps[index],
        y: pred[0],
      })),
    };
   };
 
   const runModal = async (subject) => {
     console.log("Training And Predicting Modal");
     const data = await trainAndPredict(subject);
     setDataset(data.dataSet) 
     setPDataset(data.predictions) 
     console.log(data);
   };
 
   useEffect(() => {
     if (subject) {
       runModal(subject);
     }
   }, [subject]);

   

   return (
     <div className="flex flex-row w-full justify-center">

      <h2> ML MODEL FOR MARKS BASED ON ATTENDANCE </h2>
      
      <div className={styles.filterBtns} >

      <select className={styles.sem} onChange={e => setSemester(SEMESTER[e.target.value])} >
        {
          Object.keys(SEMESTER).map(key => (
            <option  key={key} value={key} >
              {key}
            </option>
          ) )
        }
      </select>

       <select className={styles.sem} onChange={(e) => setSubject(semester[e.target.value])}>
         {subjects.map((sub) => (
           <option value={sub} key={sub}>
             {sub}
           </option>
         ))}
       </select>
    </  div>

     </div>
   );
 };
 
 export default MLearning;