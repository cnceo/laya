var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var BaseRoomCreateUI=(function(_super){
		function BaseRoomCreateUI(){
			
		    this.backBtn=null;
		    this.btnConfirm=null;
		    this.imgGame=null;
		    this.btnEnter=null;
		    this.boxRoomID=null;

			BaseRoomCreateUI.__super.call(this);
		}

		CLASS$(BaseRoomCreateUI,'ui.BaseRoomCreateUI',_super);
		var __proto__=BaseRoomCreateUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(BaseRoomCreateUI.uiView);
		}

		STATICATTR$(BaseRoomCreateUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":900},"child":[{"type":"Image","props":{"width":1620,"skin":"common/blackBg.png","sizeGrid":"2,2,2,2","height":900}},{"type":"Box","props":{"y":45,"x":53,"width":250,"var":"backBtn","runtime":"ScaleButton","height":250,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":125,"x":125,"skin":"common/back.png","name":"btnIcon","anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":20,"x":739,"text":"组局设置","fontSize":35,"font":"Microsoft YaHei","color":"#ffffff","align":"right"}},{"type":"Box","props":{"y":520,"x":1325,"width":357,"var":"btnConfirm","runtime":"ScaleButton","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":178,"skin":"common/zuju.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":28,"x":133,"width":103,"text":"确认组局","strokeColor":"#000000","skin":"common/label.png","height":22,"fontSize":25,"font":"Microsoft YaHei","color":"#000000","align":"center"}}]},{"type":"Image","props":{"y":301,"x":1325,"width":255,"var":"imgGame","height":255,"anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":520,"x":1325,"width":357,"visible":false,"var":"btnEnter","runtime":"ScaleButton","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":178,"skin":"common/button_enterRoom.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":28,"x":133,"width":103,"strokeColor":"#000000","skin":"common/label.png","height":22,"fontSize":25,"font":"Microsoft YaHei","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":313,"x":151,"var":"boxRoomID"},"child":[{"type":"Label","props":{"text":"房间ID：","fontSize":20,"font":"Microsoft YaHei","color":"#929191","align":"right"}},{"type":"TextArea","props":{"y":42,"x":6,"width":296,"text":"5000000","name":"lblRoomID","height":91,"fontSize":50,"font":"impact","editable":false,"color":"#ffda5b","align":"left"}}]}]};}
		]);
		return BaseRoomCreateUI;
	})(View);
var CampaignUI=(function(_super){
		function CampaignUI(){
			
		    this.imgBg=null;

			CampaignUI.__super.call(this);
		}

		CLASS$(CampaignUI,'ui.CampaignUI',_super);
		var __proto__=CampaignUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleImage",ScaleImage);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(CampaignUI.uiView);
		}

		STATICATTR$(CampaignUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":420,"height":300},"child":[{"type":"Image","props":{"width":420,"var":"imgBg","skin":"common/blackBg.png","height":300,"alpha":0.8}},{"type":"Image","props":{"y":83,"x":89,"width":108.55,"skin":"gameHall/wheelFortune/zhuanpan.png","runtime":"ScaleImage","name":"btnWheelFortune","height":127.4,"anchorY":0.5,"anchorX":0.5}}]};}
		]);
		return CampaignUI;
	})(View);
var ChargeMessageUI=(function(_super){
		function ChargeMessageUI(){
			

			ChargeMessageUI.__super.call(this);
		}

		CLASS$(ChargeMessageUI,'ui.ChargeMessageUI',_super);
		var __proto__=ChargeMessageUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(ChargeMessageUI.uiView);
		}

		STATICATTR$(ChargeMessageUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":282,"height":52},"child":[{"type":"Image","props":{"y":0,"x":0,"width":282,"skin":"common/chargeBg.png","sizeGrid":"38,149,40,131","name":"bg","height":52}},{"type":"Label","props":{"y":5,"x":13,"skin":"common/label.png","name":"txt","fontSize":30,"font":"wordFont","color":"#fff9f9","bold":false,"align":"center"}}]};}
		]);
		return ChargeMessageUI;
	})(View);
var ChatUI=(function(_super){
		function ChatUI(){
			
		    this.chatInput=null;
		    this.sendChatBtn=null;
		    this.emojiBtn=null;
		    this.panelMaskSys=null;
		    this.panelMaskChat=null;
		    this.closeBtn=null;

			ChatUI.__super.call(this);
		}

		CLASS$(ChatUI,'ui.ChatUI',_super);
		var __proto__=ChatUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(ChatUI.uiView);
		}

		STATICATTR$(ChatUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":900},"child":[{"type":"Image","props":{"width":1620,"skin":"common/blackBg.png","sizeGrid":"2,2,2,2","height":900,"alpha":0.85}},{"type":"Image","props":{"y":80,"x":60,"width":1500,"skin":"common/bg.png","sizeGrid":"2,2,2,2","height":750}},{"type":"Image","props":{"y":740,"x":80,"width":1470,"skin":"common/lineImg.png","sizeGrid":"2,2,2,2","height":1}},{"type":"Image","props":{"y":330,"x":75,"width":1470,"skin":"common/lineImg.png","sizeGrid":"1,0,1,1","height":1}},{"type":"Image","props":{"y":760,"x":75,"width":1137,"skin":"common/gray_dark.png","sizeGrid":"2,2,2,2","height":52}},{"type":"TextInput","props":{"y":761,"x":75,"width":1061,"var":"chatInput","promptColor":"#929191","prompt":"请在此输入聊天信息","maxChars":250,"height":52,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Box","props":{"y":790,"x":1384,"width":349,"var":"sendChatBtn","runtime":"ScaleButton","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":169,"skin":"common/button_yellow1.png","sizeGrid":"9,12,14,35","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":54,"x":169,"text":"发送","name":"txtName","fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":787,"x":1173,"width":100,"var":"emojiBtn","runtime":"ScaleButton","name":"emojiBtn","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":57,"skin":"chat/biaoqinganniu.png","scaleY":0.8,"scaleX":0.8,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":760,"x":1145,"width":50,"skin":"chat/xian1.png","rotation":90,"height":1}},{"type":"Panel","props":{"y":92,"x":81,"width":1408,"var":"panelMaskSys","height":225}},{"type":"Panel","props":{"y":349,"x":78,"width":1465,"var":"panelMaskChat","height":374}},{"type":"Box","props":{"y":84,"x":1557,"width":160,"var":"closeBtn","runtime":"ScaleButton","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":80,"skin":"common/quXiao.png","anchorY":0.5,"anchorX":0.5}}]}]};}
		]);
		return ChatUI;
	})(View);
var ChatSmallUI=(function(_super){
		function ChatSmallUI(){
			
		    this.panelMask=null;

			ChatSmallUI.__super.call(this);
		}

		CLASS$(ChatSmallUI,'ui.ChatSmallUI',_super);
		var __proto__=ChatSmallUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(ChatSmallUI.uiView);
		}

		STATICATTR$(ChatSmallUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":314,"mouseThrough":true,"height":230},"child":[{"type":"Image","props":{"y":19,"x":0,"width":314,"visible":true,"skin":"common/blackBg.png","sizeGrid":"2,2,2,2","name":"bg","height":230,"alpha":0.85}},{"type":"Panel","props":{"y":22,"x":0,"width":313,"var":"panelMask","height":225}}]};}
		]);
		return ChatSmallUI;
	})(View);
var DiceUI=(function(_super){
		function DiceUI(){
			
		    this.bg=null;
		    this.boxDice=null;

			DiceUI.__super.call(this);
		}

		CLASS$(DiceUI,'ui.DiceUI',_super);
		var __proto__=DiceUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(DiceUI.uiView);
		}

		STATICATTR$(DiceUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":1620},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1620,"var":"bg","skin":"common/blackBg.png","height":1620,"alpha":0.8}},{"type":"Box","props":{"y":450,"x":810,"var":"boxDice"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"dice/1.png","name":"imgDice"}}]}]};}
		]);
		return DiceUI;
	})(View);
var EmailUI=(function(_super){
		function EmailUI(){
			
		    this.lblNone=null;
		    this.lstCell=null;
		    this.maiDetailedContent=null;

			EmailUI.__super.call(this);
		}

		CLASS$(EmailUI,'ui.EmailUI',_super);
		var __proto__=EmailUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(EmailUI.uiView);
		}

		STATICATTR$(EmailUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":900,"fontSize":18},"child":[{"type":"Image","props":{"width":1620,"skin":"common/bg.png","height":900}},{"type":"Label","props":{"y":400,"x":770,"var":"lblNone","text":"暂无邮件","fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":20,"x":739,"text":"邮件信息","fontSize":35,"font":"Microsoft YaHei","color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":110,"x":110,"width":107,"text":"10/50","name":"lbNumMail","height":54,"fontSize":15,"font":"impact","color":"#929191","align":"left"}},{"type":"Image","props":{"y":147.99999999999997,"x":100,"width":1400,"skin":"common/lineImg.png","height":1}},{"type":"Box","props":{"y":45,"x":53,"width":250,"runtime":"ScaleButton","name":"backBtn","height":250,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":125,"x":125,"skin":"common/back.png","name":"btnIcon","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":120,"x":1463,"width":100,"runtime":"ScaleButton","name":"btnEdit","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":50,"skin":"common/email/operate.png","anchorY":0.5,"anchorX":0.5}}]},{"type":"List","props":{"y":155,"x":100,"width":1400,"var":"lstCell","repeatX":1,"name":"btnEditDelete","height":667},"child":[{"type":"Box","props":{"y":0,"x":0,"name":"render"},"child":[{"type":"Image","props":{"y":90,"x":10,"width":1400,"skin":"common/lineImg.png","height":1}},{"type":"Label","props":{"y":11,"x":80.00000000000003,"width":612,"name":"lbTitle","height":54,"fontSize":25,"font":"Microsoft JhengHei","color":"#ffffff","bold":true,"align":"left"}},{"type":"Image","props":{"y":26,"x":1329.0000000000002,"skin":"common/email/newMail.png","name":"imgState"}},{"type":"Label","props":{"y":58,"x":1061,"width":206,"text":"2016/05/06","name":"lbDate","height":22,"fontSize":15,"font":"Microsoft JhengHei","color":"#8c8c8c","bold":true,"align":"right"}},{"type":"Label","props":{"y":58,"x":78,"width":844,"text":"阿萨德法师打发","name":"lbContent","height":44,"fontSize":15,"font":"Microsoft JhengHei","color":"#8c8c8c","bold":true,"align":"left"}},{"type":"CheckBox","props":{"y":26,"x":20,"skin":"common/email/c.png","name":"checkBox","labelColors":"#ff0000"}}]}]},{"type":"Box","props":{"y":120,"x":1443,"width":112,"visible":false,"runtime":"ScaleButton","name":"btnEditCancle","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":56,"width":112,"skin":"common/button_yellow.png","sizeGrid":"2,2,2,2","height":40,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":54,"x":56,"text":"取  消","fontSize":15,"font":"Microsoft YaHei","color":"#000000","bold":false,"anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":120,"x":1313,"width":112,"visible":false,"runtime":"ScaleButton","name":"btnEDelete","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":56,"width":112,"skin":"common/button_red.png","sizeGrid":"9,12,14,35","height":40,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":54,"x":56,"text":"删  除","fontSize":15,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":0,"x":0,"var":"maiDetailedContent"},"child":[{"type":"Image","props":{"width":1620,"skin":"common/blackBg.png","sizeGrid":"1,1,1,1","height":900,"alpha":0.8}},{"type":"Image","props":{"y":167,"x":200,"width":1202,"skin":"common/gray_dark.png","sizeGrid":"1,1,1,1","height":614}},{"type":"Image","props":{"y":100,"x":200,"width":1202,"skin":"common/yellowBg.png","sizeGrid":"1,1,1,1","height":82}},{"type":"Box","props":{"y":100,"x":1398,"width":200,"runtime":"ScaleButton","name":"btnCloseDetail","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":100,"skin":"common/quXiao.png","anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":220,"x":276,"width":1048,"text":"2016/05/06","name":"lbContent","height":353,"fontSize":25,"font":"Microsoft YaHei","color":"#929191","align":"left"}},{"type":"Label","props":{"y":125,"x":274,"width":883,"text":"系统消息","name":"lbTitle","height":30,"fontSize":25,"font":"Microsoft YaHei","color":"#000000","align":"left"}},{"type":"Box","props":{"y":636,"x":691,"name":"rewardBox"},"child":[{"type":"Box","props":{"y":60,"x":150,"width":349,"runtime":"ScaleButton","pivotY":18.5,"pivotX":47.5,"name":"okBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":174.5,"skin":"common/button_yellow1.png","sizeGrid":"9,12,14,35","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":53,"x":175,"text":"领取","name":"lbReward","fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Label","props":{"y":-10,"x":-120,"width":529,"text":"666666","stroke":2,"name":"lbReward","height":54,"fontSize":25,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]},{"type":"Label","props":{"y":130,"x":1154,"width":168,"text":"2016/05/06","name":"lbDate","height":25,"fontSize":15,"font":"Microsoft YaHei","color":"#000000","align":"right"}}]}]};}
		]);
		return EmailUI;
	})(View);
var EmojiUI=(function(_super){
		function EmojiUI(){
			

			EmojiUI.__super.call(this);
		}

		CLASS$(EmojiUI,'ui.EmojiUI',_super);
		var __proto__=EmojiUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(EmojiUI.uiView);
		}

		STATICATTR$(EmojiUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":428,"height":348},"child":[{"type":"Image","props":{"y":0,"x":0,"width":428,"skin":"common/blackBg.png","sizeGrid":"1,1,1,1","height":353,"alpha":0.85}},{"type":"Image","props":{"y":7,"x":13,"skin":"chat/001.png","name":"#001"}},{"type":"Image","props":{"y":7,"x":76,"skin":"chat/002.png","name":"#002"}},{"type":"Image","props":{"y":7,"x":140,"skin":"chat/003.png","name":"#003"}},{"type":"Image","props":{"y":7,"x":198,"skin":"chat/004.png","name":"#004"}},{"type":"Image","props":{"y":7,"x":259,"skin":"chat/005.png","name":"#005"}},{"type":"Image","props":{"y":67,"x":13,"skin":"chat/006.png","name":"#006"}},{"type":"Image","props":{"y":62,"x":76,"skin":"chat/007.png","name":"#007"}},{"type":"Image","props":{"y":62,"x":134,"skin":"chat/008.png","name":"#008"}},{"type":"Image","props":{"y":62,"x":195,"skin":"chat/009.png","name":"#009"}},{"type":"Image","props":{"y":60,"x":259,"skin":"chat/010.png","name":"#010"}},{"type":"Image","props":{"y":120,"x":13,"skin":"chat/011.png","name":"#011"}},{"type":"Image","props":{"y":119,"x":76,"skin":"chat/012.png","name":"#012"}},{"type":"Image","props":{"y":119,"x":136,"skin":"chat/013.png","name":"#013"}},{"type":"Image","props":{"y":120,"x":197,"skin":"chat/014.png","name":"#014"}},{"type":"Image","props":{"y":118,"x":259,"skin":"chat/015.png","name":"#015"}},{"type":"Image","props":{"y":173,"x":13,"skin":"chat/016.png","name":"#016"}},{"type":"Image","props":{"y":175,"x":76,"skin":"chat/017.png","name":"#017"}},{"type":"Image","props":{"y":175,"x":138,"skin":"chat/018.png","name":"#018"}},{"type":"Image","props":{"y":177,"x":259,"skin":"chat/019.png","name":"#019"}},{"type":"Image","props":{"y":174,"x":198,"skin":"chat/020.png","name":"#020"}},{"type":"Image","props":{"y":228,"x":13,"skin":"chat/021.png","name":"#021"}},{"type":"Image","props":{"y":231,"x":76,"skin":"chat/022.png","name":"#022"}},{"type":"Image","props":{"y":230,"x":139,"width":46,"skin":"chat/023.png","name":"#023","height":47}},{"type":"Image","props":{"y":231,"x":198,"width":47,"skin":"chat/024.png","name":"#024","height":47}},{"type":"Image","props":{"y":233,"x":259,"skin":"chat/025.png","name":"#025"}},{"type":"Image","props":{"y":287,"x":13,"skin":"chat/026.png","name":"#026"}},{"type":"Image","props":{"y":287,"x":76,"skin":"chat/027.png","name":"#027"}},{"type":"Image","props":{"y":287,"x":138,"skin":"chat/028.png","name":"#028"}},{"type":"Image","props":{"y":287,"x":200,"skin":"chat/029.png","name":"#029"}},{"type":"Image","props":{"y":287,"x":259,"skin":"chat/030.png","name":"#030"}}]};}
		]);
		return EmojiUI;
	})(View);
