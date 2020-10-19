export const qGetCountBetweenDaysBaseBySensorId: string = `SELECT is_entered, count (*) as Total
FROM public.usages 
WHERE sensosr_id = $1
GROUP BY is_entered;`;

export const qGetCountBetweenDaysBySensorId: string = `SELECT is_entered, count (*) as Total
FROM public.usages 
WHERE  last_sync > $1 AND  last_sync < $2 AND sensor_id = $3
GROUP BY is_entered;`;

export const qGetCountBetweenDaysFromBySensorId: string = `SELECT is_entered, count (*) as Total
FROM public.usages 
WHERE  last_sync >= $1  AND sensor_id = $2
GROUP BY is_entered;`;
export const qGetCountBetweenDaysToBySensorId: string = `SELECT is_entered, count (*) as Total
FROM public.usages 
WHERE last_sync < $1  AND sensor_id = $2
GROUP BY is_entered;`;

export const qGetCountBetweenDaysBaseByLocationId: string = `SELECT is_entered, count (*) AS Total
FROM public.sensor_location l JOIN public.usages AS u
	ON l.sensors_id= u.sensor_id
WHERE l.location_id = $1
GROUP BY u.is_entered;`;

export const qGetCountBetweenDaysByLocationId: string = `SELECT is_entered, count (*) AS Total
FROM public.sensor_location l JOIN public.usages AS u
	ON l.sensors_id=u.sensor_id
WHERE u.last_sync >= $1 AND  u.last_sync < $2 AND l.location_id = $3
GROUP BY u.is_entered;`;

export const qGetCountBetweenDaysFromByLocationId: string = `SELECT is_entered, count (*) AS Total
FROM public.sensor_location l JOIN public.usages AS u
	ON l.sensors_id= u.sensor_id
WHERE u.last_sync >= $1 AND l.location_id = $2
GROUP BY u.is_entered;`;

export const qGetCountBetweenDaysToByLocationId: string = `SELECT is_entered, count (*) AS Total
FROM public.sensor_location l JOIN public.usages AS u
	ON l.sensors_id= u.sensor_id
WHERE u.last_sync < $1 AND l.location_id = $2
GROUP BY u.is_entered;`;

export const qGetCountBetweenDaysBaseByBuildingId: string = `SELECT is_entered, count (*) AS Total
FROM public.usages u
WHERE u.sensor_id IN (SELECT s.sensors_id
						FROM public.location l JOIN public.sensor_location s
							ON l.id=s.location_id
						WHERE l.building_id = $1
							)
GROUP BY u.is_entered;`;

export const qGetCountBetweenDaysByBuildingId: string = `SELECT is_entered, count (*) AS Total
FROM public.usages u
WHERE u.sensor_id IN (SELECT s.sensors_id
						FROM public.location l JOIN public.sensor_location s
							ON l.id=s.location_id
						WHERE l.building_id = $3
							) AND u.last_sync >= $1 AND u.last_sync < $2
GROUP BY u.is_entered;`;

export const qGetCountBetweenDaysFromByBuildingId: string = `SELECT is_entered, count (*) AS Total
FROM public.usages u
WHERE u.sensor_id IN (SELECT s.sensors_id
						FROM public.location l JOIN public.sensor_location s
							ON l.id=s.location_id
						WHERE l.building_id = $2
							) AND u.last_sync >= $1
GROUP BY u.is_entered;`;
export const qGetCountBetweenDaysToByBuildingId: string = `SELECT is_entered, count (*) AS Total
FROM public.usages u
WHERE u.sensor_id IN (SELECT s.sensors_id
						FROM public.location l JOIN public.sensor_location s
							ON l.id=s.location_id
						WHERE l.building_id = $2
							) AND u.last_sync < $1
GROUP BY u.is_entered;`;



