function dsUrlcount() {
var self=this;
this.Mainajax = function (objdsurl)  {
		var Action_url ='http://ajaxlist.it168.com/It168ArticleHandler.ashx'
		var articleurl= location.href;
		var buyclickstr='';	
		if(objdsurl.length<1) return;		
		for(i=0;i<objdsurl.length;i++)
		{
			var obj = objdsurl[i];
			if(i!=0)
			{
			buyclickstr+='��';
			}
			if($(obj).attr("_orighref")!=undefined)
			{
			 buyclickstr+=$(obj).attr("_orighref").replace(/\+/g,'{a}');
			}
			else
			{
			 buyclickstr+=obj.href.replace(/\+/g,'{a}');
			}
		}
		buyclickstr= escape(buyclickstr);		
		var pars = 'type=GetDsUrlCount&siteid=2&isArticle=1&articleurl='+articleurl+'&buyclickstr='+buyclickstr;  
		$.ajax({
				type: "POST",
				cache:false,
				url: Action_url,
				dataType : "jsonp",
				jsonp: "callbackparam",
				data:pars+ "&src=ajaxreturn",
				success: function (data) {	
				var returndscounts = data.split(',');
					if(objdsurl.length==returndscounts.length)
					{
						for(i=0;i<objdsurl.length;i++)
						{
							if(returndscounts[i]!="0")
							{
							 var objin = objdsurl[i];
							 objin.insertAdjacentHTML("afterEnd",' ('+returndscounts[i]+'�˸���Ȥ)');
							 }
						}
					}
				},
				error: function (data) {
				}
			});	
    }
	this.Main = function ()  {	
		var objdsurl=document.getElementsByName("it168_dsurl_count");		
		if(objdsurl.length<1) return;		
		var basenum=20;
		var isIE6= navigator.appVersion.indexOf("MSIE 6")>-1;
		var isIE7= navigator.appVersion.indexOf("MSIE 7")>-1;
		if(isIE6||isIE7)
		{
			basenum=10;
		}
		var ajaxcount=Math.floor(objdsurl.length/basenum);//����ȡ��
		var ajaxyu=objdsurl.length%basenum;		
		var starnum;
		var endnum;		
		var ArrayDS=new Array(); 		
		for(j=0;j<=ajaxcount;j++)
		{
			if(j!=ajaxcount)
			 {
				 starnum=j*basenum;
				 endnum=(j+1)*basenum;
			 }
			 else
			 {
				 starnum=j*basenum;
				 endnum=starnum+ajaxyu;
			 }
		    ArrayDS[j]=new Array(); 
			for(i=starnum;i<endnum;i++)
			{
				ArrayDS[j].push(objdsurl[i])
			}
		}
		if(ArrayDS.length<0) return;
		for(p=0;p<ArrayDS.length;p++)
		{
		self.Mainajax(ArrayDS[p]);
		}
    }
}