var ExpressBankUI=(function(_super){
		function ExpressBankUI(){
			
		    this.backBtn=null;
		    this.boxBody=null;

			ExpressBankUI.__super.call(this);
		}

		CLASS$(ExpressBankUI,'ui.ExpressBankUI',_super);
		var __proto__=ExpressBankUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);
			View.regComponent("Countdown",Countdown);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(ExpressBankUI.uiView);
		}

		STATICATTR$(ExpressBankUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"sizeGrid":"0,76,0,120","height":1620},"child":[{"type":"Image","props":{"width":1620,"skin":"common/blackBg.png","sizeGrid":"2,2,2,2","height":1620,"alpha":0.85}},{"type":"Box","props":{"y":45,"x":53,"width":250,"var":"backBtn","runtime":"ScaleButton","height":250,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":125,"x":125,"skin":"common/back.png","name":"btnIcon","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":542,"x":810,"width":770,"var":"boxBody","height":635,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":195,"x":122,"width":222,"text":"10000000","strokeColor":"#000000","skin":"common/label.png","name":"walletMoney","height":22,"fontSize":20,"font":"impact","color":"#ffda5b","align":"center"}},{"type":"Label","props":{"y":59,"x":270,"width":222,"text":"余额转换","strokeColor":"#000000","skin":"common/label.png","height":22,"fontSize":15,"font":"Microsoft YaHei","color":"#ffda5b","align":"center"}},{"type":"Label","props":{"y":195,"x":445,"width":222,"text":"10000000","strokeColor":"#000000","skin":"common/label.png","name":"localMoney","height":22,"fontSize":20,"font":"impact","color":"#ffda5b","align":"center"}},{"type":"Box","props":{"x":146},"child":[{"type":"Image","props":{"skin":"common/yellowC.png"}},{"type":"Label","props":{"y":71,"x":-5,"width":183,"text":"钱包金额","strokeColor":"#000000","skin":"common/label.png","height":41,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","align":"center"}}]},{"type":"Box","props":{"x":466},"child":[{"type":"Image","props":{"skin":"common/yellowC.png"}},{"type":"Label","props":{"y":71,"x":-5,"width":183,"text":"游戏余额","strokeColor":"#000000","skin":"common/label.png","height":41,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":295,"width":770,"name":"slider","height":79},"child":[{"type":"Image","props":{"y":54,"x":0,"width":770,"skin":"common/sliderBg.png","name":"bg","height":10}},{"type":"Image","props":{"y":56,"x":1,"width":770,"skin":"common/sliderProgress.png","name":"barBackMask","height":10}},{"type":"Box","props":{"y":65,"width":100,"runtime":"ScaleButton","name":"sliderNodeDown","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":50,"skin":"common/sliderAN.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-52,"x":-96,"skin":"common/sliderTip.png","name":"imgTip"}}]},{"type":"Label","props":{"y":51,"x":-52,"text":"MIN","strokeColor":"#000000","skin":"template/文本框/label.png","name":"txtMinLabel","fontSize":15,"font":"impact","color":"#929191","align":"center"}},{"type":"Label","props":{"y":51,"x":816,"text":"MAX","strokeColor":"#000000","skin":"template/文本框/label.png","name":"txtMaxLabel","fontSize":15,"font":"impact","color":"#ffe400","align":"center"}}]},{"type":"Box","props":{"y":513,"x":576,"width":349,"runtime":"ScaleButton","name":"confirmBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":175,"skin":"common/button_yellow1.png","sizeGrid":"9,12,14,35","name":"reJoinBtn","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":52,"x":169,"text":"确定","fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":53,"x":228,"width":50,"runtime":"Countdown","name":"countdown","height":50,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":25,"x":25,"text":"10","strokeColor":"#000000","skin":"common/label.png","name":"txt","fontSize":20,"font":"impact","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]},{"type":"Box","props":{"y":515,"x":204,"width":349,"runtime":"ScaleButton","name":"cancelBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":174.5,"skin":"common/button_yellow1.png","sizeGrid":"9,12,14,35","name":"reJoinBtn","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":52,"x":175,"text":"取消","fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":65,"x":331,"skin":"common/changeTip.png","scaleY":0.85,"scaleX":0.85}},{"type":"Label","props":{"y":436,"x":382,"width":687,"text":"温馨提示：游戏余额转入您的钱包请到“GameHall大厅-系统-个人银行”操作","height":20,"fontSize":20,"font":"Microsoft YaHei","color":"#ff004e","anchorY":0.5,"anchorX":0.5}}]}]};}
		]);
		return ExpressBankUI;
	})(View);
var FightLandlordRoomUI=(function(_super){
		function FightLandlordRoomUI(){
			
		    this.backBtn=null;
		    this.gameCountdown=null;
		    this.boxTitle=null;
		    this.pokerDealer=null;
		    this.poolMoney=null;

			FightLandlordRoomUI.__super.call(this);
		}

		CLASS$(FightLandlordRoomUI,'ui.FightLandlord.FightLandlordRoomUI',_super);
		var __proto__=FightLandlordRoomUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);
			View.regComponent("FLPlayerView",FLPlayerView);
			View.regComponent("CountdownRect",CountdownRect);
			View.regComponent("Countdown",Countdown);
			View.regComponent("ui.FightLandlord.CardRecordUI",ui.FightLandlord.CardRecordUI);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(FightLandlordRoomUI.uiView);
		}

		STATICATTR$(FightLandlordRoomUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":900},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"fightLandlordRoom/table.png"}},{"type":"Box","props":{"y":45,"x":53,"width":250,"var":"backBtn","runtime":"ScaleButton","height":250,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":125,"x":125,"skin":"common/back.png","name":"btnIcon","anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":15,"x":110,"width":125,"text":"入门馆","stroke":1,"name":"roomNameTxt","height":43,"fontSize":28,"font":"Microsoft YaHei","color":"#b2acac"}},{"type":"Label","props":{"y":54,"x":110,"width":147,"text":"游戏局号：","stroke":1,"height":43,"fontSize":28,"font":"Microsoft YaHei","color":"#b2acac"}},{"type":"Label","props":{"y":58,"x":247,"width":147,"text":"123456","stroke":1,"name":"gameNumTxt","height":36,"fontSize":28,"font":"impact","color":"#b2acac"}},{"type":"Box","props":{"y":165,"x":31,"name":"players","mouseThrough":true},"child":[{"type":"Box","props":{"y":528,"x":0,"width":347,"runtime":"FLPlayerView","name":"player0","height":199},"child":[{"type":"Image","props":{"skin":"fightLandlordRoom/01.png","name":"bg"}},{"type":"Label","props":{"y":7,"x":12,"width":110,"text":"显示名字","skin":"common/label.png","name":"name","height":29,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","bold":true,"align":"center"}},{"type":"Label","props":{"y":150,"x":12,"width":110,"text":"￥:12345678","skin":"common/label.png","name":"money","height":26,"fontSize":20,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":35,"x":15,"width":103,"skin":"common/head/headIcon0.png","name":"icon","height":103},"child":[{"type":"Image","props":{"width":70,"skin":"common/shiwan.png","name":"iconShiwan","height":70}}]},{"type":"Image","props":{"y":35,"x":71,"skin":"vip/vip6.png","name":"vip"}},{"type":"Image","props":{"y":3,"x":122,"skin":"fightLandlordRoom/03.png","name":"LFlg","mouseEnabled":false}},{"type":"Box","props":{"y":97,"x":66,"width":117,"runtime":"CountdownRect","name":"countdown","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":15,"x":11,"width":39,"visible":false,"text":"60","stroke":2,"skin":"common/label.png","name":"txt","height":35,"fontSize":28,"font":"wordFont","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":18,"x":294,"name":"Speak","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"common/chessgame/bgSpeak.png"}},{"type":"Label","props":{"y":28,"x":26,"wordWrap":true,"width":180,"text":"加注：10000","skin":"common/label.png","name":"talkTxt","height":46,"fontSize":24,"font":"Microsoft YaHei","color":"#000000","align":"center"}}]},{"type":"Image","props":{"y":-204,"x":706,"skin":"fightLandlordRoom/landlord_0.png","name":"cllLev"}},{"type":"Box","props":{"y":143,"x":1508,"width":82,"runtime":"ScaleButton","name":"robot","height":94,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":0,"x":2,"skin":"fightLandlordRoom/robotNone.png"}},{"type":"Image","props":{"y":25,"x":44,"skin":"fightLandlordRoom/robotWork.png","name":"work","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-32,"x":-20,"skin":"fightLandlordRoom/robotOn.png","name":"workImage"}}]}]},{"type":"Box","props":{"y":0,"x":0,"width":379,"runtime":"FLPlayerView","name":"player2","height":190},"child":[{"type":"Image","props":{"y":0,"x":-5,"skin":"fightLandlordRoom/01.png","name":"bg"}},{"type":"Label","props":{"y":3,"x":5,"width":74,"text":"0001542","skin":"common/label.png","name":"name","height":21,"fontSize":20,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":36,"x":10,"width":103,"skin":"common/head/headIcon0.png","name":"icon","height":103},"child":[{"type":"Image","props":{"width":70,"skin":"common/shiwan.png","name":"iconShiwan","height":70}}]},{"type":"Box","props":{"y":97,"x":62,"width":117,"runtime":"CountdownRect","name":"countdown","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":15,"x":11,"width":39,"visible":false,"text":"60","stroke":2,"skin":"common/label.png","name":"txt","height":35,"fontSize":28,"font":"wordFont","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":97,"x":62,"width":117,"name":"disconnect","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":30,"x":6,"width":104,"skin":"common/blackBg.png","height":104,"alpha":0.7}},{"type":"Image","props":{"y":86,"x":59,"skin":"common/chessgame/loadingS.png","name":"loading","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":90,"x":58,"width":117,"runtime":"CountdownRect","name":"clock","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":14,"x":10,"width":44,"visible":false,"text":"60","skin":"common/label.png","name":"txt","height":39,"fontSize":30,"font":"impact","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":160,"x":3,"skin":"common/chessgame/disconnectTxt.png"}}]},{"type":"Image","props":{"y":37,"x":67,"skin":"vip/vip6.png","name":"vip"}},{"type":"Image","props":{"y":0,"x":120,"skin":"fightLandlordRoom/03.png","name":"LFlg","mouseEnabled":false}},{"type":"Image","props":{"y":53,"x":189.99999999999994,"skin":"fightLandlordRoom/landlord_0.png","name":"cllLev"}},{"type":"Box","props":{"y":14,"x":282,"name":"Speak","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"common/chessgame/bgSpeak.png"}},{"type":"Label","props":{"y":28,"x":26,"wordWrap":true,"width":180,"text":"加注：10000","skin":"common/label.png","name":"talkTxt","height":46,"fontSize":24,"font":"Microsoft YaHei","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":43,"x":19,"width":82,"name":"robot","height":94},"child":[{"type":"Image","props":{"skin":"fightLandlordRoom/robotNone.png"}},{"type":"Image","props":{"y":25,"x":44,"skin":"fightLandlordRoom/robotWork.png","name":"work","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Box","props":{"y":0,"x":1366,"width":215,"runtime":"FLPlayerView","name":"player1","height":229},"child":[{"type":"Image","props":{"y":0,"x":63,"skin":"fightLandlordRoom/01.png","name":"bg"}},{"type":"Label","props":{"y":7,"x":72,"width":116,"text":"￥123456.78","skin":"common/label.png","name":"name","height":27,"fontSize":20,"font":"impact","color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":37,"x":79,"width":103,"skin":"common/head/headIcon0.png","name":"icon","height":103},"child":[{"type":"Image","props":{"width":70,"skin":"common/shiwan.png","name":"iconShiwan","height":70}}]},{"type":"Box","props":{"y":96,"x":130,"width":117,"runtime":"CountdownRect","name":"countdown","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":15,"x":11,"width":39,"visible":false,"text":"60","stroke":2,"skin":"common/label.png","name":"txt","height":35,"fontSize":28,"font":"wordFont","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":96,"x":130,"width":117,"name":"disconnect","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":32,"x":7,"width":104,"skin":"common/blackBg.png","height":104,"alpha":0.7}},{"type":"Image","props":{"y":87,"x":61,"skin":"common/chessgame/loadingS.png","name":"loading","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":92,"x":59,"width":117,"runtime":"CountdownRect","name":"clock","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":14,"x":10,"width":44,"visible":false,"text":"60","skin":"common/label.png","name":"txt","height":39,"fontSize":30,"font":"impact","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":162,"x":81,"skin":"common/chessgame/disconnectTxt.png"}}]},{"type":"Image","props":{"y":36,"x":139,"skin":"vip/vip6.png","name":"vip"}},{"type":"Image","props":{"y":-2,"x":-4,"skin":"fightLandlordRoom/03.png","name":"LFlg","mouseEnabled":false}},{"type":"Image","props":{"y":53,"x":-141,"skin":"fightLandlordRoom/landlord_0.png","name":"cllLev"}},{"type":"Box","props":{"y":14,"x":-63,"name":"Speak","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"x":124,"skin":"common/chessgame/bgSpeak.png","scaleX":-1}},{"type":"Label","props":{"y":28,"x":-81,"wordWrap":true,"width":180,"text":"加注：10000.00","skin":"common/label.png","name":"talkTxt","height":46,"fontSize":24,"font":"Microsoft YaHei","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":39,"x":89,"width":82,"name":"robot","height":94},"child":[{"type":"Image","props":{"skin":"fightLandlordRoom/robotNone.png"}},{"type":"Image","props":{"y":25,"x":44,"skin":"fightLandlordRoom/robotWork.png","name":"work","anchorY":0.5,"anchorX":0.5}}]}]}]},{"type":"Box","props":{"y":556,"x":503,"name":"selLandlordBtn","mouseThrough":true},"child":[{"type":"Box","props":{"y":50,"x":69,"width":148,"runtime":"ScaleButton","name":"btn_1","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":18,"x":15,"skin":"fightLandlordRoom/04.png"}},{"type":"Label","props":{"y":30,"x":34,"width":79,"text":"X1","skin":"common/label.png","name":"name","height":38,"fontSize":36,"font":"impact","color":"#ffffff","align":"center"}}]},{"type":"Box","props":{"y":50,"x":226,"width":148,"runtime":"ScaleButton","name":"btn_2","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":18,"x":15,"skin":"fightLandlordRoom/04.png"}},{"type":"Label","props":{"y":30,"x":34,"width":79,"text":"X2","skin":"common/label.png","name":"name","height":38,"fontSize":36,"font":"impact","color":"#ffffff","align":"center"}}]},{"type":"Box","props":{"y":50,"x":382,"width":148,"runtime":"ScaleButton","name":"btn_3","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":18,"x":15,"skin":"fightLandlordRoom/04.png"}},{"type":"Label","props":{"y":30,"x":34,"width":79,"text":"X3","skin":"common/label.png","name":"name","height":38,"fontSize":36,"font":"impact","color":"#ffffff","align":"center"}}]},{"type":"Box","props":{"y":50,"x":539,"width":148,"runtime":"ScaleButton","name":"btn_4","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":18,"x":15,"skin":"fightLandlordRoom/04.png"}},{"type":"Label","props":{"y":27,"x":34,"width":79,"text":"不叫","skin":"common/label.png","name":"name","height":45,"fontSize":32,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]}]},{"type":"Box","props":{"y":855,"x":810,"width":307,"visible":false,"runtime":"ScaleButton","name":"openCardBtn","height":86,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":0,"x":15,"width":277,"skin":"fightLandlordRoom/02.png","height":87}},{"type":"Label","props":{"y":16,"x":102,"width":103,"text":"明牌","stroke":0,"skin":"common/label.png","name":"name","height":49,"fontSize":36,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]},{"type":"Box","props":{"y":818,"x":810,"width":343,"runtime":"ScaleButton","name":"changeRoomBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":169,"skin":"common/button_yellow1.png","sizeGrid":"9,12,14,35","name":"reJoinBtn","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":52,"x":169,"width":60,"text":"换桌","height":38,"fontSize":30,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":559,"x":439,"width":742,"name":"speakBtn","mouseThrough":true,"height":100},"child":[{"type":"Box","props":{"y":50,"x":106,"width":213,"runtime":"ScaleButton","name":"passBtn","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":105,"skin":"common/button_red.png","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":46,"x":105,"width":134,"text":"不出","skin":"common/label.png","name":"txt","height":41,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":50,"x":370,"width":213,"runtime":"ScaleButton","name":"hintBtn","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":105,"skin":"common/button_red.png","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":46,"x":105,"width":134,"text":"提示","skin":"common/label.png","name":"txt","height":41,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":51,"x":634,"width":212,"runtime":"ScaleButton","name":"playBtn","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":105,"skin":"common/button_yellow.png","sizeGrid":"9,12,14,35","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":44,"x":105,"width":134,"text":"出牌","skin":"common/label.png","height":39,"fontSize":30,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]},{"type":"Box","props":{"y":322,"x":810,"var":"gameCountdown","runtime":"Countdown","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":267,"text":"1","skin":"common/label.png","name":"txt","height":72,"fontSize":40,"font":"gameStart","color":"#ffe000","bold":true,"anchorY":0,"anchorX":0,"align":"center"}}]},{"type":"Box","props":{"y":432,"x":747,"name":"settlementing"},"child":[{"type":"Image","props":{"skin":"common/chessgame/numBg.png","sizeGrid":"9,22,11,23"}},{"type":"Label","props":{"y":8,"x":29,"width":88,"text":"结算中...","skin":"common/label.png","name":"txt","height":21,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]},{"type":"Box","props":{"y":0,"x":680,"var":"boxTitle"},"child":[{"type":"Image","props":{"width":260,"var":"pokerDealer","skin":"common/blackBg.png","sizeGrid":"2,2,2,2","height":102,"alpha":0.8}},{"type":"Image","props":{"x":111,"skin":"common/chessgame/poolMoney.png"}},{"type":"Label","props":{"y":65,"x":130,"width":120,"var":"poolMoney","text":"200","stroke":2,"fontSize":25,"font":"impact","color":"#ffda5b","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":610,"x":810,"width":212,"runtime":"ScaleButton","name":"noWayOutBtn","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":105,"skin":"common/button_yellow.png","sizeGrid":"9,12,14,35","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":44,"x":105,"width":134,"text":"要不起","skin":"common/label.png","height":39,"fontSize":30,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":52,"x":1507,"width":212,"runtime":"ScaleButton","name":"cardRecordBtn","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":105,"skin":"common/button_yellow.png","sizeGrid":"9,12,14,35","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":44,"x":105,"width":134,"text":"记牌器","skin":"common/label.png","height":39,"fontSize":30,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"CardRecord","props":{"y":9,"x":691,"name":"cardRecord","runtime":"ui.FightLandlord.CardRecordUI"}}]};}
		]);
		return FightLandlordRoomUI;
	})(View);
var FLRoomTypeSubUI=(function(_super){
		function FLRoomTypeSubUI(){
			
		    this.blbCurRoomLimit=null;

			FLRoomTypeSubUI.__super.call(this);
		}

		CLASS$(FLRoomTypeSubUI,'ui.FightLandlord.FLRoomTypeSubUI',_super);
		var __proto__=FLRoomTypeSubUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(FLRoomTypeSubUI.uiView);
		}

		STATICATTR$(FLRoomTypeSubUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":900},"child":[{"type":"Label","props":{"y":535,"x":1060,"width":400,"var":"blbCurRoomLimit","text":"最低金额：￥","height":35,"fontSize":20,"font":"Microsoft YaHei","color":"#ffda5b","anchorY":0.5,"anchorX":0.5,"align":"center"}}]};}
		]);
		return FLRoomTypeSubUI;
	})(View);
var FishingLoadingUI=(function(_super){
		function FishingLoadingUI(){
			
		    this.TitleText=null;

			FishingLoadingUI.__super.call(this);
		}

		CLASS$(FishingLoadingUI,'ui.Fishing.FishingLoadingUI',_super);
		var __proto__=FishingLoadingUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(FishingLoadingUI.uiView);
		}

		STATICATTR$(FishingLoadingUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":900},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"fishing/loadingMap/fishingLoading.png"}},{"type":"Image","props":{"y":800,"x":810,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":760,"x":810,"var":"TitleText","text":"正在初始化...","fontSize":30,"font":"worldFont","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]};}
		]);
		return FishingLoadingUI;
	})(View);
var FishingRoomUI=(function(_super){
		function FishingRoomUI(){
			
		    this.playerMsg=null;

			FishingRoomUI.__super.call(this);
		}

		CLASS$(FishingRoomUI,'ui.Fishing.FishingRoomUI',_super);
		var __proto__=FishingRoomUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(FishingRoomUI.uiView);
		}

		STATICATTR$(FishingRoomUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"name":"LvDown","height":900,"font":"wordFont"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"fishing/BgMap/bg01.png","name":"backGround"}},{"type":"Sprite","props":{"y":0,"x":0,"name":"layerShadow"}},{"type":"Sprite","props":{"y":0,"x":0,"width":1620,"name":"layerLighter","height":900}},{"type":"Sprite","props":{"y":0,"x":0,"width":1620,"name":"layerFish","height":900}},{"type":"Sprite","props":{"y":0,"x":0,"name":"layerWave","mouseEnabled":false}},{"type":"Sprite","props":{"y":748.5,"x":596,"name":"layerCannon"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"fishing/UI/CannonBg.png"}},{"type":"Box","props":{"y":120,"x":379,"width":75,"runtime":"ScaleButton","name":"LvUp","height":65,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"fishing/UI/CannonLevelUp.png"}}]},{"type":"Box","props":{"y":120,"x":49,"width":75,"runtime":"ScaleButton","name":"LvDown","height":65,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"fishing/UI/CannonLevelDown.png"}}]}]},{"type":"Sprite","props":{"y":9.318593255870167e-14,"x":1.8637186511740333e-13,"width":1620,"name":"layerMiddle","mouseEnabled":false,"height":900}},{"type":"Box","props":{"y":717,"x":1427,"width":173,"runtime":"ScaleButton","name":"Task","height":170,"anchorY":0,"anchorX":0},"child":[{"type":"Image","props":{"y":-1.1368683772161603e-13,"x":0,"skin":"fishing/UI/yellowC.png"}},{"type":"Label","props":{"y":38,"x":31,"width":111,"text":"任务","height":86,"fontSize":30,"color":"#000000","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":19.999999999999986,"x":1400,"runtime":"ScaleButton"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"fishing/UI/sound.png","name":"MusicSwitch"}}]},{"type":"Box","props":{"y":19.999999999999986,"x":25,"runtime":"ScaleButton"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"fishing/UI/back.png","name":"Back"}}]},{"type":"Box","props":{"y":19.999999999999975,"x":1500,"runtime":"ScaleButton"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"fishing/UI/chongzhi.png","name":"Chongzhi"}}]},{"type":"Image","props":{"y":904,"x":810,"skin":"fishing/UI/CannonLevel1.png","name":"cannon","anchorY":1,"anchorX":0.5}},{"type":"Image","props":{"y":911,"x":810,"width":130,"skin":"fishing/UI/CannonPower.png","height":73,"anchorY":1,"anchorX":0.5}},{"type":"Label","props":{"y":886,"x":809,"width":49,"text":"x100","name":"CannonLvText","height":25,"fontSize":25,"font":"impact","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Box","props":{"y":0,"x":0,"var":"playerMsg"},"child":[{"type":"Image","props":{"y":900,"x":0,"skin":"common/head/headIcon0.png","scaleY":0.5,"scaleX":0.5,"name":"playerHeadPor","anchorY":1}},{"type":"Label","props":{"y":839,"x":133,"width":0,"text":"￥","skin":"common/label.png","height":0,"fontSize":35,"font":"impact","color":"#ffffff"}},{"type":"Label","props":{"y":841,"x":170,"width":0,"text":"9999999","skin":"common/label.png","name":"money","height":0,"fontSize":35,"font":"impact","color":"#ffffff"}},{"type":"Label","props":{"y":784,"x":139,"width":116,"text":"PLAYNAME","skin":"common/label.png","name":"name","fontSize":40,"font":"impact","color":"#ffffff","align":"left"}}]}]};}
		]);
		return FishingRoomUI;
	})(View);
var GameHallUI=(function(_super){
		function GameHallUI(){
			
		    this.bgHallGuang=null;
		    this.backBtn=null;
		    this.campaignBtn=null;
		    this.setingBtn=null;
		    this.boxRedP=null;
		    this.chatBtn=null;
		    this.rankBtn=null;
		    this.lblName=null;
		    this.head1=null;
		    this.labelUserMoney=null;
		    this.onlineNum=null;
		    this.boxNotice=null;
		    this.gmBtn=null;
		    this.lstGameIcon=null;

			GameHallUI.__super.call(this);
		}

		CLASS$(GameHallUI,'ui.GameHall.GameHallUI',_super);
		var __proto__=GameHallUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);
			View.regComponent("CheckButtonC",CheckButtonC);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameHallUI.uiView);
		}

		STATICATTR$(GameHallUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":900},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1620,"skin":"common/bg.png","height":900}},{"type":"Image","props":{"skin":"common/bgHall.png","sizeGrid":"1,1,1,1"}},{"type":"Image","props":{"var":"bgHallGuang","skin":"common/bgHallGuang.png"}},{"type":"Box","props":{"y":45,"x":53,"width":250,"var":"backBtn","runtime":"ScaleButton","height":250,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":125,"x":125,"skin":"common/back.png","name":"btnIcon","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":37,"x":862,"width":200,"var":"campaignBtn","runtime":"CheckButtonC","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":100,"skin":"common/huodong_off.png","pivotX":34.5,"name":"btnIcon","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":68,"x":77,"width":45,"text":"活动","strokeColor":"#000000","skin":"common/label.png","height":22,"fontSize":15,"font":"Microsoft YaHei","color":"#929191","align":"center"}}]},{"type":"Box","props":{"y":37,"x":1068,"width":200,"var":"setingBtn","runtime":"CheckButtonC","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":100,"skin":"common/xitong_off.png","name":"btnIcon","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":18.999999999999773,"x":32,"var":"boxRedP"},"child":[{"type":"Image","props":{"skin":"common/redPoint.png"}},{"type":"Label","props":{"y":2,"x":0,"width":30,"text":"1","strokeColor":"#000000","skin":"common/label.png","name":"lbRedP","height":30,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Label","props":{"y":68,"x":77,"width":45,"text":"系统","strokeColor":"#000000","skin":"common/label.png","name":"lblCheck","height":22,"fontSize":15,"font":"Microsoft YaHei","color":"#929191","align":"center"}}]},{"type":"Box","props":{"y":37,"x":1274,"width":200,"var":"chatBtn","runtime":"CheckButtonC","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":100,"skin":"common/liaotian_off.png","name":"btnIcon","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":68,"x":77,"width":45,"text":"聊天","strokeColor":"#000000","skin":"common/label.png","name":"lblCheck","height":22,"fontSize":15,"font":"Microsoft YaHei","color":"#929191","align":"center"}}]},{"type":"Box","props":{"y":37,"x":1486,"width":200,"var":"rankBtn","runtime":"CheckButtonC","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":100,"skin":"common/paihang_off.png","name":"btnIcon","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":68,"x":77,"width":45,"text":"排行榜","strokeColor":"#000000","skin":"common/label.png","name":"lblCheck","height":22,"fontSize":15,"font":"Microsoft YaHei","color":"#929191","align":"center"}}]},{"type":"Box","props":{"y":"242","x":140,"name":"userInfo"},"child":[{"type":"Label","props":{"y":4,"x":87,"width":142,"var":"lblName","text":"Name","height":42,"fontSize":30,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":-15,"x":0,"width":220,"skin":"common/white.png","sizeGrid":"2,2,2,2","height":2}},{"type":"Image","props":{"y":3,"x":0,"width":77,"var":"head1","skin":"common/head/headIcon0.png","height":77},"child":[{"type":"Image","props":{"width":52,"visible":false,"skin":"common/shiwan.png","name":"iconShiwan","height":52}}]},{"type":"Label","props":{"y":44,"x":83,"width":144,"var":"labelUserMoney","text":"￥26574","height":35,"fontSize":25,"font":"impact","color":"#ffda5b","align":"left"}},{"type":"Label","props":{"y":-78,"x":-3,"width":210,"text":"GAMEHALL","height":53,"fontSize":50,"font":"impact","color":"#ffffff","align":"left"}}]},{"type":"Box","props":{"y":620,"x":146,"name":"zaiXianRenShu"},"child":[{"type":"Label","props":{"text":"在线人数：","strokeColor":"#000000","skin":"common/label.png","fontSize":20,"font":"Microsoft YaHei","color":"#929191","align":"left"}},{"type":"Label","props":{"y":2.5,"x":96,"width":0,"var":"onlineNum","text":"获取中..","strokeColor":"#000000","skin":"common/label.png","height":0,"fontSize":20,"font":"impact","color":"#929191","align":"left"}}]},{"type":"Box","props":{"y":88,"x":2,"var":"boxNotice"},"child":[{"type":"Image","props":{"skin":"common/noticeBg.png","name":"bgScrollNotice"}},{"type":"Panel","props":{"y":13,"x":75,"width":789,"name":"panelScrollNotice","height":30}}]},{"type":"Box","props":{"y":84,"x":1550,"name":"boxRank"},"child":[{"type":"Image","props":{"y":0,"x":39,"width":360,"skin":"common/blackBg.png","sizeGrid":"1,1,1,1","height":820,"alpha":0.85}},{"type":"Image","props":{"y":70,"x":90,"width":310,"skin":"common/lineImg.png","height":1}},{"type":"List","props":{"y":105,"x":48,"spaceY":5,"repeatY":10,"repeatX":1,"name":"lstRank"},"child":[{"type":"Box","props":{"name":"render"},"child":[{"type":"Label","props":{"y":8,"x":10,"width":50,"text":"1","name":"txtNum","height":30,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":10,"x":75,"width":120,"text":"￥123","name":"txtName","height":30,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":10,"x":205,"width":144,"text":"123456","name":"txtMoney","height":30,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":8,"x":18,"width":10,"skin":"common/yellowBg.png","name":"imgMe","height":22}}]}]},{"type":"Box","props":{"y":405,"x":56,"width":200,"runtime":"ScaleButton","name":"btnClick","height":814,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":407,"x":100,"width":29,"skin":"common/up.png","scaleY":-1,"scaleX":1,"rotation":90,"name":"btnIcon","height":18,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":659,"x":88,"name":"boxMy"},"child":[{"type":"Label","props":{"x":35,"width":120,"name":"txtMyName","height":30,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Label","props":{"x":165,"width":144,"name":"money","height":30,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":0,"x":3,"width":60,"name":"txtMyRank","height":30,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Image","props":{"y":3,"x":-18,"width":10,"skin":"common/yellowBg.png","sizeGrid":"2,2,2,2","name":"imgMe","height":22}}]},{"type":"Label","props":{"y":35,"x":81,"width":45,"text":"排名","strokeColor":"#000000","skin":"common/label.png","height":16,"fontSize":13,"font":"Microsoft YaHei","color":"#929191","align":"center"}},{"type":"Label","props":{"y":35,"x":161,"width":45,"text":"用户名","strokeColor":"#000000","skin":"common/label.png","height":16,"fontSize":13,"font":"Microsoft YaHei","color":"#929191","align":"center"}},{"type":"Label","props":{"y":35,"x":253,"width":45,"text":"盈利","strokeColor":"#000000","skin":"common/label.png","height":16,"fontSize":13,"font":"Microsoft YaHei","color":"#929191","align":"center"}}]},{"type":"Box","props":{"y":41,"x":706,"width":90,"visible":false,"var":"gmBtn","runtime":"ScaleButton","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":45,"skin":"common/GM.png","name":"img","anchorY":0.5,"anchorX":0.5}}]},{"type":"List","props":{"y":106,"x":658,"var":"lstGameIcon","spaceY":5,"spaceX":5,"repeatY":3,"repeatX":3}}]};}
		]);
		return GameHallUI;
	})(View);
var GameIconUI=(function(_super){
		function GameIconUI(){
			
		    this.boxBtn=null;

			GameIconUI.__super.call(this);
		}

		CLASS$(GameIconUI,'ui.GameHall.GameIconUI',_super);
		var __proto__=GameIconUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameIconUI.uiView);
		}

		STATICATTR$(GameIconUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":300,"height":300},"child":[{"type":"Box","props":{"y":150,"x":150,"var":"boxBtn","runtime":"ScaleButton","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":14,"x":7,"skin":"gameHall/di_off.png","name":"imgBottom"}},{"type":"Image","props":{"y":0,"x":0,"width":255,"skin":"gameHall/suoha.png","name":"imgIcon","height":255}},{"type":"Label","props":{"y":205,"x":94,"width":69,"text":"梭哈","name":"lblName","height":35,"fontSize":20,"font":"Microsoft YaHei","color":"#ffda5b","align":"center"}},{"type":"Image","props":{"y":46,"x":202,"skin":"gameHall/new.png","name":"imgNew"}},{"type":"Image","props":{"y":103,"x":-10,"visible":false,"skin":"gameHall/weihu.png","name":"iconMaintain"}}]}]};}
		]);
		return GameIconUI;
	})(View);
var JackpotUI=(function(_super){
		function JackpotUI(){
			

			JackpotUI.__super.call(this);
		}

		CLASS$(JackpotUI,'ui.GameHall.JackpotUI',_super);
		var __proto__=JackpotUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(JackpotUI.uiView);
		}

		STATICATTR$(JackpotUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":200,"height":100},"child":[{"type":"Image","props":{"y":48,"x":46,"skin":"common/caijin.png","name":"imgJackpot","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":22,"x":88,"text":"彩金","strokeColor":"#000000","skin":"common/label.png","name":"handsel","fontSize":15,"font":"Microsoft YaHei","color":"#ffda5b"}},{"type":"Label","props":{"y":56,"x":135,"text":"00000000","strokeColor":"#000000","skin":"common/label.png","name":"value","fontSize":25,"font":"impact","color":"#ffda5b","anchorY":0.5,"anchorX":0.5}}]};}
		]);
		return JackpotUI;
	})(View);
var GameRoomTopUI=(function(_super){
		function GameRoomTopUI(){
			
		    this.boxNotice=null;
		    this.recharge=null;
		    this.gmBtn=null;
		    this.musicBtn=null;

			GameRoomTopUI.__super.call(this);
		}

		CLASS$(GameRoomTopUI,'ui.GameRoomTopUI',_super);
		var __proto__=GameRoomTopUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameRoomTopUI.uiView);
		}

		STATICATTR$(GameRoomTopUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"mouseThrough":true,"height":900},"child":[{"type":"Box","props":{"y":152,"x":904,"width":1188,"var":"boxNotice","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":25,"x":594,"width":1188,"skin":"common/noticeBg.png","sizeGrid":"11,28,16,22","name":"bgScrollNotice","height":50,"anchorY":0.5,"anchorX":0.5}},{"type":"Panel","props":{"y":28,"x":60,"width":1000,"name":"panelScrollNotice","height":30,"anchorY":0.5}}]},{"type":"Box","props":{"y":36,"x":1562,"width":130,"visible":false,"var":"recharge","height":100,"anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":36,"x":1436,"width":90,"visible":false,"var":"gmBtn","runtime":"ScaleButton","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":45,"skin":"common/GM.png","name":"img","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":36,"x":1544,"width":90,"var":"musicBtn","runtime":"ScaleButton","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":45,"skin":"common/chessgame/sound.png","name":"img","anchorY":0.5,"anchorX":0.5}}]}]};}
		]);
		return GameRoomTopUI;
	})(View);