export const qGetCountAggregatedMinute: string =

	`INSERT INTO public.summedByMinute(sensor_id, date, minute)
	SELECT sensor_id, 
	to_char(last_sync, 'YYYY-MM-DD HH24:MI') as timestamp_minute, 
	sum(CASE WHEN is_entered = B'1' THEN 1 WHEN is_entered = B'0' THEN -1 END)
	FROM usages
	WHERE (last_sync BETWEEN (CASE WHEN (SELECT MAX(date) FROM summedByMinute) IS NOT NULL THEN (SELECT TO_TIMESTAMP(MAX(date),'YYYY/MM/DD HH24:MI:SS') + (interval '1 minute') FROM public.summedByMinute) WHEN (SELECT MAX(date) FROM summedByMinute) IS NULL THEN (SELECT MIN(last_sync) FROM usages) END)  
			AND DATE_TRUNC('minute',NOW()) - (interval '1 millisecond'))
	group by timestamp_minute, sensor_id
	order by sensor_id, timestamp_minute
	RETURNING *;`;


export const qGetCountAggregatedHour: string = `
INSERT INTO summedByHour(sensor_id,date,hour)
SELECT x.sensor_id,NOW() as timestamp_hour,minute 
FROM summedByMinute x
JOIN (SELECT sensor_id, max(date) maxDate
        FROM summedByMinute
      GROUP BY sensor_id) b
ON x.sensor_id = b.sensor_id AND x.date = b.maxDate
RETURNING *;`;

export const qGetCountAggregatedDay: string = `
INSERT INTO summedByDay(sensor_id,date,day)
SELECT x.sensor_id,NOW() as timestamp_hour,minute 
FROM summedByMinute x
JOIN (SELECT sensor_id, max(date) maxDate
        FROM summedByMinute
      GROUP BY sensor_id) b
ON x.sensor_id = b.sensor_id AND x.date = b.maxDate
RETURNING *;`;



export const qReturnNumOfRowsBetweenDatesMinute: string = `
SELECT COUNT (*)
FROM summedByMinute 
WHERE TO_TIMESTAMP(date,'YYYY/MM/DD HH24:MI')
BETWEEN  TO_TIMESTAMP($1,'YYYY/MM/DD HH24:MI:SS') 
AND TO_TIMESTAMP($2,'YYYY/MM/DD HH24:MI:SS')- interval '1 millisecond';`;

export const qReturnNumOfRowsBetweenDatesHour: string = `
SELECT COUNT (*)
FROM summedByHour 
WHERE TO_TIMESTAMP(date,'YYYY/MM/DD HH24:MI')
BETWEEN  TO_TIMESTAMP($1,'YYYY/MM/DD HH24:MI:SS') - interval '1 minute' 
AND TO_TIMESTAMP($2,'YYYY/MM/DD HH24:MI:SS') - interval '1 millisecond'`;

export const qReturnNumOfRowsBetweenDatesDay: string = `
SELECT COUNT (*)
FROM summedByDay 
WHERE TO_TIMESTAMP(date,'YYYY/MM/DD HH24:MI')
BETWEEN  TO_TIMESTAMP($1,'YYYY/MM/DD HH24:MI:SS') - interval '1 minute' 
AND TO_TIMESTAMP($2,'YYYY/MM/DD HH24:MI:SS') - interval '1 millisecond'`;

export const qReturnCountBetweenDatesMinute: string = `
SELECT date, minute as num
FROM summedByMinute 
WHERE TO_TIMESTAMP(date,'YYYY/MM/DD HH24:MI')
BETWEEN  TO_TIMESTAMP($1,'YYYY/MM/DD HH24:MI:SS')  
AND TO_TIMESTAMP($2,'YYYY/MM/DD HH24:MI:SS')- interval '1 millisecond'
order by date;`;

export const qReturnCountBetweenDatesHour: string = `
SELECT date, hour as num
FROM summedByHour 
WHERE TO_TIMESTAMP(date,'YYYY/MM/DD HH24:MI')
BETWEEN  TO_TIMESTAMP($1,'YYYY/MM/DD HH24:MI:SS') - interval '1 minute' 
AND TO_TIMESTAMP($2,'YYYY/MM/DD HH24:MI:SS')- interval '1 millisecond'
order by date;`;

export const qReturnCountBetweenDatesDay: string = `
SELECT date, day as num
FROM summedByDay 
WHERE TO_TIMESTAMP(date,'YYYY/MM/DD HH24:MI')
BETWEEN  TO_TIMESTAMP($1,'YYYY/MM/DD HH24:MI:SS') - interval '1 minute' 
AND TO_TIMESTAMP($2,'YYYY/MM/DD HH24:MI:SS')- interval '1 millisecond'
order by date;`;