function It168Article_CommonAjax() {	
	
		this.Main = function ()  {
		var AjaxsendUrl = "http://ajaxlist.it168.com/It168ArticleHandler.ashx?type=ArticleCommon&articleid=" + articleCode;
                    $.ajax({
                        type: "GET",
						cache:false,
                        url: AjaxsendUrl+ "&src=ajaxreturn",
						dataType : "jsonp",
						jsonp: "callbackparam",//��������ڽ���callback���õ�function���Ĳ��� 
                        success: function (data) {
                            if (data != null && typeof (data) != "undefined" && data != '') {                                
                                $("#commonajax").html(data);
								
									if($('#IT168zanNum').length>0&&$('#ArticleComment_count').length>0)
									{
										$("#IT168zanNum").html($("#ArticleComment_count").html());	
										
									    var val = readCookie("ArtGrade_cookie_zan");
										val = val == null ? "" : val;
										if(val != "")
										{
											var arr = val.split(',');
											for (var i = 0; i < arr.length; i++) 
											{
												if($.trim(arr[i]) == articleCode)
												{
													$("#IT168zan").html("����");	
													$("#IT168zanclass").removeClass().addClass("zan2");
												}										
											}
										}
									}

											
									if($('#It168_ArticleDsCount').length>0&&$('#Article_Ds_Count').length>0)
									{
										$("#It168_ArticleDsCount").html($("#Article_Ds_Count").html());
										$("#It168_ArticleDs").show();
									}
																								
                            }
							else{return;}
                        },
                        error: function (data) {
                        }
                    });
		};
		
		
		var setCook = function(name, value) {
			var exp = new Date();
			exp.setTime(exp.getTime() + 864000000);//ʮ��
			document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";domain=.it168.com;path=/";
		};

		//��ȡcookie
		var readCookie =function (name, defaultValue) {
			var cName = name + "="; //'cookie��'�ӡ�=���ţ������±����Ա�����Ƿ������cookie��
			var CA = new Array(); //���cookie������
			CA = document.cookie.split(';'); //����cookie
			for (var i = 0; i < CA.length; i++) {
				var c = CA[i].replace(/(^\s*)|(\s*$)/g, ""); //ȥ��cookie���ҵĿո�
				if (c.indexOf(cName) == 0) return decodeURIComponent(c.substring(cName.length, c.length)); //��nameEQ��ͷ��cookie������ȡ����
			}
			return typeof defauleValue != "undefined" ? defauleValue : null; //�Ҳ���cookieֵʱĬ�Ϸ���null
		};
		var It168addcount = function (d) 
		{
			var g = new Image(1, 1);
			g.onLoad = function() {};
			g.src = d
		};
		this.addArtGrade=function (artId, typeId) {    
			
			if(typeId==1)
			{	
				var val = readCookie("ArtGrade_cookie_zan");
				val = val == null ? "" : val;
				var arr = val.split(',');
				
				for (var i = 0; i < arr.length; i++) {
					if ($.trim(arr[i]) == artId) {
						alert("���Ѿ����۹���ƪ���£��벻Ҫ�ظ�����");
						return;
					}
				}	
				$("#IT168zan").html("����");	
				$("#IT168zanNum").html(parseInt($("#IT168zanNum").html()) + 1);
				$("#IT168zanclass").removeClass().addClass("zan2"); 	
				
				if ($.trim(val) == "") {
					val = artId;
				}
				else {
					val = val + "," + artId;
				}
				
				setCook("ArtGrade_cookie_zan", val);
			
			}
			var it168_ArticleCommentUrl ='http://ajaxlist.it168.com/It168ArticleHandler.ashx?type=ArticleComment&articleId=' + artId + '&typeId=' + typeId;
			It168addcount(it168_ArticleCommentUrl);
			
		}
}



//var dscount=new dsUrlcount();
var It168CommonAjax=new It168Article_CommonAjax();
if(tab_it168_iniMenu)
{
It168CommonAjax.Main();
//dscount.Main();
}



if((channelpropertyid==10||channelpropertyid==19||channelpropertyid==18||channelpropertyid==4||channelpropertyid==13||channelpropertyid==283||channelpropertyid==20||channelpropertyid==2||channelpropertyid==21||channelpropertyid==43||channelpropertyid==32||channelpropertyid==11||channelpropertyid==67)&&tab_it168_iniMenu)
{

	if(articletag== null || typeof(articletag) == "undefined" || articletag=="")
	{
	var articletag=channelNameSt;
	}
	if(articletag !="")
	{ 		
	var Action_url ='http://ajaxlist.it168.com/It168ArticleHandler.ashx?type=WenKuSou&limit=10&articletag='+escape(articletag);
	$.ajax({
			type: "GET",
			cache:false,
			url: Action_url+ "&src=ajaxreturn",
			dataType : "jsonp",
			jsonp: "callbackparam",
			success: function (data) {	
				 var jsonobj=eval('('+data+')');					
				 var  html=""; 
				 var wen= $("#tab04_Content0");
				 for (a in jsonobj.response){
					 var id=jsonobj.response[a].id;
					 var title=jsonobj.response[a].docName;
						title =substr(title,36);
					 
					 if(a!="9")
					 {
					   html=html+'<li ><a href="http://wenku.it168.com/d_'+id+'.shtml" target="_blank">'+title+'</a></li>';
					 }
					 else
					 {
					
					   html=html+'<li class="ba0"><a href="http://wenku.it168.com/d_'+id+'.shtml" target="_blank">'+title+'</a></li>';
					 }
				   }
				   if(wen!= null && typeof(wen) != "undefined")
				   {
						$("#tab04_Content0").html(html)
				   }
				   else {         
							 $("#wenku").hide();
							 $("#tab04_Content2").hide();
					 }
			},
			error: function (data) {
			}
		});	
	}
}


