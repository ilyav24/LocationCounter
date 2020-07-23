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
WHERE u.sensosr_id IN (SELECT s.sensors_id
						FROM public.location l JOIN public.sensor_location s
							ON l.id=s.location_id
						WHERE l.building_id = $1
							)
GROUP BY u.is_entered;`;

export const qGetCountBetweenDaysByBuildingId: string = `SELECT is_entered, count (*) AS Total
FROM public.usages u
WHERE u.sensosr_id IN (SELECT s.sensors_id
						FROM public.location l JOIN public.sensor_location s
							ON l.id=s.location_id
						WHERE l.building_id = $3
							) AND u.last_sync >= $1 AND u.last_sync < $2
GROUP BY u.is_entered;`;

export const qGetCountBetweenDaysFromByBuildingId: string = `SELECT is_entered, count (*) AS Total
FROM public.usages u
WHERE u.sensosr_id IN (SELECT s.sensors_id
						FROM public.location l JOIN public.sensor_location s
							ON l.id=s.location_id
						WHERE l.building_id = $2
							) AND u.last_sync >= $1
GROUP BY u.is_entered;`;
export const qGetCountBetweenDaysToByBuildingId: string = `SELECT is_entered, count (*) AS Total
FROM public.usages u
WHERE u.sensosr_id IN (SELECT s.sensors_id
						FROM public.location l JOIN public.sensor_location s
							ON l.id=s.location_id
						WHERE l.building_id = $2
							) AND u.last_sync < $1
GROUP BY u.is_entered;`;
