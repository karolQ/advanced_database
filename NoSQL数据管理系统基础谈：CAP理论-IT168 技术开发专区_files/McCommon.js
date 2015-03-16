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
			buyclickstr+='ぁ';
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
							 objin.insertAdjacentHTML("afterEnd",' ('+returndscounts[i]+'人感兴趣)');
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
		var ajaxcount=Math.floor(objdsurl.length/basenum);//向下取整
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
						jsonp: "callbackparam",//服务端用于接收callback调用的function名的参数 
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
													$("#IT168zan").html("已赞");	
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
			exp.setTime(exp.getTime() + 864000000);//十天
			document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";domain=.it168.com;path=/";
		};

		//读取cookie
		var readCookie =function (name, defaultValue) {
			var cName = name + "="; //'cookie名'加‘=’号，定义新变量以便查找是否存在于cookie中
			var CA = new Array(); //存放cookie的数组
			CA = document.cookie.split(';'); //解析cookie
			for (var i = 0; i < CA.length; i++) {
				var c = CA[i].replace(/(^\s*)|(\s*$)/g, ""); //去掉cookie左右的空格
				if (c.indexOf(cName) == 0) return decodeURIComponent(c.substring(cName.length, c.length)); //以nameEQ开头的cookie将被提取出来
			}
			return typeof defauleValue != "undefined" ? defauleValue : null; //找不到cookie值时默认返回null
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
						alert("您已经评价过本篇文章，请不要重复评价");
						return;
					}
				}	
				$("#IT168zan").html("已赞");	
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
				 var  html='<li ><a href="http://wenku.it168.com/d_001286543.shtml" target="_blank">桌面虚拟化成本不断下降而价值与日俱增</a></li>'; 
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
// 预期计数：中文2字节，英文1字节  
var a = 0;  
// 循环计数  
var i = 0;  
// 临时字串  
var temp = '';  
for (i = 0; i < str.length; i ++ )  
{  
if (str.charCodeAt(i) > 255)  
{  
// 按照预期计数增加2  
a += 2;  
}  
else  
{  
a ++ ;  
}  
// 如果增加计数后长度大于限定长度，就直接返回临时字符串  
if(a > len)  
{  
return temp;  
  
}  
// 将当前内容加到临时字符串  
temp += str.charAt(i);  
}  
// 如果全部是单字节字符，就直接返回源字符串  
return str;  
}  



