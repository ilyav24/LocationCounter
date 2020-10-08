import { Pool } from 'pg';
import {
  qGetCountBetweenDaysBaseBySensorId,
  qGetCountBetweenDaysBySensorId,
  qGetCountBetweenDaysFromBySensorId,
  qGetCountBetweenDaysToBySensorId,
  qGetCountBetweenDaysByLocationId,
  qGetCountBetweenDaysBaseByLocationId,
  qGetCountBetweenDaysFromByLocationId,
  qGetCountBetweenDaysToByLocationId,
  qGetCountBetweenDaysByBuildingId,
  qGetCountBetweenDaysBaseByBuildingId,
  qGetCountBetweenDaysFromByBuildingId,
  qGetCountBetweenDaysToByBuildingId,
  qGetCountAggregatedMinute,
  qGetCountAggregatedHour,
  qGetCountAggregatedDay,
  qReturnCountBetweenDatesMinute,
  qReturnCountBetweenDatesHour,
  qReturnCountBetweenDatesDay,
  qReturnNumOfRowsBetweenDatesMinute,
  qReturnNumOfRowsBetweenDatesHour,
  qReturnNumOfRowsBetweenDatesDay,
  qReturnNumOfRowsBetweenDatesByLocationIdMinute,
  qReturnNumOfRowsBetweenDatesByLocationIdHour,
  qReturnNumOfRowsBetweenDatesByLocationIdDay,
  qReturnNumOfRowsBetweenDatesByBuildingIdMinute,
  qReturnNumOfRowsBetweenDatesByBuildingIdHour,
  qRReturnNumOfRowsBetweenDatesByBuildingIdDay,
  qReturnCountBetweenDatesByLocationIdMinute,
  qReturnCountBetweenDatesByLocationIdHour,
  qReturnCountBetweenDatesByLocationIdDay,
  qReturnCountBetweenDatesByBuildingIdMinute,
  qReturnCountBetweenDatesByBuildingIdHour,
  qReturnCountBetweenDatesByBuildingIdDay, qUpdateStatusQuery
  

} from './strat-queries';

import * as dotenv from 'dotenv';
import { MyDate } from '../sensor/my-date';
import { wrap } from 'module';

dotenv.config();

const user: String | undefined = process.env.DB_USER;
const password: String | undefined = process.env.DB_PASS;

const connectionString =
  'postgres://' + user + ':' + password + '@localhost:5432';
const databaseName = 'location_counter';

const pool = new Pool({
  connectionString: connectionString + '/' + databaseName,
});

