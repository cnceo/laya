/**
 * huangandfly 2016 7 22
 * 文本滚动条
 */
function TextScroll() {
    TextScroll.super(this);

    var TOP_TO_DOWN = "TOP_TO_DOWN";
    var DOWN_TO_TOP = "DOWN_TO_TOP";
    

    TextScroll.TOP_TO_DOWN = function()
    {
        return TOP_TO_DOWN;
    }

    TextScroll.DOWN_TO_TOP = function()
    {
        return DOWN_TO_TOP;
    }

    this.init = function (_w, _h, _maxNum, _scrollMode,_space) {
        this.width = _w;
        this.height = _h;
        this.maxNum = _maxNum;
        this.startMovePos = 0;
        this._bStopPropagation = false;//是否在滑动的时候阻止父节点的click事件
        this.offsets = [];
        this.space = _space || 12;//行间距
        this._lastPoint = new Point();
        this.scrollMode = _scrollMode == undefined ? DOWN_TO_TOP : _scrollMode;
        this.tween = null;

        //this.initMask();
        this.initContent();
    }

    this.initContent = function () {
        this.content = new Box();
        this.content.width = this.width;
        this.content.autoSize = true;
        this.content.y = this.scrollMode == DOWN_TO_TOP ? this.height : 1;
        //this.mask.addChild(this.content);
        this.addChild(this.content);

        this.content.on(Event.MOUSE_DOWN, this, this.onMouseDown);
        this.content.on(Event.MOUSE_WHEEL, this, this.onMousewheel);
        this.content.on(Event.CLICK,this,this.onMouseUp3);
    }
    this.onMouseUp3 = function(e){
        if(this._bStopPropagation){
            e.stopPropagation();
            this._bStopPropagation = false;
        }
    }
    this.onMousewheel = function (e) {
        this.content.y += e.delta * 14;
        if (this.content.y > 0) {
            this.moveTop();
        } else if ((this.height - this.content.height) > this.content.y) {
            this.moveDown();
        }
    }

    this.onMouseDown = function (event) {
        if ( !(this.content.height > this.height) )
            return;
        this.startMovePos = Laya.stage.mouseY;
        this._lastPoint.setTo(Laya.stage.mouseX, Laya.stage.mouseY);
        Laya.stage.on(Event.MOUSE_UP, this, this.onMouseCancel);
        Laya.stage.on(Event.MOUSE_OUT, this, this.onMouseCancel);

        Laya.timer.clear(this, this.tweenMove);
        Laya.timer.frameLoop(1, this, this.loop);
    }

    this.loop = function () {
        var mouseY = Laya.stage.mouseY;
        this._lastOffset = mouseY - this._lastPoint.y;
        this.offsets.push(this._lastOffset);
        this._lastPoint.setTo(Laya.stage.mouseX, Laya.stage.mouseY);

        this.content.y += this._lastOffset;
        if(Math.abs(this._lastOffset) > 1) this._bStopPropagation = true;
    }

    this.onMouseCancel = function (e) {
        Laya.stage.off(Event.MOUSE_UP, this, this.onMouseCancel);
        Laya.stage.off(Event.MOUSE_OUT, this, this.onMouseCancel);
        Laya.timer.clear(this, this.loop);

        var offset = 0;
        var n = Math.min(this.offsets.length, 3);
        for (var i = 0; i < n; i++) {
            offset += this.offsets[this.offsets.length - 1 - i];
        }
        this._lastOffset = offset / n;
        offset = Math.abs(this._lastOffset);

        if (offset < 2) {
            if (this.content.y > 0 || this.content.height < this.height) {
                this.moveTop();
            } else if ((this.height - this.content.height) > this.content.y) {
                this.moveDown();
            }
            return;
        }
        if (offset > 60) this._lastOffset = this._lastOffset > 0 ? 60 : -60;
        Laya.timer.frameLoop(1, this, this.tweenMove);
    }

    this.moveTop = function () {
       Tween.to(this.content, { y: 0 }, 200);
    }

    this.moveDown = function (_move) {
        _move = _move == undefined ? true : _move;
        if( _move )
        {
            Tween.to(this.content, { y: this.height - this.content.height - 5 }, 200);
        }
        else
        {
            this.content.y = this.height - this.content.height - 5;
        }     
    }

    this.tweenMove = function () {
        this._lastOffset *= 0.95;
        if (Math.abs(this._lastOffset) < 1 || this.content.y + this._lastOffset > 0 || (this.height - this.content.height) > this.content.y) {
            Laya.timer.clear(this, this.tweenMove);
            if (this.content.y + this._lastOffset > 0 || this.content.height < this.height) {
                this.moveTop();
            } else if ((this.height - this.content.height) > this.content.y) {
                this.moveDown();
            }
            return;
        }
        this.content.y += this._lastOffset;
    }

    this.initMask = function () {
        // this.mask = new Sprite();
        // this.mask.width = this.width;
        // this.mask.height = this.height;
        // this.mask.scrollRect = new Rectangle();
        // this.mask.scrollRect.setTo(0, 0, this.width, this.height);
        // this.mask.optimizeScrollRect = true;
        // this.addChild(this.mask);
        this.panelMask = new Panel();
    }

    this.addElement = function (_content, _fontSize, _color, _width, _autoSize, _wordWrap, _ID) {
        var txt = this.createText(_content, _fontSize, _color, _width, _autoSize, _wordWrap, _ID);
        this.setPos(txt);
        this.checkNum(txt);
        this.parseEmoji(txt);
        this.moveToDown();
    }

    this.parseEmoji = function( _txt )
    {
        if( !_txt || _txt.text == '' )
            return;
        var startIndex = _txt.text.indexOf('{');
        var str = _txt.text.substr(startIndex+1);
        var endIndex = str.indexOf('}');
        //剔除掉表情字符
        if( startIndex >= 0 && endIndex >= 0 && str.indexOf('#') >= 0 )
        {
            var point = _txt.getCharPoint( startIndex );
            var emoji = new laya.ui.Image();
            var _path = 'chat/' + str.substr( str.indexOf('#') + 1,3 ) + '.png';
            emoji.dataSource = {skin:_path};     
            emoji.x = point.x;
            emoji.y = point.y+3;
            emoji.scaleX = emoji.scaleY = _txt.fontSize / 40;
            _txt.addChild( emoji );
            _txt.text = _txt.text.substr( 0,startIndex );
        }
    }

    this.removeElement = function (_ID) {
        for (var i = 0; i < this.content.numChildren;) {
            var item = this.content.getChildAt(i);
            if (item.ID === _ID) {
                item.removeSelf();
                this.resetItemPos(item, i);
                item.destroy();
                item = null;
            } else {
                i++;
            }
        }
    }

    this.resetItemPos = function (_item, _index) {
        t_index = _index;
        for (; t_index < this.content.numChildren; t_index++) {
            var t_item = this.content.getChildAt(t_index);
            t_item.y -= _item.height;
        }

        //下面的往上走 整体再下移
        if (this.scrollMode == DOWN_TO_TOP) {
            this.moveDown(false);
        }
        
    }

    this.checkNum = function (_txt) {
        if (this.content.numChildren > this.maxNum) {
            var item = this.content.getChildAt(0);
            if (item) {
                this.moveItem(item.height);
                item.removeSelf();
                item.destroy();
                item = null;
            }
            if (this.scrollMode == TOP_TO_DOWN) {
                this.content.y += _txt.height;
            }
        }
    }

    this.moveItem = function (_height) {
        for (var i = 0; i < this.content.numChildren; i++) {
            var item = this.content.getChildAt(i);
            item.y -= _height;
        }

        //下面的往上走 整体再下移
        if (this.scrollMode == DOWN_TO_TOP) {
            this.content.y += _height;
        }
    }

    this.createText = function (_content, _fontSize, _color, _width, _autoSize, _wordWrap, _ID) {
        var txt = new Text();
        txt.text = _content;
        //txt.cacheAs = 'bitmap';//加上此句字体会模糊
        txt.fontSize = _fontSize;
        //txt.bold = true;
        txt.font = 'Microsoft YaHei';
        txt.color = _color;
        //txt.strokeColor = '#000000';
        //txt.stroke = 2;
        txt.width = _width;
        txt.autoSize = _autoSize;
        txt.wordWrap = _wordWrap;
        txt.ID = _ID === undefined ? 0 : _ID;
        this.content.addChild(txt);
        return txt;
    }

    this.moveToDown = function () {
        if (this.content.height > this.height) {
            this.moveDown();
        }
    }

    this.setPos = function (_txt) {
        if (this.content.numChildren > 1) {
            var node = this.content.getChildAt(this.content.numChildren - 2);
            var pos = node.y + node.height + this.space;
            _txt.y = pos;
        } else if (this.scrollMode == DOWN_TO_TOP) {
            _txt.y -= 5;
        }

        if (this.scrollMode == DOWN_TO_TOP) {
            this.tween && this.tween.complete();
            this.tween = Tween.to(this.content, { y: this.content.y - _txt.height - this.space }, 200);
        }
    }
}