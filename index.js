
if (!window.console) console = {};
console.log = console.log || function(){};
console.warn = console.warn || function(){};
console.error = console.error || function(){};
console.info = console.info || function(){};

var unity_config = {
	width: "100%", 
	height: "100%",
	params: { enableDebugging:"0", textcolor: "FFFFFF",	bordercolor: "4FA9FF", backgroundcolor: "4FA9FF", logoimage: "i/2.png?v22", disableContextMenu: true }
	
};
var u = new UnityObject2(unity_config);

jQuery(function() {

	var $missingScreen = jQuery("#unityPlayer").find(".missing");
	$missingScreen.hide();

        console.warn("jQuery(function() ...");

	u.observeProgress(function (progress) 
	{
                console.warn("u.observeProgress ...");
		try
		{ 
			console.warn("save_unity_status.php");
			jQuery.post( "/test/save_unity_status.php", 
			{ 
				uid: uid, 
				status: progress.pluginStatus 
			} ); 
		} 
		catch(e)
		{
                    console.warn("exception: catch");
                }


		switch(progress.pluginStatus) 
		{
			case "broken":
				console.warn("unity_status - broken");
				$missingScreen.find("a").click(function (e) 
				{
					e.stopPropagation();
					e.preventDefault();
					u.installPlugin();
					return false;
				});
				$missingScreen.show();
				break;
			case "missing":
				console.warn("unity_status - missing");
				$missingScreen.find("a").click(function (e) 
				{
					e.stopPropagation();
					e.preventDefault();
					u.installPlugin();
					return false;
				});
				$missingScreen.show();
				break;
			case "installed":
				console.warn("unity_status - installed");
				$missingScreen.remove();
				break;
			case "first":
				console.warn("unity_status - first");
				break;
                        default:
                                console.warn("unity_status - DEFAULT ... " + progress.pluginStatus);
				break;
		}
	});
	console.warn("initPlugin #unityPlayer  file_name=" + file_name);
	u.initPlugin(jQuery("#unityPlayer")[0], file_name);

        //console.debug(jQuery("#unityPlayer")[0]);
  	//console.warn(JSON.stringify(jQuery("#unityPlayer")[0]));
});


function UnityGameReady() 
{
	console.warn("UnityGameReady");
    window.jQuery && jQuery(window).trigger("UnityGameReady");
}


function ResizeUnity(newWidth, newHeight)
{
	console.warn("ResizeUnity");
	//$("#unityPlayer").css("width", newWidth).css("height",  newHeight);
}

function toggleActiveContent(flag)
{
	console.warn("toggleActiveContent");
	/*if (flag == true) {
		u.getUnity().setAttribute("style", "position: static; width: 100%; height: 100%;");
	} else {
		u.getUnity().setAttribute("style", "position: absolute; top: -100%; left: -100%; width: 100%; height: 100%;");
	}


	return;*/

    if (("ActiveXObject" in window) == false)
	{
		// NOT IEEEE
		if(flag == true)
		{
			u.getUnity().style.visibility = "visible";
		}
		else 
		{
			u.getUnity().style.visibility = "hidden";
			//unity.SendMessage("GUIManager", "FromFullScreen", "");
		}
		
		if(flag == true)
		{
			u.getUnity().style.width = "100%";
			u.getUnity().style.height = "100%";
		}
		else
		{
			u.getUnity().style.width = "1px";
			u.getUnity().style.height = "1px";
		}
	} 
	else 
	{
		// IE
		if(flag == true)
		{
			u.getUnity().style.width = "100%";
			u.getUnity().style.height = "100%";
		}
		else
		{
			u.getUnity().style.width = "1px";
			u.getUnity().style.height = "1px";
		}
    }
}

function g(x)
{
	if(document.layers)
	{
		return document.layers[x];
	}

	if(document.all && document.all.item)
	{
		return document.all[x];
	}

	if(document.getElementById)
	{
		return document.getElementById(x);
	}
}

function RefreshGamePage()
{
	console.warn("RefreshGamePage");
	location.reload();
	//SetWindowSize(760, 600);
}


String.prototype.replaceAll = function(search, replace)
{
  return this.split(search).join(replace);
}

/*
function json_transform_helper(str_in)
{
	str_in = str_in.replaceAll("$$$$", "\\\"");
	str_in = str_in.replaceAll("^^^^", "\"");
	return str_in;
}*/

/*
function str_replace ( search, replace, subject ) 
{	// Replace all occurrences of the search string with the replacement string
	// 
	// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +   improved by: Gabriel Paderni

	if(!(replace instanceof Array)){
		replace=new Array(replace);
		if(search instanceof Array){//If search	is an array and replace	is a string, then this replacement string is used for every value of search
			while(search.length>replace.length){
				replace[replace.length]=replace[0];
			}
		}
	}

	if(!(search instanceof Array))search=new Array(search);
	while(search.length>replace.length){//If replace	has fewer values than search , then an empty string is used for the rest of replacement values
		replace[replace.length]='';
	}

	if(subject instanceof Array){//If subject is an array, then the search and replace is performed with every entry of subject , and the return value is an array as well.
		for(k in subject){
			subject[k]=str_replace(search,replace,subject[k]);
		}
		return subject;
	}

	for(var k=0; k<search.length; k++){
		var i = subject.indexOf(search[k]);
		while(i>-1){
			subject = subject.replace(search[k], replace[k]);
			i = subject.indexOf(search[k],i);
		}
	}

	return subject;

}*/

var social_name_ready0 = false;
var social_name0 = "unnamed";
var social_photo0 = ""; // no avatar

// Is called in HTML on-body-load
function onloadF()
{
	console.warn("onloadF");

        SocialOnLoad();

	setTimeout("PrepareSocialName2();", 1);
	//setTimeout("if(window.UpdateMenu) {UpdateMenu();}", 2000);
	
	// 2018-Apr-10: TEST FIX
	//if(platform == "vk")
	//	setTimeout("SocialOnLoad();", 1);
	
	// 2018-Apr-10: TEST FIX
	//if(platform == "fb")
	//	setTimeout("SocialOnLoad();", 1);
	
	//setTimeout("if(window.GetNews) {GetNews();}", 2000);

	// 2018-Apr-10: TEST FIX
	/*
	if(platform == "vk")
	{
		console.warn("TryInitUnity");
		console.warn("social_name_ready = "+social_name_ready+" isUnityInited="+isUnityInited);
		//if(social_name_ready == 1 && isUnityInited == 1) // && friend_users_ready == 1

		{
			var unity = u.getUnity();
			if(social_country == 0)
				social_country = 1;
			//console.warn(batla_user_id+"|"+uid+"|"+game_host+"|"+languages[social_country]+"|"+img_v_n+"|"+client_version+"|"+region_id+"|"+social_id+"|"+social_ref_id+"|"+social_ad_id+"|"+platform+"|"+social_login_type+"|"+social_name+"|"+social_pic+"|"+social_country+"|"+angar_v+"|"+robot_v+"|"+game_v+"|"+avatar_present+"|"+bonus_koef+"|"+bonus_expire+"|"+cur_time+"|"+reg_sig+"|");
			//console.warn("avatar_present = "+avatar_present);
	
			//GUIManager SetStartParameters = 5|f0bb4401266259e2aaf6e|aim-masters.com|aim-masters.com|ru|730|19|0|89588560|0|0|vk|notdirect|Мира Ермакова|https://pp.userapi.com/c626321/v626321560/2df2d/NsKgnfAejmo.jpg|1|568|644|592|0|0|0|2018-01-06 09:51:32||
	
			// 2018-Apr-10: fake value
			var social_id = __social_id__;
			var social_name = "Test user 1";
			var social_pic = "https://aim-masters.com/test/i/ach/28.png";

			// 2018-Apr-10: fake value(s)
			var start_str = batla_user_id+"|"+uid+"|"+game_host+"|"+static_server+"|"+languages[social_country]+"|"+img_v_n+"|"+client_version+"|"+region_id+"|"+social_id+"|"+social_ref_id+"|"+social_ad_id+"|"+platform+"|"+social_login_type+"|"+social_name+"|"+social_pic+"|"+social_country+"|"+angar_v+"|"+robot_v+"|"+game_v+"|"+avatar_present+"|"+bonus_koef+"|"+bonus_expire+"|"+cur_time+"|"+reg_sig+"|"+replay_url+"";
			console.warn(start_str);
			
			//if(platform == "vk")
			//{
			//	console.warn("need_init_cheetos2: "+need_init_cheetos + " cheetos_state: "+cheetos_state);
			//	unity.SendMessage("GUIManager", "SetCheetosParameters", ""+need_init_cheetos+"|"+cheetos_state);
			//}
	
			console.warn("GUIManager SetStartParameters = " + start_str);
			unity.SendMessage("GUIManager", "SetStartParameters", start_str);

			//unity.SendMessage("GUIManager", "SetUserFriends", ","+appUsers_list+"");
			console.warn("GUIManager SetConfig = " + user_settings);
			unity.SendMessage("GUIManager", "SetConfig", ""+user_settings+"");

                        console.warn("start_parameters_done = 1");
			start_parameters_done = 1;
		}
	}
	*/
	
	//if(platform == "vk")
	//	setTimeout("DoPayReq();", 2000);

	/*
	if(platform == "direct")
	{
		SocialOnLoad();
	}
	
	if(platform == "wasd")
	{
		SocialOnLoad();
	}
	*/

	/*setTimeout("if(window.StartUserProfilePremiumAnim) {StartUserProfilePremiumAnim();}", 7000);
	
	//setTimeout("ChangeAvatar();", 1000);*/
//	NewsOnLoad();
//	LobyOnLoad();
}