var GameRoomTypeBaseUI=(function(_super){
		function GameRoomTypeBaseUI(){
			
		    this.bgHallGuang=null;
		    this.backBtn=null;
		    this.playExplainBtn=null;
		    this.setingBtn=null;
		    this.boxRedP=null;
		    this.chatBtn=null;
		    this.lblName=null;
		    this.head1=null;
		    this.labelUserMoney=null;
		    this.gameNameEN=null;
		    this.inputYZM=null;
		    this.btnSelectRoom=null;
		    this.btnCreateRoom=null;
		    this.gameNameCH=null;
		    this.boxMyRoom=null;
		    this.btnJoinMyRoom=null;
		    this.btnDeleteMyRoom=null;
		    this.onlineNum=null;
		    this.boxNotice=null;
		    this.playDemoBtn=null;
		    this.gmBtn=null;

			GameRoomTypeBaseUI.__super.call(this);
		}

		CLASS$(GameRoomTypeBaseUI,'ui.GameRoomTypeBaseUI',_super);
		var __proto__=GameRoomTypeBaseUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);
			View.regComponent("CheckButtonC",CheckButtonC);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameRoomTypeBaseUI.uiView);
		}

		STATICATTR$(GameRoomTypeBaseUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":900},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1620,"skin":"common/bg.png","sizeGrid":"2,2,2,2","height":900}},{"type":"Image","props":{"y":0,"x":-2,"width":1620,"skin":"common/bgHall.png","height":900}},{"type":"Image","props":{"var":"bgHallGuang","skin":"common/bgHallGuang.png"}},{"type":"Box","props":{"y":45,"x":53,"width":250,"var":"backBtn","runtime":"ScaleButton","height":250,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":125,"x":125,"skin":"common/back.png","name":"btnIcon","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":619,"x":900,"width":260,"var":"playExplainBtn","runtime":"ScaleButton","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":130,"width":260,"skin":"common/button_yellow1.png","height":47,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":54,"x":130,"text":"玩法说明","height":20,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":37,"x":1274,"width":200,"var":"setingBtn","runtime":"CheckButtonC","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":100,"skin":"common/xitong_off.png","name":"btnIcon","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":18.999999999999773,"x":32,"var":"boxRedP"},"child":[{"type":"Image","props":{"skin":"common/redPoint.png"}},{"type":"Label","props":{"y":2,"x":0,"width":30,"text":"1","strokeColor":"#000000","skin":"common/label.png","name":"lbRedP","height":30,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Label","props":{"y":68,"x":77,"width":45,"text":"系统","strokeColor":"#000000","skin":"common/label.png","name":"lblCheck","height":22,"fontSize":15,"font":"Microsoft YaHei","color":"#929191","align":"center"}}]},{"type":"Box","props":{"y":37,"x":1486,"width":200,"var":"chatBtn","runtime":"CheckButtonC","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":100,"skin":"common/liaotian_off.png","name":"btnIcon","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":68,"x":77,"width":45,"text":"聊天","strokeColor":"#000000","skin":"common/label.png","name":"lblCheck","height":22,"fontSize":15,"font":"Microsoft YaHei","color":"#929191","align":"center"}}]},{"type":"Box","props":{"y":242,"x":140,"name":"userInfo"},"child":[{"type":"Label","props":{"y":4,"x":87,"width":142,"var":"lblName","text":"Name","height":42,"fontSize":30,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":-15,"x":0,"width":220,"skin":"common/white.png","sizeGrid":"2,2,2,2","height":2}},{"type":"Image","props":{"y":3,"x":0,"width":77,"var":"head1","skin":"common/head/headIcon0.png","height":77},"child":[{"type":"Image","props":{"width":52,"visible":false,"skin":"common/shiwan.png","name":"iconShiwan","height":52}}]},{"type":"Label","props":{"y":44,"x":83,"width":144,"var":"labelUserMoney","text":"￥26574","height":35,"fontSize":25,"font":"impact","color":"#ffda5b","align":"left"}},{"type":"Label","props":{"y":-78,"x":-3,"width":210,"var":"gameNameEN","text":"GOLDEN FLOWERS","height":53,"fontSize":50,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":117,"x":0,"width":342,"skin":"common/inputBg.png","sizeGrid":"2,2,2,2","height":59}},{"type":"TextInput","props":{"y":119,"x":2,"width":338,"var":"inputYZM","skin":"common/input.png","promptColor":"#929191","prompt":"输入验证码，和朋友一起玩","height":53,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff","align":"center","sizeGrid":"7,33,7,37"}},{"type":"Box","props":{"y":226,"x":172,"width":349,"var":"btnSelectRoom","runtime":"ScaleButton","height":80,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":40,"x":174.5,"skin":"common/button_yellow1.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":24,"x":111,"width":103,"text":"确定入局","strokeColor":"#000000","skin":"common/label.png","height":22,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":317,"x":176,"width":357,"var":"btnCreateRoom","runtime":"ScaleButton","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":178,"skin":"common/zuju.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":33,"x":126,"width":103,"text":"我要组局","strokeColor":"#000000","skin":"common/label.png","height":22,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","align":"center"}}]},{"type":"Label","props":{"y":-24,"x":226,"width":142,"var":"gameNameCH","text":"诈金花","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}},{"type":"Box","props":{"y":317,"x":176,"width":357,"visible":false,"var":"boxMyRoom","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":10,"x":42,"width":103,"text":"我的房间：","strokeColor":"#000000","skin":"common/label.png","height":22,"fontSize":20,"font":"Microsoft YaHei","color":"#ffda5b","align":"center"}},{"type":"Label","props":{"y":11,"x":152,"width":103,"text":"266545","strokeColor":"#000000","skin":"common/label.png","name":"lblRoomKey","height":22,"fontSize":20,"font":"Microsoft YaHei","color":"#ffda5b","align":"center"}},{"type":"Box","props":{"y":61,"x":79,"width":180,"var":"btnJoinMyRoom","runtime":"ScaleButton","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":90,"skin":"common/button_yellow.png","sizeGrid":"9,47,25,40","scaleY":0.7,"scaleX":0.7,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":34,"x":39,"width":103,"text":"进入","strokeColor":"#000000","skin":"common/label.png","height":22,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":61,"x":269,"width":180,"var":"btnDeleteMyRoom","runtime":"ScaleButton","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":90,"skin":"common/button_red.png","sizeGrid":"9,47,25,40","scaleY":0.7,"scaleX":0.7,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":34,"x":38,"width":103,"text":"删除","strokeColor":"#000000","skin":"common/label.png","height":22,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","align":"center"}}]}]}]},{"type":"Box","props":{"y":620,"x":146,"name":"zaiXianRenShu"},"child":[{"type":"Label","props":{"text":"在线人数：","strokeColor":"#000000","skin":"common/label.png","fontSize":20,"font":"Microsoft YaHei","color":"#929191","align":"left"}},{"type":"Label","props":{"y":2.5,"x":96,"width":0,"var":"onlineNum","text":"245","strokeColor":"#000000","skin":"common/label.png","height":0,"fontSize":20,"font":"impact","color":"#929191","align":"left"}}]},{"type":"Box","props":{"y":88,"x":2,"var":"boxNotice"},"child":[{"type":"Image","props":{"skin":"common/noticeBg.png","name":"bgScrollNotice"}},{"type":"Panel","props":{"y":13,"x":75,"width":789,"name":"panelScrollNotice","height":30}}]},{"type":"Box","props":{"y":619,"x":1230,"width":260,"var":"playDemoBtn","runtime":"ScaleButton","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":130,"width":260,"skin":"common/button_yellow.png","sizeGrid":"9,12,14,35","height":47,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":54,"x":130,"text":"试玩","height":20,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":41,"x":1116,"width":90,"visible":false,"var":"gmBtn","runtime":"ScaleButton","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":45,"skin":"common/GM.png","name":"img","anchorY":0.5,"anchorX":0.5}}]}]};}
		]);
		return GameRoomTypeBaseUI;
	})(View);
var GMDialogUI=(function(_super){
		function GMDialogUI(){
			
		    this.textInput=null;
		    this.boxSend=null;
		    this.boxClose=null;

			GMDialogUI.__super.call(this);
		}

		CLASS$(GMDialogUI,'ui.GMDialogUI',_super);
		var __proto__=GMDialogUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GMDialogUI.uiView);
		}

		STATICATTR$(GMDialogUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"width":600,"skin":"common/bg.png","height":400,"alpha":0.4}},{"type":"TextInput","props":{"y":157,"x":90,"width":400,"var":"textInput","skin":"common/input.png","promptColor":"#929191","prompt":"请输入...","height":40,"fontSize":25,"font":"Microsoft YaHei","color":"#ffffff","sizeGrid":"7,33,7,37"}},{"type":"Box","props":{"y":298,"x":158,"width":200,"var":"boxSend","runtime":"ScaleButton","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":100,"width":200,"skin":"common/button_yellow1.png","sizeGrid":"9,12,14,35","name":"reJoinBtn","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":42,"x":100,"text":"发送","fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":298,"x":439,"width":200,"var":"boxClose","runtime":"ScaleButton","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":100,"width":200,"skin":"common/button_yellow1.png","sizeGrid":"9,12,14,35","name":"reJoinBtn","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":42,"x":100,"text":"取消","fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5}}]}]};}
		]);
		return GMDialogUI;
	})(Dialog);
var GFCompareCardsUI=(function(_super){
		function GFCompareCardsUI(){
			
		    this.bg=null;
		    this.iconC=null;

			GFCompareCardsUI.__super.call(this);
		}

		CLASS$(GFCompareCardsUI,'ui.GoldenFlower.GFCompareCardsUI',_super);
		var __proto__=GFCompareCardsUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GFCompareCardsUI.uiView);
		}

		STATICATTR$(GFCompareCardsUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":900},"child":[{"type":"Image","props":{"y":470,"x":810,"width":1620,"var":"bg","skin":"common/blackBg.png","scaleX":1,"mouseThrough":true,"mouseEnabled":true,"height":300,"anchorY":0.5,"anchorX":0.5,"alpha":0.5}},{"type":"Image","props":{"y":470,"x":810,"var":"iconC","skin":"gfRoom/iconCircle.png","scaleY":0.8,"scaleX":0.8,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":470,"x":810,"width":120,"text":"PK","stroke":1,"name":"pk","height":50,"fontSize":50,"font":"impact","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Box","props":{"y":340,"x":129,"name":"leftPlayer"},"child":[{"type":"Image","props":{"y":128,"x":128,"skin":"common/head/headIcon0.png","name":"head","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"visible":false,"skin":"common/shiwan.png","name":"iconShiwan"}}]},{"type":"Label","props":{"y":-1,"x":294,"width":120,"text":"5","stroke":1,"name":"name","height":40,"fontSize":35,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":253,"x":255,"skin":"gfRoom/bai.png","name":"bai","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":253,"x":255,"skin":"gfRoom/sheng.png","name":"sheng","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":340,"x":1215,"name":"rightPlayer"},"child":[{"type":"Image","props":{"y":128,"x":128,"skin":"common/head/headIcon0.png","name":"head","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"visible":false,"skin":"common/shiwan.png","name":"iconShiwan"}}]},{"type":"Label","props":{"y":-1,"x":-164,"width":120,"text":"5","stroke":1,"name":"name","height":40,"fontSize":35,"font":"impact","color":"#ffffff","align":"right"}},{"type":"Image","props":{"y":254,"x":3,"skin":"gfRoom/bai.png","name":"bai","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":254,"x":3,"skin":"gfRoom/sheng.png","name":"sheng","anchorY":0.5,"anchorX":0.5}}]}]};}
		]);
		return GFCompareCardsUI;
	})(View);
var GFRoomTypeSubUI=(function(_super){
		function GFRoomTypeSubUI(){
			
		    this.blbCurRoomLimit=null;

			GFRoomTypeSubUI.__super.call(this);
		}

		CLASS$(GFRoomTypeSubUI,'ui.GoldenFlower.GFRoomTypeSubUI',_super);
		var __proto__=GFRoomTypeSubUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GFRoomTypeSubUI.uiView);
		}

		STATICATTR$(GFRoomTypeSubUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":900},"child":[{"type":"Label","props":{"y":535,"x":1060,"width":400,"var":"blbCurRoomLimit","text":"最低金额：￥","height":35,"fontSize":20,"font":"Microsoft YaHei","color":"#ffda5b","anchorY":0.5,"anchorX":0.5,"align":"center"}}]};}
		]);
		return GFRoomTypeSubUI;
	})(View);