if((channelpropertyid==68)&&tab_it168_iniMenu)
{

	if(articletag== null || typeof(articletag) == "undefined" || articletag=="")
	{
	var articletag=channelNameSt;
	}
	if(articletag !="")
	{ 		
	var Action_url ='http://ajaxlist.it168.com/It168ArticleHandler.ashx?type=WenKuSou&limit=9&articletag='+escape(articletag);
	$.ajax({
			type: "GET",
			cache:false,
			url: Action_url+ "&src=ajaxreturn",
			dataType : "jsonp",
			jsonp: "callbackparam",
			success: function (data) {	
				 var jsonobj=eval('('+data+')');					
				 var  html='<li ><a href="http://wenku.it168.com/d_001286543.shtml" target="_blank">�������⻯�ɱ������½�����ֵ���վ���</a></li>'; 
				 var wen= $("#tab04_Content0");
				 for (a in jsonobj.response){
					 var id=jsonobj.response[a].id;
					 var title=jsonobj.response[a].docName;
						title =substr(title,36);
					 
					 if(a!="8")
					 {
					   html=html+'<li ><a href="http://wenku.it168.com/d_'+id+'.shtml" target="_blank">'+title+'</a></li>';
					 }
					 else
					 {
					
					   html=html+'<li class="ba0"><a href="http://wenku.it168.com/d_'+id+'.shtml" target="_blank">'+title+'</a></li>';
					 }
				   }
				   if(wen!= null && typeof(wen) != "undefined")
				   {
						$("#tab04_Content0").html(html)
				   }
				   else {         
							 $("#wenku").hide();
							 $("#tab04_Content2").hide();
					 }
			},
			error: function (data) {
			}
		});	
	}
}






function substr(str, len)  
{  
if( ! str || ! len)  
{  
return '';  
}  
// Ԥ�ڼ���������2�ֽڣ�Ӣ��1�ֽ�  
var a = 0;  
// ѭ������  
var i = 0;  
// ��ʱ�ִ�  
var temp = '';  
for (i = 0; i < str.length; i ++ )  
{  
if (str.charCodeAt(i) > 255)  
{  
// ����Ԥ�ڼ�������2  
a += 2;  
}  
else  
{  
a ++ ;  
}  
// ������Ӽ����󳤶ȴ����޶����ȣ���ֱ�ӷ�����ʱ�ַ���  
if(a > len)  
{  
return temp;  
  
}  
// ����ǰ���ݼӵ���ʱ�ַ���  
temp += str.charAt(i);  
}  
// ���ȫ���ǵ��ֽ��ַ�����ֱ�ӷ���Դ�ַ���  
return str;  
}  



