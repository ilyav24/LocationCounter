export const qGetCountBetweenDaysBase: string = `SELECT is_entered, count (*) as Total
FROM public.usages 
WHERE sensosr_id = $1
GROUP BY is_entered;`;

export const qGetCountBetweenDays: string = `SELECT is_entered, count (*) as Total
FROM public.usages 
WHERE  last_sync > $1 AND  last_sync < $2 AND sensosr_id = $3
GROUP BY is_entered;`;

export const qGetCountBetweenDaysFrom: string = `SELECT is_entered, count (*) as Total
FROM public.usages 
WHERE  last_sync > $1  AND sensosr_id = $2
GROUP BY is_entered;`;
export const qGetCountBetweenDaysTo: string = `SELECT is_entered, count (*) as Total
FROM public.usages 
WHERE last_sync < $1  AND sensosr_id = $2
GROUP BY is_entered;`;
