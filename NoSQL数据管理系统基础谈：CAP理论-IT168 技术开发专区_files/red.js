if(typeof(track_pool)=="undefined")window.track_pool=[];

//aod map code
(track_pool[track_pool.length]=new Image()).src ='http://map1.ra.icast.cn/start/?src=AOD&seq=' + (new Date()).valueOf() +  parseInt(Math.random()*10000);


//(track_pool[track_pool.length]=new Image()).src='http://map.dxpmedia.com/receive/hdtx?xid='+m_hdt_ic5;

//stay time

try { if (m_hdt_pos_id>'') {
setTimeout("(new Image()).src='http://track.ra.icast.cn/g/?p="+m_hdt_pos_id+"&t=5';",5000);
setTimeout("(new Image()).src='http://track.ra.icast.cn/g/?p="+m_hdt_pos_id+"&t=15';",15000);
setTimeout("(new Image()).src='http://track.ra.icast.cn/g/?p="+m_hdt_pos_id+"&t=30';",30000);
} }catch (e){}