var social_name_ready = 0;
function RegUpdateData()
{
	console.warn("RegUpdateData");
	//g('user_name').value = social_name;   // setting global variabla
	social_name_ready = 1;
	
	TryInitUnity();
}

var friend_users_ready = 0;
function FillFriendsList()
{
	console.warn("FillFriendsList");
	friend_users_ready = 1;
	
	TryInitFriends();
}

var start_parameters_done = 0;
var friends_done = 0;
function TryInitFriends()
{
	console.warn("TryInitFriends");
	if(start_parameters_done == 0)
	{
		console.warn("ERROR: start_parameters_done == 0");
		return;
	}
	console.warn("isUnityInited = "+isUnityInited+" friend_users_ready="+friend_users_ready);
	
	// 2018-Apr-10 TEST USER
	//if(isUnityInited == 1 && friend_users_ready == 1)
	{
		if(friends_done == 1)
		{
			console.warn("ERROR: friends_done == 1");
			return;
		}
		var unity = u.getUnity();

		// 2018-Apr-10 TEST User
		appUsers_list = social_id;

		console.warn("SetUserFriends = "+""+appUsers_list);
		unity.SendMessage("GUIManager", "SetUserFriends", ""+appUsers_list);
		friends_done = 1;
	}
	console.warn("TryInitFriends - exiting");
}

function cheetosGetCurrentUserApiResultInfo() {
	var def = {
		first_name : "",
		last_name : "",
	};

	var matches = /api_result=([^&]+)/.exec(location.href);
	if (!matches) {
		return def;
	}

	var result = JSON.parse(decodeURIComponent(matches[1]));

	if (!(result.response && result.response[0])) {
		return def;
	}


	return result.response[0];
}

function TryInitUnity()
{
	console.warn("TryInitUnity");
	console.warn("social_name_ready0 = " + social_name_ready0 + " isUnityInited=" + isUnityInited);

	// 2018-Apr-10
	//if(social_name_ready == 1 && isUnityInited == 1/* && friend_users_ready == 1*/)
	//if(social_name_ready == 0 && isUnityInited == 1/* && friend_users_ready == 1*/)
	if (social_name_ready0)
	{
		console.warn("social_name_ready0 OKAY");

		var unity = u.getUnity();
		if (unity == "undefined")
		{
			console.warn("################### UNITY IS UNDEFINED ##################");
		}

		if(social_country == 0)
		{
			social_country = 1;
		}
		//console.warn(batla_user_id+"|"+uid+"|"+game_host+"|"+languages[social_country]+"|"+img_v_n+"|"+client_version+"|"+region_id+"|"+social_id+"|"+social_ref_id+"|"+social_ad_id+"|"+platform+"|"+social_login_type+"|"+social_name+"|"+social_pic+"|"+social_country+"|"+angar_v+"|"+robot_v+"|"+game_v+"|"+avatar_present+"|"+bonus_koef+"|"+bonus_expire+"|"+cur_time+"|"+reg_sig+"|");
		//console.warn("avatar_present = "+avatar_present);

		// 2018-Apr-10: fake value
		var social_name = social_name0;
		var social_pic = social_photo0;
	
		//GUIManager SetStartParameters = 5|f0bb4401266259e2aaf6e|aim-masters.com|aim-masters.com|ru|730|19|0|89588560|0|0|vk|notdirect|Мира Ермакова|https://pp.userapi.com/c626321/v626321560/2df2d/NsKgnfAejmo.jpg|1|568|644|592|0|0|0|2018-01-06 09:51:32||

                console.warn("social_id = " + social_id);
                console.warn("social_login_type = " + social_login_type);
                console.warn("social_name = " + social_name);
		var start_str = batla_user_id+"|"+uid+"|"+game_host+"|"+static_server+"|"+languages[social_country]+"|"+img_v_n+"|"+client_version+"|"+region_id+"|"+social_id+"|"+social_ref_id+"|"+social_ad_id+"|"+platform+"|"+social_login_type+"|"+social_name+"|"+social_pic+"|"+social_country+"|"+angar_v+"|"+robot_v+"|"+game_v+"|"+avatar_present+"|"+bonus_koef+"|"+bonus_expire+"|"+cur_time+"|"+reg_sig+"|"+replay_url+"";
		console.warn("START STR - 2");
		console.warn(start_str);
		
		/*if(platform == "vk")
		{
			console.warn("need_init_cheetos2: "+need_init_cheetos + " cheetos_state: "+cheetos_state);
			unity.SendMessage("GUIManager", "SetCheetosParameters", ""+need_init_cheetos+"|"+cheetos_state);
		}*/

		console.warn("GUIManager SetStartParameters = " + start_str);
		unity.SendMessage("GUIManager", "SetStartParameters", start_str);
		//unity.SendMessage("GUIManager", "SetUserFriends", ","+appUsers_list+"");
		console.warn("GUIManager SetConfig = " + user_settings);
		unity.SendMessage("GUIManager", "SetConfig", ""+user_settings+"");
		
		console.warn("sub-call: TryInitFriends");
		start_parameters_done = 1;
		TryInitFriends();
		//alert(appUsers_list);


		// 2018-Apr-10: Test User
        //if ("cheetosInitUnityCallback" in window) {
        //    window.cheetosInitUnityCallback();
        //}
		//window.jQuery && jQuery(window).trigger("AfterTryInitUnity");
		
	}
	else
	{
		console.warn("TryInitUnity()  * RETRY * in 5 seconds");
		setTimeout("TryInitUnity();", 5000); // try again later
	}
}

function ShowWASDMessageBox()
{
	var unity = u.getUnity();
	unity.SendMessage("GUIManager", "ShowWASDMessageBox", "");
}

function HandleLog(log_type, log_string, stack_track)
{
	/*
		if (log_type == "Error" || log_type == "Exception") {
			console.error(log_string, stack_track);
		} else {
			console.log(log_string, stack_track);
		}
	*/
	if (game_host != "batla-test.geim.pro")
	{
		return;
	}

	try {
		jQuery.ajax({
			url: '/test/utdf.php?uid=' + window.uid,
			type: 'POST',
			data: JSON.stringify({"type": log_type, "log": log_string, "trace": stack_track}),
			contentType: 'application/json; charset=utf-8',
			dataType: 'json'
		});

	} catch(e){}
}