export async function getCountBetweenDaysBySensorIdDb(
  sensor: MyDate,
  sensorId: number
) {
  try {
    if (sensor.from !== undefined && sensor.to !== undefined) {
      return (
        await pool.query(qGetCountBetweenDaysBySensorId, [
          sensor.from,
          sensor.to,
          sensorId,
        ])
      ).rows;
    }
    if (sensor.from === undefined && sensor.to === undefined) {
      return (await pool.query(qGetCountBetweenDaysBaseBySensorId, [sensorId]))
        .rows;
    }
    if (sensor.from !== undefined) {
      return (
        await pool.query(qGetCountBetweenDaysFromBySensorId, [
          sensor.from,
          sensorId,
        ])
      ).rows;
    }
    if (sensor.to !== undefined) {
      return (
        await pool.query(qGetCountBetweenDaysToBySensorId, [
          sensor.to,
          sensorId,
        ])
      ).rows;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getCountBetweenDaysByLocationIdDb(
  sensor: MyDate,
  locationId: number
) {
  try {
    if (sensor.from !== undefined && sensor.to !== undefined) {
      return (
        await pool.query(qGetCountBetweenDaysByLocationId, [
          sensor.from,
          sensor.to,
          locationId,
        ])
      ).rows;
    }
    if (sensor.from === undefined && sensor.to === undefined) {
      return (
        await pool.query(qGetCountBetweenDaysBaseByLocationId, [locationId])
      ).rows;
    }
    if (sensor.from !== undefined) {
      return (
        await pool.query(qGetCountBetweenDaysFromByLocationId, [
          sensor.from,
          locationId,
        ])
      ).rows;
    }
    if (sensor.to !== undefined) {
      return (
        await pool.query(qGetCountBetweenDaysToByLocationId, [
          sensor.to,
          locationId,
        ])
      ).rows;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getCountBetweenDaysByBuildingIdDb(
  sensor: MyDate,
  locationId: number
) {
  try {
    if (sensor.from !== undefined && sensor.to !== undefined) {
      return (
        await pool.query(qGetCountBetweenDaysByBuildingId, [
          sensor.from,
          sensor.to,
          locationId,
        ])
      ).rows;
    }
    if (sensor.from === undefined && sensor.to === undefined) {
      return (
        await pool.query(qGetCountBetweenDaysBaseByBuildingId, [locationId])
      ).rows;
    }
    if (sensor.from !== undefined) {
      return (
        await pool.query(qGetCountBetweenDaysFromByBuildingId, [
          sensor.from,
          locationId,
        ])
      ).rows;
    }
    if (sensor.to !== undefined) {
      return (
        await pool.query(qGetCountBetweenDaysToByBuildingId, [
          sensor.to,
          locationId,
        ])
      ).rows;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function GetCountAggregatedMinuteDb(
  
) {
  try {
     {
      return (
        await pool.query(qGetCountAggregatedMinute, [
          
         
        ])
      ).rows;
    }
    
  }catch (err) {
    console.log(err);
    throw err;
  }
}

export async function GetCountAggregatedHourDb(
  
  ) {
    try {
       {
        return (
          await pool.query(qGetCountAggregatedHour, [
            
           
          ])
        ).rows;
      }
      
    }catch (err) {
      console.log(err);
      throw err;
    }
  }

  export async function GetCountAggregatedDayDb(
  
    ) {
      try {
         {
          return (
            await pool.query(qGetCountAggregatedDay, [
              
             
            ])
          ).rows;
        }
        
      }catch (err) {
        console.log(err);
        throw err;
      }
    }


    ///////Regular

    export async function ReturnCountBetweenDatesMinuteDb(from: Date,to:Date) {
      try {
        
        return (await pool.query(qReturnCountBetweenDatesMinute, [from,to])).rows;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }  

    export async function ReturnCountBetweenDatesHourDb(from: Date,to:Date) {
      try {
        
        return (await pool.query(qReturnCountBetweenDatesHour, [from,to])).rows;
      } catch (err) {
        console.log(err);
        throw err;
      }
    } 
    
    export async function ReturnCountBetweenDatesDayDb(from: Date,to:Date) {
      try {
        
        return (await pool.query(qReturnCountBetweenDatesDay, [from,to])).rows;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }  

    ////////////Location

    export async function ReturnCountBetweenDatesByLocationIdMinuteDb(from: Date,to:Date,id:number) {
      try {
        
        return (await pool.query(qReturnCountBetweenDatesByLocationIdMinute, [from,to,id])).rows;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }  

    export async function ReturnCountBetweenDatesByLocationIdHourDb(from: Date,to:Date,id:number) {
      try {
        
        return (await pool.query(qReturnCountBetweenDatesByLocationIdHour, [from,to,id])).rows;
      } catch (err) {
        console.log(err);
        throw err;
      }
    } 
    
    export async function ReturnCountBetweenDatesByLocationIdDayDb(from: Date,to:Date,id:number) {
      try {
        
        return (await pool.query(qReturnCountBetweenDatesByLocationIdDay, [from,to,id])).rows;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }  


    //////////Building

    export async function ReturnCountBetweenDatesByBuildingIdMinuteDb(from: Date,to:Date,id:number) {
      try {
        
        return (await pool.query(qReturnCountBetweenDatesByBuildingIdMinute, [from,to,id])).rows;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }  

    export async function ReturnCountBetweenDatesByBuildingIdHourDb(from: Date,to:Date,id:number) {
      try {
        
        return (await pool.query(qReturnCountBetweenDatesByBuildingIdHour, [from,to,id])).rows;
      } catch (err) {
        console.log(err);
        throw err;
      }
    } 
    
    export async function ReturnCountBetweenDatesByBuildingIdDayDb(from: Date,to:Date,id:number) {
      try {
        
        return (await pool.query(qReturnCountBetweenDatesByBuildingIdDay, [from,to,id])).rows;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }  




    ///////Number of rows
    export async function ReturnNumOfRowsBetweenDatesDb(from: Date,to:Date,leap: string) {
      try {
        if(leap=='minute'){
          return (await pool.query(qReturnNumOfRowsBetweenDatesMinute, [from,to])).rows;
        }
        else if(leap=='hour'){
          
          return (await pool.query(qReturnNumOfRowsBetweenDatesHour, [from,to])).rows;
          
        }
        else {
          return (await pool.query(qReturnNumOfRowsBetweenDatesDay, [from,to])).rows;
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
    } 

    export async function ReturnNumOfRowsBetweenDatesByLocationIdDb(from: Date,to:Date,leap: string,id:number) {
      try {
        if(leap=='minute'){
          return (await pool.query(qReturnNumOfRowsBetweenDatesByLocationIdMinute, [from,to,id])).rows;
        }
        else if(leap=='hour'){
          
          return (await pool.query(qReturnNumOfRowsBetweenDatesByLocationIdHour, [from,to,id])).rows;
          
        }
        else {
          return (await pool.query(qReturnNumOfRowsBetweenDatesByLocationIdDay, [from,to,id])).rows;
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
    }

    export async function ReturnNumOfRowsBetweenDatesByBuildingIdDb(from: Date,to:Date,leap: string,id:number) {
      try {
        if(leap=='minute'){
          return (await pool.query(qReturnNumOfRowsBetweenDatesByBuildingIdMinute, [from,to,id])).rows;
        }
        else if(leap=='hour'){
          
          return (await pool.query(qReturnNumOfRowsBetweenDatesByBuildingIdHour, [from,to,id])).rows;
          
        }
        else {
          return (await pool.query(qRReturnNumOfRowsBetweenDatesByBuildingIdDay, [from,to,id])).rows;
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
    }

// update status
export async function updateSensorStatus(
  
  ) {
    try {
       {
        return (
          await pool.query(qUpdateStatusQuery)
        ).rows;
      }
      
    }catch (err) {
      console.log(err);
      throw err;
    }
  }
