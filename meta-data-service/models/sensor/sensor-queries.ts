export const qGetAllSsensors: string = `SELECT st.sensor_id, st.status_id as sensor_stats, l.id as localtion
FROM public.sensors se 
	join public.sensors_status st on
		se.id=st.sensor_id
	join public.sensor_location l on
		l.sensors_id=st.sensor_id`;