var GoldenFlowerRoomUI=(function(_super){
		function GoldenFlowerRoomUI(){
			
		    this.animAutoPK=null;
		    this.imgBg=null;
		    this.boxTitle=null;
		    this.pokerDealer=null;
		    this.Antes=null;
		    this.bottomPot=null;
		    this.poolMoney=null;
		    this.txtMaxTurn=null;
		    this.txtCompareTurn=null;
		    this.backBtn=null;
		    this.gameCountdown=null;
		    this.btnControl=null;
		    this.boxAutoPK=null;
		    this.bg=null;
		    this.boxKeyRoom=null;

			GoldenFlowerRoomUI.__super.call(this);
		}

		CLASS$(GoldenFlowerRoomUI,'ui.GoldenFlower.GoldenFlowerRoomUI',_super);
		var __proto__=GoldenFlowerRoomUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleAnim",ScaleAnim);
			View.regComponent("ScaleButton",ScaleButton);
			View.regComponent("Countdown",Countdown);
			View.regComponent("GfPlayerView",GfPlayerView);
			View.regComponent("AnimationSeenCards",AnimationSeenCards);
			View.regComponent("CountdownRect",CountdownRect);
			View.regComponent("CheckButton",CheckButton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GoldenFlowerRoomUI.uiView);
		}

		STATICATTR$(GoldenFlowerRoomUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":900,"fontSize":20},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"imgBg","skin":"gfRoom/bg.png"}},{"type":"Box","props":{"y":-11,"x":680,"width":262,"var":"boxTitle","height":222},"child":[{"type":"Image","props":{"y":0,"x":0,"width":260,"var":"pokerDealer","skin":"common/blackBg.png","sizeGrid":"2,2,2,2","height":134,"alpha":0.8}},{"type":"Image","props":{"y":20,"x":59,"skin":"common/chessgame/poolMoney.png"}},{"type":"Label","props":{"y":69,"x":60,"text":"底注：","stroke":1,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":69,"x":110,"width":115,"var":"Antes","text":"0","stroke":1,"height":22,"fontSize":15,"font":"impact","color":"#ffffff"}},{"type":"Label","props":{"y":94,"x":60,"text":"锅底：","stroke":1,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":94,"x":110,"width":115,"var":"bottomPot","text":"0","stroke":1,"height":22,"fontSize":15,"font":"impact","color":"#ffffff"}},{"type":"Label","props":{"y":25,"x":106,"width":120,"var":"poolMoney","text":"0","stroke":2,"fontSize":25,"font":"impact","color":"#ffda5b","align":"left"}},{"type":"Image","props":{"y":190.99999999999997,"x":-68,"skin":"gfRoom/rulesbg.png"}},{"type":"Box","props":{"y":212,"x":34,"width":203,"runtime":"ScaleAnim","name":"boxMaxRound","height":41,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":18,"x":52,"text":"最大轮:","name":"lbl","height":24,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":19,"x":129,"width":80,"var":"txtMaxTurn","height":24,"fontSize":20,"font":"impact","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":212,"x":231.5,"width":195,"runtime":"ScaleAnim","name":"boxMinRound","height":41,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":18,"x":52,"text":"可比轮:","name":"lbl","height":24,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":19,"x":129,"width":80,"var":"txtCompareTurn","height":24,"fontSize":20,"font":"impact","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]},{"type":"Box","props":{"y":45,"x":53,"width":250,"var":"backBtn","runtime":"ScaleButton","height":250,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":125,"x":125,"skin":"common/back.png","name":"btnIcon","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":322,"x":810,"var":"gameCountdown","runtime":"Countdown","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":267,"text":"1","skin":"common/label.png","name":"txt","height":72,"fontSize":40,"font":"gameStart","color":"#ffe000","bold":true,"anchorY":0,"anchorX":0,"align":"center"}}]},{"type":"Box","props":{"y":37,"x":56,"name":"players","mouseThrough":true},"child":[{"type":"Box","props":{"y":140,"x":1190,"width":335,"runtime":"GfPlayerView","name":"player2","height":186},"child":[{"type":"Image","props":{"skin":"common/chessgame/normal.png","name":"bg"}},{"type":"Image","props":{"y":36,"x":10,"width":103,"skin":"common/head/headIcon0.png","name":"icon","height":103},"child":[{"type":"Image","props":{"width":70,"skin":"common/shiwan.png","name":"iconShiwan","height":70}}]},{"type":"Image","props":{"y":148,"x":9,"skin":"common/chessgame/imgD.png","name":"d"}},{"type":"Box","props":{"y":-5,"x":-64,"name":"compareResult"},"child":[{"type":"Image","props":{"skin":"gfRoom/bai.png","name":"imgResult"}}]},{"type":"Box","props":{"y":58,"x":-64,"width":74,"runtime":"AnimationSeenCards","name":"seenCards","height":73},"child":[{"type":"Image","props":{"y":34,"x":37,"skin":"gfRoom/kanpai.png","name":"icon","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":6,"x":8,"skin":"vip/vip6.png","name":"vip"}},{"type":"Label","props":{"y":5,"x":225,"width":80,"text":"***666","stroke":2,"skin":"common/label.png","name":"name","fontSize":20,"font":"impact","color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":162,"x":83,"width":80,"text":"123456","stroke":2,"skin":"common/label.png","name":"money","height":19,"fontSize":20,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":148,"x":40,"width":60,"text":"准备","skin":"common/label.png","name":"state","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#ffda5b","align":"left"}},{"type":"Box","props":{"y":144,"x":188,"name":"numBg"},"child":[{"type":"Image","props":{"skin":"common/chessgame/numBg.png","sizeGrid":"9,22,11,23"}},{"type":"Label","props":{"y":8,"x":43,"width":63,"text":"200","skin":"common/label.png","name":"txt","height":21,"fontSize":15,"font":"impact","color":"#ffda5b","align":"right"}}]},{"type":"Box","props":{"y":100,"x":-60,"name":"Speak","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"x":124,"skin":"common/chessgame/bgSpeak.png","scaleX":-1}},{"type":"Label","props":{"y":28,"x":-81,"wordWrap":true,"width":180,"text":"加注：10000.00","skin":"common/label.png","name":"talkTxt","height":46,"fontSize":24,"font":"Microsoft YaHei","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":96,"x":173,"width":334,"runtime":"CountdownRect","name":"countdown","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":15,"x":11,"width":39,"visible":false,"text":"60","stroke":2,"skin":"common/label.png","name":"txt","height":35,"fontSize":28,"font":"wordFont","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":96,"x":173,"width":334,"name":"disconnect","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":30,"x":4,"width":107,"skin":"common/blackBg.png","sizeGrid":"2,2,2,2","height":106,"alpha":0.7}},{"type":"Image","props":{"y":85,"x":60,"skin":"common/chessgame/loadingS.png","name":"loading","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":92,"x":169,"width":334,"runtime":"CountdownRect","name":"clock","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":44,"visible":false,"text":"60","skin":"common/label.png","name":"txt","height":39,"fontSize":30,"font":"impact","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":150,"x":40,"skin":"common/chessgame/disconnectTxt.png"}}]},{"type":"Box","props":{"y":-16,"x":313,"name":"SeatN"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"common/sliderAN.png"}},{"type":"Label","props":{"y":10,"x":19,"text":"1","skin":"common/label.png","name":"seatNum","fontSize":15,"font":"impact","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":96,"x":230,"width":220,"runtime":"ScaleButton","name":"btnCompare","height":180,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":80,"x":90,"width":120,"skin":"common/yellowBg.png","sizeGrid":"2,2,2,2","name":"img","height":40,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":80,"x":90,"width":60,"text":"比牌","skin":"common/label.png","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]},{"type":"Box","props":{"y":380,"x":1190,"width":335,"runtime":"GfPlayerView","name":"player1","height":186},"child":[{"type":"Image","props":{"skin":"common/chessgame/normal.png","name":"bg"}},{"type":"Image","props":{"y":36,"x":10,"width":103,"skin":"common/head/headIcon0.png","name":"icon","height":103},"child":[{"type":"Image","props":{"width":70,"skin":"common/shiwan.png","name":"iconShiwan","height":70}}]},{"type":"Box","props":{"y":-5,"x":-64,"name":"compareResult"},"child":[{"type":"Image","props":{"skin":"gfRoom/bai.png","name":"imgResult"}}]},{"type":"Box","props":{"y":58,"x":-64,"width":74,"runtime":"AnimationSeenCards","name":"seenCards","height":73},"child":[{"type":"Image","props":{"y":34,"x":37,"skin":"gfRoom/kanpai.png","name":"icon","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":6,"x":8,"skin":"vip/vip6.png","name":"vip"}},{"type":"Image","props":{"y":148,"x":9,"skin":"common/chessgame/imgD.png","name":"d"}},{"type":"Label","props":{"y":5,"x":225,"width":80,"text":"123456","stroke":2,"skin":"common/label.png","name":"name","fontSize":20,"font":"impact","color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":162,"x":83,"width":80,"text":"123456","skin":"common/label.png","name":"money","height":19,"fontSize":20,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":148,"x":43,"width":60,"text":"准备","stroke":2,"skin":"common/label.png","name":"state","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#ffda5b","align":"left"}},{"type":"Box","props":{"y":144,"x":188,"name":"numBg"},"child":[{"type":"Image","props":{"skin":"common/chessgame/numBg.png","sizeGrid":"9,22,11,23"}},{"type":"Label","props":{"y":8,"x":43,"width":63,"text":"200","skin":"common/label.png","name":"txt","height":21,"fontSize":15,"font":"impact","color":"#ffda5b","align":"right"}}]},{"type":"Box","props":{"y":96,"x":173,"width":334,"runtime":"CountdownRect","name":"countdown","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":15,"x":11,"width":39,"visible":false,"text":"60","stroke":2,"skin":"common/label.png","name":"txt","height":35,"fontSize":28,"font":"wordFont","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":96,"x":173,"width":334,"name":"disconnect","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":31,"x":4,"width":104,"skin":"common/blackBg.png","height":103,"alpha":0.7}},{"type":"Image","props":{"y":85,"x":60,"skin":"common/chessgame/loadingS.png","name":"loading","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":92,"x":169,"width":334,"runtime":"CountdownRect","name":"clock","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":44,"visible":false,"text":"60","skin":"common/label.png","name":"txt","height":39,"fontSize":30,"font":"impact","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":150,"x":40,"skin":"common/chessgame/disconnectTxt.png"}}]},{"type":"Box","props":{"y":-16,"x":314,"name":"SeatN"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"common/sliderAN.png"}},{"type":"Label","props":{"y":10,"x":19,"text":"1","skin":"common/label.png","name":"seatNum","fontSize":15,"font":"impact","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":100,"x":-60,"name":"Speak","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"x":124,"skin":"common/chessgame/bgSpeak.png","scaleX":-1}},{"type":"Label","props":{"y":28,"x":-81,"wordWrap":true,"width":180,"text":"加注：10000.00","skin":"common/label.png","name":"talkTxt","height":46,"fontSize":24,"font":"Microsoft YaHei","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":96,"x":230,"width":220,"runtime":"ScaleButton","name":"btnCompare","height":180,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":80,"x":90,"width":120,"skin":"common/yellowBg.png","sizeGrid":"2,2,2,2","name":"img","height":40,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":80,"x":90,"width":60,"text":"比牌","skin":"common/label.png","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]},{"type":"Box","props":{"y":656,"x":-10,"width":335,"runtime":"GfPlayerView","name":"player0","mouseEnabled":false,"height":186},"child":[{"type":"Image","props":{"skin":"common/chessgame/normal.png","name":"bg"}},{"type":"Image","props":{"y":35,"x":10,"width":103,"skin":"common/head/headIcon0.png","name":"icon","height":103},"child":[{"type":"Image","props":{"width":70,"skin":"common/shiwan.png","name":"iconShiwan","height":70}}]},{"type":"Box","props":{"y":-5,"x":332,"name":"compareResult"},"child":[{"type":"Image","props":{"skin":"gfRoom/bai.png","name":"imgResult"}}]},{"type":"Box","props":{"y":58,"x":332,"width":74,"runtime":"AnimationSeenCards","name":"seenCards","height":73},"child":[{"type":"Image","props":{"y":34,"x":37,"skin":"gfRoom/kanpai.png","name":"icon","anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":5,"x":35,"width":116,"text":"ID：000154","skin":"common/label.png","name":"name","fontSize":20,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":65,"x":130,"width":116,"text":"游戏余额","skin":"common/label.png","height":26,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":88,"x":130,"width":116,"text":"￥12345678","skin":"common/label.png","name":"money","height":26,"fontSize":25,"font":"impact","color":"#ffffff"}},{"type":"Image","props":{"y":6,"x":291,"skin":"vip/vip5.png","name":"vip"}},{"type":"Image","props":{"y":148,"x":10,"skin":"common/chessgame/imgD.png","name":"d"}},{"type":"Label","props":{"y":148,"x":40,"width":40,"text":"准备","skin":"common/label.png","name":"state","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#ffda5b"}},{"type":"Box","props":{"y":144,"x":190,"name":"numBg"},"child":[{"type":"Image","props":{"skin":"common/chessgame/numBg.png","sizeGrid":"9,22,11,23"}},{"type":"Label","props":{"y":8,"x":43,"width":63,"text":"220","skin":"common/label.png","name":"txt","height":21,"fontSize":15,"font":"impact","color":"#ffda5b","align":"right"}}]},{"type":"Box","props":{"y":90,"x":436,"name":"Speak","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"common/chessgame/bgSpeak.png"}},{"type":"Label","props":{"y":28,"x":26,"wordWrap":true,"width":180,"text":"加注：10000.00","skin":"common/label.png","name":"talkTxt","height":44,"fontSize":24,"font":"Microsoft YaHei","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":96,"x":172,"width":334,"runtime":"CountdownRect","name":"countdown","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":15,"x":11,"width":39,"visible":false,"text":"60","stroke":2,"skin":"common/label.png","name":"txt","height":35,"fontSize":28,"font":"wordFont","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":96,"x":172,"width":334,"name":"disconnect","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":31,"x":5,"width":104,"skin":"common/blackBg.png","height":104,"alpha":0.7}},{"type":"Image","props":{"y":85,"x":59,"skin":"common/chessgame/loadingS.png","name":"loading","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":92,"x":169,"width":334,"runtime":"CountdownRect","name":"clock","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":44,"visible":false,"text":"60","skin":"common/label.png","name":"txt","height":39,"fontSize":30,"font":"impact","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":150,"x":40,"skin":"common/chessgame/disconnectTxt.png"}}]},{"type":"Box","props":{"y":-17,"x":-15,"name":"SeatN"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"common/sliderAN.png"}},{"type":"Label","props":{"y":10,"x":19,"text":"1","skin":"common/label.png","name":"seatNum","fontSize":15,"font":"impact","color":"#000000","align":"center"}}]}]},{"type":"Box","props":{"y":140,"x":-20,"width":335,"runtime":"GfPlayerView","name":"player3","height":186},"child":[{"type":"Image","props":{"skin":"common/chessgame/normal.png","name":"bg"}},{"type":"Image","props":{"y":36,"x":10,"width":103,"skin":"common/head/headIcon0.png","name":"icon","height":103},"child":[{"type":"Image","props":{"width":70,"skin":"common/shiwan.png","name":"iconShiwan","height":70}}]},{"type":"Box","props":{"y":-5,"x":332,"name":"compareResult"},"child":[{"type":"Image","props":{"skin":"gfRoom/bai.png","name":"imgResult"}}]},{"type":"Image","props":{"y":6,"x":291,"skin":"vip/vip6.png","name":"vip"}},{"type":"Box","props":{"y":58,"x":332,"width":74,"runtime":"AnimationSeenCards","name":"seenCards","height":73},"child":[{"type":"Image","props":{"y":34,"x":37,"skin":"gfRoom/kanpai.png","name":"icon","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":148,"x":10,"skin":"common/chessgame/imgD.png","name":"d"}},{"type":"Label","props":{"y":5,"x":35,"width":80,"text":"***666","stroke":2,"skin":"common/label.png","name":"name","fontSize":20,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":162,"x":83,"width":80,"text":"123456","stroke":2,"skin":"common/label.png","name":"money","height":19,"fontSize":20,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":148,"x":40,"width":60,"text":"准备","stroke":2,"skin":"common/label.png","name":"state","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#ffda5b","align":"left"}},{"type":"Box","props":{"y":144,"x":198,"name":"numBg"},"child":[{"type":"Image","props":{"skin":"common/chessgame/numBg.png","sizeGrid":"9,22,11,23"}},{"type":"Label","props":{"y":8,"x":43,"width":63,"text":"200","skin":"common/label.png","name":"txt","height":21,"fontSize":15,"font":"impact","color":"#ffda5b","align":"right"}}]},{"type":"Box","props":{"y":90,"x":436,"name":"Speak","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"common/chessgame/bgSpeak.png"}},{"type":"Label","props":{"y":28,"x":26,"wordWrap":true,"width":180,"text":"加注：10000","skin":"common/label.png","name":"talkTxt","height":46,"fontSize":24,"font":"Microsoft YaHei","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":96,"x":172,"width":334,"runtime":"CountdownRect","name":"countdown","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":39,"visible":false,"text":"60","stroke":2,"skin":"common/label.png","name":"txt","height":35,"fontSize":28,"font":"wordFont","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":96,"x":172,"width":334,"name":"disconnect","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":31,"x":5,"width":104,"skin":"common/blackBg.png","height":104,"alpha":0.7}},{"type":"Image","props":{"y":85,"x":59,"skin":"common/chessgame/loadingS.png","name":"loading","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":92,"x":169,"width":334,"runtime":"CountdownRect","name":"clock","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":44,"visible":false,"text":"60","skin":"common/label.png","name":"txt","height":39,"fontSize":30,"font":"impact","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":150,"x":40,"skin":"common/chessgame/disconnectTxt.png"}}]},{"type":"Box","props":{"y":-17,"x":-16,"name":"SeatN"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"common/sliderAN.png"}},{"type":"Label","props":{"y":10,"x":19,"text":"1","skin":"common/label.png","name":"seatNum","fontSize":15,"font":"impact","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":96,"x":230,"width":220,"runtime":"ScaleButton","name":"btnCompare","height":180,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":80,"x":90,"width":120,"skin":"common/yellowBg.png","sizeGrid":"2,2,2,2","name":"img","height":40,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":80,"x":90,"width":60,"text":"比牌","skin":"common/label.png","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]},{"type":"Box","props":{"y":380,"x":-20,"width":335,"runtime":"GfPlayerView","name":"player4","height":186},"child":[{"type":"Image","props":{"skin":"common/chessgame/normal.png","name":"bg"}},{"type":"Image","props":{"y":36,"x":10,"width":103,"skin":"common/head/headIcon0.png","name":"icon","height":103},"child":[{"type":"Image","props":{"width":70,"skin":"common/shiwan.png","name":"iconShiwan","height":70}}]},{"type":"Box","props":{"y":-5,"x":332,"name":"compareResult"},"child":[{"type":"Image","props":{"skin":"gfRoom/bai.png","name":"imgResult"}}]},{"type":"Box","props":{"y":58,"x":332,"width":74,"runtime":"AnimationSeenCards","name":"seenCards","height":73},"child":[{"type":"Image","props":{"y":34,"x":37,"skin":"gfRoom/kanpai.png","name":"icon","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":6,"x":291,"skin":"vip/vip6.png","name":"vip"}},{"type":"Image","props":{"y":148,"x":10,"skin":"common/chessgame/imgD.png","name":"d"}},{"type":"Label","props":{"y":5,"x":35,"width":80,"text":"123456","stroke":2,"skin":"common/label.png","name":"name","fontSize":20,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":162,"x":83,"width":80,"text":"123456","stroke":2,"skin":"common/label.png","name":"money","height":19,"fontSize":20,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":148,"x":40,"width":60,"text":"思考中","stroke":2,"skin":"common/label.png","name":"state","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#ffda5b","align":"left"}},{"type":"Box","props":{"y":144,"x":198,"name":"numBg"},"child":[{"type":"Image","props":{"skin":"common/chessgame/numBg.png","sizeGrid":"9,22,11,23"}},{"type":"Label","props":{"y":8,"x":43,"width":63,"text":"200","skin":"common/label.png","name":"txt","height":21,"fontSize":15,"font":"impact","color":"#ffda5b","align":"right"}}]},{"type":"Box","props":{"y":90,"x":436,"name":"Speak","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"common/chessgame/bgSpeak.png"}},{"type":"Label","props":{"y":28,"x":26,"wordWrap":true,"width":180,"text":"加注：10000","skin":"common/label.png","name":"talkTxt","height":46,"fontSize":24,"font":"Microsoft YaHei","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":96,"x":172,"width":334,"runtime":"CountdownRect","name":"countdown","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":15,"x":11,"width":39,"visible":false,"text":"60","stroke":2,"skin":"common/label.png","name":"txt","height":35,"fontSize":28,"font":"wordFont","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":96,"x":172,"width":334,"name":"disconnect","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":30,"x":5,"width":104,"skin":"common/blackBg.png","height":104,"alpha":0.7}},{"type":"Image","props":{"y":88,"x":59,"width":63,"skin":"common/chessgame/loadingS.png","name":"loading","height":62,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":150,"x":40,"skin":"common/chessgame/disconnectTxt.png"}},{"type":"Box","props":{"y":92,"x":169,"width":334,"runtime":"CountdownRect","name":"clock","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":44,"visible":false,"text":"60","skin":"common/label.png","name":"txt","height":39,"fontSize":30,"font":"impact","color":"#ffffff","align":"center"}}]}]},{"type":"Box","props":{"y":-17,"x":-16,"name":"SeatN"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"common/sliderAN.png"}},{"type":"Label","props":{"y":10,"x":19,"text":"1","skin":"common/label.png","name":"seatNum","fontSize":15,"font":"impact","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":96,"x":230,"width":220,"runtime":"ScaleButton","name":"btnCompare","height":180,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":80,"x":90,"width":120,"skin":"common/yellowBg.png","sizeGrid":"2,2,2,2","name":"img","height":40,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":80,"x":90,"width":60,"text":"比牌","skin":"common/label.png","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]}]},{"type":"Box","props":{"y":744.4,"x":330.5,"name":"btns"},"child":[{"type":"Box","props":{"y":56.60000000000002,"x":-0.5,"var":"btnControl"},"child":[{"type":"Box","props":{"y":-5,"x":121.875,"width":720,"name":"intelligenceBtn","height":95},"child":[{"type":"Box","props":{"y":48.5,"x":120,"width":222,"runtime":"CheckButton","name":"dropCardBtn","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":111,"skin":"common/button_yellow2.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":50,"x":111,"skin":"common/button_blue.png","sizeGrid":"9,12,14,35","name":"btnNormal","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":55,"x":111,"width":134,"text":"弃牌","skin":"common/label.png","name":"txt","height":39,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48.5,"x":600,"width":222,"runtime":"CheckButton","name":"followAwaysBtn","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":111,"skin":"common/button_yellow2.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":50,"x":111,"skin":"common/button_blue.png","sizeGrid":"9,12,14,35","name":"btnNormal","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":55,"x":111,"width":134,"text":"一律跟注","skin":"common/label.png","name":"txt","height":39,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48.5,"x":361,"width":222,"runtime":"CheckButton","name":"followBtn","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":111,"skin":"common/button_yellow2.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":50,"x":111,"skin":"common/button_blue.png","sizeGrid":"9,12,14,35","name":"btnNormal","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":55,"x":111,"width":134,"text":"跟注","skin":"common/label.png","name":"txt","height":39,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]},{"type":"Box","props":{"x":0,"width":959,"visible":false,"name":"speekBtn","height":96},"child":[{"type":"Box","props":{"y":48,"x":382,"width":210,"runtime":"ScaleButton","name":"followBtn","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":105,"skin":"common/button_yellow.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":47,"x":104,"width":200,"text":"跟注 (0.00)","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48,"x":165,"width":210,"runtime":"ScaleButton","name":"dropBtn","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":105,"skin":"common/button_yellow.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":47,"x":105,"width":134,"text":"弃牌","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48,"x":599,"width":210,"runtime":"ScaleButton","name":"compareBtn","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":105,"skin":"common/button_yellow.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":47,"x":105,"width":134,"text":"比牌","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48,"x":816,"width":210,"runtime":"ScaleButton","name":"reraiseBtn","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":105,"skin":"common/button_red.png","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":47,"x":105,"width":134,"text":"加注","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]},{"type":"Panel","props":{"y":-22,"x":706,"width":476,"name":"panelTask","height":70}},{"type":"Box","props":{"y":-70,"x":481,"width":260,"runtime":"ScaleButton","name":"showCardsBtn","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":130,"width":220,"skin":"common/bg.png","sizeGrid":"2,2,2,2","height":50,"anchorY":0.5,"anchorX":0.5,"alpha":0.85}},{"type":"Label","props":{"y":48,"x":130,"width":134,"text":"点击看牌","skin":"common/label.png","name":"txt","height":30,"fontSize":25,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":14,"x":487,"width":350,"visible":false,"runtime":"ScaleButton","name":"ChangeRoomBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":169,"skin":"common/button_yellow1.png","sizeGrid":"9,12,14,35","name":"reJoinBtn","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":52,"x":169,"text":"换桌","fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":13,"x":1184,"runtime":"ScaleButton","name":"taskBtn","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"common/yellowC.png","scaleY":0.8,"scaleX":0.8}},{"type":"Label","props":{"y":42,"x":31,"width":78,"text":"任务","skin":"common/label.png","height":38,"fontSize":25,"font":"Microsoft YaHei","color":"#000000","align":"center"}},{"type":"Label","props":{"y":74,"x":29,"width":78,"text":"2/5","skin":"common/label.png","name":"lbTaskProgress","height":38,"fontSize":25,"font":"impact","color":"#000000","align":"center"}}]}]}]},{"type":"Box","props":{"y":435.5,"x":747.5,"name":"settlementing"},"child":[{"type":"Image","props":{"skin":"common/chessgame/numBg.png","sizeGrid":"9,22,11,23"}},{"type":"Label","props":{"y":8,"x":29,"width":88,"text":"结算中...","skin":"common/label.png","name":"txt","height":21,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]},{"type":"Box","props":{"y":268,"x":1136,"name":"taskView"},"child":[{"type":"Image","props":{"width":485,"skin":"common/blackBg.png","sizeGrid":"2,2,2,2","height":438,"alpha":0.85}},{"type":"Label","props":{"y":200,"x":210,"text":"暂无任务","name":"lblNone","fontSize":15,"font":"Microsoft YaHei","color":"#ffffff","align":"right"}},{"type":"List","props":{"y":39,"x":33,"name":"lstTask"},"child":[{"type":"Box","props":{"name":"render"},"child":[{"type":"Label","props":{"y":11,"x":5,"width":203,"text":"完成梭哈游戏3盘 2/5","name":"lbContent","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":11,"x":261,"width":74,"text":"￥123","name":"lbReward","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":2,"x":362,"skin":"setting/rwWancheng2.png","name":"iconComplated"}}]}]}]},{"type":"Box","props":{"y":309.5,"x":0,"width":1620,"var":"boxAutoPK","height":303},"compId":726,"child":[{"type":"Image","props":{"y":151,"x":810,"width":1620,"var":"bg","skin":"common/blackBg.png","sizeGrid":"2,2,2,2","height":303,"anchorY":0.5,"anchorX":0.5,"alpha":0.85},"compId":725},{"type":"Label","props":{"y":144,"x":810,"text":"系统自动开牌","fontSize":25,"font":"Microsoft YaHei","color":"#ffda5b","anchorY":0.5,"anchorX":0.5},"compId":727}]},{"type":"Box","props":{"y":21,"x":110,"visible":false,"var":"boxKeyRoom"},"child":[{"type":"Label","props":{"text":"房间编号：","strokeColor":"#000000","skin":"common/label.png","fontSize":20,"font":"Microsoft YaHei","color":"#929191","align":"left"}},{"type":"Label","props":{"y":30,"x":0,"text":"54654634","strokeColor":"#000000","skin":"common/label.png","name":"lblKey","fontSize":20,"font":"impact","color":"#929191","align":"left"}}]}],"animations":[{"nodes":[{"target":725,"keyframes":{"scaleX":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":725,"key":"scaleX","index":0},{"value":1,"tweenMethod":"bounceInOut","tween":true,"target":725,"key":"scaleX","index":20}]}},{"target":727,"keyframes":{"visible":[{"value":false,"tweenMethod":"linearNone","tween":false,"target":727,"key":"visible","index":0},{"value":true,"tweenMethod":"linearNone","tween":false,"target":727,"key":"visible","index":10}]}},{"target":726,"keyframes":{"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":726,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":726,"key":"alpha","index":60},{"value":0,"tweenMethod":"linearNone","tween":true,"target":726,"key":"alpha","index":70}]}}],"name":"animAutoPK","id":1,"frameRate":60,"action":0}]};}
		]);
		return GoldenFlowerRoomUI;
	})(View);
var HintMessageUI=(function(_super){
		function HintMessageUI(){
			

			HintMessageUI.__super.call(this);
		}

		CLASS$(HintMessageUI,'ui.HintMessageUI',_super);
		var __proto__=HintMessageUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(HintMessageUI.uiView);
		}

		STATICATTR$(HintMessageUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":283,"height":52},"child":[{"type":"Image","props":{"y":9,"x":0,"width":283,"skin":"common/blackBg.png","sizeGrid":"2,2,2,2","name":"bg","height":34,"alpha":0.85}},{"type":"Label","props":{"y":17,"x":-13,"width":308,"text":"服务器断开连接","skin":"common/label.png","name":"txt","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#ffda5b","align":"center"}}]};}
		]);
		return HintMessageUI;
	})(View);
var HistoryRecordUI=(function(_super){
		function HistoryRecordUI(){
			
		    this.comboGameType=null;

			HistoryRecordUI.__super.call(this);
		}

		CLASS$(HistoryRecordUI,'ui.HistoryRecordUI',_super);
		var __proto__=HistoryRecordUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);
			View.regComponent("ScaleImage",ScaleImage);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(HistoryRecordUI.uiView);
		}

		STATICATTR$(HistoryRecordUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":900},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1620,"skin":"common/bg.png","sizeGrid":"1,1,1,1","height":900}},{"type":"Image","props":{"y":133,"x":19,"width":1582,"skin":"common/gray_dark.png","sizeGrid":"1,1,1,1","height":51}},{"type":"Label","props":{"y":104,"x":19,"width":133,"text":"最近10条记录","strokeColor":"#000000","skin":"common/label.png","height":32,"fontSize":20,"font":"Microsoft YaHei","color":"#929191","align":"right"}},{"type":"Box","props":{"y":45,"x":53,"width":250,"runtime":"ScaleButton","name":"backBtn","height":250,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":125,"x":125,"skin":"common/back.png","runtime":"ScaleImage","name":"btnIcon","anchorY":0.5,"anchorX":0.5}}]},{"type":"ComboBox","props":{"y":85,"x":1448,"width":129,"var":"comboGameType","skin":"common/combobox.png","sizeGrid":"4,38,6,32","labelSize":20,"labelPadding":"-2,0,0,2","labelFont":"Microsoft YaHei","itemSize":22,"height":36}},{"type":"Label","props":{"y":20,"x":739,"text":"历史记录","fontSize":35,"font":"Microsoft YaHei","color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":150,"x":120,"width":50,"text":"时间","strokeColor":"#000000","skin":"common/label.png","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#929191","align":"center"}},{"type":"Label","props":{"y":150,"x":570,"width":50,"text":"注单号","strokeColor":"#000000","skin":"common/label.png","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#929191","align":"center"}},{"type":"Label","props":{"y":150,"x":1077,"width":50,"text":"类型","strokeColor":"#000000","skin":"common/label.png","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#929191","align":"center"}},{"type":"Label","props":{"y":150,"x":1340,"width":50,"text":"金额","strokeColor":"#000000","skin":"common/label.png","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#929191","align":"center"}},{"type":"Label","props":{"y":150,"x":1500,"width":50,"text":"输赢","strokeColor":"#000000","skin":"common/label.png","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#929191","align":"center"}}]};}
		]);
		return HistoryRecordUI;
	})(View);
var HistoryRecordCellUI=(function(_super){
		function HistoryRecordCellUI(){
			

			HistoryRecordCellUI.__super.call(this);
		}

		CLASS$(HistoryRecordCellUI,'ui.HistoryRecordCellUI',_super);
		var __proto__=HistoryRecordCellUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);
			View.regComponent("ScaleImage",ScaleImage);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(HistoryRecordCellUI.uiView);
		}

		STATICATTR$(HistoryRecordCellUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1580,"height":68},"child":[{"type":"Image","props":{"y":67,"x":0,"width":1580,"skin":"common/lineImg.png","name":"single","height":1}},{"type":"Label","props":{"y":21,"x":40,"width":351,"text":"2016/6/21 14:30:24","name":"time","height":33,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":21,"x":337,"width":523,"text":"12345678945613456789132","name":"ID","height":33,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":21,"x":917,"width":318,"text":"斗地主/红钻","name":"type","height":33,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Box","props":{"y":35,"x":20,"width":100,"runtime":"ScaleButton","name":"btnReview","height":60,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":30,"x":50,"skin":"common/replay.png","sizeGrid":"9,12,14,35","runtime":"ScaleImage","anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":21,"x":1232,"width":194,"text":"1000000.00","name":"money","height":33,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":21,"x":1435,"width":146,"text":"输","name":"result","height":33,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]};}
		]);
		return HistoryRecordCellUI;
	})(View);
var HowToPlayUI=(function(_super){
		function HowToPlayUI(){
			
		    this.panelContent=null;
		    this.playContent=null;
		    this.head0=null;
		    this.head1=null;
		    this.head2=null;
		    this.head3=null;
		    this.backBtn=null;
		    this.btnDown=null;
		    this.btnUp=null;
		    this.lbNumIndex=null;

			HowToPlayUI.__super.call(this);
		}

		CLASS$(HowToPlayUI,'ui.HowToPlayUI',_super);
		var __proto__=HowToPlayUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);
			View.regComponent("ScaleImage",ScaleImage);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(HowToPlayUI.uiView);
		}

		STATICATTR$(HowToPlayUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":900},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1620,"skin":"common/blackBg.png","sizeGrid":"2,2,2,2","height":900,"alpha":0.85}},{"type":"Panel","props":{"y":14,"x":30,"width":1565,"var":"panelContent","height":805},"child":[{"type":"Label","props":{"width":1000,"var":"playContent","strokeColor":"#000000","skin":"template/文本框/label.png","height":41,"fontSize":25,"font":"wordFont","color":"#af9e27","bold":true,"anchorX":0}},{"type":"Image","props":{"x":-1550,"var":"head0"}},{"type":"Image","props":{"var":"head1"}},{"type":"Image","props":{"x":1550,"var":"head2"}},{"type":"Image","props":{"x":3100,"var":"head3"}}]},{"type":"Box","props":{"y":846,"x":803,"width":349,"var":"backBtn","runtime":"ScaleButton","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":174.5,"skin":"common/button_yellow1.png","sizeGrid":"9,12,14,35","runtime":"ScaleImage","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":52,"x":177,"text":"我知道了","height":20,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":400,"x":36,"width":150,"var":"btnDown","runtime":"ScaleButton","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":75,"skin":"common/up.png","rotation":-90,"name":"btnIcon","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":400,"x":1592,"width":150,"var":"btnUp","runtime":"ScaleButton","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":75,"skin":"common/up.png","rotation":90,"name":"btnIcon","anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":779,"x":787,"var":"lbNumIndex","text":"1/4","height":20,"fontSize":20,"font":"Microsoft YaHei","color":"#929191","anchorY":0.5,"anchorX":0.5,"align":"center"}}]};}
		]);
		return HowToPlayUI;
	})(View);
var LoadingUI=(function(_super){
		function LoadingUI(){
			
		    this.progress=null;
		    this.lblTips=null;

			LoadingUI.__super.call(this);
		}

		CLASS$(LoadingUI,'ui.LoadingUI',_super);
		var __proto__=LoadingUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(LoadingUI.uiView);
		}

		STATICATTR$(LoadingUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":900},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1620,"skin":"loading/bg.png","sizeGrid":"2,2,2,2","name":"bg","mouseThrough":false,"mouseEnabled":true,"height":900}},{"type":"Label","props":{"y":496,"x":766,"width":120,"var":"progress","text":"99%","skin":"common/label.png","height":45,"fontSize":40,"font":"impact","color":"#ffda5b","align":"center"}},{"type":"Label","props":{"y":572,"x":821,"wordWrap":true,"width":800,"var":"lblTips","skin":"common/label.png","height":50,"fontSize":30,"font":"Microsoft YaHei","color":"#ffda5b","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Box","props":{"y":407,"x":818,"width":108,"name":"icon","height":108,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":54,"x":54,"width":120,"skin":"loading/jeBg.png","scaleY":1.5,"scaleX":1.5,"height":120,"anchorY":0.5,"anchorX":0.5}}]}]};}
		]);
		return LoadingUI;
	})(View);