export const qReturnCountBetweenDatesByLocationIdMinute: string = `
SELECT u.sensor_id,date, minute as num
FROM public.sensor_location l JOIN public.summedByMinute AS u
ON l.sensors_id=u.sensor_id 
WHERE l.location_id=$3 AND TO_TIMESTAMP(date,'YYYY/MM/DD HH24:MI') 
BETWEEN  TO_TIMESTAMP($1,'YYYY/MM/DD HH24:MI:SS') 
AND TO_TIMESTAMP($2,'YYYY/MM/DD HH24:MI:SS')- interval '1 millisecond'
order by sensor_id,date;`;

export const qReturnCountBetweenDatesByLocationIdHour: string = `
SELECT u.sensor_id,date, hour as num
FROM public.sensor_location l JOIN public.summedByHour AS u
ON l.sensors_id=u.sensor_id 
WHERE l.location_id=$3 AND TO_TIMESTAMP(date,'YYYY/MM/DD HH24:MI') 
BETWEEN  TO_TIMESTAMP($1,'YYYY/MM/DD HH24:MI:SS') - interval '1 minute' 
AND TO_TIMESTAMP($2,'YYYY/MM/DD HH24:MI:SS')- interval '1 millisecond'
order by sensor_id,date;`;

export const qReturnCountBetweenDatesByLocationIdDay: string = `
SELECT u.sensor_id,date, day as num
FROM public.sensor_location l JOIN public.summedByDay AS u
ON l.sensors_id=u.sensor_id 
WHERE l.location_id=$3 AND TO_TIMESTAMP(date,'YYYY/MM/DD HH24:MI') 
BETWEEN  TO_TIMESTAMP($1,'YYYY/MM/DD HH24:MI:SS') - interval '1 minute' 
AND TO_TIMESTAMP($2,'YYYY/MM/DD HH24:MI:SS')- interval '1 millisecond'
order by sensor_id,date;`;

export const qReturnCountBetweenDatesByBuildingIdMinute: string = `
SELECT u.sensor_id,date, minute as num
FROM summedByMinute u
WHERE u.sensor_id IN (SELECT s.sensors_id
	FROM public.location l JOIN public.sensor_location s
		ON l.id=s.location_id
	WHERE l.building_id = $3
		)
AND TO_TIMESTAMP(date,'YYYY/MM/DD HH24:MI') 
BETWEEN  TO_TIMESTAMP($1,'YYYY/MM/DD HH24:MI:SS') 
AND TO_TIMESTAMP($2,'YYYY/MM/DD HH24:MI:SS')- interval '1 millisecond'
order by sensor_id,date;`;

export const qReturnCountBetweenDatesByBuildingIdHour: string = `
SELECT u.sensor_id,date, hour as num
FROM summedByHour u
WHERE u.sensor_id IN (SELECT s.sensors_id
	FROM public.location l JOIN public.sensor_location s
		ON l.id=s.location_id
	WHERE l.building_id = $3
		)
AND TO_TIMESTAMP(date,'YYYY/MM/DD HH24:MI') 
BETWEEN  TO_TIMESTAMP($1,'YYYY/MM/DD HH24:MI:SS') - interval '1 minute' 
AND TO_TIMESTAMP($2,'YYYY/MM/DD HH24:MI:SS')- interval '1 millisecond'
order by sensor_id,date;`;

export const qReturnCountBetweenDatesByBuildingIdDay: string = `
SELECT u.sensor_id,date, day as num
FROM summedByDay u
WHERE u.sensor_id IN (SELECT s.sensors_id
	FROM public.location l JOIN public.sensor_location s
		ON l.id=s.location_id
	WHERE l.building_id = $3
		)
AND TO_TIMESTAMP(date,'YYYY/MM/DD HH24:MI') 
BETWEEN  TO_TIMESTAMP($1,'YYYY/MM/DD HH24:MI:SS') - interval '1 minute' 
AND TO_TIMESTAMP($2,'YYYY/MM/DD HH24:MI:SS')- interval '1 millisecond'
order by sensor_id,date;`;

