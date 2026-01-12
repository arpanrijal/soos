const now = new Date(Date.now());
const year = now.getFullYear();      
const month = now.getMonth() + 1;    //getMONTH RETURN Jan as 0 so hamro system my jan lai 1 dekhi rakhna we add +1
const day = now.getDate();  
const hour = now.getHours();
const minute = now.getMinutes();
const sec = now.getSeconds();

export {year,month,day,hour,minute,sec};