var LoginUI=(function(_super){
		function LoginUI(){
			
		    this.loginBtn=null;
		    this.UserName=null;
		    this.Password=null;
		    this.listAddressBox=null;
		    this.ip=null;
		    this.imgLight0=null;
		    this.imgLight1=null;
		    this.imgLight2=null;
		    this.imgLight3=null;
		    this.imgLight4=null;
		    this.informalBtn=null;
		    this.forceBg=null;
		    this.reConnectBtn=null;

			LoginUI.__super.call(this);
		}

		CLASS$(LoginUI,'ui.LoginUI',_super);
		var __proto__=LoginUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(LoginUI.uiView);
		}

		STATICATTR$(LoginUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":900},"child":[{"type":"Image","props":{"y":0,"x":1,"skin":"login/background.png"}},{"type":"Box","props":{"y":681,"x":690,"var":"loginBtn","runtime":"ScaleButton","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"login/down.png"}}]},{"type":"TextInput","props":{"y":492,"x":584,"width":464,"var":"UserName","skin":"common/input.png","promptColor":"#929191","prompt":"用户名","height":56,"fontSize":32,"font":"Microsoft YaHei","color":"#ffffff","sizeGrid":"7,33,7,37"}},{"type":"TextInput","props":{"y":553,"x":584,"width":464,"var":"Password","type":"password","skin":"common/input.png","promptColor":"#929191","prompt":"密码","height":56,"fontSize":32,"font":"Microsoft YaHei","color":"#ffffff","asPassword":true,"sizeGrid":"7,33,7,37"}},{"type":"ComboBox","props":{"y":687,"x":1280,"width":200,"visibleNum":20,"var":"listAddressBox","skin":"common/combobox.png","sizeGrid":"4,20,4,4","selectedIndex":0,"labelSize":18,"itemSize":18,"height":26}},{"type":"TextInput","props":{"y":788,"x":1218,"width":397,"var":"ip","skin":"common/input.png","prompt":"服务器ip地址","height":50,"fontSize":36,"font":"Microsoft YaHei","color":"#ffffff","sizeGrid":"7,33,7,37"}},{"type":"Image","props":{"y":-127,"x":130,"var":"imgLight0","skin":"login/deng1.png","rotation":35}},{"type":"Image","props":{"y":-57,"x":264,"var":"imgLight1","skin":"login/deng2.png","rotation":55}},{"type":"Image","props":{"y":-57,"x":338,"var":"imgLight2","skin":"login/deng2.png","rotation":78}},{"type":"Image","props":{"y":79,"x":1681,"var":"imgLight3","skin":"login/deng2.png","rotation":130}},{"type":"Image","props":{"y":3,"x":1584,"var":"imgLight4","skin":"login/deng2.png","rotation":100}},{"type":"Box","props":{"y":681,"x":940,"var":"informalBtn","runtime":"ScaleButton","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"login/shiwan.png"}}]},{"type":"Box","props":{"y":468,"x":472,"var":"forceBg"},"child":[{"type":"Image","props":{"skin":"login/forceT.png"}},{"type":"Label","props":{"y":230,"x":261,"width":25,"text":"1","skin":"common/label.png","name":"txt","height":27,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":230,"x":289,"width":180,"text":"秒后关闭页面","skin":"common/label.png","height":27,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}},{"type":"Box","props":{"y":361,"x":350,"width":210,"var":"reConnectBtn","runtime":"ScaleButton","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":105,"skin":"common/button_yellow.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":47,"x":105,"width":134,"text":"尝试重连","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]}]};}
		]);
		return LoginUI;
	})(View);
var MessageBoxUI=(function(_super){
		function MessageBoxUI(){
			
		    this.bg=null;
		    this.boxContent=null;
		    this.boxTip=null;
		    this.textContent=null;

			MessageBoxUI.__super.call(this);
		}

		CLASS$(MessageBoxUI,'ui.MessageBoxUI',_super);
		var __proto__=MessageBoxUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(MessageBoxUI.uiView);
		}

		STATICATTR$(MessageBoxUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":303},"child":[{"type":"Image","props":{"y":151,"x":810,"width":1620,"var":"bg","skin":"common/blackBg.png","sizeGrid":"2,2,2,2","height":303,"anchorY":0.5,"anchorX":0.5,"alpha":0.85}},{"type":"Box","props":{"y":150,"x":810,"width":708,"var":"boxContent","height":300,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Box","props":{"y":229.99999999999994,"x":168,"width":349,"runtime":"ScaleButton","name":"okBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":174.5,"skin":"common/button_yellow1.png","sizeGrid":"9,12,14,35","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":53,"x":174.5,"text":"确认","fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":230,"x":537,"width":349,"runtime":"ScaleButton","name":"cancelBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":174.5,"skin":"common/button_yellow1.png","sizeGrid":"9,12,14,35","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":53,"x":174.5,"text":"取消","fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":90,"x":352,"var":"boxTip","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"width":705,"skin":"common/yellowBg.png","sizeGrid":"2,2,2,2","height":183}},{"type":"Label","props":{"y":88.50000000000001,"x":189.9999999999999,"wordWrap":true,"width":452,"var":"textContent","text":"来看决赛了","strokeColor":"#000000","skin":"common/label.png","height":56,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","align":"left"}},{"type":"Image","props":{"y":40.499999999999986,"x":13.999999999999943,"skin":"common/warning.png"}},{"type":"Label","props":{"y":42.49999999999994,"x":141,"text":"温馨提示","fontSize":25,"font":"Microsoft YaHei","color":"#000000"}}]}]}]};}
		]);
		return MessageBoxUI;
	})(View);
var BaseLaPaViewUI=(function(_super){
		function BaseLaPaViewUI(){
			

			BaseLaPaViewUI.__super.call(this);
		}

		CLASS$(BaseLaPaViewUI,'ui.OneArmBandit.LAPA.BaseLaPaViewUI',_super);
		var __proto__=BaseLaPaViewUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(BaseLaPaViewUI.uiView);
		}

		STATICATTR$(BaseLaPaViewUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":900}};}
		]);
		return BaseLaPaViewUI;
	})(View);
var ClassicLaPaPanelUI=(function(_super){
		function ClassicLaPaPanelUI(){
			
		    this.machineBg=null;
		    this.startBtn=null;
		    this.imgPortrait=null;
		    this.lblName=null;
		    this.lblTotalMoney=null;
		    this.lblWinMoney=null;
		    this.lblWin=null;
		    this.lblRwdPoolMoney=null;
		    this.btnBack=null;
		    this.lblBetAmount=null;
		    this.lblMaxBet=null;
		    this.btnMinusBet=null;
		    this.btnPlusBet=null;
		    this.boxSpinInfo=null;
		    this.lblBetInfo=null;
		    this.recharge=null;
		    this.btnMusic=null;
		    this.btnRule=null;

			ClassicLaPaPanelUI.__super.call(this);
		}

		CLASS$(ClassicLaPaPanelUI,'ui.OneArmBandit.LAPA.ClassicLaPaPanelUI',_super);
		var __proto__=ClassicLaPaPanelUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleImage",ScaleImage);
			View.regComponent("ScaleButton",ScaleButton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(ClassicLaPaPanelUI.uiView);
		}

		STATICATTR$(ClassicLaPaPanelUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"x":0,"width":1620,"text":"0","height":900},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1620,"skin":"classic_lapa/di.png","height":900,"anchorY":0}},{"type":"Image","props":{"y":160,"x":310,"width":0,"var":"machineBg","height":0}},{"type":"Box","props":{"y":434,"x":243,"width":1192,"height":58},"child":[{"type":"Image","props":{"y":-255,"x":595,"width":1080,"skin":"classic_lapa/shadow.png","rotation":180,"height":74,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":24.500001165578,"x":43.50000076365461,"skin":"classic_lapa/center.png"}},{"type":"Image","props":{"y":29,"x":25,"width":40,"skin":"common/upDown.png","rotation":90,"height":20,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":28.500001165578,"x":1165.5000007636545,"width":40,"skin":"common/upDown.png","rotation":270,"height":20,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":309,"x":595,"width":1080,"skin":"classic_lapa/shadow.png","height":74,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":751,"x":173,"width":300,"var":"startBtn","skin":"classic_lapa/kaishi.png","runtime":"ScaleImage","height":300,"anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":13,"x":105},"child":[{"type":"Box","props":{"y":-0.9999999999999929},"child":[{"type":"Image","props":{"width":77,"var":"imgPortrait","skin":"common/head/headIcon0.png","height":77}},{"type":"Label","props":{"y":1,"x":87,"width":142,"var":"lblName","text":"Name","height":42,"fontSize":35,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":41,"x":83,"width":25,"text":"￥","height":35,"fontSize":25,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":41,"x":105,"width":144,"var":"lblTotalMoney","text":"23036","height":35,"fontSize":25,"font":"impact","color":"#ffffff","align":"left"}}]},{"type":"Box","props":{"y":2,"x":750,"width":150,"height":68},"child":[{"type":"Image","props":{"y":40,"x":0,"width":150,"skin":"classic_lapa/gonggao.png","height":30},"child":[{"type":"Label","props":{"y":0,"x":0,"width":150,"var":"lblWinMoney","text":"0","height":30,"fontSize":25,"font":"impact","color":"#ffda5b","align":"center"}}]},{"type":"Label","props":{"y":4,"x":41,"width":69,"var":"lblWin","text":"获胜","height":15,"fontSize":20,"font":"Microsoft YaHei","color":"#fbfbfb","align":"center"}}]},{"type":"Box","props":{"y":2.000000000000007,"x":961},"child":[{"type":"Image","props":{"y":40,"x":0,"width":200,"skin":"classic_lapa/gonggao.png","height":30},"child":[{"type":"Label","props":{"y":0,"x":2,"width":200,"var":"lblRwdPoolMoney","text":"123456789","height":30,"fontSize":25,"font":"impact","color":"#ffda5b","align":"center"}}]},{"type":"Label","props":{"y":4,"x":65,"width":76,"text":"累计奖金","height":15,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]}]},{"type":"Box","props":{"y":45,"x":53,"width":200,"var":"btnBack","runtime":"ScaleButton","height":200,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":100,"x":100,"skin":"common/back.png","name":"btnIcon","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":802,"x":298,"width":1086,"skin":"common/blackBg.png","sizeGrid":"2,2,2,2","height":59,"alpha":0.5}},{"type":"Box","props":{"y":805,"x":305,"width":388,"height":53},"child":[{"type":"Image","props":{"y":26.5,"x":196,"width":284,"skin":"common/button_red.png","sizeGrid":"9,12,14,35","height":53,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":19,"x":0,"width":284,"skin":"common/gray_dark.png","height":34},"child":[{"type":"Label","props":{"y":13,"x":140,"width":270,"var":"lblBetAmount","text":"0","overflow":"hidden","height":28,"fontSize":30,"font":"impact","color":"#ffda5b","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Label","props":{"y":-1,"x":116,"width":50,"var":"lblMaxBet","height":22,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":32,"x":45,"width":90,"var":"btnMinusBet","skin":"common/button_yellow.png","sizeGrid":"5,12,15,12","runtime":"ScaleImage","height":68,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":20,"x":45,"text":"-","fontSize":40,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Image","props":{"y":32,"x":340,"width":90,"var":"btnPlusBet","skin":"common/button_yellow.png","sizeGrid":"5,13,14,11","runtime":"ScaleImage","height":68,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":20,"x":45,"text":"+","fontSize":40,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]},{"type":"Box","props":{"y":803,"x":735,"width":650,"height":45},"child":[{"type":"Box","props":{"y":25,"x":380,"width":520,"var":"boxSpinInfo","height":50,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":12,"x":25,"width":550,"var":"lblBetInfo","text":"祝您中奖","overflow":"hidden","height":50,"fontSize":25,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]},{"type":"Box","props":{"y":46,"x":1572,"width":130,"var":"recharge","runtime":"ScaleButton","height":100,"anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":46,"x":1464,"width":90,"var":"btnMusic","runtime":"ScaleButton","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":45,"skin":"common/chessgame/sound.png","name":"img","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":46,"x":1374,"width":90,"var":"btnRule","runtime":"ScaleButton","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":45,"skin":"classic_lapa/rule.png","name":"img","anchorY":0.5,"anchorX":0.5}}]}]};}
		]);
		return ClassicLaPaPanelUI;
	})(View);
var OneArmBanditRoomUI=(function(_super){
		function OneArmBanditRoomUI(){
			
		    this.btnClassicLaPa=null;
		    this.btnBack=null;

			OneArmBanditRoomUI.__super.call(this);
		}

		CLASS$(OneArmBanditRoomUI,'ui.OneArmBandit.OneArmBanditRoomUI',_super);
		var __proto__=OneArmBanditRoomUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(OneArmBanditRoomUI.uiView);
		}

		STATICATTR$(OneArmBanditRoomUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":900},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1620,"skin":"common/bg.png","height":900}},{"type":"Box","props":{"y":231,"x":221,"var":"btnClassicLaPa","runtime":"ScaleButton","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"width":300,"skin":"OneArmBandit/lapa_icon.png","height":300}},{"type":"Image","props":{"y":245,"x":26,"width":250,"skin":"OneArmBandit/lapa_btn.png","height":80}}]},{"type":"Box","props":{"y":45,"x":53,"width":200,"var":"btnBack","runtime":"ScaleButton","height":200,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":100,"x":100,"skin":"common/back.png","name":"btnIcon","anchorY":0.5,"anchorX":0.5}}]}]};}
		]);
		return OneArmBanditRoomUI;
	})(View);
var RoomSelectDlgUI=(function(_super){
		function RoomSelectDlgUI(){
			
		    this.btnClose=null;
		    this.btnLowerLvl=null;
		    this.lblRPMLower=null;
		    this.imgLowerLvl=null;
		    this.lblMinLower=null;
		    this.lblMaxLower=null;
		    this.btnMiddleLvl=null;
		    this.lblRPMMid=null;
		    this.imgMiddleLvl=null;
		    this.lblMinMid=null;
		    this.lblMaxMid=null;
		    this.btnSeniorLvl=null;
		    this.lblRPMSenior=null;
		    this.imgSeniorLvl=null;
		    this.lblMinSenior=null;
		    this.lblMaxSenior=null;

			RoomSelectDlgUI.__super.call(this);
		}

		CLASS$(RoomSelectDlgUI,'ui.OneArmBandit.RoomSelectDlgUI',_super);
		var __proto__=RoomSelectDlgUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleImage",ScaleImage);
			View.regComponent("ScaleButton",ScaleButton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(RoomSelectDlgUI.uiView);
		}

		STATICATTR$(RoomSelectDlgUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":810,"text":"100000","height":580},"child":[{"type":"Image","props":{"y":0,"x":0,"width":810,"skin":"OneArmBandit/room_select_bg.png","height":580}},{"type":"Image","props":{"y":17,"x":734,"var":"btnClose","skin":"OneArmBandit/dlg_close.png","runtime":"ScaleImage"}},{"type":"Box","props":{"y":314,"x":136,"width":234,"var":"btnLowerLvl","runtime":"ScaleButton","height":462,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":32,"x":30,"width":164,"var":"lblRPMLower","text":"10000000","overflow":"hidden","height":33,"fontSize":30,"color":"#a3e5ab","bold":true,"align":"center"}},{"type":"Image","props":{"y":266,"x":122,"width":234,"var":"imgLowerLvl","skin":"OneArmBandit/c_lower.png","height":388,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":392,"x":26,"width":35,"text":"最小注","height":20,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":416,"x":26,"width":35,"text":"最大注","height":20,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":393,"x":130,"var":"lblMinLower","text":"0","fontSize":20,"color":"#eefb91","bold":true}},{"type":"Label","props":{"y":417,"x":130,"var":"lblMaxLower","text":"0","fontSize":20,"color":"#eefb91","bold":true}}]},{"type":"Box","props":{"y":314,"x":401,"width":234,"var":"btnMiddleLvl","runtime":"ScaleButton","height":462,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":32,"x":30,"width":164,"var":"lblRPMMid","text":"10000000","overflow":"hidden","height":33,"fontSize":30,"color":"#a3e5ab","bold":true,"align":"center"}},{"type":"Image","props":{"y":266,"x":119,"width":234,"var":"imgMiddleLvl","skin":"OneArmBandit/c_middle.png","height":388,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":393,"x":22,"width":35,"text":"最小注","height":20,"fontSize":20,"font":"SimHei","color":"#ffffff"}},{"type":"Label","props":{"y":417,"x":22,"width":35,"text":"最大注","height":20,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":394,"x":125,"var":"lblMinMid","text":"0","fontSize":20,"color":"#eefb91","bold":true}},{"type":"Label","props":{"y":418,"x":125,"var":"lblMaxMid","text":"0","fontSize":20,"color":"#eefb91","bold":true}}]},{"type":"Box","props":{"y":316,"x":667,"width":234,"var":"btnSeniorLvl","runtime":"ScaleButton","height":462,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":32,"x":30,"width":164,"var":"lblRPMSenior","text":"10000000","overflow":"hidden","height":33,"fontSize":30,"color":"#a3e5ab","bold":true,"align":"center"}},{"type":"Image","props":{"y":262,"x":118,"width":234,"var":"imgSeniorLvl","skin":"OneArmBandit/c_senior.png","height":388,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":389,"x":21,"width":35,"text":"最小注","height":20,"fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":413,"x":21,"width":35,"text":"最大注","height":20,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":390,"x":128,"var":"lblMinSenior","text":"0","fontSize":20,"color":"#eefb91","bold":true}},{"type":"Label","props":{"y":414,"x":128,"var":"lblMaxSenior","text":"0","fontSize":20,"color":"#eefb91","bold":true}}]}]};}
		]);
		return RoomSelectDlgUI;
	})(Dialog);
var PreGameUI=(function(_super){
		function PreGameUI(){
			

			PreGameUI.__super.call(this);
		}

		CLASS$(PreGameUI,'ui.PreGameUI',_super);
		var __proto__=PreGameUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PreGameUI.uiView);
		}

		STATICATTR$(PreGameUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":900}};}
		]);
		return PreGameUI;
	})(View);
var RandomReqUI=(function(_super){
		function RandomReqUI(){
			
		    this.textInput=null;
		    this.boxAdd=null;
		    this.boxSub=null;
		    this.boxNext=null;
		    this.boxSend=null;
		    this.boxClose=null;
		    this.textTip=null;
		    this.lblCount=null;
		    this.boxRandom=null;

			RandomReqUI.__super.call(this);
		}

		CLASS$(RandomReqUI,'ui.RandomReqUI',_super);
		var __proto__=RandomReqUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(RandomReqUI.uiView);
		}

		STATICATTR$(RandomReqUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":600,"mouseThrough":true,"mouseEnabled":true,"height":400},"child":[{"type":"Image","props":{"width":600,"skin":"common/bg.png","mouseThrough":true,"mouseEnabled":true,"height":400,"alpha":0.4}},{"type":"TextInput","props":{"y":167,"x":6,"width":588,"var":"textInput","skin":"common/input.png","promptColor":"#929191","prompt":"请输入...","height":40,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff","sizeGrid":"7,33,7,37"}},{"type":"Box","props":{"y":69,"x":110,"width":150,"var":"boxAdd","runtime":"ScaleButton","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":75,"width":70,"skin":"common/button_yellow1.png","sizeGrid":"9,12,14,35","name":"reJoinBtn","height":60,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":42,"x":75,"text":"+","height":40,"fontSize":30,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":69,"x":299,"width":150,"var":"boxSub","runtime":"ScaleButton","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":75,"width":70,"skin":"common/button_yellow1.png","sizeGrid":"9,12,14,35","name":"reJoinBtn","height":60,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":42,"x":75,"text":"-","height":40,"fontSize":30,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":299,"x":462,"width":200,"var":"boxNext","runtime":"ScaleButton","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":100,"width":200,"skin":"common/button_yellow1.png","sizeGrid":"9,12,14,35","name":"reJoinBtn","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":42,"x":100,"text":"下一条","fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":300,"x":264,"width":200,"var":"boxSend","runtime":"ScaleButton","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":100,"width":200,"skin":"common/button_yellow1.png","sizeGrid":"9,12,14,35","name":"reJoinBtn","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":42,"x":100,"text":"发送","fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":333,"x":26,"width":100,"var":"boxClose","runtime":"ScaleButton","height":200,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":100,"x":50,"skin":"common/backDown.png","sizeGrid":"9,12,14,35","scaleX":-1,"name":"reJoinBtn","anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":231,"x":97,"width":103,"var":"textTip","text":"连续发送次数：","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#fdfdfd","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":231,"x":183,"width":55,"var":"lblCount","text":"1","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#fdfdfd","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":69,"x":477,"width":150,"var":"boxRandom","runtime":"ScaleButton","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":75,"width":70,"skin":"common/button_yellow1.png","sizeGrid":"9,12,14,35","name":"reJoinBtn","height":60,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":42,"x":75,"text":"手动","name":"label","height":20,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5}}]}]};}
		]);
		return RandomReqUI;
	})(View);
var ReplayBtnsUI=(function(_super){
		function ReplayBtnsUI(){
			
		    this.btnPause=null;
		    this.btnPlay=null;
		    this.btnFast=null;
		    this.listPlayerBox=null;

			ReplayBtnsUI.__super.call(this);
		}

		CLASS$(ReplayBtnsUI,'ui.ReplayBtnsUI',_super);
		var __proto__=ReplayBtnsUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(ReplayBtnsUI.uiView);
		}

		STATICATTR$(ReplayBtnsUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":800,"height":200},"child":[{"type":"Box","props":{"width":800,"height":200},"child":[{"type":"Box","props":{"y":100,"x":260,"width":210,"var":"btnPause","runtime":"ScaleButton","name":"btnPause","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":105,"skin":"common/button_yellow.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":46,"x":121,"skin":"common/pause.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":47,"x":83,"text":"暂停","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":100,"x":260,"width":210,"var":"btnPlay","runtime":"ScaleButton","name":"btnPlay","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":105,"skin":"common/button_yellow.png","sizeGrid":"9,12,14,35","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":46,"x":121,"skin":"common/play.png","sizeGrid":"9,12,14,35","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":47,"x":83,"text":"播放","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":100,"x":570,"width":210,"var":"btnFast","runtime":"ScaleButton","name":"btnFast","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":105,"skin":"common/button_yellow.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":46,"x":111,"skin":"common/fast.png","sizeGrid":"9,12,14,35","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":47,"x":71,"text":"快进","skin":"common/label.png","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":48,"x":144,"text":"x1","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]},{"type":"ComboBox","props":{"y":72,"x":773,"width":200,"visibleNum":10,"visible":false,"var":"listPlayerBox","skin":"common/combobox.png","sizeGrid":"4,20,4,4","selectedIndex":0,"labelSize":22,"labelPadding":"1,0,1,1","itemSize":22,"height":40}}]};}
		]);
		return ReplayBtnsUI;
	})(View);
var ReraiseUI=(function(_super){
		function ReraiseUI(){
			

			ReraiseUI.__super.call(this);
		}

		CLASS$(ReraiseUI,'ui.ReraiseUI',_super);
		var __proto__=ReraiseUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleImage",ScaleImage);
			View.regComponent("ScaleButton",ScaleButton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(ReraiseUI.uiView);
		}

		STATICATTR$(ReraiseUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"stroke":4,"height":280,"fontSize":30,"color":"#ffe400"},"child":[{"type":"Image","props":{"width":1620,"skin":"common/blackBg.png","sizeGrid":"2,2,2,2","height":280,"alpha":0.85}},{"type":"Box","props":{"y":85,"x":1340,"name":"reraiseTxt","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":180,"text":"10000","strokeColor":"#000000","skin":"template/文本框/label.png","name":"txt","height":50,"fontSize":50,"font":"impact","color":"#ffe400","align":"left"}}]},{"type":"Label","props":{"y":23,"x":1252,"width":200,"text":"请确认加注金额","strokeColor":"#000000","skin":"template/文本框/label.png","name":"txt","height":22,"fontSize":20,"font":"Microsoft YaHei","color":"#929191","bold":true,"align":"left"}},{"type":"Image","props":{"y":207,"x":1366,"visible":false,"skin":"showhandRoom/reraise/quxiao.png","runtime":"ScaleImage","name":"cancelBtn","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":115,"x":150,"runtime":"ScaleButton","name":"raise_0","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Box","props":{"y":-4,"x":-26,"scaleY":2.6,"scaleX":3,"name":"boxAnim"}},{"type":"Image","props":{"skin":"showhandRoom/reraise/005.png","name":"normal"}},{"type":"Box","props":{"y":-15,"x":10,"scaleY":1.6,"scaleX":2,"name":"boxAnim2","alpha":0.5}},{"type":"Label","props":{"y":67,"x":49,"width":80,"text":"50","strokeColor":"#000000","skin":"template/文本框/label.png","name":"txt","height":39,"fontSize":25,"font":"impact","color":"#ffe400","align":"center"}}]},{"type":"Box","props":{"y":115,"x":420,"runtime":"ScaleButton","name":"raise_1","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Box","props":{"y":-4,"x":-26,"scaleY":2.6,"scaleX":3,"name":"boxAnim"}},{"type":"Image","props":{"y":-6,"x":0,"skin":"showhandRoom/reraise/006.png","name":"normal"}},{"type":"Box","props":{"y":-15,"x":10,"scaleY":1.6,"scaleX":2,"name":"boxAnim2","alpha":0.5}},{"type":"Label","props":{"y":67,"x":49,"width":80,"text":"100","strokeColor":"#000000","skin":"template/文本框/label.png","name":"txt","height":39,"fontSize":25,"font":"impact","color":"#ffe400","align":"center"}}]},{"type":"Box","props":{"y":115,"x":690,"runtime":"ScaleButton","name":"raise_2","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Box","props":{"y":-4,"x":-26,"scaleY":2.6,"scaleX":3,"name":"boxAnim"}},{"type":"Image","props":{"y":-19,"x":0,"skin":"showhandRoom/reraise/007.png","name":"normal"}},{"type":"Box","props":{"y":-15,"x":10,"scaleY":1.6,"scaleX":2,"name":"boxAnim2","alpha":0.5}},{"type":"Label","props":{"y":67,"x":49,"width":80,"text":"500","strokeColor":"#000000","skin":"template/文本框/label.png","name":"txt","height":39,"fontSize":25,"font":"impact","color":"#ffe400","align":"center"}}]},{"type":"Box","props":{"y":115,"x":960,"runtime":"ScaleButton","name":"raise_3","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Box","props":{"y":-4,"x":-26,"scaleY":2.6,"scaleX":3,"name":"boxAnim"}},{"type":"Image","props":{"y":-33,"x":0,"skin":"showhandRoom/reraise/004.png","name":"normal"}},{"type":"Box","props":{"y":-15,"x":10,"scaleY":1.6,"scaleX":2,"name":"boxAnim2","alpha":0.5}},{"type":"Label","props":{"y":67,"x":49,"width":80,"text":"MAX","strokeColor":"#000000","skin":"template/文本框/label.png","name":"txt","height":39,"fontSize":25,"font":"impact","color":"#ffe400","align":"center"}}]},{"type":"Box","props":{"y":155,"x":110,"width":935,"name":"slider","height":79},"child":[{"type":"Image","props":{"y":54,"x":0,"width":935,"skin":"common/sliderBg.png","name":"bg","height":10}},{"type":"Image","props":{"y":56,"x":1,"width":935,"skin":"common/sliderProgress.png","name":"barBackMask","height":10}},{"type":"Box","props":{"y":65,"width":100,"runtime":"ScaleButton","name":"sliderNodeDown","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":50,"skin":"common/sliderAN.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-39,"x":-36,"skin":"common/sliderTip.png","name":"imgTip"}}]},{"type":"Label","props":{"y":51,"x":-52,"text":"MIN","strokeColor":"#000000","skin":"template/文本框/label.png","name":"txtMinLabel","fontSize":15,"font":"impact","color":"#929191","align":"center"}},{"type":"Label","props":{"y":51,"x":1006,"text":"MAX","strokeColor":"#000000","skin":"template/文本框/label.png","name":"txtMaxLabel","fontSize":15,"font":"impact","color":"#ffe400","align":"center"}}]},{"type":"Label","props":{"y":200,"x":500,"width":80,"visible":false,"text":"看牌后  需要付出双倍金额","strokeColor":"#000000","skin":"template/文本框/label.png","name":"txtTip","height":39,"fontSize":20,"font":"Microsoft YaHei","color":"#ffe400","align":"center"}},{"type":"Box","props":{"y":197,"x":1422,"width":349,"runtime":"ScaleButton","name":"okBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":174.5,"skin":"common/button_yellow1.png","sizeGrid":"9,12,14,35","name":"reJoinBtn","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":54,"x":174.5,"text":"确认","fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5}}]}]};}
		]);
		return ReraiseUI;
	})(View);
