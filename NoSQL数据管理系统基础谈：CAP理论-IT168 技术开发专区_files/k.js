var KBO=new Object;KBO.server="s.ztcadx.com",KBO.url="http://"+KBO.server+"/img/image.htm",KBO._kb_req=function(a){var b=new Image(1,1);b.src=KBO.url+a+"&tm="+(new Date).getTime()},KBO._kb_query=function(a){var b="";try{b+="?shop_id="+escape(a[0]),b+="&mvtype="+escape(a[1]),b+="&mvsubtype="+escape(a[2]),b+="&mvsid="+escape(a[3]),b+="&mvcid="+escape(a[4]),b+="&mvref="+escape(document.referrer),7==a.length&&(b+="&mvoid="+escape(a[5]),b+="&mvurl="+escape(a[6]))}catch(c){b+="&error="+c.message}return b},KBO.sw=function(a){var b=KBO._kb_query(a);b+="&type=show",KBO._kb_req(b)},KBO.ck=function(a){var b=KBO._kb_query(a);b+="&type=click",KBO._kb_req(b)},KBO.col=function(a){var b=KBO._kb_query(a);b+="&type=collect",KBO._kb_req(b)},KBO.share=function(a){var b=KBO._kb_query(a);b+="&type=share",KBO._kb_req(b)};