function UpdateMenu()
{
	if(social_name_ready == 1 && isUnityInited == 1 && friend_users_ready == 1)
	{
		var unity = u.getUnity();
		unity.SendMessage("GUIManager", "NeedStatsUpdate", "");
	}
}

function UpdatePaymentStatus(status, count)
{
	if(typeof(count)==='undefined') count = 0;
	
	if(isUnityInited == 1)
	{
		var unity = u.getUnity();
		unity.SendMessage("Payments", "UpdatePaymentStatus", status+":"+count);
	}
}

function OpenInfoWindow(url)
{
	window.open(url, "_blank");
}

function ChangeAvatar()
{
	/*if(g('user_avatar_img') != null)
		g('user_avatar_img').src = social_pic;*/
}

function HideMenu()
{
	/*g('blockMenu').style.display = "none";
	g('blockFriends').style.display = "none";
	
//	g('mainQuest').style.display = "none";
//	g('all_div').style.margin = "0 px 0 0 -380px";
	
	SetWindowSize(800, 600);*/
}

function ShowMenu()
{
	/*g('blockMenu').style.display = "block";
	g('blockFriends').style.display = "block";
	
	var first_quest_size = 0;
	
	if(platform == "ok" || platform == "mm")
		SetWindowSize(760, 820 + first_quest_size);
	else if(platform == "vk")
	{
		SetWindowSize(760, 774 + first_quest_size);
	}
	else
		SetWindowSize(800, 750 + first_quest_size);*/
}

function HideAll()
{
	/*g('wndNews').style.display = "none";
	g('wndMain').style.display = "none";
	g('wndError').style.display = "none";
	g('wndAngar').style.display = "none";
	g('wndShop').style.display = "none";
	g('wndClan').style.display = "none";
	g('wndRating').style.display = "none";
	g('wndAchiv').style.display = "none";
	g('wndHelp').style.display = "none";
	g('wndGameResult').style.display = "none";	
	g('wndMaps').style.display = "none";
	g('wndXSolla').style.display = "none";

	g('menuNews').className = "menuItem";
	g('menuMain').className = "menuItem";
	g('menuAngar').className = "menuItem";
	g('menuShop').className = "menuItem";
	g('menuClan').className = "menuItem";
	g('menuRating').className = "menuItem";
	g('menuAchiv').className = "menuItem";
	g('menuHelp').className = "menuItem";
	g('menuMaps').className = "menuItem";*/
}

var isXsollaInit = false;

function ShowXSolla(gType)
{
    var isGold = gType == "clips_gold"

    g('paystation_img_desc').src = isGold ? '/test/i/xsolla_gold.png' : '/test/i/xsolla.png';
	g('wndXSolla').style.display = "block";
		
	if(isXsollaInit == false)
	{
		isXsollaInit = true;
//        g('paystation').src = "https://secure.xsolla.com/paystation/?projectid=7893&id_theme=34&local=ru&v1="+batla_user_id;
        g('paystation').src = isGold ? XSOLLA_PAY_STATION_URL_CLIPS_GOLD : XSOLLA_PAY_STATION_URL_CLIPS;
	}
}

function HideXSolla()
{
	OnClosePayWindow();
}

function ShowGame()
{
	/*HideAll();
	HideMenu();
	
	var u = g('unityPlayer');
	u.visibility = "visible";
	//u.style.height = "600px";
	//u.style.width = "800px";
	ResizeUnity(760, 600);
	var unity = GetUnity();
	unity.SendMessage("GameLogic", "WebSleepEnd", "");
	
	g('wndGame').style.display = "block";
	g('wndGame').style.top = 0;
	g('wndGame').style.left = 0;*/
}

function ShowGameResult()
{
//	alert("���������� � ����������, ���� � ������ ��������� :)");
	/*ShowMenu();
	HideUnity();
	HideAll();
	
	//RefreshGamesList();
	GetGameResult();
	
	g('wndGameResult').style.display = "block";*/
}

function HideUnity()
{
	/*ResizeUnity(1, 1);
	var u = g('unityPlayer');
	u.visibility = "hidden";
	//u.style.height = "1px";
	//u.style.width = "1px";
	var unity = GetUnity();
	unity.SendMessage("GameLogic", "WebSleepStart", "");
	g('wndGame').style.top = -1;
	g('wndGame').style.left = -1;*/
}

function ShowRating()
{
	/*HideUnity();
	HideAll();
	
	g('wndRating').style.display = "block";
	g('menuRating').className = "menuItemSelected";
	
	RequestRatingData(false, 0);*/
}

function ShowUser(user_id)
{
	
}

var isBeenInGame = false;

function ShowLoby()
{
	/*if(isBeenInGame = true) // ���� �� ���� � ���� � �����, �� ����� ��������.
	{
		UpdateMenu();
		isBeenInGame = false;
	}

	ShowMenu();
	HideUnity();
	HideAll();
	
	RefreshGamesList();
	GetGameResult();
	
	g('wndMain').style.display = "block";
	g('menuMain').className = "menuItemSelected";*/
}

function ShowAngarUnity()
{
	/*var u = g('unityPlayer');
	u.visibility = "visible";
	var unity = GetUnity();
	unity.SendMessage("GameLogic", "WebSleepEnd", "");
	
	ResizeUnity(358, 323);
	var unity = GetUnity();
	unity.SendMessage("GameLogic", "ShowAngar", "");
	
	g('wndAngar').style.display = "block";
	g('wndGame').style.top = 123;
	g('wndGame').style.left = 201;*/
}

function ShowAngar()
{
	/*//ShowGame();
	HideAll();
	ShowAngarUnity();
	

	DoRequest("../server_ref.php?method=get_user_devices&uid="+uid, OnGetUserDevices);
	
	g('menuAngar').className = "menuItemSelected";*/
}

function ShowClan()
{
	/*HideUnity();
	HideAll();
	
	g('wndClan').style.display = "block";
	g('menuClan').className = "menuItemSelected";
	
	if(user_clan_rights == 0)
		ShowClanTab(0, 0);
	else
		ShowClanTab(0, user_clan);*/
}

function ShowShop()
{
	/*HideUnity();
	HideAll();
	
	g('wndShop').style.display = "block";
	g('menuShop').className = "menuItemSelected";
	
	shopShowGoods(currentShopTab, 1); */
}

function ShowNews()
{
	/*ShowMenu();
	HideUnity();
	HideAll();
	
	UpdateNewsProfile(batla_user_info);
	
	g('wndNews').style.display = "block";
	g('menuNews').className = "menuItemSelected";*/
}

function ShowAchiv()
{
	/*HideUnity();
	HideAll();
	
	g('wndAchiv').style.display = "block";
	g('menuAchiv').className = "menuItemSelected";
	
	if(isFirstDeviceInitialize == 1)
		DoRequest("../server_ref.php?method=get_user_devices&uid="+uid, OnGetUserDevices);
	else	
		ShowAchivments(1);*/
}

function ShowMaps()
{
	/*if(isBeenInGame = true) // ���� �� ���� � ���� � �����, �� ����� ��������.
	{
		UpdateMenu();
		isBeenInGame = false;
	}

	ShowMenu();
	HideUnity();
	HideAll();
	
	g('wndMaps').style.display = "block";
	g('menuMaps').className = "menuItemSelected";
	
	ShowMapsFilter(currentMapsTab, 1);*/
}

function ShowHelp()
{
	/*HideUnity();
	HideAll();
	
	g('wndHelp').style.display = "block";
	g('menuHelp').className = "menuItemSelected";
	
	ShowHelpTab(1);*/
}

function HideAngar()
{
	/*var unity = GetUnity();
	unity.SendMessage("GameLogic", "GetConfigNM", "");*/
}

