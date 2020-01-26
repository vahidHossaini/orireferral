var uuid=require("uuid");
module.exports = class referralIndex
{
	constructor(config,dist)
	{
		this.config=config.statics
		this.context=this.config.context 
        this.bootstrap=require('./bootstrap.js')
        this.enums=require('./struct.js') 
        this.tempConfig=require('./config.js')
		//global.acc=new accountManager(dist)
	}
    async getNewId()
    {
        if(!global.ori.RandomText)
            throw "oribase not found"
        while(true)
        {            
            var id=global.ori.RandomText(6);
            var mid = await global.db.SearchOne(self.context,'referral_users',{where:{id:id}});
            if(!id)
                return id;
        }
        
    }
	async getMyCode(msg,func,self)
	{
		var dt=msg.data;
		var session=msg.session; 
        
		var data =await global.db.SearchOne(self.context,'referral_users',{where:{_id:session.userid}});
        if(!data)
        {
            var id = await self.getNewId();
            var data={_id:session.userid,id,};
            await global.db.Save(self.context,'referral_users',["_id"],data);
        }
		return func(null,data.id);
	}
	async invite(msg,func,self)
    {
		var dt=msg.data;
		var session=msg.session; 
		var data =await global.db.SearchOne(self.context,'referral_users',{where:{id:dt.code}});
        if(!data)
            return func({m:"referral001"});
        
    }
}