export const qReturnNumOfRowsBetweenDatesByLocationIdMinute: string = `
SELECT COUNT(*)
FROM public.sensor_location l JOIN public.summedByMinute AS u
ON l.sensors_id=u.sensor_id 
WHERE l.location_id=$3 AND TO_TIMESTAMP(date,'YYYY/MM/DD HH24:MI') 
BETWEEN  TO_TIMESTAMP($1,'YYYY/MM/DD HH24:MI:SS') 
AND TO_TIMESTAMP($2,'YYYY/MM/DD HH24:MI:SS')- interval '1 millisecond';`;

export const qReturnNumOfRowsBetweenDatesByLocationIdHour: string = `
SELECT COUNT(*)
FROM public.sensor_location l JOIN public.summedByHour AS u
ON l.sensors_id=u.sensor_id 
WHERE l.location_id=$3 AND TO_TIMESTAMP(date,'YYYY/MM/DD HH24:MI') 
BETWEEN  TO_TIMESTAMP($1,'YYYY/MM/DD HH24:MI:SS') - interval '1 minute' 
AND TO_TIMESTAMP($2,'YYYY/MM/DD HH24:MI:SS')- interval '1 millisecond';`;

export const qReturnNumOfRowsBetweenDatesByLocationIdDay: string = `
SELECT COUNT(*)
FROM public.sensor_location l JOIN public.summedByDay AS u
ON l.sensors_id=u.sensor_id 
WHERE l.location_id=$3 AND TO_TIMESTAMP(date,'YYYY/MM/DD HH24:MI') 
BETWEEN  TO_TIMESTAMP($1,'YYYY/MM/DD HH24:MI:SS') - interval '1 minute' 
AND TO_TIMESTAMP($2,'YYYY/MM/DD HH24:MI:SS')- interval '1 millisecond';`;

export const qReturnNumOfRowsBetweenDatesByBuildingIdMinute: string = `
SELECT COUNT(*)
FROM summedByMinute u
WHERE u.sensor_id IN (SELECT s.sensors_id
	FROM public.location l JOIN public.sensor_location s
		ON l.id=s.location_id
	WHERE l.building_id = $3
		)
AND TO_TIMESTAMP(date,'YYYY/MM/DD HH24:MI') 
BETWEEN  TO_TIMESTAMP($1,'YYYY/MM/DD HH24:MI:SS')  
AND TO_TIMESTAMP($2,'YYYY/MM/DD HH24:MI:SS')- interval '1 millisecond';`;

export const qReturnNumOfRowsBetweenDatesByBuildingIdHour: string = `
SELECT COUNT(*)
FROM summedByHour u
WHERE u.sensor_id IN (SELECT s.sensors_id
	FROM public.location l JOIN public.sensor_location s
		ON l.id=s.location_id
	WHERE l.building_id = $3
		)
AND TO_TIMESTAMP(date,'YYYY/MM/DD HH24:MI') 
BETWEEN  TO_TIMESTAMP($1,'YYYY/MM/DD HH24:MI:SS') - interval '1 minute' 
AND TO_TIMESTAMP($2,'YYYY/MM/DD HH24:MI:SS')- interval '1 millisecond';`;

export const qRReturnNumOfRowsBetweenDatesByBuildingIdDay: string = `
SELECT COUNT(*)
FROM summedByDay u
WHERE u.sensor_id IN (SELECT s.sensors_id
	FROM public.location l JOIN public.sensor_location s
		ON l.id=s.location_id
	WHERE l.building_id = $3
		)
AND TO_TIMESTAMP(date,'YYYY/MM/DD HH24:MI') 
BETWEEN  TO_TIMESTAMP($1,'YYYY/MM/DD HH24:MI:SS') - interval '1 minute' 
AND TO_TIMESTAMP($2,'YYYY/MM/DD HH24:MI:SS')- interval '1 millisecond';`;

export const qUpdateStatusQuery = `UPDATE public.sensors_status old_status
SET status_id = new_status.status
FROM (
SELECT  sensor_id,max(last_sync), 
CASE 
WHEN (max(last_sync) is null) THEN 3	
WHEN (max(last_sync) < NOW() - INTERVAL '5 minutes') THEN 2
WHEN (max(last_sync) > NOW() - INTERVAL '5 minutes') THEN 1
END status 
FROM public.usages group by sensor_id) new_status
WHERE old_status.sensor_id = new_status.sensor_id;`