var g_pallet = "0_0.png";
var g_pallet_color = 0;
var g_pallet_scheme = 0;
var g_smile = "";
var g_weapons = "";

function ChangePalletColor(index)
{
	/*if(g_pallet_color == index)
		return;
	g_pallet_color = index;
	UpdatePallet();*/
}

function ChangePalletScheme(index)
{
	/*if(g_pallet_scheme == index)
		return;
	g_pallet_scheme = index;
	UpdatePallet();*/
}


function UpdatePallet()
{
	/*g_pallet = g_pallet_color + "_" + g_pallet_scheme + ".png";

	var unity = GetUnity();
	unity.SendMessage("GameLogic", "SetPalletNM", g_pallet);*/
}

function SetPallet(pallet)
{
	/*g_pallet = pallet;

	var unity = GetUnity();
	unity.SendMessage("GameLogic", "SetPalletNM", g_pallet);*/
}

function SetSmile(smile)
{
	/*g_smile = smile;

	var unity = GetUnity();
	unity.SendMessage("GameLogic", "SetSmileNM", g_smile);*/
}

function SaveConfig(conf)
{
	//DoRequestTxt("save_config.php?uid="+uid+"&config="+conf+"&pallete="+g_pallet+"&pallet_color="+g_pallet_color+"&pallet_scheme="+g_pallet_scheme+"&smile="+g_smile, OnSaveConfig);
}

function OnSaveConfig(req)
{

}

function SaveUserSettings(set)
{
	//alert(set);
	/*$.post("save_user_settings.php", { uidp: ""+uid, setp: ""+set},
	   function(data) {
		 
	   });*/
}

function EnableDevice(id)
{
	//var unity = GetUnity();
	//unity.SendMessage("GameLogic", "EnableDeviceNM", id);
}

var isRatingsInitialized0 = false;
var isRatingsInitialized1 = false;
var isRatingsInitialized2 = false;
var isRatingsInitialized3 = false;
var isRatingsInitialized4 = false;
function RequestRatingData(forced, league)
{
	g('ratingButton00').className = "btn_class_small";
	g('ratingButton01').className = "btn_class_small";
	g('ratingButton02').className = "btn_class_small";
	g('ratingButton03').className = "btn_class_small";
	g('ratingButton04').className = "btn_class_small";
	
	g('ratingButton0'+league).className = "btn_class_small_active";

	/*if(league == 0 && isRatingsInitialized0 == false)
	{
		forced = true;
		isRatingsInitialized0 = true;
	}
	
	if(league == 1 && isRatingsInitialized1 == false)
	{
		forced = true;
		isRatingsInitialized1 = true;
	}
	
	if(league == 2 && isRatingsInitialized2 == false)
	{
		forced = true;
		isRatingsInitialized2 = true;
	}
	
	if(league == 3 && isRatingsInitialized3 == false)
	{
		forced = true;
		isRatingsInitialized3 = true;
	}
	
	if(league == 4 && isRatingsInitialized4 == false)
	{
		forced = true;
		isRatingsInitialized4 = true;
	}*/
	
	forced = true;
	if(forced == true)
	{
		DoRequestTxt("cache/get_rating_data.php?league="+league+"&region="+region_id, FillRatingData);
	}
}

//
function DeviceClass (id_, name_, icon_, t_code_, stat_energy_, stat_defence_, stat_damage_, stat_fov_, stat_speed_, stat_crit_, stat_dodge_, stat_ammunition_)
{
	this.id           = id_;
	this.name         = name_;
	this.icon         = icon_;
	this.t_code       = t_code_;
	this.stat_energy  = stat_energy_;
	this.stat_defence = stat_defence_;
	this.stat_damage  = stat_damage_;
	this.stat_fov     = stat_fov_;
	this.stat_speed   = stat_speed_;
	this.stat_crit    = stat_crit_;
	this.stat_dodge   = stat_dodge_;
	this.stat_ammunition   = stat_ammunition_;
}

var goodsList = new Array();

function GoodClass (type_, good_)
{
	this.type = type_;
	this.good = good_;
}

var inventoryList = new Array();

function InventoryClass (item_id_, cnt_)
{
	this.item_id = item_id_;
	this.cnt	 = cnt_;
}


var devicesList = new Array();
var user_config = "";
var g_clan_icon = "";

function SetConfigNM(config)
{
	/*var unity = GetUnity();
	unity.SendMessage("GameLogic", "SetConfigNM", config);
	user_config = config;*/
}

var isFirstDeviceInitialize = 1;

var user_inv_grenade_exp   = 0;
var user_inv_grenade_flash = 0;
var user_inv_grenade_smoke = 0;
var user_inv_usable_hp     = 0;
var user_inv_usable_armor  = 0;
var user_inv_usable_timer  = 0;

var need_menu_update = 0;