function MicroComment() {
    var MC_width = 0; MC_LoginState = 0;
    //MC_siteid = 1; // it168 Ϊ2 
    MC_userid = "";
    //MC_LoginUrl = "http://sso.pcpop.com/login.aspx?backurl=" + location.href;
    //MC_action_pace = "http://www.pcpop.com/iphone5/mc_action.ashx?" + Math.random();
    MC_color = new Array("org", "red", "blue", "green", "pink");
    PageStyleOrg = new Array("xu_org", "xu_org1", "xu_a", "xu_orgw", "xu_org1w", "xu_a xu_aw"); /*��ɫ��ʽ ǰ��С ������ class*/
    PageStyleRed = new Array("xu_red", "xu_red1", "xu_a", "xu_redw", "xu_red1w", "xu_a xu_aw");
    PageStyleBlue = new Array("xu_blue", "xu_blue1", "xu_a", "xu_bluew", "xu_blue1w", "xu_a xu_aw");
    PageStyleGreen = new Array("xu_green", "xu_green1", "xu_a", "xu_greenw", "xu_green1w", "xu_a xu_aw");
    PageStylePink = new Array("xu_pink", "xu_pink1", "xu_a", "xu_pinkw", "xu_pink1w", "xu_a xu_aw");

    var Alt_win = "<div class=\"xu_win\">΢������ɹ�����л���Ĳ��룡</div>"; //���ͳɹ�	0 tj
    var Alt_worrning = "<div class=\"xu_error\">�������΢����{0}������̫�����ѱ����Σ�</div>"; //�������벻�õ��ַ� 1 hf
    var Alt_null = "<div class=\"xu_ts\">��������Ҫ�����΢����</div>"; // ����δ����	 2

    var Alt_notLogin = "<div class=\"xu_ts1\">������δ��¼�����뷢���Լ���΢������ <a target=\"_self\" href='" + MC_LoginUrl + "'>��½</a></div>"; //δ��¼��΢��	3
    var Alt_longNot = "<div class=\"xu_inp\">�ҵ�΢����<input id='txt_MC' type=\"text\" class=\"xu_inp1\" value=\"ֻ���²�10������Ŷ\" onkeyup='MC.CheckInputNum(this)' onfocus='this.value=\"\";' /> <input type=\"button\" class=\"xu_btn1\" value=\"����\" id='btnMCSubmit' onclick='MC.AddMC()' /></div>"; //�ѵ�¼��΢��	4

    var Alt_notLonginHave = "<div class=\"xu_inp\">����������΢����<input id='txt_MC' type=\"text\" class=\"xu_inp1\" value=\"ֻ���²�10������Ŷ\" onkeyup='MC.CheckInputNum(this)' onfocus='this.value=\"\";'/> <input type=\"button\" class=\"xu_btn1\" value=\"����\" id='btnMCSubmit' onclick='MC.AddMC()'/></div>"; //�ѵ�¼��΢��		5	

    var Alt_dirty = "<div class=\"xu_zy\">�ҵ�΢��:<span> <del>{0}</del> ������̫�����ѱ����Σ�</span></div>"; //�ѵ�¼�ٴν����Ѿ������΢��������(������)	6
    var Alt_again = "<div class=\"xu_zy\">�ҵ�΢��:��{0}��</div>"; //�ѵ�¼�ٴν����Ѿ������΢��������	7
    var Alt_haveMC_smail = "<div class=\"xu_ts\">���Ѿ�΢����һ���ˡ�</div>"; //�Ѿ�����һ��	8  tj
    var ArrAlt = new Array(Alt_win, Alt_worrning, Alt_null, Alt_notLogin, Alt_longNot, Alt_notLonginHave, Alt_dirty, Alt_again, Alt_haveMC_smail);
	
    MC_GetCookie = function (name) { //��ȡcookie
        var arrStr = document.cookie.split("; ");
        for (var i = 0; i < arrStr.length; i++) {
            var temp = arrStr[i].split("=");
            if (temp[0] == name)
                return unescape(temp[1]);
        }
        return "";
    };
	
    MC_DelCookie = function (name) {//ɾ��cookie
        var date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = name + "=a; expires=" + date.toGMTString();
    };
	
    MC_SetCookie = function (name, value) { //����΢cookie
        var domain = "it168.com";
        var expires = new Date();
        expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
        document.cookie = name + "=" + value + "; expires=" + expires.toGMTString() + (domain) + (domain) + ("");
    };	
	
	this.GetLength = function(str) { //�ж������ַ����ȣ�����2 ���� 1  
		var realLength = 0, len = str.length, charCode = -1;
		for (var i = 0; i < len; i++) {
			charCode = str.charCodeAt(i);
			if (charCode >= 0 && charCode <= 128) realLength += 1;
			else realLength += 2;
		}
		return realLength;
	};   
	
    this.CheckInputNum=function(obj){//�ж������ַ�
	    if(this.GetLength(obj.value)>20){	obj.value=obj.value.substring(0,obj.value.length-1);}
    };	
	
    this.IsLogin=function(){//�ж�ͨ�� cookie�ж��Ƿ��¼΢��sso_username
	     //MC_userid= MC_GetCookie("sso_userid");
		 if(typeof(sso_username)=="undefined"){    
            MC_userid= MC_GetCookie("sso_userid");
        }
        else{
            MC_userid = sso_username;
			MC_userid = escape(MC_userid)
			MC_userid = MC_userid.replace(/%/g, '}')
        }
	     if (MC_userid != "") { MC_LoginState = 1; }		
    };
	
    this.CheckSite=function(){//�ж�������ҳ�滹��ͼ�ͣ����ز�ͬ��ȵ�ҳ����ʽ
		    //var arr=location.href.split('/');
		    if(MC_Css==1){//http://www.pcpop.com/doc/0/697/697574.shtml
		        MC_width = 0;
			    //MC_aid=parseInt(arr[arr.length-1].replace(".html",""));//��ʽ�������滻shtml			
		    }
		    if(MC_Css==2){ //http://tu.pcpop.com/pic-636044.htm
		        MC_width = 1;
				//var aid=arr[arr.length-1].replace(".htm","").replace("pic-","").replace(" ","");
			    //MC_aid=parseInt(aid);
		    }		
    };
	
	
	
    this.Vote = function (Mid) {//�ύͶƱ
	        var arr, voteVal = "", mcVal = "";
	        var cookieVal = MC_GetCookie("IT168_MC"); 
		if(MC_userid=="" && cookieVal!="" && cookieVal.indexOf(MC_aid)<=0){ 
				document.getElementById("MC_alt_div").innerHTML = ArrAlt[8];
				return;
		}
	        if (cookieVal == "" || cookieVal.indexOf(MC_aid) <=0 ) {	       
					var pars = "method=SubVote&siteid=" + MC_siteid+"&mid=" + Mid + "&userid="+MC_userid+ "&r=" + Math.random();
					var CreatInfo = null;
					var sendUrl=MC_action_pace+pars;
					CreatInfo = new XMLHttpObject("get", sendUrl, true);
					//CreatInfo.params = pars;
					CreatInfo.sendData();
					CreatInfo.CallBackFailed = function () { /*alert("ͶƱ�����쳣");*/};
					CreatInfo.CallBackOK = function () {
						if(CreatInfo.text=="1"){	
								MC_SetCookie("IT168_MC", cookieVal + "," + MC_aid); 
								MC.Main(10,1);//���¼���		
						}
						else if(CreatInfo.text=="2"){//�ظ��ύ
							document.getElementById("MC_alt_div").innerHTML = ArrAlt[8];
						}
					}				
	       } else { 
				document.getElementById("MC_alt_div").innerHTML = ArrAlt[8];
		   }
    };
	
	
	
    this.AddMC = function () {
        var val = document.getElementById("txt_MC").value;
        if (val == "ֻ���²�10������Ŷ" || val == "" || this.GetLength(val)>20) {
		document.getElementById("MC_alt_div").innerHTML =ArrAlt[5]+ArrAlt[2];
		return; 
	}
        var cookieVal = MC_GetCookie("IT168_MC");
        var arr = cookieVal != null ? cookieVal.split("$") : "";
        var voteVal = arr[0]
        var mcVal = arr.length > 1 ? arr[1] : "";
        if (mcVal == "" || mcVal.indexOf(MC_aid) <= 0) {
		var str = escape(val)
		str = str.replace(/%/g, '}')
            var pars = "method=SubMC&artid=" + MC_aid + "&siteid=" + MC_siteid + "&userid=" + MC_userid + "&MContent=" + str + "&r=" + Math.random();
	    	
            		var CreatInfo = null;
			var sendUrl = MC_action_pace+pars;
			CreatInfo = new XMLHttpObject("post", sendUrl, true);
			//CreatInfo.params =pars;
			CreatInfo.sendData();
			CreatInfo.CallBackFailed = function () { /*alert("�ύ΢�������쳣");*/};
			CreatInfo.CallBackOK = function () {
				if(CreatInfo.text=="1"){						
						MC_SetCookie("IT168_MC", cookieVal + "," + MC_aid);                        
						MC.Main(10,1);//���¼���
				}else {
					  document.getElementById("MC_alt_div").innerHTML = ArrAlt[1].replace("{0}", val );
				}	
			}
		}else {
            document.getElementById("MC_alt_div").innerHTML = ArrAlt[8];			
        }
    };
    
	
	
	
	
	this.Main = function (flag,stateid)  {
        this.IsLogin();
        this.CheckSite();
        var pars = "method=IniMC&artid=" + MC_aid + "&siteid=" + MC_siteid + "&userid=" + MC_userid + "&num=" + flag + "&r=" + Math.random();
        var CreatInfo = null;
        var sendUrl=MC_action_pace+pars;
        CreatInfo = new XMLHttpObject("get", sendUrl, true);
        //CreatInfo.params = pars;
        CreatInfo.sendData();
        CreatInfo.CallBackFailed = function () { /*alert("����΢�������쳣");*/};
        CreatInfo.CallBackOK = function () {
	    if(CreatInfo.text==""){return;}
	    var obj = eval("(" + CreatInfo.text+ ")");
            if (obj.isShow == "1") {
                var i = 0, html = "<div class=\"{0}\"><div class=\"{1}\">";
                var temp = "";
                if (obj.totalNum == "0") {

                    temp = "<div class='t'>��û���˷���΢����������ռ΢����ɳ���ɣ�</div>";
                } else {					
                    temp = "<div class='t'>����" + obj.totalVoteNum + "�˷���΢������ѡ����֧�ֵ�΢����</div>";
                }
                if (MC_width == 1) { i = 3; }

                switch (parseInt(obj.pageStyleId)) {
                    case 0:
                        html = html.replace("{0}", PageStyleOrg[i]).replace("{1}", PageStyleOrg[i + 1]) + temp + "<div class='" + PageStyleOrg[i + 2] + "'>";
                        break;
                    case 1:
                        html = html.replace("{0}", PageStyleRed[i]).replace("{1}", PageStyleRed[i + 1]) + temp + "<div class='" + PageStyleRed[i + 2] + "'>";
                        break;
                    case 2:
                        html = html.replace("{0}", PageStyleBlue[i]).replace("{1}", PageStyleBlue[i + 1]) + temp + "<div class='" + PageStyleBlue[i + 2] + "'>";
                        break;
                    case 3:
                        html = html.replace("{0}", PageStyleGreen[i]).replace("{1}", PageStyleGreen[i + 1]) + temp + "<div class='" + PageStyleGreen[i + 2] + "'>";
                        break;
                    case 4:
                        html = html.replace("{0}", PageStylePink[i]).replace("{1}", PageStylePink[i + 1]) + temp + "<div class='" + PageStylePink[i + 2] + "'>";
                        break;
                }
                var arrMC = obj.MContent.split('$');
                temp = "";
                if (obj.MContent != "" && obj.MContent != null) {
                    var t = obj.pageStyleId;
                    for (var j = 0; j < arrMC.length; j++) {
                        var str = arrMC[j].split('^');
						var percent;
                        if (obj.totalVoteNum != null && obj.totalVoteNum != "" && parseInt(obj.totalVoteNum) != 0) {
                            percent = parseInt((parseFloat(str[1]) / parseFloat(obj.totalVoteNum)) * 100);
                        }else{
			    percent=0;
			}
                        if (j == 0 || j == 1) {                           
                            temp += "<a target=\"_self\" id='vote" + str[0] + "' href='javascript:MC.Vote(" + str[0] + ")' class='" + MC_color[t] + "1' title=\"����" + str[1] + "����ͬ��΢����" + percent + "%��\">" + str[2] + "</a> ";
                        } else if (j == 2 || j == 3) {
                            temp += "<a target=\"_self\" id='vote" + str[0] + "' href='javascript:MC.Vote(" + str[0] + ")' class='" + MC_color[t] + "2' title=\"����" + str[1] + "����ͬ��΢����" + percent + "%��\">" + str[2] + "</a>";
                        } else if (j == 4 || j == 5) {
                            temp += "<a target=\"_self\" id='vote" + str[0] + "' href='javascript:MC.Vote(" + str[0] + ")' class='" + MC_color[t] + "3' title=\"����" + str[1] + "����ͬ��΢����" + percent + "%��\">" + str[2] + "</a> ";
                        } else if (j == 6 || j == 7) {
                            temp += "<a target=\"_self\" id='vote" + str[0] + "' href='javascript:MC.Vote(" + str[0] + ")' class='" + MC_color[t] + "4' title=\"����" + str[1] + "����ͬ��΢����" + percent + "%��\">" + str[2] + "</a> ";
                        } else if (j == 8) {
                            temp += "<a target=\"_self\" id='vote" + str[0] + "' href='javascript:MC.Vote(" + str[0] + ")' class='" + MC_color[t] + "5' title=\"����" + str[1] + "����ͬ��΢����" + percent + "%��\">" + str[2] + "</a> ";
                        } else if (i > 8 && j / 2 == 1) {
                            temp += "<a target=\"_self\" id='vote" + str[0] + "' href='javascript:MC.Vote(" + str[0] + ")' class='gray1' title=\"����" + str[1] + "����ͬ��΢����" + percent + "%��\">" + str[2] + "</a> ";
                        } else {
                            temp += "<a target=\"_self\" id='vote" + str[0] + "' href='javascript:MC.Vote(" + str[0] + ")' class='gray2' title=\"����" + str[1] + "����ͬ��΢����" + percent + "%��\">" + str[2] + "</a> ";
                        }
                    }
                    if (flag==10 && obj.totalNum>10) {
                        temp += "<a target=\"_self\" href='javascript:MC.Main(50)' class='xu_more'>����</a> <div class='clear' style='margin-top:0;'></div></div>";
                    }
                    else {
                        temp += "<div class='clear' style='margin-top:0;'></div> </div>";
                    }
                }else{
		    temp += "</div> ";
		}
                temp += "<div class='xu_h26' id='MC_alt_div'>";
                html += temp;

                if (MC_LoginState == 1) {//�ѵ�¼	
					if (obj.IsComment == "1") {
                        if (obj.userMCContent != "" && obj.UserIsDelete !="2" ) {
                            html = html + ArrAlt[7].replace("{0}", obj.userMCContent);
                        } else if (obj.userMCContent != "" && obj.UserIsDelete=="2") {
                            html = html + ArrAlt[6].replace("{0}", obj.userMCContent);
                        } else if (obj.totalNum != "0") {
                            html = html + ArrAlt[5];
                        } else {
                            html = html + ArrAlt[4];
                        }
                    }
                } else {
                    html = html + ArrAlt[3];
                }
				if(obj.MContent != ""){
					html = html + "</div></div></div>  ";
				}else{
					html = html + " </div></div>  ";
				}
                document.getElementById("MC_Area").innerHTML = html;
				if(stateid==1){
					document.getElementById("MC_alt_div").innerHTML =ArrAlt[0];
				}			
            }
        }
    }

}
//2013-05-20 ����ע�ͺ󼴿���ʾ΢��
//var MC=new MicroComment(); 
//MC.Main(10,0);

 function weibo()
	  {
		var host = window.location.host;
		window.open('http://'+host+'/weibo/'+articleCode+'.shtml');
	  }

//20140226 ΢�� ����

window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":["mshare","kaixin001","tqf","tieba","douban","tsohu"],"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{"bdSize":16},"image":{"viewList":["weixin","tsina","tqq","qzone","renren"],"viewText":"","viewSize":"16"},"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["weixin","tsina","tqq","qzone","renren"]}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
  
  jQuery(document).ready(function(){
   jQuery('.fengxiang').hover(function () {
                jQuery('#share').show();
            }, function () {
                jQuery('#share').hide();
            });
			
   jQuery('.fengxiang').click(function () {
                jQuery('#share').hide();
				});
});	  
	  