var ReraiseVUI=(function(_super){
		function ReraiseVUI(){
			

			ReraiseVUI.__super.call(this);
		}

		CLASS$(ReraiseVUI,'ui.ReraiseVUI',_super);
		var __proto__=ReraiseVUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(ReraiseVUI.uiView);
		}

		STATICATTR$(ReraiseVUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":120,"height":640},"child":[{"type":"Image","props":{"y":10,"x":2,"width":116,"skin":"common/blackBg.png","sizeGrid":"2,2,2,2","height":625,"alpha":0.85}},{"type":"Box","props":{"y":-28,"x":61,"width":180,"name":"reraiseTxt","height":50,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":25,"x":90,"width":180,"text":"ALL IN","strokeColor":"#000000","skin":"template/文本框/label.png","name":"txt","height":50,"fontSize":50,"font":"impact","color":"#ffe400","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":14,"x":60,"width":110,"name":"slider","height":625,"anchorX":0.5},"child":[{"type":"Image","props":{"y":0,"x":50,"width":10,"skin":"common/sliderBg.png","name":"bg","height":625}},{"type":"Image","props":{"y":0,"x":50,"width":10,"skin":"common/sliderProgress.png","name":"barBackMask","height":625}},{"type":"Box","props":{"y":625,"x":55,"width":120,"runtime":"ScaleButton","name":"sliderNodeDown","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":60,"skin":"common/sliderAN.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-39,"x":-36,"visible":false,"skin":"common/sliderTip.png","name":"imgTip"}}]}]}]};}
		]);
		return ReraiseVUI;
	})(View);
var RoomTypeCellUI=(function(_super){
		function RoomTypeCellUI(){
			
		    this.boxCell=null;
		    this.typeImage=null;
		    this.typeText=null;

			RoomTypeCellUI.__super.call(this);
		}

		CLASS$(RoomTypeCellUI,'ui.RoomTypeCellUI',_super);
		var __proto__=RoomTypeCellUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(RoomTypeCellUI.uiView);
		}

		STATICATTR$(RoomTypeCellUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":318,"height":318},"child":[{"type":"Box","props":{"width":318,"var":"boxCell","runtime":"ScaleButton","height":318,"centerY":0.5,"centerX":0.5,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"commonHall/typeBg.png","name":"btnIcon"}},{"type":"Image","props":{"y":137,"x":159,"var":"typeImage","skin":"commonHall/blue.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":243,"x":159,"var":"typeText","skin":"commonHall/vip.png","anchorY":0.5,"anchorX":0.5}}]}]};}
		]);
		return RoomTypeCellUI;
	})(View);
var SetingUI=(function(_super){
		function SetingUI(){
			
		    this.musicBgBtn=null;
		    this.musicEffectBtn=null;
		    this.rollingNoticeBtn=null;
		    this.vibrationEffectBtn=null;
		    this.panelHead=null;
		    this.head0=null;
		    this.head1=null;
		    this.head2=null;
		    this.head3=null;
		    this.backBtn=null;
		    this.btnDown=null;
		    this.btnUp=null;
		    this.lblMoney=null;
		    this.lblName=null;
		    this.boxBtns=null;
		    this.taskBtn=null;
		    this.mailBtn=null;
		    this.historyRecordBtn=null;
		    this.bankBtn=null;

			SetingUI.__super.call(this);
		}

		CLASS$(SetingUI,'ui.SetingUI',_super);
		var __proto__=SetingUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);
			View.regComponent("ScaleImage",ScaleImage);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(SetingUI.uiView);
		}

		STATICATTR$(SetingUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":900},"child":[{"type":"Image","props":{"y":0,"width":1620,"skin":"common/bg.png","sizeGrid":"1,1,1,1","height":900}},{"type":"Image","props":{"y":331,"x":90,"width":272,"skin":"common/gray_dark.png","sizeGrid":"1,1,1,1","height":350,"alpha":0.2}},{"type":"Box","props":{"y":236,"x":433},"child":[{"type":"Box","props":{"y":-60,"x":100},"child":[{"type":"Label","props":{"text":"背景音乐","strokeColor":"#000000","skin":"common/label.png","name":"lbBJYY","fontSize":20,"font":"Microsoft YaHei","color":"#929191","align":"center"}},{"type":"Image","props":{"y":75,"x":-20,"width":900,"skin":"common/lineImg.png","height":1}},{"type":"Box","props":{"y":0,"x":700,"var":"musicBgBtn"},"child":[{"type":"Image","props":{"y":0,"skin":"setting/on.png","name":"btnNormal"}},{"type":"Image","props":{"y":0,"skin":"setting/off.png","name":"btnDown"}},{"type":"Image","props":{"skin":"common/sliderAN.png","name":"imgAN"}}]}]},{"type":"Box","props":{"y":60,"x":100},"child":[{"type":"Label","props":{"text":"游戏音效","strokeColor":"#000000","skin":"common/label.png","fontSize":20,"font":"Microsoft YaHei","color":"#929191","align":"center"}},{"type":"Image","props":{"y":75,"x":-20,"width":900,"skin":"common/lineImg.png","height":1}},{"type":"Box","props":{"y":0,"x":700,"var":"musicEffectBtn","runtime":"ScaleButton"},"child":[{"type":"Image","props":{"y":0,"skin":"setting/on.png","name":"btnNormal"}},{"type":"Image","props":{"y":0,"skin":"setting/off.png","name":"btnDown"}},{"type":"Image","props":{"skin":"common/sliderAN.png","name":"imgAN"}}]}]},{"type":"Box","props":{"y":180,"x":100},"child":[{"type":"Label","props":{"text":"滚动公告","strokeColor":"#000000","skin":"common/label.png","fontSize":20,"font":"Microsoft YaHei","color":"#929191","align":"center"}},{"type":"Image","props":{"y":75,"x":-20,"width":900,"skin":"common/lineImg.png","height":1}},{"type":"Box","props":{"y":0,"x":700,"var":"rollingNoticeBtn"},"child":[{"type":"Image","props":{"y":0,"skin":"setting/on.png","name":"btnNormal"}},{"type":"Image","props":{"y":0,"skin":"setting/off.png","name":"btnDown"}},{"type":"Image","props":{"skin":"common/sliderAN.png","name":"imgAN"}}]}]},{"type":"Box","props":{"y":300,"x":100},"child":[{"type":"Label","props":{"text":"震动效果","strokeColor":"#000000","skin":"common/label.png","fontSize":20,"font":"Microsoft YaHei","color":"#929191","align":"center"}},{"type":"Image","props":{"y":75,"x":-20,"width":900,"skin":"common/lineImg.png","height":1}},{"type":"Box","props":{"y":0,"x":700,"var":"vibrationEffectBtn","disabled":true},"child":[{"type":"Image","props":{"y":0,"skin":"setting/on.png","name":"btnNormal"}},{"type":"Image","props":{"y":0,"skin":"setting/off.png","name":"btnDown"}},{"type":"Image","props":{"skin":"common/sliderAN.png","name":"imgAN"}}]}]}]},{"type":"Panel","props":{"y":380,"x":100,"width":248,"var":"panelHead","height":246},"child":[{"type":"Image","props":{"y":270,"x":4,"width":242,"var":"head0","height":242}},{"type":"Image","props":{"y":0,"x":4,"width":242,"var":"head1","skin":"common/head/headIcon0.png","height":242}},{"type":"Image","props":{"y":-270,"x":4,"width":242,"var":"head2","height":242}},{"type":"Image","props":{"y":-540,"x":4,"width":242,"var":"head3","height":242}}]},{"type":"Box","props":{"y":45,"x":53,"width":250,"var":"backBtn","runtime":"ScaleButton","height":250,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":125,"x":125,"skin":"common/back.png","runtime":"ScaleImage","name":"btnIcon","anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":20,"x":739,"text":"系统设置","fontSize":35,"font":"Microsoft YaHei","color":"#ffffff","align":"right"}},{"type":"Box","props":{"y":658,"x":224,"width":100,"var":"btnDown","runtime":"ScaleButton","height":70,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":35,"x":50,"skin":"common/up.png","rotation":180,"name":"btnIcon","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":346,"x":224,"width":100,"var":"btnUp","runtime":"ScaleButton","height":70,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":35,"x":50,"skin":"common/up.png","name":"btnIcon","anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":257,"x":100,"width":144,"var":"lblMoney","text":"￥26574","height":35,"fontSize":25,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":212,"x":100,"width":142,"var":"lblName","text":"￥","height":42,"fontSize":30,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Box","props":{"y":663.5,"x":462,"width":1000,"var":"boxBtns"},"child":[{"type":"Box","props":{"y":69.5,"x":880,"width":140,"var":"taskBtn","runtime":"ScaleButton","height":140,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":70,"x":70,"skin":"setting/taskInfo.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":136.5,"x":33,"text":"任务信息","fontSize":20,"font":"Microsoft YaHei","color":"#929191","align":"center"}}]},{"type":"Box","props":{"y":69.99999999999989,"x":628,"width":140,"var":"mailBtn","runtime":"ScaleButton","height":140,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":70,"x":70,"skin":"setting/email.png","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":5,"name":"boxMailRedP"},"child":[{"type":"Image","props":{"skin":"common/redPoint.png"}},{"type":"Label","props":{"y":2,"x":0,"width":30,"text":"1","strokeColor":"#000000","skin":"common/label.png","name":"lbMailRedP","height":30,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]},{"type":"Label","props":{"y":136.5000000000001,"x":33,"text":"邮件信息","fontSize":20,"font":"Microsoft YaHei","color":"#929191","align":"center"}}]},{"type":"Box","props":{"y":69.99999999999989,"x":376,"width":140,"var":"historyRecordBtn","runtime":"ScaleButton","height":140,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":70,"x":70,"width":108,"skin":"setting/historyInfo.png","height":108,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":136.9,"x":33,"text":"历史记录","fontSize":20,"font":"Microsoft YaHei","color":"#929191","align":"center"}}]},{"type":"Box","props":{"y":69.99999999999989,"x":126,"width":140,"var":"bankBtn","runtime":"ScaleButton","height":140,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":70,"x":70,"skin":"setting/personalInfo.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":136.5,"x":33,"text":"个人银行","fontSize":20,"font":"Microsoft YaHei","color":"#929191","align":"center"}}]}]}]};}
		]);
		return SetingUI;
	})(View);
var SettlementUI=(function(_super){
		function SettlementUI(){
			
		    this.boxLabels=null;
		    this.listCell=null;
		    this.boxBtns=null;

			SettlementUI.__super.call(this);
		}

		CLASS$(SettlementUI,'ui.SettlementUI',_super);
		var __proto__=SettlementUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);
			View.regComponent("Countdown",Countdown);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(SettlementUI.uiView);
		}

		STATICATTR$(SettlementUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"text":"7","height":1620},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1620,"skin":"common/blackBg.png","sizeGrid":"2,2,2,2","height":1620,"alpha":0.85}},{"type":"Box","props":{"y":110,"x":810,"width":184,"var":"boxLabels","height":75,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":25,"x":85,"width":193,"text":"GUEST","strokeColor":"#000000","skin":"common/label.png","name":"guest","height":50,"fontSize":50,"font":"impact","color":"#FFFFFF","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":25,"x":84.99999999999989,"width":170,"text":"YOU LOSE","strokeColor":"#000000","skin":"common/label.png","name":"lose","fontSize":50,"font":"impact","color":"#929191","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":25,"x":85,"width":193,"text":"YOU WIN","strokeColor":"#000000","skin":"common/label.png","name":"win","height":50,"fontSize":50,"font":"impact","color":"#ffda5b","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"List","props":{"y":414,"x":810,"width":800,"var":"listCell","spaceY":1,"repeatY":5,"height":540,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Box","props":{"name":"render","height":100},"child":[{"type":"Label","props":{"y":48,"x":680,"text":"输","strokeColor":"#000000","skin":"common/label.png","name":"winTxt","fontSize":25,"font":"Microsoft YaHei","color":"#ff8200","align":"center"}},{"type":"Image","props":{"y":22.5,"x":26.000000000000057,"width":11,"skin":"common/yellowBg.png","sizeGrid":"2,2,2,2","name":"self","height":74}},{"type":"Image","props":{"y":22.5,"x":45.999999999999886,"width":77,"skin":"common/head/headIcon0.png","name":"icon","height":77},"child":[{"type":"Image","props":{"width":52,"skin":"common/shiwan.png","name":"iconShiwan","height":52}}]},{"type":"Label","props":{"y":30,"x":132.9999999999999,"text":"210576","strokeColor":"#000000","skin":"common/label.png","name":"name","fontSize":30,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":82,"x":243.99999999999977,"width":233,"visible":false,"text":"￥10000000.00","strokeColor":"#000000","skin":"common/label.png","name":"money","height":32,"fontSize":25,"font":"impact","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"left"}},{"type":"Image","props":{"y":56,"x":476.9999999999999,"scaleY":0.5,"scaleX":0.5,"name":"cardForm","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":50,"x":565.9999999999998,"width":100,"text":"100000.00","strokeColor":"#000000","skin":"common/label.png","name":"winMoneyTxt","fontSize":25,"font":"impact","color":"#ffffff","align":"left"}}]}]},{"type":"Box","props":{"y":772,"x":810,"width":776,"var":"boxBtns","height":112,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Box","props":{"y":60,"x":174,"width":349,"runtime":"ScaleButton","name":"replayBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":169,"skin":"common/button_yellow1.png","sizeGrid":"9,12,14,35","name":"reJoinBtn","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":39,"x":179,"skin":"common/again.png"}},{"type":"Label","props":{"y":54,"x":149.5,"width":40,"text":"重放","height":20,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":60,"x":174.5,"width":349,"runtime":"ScaleButton","name":"changeRoomBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":169,"skin":"common/button_yellow1.png","sizeGrid":"9,12,14,35","name":"reJoinBtn","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":54,"x":174.5,"width":40,"text":"换桌","height":20,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":59.999999999999886,"x":601.4999999999997,"width":349,"runtime":"ScaleButton","name":"okBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":174.5,"skin":"common/button_yellow1.png","sizeGrid":"9,12,14,35","name":"reJoinBtn","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":54,"x":169,"text":"确定","fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":55,"x":228,"width":50,"runtime":"Countdown","name":"countdown","height":50,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":25,"x":25,"text":"10","strokeColor":"#000000","skin":"common/label.png","name":"txt","fontSize":20,"font":"impact","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]}]}]};}
		]);
		return SettlementUI;
	})(View);
var SettlementPlayerCellUI=(function(_super){
		function SettlementPlayerCellUI(){
			

			SettlementPlayerCellUI.__super.call(this);
		}

		CLASS$(SettlementPlayerCellUI,'ui.SettlementPlayerCellUI',_super);
		var __proto__=SettlementPlayerCellUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(SettlementPlayerCellUI.uiView);
		}

		STATICATTR$(SettlementPlayerCellUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":750,"height":75},"child":[{"type":"Label","props":{"y":23,"x":680,"text":"输","strokeColor":"#000000","skin":"common/label.png","name":"winTxt","fontSize":25,"font":"Microsoft YaHei","color":"#ff8200","align":"center"}},{"type":"Image","props":{"y":0,"x":26,"width":11,"skin":"common/yellowBg.png","sizeGrid":"2,2,2,2","name":"self","height":74}},{"type":"Image","props":{"y":-2,"x":46,"width":77,"skin":"common/head/headIcon0.png","name":"icon","height":77},"child":[{"type":"Image","props":{"width":52,"skin":"common/shiwan.png","name":"iconShiwan","height":52}}]},{"type":"Label","props":{"y":6,"x":133,"text":"210576","strokeColor":"#000000","skin":"common/label.png","name":"name","fontSize":30,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":57,"x":244,"width":233,"visible":false,"text":"￥10000000.00","strokeColor":"#000000","skin":"common/label.png","name":"money","height":32,"fontSize":25,"font":"impact","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"left"}},{"type":"Image","props":{"y":32,"x":477,"scaleY":0.15,"scaleX":0.15,"name":"cardForm","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":25,"x":566,"width":100,"text":"100000.00","strokeColor":"#000000","skin":"common/label.png","name":"winMoneyTxt","fontSize":25,"font":"impact","color":"#ffffff","align":"left"}}]};}
		]);
		return SettlementPlayerCellUI;
	})(View);
var CheckCardUI=(function(_super){
		function CheckCardUI(){
			

			CheckCardUI.__super.call(this);
		}

		CLASS$(CheckCardUI,'ui.ShowHand.CheckCardUI',_super);
		var __proto__=CheckCardUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(CheckCardUI.uiView);
		}

		STATICATTR$(CheckCardUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":900},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1620,"skin":"common/blackBg.png","height":900,"alpha":0.8}},{"type":"Image","props":{"y":236,"x":644,"skin":"card/card_clubs_1.png","scaleY":2,"scaleX":2,"name":"bottomCard"}},{"type":"Image","props":{"y":683,"x":819,"skin":"card/card_back.png","scaleY":2,"scaleX":2,"name":"backCard","anchorY":1,"anchorX":0.5}},{"type":"Image","props":{"y":301,"x":668,"skin":"showhandRoom/yindao_jiantou.png","rotation":10,"name":"guide"}},{"type":"Image","props":{"y":358,"x":698,"skin":"showhandRoom/yindao_shou.png","name":"hand"}}]};}
		]);
		return CheckCardUI;
	})(View);