function OnGetUserDevices(req)
{
	/*var unity = GetUnity();
	var xmlResponse = req.responseXML;
	var xmlRoot = xmlResponse.documentElement;
	//alert("XML structure:\n" + req.responseText);
	
	var object_node = xmlRoot.getElementsByTagName("MoneyDiamond");
	if(object_node.length > 0)
	{
		user_money_diamond = object_node.item(0).firstChild.data;
		g('diamond_cnt_div').innerHTML = g('diamond_cnt_div_shadow').innerHTML = user_money_diamond;
	}
	
	var object_node = xmlRoot.getElementsByTagName("Premium1Sec");
	if(object_node.length > 0) { user_premium_1_time = object_node.item(0).firstChild.data; }
	                                                                                        
	var object_node = xmlRoot.getElementsByTagName("Premium2Sec");                          
	if(object_node.length > 0) { user_premium_2_time = object_node.item(0).firstChild.data; }
	                                                                                        
	var object_node = xmlRoot.getElementsByTagName("Premium3Sec");                          
	if(object_node.length > 0) { user_premium_3_time = object_node.item(0).firstChild.data; }
	                                                                                        
	var object_node = xmlRoot.getElementsByTagName("Premium4Sec");                          
	if(object_node.length > 0) { user_premium_4_time = object_node.item(0).firstChild.data; }
	                                                                                        
	var object_node = xmlRoot.getElementsByTagName("Premium5Sec");                          
	if(object_node.length > 0) { user_premium_5_time = object_node.item(0).firstChild.data; }
	                                                                                        
	var object_node = xmlRoot.getElementsByTagName("Premium6Sec");                          
	if(object_node.length > 0) { user_premium_6_time = object_node.item(0).firstChild.data; }
	                                                                                        
	var object_node = xmlRoot.getElementsByTagName("Premium7Sec");                          
	if(object_node.length > 0) { user_premium_7_time = object_node.item(0).firstChild.data; }
	
	var object_node = xmlRoot.getElementsByTagName("Premium8Sec");
	if(object_node.length > 0) { user_premium_8_time = object_node.item(0).firstChild.data; }
	
	var object_node = xmlRoot.getElementsByTagName("Premium9Sec");
	if(object_node.length > 0) { user_premium_9_time = object_node.item(0).firstChild.data; }
	
	var object_node = xmlRoot.getElementsByTagName("Premium10Sec");
	if(object_node.length > 0) { user_premium_10_time = object_node.item(0).firstChild.data; }

	var object_node = xmlRoot.getElementsByTagName("Smile");
	for (var i=0; i<object_node.length; i++)
	{
		if(object_node.item(i).firstChild)
		{
			if(object_node.item(i).firstChild.data)
			{
				g_smile = object_node.item(i).firstChild.data;
			}
		}
		
		unity.SendMessage("GameLogic", "SetSmileNM", g_smile);
	}
	
	var object_node = xmlRoot.getElementsByTagName("Config");
	for (var i=0; i<object_node.length; i++)
	{
		var config = object_node.item(i).firstChild.data;
		SetConfigNM(config);
	}
	
	var object_node = xmlRoot.getElementsByTagName("Pallet");
	for (var i=0; i<object_node.length; i++)
	{
		g_pallet = object_node.item(i).firstChild.data;
		unity.SendMessage("GameLogic", "SetPalletNM", g_pallet);
	}
	
	
	var object_node = xmlRoot.getElementsByTagName("ClanIcon");
	for (var i=0; i<object_node.length; i++)
	{
		g_clan_icon = object_node.item(i).firstChild.data;
		unity.SendMessage("GameLogic", "SetClanNM", g_clan_icon);
	}
	
	var object_node = xmlRoot.getElementsByTagName("PalletColor");
	var g_pallet_color = object_node.item(0).firstChild.data;
	
	var object_node = xmlRoot.getElementsByTagName("PalletScheme");
	var g_pallet_scheme = object_node.item(0).firstChild.data;
	
	var object_node = xmlRoot.getElementsByTagName("Weapons");
	g_weapons = object_node.item(0).firstChild.data;
	
	InitAngar(g_pallet_color, g_pallet_scheme);
	

	devicesList = new Array();
	var str = "";
	var object_node = xmlRoot.getElementsByTagName("Device");
	for (var i=0; i<object_node.length; i++)
	{
		var id = object_node.item(i).getAttribute("id");
		var name = object_node.item(i).getAttribute("name");
		var type = object_node.item(i).getAttribute("type");
		var icon = object_node.item(i).getAttribute("icon");
		
		var stat_energy  = object_node.item(i).getAttribute("stat_max_energy");
		var stat_defence = object_node.item(i).getAttribute("stat_defence");
		var stat_damage  = object_node.item(i).getAttribute("stat_damage");
		var stat_fov     = object_node.item(i).getAttribute("stat_fov");
		var stat_speed   = object_node.item(i).getAttribute("stat_speed");
		var stat_crit    = object_node.item(i).getAttribute("stat_crit");
		var stat_dodge   = object_node.item(i).getAttribute("stat_dodge");
		var stat_ammunition   = object_node.item(i).getAttribute("stat_ammunition");
		
		//alert(icon);
		devicesList.push(new DeviceClass(id, name, icon, type, stat_energy, stat_defence, stat_damage, stat_fov, stat_speed, stat_crit, stat_dodge, stat_ammunition));
		//str += "<br><a href='javascript:EnableDevice(\""+id+"\");'>"+name+"</a>";
	}
	
	goodsList = new Array();
	var object_node = xmlRoot.getElementsByTagName("Goods");
	for (var i=0; i<object_node.length; i++)
	{
		var type = object_node.item(i).getAttribute("type");
		var good = object_node.item(i).getAttribute("good");
		
		goodsList.push(new GoodClass(type, good));
	}
	
	inventoryList = new Array();
	var object_node = xmlRoot.getElementsByTagName("Inv");
	for (var i=0; i<object_node.length; i++)
	{
		var item_id = object_node.item(i).getAttribute("item_id");
		var cnt     = object_node.item(i).getAttribute("cnt");
		
		inventoryList.push(new InventoryClass(item_id, cnt));
	}
	
	// Parse inv here
	var inv_node = xmlRoot.getElementsByTagName("Inv");
	for (var i=0; i<object_node.length; i++)
	{
		user_inv_grenade_exp   = object_node.item(i).getAttribute("grenade_exp");
		user_inv_grenade_flash = object_node.item(i).getAttribute("grenade_flash");
		user_inv_grenade_smoke = object_node.item(i).getAttribute("grenade_smoke");
		user_inv_usable_hp     = object_node.item(i).getAttribute("usable_hp");
		user_inv_usable_armor  = object_node.item(i).getAttribute("usable_armor");
		user_inv_usable_timer  = object_node.item(i).getAttribute("usable_timer");
	}

	
	achivmentsList = new Array();
	var object_node = xmlRoot.getElementsByTagName("Achievement");
	for (var i=0; i<object_node.length; i++)
	{
		var ach_id = object_node.item(i).getAttribute("ach_id");
		var name   = object_node.item(i).getAttribute("name");
		var type   = object_node.item(i).getAttribute("type");
		var req1   = object_node.item(i).getAttribute("req1");
		var req2   = object_node.item(i).getAttribute("req2");
		var req3   = object_node.item(i).getAttribute("req3");
		var req4   = object_node.item(i).getAttribute("req4");
		var req5   = object_node.item(i).getAttribute("req5");
		var prize1 = object_node.item(i).getAttribute("prize1");
		var prize2 = object_node.item(i).getAttribute("prize2");
		var prize3 = object_node.item(i).getAttribute("prize3");
		var prize4 = object_node.item(i).getAttribute("prize4");
		var prize5 = object_node.item(i).getAttribute("prize5");

		achivmentsList.push(new AchivmentClass(ach_id, name, type, req1, req2, req3, req4, req5, prize1, prize2, prize3, prize4, prize5));
	}
	
	InitAngarSelector();
	
	
	if(g('wndAngar').style.display == "block")
	{
		ShowAngarDevices();
	}
	else if(g('wndShop').style.display == "block")
	{
		UpdateMenu();
		shopShowGoods(currentShopTab, 1);
	}
	
	if(g('wndNews').style.display == "block")
	{
		GetProfileUserPremium()
	}
	
	if(g('wndAchiv').style.display == "block")
	{
//		UpdateMenu();
		ShowAchivments(1);
	}
	
	if(need_menu_update == 1)
	{
		UpdateMenu();
	}
	
	isFirstDeviceInitialize = 0;
	
//	g('angarElements').innerHTML = str; // temp by durane*/
}

var p_user_premium_time = new Array();
for(var i=0; i<10; i++)
{
	p_user_premium_time.push(0);
}

var p_user_tooltip = new Array();
for(var i=0; i<10; i++)
{
	p_user_tooltip.push("");
}

var p_user_tooltip_d = new Array();
for(var i=0; i<10; i++)
{
	p_user_tooltip_d.push("");
}



function XMLFromString(sXML)
{
  if (window.ActiveXObject)
  {
    var oXML = new ActiveXObject("Microsoft.XMLDOM");
    oXML.loadXML(sXML);
    return oXML;
  } 
  else 
  {
    return (new DOMParser()).parseFromString(sXML, "text/xml");
  }
}

function WeaponClass (id_, name_, icon_, type_)
{
	this.id = id_;
	this.name = name_;
	this.icon = icon_;
	this.type = type_;
}

var weaponsList = new Array();
var user_weapons = "";

function GetWeaponByID(weapon_id)
{
	for(var i=0; i<weaponsList.length; i++)
	{
		if(parseInt(weaponsList[i].id) == weapon_id)
		{
			return weaponsList[i];
		}
	}
	
	return 0;
}

function SetWeaponsXMLFromUnity(txt)
{
	var xmlRoot = XMLFromString(txt);
	weaponsList = new Array();
	
	var object_node = xmlRoot.getElementsByTagName("Weapon");
	for (var i=0; i<object_node.length; i++)
	{
		var id = object_node.item(i).getAttribute("id");
		var name = object_node.item(i).getAttribute("name");
		var icon = object_node.item(i).getAttribute("icon");
		var type = object_node.item(i).getAttribute("type");
		
		//alert(icon);
		weaponsList.push(new WeaponClass(id, name, icon, type));
		//str += "<br><a href='javascript:EnableDevice(\""+id+"\");'>"+name+"</a>";
	}
}

function ShowError()
{
	/*g('wndMain').style.display = "none";
	g('wndError').style.display = "block";
	
	var u = g('unityPlayer');
	u.visibility = "hidden";
	u.style.height = "1px";
	u.style.width = "1px";
	var unity = GetUnity();
	unity.SendMessage("GameLogic", "WebSleepStart", "");
	
	setTimeout(ShowLoby, 3000)*/
}

function Logout()
{
	//g('tdiv').innerHTML = "test";
	location.href='logout.php';
}

