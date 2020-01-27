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
            var data={_id:session.userid,id,submitDate:new Date()};
            await global.db.Save(self.context,'referral_users',["_id"],data);
        }
		return func(null,data.id);
	}
	async invite(msg,func,self)
    {
		var dt=msg.data;
		var session=msg.session; 
		var data =await global.db.SearchOne(self.context,'referral_users',{where:{id:dt.code}});
		var user =await global.db.SearchOne(self.context,'referral_users',{where:{_id:session.userid}});
        if(!data && dt.code!='none')
            return func({m:"referral001"});
		if(user && user.parent)
		{
			return func({m:"referral002"});
		}
		if(!user)
		{
			user={
				_id:user.id,
				id: await self.getNewId(),
				parent:dt.code,
				submitDate:new Date()
			}
            await global.db.Save(self.context,'referral_users',["_id"],user);
		}
        return func(null,{})
    }
	async getTypes(msg,func,self)
	{
		var dt=msg.data;  
		var data =await global.db.Search(self.context,'referral_types',{},dt);
		return func (null,data)
	}
	async saveType(msg,func,self)
	{
		var dt=msg.data.type;  
		if(!dt._id)
		{
			dt._id=uuid.v4();
			dt.submitDate=new Date();
		}
		var data =await global.db.Save(self.context,'referral_types',{},dt);
		return func (null,data);
	}
	async getPoints(msg,func,self)
	{
		var dt=msg.data;
		var session=msg.session;
		var data = await global.db.Search(self.context,'referral_points',{where:{userid:session.userid}},dt);		
	}
	async getPointsBalance(msg,func,self)
	{
	}
	async SavePoints(msg,func,self)
	{
	}
	async getCalculates(msg,func,self)
	{
	}
	async getTypes(msg,func,self)
}