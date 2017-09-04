//公告与聊天
var Notice = (function()
{
    function _Notice()
    {
        this._boxNotice = null;//界面node
        this._bgScrollNotice = null;//界面原色-滚动背景
        this._panelScrollNotice = null;//界面元素-滚动的panel

        this._bScrollOver = false;//是否已经滚动完所有的公告
        this._arr_Resident_notice = {curIdx:0,notices : []};//常驻公告
        this._arr_other_notice = {curIdx:0,notices : []};//其他公告
        this._chat_All = [];//始终存储最新的聊天信息（先进先出的队列）
        this.ChatMaxNum = 50;//缓存的聊天最大条目数
        this.FONT_SIZE = 20;//公告字体大小

        //添加临时公告
        this.PushRNInfo = function(info){
            this._arr_other_notice.notices.push(info);
        };
        //添加常驻公告
        this.PushResidentInfo = function(notice){
            this._arr_Resident_notice.notices.push(notice);
            this._scrollNotice();
        };
        //由ID删除一条常驻公告
        this.RemoveResidentInfo = function(id){
            for(var i=0;i<this._arr_Resident_notice.notices.length;i++){
                if(this._arr_Resident_notice.notices[i].noticeID === id){
                    this._arr_Resident_notice.notices.splice(i,1);
                    this._arr_Resident_notice.curIdx++;
                    if(this._arr_Resident_notice.curIdx >= this._arr_Resident_notice.notices.length){
                        this._arr_Resident_notice.curIdx = 0;
                    }
                    break;
                }
            }
        };
        //删除当前的一条公告(含所有类型的公告)
        this.RemoveCurNotice = function(){
            var bRemoved = this.RemoveNoticeByCurIndex(this._arr_other_notice);
            if(!bRemoved){
                return this.RemoveNoticeByCurIndex(this._arr_Resident_notice);
            }
            return bRemoved;
        }
        //删除当前index的公告
        this.RemoveNoticeByCurIndex = function(arrNotice){
            var info = this._arr_other_notice;
            var curIdx = arrNotice.curIdx;
            for(var i=0;i<arrNotice.notices.length;i++){
                if(arrNotice.curIdx === i){
                    arrNotice.notices.splice(i,1);
                    arrNotice.curIdx++;
                    if(arrNotice.curIdx >= arrNotice.notices.length){
                        arrNotice.curIdx = 0;
                    }
                    return true;
                }
            }
            return false;
        }
        //添加一条聊天信息
        this.addChatInfo = function(content){
            //实现消息入队列
            this._chat_All.unshift(content);
            if(this._chat_All.length > this.ChatMaxNum){
                this._chat_All.pop();
            }
        }
        //获取聊天信息
        this.getChatInfo = function(){
            var newArr = this._chat_All.concat();//拷贝
            newArr.reverse();//反转数组
            return newArr;
        }
        //获取常驻公告
        this.getResidentNotice = function(){
            return this._arr_Resident_notice;
        };
        //获取下一条公告：重要公告或者普通公告
        this.getNextNotice = function(){
            var notice = this.getNextOtherNotice();
            if(notice != null) return notice;
            return this.getImportentResidentN();
        }
        //获取一条常驻公告
        this.getImportentResidentN = function(){
            var notice = null;
            if(!GameData.getInstance().bRollingNotice) return null;
            this._arr_Resident_notice.curIdx++;
            if(this._arr_Resident_notice.curIdx >= this._arr_Resident_notice.notices.length){
                this._arr_Resident_notice.curIdx = 0;
            }
            for( var i =0;i< this._arr_Resident_notice.notices.length;i++ ){
                if(i === this._arr_Resident_notice.curIdx){
                    notice = this._arr_Resident_notice.notices[i].content;
                    break;
                }
            }
            return notice;
        };
        //获取下一条其他公告
        this.getNextOtherNotice = function(){
            if(!GameData.getInstance().bRollingNotice) return null;
            if(GameData.getInstance().scrollNoticeType === 0){
                return this._getNextOtherNotice0();
            }
            else{
                return this._getNextOtherNotice1();
            }
        };
        //先滚动完所有次数再滚动下一条
        this._getNextOtherNotice0 = function(){
            var notice = null;
            var info = this._arr_other_notice;
            var curIdx = info.curIdx;
            var arr = info.notices;
            if(arr.length > 0){
                if(arr[curIdx]){
                    notice = arr[curIdx].content;
                    arr[curIdx].count--;
                    if(arr[curIdx].count <= 0){
                        arr.splice(curIdx,1);
                    }
                }
                //末尾
                else{
                    notice = arr[0].content;
                    info.curIdx = 0;
                    arr[0].count--;
                    if(arr[0].count <= 0){
                        arr.splice(0,1);
                        info.curIdx++;
                    }
                }
            }
            return notice;
        };
        //滚动一遍就滚动下一条
        this._getNextOtherNotice1 = function(){
            var notice = null;
            var info = this._arr_other_notice;
            var curIdx = info.curIdx;
            var arr = info.notices;
            if(arr.length > 0){
                if(curIdx < arr.length - 1){
                    notice = arr[curIdx + 1].content;
                    arr[curIdx + 1].count--;
                    if(arr[curIdx + 1].count <= 0){
                        arr.splice(curIdx +1,1);
                    }
                    else{
                        info.curIdx++;
                    }
                }
                //末尾
                else{
                    notice = arr[0].content;
                    info.curIdx = 0;
                    arr[0].count--;
                    if(arr[0].count <= 0){
                        arr.splice(0,1);
                    }
                }
            }
            return notice;
        };
        //初始化界面公告信息
        this.InitUiNotice = function(nodeNotice){
            this._boxNotice = nodeNotice;
            if(!this._boxNotice) return;
            this._bgScrollNotice = this._boxNotice.getChildByName("bgScrollNotice"); 
            this._panelScrollNotice = this._boxNotice.getChildByName("panelScrollNotice");
            if(!this._panelScrollNotice || !this._bgScrollNotice) return;
            this._bgScrollNotice.visible = false;
            this._panelScrollNotice.visible = false;
            var iconLaba = this._boxNotice.getChildByName('iconLaba');
            if(iconLaba) iconLaba.visible = false;

            this._divElement = new HTMLDivElement();        
            this._panelScrollNotice.addChild(this._divElement);
            this._divElement.style.fontFamily = "Microsoft YaHei";
            this._divElement.style.fontSize = this.FONT_SIZE;
            
            this._pMoveStart = this._panelScrollNotice.width;
            this._divElement.x = this._pMoveStart;

            this._scrollNotice();
             
            MessageCallbackPro.addCallbackFunc( EventType.Type.scrollNotice,this._onScrollNoticeEvent,this);
        }
        this.NoticeScrollUpdate = function(){
            this._bgScrollNotice.visible = GameData.getInstance().bRollingNotice;
            this._panelScrollNotice.visible = GameData.getInstance().bRollingNotice;
            if(GameData.getInstance().bRollingNotice){
                this._scrollNotice();
            }
        }
        //释放界面
        this.ReleaseUiNotice = function(){
            this._boxNotice = null;
            this._bgScrollNotice = null;
            this._bScrollOver = false;
            this._panelScrollNotice = null;
            this._divElement = null;
            TaskDelayManager.getInstance().clearTarget(this);
            MessageCallbackPro.removeCallbackFunc( EventType.Type.scrollNotice,this._onScrollNoticeEvent,this);
        }
        this._onScrollNoticeEvent = function(e){
            if(this._bScrollOver) this._scrollNotice();
        }
        //滚动公告
        this._scrollNotice = function(){
            if(!this._bgScrollNotice) return;
            var content = this.getNextNotice();

            //服务端发来的公告格式如下：
            // var content =  "<span style= 'color:#FF6A6A;font-weight:bold'>简介</span>";
            // content += "<span style='color:#FFFFFF'>梭哈是一款扑克游戏，游戏。</span>";

            this._bScrollOver = content == null;
            this._bgScrollNotice.visible = !this._bScrollOver;
            this._panelScrollNotice.visible = !this._bScrollOver;
            var iconLaba = this._boxNotice.getChildByName('iconLaba');
            if(iconLaba) iconLaba.visible = !this._bScrollOver;
            if(this._bScrollOver) return; //所有的公告播放完毕 返回
            Tween.clearAll(this._divElement);
            this._divElement.x = this._pMoveStart;

            var c = content.split('<span')[1];
            var e = content.replace(/<[^>]+>/g,"");//正则去掉HTML标签 取出实际的文本内容
            var t = 10;
            if(!c || !e) {
               console.warn("公告字符串解析错误，不含有<span>标签？");
               this.RemoveCurNotice();
               this._scrollNotice();
            }   
            else{
                this._divElement.innerHTML = content;
                //如果没有颜色设置 则默认给黄色
                if((content.indexOf("color") == -1) && (this._divElement._childs[0])){
                    this._divElement._childs[0].style.color = GameData.getInstance().COLOR.YELLOW;
                }
                this._divElement.style.width = e.length * this.FONT_SIZE;
                var s = (this._divElement.width + this._panelScrollNotice.width);
                t = (s / GameData.getInstance().scrollNoticeSpeed) * 1000;
                
                Tween.to(this._divElement,{x : 0 - this._divElement.width},t);
                Laya.timer.once(t,this,this._scrollNotice);    
            }
        }

        this.Clear = function(){
            this._arr_Resident_notice = {curIdx:0,notices : []};
            this._arr_other_notice = {curIdx:0,notices : []};
            this._chat_All = [];
            Laya.timer.clearAll(this);
            this.ReleaseUiNotice();
        }
        
    }
    
        //单例实例 
    var instance; 
    //返回对象 
    return { 
        name: '_Notice', 

        getInstance: function () { 
            if (instance === undefined) { 
                instance = new _Notice(); 
            } 
            return instance; 
        } 
    }; 
})();