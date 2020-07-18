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
WHERE last_sync>= $1 AND  last_sync<$2 AND sensosr_id = $3;`;

export const qGetAllSensorsEventById: string = `SELECT * 
FROM public.usages
WHERE last_sync>= $1 AND last_sync < $2 AND sensosr_id = $3;`;

export const qUpdateLocationByID: string = `UPDATE public.sensor_location
SET location_id=$1
WHERE sensors_id = 1;`;