var is_create_server = 0;
var g_name = "";
var g_pass = "";
var g_id;
var g_lvl;

function SetCurRoomID(p_in)
{
	g_id = p_in;
}

function JSAntiMat(in_str, max_length)
{
	var arr = new Array( "���", "����", "����", "�����", "���", "�����", "���", "����", "����", "���", "�����", "�����", "����", "�����", "�����", "������", "fuck", "ass", "whore", "������");
	
	for(var i=0; i<arr.length; i++)
	{
		var patt = new RegExp(arr[i],"ig");
		in_str = in_str.replace(patt, "***");
	}
	
/*	if(max_length != -1)
	{
		if(in_str.length > max_length)
		{
			var slicedStr = in_str;
			slicedStr.slice(0, max_length);
			
			if(slicedStr != in_str)
			{
				in_str = slicedStr + "...";
			}
		}
	}*/ // ���� ������ ���������, ����� ��������� ����
	
	return in_str;
}

var g_gm = 0;
function CreateServer(s_name_in, lvl_id_in, gm, pass)
{
	/*s_name_in = JSAntiMat(s_name_in, 20);
	is_create_server = 1;
	//s_name = g('createForm').elements["serv_name"].value;
	//var lvl_id = g('createForm').elements["lvl_id"].value;
	g_name = s_name_in;
	g_pass = pass;
	g_lvl = lvl_id_in;
	g_gm = gm;
	
	//alert("g_name="+g_name);
	ShowGame();
	
	//alert(userStr+g_name+"|"+g_lvl+"|8|600|20|");
	var unity = GetUnity();
	unity.SendMessage("GameLogic", "WebCreateServer", userStr+g_name+"|"+g_lvl+"|4|600|20|"+gm+"|"+g_pass+"|");
	//alert(g('createForm').elements["serv_name"].value);
	
	isBeenInGame = true; // ������ ������ ��� ���� � ���� (��� ���������� ���� ����� ������)
	OnSwithToUnity();*/
}


function JoinGame(id, s_name, lvl, gm, pass)
{
	/*s_name = JSAntiMat(s_name);
	g_id = id;
	g_lvl = lvl;
	g_name = s_name;
	g_pass = pass;
	g_gm = gm;
	is_create_server = 0;
	ShowGame();
	
	//alert(""+userStr+g_id+"|"+g_name+"|"+g_lvl+"|16|3600|50|");
	
	//alert(userStr+g_id+"|"+g_name+"|"+g_lvl+"|8|600|20|");
	
	var unity = GetUnity();
	unity.SendMessage("GameLogic", "WebJoinServer", userStr+g_id+"|"+g_name+"|"+g_lvl+"|4|600|20|"+gm+"|"+g_pass+"|");
	
	isBeenInGame = true; // ������ ������ ��� ���� � ���� (��� ���������� ���� ����� ������)
	OnSwithToUnity();*/
}