var ShowHandRoomUI=(function(_super){
		function ShowHandRoomUI(){
			
		    this.imgBg=null;
		    this.boxTitle=null;
		    this.pokerDealer=null;
		    this.Antes=null;
		    this.maxBet=null;
		    this.poolMoney=null;
		    this.bottomPot=null;
		    this.gameCountdown=null;
		    this.backBtn=null;
		    this.boxKeyRoom=null;

			ShowHandRoomUI.__super.call(this);
		}

		CLASS$(ShowHandRoomUI,'ui.ShowHand.ShowHandRoomUI',_super);
		var __proto__=ShowHandRoomUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Countdown",Countdown);
			View.regComponent("PlayerView",PlayerView);
			View.regComponent("AllInEffect",AllInEffect);
			View.regComponent("CountdownRect",CountdownRect);
			View.regComponent("CheckButton",CheckButton);
			View.regComponent("ScaleButton",ScaleButton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(ShowHandRoomUI.uiView);
		}

		STATICATTR$(ShowHandRoomUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":900,"fontSize":20},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1620,"var":"imgBg","skin":"showhandRoom/zhuozi.png","height":900}},{"type":"Image","props":{"y":180,"x":510,"skin":"showhandRoom/zi.png"}},{"type":"Box","props":{"y":-11,"x":680,"var":"boxTitle"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":260,"var":"pokerDealer","skin":"common/blackBg.png","sizeGrid":"2,2,2,2","height":149,"alpha":0.8}},{"type":"Image","props":{"y":20,"x":59,"skin":"common/chessgame/poolMoney.png"}},{"type":"Label","props":{"y":69,"x":60,"text":"底注：","stroke":1,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":69,"x":110,"width":115,"var":"Antes","text":"1000","stroke":1,"height":22,"fontSize":15,"font":"impact","color":"#ffffff"}},{"type":"Label","props":{"y":119,"x":60,"text":"顶注：","stroke":1,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":119,"x":110,"width":115,"var":"maxBet","text":"10000","stroke":1,"fontSize":15,"font":"impact","color":"#ffffff"}},{"type":"Label","props":{"y":25,"x":106,"width":120,"var":"poolMoney","text":"200","stroke":2,"fontSize":25,"font":"impact","color":"#ffda5b","align":"left"}},{"type":"Label","props":{"y":94,"x":60,"text":"锅底：","stroke":1,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":94,"x":110,"width":115,"var":"bottomPot","text":"10000","stroke":1,"fontSize":15,"font":"impact","color":"#ffffff"}}]},{"type":"Box","props":{"y":322,"x":810,"var":"gameCountdown","runtime":"Countdown","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":267,"text":"1","skin":"common/label.png","name":"txt","height":72,"fontSize":40,"font":"gameStart","color":"#ffe000","bold":true,"anchorY":0,"anchorX":0,"align":"center"}}]},{"type":"Box","props":{"y":37,"x":56,"name":"players","mouseThrough":true},"child":[{"type":"Box","props":{"y":140,"x":1190,"width":335,"runtime":"PlayerView","name":"player2","mouseThrough":false,"mouseEnabled":false,"height":186},"child":[{"type":"Image","props":{"skin":"common/chessgame/normal.png","name":"bg"}},{"type":"Image","props":{"y":36,"x":10,"width":103,"skin":"common/head/headIcon0.png","name":"icon","height":103},"child":[{"type":"Image","props":{"width":70,"skin":"common/shiwan.png","name":"iconShiwan","height":70}}]},{"type":"Image","props":{"y":7,"x":8,"skin":"vip/vip6.png","name":"vip"}},{"type":"Image","props":{"y":148,"x":9,"skin":"common/chessgame/imgD.png","name":"d"}},{"type":"Label","props":{"y":5,"x":225,"width":80,"text":"***666","stroke":2,"skin":"common/label.png","name":"name","fontSize":20,"font":"impact","color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":162,"x":83,"width":80,"text":"123456","stroke":2,"skin":"common/label.png","name":"money","height":19,"fontSize":20,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":148,"x":40,"width":60,"text":"准备","stroke":2,"skin":"common/label.png","name":"state","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#ffda5b","align":"left"}},{"type":"Box","props":{"y":143,"x":188,"name":"numBg"},"child":[{"type":"Image","props":{"skin":"common/chessgame/numBg.png","sizeGrid":"9,22,11,23"}},{"type":"Label","props":{"y":8,"x":43,"width":63,"text":"200","skin":"common/label.png","name":"txt","height":21,"fontSize":15,"font":"impact","color":"#ffda5b","align":"right"}}]},{"type":"Box","props":{"y":-5,"x":-60,"runtime":"AllInEffect","name":"allIn"},"child":[{"type":"Image","props":{"skin":"showhandRoom/allIn.png","name":"imgAll"}},{"type":"Label","props":{"y":38,"x":31,"width":15,"text":"x2","skin":"common/label.png","name":"txtAllIn","height":12,"fontSize":15,"font":"impact","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":100,"x":-60,"name":"Speak","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"x":124,"skin":"common/chessgame/bgSpeak.png","scaleX":-1}},{"type":"Label","props":{"y":28,"x":-81,"wordWrap":true,"width":180,"text":"加注：100","skin":"common/label.png","name":"talkTxt","height":46,"fontSize":24,"font":"Microsoft YaHei","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":96,"x":173.5,"width":334,"runtime":"CountdownRect","name":"countdown","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":15,"x":11,"width":39,"visible":false,"text":"60","stroke":2,"skin":"common/label.png","name":"txt","height":35,"fontSize":28,"font":"wordFont","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":96,"x":173,"width":334,"name":"disconnect","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":29,"x":4,"width":104,"skin":"common/blackBg.png","height":104,"alpha":0.7}},{"type":"Image","props":{"y":82,"x":60,"skin":"common/chessgame/loadingS.png","name":"loading","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":92,"x":169,"width":334,"runtime":"CountdownRect","name":"clock","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":44,"visible":false,"text":"60","skin":"common/label.png","name":"txt","height":39,"fontSize":30,"font":"impact","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":150,"x":40,"skin":"common/chessgame/disconnectTxt.png"}}]},{"type":"Box","props":{"y":-17,"x":314,"name":"SeatN"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"common/sliderAN.png"}},{"type":"Label","props":{"y":10,"x":19,"text":"1","skin":"common/label.png","name":"seatNum","fontSize":15,"font":"impact","color":"#000000","align":"center"}}]}]},{"type":"Box","props":{"y":380,"x":1190,"width":335,"runtime":"PlayerView","name":"player1","height":186},"child":[{"type":"Image","props":{"skin":"common/chessgame/normal.png","name":"bg"}},{"type":"Image","props":{"y":36,"x":10,"width":103,"skin":"common/head/headIcon0.png","name":"icon","height":103},"child":[{"type":"Image","props":{"width":70,"skin":"common/shiwan.png","name":"iconShiwan","height":70}}]},{"type":"Image","props":{"y":6,"x":8,"skin":"vip/vip6.png","name":"vip"}},{"type":"Image","props":{"y":148,"x":9,"skin":"common/chessgame/imgD.png","name":"d"}},{"type":"Label","props":{"y":5,"x":225,"width":80,"text":"123456","stroke":2,"skin":"common/label.png","name":"name","fontSize":20,"font":"impact","color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":162,"x":83,"width":80,"text":"123456","stroke":2,"skin":"common/label.png","name":"money","height":19,"fontSize":20,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":148,"x":43,"width":60,"text":"准备","stroke":2,"skin":"common/label.png","name":"state","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#ffda5b","align":"left"}},{"type":"Box","props":{"y":144,"x":188,"name":"numBg"},"child":[{"type":"Image","props":{"skin":"common/chessgame/numBg.png","sizeGrid":"9,22,11,23"}},{"type":"Label","props":{"y":8,"x":43,"width":63,"text":"200","skin":"common/label.png","name":"txt","height":21,"fontSize":15,"font":"impact","color":"#ffda5b","align":"right"}}]},{"type":"Box","props":{"y":-5,"x":-60,"runtime":"AllInEffect","name":"allIn"},"child":[{"type":"Image","props":{"skin":"showhandRoom/allIn.png","name":"imgAll"}},{"type":"Label","props":{"y":38,"x":31,"width":15,"text":"x2","skin":"common/label.png","name":"txtAllIn","height":12,"fontSize":15,"font":"impact","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":96,"x":173.5,"width":334,"runtime":"CountdownRect","name":"countdown","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":15,"x":11,"width":39,"visible":false,"text":"60","stroke":2,"skin":"common/label.png","name":"txt","height":35,"fontSize":28,"font":"wordFont","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":96,"x":173,"width":334,"name":"disconnect","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":30,"x":4,"width":104,"skin":"common/blackBg.png","height":104,"alpha":0.7}},{"type":"Image","props":{"y":85,"x":59,"skin":"common/chessgame/loadingS.png","name":"loading","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":92,"x":169,"width":334,"runtime":"CountdownRect","name":"clock","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":44,"visible":false,"text":"60","skin":"common/label.png","name":"txt","height":39,"fontSize":30,"font":"impact","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":150,"x":40,"skin":"common/chessgame/disconnectTxt.png"}}]},{"type":"Box","props":{"y":-16,"x":314,"name":"SeatN"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"common/sliderAN.png"}},{"type":"Label","props":{"y":10,"x":19,"text":"1","skin":"common/label.png","name":"seatNum","fontSize":15,"font":"impact","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":100,"x":-60,"name":"Speak","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"x":124,"skin":"common/chessgame/bgSpeak.png","scaleX":-1}},{"type":"Label","props":{"y":28,"x":-81,"wordWrap":true,"width":180,"text":"加注：10","skin":"common/label.png","name":"talkTxt","height":46,"fontSize":24,"font":"Microsoft YaHei","color":"#000000","align":"center"}}]}]},{"type":"Box","props":{"y":140,"x":-20,"width":335,"runtime":"PlayerView","name":"player3","mouseThrough":false,"mouseEnabled":false,"height":187},"child":[{"type":"Image","props":{"skin":"common/chessgame/normal.png","name":"bg"}},{"type":"Image","props":{"y":36,"x":10,"width":103,"skin":"common/head/headIcon0.png","name":"icon","height":103},"child":[{"type":"Image","props":{"width":70,"skin":"common/shiwan.png","name":"iconShiwan","height":70}}]},{"type":"Image","props":{"y":6,"x":290,"skin":"vip/vip6.png","name":"vip"}},{"type":"Image","props":{"y":148,"x":10,"skin":"common/chessgame/imgD.png","name":"d"}},{"type":"Label","props":{"y":5,"x":35,"width":80,"text":"***666","stroke":2,"skin":"common/label.png","name":"name","fontSize":20,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":162,"x":83,"width":80,"text":"123456","stroke":2,"skin":"common/label.png","name":"money","height":19,"fontSize":20,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":148,"x":40,"width":60,"text":"准备","stroke":2,"skin":"common/label.png","name":"state","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#ffda5b","align":"left"}},{"type":"Box","props":{"y":-5,"x":331,"runtime":"AllInEffect","name":"allIn"},"child":[{"type":"Image","props":{"skin":"showhandRoom/allIn.png","name":"imgAll"}},{"type":"Label","props":{"y":38,"x":31,"width":15,"text":"x2","skin":"common/label.png","name":"txtAllIn","height":12,"fontSize":15,"font":"impact","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":144,"x":198,"name":"numBg"},"child":[{"type":"Image","props":{"skin":"common/chessgame/numBg.png","sizeGrid":"9,22,11,23"}},{"type":"Label","props":{"y":8,"x":43,"width":63,"text":"200","skin":"common/label.png","name":"txt","height":21,"fontSize":15,"font":"impact","color":"#ffda5b","align":"right"}}]},{"type":"Box","props":{"y":90,"x":439,"name":"Speak","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"common/chessgame/bgSpeak.png"}},{"type":"Label","props":{"y":28,"x":26,"wordWrap":true,"width":180,"text":"加注：10000","skin":"common/label.png","name":"talkTxt","height":46,"fontSize":24,"font":"Microsoft YaHei","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":96,"x":172,"width":334,"runtime":"CountdownRect","name":"countdown","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":15,"x":11,"width":39,"visible":false,"text":"60","stroke":2,"skin":"common/label.png","name":"txt","height":35,"fontSize":28,"font":"wordFont","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":96,"x":172.5,"width":334,"name":"disconnect","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":31,"x":5,"width":104,"skin":"common/blackBg.png","height":104,"alpha":0.7}},{"type":"Image","props":{"y":85,"x":60,"skin":"common/chessgame/loadingS.png","name":"loading","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":150,"x":40,"skin":"common/chessgame/disconnectTxt.png"}},{"type":"Box","props":{"y":92,"x":169,"width":334,"runtime":"CountdownRect","name":"clock","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":44,"visible":false,"text":"60","skin":"common/label.png","name":"txt","height":39,"fontSize":30,"font":"impact","color":"#ffffff","align":"center"}}]}]},{"type":"Box","props":{"y":-17,"x":-16,"name":"SeatN"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"common/sliderAN.png"}},{"type":"Label","props":{"y":10,"x":19,"text":"1","skin":"common/label.png","name":"seatNum","fontSize":15,"font":"impact","color":"#000000","align":"center"}}]}]},{"type":"Box","props":{"y":380,"x":-20,"width":335,"runtime":"PlayerView","name":"player4","mouseThrough":false,"mouseEnabled":false,"height":187},"child":[{"type":"Image","props":{"skin":"common/chessgame/normal.png","name":"bg"}},{"type":"Image","props":{"y":36,"x":10,"width":103,"skin":"common/head/headIcon0.png","name":"icon","height":103},"child":[{"type":"Image","props":{"width":70,"skin":"common/shiwan.png","name":"iconShiwan","height":70}}]},{"type":"Image","props":{"y":6,"x":291,"skin":"vip/vip6.png","name":"vip"}},{"type":"Image","props":{"y":148,"x":10,"skin":"common/chessgame/imgD.png","name":"d"}},{"type":"Label","props":{"y":5,"x":35,"width":80,"text":"123456","stroke":2,"skin":"common/label.png","name":"name","fontSize":20,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":162,"x":83,"width":80,"text":"123456","stroke":2,"skin":"common/label.png","name":"money","height":19,"fontSize":20,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":148,"x":40,"width":60,"text":"思考中","skin":"common/label.png","name":"state","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#ffda5b","align":"left"}},{"type":"Box","props":{"y":-5,"x":332,"runtime":"AllInEffect","name":"allIn"},"child":[{"type":"Image","props":{"skin":"showhandRoom/allIn.png","name":"imgAll"}},{"type":"Label","props":{"y":38,"x":31,"width":15,"text":"x2","skin":"common/label.png","name":"txtAllIn","height":12,"fontSize":15,"font":"impact","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":144,"x":198,"name":"numBg"},"child":[{"type":"Image","props":{"skin":"common/chessgame/numBg.png","sizeGrid":"9,22,11,23"}},{"type":"Label","props":{"y":8,"x":43,"width":63,"text":"200","skin":"common/label.png","name":"txt","height":21,"fontSize":15,"font":"impact","color":"#ffda5b","align":"right"}}]},{"type":"Box","props":{"y":90,"x":434,"name":"Speak","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"common/chessgame/bgSpeak.png"}},{"type":"Label","props":{"y":28,"x":26,"wordWrap":true,"width":180,"text":"加注：10000","skin":"common/label.png","name":"talkTxt","height":46,"fontSize":24,"font":"Microsoft YaHei","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":96,"x":172,"width":334,"runtime":"CountdownRect","name":"countdown","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":15,"x":11,"width":39,"visible":false,"text":"60","stroke":2,"skin":"common/label.png","name":"txt","height":35,"fontSize":28,"font":"wordFont","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":96,"x":172,"width":334,"name":"disconnect","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":31,"x":5,"width":104,"skin":"common/blackBg.png","sizeGrid":"2,2,2,2","height":104,"alpha":0.7}},{"type":"Image","props":{"y":85,"x":60,"skin":"common/chessgame/loadingS.png","name":"loading","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":92,"x":169,"width":334,"runtime":"CountdownRect","name":"clock","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":44,"visible":false,"text":"60","skin":"common/label.png","name":"txt","height":39,"fontSize":30,"font":"impact","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":150,"x":40,"skin":"common/chessgame/disconnectTxt.png"}}]},{"type":"Box","props":{"y":-17,"x":-16,"name":"SeatN"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"common/sliderAN.png"}},{"type":"Label","props":{"y":10,"x":19,"text":"1","skin":"common/label.png","name":"seatNum","fontSize":15,"font":"impact","color":"#000000","align":"center"}}]}]},{"type":"Box","props":{"y":656,"x":-10,"width":335,"runtime":"PlayerView","name":"player0","height":186},"child":[{"type":"Image","props":{"skin":"common/chessgame/normal.png","name":"bg"}},{"type":"Image","props":{"y":36,"x":10,"width":103,"skin":"common/head/headIcon0.png","name":"icon","height":103},"child":[{"type":"Image","props":{"width":70,"skin":"common/shiwan.png","name":"iconShiwan","height":70}}]},{"type":"Label","props":{"y":5,"x":35,"width":116,"text":"0001542","skin":"common/label.png","name":"name","fontSize":20,"font":"impact","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":65,"x":130,"width":116,"text":"游戏余额","skin":"common/label.png","height":26,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":88,"x":130,"width":116,"text":"￥12345678","skin":"common/label.png","name":"money","height":26,"fontSize":25,"font":"impact","color":"#ffffff"}},{"type":"Image","props":{"y":7,"x":291,"skin":"vip/vip5.png","name":"vip"}},{"type":"Image","props":{"y":148,"x":10,"skin":"common/chessgame/imgD.png","name":"d"}},{"type":"Box","props":{"y":-5,"x":332,"runtime":"AllInEffect","name":"allIn"},"child":[{"type":"Image","props":{"skin":"showhandRoom/allIn.png","name":"imgAll"}},{"type":"Label","props":{"y":36,"x":30,"width":15,"text":"x2","skin":"common/label.png","name":"txtAllIn","height":12,"fontSize":15,"font":"impact","color":"#000000","align":"center"}}]},{"type":"Label","props":{"y":148,"x":40,"width":40,"text":"准备","skin":"common/label.png","name":"state","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#ffda5b"}},{"type":"Box","props":{"y":144,"x":190,"name":"numBg"},"child":[{"type":"Image","props":{"skin":"common/chessgame/numBg.png","sizeGrid":"9,22,11,23"}},{"type":"Label","props":{"y":8,"x":43,"width":63,"text":"220","skin":"common/label.png","name":"txt","height":21,"fontSize":15,"font":"impact","color":"#ffda5b","align":"right"}}]},{"type":"Box","props":{"y":91,"x":434,"name":"Speak","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"common/chessgame/bgSpeak.png"}},{"type":"Label","props":{"y":28,"x":26,"wordWrap":true,"width":180,"text":"加注：10000","skin":"common/label.png","name":"talkTxt","height":44,"fontSize":24,"font":"Microsoft YaHei","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":96,"x":172,"width":334,"runtime":"CountdownRect","name":"countdown","height":182,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":15,"x":11,"width":39,"visible":false,"text":"60","stroke":2,"skin":"common/label.png","name":"txt","height":35,"fontSize":28,"font":"wordFont","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":-17,"x":-14,"name":"SeatN"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"common/sliderAN.png"}},{"type":"Label","props":{"y":10,"x":19,"text":"1","skin":"common/label.png","name":"seatNum","fontSize":15,"font":"impact","color":"#000000","align":"center"}}]},{"type":"Image","props":{"y":600,"x":572,"skin":"showhandRoom/allInHand.png"}}]}]},{"type":"Box","props":{"y":801,"x":331,"width":937,"name":"btns","height":96},"child":[{"type":"Box","props":{"y":-5,"x":121.875,"width":720,"name":"intelligenceBtn","height":95},"child":[{"type":"Box","props":{"y":48.5,"x":120,"width":222,"runtime":"CheckButton","name":"dropCardBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_yellow2.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_blue.png","sizeGrid":"9,12,14,35","name":"btnNormal","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":60,"x":111,"width":134,"text":"弃牌","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48.5,"x":120,"width":222,"runtime":"CheckButton","name":"passCardBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_yellow2.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_blue.png","sizeGrid":"9,12,14,35","name":"btnNormal","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":60,"x":111,"width":134,"text":"过牌","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48.5,"x":600,"width":222,"runtime":"CheckButton","name":"followAwaysBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_yellow2.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_blue.png","sizeGrid":"9,12,14,35","name":"btnNormal","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":60,"x":111,"width":134,"text":"一律跟注","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48.5,"x":361,"width":222,"runtime":"CheckButton","name":"followBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_yellow2.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_blue.png","sizeGrid":"9,12,14,35","name":"btnNormal","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":60,"x":111,"width":134,"text":"跟注","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48.5,"x":361,"width":222,"runtime":"CheckButton","name":"passOrDropBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_yellow2.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_blue.png","sizeGrid":"9,12,14,35","name":"btnNormal","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":60,"x":111,"width":134,"text":"过或弃","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]},{"type":"Box","props":{"x":14,"name":"speekBtn"},"child":[{"type":"Box","props":{"y":48,"x":484,"width":222,"runtime":"ScaleButton","name":"anteBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_yellow.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":57,"x":105,"width":134,"text":"底注（1111）","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48,"x":224,"width":222,"runtime":"ScaleButton","name":"dropBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_yellow.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":57,"x":111,"width":134,"text":"弃牌","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48,"x":924,"width":222,"runtime":"ScaleButton","name":"passBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_yellow.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":57,"x":105,"width":134,"text":"过牌","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48,"x":704,"width":222,"runtime":"ScaleButton","name":"reraiseBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_red.png","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":57,"x":105,"width":134,"text":"加注","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]},{"type":"Box","props":{"x":239.375,"width":480,"name":"allInBtn","height":93},"child":[{"type":"Box","props":{"y":48,"x":479,"width":222,"runtime":"ScaleButton","name":"allInBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_red.png","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":57,"x":105,"width":134,"text":"ALL IN","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"impact","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48,"x":-1.5,"width":222,"runtime":"ScaleButton","name":"dropBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_yellow.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":57,"x":111,"width":134,"text":"弃牌","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]},{"type":"Box","props":{"x":118,"width":722,"visible":true,"name":"AnswerBtn","height":94},"child":[{"type":"Box","props":{"y":48,"x":120,"width":222,"runtime":"ScaleButton","name":"dropBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_yellow.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":57,"x":111,"width":134,"text":"弃牌","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48,"x":380,"width":222,"runtime":"ScaleButton","name":"followBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_yellow.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":57,"x":111,"width":200,"text":"跟注","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48,"x":600,"width":222,"runtime":"ScaleButton","name":"reraiseBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_red.png","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":57,"x":111,"width":134,"text":"加注","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]},{"type":"Box","props":{"y":14,"x":487,"width":350,"runtime":"ScaleButton","name":"ChangeRoomBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":175,"skin":"common/button_yellow1.png","sizeGrid":"9,12,14,35","name":"reJoinBtn","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":52,"x":169,"text":"换桌","fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5}}]},{"type":"Panel","props":{"y":-22,"x":706,"width":476,"name":"panelTask","height":70}},{"type":"Box","props":{"y":13,"x":1184,"runtime":"ScaleButton","name":"taskBtn","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"common/yellowC.png","scaleY":0.8,"scaleX":0.8}},{"type":"Label","props":{"y":42,"x":31,"width":78,"text":"任务","skin":"common/label.png","height":38,"fontSize":25,"font":"Microsoft YaHei","color":"#000000","align":"center"}},{"type":"Label","props":{"y":74,"x":29,"width":78,"text":"2/5","skin":"common/label.png","name":"lbTaskProgress","height":38,"fontSize":25,"font":"impact","color":"#000000","align":"center"}}]}]},{"type":"Box","props":{"y":435.5,"x":747.5,"name":"settlementing"},"child":[{"type":"Image","props":{"skin":"common/chessgame/numBg.png","sizeGrid":"9,22,11,23"}},{"type":"Label","props":{"y":8,"x":29.5,"width":88,"text":"结算中...","skin":"common/label.png","name":"txt","height":21,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]},{"type":"Box","props":{"y":268,"x":1136,"name":"taskView"},"child":[{"type":"Image","props":{"width":485,"skin":"common/blackBg.png","sizeGrid":"2,2,2,2","height":438,"alpha":0.85}},{"type":"Label","props":{"y":210,"x":220,"text":"暂无任务","name":"lblNone","fontSize":15,"font":"Microsoft YaHei","color":"#ffffff","align":"right"}},{"type":"List","props":{"y":39,"x":33,"name":"lstTask"},"child":[{"type":"Box","props":{"name":"render"},"child":[{"type":"Label","props":{"y":11,"x":5,"width":203,"text":"完成梭哈游戏3盘 2/5","name":"lbContent","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":11,"x":261,"width":74,"text":"￥123","name":"lbReward","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":2,"x":362,"skin":"setting/rwWancheng2.png","name":"iconComplated"}}]}]}]},{"type":"Box","props":{"y":45,"x":53,"width":250,"var":"backBtn","runtime":"ScaleButton","height":250,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":125,"x":125,"skin":"common/back.png","name":"btnIcon","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":21,"x":110,"var":"boxKeyRoom"},"child":[{"type":"Label","props":{"text":"房间编号：","strokeColor":"#000000","skin":"common/label.png","fontSize":20,"font":"Microsoft YaHei","color":"#929191","align":"left"}},{"type":"Label","props":{"y":30,"x":0,"text":"54654634","strokeColor":"#000000","skin":"common/label.png","name":"lblKey","fontSize":20,"font":"impact","color":"#929191","align":"left"}}]}]};}
		]);
		return ShowHandRoomUI;
	})(View);
var SliderGearUI=(function(_super){
		function SliderGearUI(){
			

			SliderGearUI.__super.call(this);
		}

		CLASS$(SliderGearUI,'ui.SliderGearUI',_super);
		var __proto__=SliderGearUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(SliderGearUI.uiView);
		}

		STATICATTR$(SliderGearUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":800,"height":200},"child":[{"type":"Box","props":{"y":50,"x":396,"width":780,"name":"boxTouch","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":52,"x":390,"width":730,"skin":"common/sliderBg.png","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":50,"x":30,"width":730,"skin":"common/sliderProgress.png","name":"barBackMask"}},{"type":"Box","props":{"y":5,"x":-20,"width":100,"name":"sliderNodeDown","height":100},"child":[{"type":"Image","props":{"y":50,"x":50,"skin":"common/sliderAN.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-41,"x":-91,"visible":false,"skin":"common/sliderTip.png","name":"imgTip"}}]},{"type":"Label","props":{"y":-10,"x":20,"text":"底注设置","name":"sliderTip","fontSize":20,"font":"Microsoft YaHei","color":"#929191","align":"right"}},{"type":"Label","props":{"y":-21,"x":110,"text":"50","name":"lblValue","fontSize":35,"font":"impact","color":"#ffda5b","align":"center"}}]};}
		]);
		return SliderGearUI;
	})(View);
var TaskInfoUI=(function(_super){
		function TaskInfoUI(){
			
		    this.lblNone=null;
		    this.lstCell=null;
		    this.boxSlider=null;
		    this.barBackMask=null;
		    this.bgMask=null;
		    this.labelComplete=null;
		    this.labelProgress=null;

			TaskInfoUI.__super.call(this);
		}

		CLASS$(TaskInfoUI,'ui.TaskInfoUI',_super);
		var __proto__=TaskInfoUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(TaskInfoUI.uiView);
		}

		STATICATTR$(TaskInfoUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":900},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1620,"skin":"common/bg.png","sizeGrid":"1,1,1,1","height":900}},{"type":"Label","props":{"y":400,"x":770,"var":"lblNone","text":"暂无任务","fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"right"}},{"type":"List","props":{"y":285,"x":100,"width":0,"var":"lstCell","spaceY":20,"spaceX":1,"height":0},"child":[{"type":"Box","props":{"name":"render"},"child":[{"type":"Image","props":{"y":90,"x":0,"width":1400,"skin":"common/lineImg.png","height":1}},{"type":"Label","props":{"y":30,"x":50,"width":649,"text":"在5局梭哈比赛中获胜（2/5）","name":"lbContent","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":30,"x":1025,"width":115,"text":"￥123","name":"lbReward","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffda5b","align":"left"}},{"type":"Image","props":{"y":25,"x":1288.9999999999998,"skin":"setting/rwWancheng2.png","name":"iconComplated"}}]}]},{"type":"Box","props":{"y":98,"x":722,"var":"boxSlider"},"child":[{"type":"Image","props":{"var":"barBackMask","skin":"common/blackCprogress.png","skewX":180}},{"type":"Image","props":{"x":0,"var":"bgMask","skin":"common/yellowC.png"}},{"type":"Label","props":{"y":59.00000000000003,"x":39,"width":100,"var":"labelComplete","text":"已完成","height":32,"fontSize":28,"font":"Microsoft YaHei","color":"#000000","align":"center"}},{"type":"Label","props":{"y":98,"x":59.000000000000114,"width":60,"var":"labelProgress","text":"2/5","height":32,"fontSize":28,"font":"impact","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":45,"x":53,"width":250,"runtime":"ScaleButton","name":"backBtn","height":250,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":125,"x":125,"skin":"common/back.png","name":"btnIcon","anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":20,"x":739,"text":"任务信息","fontSize":35,"font":"Microsoft YaHei","color":"#ffffff","align":"right"}},{"type":"Image","props":{"y":280,"x":100,"width":1400,"skin":"common/lineImg.png","height":1}}]};}
		]);
		return TaskInfoUI;
	})(View);
var TaskMessageUI=(function(_super){
		function TaskMessageUI(){
			
		    this.wancheng=null;

			TaskMessageUI.__super.call(this);
		}

		CLASS$(TaskMessageUI,'ui.TaskMessageUI',_super);
		var __proto__=TaskMessageUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(TaskMessageUI.uiView);
		}

		STATICATTR$(TaskMessageUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":470,"height":90},"child":[{"type":"Image","props":{"y":18,"x":31,"width":458,"skin":"common/blackBg.png","sizeGrid":"2,2,2,2","name":"bg","height":44,"alpha":0.85}},{"type":"Label","props":{"y":29,"x":75,"width":387,"text":"完成任务来看手机掉了付款就爱了肯德基","skin":"common/label.png","name":"txt","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#ffda5b","align":"left"}},{"type":"Image","props":{"y":40,"x":32,"var":"wancheng","skin":"setting/rwWancheng2.png","scaleY":1.5,"scaleX":1.5,"anchorY":0.5,"anchorX":0.5}}]};}
		]);
		return TaskMessageUI;
	})(View);