function MicroComment() {
    var MC_width = 0; MC_LoginState = 0;
    //MC_siteid = 1; // it168 为2 
    MC_userid = "";
    //MC_LoginUrl = "http://sso.pcpop.com/login.aspx?backurl=" + location.href;
    //MC_action_pace = "http://www.pcpop.com/iphone5/mc_action.ashx?" + Math.random();
    MC_color = new Array("org", "red", "blue", "green", "pink");
    PageStyleOrg = new Array("xu_org", "xu_org1", "xu_a", "xu_orgw", "xu_org1w", "xu_a xu_aw"); /*五色样式 前三小 后三宽 class*/
    PageStyleRed = new Array("xu_red", "xu_red1", "xu_a", "xu_redw", "xu_red1w", "xu_a xu_aw");
    PageStyleBlue = new Array("xu_blue", "xu_blue1", "xu_a", "xu_bluew", "xu_blue1w", "xu_a xu_aw");
    PageStyleGreen = new Array("xu_green", "xu_green1", "xu_a", "xu_greenw", "xu_green1w", "xu_a xu_aw");
    PageStylePink = new Array("xu_pink", "xu_pink1", "xu_a", "xu_pinkw", "xu_pink1w", "xu_a xu_aw");

    var Alt_win = "<div class=\"xu_win\">微评发表成功，感谢您的参与！</div>"; //发送成功	0 tj
    var Alt_worrning = "<div class=\"xu_error\">您输入的微评“{0}”由于太给力已被屏蔽！</div>"; //警告输入不好的字符 1 hf
    var Alt_null = "<div class=\"xu_ts\">请输入您要发表的微评。</div>"; // 警告未输入	 2

    var Alt_notLogin = "<div class=\"xu_ts1\">您还尚未登录，若想发表自己的微评请先 <a target=\"_self\" href='" + MC_LoginUrl + "'>登陆</a></div>"; //未登录无微评	3
    var Alt_longNot = "<div class=\"xu_inp\">我的微评：<input id='txt_MC' type=\"text\" class=\"xu_inp1\" value=\"只能吐槽10个汉字哦\" onkeyup='MC.CheckInputNum(this)' onfocus='this.value=\"\";' /> <input type=\"button\" class=\"xu_btn1\" value=\"发表\" id='btnMCSubmit' onclick='MC.AddMC()' /></div>"; //已登录无微评	4

    var Alt_notLonginHave = "<div class=\"xu_inp\">或输入其它微评：<input id='txt_MC' type=\"text\" class=\"xu_inp1\" value=\"只能吐槽10个汉字哦\" onkeyup='MC.CheckInputNum(this)' onfocus='this.value=\"\";'/> <input type=\"button\" class=\"xu_btn1\" value=\"发表\" id='btnMCSubmit' onclick='MC.AddMC()'/></div>"; //已登录有微评		5	

    var Alt_dirty = "<div class=\"xu_zy\">我的微评:<span> <del>{0}</del> ”由于太给力已被屏蔽！</span></div>"; //已登录再次进入已经发表过微评的文章(不文明)	6
    var Alt_again = "<div class=\"xu_zy\">我的微评:“{0}”</div>"; //已登录再次进入已经发表过微评的文章	7
    var Alt_haveMC_smail = "<div class=\"xu_ts\">您已经微评过一次了。</div>"; //已经评过一次	8  tj
    var ArrAlt = new Array(Alt_win, Alt_worrning, Alt_null, Alt_notLogin, Alt_longNot, Alt_notLonginHave, Alt_dirty, Alt_again, Alt_haveMC_smail);
	
    MC_GetCookie = function (name) { //获取cookie
        var arrStr = document.cookie.split("; ");
        for (var i = 0; i < arrStr.length; i++) {
            var temp = arrStr[i].split("=");
            if (temp[0] == name)
                return unescape(temp[1]);
        }
        return "";
    };
	
    MC_DelCookie = function (name) {//删除cookie
        var date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = name + "=a; expires=" + date.toGMTString();
    };
	
    MC_SetCookie = function (name, value) { //设置微cookie
        var domain = "it168.com";
        var expires = new Date();
        expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
        document.cookie = name + "=" + value + "; expires=" + expires.toGMTString() + (domain) + (domain) + ("");
    };	
	
	this.GetLength = function(str) { //判断输入字符长度，汉子2 其他 1  
		var realLength = 0, len = str.length, charCode = -1;
		for (var i = 0; i < len; i++) {
			charCode = str.charCodeAt(i);
			if (charCode >= 0 && charCode <= 128) realLength += 1;
			else realLength += 2;
		}
		return realLength;
	};   
	
    this.CheckInputNum=function(obj){//判断输入字符
	    if(this.GetLength(obj.value)>20){	obj.value=obj.value.substring(0,obj.value.length-1);}
    };	
	
    this.IsLogin=function(){//判断通过 cookie判断是否登录微评sso_username
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
	
    this.CheckSite=function(){//判断是文章页面还是图赏，加载不同宽度的页面样式
		    //var arr=location.href.split('/');
		    if(MC_Css==1){//http://www.pcpop.com/doc/0/697/697574.shtml
		        MC_width = 0;
			    //MC_aid=parseInt(arr[arr.length-1].replace(".html",""));//正式环境下替换shtml			
		    }
		    if(MC_Css==2){ //http://tu.pcpop.com/pic-636044.htm
		        MC_width = 1;
				//var aid=arr[arr.length-1].replace(".htm","").replace("pic-","").replace(" ","");
			    //MC_aid=parseInt(aid);
		    }		
    };
	
	
	
    this.Vote = function (Mid) {//提交投票
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
					CreatInfo.CallBackFailed = function () { /*alert("投票数据异常");*/};
					CreatInfo.CallBackOK = function () {
						if(CreatInfo.text=="1"){	
								MC_SetCookie("IT168_MC", cookieVal + "," + MC_aid); 
								MC.Main(10,1);//重新加载		
						}
						else if(CreatInfo.text=="2"){//重复提交
							document.getElementById("MC_alt_div").innerHTML = ArrAlt[8];
						}
					}				
	       } else { 
				document.getElementById("MC_alt_div").innerHTML = ArrAlt[8];
		   }
    };
	
	
	
    this.AddMC = function () {
        var val = document.getElementById("txt_MC").value;
        if (val == "只能吐槽10个汉字哦" || val == "" || this.GetLength(val)>20) {
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
			CreatInfo.CallBackFailed = function () { /*alert("提交微评数据异常");*/};
			CreatInfo.CallBackOK = function () {
				if(CreatInfo.text=="1"){						
						MC_SetCookie("IT168_MC", cookieVal + "," + MC_aid);                        
						MC.Main(10,1);//重新加载
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
        CreatInfo.CallBackFailed = function () { /*alert("加载微评数据异常");*/};
        CreatInfo.CallBackOK = function () {
	    if(CreatInfo.text==""){return;}
	    var obj = eval("(" + CreatInfo.text+ ")");
            if (obj.isShow == "1") {
                var i = 0, html = "<div class=\"{0}\"><div class=\"{1}\">";
                var temp = "";
                if (obj.totalNum == "0") {

                    temp = "<div class='t'>还没有人发表微评，快来抢占微评的沙发吧：</div>";
                } else {					
                    temp = "<div class='t'>共有" + obj.totalVoteNum + "人发表微评，请选择您支持的微评：</div>";
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
                            temp += "<a target=\"_self\" id='vote" + str[0] + "' href='javascript:MC.Vote(" + str[0] + ")' class='" + MC_color[t] + "1' title=\"共有" + str[1] + "人赞同此微评（" + percent + "%）\">" + str[2] + "</a> ";
                        } else if (j == 2 || j == 3) {
                            temp += "<a target=\"_self\" id='vote" + str[0] + "' href='javascript:MC.Vote(" + str[0] + ")' class='" + MC_color[t] + "2' title=\"共有" + str[1] + "人赞同此微评（" + percent + "%）\">" + str[2] + "</a>";
                        } else if (j == 4 || j == 5) {
                            temp += "<a target=\"_self\" id='vote" + str[0] + "' href='javascript:MC.Vote(" + str[0] + ")' class='" + MC_color[t] + "3' title=\"共有" + str[1] + "人赞同此微评（" + percent + "%）\">" + str[2] + "</a> ";
                        } else if (j == 6 || j == 7) {
                            temp += "<a target=\"_self\" id='vote" + str[0] + "' href='javascript:MC.Vote(" + str[0] + ")' class='" + MC_color[t] + "4' title=\"共有" + str[1] + "人赞同此微评（" + percent + "%）\">" + str[2] + "</a> ";
                        } else if (j == 8) {
                            temp += "<a target=\"_self\" id='vote" + str[0] + "' href='javascript:MC.Vote(" + str[0] + ")' class='" + MC_color[t] + "5' title=\"共有" + str[1] + "人赞同此微评（" + percent + "%）\">" + str[2] + "</a> ";
                        } else if (i > 8 && j / 2 == 1) {
                            temp += "<a target=\"_self\" id='vote" + str[0] + "' href='javascript:MC.Vote(" + str[0] + ")' class='gray1' title=\"共有" + str[1] + "人赞同此微评（" + percent + "%）\">" + str[2] + "</a> ";
                        } else {
                            temp += "<a target=\"_self\" id='vote" + str[0] + "' href='javascript:MC.Vote(" + str[0] + ")' class='gray2' title=\"共有" + str[1] + "人赞同此微评（" + percent + "%）\">" + str[2] + "</a> ";
                        }
                    }
                    if (flag==10 && obj.totalNum>10) {
                        temp += "<a target=\"_self\" href='javascript:MC.Main(50)' class='xu_more'>更多</a> <div class='clear' style='margin-top:0;'></div></div>";
                    }
                    else {
                        temp += "<div class='clear' style='margin-top:0;'></div> </div>";
                    }
                }else{
		    temp += "</div> ";
		}
                temp += "<div class='xu_h26' id='MC_alt_div'>";
                html += temp;

                if (MC_LoginState == 1) {//已登录	
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
//2013-05-20 启用注释后即可显示微评
//var MC=new MicroComment(); 
//MC.Main(10,0);

 function weibo()
	  {
		var host = window.location.host;
		window.open('http://'+host+'/weibo/'+articleCode+'.shtml');
	  }

//20140226 微信 分享

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
	  


