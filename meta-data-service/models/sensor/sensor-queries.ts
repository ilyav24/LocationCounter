export const qGetAllSsensors: string = `SELECT st.sensor_id, st.status_id as sensor_stats, l.id as localtion
FROM public.sensors se 
	join public.sensors_status st on
		se.id=st.sensor_id
	join public.sensor_location l on
		l.sensors_id=st.sensor_id;`;

export const qGetSensorById: string = `SELECT st.sensor_id, st.status_id as sensor_stats, l.id as localtion
FROM public.sensors se 
	join public.sensors_status st on
		se.id=st.sensor_id
	join public.sensor_location l on
		l.sensors_id=st.sensor_id
WHERE se.id = $1;`;

export const qGetAllSensorsEvent: string = `SELECT * 
FROM public.usages
WHERE last_sync>= $1 and last_sync<$2;`;

export const qGetAllSensorsEventById: string = `SELECT * 
FROM public.usages
WHERE last_sync>= $1 AND last_sync < $2 AND sensosr_id = $3;`;

export const qUpdateLocationByID: string = `UPDATE public.sensor_location
SET location_id=$1
WHERE sensors_id = 1;`;

export const qGetCountBetweenDaysBase: string = `SELECT is_entered, count (*) as Total
FROM public.usages 
GROUP BY is_entered;`;

export const qGetCountBetweenDays: string = `SELECT is_entered, count (*) as Total
FROM public.usages 
WHERE  last_sync > $1 AND  last_sync < $2 
GROUP BY is_entered;`;

export const qGetCountBetweenDaysFrom: string = `SELECT is_entered, count (*) as Total
FROM public.usages 
WHERE  last_sync > $1 
GROUP BY is_entered;`;
export const qGetCountBetweenDaysTo: string = `SELECT is_entered, count (*) as Total
FROM public.usages 
WHERE last_sync < $1 
GROUP BY is_entered;`;

