module.exports = class referralConfig
{
    constructor(config)
    { 
         
    }
    getPackages()
    {
       return []
    }
    getMessage()
	{
		return{
			default001:"user not exist", 
		}
	}
    getVersionedPackages()
    { 
      return []
    }
    getDefaultConfig()
    {
      return {
		context:"",  
		attach:{  },
		 
      }
    }
}