function JoinGameResult(res)
{
	if(res == 1)
	{
		//ShowGame();
		//OnSwithToUnity();
	}
	else
	{
		//join_btn_return();
	}
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function FindServer(lvl, gm_in)
{
	/*g_lvl = lvl;
	is_create_server = 0;
	ShowGame();
	
	//alert(""+userStr+g_id+"|"+g_name+"|"+g_lvl+"|16|3600|50|");
	
	//alert(userStr+g_id+"|"+g_name+"|"+g_lvl+"|8|600|20|");
	
	var unity = GetUnity();
	unity.SendMessage("GameLogic", "WebFindServer", userStr+g_lvl+"|"+gm_in+"|");*/
}

function PlayReplay(rep_id)
{
	/*is_create_server = 0;
	ShowGame();
	
	var unity = GetUnity();
	unity.SendMessage("GameLogic", "WebPlayReplayFromURL", "http://batla.ru/replay/rep_"+rep_id+".zip");*/
}

function FindedServerInfo(g_id_in, g_name_in)
{
	g_id = g_id_in;
	g_name = g_name_in;
}

var isUnityInited = 0;
function UnityInitializedEvent()
{
	console.warn("UnityInitializedEvent");
	isUnityInited = 1;
	
	TryInitUnity();
	TryInitFriends();
	/*if (g('intro') != null) {
		g('intro').style.display = "none";	
	}

	var introWaitInterval;
		introWaitInterval = setInterval(function() {
			if (g('intro') == null) {
				return;
			}
			clearInterval(introWaitInterval);
			
			g('intro').style.display = "none";				
			
		}, 100);
	
	var unity = GetUnity();
	//alert("setconfig: "+user_settings);
	unity.SendMessage("InputManagerController", "SetConfig", ""+user_settings);	
	unity.SendMessage("GameLogic", "SetPlatform", ""+platform);	
	ShowNews();
	
	if(isFirstDeviceInitialize == 1)
		DoRequest("../server_ref.php?method=get_user_devices&uid="+uid, OnGetUserDevices);
//	ShowLoby();*/

	
}

function InitializeUnity()
{

	/*var unity = GetUnity();
	
	if(is_create_server)
	{
		unity.SendMessage("GameLogic", "WebCreateServer", userStr+s_name+"|1|8|600|20|");
	}
	else
	{
		//alert(g_id);
		unity.SendMessage("GameLogic", "WebJoinServer", userStr+g_id+"|1|8|600|20|");
	}*/
}

function JSSetHost()
{
	/*//alert("JSSetHost");
	var unity = GetUnity();
	if(unity != null)
	{
		unity.SendMessage("GameLogic", "SetHost", game_host);
	}
	else
	{
		setTimeout("JSSetHost();", 100);
	}*/
}

function JSSetLang()
{
	/*var unity = GetUnity();
	if(unity != null)
	{
		unity.SendMessage("GameLogic", "SetLang", languages[social_country]+"|"+img_v_n+"|"+client_version);
	}
	else
	{
		setTimeout("JSSetLang();", 100);
	}*/
}

var levelIcons = new Array();

function changeLevelIcon(selectedIndex)
{
	g('levelIconImg').src = "levels/" + levelIcons[selectedIndex];
}

function OnServerNameChange()
{
	var value = g('serv_name').value;

	if(value == '')
		g('createButton').innerHTML = "";
	else
		g('createButton').innerHTML = "������� ������";
}

function ShowClanTab(tabIndex, clanId, page)
{
	g('clanButton00').className = "btn_class";
//	g('clanButton01').className = "btn_class";
//	g('clanButton02').className = "btn_class";
	g('clanButton03').className = "btn_class";
//	g('clanButton04').className = "btn_class";
	
	g('clanButton0'+tabIndex).className = "btn_class_active";

	g('clanMain').style.display = "none";
//	g('clanList').style.display = "none";
//	g('clanChat').style.display = "none";	
	g('clanRate').style.display = "none";
//	g('clanRules').style.display = "none";
	g('clanRegister').style.display = "none";
	
	if(tabIndex === 0)
		g('clanMain').style.display = "block";
		
//	if(tabIndex === 1)
//		g('clanList').style.display = "block";
		
//	if(tabIndex === 2)
//		g('clanChat').style.display = "block";
		
	if(tabIndex === 3)
		g('clanRate').style.display = "block";
		
//	if(tabIndex === 4)
//		g('clanRules').style.display = "block";
		
	if(tabIndex == 0)
		ShowClanMainWindow(clanId);
		
	if(tabIndex == 3)
		ShowClanRating(page);
}

function ShowHelpTab(tabIndex)
{
//	g('helpButton00').className = "btn_class";
	g('helpButton01').className = "btn_class";
//	g('helpButton02').className = "btn_class";
	
	g('helpButton0'+tabIndex).className = "btn_class_active";

	g('helpMain').style.display = "none";
	g('helpKeys').style.display = "none";
	g('HelpFAQ').style.display = "none";	
	
	if(tabIndex === 0)
		g('helpMain').style.display = "block";
		
	if(tabIndex === 1)
		g('helpKeys').style.display = "block";
		
	if(tabIndex === 2)
		g('HelpFAQ').style.display = "block";
}


//select box

function DrawSmallSelectBox(div_id, items, cur_selected, sel_x, sel_y, onSelect)
{
	var sel_h = items.length*20-20;
	
	var ui_id = "uiid"+div_id;
	// 552, 96
	
	
	var str = "";
	str += "<img src=\"i/sel_back_short.png\" style=\"position: absolute; top: "+(sel_y-23)+"px; left: "+(sel_x+1)+"px;\">";
	str += "<a id=\"sel_res"+ui_id+"\" class=\"input_style0\" style=\"position: absolute; top: "+(sel_y-20)+"px; left: "+(sel_x+10)+"px; width: 108px;\">"+items[cur_selected]+"</a>";
	str += "<img src=\"i/1x1e.png\" style=\"position: absolute; top: "+(sel_y-21)+"px; left: "+(sel_x+6)+"px; height: 19px; width: 108px; cursor: pointer;\" onclick=\"OnClickSelectImg('"+ui_id+"');\">";

	str += "<div id=\"select_box"+ui_id+"\" style=\"display: none;\">";
	str += "<img style=\"position:absolute; top: "+sel_y+"px; left: "+sel_x+"px;\" src=\"i/select_top_short.png\">";
	str += "<img style=\"position:absolute; top: "+(sel_y+11)+"px; left: "+sel_x+"px; width: 108px; height: "+sel_h+"px;\" src=\"i/select_mid_short.png\">";
	str += "<img style=\"position:absolute; top: "+(sel_y+11+sel_h)+"px; left: "+sel_x+"px;\" src=\"i/select_bot_short.png\">";
	for(var i=0; i<items.length; i++)
	{
		str += "<a class=\"input_style0\" style=\"cursor: pointer; position:absolute; top: "+(sel_y+3+i*20)+"px; left: "+(sel_x+10)+"px;  width: 108px;\" onmouseover=\"OnOverSel(this);\" onmouseout=\"OnOutSel(this);\" onclick=\"OnCickSel(this, "+i+", '"+ui_id+"'); "+onSelect+"("+i+");\">"+items[i]+"</a>";
	}
	str += "</div>";
	
	g(div_id).innerHTML = str;
}

function DrawSelectBox(div_id, items, cur_selected, sel_x, sel_y, onSelect)
{
	var sel_h = items.length*20-20;
	
	var ui_id = "uiid"+div_id;
	// 552, 96
	
	
	var str = "";
	str += "<img src=\"i/sel_back.png\" style=\"position: absolute; top: "+(sel_y-23)+"px; left: "+(sel_x+1)+"px;\">";
	str += "<a id=\"sel_res"+ui_id+"\" class=\"input_style0\" style=\"position: absolute; top: "+(sel_y-20)+"px; left: "+(sel_x+10)+"px; width: 108px;\">"+items[cur_selected]+"</a>";
	str += "<img src=\"i/1x1e.png\" style=\"position: absolute; top: "+(sel_y-21)+"px; left: "+(sel_x+6)+"px; height: 19px; width: 192px; cursor: pointer;\" onclick=\"OnClickSelectImg('"+ui_id+"');\">";

	str += "<div id=\"select_box"+ui_id+"\" style=\"display: none;\">";
	str += "<img style=\"position:absolute; top: "+sel_y+"px; left: "+sel_x+"px;\" src=\"i/select_top.png\">";
	str += "<img style=\"position:absolute; top: "+(sel_y+11)+"px; left: "+sel_x+"px; width: 192px; height: "+sel_h+"px;\" src=\"i/select_mid.png\">";
	str += "<img style=\"position:absolute; top: "+(sel_y+11+sel_h)+"px; left: "+sel_x+"px;\" src=\"i/select_bot.png\">";
	for(var i=0; i<items.length; i++)
	{
		str += "<a class=\"input_style0\" style=\"cursor: pointer; position:absolute; top: "+(sel_y+3+i*20)+"px; left: "+(sel_x+10)+"px;  width: 192px;\" onmouseover=\"OnOverSel(this);\" onmouseout=\"OnOutSel(this);\" onclick=\"OnCickSel(this, "+i+", '"+ui_id+"'); "+onSelect+"("+i+");\">"+items[i]+"</a>";
	}
	str += "</div>";
	
	g(div_id).innerHTML = str;
}

function OnOverSel(obj)
{
	obj.style.color = "#fff524";
}


function OnOutSel(obj)
{
	obj.style.color = "#dfd503";
}

function OnClickSelectImg(res_id)
{
	if(g("select_box"+res_id).style.display == "block")
	{
		g("select_box"+res_id).style.display = "none";
	}
	else
	{
		g("select_box"+res_id).style.display = "block";
	}
}

function OnCickSel(obj, i, res_id)
{
	OnOverSel(obj);
	g("sel_res"+res_id).innerHTML = obj.innerHTML;
	OnClickSelectImg(res_id);
}

function OnClickSelectImg2(res_id)
{
	var u = g('unityPlayer');
	if(g("select_box"+res_id).style.display == "block")
	{
		g("select_box"+res_id).style.display = "none";
		u.style.visibility = "visible";
	}
	else
	{
		g("select_box"+res_id).style.display = "block";
		u.style.visibility = "hidden";
		//alert("1");
	}
}

function OnCickSel2(obj, i, res_id)
{
	OnOverSel(obj);
	g("sel_res"+res_id).innerHTML = obj.innerHTML;
	OnClickSelectImg2(res_id);
}

//pay
function OpenPayWindow()
{
	toggleActiveContent(false);
	
	ShowXSolla();
}

function OpenPayWindowGold()
{
    toggleActiveContent(false);

    ShowXSolla("clips_gold");
}

function OnClosePayWindow()
{
	g('wndXSolla').style.display = "none";
    isXsollaInit = false;
	toggleActiveContent(true);

    g('paystation').src = "about:blank";
}

//VK.api("users.get", {uids: social_id,test_mode: test_mode, fields: "first_name,last_name,photo_medium,city,country,sex,bdate,contacts"}, function(data){
function PrepareSocialName2()
{
        if (social_name_ready0) return;

	console.warn("My1: social_id=" + social_id);
	
	if ((social_id < 2000000000) && (social_id != 111111111) && (social_id != 222222222) && (social_id != 333333333) && (social_id != 2183659))
	{
		VK.api("users.get", {uids: social_id,test_mode: test_mode, fields: "first_name,last_name,photo_100"}, 
		function(data)
		{
			console.warn("VK Users got");
			console.warn("" + JSON.stringify(data));
			
			var users_list_arr = data["response"];
			var users_list_cnt = users_list_arr["length"];
			if (users_list_cnt == 1)
			{
				var user0 = users_list_arr[0];
				var user0_id = user0["id"];
				var user0_first_name = user0["first_name"];
				var user0_last_name = user0["last_name"];
				var user0_photo_100 = user0["photo_100"];

				console.warn("USER0 " + user0_id + " " + user0_first_name + " " + user0_last_name + " " + user0_photo_100);

				social_name0 = user0_first_name + " " + user0_last_name;
				social_photo0 = user0_photo_100;

				social_name_ready0 = true;
			}
			else
			{
				social_name_ready0 = false;
			}
		});

	}
        else if (social_id > 2000000000)
        {
           console.warn("special direct id" + direct_name);
           social_name0 = direct_name;
	   social_photo0 = "";
           social_name_ready0 = true;
        }
	else
	{
		console.warn("special vk id");
		// simulate getting NAME and avatar photo 100x100 for TEST USERS
		if (social_id == 111111111)
		{
			social_name0 = "Aisaka Taiga";
			social_photo0 = "";

			social_name_ready0 = true;
		}
		else if (social_id == 222222222)
		{
			social_name0 = "StRonGeaR"; // dont work here
			social_photo0 = "";

			social_name_ready0 = true;
		}
		else if (social_id == 333333333)
		{
			social_name0 = "Vitaly Semenov"; // dont work here
			social_photo0 = "";

			social_name_ready0 = true;
		}
		else if (social_id == 2183659)
		{
			social_name0 = "Sofiya Temnikova"; // dont work here
			social_photo0 = "";

			social_name_ready0 = true;
		}
		else
		{
			social_name_ready0 = false;
		}
	}
	if (!social_name_ready0)
	{
		//setTimeout("PrepareSocialName2();", 4000); // try again
	}
	else
	{
		// update social name and pic
		SaveSocialPic(social_name0, social_photo0); 
	}
}


/*
function PrepareSocialName0()
{
	if (social_name_ready0) return;

	//access_token = "61e9dffa33be935b61b843003a1ecbc7e4e58cf524da54b92e60eceeab8b6425b4fc13813046fe12c137e";
	//social_id = "89588560";
	
	console.warn("My1: social_id=" + social_id);
	
	if ((social_id < 2000000000) && (social_id != 111111111) && (social_id != 222222222) && (social_id != 333333333) && (social_id != 333333333))
	{
		console.warn("VK social_id, requesting VK social network");
		
		$.getJSON('https://api.vk.com/method/users.get?fields=first_name,last_name,photo_100&uids=' + social_id + '&v=5.52&access_token=' + access_token, 
		function(data) 
		{
			//console.warn(data);
			var users_list_arr = data["response"];
			var users_list_cnt = users_list_arr["length"];
			if (users_list_cnt == 1)
			{
				var user0 = users_list_arr[0];
				var user0_id = user0["id"];
				var user0_first_name = user0["first_name"];
				var user0_last_name = user0["last_name"];
				var user0_photo_100 = user0["photo_100"];

				console.warn("USER0 " + user0_id + " " + user0_first_name + " " + user0_last_name + " " + user0_photo_100);

				social_name0 = user0_first_name + " " + user0_last_name;
				social_photo0 = user0_photo_100;

				social_name_ready0 = true;
			}
			else
			{
				social_name_ready0 = false;
			}
		}
		)
		.done(function() { console.log( "DONE. second success" ); })
		.fail(function() { console.log( "FAIL. error" ); })
		.always(function() { console.log( "ALWAYS. complete" ); });
	}
        else if (social_id > 2000000000)
        {
           console.warn("special direct id" + direct_name);
           social_name0 = direct_name;
	   social_photo0 = "";
           social_name_ready0 = true;
        }
	else
	{
		console.warn("special vk id");
		// simulate getting NAME and avatar photo 100x100 for TEST USERS
		if (social_id == 111111111)
		{
			social_name0 = "Aisaka Taiga"; // works ok
			social_photo0 = "";

			social_name_ready0 = true;
		}
		else if (social_id == 222222222)
		{
			social_name0 = "StRonGeaR"; // here workable
			social_photo0 = "";

			social_name_ready0 = true;
		}
		else if (social_id == 333333333)
		{
			social_name0 = "Vitaly Semenov"; // dont work here
			social_photo0 = "";

			social_name_ready0 = true;
		}
		else if (social_id == 2183659)
		{
			social_name0 = "Sofiya Temnikova"; // dont work here
			social_photo0 = "";

			social_name_ready0 = true;
		}
		else
		{
			social_name_ready0 = false;
		}
	}
	if (!social_name_ready0)
	{
		//setTimeout("PrepareSocialName0();", 4000); // try again
	}
	else
	{
		// update social name and pic
		SaveSocialPic(social_name0, social_photo0); 
	}
}*/



// Dayli bonus
function OpenDayliBonusWindow()
{
	if(g('wndAngar').style.display == "block")
	{
		HideUnity();
	}
	
	var day = user_cur_day_bonus;
	
	if(platform == "vk")
	{
		if(day > 6)
			day = 6;
			
		if(day == 6 && user_preroll_disable == 1)
			day = 5;
			
		g('dailyBonusImg').src = "i/dayli/vk_day"+day+".png";
		
		if(user_preroll_disable == 0)
			g('dayliPrerollCheckbox').checked = true;
		else
			g('dayliPrerollCheckbox').checked = false;
	}
	else
	{
		if(day > 5)
			day = 5;
			
		g('dailyBonusImg').src = "i/dayli/day"+day+".png";
	}
	
	g('blockDayli').style.display = "block";
}

function ClickPrerollDummy() {}
function ClickPreroll()
{
	if(g('dayliPrerollCheckbox').checked == false)
		DoRequest("../server_ref.php?method=check_preroll&uid="+uid+"&check=1", ClickPrerollDummy);
	else
		DoRequest("../server_ref.php?method=check_preroll&uid="+uid+"&check=0", ClickPrerollDummy);
}

function CloseDayliBonusWindow()
{
	if(g('wndAngar').style.display == "block")
	{
		ShowAngar();
	}
	
	g('blockDayli').style.display = "none";
}

// Regions
function OpenRegionsWindow()
{
	if(g('wndAngar').style.display == "block")
	{
		HideUnity();
	}
	
	g('blockRegions').style.display = "block";
}

function CloseRegionsWindow()
{
	if(g('wndAngar').style.display == "block")
	{
		ShowAngar();
	}
	
	g('blockRegions').style.display = "none";
}

function SaveSocialPic(name_new, pic_new)
{
	$.post("save_user_pic.php", { uid: ""+uid, name: ""+name_new, pic: ""+pic_new}, function(){  });
}


(function() {
    var inst = (window.UnityObject2 && UnityObject2.instances && UnityObject2.instances.length > 0) ? UnityObject2.instances[0] : null;
    
    if (!inst) {
        return;   
    }
    
    var platformInfo = inst.getPlatformInfo();
    var config = inst.getConfig();
    
    if (!(platformInfo.ch && platformInfo.ch_v > 41 && config.enableBrowserDeprecatedWarning)) {
        return;
    }

    function update() {
        var html = jQuery("#ChromeMissingUnityPlayer").html()
        
        if (!html) {
            return;
        }
                        var aj = jQuery("#ChromeMissingUnityPlayer");
                            var ak = "";
                            if (platformInfo.win) {
                                ak = "<a href='http://windows.microsoft.com/en-us/internet-explorer/'>Internet Explorer</a>, <a href='http://www.mozilla.org/firefox'>Firefox</a> ��� <a href='http://www.opera.com/'>Opera</a>"
                            } else {
                                ak = "<a href='http://www.mozilla.org/firefox'>Firefox</a>, <a href='https://www.apple.com/safari/'>Safari</a>"
                            }
                            var ap = "<img src='https://files.unity3d.com/UnityObject2/resources/other_browser.jpg' style='float: left; margin-right: 15px;' /><div style='overflow:hidden;'><div style='height:202px; display:inline-block; vertical-align:middle;'></div><div style='display:inline-block;'><div style='display:inline-block; vertical-align:middle;'><span style='font-weight:bold; font-size: 1.1em;'>��������, Chrome �� ����� ��������� ��� ����������</span><p>�� ����������� ������ ����� �� �������������� Unity Web Player, ��������� ��� ������� ����� ����������.<br/>�� ����������� ������������ ������ �������, �������� " + ak + '.<br/>��� �� �� ������ ������� �������� ��������� NPAPI plugins � chrome://flags/#enable-npapi (������� ������������ ��������).</p><p>���� �� ������� ���� NPAPI � ������ �������� �� ��������, ����������  <a href="' + inst.getPluginURL() + '">���������� �������</a>.</p></div></div></div>';
                            aj.html(ap)
                            
    }
    
    inst.__notifyProgress = inst.notifyProgress;
    inst.notifyProgress = function() {
        var result = inst.__notifyProgress.apply(inst, arguments);
        
        update();
        
        return result;
    }

})();

