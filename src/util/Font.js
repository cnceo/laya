function Font()
{
    this.fontName = '';
    this.mBitmapFont = new BitmapFont();
    
    this.Load = function(_path,name)
    {
        this.fontName = name;
        this.mBitmapFont.loadFont(_path,Handler.create(this,LoadComplete));
    }
}

function LoadComplete()
{
    Text.registerBitmapFont(this.fontName, this.mBitmapFont);
}