var TexasHoldemRoomUI=(function(_super){
		function TexasHoldemRoomUI(){
			
		    this.bg=null;
		    this.backBtn=null;
		    this.btnsH=null;
		    this.btnsV=null;
		    this.btnHalfPool=null;
		    this.btnOnePool=null;
		    this.boxPoolPay=null;
		    this.poolMoney=null;
		    this.boxPoolJettons=null;
		    this.gameCountdown=null;
		    this.boxPlayers=null;
		    this.lableAntes=null;
		    this.boxKeyRoom=null;
		    this.boxCommunityCards=null;
		    this.boxTsk=null;

			TexasHoldemRoomUI.__super.call(this);
		}

		CLASS$(TexasHoldemRoomUI,'ui.TexasHoldem.TexasHoldemRoomUI',_super);
		var __proto__=TexasHoldemRoomUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);
			View.regComponent("CheckButton",CheckButton);
			View.regComponent("Countdown",Countdown);
			View.regComponent("ui.TexasHoldem.TexasPlayerUI",ui.TexasHoldem.TexasPlayerUI);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(TexasHoldemRoomUI.uiView);
		}

		STATICATTR$(TexasHoldemRoomUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":1620},"child":[{"type":"Image","props":{"var":"bg","skin":"showhandRoom/zhuozi.png"}},{"type":"Box","props":{"y":45,"x":53,"width":250,"var":"backBtn","runtime":"ScaleButton","height":250,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":125,"x":125,"skin":"common/back.png","name":"btnIcon","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":800,"x":757,"width":937,"var":"btnsH","height":96,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Box","props":{"y":-5,"x":121.875,"width":720,"name":"intelligenceBtn","height":95},"child":[{"type":"Box","props":{"y":48.5,"x":120,"width":222,"runtime":"CheckButton","name":"dropCardBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_yellow2.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_blue.png","sizeGrid":"9,12,14,35","name":"btnNormal","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":60,"x":111,"width":134,"text":"弃牌","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48.5,"x":120,"width":222,"runtime":"CheckButton","name":"passCardBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_yellow2.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_blue.png","sizeGrid":"9,12,14,35","name":"btnNormal","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":60,"x":111,"width":134,"text":"过牌","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48.5,"x":600,"width":222,"runtime":"CheckButton","name":"followAwaysBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_yellow2.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_blue.png","sizeGrid":"9,12,14,35","name":"btnNormal","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":60,"x":111,"width":134,"text":"一律跟注","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48.5,"x":361,"width":222,"runtime":"CheckButton","name":"followBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_yellow2.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_blue.png","sizeGrid":"9,12,14,35","name":"btnNormal","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":60,"x":111,"width":134,"text":"跟注","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48.5,"x":361,"width":222,"runtime":"CheckButton","name":"passOrDropBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_yellow2.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_blue.png","sizeGrid":"9,12,14,35","name":"btnNormal","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":60,"x":111,"width":134,"text":"过或弃","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]},{"type":"Box","props":{"x":14,"name":"speakBtn"},"child":[{"type":"Box","props":{"y":48,"x":224,"width":222,"runtime":"ScaleButton","name":"dropBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_yellow.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":57,"x":111,"width":134,"text":"弃牌","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48,"x":924,"width":222,"runtime":"ScaleButton","name":"passBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_yellow.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":57,"x":105,"width":134,"text":"过牌","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48,"x":704,"width":222,"runtime":"ScaleButton","name":"reraiseBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_red.png","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":57,"x":105,"width":134,"text":"加注","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48,"x":705,"width":222,"runtime":"ScaleButton","name":"allInBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_red.png","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":57,"x":105,"width":134,"text":"ALL IN","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"impact","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48,"x":484,"width":222,"runtime":"ScaleButton","name":"followBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"skin":"common/button_yellow.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":57,"x":111,"width":134,"text":"跟注","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]},{"type":"Box","props":{"y":48,"x":487,"width":350,"runtime":"ScaleButton","name":"changeRoomBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":175,"skin":"common/button_yellow1.png","sizeGrid":"9,12,14,35","name":"reJoinBtn","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":52,"x":169,"text":"换桌","fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Box","props":{"y":1241,"x":450,"width":900,"var":"btnsV","height":96,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Box","props":{"y":42,"x":450,"width":900,"name":"intelligenceBtn","height":95,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Box","props":{"y":48.5,"x":220,"width":222,"runtime":"CheckButton","name":"dropCardBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"width":131,"skin":"common/button_yellow2.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":60,"x":111,"width":131,"skin":"common/button_blue.png","sizeGrid":"9,12,14,35","name":"btnNormal","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":60,"x":111,"width":134,"text":"弃牌","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48.5,"x":220,"width":222,"runtime":"CheckButton","name":"passCardBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"width":131,"skin":"common/button_yellow2.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":60,"x":111,"width":131,"skin":"common/button_blue.png","sizeGrid":"9,12,14,35","name":"btnNormal","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":60,"x":111,"width":134,"text":"过牌","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48.5,"x":680,"width":222,"runtime":"CheckButton","name":"followAwaysBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"width":131,"skin":"common/button_yellow2.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":60,"x":111,"width":131,"skin":"common/button_blue.png","sizeGrid":"9,12,14,35","name":"btnNormal","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":60,"x":111,"width":134,"text":"一律跟注","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48.5,"x":450,"width":222,"runtime":"CheckButton","name":"followBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"width":131,"skin":"common/button_yellow2.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":60,"x":111,"width":131,"skin":"common/button_blue.png","sizeGrid":"9,12,14,35","name":"btnNormal","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":60,"x":111,"width":134,"text":"跟注","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48.5,"x":450,"width":222,"runtime":"CheckButton","name":"passOrDropBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"width":131,"skin":"common/button_yellow2.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":60,"x":111,"width":131,"skin":"common/button_blue.png","sizeGrid":"9,12,14,35","name":"btnNormal","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":60,"x":111,"width":134,"text":"过或弃","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]},{"type":"Box","props":{"width":900,"name":"speakBtn","height":96},"child":[{"type":"Box","props":{"y":48,"x":450,"width":222,"runtime":"ScaleButton","name":"followBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"width":131,"skin":"common/button_yellow.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":57,"x":110,"text":"跟注","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48,"x":220,"width":222,"runtime":"ScaleButton","name":"dropBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"width":131,"skin":"common/button_yellow.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":57,"x":111,"width":134,"text":"弃牌","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48,"x":680,"width":222,"runtime":"ScaleButton","name":"passBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"width":131,"skin":"common/button_yellow.png","sizeGrid":"9,12,14,35","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":57,"x":110,"width":134,"text":"让牌","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48,"x":679,"width":222,"runtime":"ScaleButton","name":"allInBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"width":131,"skin":"common/button_red.png","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":57,"x":110,"width":134,"text":"ALL IN","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"impact","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":48,"x":449,"width":400,"name":"boxReraise","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Box","props":{"y":50,"x":200,"width":222,"runtime":"ScaleButton","name":"reraiseBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":111,"width":131,"skin":"common/button_red.png","name":"btnDown","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":57,"x":110,"width":134,"text":"加注","skin":"common/label.png","name":"txt","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":-60,"x":51,"width":120,"var":"btnHalfPool","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":60,"skin":"common/raiseBg.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":47,"x":59,"text":"1/2","strokeColor":"#000000","skin":"template/文本框/label.png","fontSize":20,"font":"impact","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":70,"x":59,"text":"底池","strokeColor":"#000000","skin":"template/文本框/label.png","fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":107,"x":60,"text":"1234","strokeColor":"#000000","skin":"template/文本框/label.png","name":"txt","fontSize":20,"font":"impact","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":-60,"x":351,"width":120,"var":"btnOnePool","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":60,"skin":"common/raiseBg.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":47,"x":59,"text":"1","strokeColor":"#000000","skin":"template/文本框/label.png","fontSize":20,"font":"impact","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":70,"x":59,"text":"底池","strokeColor":"#000000","skin":"template/文本框/label.png","fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":107,"x":60,"text":"1234","strokeColor":"#000000","skin":"template/文本框/label.png","name":"txt","fontSize":20,"font":"impact","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]}]},{"type":"Box","props":{"y":46,"x":450,"width":350,"runtime":"ScaleButton","name":"changeRoomBtn","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":175,"skin":"common/button_yellow1.png","sizeGrid":"9,12,14,35","name":"reJoinBtn","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":52,"x":169,"text":"换桌","fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Box","props":{"y":420,"x":450,"var":"boxPoolPay","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"texasHoldem/poolBg.png"}},{"type":"Label","props":{"y":85,"x":153,"width":120,"var":"poolMoney","text":"200","stroke":2,"fontSize":25,"font":"impact","color":"#ffda5b","align":"center"}},{"type":"Box","props":{"y":80,"x":107,"var":"boxPoolJettons"},"child":[{"type":"Image","props":{"visible":false,"skin":"jetton/jetton_1000.png","scaleY":0.65,"scaleX":0.65}}]}]},{"type":"Box","props":{"y":810,"x":450,"var":"gameCountdown","runtime":"Countdown","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":267,"text":"1","skin":"common/label.png","name":"txt","height":72,"fontSize":40,"font":"gameStart","color":"#ffe000","bold":true,"anchorY":0,"anchorX":0,"align":"center"}}]},{"type":"Box","props":{"y":0,"x":0,"width":10,"var":"boxPlayers","height":10},"child":[{"type":"TexasPlayer","props":{"y":640,"x":810,"visible":false,"anchorY":0.5,"anchorX":0.5,"runtime":"ui.TexasHoldem.TexasPlayerUI"}}]},{"type":"Box","props":{"y":908,"x":381},"child":[{"type":"Label","props":{"width":120,"var":"lableAntes","text":"200","stroke":2,"fontSize":25,"font":"impact","color":"#ffda5b","align":"center"}}]},{"type":"Box","props":{"y":21,"x":110,"var":"boxKeyRoom"},"child":[{"type":"Label","props":{"text":"房间编号：","strokeColor":"#000000","skin":"common/label.png","fontSize":20,"font":"Microsoft YaHei","color":"#929191","align":"left"}},{"type":"Label","props":{"y":30,"x":0,"text":"54654634","strokeColor":"#000000","skin":"common/label.png","name":"lblKey","fontSize":20,"font":"impact","color":"#929191","align":"left"}}]},{"type":"Box","props":{"y":810,"x":450,"name":"settlementing","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"common/chessgame/numBg.png","sizeGrid":"9,22,11,23"}},{"type":"Label","props":{"y":8,"x":29.5,"width":88,"text":"结算中...","skin":"common/label.png","name":"txt","height":21,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]},{"type":"Box","props":{"y":445,"x":810,"width":604,"var":"boxCommunityCards","height":140,"anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":348,"x":1080,"name":"taskView"},"child":[{"type":"Image","props":{"width":485,"skin":"common/blackBg.png","sizeGrid":"2,2,2,2","height":438,"alpha":0.85}},{"type":"Label","props":{"y":210,"x":220,"text":"暂无任务","name":"lblNone","fontSize":15,"font":"Microsoft YaHei","color":"#ffffff","align":"right"}},{"type":"List","props":{"y":39,"x":33,"name":"lstTask"},"child":[{"type":"Box","props":{"name":"render"},"child":[{"type":"Label","props":{"y":11,"x":5,"width":203,"text":"完成梭哈游戏3盘 2/5","name":"lbContent","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":11,"x":261,"width":74,"text":"￥123","name":"lbReward","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":2,"x":362,"skin":"setting/rwWancheng2.png","name":"iconComplated"}}]}]}]},{"type":"Box","props":{"y":665,"x":1372,"width":200,"var":"boxTsk","height":200},"child":[{"type":"Panel","props":{"y":64.60000000000002,"x":-378.4000000000003,"width":476,"name":"panelTask","height":70}},{"type":"Box","props":{"y":100,"x":100,"runtime":"ScaleButton","name":"taskBtn","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"common/yellowC.png","scaleY":0.8,"scaleX":0.8}},{"type":"Label","props":{"y":42,"x":31,"width":78,"text":"任务","skin":"common/label.png","height":38,"fontSize":25,"font":"Microsoft YaHei","color":"#000000","align":"center"}},{"type":"Label","props":{"y":74,"x":29,"width":78,"text":"2/5","skin":"common/label.png","name":"lbTaskProgress","height":38,"fontSize":25,"font":"impact","color":"#000000","align":"center"}}]}]}]};}
		]);
		return TexasHoldemRoomUI;
	})(View);
var TexasPlayerUI=(function(_super){
		function TexasPlayerUI(){
			

			TexasPlayerUI.__super.call(this);
		}

		CLASS$(TexasPlayerUI,'ui.TexasHoldem.TexasPlayerUI',_super);
		var __proto__=TexasPlayerUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("CountdownRect",CountdownRect);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(TexasPlayerUI.uiView);
		}

		STATICATTR$(TexasPlayerUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"y":0,"x":0,"width":132,"height":200},"child":[{"type":"Image","props":{"y":0,"x":0,"width":132,"skin":"texasHoldem/headBg.png","name":"imgBg","height":199}},{"type":"Image","props":{"y":87,"x":66,"width":105,"skin":"common/head/headIcon0.png","name":"icon","height":105,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":-2,"x":-1,"width":64,"skin":"common/shiwan.png","name":"iconShiwan","height":65}}]},{"type":"Image","props":{"y":34,"x":73.00000000000001,"skin":"vip/vip6.png","name":"vip"}},{"type":"Label","props":{"y":17,"x":12,"width":80,"text":"123456","stroke":2,"skin":"common/label.png","name":"name","fontSize":20,"font":"impact","color":"#ffffff","anchorY":0.5,"align":"left"}},{"type":"Label","props":{"y":151,"x":39,"width":60,"text":"准备","stroke":2,"skin":"common/label.png","name":"state","height":20,"fontSize":15,"font":"Microsoft YaHei","color":"#ffda5b","align":"center"}},{"type":"Label","props":{"y":17,"x":12,"width":80,"text":"￥123456","stroke":2,"skin":"common/label.png","scaleY":0,"name":"money","fontSize":20,"font":"impact","color":"#ffffff","anchorY":0.5,"align":"left"}},{"type":"Box","props":{"y":36,"x":152,"name":"allIn","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"showhandRoom/allIn.png","name":"imgAll"}},{"type":"Label","props":{"y":38,"x":31,"width":15,"visible":false,"text":"x2","skin":"common/label.png","name":"txtAllIn","height":12,"fontSize":15,"font":"impact","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":185,"x":10,"name":"boxMoneyInTable"},"child":[{"type":"Image","props":{"skin":"texasHoldem/payMoney.png","name":"imgPayMoney"}},{"type":"Label","props":{"y":6,"x":34,"wordWrap":true,"width":70,"text":"100","skin":"common/label.png","name":"txtPayMoney","height":22,"fontSize":20,"font":"impact","color":"#FFFFFF","align":"center"}},{"type":"Box","props":{"y":19,"x":19,"name":"boxJettons","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":96,"x":66.5,"width":121,"runtime":"CountdownRect","name":"countdown","height":184,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":39,"visible":false,"text":"60","stroke":2,"skin":"common/label.png","name":"txt","height":35,"fontSize":28,"font":"wordFont","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":100,"x":66,"width":131,"name":"disconnect","height":203,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":31,"x":7,"width":116,"skin":"common/blackBg.png","height":111,"alpha":0.7}},{"type":"Image","props":{"y":84,"x":65,"skin":"common/chessgame/loadingS.png","name":"loading","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":102,"x":66,"width":131,"runtime":"CountdownRect","name":"clock","height":203,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"width":44,"visible":false,"text":"60","skin":"common/label.png","name":"txt","height":39,"fontSize":30,"font":"impact","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":155,"x":54,"skin":"common/chessgame/disconnectTxt.png"}}]},{"type":"Image","props":{"y":149,"x":130,"skin":"common/chessgame/imgD.png","name":"d"}},{"type":"Box","props":{"y":164,"x":141,"width":50,"visible":false,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"visible":false,"skin":"card/card_back.png","scaleY":0.2,"scaleX":0.2,"anchorX":0.5}},{"type":"Image","props":{"y":0,"x":10,"visible":false,"skin":"card/card_back.png","scaleY":0.2,"scaleX":0.2,"anchorX":0.5}}]},{"type":"Box","props":{"y":100,"x":285,"width":200,"name":"boxCards","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":-1,"visible":false,"skin":"card/card_back.png","scaleY":0.6,"scaleX":0.6,"anchorX":0.5}},{"type":"Image","props":{"y":-1,"x":100,"visible":false,"skin":"card/card_back.png","scaleY":0.6,"scaleX":0.6,"anchorX":0.5}}]},{"type":"Box","props":{"y":52,"x":206,"visible":false,"scaleX":1,"name":"Speak","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":10,"x":0,"width":196,"skin":"common/chessgame/bgSpeak.png","name":"imgBg","height":86}},{"type":"Label","props":{"y":28,"x":26,"wordWrap":true,"width":167,"text":"加注：100000","skin":"common/label.png","name":"talkTxt","height":46,"fontSize":24,"font":"Microsoft YaHei","color":"#000000","align":"center"}}]},{"type":"Box","props":{"y":89,"x":67,"width":140,"visible":false,"name":"boxCardHand","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":0,"x":41,"visible":false,"skin":"card/card_clubs_5.png","scaleY":0.55,"scaleX":0.55,"anchorX":0.5}},{"type":"Image","props":{"y":0,"x":96,"visible":false,"skin":"card/card_diamonds_12.png","scaleY":0.55,"scaleX":0.55,"anchorX":0.5}}]}]};}
		]);
		return TexasPlayerUI;
	})(View);
var TipsMessageUI=(function(_super){
		function TipsMessageUI(){
			
		    this.blackBg=null;
		    this.boxTip=null;
		    this.bgTxt=null;
		    this.lblTips=null;

			TipsMessageUI.__super.call(this);
		}

		CLASS$(TipsMessageUI,'ui.TipsMessageUI',_super);
		var __proto__=TipsMessageUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(TipsMessageUI.uiView);
		}

		STATICATTR$(TipsMessageUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":1620},"child":[{"type":"Image","props":{"width":1620,"var":"blackBg","skin":"loading/bg.png","sizeGrid":"2,2,2,2","height":1620,"alpha":0.85}},{"type":"Box","props":{"y":508,"x":818,"width":600,"var":"boxTip","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":33,"x":300,"width":600,"var":"bgTxt","skin":"loading/bg.png","sizeGrid":"2,2,2,2","height":40,"anchorY":0,"anchorX":0.5,"alpha":0.85}},{"type":"Label","props":{"y":40,"x":300,"var":"lblTips","text":"服务器服务器服务器服务器","skin":"common/label.png","fontSize":20,"font":"Microsoft YaHei","color":"#ffda5b","anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":438,"x":818,"width":108,"name":"loadingPic","height":108,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":54,"x":54,"skin":"loading/jeBg.png","scaleY":1.5,"scaleX":1.5,"anchorY":0.5,"anchorX":0.5}}]}]};}
		]);
		return TipsMessageUI;
	})(View);
var WalletUI=(function(_super){
		function WalletUI(){
			
		    this.takeMoney=null;
		    this.saveMoney=null;
		    this.localMoneyTxt=null;
		    this.walletMoneyTxt=null;
		    this.slider=null;
		    this.accessBtn=null;

			WalletUI.__super.call(this);
		}

		CLASS$(WalletUI,'ui.WalletUI',_super);
		var __proto__=WalletUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleButton",ScaleButton);
			View.regComponent("ScaleImage",ScaleImage);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(WalletUI.uiView);
		}

		STATICATTR$(WalletUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":900},"child":[{"type":"Image","props":{"y":-2,"x":1,"width":1620,"skin":"common/bg.png","sizeGrid":"1,1,1,1","height":900}},{"type":"Image","props":{"y":215,"x":260,"skin":"common/yellowC.png"}},{"type":"Image","props":{"y":462,"x":260,"skin":"common/yellowC.png"}},{"type":"Box","props":{"y":550,"x":582,"width":704,"var":"takeMoney","name":"takeMoney","height":84},"child":[{"type":"Box","props":{"y":0,"x":0,"width":140,"runtime":"ScaleButton","name":"jia_10","height":140,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":70,"x":70,"skin":"setting/walletAn.png","name":"btn","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":67,"x":70,"text":"+10","strokeColor":"#000000","skin":"common/label.png","fontSize":25,"font":"impact","color":"#ffda5b","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"x":213,"width":140,"runtime":"ScaleButton","name":"jia_100","height":140,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":70,"x":70,"skin":"setting/walletAn.png","name":"btn","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":67,"x":70,"text":"+100","strokeColor":"#000000","skin":"common/label.png","fontSize":25,"font":"impact","color":"#ffda5b","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"x":426,"width":140,"runtime":"ScaleButton","name":"jia_1000","height":140,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":70,"x":70,"skin":"setting/walletAn.png","name":"btn","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":67,"x":70,"text":"+1000","strokeColor":"#000000","skin":"common/label.png","fontSize":25,"font":"impact","color":"#ffda5b","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"x":639,"width":140,"runtime":"ScaleButton","name":"jia_10000","height":140,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":70,"x":70,"skin":"setting/walletAn.png","name":"btn","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":67,"x":70,"text":"+10000","strokeColor":"#000000","skin":"common/label.png","fontSize":25,"font":"impact","color":"#ffda5b","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]},{"type":"Box","props":{"y":300,"x":582,"width":710,"var":"saveMoney","name":"saveMoney","height":84,"anchorY":0,"anchorX":0},"child":[{"type":"Box","props":{"width":140,"runtime":"ScaleButton","name":"jia_10","height":140,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":70,"x":70,"skin":"setting/walletAn.png","name":"btn","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":67,"x":70,"text":"+10","strokeColor":"#000000","skin":"common/label.png","fontSize":25,"font":"impact","color":"#ffda5b","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"x":213,"width":140,"runtime":"ScaleButton","name":"jia_100","height":140,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":70,"x":70,"skin":"setting/walletAn.png","name":"btn","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":67,"x":70,"text":"+100","strokeColor":"#000000","skin":"common/label.png","fontSize":25,"font":"impact","color":"#ffda5b","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"x":426,"width":140,"runtime":"ScaleButton","name":"jia_1000","height":140,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":70,"x":70,"skin":"setting/walletAn.png","name":"btn","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":67,"x":70,"text":"+1000","strokeColor":"#000000","skin":"common/label.png","fontSize":25,"font":"impact","color":"#ffda5b","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"x":639,"width":140,"runtime":"ScaleButton","name":"jia_10000","height":140,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":70,"x":70,"skin":"setting/walletAn.png","name":"btn","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":67,"x":70,"text":"+10000","strokeColor":"#000000","skin":"common/label.png","fontSize":25,"font":"impact","color":"#ffda5b","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]},{"type":"Label","props":{"y":540,"x":258,"width":181,"text":"游戏余额","strokeColor":"#000000","skin":"common/label.png","height":41,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","align":"center"}},{"type":"Label","props":{"y":449,"x":530,"width":209,"var":"localMoneyTxt","text":"10000","strokeColor":"#000000","stroke":2,"skin":"common/label.png","height":35,"fontSize":35,"font":"impact","color":"#ffda5b"}},{"type":"Label","props":{"y":290,"x":258,"width":183,"text":"钱包金额","strokeColor":"#000000","skin":"common/label.png","height":41,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","align":"center"}},{"type":"Label","props":{"y":199,"x":530,"width":209,"var":"walletMoneyTxt","text":"5000","strokeColor":"#000000","stroke":2,"skin":"common/label.png","height":35,"fontSize":35,"font":"impact","color":"#ffda5b"}},{"type":"Box","props":{"y":690,"x":551,"width":730,"var":"slider","height":40},"child":[{"type":"Image","props":{"y":20,"width":730,"skin":"common/sliderBg.png"}},{"type":"Image","props":{"y":20,"width":730,"skin":"common/sliderProgress.png","name":"barBackMask"}},{"type":"Box","props":{"width":100,"runtime":"ScaleButton","pivotY":25,"pivotX":50,"name":"sliderNodeDown","height":100},"child":[{"type":"Image","props":{"y":50,"x":50,"skin":"common/sliderAN.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-41,"x":-91,"skin":"common/sliderTip.png","name":"imgTip"}}]}]},{"type":"Box","props":{"y":793,"x":810,"width":349,"var":"accessBtn","runtime":"ScaleButton","height":120,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":60,"x":174.5,"skin":"common/button_yellow1.png","sizeGrid":"9,12,14,35","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":60,"x":174.5,"width":164,"text":"执行存取","strokeColor":"#000000","skin":"common/label.png","height":37,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Box","props":{"y":45,"x":53,"width":250,"runtime":"ScaleButton","name":"backBtn","height":250,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":125,"x":125,"skin":"common/back.png","runtime":"ScaleImage","name":"btnIcon","anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":20,"x":739,"text":"个人银行","fontSize":35,"font":"Microsoft YaHei","color":"#ffffff","align":"right"}}]};}
		]);
		return WalletUI;
	})(View);
var WheelOfFortuneUI=(function(_super){
		function WheelOfFortuneUI(){
			
		    this.box2=null;
		    this.boxPan=null;
		    this.imgPan=null;
		    this.btnBegin=null;
		    this.backBtn=null;

			WheelOfFortuneUI.__super.call(this);
		}

		CLASS$(WheelOfFortuneUI,'ui.WheelOfFortuneUI',_super);
		var __proto__=WheelOfFortuneUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ScaleImage",ScaleImage);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(WheelOfFortuneUI.uiView);
		}

		STATICATTR$(WheelOfFortuneUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1620,"height":900},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1620,"skin":"common/blackBg.png","height":900,"alpha":0.8}},{"type":"Box","props":{"y":450,"x":810,"var":"box2","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Box","props":{"y":810,"x":800,"var":"boxPan","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"var":"imgPan","skin":"gameHall/wheelFortune/pan.png"}},{"type":"Image","props":{"y":225,"x":385,"skin":"gameHall/wheelFortune/fortuneB.png","name":"imgFortuneB","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":225,"x":385,"skin":"gameHall/wheelFortune/fortune.png","name":"imgFortune","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":190,"x":425,"skin":"gameHall/wheelFortune/reward0.png","name":"imgReward0","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":220,"x":540,"skin":"gameHall/wheelFortune/reward0.png","rotation":30,"name":"imgReward1","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":310,"x":612,"skin":"gameHall/wheelFortune/reward0.png","rotation":60,"name":"imgReward2","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":418,"x":635,"skin":"gameHall/wheelFortune/reward0.png","rotation":90,"name":"imgReward3","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":522,"x":602,"skin":"gameHall/wheelFortune/reward0.png","rotation":120,"name":"imgReward4","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":602,"x":537,"skin":"gameHall/wheelFortune/reward0.png","rotation":150,"name":"imgReward5","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":625,"x":422,"skin":"gameHall/wheelFortune/reward0.png","rotation":180,"name":"imgReward6","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":612,"x":317,"skin":"gameHall/wheelFortune/reward0.png","rotation":210,"name":"imgReward7","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":532,"x":222,"skin":"gameHall/wheelFortune/reward0.png","rotation":240,"name":"imgReward8","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":428,"x":195,"skin":"gameHall/wheelFortune/reward0.png","rotation":270,"name":"imgReward9","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":312,"x":232,"skin":"gameHall/wheelFortune/reward0.png","rotation":300,"name":"imgReward10","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":212,"x":299,"skin":"gameHall/wheelFortune/reward0.png","rotation":330,"name":"imgReward11","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":800,"x":800,"skin":"gameHall/wheelFortune/quan.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":810,"x":800,"var":"btnBegin","skin":"gameHall/wheelFortune/kaishi.png","runtime":"ScaleImage","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":580,"x":1110,"width":80,"var":"backBtn","skin":"common/quXiao.png","runtime":"ScaleImage","height":88,"anchorY":0.5,"anchorX":0.5}}]}]};}
		]);
		return WheelOfFortuneUI;
	})(View);