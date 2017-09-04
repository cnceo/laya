/**
 * 提示分析
 * 2017 06 08
 */

function FLHintAnalysis( _playerController )
{
    this.PlayerControlCom = _playerController;
    this.hintIndex = 0;
    this.hintLst = [];
    //是否能出牌
    this.canOutput = function()
    {
        this.outputCards = [];
        this.localPlayerCards = [];
        var flg = true;
        for( var uipos = 2;uipos >= 1;uipos-- ) //先看上家出的牌
        {
            this.outputCards = this.PlayerControlCom.getOutPutCards(uipos).concat();
            if( this.outputCards.length != 0 )
            {
                flg = false;
                break;
            }
        }

        if( flg ) return true;

        this.outputType = this.PlayerControlCom.getOutputType( uipos );
        this.localPlayerCards = this.PlayerControlCom.getLocalPlayerCards().concat();
                        //王炸
        if( this.outputType == FLRoomMgr.getInstance().FLPokerCardsType.Huojian ) 
        {
            return false;
        }

        var result = this.checkCardform( this.outputType );
        if( result ) this.initHint();
        return result;
    }

    this.hint = function()
    {
        if( this.hintLst.length == 0 )
            return;
        var data = this.hintLst[ this.hintIndex % this.hintLst.length ];
        var localCards = this.localPlayerCards.concat().reverse();
        for( var i = 0;i < data.length;i++ )
        {
            var t_d = data[i];
            var count = t_d.count;
            for( var j = 0;j < localCards.length;j++ )
            {
                if( count < 1 )
                {
                    var flg = false;
                    for( var k = 0;k < data.length;k++ )
                    {
                        if( t_d.num != data[k].num && data[k].num == localCards[j].getNum() )
                        {
                            flg = true;
                            break;
                        }
                    }
                    if( !flg )
                    {
                        localCards[j].resetPos();
                    }
                    continue;
                }
                if( t_d.num == localCards[j].getNum() )
                {
                    count--;
                    if( !localCards[j].IsSelect() )
                    {
                        localCards[j].setMultiSelect(true);                            
                    }
                }else
                {
                    var flg = false;
                    for( var k = 0;k < data.length;k++ )
                    {
                        if( t_d.num != data[k].num && data[k].num == localCards[j].getNum() )
                        {
                            flg = true;
                            break;
                        }
                    }
                    if( !flg )
                    {
                        localCards[j].resetPos();
                    }
                }
            }
        }

        this.hintIndex++;
    }

    this.initHint = function()
    {
        this.hintIndex = 0;
        this.hintLst = [];
        if( (typeof this[ 'hint_'+ this.outputType ] === "function") )
        {
            this[ 'hint_'+ this.outputType ]( this.cardData.reverse() );
        }

        if( this.Huojian() ) //王炸特殊处理
        {
            this.hintLst.push( [{num:16,count:1},{num:17,count:1}] );
        }
        this.printHint();
    }

    this.printHint = function()
    {
        for( var i = 0;i < this.hintLst.length;i++ )
        {
            for( var j = 0;j < this.hintLst[i].length;j++ )
            {
                CLog.log( 'num = ' + this.hintLst[i][j].num + ' count = ' + this.hintLst[i][j].count );
            }
             CLog.log('');
        }
    }

    this.initCardsData = function( _lst )
    {
        var temp = [];
        var t_t = [];
        for( var i = 0;i < _lst.length;i++ )
        {
            var card = _lst[i];
            var index = t_t.indexOf( card.getNum() );
            if( index == -1 )
            {
                temp.push( {num:card.getNum(),count:1} );
                t_t.push( card.getNum() );
            }else
            {
                temp[index].count++;
            }
        }
        return temp;
    }

    this.hintData = function( _lst,count )
    {
        var temp1 = [];
        var temp2 = [];
        var outputcardData = this.getCardByAppointCount(this.outcardData,count);

        for( var i = 0;i < _lst.length;i++ )
        {
            if( _lst[i].num > outputcardData[0] )
            {
                if( _lst[i].count > count )
                {
                    temp1.push( [{num:_lst[i].num,count:count}] );
                }else if( _lst[i].count == count )
                {
                    temp2.push( [{num:_lst[i].num,count:count}] );
                }
            }
        }

        //纯单张的靠前面
        return temp2.concat( this.addZhaDan( temp1 ) );
    }

    this.addZhaDan = function( _lst )
    {
        var zhadan = this.zhaDanCheck();
        for( var i = 0;i < zhadan.length;i++ )
        {
            _lst.push( [{num:zhadan[i],count:4}] );
        }
        return _lst;
    }

    this.getCardByCount = function( _count,_needCount,_ignoreNum )
    {
        var temp = [];
        for( var i = 0;i < this.cardData.length;i++ )
        {
            if( _ignoreNum instanceof Array )
            {
                var flg = false;
                for( var j = 0;j < _ignoreNum.length;j++ )
                {
                    if( this.cardData[i].num == _ignoreNum[j] )
                    {
                        flg = true;
                        break;
                    }
                }
                if( flg ) continue;
            }else
            {
                if( this.cardData[i].num == _ignoreNum )
                    continue;
            }
            
            if( this.cardData[i].count == _count )
            {
                temp.push( { num:this.cardData[i].num,count:_needCount } );
            }
        }
        return temp;
    }

    //单张提示
    this.hint_Danzhang = function( _lst )
    {
       this.hintLst = this.hintData( _lst,1 );
    }

    //单对提示
    this.hint_Dduizi = function( _lst )
    {
        this.hintLst = this.hintData( _lst,2 );
    }

    //三张提示
    this.hint_SanZhang = function( _lst )
    {
        this.hintLst = this.hintData( _lst,3 );
    }
    
    //三带一提示
    this.hint_SanDaiYi = function( _lst )
    {
        this.hintLst = this.hintData( _lst,3 );
        for( var i = 0;i < this.hintLst.length;i++ )
        {
            var danzhang = [];
            danzhang = this.getAdditionalCard(danzhang,1,1,this.hintLst[i][0].num,1);
            if( this.hintLst[i][0].count != 4 ) //不是炸弹
            {
                this.hintLst[i].push( danzhang[0] );
            }
        }
    }

    //三带二提示
    this.hint_SanDaiEr = function( _lst )
    {
        this.hintLst = this.hintData( _lst,3 );
        for( var i = 0;i < this.hintLst.length;i++ )
        {
            var dandui = [];
            dandui = this.getAdditionalCard(dandui,2,2,this.hintLst[i][0].num,2);
            if( this.hintLst[i][0].count != 4 ) //不是炸弹
            {
                this.hintLst[i].push( dandui[0] );
            }
        }
    }

    //连对提示
    this.hint_LianDui = function( _lst )
    {
        var LDLen  = this.outputCards.length / 2;
        var dzLst  = this.getCardByAppointCount(this.cardData,2);//返回的顺序是从小到大
        var shunzi = this.ShunziCheck(dzLst.reverse(),LDLen);//顺子判断逻辑是从大到小 先翻转
        this.assemblySZData( shunzi,2,LDLen );
    }

    //顺子提示
    this.hint_Shunzi = function( _lst )
    {
        var SZLen  = this.outputCards.length;
        var dzLst  = this.getCardByAppointCount(this.cardData,1);
        var shunzi = this.ShunziCheck(dzLst.reverse(),SZLen);//顺子判断逻辑是从大到小 先翻转
        this.assemblySZData( shunzi,1,SZLen );
    }

    //飞机提示
    this.hint_Feiji = function()
    {
        var FJLen  = this.outputCards.length / 3;
        var fjLst  = this.getCardByAppointCount(this.cardData,3);//返回的顺序是从小到大
        var shunzi = this.ShunziCheck(fjLst.reverse(),FJLen);//顺子判断逻辑是从大到小 先翻转
        this.assemblySZData( shunzi,3,FJLen );
    }

    //飞机带一提示
    this.hint_FeijidaiYi = function()
    {
        this.FeijidaiThing_Hint( 1 );
    }

    //飞机带二提示
    this.hint_FeijidaiEr = function()
    {
        this.FeijidaiThing_Hint( 2 );
    }

    // SiDaiEr
    this.hint_SiDaiEr = function( _lst )
    {
        this.hintLst = this.hintData( _lst,4 );
        var t_p = [];
        for( var i = 0;i < this.hintLst.length;i++ )
        {
            if( t_p.indexOf( this.hintLst[i][0].num ) != -1 )
                continue;
            t_p.push( this.hintLst[i][0].num );
            var danzhang = [];
            danzhang = this.getAdditionalCard(danzhang,1,2,this.hintLst[i][0].num,1);
            var count = 2;
            for( var j = 0;j < danzhang.length;j++ )
            {
                this.hintLst[i].push( danzhang[j] );
                count -= danzhang[j].count;
                if( count <= 0 ) break;
            }
        }
    }

    //SiDaiErdui
    this.hint_SiDaiErdui = function( _lst )
    {
        this.hintLst = this.hintData( _lst,4 );
        var t_p = [];
        for( var i = 0;i < this.hintLst.length;i++ )
        {
            if( t_p.indexOf( this.hintLst[i][0].num ) != -1 )
                continue;
            t_p.push( this.hintLst[i][0].num );
            var duizi = [];
            duizi = this.getAdditionalCard(duizi,2,2,this.hintLst[i][0].num,2);
            if( duizi.length < 2 )
            {   //剔除掉同样的牌型提示 hintlst里面会出现同样的牌型
                t_p = [];
                for( var j = 0;j < this.hintLst.length;j++ )
                {
                    var flg = false;
                    for( var k = 0;k < t_p.length;k++ )
                    {
                        if( t_p[k][0].num == this.hintLst[j][0].num )
                        {
                            flg = true;
                            break;
                        }
                    }
                    if( flg ) continue;
                    t_p.push( this.hintLst[j] );
                }
                this.hintLst = t_p;
                break;
            }else
            {
                var count = 4;
                for( var j = 0;j < duizi.length;j++ )
                {
                    this.hintLst[i].push( duizi[j] );
                    count -= duizi[j].count;
                    if( count <= 0 ) break;
                }
            }
        }
    }

    this.FeijidaiThing_Hint = function( _count )
    {
        var FJLen  = this.getCardByAppointCount(this.outcardData,3).length;
        var fjLst  = this.getCardByAppointCount(this.cardData,3);//返回的顺序是从小到大
        var shunzi = this.ShunziCheck(fjLst.reverse(),FJLen);//顺子判断逻辑是从大到小 先翻转 
        this.assemblySZData( shunzi,3,FJLen );
        for( var i = 0;i < this.hintLst.length;i++ )
        {
            if( this.hintLst[i][0].count == 4 )
                continue;
            var count = 0;
            var need = this.hintLst[i].length * _count;

            var ignoreLst = [];
            for( var p = 0;p < this.hintLst[i].length;p++ )
            {
                ignoreLst.push( this.hintLst[i][p].num );
            }
            var lst = []; 
            lst = this.getAdditionalCard( lst,_count,FJLen * _count,ignoreLst,_count );

            var j = 0;
            for( ;j < this.hintLst[i].length;j++ )
            {
                if( count >= need  )
                    break;
                if( lst[j].count >= need )
                {
                    this.hintLst[i].push( {num:lst[j].num,count:lst[j].count-count} );
                    break;
                }
                else
                {
                    this.hintLst[i].push( lst[j] );
                    count += lst[j].count;
                }   
            }
        }    
    }

    this.getAdditionalCard = function( lst,cardCount,count,ignoreNum,appointCount )
    {
        if( cardCount > 4 ) 
            return;
        lst = lst.concat( this.getCardByCount( cardCount,count > cardCount ? appointCount : count,ignoreNum ) );
        var t_c = 0;
        for( var i = 0;i < lst.length;i++ )
        {
            t_c += lst[i].count;
        }
        if( t_c < count  )
        {
            lst = this.getAdditionalCard( lst,++cardCount,count,ignoreNum,appointCount );
        }
        return lst;
    }

    this.assemblySZData = function( _shunzi,_count,_len )
    {
        var outputcardData = this.getCardByAppointCount(this.outcardData,_count);
        for( var i = 0;i < _shunzi.length;i++ )
        {
            var sz = _shunzi[i];
            for( var p = 0;p < sz.length;p++ )
            {
                var szLst = [];
                if( sz[p] > outputcardData[0] )
                {
                    for( var j = p,k = 0;k < _len && j < sz.length;k++,j++ )
                    {
                        szLst.push( {num:sz[j],count:_count} );
                    }
                }

                if( szLst.length == _len )
                {
                    this.hintLst.push( szLst.reverse() );
                }
            }
        }
        this.hintLst.reverse();
        this.addZhaDan( this.hintLst );
    }

    this.checkCardform = function( outputType )
    {
        this.cardData    = this.initCardsData( this.localPlayerCards );
        this.outcardData = this.initCardsData( this.outputCards );

        if( this.Huojian() ) return true; //先判断是否有炸弹
            
        if( (typeof this[ outputType ] === "function") )
        {        
            if( outputType != FLRoomMgr.getInstance().FLPokerCardsType.Zhandan && this.zhaDanCheck().length > 0 ) //手上有炸弹
            {
                return true;
            }
            return this[ outputType ](); //调用相应的函数
        }
        return true;
    }
    
    this.check = function( _lst,_num)
    {
        //判断大小 从最大开始判断
        for( var i = 0;i < _lst.length;i++ )
        {
            if( _lst[i] > _num )
            {
                return true;
            }
        }
        return false;
    }

    this.getCardByAppointCount = function( _lst,_count,_ignoreNum )
    {
        var cards = [];
        for( var i = 0;i < _lst.length;i++ )
        {
            if( _ignoreNum instanceof Array )
            {
                var flg = false;
                for( var j = 0;j < _ignoreNum.length;j++ )
                {
                    if( _lst[i].num == _ignoreNum[j] )
                    {
                        flg = true;
                        break;
                    }
                }
                if( flg ) continue;
            }else
            {
                if( _lst[i].num == _ignoreNum )
                    continue;
            }

            if( _lst[i].count >= _count )
            {
                cards.push( _lst[i].num );
            }
        }
        return cards;
    }

    //单张
    this.Danzhang = function()
    {
        var card = this.outputCards[0];
        if( card.getNum() == 17 )//玩家出的大王 后续不做判断
            return false;
        for( var i = 0;i < this.cardData.length;i++ )
        {
            if( this.cardData[i].num > card.getNum() )
            {
                return true;
            }
        }
        return false;
    }

    //对子
    this.Dduizi = function()
    {
        if( this.outputCards[0].getNum() == 15 )//玩家出的对2 后续不做判断
            return false;
        return this.check( this.getCardByAppointCount(this.cardData,2),this.outputCards[0].getNum() );
    }

    //三张
    this.SanZhang = function()
    {
        var outputcardData = this.getCardByAppointCount(this.outcardData,3);
        if( outputcardData[0] == 15 )//玩家出的2 后续不做判断
            return false;
        return this.check( this.getCardByAppointCount(this.cardData,3),outputcardData[0] );
    }
    //三带一
    this.SanDaiYi = function()
    {
        return this.SanZhang();
    }
    //三带二
    this.SanDaiEr = function()
    {
        var outputcardData = this.getCardByAppointCount(this.outcardData,3);
        if( outputcardData[0] == 15 )//玩家出的2 后续不做判断
            return false;
        var sz = this.getCardByAppointCount(this.cardData,3);
        for( var i = 0;i < sz.length;i++ )
        {
            if( sz[i] > outputcardData[0] )
            {
                var dz = this.getCardByAppointCount(this.cardData,2,sz[i]);
                if( dz.length > 0 )
                {
                    return true;
                }
            }
        }
        return false;
    }
    //连对
    this.LianDui = function()
    {
        if( this.outputCards[0].getNum() == 14 )//玩家出的连对到A了 就不用判断了
            return false;
        var LDLen = this.outputCards.length / 2;
        var dzLst = this.getCardByAppointCount(this.cardData,2);
        var shunzi = this.ShunziCheck(dzLst,LDLen);
        var card = this.outputCards[0];
        for( var i = 0;i < shunzi.length;i++ )
        {
            if( shunzi[i].length >= LDLen && shunzi[i][0] > card.getNum() )
            {
                return true;
            }
        }

        return false;
    }

    this.ShunziCheck = function(_lst,_szCount)
    {
        var shunzi = [];
        for( var i = 0;i < _lst.length - (_szCount - 1);i++ )//
        {
            if( _lst[i] >= 15 ) //2不算
                continue;
            var count = 1;
            for( var j = i + 1;j < _lst.length;j++ )
            {
                if( _lst[i] == _lst[j] + count  )
                {
                    count++;
                }else
                {
                    if( count >= _szCount ) //
                    {
                        shunzi.push( _lst.slice( i,j ) );
                        i = j - 1;//从结束的时候开始重新判断
                        count = 0;
                    }
                    break;
                }
            }

            if( count >= _szCount )
            {
                shunzi.push( _lst.slice(i,j) );
                i = j - 1;
                break;
            }
        }
        return shunzi;
    }

    //顺子
    this.Shunzi = function()
    {
        if( this.outputCards[0].getNum() == 14 )//玩家出的顺子到A了 就不用判断了
            return false;
        var danZhangLst = this.getCardByAppointCount(this.cardData,1);  
        var shunzi = this.ShunziCheck(danZhangLst,5);
        var card = this.outputCards[0];
        for( var i = 0;i < shunzi.length;i++ )
        {
            if( shunzi[i].length >= this.outputCards.length && shunzi[i][0] > card.getNum() )
            {
                return true;
            }
        }

        return false;
    }

    this.FeijidaiYi = function()
    {
        return this.Feiji();
    }

    this.FeijidaiEr = function()
    {
        return this.Feiji();
    }
    //飞机
    this.Feiji = function()
    {
        var OPLst = this.getCardByAppointCount( this.outcardData,3 );
        if( OPLst[0] == 14 ) //玩家出的1 后续不做判断
            return false;
        var SZLocallst = this.getCardByAppointCount(this.cardData,3);
        var FJ = this.ShunziCheck( SZLocallst, OPLst.length);
        var OPDZLst = this.getCardByAppointCount( this.outcardData,2,OPLst);

        var flg = false;
        for( var i = 0;i < FJ.length;i++ )
        {
            if( FJ[i].length >= OPLst.length && FJ[i][0] > OPLst[0] )
            {
                if( OPDZLst.length > 0 ) //表示带的对子
                {
                    var lst = FJ[i].splice( 0,OPLst.length );
                    var dz = this.getCardByAppointCount( this.cardData,2,lst);
                    return dz.length >= OPDZLst.length;
                }
                return true;
            }
        }

        return false;
    }

    this.zhaDanCheck = function()
    {
        var zhadan = [];
        for( var i = 0;i < this.cardData.length;i++ )
        {
            if( this.cardData[i].count == 4 )
            {
                zhadan.push( this.cardData[i].num );
            }
        }
        return zhadan;
    }

    //炸弹
    this.Zhandan = function()
    {
        if( this.outputCards[0].getNum() == 15 ) //四个2 就不用判断了
            return;
        var zhaDanLst = this.zhaDanCheck();
        return this.check( zhaDanLst,this.outputCards[0].getNum() );
    }
    //四带二
    this.SiDaiEr = function()
    {
        
    }
    //四带两对
    this.SiDaiErdui = function()
    {

    }
    //火箭
    this.Huojian = function()
    {
        if(this.localPlayerCards.length < 2)
            return false;
        return this.localPlayerCards[0].getNum() == 17 && this.localPlayerCards[1].getNum() == 16;
    }
} 