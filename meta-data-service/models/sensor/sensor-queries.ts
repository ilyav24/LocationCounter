export const qGetAllSsensors: string = `SELECT st.sensor_id, st.status_id as sensor_status, l.location_id as location_id
FROM public.sensors se 
	LEFT join public.sensors_status st on
		se.id=st.sensor_id
	LEFT JOIN  public.sensor_location l on
		l.sensors_id=st.sensor_id;`;

export const qGetSensorById: string = `SELECT st.sensor_id, st.status_id as sensor_status, l.id as location_id
FROM public.sensors se 
	join public.sensors_status st on
		se.id=st.sensor_id
	join public.sensor_location l on
		l.sensors_id=st.sensor_id
WHERE se.id = $1;`;

export const qGetAllSensorsEvent: string = `SELECT * 
FROM public.usages
WHERE last_sync>= $1 AND  last_sync<$2 AND sensor_id = $3;`;

export const qGetAllSensorsEventById: string = `SELECT * 
FROM public.usages
WHERE last_sync>= $1 AND last_sync < $2 AND sensor_id = $3;`;

export const qUpdateLocationByID: string = `UPDATE public.sensor_location
SET location_id=$1
WHERE sensors_id = $2;`;

export const qInsertEvent: string = `INSERT INTO public.usages
(last_sync, is_entered)
VALUES ($1, $2)
RETURNING id`;





